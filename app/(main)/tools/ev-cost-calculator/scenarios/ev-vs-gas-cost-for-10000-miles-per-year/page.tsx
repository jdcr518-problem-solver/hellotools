import React from 'react';
import { Metadata } from 'next';
import EvCost10kMilesView from '@/components/scenarios/EvCost10kMilesView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/ev-cost-calculator/scenarios/ev-vs-gas-cost-for-10000-miles-per-year';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'EV vs Gas Cost for 10,000 Miles Per Year – Charging Savings Analysis',
  description:
    'Compare annual EV charging costs versus gasoline expenses for 10,000 miles per year. Includes verified step-by-step calculations and multi-mileage comparison tiers.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'EV vs Gas Cost for 10,000 Miles Per Year – Charging Savings Analysis',
    description:
      'Worked step-by-step numerical comparison showing electricity charging costs versus gasoline pump expenses for 10,000 miles annually.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'EV vs Gas Cost for 10,000 Miles Per Year',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function EvCost10kMilesPage() {
  return <EvCost10kMilesView locale="en" />;
}
