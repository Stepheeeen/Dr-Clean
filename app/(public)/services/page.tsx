import { PublicLayout } from '@/components/layouts/PublicLayout'
import { SERVICES } from '@/lib/mock-data'
import Link from 'next/link'

export default function ServicesPage() {
  return (
    <PublicLayout>
      {/* Header */}
      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-secondary">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Our Services</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive laundry solutions designed to meet all your needs, from everyday washing to delicate dry cleaning.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {SERVICES.map((service) => (
              <div
                key={service.id}
                className="bg-secondary p-8 rounded-lg border-2 border-border hover:shadow-lg transition-shadow"
              >
                <h3 className="text-2xl font-bold text-foreground mb-3">{service.name}</h3>
                <p className="text-foreground mb-6">{service.description}</p>
                {service.price > 0 && (
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-3xl font-bold text-primary">${service.price.toFixed(2)}</span>
                    <span className="text-muted-foreground">per item</span>
                  </div>
                )}
                <Link
                  href="/register"
                  className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors font-semibold"
                >
                  Order Now
                </Link>
              </div>
            ))}
          </div>

          {/* Service Details */}
          <div className="bg-white border border-border rounded-lg p-8 mt-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Service Details</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Washing</h3>
                <p className="text-muted-foreground">
                  Our professional washing service uses premium detergents and modern equipment to handle all fabric types.
                  We take special care with delicate items and follow care label instructions precisely.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Ironing & Pressing</h3>
                <p className="text-muted-foreground">
                  Expert ironing gives your clothes a crisp, polished look. Perfect for business shirts, dresses, and formal wear.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Dry Cleaning</h3>
                <p className="text-muted-foreground">
                  Premium dry cleaning for delicate fabrics and special items. Our certified technicians handle each piece with care.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Express Service</h3>
                <p className="text-muted-foreground">
                  Need it fast? Our 24-hour express service ensures you get your clothes back quickly without compromising quality.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Pickup & Delivery</h3>
                <p className="text-muted-foreground">
                  Convenient pickup and delivery service right to your door. We handle the logistics so you don&apos;t have to.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Our Services?</h2>
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
