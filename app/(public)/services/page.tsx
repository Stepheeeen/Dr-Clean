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
      <section className="pt-32 pb-24 px-6 lg:px-12 bg-foreground text-background overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-0 right-0 w-[40vw] h-[40vw] border border-background rounded-full translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-background/5 border border-background/10 text-[10px] uppercase tracking-[0.3em] font-black mb-10">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Fabric Preservation</span>
            </div>
            <h1 className="text-6xl sm:text-8xl font-black mb-10 leading-[0.9] tracking-tighter uppercase">
              EXCEPTIONAL <br /><span className="font-light italic">RESTORATION.</span>
            </h1>
            <p className="text-xl opacity-70 leading-relaxed max-w-2xl font-medium">
              Every category of care is executed with architectural precision, 
              ensuring your garments return in their pristine state.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-32 px-6 lg:px-12 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
            {services.map((service) => (
              <div key={service.id} className="group flex flex-col gap-10 p-0 transition-all duration-700">
                <div className="flex items-start justify-between border-b border-border pb-8">
                  <div className="text-5xl font-black tracking-tighter text-foreground group-hover:text-primary transition-colors duration-500">
                    {service.name[0]}
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-[0.3em] font-black text-primary mb-2">{service.category}</div>
                    <div className="text-3xl font-black tracking-tighter text-foreground">
                      {formatPrice(service.price)} <span className="text-xs uppercase tracking-widest font-bold opacity-40">/ {service.unit}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-8">
                  <h3 className="text-4xl font-black tracking-tighter text-foreground group-hover:tracking-tight transition-all duration-700 uppercase">{service.name}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed font-medium">
                    {service.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-6 text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground">
                    <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-primary rounded-full"></div> Premium Care</div>
                    <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-primary rounded-full"></div> 24H Delivery</div>
                    <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-primary rounded-full"></div> Protection</div>
                    <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-primary rounded-full"></div> Finishing</div>
                  </div>

                  <Link href="/register" className="inline-flex px-10 py-5 bg-foreground text-background font-black text-[10px] uppercase tracking-[0.4em] hover:bg-primary hover:text-white transition-all duration-500">
                    Book Session
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-48 px-6 lg:px-12 bg-background border-t border-border relative overflow-hidden text-center">
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-5xl sm:text-7xl font-black text-foreground mb-10 tracking-tighter uppercase leading-[0.9]">DEDICATED TO <br /><span className="font-light italic text-primary">YOUR WARDROBE.</span></h2>
          <p className="text-xl text-muted-foreground mb-16 max-w-2xl mx-auto font-medium">
            Join the collective of individuals who have elevated their expectations.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <Link
              href="/register"
              className="bg-foreground text-background px-16 py-6 font-black uppercase tracking-[0.4em] text-xs hover:bg-primary hover:text-white transition-all duration-500"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
