import React from 'react';
import { Metadata } from 'next';
import { Cpu, ShieldCheck, Lock, Zap, ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

const BASE_URL = 'https://hellotools.net';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about HelloTools — a suite of free, private, client-side web utility tools and calculators engineered to run entirely inside your browser with zero data logging.',
  alternates: {
    canonical: `${BASE_URL}/about`,
  },
  openGraph: {
    title: 'About HelloTools — Fast, Free & Private Online Utilities',
    description: 'Learn about HelloTools — a suite of free, private, client-side web utility tools and calculators engineered to run entirely inside your browser with zero data logging.',
    url: `${BASE_URL}/about`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'About HelloTools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About HelloTools — Fast, Free & Private Online Utilities',
    description: 'Learn about HelloTools — a suite of free, private, client-side web utility tools and calculators engineered to run entirely inside your browser with zero data logging.',
    images: [`${BASE_URL}/og-image.png`],
  },
};

export default function AboutUs() {
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
        name: 'About Us',
        item: `${BASE_URL}/about`,
      },
    ],
  };

  const aboutPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About HelloTools',
    description: 'A suite of client-side web utility tools and calculators built for the modern, privacy-focused web.',
    url: `${BASE_URL}/about`,
    mainEntity: {
      '@type': 'Organization',
      name: 'HelloTools',
      url: BASE_URL,
      logo: `${BASE_URL}/icon.png`,
      sameAs: [],
    },
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }}
      />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800/80 px-4 py-2.5 rounded-xl">
        <Link href="/" className="hover:text-gray-950 dark:hover:text-white flex items-center gap-1">
          <Home className="h-3.5 w-3.5" />
          <span>Home</span>
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#f97316] dark:text-blue-400 font-bold">About Us</span>
      </nav>

      {/* Hero Header Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a3c5e] to-[#0a1b2d] px-6 py-14 text-center shadow-xl sm:px-12 my-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#f97316]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative mx-auto max-w-xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-900/40 border border-blue-500/30 px-3 py-1 text-xs font-semibold text-blue-300 mb-4">
            <Cpu className="h-3.5 w-3.5 text-[#f97316]" />
            <span>Behind HelloTools</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            About HelloTools
          </h1>
          <p className="mt-3 text-sm text-blue-100/80 leading-relaxed">
            A premium suite of client-side web utility tools and calculators built for the modern, privacy-focused web.
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="space-y-12 text-sm text-gray-700 dark:text-gray-300 leading-relaxed mt-10">
        
        {/* Core Values */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">
            Why We Created HelloTools
          </h2>
          <p>
            The internet is flooded with online tools, unit converters, and financial solvers. However, most of them suffer from the same set of issues:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Intrusive Advertisements:</strong> Screen-blocking ads, popups, and layout shifts that make checking a simple calculation frustrating.</li>
            <li><strong>Privacy Invasion:</strong> Unnecessary registration forms, login barriers, and data logging where your entries are saved on server databases.</li>
            <li><strong>Poor Performance:</strong> Slow server-side roundtrips and outdated designs that look straight out of the 1990s.</li>
          </ul>
          <p className="mt-4">
            <strong className="font-bold text-gray-900 dark:text-white">HelloTools</strong> was engineered from the ground up to solve these frustrations. We created a premium, single-page client-side dashboard that runs mathematical, financial, developer, and health calculators instantly in your browser.
          </p>
        </section>

        {/* Our Three Pillars */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-2.5">
            <div className="p-2 w-fit bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <Lock className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white text-base">Privacy-First</h3>
            <p className="text-xs text-slate-600 dark:text-blue-200/70 leading-relaxed">
              We do not track or record your numeric inputs. All computing logic runs inside your local browser memory.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-2.5">
            <div className="p-2 w-fit bg-orange-50 dark:bg-orange-950/30 text-[#f97316] rounded-xl">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white text-base">Instant Performance</h3>
            <p className="text-xs text-slate-600 dark:text-blue-200/70 leading-relaxed">
              Built on Next.js, our calculations execute instantly on client-side JS without waiting for server responses.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-2.5">
            <div className="p-2 w-fit bg-blue-50 dark:bg-blue-950/40 text-[#1a3c5e] dark:text-blue-400 rounded-xl">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white text-base">Clean Experience</h3>
            <p className="text-xs text-slate-600 dark:text-blue-200/70 leading-relaxed">
              We display minimal, compliant layout-safe ads to keep our tools 100% free, without sacrificing user accessibility.
            </p>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">
            The Technology
          </h2>
          <p>
            HelloTools is built using the latest modern web technologies:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Next.js 16 (App Router)</strong> for fast, server-side optimized base layouts.</li>
            <li><strong>React 19 &amp; TypeScript</strong> for type-safe, reactive user interfaces and forms.</li>
            <li><strong>Tailwind CSS v4</strong> for sleek, responsive styling with native dark mode support.</li>
            <li><strong>Lucide React Icons</strong> for clean, minimalist visual guidance.</li>
          </ul>
        </section>

        {/* Call to Action */}
        <section className="p-8 rounded-3xl bg-gray-100 dark:bg-gray-900 text-center space-y-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Help Us Improve</h3>
          <p className="text-xs text-slate-600 dark:text-blue-200/70 max-w-lg mx-auto leading-relaxed">
            HelloTools is a continuously evolving catalog of solvers and text helpers. If you find a bug or have an idea for a new tool, we would love to hear from you.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex h-10 px-5 items-center justify-center rounded-lg bg-[#1a3c5e] text-white hover:bg-[#112942] font-semibold transition-colors text-xs cursor-pointer"
          >
            Submit Feedback
          </Link>
        </section>

      </div>
    </div>
  );
}
