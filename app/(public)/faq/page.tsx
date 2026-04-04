import { PublicLayout } from '@/components/layouts/PublicLayout'
import { FAQ_ITEMS } from '@/lib/mock-data'
import Link from 'next/link'

export default function FAQPage() {
  return (
    <PublicLayout>
      {/* Header */}
      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-secondary">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our services, pricing, and policies.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {FAQ_ITEMS.map((item) => (
              <details
                key={item.id}
                className="bg-secondary rounded-lg border border-border overflow-hidden group"
              >
                <summary className="cursor-pointer p-6 font-semibold text-foreground hover:bg-muted transition-colors flex items-center justify-between">
                  <span>{item.question}</span>
                  <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-6 pb-6 text-muted-foreground border-t border-border pt-4">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>

          {/* Contact Support */}
          <div className="mt-12 bg-primary text-primary-foreground p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-2">Can&apos;t find the answer?</h2>
            <p className="mb-6">Our customer service team is ready to help.</p>
            <Link
              href="/contact"
              className="inline-block bg-primary-foreground text-primary px-6 py-2 rounded-lg hover:bg-primary-foreground/90 transition-colors font-semibold"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
