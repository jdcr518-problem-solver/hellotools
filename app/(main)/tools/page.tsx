import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getDbData } from '@/lib/db';
import AdBanner from '@/components/AdBanner';
import ToolsDirectoryClient from '@/components/ToolsDirectoryClient';
import { ChevronRight, Home, Calculator, Sparkles, Shield, Lock, Zap, BookOpen, ArrowRight } from 'lucide-react';

const BASE_URL = 'https://hellotools.net';

export const metadata: Metadata = {
  title: 'All Free Online Calculators & Tools — Complete Directory',
  description: 'Browse the complete directory of 71+ free online calculators and web tools across finance, mathematics, health, text manipulation, and developer utilities.',
  alternates: {
    canonical: `${BASE_URL}/tools`,
  },
  openGraph: {
    title: 'All Free Online Calculators & Tools — Complete Directory',
    description: 'Browse 71+ free online calculators and web tools across finance, math, health, text, and utilities.',
    url: `${BASE_URL}/tools`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'HelloTools All Calculators & Tools Directory',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Free Online Calculators & Tools — Complete Directory',
    description: 'Browse 71+ free online calculators and web tools across finance, math, health, text, and utilities.',
    images: [`${BASE_URL}/og-image.png`],
  },
};

export default function ToolsDirectoryPage() {
  const data = getDbData();
  const allTools = data.tools;

  const lightTools = allTools.map((t) => ({
    name: t.name,
    slug: t.slug,
    description: t.description,
    category: t.category,
    keywords: t.keywords,
  }));

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
        name: 'All Tools',
        item: `${BASE_URL}/tools`,
      },
    ],
  };

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'All Free Online Calculators & Web Tools',
    description: 'Browse the complete directory of 71+ free online calculators and web utilities.',
    url: `${BASE_URL}/tools`,
    publisher: {
      '@type': 'Organization',
      name: 'HelloTools',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/icon.png`,
      },
    },
    hasPart: lightTools.map((tool) => ({
      '@type': 'WebApplication',
      name: tool.name,
      description: tool.description,
      url: `${BASE_URL}/tools/${tool.slug}`,
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'Any',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800/80 px-4 py-2.5 rounded-xl">
        <Link href="/" className="hover:text-gray-950 dark:hover:text-white flex items-center gap-1">
          <Home className="h-3.5 w-3.5" />
          <span>Home</span>
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#f97316] dark:text-blue-400 font-bold">All Tools</span>
      </nav>

      {/* Top Banner Advertisement */}
      <AdBanner 
        adCode={process.env.NEXT_PUBLIC_ADSTERRA_BANNER_1 || ''} 
        width={728} 
        height={90} 
      />

      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto my-8">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#f97316]/10 px-3 py-1 text-xs font-bold text-[#f97316] mb-3 uppercase">
          <Calculator className="h-3.5 w-3.5" />
          <span>Complete Directory • {allTools.length} Free Tools</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 dark:from-white dark:to-blue-100 bg-clip-text text-transparent">
          All Free Calculators &amp; Utilities
        </h1>
        <p className="mt-3 text-sm text-slate-600 dark:text-blue-200/80 leading-relaxed">
          Search and filter across our entire library of privacy-focused, browser-based calculation engines. No accounts, no data logging, 100% free forever.
        </p>
      </div>

      {/* Interactive Directory Search & Filtering */}
      <ToolsDirectoryClient allTools={lightTools} />

      {/* Trust Highlights Section */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 my-12">
        <div className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
          <div className="p-2 bg-blue-50 dark:bg-blue-950/40 text-[#1a3c5e] dark:text-blue-400 rounded-xl">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <p className="font-bold text-sm text-gray-900 dark:text-white">100% Client-Side</p>
            <p className="text-xs text-slate-600 dark:text-blue-200/70 mt-1">
              Your numbers, calculations, and data stay private in your browser. Never transmitted to a server.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
          <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-xl">
            <Lock className="h-5 w-5" />
          </div>
          <div>
            <p className="font-bold text-sm text-gray-900 dark:text-white">No Signup Required</p>
            <p className="text-xs text-slate-600 dark:text-blue-200/70 mt-1">
              Instant access without creating accounts, providing emails, or subscribing to paywalls.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
          <div className="p-2 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 rounded-xl">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <p className="font-bold text-sm text-gray-900 dark:text-white">Ultra Fast &amp; Light</p>
            <p className="text-xs text-slate-600 dark:text-blue-200/70 mt-1">
              Engineered for sub-second load times and zero cumulative layout shifts on any device.
            </p>
          </div>
        </div>
      </div>

      {/* Cross-Promo to Blog Guides */}
      <div className="bg-gradient-to-r from-blue-50 to-orange-50/50 dark:from-gray-900 dark:to-gray-850 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 my-8">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-[#f97316]/10 text-[#f97316] rounded-xl shrink-0">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              Learn How the Formulas Work in Our Guides
            </h3>
            <p className="text-xs text-slate-600 dark:text-gray-300 mt-1 max-w-xl">
              Read step-by-step mathematical breakdowns, real numerical examples, and tax explanations in our educational knowledge hub.
            </p>
          </div>
        </div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#1a3c5e] hover:bg-[#142e47] text-white text-xs font-bold transition-colors shrink-0 shadow-sm"
        >
          <span>Explore Blog Articles</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
