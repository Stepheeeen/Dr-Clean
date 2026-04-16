'use client'

import Link from 'next/link'
import { Menu, X, LogOut, LayoutDashboard } from 'lucide-react'
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { data: session, status } = useSession()
  const isLoggedIn = status === 'authenticated'
  const userRole = (session?.user as any)?.role

  const getDashboardUrl = () => {
    return userRole === 'ADMIN' ? '/admin/dashboard' : '/customer/dashboard'
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' })
  }

  return (
    <header className="bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-40 transition-all duration-300">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 group">
            <div className="text-2xl font-black tracking-tighter text-foreground group-hover:text-primary transition-colors duration-500">
              DR. CLEAN<span className="text-primary italic">.</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {[
              { label: 'About', href: '/about' },
              { label: 'Services', href: '/services' },
              { label: 'Pricing', href: '/pricing' },
              { label: 'FAQ', href: '/faq' },
              { label: 'Contact', href: '/contact' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11px] uppercase tracking-[0.2em] font-bold text-muted-foreground hover:text-primary transition-all duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-500 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3 px-5 py-2 border border-border bg-secondary/50 text-foreground text-[10px] uppercase tracking-[0.3em] font-black">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                  Logged In
                </div>
                <Link
                  href={getDashboardUrl()}
                  className="group flex items-center gap-3 text-foreground hover:text-primary transition-all duration-500 font-black uppercase text-[10px] tracking-[0.3em] border-l border-border pl-6"
                >
                  <LayoutDashboard size={14} className="group-hover:scale-110 transition-transform" />
                  My Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-muted-foreground hover:text-red-600 transition-all duration-300"
                  aria-label="Log Out"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-8">
                <Link
                  href="/login"
                  className="text-[10px] uppercase tracking-[0.3em] font-black text-muted-foreground hover:text-foreground transition-all duration-300"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="bg-foreground text-background px-8 py-3 font-black uppercase tracking-[0.3em] text-[10px] hover:bg-primary hover:text-white transition-all duration-500"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-8 pb-10 border-t border-border animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex flex-col gap-6 mt-10">
              {[
                { label: 'About', href: '/about' },
                { label: 'Services', href: '/services' },
                { label: 'Pricing', href: '/pricing' },
                { label: 'FAQ', href: '/faq' },
                { label: 'Contact', href: '/contact' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-2xl font-black uppercase tracking-tighter text-foreground hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="mt-8 pt-8 border-t border-border flex flex-col gap-6">
                {isLoggedIn ? (
                  <>
                    <Link
                      href={getDashboardUrl()}
                      className="flex items-center gap-4 text-xl font-black uppercase tracking-tighter text-primary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <LayoutDashboard size={20} />
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout()
                        setMobileMenuOpen(false)
                      }}
                      className="flex items-center gap-4 text-xl font-black uppercase tracking-tighter text-red-600"
                    >
                      <LogOut size={20} />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="text-xl font-black uppercase tracking-tighter text-foreground"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/register"
                      className="bg-foreground text-background px-8 py-5 text-center font-black uppercase tracking-[0.3em] text-xs"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
