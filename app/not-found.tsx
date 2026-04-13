import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-9xl font-extrabold text-primary animate-in fade-in zoom-in duration-700">404</h1>
          <h2 className="text-2xl font-bold text-foreground">Page Not Found</h2>
          <p className="text-muted-foreground">
            Oops! The page you're looking for seems to have vanished in the wash. 
            Let's get you back on track.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button asChild variant="default" className="gap-2">
            <Link href="/">
              <Home size={18} />
              Back Home
            </Link>
          </Button>
          <Button asChild variant="outline" className="gap-2">
            <Link href="javascript:history.back()">
              <ArrowLeft size={18} />
              Go Back
            </Link>
          </Button>
        </div>

        <div className="pt-12">
          <div className="inline-block p-4 rounded-2xl bg-primary/5 text-primary border border-primary/10">
            <p className="text-sm font-medium">Dr. Clean | Pure Excellence</p>
          </div>
        </div>
      </div>
    </div>
  )
}
