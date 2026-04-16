'use server'

import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function getSettings() {
  try {
    const settings = await prisma.settings.findUnique({
      where: { key: 'global' }
    })
    return settings
  } catch (error) {
    console.error('Error fetching settings:', error)
    return null
  }
}

export async function updateSettings(data: any) {
  try {
    const settings = await prisma.settings.upsert({
      where: { key: 'global' },
      update: {
        ...data,
        updatedAt: new Date()
      },
      create: {
        key: 'global',
        ...data
      }
    })

    revalidatePath('/admin/settings')
    revalidatePath('/')
    return { success: true, settings }
  } catch (error) {
    console.error('Error updating settings:', error)
    return { success: false, error: 'Failed to update settings' }
  }
}
