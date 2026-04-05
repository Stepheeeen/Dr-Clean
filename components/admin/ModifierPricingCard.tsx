"use client"

import { useState } from "react"
import { updatePriceModifier } from "@/lib/pricing-actions"
import { formatPrice } from "@/lib/utils"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

interface ModifierPricingCardProps {
  modifier: {
    id: string
    name: string
    description: string | null
    price: number
    type: "SURCHARGE" | "DISCOUNT"
    valueType: "FIXED" | "PERCENTAGE"
  }
}

export function ModifierPricingCard({ modifier }: ModifierPricingCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [price, setPrice] = useState(modifier.price.toString())
  const [isPending, setIsPending] = useState(false)

  const handleSave = async () => {
    setIsPending(true)
    const result = await updatePriceModifier({
      id: modifier.id,
      price: parseFloat(price),
    })
    setIsPending(false)

    if (result.success) {
      toast.success("Modifier updated successfully")
      setIsEditing(false)
    } else {
      toast.error(result.error || "Failed to update modifier")
    }
  }

  return (
    <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-card hover:border-primary/30 transition-colors">
      <div className="flex-1">
        <p className="font-semibold text-foreground">{modifier.name}</p>
        <p className="text-sm text-muted-foreground">{modifier.description}</p>
      </div>

      <div className="flex items-center gap-4">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {modifier.valueType === "FIXED" ? "₦" : ""}
              </span>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={`pr-3 py-2 border border-border rounded-lg w-32 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all ${
                  modifier.valueType === "FIXED" ? "pl-7" : "px-3"
                }`}
                placeholder="0.00"
              />
              {modifier.valueType === "PERCENTAGE" && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
              )}
            </div>
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
              <span className="text-xl font-bold text-primary">
                {modifier.valueType === "FIXED" 
                  ? formatPrice(modifier.price) 
                  : `${modifier.price}%`}
              </span>
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
