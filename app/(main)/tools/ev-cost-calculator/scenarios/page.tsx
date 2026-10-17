import React from 'react';
import { Metadata } from 'next';
import EvCostScenariosHubView from '@/components/scenarios/EvCostScenariosHubView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/ev-cost-calculator/scenarios';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'EV Charging vs Gas Cost Calculator Scenarios and Examples',
  description:
    'Explore worked EV charging vs gas cost scenarios: comparing 10,000 miles annual driving, analyzing electricity price sensitivity, and evaluating gas pump price impacts.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'EV Charging vs Gas Cost Calculator Scenarios and Examples',
    description:
      'Compare electric vehicle charging costs versus gasoline expenses across annual mileage tiers, electric utility rates, and pump prices.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'EV Charging vs Gas Cost Calculator Scenarios',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function EvCostScenariosHubPage() {
  return <EvCostScenariosHubView locale="en" />;
}
