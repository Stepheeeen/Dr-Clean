import { CustomerLayout } from '@/components/layouts/CustomerLayout'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import { getOrderById } from '@/lib/actions'
import { ChevronLeft, MapPin, Calendar, Plus, CreditCard, Banknote } from 'lucide-react'
import { notFound, redirect } from 'next/navigation'
import { auth } from '@/auth'
import { PaymentVerifier } from '@/components/public/PaymentVerifier'
import { OrderPaymentButton } from '@/components/public/OrderPaymentButton'
import { DeleteOrderButton } from '@/components/DeleteOrderButton'
import { Suspense } from 'react'

export default async function OrderDetailPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const session = await auth()
  if (!session?.user) redirect('/login')

  const order = await getOrderById(id)
  if (!order) notFound()

  // Ensure user can only see their own orders
  if (order.userId !== session.user.id && (session.user as any).role !== 'ADMIN') {
    redirect('/customer/dashboard')
  }

  const statusProgress = ['Pending', 'Processing', 'Pickup Scheduled', 'Picked Up', 'Received', 'In Cleaning', 'Ready', 'Delivered', 'Completed']
  const currentStatusIndex = statusProgress.indexOf(order.status)

  return (
    <CustomerLayout>
      <div className="space-y-16">
        {/* Back Button & Verifier */}
        <div className="flex items-center justify-between border-b border-border pb-8">
          <Link
            href="/customer/orders"
            className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground hover:text-foreground transition-all flex items-center gap-4 group"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
            Back to Orders
          </Link>
          <Suspense fallback={null}>
            <PaymentVerifier />
          </Suspense>
        </div>

        {/* Order Header - Architectural */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-6 mb-8">
              <h1 className="text-5xl font-black text-foreground tracking-tighter uppercase leading-none">ORDER NO. {order.orderNumber}</h1>
              {order.paymentStatus === 'Paid' && (
                <span className="text-[10px] font-black tracking-[0.3em] uppercase text-emerald-600 border border-emerald-200 bg-emerald-50 px-4 py-1.5">
                  Verified Payment
                </span>
              )}
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground italic">
              Ordered on {new Date(order.createdAt).toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' })}
            </p>
          </div>
          <div className="border border-primary/20 bg-primary/5 px-10 py-5">
            <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-2">Live Status</p>
            <h2 className="text-2xl font-black text-foreground tracking-tighter uppercase">{order.status}</h2>
          </div>
        </header>

        {/* Status Timeline - Minimalist Linear */}
        <div className="border border-border p-12 bg-secondary/20">
          <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] mb-12">Order Tracking</h3>
          <div className="w-full h-px bg-border relative mb-12">
            <div className="absolute top-0 left-0 h-full bg-primary transition-all duration-1000" style={{ width: `${(currentStatusIndex / (statusProgress.length - 1)) * 100}%` }}></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-8">
            {statusProgress.map((status, index) => (
              <div key={status} className="space-y-4">
                <div className={`text-xl font-black tracking-tighter ${index <= currentStatusIndex ? 'text-primary' : 'text-muted-foreground/30'}`}>
                  0{index + 1}<span className="text-primary">.</span>
                </div>
                <p className={`text-[9px] font-black uppercase tracking-widest leading-tight ${index <= currentStatusIndex ? 'text-foreground' : 'text-muted-foreground/30'}`}>
                  {status}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Service breakdown */}
          <div className="lg:col-span-2 space-y-12">
            <h3 className="text-xs font-black text-foreground tracking-[0.3em] uppercase border-b border-border pb-6">Order Items</h3>
            <div className="space-y-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-8 border border-border group hover:bg-secondary/30 transition-all duration-300">
                  <div className="space-y-1">
                    <p className="font-black text-foreground uppercase tracking-tight">{item.name}</p>
                    <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">QUANTITY: {item.quantity}</p>
                  </div>
                  <p className="text-xl font-black text-foreground tracking-tighter uppercase">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
              
              <div className="mt-12 p-10 border-t border-border space-y-8 bg-background">
                <div className="flex justify-between items-baseline">
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Payment Method</span>
                  <span className="text-sm font-black text-foreground uppercase tracking-tighter flex items-center gap-4">
                    {order.paymentMode === 'Online' ? <CreditCard size={14} className="text-primary" /> : <Banknote size={14} className="text-amber-600" />}
                    {order.paymentMode === 'Online' ? 'Online Payment' : 'Cash on Delivery'}
                  </span>
                </div>
                
                {order.platformFee > 0 && (
                  <div className="flex justify-between items-baseline text-primary">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Service Fee</span>
                    <span className="font-black tracking-tighter uppercase">{formatPrice(order.platformFee)}</span>
                  </div>
                )}
                
                <div className="pt-8 flex justify-between items-baseline border-t border-border">
                  <span className="text-xs font-black text-foreground uppercase tracking-[0.4em]">Order Total</span>
                  <span className="text-4xl font-black text-primary tracking-tighter uppercase">{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-16">
            {/* Logistics details */}
            <div className="space-y-12">
              <h3 className="text-xs font-black text-foreground tracking-[0.3em] uppercase border-b border-border pb-6">Logistics</h3>
              <div className="space-y-8">
                <div className="p-8 border border-border bg-background space-y-4">
                  <div className="flex items-center gap-4 text-primary opacity-40">
                    <Calendar size={14} />
                    <p className="text-[10px] font-black uppercase tracking-[0.4em]">Pickup Time</p>
                  </div>
                  <p className="font-black text-foreground text-lg uppercase tracking-tight">
                    {order.scheduledPickup ? new Date(order.scheduledPickup).toLocaleString('en-US', { day: '2-digit', month: 'long', hour: 'numeric', minute: '2-digit' }) : 'ASAP'}
                  </p>
                </div>
                
                <div className="p-8 border border-border bg-background space-y-4">
                  <div className="flex items-center gap-4 text-primary opacity-40">
                    <MapPin size={14} />
                    <p className="text-[10px] font-black uppercase tracking-[0.4em]">Delivery Address</p>
                  </div>
                  <p className="font-black text-foreground text-sm uppercase leading-relaxed tracking-widest">
                    123 MAIN ST, APARTMENT 4B, NEW YORK, NY 10001
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-px bg-border border border-border">
              {order.paymentStatus === 'Pending' && order.paymentMode === 'Online' && (
                <OrderPaymentButton orderId={order.id} email={session.user.email!} />
              )}
              {order.status === 'Pending' && order.paymentStatus !== 'Paid' && (
                <div className="bg-background p-4 flex justify-center border-b border-border">
                   <DeleteOrderButton orderId={order.id} orderNumber={order.orderNumber} />
                </div>
              )}
              <Link
                href="/customer/new"
                className="w-full bg-foreground text-background py-6 font-black uppercase tracking-[0.4em] text-[10px] text-center hover:bg-primary hover:text-white transition-all duration-500"
              >
                Place New Order
              </Link>
              <button className="w-full border-t border-border text-foreground/60 py-6 font-black uppercase tracking-[0.4em] text-[9px] bg-background hover:bg-secondary transition-all">
                Download Invoice
              </button>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  )
}
