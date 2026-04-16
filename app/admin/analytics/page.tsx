import { AdminLayout } from '@/components/layouts/AdminLayout'
import { getAnalytics } from '@/lib/actions'
import { formatPrice } from '@/lib/utils'
import { TrendingUp, BarChart3, PieChart, Download, ArrowUpRight } from 'lucide-react'

export default async function AdminAnalyticsPage() {
  const analytics = await getAnalytics()

  return (
    <AdminLayout>
      <div className="space-y-16">
        {/* Header Section - Architectural */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div>
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-4 italic">Analytics</h2>
            <h1 className="text-3xl md:text-5xl font-black text-foreground tracking-tighter uppercase leading-none">BUSINESS <br /><span className="font-light italic text-primary">REPORTS</span>.</h1>
            <p className="mt-8 text-[11px] font-black text-muted-foreground uppercase tracking-[0.3em] italic leading-relaxed">
              View detailed reports on your revenue and customer order patterns.
            </p>
          </div>
          
          <button className="w-full md:w-auto inline-flex items-center justify-center gap-4 bg-background border border-foreground text-foreground px-10 py-5 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-foreground hover:text-background transition-all duration-700 active:scale-95 group">
            <Download size={16} className="group-hover:translate-y-1 transition-transform" />
            Export Data
          </button>
        </div>

        {/* Primary KPIs - Rigid Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 border border-foreground">
          {[
            { label: 'TOTAL REVENUE', value: formatPrice(analytics.totalRevenue), trend: '+12.5%' },
            { label: 'TOTAL ORDERS', value: analytics.totalOrders, trend: '+8.2%' },
            { label: 'AVERAGE ORDER', value: formatPrice(analytics.averageOrderValue), trend: '+4.1%' }
          ].map((stat, i) => (
            <div key={i} className={`bg-background p-8 md:p-12 border-foreground group hover:bg-primary transition-all duration-700 ${i !== 2 ? 'md:border-r' : ''} ${i !== 0 ? 'border-t md:border-t-0' : ''}`}>
              <p className="text-muted-foreground group-hover:text-white/70 text-[10px] font-black uppercase tracking-[0.4em] mb-12 italic transition-colors">{stat.label}</p>
              <div className="flex items-end justify-between">
                <p className="text-3xl md:text-4xl font-black text-foreground group-hover:text-white tracking-tighter uppercase transition-colors">{stat.value}</p>
                <div className="flex items-center gap-2 text-[10px] font-black text-primary group-hover:text-white transition-colors tracking-widest italic">
                  <ArrowUpRight size={14} />
                  {stat.trend}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Visualization Grid - Rigid Structures */}
        <div className="grid grid-cols-1 lg:grid-cols-2 border border-foreground overflow-hidden">
          {/* Daily Revenue Distribution */}
          <div className="bg-background p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-foreground">
            <div className="flex items-center justify-between mb-16">
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">Revenue</h3>
                <h2 className="text-xl md:text-2xl font-black text-foreground tracking-tight uppercase mt-2">REVENUE BY DATE</h2>
              </div>
              <div className="w-12 h-12 border border-foreground flex items-center justify-center text-foreground">
                <BarChart3 size={20} />
              </div>
            </div>
            
            <div className="space-y-10">
              {analytics.chartData.map((day) => (
                <div key={day.date} className="group">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black text-foreground uppercase tracking-widest italic">{day.date}</span>
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">{formatPrice(day.revenue)}</span>
                  </div>
                  <div className="w-full bg-secondary/30 h-1 overflow-hidden">
                    <div 
                      className="bg-foreground h-full transition-all duration-1000 group-hover:bg-primary" 
                      style={{ width: `${(day.revenue / (Math.max(...analytics.chartData.map(d => d.revenue)) || 1)) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
              {analytics.chartData.length === 0 && (
                <div className="py-24 text-center text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground italic">
                  NO REVENUE DATA FOUND
                </div>
              )}
            </div>
          </div>

          {/* Daily Order Volume */}
          <div className="bg-background p-8 md:p-12">
            <div className="flex items-center justify-between mb-16">
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">Orders</h3>
                <h2 className="text-xl md:text-2xl font-black text-foreground tracking-tight uppercase mt-2">DAILY VOLUME</h2>
              </div>
              <div className="w-12 h-12 border border-foreground flex items-center justify-center text-foreground">
                <PieChart size={20} />
              </div>
            </div>

            <div className="space-y-10">
              {analytics.chartData.map((day) => (
                <div key={day.date} className="group">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black text-foreground uppercase tracking-widest italic">{day.date}</span>
                    <span className="text-[10px] font-black text-foreground uppercase tracking-widest">{day.orders} ORDERS</span>
                  </div>
                  <div className="w-full bg-secondary/30 h-1 overflow-hidden">
                    <div 
                      className="bg-primary h-full transition-all duration-1000 group-hover:bg-foreground" 
                      style={{ width: `${(day.orders / (Math.max(...analytics.chartData.map(d => d.orders)) || 1)) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
              {analytics.chartData.length === 0 && (
                <div className="py-24 text-center text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground italic">
                  NO ORDER DATA FOUND
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
