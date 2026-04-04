'use client'

import Link from 'next/link'
import Image from 'next/image'
import { PublicLayout } from '@/components/layouts/PublicLayout'
import { ChevronRight, Shirt, Droplet, Zap, Star, CheckCircle2, ArrowRight } from 'lucide-react'
import { SERVICES, TESTIMONIALS, FAQ_ITEMS, WEBSITE_CONTENT } from '@/lib/mock-data'
import { toast } from 'sonner'
import { useState } from 'react'

export default function Home() {
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
    <PublicLayout>
      {/* Hero Section - High-End Minimalist */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/laundry_hero.png"
            alt="Modern Laundry Boutique"
            fill
            className="object-cover opacity-90 transition-transform duration-1000 hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Premium Care for Your Garments
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-8 text-balance leading-[1.1] tracking-tight">
              Laundry. <br />
              <span className="text-primary italic">Perfectly</span> Done.
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-lg leading-relaxed">
              Experience the pinnacle of garment care. Professional cleaning, meticulous pressing, and seamless delivery. 
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Link
                href="/register"
                className="bg-primary text-primary-foreground px-8 py-4 rounded-full hover:bg-primary/90 transition-all font-semibold text-lg flex items-center gap-2 shadow-lg shadow-primary/20"
              >
                Schedule Pickup <ArrowRight size={20} />
              </Link>
              <Link
                href="/services"
                className="bg-white/80 backdrop-blur-sm border border-border text-foreground px-8 py-4 rounded-full hover:bg-secondary transition-colors font-semibold text-lg"
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Social Proof */}
      <section className="py-12 border-y border-border bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">10k+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Items Cleaned</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">24h</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Fast Turnaround</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">4.9/5</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Customer Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">100%</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Eco-Friendly</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Clean Grid */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-base font-semibold text-primary tracking-widest uppercase mb-4">Process</h2>
            <h3 className="text-4xl font-bold text-foreground mb-6">Simple, Convenient, Professional</h3>
            <p className="text-lg text-muted-foreground">
              We've refined our process to make laundry the easiest part of your week.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { number: '01', title: 'Book Online', description: 'Schedule a pickup time that fits your life.' },
              { number: '02', title: 'We Collect', description: 'Our professional courier gathers your laundry.' },
              { number: '03', title: 'Expert Care', description: 'Specialized cleaning for each garment type.' },
              { number: '04', title: 'Delivery', description: 'Fresh, perfectly folded, back at your door.' },
            ].map((step, idx) => (
              <div key={idx} className="group relative">
                <div className="text-5xl font-outline font-black text-transparent group-hover:text-primary transition-colors duration-500 mb-6 drop-shadow-sm" style={{ WebkitTextStroke: '1px var(--primary)' }}>
                  {step.number}
                </div>
                <h4 className="text-xl font-bold text-foreground mb-3">{step.title}</h4>
                <p className="text-muted-foreground leading-relaxed italic border-l-2 border-primary/20 pl-4">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview - Image Cards */}
      <section className="py-24 sm:py-32 bg-secondary/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl text-left">
              <h2 className="text-base font-semibold text-primary tracking-widest uppercase mb-4">Our Services</h2>
              <h3 className="text-4xl font-bold text-foreground">Tailored Solutions for Your Wardrobe</h3>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-bold text-lg group"
            >
              View Full Menu <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-border">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/service_dry_clean.png"
                  alt="Professional Dry Cleaning"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-8 text-center">
                <h4 className="text-2xl font-bold mb-4">Dry Cleaning</h4>
                <p className="text-muted-foreground mb-6">Meticulous care for your most delicate items, from silk to cashmere.</p>
                <Link href="/services" className="text-primary font-semibold hover:underline">Learn More</Link>
              </div>
            </div>

            <div className="group bg-primary text-primary-foreground rounded-3xl overflow-hidden shadow-xl hover:-translate-y-2 transition-all duration-500 scale-105 z-10">
              <div className="p-12 text-center h-full flex flex-col justify-center">
                <Shirt size={48} className="mx-auto mb-6 opacity-80" />
                <h4 className="text-3xl font-bold mb-4">Premium Wash</h4>
                <p className="text-primary-foreground/90 mb-8 text-lg">Our most popular choice. Expertly washed, dried, and perfectly folded.</p>
                <Link href="/register" className="bg-white text-primary px-8 py-3 rounded-full font-bold hover:bg-secondary transition-colors inline-block w-fit mx-auto">
                  Book Now
                </Link>
              </div>
            </div>

            <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-border">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/service_folded.png"
                  alt="Express Laundry"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-8 text-center">
                <h4 className="text-2xl font-bold mb-4">Express Service</h4>
                <p className="text-muted-foreground mb-6">Need it fast? Get your laundry back within 24 hours without compromise.</p>
                <Link href="/services" className="text-primary font-semibold hover:underline">Learn More</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Minimalist Benefits */}
      <section className="py-24 sm:py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="relative space-y-4">
                <div className="bg-muted p-8 rounded-[2rem] border border-border max-w-sm ml-auto animate-bounce-slow">
                  <Star className="text-yellow-500 mb-4" fill="currentColor" />
                  <p className="text-foreground font-medium italic">"The best laundry service I've ever used. Truly premium experience."</p>
                  <p className="mt-4 text-sm text-muted-foreground font-bold">— Sarah J.</p>
                </div>
                <div className="bg-secondary p-8 rounded-[2rem] border border-border max-w-sm animate-pulse-slow">
                  <CheckCircle2 className="text-primary mb-4" />
                  <h5 className="font-bold mb-2">Quality Guaranteed</h5>
                  <p className="text-sm text-muted-foreground">Every item is inspected twice before delivery.</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <h2 className="text-base font-semibold text-primary tracking-widest uppercase mb-4">Excellence</h2>
              <h3 className="text-4xl sm:text-5xl font-bold text-foreground mb-8 leading-tight">Superior Care for Every Thread</h3>
              <div className="space-y-8">
                {[
                  { icon: Shirt, title: 'Heritage Expertise', description: 'Over 10 years of professional tailoring and cleaning experience.' },
                  { icon: Droplet, title: 'Eco-Friendly Solvents', description: 'We use premium, biodegradable detergents that are gentle on fabrics.' },
                  { icon: Zap, title: 'Smart Tracking', description: 'Monitor your garment\'s journey in real-time through our portal.' },
                ].map((feature, idx) => {
                  const Icon = feature.icon
                  return (
                    <div key={idx} className="flex gap-6">
                      <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shadow-md">
                        <Icon size={28} />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-foreground mb-2">{feature.title}</h4>
                        <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter - Toast Demo */}
      <section className="py-24 sm:py-32 bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 translate-x-1/2"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-5xl font-bold text-primary-foreground mb-8 leading-tight">
              Get 20% Off Your First Order
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-12 max-w-2xl mx-auto">
              Subscribe to our newsletter for exclusive offers, garment care tips, and service updates.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="yours@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow px-6 py-4 rounded-full bg-white text-foreground focus:outline-none focus:ring-4 focus:ring-white/20 text-lg shadow-inner"
              />
              <button
                type="submit"
                className="bg-foreground text-background px-8 py-4 rounded-full font-bold hover:bg-foreground/90 transition-all shadow-lg active:scale-95"
              >
                Join Now
              </button>
            </form>
            <p className="mt-6 text-primary-foreground/60 text-sm italic">
              *Toast notifications integrated above
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials - Minimalist Cards */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-base font-semibold text-primary tracking-widest uppercase mb-4">Reviews</h2>
            <h3 className="text-4xl font-bold text-foreground">Trusted by Thousands</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial) => (
              <div key={testimonial.id} className="bg-secondary/40 p-10 rounded-[2.5rem] border border-border flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-lg text-foreground italic leading-relaxed mb-6">&quot;{testimonial.content}&quot;</p>
                </div>
                <p className="font-black text-primary">— {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-white flex flex-col items-center justify-center text-center px-4 border-t border-border">
        <div className="max-w-2xl animate-in fade-in zoom-in duration-1000">
          <h2 className="text-5xl sm:text-6xl font-bold mb-8">Ready for Fresh?</h2>
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
            Join the hundreds of satisfied customers who have simplified their lives with Dr. Clean.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/register"
              className="bg-primary text-primary-foreground px-12 py-5 rounded-full hover:bg-primary/90 transition-all font-bold text-xl shadow-xl shadow-primary/30 active:scale-95"
            >
              Get Started Today
            </Link>
          </div>
          <div className="mt-12 flex items-center justify-center gap-8 grayscale opacity-50">
            {/* Minimalist Partner Logos Placeholder */}
            <div className="h-6 w-24 bg-foreground/20 rounded"></div>
            <div className="h-6 w-24 bg-foreground/20 rounded"></div>
            <div className="h-6 w-24 bg-foreground/20 rounded"></div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
