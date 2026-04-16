import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    const orders = await prisma.order.findMany({
      select: {
        id: true,
        orderNumber: true,
        paymentReference: true
      }
    })
    console.log('Orders:', JSON.stringify(orders, null, 2))
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
