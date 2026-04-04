import { AdminLayout } from '@/components/layouts/AdminLayout'
import Link from 'next/link'
import { getOrders } from '@/lib/actions'
import { Search, Filter, MoreHorizontal, ChevronRight, Package, Tag, Clock } from 'lucide-react'

// This should ideally be a Server Component that passes data to a Client Component for searching
// But for this turn, I'll implement a clean Server-Side list first.

export default async function AdminOrdersPage() {
  const orders = await getOrders()

  return (
    <AdminLayout>
      <div className="space-y-10">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-extrabold text-foreground tracking-tighter">Orders Management</h2>
            <p className="text-muted-foreground text-sm font-medium mt-1">Track and fulfillment of all garment care requests.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Find orders..." 
                className="pl-11 pr-6 py-3 bg-white border border-border/50 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all w-64 shadow-sm"
              />
            </div>
            <button className="p-3 bg-white border border-border/50 rounded-2xl text-foreground hover:bg-slate-50 transition-colors shadow-sm">
              <Filter size={18} />
            </button>
          </div>
        </div>

        {/* Orders Grid/Table */}
        <div className="bg-white rounded-[2.5rem] border border-border/50 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50/50 border-b border-border/30">
                <tr className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
                  <th className="px-8 py-5 text-left">Internal ID</th>
                  <th className="px-8 py-5 text-left">Customer Profile</th>
                  <th className="px-8 py-5 text-left">Service Items</th>
                  <th className="px-8 py-5 text-left">Snapshot</th>
                  <th className="px-8 py-5 text-left">Workflow Status</th>
                  <th className="px-8 py-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-muted/30 transition-all duration-300 group">
                    <td className="px-8 py-6">
                      <span className="font-extrabold text-sm text-foreground tracking-tight">#{order.orderNumber}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-primary/5 flex items-center justify-center text-primary font-bold text-xs ring-4 ring-primary/5">
                          {order.user.name?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-foreground tracking-tight">{order.user.name}</p>
                          <p className="text-[10px] text-muted-foreground font-medium">{order.user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-wrap gap-1.5">
                        {order.items.slice(0, 2).map((item, idx) => (
                          <span key={idx} className="px-2 py-1 bg-slate-100 text-[10px] font-bold text-slate-600 rounded-lg">
                            {item.quantity}x {item.name}
                          </span>
                        ))}
                        {order.items.length > 2 && (
                          <span className="px-2 py-1 bg-primary/5 text-[10px] font-bold text-primary rounded-lg">
                            +{order.items.length - 2} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-sm font-extrabold text-foreground tracking-tight">${order.total.toFixed(2)}</p>
                      <p className="text-[10px] text-muted-foreground font-medium flex items-center gap-1 mt-1">
                        <Clock size={10} /> {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-wide shadow-sm border border-transparent ${
                        order.status === 'Completed' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                        order.status === 'Ready' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                        'bg-amber-100 text-amber-800 border-amber-200'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <Link 
                        href={`/admin/orders/${order.id}`}
                        className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-slate-100 text-slate-600 hover:bg-primary hover:text-white transition-all duration-300"
                      >
                        <ChevronRight size={18} />
                      </Link>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-8 py-20 text-center">
                      <div className="max-w-xs mx-auto">
                        <Package size={48} className="mx-auto text-muted-foreground opacity-20 mb-4" />
                        <h4 className="text-lg font-bold text-foreground">No orders yet</h4>
                        <p className="text-sm text-muted-foreground mt-1">When customers place orders, they'll appear here for fulfillment.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="p-8 border-t border-border/30 bg-slate-50/30 flex items-center justify-between">
            <p className="text-xs text-muted-foreground font-medium">Showing <span className="font-bold text-foreground">{orders.length}</span> active garment records</p>
            <div className="flex gap-2">
              <button disabled className="px-4 py-2 bg-white border border-border/50 rounded-xl text-[10px] font-bold opacity-50 cursor-not-allowed shadow-sm">Previous</button>
              <button disabled className="px-4 py-2 bg-white border border-border/50 rounded-xl text-[10px] font-bold opacity-50 cursor-not-allowed shadow-sm">Next</button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
