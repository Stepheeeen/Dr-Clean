import { auth } from '@/auth'
import { CustomerLayout } from '@/components/layouts/CustomerLayout'
import { getServices } from '@/lib/actions'
import NewOrderForm from '@/components/forms/NewOrderForm'
import { redirect } from 'next/navigation'

export default async function NewOrderPage() {
  const session = await auth()
  if (!session?.user) {
    redirect('/login')
  }

  const services = await getServices()

  return (
    <CustomerLayout>
      <NewOrderForm services={services} userId={session.user.id as string} />
    </CustomerLayout>
  )
}
