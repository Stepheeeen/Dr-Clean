'use client'

import { PublicLayout } from '@/components/layouts/PublicLayout'
import Link from 'next/link'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [userType, setUserType] = useState<'customer' | 'admin'>('customer')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock login - redirect to appropriate dashboard
    if (userType === 'admin') {
      window.location.href = '/admin/dashboard'
    } else {
      window.location.href = '/customer/dashboard'
    }
  }

  return (
    <PublicLayout>
      <section className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-secondary">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg border border-border p-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 text-center">Sign In</h1>
          <p className="text-center text-muted-foreground mb-8">Access your account</p>

          {/* User Type Selector */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setUserType('customer')}
              className={`flex-1 py-2 rounded-lg font-semibold transition-colors ${
                userType === 'customer'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-foreground border border-border'
              }`}
            >
              Customer
            </button>
            <button
              onClick={() => setUserType('admin')}
              className={`flex-1 py-2 rounded-lg font-semibold transition-colors ${
                userType === 'admin'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-foreground border border-border'
              }`}
            >
              Admin
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                defaultValue={userType === 'admin' ? 'admin@drclean.com' : 'customer@example.com'}
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
                  defaultValue="password"
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

            {/* Remember Me */}
            <div className="flex items-center gap-2">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 rounded border-border"
              />
              <label htmlFor="remember" className="text-sm text-foreground">
                Remember me
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/90 transition-colors font-semibold"
            >
              Sign In
            </button>
          </form>

          {/* Forgot Password */}
          <div className="text-center mt-4">
            <Link href="#" className="text-primary hover:text-primary/80 text-sm font-semibold">
              Forgot password?
            </Link>
          </div>

          {/* Sign Up Link */}
          <div className="text-center mt-8 pt-8 border-t border-border">
            <p className="text-muted-foreground mb-2">
              {userType === 'customer' ? "Don't have an account?" : 'Need customer access?'}
            </p>
            {userType === 'customer' ? (
              <Link href="/register" className="text-primary hover:text-primary/80 font-semibold">
                Create an account
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => setUserType('customer')}
                className="text-primary hover:text-primary/80 font-semibold"
              >
                Sign in as customer
              </button>
            )}
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
