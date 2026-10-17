import React from 'react';
import { Metadata } from 'next';
import TaxScenariosHubView from '@/components/scenarios/TaxScenariosHubView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/tax-calculator/scenarios';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'Tax Calculator Scenarios and Practical Examples — HelloTools',
  description:
    'Explore realistic tax scenarios to understand how progressive brackets work, compare gross versus taxable income, and see how deductions reduce your estimated federal tax.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'Tax Calculator Scenarios and Practical Examples',
    description:
      'Explore realistic tax scenarios to understand how progressive brackets work, compare gross versus taxable income, and see how deductions reduce your estimated federal tax.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Tax Calculator Scenarios and Practical Examples',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function TaxScenariosHubPage() {
  return <TaxScenariosHubView locale="en" />;
}
