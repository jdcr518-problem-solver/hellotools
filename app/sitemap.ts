import { getDbData } from '@/lib/db';
import { MetadataRoute } from 'next';
import { NON_DEFAULT_LOCALES, PILOT_TOOLS } from '@/lib/i18n';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hellotools.net';

  try {
    const data = getDbData();

    // 1. Existing 71 English tool pages
    const englishToolPages = data.tools.map((tool) => ({
      url: `${baseUrl}/tools/${tool.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }));

    // 2. Localized pilot tool pages (10 pilot tools × 5 locales = 50 URLs)
    const localizedToolPages: MetadataRoute.Sitemap = [];
    for (const locale of NON_DEFAULT_LOCALES) {
      for (const slug of PILOT_TOOLS) {
        localizedToolPages.push({
          url: `${baseUrl}/${locale}/tools/${slug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        });
      }
    }

    // 3. Dynamic blog pages
    const blogPages = data.blogs.map((blog) => {
      let lastMod = new Date();
      if (blog.date) {
        const parsed = Date.parse(blog.date);
        if (!isNaN(parsed)) {
          lastMod = new Date(parsed);
        }
      }
      return {
        url: `${baseUrl}/blog/${blog.slug}`,
        lastModified: lastMod,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      };
    });

    // 4. Localized homepages (/es, /de, /fr, /pt, /ja = 5 URLs)
    const localizedHomepages = NON_DEFAULT_LOCALES.map((locale) => ({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    }));

    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1.0,
      },
      ...localizedHomepages,
      {
        url: `${baseUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      },
      ...englishToolPages,
      ...localizedToolPages,
      ...blogPages,
    ];
  } catch (error) {
    console.error('Error generating dynamic sitemap, falling back to static config:', error);

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
    ];
  }
}
