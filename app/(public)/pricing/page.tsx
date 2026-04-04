import { PublicLayout } from '@/components/layouts/PublicLayout'
import { SERVICES } from '@/lib/mock-data'
import Link from 'next/link'

export default function PricingPage() {
  return (
    <PublicLayout>
      {/* Header */}
      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-secondary">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Simple Pricing</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transparent pricing with no hidden fees. Pay only for what you use.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <div
                key={service.id}
                className="bg-secondary rounded-lg border-2 border-border p-8 flex flex-col"
              >
                <h3 className="text-2xl font-bold text-foreground mb-3">{service.name}</h3>
                <p className="text-foreground text-sm mb-6 flex-grow">{service.description}</p>
                {service.price > 0 ? (
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-primary">${service.price.toFixed(2)}</span>
                      <span className="text-muted-foreground">/item</span>
                    </div>
                  </div>
                ) : (
                  <div className="mb-6 text-primary font-semibold">Complimentary</div>
                )}
                <Link
                  href="/register"
                  className="w-full bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/90 transition-colors font-semibold text-center"
                >
                  Order Now
                </Link>
              </div>
            ))}
          </div>

          {/* Pricing Info */}
          <div className="mt-12 bg-secondary rounded-lg p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">How Pricing Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Base Pricing</h3>
                <p className="text-muted-foreground">Prices listed above are for standard services. Pricing is per item unless otherwise specified.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Express Service</h3>
                <p className="text-muted-foreground">Add $2 to the service price for 24-hour express turnaround on any service.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Pickup & Delivery</h3>
                <p className="text-muted-foreground">Free pickup and delivery for orders over $20. Flat $5 fee for smaller orders.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Bulk Discounts</h3>
                <p className="text-muted-foreground">Orders over $100 receive 10% off. Orders over $200 receive 15% off.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Your Laundry Done?</h2>
          <p className="text-lg mb-8 text-primary-foreground/90">
            Create an account and place your first order today.
          </p>
          <Link
            href="/register"
            className="inline-block bg-primary-foreground text-primary px-8 py-3 rounded-lg hover:bg-primary-foreground/90 transition-colors font-semibold"
          >
            Get Started
          </Link>
        </div>
      </section>
    </PublicLayout>
  )
}
