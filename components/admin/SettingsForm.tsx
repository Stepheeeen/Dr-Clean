'use client'

import { useState } from 'react'
import { updateSettings } from '@/lib/settings-actions'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

interface SettingsFormProps {
  initialSettings: any
}

export function SettingsForm({ initialSettings }: SettingsFormProps) {
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  
  // Business hours - if null, we use defaults
  const defaultHours = {
    Monday: { open: '07:00', close: '19:00' },
    Tuesday: { open: '07:00', close: '19:00' },
    Wednesday: { open: '07:00', close: '19:00' },
    Thursday: { open: '07:00', close: '19:00' },
    Friday: { open: '07:00', close: '19:00' },
    Saturday: { open: '08:00', close: '17:00' },
    Sunday: { open: '00:00', close: '00:00' },
  }

  const hours = initialSettings?.businessHours || defaultHours

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    // Populate business hours from form
    const businessHours: any = {}
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    days.forEach(day => {
      businessHours[day] = {
        open: formData.get(`hours_${day}_open`),
        close: formData.get(`hours_${day}_close`)
      }
    })

    const data = {
      heroHeadline: formData.get('heroHeadline'),
      heroSubheadline: formData.get('heroSubheadline'),
      aboutHeadline: formData.get('aboutHeadline'),
      aboutDescription: formData.get('aboutDescription'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      address: formData.get('address'),
      businessHours: businessHours
    }

    const result = await updateSettings(data)
    setLoading(false)
    if (result.success) {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-16">
      <Tabs defaultValue="content" className="space-y-16">
        <TabsList className="w-full justify-start bg-transparent border-b border-border p-0 h-auto gap-8">
          <TabsTrigger value="content" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent p-4 text-[11px] font-black uppercase tracking-[0.3em] transition-all">
            Website Content
          </TabsTrigger>
          <TabsTrigger value="contact" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent p-4 text-[11px] font-black uppercase tracking-[0.3em] transition-all">
            Business Info
          </TabsTrigger>
          <TabsTrigger value="schedule" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent p-4 text-[11px] font-black uppercase tracking-[0.3em] transition-all">
            Operating Hours
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-16 mt-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Hero Section */}
          <section className="border border-foreground bg-background p-6 md:p-10 relative overflow-hidden">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-10 underline underline-offset-8">Home Page Hero</h3>
            <div className="grid grid-cols-1 gap-8">
              <div className="group">
                <label className="block text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-3 group-focus-within:text-foreground transition-colors">Main Headline</label>
                <input
                  name="heroHeadline"
                  type="text"
                  defaultValue={initialSettings?.heroHeadline || 'Premium Laundry Care Delivered'}
                  className="w-full bg-transparent border-b border-border focus:border-foreground py-4 text-xs font-black uppercase tracking-widest outline-none transition-all"
                />
              </div>
              <div className="group">
                <label className="block text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-3 group-focus-within:text-foreground transition-colors">Subheadline</label>
                <input
                  name="heroSubheadline"
                  type="text"
                  defaultValue={initialSettings?.heroSubheadline || 'Professional cleaning with convenient pickup and delivery service'}
                  className="w-full bg-transparent border-b border-border focus:border-foreground py-4 text-xs font-black uppercase tracking-widest outline-none transition-all"
                />
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="border border-foreground bg-background p-6 md:p-10 relative overflow-hidden">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-10 underline underline-offset-8">About Section</h3>
            <div className="grid grid-cols-1 gap-8">
              <div className="group">
                <label className="block text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-3 group-focus-within:text-foreground transition-colors">Headline</label>
                <input
                  name="aboutHeadline"
                  type="text"
                  defaultValue={initialSettings?.aboutHeadline || 'About Dr. Clean'}
                  className="w-full bg-transparent border-b border-border focus:border-foreground py-4 text-xs font-black uppercase tracking-widest outline-none transition-all"
                />
              </div>
              <div className="group">
                <label className="block text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-3 group-focus-within:text-foreground transition-colors">Description</label>
                <textarea
                  name="aboutDescription"
                  defaultValue={initialSettings?.aboutDescription || 'With over 10 years of experience in professional laundry care, Dr. Clean has become the trusted choice for busy professionals and families.'}
                  className="w-full bg-secondary/10 border border-foreground p-6 text-xs font-black uppercase tracking-widest outline-none focus:bg-background h-32 transition-all"
                />
              </div>
            </div>
          </section>
        </TabsContent>

        <TabsContent value="contact" className="space-y-16 mt-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Business Info */}
          <section className="border border-foreground bg-background p-6 md:p-10 relative overflow-hidden">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-10 underline underline-offset-8">Business Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group">
                <label className="block text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-3 group-focus-within:text-foreground transition-colors">Phone Number</label>
                <input
                  name="phone"
                  type="tel"
                  defaultValue={initialSettings?.phone || '+234 (800) 000-0000'}
                  className="w-full bg-transparent border-b border-border focus:border-foreground py-4 text-xs font-black outline-none transition-all uppercase tracking-widest"
                />
              </div>
              <div className="group">
                <label className="block text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-3 group-focus-within:text-foreground transition-colors">Email Address</label>
                <input
                  name="email"
                  type="email"
                  defaultValue={initialSettings?.email || 'hello@dr-clean.com.ng'}
                  className="w-full bg-transparent border-b border-border focus:border-foreground py-4 text-xs font-black outline-none transition-all uppercase tracking-widest"
                />
              </div>
              <div className="group md:col-span-2">
                <label className="block text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-3 group-focus-within:text-foreground transition-colors">Office Address</label>
                <input
                  name="address"
                  type="text"
                  defaultValue={initialSettings?.address || 'Lagos & Abuja, Nigeria'}
                  className="w-full bg-transparent border-b border-border focus:border-foreground py-4 text-xs font-black outline-none transition-all uppercase tracking-widest"
                />
              </div>
            </div>
          </section>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-16 mt-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Business Hours Section */}
          <section className="border border-foreground bg-background p-6 md:p-10 relative overflow-hidden">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-10 underline underline-offset-8">Operating Schedule</h3>
            <div className="space-y-6">
              {Object.entries(hours).map(([day, times]: [string, any]) => (
                <div key={day} className="flex items-center justify-between border-b border-border py-4 group">
                  <span className="text-[11px] font-black uppercase tracking-widest w-32 group-hover:text-primary transition-colors">{day}</span>
                  <div className="flex items-center gap-8">
                    <input
                      type="time"
                      defaultValue={times.open}
                      name={`hours_${day}_open`}
                      className="bg-transparent text-[11px] font-black outline-none border border-transparent focus:border-border p-2"
                    />
                    <span className="text-muted-foreground font-black">TO</span>
                    <input
                      type="time"
                      defaultValue={times.close}
                      name={`hours_${day}_close`}
                      className="bg-transparent text-[11px] font-black outline-none border border-transparent focus:border-border p-2"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex flex-col sm:flex-row items-center gap-8 border-t border-border pt-12">
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto px-16 bg-foreground text-background py-6 text-[11px] font-black uppercase tracking-[0.6em] hover:bg-primary hover:text-white transition-all duration-700 shadow-2xl shadow-foreground/10 disabled:opacity-50"
        >
          {loading ? 'SAVING...' : 'Save All Settings'}
        </button>
        {saved && (
          <p className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 animate-in fade-in slide-in-from-right-4 duration-500">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            Settings Saved Successfully
          </p>
        )}
      </div>
    </form>
  )
}
