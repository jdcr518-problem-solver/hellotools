import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import CompoundInterestScenariosHubView from '@/components/scenarios/CompoundInterestScenariosHubView';
import {
  isValidLocale,
  getLocaleConfig,
  DEFAULT_LOCALE,
  NON_DEFAULT_LOCALES,
  getScenarioHreflangMap,
  Locale,
} from '@/lib/i18n';
import { CI_SCENARIOS_SECTION_I18N } from '@/data/compound-interest-scenarios-data';

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
  const tData = CI_SCENARIOS_SECTION_I18N[locale as Locale] || CI_SCENARIOS_SECTION_I18N.en;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hellotools.net';
  const hreflangLanguages = getScenarioHreflangMap('/tools/compound-interest-calculator/scenarios');

  return {
    title: `${tData.heading} — ${config.nativeName}`,
    description: tData.intro,
    alternates: {
      canonical: `${baseUrl}/${locale}/tools/compound-interest-calculator/scenarios`,
      languages: hreflangLanguages,
    },
    openGraph: {
      title: `${tData.heading} — ${config.nativeName}`,
      description: tData.intro,
      url: `${baseUrl}/${locale}/tools/compound-interest-calculator/scenarios`,
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

export default async function LocaleCiScenariosHubPage(props: LocaleScenarioPageProps) {
  const { locale } = await props.params;
  if (!isValidLocale(locale) || locale === DEFAULT_LOCALE) {
    notFound();
  }

  return <CompoundInterestScenariosHubView locale={locale as Locale} />;
}
