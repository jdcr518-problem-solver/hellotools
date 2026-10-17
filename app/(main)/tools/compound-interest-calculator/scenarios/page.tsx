import React from 'react';
import { Metadata } from 'next';
import CompoundInterestScenariosHubView from '@/components/scenarios/CompoundInterestScenariosHubView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/compound-interest-calculator/scenarios';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'Compound Interest Calculator Scenarios and Examples',
  description:
    'Explore worked compound interest scenarios: how a lump sum grows over time, how compounding frequency affects your balance, and how inflation reduces purchasing power. Every example includes a step-by-step numerical breakdown.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'Compound Interest Calculator Scenarios and Examples',
    description:
      'See worked examples of how principal, interest rate, compounding frequency, and time horizon drive very different compound-growth outcomes.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Compound Interest Calculator Scenarios and Examples',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function CompoundInterestScenariosHubPage() {
  return <CompoundInterestScenariosHubView locale="en" />;
}
