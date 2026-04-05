'use client'

import { AdminLayout } from '@/components/layouts/AdminLayout'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import { MOCK_ORDERS, ORDER_STATUSES } from '@/lib/mock-data'
import { ChevronLeft } from 'lucide-react'
import { useState } from 'react'

export default function AdminOrderDetailPage({ params }: { params: { id: string } }) {
  const order = MOCK_ORDERS.find(o => o.id === params.id) || MOCK_ORDERS[0]
  const [currentStatus, setCurrentStatus] = useState(order.status)
  const [notes, setNotes] = useState(order.notes)

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Back Button */}
        <Link
          href="/admin/orders"
          className="flex items-center gap-2 text-primary hover:text-primary/80 font-semibold"
        >
          <ChevronLeft size={20} />
          Back to Orders
        </Link>

        {/* Order Info */}
        <div className="bg-white rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground">{order.id}</h2>
              <p className="text-muted-foreground">Customer: {order.customerName}</p>
            </div>
          </div>
        </div>

        {/* Status Management */}
        <div className="bg-white rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Order Status</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {ORDER_STATUSES.slice(0, 9).map((status) => (
              <button
                key={status}
                onClick={() => setCurrentStatus(status)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  currentStatus === status
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-foreground hover:bg-muted'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-4">Current Status: <span className="font-semibold">{currentStatus}</span></p>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Services</h3>
          <div className="space-y-3">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between pb-3 border-b border-border last:border-0">
                <div>
                  <p className="font-medium text-foreground">{item.service}</p>
                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold text-foreground">{formatPrice(item.price * item.quantity)}</p>
              </div>
            ))}
            <div className="pt-3 flex items-center justify-between font-bold text-lg">
              <span>Total</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-white rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Admin Notes</h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary h-24"
            placeholder="Add notes about this order..."
          />
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button className="flex-1 bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/90 transition-colors font-semibold">
            Save Changes
          </button>
          <button className="flex-1 border-2 border-primary text-primary py-2 rounded-lg hover:bg-primary/10 transition-colors font-semibold">
            Print Label
          </button>
        </div>
      </div>
    </AdminLayout>
  )
}
