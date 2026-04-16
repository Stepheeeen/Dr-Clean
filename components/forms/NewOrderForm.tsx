'use client'

import { useState, useTransition } from 'react'
import { Check, ChevronRight, ChevronLeft, Loader2, Package, Calendar, MapPin, Calculator, Info } from 'lucide-react'
import { createOrder, initializePayment } from '@/lib/actions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { CreditCard, Wallet, Banknote } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

import { Service } from '@/types'

interface NewOrderFormProps {
  services: Service[]
  userId: string
  email: string
  bulkDiscounts?: any[]
}

export default function NewOrderForm({ services, userId, email, bulkDiscounts = [] }: NewOrderFormProps) {
  const [step, setStep] = useState(1)
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [itemSelections, setItemSelections] = useState<Record<string, { type: 'DryClean' | 'Ironing', quantity: number }>>({})
  const [notes, setNotes] = useState('')
  const [scheduledPickup, setScheduledPickup] = useState('')
  const [isUrgent, setIsUrgent] = useState(false)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const toggleItem = (id: string) => {
    setSelectedServices(prev => {
      const isSelected = prev.includes(id)
      if (isSelected) {
        const newSelected = prev.filter(s => s !== id)
        const newItemSelections = { ...itemSelections }
        delete newItemSelections[id]
        setItemSelections(newItemSelections)
        return newSelected
      } else {
        setItemSelections(prevSel => ({
          ...prevSel,
          [id]: { type: 'DryClean', quantity: 1 }
        }))
        return [...prev, id]
      }
    })
  }

  const updateSelection = (id: string, updates: Partial<{ type: 'DryClean' | 'Ironing', quantity: number }>) => {
    setItemSelections(prev => ({
      ...prev,
      [id]: { ...prev[id], ...updates }
    }))
  }

  const subtotal = selectedServices.reduce((sum, id) => {
    const service = services.find(s => s.id === id)
    const selection = itemSelections[id]
    if (!service || !selection) return sum
    const price = selection.type === 'DryClean' ? service.dryCleanPrice : service.ironingPrice
    return sum + price * selection.quantity
  }, 0)

  const activeDiscount = bulkDiscounts
    .filter(d => d.isActive && subtotal >= d.threshold)
    .sort((a, b) => b.threshold - a.threshold)[0]

  const discountAmount = activeDiscount ? (subtotal * (activeDiscount.percentage / 100)) : 0
  const subtotalAfterDiscount = subtotal - discountAmount

  const platformFee = subtotalAfterDiscount * 0.05
  const urgentFee = isUrgent ? (subtotalAfterDiscount * 0.15) : 0
  const total = subtotalAfterDiscount + platformFee + urgentFee

  const handleSubmit = () => {
    // 1. Clear any ghost toasts from previous interactions
    toast.dismiss()

    if (selectedServices.length === 0) {
      toast.error("PLEASE SELECT ITEMS FOR PROCESSING")
      return
    }

    if (scheduledPickup) {
      const pickupDate = new Date(scheduledPickup)
      const day = pickupDate.getDay()
      const hours = pickupDate.getHours()
      const minutes = pickupDate.getMinutes()
      const timeInMinutes = hours * 60 + minutes

      // Sunday restriction (0 is Sunday)
      if (day === 0) {
        toast.error("SUNDAYS ARE RESERVED FOR FACILITY MAINTENANCE. PLEASE SELECT ANOTHER DAY.")
        return
      }

      // Time restriction (8:30 AM = 510 mins, 8:00 PM = 1200 mins)
      if (timeInMinutes < 510 || timeInMinutes > 1200) {
        toast.error("RESTRICTED HOURS: PICKUP WINDOW IS 08:30 AM TO 08:00 PM.")
        return
      }
    }

    startTransition(async () => {
      const items = selectedServices.map(id => {
        const service = services.find(s => s.id === id)!
        const selection = itemSelections[id]
        const price = selection.type === 'DryClean' ? service.dryCleanPrice : service.ironingPrice
        return {
          name: service.name,
          price: price,
          quantity: selection.quantity,
          serviceType: selection.type
        }
      })

      const orderPromise = (async () => {
        // 1. Create the order
        const result = await createOrder({
          userId,
          notes,
          scheduledPickup: scheduledPickup ? new Date(scheduledPickup) : undefined,
          isUrgent,
          items
        })

        if (!result.success || !result.order) {
          throw new Error(result.error || "Failed to place order")
        }

        // 2. Initialize payment
        const payResult = await initializePayment(result.order.id, email)
        
        if (!payResult.success || !payResult.authorization_url) {
          throw new Error(payResult.error || "Payment initialization failed")
        }

        return payResult.authorization_url
      })()

      toast.promise(orderPromise, {
        loading: 'SECURING YOUR ORDER ARCHITECTURE...',
        success: (url) => {
          setTimeout(() => {
            window.location.href = url
          }, 1500)
          return 'ORDER VESTED. REDIRECTING TO SECURE PAYMENT...'
        },
        error: (err) => err.message || 'TRANSACTION PROTOCOL FAILED'
      })
    })
  }

  return (
    <div className="max-w-6xl mx-auto space-y-16 py-12 px-6">
      {/* Header - Architectural */}
      <div className="border-b border-border pb-12">
        <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-primary mb-6">Service Initiation</h2>
        <h1 className="text-5xl font-black text-foreground tracking-tighter uppercase leading-tight">
          NEW <span className="font-light italic text-primary">ORDER</span>.
        </h1>
      </div>

      {/* Stepper - Minimalist */}
      <div className="flex items-center justify-start space-x-12 border-b border-border pb-12 overflow-x-auto no-scrollbar">
        {[1, 2, 3].map((s) => (
          <button 
            key={s} 
            disabled={step < s}
            onClick={() => setStep(s)}
            className={`flex items-center gap-4 transition-all duration-500 whitespace-nowrap ${
              step === s ? 'opacity-100' : 'opacity-40 hover:opacity-100'
            }`}
          >
            <div className={`text-2xl font-black tracking-tighter ${step === s ? 'text-primary' : 'text-foreground'}`}>
              0{s}<span className="text-primary">.</span>
            </div>
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground">
              {s === 1 ? 'Item Selection' : s === 2 ? 'Service & Units' : 'Secure Payment'}
            </div>
          </button>
        ))}
      </div>

      {/* Step Content */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        {step === 1 && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => toggleItem(service.id)}
                  className={`flex flex-col text-left gap-6 p-10 bg-background transition-all duration-500 group ${
                    selectedServices.includes(service.id) ? 'bg-secondary/50' : 'hover:bg-secondary/30'
                  }`}
                >
                  <div className={`w-6 h-6 border border-border flex items-center justify-center transition-all duration-300 ${
                    selectedServices.includes(service.id) ? 'bg-primary border-primary text-white' : 'group-hover:border-primary'
                  }`}>
                    {selectedServices.includes(service.id) && <Check size={14} />}
                  </div>
                  <div className="flex-grow">
                    <p className="font-black text-foreground text-xl tracking-tighter uppercase group-hover:text-primary transition-colors">{service.name}</p>
                    <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mt-3 leading-relaxed opacity-70 italic">{service.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-16">
            <div className="space-y-8">
              <h3 className="text-xs font-black text-foreground tracking-[0.3em] uppercase border-b border-border pb-6">Service Assignment</h3>
              <div className="space-y-px bg-border">
                {selectedServices.map(id => {
                  const service = services.find(s => s.id === id)!
                  const selection = itemSelections[id]
                  return (
                    <div key={id} className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between p-8 md:p-12 bg-background gap-12">
                      <div className="lg:w-1/3">
                        <p className="font-black text-2xl text-foreground uppercase tracking-tighter">{service.name}</p>
                        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mt-2">Specify task for this item</p>
                      </div>

                      <div className="flex-grow grid grid-cols-2 gap-px bg-border border border-border">
                        {[
                          { type: 'DryClean', label: 'Complete Dry Cleaning', price: service.dryCleanPrice },
                          { type: 'Ironing', label: 'Ironing Only', price: service.ironingPrice }
                        ].map((opt) => (
                          <button
                            key={opt.type}
                            onClick={() => updateSelection(id, { type: opt.type as any })}
                            className={`p-6 flex flex-col items-center gap-3 transition-all duration-500 bg-background ${
                              selection.type === opt.type ? 'bg-secondary/80 outline outline-2 outline-primary outline-offset-[-2px]' : 'hover:bg-secondary/30'
                            }`}
                          >
                            <span className={`text-[9px] font-black uppercase tracking-[0.3em] ${selection.type === opt.type ? 'text-primary' : 'text-muted-foreground'}`}>{opt.label}</span>
                            <span className="text-sm font-black text-foreground tracking-tighter font-mono">{formatPrice(opt.price)}</span>
                          </button>
                        ))}
                      </div>

                      <div className="flex items-center justify-between lg:justify-end gap-10">
                        <div className="flex items-center gap-6">
                          <button 
                            onClick={() => updateSelection(id, { quantity: Math.max(1, selection.quantity - 1) })}
                            className="w-12 h-12 border border-border hover:border-primary hover:text-primary transition-all font-black text-xl"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-black text-foreground tracking-tighter text-2xl font-mono">{selection.quantity}</span>
                          <button 
                            onClick={() => updateSelection(id, { quantity: selection.quantity + 1 })}
                            className="w-12 h-12 border border-border hover:border-primary hover:text-primary transition-all font-black text-xl"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="max-w-3xl space-y-8">
              <h3 className="text-xs font-black text-foreground tracking-[0.3em] uppercase border-b border-border pb-6">Additional Notes</h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="E.G. REMOVE COFFEE STAIN FROM SHIRT, EXTRA CAREFULLY WITH THE SILK GOWN..."
                className="w-full px-8 py-6 border border-border bg-background text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-primary transition-all h-40 resize-none placeholder:opacity-30"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-12">
              <h3 className="text-xs font-black text-foreground tracking-[0.3em] uppercase border-b border-border pb-6">Summary & Logistics</h3>
              
              <div className="space-y-10">
                <div className="space-y-6">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Scheduled Pickup</p>
                  <div className="relative group">
                    <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={16} />
                    <input
                      type="datetime-local"
                      value={scheduledPickup}
                      onChange={(e) => setScheduledPickup(e.target.value)}
                      className="w-full pl-16 pr-8 py-5 border border-border bg-background text-[10px] font-black uppercase tracking-[0.3em] focus:outline-none focus:border-primary transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Delivery Priority</p>
                  <button 
                    onClick={() => setIsUrgent(!isUrgent)}
                    className={`w-full p-8 border transition-all duration-500 flex items-center justify-between group ${
                      isUrgent ? 'bg-primary/10 border-primary' : 'bg-background border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center gap-6">
                      <div className={`w-6 h-6 border flex items-center justify-center transition-all ${
                        isUrgent ? 'bg-primary border-primary text-white' : 'border-border group-hover:border-primary'
                      }`}>
                        {isUrgent && <Check size={14} />}
                      </div>
                      <div className="text-left">
                        <p className={`text-[11px] font-black uppercase tracking-[0.2em] ${isUrgent ? 'text-primary' : 'text-foreground'}`}>URGENT DELIVERY PROTOCOL</p>
                        <p className="text-[9px] text-muted-foreground font-black uppercase tracking-[0.1em] mt-1">24-hour priority processing (15% surcharge)</p>
                      </div>
                    </div>
                  </button>
                </div>

                <div className="space-y-6">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Payment Protocol</p>
                  <div className="p-10 border border-primary/20 bg-primary/5 flex items-center gap-6">
                    <CreditCard className="text-primary shrink-0" size={32} />
                    <div>
                      <p className="text-[11px] font-black text-primary uppercase tracking-[0.2em]">SECURE ONLINE PAYMENT</p>
                      <p className="text-[9px] text-primary/70 font-black uppercase tracking-[0.1em] mt-1">Processed securely via Paystack</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-12">
              <h3 className="text-xs font-black text-foreground tracking-[0.3em] uppercase border-b border-border pb-6">Order Quote</h3>
              <div className="border border-border p-10 space-y-10 bg-background">
                <div className="space-y-6">
                  {selectedServices.map(id => {
                    const service = services.find(s => s.id === id)!
                    const selection = itemSelections[id]
                    const price = selection.type === 'DryClean' ? service.dryCleanPrice : service.ironingPrice
                    return (
                      <div key={id} className="flex flex-col gap-2">
                         <div className="flex justify-between items-baseline">
                          <span className="text-[10px] font-black text-foreground uppercase tracking-widest">{selection.quantity}X {service.name}</span>
                          <span className="font-black text-foreground tracking-tighter uppercase">{formatPrice(price * selection.quantity)}</span>
                        </div>
                        <span className="text-[8px] font-black text-primary uppercase tracking-widest">{selection.type === 'DryClean' ? 'Complete Dry Clean' : 'Ironing Only'}</span>
                      </div>
                    )
                  })}
                </div>
                
                <div className="pt-10 border-t border-border space-y-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Subtotal</span>
                    <span className="font-black text-foreground tracking-tighter uppercase">{formatPrice(subtotal)}</span>
                  </div>
                  {activeDiscount && (
                    <div className="flex justify-between items-baseline text-emerald-500">
                      <span className="text-[10px] font-black uppercase tracking-widest">Bulk Discount ({activeDiscount.percentage}%)</span>
                      <span className="font-black tracking-tighter uppercase">-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  {isUrgent && (
                    <div className="flex justify-between items-baseline text-primary">
                      <span className="text-[10px] font-black uppercase tracking-widest">Urgent Surcharge (15%)</span>
                      <span className="font-black tracking-tighter uppercase">{formatPrice(urgentFee)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-baseline text-primary">
                    <span className="text-[10px] font-black uppercase tracking-widest">Digital Service Fee (5%)</span>
                    <span className="font-black tracking-tighter uppercase">{formatPrice(platformFee)}</span>
                  </div>
                  <div className="pt-10 flex justify-between items-baseline">
                    <span className="text-xs font-black text-foreground uppercase tracking-[0.3em]">Total Settlement</span>
                    <span className="text-4xl font-black text-primary tracking-tighter uppercase">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Navigation - Architectural */}
      <div className="mt-20 pt-12 border-t border-border flex items-center justify-between gap-12">
        {step > 1 ? (
          <button
            onClick={() => setStep(prev => prev - 1)}
            className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground hover:text-foreground transition-all flex items-center gap-4 group"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
            Go Back
          </button>
        ) : (
          <button
            onClick={() => router.back()}
            className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground hover:text-red-600 transition-all"
          >
            Cancel Order
          </button>
        )}

        <div className="flex-grow h-px bg-border/50"></div>

        {step < 3 ? (
          <button
            onClick={() => {
              if (step === 1 && selectedServices.length === 0) {
                toast.error("Please select items to be handled")
                return
              }
              setStep(prev => prev + 1)
            }}
            className="bg-foreground text-background px-16 py-6 font-black uppercase tracking-[0.4em] text-xs hover:bg-primary hover:text-white transition-all duration-500 flex items-center gap-4 group"
          >
            Next Step
            <ChevronRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="bg-primary text-white px-20 py-6 font-black uppercase tracking-[0.4em] text-xs hover:bg-foreground transition-all duration-500 flex items-center gap-6 disabled:opacity-50"
          >
            {isPending ? <Loader2 className="animate-spin" size={20} /> : (
              <>
                <CreditCard size={20} />
                Confirm & Pay
              </>
            )}
          </button>
        )}
      </div>
    </div>
  )
}
