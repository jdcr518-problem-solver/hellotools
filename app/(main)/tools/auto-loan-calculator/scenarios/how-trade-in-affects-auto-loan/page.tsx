import React from 'react';
import { Metadata } from 'next';
import AutoLoanTradeInView from '@/components/scenarios/AutoLoanTradeInView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/auto-loan-calculator/scenarios/how-trade-in-affects-auto-loan';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'How Trade-In Value Affects Your Auto Loan – Scenarios & Tax Savings',
  description:
    'Learn how trading in your vehicle cuts state sales tax, lowers loan principal, and reduces both monthly payments and total interest over time.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'How Trade-In Value Affects Your Auto Loan – Scenarios & Tax Savings',
    description:
      'Worked trade-in calculations showing sales tax deductions, principal reductions, monthly payment decreases, and interest savings.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Trade-In Auto Loan Calculations',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function HowTradeInAffectsAutoLoanPage() {
  return <AutoLoanTradeInView locale="en" />;
}
