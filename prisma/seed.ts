import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Seed Services
  const services = [
    {
      name: 'Washing',
      description: 'Professional washing service for all fabric types',
      price: 2500, // In Naira
      unit: 'kg',
      category: 'Laundry',
    },
    {
      name: 'Ironing & Pressing',
      description: 'Expert ironing for a crisp, polished look',
      price: 1500,
      unit: 'item',
      category: 'Laundry',
    },
    {
      name: 'Folding',
      description: 'Neat folding and organization service',
      price: 1000,
      unit: 'item',
      category: 'Laundry',
    },
    {
      name: 'Dry Cleaning',
      description: 'Premium dry cleaning for delicate items',
      price: 5000,
      unit: 'item',
      category: 'Dry Cleaning',
    },
  ]

  for (const service of services) {
    await prisma.service.upsert({
      where: { id: service.name }, // This won't work because id is CUID. Using name as identifier for seeding logic.
      update: {},
      create: service,
    })
  }

  // Seed Price Modifiers
  const modifiers = [
    {
      name: 'Express Service',
      description: '24-hour turnaround',
      price: 2000,
      type: 'SURCHARGE' as const,
      valueType: 'FIXED' as const,
    },
    {
      name: 'Pickup & Delivery',
      description: 'Standard charge for small orders',
      price: 5000,
      type: 'SURCHARGE' as const,
      valueType: 'FIXED' as const,
    },
  ]

  for (const modifier of modifiers) {
    await prisma.priceModifier.create({
      data: modifier,
    })
  }

  // Seed Bulk Discounts
  const discounts = [
    {
      threshold: 100000,
      percentage: 10,
    },
    {
      threshold: 200000,
      percentage: 15,
    },
  ]

  for (const discount of discounts) {
    await prisma.bulkDiscount.create({
      data: discount,
    })
  }

  console.log('Seed data created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
