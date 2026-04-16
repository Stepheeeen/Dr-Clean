import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://dr-clean.com.ng'
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/customer/', '/admin/', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
