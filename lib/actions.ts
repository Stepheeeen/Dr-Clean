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

// --- Analytics Actions ---

export async function getDashboardStats() {
  try {
    const [totalOrders, activeOrders, totalRevenue] = await Promise.all([
      prisma.order.count(),
      prisma.order.count({
        where: { NOT: { status: { in: ['Completed', 'Cancelled'] } } }
      }),
      prisma.order.aggregate({
        _sum: { total: true }
      })
    ])

    return {
      totalOrders,
      activeOrders,
      totalRevenue: totalRevenue._sum.total || 0,
      averageOrderValue: totalOrders > 0 ? (totalRevenue._sum.total || 0) / totalOrders : 0,
    }
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return {
      totalOrders: 0,
      activeOrders: 0,
      totalRevenue: 0,
      averageOrderValue: 0,
    }
  }
}
