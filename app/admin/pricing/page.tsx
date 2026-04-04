import { AdminLayout } from '@/components/layouts/AdminLayout'
import { SERVICES } from '@/lib/mock-data'

export default function AdminPricingPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Pricing Management</h2>

        {/* Service Pricing */}
        <div className="bg-white rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Service Pricing</h3>
          <div className="space-y-4">
            {SERVICES.map((service) => (
              <div key={service.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <p className="font-semibold text-foreground">{service.name}</p>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-primary">${service.price.toFixed(2)}</span>
                    <span className="text-muted-foreground">/item</span>
                  </div>
                  <button className="text-primary hover:text-primary/80 font-semibold">Edit</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modifiers */}
        <div className="bg-white rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Price Modifiers</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div>
                <p className="font-semibold text-foreground">Express Service Surcharge</p>
                <p className="text-sm text-muted-foreground">24-hour turnaround</p>
              </div>
              <div className="flex items-center gap-4">
                <input type="text" defaultValue="$2.00" className="px-3 py-2 border border-border rounded-lg w-24 text-center" />
                <button className="text-primary hover:text-primary/80 font-semibold">Save</button>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div>
                <p className="font-semibold text-foreground">Pickup & Delivery</p>
                <p className="text-sm text-muted-foreground">Standard charge for orders under $20</p>
              </div>
              <div className="flex items-center gap-4">
                <input type="text" defaultValue="$5.00" className="px-3 py-2 border border-border rounded-lg w-24 text-center" />
                <button className="text-primary hover:text-primary/80 font-semibold">Save</button>
              </div>
            </div>
          </div>
        </div>

        {/* Bulk Discounts */}
        <div className="bg-white rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Bulk Discounts</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <p className="font-semibold text-foreground">Orders over $100</p>
              <div className="flex items-center gap-4">
                <input type="text" defaultValue="10%" className="px-3 py-2 border border-border rounded-lg w-20 text-center" />
                <button className="text-primary hover:text-primary/80 font-semibold">Save</button>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <p className="font-semibold text-foreground">Orders over $200</p>
              <div className="flex items-center gap-4">
                <input type="text" defaultValue="15%" className="px-3 py-2 border border-border rounded-lg w-20 text-center" />
                <button className="text-primary hover:text-primary/80 font-semibold">Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
