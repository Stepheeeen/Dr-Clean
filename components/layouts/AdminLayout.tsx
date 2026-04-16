'use client'

import Link from 'next/link'
import { LogOut, LayoutDashboard, Package, Users, Settings, BarChart3, Wrench, Menu, X, ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import { logout } from '@/lib/auth-actions'
import { usePathname } from 'next/navigation'

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  const handleLogout = async () => {
    await logout()
  }

  const navigation = [
    { href: '/admin/dashboard', label: 'DASHBOARD', icon: LayoutDashboard },
    { href: '/admin/orders', label: 'ORDERS', icon: Package },
    { href: '/admin/customers', label: 'CUSTOMERS', icon: Users },
    { href: '/admin/services', label: 'SERVICES', icon: Wrench },
    { href: '/admin/pricing', label: 'PRICING', icon: Package },
    { href: '/admin/analytics', label: 'ANALYTICS', icon: BarChart3 },
    { href: '/admin/settings', label: 'SETTINGS', icon: Settings },
    { href: '/admin/help', label: 'HELP HUB', icon: HelpCircle },
  ]

  return (
    <div className="min-h-screen flex bg-background overflow-x-hidden">
      {/* Sidebar - Desktop */}
      <aside 
        className={`hidden md:flex flex-col fixed left-0 top-0 h-screen bg-background border-r border-foreground transition-all duration-500 z-50 ${
          isCollapsed ? 'w-24' : 'w-72'
        }`}
      >
        <div className="p-8 h-full flex flex-col items-center">
          <div className="mb-16 w-full flex items-center justify-between">
            {!isCollapsed && (
              <Link href="/" className="inline-block group overflow-hidden">
                <div className="text-2xl font-black tracking-tighter text-foreground group-hover:text-primary transition-colors duration-500 whitespace-nowrap">
                  DR. CLEAN<span className="text-primary italic">.</span>
                </div>
              </Link>
            )}
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={`p-2 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-all ml-auto ${isCollapsed ? 'mx-auto' : ''}`}
            >
              {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>
          </div>
          
          <nav className="space-y-2 w-full flex-grow">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={isCollapsed ? item.label : ''}
                  className={`flex items-center gap-6 px-4 py-4 text-[10px] font-black tracking-[0.4em] transition-all duration-500 relative group ${
                    isActive ? 'text-primary' : 'text-foreground/40 hover:text-foreground'
                  } ${isCollapsed ? 'justify-center' : ''}`}
                >
                  <item.icon size={18} className="shrink-0" />
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                  
                  {isActive && (
                    <div className="absolute -left-8 top-0 bottom-0 w-1 bg-primary animate-in fade-in slide-in-from-left-full duration-700" />
                  )}
                  {isCollapsed && (
                    <div className="absolute left-full ml-4 px-3 py-2 bg-foreground text-background text-[8px] font-black uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 pointer-events-none transition-all whitespace-nowrap z-50">
                      {item.label}
                    </div>
                  )}
                </Link>
              )
            })}
          </nav>

          <button 
            onClick={handleLogout}
            className={`flex items-center gap-6 px-4 py-8 text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40 hover:text-red-600 transition-colors mt-auto border-t border-border w-full ${isCollapsed ? 'justify-center' : ''}`}
          >
            <LogOut size={18} className="shrink-0" />
            {!isCollapsed && <span className="truncate">LOGOUT</span>}
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div 
        className={`flex-grow flex flex-col min-h-screen transition-all duration-500 ${
          isCollapsed ? 'md:pl-24' : 'md:pl-72'
        }`}
      >
        {/* Mobile Toolbar */}
        <div className="md:hidden bg-background border-b border-foreground px-6 py-4 flex items-center justify-between sticky top-0 z-40">
          <Link href="/" className="text-xl font-black tracking-tighter text-foreground">
            DR. CLEAN<span className="text-primary italic">.</span>
          </Link>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[100] md:hidden animate-in fade-in duration-300">
            <div className="absolute inset-0 bg-background/95 backdrop-blur-md p-10 flex flex-col">
              <div className="flex justify-between items-center mb-16">
                <div className="text-2xl font-black tracking-tighter text-foreground">
                  DR. CLEAN<span className="text-primary italic">.</span>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 border border-foreground text-foreground"
                >
                  <X size={20} />
                </button>
              </div>
              <nav className="flex-grow space-y-6">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-6 text-2xl font-black uppercase tracking-[0.2em] transition-all ${
                        isActive ? 'text-primary' : 'text-foreground/40'
                      }`}
                    >
                      <item.icon size={24} />
                      {item.label}
                    </Link>
                  )
                })}
              </nav>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-6 py-10 text-lg font-black uppercase tracking-[0.3em] text-red-600 border-t border-border"
              >
                <LogOut size={24} />
                LOGOUT
              </button>
            </div>
          </div>
        )}

        {/* Top Bar - Desktop Header */}
        <header className="hidden md:flex bg-background/90 backdrop-blur-sm border-b border-foreground px-12 py-8 items-center justify-between sticky top-0 z-40">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-2 italic">Admin Center</p>
            <h1 className="text-2xl font-black text-foreground uppercase tracking-tight">
              {pathname.split('/').pop()?.replace('-', ' ') || 'Dashboard'}
            </h1>
          </div>
          
          <div className="relative group">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-6 px-6 py-3 border border-foreground bg-background hover:bg-foreground hover:text-background transition-all duration-500"
            >
              <div className="w-6 h-6 bg-primary flex items-center justify-center text-white font-black text-[9px]">
                AD
              </div>
              <span className="text-[10px] font-black text-foreground group-hover:text-background uppercase tracking-[0.4em]">Administrator</span>
            </button>
            
            {showProfileMenu && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowProfileMenu(false)} />
                <div className="absolute right-0 mt-2 w-72 bg-background border border-foreground p-0 z-50 animate-in fade-in zoom-in duration-300">
                  <div className="px-8 py-6 border-b border-border bg-secondary/50">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-1">Authenticated Identifier</p>
                    <p className="text-sm font-black tracking-tight">admin@drclean.com.ng</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-red-600 hover:bg-red-600 hover:text-white transition-all flex items-center gap-4"
                  >
                    <LogOut size={14} />
                    Sign Out
                  </button>
                </div>
              </>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-grow p-6 md:p-12 relative overflow-x-hidden min-w-0">
          <div className="relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
