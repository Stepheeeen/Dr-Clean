import { AdminLayout } from '@/components/layouts/AdminLayout'
import { ANALYTICS_DATA } from '@/lib/mock-data'
import { TrendingUp } from 'lucide-react'

export default function AdminAnalyticsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Analytics & Reports</h2>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg border border-border p-6">
            <p className="text-muted-foreground text-sm font-semibold mb-2">Total Orders All Time</p>
            <p className="text-3xl font-bold text-foreground">{ANALYTICS_DATA.totalOrders}</p>
            <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
              <TrendingUp size={14} /> All-time
            </p>
          </div>

          <div className="bg-white rounded-lg border border-border p-6">
            <p className="text-muted-foreground text-sm font-semibold mb-2">Total Revenue All Time</p>
            <p className="text-3xl font-bold text-foreground">${ANALYTICS_DATA.totalRevenue.toFixed(2)}</p>
            <p className="text-xs text-green-600 mt-2">Total generated</p>
          </div>

          <div className="bg-white rounded-lg border border-border p-6">
            <p className="text-muted-foreground text-sm font-semibold mb-2">Orders This Month</p>
            <p className="text-3xl font-bold text-foreground">{ANALYTICS_DATA.ordersThisMonth}</p>
            <p className="text-xs text-green-600 mt-2">
              <TrendingUp size={14} className="inline mr-1" />
              +{ANALYTICS_DATA.ordersThisMonth - ANALYTICS_DATA.ordersLastMonth} vs last month
            </p>
          </div>

          <div className="bg-white rounded-lg border border-border p-6">
            <p className="text-muted-foreground text-sm font-semibold mb-2">Revenue This Month</p>
            <p className="text-3xl font-bold text-foreground">${ANALYTICS_DATA.revenueThisMonth.toFixed(2)}</p>
            <p className="text-xs text-green-600 mt-2">
              <TrendingUp size={14} className="inline mr-1" />
              +${(ANALYTICS_DATA.revenueThisMonth - ANALYTICS_DATA.revenueLastMonth).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Orders Chart */}
          <div className="bg-white rounded-lg border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Orders by Day (This Week)</h3>
            <div className="space-y-4">
              {ANALYTICS_DATA.ordersChart.map((day) => (
                <div key={day.date} className="flex items-center gap-4">
                  <div className="w-20 text-sm font-semibold text-foreground">{day.date}</div>
                  <div className="flex-grow bg-secondary rounded-full h-8 flex items-center px-3">
                    <div
                      className="bg-primary h-6 rounded-full"
                      style={{ width: `${(day.orders / 25) * 100}%` }}
                    />
                  </div>
                  <div className="text-sm font-semibold text-foreground">{day.orders} orders</div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="bg-white rounded-lg border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Revenue by Day (This Week)</h3>
            <div className="space-y-4">
              {ANALYTICS_DATA.ordersChart.map((day) => (
                <div key={day.date} className="flex items-center gap-4">
                  <div className="w-20 text-sm font-semibold text-foreground">{day.date}</div>
                  <div className="flex-grow bg-secondary rounded-full h-8 flex items-center px-3">
                    <div
                      className="bg-accent h-6 rounded-full"
                      style={{ width: `${(day.revenue / 350) * 100}%` }}
                    />
                  </div>
                  <div className="text-sm font-semibold text-foreground">${day.revenue.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Export */}
        <div className="bg-white rounded-lg border border-border p-6 text-center">
          <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 font-semibold">
            Download Report
          </button>
        </div>
      </div>
    </AdminLayout>
  )
}
