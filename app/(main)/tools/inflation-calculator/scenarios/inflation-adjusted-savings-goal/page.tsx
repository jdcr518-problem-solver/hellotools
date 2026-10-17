import React from 'react';
import { Metadata } from 'next';
import InflationSavingsGoalView from '@/components/scenarios/InflationSavingsGoalView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/inflation-calculator/scenarios/inflation-adjusted-savings-goal';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'Inflation-Adjusted Savings Goal: Protecting Future Buying Power — HelloTools',
  description:
    'Learn why long-term savings goals must be adjusted upward for inflation to maintain purchasing power, with verified calculations and shortfall comparisons.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'Inflation-Adjusted Savings Goal: Protecting Future Buying Power',
    description:
      'Learn why long-term savings goals must be adjusted upward for inflation to maintain purchasing power, with verified calculations and shortfall comparisons.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Inflation-Adjusted Savings Goal',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function InflationSavingsGoalPage() {
  return <InflationSavingsGoalView locale="en" />;
}
