import { AdminLayout } from '@/components/layouts/AdminLayout'
import { getServices } from '@/lib/service-actions'
import { getPricingData } from '@/lib/pricing-actions'
import { ServicePricingCard } from '@/components/admin/ServicePricingCard'
import { ModifierPricingCard } from '@/components/admin/ModifierPricingCard'
import { BulkDiscountCard } from '@/components/admin/BulkDiscountCard'
import { Service, PriceModifier, BulkDiscount } from '@/types'

export const dynamic = 'force-dynamic'

export default async function AdminPricingPage() {
  const servicesResponse = await getServices()
  const pricingResponse = await getPricingData()

  const services: Service[] = (servicesResponse as Service[]) || []
  const { modifiers, bulkDiscounts } = pricingResponse

  return (
    <AdminLayout>
      <div className="space-y-8 pb-12">
        <div>
          <h2 className="text-3xl font-bold text-foreground tracking-tight">Pricing Management</h2>
          <p className="text-muted-foreground mt-2">Control your service rates, surcharges, and bulk discounts.</p>
        </div>

        {/* Service Pricing */}
        <section className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-border bg-slate-50/50">
            <h3 className="text-lg font-semibold text-foreground">Service Rates</h3>
            <p className="text-sm text-muted-foreground">Standard pricing per unit (kg, item, etc.)</p>
          </div>
          <div className="p-6">
            <div className="grid gap-4">
              {services.map((service: Service) => (
                <ServicePricingCard key={service.id} service={service} />
              ))}
              {services.length === 0 && (
                <p className="text-center py-8 text-muted-foreground italic">No services found. Run seed script or add services.</p>
              )}
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Modifiers */}
          <section className="bg-white rounded-xl border border-border shadow-sm overflow-hidden h-fit">
            <div className="px-6 py-4 border-b border-border bg-slate-50/50">
              <h3 className="text-lg font-semibold text-foreground">Surcharges & Fees</h3>
              <p className="text-sm text-muted-foreground">Additional charges for special handling or speeds.</p>
            </div>
            <div className="p-6">
              <div className="grid gap-4">
                {modifiers.map((modifier: PriceModifier) => (
                  <ModifierPricingCard key={modifier.id} modifier={modifier} />
                ))}
                {modifiers.length === 0 && (
                  <p className="text-center py-8 text-muted-foreground italic">No modifiers found.</p>
                )}
              </div>
            </div>
          </section>

          {/* Bulk Discounts */}
          <section className="bg-white rounded-xl border border-border shadow-sm overflow-hidden h-fit">
            <div className="px-6 py-4 border-b border-border bg-slate-50/50">
              <h3 className="text-lg font-semibold text-foreground">Bulk Store Discounts</h3>
              <p className="text-sm text-muted-foreground">Automatic tier-based discounts based on order total.</p>
            </div>
            <div className="p-6">
              <div className="grid gap-4">
                {bulkDiscounts.map((discount: BulkDiscount) => (
                  <BulkDiscountCard key={discount.id} discount={discount} />
                ))}
                {bulkDiscounts.length === 0 && (
                  <p className="text-center py-8 text-muted-foreground italic">No discounts defined.</p>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </AdminLayout>
  )
}
