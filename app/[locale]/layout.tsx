/**
 * app/[locale]/layout.tsx — Locale Root Layout
 *
 * This is a FULL ROOT LAYOUT (renders <html> and <body>) for all non-English
 * locale routes: /es/…, /de/…, /fr/…, /pt/…, /ja/…
 *
 * It exists as a separate root layout (alongside app/(main)/layout.tsx) using
 * Next.js's "multiple root layouts via route groups" pattern:
 *   https://nextjs.org/docs/app/building-your-application/routing/route-groups
 *
 * This is the ONLY correct way to serve different html[lang] values per locale
 * group in Next.js App Router without middleware-based redirects.
 *
 * Responsibilities:
 *  - Sets <html lang={locale}> correctly for every locale route
 *  - Validates the locale segment (notFound for invalid, redirect for /en/)
 *  - Sets robots: noindex for all locales until they are production-reviewed
 *  - Renders the same Navbar, Footer, Analytics as the English layout
 *
 * Phase 3+ upgrade:
 *  - When a locale becomes indexable, its specific page.tsx overrides robots
 *  - Set LocaleConfig.indexable = true in lib/i18n.ts
 */

import type { Metadata } from 'next';
import { Suspense } from 'react';
import { notFound, redirect } from 'next/navigation';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdsterraScripts from '@/components/AdsterraScripts';
import '../globals.css';
import {
  isValidLocale,
  getLocaleConfig,
  DEFAULT_LOCALE,
  NON_DEFAULT_LOCALES,
} from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }> | { locale: string };
}

// Pre-generate the layout shell for all supported non-English locales.
export async function generateStaticParams() {
  return NON_DEFAULT_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata(
  props: { params: Promise<{ locale: string }> | { locale: string } }
): Promise<Metadata> {
  const { locale } = await props.params;

  if (!isValidLocale(locale) || locale === DEFAULT_LOCALE) return {};

  const config = getLocaleConfig(locale as Locale);

  return {
    title: {
      default: 'HelloTools',
      template: '%s | HelloTools',
    },
    // Noindex ALL locale pages in Phase 1.
    // Individual page.tsx files can override this when they are production-ready.
    robots: {
      index: config.indexable,
      follow: true,
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  // English lives at the root — /en/* redirects to /*
  if (locale === DEFAULT_LOCALE) {
    redirect('/');
  }

  // Invalid locale segment → 404
  if (!isValidLocale(locale)) {
    notFound();
  }

  const config = getLocaleConfig(locale as Locale);

  const socialBarScript = process.env.NEXT_PUBLIC_ADSTERRA_SOCIAL_BAR;
  const popunderScript  = process.env.NEXT_PUBLIC_ADSTERRA_POPUNDER;

  return (
    <html
      lang={config.htmlLang}
      className="h-full antialiased dark"
    >
      <body className="min-h-full flex flex-col bg-gray-50 dark:bg-[#0b1329] text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Suspense
          fallback={
            <div className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800" />
          }
        >
          <Navbar />
        </Suspense>

        <main className="flex-grow">
          {children}
        </main>

        <Footer />

        {/* Adsterra Site-wide Ad Scripts (Bypassed for Lighthouse) */}
        <AdsterraScripts
          socialBarScript={socialBarScript}
          popunderScript={popunderScript}
        />

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
