import { CustomerLayout } from '@/components/layouts/CustomerLayout'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import { getOrderById } from '@/lib/actions'
import { ChevronLeft, MapPin, Calendar, Phone, CreditCard, Banknote } from 'lucide-react'
import { notFound, redirect } from 'next/navigation'
import { auth } from '@/auth'
import { PaymentVerifier } from '@/components/public/PaymentVerifier'
import { Suspense } from 'react'

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
  const session = await auth()
  if (!session?.user) redirect('/login')

  const order = await getOrderById(params.id)
  if (!order) notFound()

  // Ensure user can only see their own orders
  if (order.userId !== session.user.id && (session.user as any).role !== 'ADMIN') {
    redirect('/customer/dashboard')
  }

  const statusProgress = ['Pending', 'Processing', 'Pickup Scheduled', 'Picked Up', 'Received', 'In Cleaning', 'Ready', 'Delivered', 'Completed']
  const currentStatusIndex = statusProgress.indexOf(order.status)

  return (
    <CustomerLayout>
      <div className="space-y-6">
        {/* Back Button */}
        <Link
          href="/customer/orders"
          className="flex items-center gap-2 text-primary hover:text-primary/80 font-semibold"
        >
          <ChevronLeft size={20} />
          Back to Orders
        </Link>

        {/* Payment Verification (Client Side) */}
        <Suspense fallback={null}>
          <PaymentVerifier />
        </Suspense>

        {/* Order Header */}
        <div className="bg-white rounded-[2rem] border border-border/50 p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-3xl font-extrabold text-foreground tracking-tighter">{order.orderNumber}</h2>
                {order.paymentStatus === 'Paid' && (
                  <span className="bg-emerald-500/10 text-emerald-600 text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-md border border-emerald-500/20">
                    Paid
                  </span>
                )}
              </div>
              <p className="text-muted-foreground font-medium">Order placed on {new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-6 py-2 rounded-2xl font-bold text-sm shadow-sm ${
                order.status === 'Pending' ? 'bg-yellow-50 text-yellow-600 border border-yellow-200' :
                order.status === 'Processing' ? 'bg-blue-50 text-blue-600 border border-blue-200' :
                order.status === 'In Cleaning' ? 'bg-purple-50 text-purple-600 border border-purple-200' :
                order.status === 'Ready' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' :
                'bg-slate-50 text-slate-600 border border-slate-200'
              }`}>
                {order.status}
              </span>
            </div>
          </div>
        </div>

        {/* Status Timeline */}
        <div className="bg-white rounded-[2rem] border border-border/50 p-8 shadow-sm overflow-x-auto">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-8 px-1">Order Tracking</h3>
          <div className="flex min-w-[800px] justify-between relative px-2">
            {/* Background Line */}
            <div className="absolute top-4 left-4 right-4 h-1 bg-slate-100 rounded-full" />
            
            {statusProgress.map((status, index) => (
              <div key={status} className="flex flex-col items-center gap-3 relative z-10 w-24">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${
                  index <= currentStatusIndex ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'bg-white border-slate-100 text-slate-300'
                }`}>
                  {index < currentStatusIndex ? <span className="text-[10px] font-bold">✓</span> : <span className="text-[10px] font-bold">{index + 1}</span>}
                </div>
                <p className={`text-[10px] font-bold text-center uppercase tracking-tight ${
                  index <= currentStatusIndex ? 'text-foreground' : 'text-slate-400'
                }`}>
                  {status}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Items & Cost */}
          <div className="lg:col-span-2 bg-white rounded-[2rem] border border-border/50 p-8 shadow-sm">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-6">Service Summary</h3>
            <div className="space-y-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-border/30">
                  <div>
                    <p className="font-bold text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground font-medium">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-extrabold text-foreground">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
              
              <div className="mt-8 pt-6 border-t border-border/50 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-muted-foreground">Payment Method</span>
                  <span className="font-bold flex items-center gap-2">
                    {order.paymentMode === 'Online' ? <CreditCard size={14} className="text-primary" /> : <Banknote size={14} className="text-amber-600" />}
                    {order.paymentMode === 'Online' ? 'Paystack Online' : 'Cash on Delivery'}
                  </span>
                </div>
                
                {order.platformFee > 0 && (
                  <div className="flex justify-between text-sm py-2 px-3 bg-primary/5 rounded-xl text-primary">
                    <span className="font-medium">Service Fee (5%)</span>
                    <span className="font-bold">{formatPrice(order.platformFee)}</span>
                  </div>
                )}
                
                <div className="flex items-center justify-between pt-4 font-extrabold text-2xl tracking-tighter">
                  <span className="text-foreground">Total Paid</span>
                  <span className="text-primary">{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Pickup Details */}
            <div className="bg-white rounded-[2rem] border border-border/50 p-8 shadow-sm">
              <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-6 px-1">Logistics</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-border/30">
                  <Calendar size={20} className="text-primary mt-1" />
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Scheduled Pickup</p>
                    <p className="font-bold text-foreground text-sm">{order.scheduledPickup ? new Date(order.scheduledPickup).toLocaleString() : 'Not Scheduled'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-border/30">
                  <MapPin size={20} className="text-primary mt-1" />
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Delivery Address</p>
                    <p className="font-bold text-foreground text-sm line-clamp-2">123 Main St, Apartment 4B, New York, NY 10001</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <Link
                href="/customer/orders/new"
                className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-center shadow-lg shadow-primary/10 hover:shadow-primary/30 transition-all hover:-translate-y-1 active:scale-95"
              >
                Book Another Order
              </Link>
              <button className="w-full border-2 border-slate-200 text-slate-600 py-4 rounded-2xl font-bold bg-white hover:bg-slate-50 transition-all active:scale-95">
                Download Invoice
              </button>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  )
}
