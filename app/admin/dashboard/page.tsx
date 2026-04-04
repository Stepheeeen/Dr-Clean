import { AdminLayout } from '@/components/layouts/AdminLayout'
import Link from 'next/link'
import { getDashboardStats, getOrders } from '@/lib/actions'
import { TrendingUp, Package, Users, DollarSign } from 'lucide-react'

export default async function AdminDashboard() {
  const stats = await getDashboardStats()
  const recentOrders = await getOrders()

  return (
    <AdminLayout>
      <div className="space-y-10">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { label: 'Total Orders', value: stats.totalOrders, icon: Package, color: 'text-primary', bg: 'bg-primary/5' },
            { label: 'Active Orders', value: stats.activeOrders, icon: Package, color: 'text-indigo-600', bg: 'bg-indigo-50' },
            { label: 'Total Revenue', value: `$${stats.totalRevenue.toFixed(2)}`, icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Avg Order Value', value: `$${stats.averageOrderValue.toFixed(2)}`, icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
          ].map((kpi, i) => (
            <div key={i} className="bg-white rounded-[2rem] border border-border/50 p-8 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest">{kpi.label}</p>
                <div className={`p-3 rounded-2xl ${kpi.bg} ${kpi.color} group-hover:scale-110 transition-transform duration-300`}>
                  <kpi.icon size={20} />
                </div>
              </div>
              <p className="text-3xl font-extrabold text-foreground tracking-tighter">{kpi.value}</p>
              <div className="flex items-center gap-1.5 mt-4 text-[10px] font-bold text-emerald-600 bg-emerald-50 w-fit px-2 py-1 rounded-full">
                <TrendingUp size={12} />
                <span>+12.5% vs last month</span>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Orders & Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-border/50 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-border/50 flex items-center justify-between bg-white">
              <div>
                <h3 className="text-xl font-bold text-foreground tracking-tight">Recent Orders</h3>
                <p className="text-xs text-muted-foreground mt-1">Real-time order stream from all customers.</p>
              </div>
              <Link href="/admin/orders" className="bg-slate-100 hover:bg-primary hover:text-white px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300">
                View All Details
              </Link>
            </div>
            <div className="overflow-x-auto p-4">
              <table className="w-full">
                <thead className="text-muted-foreground uppercase text-[10px] font-bold tracking-widest">
                  <tr>
                    <th className="px-6 py-4 text-left">Order</th>
                    <th className="px-6 py-4 text-left">Customer</th>
                    <th className="px-6 py-4 text-left">Amount</th>
                    <th className="px-6 py-4 text-left">Status</th>
                    <th className="px-6 py-4 text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {recentOrders.slice(0, 5).map((order) => (
                    <tr key={order.id} className="hover:bg-muted/30 transition-colors group">
                      <td className="px-6 py-5 font-bold text-sm tracking-tight text-foreground">#{order.orderNumber}</td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold">
                            {order.user.name?.charAt(0) || 'U'}
                          </div>
                          <span className="text-sm font-medium">{order.user.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm font-bold">${order.total.toFixed(2)}</td>
                      <td className="px-6 py-5">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-wide shadow-sm ${
                          order.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                          order.status === 'Ready' ? 'bg-blue-100 text-blue-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right text-xs text-muted-foreground font-medium">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                  {recentOrders.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground text-sm font-medium italic">
                        No orders found in the database.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions / Activity */}
          <div className="space-y-8">
            <div className="bg-primary rounded-[2.5rem] p-8 text-white shadow-xl shadow-primary/20 relative overflow-hidden group">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
              <h4 className="text-lg font-bold mb-2">Operational Insight</h4>
              <p className="text-sm text-blue-100 mb-6 font-medium">Your current revenue is up by 12% across all categories today.</p>
              <Link href="/admin/analytics" className="inline-block bg-white text-primary px-6 py-3 rounded-2xl text-xs font-bold hover:shadow-lg transition-all duration-300 active:scale-95">
                Download Report
              </Link>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-border/50 p-8 shadow-sm">
              <h4 className="text-base font-bold mb-6 tracking-tight text-foreground">Action Shortcuts</h4>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { href: '/admin/services', label: 'Optimize Pricing', icon: DollarSign, color: 'bg-emerald-50 text-emerald-600' },
                  { href: '/admin/orders', label: 'Fulfillment Queue', icon: Package, color: 'bg-blue-50 text-blue-600' },
                  { href: '/admin/customers', label: 'User Directory', icon: Users, color: 'bg-indigo-50 text-indigo-600' }
                ].map((action, i) => (
                  <Link key={i} href={action.href} className="flex items-center gap-4 p-4 rounded-2xl border border-transparent hover:border-border hover:bg-slate-50 transition-all duration-300">
                    <div className={`p-2.5 rounded-xl ${action.color} shadow-sm`}>
                      <action.icon size={18} />
                    </div>
                    <span className="text-sm font-bold text-foreground">{action.label}</span>
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
