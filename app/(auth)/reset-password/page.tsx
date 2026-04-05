"use client"

import { useState, useTransition, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, Lock, Eye, EyeOff, CheckCircle2 } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"
import { resetPassword } from "@/lib/auth-actions"
import { toast } from "sonner"
import Link from "next/link"

const ResetPasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

import { Suspense } from "react"

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
      toast.error("Missing token!")
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

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
          <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Password reset!</h2>
          <p className="mt-2 text-slate-500">
            Your password has been successfully reset. Redirecting you to login...
          </p>
          <Link 
            href="/login"
            className="mt-6 inline-block text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            Click here if not redirected
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Set new password</h2>
          <p className="mt-2 text-sm text-slate-500">
            Must be at least 6 characters long.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label htmlFor="password" university-id="password-label" className="block text-sm font-medium text-slate-700 mb-1">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 h-5 text-slate-400" />
                </div>
                <input
                  {...register("password")}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  disabled={isPending}
                  className="block w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all sm:text-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" university-id="confirm-password-label" className="block text-sm font-medium text-slate-700 mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 h-5 text-slate-400" />
                </div>
                <input
                  {...register("confirmPassword")}
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  disabled={isPending}
                  className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/20"
          >
            {isPending ? (
              <Loader2 className="w-5 h-5 animate-spin text-white" />
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  )
}
