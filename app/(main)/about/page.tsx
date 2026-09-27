import React from 'react';
import { Metadata } from 'next';
import { Cpu, ShieldCheck, Lock, Zap, ChevronRight, Home, UserCheck, BookOpen, CheckCircle2, Globe2 } from 'lucide-react';
import Link from 'next/link';

const BASE_URL = 'https://hellotools.net';

export const metadata: Metadata = {
  title: 'About HelloTools — Free, Private & Instant Online Utilities',
  description: 'Learn about HelloTools, founded by Abdul Rehman. Discover our mission to provide lightning-fast, private, client-side calculators with zero data logging.',
  alternates: {
    canonical: `${BASE_URL}/about`,
  },
  openGraph: {
    title: 'About HelloTools — Fast, Free & Private Online Utilities',
    description: 'Learn about HelloTools, founded by Abdul Rehman. High-precision calculators running 100% inside your browser with zero data logging.',
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
    description: 'Learn about HelloTools, founded by Abdul Rehman. Client-side calculators built for privacy and speed.',
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
    description: 'A suite of client-side web utility tools and calculators engineered for immediate, private calculations.',
    url: `${BASE_URL}/about`,
    mainEntity: {
      '@type': 'Organization',
      name: 'HelloTools',
      url: BASE_URL,
      logo: `${BASE_URL}/icon.png`,
      founder: {
        '@type': 'Person',
        name: 'Abdul Rehman',
        jobTitle: 'Founder & Lead Developer',
        nationality: 'Pakistani',
      },
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
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#f97316]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative mx-auto max-w-2xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-900/40 border border-blue-500/30 px-3 py-1 text-xs font-semibold text-blue-300 mb-4">
            <Cpu className="h-3.5 w-3.5 text-[#f97316]" />
            <span>Mission &amp; Team</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            About HelloTools
          </h1>
          <p className="mt-3 text-sm text-blue-100/80 leading-relaxed max-w-xl mx-auto">
            A free, client-side utility suite engineered to provide instant financial, health, mathematical, and developer computations without tracking your personal data.
          </p>
        </div>
      </div>

      {/* Main Body */}
      <div className="space-y-12 text-sm text-gray-700 dark:text-gray-300 leading-relaxed mt-10">

        {/* Mission Statement */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">
            Our Mission: Frictionless &amp; Private Computing
          </h2>
          <p>
            Every day, millions of people search the web for basic everyday calculations—estimating a monthly loan installment, checking a BMI range, formatting a JSON payload, or calculating a tip. Unfortunately, most calculator sites today are plagued by intrusive interstitial ads, mandatory account registrations, slow server reloads, and hidden trackers that record sensitive financial and health inputs.
          </p>
          <p>
            <strong className="font-semibold text-gray-900 dark:text-white">HelloTools</strong> was founded to provide a modern, respectful alternative. Our entire suite of 70+ utilities executes directly inside your browser using client-side JavaScript and WebAssembly. Your numbers, formulas, and text entries remain in your local device memory and are never transmitted to our servers or saved in a remote database.
          </p>
        </section>

        {/* Founder & Authorship Section (E-E-A-T) */}
        <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-[#1a3c5e] dark:text-blue-400">
              <UserCheck className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Who Runs HelloTools?
              </h2>
              <p className="text-xs text-slate-500 dark:text-gray-400">
                Editorial leadership and engineering transparency
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm">
            <p>
              HelloTools was founded and is independently developed by <strong className="font-semibold text-gray-900 dark:text-white">Abdul Rehman</strong>, a software developer based in <strong className="font-semibold text-gray-900 dark:text-white">Pakistan</strong>.
            </p>
            <p className="italic text-gray-600 dark:text-gray-400 border-l-2 border-[#f97316] pl-4">
              &ldquo;As a software developer, I believe everyday web utilities should be lightning-fast, transparent, and completely private. I built HelloTools so anyone can calculate loan payments, track health metrics, or format code instantly in their browser—without sacrificing their personal data or enduring frustrating popups.&rdquo;
            </p>
            <p>
              Abdul built HelloTools out of a personal frustration with cluttered utility websites that compromise user speed and privacy. Every calculator is written and audited from scratch to ensure standard mathematical formulas are implemented with complete accuracy, responsive accessibility, and zero data telemetry.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-1.5">
                <Globe2 className="h-4 w-4 text-[#f97316]" />
                <span>Operating Location: Pakistan</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>100% Client-Side Engine</span>
              </span>
            </div>
          </div>
        </section>

        {/* Editorial Standards & Accuracy */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-[#f97316]" />
            <span>Editorial Standards &amp; Calculation Accuracy</span>
          </h2>
          <p>
            Accuracy is paramount, particularly for tools touching personal finance and physical health:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800 space-y-2">
              <h3 className="font-bold text-gray-900 dark:text-white text-xs uppercase tracking-wider">
                Financial Formula Benchmarking
              </h3>
              <p className="text-xs text-slate-600 dark:text-gray-300">
                Our loan, mortgage, and interest calculators follow standard compound interest algorithms and standard reducing-balance loan amortization schedules verified against banking industry standards.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800 space-y-2">
              <h3 className="font-bold text-gray-900 dark:text-white text-xs uppercase tracking-wider">
                Health &amp; Fitness Formulas
              </h3>
              <p className="text-xs text-slate-600 dark:text-gray-300">
                Health tools utilize peer-reviewed formulas, including the World Health Organization (WHO) BMI classification, the Mifflin-St Jeor equation for basal metabolic rate (BMR), and the US Navy circumference method for body fat estimation.
              </p>
            </div>
          </div>
        </section>

        {/* Our Three Pillars */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-2.5">
            <div className="p-2 w-fit bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <Lock className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white text-base">Privacy-First</h3>
            <p className="text-xs text-slate-600 dark:text-blue-200/70 leading-relaxed">
              We never store, log, or transmit your numeric entries or text files. All data processing occurs strictly in your device memory.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-2.5">
            <div className="p-2 w-fit bg-orange-50 dark:bg-orange-950/30 text-[#f97316] rounded-xl">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white text-base">Zero Lag Execution</h3>
            <p className="text-xs text-slate-600 dark:text-blue-200/70 leading-relaxed">
              Calculations update live as you type or adjust sliders without waiting for server response round-trips.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-2.5">
            <div className="p-2 w-fit bg-blue-50 dark:bg-blue-950/40 text-[#1a3c5e] dark:text-blue-400 rounded-xl">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white text-base">Clean &amp; Free Access</h3>
            <p className="text-xs text-slate-600 dark:text-blue-200/70 leading-relaxed">
              All tools are completely free to use without mandatory sign-ups, paywalls, or cluttered interface traps.
            </p>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">
            The Modern Architecture
          </h2>
          <p>
            HelloTools is built with an enterprise-grade, lightweight web stack:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Next.js 16 (App Router):</strong> Ultra-fast static rendering with instant page transitions.</li>
            <li><strong>React 19 &amp; TypeScript:</strong> Strict type validation to ensure calculation inputs and edge cases are handled predictably.</li>
            <li><strong>Tailwind CSS v4:</strong> Responsive, lightweight styling with complete system-level dark mode support.</li>
          </ul>
        </section>

        {/* Feedback Section */}
        <section className="p-8 rounded-3xl bg-gray-100 dark:bg-gray-900 text-center space-y-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Have a Suggestion or Found a Bug?</h3>
          <p className="text-xs text-slate-600 dark:text-blue-200/70 max-w-lg mx-auto leading-relaxed">
            We are constantly expanding HelloTools with new utility calculators. If you spot a formula discrepancy or want to request a specific tool, reach out to Abdul and the team.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex h-10 px-5 items-center justify-center rounded-lg bg-[#1a3c5e] text-white hover:bg-[#112942] font-semibold transition-colors text-xs cursor-pointer"
          >
            Contact Founder &amp; Support
          </Link>
        </section>

      </div>
    </div>
  );
}
