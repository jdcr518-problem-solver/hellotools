import React from 'react';
import { Metadata } from 'next';
import AmortizationInterestRateImpactView from '@/components/scenarios/AmortizationInterestRateImpactView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/amortization-calculator/scenarios/how-interest-rate-affects-amortization';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'How Interest Rate Affects Total Loan Cost and Payment Amortization',
  description:
    'Compare how interest rates from 4.0% to 8.5% impact monthly installments, total interest paid, and early principal reduction on a $100,000 loan.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'How Interest Rate Affects Total Loan Cost and Payment Amortization',
    description:
      'Detailed interest rate sensitivity analysis showing why a small rate change creates an outsized surge in cumulative borrowing costs.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'How Interest Rate Affects Total Loan Cost',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function HowInterestRateAffectsAmortizationPage() {
  return <AmortizationInterestRateImpactView locale="en" />;
}
