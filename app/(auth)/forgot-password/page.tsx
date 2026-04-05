"use client"

import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, Mail, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { initiatePasswordReset } from "@/lib/auth-actions"
import { toast } from "sonner"

const ForgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

export default function ForgotPasswordPage() {
  const [isPending, startTransition] = useTransition()
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = (values: z.infer<typeof ForgotPasswordSchema>) => {
    startTransition(() => {
      initiatePasswordReset(values).then((data) => {
        if (data?.error) {
          toast.error(data.error)
        }
        if (data?.success) {
          toast.success(data.success)
          setIsSubmitted(true)
        }
      })
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <div className="text-center">
          <Link 
            href="/login" 
            className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to login
          </Link>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Forgot password?</h2>
          <p className="mt-2 text-sm text-slate-500">
            No worries, we'll send you reset instructions.
          </p>
        </div>

        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Check your email</h3>
            <p className="text-sm text-slate-500 mt-2">
              We've sent a password reset link to your email address.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-6 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              Didn't receive the email? Click to retry
            </button>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 h-5 text-slate-400" />
                  </div>
                  <input
                    {...register("email")}
                    id="email"
                    type="email"
                    autoComplete="email"
                    disabled={isPending}
                    className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all sm:text-sm"
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
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
        )}
      </div>
    </div>
  )
}
