import { CustomerLayout } from '@/components/layouts/CustomerLayout'
import { SERVICES } from '@/lib/mock-data'
import Link from 'next/link'

export default function NewOrderPage() {
  return (
    <CustomerLayout>
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-lg border border-border p-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">Create New Order</h2>
          <p className="text-muted-foreground">Follow the steps below to place your order</p>
        </div>

        {/* Progress Indicator */}
        <div className="bg-white rounded-lg border border-border p-6">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
                  step === 1 ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground'
                }`}>
                  {step}
                </div>
                <span className="text-xs text-muted-foreground text-center">
                  {step === 1 && 'Services'}
                  {step === 2 && 'Details'}
                  {step === 3 && 'Schedule'}
                  {step === 4 && 'Address'}
                  {step === 5 && 'Review'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Select Services */}
        <div className="bg-white rounded-lg border border-border p-6">
          <h3 className="text-xl font-semibold text-foreground mb-6">Step 1: Select Services</h3>
          <div className="space-y-3">
            {SERVICES.map((service) => (
              <label key={service.id} className="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-secondary transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded border-border"
                />
                <div className="flex-grow">
                  <p className="font-semibold text-foreground">{service.name}</p>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>
                {service.price > 0 && (
                  <p className="font-semibold text-primary">${service.price.toFixed(2)}</p>
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Step 2: Garment Details */}
        <div className="bg-white rounded-lg border border-border p-6">
          <h3 className="text-xl font-semibold text-foreground mb-6">Step 2: Garment Details</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Number of Items</label>
              <input
                type="number"
                min="1"
                defaultValue="5"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Special Instructions</label>
              <textarea
                placeholder="E.g., Handle delicate items, Extra starch, etc."
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary h-24 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Step 3: Schedule Pickup */}
        <div className="bg-white rounded-lg border border-border p-6">
          <h3 className="text-xl font-semibold text-foreground mb-6">Step 3: Schedule Pickup</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Preferred Pickup Date</label>
              <input
                type="date"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Preferred Time</label>
              <select className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                <option>9:00 AM - 11:00 AM</option>
                <option>11:00 AM - 1:00 PM</option>
                <option>1:00 PM - 3:00 PM</option>
                <option>3:00 PM - 5:00 PM</option>
              </select>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-4">
          <Link
            href="/customer/orders"
            className="flex-1 border-2 border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary/10 transition-colors font-semibold text-center"
          >
            Cancel
          </Link>
          <button
            onClick={() => alert('Order placed! Redirecting to dashboard...')}
            className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold"
          >
            Continue to Review
          </button>
        </div>
      </div>
    </CustomerLayout>
  )
}
