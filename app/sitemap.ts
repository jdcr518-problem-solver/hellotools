import { getDbData } from '@/lib/db'
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hellotools.net'

  try {
    const data = getDbData()

    // Generate dynamic tool pages sitemap entries
    const toolPages = data.tools.map((tool) => ({
      url: `${baseUrl}/tools/${tool.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }))

    // Generate dynamic blog pages sitemap entries
    const blogPages = data.blogs.map((blog) => {
      // Parse date safely if available, otherwise fallback to now
      let lastMod = new Date()
      if (blog.date) {
        const parsed = Date.parse(blog.date)
        if (!isNaN(parsed)) {
          lastMod = new Date(parsed)
        }
      }
      return {
        url: `${baseUrl}/blog/${blog.slug}`,
        lastModified: lastMod,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }
    })

    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1.0,
      },
      {
        url: `${baseUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      },
      ...toolPages,
      ...blogPages,
    ]
  } catch (error) {
    console.error('Error generating dynamic sitemap, falling back to static config:', error)
    
    // Fallback if db load fails
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1.0,
      },
      {
        url: `${baseUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      },
    ]
  }
}

