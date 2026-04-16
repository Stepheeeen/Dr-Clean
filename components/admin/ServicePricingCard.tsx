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
  const [dryCleanPrice, setDryCleanPrice] = useState(service.dryCleanPrice.toString())
  const [ironingPrice, setIroningPrice] = useState(service.ironingPrice.toString())
  const [isPending, setIsPending] = useState(false)

  const handleSave = async () => {
    setIsPending(true)
    const result = await updateService({
      id: service.id,
      dryCleanPrice: parseFloat(dryCleanPrice),
      ironingPrice: parseFloat(ironingPrice),
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
    <div className="flex flex-col md:flex-row md:items-center justify-between p-8 border border-foreground bg-background hover:bg-secondary/10 transition-all duration-500 group">
      <div className="flex-1 mb-6 md:mb-0">
        <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-2 italic">Service Identifier</p>
        <p className="text-xl font-black text-foreground uppercase tracking-tight group-hover:text-primary transition-colors">{service.name}</p>
        <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] mt-3 italic line-clamp-1">{service.description}</p>
      </div>

      <div className="flex items-center gap-8">
        {isEditing ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-6">
                <span className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em] w-24">Dry Clean</span>
                <div className="relative group/input">
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 text-muted-foreground text-[10px] font-black">₦</span>
                  <input
                    type="number"
                    value={dryCleanPrice}
                    onChange={(e) => setDryCleanPrice(e.target.value)}
                    className="pl-6 pr-4 py-2 bg-transparent border-b border-border focus:border-foreground text-sm font-black outline-none transition-all w-32 uppercase tracking-widest"
                  />
                </div>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em] w-24">Ironing Only</span>
                <div className="relative group/input">
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 text-muted-foreground text-[10px] font-black">₦</span>
                  <input
                    type="number"
                    value={ironingPrice}
                    onChange={(e) => setIroningPrice(e.target.value)}
                    className="pl-6 pr-4 py-2 bg-transparent border-b border-border focus:border-foreground text-sm font-black outline-none transition-all w-32 uppercase tracking-widest"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <button
                onClick={handleSave}
                disabled={isPending}
                className="flex-1 sm:flex-none bg-foreground text-background px-8 py-3 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-primary hover:text-white transition-all duration-500 disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {isPending && <Loader2 className="w-3 h-3 animate-spin" />}
                Commit
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 sm:flex-none text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors"
              >
                Void
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4 text-right">
              <div className="space-y-1">
                <p className="text-[8px] font-black text-muted-foreground uppercase tracking-[0.3em]">Dry Clean</p>
                <p className="text-xl font-black text-foreground tracking-tighter uppercase">{formatPrice(service.dryCleanPrice)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[8px] font-black text-muted-foreground uppercase tracking-[0.3em]">Ironing Only</p>
                <p className="text-xl font-black text-foreground tracking-tighter uppercase">{formatPrice(service.ironingPrice)}</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="border border-foreground px-8 py-3 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-foreground hover:text-background transition-all duration-500"
            >
              Modify
            </button>
          </>
        )}
      </div>
    </div>
  )
}
