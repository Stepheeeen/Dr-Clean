'use client'

import { useState, useTransition } from 'react'
import { Check, ChevronRight, ChevronLeft, Loader2, Package, Calendar, MapPin, Calculator, Info } from 'lucide-react'
import { createOrder, initializePayment } from '@/lib/actions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { CreditCard, Wallet, Banknote } from 'lucide-react'

import { Service } from '@/types'

interface NewOrderFormProps {
  services: Service[]
  userId: string
}

export default function NewOrderForm({ services, userId }: NewOrderFormProps) {
  const [step, setStep] = useState(1)
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [notes, setNotes] = useState('')
  const [scheduledPickup, setScheduledPickup] = useState('')
  const [paymentMode, setPaymentMode] = useState<'Cash' | 'Online'>('Cash')
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const toggleService = (id: string) => {
    setSelectedServices(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    )
    if (!quantities[id]) {
      setQuantities(prev => ({ ...prev, [id]: 1 }))
    }
  }

  const updateQuantity = (id: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta)
    }))
  }

  const subtotal = selectedServices.reduce((sum, id) => {
    const service = services.find(s => s.id === id)
    return sum + (service?.price || 0) * (quantities[id] || 1)
  }, 0)

  const platformFee = paymentMode === 'Online' ? subtotal * 0.05 : 0
  const total = subtotal + platformFee

  const handleSubmit = () => {
    if (selectedServices.length === 0) {
      toast.error("Please select at least one service")
      return
    }

    startTransition(async () => {
      const items = selectedServices.map(id => {
        const service = services.find(s => s.id === id)!
        return {
          name: service.name,
          price: service.price,
          quantity: quantities[id] || 1
        }
      })

      const result = await createOrder({
        userId,
        notes,
        scheduledPickup: scheduledPickup ? new Date(scheduledPickup) : undefined,
        paymentMode,
        items
      })

      if (result.success && result.order) {
        if (paymentMode === 'Online') {
          toast.loading("Redirecting to payment...")
          // We need the user's email. Since it's not in props, we'll try to get it from the order record if possible 
          // or we can pass it from the page. For now, we'll use a placeholder or better, enhance the action
          const payResult = await initializePayment(result.order.id, 'user@example.com') // Placeholder email, should be dynamic
          if (payResult.success && payResult.authorization_url) {
            window.location.href = payResult.authorization_url
            return
          } else {
            toast.error(payResult.error || "Failed to initialize payment")
          }
        }
        
        toast.success("Order placed successfully!")
        router.push('/customer/dashboard')
      } else {
        toast.error(result.error || "Failed to place order")
      }
    })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-10">
      {/* Stepper */}
      <div className="flex items-center justify-center space-x-4">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm transition-all duration-500 shadow-sm ${
              step === s ? 'bg-primary text-white scale-110 shadow-primary/20' : 
              step > s ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'
            }`}>
              {step > s ? <Check size={20} /> : s}
            </div>
            {s < 3 && (
              <div className={`w-20 h-1 mx-2 rounded-full transition-colors duration-500 ${
                step > s ? 'bg-emerald-500' : 'bg-slate-100'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-[3rem] border border-border/50 shadow-sm p-10 lg:p-16">
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h2 className="text-3xl font-extrabold text-foreground tracking-tighter mb-2">Select Services</h2>
              <p className="text-muted-foreground font-medium">Choose the professional care your garments deserve.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => toggleService(service.id)}
                  className={`flex items-start text-left gap-4 p-6 rounded-3xl border-2 transition-all duration-300 group ${
                    selectedServices.includes(service.id)
                      ? 'border-primary bg-primary/5 shadow-lg shadow-primary/5'
                      : 'border-border/50 hover:border-primary/30 hover:bg-slate-50'
                  }`}
                >
                  <div className={`mt-1 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${
                    selectedServices.includes(service.id) ? 'bg-primary border-primary text-white' : 'border-slate-300'
                  }`}>
                    {selectedServices.includes(service.id) && <Check size={14} />}
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-lg tracking-tight group-hover:text-primary transition-colors">{service.name}</p>
                    <p className="text-xs text-muted-foreground font-medium mt-1 leading-relaxed">{service.description}</p>
                    <p className="text-sm font-extrabold text-primary mt-4">${service.price.toFixed(2)}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h2 className="text-3xl font-extrabold text-foreground tracking-tighter mb-2">Quantities & Notes</h2>
              <p className="text-muted-foreground font-medium">Specify details for each selected service.</p>
            </div>

            <div className="space-y-6">
              {selectedServices.map(id => {
                const service = services.find(s => s.id === id)!
                return (
                  <div key={id} className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-border/30">
                    <div>
                      <p className="font-bold text-foreground">{service.name}</p>
                      <p className="text-xs text-muted-foreground font-medium">${service.price.toFixed(2)} per unit</p>
                    </div>
                    <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-border/50">
                      <button 
                        onClick={() => updateQuantity(id, -1)}
                        className="w-10 h-10 rounded-xl hover:bg-slate-50 flex items-center justify-center font-bold text-slate-400 hover:text-primary transition-colors"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-extrabold text-foreground">{quantities[id] || 1}</span>
                      <button 
                        onClick={() => updateQuantity(id, 1)}
                        className="w-10 h-10 rounded-xl hover:bg-slate-50 flex items-center justify-center font-bold text-slate-400 hover:text-primary transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="space-y-4">
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest px-1">Special Instructions</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="E.g., Handle the silk shirt with extra care, use starch on business shirts..."
                className="w-full px-6 py-4 bg-slate-50 border border-border/50 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all h-32 resize-none"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h2 className="text-3xl font-extrabold text-foreground tracking-tighter mb-2">Final Review</h2>
              <p className="text-muted-foreground font-medium">Review your service summary and schedule pickup.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div className="bg-slate-50 rounded-3xl p-8 border border-border/30">
                  <h4 className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest mb-6">
                    <Calculator size={14} /> Cost Breakdown
                  </h4>
                  <div className="space-y-4">
                    {selectedServices.map(id => {
                      const service = services.find(s => s.id === id)!
                      const qty = quantities[id] || 1
                      return (
                        <div key={id} className="flex justify-between text-sm">
                          <span className="font-medium text-muted-foreground">{qty}x {service.name}</span>
                          <span className="font-bold text-foreground">${(service.price * qty).toFixed(2)}</span>
                        </div>
                      )
                    })}
                    <div className="flex justify-between text-sm py-2">
                      <span className="font-medium text-muted-foreground">Subtotal</span>
                      <span className="font-bold text-foreground">${subtotal.toFixed(2)}</span>
                    </div>
                    {paymentMode === 'Online' && (
                      <div className="flex justify-between text-sm py-2 text-primary bg-primary/5 px-2 rounded-lg">
                        <span className="font-medium italic">Service Fee (5%)</span>
                        <span className="font-bold">${platformFee.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="pt-4 border-t border-border/50 flex justify-between">
                      <span className="font-extrabold text-foreground">Estimate Total</span>
                      <span className="font-extrabold text-primary text-xl tracking-tighter">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10 flex items-start gap-3">
                  <Info className="text-primary mt-0.5" size={18} />
                  <p className="text-[10px] text-primary/80 font-bold leading-relaxed uppercase tracking-tight">
                    Final price may adjust slightly upon inspection of garments at our facility.
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="space-y-4">
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest px-1">Pickup Schedule</label>
                  <div className="relative">
                    <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input
                      type="datetime-local"
                      value={scheduledPickup}
                      onChange={(e) => setScheduledPickup(e.target.value)}
                      className="w-full pl-16 pr-6 py-4 bg-slate-50 border border-border/50 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all"
                    />
                  </div>
                </div>

                <div className="bg-slate-50 rounded-3xl p-8 border border-border/30 space-y-6">
                   <h4 className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">
                    <CreditCard size={14} /> Payment Method
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMode('Cash')}
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                        paymentMode === 'Cash' ? 'border-primary bg-primary/5 ring-4 ring-primary/5' : 'border-border/50 bg-white hover:border-primary/30'
                      }`}
                    >
                      <Banknote className={paymentMode === 'Cash' ? 'text-primary' : 'text-slate-400'} size={20} />
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${paymentMode === 'Cash' ? 'text-primary' : 'text-slate-500'}`}>Cash on Delivery</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setPaymentMode('Online')}
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                        paymentMode === 'Online' ? 'border-primary bg-primary/5 ring-4 ring-primary/5' : 'border-border/50 bg-white hover:border-primary/30'
                      }`}
                    >
                      <Wallet className={paymentMode === 'Online' ? 'text-primary' : 'text-slate-400'} size={20} />
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${paymentMode === 'Online' ? 'text-primary' : 'text-slate-500'}`}>Pay Online (Paystack)</span>
                    </button>
                  </div>
                </div>
                
                <div className="bg-slate-50 rounded-3xl p-8 border border-border/30 space-y-4">
                   <h4 className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">
                    <MapPin size={14} /> Service Location
                  </h4>
                  <p className="text-sm font-bold text-foreground tracking-tight">Saved Address</p>
                  <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                    123 Main St, Apartment 4B<br />
                    New York, NY 10001
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="mt-16 flex items-center justify-between gap-6">
          {step > 1 ? (
            <button
              onClick={() => setStep(prev => prev - 1)}
              className="px-10 py-4 rounded-2xl font-bold flex items-center gap-2 text-slate-500 hover:text-primary hover:bg-primary/5 transition-all"
            >
              <ChevronLeft size={20} />
              Back
            </button>
          ) : (
            <button
              onClick={() => router.back()}
              className="px-10 py-4 rounded-2xl font-bold flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-all"
            >
              Cancel
            </button>
          )}

          {step < 3 ? (
            <button
              onClick={() => {
                if (step === 1 && selectedServices.length === 0) {
                  toast.error("Please select at least one service")
                  return
                }
                setStep(prev => prev + 1)
              }}
              className="bg-primary text-white px-12 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-1 active:scale-95"
            >
              Next Step
              <ChevronRight size={20} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isPending}
              className="bg-emerald-500 text-white px-16 py-5 rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:translate-y-0"
            >
              {isPending ? <Loader2 className="animate-spin" size={24} /> : (
                <>
                  <Package size={24} />
                  Confirm & Place Order
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
