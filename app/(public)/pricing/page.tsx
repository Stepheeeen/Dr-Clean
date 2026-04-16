import { PublicLayout } from '@/components/layouts/PublicLayout'
import { Metadata } from "next"
import { getServices } from '@/lib/service-actions'
import { getPricingData } from '@/lib/pricing-actions'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import { Service, PriceModifier, BulkDiscount } from '@/types'

export const metadata: Metadata = {
  title: 'Pricing & Packages',
  description: 'Transparent and affordable pricing for premium laundry and dry cleaning services. Check our rates for ironing, washing, and deep cleaning.',
}

export const dynamic = 'force-dynamic'

export default async function PricingPage() {
  const [servicesResponse, pricingData] = await Promise.all([
    getServices(),
    getPricingData()
  ])

  const services: Service[] = (servicesResponse as Service[]) || []
  const { modifiers, bulkDiscounts }: { 
    modifiers: PriceModifier[], 
    bulkDiscounts: BulkDiscount[] 
  } = pricingData as any || { modifiers: [], bulkDiscounts: [] }

  return (
    <PublicLayout>
      {/* Header */}
      <section className="pt-32 pb-24 px-6 lg:px-12 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto text-left">
          <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-primary mb-6">Economics</h2>
          <h1 className="text-6xl sm:text-8xl font-black text-foreground mb-10 tracking-tighter leading-[0.9] uppercase">
            TRANSPARENT <br /><span className="font-light italic">INVESTMENT.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed font-medium">
            Premium care with no hidden surprises. 
            <span className="block text-primary font-black mt-4 uppercase text-xs tracking-widest">Naira (₦) as standard.</span>
          </p>
        </div>
      </section>

      {/* Main Pricing Grid */}
      <section className="py-32 px-6 lg:px-12 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-1 gap-y-1 bg-border border border-border">
            {services.map((service) => (
              <div
                key={service.id}
                className="group relative bg-background p-10 flex flex-col hover:z-10 transition-all duration-500"
              >
                <div className="mb-10">
                  <h3 className="text-[10px] uppercase tracking-[0.3em] font-black text-primary mb-1">{service.name[0]}</h3>
                  <h4 className="text-xl font-black tracking-tighter uppercase">{service.name}</h4>
                </div>
                
                <div className="mb-12 space-y-6">
                  <div>
                    <p className="text-[8px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-2">Dry Clean</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black tracking-tighter text-foreground">{formatPrice(service.dryCleanPrice)}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-[8px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-2">Ironing Only</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black tracking-tighter text-foreground">{formatPrice(service.ironingPrice)}</span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/register"
                  className="w-full mt-auto py-5 border border-border font-black text-[10px] uppercase tracking-[0.4em] text-center transition-all duration-500 hover:bg-foreground hover:text-background"
                >
                  Initiate
                </Link>
              </div>
            ))}
          </div>

          {/* Pricing Details & Extras */}
          <div className="mt-32 grid grid-cols-1 lg:grid-cols-3 gap-1">
            {/* Surcharges */}
            <div className="bg-foreground text-background p-16 lg:col-span-1 border border-border">
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-primary mb-12">Addenda</h2>
              <div className="space-y-12">
                {modifiers.map((modifier) => (
                  <div key={modifier.id} className="group">
                    <div className="flex justify-between items-baseline mb-4">
                      <span className="text-xl font-black tracking-tighter uppercase">{modifier.name}</span>
                      <span className="text-primary font-black tracking-tighter text-xl">
                        {modifier.valueType === 'FIXED' ? `+${formatPrice(modifier.price)}` : `+${modifier.price}%`}
                      </span>
                    </div>
                    <p className="text-muted-foreground font-medium leading-relaxed italic">{modifier.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bulk Discounts */}
            <div className="bg-secondary p-16 lg:col-span-2 border border-border relative overflow-hidden flex flex-col justify-between">
               <div className="relative z-10">
                <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-primary mb-12">Collective Savings</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                  {bulkDiscounts.map((discount) => (
                    <div key={discount.id} className="p-0">
                      <div className="text-6xl font-black tracking-tighter mb-4 text-foreground">{discount.percentage}% <span className="text-xs uppercase tracking-[0.4em] block opacity-40">Reduction</span></div>
                      <p className="font-bold uppercase text-[10px] tracking-widest text-muted-foreground">Volume over {formatPrice(discount.threshold)}</p>
                    </div>
                  ))}
                </div>
               </div>
               
               <div className="mt-20 p-8 border-l border-primary/20 bg-background/50 italic">
                <p className="text-muted-foreground leading-relaxed font-medium">
                  "Efficiency of scale is honored. These protocols are applied automatically to your session."
                </p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-48 px-6 lg:px-12 bg-background border-t border-border text-center overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-6xl sm:text-8xl font-black text-foreground mb-12 tracking-tighter uppercase leading-[0.9]">ESTABLISH <br /><span className="font-light italic text-primary">YOUR PORTFOLIO.</span></h2>
          <p className="text-xl text-muted-foreground mb-20 max-w-2xl mx-auto font-medium">
            Experience the zenith of garment care with Dr. Clean.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
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
