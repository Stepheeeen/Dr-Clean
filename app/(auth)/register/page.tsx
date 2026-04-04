'use client'

import { PublicLayout } from '@/components/layouts/PublicLayout'
import Link from 'next/link'
import { useState, useTransition } from 'react'
import { Eye, EyeOff, Loader2, CheckCircle2 } from 'lucide-react'
import { register } from '@/lib/auth-actions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    startTransition(async () => {
      const result = await register({ name, email, password })
      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success("Account created successfully! Please sign in.")
        router.push("/login")
      }
    })
  }

  return (
    <PublicLayout>
      <section className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-slate-50/50 py-20">
        <div className="w-full max-w-xl bg-white rounded-[3rem] shadow-2xl shadow-primary/5 border border-border/50 p-12 lg:p-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-primary/5 text-primary mb-6">
              <CheckCircle2 size={32} />
            </div>
            <h1 className="text-4xl font-extrabold text-foreground tracking-tighter mb-3">Join the Future</h1>
            <p className="text-muted-foreground font-medium">Experience world-class garment care</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-3">
                <label htmlFor="name" className="block text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="John Smith"
                  className="w-full px-6 py-4 bg-slate-50 border border-border/50 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all shadow-sm"
                />
              </div>

              {/* Email */}
              <div className="space-y-3">
                <label htmlFor="email" className="block text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full px-6 py-4 bg-slate-50 border border-border/50 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all shadow-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Password */}
              <div className="space-y-3">
                <label htmlFor="password" className="block text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
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

              {/* Confirm Password */}
              <div className="space-y-3">
                <label htmlFor="confirmPassword" className="block text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Confirm
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full px-6 py-4 bg-slate-50 border border-border/50 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-primary text-white py-5 rounded-2xl shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 font-bold hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:translate-y-0 flex items-center justify-center gap-2 group text-lg"
            >
              {isPending ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                <>
                  Create Your Account
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </>
              )}
            </button>
          </form>

          {/* Alternative */}
          <div className="mt-12 pt-10 border-t border-border/30 text-center">
            <p className="text-muted-foreground text-sm font-medium mb-4">Already have an account?</p>
            <Link 
              href="/login" 
              className="inline-flex items-center justify-center px-10 py-3.5 bg-slate-100 text-slate-600 rounded-2xl font-bold text-sm hover:bg-primary hover:text-white transition-all duration-300 shadow-sm"
            >
              Sign In Instead
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
