import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import EvCostScenariosHubView from '@/components/scenarios/EvCostScenariosHubView';
import {
  isValidLocale,
  getLocaleConfig,
  DEFAULT_LOCALE,
  NON_DEFAULT_LOCALES,
  getScenarioHreflangMap,
  Locale,
} from '@/lib/i18n';
import { EV_COST_SCENARIOS_SECTION_I18N } from '@/data/ev-cost-scenarios-data';

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
  const data = EV_COST_SCENARIOS_SECTION_I18N[locale as Locale] || EV_COST_SCENARIOS_SECTION_I18N.en;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hellotools.net';
  const path = '/tools/ev-cost-calculator/scenarios';
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

export default async function LocalizedEvCostScenariosHubPage(props: LocaleScenarioPageProps) {
  const { locale } = await props.params;
  if (!isValidLocale(locale) || locale === DEFAULT_LOCALE) {
    notFound();
  }

  return <EvCostScenariosHubView locale={locale as Locale} />;
}
