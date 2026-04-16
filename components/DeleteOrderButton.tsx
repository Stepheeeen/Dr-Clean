'use client'

import { useState } from 'react'
import { Trash2, Loader2, AlertTriangle } from 'lucide-react'
import { deleteOrder } from '@/lib/actions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface DeleteOrderButtonProps {
  orderId: string
  orderNumber: string
}

export function DeleteOrderButton({ orderId, orderNumber }: DeleteOrderButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const result = await deleteOrder(orderId)
      if (result.success) {
        toast.success(`ORDER #${orderNumber} DELETED`)
        router.refresh()
      } else {
        toast.error(result.error || "DELETION FAILED")
      }
    } catch (error) {
      toast.error("PROTOCOL ERROR")
    } finally {
      setIsDeleting(false)
      setShowConfirm(false)
    }
  }

  if (showConfirm) {
    return (
      <div className="flex items-center gap-4 animate-in fade-in slide-in-from-right-2 duration-300">
        <span className="text-[10px] font-black text-red-600 uppercase tracking-widest italic">CONFIRM?</span>
        <button 
          onClick={handleDelete}
          disabled={isDeleting}
          className="p-2 text-red-600 hover:bg-red-50 transition-all border border-red-600"
        >
          {isDeleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
        </button>
        <button 
          onClick={() => setShowConfirm(false)}
          className="text-[10px] font-black text-muted-foreground hover:text-foreground uppercase tracking-widest underline underline-offset-4"
        >
          CANCEL
        </button>
      </div>
    )
  }

  return (
    <button 
      onClick={() => setShowConfirm(true)}
      className="inline-flex items-center gap-2 text-muted-foreground hover:text-red-600 transition-colors py-2"
    >
      <Trash2 size={12} />
      <span className="text-[9px] font-black uppercase tracking-[0.3em]">DELETE ORDER</span>
    </button>
  )
}
