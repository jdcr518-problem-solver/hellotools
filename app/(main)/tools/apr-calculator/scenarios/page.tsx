import React from 'react';
import { Metadata } from 'next';
import AprScenariosHubView from '@/components/scenarios/AprScenariosHubView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/apr-calculator/scenarios';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'APR Calculator Scenarios and Examples',
  description:
    'Explore realistic borrowing scenarios to see how interest rate, upfront fees, loan amount, and loan term affect your estimated annual percentage rate (APR) and total repayment cost.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'APR Calculator Scenarios and Examples',
    description:
      'Explore realistic borrowing scenarios to see how interest rate, upfront fees, loan amount, and loan term affect your estimated annual percentage rate (APR) and total repayment cost.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'APR Calculator Scenarios and Examples',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function AprScenariosHubPage() {
  return <AprScenariosHubView locale="en" />;
}
