'use client'

import { useState, useTransition } from 'react'
import { Plus, Layers, Edit2, Trash2, X, Loader2 } from 'lucide-react'
import { createService, deleteService, toggleServiceStatus } from '@/lib/service-actions'
import { toast } from 'sonner'
import { formatPrice } from '@/lib/utils'

interface ServiceManagerProps {
  initialServices: any[]
}

export function ServiceManager({ initialServices }: ServiceManagerProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    const values = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      dryCleanPrice: parseFloat(formData.get('dryCleanPrice') as string),
      ironingPrice: parseFloat(formData.get('ironingPrice') as string),
      category: formData.get('category') as string,
    }

    startTransition(async () => {
      const res = await createService(values)
      if (res.success) {
        toast.success(res.success)
        setIsAdding(false)
      } else {
        toast.error(res.error)
      }
    })
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return
    
    startTransition(async () => {
      const res = await deleteService(id)
      if (res.success) toast.success(res.success)
      else toast.error(res.error)
    })
  }

  return (
    <div className="space-y-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
        <div>
          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-4 italic">Management</h2>
          <h1 className="text-3xl md:text-5xl font-black text-foreground tracking-tighter uppercase leading-none">SERVICE <br /><span className="font-light italic text-primary">LIST</span>.</h1>
          <p className="mt-8 text-[11px] font-black text-muted-foreground uppercase tracking-[0.3em] italic leading-relaxed">
            Manage your laundry services and pricing details.
          </p>
        </div>
        
        <button 
          onClick={() => setIsAdding(true)}
          className="w-full md:w-auto inline-flex items-center justify-center gap-4 bg-foreground text-background px-10 py-5 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-primary hover:text-white transition-all duration-700 active:scale-95 group"
        >
          <Plus size={16} />
          Add New Service
        </button>
      </div>

      {isAdding && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background/80 backdrop-blur-md animate-in fade-in duration-500">
          <div className="w-full max-w-2xl bg-background border border-foreground p-10 md:p-16 relative shadow-2xl">
            <button 
              onClick={() => setIsAdding(false)}
              className="absolute top-8 right-8 p-2 border border-border hover:border-foreground transition-colors"
            >
              <X size={20} />
            </button>
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-8 underline underline-offset-8">Create New Service</h2>
            
            <form onSubmit={handleCreate} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Service Name</label>
                  <input name="name" required placeholder="E.G. PREMIUM DRY CLEAN" className="w-full bg-secondary/20 border border-foreground p-5 text-[10px] font-black uppercase tracking-[0.2em] focus:outline-none focus:bg-background transition-all" />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Category</label>
                  <input name="category" required placeholder="E.G. GENTLE CARE" className="w-full bg-secondary/20 border border-foreground p-5 text-[10px] font-black uppercase tracking-[0.2em] focus:outline-none focus:bg-background transition-all" />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Service Description</label>
                <textarea name="description" required placeholder="ENTER SERVICE DESCRIPTION..." className="w-full bg-secondary/20 border border-foreground p-5 text-[10px] font-black uppercase tracking-[0.2em] focus:outline-none focus:bg-background h-32 transition-all resize-none" />
              </div>

              <div className="grid grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Dry Clean Price (₦)</label>
                  <input name="dryCleanPrice" type="number" step="0.01" required placeholder="0.00" className="w-full bg-secondary/20 border border-foreground p-5 text-[10px] font-black uppercase tracking-[0.2em] focus:outline-none focus:bg-background transition-all" />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Ironing Price (₦)</label>
                  <input name="ironingPrice" type="number" step="0.01" required placeholder="0.00" className="w-full bg-secondary/20 border border-foreground p-5 text-[10px] font-black uppercase tracking-[0.2em] focus:outline-none focus:bg-background transition-all" />
                </div>
              </div>

              <button 
                type="submit"
                disabled={isPending}
                className="w-full bg-foreground text-background py-6 text-[10px] font-black uppercase tracking-[0.5em] hover:bg-primary hover:text-white transition-all duration-700 disabled:opacity-50"
              >
                {isPending ? <Loader2 className="animate-spin mx-auto" size={16} /> : 'Save Service'}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 border border-foreground overflow-hidden">
        {initialServices.map((service, idx) => (
          <div key={service.id} className={`bg-background p-8 md:p-12 border-foreground hover:bg-secondary/10 transition-all duration-700 flex flex-col group 
            ${(idx + 1) % 2 !== 0 ? 'md:border-r' : ''} 
            ${(idx + 1) % 3 !== 0 ? 'xl:border-r' : 'xl:border-r-0'} 
            ${idx >= 1 ? 'border-t md:border-t-0' : ''}
            ${idx >= 2 ? 'md:border-t' : ''}
            ${idx >= 3 ? 'xl:border-t' : ''}`}>
            
            <div className="flex items-start justify-between mb-16">
              <div className="w-16 h-16 border border-foreground flex items-center justify-center text-foreground group-hover:bg-foreground group-hover:text-background transition-all duration-700">
                <Layers size={22} />
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => handleDelete(service.id)}
                  className="w-10 h-10 border border-border flex items-center justify-center text-red-600 hover:bg-red-600 hover:text-white transition-all hover:scale-110 active:scale-95 duration-300"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            <div className="flex-grow mb-16">
              <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-4 italic">Category: {service.category}</p>
              <h3 className="text-2xl font-black text-foreground tracking-tighter uppercase leading-tight mb-6 group-hover:text-primary transition-colors">{service.name}</h3>
              <p className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.2em] leading-relaxed italic line-clamp-3">{service.description}</p>
            </div>

            <div className="pt-12 border-t border-foreground flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em]">Dry Clean</span>
                <span className="text-xl font-black text-foreground tracking-tighter uppercase">{formatPrice(service.dryCleanPrice)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em]">Ironing</span>
                <span className="text-xl font-black text-foreground tracking-tighter uppercase">{formatPrice(service.ironingPrice)}</span>
              </div>
            </div>
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 ${service.isActive ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-foreground">{service.isActive ? 'Active' : 'Offline'}</span>
              </div>
            </div>
        ))}

        {initialServices.length === 0 && (
          <div className="col-span-full py-32 text-center bg-secondary/10">
            <Layers size={40} className="mx-auto text-muted-foreground opacity-20 mb-8" />
            <h4 className="text-[10px] font-black text-foreground uppercase tracking-[0.5em]">NO SERVICES RECORDED</h4>
            <p className="text-[9px] text-muted-foreground mt-4 uppercase tracking-[0.2em] italic">Add your first service to begin operations.</p>
          </div>
        )}
      </div>
    </div>
  )
}
