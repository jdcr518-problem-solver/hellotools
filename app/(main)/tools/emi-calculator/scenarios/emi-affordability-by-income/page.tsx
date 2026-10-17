import React from 'react';
import { Metadata } from 'next';
import EmiAffordabilityView from '@/components/scenarios/EmiAffordabilityView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/emi-calculator/scenarios/emi-affordability-by-income';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'How Much EMI Can I Afford on My Monthly Income?',
  description:
    'Learn how lenders use an income-to-EMI ratio to determine loan affordability. Worked examples for $3,000–$7,000 monthly incomes at 8% per annum.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'How Much EMI Can I Afford on My Monthly Income?',
    description:
      'Worked examples showing how a 40–50% income-to-EMI guideline translates into a comfortable monthly payment ceiling for different salary levels.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'EMI affordability by income',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function EmiAffordabilityPage() {
  return <EmiAffordabilityView locale="en" />;
}
