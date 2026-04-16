import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const viewport: Viewport = {
  themeColor: '#2563eb',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://dr-clean.com.ng'),
  title: {
    default: 'Dr. Clean | Premium Laundry & Dry Cleaning Nigeria',
    template: '%s | Dr. Clean'
  },
  description: 'Pure excellence in laundry and dry cleaning. Experience premium, reliable, and editorial-quality garment care in Lagos and Abuja. Pickup and delivery available.',
  keywords: ['Laundry service Lagos', 'Dry cleaning Abuja', 'Premium laundry Nigeria', 'Garment care', 'Dr. Clean laundry', 'Lagos dry cleaners', 'Abuja laundry service'],
  authors: [{ name: 'Dr. Clean Team' }],
  creator: 'Dr. Clean',
  publisher: 'Dr. Clean',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Dr. Clean | Premium Laundry & Dry Cleaning',
    description: 'Expert garment care with a touch of blue. Experience the future of laundry in Nigeria.',
    url: 'https://dr-clean.com.ng',
    siteName: 'Dr. Clean',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Dr. Clean Premium Laundry',
      },
    ],
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dr. Clean | Premium Laundry',
    description: 'Expert garment care in Nigeria. Purity in every fold.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      {
        url: '/favicon.ico',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Dr. Clean',
  },
}

import { Analytics } from '@vercel/analytics/next'
import './globals.css'

import { Toaster } from 'sonner'
import { SessionProvider } from '@/components/providers/SessionProvider'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="font-sans antialiased overflow-x-hidden selection:bg-primary/20">
        <SessionProvider>
          <Toaster position="top-right" expand={true} richColors />
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </SessionProvider>
      </body>
    </html>
  )
}
