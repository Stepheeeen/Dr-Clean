import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Clearing old data...')
  await prisma.service.deleteMany()
  
  console.log('Seeding data...')

  // Seed Item-based Services
  const services = [
    {
      name: 'Shirt',
      description: 'Standard cotton or formal shirts',
      dryCleanPrice: 2000,
      ironingPrice: 500,
      category: 'Clothing',
    },
    {
      name: 'Gown',
      description: 'Elegant gowns or long dresses',
      dryCleanPrice: 5000,
      ironingPrice: 1500,
      category: 'Clothing',
    },
    {
      name: 'Trousers',
      description: 'Chinos, jeans, or formal trousers',
      dryCleanPrice: 1500,
      ironingPrice: 500,
      category: 'Clothing',
    },
    {
      name: 'Suit Set',
      description: 'Full suit including jacket and trousers',
      dryCleanPrice: 8000,
      ironingPrice: 2500,
      category: 'Clothing',
    },
    {
      name: 'Bedding Set',
      description: 'Bedsheet and pillowcases',
      dryCleanPrice: 4000,
      ironingPrice: 1000,
      category: 'Household',
    },
  ]

  for (const service of services) {
    await prisma.service.upsert({
      where: { name: service.name },
      update: service,
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
    await prisma.priceModifier.upsert({
      where: { name: modifier.name },
      update: modifier,
      create: modifier,
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
    await prisma.bulkDiscount.upsert({
      where: { threshold: discount.threshold },
      update: discount,
      create: discount,
    })
  }

  // Seed Global Settings
  await prisma.settings.upsert({
    where: { key: 'global' },
    update: {},
    create: {
      key: 'global',
      heroHeadline: 'Premium Laundry Care Delivered',
      heroSubheadline: 'Professional cleaning with convenient pickup and delivery service',
      aboutHeadline: 'About Dr. Clean',
      aboutDescription: 'With over 10 years of experience in professional laundry care, Dr. Clean has become the trusted choice for busy professionals and families. We combine traditional cleaning expertise with modern convenience.',
      phone: '+234 (800) 000-0000',
      email: 'hello@dr-clean.com.ng',
      address: 'Lagos & Abuja, Nigeria',
      businessHours: {
        Monday: { open: '07:00', close: '19:00' },
        Tuesday: { open: '07:00', close: '19:00' },
        Wednesday: { open: '07:00', close: '19:00' },
        Thursday: { open: '07:00', close: '19:00' },
        Friday: { open: '07:00', close: '19:00' },
        Saturday: { open: '08:00', close: '17:00' },
        Sunday: { open: '00:00', close: '00:00' },
      }
    }
  })

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
