'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { verifyPayment } from '@/lib/actions'
import { toast } from 'sonner'
import { Loader2, CheckCircle2, XCircle } from 'lucide-react'

export function PaymentVerifier() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [verifying, setVerifying] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  useEffect(() => {
    const shouldVerify = searchParams.get('payment_verify')
    const reference = searchParams.get('reference') || searchParams.get('trxref')

    if (shouldVerify === 'true' && reference) {
      handleVerification(reference)
    }
  }, [searchParams])

  const handleVerification = async (reference: string) => {
    setVerifying(true)
    toast.loading("Verifying payment...")
    
    try {
      const result = await verifyPayment(reference)
      if (result.success) {
        setStatus('success')
        toast.success("Payment verified successfully!")
        // Refresh the page to show updated status
        router.refresh()
      } else {
        setStatus('error')
        toast.error(result.error || "Payment verification failed")
      }
    } catch (error) {
      setStatus('error')
      toast.error("An error occurred during verification")
    } finally {
      setVerifying(false)
      // Remove query params
      const newParams = new URLSearchParams(searchParams.toString())
      newParams.delete('payment_verify')
      newParams.delete('reference')
      newParams.delete('trxref')
      router.replace(window.location.pathname + (newParams.toString() ? '?' + newParams.toString() : ''))
    }
  }

  if (verifying) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-border flex flex-col items-center gap-4 max-w-xs text-center animate-in fade-in zoom-in duration-300">
          <Loader2 className="text-primary animate-spin" size={48} />
          <h3 className="text-xl font-bold text-foreground">Verifying Payment</h3>
          <p className="text-sm text-muted-foreground">Please wait while we confirm your transaction with Paystack.</p>
        </div>
      </div>
    )
  }

  if (status === 'success') {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3 mb-6 animate-in slide-in-from-top-4 duration-500">
        <CheckCircle2 className="text-emerald-500" size={24} />
        <div>
          <p className="font-bold text-emerald-900 leading-none">Payment Successful</p>
          <p className="text-xs text-emerald-700 mt-1">Your order is now being processed.</p>
        </div>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-4 flex items-center gap-3 mb-6 animate-in slide-in-from-top-4 duration-500">
        <XCircle className="text-destructive" size={24} />
        <div>
          <p className="font-bold text-destructive leading-none">Payment Failed</p>
          <p className="text-xs text-destructive/80 mt-1">We couldn't verify your payment. Please contact support if this is an error.</p>
        </div>
      </div>
    )
  }

  return null
}
