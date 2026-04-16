'use client'

import { useSession } from 'next-auth/react'
import { CustomerLayout } from '@/components/layouts/CustomerLayout'
import { redirect } from 'next/navigation'
import { User, Shield, MapPin, Bell } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

export default function CustomerProfilePage() {
  const { data: session, status } = useSession()

  if (status === 'unauthenticated') {
    redirect('/login')
  }

  if (status === 'loading') {
    return (
      <CustomerLayout>
        <div className="py-20 text-center animate-pulse">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground">Initializing Profile Access...</p>
        </div>
      </CustomerLayout>
    )
  }

  return (
    <CustomerLayout>
      <div className="space-y-16">
        {/* Header - Architectural */}
        <div className="border-b border-border pb-12">
          <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-primary mb-6">Account Settings</h2>
          <h1 className="text-5xl font-black text-foreground tracking-tighter uppercase leading-tight">
            MY <span className="font-light italic text-primary">PROFILE</span>.
          </h1>
          <p className="mt-8 text-muted-foreground font-medium leading-relaxed max-w-2xl">
            Manage your personal details and account preferences.
          </p>
        </div>

        <Tabs defaultValue="info" className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Left Col: Menu */}
          <TabsList className="lg:col-span-1 flex flex-col h-auto bg-transparent gap-2 p-0">
            <TabsTrigger value="info" className="w-full justify-between p-8 border border-border data-[state=active]:border-primary data-[state=active]:bg-primary/5 data-[state=active]:text-primary text-foreground/40 hover:text-foreground transition-all rounded-none uppercase text-[10px] font-black tracking-[0.3em]">
              <div className="flex items-center gap-6">
                <User size={16} />
                <span>Personal Info</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="addresses" className="w-full justify-between p-8 border border-border data-[state=active]:border-primary data-[state=active]:bg-primary/5 data-[state=active]:text-primary text-foreground/40 hover:text-foreground transition-all rounded-none uppercase text-[10px] font-black tracking-[0.3em]">
              <div className="flex items-center gap-6">
                <MapPin size={16} />
                <span>Saved Addresses</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="security" className="w-full justify-between p-8 border border-border data-[state=active]:border-primary data-[state=active]:bg-primary/5 data-[state=active]:text-primary text-foreground/40 hover:text-foreground transition-all rounded-none uppercase text-[10px] font-black tracking-[0.3em]">
              <div className="flex items-center gap-6">
                <Shield size={16} />
                <span>Security</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="w-full justify-between p-8 border border-border data-[state=active]:border-primary data-[state=active]:bg-primary/5 data-[state=active]:text-primary text-foreground/40 hover:text-foreground transition-all rounded-none uppercase text-[10px] font-black tracking-[0.3em]">
              <div className="flex items-center gap-6">
                <Bell size={16} />
                <span>Notifications</span>
              </div>
            </TabsTrigger>
          </TabsList>

          {/* Right Col: Content Panels */}
          <div className="lg:col-span-2">
            <TabsContent value="info" className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-700 m-0">
              <h3 className="text-xs font-black text-foreground tracking-[0.3em] uppercase border-b border-border pb-6">Personal Information</h3>
              <div className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Full Name</label>
                    <div className="p-5 border border-border bg-secondary/20 text-[10px] font-black tracking-[0.2em] uppercase text-foreground">
                      {session?.user?.name || 'NOT PROVIDED'}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Email Address</label>
                    <div className="p-5 border border-border bg-secondary/20 text-[10px] font-black tracking-[0.2em] uppercase text-foreground">
                      {session?.user?.email || 'NOT PROVIDED'}
                    </div>
                  </div>
                </div>
                <div className="p-8 border border-primary/20 bg-primary/5 space-y-4">
                  <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Account Status</p>
                  <p className="font-black text-foreground text-sm tracking-[0.1em] uppercase">VERIFIED CUSTOMER</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="addresses" className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-700 m-0">
              <h3 className="text-xs font-black text-foreground tracking-[0.3em] uppercase border-b border-border pb-6">Logistics Points</h3>
              <div className="p-20 border border-dashed border-border text-center opacity-40">
                <MapPin className="mx-auto mb-8" size={32} />
                <p className="text-[10px] font-black uppercase tracking-[0.5em]">No Saved Addresses Found</p>
              </div>
            </TabsContent>

            <TabsContent value="security" className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-700 m-0">
              <h3 className="text-xs font-black text-foreground tracking-[0.3em] uppercase border-b border-border pb-6">Authentication Layers</h3>
              <div className="p-20 border border-dashed border-border text-center opacity-40">
                <Shield className="mx-auto mb-8" size={32} />
                <p className="text-[10px] font-black uppercase tracking-[0.5em]">Standard OAuth Protocols Active</p>
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-700 m-0">
              <h3 className="text-xs font-black text-foreground tracking-[0.3em] uppercase border-b border-border pb-6">Registry Alerts</h3>
              <div className="p-20 border border-dashed border-border text-center opacity-40">
                <Bell className="mx-auto mb-8" size={32} />
                <p className="text-[10px] font-black uppercase tracking-[0.5em]">Email Notifications Enabled</p>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </CustomerLayout>
  )
}
