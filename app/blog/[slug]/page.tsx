import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { getDbData } from '@/lib/db';
import AdBanner from '@/components/AdBanner';
import { ChevronRight, Home, Calendar, Clock, ArrowLeft } from 'lucide-react';

interface BlogPostPageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

// Generate dynamic SEO metadata for the blog post
export async function generateMetadata(
  props: BlogPostPageProps
): Promise<Metadata> {
  const resolvedParams = await props.params;
  const data = getDbData();
  const post = data.blogs.find((b) => b.slug === resolvedParams.slug);

  if (!post) {
    return {
      title: 'Post Not Found - HelloTools Blog',
    };
  }

  return {
    title: `${post.title} - HelloTools Blog`,
    description: post.metaDescription,
    keywords: post.keyword,
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage(props: BlogPostPageProps) {
  const resolvedParams = await props.params;
  const data = getDbData();
  const post = data.blogs.find((b) => b.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  // Get other blog posts to show in sidebar
  const otherPosts = data.blogs.filter((b) => b.slug !== resolvedParams.slug).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800/80 px-4 py-2.5 rounded-xl">
        <Link href="/" className="hover:text-gray-950 dark:hover:text-white flex items-center gap-1">
          <Home className="h-3.5 w-3.5" />
          <span>Home</span>
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/blog" className="hover:text-gray-950 dark:hover:text-white">
          Blog
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#f97316] dark:text-blue-400 font-bold truncate max-w-[200px] sm:max-w-[400px]">
          {post.title}
        </span>
      </nav>

      {/* Top Banner Advertisement */}
      <AdBanner 
        adCode={process.env.NEXT_PUBLIC_ADSTERRA_BANNER_1 || ''} 
        width={728} 
        height={90} 
      />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start my-6">
        {/* Main Article Content */}
        <article className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          {/* Article Header */}
          <div className="border-b border-gray-100 dark:border-gray-850 pb-6 mb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-950 dark:text-white leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-xs text-gray-400 mt-4">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-[#f97316]" />
                <span>{post.date}</span>
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-blue-500" />
                <span>{post.readingTime}</span>
              </span>
              {post.keyword && (
                <span className="bg-[#f97316]/10 text-[#f97316] px-2 py-0.5 rounded font-bold uppercase text-[9px] tracking-wider ml-auto">
                  {post.keyword}
                </span>
              )}
            </div>
          </div>

          {/* HTML Rich Text Body */}
          <div 
            className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Rectangle below content (300x250) */}
          <AdBanner 
            adCode={process.env.NEXT_PUBLIC_ADSTERRA_BANNER_2 || ''} 
            width={300} 
            height={250} 
          />

          <div className="mt-8 border-t border-gray-100 dark:border-gray-850 pt-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1a3c5e] dark:text-blue-400 hover:text-[#f97316] dark:hover:text-[#f97316] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to all articles</span>
            </Link>
          </div>
        </article>

        {/* Sidebar Widgets */}
        <div className="space-y-6">
          {/* Other Articles list */}
          {otherPosts.length > 0 && (
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm">
              <h3 className="font-bold text-sm text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2 mb-3">
                Other Reads
              </h3>
              <div className="space-y-4">
                {otherPosts.map((other) => (
                  <div key={other.slug} className="group">
                    <h4 className="font-bold text-xs text-gray-800 dark:text-gray-200 group-hover:text-[#f97316] dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      <Link href={`/blog/${other.slug}`}>{other.title}</Link>
                    </h4>
                    <span className="text-[10px] text-gray-400 mt-1 block">{other.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}


        </div>
      </div>


    </div>
  );
}
