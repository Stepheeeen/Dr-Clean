'use client'

import { useState } from 'react'
import { CreditCard, Loader2 } from 'lucide-react'
import { initializePayment } from '@/lib/actions'
import { toast } from 'sonner'

interface OrderPaymentButtonProps {
  orderId: string
  email: string
}

export function OrderPaymentButton({ orderId, email }: OrderPaymentButtonProps) {
  const [loading, setLoading] = useState(false)

  const handlePayment = async () => {
    setLoading(true)
    toast.loading("Preparing secure gateway...")

    try {
      const result = await initializePayment(orderId, email)
      if (result.success && result.authorization_url) {
        window.location.href = result.authorization_url
      } else {
        toast.error(result.error || "Failed to initialize payment")
        setLoading(false)
      }
    } catch (error) {
      toast.error("An unexpected error occurred")
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="w-full bg-primary text-white py-6 font-black uppercase tracking-[0.4em] text-[10px] text-center hover:bg-foreground transition-all duration-500 flex items-center justify-center gap-4 disabled:opacity-50"
    >
      {loading ? <Loader2 className="animate-spin" size={16} /> : <CreditCard size={16} />}
      Complete Payment
    </button>
  )
}
