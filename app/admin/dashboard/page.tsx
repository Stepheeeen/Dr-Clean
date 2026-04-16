import { AdminLayout } from '@/components/layouts/AdminLayout'
import Link from 'next/link'
import { getDashboardStats, getOrders } from '@/lib/actions'
import { formatPrice } from '@/lib/utils'
import { TrendingUp, Package, Users, DollarSign } from 'lucide-react'

export default async function AdminDashboard() {
  const stats = await getDashboardStats()
  const recentOrders = await getOrders()

  return (
    <AdminLayout>
      <div className="space-y-16">
        {/* KPI Cards - Architectural Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 border border-foreground">
          {[
            { label: 'TOTAL ORDERS', value: stats.totalOrders, icon: Package },
            { label: 'ACTIVE ORDERS', value: stats.activeOrders, icon: Package },
            { label: 'TOTAL REVENUE', value: formatPrice(stats.totalRevenue), icon: DollarSign },
            { label: 'AVERAGE VALUE', value: formatPrice(stats.averageOrderValue), icon: TrendingUp },
          ].map((kpi, i) => (
            <div key={i} className={`p-8 md:p-10 border-foreground ${i % 2 !== 0 ? 'sm:border-l' : ''} ${i !== 0 ? 'border-t sm:border-t-0' : ''} ${i >= 2 ? 'sm:border-t' : ''} ${i !== 3 ? 'md:border-r md:border-t-0' : 'md:border-t-0'} bg-background group hover:bg-primary transition-all duration-700`}>
              <div className="flex items-center justify-between mb-8">
                <p className="text-muted-foreground group-hover:text-white/70 text-[10px] font-black uppercase tracking-[0.4em] transition-colors">{kpi.label}</p>
                <div className="text-foreground group-hover:text-white transition-colors">
                  <kpi.icon size={16} />
                </div>
              </div>
              <p className="text-3xl md:text-4xl font-black text-foreground group-hover:text-white tracking-tighter uppercase transition-colors">{kpi.value}</p>
              <div className="mt-8 flex items-center gap-2">
                <div className="w-8 h-[1px] bg-primary group-hover:bg-white transition-colors" />
                <span className="text-[8px] font-black text-primary group-hover:text-white uppercase tracking-[0.3em] transition-colors">Real-time Data</span>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Orders Ledger */}
        <div className="grid grid-cols-1 lg:grid-cols-3 border border-foreground">
          <div className="lg:col-span-2 bg-background p-0 lg:border-r border-foreground overflow-hidden">
            <header className="p-10 border-b border-foreground flex items-center justify-between">
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">Recent Orders</h3>
                <h2 className="text-2xl font-black text-foreground uppercase tracking-tight mt-2">Latest Updates</h2>
              </div>
              <Link href="/admin/orders" className="text-[10px] font-black border border-foreground px-8 py-3 hover:bg-foreground hover:text-background transition-all duration-500 uppercase tracking-[0.3em]">
                View All
              </Link>
            </header>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-foreground bg-secondary/30">
                  <tr className="text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground">
                    <th className="px-10 py-6 text-left">ORDER ID</th>
                    <th className="px-10 py-6 text-left">CUSTOMER</th>
                    <th className="px-10 py-6 text-left">AMOUNT</th>
                    <th className="px-10 py-6 text-left">STATUS</th>
                    <th className="px-10 py-6 text-right">DATE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {recentOrders.slice(0, 6).map((order) => (
                    <tr key={order.id} className="hover:bg-secondary/20 transition-colors group">
                      <td className="px-10 py-6 font-black text-xs tracking-widest text-foreground uppercase">#{order.orderNumber}</td>
                      <td className="px-10 py-6">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">{order.user.name}</span>
                      </td>
                      <td className="px-10 py-6 text-xs font-black">{formatPrice(order.total)}</td>
                      <td className="px-10 py-6">
                        <span className={`inline-block w-2 h-2 mr-2 ${
                          order.status === 'Completed' ? 'bg-emerald-500' :
                          order.status === 'Ready' ? 'bg-blue-500' :
                          'bg-amber-500'
                        }`} />
                        <span className="text-[9px] font-black uppercase tracking-[0.3em]">{order.status}</span>
                      </td>
                      <td className="px-10 py-6 text-right text-[9px] font-black text-muted-foreground uppercase">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                  {recentOrders.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-10 py-20 text-center text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground italic">
                        NO ACTIVE ORDERS FOUND
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Side Panels */}
          <div className="bg-background divide-y divide-foreground flex flex-col">
            <div className="p-10 flex-grow">
              <header className="mb-10">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-2">Info</h4>
                <h3 className="text-xl font-black uppercase tracking-tight text-foreground leading-tight">Activity Summary</h3>
              </header>
              <p className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.2em] leading-relaxed mb-12 italic">
                Order volume is currently up by <span className="text-foreground">12.5%</span> today compared to yesterday.
              </p>
              <Link href="/admin/analytics" className="block w-full text-center bg-foreground text-background py-5 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-primary hover:text-white transition-all duration-500 shadow-xl shadow-foreground/5">
                View Full Stats
              </Link>
            </div>

            <div className="p-10">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-8">Quick Links</h4>
              <div className="space-y-4">
                {[
                  { href: '/admin/pricing', label: 'PRICING', icon: DollarSign },
                  { href: '/admin/orders', label: 'ORDERS', icon: Package },
                  { href: '/admin/customers', label: 'CUSTOMERS', icon: Users }
                ].map((action, i) => (
                  <Link key={i} href={action.href} className="flex items-center justify-between p-5 border border-border hover:border-foreground transition-all duration-500 group">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] group-hover:translate-x-2 transition-transform">{action.label}</span>
                    <action.icon size={14} className="group-hover:text-primary transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
