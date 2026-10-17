import React from 'react';
import { Metadata } from 'next';
import AmortizationScenariosHubView from '@/components/scenarios/AmortizationScenariosHubView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/amortization-calculator/scenarios';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'Amortization Calculator Scenarios and Examples',
  description:
    'Explore worked amortization scenarios: track how payment allocation shifts from interest to principal over time, see how interest rates dictate borrowing costs, and compare 15-year vs 30-year terms.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'Amortization Calculator Scenarios and Examples',
    description:
      'Detailed loan amortization scenarios and worked examples demonstrating payment splits, rate sensitivity, and term comparisons.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Amortization Calculator Scenarios and Examples',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function AmortizationScenariosHubPage() {
  return <AmortizationScenariosHubView locale="en" />;
}
