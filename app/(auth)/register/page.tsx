'use client'

import { PublicLayout } from '@/components/layouts/PublicLayout'
import Link from 'next/link'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock registration - redirect to customer dashboard
    window.location.href = '/customer/dashboard'
  }

  return (
    <PublicLayout>
      <section className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-secondary py-12">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg border border-border p-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 text-center">Create Account</h1>
          <p className="text-center text-muted-foreground mb-8">Join Dr. Clean today</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="John Smith"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-2">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="+1 (234) 567-8900"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-semibold text-foreground mb-2">
                Address
              </label>
              <input
                id="address"
                type="text"
                placeholder="123 Main St, City, State 12345"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-foreground mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <input
                id="terms"
                type="checkbox"
                className="w-4 h-4 rounded border-border mt-1"
              />
              <label htmlFor="terms" className="text-sm text-foreground">
                I agree to the{' '}
                <Link href="#" className="text-primary hover:text-primary/80 font-semibold">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="#" className="text-primary hover:text-primary/80 font-semibold">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/90 transition-colors font-semibold"
            >
              Create Account
            </button>
          </form>

          {/* Sign In Link */}
          <div className="text-center mt-8 pt-8 border-t border-border">
            <p className="text-muted-foreground mb-2">Already have an account?</p>
            <Link href="/login" className="text-primary hover:text-primary/80 font-semibold">
              Sign in here
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
