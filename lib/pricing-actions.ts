"use server"

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const ModifierUpdateSchema = z.object({
  id: z.string(),
  price: z.number().min(0),
  isActive: z.boolean().optional(),
})

const BulkDiscountUpdateSchema = z.object({
  id: z.string(),
  threshold: z.number().min(0),
  percentage: z.number().min(0).max(100),
  isActive: z.boolean().optional(),
})

export async function updatePriceModifier(values: z.infer<typeof ModifierUpdateSchema>) {
  const validatedFields = ModifierUpdateSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid fields!" }
  }

  const { id, price, isActive } = validatedFields.data

  try {
    await prisma.priceModifier.update({
      where: { id },
      data: {
        price,
        isActive: isActive !== undefined ? isActive : undefined,
      },
    })

    revalidatePath("/admin/pricing")
    return { success: "Modifier updated!" }
  } catch (error) {
    return { error: "Failed to update modifier." }
  }
}

export async function updateBulkDiscount(values: z.infer<typeof BulkDiscountUpdateSchema>) {
  const validatedFields = BulkDiscountUpdateSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid fields!" }
  }

  const { id, threshold, percentage, isActive } = validatedFields.data

  try {
    await prisma.bulkDiscount.update({
      where: { id },
      data: {
        threshold,
        percentage,
        isActive: isActive !== undefined ? isActive : undefined,
      },
    })

    revalidatePath("/admin/pricing")
    return { success: "Bulk discount updated!" }
  } catch (error) {
    return { error: "Failed to update bulk discount." }
  }
}

export async function getPricingData() {
  try {
    const [modifiers, bulkDiscounts] = await Promise.all([
      prisma.priceModifier.findMany(),
      prisma.bulkDiscount.findMany({ orderBy: { threshold: "asc" } })
    ])
    return { modifiers, bulkDiscounts }
  } catch (error) {
    return { modifiers: [], bulkDiscounts: [] }
  }
}
