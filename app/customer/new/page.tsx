import { auth } from '@/auth'
import { CustomerLayout } from '@/components/layouts/CustomerLayout'
import { getServices } from '@/lib/actions'
import { getPricingData } from '@/lib/pricing-actions'
import NewOrderForm from '@/components/forms/NewOrderForm'
import { redirect } from 'next/navigation'

export default async function NewOrderPage() {
  const session = await auth()
  if (!session?.user) {
    redirect('/login')
  }

  const services = await getServices()
  const { bulkDiscounts } = await getPricingData()

  return (
    <CustomerLayout>
      <NewOrderForm 
        services={services} 
        userId={session.user.id as string} 
        email={session.user.email as string}
        bulkDiscounts={bulkDiscounts}
      />
    </CustomerLayout>
  )
}
