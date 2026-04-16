'use client'

import { PublicLayout } from '@/components/layouts/PublicLayout'
import { useState } from 'react'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => setFormSubmitted(false), 3000)
  }

  return (
    <PublicLayout>
      {/* Header */}
      <section className="pt-32 pb-24 px-6 lg:px-12 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto text-left">
          <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-primary mb-6">Concierge</h2>
          <h1 className="text-6xl sm:text-8xl font-black text-foreground mb-10 tracking-tighter leading-[0.9] uppercase">
            ESTABLISH <br /><span className="font-light italic text-primary">CONTACT.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed font-medium">
            Personalized attention for your most valued garments.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-32 px-6 lg:px-12 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            {/* Contact Form */}
            <div className="bg-secondary p-12 lg:p-20 border border-border relative overflow-hidden">
              <h2 className="text-[10px] uppercase tracking-[0.3em] font-black text-primary mb-12">Engagement Portal</h2>
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="group border-b border-border focus-within:border-primary transition-all duration-500">
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground mb-2">Portfolio Name</label>
                  <input
                    type="text"
                    placeholder="ENTER FULL NAME"
                    className="w-full pb-4 bg-transparent text-foreground font-black tracking-tighter text-xl placeholder:opacity-20 focus:outline-none"
                  />
                </div>
                <div className="group border-b border-border focus-within:border-primary transition-all duration-500">
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground mb-2">Digital Address</label>
                  <input
                    type="email"
                    placeholder="ENTER EMAIL"
                    className="w-full pb-4 bg-transparent text-foreground font-black tracking-tighter text-xl placeholder:opacity-20 focus:outline-none"
                  />
                </div>
                <div className="group border-b border-border focus-within:border-primary transition-all duration-500">
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground mb-2">Inquiry Type</label>
                  <input
                    type="text"
                    placeholder="SUBJECT OF ENGAGEMENT"
                    className="w-full pb-4 bg-transparent text-foreground font-black tracking-tighter text-xl placeholder:opacity-20 focus:outline-none"
                  />
                </div>
                <div className="group border-b border-border focus-within:border-primary transition-all duration-500">
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground mb-2">Message</label>
                  <textarea
                    placeholder="HOW MAY WE ASSIST?"
                    className="w-full pb-4 bg-transparent text-foreground font-black tracking-tighter text-xl placeholder:opacity-20 focus:outline-none h-32 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-foreground text-background px-12 py-5 font-black uppercase tracking-[0.4em] text-xs hover:bg-primary hover:text-white transition-all duration-500"
                >
                  Submit Inquiry
                </button>
                {formSubmitted && (
                  <p className="text-primary text-xs font-black uppercase tracking-widest animate-in fade-in slide-in-from-left-4">Session initiated successfully. We will respond shortly.</p>
                )}
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-16">
              <div>
                <h2 className="text-[10px] uppercase tracking-[0.3em] font-black text-primary mb-12">Presence</h2>
              </div>

              <div className="flex gap-8 group">
                <div className="w-16 h-16 border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <Phone size={24} />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground mb-2">Direct Voice</h3>
                  <a href="tel:+2348000000000" className="text-2xl font-black tracking-tighter text-foreground hover:text-primary transition-colors">
                    +234 (800) 000-0000
                  </a>
                </div>
              </div>

              <div className="flex gap-8 group">
                <div className="w-16 h-16 border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <Mail size={24} />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground mb-2">Correspondence</h3>
                  <a href="mailto:hello@dr-clean.com.ng" className="text-2xl font-black tracking-tighter text-foreground hover:text-primary transition-colors">
                    hello@dr-clean.com.ng
                  </a>
                </div>
              </div>

              <div className="flex gap-8 group">
                <div className="w-16 h-16 border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <MapPin size={24} />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground mb-2">Territories</h3>
                  <p className="text-2xl font-black tracking-tighter text-foreground uppercase">Lagos & Abuja, Nigeria</p>
                </div>
              </div>

              <div className="flex gap-8 group">
                <div className="w-16 h-16 border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <Clock size={24} />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground mb-2">Operational Hours</h3>
                  <p className="text-lg font-medium text-muted-foreground leading-relaxed uppercase italic">
                    Mon - Fri: 08:00 - 18:00<br />
                    Sat: 09:00 - 17:00<br />
                    Sun: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
