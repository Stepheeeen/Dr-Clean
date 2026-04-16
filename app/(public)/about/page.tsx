import { PublicLayout } from '@/components/layouts/PublicLayout'
import Link from 'next/link'
import { Award, Users, Leaf } from 'lucide-react'

export default function AboutPage() {
  return (
    <PublicLayout>
      {/* Header */}
      <section className="pt-32 pb-24 px-6 lg:px-12 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto text-left">
          <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-primary mb-6">Genesis</h2>
          <h1 className="text-6xl sm:text-8xl font-black text-foreground mb-10 tracking-tighter leading-[0.9] uppercase">
            PURE <br /><span className="font-light italic">HERITAGE.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed font-medium">
            Redefining professional garment care since 2014.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-32 px-6 lg:px-12 bg-background">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-primary mb-12">The Narrative</h2>
            <div className="space-y-10 text-foreground text-xl leading-relaxed font-medium italic">
              <p>
                Founded in 2014, Dr. Clean began with a simple mission: to approach garment care with the same precision and obsession as fine architecture. 
              </p>
              <p>
                What started as a specialized atelier has evolved into the preferred guardian for the region's most precious wardrobes. We believe that professional cleaning is not just a service—it is a preservation of identity.
              </p>
            </div>
          </div>
          <div className="aspect-square bg-secondary border border-border flex items-center justify-center p-20 relative overflow-hidden">
            <div className="text-[15rem] font-black text-foreground/5 absolute -bottom-10 -right-10 pointer-events-none tracking-tighter">DC</div>
            <p className="relative z-10 text-muted-foreground text-lg leading-relaxed font-medium">
              Today, Dr. Clean stands as a benchmark of excellence, recognized for an uncompromising editorial approach to garment restoration.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-32 px-6 lg:px-12 bg-[#111111] text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-primary mb-24 text-center">Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="group text-center">
              <div className="w-20 h-20 border border-white/10 mx-auto mb-10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                <Award size={32} />
              </div>
              <h3 className="text-xl font-black tracking-tighter mb-4 uppercase">Excellence</h3>
              <p className="text-muted-foreground font-medium leading-relaxed">
                Higher quality is not an objective—it is our base condition.
              </p>
            </div>
            <div className="group text-center">
              <div className="w-20 h-20 border border-white/10 mx-auto mb-10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-black tracking-tighter mb-4 uppercase">Discretion</h3>
              <p className="text-muted-foreground font-medium leading-relaxed">
                We manage your wardrobe with the ultimate respect for your time and privacy.
              </p>
            </div>
            <div className="group text-center">
              <div className="w-20 h-20 border border-white/10 mx-auto mb-10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                <Leaf size={32} />
              </div>
              <h3 className="text-xl font-black tracking-tighter mb-4 uppercase">Purity</h3>
              <p className="text-muted-foreground font-medium leading-relaxed">
                Utilizing premium, environmentally aligned solutions exclusively.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 px-6 lg:px-12 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-primary mb-24 text-center">Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-16">
            {[
              'Decade of specialized architectural care',
              'Sovereign handling of bespoke fabrics',
              'Seamless digital concierge system',
              'Environmentally aligned restoration',
              'Priority 24H sessions available',
              'Absolute pricing transparency',
              'Stain analysis by restoration experts',
              'Advanced digital ledger payments',
            ].map((reason, idx) => (
              <div key={idx} className="flex gap-8 group">
                <div className="text-xs font-black text-primary tracking-widest pt-1 px-4 border-l border-border group-hover:border-primary transition-all duration-500">
                  {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                </div>
                <p className="text-foreground text-lg font-black tracking-tighter uppercase">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-48 px-6 lg:px-12 bg-background border-t border-border text-center overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-6xl sm:text-8xl font-black text-foreground mb-12 tracking-tighter uppercase leading-[0.9]">EMARK ON THE <br /><span className="font-light italic text-primary">JOURNEY.</span></h2>
          <p className="text-xl text-muted-foreground mb-20 max-w-2xl mx-auto font-medium">
            Join the most exclusive collective in garment care.
          </p>
          <Link
            href="/register"
            className="bg-foreground text-background px-16 py-6 font-black uppercase tracking-[0.4em] text-xs hover:bg-primary hover:text-white transition-all duration-500"
          >
            Initiate Session
          </Link>
        </div>
      </section>
    </PublicLayout>
  )
}
