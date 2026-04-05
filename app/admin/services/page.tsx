import { AdminLayout } from '@/components/layouts/AdminLayout'
import { getServices } from '@/lib/actions'
import { formatPrice } from '@/lib/utils'
import { Plus, Search, Filter, Edit2, Trash2, MoreHorizontal, ChevronRight, CheckCircle2, Clock, Tag, Smartphone, Layers, Check } from 'lucide-react'

export default async function AdminServicesPage() {
  const services = await getServices()

  return (
    <AdminLayout>
      <div className="space-y-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-extrabold text-foreground tracking-tighter">Service Catalog</h2>
            <p className="text-muted-foreground text-sm font-medium mt-1">Define your offerings and optimize pricing strategies.</p>
          </div>
          
          <button className="inline-flex items-center gap-2 bg-primary text-white shadow-xl shadow-primary/20 hover:shadow-primary/40 px-8 py-3.5 rounded-2xl font-bold transition-all duration-300 hover:-translate-y-1 active:scale-95">
            <Plus size={18} />
            Add New Service
          </button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-[2.5rem] border border-border/50 p-8 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col group">
              <div className="flex items-start justify-between mb-8">
                <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-primary shadow-inner group-hover:scale-110 transition-transform duration-500">
                  <Smartphone size={24} className="opacity-80" />
                </div>
                <div className="flex gap-2">
                  <button className="p-2.5 bg-slate-100 text-slate-600 rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm">
                    <Edit2 size={16} />
                  </button>
                  <button className="p-2.5 bg-slate-100 text-destructive rounded-xl hover:bg-destructive hover:text-white transition-all shadow-sm">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="flex-grow mb-8">
                <h3 className="text-xl font-bold text-foreground tracking-tight mb-2 group-hover:text-primary transition-colors">{service.name}</h3>
                <p className="text-sm text-muted-foreground font-medium line-clamp-2">{service.description}</p>
              </div>

              <div className="pt-8 border-t border-border/30 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Price Per Item</p>
                  <p className="text-2xl font-extrabold text-foreground tracking-tighter">{formatPrice(service.price)}</p>
                </div>
                <span className="px-4 py-1.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full border border-emerald-200 shadow-sm flex items-center gap-1.5">
                  <Check size={12} />
                  Active Offer
                </span>
              </div>
            </div>
          ))}

          {services.length === 0 && (
            <div className="col-span-full py-20 text-center bg-white rounded-[3rem] border border-dashed border-border/80">
              <Layers size={48} className="mx-auto text-muted-foreground opacity-20 mb-4" />
              <h4 className="text-lg font-bold text-foreground tracking-tight">Empty Catalog</h4>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto mt-1">Start adding services to begin receiving orders from your customers.</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
