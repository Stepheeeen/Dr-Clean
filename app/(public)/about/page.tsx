import { PublicLayout } from '@/components/layouts/PublicLayout'
import Link from 'next/link'
import { Award, Users, Leaf } from 'lucide-react'

export default function AboutPage() {
  return (
    <PublicLayout>
      {/* Header */}
      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-secondary">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">About Dr. Clean</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your trusted partner in professional laundry care since 2014
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
          <div className="space-y-4 text-foreground leading-relaxed">
            <p>
              Founded in 2014, Dr. Clean began with a simple mission: to provide busy professionals and families with
              premium laundry and dry cleaning services that respect both their clothes and their time. What started as
              a small operation has grown into the preferred laundry service for hundreds of satisfied customers.
            </p>
            <p>
              We believe that everyone deserves access to professional cleaning services without the hassle of
              traditional laundromats or dry cleaners. That&apos;s why we developed our convenient pickup and delivery
              service, allowing our customers to focus on what matters most while we take care of their laundry.
            </p>
            <p>
              Today, Dr. Clean is proud to be recognized as the leading laundry service in our community, known for
              our attention to detail, reliability, and customer-first approach.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 border border-border text-center">
              <Award size={40} className="text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">Excellence</h3>
              <p className="text-muted-foreground">
                We&apos;re committed to delivering the highest quality laundry care every time. Your satisfaction
                is our standard.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 border border-border text-center">
              <Users size={40} className="text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">Customer First</h3>
              <p className="text-muted-foreground">
                Your needs drive our decisions. We listen, adapt, and go the extra mile to exceed your expectations.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 border border-border text-center">
              <Leaf size={40} className="text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">Sustainability</h3>
              <p className="text-muted-foreground">
                We use eco-friendly detergents and practices to protect your clothes and our environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Why Choose Dr. Clean?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              'Over 10 years of professional experience',
              'Expert handling of all fabric types',
              'Convenient pickup and delivery service',
              'Eco-friendly cleaning solutions',
              '24-hour express service available',
              'Transparent pricing with no hidden fees',
              'Professional team trained in stain removal',
              'Secure payment options',
            ].map((reason, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 text-sm font-bold">
                  ✓
                </div>
                <p className="text-foreground font-medium">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience the Difference?</h2>
          <p className="text-lg mb-8 text-primary-foreground/90">
            Join hundreds of customers who trust Dr. Clean with their laundry.
          </p>
          <Link
            href="/register"
            className="inline-block bg-primary-foreground text-primary px-8 py-3 rounded-lg hover:bg-primary-foreground/90 transition-colors font-semibold"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </PublicLayout>
  )
}
