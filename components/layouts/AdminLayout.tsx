'use client'

import Link from 'next/link'
import { LogOut, LayoutDashboard, Package, Users, Settings, BarChart3, Wrench } from 'lucide-react'
import { useState } from 'react'
import { logout } from '@/lib/auth-actions'

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const handleLogout = async () => {
    await logout()
  }

  return (
    <div className="min-h-screen flex bg-muted/30">
      {/* Sidebar */}
      <aside className="hidden md:block w-64 bg-white border-r border-border shadow-sm">
        <div className="p-8 h-full flex flex-col">
          <div className="mb-10">
            <Link href="/" className="inline-block">
              <h2 className="text-2xl font-bold tracking-tight text-primary">Dr. Clean</h2>
            </Link>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Admin Dashboard</p>
          </div>
          
          <nav className="space-y-1.5 flex-grow">
            {[
              { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { href: '/admin/orders', label: 'Orders', icon: Package },
              { href: '/admin/customers', label: 'Customers', icon: Users },
              { href: '/admin/services', label: 'Services', icon: Wrench },
              { href: '/admin/pricing', label: 'Pricing', icon: Package },
              { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
              { href: '/admin/settings', label: 'Settings', icon: Settings },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-foreground/70 hover:text-primary hover:bg-primary/5 transition-all duration-200"
              >
                <item.icon size={18} className="opacity-70 group-hover:opacity-100" />
                {item.label}
              </Link>
            ))}
          </nav>

          <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/5 transition-colors mt-auto">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col">
        {/* Top Bar */}
        <header className="bg-white/80 backdrop-blur-md border-b border-border px-8 py-5 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-xl font-bold text-foreground tracking-tight">Overview</h1>
            <p className="text-xs text-muted-foreground">Manage your operations with precision.</p>
          </div>
          
          <div className="relative group">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-3 px-4 py-2 rounded-full border border-border hover:border-primary/30 hover:bg-white transition-all duration-300"
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                AD
              </div>
              <span className="text-sm font-semibold text-foreground">Administrator</span>
              <div className="w-2 h-2 rounded-full bg-green-500 ring-4 ring-green-50/50"></div>
            </button>
            
            {showProfileMenu && (
              <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl shadow-primary/5 border border-border p-2 z-20 animate-in fade-in zoom-in duration-200">
                <div className="px-4 py-3 border-b border-border/50 mb-2">
                  <p className="text-sm font-bold">Admin User</p>
                  <p className="text-xs text-muted-foreground">admin@drclean.com</p>
                </div>
                <button
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full text-left px-4 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/5 transition-colors flex items-center gap-2 rounded-xl"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-grow p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {children}
        </div>
      </main>
    </div>
  )
}
