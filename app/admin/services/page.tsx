import { AdminLayout } from '@/components/layouts/AdminLayout'
import { getServices } from '@/lib/service-actions'
import { ServiceManager } from '@/components/admin/ServiceManager'

export default async function AdminServicesPage() {
  const services = await getServices()

  return (
    <AdminLayout>
      <ServiceManager initialServices={services} />
    </AdminLayout>
  )
}
