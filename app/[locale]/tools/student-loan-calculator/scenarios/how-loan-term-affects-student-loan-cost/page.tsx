import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import StudentLoanTermComparisonView from '@/components/scenarios/StudentLoanTermComparisonView';
import {
  isValidLocale,
  getLocaleConfig,
  DEFAULT_LOCALE,
  NON_DEFAULT_LOCALES,
  getScenarioHreflangMap,
  Locale,
} from '@/lib/i18n';
import { STUDENT_LOAN_SCENARIOS_SECTION_I18N } from '@/data/student-loan-scenarios-data';

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
    STUDENT_LOAN_SCENARIOS_SECTION_I18N[locale as Locale] || STUDENT_LOAN_SCENARIOS_SECTION_I18N.en
  ).cards.termComparison;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hellotools.net';
  const path = '/tools/student-loan-calculator/scenarios/how-loan-term-affects-student-loan-cost';
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

export default async function LocalizedHowLoanTermAffectsStudentLoanCostPage(
  props: LocaleScenarioPageProps
) {
  const { locale } = await props.params;
  if (!isValidLocale(locale) || locale === DEFAULT_LOCALE) {
    notFound();
  }

  return <StudentLoanTermComparisonView locale={locale as Locale} />;
}
