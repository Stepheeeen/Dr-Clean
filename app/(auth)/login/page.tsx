'use client'

import { PublicLayout } from '@/components/layouts/PublicLayout'
import Link from 'next/link'
import { useState, useTransition } from 'react'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { login } from '@/lib/auth-actions'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema } from '@/schemas'
import * as z from 'zod'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(async () => {
      const result = await login(values)
      if (result?.error) {
        toast.error(result.error)
      }
    })
  }

  return (
    <PublicLayout>
      <section className="min-h-screen flex items-center justify-center px-6 lg:px-12 bg-background relative overflow-hidden py-32">
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>

        <div className="w-full max-w-lg bg-background border border-foreground p-12 lg:p-20 relative z-10 animate-in fade-in zoom-in duration-700">
          <header className="mb-16">
            <h2 className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-6">Login</h2>
            <h1 className="text-5xl font-black text-foreground tracking-tighter uppercase leading-none">
              WELCOME <br /><span className="font-light italic text-primary">BACK</span>.
            </h1>
          </header>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
            <div className="space-y-4 group">
              <label htmlFor="email" className="block text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] group-focus-within:text-primary transition-colors">
                Email Address
              </label>
              <input
                {...register('email')}
                type="email"
                placeholder="ENTER EMAIL ADDRESS"
                className={`w-full bg-transparent border-b py-4 text-sm font-black text-foreground placeholder:text-muted-foreground/30 focus:outline-none transition-all uppercase tracking-widest ${
                  errors.email ? 'border-red-500' : 'border-border focus:border-foreground'
                }`}
              />
              {errors.email && <p className="text-[9px] font-black text-red-500 uppercase tracking-widest">{errors.email.message}</p>}
            </div>

            <div className="space-y-4 group">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] group-focus-within:text-primary transition-colors">
                  Password
                </label>
                <Link href="/forgot-password" title="Reset Password" className="text-[10px] font-black text-primary uppercase tracking-[0.3em] hover:text-foreground transition-colors">
                  FORGOT?
                </Link>
              </div>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••••"
                  className={`w-full bg-transparent border-b py-4 text-sm font-black text-foreground placeholder:text-muted-foreground/30 focus:outline-none transition-all uppercase tracking-widest ${
                    errors.password ? 'border-red-500' : 'border-border focus:border-foreground'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-[9px] font-black text-red-500 uppercase tracking-widest">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-foreground text-background py-6 font-black uppercase tracking-[0.4em] text-[10px] hover:bg-primary hover:text-white transition-all duration-500 disabled:opacity-50 flex items-center justify-center gap-4 group"
            >
              {isPending ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <>
                  Login
                  <span className="group-hover:translate-x-2 transition-transform duration-500">→</span>
                </>
              )}
            </button>
          </form>

          <footer className="mt-20 pt-12 border-t border-border flex flex-col items-center gap-6">
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] font-medium">New here?</p>
            <Link 
              href="/register" 
              className="text-[10px] font-black text-foreground uppercase tracking-[0.4em] border border-foreground px-12 py-5 hover:bg-foreground hover:text-background transition-all duration-500"
            >
              Create Account
            </Link>
          </footer>
        </div>
      </section>
    </PublicLayout>
  )
}
