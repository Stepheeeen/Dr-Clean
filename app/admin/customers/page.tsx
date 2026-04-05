import { AdminLayout } from '@/components/layouts/AdminLayout'
import Link from 'next/link'
import { getCustomers } from '@/lib/actions'
import { formatPrice } from '@/lib/utils'
import { Search, UserCheck, Mail, Calendar, ChevronRight } from 'lucide-react'

export default async function AdminCustomersPage() {
  const customers = await getCustomers()

  return (
    <AdminLayout>
      <div className="space-y-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-extrabold text-foreground tracking-tighter">Customer Directory</h2>
            <p className="text-muted-foreground text-sm font-medium mt-1">Manage and review your client database and their activity.</p>
          </div>
          
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search customers..." 
              className="pl-11 pr-6 py-3 bg-white border border-border/50 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all w-64 shadow-sm"
            />
          </div>
        </div>

        {/* Customers Table */}
        <div className="bg-white rounded-[2.5rem] border border-border/50 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50/50 border-b border-border/30">
                <tr className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
                  <th className="px-8 py-5 text-left">Identity</th>
                  <th className="px-8 py-5 text-left">Activity</th>
                  <th className="px-8 py-5 text-left">Engagement</th>
                  <th className="px-8 py-5 text-left">Member Since</th>
                  <th className="px-8 py-5 text-right">Portfolio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                {customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-muted/30 transition-all duration-300 group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary font-bold text-sm ring-4 ring-primary/5 group-hover:scale-110 transition-transform duration-500">
                          {customer.name?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-foreground tracking-tight">{customer.name || 'Unnamed User'}</p>
                          <p className="text-[10px] text-muted-foreground font-medium flex items-center gap-1">
                            <Mail size={10} /> {customer.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-slate-100 rounded-xl text-slate-500">
                          <UserCheck size={16} />
                        </div>
                        <div>
                          <p className="text-sm font-extrabold text-foreground tracking-tight">{customer._count?.orders || 0}</p>
                          <p className="text-[10px] text-muted-foreground font-medium">Orders Placed</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-sm font-extrabold text-foreground tracking-tight">
                        {formatPrice(customer.orders.reduce((sum, o) => sum + o.total, 0))}
                      </p>
                      <p className="text-[10px] text-muted-foreground font-medium mt-0.5">Lifetime Investment</p>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-sm font-bold text-foreground tracking-tight flex items-center gap-1.5">
                        <Calendar size={14} className="text-muted-foreground" />
                        {new Date(customer.createdAt).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <Link 
                        href={`/admin/customers/${customer.id}`}
                        className="inline-flex items-center justify-center px-4 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold text-xs hover:bg-primary hover:text-white transition-all duration-300 group/btn shadow-sm"
                      >
                        Details
                        <ChevronRight size={14} className="ml-1 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </td>
                  </tr>
                ))}
                {customers.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-8 py-24 text-center">
                      <div className="max-w-xs mx-auto">
                        <Mail size={48} className="mx-auto text-muted-foreground opacity-20 mb-4" />
                        <h4 className="text-lg font-bold text-foreground tracking-tight">Empty Userbase</h4>
                        <p className="text-sm text-muted-foreground mt-1">When users register on the platform, they will appear in this directory automatically.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="p-8 border-t border-border/30 bg-slate-50/30 flex items-center justify-between">
            <p className="text-xs text-muted-foreground font-medium">Monitoring <span className="font-bold text-foreground">{customers.length}</span> individual customer records</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
