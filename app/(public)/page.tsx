import { Metadata } from 'next'
import { PublicLayout } from '@/components/layouts/PublicLayout'
import HomeClient from '@/components/public/HomeClient'

export const metadata: Metadata = {
  title: 'Dr. Clean | Premium Laundry & Dry Cleaning',
  description: 'The most sophisticated laundry and dry cleaning service in Nigeria. Book online and experience purity in every fold.',
}

export default function Home() {
  return (
    <PublicLayout>
      <HomeClient />
    </PublicLayout>
  )
}
