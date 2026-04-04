import { CustomerLayout } from '@/components/layouts/CustomerLayout'
import Link from 'next/link'
import { MOCK_ORDERS } from '@/lib/mock-data'
import { ChevronLeft, MapPin, Calendar, Phone } from 'lucide-react'

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const order = MOCK_ORDERS.find(o => o.id === params.id) || MOCK_ORDERS[0]

  const statusProgress = ['Pending', 'Pickup Scheduled', 'Picked Up', 'Received', 'In Cleaning', 'Ready', 'Delivered', 'Completed']
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

        {/* Order Header */}
        <div className="bg-white rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground">{order.id}</h2>
              <p className="text-muted-foreground">Order placed on {order.createdAt}</p>
            </div>
            <span className={`px-4 py-2 rounded-lg font-semibold ${
              order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
              order.status === 'Pickup Scheduled' ? 'bg-blue-100 text-blue-800' :
              order.status === 'In Cleaning' ? 'bg-purple-100 text-purple-800' :
              order.status === 'Ready' ? 'bg-green-100 text-green-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {order.status}
            </span>
          </div>
        </div>

        {/* Status Timeline */}
        <div className="bg-white rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Order Status</h3>
          <div className="space-y-4">
            {statusProgress.map((status, index) => (
              <div key={status} className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${
                  index <= currentStatusIndex ? 'bg-primary' : 'bg-border'
                }`} />
                <div className="flex-grow">
                  <p className={`font-semibold ${
                    index <= currentStatusIndex ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {status}
                  </p>
                </div>
                {index === currentStatusIndex && (
                  <span className="text-sm font-semibold text-primary">Current</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Order Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Items */}
          <div className="bg-white rounded-lg border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Services</h3>
            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between pb-3 border-b border-border last:border-0">
                  <div>
                    <p className="font-medium text-foreground">{item.service}</p>
                    <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-foreground">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              <div className="pt-3 flex items-center justify-between font-bold text-lg">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Pickup Information */}
          <div className="bg-white rounded-lg border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Pickup Details</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar size={20} className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Scheduled Pickup</p>
                  <p className="font-medium text-foreground">{order.scheduledPickup}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Delivery Address</p>
                  <p className="font-medium text-foreground">123 Main St, City, State 12345</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={20} className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Contact Number</p>
                  <p className="font-medium text-foreground">+1 (234) 567-8900</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        {order.notes && (
          <div className="bg-white rounded-lg border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">Special Notes</h3>
            <p className="text-foreground">{order.notes}</p>
          </div>
        )}

        {/* Actions */}
        <div className="bg-white rounded-lg border border-border p-6 flex gap-4">
          <Link
            href="/customer/orders/new"
            className="flex-1 bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/90 transition-colors font-semibold text-center"
          >
            Place Similar Order
          </Link>
          <button className="flex-1 border-2 border-primary text-primary py-2 rounded-lg hover:bg-primary/10 transition-colors font-semibold">
            Contact Support
          </button>
        </div>
      </div>
    </CustomerLayout>
  )
}
