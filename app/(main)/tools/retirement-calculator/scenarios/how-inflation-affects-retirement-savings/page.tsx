import React from 'react';
import { Metadata } from 'next';
import RetirementInflationView from '@/components/scenarios/RetirementInflationView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/retirement-calculator/scenarios/how-inflation-affects-retirement-savings';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'How Inflation Changes Your Retirement Savings Target | Real vs Nominal',
  description:
    'Learn how inflation erodes future purchasing power over 20 to 40 years, comparing nominal retirement nest eggs with real inflation-adjusted wealth at 3% annual inflation.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'How Inflation Changes Your Retirement Savings Target',
    description:
      'Explore the gap between nominal retirement calculator projections and real purchasing power over multi-decade retirement timelines.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Inflation impact on retirement savings',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function HowInflationAffectsRetirementSavingsPage() {
  return <RetirementInflationView locale="en" />;
}
