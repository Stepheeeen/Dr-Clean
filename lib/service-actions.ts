"use server"

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { Service } from "@/types"
import { isAdmin } from "@/lib/auth-utils"

const ServiceUpdateSchema = z.object({
  id: z.string(),
  dryCleanPrice: z.number().min(0, "Price must be positive"),
  ironingPrice: z.number().min(0, "Price must be positive"),
  isActive: z.boolean().optional(),
})

const ServiceCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  dryCleanPrice: z.number().min(0, "Price must be positive"),
  ironingPrice: z.number().min(0, "Price must be positive"),
  category: z.string().min(1, "Category is required"),
})

export async function createService(values: z.infer<typeof ServiceCreateSchema>) {
  if (!(await isAdmin())) return { error: "Unauthorized" }
  
  const validatedFields = ServiceCreateSchema.safeParse(values)
  if (!validatedFields.success) return { error: "Invalid fields!" }

  try {
    await prisma.service.create({
      data: validatedFields.data
    })
    
    revalidatePath("/admin/services")
    revalidatePath("/admin/pricing")
    revalidatePath("/services")
    return { success: "Service created successfully!" }
  } catch (error) {
    return { error: "Failed to create service." }
  }
}

export async function deleteService(id: string) {
  if (!(await isAdmin())) return { error: "Unauthorized" }
  
  try {
    await prisma.service.delete({
      where: { id }
    })
    
    revalidatePath("/admin/services")
    revalidatePath("/admin/pricing")
    revalidatePath("/services")
    return { success: "Service deleted successfully!" }
  } catch (error) {
    return { error: "Failed to delete service." }
  }
}

export async function updateService(values: z.infer<typeof ServiceUpdateSchema>) {
  if (!(await isAdmin())) return { error: "Unauthorized" }
  const validatedFields = ServiceUpdateSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid fields!" }
  }

  const { id, dryCleanPrice, ironingPrice, isActive } = validatedFields.data

  try {
    await prisma.service.update({
      where: { id },
      data: {
        dryCleanPrice,
        ironingPrice,
        isActive: isActive !== undefined ? isActive : undefined,
      },
    })

    revalidatePath("/admin/services")
    revalidatePath("/admin/pricing")
    revalidatePath("/pricing")
    revalidatePath("/services")
    
    return { success: "Service updated successfully!" }
  } catch (error) {
    return { error: "Failed to update service." }
  }
}

export async function toggleServiceStatus(id: string, currentStatus: boolean) {
  if (!(await isAdmin())) return { error: "Unauthorized" }
  
  try {
    await prisma.service.update({
      where: { id },
      data: { isActive: !currentStatus }
    })
    
    revalidatePath("/admin/services")
    return { success: "Status updated!" }
  } catch (error) {
    return { error: "Failed to toggle status." }
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
