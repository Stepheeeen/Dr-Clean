'use client'

import { useTransition, useState, useEffect, Suspense } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, CheckCircle2, Loader2, ShieldCheck } from 'lucide-react'
import { toast } from 'sonner'
import { PublicLayout } from '@/components/layouts/PublicLayout'
import { resetPassword } from '@/lib/auth-actions'

const ResetPasswordSchema = z.object({
  password: z.string().min(6, "Security key must be at least 6 characters"),
  confirmPassword: z.string().min(1, "Key verification is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Security keys do not match",
  path: ["confirmPassword"],
})

function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get("token")

  const [isPending, startTransition] = useTransition()
  const [showPassword, setShowPassword] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  useEffect(() => {
    if (!token) {
      toast.error("MISSING SECURITY TOKEN")
      router.push("/login")
    }
  }, [token, router])

  const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
    if (!token) return

    startTransition(() => {
      resetPassword({
        password: values.password,
        token,
      }).then((data) => {
        if (data?.error) {
          toast.error(data.error)
        }
        if (data?.success) {
          toast.success(data.success)
          setIsSuccess(true)
          setTimeout(() => {
            router.push("/login")
          }, 3000)
        }
      })
    })
  }

  return (
    <div className="w-full max-w-lg bg-background border border-foreground p-12 lg:p-20 relative z-10 animate-in fade-in zoom-in duration-700">
      <header className="mb-16">
        <h2 className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-6">Credential Restoration</h2>
        <h1 className="text-5xl font-black text-foreground tracking-tighter uppercase leading-none">
          SECURE <br /><span className="font-light italic text-primary">RECOVERY</span>.
        </h1>
        <p className="mt-8 text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] italic leading-relaxed">
          Define your new security markers.
        </p>
      </header>

      {isSuccess ? (
        <div className="text-center py-20 bg-secondary/20 border border-border">
          <div className="w-20 h-20 border border-emerald-500 flex items-center justify-center mx-auto mb-10">
            <CheckCircle2 className="w-8 h-8 text-emerald-500" />
          </div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground mb-4">Protocol Completed</h3>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-12 italic">
            Your credentials have been updated. Redirecting to Vault...
          </p>
          <Link 
            href="/login"
            className="text-[10px] font-black text-primary border-b border-primary pb-1 uppercase tracking-[0.3em] hover:text-foreground hover:border-foreground transition-all"
          >
            Manual Redirection
          </Link>
        </div>
      ) : (
        <form className="space-y-12" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 group">
            <label htmlFor="password" className="block text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] group-focus-within:text-primary transition-colors">
              New Security Key
            </label>
            <div className="relative">
              <input
                {...register("password")}
                id="password"
                type={showPassword ? "text" : "password"}
                disabled={isPending}
                placeholder="MINIMUM 6 CHARACTERS"
                className="w-full bg-transparent border-b border-border py-4 text-sm font-black text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-foreground transition-all uppercase tracking-widest"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-[10px] font-black text-red-500 uppercase tracking-widest italic">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-4 group">
            <label htmlFor="confirmPassword" className="block text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] group-focus-within:text-primary transition-colors">
              Verify Key
            </label>
            <input
              {...register("confirmPassword")}
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              disabled={isPending}
              placeholder="REPEAT SECURITY KEY"
              className="w-full bg-transparent border-b border-border py-4 text-sm font-black text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-foreground transition-all uppercase tracking-widest"
            />
            {errors.confirmPassword && (
              <p className="text-[10px] font-black text-red-500 uppercase tracking-widest italic">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-foreground text-background py-6 font-black uppercase tracking-[0.4em] text-[10px] hover:bg-primary hover:text-white transition-all duration-500 disabled:opacity-50 flex items-center justify-center gap-4 group"
          >
            {isPending ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Restore Access
                <span className="group-hover:translate-x-2 transition-transform duration-500">→</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <PublicLayout>
      <section className="min-h-screen flex items-center justify-center px-6 lg:px-12 bg-background relative overflow-hidden py-32">
        {/* Background Accent */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>

        <Suspense fallback={
          <div className="w-full max-w-lg bg-background border border-foreground p-20 flex flex-col items-center justify-center space-y-8 animate-pulse">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground italic">Decrypting Token...</p>
          </div>
        }>
          <ResetPasswordForm />
        </Suspense>
      </section>
    </PublicLayout>
  )
}
