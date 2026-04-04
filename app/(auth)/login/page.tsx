'use client'

import { PublicLayout } from '@/components/layouts/PublicLayout'
import Link from 'next/link'
import { useState, useTransition } from 'react'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { login } from '@/lib/auth-actions'
import { toast } from 'sonner'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    startTransition(async () => {
      const formData = new FormData(e.currentTarget)
      const result = await login(formData)
      if (result?.error) {
        toast.error(result.error)
      }
    })
  }

  return (
    <PublicLayout>
      <section className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-slate-50/50">
        <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-xl shadow-primary/5 border border-border/50 p-10">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-foreground tracking-tighter mb-3">Welcome Back</h1>
            <p className="text-muted-foreground font-medium">Continue your journey with Dr. Clean</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                className="w-full px-6 py-4 bg-slate-50 border border-border/50 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all shadow-sm"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label htmlFor="password" className="block text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Password
                </label>
                <Link href="#" className="text-xs font-bold text-primary hover:text-primary/80 transition-colors">
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  className="w-full px-6 py-4 bg-slate-50 border border-border/50 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-primary text-white py-4 rounded-2xl shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 font-bold hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:translate-y-0 flex items-center justify-center gap-2 group"
            >
              {isPending ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  Access Account
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </>
              )}
            </button>
          </form>

          {/* Alternative */}
          <div className="mt-10 pt-8 border-t border-border/30 text-center">
            <p className="text-muted-foreground text-sm font-medium mb-4">New here?</p>
            <Link 
              href="/register" 
              className="inline-flex items-center justify-center px-8 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm hover:bg-primary hover:text-white transition-all duration-300"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
