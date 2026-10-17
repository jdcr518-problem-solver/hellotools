import React from 'react';
import { Metadata } from 'next';
import AutoLoanScenariosHubView from '@/components/scenarios/AutoLoanScenariosHubView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/auto-loan-calculator/scenarios';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'Auto Loan Calculator Scenarios and Examples',
  description:
    'Explore worked auto loan scenarios: estimating vehicle affordability, comparing down payment vs loan term length, and analyzing trade-in value and sales tax savings.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'Auto Loan Calculator Scenarios and Examples',
    description:
      'Explore worked auto loan examples demonstrating the impact of vehicle price, down payment, trade-in value, loan term, and APR on monthly car payments.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Auto Loan Calculator Scenarios and Examples',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function AutoLoanScenariosHubPage() {
  return <AutoLoanScenariosHubView locale="en" />;
}
