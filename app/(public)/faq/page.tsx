import { PublicLayout } from '@/components/layouts/PublicLayout'
import { FAQ_ITEMS } from '@/lib/mock-data'
import Link from 'next/link'

export default function FAQPage() {
  return (
    <PublicLayout>
      {/* Header */}
      <section className="pt-32 pb-24 px-6 lg:px-12 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto text-left">
          <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-primary mb-6">Protocols</h2>
          <h1 className="text-6xl sm:text-8xl font-black text-foreground mb-10 tracking-tighter leading-[0.9] uppercase">
            COMMON <br /><span className="font-light italic text-primary">ENQUIRIES.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed font-medium">
            Standard operating procedures and garment care wisdom.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 px-6 lg:px-12 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-1">
            {FAQ_ITEMS.map((item) => (
              <details
                key={item.id}
                className="bg-background border-b border-border overflow-hidden group"
              >
                <summary className="cursor-pointer py-10 px-0 font-black text-foreground hover:text-primary transition-colors flex items-center justify-between uppercase text-lg tracking-tighter">
                  <span>{item.question}</span>
                  <span className="text-xs font-black tracking-widest text-primary opacity-40 group-open:rotate-180 transition-transform">EXPAND</span>
                </summary>
                <div className="pb-10 text-muted-foreground font-medium text-lg leading-relaxed max-w-2xl">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>

          {/* Contact Support */}
          <div className="mt-32 p-16 border border-border bg-secondary text-center relative overflow-hidden">
            <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-primary mb-8">Direct Access</h2>
            <h3 className="text-4xl font-black tracking-tighter text-foreground mb-10 uppercase">HAVE A SPECIFIC <br />REQUIREMENT?</h3>
            <Link
              href="/contact"
              className="inline-block bg-foreground text-background px-12 py-5 font-black uppercase tracking-[0.4em] text-xs hover:bg-primary hover:text-white transition-all duration-500"
            >
              Contact Concierge
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
