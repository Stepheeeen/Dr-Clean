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
      <div className="space-y-12">
        {/* Welcome Section - Architectural Header */}
        <section className="relative py-12 border-b border-border">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-primary mb-6">Dashboard Overview</h2>
              <h1 className="text-5xl sm:text-6xl font-black text-foreground tracking-tighter leading-[1.1] uppercase">
                HELLO, <br /><span className="font-light italic text-primary">{session.user.name?.split(' ')[0] || 'MEMBER'}</span>.
              </h1>
              <p className="mt-8 text-lg text-muted-foreground font-medium leading-relaxed max-w-lg">
                Your clothes are in safe hands. We're processing your orders with care and precision.
              </p>
            </div>
          </div>
        </section>

        {/* Vital Metrics - Minimalist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 border- border-border">
          {[
            { label: 'Active Orders', value: activeOrders.length, icon: Clock },
            { label: 'Total Orders', value: allOrders.length, icon: Package },
            { label: 'Total Spent', value: formatPrice(totalSpent), icon: TrendingUp }
          ].map((stat, i) => (
            <div key={i} className={`p-10 border-border group ${i !== 2 ? 'md:border-r' : ''} ${i !== 2 ? 'border-b md:border-b-0' : ''}`}>
              <div className="flex items-center justify-between mb-6">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground group-hover:text-primary transition-colors">{stat.label}</p>
                <stat.icon size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <p className="text-4xl font-black text-foreground tracking-tighter uppercase">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Active & Recent Activity - Architectural Division */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 pt-8">
          {/* Active Status Column */}
          <div className="space-y-12">
            <div className="flex items-center justify-between border-b border-border pb-6">
              <h3 className="text-xs font-black text-foreground tracking-[0.3em] uppercase">Active Orders</h3>
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
            </div>
            
            <div className="space-y-4">
              {activeOrders.map((order) => (
                <div key={order.id} className="p-8 border border-border group hover:border-primary transition-all duration-500 bg-background">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h4 className="font-black text-2xl text-foreground tracking-tighter">ORDER NO. {order.orderNumber}</h4>
                      <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mt-2 bg-secondary px-3 py-1 inline-block">
                        ORDERED: {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="text-[10px] font-black tracking-[0.2em] uppercase text-primary border border-primary/20 px-4 py-1">
                      {order.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {order.items.map((item, idx) => (
                      <span key={idx} className="border border-border text-muted-foreground px-3 py-1 text-[10px] font-black uppercase tracking-widest">
                        {item.quantity}X {item.name}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/customer/orders/${order.id}`}
                    className="inline-flex items-center gap-4 text-foreground hover:text-primary font-black text-[10px] tracking-[0.3em] uppercase transition-all duration-300 group/link"
                  >
                    View Details
                    <Plus size={12} className="group-hover/link:rotate-90 transition-transform" />
                  </Link>
                </div>
              ))}
              {activeOrders.length === 0 && (
                <div className="py-20 text-center border border-dashed border-border">
                  <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.4em]">No active sessions found.</p>
                </div>
              )}
            </div>
          </div>

          {/* History Column */}
          <div className="space-y-12">
            <div className="flex items-center justify-between border-b border-border pb-6">
              <h3 className="text-xs font-black text-foreground tracking-[0.3em] uppercase">Order History</h3>
              <Link href="/customer/orders" className="text-[10px] font-black text-primary tracking-[0.3em] uppercase hover:text-foreground transition-colors">
                View All
              </Link>
            </div>
            
            <div className="divide-y divide-border">
              {allOrders.slice(0, 5).map((order) => (
                <div key={order.id} className="py-8 group flex items-center justify-between hover:px-2 transition-all duration-500">
                  <div className="space-y-1">
                    <p className="font-black text-foreground tracking-tighter uppercase">ORDER NO. {order.orderNumber}</p>
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest italic">
                      {order.items.length} Item{order.items.length !== 1 ? 's' : ''} — {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-lg font-black text-foreground tracking-tighter">{formatPrice(order.total)}</p>
                </div>
              ))}
              {allOrders.length === 0 && (
                <div className="py-20 text-center italic text-muted-foreground text-sm font-medium opacity-40">
                  Welcome! Your orders will appear here once you make your first request.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  )
}
