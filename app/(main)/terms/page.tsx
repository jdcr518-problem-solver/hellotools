import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldAlert, CheckCircle, Mail, ChevronRight, Home, AlertTriangle, Scale, Stethoscope, DollarSign } from 'lucide-react';

const BASE_URL = 'https://hellotools.net';

export const metadata: Metadata = {
  title: 'Terms of Service & Disclaimers — HelloTools',
  description: 'Terms of Service and legal disclaimers governing the use of HelloTools. Review our non-advice YMYL financial and medical calculation disclaimers.',
  alternates: {
    canonical: `${BASE_URL}/terms`,
  },
  openGraph: {
    title: 'Terms of Service & Disclaimers | HelloTools',
    description: 'Read the terms of use, calculation accuracy limitations, and YMYL financial/medical disclaimers for HelloTools.',
    url: `${BASE_URL}/terms`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'HelloTools Terms and Disclaimers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service & Disclaimers | HelloTools',
    description: 'Terms of service and non-advice disclaimers governing the use of HelloTools free calculators.',
    images: [`${BASE_URL}/og-image.png`],
  },
};

export default function TermsOfService() {
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
        name: 'Terms & Disclaimers',
        item: `${BASE_URL}/terms`,
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
        <span className="text-[#f97316] dark:text-blue-400 font-bold">Terms &amp; Disclaimers</span>
      </nav>

      {/* Header Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a3c5e] to-[#0a1b2d] px-6 py-12 text-center shadow-xl sm:px-12 my-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#f97316]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative mx-auto max-w-xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-900/40 border border-blue-500/30 px-3 py-1 text-xs font-semibold text-blue-300 mb-4">
            <Scale className="h-3.5 w-3.5 text-[#f97316]" />
            <span>Usage Agreement &amp; Legal Disclaimers</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Terms of Service
          </h1>
          <p className="mt-3 text-sm text-blue-100/80">
            Last Updated: September 2026. Please review these terms and disclaimers before using our tools.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-10 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
        
        {/* Introduction */}
        <section className="space-y-3">
          <p>
            Welcome to <strong>HelloTools</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), owned and operated by Abdul Rehman in Pakistan. By accessing or using `hellotools.net` (the &ldquo;Site&rdquo;) and any of our free calculators, utilities, or blog guides (the &ldquo;Services&rdquo;), you agree to be bound by these Terms of Service and Disclaimers.
          </p>
          <p>
            If you do not agree with any portion of these terms, you must immediately discontinue using the Site.
          </p>
        </section>

        {/* CRITICAL YMYL DISCLAIMERS SECTION */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <span>Important YMYL Disclaimers (Finance &amp; Health)</span>
          </h2>

          <p>
            The content, utilities, and algorithmic calculators available on HelloTools are intended solely for <strong>general educational, illustrative, and informational purposes</strong>. They are not intended as a substitute for individualized professional advice.
          </p>

          {/* Finance Disclaimer Box */}
          <div className="p-6 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 space-y-3">
            <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300 font-bold">
              <DollarSign className="h-5 w-5 shrink-0 text-[#f97316]" />
              <span>1. Financial &amp; Tax Calculation Disclaimer (No Financial Advice)</span>
            </div>
            <ul className="list-disc pl-5 space-y-2 text-xs text-amber-950 dark:text-amber-200/90 leading-relaxed">
              <li><strong>Informational Estimates Only:</strong> Calculators such as the EMI / Loan Calculator, Mortgage Calculator, Auto Loan Calculator, Compound Interest Calculator, Tax Calculator, and Retirement Calculator provide mathematical estimates based on simplified standard formulas.</li>
              <li><strong>Variable Real-World Factors:</strong> Results do not reflect specific lender origination fees, compounding schedule nuances, loan tenure adjustments, fluctuating tax code adjustments, local municipality surcharges, or insurance requirements.</li>
              <li><strong>Not Certified Advice:</strong> Nothing on HelloTools constitutes certified financial, legal, investment, or tax advice. You should never sign a mortgage contract, loan agreement, or make a major investment solely based on online calculator figures. Always consult a licensed Certified Public Accountant (CPA), qualified financial advisor, or lending officer before making financial commitments.</li>
            </ul>
          </div>

          {/* Health Disclaimer Box */}
          <div className="p-6 rounded-2xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 space-y-3">
            <div className="flex items-center gap-2 text-rose-900 dark:text-rose-300 font-bold">
              <Stethoscope className="h-5 w-5 shrink-0 text-rose-500" />
              <span>2. Health &amp; Medical Calculation Disclaimer (No Medical Advice)</span>
            </div>
            <ul className="list-disc pl-5 space-y-2 text-xs text-rose-950 dark:text-rose-200/90 leading-relaxed">
              <li><strong>General Statistical Benchmarks:</strong> Calculators such as the BMI Calculator, Body Fat Percentage Calculator, TDEE Calorie Calculator, Ideal Weight Calculator, Pregnancy Due Date Calculator, and Ovulation Calculator provide statistical estimates based on generalized population formulas (e.g., WHO guidelines, Mifflin-St Jeor equation).</li>
              <li><strong>Not a Diagnostic Tool:</strong> These tools do not consider your clinical history, body composition variations (such as athletic muscle mass), pregnancy complications, hormonal cycles, or preexisting conditions.</li>
              <li><strong>Consult a Healthcare Professional:</strong> Content on HelloTools is not intended to diagnose, treat, cure, or prevent any illness or physical condition. Always seek the advice of a qualified physician, registered dietitian, or licensed healthcare provider with any medical questions. Never disregard professional medical advice because of a calculation on this website.</li>
            </ul>
          </div>
        </section>

        {/* Permitted Use & Restrictions */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">
            3. Permitted Use &amp; Prohibited Actions
          </h2>
          <p>
            You are granted a revocable, non-exclusive, non-transferable license to use HelloTools calculators for personal, educational, or internal business calculations.
          </p>
          <p className="font-semibold text-gray-900 dark:text-white">You agree NOT to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Deploy automated bots, spiders, or scraping scripts to query the calculators in bulk or degrade website performance.</li>
            <li>Incorporate HelloTools inside third-party iframe overlays without prior written consent (except via our official embed widget code).</li>
            <li>Attempt to bypass security measures, disrupt host infrastructure, or reverse-engineer proprietary front-end algorithms.</li>
          </ul>
        </section>

        {/* Intellectual Property */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">
            4. Intellectual Property Rights
          </h2>
          <p>
            The design, brand name, logo, original written guides, UI components, and software code on HelloTools are the intellectual property of Abdul Rehman and are protected by applicable copyright and trademark laws. Standard mathematical formulas themselves remain in the public domain.
          </p>
        </section>

        {/* Disclaimer of Warranties */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">
            5. Disclaimer of Warranties (&ldquo;As-Is&rdquo;)
          </h2>
          <p>
            The Site and all tools are provided on an <strong>&ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis</strong> without warranties of any kind, whether express, statutory, or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that calculations will be 100% uninterrupted, error-free, or compatible with every browser environment.
          </p>
        </section>

        {/* Limitation of Liability */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">
            6. Limitation of Liability
          </h2>
          <p>
            Under no circumstances shall Abdul Rehman, HelloTools, or its contributors be liable for any direct, indirect, incidental, consequential, special, or exemplary damages—including but not limited to lost profits, loss of data, loan miscalculation losses, business interruption, or health complications—arising out of your access to or reliance on any calculator, guide, or service provided on this website.
          </p>
        </section>

        {/* Governing Law */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">
            7. Governing Law &amp; Jurisdiction
          </h2>
          <p>
            These Terms of Service and any dispute arising out of or related to your use of HelloTools shall be governed by and construed in accordance with the laws of <strong>Pakistan</strong>, without regard to conflict of law principles.
          </p>
        </section>

        {/* Contact Information */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">
            8. Questions &amp; Support
          </h2>
          <p>
            If you have any questions regarding these Terms of Service or our calculation disclaimers, please reach out directly:
          </p>
          <div className="flex items-center gap-2 font-semibold">
            <Mail className="h-4 w-4 text-[#f97316]" />
            <span>Email: <a href="mailto:contact@hellotools.net" className="hover:text-[#f97316] underline">contact@hellotools.net</a></span>
          </div>
        </section>

      </div>
    </div>
  );
}
