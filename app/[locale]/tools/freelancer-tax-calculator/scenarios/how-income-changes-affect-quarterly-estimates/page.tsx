import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import FreelancerTaxIncomeImpactView from '@/components/scenarios/FreelancerTaxIncomeImpactView';
import {
  isValidLocale,
  getLocaleConfig,
  DEFAULT_LOCALE,
  NON_DEFAULT_LOCALES,
  getScenarioHreflangMap,
  Locale,
} from '@/lib/i18n';
import { FREELANCER_TAX_SCENARIOS_SECTION_I18N } from '@/data/freelancer-tax-scenarios-data';

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
  const cardData = (
    FREELANCER_TAX_SCENARIOS_SECTION_I18N[locale as Locale] ||
    FREELANCER_TAX_SCENARIOS_SECTION_I18N.en
  ).cards.incomeImpact;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hellotools.net';
  const path = '/tools/freelancer-tax-calculator/scenarios/how-income-changes-affect-quarterly-estimates';
  const hreflangLanguages = getScenarioHreflangMap(path);

  return {
    title: `${cardData.title} — ${config.nativeName}`,
    description: cardData.description,
    alternates: {
      canonical: `${baseUrl}/${locale}${path}`,
      languages: hreflangLanguages,
    },
    openGraph: {
      title: `${cardData.title} — ${config.nativeName}`,
      description: cardData.description,
      url: `${baseUrl}/${locale}${path}`,
      type: 'website',
      siteName: 'HelloTools',
      locale: config.intlCode,
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: cardData.title,
        },
      ],
    },
    robots: {
      index: config.indexable,
      follow: true,
    },
  };
}

export default async function LocalizedFreelancerTaxIncomeImpactPage(props: LocaleScenarioPageProps) {
  const { locale } = await props.params;
  if (!isValidLocale(locale) || locale === DEFAULT_LOCALE) {
    notFound();
  }

  return <FreelancerTaxIncomeImpactView locale={locale as Locale} />;
}
