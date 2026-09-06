import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getDbData } from '@/lib/db';
import { ChevronRight, Home, Calendar, Clock, BookOpen, ArrowRight } from 'lucide-react';

const BASE_URL = 'https://hellotools.net';

export const metadata: Metadata = {
  title: 'Guides & Articles',
  description: 'Simplified educational insights on loans, mathematics, health metrics, and utility calculations from the HelloTools team.',
  alternates: {
    canonical: `${BASE_URL}/blog`,
  },
  openGraph: {
    title: 'HelloTools Blog — Guides & Articles',
    description: 'Simplified educational insights on loans, mathematics, health metrics, and utility calculations.',
    url: `${BASE_URL}/blog`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'HelloTools Blog — Guides & Articles',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HelloTools Blog — Guides & Articles',
    description: 'Simplified educational insights on loans, mathematics, health metrics, and utility calculations.',
    images: [`${BASE_URL}/og-image.png`],
  },
};

export default function BlogPage() {
  const data = getDbData();
  const blogs = data.blogs;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: BASE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${BASE_URL}/blog`,
      },
    ],
  };

  const blogCollectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'HelloTools Blog',
    description: 'Simplified educational insights on loans, mathematics, health metrics, and utility calculations.',
    url: `${BASE_URL}/blog`,
    publisher: {
      '@type': 'Organization',
      name: 'HelloTools',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/icon.png`,
      },
    },
    hasPart: blogs.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.metaDescription,
      url: `${BASE_URL}/blog/${post.slug}`,
      datePublished: post.date,
    })),
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogCollectionJsonLd) }}
      />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800/80 px-4 py-2.5 rounded-xl">
        <Link href="/" className="hover:text-gray-950 dark:hover:text-white flex items-center gap-1">
          <Home className="h-3.5 w-3.5" />
          <span>Home</span>
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#f97316] dark:text-blue-400 font-bold">Blog</span>
      </nav>



      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#f97316]/10 px-3 py-1 text-xs font-bold text-[#f97316] mb-4 uppercase">
          <BookOpen className="h-3.5 w-3.5" />
          <span>Knowledge Hub</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-blue-100 bg-clip-text text-transparent inline-block">
          Guides &amp; Articles
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-blue-200/80 leading-relaxed">
          Simplified educational insights on loans, mathematics, health metrics, and utility code.
        </p>
      </div>

      {/* Blog Grid */}
      {blogs.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto mb-12">
          {blogs.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col justify-between p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md hover:border-[#f97316] dark:hover:border-blue-400 transition-all duration-300"
            >
              <div>
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-[#f97316]" />
                    <span>{post.date}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-blue-500" />
                    <span>{post.readingTime}</span>
                  </span>
                </div>
                <h2 className="text-lg font-bold text-gray-950 dark:text-white group-hover:text-[#f97316] dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-3">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="text-xs text-slate-600 dark:text-blue-200/70 leading-relaxed line-clamp-3">
                  {post.metaDescription}
                </p>
              </div>
              <div className="mt-6 border-t border-gray-100 dark:border-gray-850 pt-4 flex items-center justify-between">
                <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold px-2 py-0.5 rounded uppercase tracking-wider text-[9px]">
                  {post.keyword || 'Guide'}
                </span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#1a3c5e] dark:text-blue-400 hover:text-[#f97316] transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
          <p className="text-gray-500 dark:text-gray-400">No blog posts found.</p>
        </div>
      )}


    </div>
  );
}
