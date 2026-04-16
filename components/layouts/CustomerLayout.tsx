'use client'

import Link from 'next/link'
import { LogOut, User, LayoutDashboard, Package, Settings, Plus, HelpCircle } from 'lucide-react'
import { useState } from 'react'
import { logout } from '@/lib/auth-actions'
import { usePathname } from 'next/navigation'

interface CustomerLayoutProps {
  children: React.ReactNode
}

export function CustomerLayout({ children }: CustomerLayoutProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const pathname = usePathname()

  const handleLogout = async () => {
    await logout()
  }

  return (
    <div className="min-h-screen flex bg-muted/20">
      <div className="flex-grow flex overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden md:block w-72 bg-white border-r border-border shadow-sm">
          <div className="p-8 h-full flex flex-col">
            <div className="mb-12">
              <Link href="/" className="inline-block group">
                <div className="text-2xl font-black tracking-tighter text-foreground group-hover:text-primary transition-colors duration-500">
                  DR. CLEAN<span className="text-primary italic">.</span>
                </div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Customer Workspace</p>
              </Link>
            </div>
            
            <nav className="space-y-1 flex-grow">
              {[
                { href: '/customer/dashboard', label: 'Overview', icon: LayoutDashboard },
                { href: '/customer/new', label: 'New Order', icon: Plus },
                { href: '/customer/orders', label: 'My Orders', icon: Package },
                { href: '/customer/help', label: 'Help Hub', icon: HelpCircle },
                { href: '/customer/profile', label: 'Settings', icon: Settings },
              ].map((item) => {
                const isActive = pathname === item.href || (item.href !== '/customer/dashboard' && pathname.startsWith(item.href))
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-4 px-6 py-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300 relative group ${
                      isActive 
                        ? 'text-primary bg-primary/5' 
                        : 'text-foreground/60 hover:text-primary hover:bg-secondary/50'
                    }`}
                  >
                    <item.icon size={14} className={isActive ? 'text-primary' : ''} />
                    {item.label}
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary animate-in fade-in slide-in-from-left-full duration-500" />
                    )}
                  </Link>
                )
              })}
            </nav>

            <button className="flex items-center gap-4 px-6 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-red-600 hover:bg-red-50 transition-colors mt-auto border-t border-border pt-8">
              <LogOut size={14} />
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-grow flex flex-col overflow-hidden">
          {/* Top Bar - Architectural */}
          <header className="bg-white/80 backdrop-blur-md border-b border-border px-10 py-6 flex items-center justify-between sticky top-0 z-10">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-1">Authenticated Session</p>
              <h1 className="text-xl font-black text-foreground uppercase tracking-tight">Active Workspace</h1>
            </div>
            
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-4 px-5 py-2.5 border border-border bg-background hover:border-primary/50 transition-all duration-500 group"
              >
                <div className="w-8 h-8 bg-foreground flex items-center justify-center text-background group-hover:bg-primary transition-colors">
                  <User size={16} />
                </div>
                <span className="text-[10px] font-black text-foreground uppercase tracking-[0.3em]">Account Settings</span>
              </button>
              
              {showProfileMenu && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl shadow-primary/5 border border-border p-2 z-20 animate-in fade-in zoom-in duration-200">
                  <Link
                    href="/customer/profile"
                    className="block px-4 py-2.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors rounded-xl"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    Personal Details
                  </Link>
                  <div className="h-px bg-border my-1 mx-2"></div>
                  <button
                    onClick={() => setShowProfileMenu(false)}
                    className="w-full text-left px-4 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/5 transition-colors flex items-center gap-2 rounded-xl"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </header>

          {/* Page Content */}
          <div className="flex-grow overflow-auto p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
