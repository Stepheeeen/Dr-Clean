import { AdminLayout } from '@/components/layouts/AdminLayout'
import Link from 'next/link'
import { getCustomers } from '@/lib/actions'
import { formatPrice } from '@/lib/utils'
import { Search, UserCheck, Mail, Calendar, ChevronRight } from 'lucide-react'

export default async function AdminCustomersPage() {
  const customers = await getCustomers()

  return (
    <AdminLayout>
      <div className="space-y-16">
        {/* Header Section - Architectural */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div>
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-4 italic">Customer Directory</h2>
            <h1 className="text-3xl md:text-5xl font-black text-foreground tracking-tighter uppercase leading-none">CUSTOMER <br /><span className="font-light italic text-primary">LIST</span>.</h1>
            <p className="mt-8 text-[11px] font-black text-muted-foreground uppercase tracking-[0.3em] italic leading-relaxed">
              View and manage all registered customers and their activity.
            </p>
          </div>
          
          <div className="relative group w-full md:w-80">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="SEARCH CUSTOMERS..." 
              className="pl-14 pr-8 py-5 bg-background border border-foreground text-[10px] font-black uppercase tracking-[0.3em] focus:outline-none focus:bg-secondary/20 transition-all w-full"
            />
          </div>
        </div>

        {/* Customers Ledger - Rigid Grid */}
        <div className="border border-foreground bg-background overflow-hidden relative">
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-foreground/20 scrollbar-track-transparent">
            <table className="w-full min-w-[1000px]">
              <thead className="bg-foreground text-background">
                <tr className="text-[9px] font-black uppercase tracking-[0.5em]">
                  <th className="px-6 md:px-10 py-6 text-left">CUSTOMER</th>
                  <th className="px-6 md:px-10 py-6 text-left">ORDERS</th>
                  <th className="px-6 md:px-10 py-6 text-left">TOTAL SPENT</th>
                  <th className="px-6 md:px-10 py-6 text-left">JOINED</th>
                  <th className="px-6 md:px-10 py-6 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-foreground/10">
                {customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-secondary/10 transition-all duration-500 group">
                    <td className="px-6 md:px-10 py-8">
                      <div className="flex items-center gap-6">
                        <div className="w-14 h-14 border border-foreground flex items-center justify-center text-foreground font-black text-[10px] group-hover:bg-foreground group-hover:text-background transition-all duration-700">
                          {customer.name?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-foreground tracking-[0.2em] uppercase">{customer.name || 'ANONYMOUS'}</p>
                          <p className="text-[9px] text-muted-foreground font-black uppercase tracking-[0.2em] mt-1 flex items-center gap-2 italic">
                            <Mail size={10} /> {customer.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 md:px-10 py-8">
                      <div className="flex items-center gap-4">
                        <div className="w-1 h-8 bg-primary/20 group-hover:bg-primary transition-colors" />
                        <div>
                          <p className="text-sm font-black text-foreground tracking-tight">{customer._count?.orders || 0}</p>
                          <p className="text-[9px] text-muted-foreground font-black uppercase tracking-[0.2em]">Orders</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 md:px-10 py-8">
                      <p className="text-sm font-black text-foreground tracking-widest uppercase">
                        {formatPrice(customer.orders.reduce((sum, o) => sum + o.total, 0))}
                      </p>
                      <p className="text-[9px] text-muted-foreground font-black uppercase tracking-[0.2em] mt-1 italic">Total Lifetime</p>
                    </td>
                    <td className="px-6 md:px-10 py-8">
                      <p className="text-[10px] font-black text-foreground tracking-[0.3em] uppercase flex items-center gap-3 italic">
                        <Calendar size={12} className="text-primary" />
                        {new Date(customer.createdAt).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="px-6 md:px-10 py-8 text-right">
                      <Link 
                        href={`/admin/customers/${customer.id}`}
                        className="inline-flex items-center justify-center border border-foreground px-8 py-3 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-foreground hover:text-background transition-all duration-500 group/btn"
                      >
                        VIEW
                        <ChevronRight size={14} className="ml-3 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </td>
                  </tr>
                ))}
                {customers.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-10 py-32 text-center">
                      <div className="max-w-xs mx-auto">
                        <UserCheck size={40} className="mx-auto text-muted-foreground opacity-20 mb-8" />
                        <h4 className="text-[10px] font-black text-foreground uppercase tracking-[0.5em]">NO CUSTOMERS FOUND</h4>
                        <p className="text-[9px] text-muted-foreground mt-4 uppercase tracking-[0.2em] italic">Once customers register, they will appear here.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <footer className="p-6 md:p-10 border-t border-foreground bg-secondary/5 flex items-center justify-between">
            <p className="text-[9px] text-muted-foreground font-black uppercase tracking-[0.3em]">
              TOTAL: <span className="text-foreground">{customers.length}</span> CUSTOMERS
            </p>
          </footer>
        </div>
      </div>
    </AdminLayout>
  )
}
