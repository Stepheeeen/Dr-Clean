import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Cleaning up database...')
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.service.deleteMany()
  await prisma.user.deleteMany()
  console.log('Database cleaned.')

  console.log('Start seeding...')

  // Seed Services
  const services = [
    { name: 'Washing', description: 'Professional washing service for all fabric types', price: 2.5, category: 'Laundry' },
    { name: 'Ironing & Pressing', description: 'Expert ironing for a crisp, polished look', price: 1.5, category: 'Laundry' },
    { name: 'Folding', description: 'Neat folding and organization service', price: 1.0, category: 'Laundry' },
    { name: 'Dry Cleaning', description: 'Premium dry cleaning for delicate items', price: 5.0, category: 'Dry Cleaning' },
    { name: 'Express Service', description: '24-hour turnaround available', price: 3.5, category: 'Express' },
    { name: 'Pickup & Delivery', description: 'Convenient pickup and delivery service', price: 0, category: 'Service' },
  ]

  for (const s of services) {
    const service = await prisma.service.create({
      data: s,
    })
    console.log(`Created service with id: ${service.id}`)
  }

  // Seed a demo Admin  // Create Admin
  const adminPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@drclean.com' },
    update: {},
    create: {
      email: 'admin@drclean.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
    },
  })
  console.log(`Created admin: ${admin.email}`)

  // Create Customer
  const customerPassword = await bcrypt.hash('password123', 10)
  const customer = await prisma.user.upsert({
    where: { email: 'john@example.com' },
    update: {},
    create: {
      email: 'john@example.com',
      name: 'John Smith',
      password: customerPassword,
      role: 'CUSTOMER',
    },
  })
  console.log(`Created customer: ${customer.email}`)

  // Seed some initial orders for John
  const order1 = await prisma.order.create({
    data: {
      orderNumber: 'ORD-001',
      status: 'Ready',
      total: 19.50,
      notes: 'Handle silk shirts with care',
      userId: customer.id,
      items: {
        create: [
          { name: 'Washing', price: 2.5, quantity: 5 },
          { name: 'Ironing & Pressing', price: 1.5, quantity: 3 },
        ]
      }
    }
  })
  console.log(`Created order: ${order1.orderNumber}`)

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
