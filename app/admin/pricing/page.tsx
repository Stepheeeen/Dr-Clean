import { AdminLayout } from '@/components/layouts/AdminLayout'
import { getServices } from '@/lib/service-actions'
import { getPricingData } from '@/lib/pricing-actions'
import { PricingManager } from '@/components/admin/PricingManager'

export const dynamic = 'force-dynamic'

export default async function AdminPricingPage() {
  const [services, { modifiers, bulkDiscounts }] = await Promise.all([
    getServices(),
    getPricingData()
  ])

  return (
    <AdminLayout>
      <PricingManager 
        services={services} 
        modifiers={modifiers} 
        bulkDiscounts={bulkDiscounts} 
      />
    </AdminLayout>
  )
}
