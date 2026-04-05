"use client"

import { useState } from "react"
import { updateBulkDiscount } from "@/lib/pricing-actions"
import { formatPrice } from "@/lib/utils"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

interface BulkDiscountCardProps {
  discount: {
    id: string
    threshold: number
    percentage: number
  }
}

export function BulkDiscountCard({ discount }: BulkDiscountCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [threshold, setThreshold] = useState(discount.threshold.toString())
  const [percentage, setPercentage] = useState(discount.percentage.toString())
  const [isPending, setIsPending] = useState(false)

  const handleSave = async () => {
    setIsPending(true)
    const result = await updateBulkDiscount({
      id: discount.id,
      threshold: parseFloat(threshold),
      percentage: parseFloat(percentage),
    })
    setIsPending(false)

    if (result.success) {
      toast.success("Discount updated successfully")
      setIsEditing(false)
    } else {
      toast.error(result.error || "Failed to update discount")
    }
  }

  return (
    <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-card hover:border-primary/30 transition-colors">
      <div className="flex-1">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Orders over</span>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₦</span>
              <input
                type="number"
                value={threshold}
                onChange={(e) => setThreshold(e.target.value)}
                className="pl-7 pr-3 py-2 border border-border rounded-lg w-40 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              />
            </div>
          </div>
        ) : (
          <p className="font-semibold text-foreground">
            Orders over <span className="text-primary">{formatPrice(discount.threshold)}</span>
          </p>
        )}
      </div>

      <div className="flex items-center gap-4">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="number"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                className="px-3 py-2 border border-border rounded-lg w-20 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
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
              <span className="text-xl font-bold text-primary">{discount.percentage}%</span>
              <span className="text-muted-foreground text-sm flex items-center">OFF</span>
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
