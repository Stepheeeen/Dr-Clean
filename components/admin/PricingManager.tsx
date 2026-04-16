'use client'

import { useState, useTransition } from 'react'
import { Plus, X, Loader2, DollarSign, Tag } from 'lucide-react'
import { createPriceModifier, createBulkDiscount } from '@/lib/pricing-actions'
import { toast } from 'sonner'
import { ServicePricingCard } from '@/components/admin/ServicePricingCard'
import { ModifierPricingCard } from '@/components/admin/ModifierPricingCard'
import { BulkDiscountCard } from '@/components/admin/BulkDiscountCard'

interface PricingManagerProps {
  services: any[]
  modifiers: any[]
  bulkDiscounts: any[]
}

export function PricingManager({ services, modifiers, bulkDiscounts }: PricingManagerProps) {
  const [activeForm, setActiveForm] = useState<'modifier' | 'discount' | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleCreateModifier = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const values = {
      name: formData.get('name') as string,
      price: parseFloat(formData.get('price') as string),
      type: formData.get('type') as string,
    }

    startTransition(async () => {
      const res = await createPriceModifier(values)
      if (res.success) {
        toast.success(res.success)
        setActiveForm(null)
      } else toast.error(res.error)
    })
  }

  const handleCreateDiscount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const values = {
      threshold: parseFloat(formData.get('threshold') as string),
      percentage: parseFloat(formData.get('percentage') as string),
    }

    startTransition(async () => {
      const res = await createBulkDiscount(values)
      if (res.success) {
        toast.success(res.success)
        setActiveForm(null)
      } else toast.error(res.error)
    })
  }

  return (
    <div className="space-y-20 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
        <div>
          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-4 italic">Price Settings</h2>
          <h1 className="text-3xl md:text-5xl font-black text-foreground tracking-tighter uppercase leading-none">PRICING <br /><span className="font-light italic text-primary">SYSTEM</span>.</h1>
          <p className="mt-8 text-[11px] font-black text-muted-foreground uppercase tracking-[0.3em] italic leading-relaxed">
            Manage your service prices, extra charges, and customer discounts.
          </p>
        </div>
      </div>

      {/* Service Pricing Section */}
      <div className="border border-foreground bg-background overflow-hidden relative">
        <header className="px-6 md:px-10 py-6 border-b border-foreground bg-secondary/10 flex items-center justify-between">
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-foreground">Laundry Service Prices</h3>
            <p className="text-[8px] font-black uppercase tracking-[0.3em] text-muted-foreground mt-1">Base prices for laundry services</p>
          </div>
        </header>
        <div className="p-0 divide-y divide-foreground">
          {services.map((service) => (
            <ServicePricingCard key={service.id} service={service} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 border border-foreground">
        {/* Modifiers Section */}
        <section className="bg-background lg:border-r border-foreground">
          <header className="px-6 md:px-10 py-6 border-b border-foreground bg-secondary/10 flex items-center justify-between">
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-foreground">Price Modifiers (Extra Fees/Discounts)</h3>
            </div>
            <button 
              onClick={() => setActiveForm('modifier')}
              className="p-3 border border-foreground hover:bg-foreground hover:text-background transition-all"
            >
              <Plus size={14} />
            </button>
          </header>
          <div className="p-0 divide-y divide-foreground">
            {modifiers.map((modifier) => (
              <ModifierPricingCard key={modifier.id} modifier={modifier} />
            ))}
          </div>
        </section>

        {/* Discounts Section */}
        <section className="bg-background border-t lg:border-t-0 border-foreground">
          <header className="px-6 md:px-10 py-6 border-b border-foreground bg-secondary/10 flex items-center justify-between">
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-foreground">Bulk Discounts</h3>
            </div>
            <button 
              onClick={() => setActiveForm('discount')}
              className="p-3 border border-foreground hover:bg-foreground hover:text-background transition-all"
            >
              <Plus size={14} />
            </button>
          </header>
          <div className="p-0 divide-y divide-foreground">
            {bulkDiscounts.map((discount) => (
              <BulkDiscountCard key={discount.id} discount={discount} />
            ))}
          </div>
        </section>
      </div>

      {/* Modals */}
      {activeForm === 'modifier' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background/80 backdrop-blur-md animate-in fade-in duration-500">
          <div className="w-full max-w-lg bg-background border border-foreground p-10 relative">
            <button onClick={() => setActiveForm(null)} className="absolute top-8 right-8 p-2 border border-border hover:border-foreground transition-colors"><X size={18} /></button>
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-8 underline underline-offset-8">Add Price Modifier</h2>
            <form onSubmit={handleCreateModifier} className="space-y-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Modifier Name</label>
                <input name="name" required placeholder="E.G. EXPRESS DELIVERY" className="w-full bg-secondary/20 border border-foreground p-4 text-[10px] font-black uppercase tracking-[0.2em] focus:outline-none focus:bg-background transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Amount (₦)</label>
                  <input name="price" type="number" step="0.01" required placeholder="0.00" className="w-full bg-secondary/20 border border-foreground p-4 text-[10px] font-black uppercase tracking-[0.2em] focus:outline-none focus:bg-background transition-all" />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Modifier Type</label>
                  <select name="type" required className="w-full bg-secondary/20 border border-foreground p-4 text-[10px] font-black uppercase tracking-[0.2em] focus:outline-none focus:bg-background transition-all">
                    <option value="SURCHARGE">SURCHARGE</option>
                    <option value="DISCOUNT">DISCOUNT</option>
                  </select>
                </div>
              </div>
              <button disabled={isPending} className="w-full bg-foreground text-background py-5 text-[10px] font-black uppercase tracking-[0.5em] hover:bg-primary hover:text-white transition-all duration-700">
                {isPending ? <Loader2 size={16} className="animate-spin mx-auto" /> : 'Save Modifier'}
              </button>
            </form>
          </div>
        </div>
      )}

      {activeForm === 'discount' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background/80 backdrop-blur-md animate-in fade-in duration-500">
          <div className="w-full max-w-lg bg-background border border-foreground p-10 relative">
            <button onClick={() => setActiveForm(null)} className="absolute top-8 right-8 p-2 border border-border hover:border-foreground transition-colors"><X size={18} /></button>
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-8 underline underline-offset-8">Add Bulk Discount</h2>
            <form onSubmit={handleCreateDiscount} className="space-y-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Minimum Order Amount (₦)</label>
                <input name="threshold" type="number" step="0.01" required placeholder="0.00" className="w-full bg-secondary/20 border border-foreground p-4 text-[10px] font-black uppercase tracking-[0.2em] focus:outline-none focus:bg-background transition-all" />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Discount Percentage (%)</label>
                <input name="percentage" type="number" step="0.1" max="100" required placeholder="0%" className="w-full bg-secondary/20 border border-foreground p-4 text-[10px] font-black uppercase tracking-[0.2em] focus:outline-none focus:bg-background transition-all" />
              </div>
              <button disabled={isPending} className="w-full bg-foreground text-background py-5 text-[10px] font-black uppercase tracking-[0.5em] hover:bg-primary hover:text-white transition-all duration-700">
                {isPending ? <Loader2 size={16} className="animate-spin mx-auto" /> : 'Save Discount'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
