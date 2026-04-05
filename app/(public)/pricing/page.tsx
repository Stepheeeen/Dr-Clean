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
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 mb-6 tracking-tight">Simple & Transparent Pricing</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Premium laundry services with no hidden surprises. 
            <span className="block text-primary font-semibold mt-2">Nigerian Naira (₦) as our standard.</span>
          </p>
        </div>
      </section>

      {/* Main Pricing Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="group relative bg-white rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{service.name}</h3>
                  <p className="text-slate-500 text-sm h-12 overflow-hidden line-clamp-2">{service.description}</p>
                </div>
                
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-primary">{formatPrice(service.price)}</span>
                    <span className="text-slate-400 font-medium">/{service.unit}</span>
                  </div>
                </div>

                <Link
                  href="/register"
                  className="w-full mt-auto py-4 rounded-xl font-bold text-center transition-all bg-slate-50 group-hover:bg-primary group-hover:text-white text-slate-900"
                >
                  Book Now
                </Link>
              </div>
            ))}
          </div>

          {/* Pricing Details & Extras */}
          <div className="mt-24 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Surcharges */}
            <div className="bg-slate-900 text-white rounded-3xl p-10 lg:col-span-1">
              <h2 className="text-2xl font-bold mb-6">Service Add-ons</h2>
              <div className="space-y-6">
                {modifiers.map((modifier) => (
                  <div key={modifier.id} className="border-b border-white/10 pb-4">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold text-lg">{modifier.name}</span>
                      <span className="text-primary font-bold">
                        {modifier.valueType === 'FIXED' ? `+${formatPrice(modifier.price)}` : `+${modifier.price}%`}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm">{modifier.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bulk Discounts */}
            <div className="bg-blue-600 text-white rounded-3xl p-10 lg:col-span-2 relative overflow-hidden">
               <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-8 italic uppercase tracking-widest">Bulk Savings</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {bulkDiscounts.map((discount) => (
                    <div key={discount.id} className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm">
                      <div className="text-5xl font-black mb-4">{discount.percentage}% <span className="text-2xl block text-white/70">OFF</span></div>
                      <p className="font-medium text-lg">Orders over {formatPrice(discount.threshold)}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-12 p-6 bg-black/20 rounded-2xl">
                  <p className="text-white/80 leading-relaxed italic">
                    "We value our frequent customers and heavy laundry weeks. These discounts are automatically applied at checkout for your convenience."
                  </p>
                </div>
               </div>
               
               {/* Decorative Element */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-bold mb-6 uppercase tracking-wider">Start Today</div>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">Ready for Fresh & Clean?</h2>
          <p className="text-xl text-slate-600 mb-10 leading-relaxed">
            Join thousands of happy customers who trust Dr. Clean for their laundry needs. 
            Quality service is just a few clicks away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="px-12 py-5 bg-primary text-white rounded-2xl text-xl font-bold hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
