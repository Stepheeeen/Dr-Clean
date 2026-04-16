'use client'

import { useState } from 'react'
import { formatPrice } from '@/lib/utils'
import { ORDER_STATUSES } from '@/lib/mock-data'
import { updateOrderStatus, updateOrderNotes } from '@/lib/actions'
import { toast } from 'sonner'

interface OrderManagementProps {
  order: any
}

export function OrderManagement({ order }: OrderManagementProps) {
  const [currentStatus, setCurrentStatus] = useState(order.status)
  const [notes, setNotes] = useState(order.notes || '')
  const [loading, setLoading] = useState(false)

  const handleStatusUpdate = async (status: string) => {
    setLoading(true)
    const result = await updateOrderStatus(order.id, status)
    if (result.success) {
      setCurrentStatus(status)
    }
    setLoading(false)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
      <div className="lg:col-span-2 space-y-16">
        {/* Status Modification Protocol */}
        <section>
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-8 underline underline-offset-8">Update Status</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {ORDER_STATUSES.map((status) => (
              <button
                key={status}
                disabled={loading}
                onClick={() => handleStatusUpdate(status)}
                className={`px-4 py-4 border border-foreground text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] transition-all duration-500 ${
                  currentStatus === status
                    ? 'bg-foreground text-background'
                    : 'bg-background text-foreground hover:bg-secondary/50'
                } disabled:opacity-50`}
              >
                {status}
              </button>
            ))}
          </div>
        </section>

        {/* Service Sequence ledger */}
        <section className="border border-foreground bg-background overflow-hidden relative">
          <header className="px-6 md:px-10 py-6 border-b border-foreground bg-secondary/10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-foreground">Order Items</h3>
          </header>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead className="bg-secondary/20 border-b border-foreground">
                <tr className="text-[8px] font-black uppercase tracking-[0.4em] text-muted-foreground">
                  <th className="px-6 md:px-10 py-6 text-left">SERVICE</th>
                  <th className="px-6 md:px-10 py-6 text-center">QUANTITY</th>
                  <th className="px-6 md:px-10 py-6 text-right">PRICE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-foreground/10">
                {order.items.map((item: any, idx: number) => (
                  <tr key={idx} className="hover:bg-secondary/5 transition-colors">
                    <td className="px-6 md:px-10 py-6 text-[10px] font-black uppercase tracking-widest">{item.name}</td>
                    <td className="px-6 md:px-10 py-6 text-[10px] font-black text-center">{item.quantity}</td>
                    <td className="px-6 md:px-10 py-6 text-[10px] font-black text-right tracking-widest">{formatPrice(item.price * item.quantity)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-t-2 border-foreground bg-foreground text-background">
                <tr>
                  <td colSpan={2} className="px-6 md:px-10 py-8 text-[11px] font-black uppercase tracking-[0.5em]">ORDER TOTAL</td>
                  <td className="px-6 md:px-10 py-8 text-right text-lg font-black tracking-widest">{formatPrice(order.total)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>
      </div>

      <aside className="space-y-16">
        {/* Admin Directives */}
        <section className="bg-background border border-foreground p-8 md:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 border-r border-t border-primary opacity-20" />
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-8 underline underline-offset-8">Order Notes</h3>
          <textarea
            value={notes}
            disabled={loading}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full bg-secondary/20 border border-foreground p-6 text-[10px] font-black uppercase tracking-[0.3em] focus:outline-none focus:bg-background h-48 transition-all"
            placeholder="ADD ANY NOTES HERE..."
          />
        </section>

        {/* Persistence Actions */}
        <section className="space-y-4">
          <button 
            disabled={loading}
            onClick={async () => {
              setLoading(true)
              const res = await updateOrderNotes(order.id, notes)
              if (res.success) {
                toast.success("Notes updated successfully")
              } else {
                toast.error(res.error || "Failed to update notes")
              }
              setLoading(false)
            }}
            className="w-full bg-foreground text-background py-6 text-[10px] font-black uppercase tracking-[0.5em] hover:bg-primary hover:text-white transition-all duration-700 shadow-xl shadow-foreground/5 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Save Changes'}
          </button>
          <button className="w-full border border-foreground py-6 text-[10px] font-black uppercase tracking-[0.5em] hover:bg-foreground hover:text-background transition-all duration-700">
            Print Order Tag
          </button>
        </section>

        <div className="p-8 md:p-10 border border-border bg-secondary/5 italic opacity-50">
          <p className="text-[8px] font-black uppercase tracking-[0.3em] leading-relaxed">
            Note: Status changes are logged for security and order tracking purposes.
          </p>
        </div>
      </aside>
    </div>
  )
}
