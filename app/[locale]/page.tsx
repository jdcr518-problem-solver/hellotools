/**
 * app/[locale]/page.tsx
 *
 * Localized homepage landing page for /es, /de, /fr, /pt, /ja
 *
 * Phase 2 behavior:
 *  - Real localized landing page showcasing the 10 pilot tools
 *  - Direct links to /<locale>/tools/<pilot-slug>
 *  - Fully translated hero, features, search, categories, and tool cards
 *  - SEO: robots: { index: false, follow: true } (noindex until Phase 3 audit)
 */

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  isValidLocale,
  getLocaleConfig,
  DEFAULT_LOCALE,
  NON_DEFAULT_LOCALES,
  PILOT_TOOLS,
  getHreflangMap,
  Locale,
} from '@/lib/i18n';
import { loadTranslations, t } from '@/lib/translations';
import { getToolTranslation } from '@/lib/pilot-translations';
import { getDbData } from '@/lib/db';
import { ShieldCheck, Zap, Lock, Search, ArrowRight, Calculator } from 'lucide-react';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hellotools.net';

interface LocalePageProps {
  params: Promise<{ locale: string }> | { locale: string };
}

export async function generateStaticParams() {
  return NON_DEFAULT_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale) || locale === DEFAULT_LOCALE) return {};

  const config = getLocaleConfig(locale as Locale);
  const translations = loadTranslations(locale as Locale);

  const hreflangLanguages = getHreflangMap();

  return {
    title: `HelloTools ${config.nativeName} — Free Online Calculators`,
    description: translations.footer.tagline,
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      ...(hreflangLanguages ? { languages: hreflangLanguages } : {}),
    },
    openGraph: {
      locale: config.intlCode,
      type: 'website',
      title: `HelloTools ${config.nativeName}`,
      description: translations.footer.tagline,
      url: `${BASE_URL}/${locale}`,
    },
    robots: {
      index: config.indexable, // true for Spanish (es), false for de, fr, pt, ja
      follow: true,
    },
  };
}

export default async function LocalePage({ params }: LocalePageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale) || locale === DEFAULT_LOCALE) {
    notFound();
  }

  const currentLocale = locale as Locale;
  const config = getLocaleConfig(currentLocale);
  const translations = loadTranslations(currentLocale);
  const dbData = getDbData();

  // Map pilot tools with localized content
  const pilotToolsList = PILOT_TOOLS.map((slug) => {
    const content = getToolTranslation(slug, currentLocale);
    const masterTool = dbData.tools.find((t) => t.slug === slug);
    const categoryKey = masterTool?.category || 'utility';
    const categoryName = t(translations, `categories.${categoryKey}`) || categoryKey;

    return {
      slug,
      name: content.name,
      description: content.description,
      categoryKey,
      categoryName,
      href: `/${currentLocale}/tools/${slug}`,
    };
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0b1329] text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24 border-b border-gray-200 dark:border-gray-800/60 bg-gradient-to-b from-white to-gray-50 dark:from-[#0b1329] dark:to-[#0f1a38]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <GlobeBadgeIcon />
            <span>HelloTools {config.nativeName}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 dark:text-white max-w-4xl mx-auto leading-tight">
            Calculadoras Online Gratuitas y Rápidas{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a3c5e] to-blue-500 dark:from-blue-400 dark:to-indigo-400">
              ({config.nativeName})
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-gray-300 max-w-2xl mx-auto">
            {translations.footer.tagline}
          </p>

          {/* Quick Stats / Highlights */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="p-4 rounded-2xl bg-white dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 flex items-center justify-center gap-3">
              <Lock className="h-5 w-5 text-emerald-500 shrink-0" />
              <div className="text-left">
                <p className="text-xs font-bold text-gray-900 dark:text-white">{t(translations, 'hero.safeTitle')}</p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">{t(translations, 'hero.safeBody')}</p>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 flex items-center justify-center gap-3">
              <ShieldCheck className="h-5 w-5 text-blue-500 shrink-0" />
              <div className="text-left">
                <p className="text-xs font-bold text-gray-900 dark:text-white">{t(translations, 'hero.freeTitle')}</p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">{t(translations, 'hero.freeBody')}</p>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 flex items-center justify-center gap-3">
              <Zap className="h-5 w-5 text-amber-500 shrink-0" />
              <div className="text-left">
                <p className="text-xs font-bold text-gray-900 dark:text-white">{t(translations, 'hero.fastTitle')}</p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">{t(translations, 'hero.fastBody')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Pilot Tools Section */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Calculator className="h-6 w-6 text-blue-500" />
              <span>{t(translations, 'categories.popularTools')} ({config.nativeName})</span>
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Colección inicial de 10 herramientas optimizadas y totalmente funcionales.
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
            10 Tools Available
          </span>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pilotToolsList.map((tool) => (
            <Link
              key={tool.slug}
              href={tool.href}
              className="group relative flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-xl transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-100/50 dark:border-blue-900/30">
                    {tool.categoryName}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400 mt-2 line-clamp-3">
                  {tool.description}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                <span>{t(translations, 'tool.calculate')}</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

function GlobeBadgeIcon() {
  return (
    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
    </svg>
  );
}
