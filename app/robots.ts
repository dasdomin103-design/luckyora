import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.VERCEL_ENV === 'production'
  const baseUrl = 'https://www.luckyora.live'

  if (!isProduction) {
    // Block everything on preview deployments
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    }
  }

  // Production: Allow crawling
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/dashboard/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}