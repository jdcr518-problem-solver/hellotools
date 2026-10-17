import React from 'react';
import { Metadata } from 'next';
import MortgageAffordabilityView from '@/components/scenarios/MortgageAffordabilityView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/mortgage-calculator/scenarios/how-much-house-can-i-afford';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'How Much House Can I Afford? – Mortgage Affordability Scenarios',
  description:
    'Find out how much house you can afford across price tiers from $250k to $500k. Includes worked step-by-step calculations for principal, interest, taxes, and insurance.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'How Much House Can I Afford? – Mortgage Affordability Scenarios',
    description:
      'Worked home affordability calculations across multiple home price tiers using standard 30-year fixed mortgage rates, taxes, and insurance.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mortgage Affordability Calculation',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function HowMuchHouseCanIAffordPage() {
  return <MortgageAffordabilityView locale="en" />;
}
