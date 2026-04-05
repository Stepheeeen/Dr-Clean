"use server"

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { Service } from "@/types"

const ServiceUpdateSchema = z.object({
  id: z.string(),
  price: z.number().min(0, "Price must be positive"),
  unit: z.string().min(1, "Unit is required"),
  isActive: z.boolean().optional(),
})

export async function updateService(values: z.infer<typeof ServiceUpdateSchema>) {
  const validatedFields = ServiceUpdateSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid fields!" }
  }

  const { id, price, unit, isActive } = validatedFields.data

  try {
    await prisma.service.update({
      where: { id },
      data: {
        price,
        unit,
        isActive: isActive !== undefined ? isActive : undefined,
      },
    })

    revalidatePath("/admin/pricing")
    revalidatePath("/pricing")
    revalidatePath("/services")
    
    return { success: "Service updated successfully!" }
  } catch (error) {
    return { error: "Failed to update service." }
  }
}

export async function getServices(): Promise<Service[]> {
  try {
    const services = await prisma.service.findMany({
      orderBy: { category: "asc" }
    })
    return services as Service[]
  } catch (error) {
    return []
  }
}
