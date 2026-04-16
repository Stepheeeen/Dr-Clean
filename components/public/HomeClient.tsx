'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, Shirt, Droplet, Zap, Star, CheckCircle2, ArrowRight } from 'lucide-react'
import { TESTIMONIALS } from '@/lib/mock-data'
import { toast } from 'sonner'
import { useState } from 'react'

export default function HomeClient() {
  const [email, setEmail] = useState('')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      toast.error('Please enter a valid email address')
      return
    }
    toast.success('Successfully subscribed to our newsletter!')
    setEmail('')
  }

  return (
    <>
      {/* Hero Section - Architectural Minimalist */}
      <section className="relative min-h-[95vh] flex items-center overflow-hidden bg-background">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/laundry_hero.png"
            alt="Modern Laundry Boutique Hero"
            fill
            sizes="100vw"
            className="object-cover opacity-[0.85] transition-transform duration-[2000ms] hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] uppercase tracking-[0.3em] font-bold mb-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
              </span>
              The Standard of Purity
            </div>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-foreground mb-10 tracking-tighter leading-[0.9] text-balance">
              LAUNDRY<span className="text-primary italic">.</span> <br />
              <span className="font-light">REDEFINED.</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-lg leading-relaxed font-medium">
              We approach garment care with the same precision and obsession as fine architecture. Meticulous, timeless, and pure.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <Link
                href="/register"
                className="group relative bg-foreground text-background px-10 py-5 overflow-hidden transition-all duration-500 hover:pr-14"
              >
                <span className="relative z-10 font-bold uppercase tracking-widest text-sm">Schedule Pickup</span>
                <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0" size={20} />
              </Link>
              <Link
                href="/services"
                className="group px-10 py-5 border border-border hover:border-foreground transition-all duration-500 font-bold uppercase tracking-widest text-sm"
              >
                Our Portfolios
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats - Refined Minimalist */}
      <section className="py-20 border-y border-border bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { label: 'Items Restored', value: '10k+' },
              { label: 'Express Delivery', value: '24h' },
              { label: 'Excellence Score', value: '4.9/5' },
              { label: 'Sustainable', value: '100%' },
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <div className="text-xs uppercase tracking-[0.4em] font-bold text-muted-foreground">{stat.label}</div>
                <div className="text-4xl font-black tracking-tighter text-foreground">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process - Architectural Grid */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="mb-24">
            <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-primary mb-6">Workflow</h2>
            <h3 className="text-5xl font-black text-foreground tracking-tighter max-w-xl leading-tight">
              PRECISION IN EVERY PHASE.
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-20">
            {[
              { number: '01', title: 'DIGITAL BOOKING', description: 'Schedule with architectural precision.' },
              { number: '02', title: 'ELITE COLLECTION', description: 'White-glove handling at your doorstep.' },
              { number: '03', title: 'EXPERT RESTORATION', description: 'Meticulous care for every thread.' },
              { number: '04', title: 'FINAL DELIVERY', description: 'Pristine results, perfectly timed.' },
            ].map((step, idx) => (
              <div key={idx} className="group flex flex-col pt-8 border-t border-border hover:border-foreground transition-colors duration-700">
                <div className="text-xs font-bold text-primary mb-8 tracking-widest">
                  {step.number}
                </div>
                <h4 className="text-xl font-black text-foreground mb-4 tracking-tighter">{step.title}</h4>
                <p className="text-muted-foreground leading-relaxed font-medium">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services - Bento Layout */}
      <section className="py-32 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-10">
            <div className="max-w-2xl">
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-primary mb-6">Foundations</h2>
              <h3 className="text-5xl font-black text-foreground tracking-tighter leading-tight">CURATED SERVICE MENU.</h3>
            </div>
            <Link
              href="/services"
              className="text-[10px] uppercase tracking-[0.4em] font-black text-foreground border-b border-foreground pb-2 hover:text-primary hover:border-primary transition-all duration-500"
            >
              Explore All Portfolios
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="group bg-background border border-border p-1 hover:border-foreground transition-all duration-700">
              <div className="relative h-[28rem] overflow-hidden">
                <Image
                  src="/images/service_dry_clean.png"
                  alt="Professional Dry Cleaning Service"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[1500ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-all duration-700"></div>
                <div className="absolute bottom-10 left-10 text-white z-10 transition-transform duration-700 group-hover:-translate-y-2">
                  <h4 className="text-2xl font-black tracking-tighter mb-2">DRY CLEANING</h4>
                  <p className="text-xs uppercase tracking-widest font-bold opacity-80">Heritage Preservation</p>
                </div>
              </div>
            </div>

            <div className="group bg-foreground text-background p-12 flex flex-col justify-between h-[28rem]">
              <div>
                <Shirt size={40} className="mb-10 opacity-50" />
                <h4 className="text-3xl font-black tracking-tighter mb-6 leading-tight">PREMIUM <br />WASH & FOLD.</h4>
                <p className="text-lg opacity-80 font-medium leading-relaxed italic">Our signature restoration process for your daily essentials.</p>
              </div>
              <Link href="/register" className="text-[10px] uppercase tracking-[0.3em] font-black bg-background text-foreground px-8 py-4 w-fit hover:bg-primary hover:text-white transition-all duration-500">
                Book Session
              </Link>
            </div>

            <div className="group bg-background border border-border p-1 hover:border-foreground transition-all duration-700">
              <div className="relative h-[28rem] overflow-hidden">
                <Image
                  src="/images/service_folded.png"
                  alt="Express Laundry and Folding Service"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[1500ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-all duration-700"></div>
                <div className="absolute bottom-10 left-10 text-white z-10 transition-transform duration-700 group-hover:-translate-y-2">
                  <h4 className="text-2xl font-black tracking-tighter mb-2">EXPRESS ART</h4>
                  <p className="text-xs uppercase tracking-widest font-bold opacity-80">24H Turnaround</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Editorial Benefits */}
      <section className="py-32 bg-background overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <div className="aspect-[4/5] bg-secondary border border-border p-1 overflow-hidden">
                <div className="absolute inset-0 bg-primary opacity-5 mix-blend-multiply"></div>
                <div className="relative h-full flex items-center justify-center p-12 text-center border border-border">
                  <div className="space-y-12">
                    <Star className="mx-auto text-primary" size={32} />
                    <p className="text-3xl font-light italic leading-tight text-foreground">
                      "WE APPROACH GARMENT CARE WITH THE SAME PRECISION AS FINE ARCHITECTURE."
                    </p>
                    <div className="text-[10px] uppercase tracking-[0.4em] font-black text-muted-foreground">The Dr. Clean Ethos</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-primary mb-6">Excellence</h2>
              <h3 className="text-5xl font-black text-foreground tracking-tighter mb-12 leading-tight">SUPERIOR CARE <br />FOR EVERY THREAD.</h3>
              <div className="space-y-12">
                {[
                  { icon: Shirt, title: 'HERITAGE EXPERTISE', description: 'Over 10 years of professional tailoring and cleaning experience.' },
                  { icon: Droplet, title: 'PURE SOLUTIONS', description: 'We use premium, biodegradable detergents that are gentle on fabrics.' },
                  { icon: Zap, title: 'SECURE PORTAL', description: 'Monitor your garment\'s journey in real-time through our secure portal.' },
                ].map((feature, idx) => {
                  const Icon = feature.icon
                  return (
                    <div key={idx} className="flex gap-8 group">
                      <div className="flex-shrink-0 w-16 h-16 border border-border flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all duration-500">
                        <Icon size={24} />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="text-lg font-black tracking-tighter mb-2">{feature.title}</h4>
                        <p className="text-muted-foreground font-medium leading-relaxed max-w-sm">{feature.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter - Minimalist Elite */}
      <section className="py-32 bg-foreground text-background relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl sm:text-7xl font-black tracking-tighter mb-10 leading-tight">
              JOIN THE CIRCLE.
            </h2>
            <p className="text-xl opacity-70 mb-16 max-w-2xl mx-auto font-medium">
              Receive exclusive editorial updates, garment care wisdom, and preferred member invitations.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-0 max-w-lg mx-auto border border-background/20">
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow px-8 py-6 bg-transparent text-background focus:outline-none text-xs uppercase tracking-widest font-bold"
              />
              <button
                type="submit"
                className="bg-background text-foreground px-10 py-6 font-black text-xs uppercase tracking-[0.3em] hover:bg-primary hover:text-white transition-all duration-500"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-0 right-0 w-[40vw] h-[40vw] border border-background rounded-full translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </section>

      {/* Testimonials - Minimalist Portrayal */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="mb-20">
            <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-primary mb-6">Testimonials</h2>
            <h3 className="text-5xl font-black text-foreground tracking-tighter leading-tight">THE CLIENT VOICE.</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {TESTIMONIALS.map((testimonial) => (
              <div key={testimonial.id} className="border-l border-border pl-10 py-4 flex flex-col justify-between hover:border-primary transition-colors duration-500">
                <div>
                  <div className="flex gap-1 mb-8 opacity-40">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={14} className="fill-foreground text-foreground" />
                    ))}
                  </div>
                  <p className="text-xl font-medium text-foreground italic leading-relaxed mb-10">&quot;{testimonial.content}&quot;</p>
                </div>
                <div className="text-[10px] uppercase tracking-[0.4em] font-black text-primary">
                  — {testimonial.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Minimalist Climax */}
      <section className="py-48 bg-background flex flex-col items-center justify-center text-center px-6 border-t border-border">
        <div className="max-w-4xl animate-in fade-in zoom-in duration-[1500ms]">
          <h2 className="text-6xl sm:text-8xl font-black mb-12 tracking-tighter leading-[0.9]">READY FOR <br /><span className="font-light italic">PURE EXCELLENCE?</span></h2>
          <p className="text-xl text-muted-foreground mb-16 max-w-2xl mx-auto font-medium">
            Join the collective of individuals who have elevated their expectations of garment care.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <Link
              href="/register"
              className="bg-foreground text-background px-16 py-6 font-black uppercase tracking-[0.4em] text-sm hover:bg-primary hover:text-white transition-all duration-500"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
