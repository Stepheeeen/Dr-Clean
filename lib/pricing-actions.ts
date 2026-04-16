"use server"

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { isAdmin } from "@/lib/auth-utils"

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
  if (!(await isAdmin())) return { error: "Unauthorized" }

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
  if (!(await isAdmin())) return { error: "Unauthorized" }
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

const ModifierCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().min(0, "Price must be positive"),
  type: z.enum(["SURCHARGE", "DISCOUNT"]),
})

const DiscountCreateSchema = z.object({
  threshold: z.number().min(0, "Threshold must be positive"),
  percentage: z.number().min(0).max(100, "Percentage must be between 0 and 100"),
})

export async function createPriceModifier(values: z.infer<typeof ModifierCreateSchema>) {
  if (!(await isAdmin())) return { error: "Unauthorized" }
  
  const validatedFields = ModifierCreateSchema.safeParse(values)
  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors.name?.[0] || "Invalid fields!" }
  }

  try {
    await prisma.priceModifier.create({
      data: {
        name: validatedFields.data.name,
        price: validatedFields.data.price,
        type: validatedFields.data.type as any, // Cast to match Prisma enum
        valueType: "FIXED", // Default value for now
      }
    })
    
    revalidatePath("/admin/pricing")
    return { success: "Modifier created!" }
  } catch (error) {
    console.error("[CREATE_MODIFIER_ERROR]", error)
    return { error: "Failed to create modifier. Check if the name is already in use." }
  }
}

export async function createBulkDiscount(values: z.infer<typeof DiscountCreateSchema>) {
  if (!(await isAdmin())) return { error: "Unauthorized" }
  
  const validatedFields = DiscountCreateSchema.safeParse(values)
  if (!validatedFields.success) return { error: "Invalid fields!" }

  try {
    await prisma.bulkDiscount.create({
      data: validatedFields.data
    })
    
    revalidatePath("/admin/pricing")
    return { success: "Discount created!" }
  } catch (error) {
    console.error("[CREATE_DISCOUNT_ERROR]", error)
    return { error: "Failed to create discount. Check if the threshold is already defined." }
  }
}

export async function deletePriceModifier(id: string) {
  if (!(await isAdmin())) return { error: "Unauthorized" }
  try {
    await prisma.priceModifier.delete({ where: { id } })
    revalidatePath("/admin/pricing")
    return { success: "Modifier deleted!" }
  } catch (error) {
    return { error: "Failed to delete modifier." }
  }
}

export async function deleteBulkDiscount(id: string) {
  if (!(await isAdmin())) return { error: "Unauthorized" }
  try {
    await prisma.bulkDiscount.delete({ where: { id } })
    revalidatePath("/admin/pricing")
    return { success: "Discount deleted!" }
  } catch (error) {
    return { error: "Failed to delete discount." }
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
