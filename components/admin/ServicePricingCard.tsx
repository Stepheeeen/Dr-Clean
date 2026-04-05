"use client"

import { useState } from "react"
import { updateService } from "@/lib/service-actions"
import { formatPrice } from "@/lib/utils"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

import { Service } from "@/types"

interface ServicePricingCardProps {
  service: Service
}

export function ServicePricingCard({ service }: ServicePricingCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [price, setPrice] = useState(service.price.toString())
  const [unit, setUnit] = useState(service.unit)
  const [isPending, setIsPending] = useState(false)

  const handleSave = async () => {
    setIsPending(true)
    const result = await updateService({
      id: service.id,
      price: parseFloat(price),
      unit: unit,
    })
    setIsPending(false)

    if (result.success) {
      toast.success("Service updated successfully")
      setIsEditing(false)
    } else {
      toast.error(result.error || "Failed to update service")
    }
  }

  return (
    <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-card hover:border-primary/30 transition-colors">
      <div className="flex-1">
        <p className="font-semibold text-foreground">{service.name}</p>
        <p className="text-sm text-muted-foreground">{service.description}</p>
      </div>

      <div className="flex items-center gap-4">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₦</span>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="pl-7 pr-3 py-2 border border-border rounded-lg w-32 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                placeholder="0.00"
              />
            </div>
            <span className="text-muted-foreground">/</span>
            <input
              type="text"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg w-20 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              placeholder="unit"
            />
            <button
              onClick={handleSave}
              disabled={isPending}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 flex items-center gap-2"
            >
              {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="text-muted-foreground hover:text-foreground font-medium px-2"
            >
              Cancel
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-primary">{formatPrice(service.price)}</span>
              <span className="text-muted-foreground text-sm">/{service.unit}</span>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="text-primary hover:text-primary/80 font-semibold px-4 py-2"
            >
              Edit
            </button>
          </>
        )}
      </div>
    </div>
  )
}
