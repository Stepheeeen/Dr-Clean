import { auth } from '@/auth'
import { CustomerLayout } from '@/components/layouts/CustomerLayout'
import Link from 'next/link'
import { getOrders } from '@/lib/actions'
import { formatPrice } from '@/lib/utils'
import { Clock, CheckCircle, Package, Plus, TrendingUp } from 'lucide-react'
import { redirect } from 'next/navigation'

export default async function CustomerDashboard() {
  const session = await auth()
  if (!session?.user) {
    redirect('/login')
  }

  const allOrders = await getOrders(session.user.id)
  const activeOrders = allOrders.filter((order) => !['Completed', 'Cancelled'].includes(order.status))
  const totalSpent = allOrders.reduce((sum, order) => sum + order.total, 0)

  return (
    <CustomerLayout>
      <div className="space-y-10">
        {/* Welcome Banner */}
        <div className="relative bg-white rounded-[2.5rem] border border-border/50 p-10 overflow-hidden group shadow-sm">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-20 -mt-20 group-hover:scale-125 transition-transform duration-700"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-extrabold text-foreground tracking-tight mb-2">Hello, {session.user.name?.split(' ')[0] || 'there'}!</h2>
            <p className="text-muted-foreground text-lg max-w-lg mb-8 font-medium">Your world-class garment care is just a few clicks away. Everything looks fresh today.</p>
            <Link 
              href="/customer/orders/new" 
              className="inline-flex items-center gap-2 bg-primary text-white shadow-xl shadow-primary/20 hover:shadow-primary/40 px-10 py-4 rounded-2xl font-bold transition-all duration-300 hover:-translate-y-1 active:scale-95"
            >
              <Plus size={20} />
              Book New Service
            </Link>
          </div>
        </div>

        {/* Quick Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: 'Active Orders', value: activeOrders.length, icon: Clock, color: 'text-primary', bg: 'bg-primary/5' },
            { label: 'Total Requests', value: allOrders.length, icon: Package, color: 'text-indigo-600', bg: 'bg-indigo-50' },
            { label: 'Total Spent', value: formatPrice(totalSpent), icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' }
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-[2rem] border border-border/50 p-8 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest">{stat.label}</p>
                <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon size={20} />
                </div>
              </div>
              <p className="text-3xl font-extrabold text-foreground tracking-tighter">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Active & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Active Orders List */}
          <div className="bg-white rounded-[2.5rem] border border-border/50 shadow-sm overflow-hidden h-fit">
            <div className="p-8 border-b border-border/50 flex items-center justify-between">
              <h3 className="text-xl font-bold text-foreground tracking-tight">Active Status</h3>
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            </div>
            <div className="divide-y divide-border/20">
              {activeOrders.map((order) => (
                <div key={order.id} className="p-8 hover:bg-muted/30 transition-all duration-300 group">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="font-extrabold text-lg text-foreground tracking-tight">#{order.orderNumber}</p>
                      <p className="text-xs text-muted-foreground font-medium mt-1">Scheduled: {order.scheduledPickup ? new Date(order.scheduledPickup).toLocaleString() : 'As soon as possible'}</p>
                    </div>
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-wide shadow-sm ${
                      order.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                      order.status === 'Pickup Scheduled' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'In Cleaning' ? 'bg-indigo-100 text-indigo-800' :
                      'bg-emerald-100 text-emerald-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {order.items.map((item, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-[10px] font-bold">
                        {item.quantity}x {item.name}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/customer/orders/${order.id}`}
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-bold text-sm tracking-tight transition-colors"
                  >
                    Manage This Order
                    <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                  </Link>
                </div>
              ))}
              {activeOrders.length === 0 && (
                <div className="p-12 text-center">
                  <Package size={40} className="mx-auto text-muted-foreground opacity-20 mb-4" />
                  <p className="text-muted-foreground text-sm font-medium">No active orders currently.</p>
                </div>
              )}
            </div>
          </div>

          {/* Recent Orders Overview */}
          <div className="bg-white rounded-[2.5rem] border border-border/50 shadow-sm overflow-hidden h-fit">
            <div className="p-8 border-b border-border/50 flex items-center justify-between">
              <h3 className="text-xl font-bold text-foreground tracking-tight">Service History</h3>
              <Link href="/customer/orders" className="text-primary hover:text-primary/80 font-bold text-sm">
                Full History
              </Link>
            </div>
            <div className="divide-y divide-border/20">
              {allOrders.slice(0, 3).map((order) => (
                <div key={order.id} className="p-8 hover:bg-muted/30 transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-bold text-foreground tracking-tight">#{order.orderNumber}</p>
                    <p className="text-sm font-extrabold text-foreground">{formatPrice(order.total)}</p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground font-medium">
                    <span className="truncate max-w-[200px]">
                      {order.items.map(item => item.name).join(', ')}
                    </span>
                    <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
              {allOrders.length === 0 && (
                <div className="p-12 text-center text-muted-foreground text-sm font-medium italic">
                  Your story with Dr. Clean begins here.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  )
}
