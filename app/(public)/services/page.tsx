import { PublicLayout } from '@/components/layouts/PublicLayout'
import { getServices } from '@/lib/service-actions'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import { CheckCircle2, Clock, ShieldCheck, Sparkles } from 'lucide-react'
import { Service } from '@/types'

export const dynamic = 'force-dynamic'

export default async function ServicesPage() {
  const servicesResponse = await getServices()
  const services: Service[] = (servicesResponse as Service[]) || []

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-slate-950 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-400 rounded-full blur-[120px]"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20 text-sm font-medium mb-8 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Premium Care for Every Fabric</span>
            </div>
            <h1 className="text-5xl sm:text-7xl font-bold mb-8 leading-[1.1] tracking-tight">
              Exceptional Results, <span className="text-primary italic">Every Time.</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed max-w-2xl">
              We've refined our processes across every category to ensure your garments 
              return to you in their best possible condition.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {services.map((service) => (
              <div key={service.id} className="group flex flex-col gap-8 p-8 rounded-[2.5rem] bg-slate-50 hover:bg-blue-50 transition-all duration-500 border border-transparent hover:border-blue-100">
                <div className="flex items-start justify-between">
                  <div className="w-20 h-20 rounded-3xl bg-white shadow-xl shadow-slate-200 flex items-center justify-center text-3xl font-black text-primary group-hover:scale-110 transition-transform duration-500">
                    {service.name[0]}
                  </div>
                  <div className="text-right">
                    <div className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">{service.category}</div>
                    <div className="text-2xl font-bold text-slate-900">{formatPrice(service.price)} <span className="text-sm font-medium text-slate-400">/{service.unit}</span></div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-4 group-hover:text-blue-700 transition-colors">{service.name}</h3>
                  <p className="text-slate-600 text-lg leading-relaxed mb-8">
                    {service.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-10 text-sm font-medium text-slate-500">
                    <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Premium Detergents</div>
                    <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> 24-48h Delivery</div>
                    <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary" /> Fabric Protection</div>
                    <div className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-primary" /> Expert Finishing</div>
                  </div>

                  <Link href="/register" className="inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-primary transition-all translate-y-0 hover:-translate-y-1">
                    Book This Service
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-blue-600 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl sm:text-6xl font-bold text-white mb-8 tracking-tight">Trust Your Wardrobe to the Experts</h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
            Experience the difference that professional care makes. Join Dr. Clean today and reclaim your time.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="/register"
              className="bg-white text-blue-600 px-12 py-5 rounded-2xl text-xl font-bold hover:shadow-2xl transition-all hover:scale-105"
            >
              Get Started Now
            </Link>
            <Link
              href="/pricing"
              className="bg-blue-700 text-white border border-blue-500/50 px-12 py-5 rounded-2xl text-xl font-bold hover:bg-blue-800 transition-all"
            >
              View Full Price List
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
