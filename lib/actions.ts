'use server' // Refreshed

import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { Service } from '@/types'
import { initializePaystackTransaction, verifyPaystackTransaction } from '@/lib/paystack'
import { isAdmin, currentUser } from '@/lib/auth-utils'
import { sendOrderStatusEmail } from '@/lib/mail'

// --- Service Actions ---

export async function getServices(): Promise<Service[]> {
  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    })
    return services as Service[]
  } catch (error) {
    console.error('Error fetching services:', error)
    return []
  }
}

// --- Order Actions ---

export async function getOrders(userId?: string) {
  try {
    return await prisma.order.findMany({
      where: userId ? { userId } : {},
      include: {
        user: true,
        items: true,
      },
      orderBy: { createdAt: 'desc' },
    })
  } catch (error) {
    console.error('Error fetching orders:', error)
    return []
  }
}

export async function getOrderById(id: string) {
  try {
    return await prisma.order.findUnique({
      where: { id },
      include: {
        user: true,
        items: true,
      },
    })
  } catch (error) {
    console.error('Error fetching order:', error)
    return null
  }
}

export async function createOrder(data: {
  userId: string
  notes?: string
  scheduledPickup?: Date
  isUrgent?: boolean
  items: { name: string; price: number; quantity: number; serviceType: string }[]
}) {
  try {
    // 1. Fetch real prices from DB to prevent tampering
    const serviceNames = data.items.map(i => i.name)
    const dbServices = await prisma.service.findMany({
      where: { name: { in: serviceNames } }
    })

    const validatedItems = data.items.map(item => {
      const dbService = dbServices.find(s => s.name === item.name)
      if (!dbService) return item
      
      const price = item.serviceType === 'DryClean' 
        ? dbService.dryCleanPrice 
        : dbService.ironingPrice

      return {
        ...item,
        name: `${item.name} (${item.serviceType === 'DryClean' ? 'Complete Dry Clean' : 'Ironing Only'})`,
        price: price
      }
    })

    const subtotal = validatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const paymentMode = 'Online' // Online only as per new requirements

    // 2. Apply Bulk Discounts from DB
    const applicableDiscount = await prisma.bulkDiscount.findFirst({
      where: { 
        isActive: true,
        threshold: { lte: subtotal }
      },
      orderBy: { threshold: 'desc' }
    })

    const discountAmount = applicableDiscount ? (subtotal * (applicableDiscount.percentage / 100)) : 0
    const subtotalAfterDiscount = subtotal - discountAmount

    // 3. Platform Fee (5% for Online)
    const platformFee = subtotalAfterDiscount * 0.05
    
    // 4. Urgent Fee (15% of subtotal after bulk discount)
    const urgentFee = data.isUrgent ? (subtotalAfterDiscount * 0.15) : 0
    
    const total = subtotalAfterDiscount + platformFee + urgentFee
    
    // 5. Generate Order Number (Timestamp based for uniqueness)
    const orderNumber = `ORD-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`

    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: data.userId,
        notes: data.notes,
        scheduledPickup: data.scheduledPickup,
        total,
        platformFee,
        urgentFee,
        paymentMode,
        status: 'Pending',
        items: {
          create: validatedItems,
        },
      },
      include: {
        user: true
      }
    })

    // 6. Notify Admin
    try {
      const settings = await prisma.settings.findUnique({ where: { key: 'global' } })
      const adminEmail = settings?.email || 'admin@dr-clean.com'
      const { sendAdminNewOrderEmail } = await import('@/lib/mail')
      await sendAdminNewOrderEmail(
        adminEmail,
        order.orderNumber,
        order.user?.name || 'Customer',
        total
      )
    } catch (emailError) {
      console.error('Failed to notify admin:', emailError)
    }

    revalidatePath('/admin/orders')
    revalidatePath('/customer/orders')
    return { success: true, order }
  } catch (error) {
    console.error('Error creating order:', error)
    return { success: false, error: 'Failed to create order' }
  }
}

export async function initializePayment(orderId: string, email: string) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId }
    })

    if (!order) throw new Error("Order not found")

    const callbackUrl = `${process.env.NEXT_PUBLIC_APP_URL}/customer/orders/${orderId}?payment_verify=true`
    const reference = `ORD-${orderId}-${Date.now()}`

    const data = await initializePaystackTransaction({
      email,
      amount: Math.round(order.total * 100), // Convert to kobo
      reference,
      callback_url: callbackUrl,
    })

    // Update order with reference
    await prisma.order.update({
      where: { id: orderId },
      data: { paymentReference: reference }
    })

    return { success: true, authorization_url: data.authorization_url }
  } catch (error) {
    console.error('Error initializing payment:', error)
    return { success: false, error: 'Failed to initialize payment' }
  }
}

export async function verifyPayment(reference: string) {
  try {
    const data = await verifyPaystackTransaction(reference)

    if (data.status === 'success') {
      const existingOrder = await prisma.order.findFirst({
        where: { paymentReference: reference }
      })

      if (!existingOrder) {
        return { success: false, error: 'Order not found with this reference' }
      }

      const order = await prisma.order.update({
        where: { id: existingOrder.id },
        data: { paymentStatus: 'Paid', status: 'Processing' }
      })

      revalidatePath('/admin/orders')
      revalidatePath(`/customer/orders/${order.id}`)
      return { success: true, order }
    }

    return { success: false, error: 'Payment not successful' }
  } catch (error) {
    console.error('Error verifying payment:', error)
    return { success: false, error: 'Failed to verify payment' }
  }
}

export async function deleteOrder(orderId: string) {
  const user = await currentUser()
  if (!user) return { success: false, error: "Unauthorized" }

  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId }
    })

    if (!order) return { success: false, error: "Order not found" }

    // Only allow deletion of Pending/Unpaid orders
    if (order.status !== 'Pending' || order.paymentStatus === 'Paid') {
      return { success: false, error: "Cannot delete a paid or processed order" }
    }

    // Only Admin or the Order Owner can delete
    if ((user as any).role !== 'ADMIN' && order.userId !== user.id) {
      return { success: false, error: "Unauthorized" }
    }

    // Delete items first if needed (Prisma handles cascading if configured, but let's be explicit or use schema)
    // Actually, MongoDB doesn't have foreign key constraints in the same way, but Prisma handles relations.
    await prisma.orderItem.deleteMany({
      where: { orderId }
    })

    await prisma.order.delete({
      where: { id: orderId }
    })

    revalidatePath('/admin/orders')
    revalidatePath('/customer/orders')
    return { success: true }
  } catch (error) {
    console.error('Error deleting order:', error)
    return { success: false, error: 'Failed to delete order' }
  }
}

export async function updateOrderStatus(orderId: string, status: string) {
  if (!(await isAdmin())) return { error: "Unauthorized" }
  
  try {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status },
      include: { user: true }
    })
    
    // Trigger notification protocol
    if (order.user?.email) {
      await sendOrderStatusEmail(order.user.email, order.orderNumber, status)
    }

    revalidatePath('/admin/orders')
    revalidatePath(`/admin/orders/${orderId}`)
    revalidatePath('/customer/orders')
    return { success: true, order }
  } catch (error) {
    console.error('Error updating order status:', error)
    return { success: false, error: 'Failed to update order' }
  }
}

export async function updateOrderNotes(orderId: string, notes: string) {
  if (!(await isAdmin())) return { error: "Unauthorized" }

  try {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { notes },
    })

    revalidatePath(`/admin/orders/${orderId}`)
    return { success: true, order }
  } catch (error) {
    console.error('Error updating order notes:', error)
    return { success: false, error: 'Failed to update notes' }
  }
}

// --- Customer Actions ---

export async function getCustomers() {
  if (!(await isAdmin())) return []
  
  try {
    return await prisma.user.findMany({
      where: { role: 'CUSTOMER' },
      include: {
        _count: {
          select: { orders: true }
        },
        orders: {
          select: { total: true }
        }
      },
      orderBy: { createdAt: 'desc' },
    })
  } catch (error) {
    console.error('Error fetching customers:', error)
    return []
  }
}

// --- Analytics Actions ---

export async function getDashboardStats() {
  if (!(await isAdmin())) return { totalOrders: 0, activeOrders: 0, totalRevenue: 0, totalCustomers: 0, averageOrderValue: 0, growth: 0 }

  try {
    const now = new Date()
    const firstDayThisMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)

    const [totalOrders, activeOrders, totalRevenue, totalCustomers, revenueThisMonth, revenueLastMonth] = await Promise.all([
      prisma.order.count(),
      prisma.order.count({
        where: { NOT: { status: { in: ['Completed', 'Cancelled'] } } }
      }),
      prisma.order.aggregate({
        _sum: { total: true }
      }),
      prisma.user.count({
        where: { role: 'CUSTOMER' }
      }),
      prisma.order.aggregate({
        where: { createdAt: { gte: firstDayThisMonth } },
        _sum: { total: true }
      }),
      prisma.order.aggregate({
        where: { 
          createdAt: { 
            gte: firstDayLastMonth,
            lt: firstDayThisMonth
          } 
        },
        _sum: { total: true }
      })
    ])

    const revenue = totalRevenue._sum.total || 0
    const currentMonthRev = revenueThisMonth._sum.total || 0
    const lastMonthRev = revenueLastMonth._sum.total || 0
    
    let growth = 0
    if (lastMonthRev > 0) {
      growth = ((currentMonthRev - lastMonthRev) / lastMonthRev) * 100
    } else if (currentMonthRev > 0) {
      growth = 100
    }

    return {
      totalOrders,
      activeOrders,
      totalRevenue: revenue,
      totalCustomers,
      averageOrderValue: totalOrders > 0 ? revenue / totalOrders : 0,
      growth: parseFloat(growth.toFixed(1)),
    }
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return {
      totalOrders: 0,
      activeOrders: 0,
      totalRevenue: 0,
      totalCustomers: 0,
      averageOrderValue: 0,
      growth: 0,
    }
  }
}

export async function getAnalytics() {
  if (!(await isAdmin())) return { totalRevenue: 0, totalOrders: 0, averageOrderValue: 0, chartData: [] }

  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'asc' },
      select: {
        createdAt: true,
        total: true,
      }
    })

    const chartData = orders.reduce((acc: any[], order) => {
      const date = new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      const existing = acc.find(d => d.date === date)
      if (existing) {
        existing.orders += 1
        existing.revenue += order.total
      } else {
        acc.push({ date, orders: 1, revenue: order.total })
      }
      return acc
    }, [])

    return {
      totalRevenue: orders.reduce((sum, o) => sum + o.total, 0),
      totalOrders: orders.length,
      averageOrderValue: orders.length > 0 ? orders.reduce((sum, o) => sum + o.total, 0) / orders.length : 0,
      chartData,
    }
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return {
      totalRevenue: 0,
      totalOrders: 0,
      averageOrderValue: 0,
      chartData: [],
    }
  }
}
