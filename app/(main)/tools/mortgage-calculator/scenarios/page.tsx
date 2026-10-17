import React from 'react';
import { Metadata } from 'next';
import MortgageScenariosHubView from '@/components/scenarios/MortgageScenariosHubView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/mortgage-calculator/scenarios';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'Mortgage Calculator Scenarios and Examples',
  description:
    'Explore worked mortgage scenarios: estimating home affordability, comparing 15-year vs. 30-year loan terms, and analyzing how larger down payments remove PMI and reduce interest.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'Mortgage Calculator Scenarios and Examples',
    description:
      'Explore worked mortgage examples demonstrating the impact of home price, down payment, loan term, and interest rate on monthly payments and total interest.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mortgage Calculator Scenarios and Examples',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function MortgageScenariosHubPage() {
  return <MortgageScenariosHubView locale="en" />;
}
