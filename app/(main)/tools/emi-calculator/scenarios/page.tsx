import React from 'react';
import { Metadata } from 'next';
import EmiScenariosHubView from '@/components/scenarios/EmiScenariosHubView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/emi-calculator/scenarios';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'EMI Calculator Scenarios and Examples',
  description:
    'Explore practical EMI calculator scenarios: affordability by income, 3-year vs 5-year loan comparisons, and how extra monthly payments reduce total interest. Each page uses a worked numerical example.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'EMI Calculator Scenarios and Examples',
    description:
      'See worked examples of how loan amount, interest rate, tenure, income, and extra payments affect your monthly EMI and total interest.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'EMI Calculator Scenarios and Examples',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function EmiScenariosHubPage() {
  return <EmiScenariosHubView locale="en" />;
}
