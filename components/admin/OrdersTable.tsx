'use client'

import Link from 'next/link'
import { formatPrice } from '@/lib/utils'
import { ChevronRight, Clock, Package, User } from 'lucide-react'

interface OrdersTableProps {
  orders: any[]
}

export function OrdersTable({ orders }: OrdersTableProps) {
  return (
    <div className="border border-foreground bg-background overflow-hidden relative">
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-foreground/20 scrollbar-track-transparent">
        <table className="w-full min-w-[1000px]">
          <thead className="bg-foreground text-background">
            <tr className="text-[9px] font-black uppercase tracking-[0.5em]">
              <th className="px-10 py-6 text-left">ORDER ID</th>
              <th className="px-10 py-6 text-left">CUSTOMER</th>
              <th className="px-10 py-6 text-left">ITEMS</th>
              <th className="px-10 py-6 text-left">TOTAL</th>
              <th className="px-10 py-6 text-left">STATUS</th>
              <th className="px-10 py-6 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-foreground/10">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-secondary/10 transition-all duration-500 group">
                <td className="px-10 py-8">
                  <span className="font-black text-sm text-foreground tracking-[0.1em] uppercase">#{order.orderNumber}</span>
                </td>
                <td className="px-10 py-8">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 border border-foreground flex items-center justify-center text-foreground font-black text-[10px] shrink-0">
                      {order.user.name?.charAt(0) || 'U'}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-black text-foreground tracking-[0.2em] uppercase truncate">{order.user.name}</p>
                      <p className="text-[9px] text-muted-foreground font-black uppercase tracking-[0.2em] mt-1 truncate">{order.user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-10 py-8">
                  <div className="flex flex-wrap gap-2">
                    {order.items.slice(0, 2).map((item: any, idx: number) => (
                      <span key={idx} className="px-3 py-1.5 border border-border text-[8px] font-black text-foreground uppercase tracking-widest whitespace-nowrap">
                        {item.quantity}× {item.name}
                      </span>
                    ))}
                    {order.items.length > 2 && (
                      <span className="px-3 py-1.5 bg-primary/10 text-[8px] font-black text-primary uppercase tracking-widest border border-primary/20">
                        +{order.items.length - 2} MORE
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-10 py-8 whitespace-nowrap">
                  <p className="text-xs font-black text-foreground tracking-widest uppercase">{formatPrice(order.total)}</p>
                  <p className="text-[9px] text-muted-foreground font-black uppercase tracking-[0.2em] flex items-center gap-2 mt-2 italic">
                    <Clock size={10} /> {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </td>
                <td className="px-10 py-8">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 ${
                      order.status === 'Completed' ? 'bg-emerald-500' :
                      order.status === 'Ready' ? 'bg-blue-500' :
                      'bg-amber-500'
                    }`} />
                    <span className="text-[9px] font-black uppercase tracking-[0.4em]">{order.status}</span>
                  </div>
                </td>
                <td className="px-10 py-8 text-right">
                  <Link 
                    href={`/admin/orders/${order.id}`}
                    className="inline-flex items-center justify-center border border-foreground w-12 h-12 hover:bg-foreground hover:text-background transition-all duration-500 group"
                  >
                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {orders.length === 0 && (
        <div className="py-32 text-center bg-background">
          <Package size={40} className="mx-auto text-muted-foreground opacity-20 mb-8" />
          <h4 className="text-[10px] font-black text-foreground uppercase tracking-[0.5em]">NO ORDERS FOUND</h4>
          <p className="text-[9px] text-muted-foreground mt-4 uppercase tracking-[0.2em] italic">Database record is currently empty.</p>
        </div>
      )}

      <footer className="p-8 border-t border-foreground bg-secondary/5 flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-[9px] text-muted-foreground font-black uppercase tracking-[0.3em]">
          TOTAL: <span className="text-foreground">{orders.length}</span> ORDERS
        </p>
        <div className="flex gap-4 w-full sm:w-auto">
          <button disabled className="flex-grow sm:flex-grow-0 px-8 py-3 border border-foreground text-[10px] font-black uppercase tracking-[0.3em] opacity-30 cursor-not-allowed">Previous</button>
          <button disabled className="flex-grow sm:flex-grow-0 px-8 py-3 border border-foreground text-[10px] font-black uppercase tracking-[0.3em] opacity-30 cursor-not-allowed">Next</button>
        </div>
      </footer>
    </div>
  )
}
