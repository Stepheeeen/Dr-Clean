import { auth } from '@/auth'
import { CustomerLayout } from '@/components/layouts/CustomerLayout'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import { getOrders } from '@/lib/actions'
import { Search, Filter, ChevronRight, Package, Clock, Calendar } from 'lucide-react'
import { redirect } from 'next/navigation'

export default async function CustomerOrdersPage() {
  const session = await auth()
  if (!session?.user) {
    redirect('/login')
  }

  const orders = await getOrders(session.user.id)

  return (
    <CustomerLayout>
      <div className="space-y-16">
        {/* Header Section - Architectural */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-border pb-12">
          <div className="max-w-xl">
            <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-primary mb-6">Order History</h2>
            <h1 className="text-5xl font-black text-foreground tracking-tighter uppercase leading-tight">
              ORDER <br /><span className="font-light italic text-primary">HISTORY</span>.
            </h1>
            <p className="mt-8 text-muted-foreground font-medium leading-relaxed">
              View and track all your past and current laundry orders.
            </p>
          </div>
        </div>

        {/* Orders List - Refined Grid */}
        <div className="grid grid-cols-1 gap-12">
          {orders.map((order) => (
            <div key={order.id} className="group border border-border bg-background transition-all duration-500 hover:border-primary">
              <div className="flex flex-col lg:flex-row">
                {/* ID & Status Block */}
                <div className="p-8 lg:w-64 border-b lg:border-b-0 lg:border-r border-border bg-secondary/30">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-4">ORDER ID</p>
                  <h3 className="text-3xl font-black text-foreground tracking-tighter mb-6 uppercase">#{order.orderNumber}</h3>
                  <span className={`inline-block px-4 py-1.5 text-[10px] font-black tracking-[0.2em] uppercase border ${
                    order.status === 'Completed' ? 'border-emerald-200 bg-emerald-50 text-emerald-800' :
                    order.status === 'Ready' ? 'border-blue-200 bg-blue-50 text-blue-800' :
                    'border-amber-200 bg-amber-50 text-amber-800'
                  }`}>
                    {order.status}
                  </span>
                </div>

                {/* Logistics Details */}
                <div className="flex-grow p-8 lg:p-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-4">DATE ORDERED</p>
                      <p className="text-lg font-black text-foreground tracking-tight">{new Date(order.createdAt).toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-4">PICKUP TIME</p>
                      <p className="text-lg font-black text-foreground tracking-tight">
                        {order.scheduledPickup ? new Date(order.scheduledPickup).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) : 'ASAP COLLECTION'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-12 pt-8 border-t border-border flex flex-wrap gap-3">
                    {order.items.map((item, idx) => (
                      <span key={idx} className="border border-border px-4 py-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">
                        {item.quantity}X {item.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Financial Summary */}
                <div className="p-8 lg:p-10 lg:w-64 border-t lg:border-t-0 lg:border-l border-border flex flex-col justify-between items-start lg:items-end">
                  <div className="lg:text-right w-full">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-4">ORDER TOTAL</p>
                    <p className="text-3xl font-black text-foreground tracking-tighter uppercase">{formatPrice(order.total)}</p>
                  </div>
                  <div className="mt-12 flex items-center justify-between w-full">
                    <Link 
                      href={`/customer/orders/${order.id}`}
                      className="inline-flex items-center gap-4 text-foreground hover:text-primary font-black text-[10px] tracking-[0.3em] uppercase transition-all duration-300 group/link"
                    >
                      VIEW DETAILS
                      <ChevronRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {orders.length === 0 && (
            <div className="py-32 text-center border border-dashed border-border pointer-events-none opacity-50">
              <Package size={40} className="mx-auto text-muted-foreground mb-8" />
              <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.4em]">You haven't placed any orders yet.</p>
            </div>
          )}
        </div>
      </div>
    </CustomerLayout>
  )
}
