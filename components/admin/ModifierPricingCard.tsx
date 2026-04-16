"use client"

import { useState } from "react"
import { updatePriceModifier, deletePriceModifier } from "@/lib/pricing-actions"
import { formatPrice } from "@/lib/utils"
import { toast } from "sonner"
import { Loader2, Trash2 } from "lucide-react"

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
    const res = await updatePriceModifier({
      id: modifier.id,
      price: parseFloat(price),
    })
    setIsPending(false)

    if (res.success) {
      toast.success(res.success)
      setIsEditing(false)
    } else {
      toast.error(res.error)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this modifier?")) return
    setIsPending(true)
    const res = await deletePriceModifier(modifier.id)
    setIsPending(false)
    if (res.success) toast.success(res.success)
    else toast.error(res.error)
  }

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between p-8 border border-foreground bg-background hover:bg-secondary/10 transition-all duration-500 group">
      <div className="flex-1 mb-6 md:mb-0">
        <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-2 italic">{modifier.type} PROTOCOL</p>
        <p className="text-xl font-black text-foreground uppercase tracking-tight group-hover:text-primary transition-colors">{modifier.name}</p>
        <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] mt-3 italic line-clamp-1">{modifier.description}</p>
      </div>

      <div className="flex items-center gap-8">
        {isEditing ? (
          <div className="flex items-center gap-6">
            <div className="relative group/input">
              {modifier.valueType === "FIXED" && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 text-muted-foreground text-[10px] font-black">₦</span>
              )}
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={`pr-4 py-2 bg-transparent border-b border-border focus:border-foreground text-sm font-black outline-none transition-all w-32 uppercase tracking-widest ${
                  modifier.valueType === "FIXED" ? "pl-6" : "pl-0"
                }`}
                placeholder="0.00"
              />
              {modifier.valueType === "PERCENTAGE" && (
                <span className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground text-[10px] font-black">%</span>
              )}
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleSave}
                disabled={isPending}
                className="bg-foreground text-background px-8 py-3 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-primary hover:text-white transition-all duration-500 disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {isPending && <Loader2 className="w-3 h-3 animate-spin" />}
                Commit
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors"
              >
                Void
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-8">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-foreground tracking-tighter uppercase font-mono">
                {modifier.valueType === "FIXED" 
                  ? formatPrice(modifier.price) 
                  : `${modifier.price}%`}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsEditing(true)}
                className="border border-foreground px-8 py-3 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-foreground hover:text-background transition-all duration-500"
              >
                Modify
              </button>
              <button
                onClick={handleDelete}
                disabled={isPending}
                className="w-12 h-12 border border-border flex items-center justify-center text-red-600 hover:bg-red-600 hover:text-white transition-all duration-500"
              >
                {isPending ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
