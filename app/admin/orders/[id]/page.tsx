import { AdminLayout } from '@/components/layouts/AdminLayout'
import { getOrderById } from '@/lib/actions'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { OrderManagement } from '@/components/admin/OrderManagement'
import { notFound } from 'next/navigation'
import { DeleteOrderButton } from '@/components/DeleteOrderButton'

export default async function AdminOrderDetailPage({ params }: { params: { id: string } }) {
  const order = await getOrderById(params.id)

  if (!order) {
    return notFound()
  }

  return (
    <AdminLayout>
      <div className="space-y-16 max-w-5xl mx-auto">
        {/* Navigation & Identifier */}
        <div className="flex flex-col gap-12">
          <Link
            href="/admin/orders"
            className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground hover:text-primary transition-all group w-fit"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
            Back to Orders
          </Link>

          <header className="flex flex-col md:flex-row md:items-end justify-between border-b border-foreground pb-12 gap-8">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-4 italic">Order Details</p>
              <h1 className="text-3xl md:text-5xl font-black text-foreground tracking-tighter uppercase leading-none break-all">
                #{order.orderNumber}
              </h1>
              <p className="mt-6 text-[11px] font-black text-muted-foreground uppercase tracking-[0.3em] flex flex-wrap items-center gap-4 italic">
                <span>NAME: {order.user.name}</span>
                <span className="hidden sm:block w-1 h-1 bg-border rounded-full" />
                <span>PLACED: {new Date(order.createdAt).toLocaleDateString()}</span>
              </p>
            </div>
            
            <div className="flex flex-col items-end gap-2">
               <p className="text-[8px] font-black uppercase tracking-[0.4em] text-muted-foreground opacity-50">Current Status</p>
               <div className={`px-8 py-4 border border-foreground text-[10px] font-black uppercase tracking-[0.4em] w-fit ${
                order.status === 'Completed' ? 'bg-emerald-500 text-white border-emerald-500' :
                order.status === 'Ready' ? 'bg-blue-500 text-white border-blue-500' :
                'bg-background text-foreground'
              }`}>
                {order.status}
              </div>
              {order.status === 'Pending' && order.paymentStatus !== 'Paid' && (
                <div className="mt-4">
                  <DeleteOrderButton orderId={order.id} orderNumber={order.orderNumber} />
                </div>
              )}
            </div>
          </header>
        </div>

        <OrderManagement order={order} />
      </div>
    </AdminLayout>
  )
}
