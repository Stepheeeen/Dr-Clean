'use client'

import { Header } from './Header'
import Link from 'next/link'
import { LogOut, User, LayoutDashboard, Package, Settings } from 'lucide-react'
import { useState } from 'react'

interface CustomerLayoutProps {
  children: React.ReactNode
}

export function CustomerLayout({ children }: CustomerLayoutProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <Header />
      <div className="flex-grow flex overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden md:block w-72 bg-white border-r border-border shadow-sm">
          <div className="p-8 h-full flex flex-col">
            <div className="mb-8 p-4 rounded-2xl bg-primary/5 border border-primary/10">
              <h2 className="text-sm font-bold text-primary uppercase tracking-widest">Customer Portal</h2>
              <p className="text-xs text-muted-foreground mt-1">Manage your garment care.</p>
            </div>
            
            <nav className="space-y-1.5 flex-grow">
              {[
                { href: '/customer/dashboard', label: 'Dashboard', icon: LayoutDashboard },
                { href: '/customer/orders/new', label: 'New Order', icon: Package, highlight: true },
                { href: '/customer/orders', label: 'My Orders', icon: Package },
                { href: '/customer/profile', label: 'Settings', icon: Settings },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                    item.highlight 
                      ? 'bg-primary text-white shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5' 
                      : 'text-foreground/70 hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  <item.icon size={18} />
                  {item.label}
                </Link>
              ))}
            </nav>

            <button className="flex items-center gap-3 px-5 py-3 rounded-2xl text-sm font-bold text-destructive hover:bg-destructive/5 transition-colors mt-auto">
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-grow flex flex-col overflow-hidden">
          {/* Top Bar */}
          <header className="bg-white/80 backdrop-blur-md border-b border-border px-8 py-5 flex items-center justify-between sticky top-0 z-10">
            <div>
              <h1 className="text-xl font-bold text-foreground">Welcome back!</h1>
              <p className="text-xs text-muted-foreground">Your clothes are in expert hands.</p>
            </div>
            
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-3 p-1 pr-4 rounded-full border border-border hover:border-primary/30 hover:bg-white transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                  <User size={18} />
                </div>
                <span className="text-sm font-bold text-foreground">My Account</span>
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
