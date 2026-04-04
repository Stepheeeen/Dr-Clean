'use server'

import prisma from './db'
import { revalidatePath } from 'next/cache'

// --- Service Actions ---

export async function getServices() {
  try {
    return await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    })
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
  items: { name: string; price: number; quantity: number }[]
}) {
  try {
    const total = data.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
    
    // Generate a simple order number
    const count = await prisma.order.count()
    const orderNumber = `ORD-${(count + 1).toString().padStart(3, '0')}`

    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: data.userId,
        notes: data.notes,
        scheduledPickup: data.scheduledPickup,
        total,
        status: 'Pending',
        items: {
          create: data.items,
        },
      },
    })

    revalidatePath('/admin/orders')
    revalidatePath('/customer/orders')
    return { success: true, order }
  } catch (error) {
    console.error('Error creating order:', error)
    return { success: false, error: 'Failed to create order' }
  }
}

export async function updateOrderStatus(orderId: string, status: string) {
  try {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status },
    })
    
    revalidatePath('/admin/orders')
    revalidatePath(`/admin/orders/${orderId}`)
    revalidatePath('/customer/orders')
    return { success: true, order }
  } catch (error) {
    console.error('Error updating order status:', error)
    return { success: false, error: 'Failed to update order' }
  }
}

// --- Customer Actions ---

export async function getCustomers() {
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
  try {
    const [totalOrders, activeOrders, totalRevenue, totalCustomers] = await Promise.all([
      prisma.order.count(),
      prisma.order.count({
        where: { NOT: { status: { in: ['Completed', 'Cancelled'] } } }
      }),
      prisma.order.aggregate({
        _sum: { total: true }
      }),
      prisma.user.count({
        where: { role: 'CUSTOMER' }
      })
    ])

    const revenue = totalRevenue._sum.total || 0

    return {
      totalOrders,
      activeOrders,
      totalRevenue: revenue,
      totalCustomers,
      averageOrderValue: totalOrders > 0 ? revenue / totalOrders : 0,
      growth: 12.5, // Mock for now
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
