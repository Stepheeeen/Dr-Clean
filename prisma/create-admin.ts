import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = 'admin@drclean.com.ng'
  const password = 'AdminSecurePassword2026!'
  const name = 'Dr. Clean Administrator'

  console.log('--- ADMINISTRATIVE PROVISIONING ---')
  console.log(`Target Email: ${email}`)

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const admin = await prisma.user.upsert({
      where: { email },
      update: {
        role: 'ADMIN',
        password: hashedPassword,
        name,
      },
      create: {
        email,
        name,
        password: hashedPassword,
        role: 'ADMIN',
      },
    })

    console.log('-----------------------------------')
    console.log('SUCCESS: Administrative account provisioned.')
    console.log(`ID: ${admin.id}`)
    console.log(`EMAIL: ${email}`)
    console.log(`PASSWORD: ${password}`)
    console.log('-----------------------------------')
    console.log('Use these credentials to access the /admin portal.')
  } catch (error) {
    console.error('FAILED: Could not provision admin account.', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
