import React from 'react';
import Link from 'next/link';
import { getDbData } from '@/lib/db';
import AdBanner from '@/components/AdBanner';
import HomeClientContent from '@/components/HomeClientContent';
import { Shield, Lock, Zap, BookOpen, ArrowRight } from 'lucide-react';

export default async function Home() {
  const data = getDbData();
  const allTools = data.tools;
  const homepage = data.homepage;

  // Map to a lightweight structure to reduce client bundle payload size
  const lightTools = allTools.map((t) => ({
    name: t.name,
    slug: t.slug,
    description: t.description,
    category: t.category,
    keywords: t.keywords,
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Banner Advertisement */}
      <AdBanner 
        adCode={process.env.NEXT_PUBLIC_ADSTERRA_BANNER_1 || ''} 
        width={728} 
        height={90} 
      />

      {/* Dynamic client-side content (Hero + Search Box + Tools Grid) */}
      <HomeClientContent
        allTools={lightTools}
        featuredToolSlugs={homepage.featuredTools}
        heroHeadline={homepage.heroHeadline}
        heroSubheadline={homepage.heroSubheadline}
      />

      {/* Trust Highlights (Static Section) */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 my-10">
        <div className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
          <div className="p-2 bg-blue-50 dark:bg-blue-950/40 text-[#1a3c5e] dark:text-blue-400 rounded-xl">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <p className="font-bold text-sm text-gray-900 dark:text-white">Safe &amp; Secure</p>
            <p className="text-xs text-slate-600 dark:text-blue-200/70 mt-1">
              All tools execute inside your browser. Your inputs never touch our servers.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
          <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-xl">
            <Lock className="h-5 w-5" />
          </div>
          <div>
            <p className="font-bold text-sm text-gray-900 dark:text-white">Zero Account Setup</p>
            <p className="text-xs text-slate-600 dark:text-blue-200/70 mt-1">
              100% free with no login required. Instant usage across mobile and desktop.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
          <div className="p-2 bg-orange-55 to-orange-10/20 bg-orange-55 to-orange-10/20 bg-orange-50 dark:bg-orange-950/30 text-[#f97316] rounded-xl">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <p className="font-bold text-sm text-gray-900 dark:text-white">Blazing Fast</p>
            <p className="text-xs text-slate-600 dark:text-blue-200/70 mt-1">
              Immediate computation logic built on client-side JS. No latency.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Blog Promo Section (Static Section) */}
      <section className="my-16 rounded-2xl border border-gray-200 dark:border-gray-850 p-6 sm:p-8 bg-white dark:bg-gray-900 flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="space-y-2 max-w-md">
          <div className="flex items-center gap-2 text-[#f97316] dark:text-blue-400 font-bold text-xs uppercase tracking-wider">
            <BookOpen className="h-4 w-4" />
            <span>Knowledge Base</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-blue-100 bg-clip-text text-transparent inline-block">
            Learn with HelloTools Guides &amp; Blog
          </h3>
          <p className="text-xs text-slate-600 dark:text-blue-200/70 leading-relaxed">
            Read our simplified guides on financial models, tax brackets, BMI indices, and developer tips.
          </p>
        </div>
        <Link
          href="/blog"
          className="w-full sm:w-auto h-11 px-6 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-750 text-gray-900 dark:text-white font-bold text-xs flex items-center justify-center gap-2 shrink-0 transition-colors"
        >
          <span>Explore Blog Articles</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}

