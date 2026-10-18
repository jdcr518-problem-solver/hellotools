import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import EmiScenariosHubView from '@/components/scenarios/EmiScenariosHubView';
import {
  isValidLocale,
  getLocaleConfig,
  DEFAULT_LOCALE,
  NON_DEFAULT_LOCALES,
  getScenarioHreflangMap,
  Locale,
} from '@/lib/i18n';
import { EMI_SCENARIOS_SECTION_I18N } from '@/data/emi-scenarios-data';

interface LocaleScenarioPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return NON_DEFAULT_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata(props: LocaleScenarioPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  if (!isValidLocale(locale) || locale === DEFAULT_LOCALE) return {};

  const config = getLocaleConfig(locale as Locale);
  const tData = EMI_SCENARIOS_SECTION_I18N[locale as Locale] || EMI_SCENARIOS_SECTION_I18N.en;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hellotools.net';
  const hreflangLanguages = getScenarioHreflangMap('/tools/emi-calculator/scenarios');

  return {
    title: `${tData.heading} — ${config.nativeName}`,
    description: tData.intro,
    alternates: {
      canonical: `${baseUrl}/${locale}/tools/emi-calculator/scenarios`,
      languages: hreflangLanguages,
    },
    openGraph: {
      title: `${tData.heading} — ${config.nativeName}`,
      description: tData.intro,
      url: `${baseUrl}/${locale}/tools/emi-calculator/scenarios`,
      type: 'website',
      siteName: 'HelloTools',
      locale: config.intlCode,
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: tData.heading,
        },
      ],
    },
    robots: {
      index: config.indexable,
      follow: true,
    },
  };
}

export default async function LocaleEmiScenariosHubPage(props: LocaleScenarioPageProps) {
  const { locale } = await props.params;
  if (!isValidLocale(locale) || locale === DEFAULT_LOCALE) {
    notFound();
  }

  return <EmiScenariosHubView locale={locale as Locale} />;
}
