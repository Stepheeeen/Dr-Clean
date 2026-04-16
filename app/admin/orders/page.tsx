import { AdminLayout } from '@/components/layouts/AdminLayout'
import { getOrders } from '@/lib/actions'
import { Search, Filter } from 'lucide-react'
import { OrdersTable } from '@/components/admin/OrdersTable'

export default async function AdminOrdersPage() {
  const orders = await getOrders()

  return (
    <AdminLayout>
      <div className="space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div>
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-4 italic">Management</h2>
            <h1 className="text-3xl md:text-5xl font-black text-foreground tracking-tighter uppercase leading-none">ORDER <br /><span className="font-light italic text-primary">LIST</span>.</h1>
            <p className="mt-8 text-[11px] font-black text-muted-foreground uppercase tracking-[0.3em] italic leading-relaxed">
              Track and manage all customer orders in the system.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <div className="relative group w-full md:w-80">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="SEARCH ORDERS..." 
                className="pl-14 pr-8 py-5 bg-background border border-foreground text-[10px] font-black uppercase tracking-[0.3em] focus:outline-none focus:bg-secondary/20 transition-all w-full"
              />
            </div>
            <button className="p-5 border border-foreground hover:bg-foreground hover:text-background transition-all duration-500 w-full sm:w-auto flex items-center justify-center">
              <Filter size={16} />
            </button>
          </div>
        </div>

        <OrdersTable orders={orders} />
      </div>
    </AdminLayout>
  )
}
