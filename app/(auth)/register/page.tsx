'use client'

import { PublicLayout } from '@/components/layouts/PublicLayout'
import Link from 'next/link'
import { useState, useTransition } from 'react'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { register } from '@/lib/auth-actions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterSchema } from '@/schemas'
import * as z from 'zod'

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    startTransition(async () => {
      const result = await register(values)
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
      <section className="min-h-screen flex items-center justify-center px-6 lg:px-12 bg-background relative overflow-hidden py-32">
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>

        <div className="w-full max-w-2xl bg-background border border-foreground p-12 lg:p-20 relative z-10 animate-in fade-in zoom-in duration-700">
          <header className="mb-16">
            <h2 className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-6">Create Account</h2>
            <h1 className="text-5xl font-black text-foreground tracking-tighter uppercase leading-none">
              JOIN THE <br /><span className="font-light italic text-primary">COMMUNITY</span>.
            </h1>
          </header>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4 group">
                <label htmlFor="name" className="block text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] group-focus-within:text-primary transition-colors">
                  Full Name
                </label>
                <input
                  {...registerField('name')}
                  placeholder="FULL NAME"
                  className={`w-full bg-transparent border-b py-4 text-sm font-black text-foreground placeholder:text-muted-foreground/30 focus:outline-none transition-all uppercase tracking-widest ${
                    errors.name ? 'border-red-500' : 'border-border focus:border-foreground'
                  }`}
                />
                {errors.name && <p className="text-[9px] font-black text-red-500 uppercase tracking-widest">{errors.name.message}</p>}
              </div>

              <div className="space-y-4 group">
                <label htmlFor="email" className="block text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] group-focus-within:text-primary transition-colors">
                  Email Address
                </label>
                <input
                  {...registerField('email')}
                  type="email"
                  placeholder="EMAIL ADDRESS"
                  className={`w-full bg-transparent border-b py-4 text-sm font-black text-foreground placeholder:text-muted-foreground/30 focus:outline-none transition-all uppercase tracking-widest ${
                    errors.email ? 'border-red-500' : 'border-border focus:border-foreground'
                  }`}
                />
                {errors.email && <p className="text-[9px] font-black text-red-500 uppercase tracking-widest">{errors.email.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4 group">
                <label htmlFor="password" className="block text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] group-focus-within:text-primary transition-colors">
                  Password
                </label>
                <div className="relative">
                  <input
                    {...registerField('password')}
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

              <div className="space-y-4 group">
                <label htmlFor="confirmPassword" className="block text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] group-focus-within:text-primary transition-colors">
                  Confirm Password
                </label>
                <input
                  {...registerField('confirmPassword')}
                  type="password"
                  placeholder="CONFIRM PASSWORD"
                  className={`w-full bg-transparent border-b py-4 text-sm font-black text-foreground placeholder:text-muted-foreground/30 focus:outline-none transition-all uppercase tracking-widest ${
                    errors.confirmPassword ? 'border-red-500' : 'border-border focus:border-foreground'
                  }`}
                />
                {errors.confirmPassword && <p className="text-[9px] font-black text-red-500 uppercase tracking-widest">{errors.confirmPassword.message}</p>}
              </div>
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
                  Create Account
                  <span className="group-hover:translate-x-2 transition-transform duration-500">→</span>
                </>
              )}
            </button>
          </form>

          <footer className="mt-20 pt-12 border-t border-border flex flex-col items-center gap-6">
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] font-medium">Already have an account?</p>
            <Link 
              href="/login" 
              className="text-[10px] font-black text-foreground uppercase tracking-[0.4em] border border-foreground px-12 py-5 hover:bg-foreground hover:text-background transition-all duration-500"
            >
              Log In
            </Link>
          </footer>
        </div>
      </section>
    </PublicLayout>
  )
}
