import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Lock, Eye, Mail, ChevronRight, Home, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';

const BASE_URL = 'https://hellotools.net';

export const metadata: Metadata = {
  title: 'Privacy Policy — HelloTools',
  description: 'HelloTools Privacy Policy. Read how our client-side calculators ensure zero numeric data collection, cookie usage policies, and Google AdSense compliance.',
  alternates: {
    canonical: `${BASE_URL}/privacy`,
  },
  openGraph: {
    title: 'Privacy Policy | HelloTools',
    description: 'Learn how HelloTools protects your privacy: all calculations execute locally in your browser memory with zero server storage.',
    url: `${BASE_URL}/privacy`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'HelloTools Privacy Policy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | HelloTools',
    description: 'Learn how HelloTools protects your privacy with 100% client-side computations.',
    images: [`${BASE_URL}/og-image.png`],
  },
};

export default function PrivacyPolicy() {
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
        name: 'Privacy Policy',
        item: `${BASE_URL}/privacy`,
      },
    ],
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800/80 px-4 py-2.5 rounded-xl">
        <Link href="/" className="hover:text-gray-950 dark:hover:text-white flex items-center gap-1">
          <Home className="h-3.5 w-3.5" />
          <span>Home</span>
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#f97316] dark:text-blue-400 font-bold">Privacy Policy</span>
      </nav>

      {/* Header Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a3c5e] to-[#0a1b2d] px-6 py-12 text-center shadow-xl sm:px-12 my-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#f97316]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative mx-auto max-w-xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-900/40 border border-blue-500/30 px-3 py-1 text-xs font-semibold text-blue-300 mb-4">
            <Shield className="h-3.5 w-3.5 text-[#f97316]" />
            <span>Transparency &amp; Protection</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-blue-100/80">
            Last Updated: September 2026. Operated by Abdul Rehman (Pakistan).
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-10 text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
        
        {/* Core Guarantee */}
        <section className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-3">
          <div className="flex items-center gap-2.5 text-[#f97316]">
            <Lock className="h-5 w-5" />
            <h3 className="font-bold text-base text-gray-900 dark:text-white">Our Zero-Input-Retention Guarantee</h3>
          </div>
          <p>
            HelloTools operates on a strict <strong>client-side architecture</strong>. When you input numeric values into our financial calculators, enter personal body measurements into health tools, or paste text into our developer utilities, <strong>none of that data is ever transmitted across the internet to our servers</strong>. All computation algorithms execute locally in your web browser memory and are discarded the instant you close or refresh the page.
          </p>
        </section>

        {/* 1. Information We Do NOT Collect */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">
            1. Information We Do Not Collect
          </h2>
          <p>
            Unlike traditional web applications, HelloTools does not require user accounts, passwords, or personal profiles. We do NOT collect:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Loan balances, income figures, mortgage amounts, or financial inputs.</li>
            <li>Weight, height, age, medical, or biological data.</li>
            <li>Plaintext passwords generated, hashes created, or text analyzed.</li>
            <li>Names, residential addresses, or phone numbers.</li>
          </ul>
        </section>

        {/* 2. Anonymous Diagnostic & Log Information */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">
            2. Anonymous Telemetry &amp; Server Logs
          </h2>
          <p>
            To ensure website reliability, monitor page load speeds, and prevent automated denial-of-service abuse, standard anonymous technical data is processed:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Vercel Analytics &amp; Speed Insights:</strong> Anonymous aggregate telemetry regarding Core Web Vitals (LCP, FID, CLS), browser types, and approximate country-level geographic regions. No IP addresses or personally identifiable information (PII) are stored.</li>
            <li><strong>Standard Web Server Logs:</strong> Standard request headers (HTTP method, user-agent string, timestamp, and referring URL) processed temporarily for infrastructure security.</li>
          </ul>
        </section>

        {/* 3. Google AdSense & Third-Party Advertising */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">
            3. Google AdSense &amp; Third-Party Advertising Cookies
          </h2>
          <p>
            To keep all 70+ calculators 100% free for everyone, HelloTools displays online advertisements served by third-party advertising networks, primarily <strong>Google AdSense</strong>.
          </p>
          <div className="p-5 rounded-2xl bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/30 space-y-3">
            <h3 className="font-bold text-orange-950 dark:text-orange-300 text-sm">
              Third-Party Vendor Notice (Google AdSense Compliance):
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-xs text-orange-950 dark:text-orange-200">
              <li>Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to this website or other websites on the internet.</li>
              <li>Google&apos;s use of advertising cookies enables it and its partners to serve ads to users based on their visits to HelloTools and/or other sites across the internet.</li>
              <li>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="underline font-semibold hover:text-[#f97316]">Google Ads Settings</a>.</li>
              <li>Alternatively, you can opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="underline font-semibold hover:text-[#f97316]">www.aboutads.info</a> or the Network Advertising Initiative opt-out page at <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="underline font-semibold hover:text-[#f97316]">optout.networkadvertising.org</a>.</li>
            </ul>
          </div>
        </section>

        {/* 4. Local Storage Usage */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">
            4. Browser Local Storage
          </h2>
          <p>
            HelloTools uses browser <code>localStorage</code> solely to remember your UI display preference (Light Mode vs. Dark Mode). This setting is stored entirely on your local device and is never synchronized to a server or used for profiling.
          </p>
        </section>

        {/* 5. User Rights (GDPR & CCPA) */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">
            5. Global Privacy Rights (GDPR &amp; CCPA/CPRA)
          </h2>
          <p>
            We respect global data protection standards:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>European Economic Area (GDPR):</strong> Under the GDPR, visitors have rights to access, rectify, or erase their personal data. Because we do not collect or store personal data, we hold no user records to transmit or erase. For advertising cookie consent, EEA users can manage consent through their browser settings or third-party opt-out mechanisms listed in Section 3.</li>
            <li><strong>California Residents (CCPA/CPRA):</strong> We do not sell or share personal information for monetary consideration. Users can exercise their right to opt out of third-party cookie sharing through the opt-out links above.</li>
          </ul>
        </section>

        {/* 6. Children's Privacy */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">
            6. Children&apos;s Privacy (COPPA Compliance)
          </h2>
          <p>
            HelloTools is a general-audience educational and computational website. We do not knowingly collect personal information from children under the age of 13.
          </p>
        </section>

        {/* 7. Data Controller & Contact */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">
            7. Data Controller &amp; Inquiries
          </h2>
          <p>
            If you have questions, comments, or legal inquiries concerning this Privacy Policy, please contact the site operator:
          </p>
          <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-2 text-xs">
            <p><strong>Site Operator:</strong> Abdul Rehman</p>
            <p><strong>Operating Jurisdiction:</strong> Pakistan</p>
            <p><strong>Official Contact Email:</strong> <a href="mailto:contact@hellotools.net" className="text-[#f97316] font-semibold underline">contact@hellotools.net</a></p>
          </div>
        </section>

      </div>
    </div>
  );
}
