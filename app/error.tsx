'use client'

import { useEffect } from 'react'
import { RefreshCcw, AlertTriangle, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="mx-auto w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center text-destructive mb-8">
          <AlertTriangle size={36} />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Something went wrong!</h1>
          <p className="text-muted-foreground text-balanced">
            An unexpected error occurred while processing your request. 
            Don't worry, even the strongest stains can be removed. 
            Try refreshing the page or head back home.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Button onClick={() => reset()} variant="default" className="gap-2 px-8">
            <RefreshCcw size={18} />
            Try Again
          </Button>
          <Button asChild variant="outline" className="gap-2 px-8">
            <Link href="/">
              <Home size={18} />
              Return Home
            </Link>
          </Button>
        </div>

        <div className="pt-12">
          <p className="text-xs text-muted-foreground font-mono">
            Error Digest: {error.digest || 'N/A'}
          </p>
        </div>
      </div>
    </div>
  )
}
