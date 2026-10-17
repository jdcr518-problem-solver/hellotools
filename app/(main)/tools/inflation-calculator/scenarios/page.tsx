import React from 'react';
import { Metadata } from 'next';
import InflationScenariosHubView from '@/components/scenarios/InflationScenariosHubView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/inflation-calculator/scenarios';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'Inflation Calculator Scenarios and Practical Examples — HelloTools',
  description:
    'Explore practical inflation scenarios to understand purchasing power erosion, project multi-year price increases, and calculate inflation-adjusted savings goals.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'Inflation Calculator Scenarios and Practical Examples',
    description:
      'Explore practical inflation scenarios to understand purchasing power erosion, project multi-year price increases, and calculate inflation-adjusted savings goals.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Inflation Calculator Scenarios and Practical Examples',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function InflationScenariosHubPage() {
  return <InflationScenariosHubView locale="en" />;
}
