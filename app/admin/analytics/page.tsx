import { AdminLayout } from '@/components/layouts/AdminLayout'
import { getAnalytics } from '@/lib/actions'
import { formatPrice } from '@/lib/utils'
import { TrendingUp, BarChart3, PieChart, Download, ArrowUpRight } from 'lucide-react'

export default async function AdminAnalyticsPage() {
  const analytics = await getAnalytics()

  return (
    <AdminLayout>
      <div className="space-y-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-extrabold text-foreground tracking-tighter">Business Intelligence</h2>
            <p className="text-muted-foreground text-sm font-medium mt-1">Deep dive into your revenue streams and order patterns.</p>
          </div>
          
          <button className="inline-flex items-center gap-2 bg-white border border-border/50 text-foreground shadow-sm hover:bg-slate-50 px-8 py-3.5 rounded-2xl font-bold transition-all duration-300 active:scale-95">
            <Download size={18} />
            Export Data
          </button>
        </div>

        {/* Primary KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: 'Cumulative Revenue', value: formatPrice(analytics.totalRevenue), trend: '+12.5%', color: 'text-primary', bg: 'bg-primary/5' },
            { label: 'Total Volume', value: analytics.totalOrders, trend: '+8.2%', color: 'text-indigo-600', bg: 'bg-indigo-50' },
            { label: 'Average Ticket', value: formatPrice(analytics.averageOrderValue), trend: '+4.1%', color: 'text-emerald-600', bg: 'bg-emerald-50' }
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-[2.5rem] border border-border/50 p-8 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group">
              <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest mb-4">{stat.label}</p>
              <div className="flex items-end justify-between">
                <p className="text-4xl font-extrabold text-foreground tracking-tighter">{stat.value}</p>
                <div className={`flex items-center gap-1 text-[10px] font-bold px-3 py-1 rounded-lg ${stat.bg} ${stat.color}`}>
                  <ArrowUpRight size={12} />
                  {stat.trend}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Visualization Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Daily Revenue Distribution */}
          <div className="bg-white rounded-[2.5rem] border border-border/50 p-10 shadow-sm">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-xl font-bold text-foreground tracking-tight">Revenue Distribution</h3>
              <div className="p-3 bg-slate-50 rounded-2xl text-slate-400">
                <BarChart3 size={20} />
              </div>
            </div>
            
            <div className="space-y-6">
              {analytics.chartData.map((day) => (
                <div key={day.date} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-foreground">{day.date}</span>
                    <span className="text-sm font-extrabold text-primary">{formatPrice(day.revenue)}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-primary h-full rounded-full transition-all duration-1000 group-hover:bg-primary/80" 
                      style={{ width: `${(day.revenue / (Math.max(...analytics.chartData.map(d => d.revenue)) || 1)) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
              {analytics.chartData.length === 0 && (
                <div className="py-20 text-center text-muted-foreground font-medium italic">
                  No transaction data available for this period.
                </div>
              )}
            </div>
          </div>

          {/* Daily Order Volume */}
          <div className="bg-white rounded-[2.5rem] border border-border/50 p-10 shadow-sm">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-xl font-bold text-foreground tracking-tight">Daily Volume</h3>
              <div className="p-3 bg-slate-50 rounded-2xl text-slate-400">
                <PieChart size={20} />
              </div>
            </div>

            <div className="space-y-6">
              {analytics.chartData.map((day) => (
                <div key={day.date} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-foreground">{day.date}</span>
                    <span className="text-sm font-extrabold text-indigo-600">{day.orders} Units</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-indigo-600 h-full rounded-full transition-all duration-1000 group-hover:bg-indigo-500" 
                      style={{ width: `${(day.orders / (Math.max(...analytics.chartData.map(d => d.orders)) || 1)) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
              {analytics.chartData.length === 0 && (
                <div className="py-20 text-center text-muted-foreground font-medium italic">
                  No volume data recorded.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
