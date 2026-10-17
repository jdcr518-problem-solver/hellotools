import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import TaxScenariosHubView from '@/components/scenarios/TaxScenariosHubView';
import {
  isValidLocale,
  getLocaleConfig,
  DEFAULT_LOCALE,
  NON_DEFAULT_LOCALES,
  getScenarioHreflangMap,
  Locale,
} from '@/lib/i18n';
import { TAX_SCENARIOS_SECTION_I18N } from '@/data/tax-scenarios-data';

interface LocaleScenarioPageProps {
  params: Promise<{ locale: string }> | { locale: string };
}

export async function generateStaticParams() {
  return NON_DEFAULT_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata(props: LocaleScenarioPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  if (!isValidLocale(locale) || locale === DEFAULT_LOCALE) return {};

  const config = getLocaleConfig(locale as Locale);
  const data =
    TAX_SCENARIOS_SECTION_I18N[locale as Locale] || TAX_SCENARIOS_SECTION_I18N.en;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hellotools.net';
  const path = '/tools/tax-calculator/scenarios';
  const hreflangLanguages = getScenarioHreflangMap(path);

  return {
    title: `${data.heading} — ${config.nativeName}`,
    description: data.intro,
    alternates: {
      canonical: `${baseUrl}/${locale}${path}`,
      languages: hreflangLanguages,
    },
    openGraph: {
      title: `${data.heading} — ${config.nativeName}`,
      description: data.intro,
      url: `${baseUrl}/${locale}${path}`,
      type: 'website',
      siteName: 'HelloTools',
      locale: config.intlCode,
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: data.heading,
        },
      ],
    },
    robots: {
      index: config.indexable,
      follow: true,
    },
  };
}

export default async function LocalizedTaxScenariosHubPage(props: LocaleScenarioPageProps) {
  const { locale } = await props.params;
  if (!isValidLocale(locale) || locale === DEFAULT_LOCALE) {
    notFound();
  }

  return <TaxScenariosHubView locale={locale as Locale} />;
}
