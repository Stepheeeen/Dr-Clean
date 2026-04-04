import { CustomerLayout } from '@/components/layouts/CustomerLayout'
import Link from 'next/link'
import { getOrders } from '@/lib/actions'
import { Search, Filter, ChevronRight, Package, Clock, Calendar } from 'lucide-react'

export default async function OrdersPage() {
  const JOHN_ID = 'cmnkq88z10007tld5t8yqbrvk'
  const orders = await getOrders(JOHN_ID)

  return (
    <CustomerLayout>
      <div className="space-y-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-extrabold text-foreground tracking-tighter">My Service History</h2>
            <p className="text-muted-foreground text-sm font-medium mt-1">Review your past orders and track current progress.</p>
          </div>
          
          <Link
            href="/customer/orders/new"
            className="inline-flex items-center gap-2 bg-primary text-white shadow-xl shadow-primary/20 hover:shadow-primary/40 px-8 py-3.5 rounded-2xl font-bold transition-all duration-300 hover:-translate-y-1 active:scale-95"
          >
            <Package size={18} />
            New Order
          </Link>
        </div>

        {/* Orders List */}
        <div className="grid grid-cols-1 gap-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-[2rem] border border-border/50 p-8 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group">
              <div className="flex flex-col lg:flex-row lg:items-center gap-8">
                {/* Status & ID */}
                <div className="lg:w-48 shrink-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-extrabold text-lg text-foreground tracking-tight">#{order.orderNumber}</span>
                  </div>
                  <span className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-bold tracking-wide shadow-sm border border-transparent ${
                    order.status === 'Completed' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                    order.status === 'Ready' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                    'bg-amber-100 text-amber-800 border-amber-200'
                  }`}>
                    {order.status}
                  </span>
                </div>

                {/* Details */}
                <div className="flex-grow">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-slate-50 rounded-xl text-slate-400">
                        <Calendar size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Date Placed</p>
                        <p className="text-sm font-bold text-foreground">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-slate-50 rounded-xl text-slate-400">
                        <Clock size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Pickup Time</p>
                        <p className="text-sm font-bold text-foreground">
                          {order.scheduledPickup ? new Date(order.scheduledPickup).toLocaleString() : 'Not scheduled'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex flex-wrap gap-2">
                    {order.items.map((item, idx) => (
                      <span key={idx} className="px-3 py-1 bg-primary/5 border border-primary/10 text-[10px] font-bold text-primary rounded-lg">
                        {item.quantity}x {item.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Amount & CTA */}
                <div className="lg:w-48 lg:text-right shrink-0 border-t lg:border-t-0 lg:border-l border-border/50 pt-6 lg:pt-0 lg:pl-8">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Total Amount</p>
                  <p className="text-2xl font-extrabold text-foreground tracking-tighter mb-4">${order.total.toFixed(2)}</p>
                  <Link 
                    href={`/customer/orders/${order.id}`}
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-bold text-sm tracking-tight transition-colors group/link"
                  >
                    View Details
                    <ChevronRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {orders.length === 0 && (
            <div className="py-20 text-center bg-white rounded-[3rem] border border-dashed border-border/80">
              <Package size={48} className="mx-auto text-muted-foreground opacity-20 mb-4" />
              <h4 className="text-lg font-bold text-foreground tracking-tight">No orders yet</h4>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto mt-1 mb-6">Experience the future of laundry care with your first order.</p>
              <Link
                href="/customer/orders/new"
                className="bg-primary text-white px-8 py-3 rounded-2xl font-bold hover:shadow-lg transition-all"
              >
                Create First Order
              </Link>
            </div>
          )}
        </div>
      </div>
    </CustomerLayout>
  )
}
