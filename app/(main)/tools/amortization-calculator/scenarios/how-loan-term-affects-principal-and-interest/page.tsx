import React from 'react';
import { Metadata } from 'next';
import AmortizationTermComparisonView from '@/components/scenarios/AmortizationTermComparisonView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/amortization-calculator/scenarios/how-loan-term-affects-principal-and-interest';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'How Loan Term Affects Principal and Interest: 15-Year vs. 30-Year Comparison',
  description:
    'Compare 10, 15, 20, and 30-year terms side-by-side. See how a 15-year term saves over $176,000 in interest on a $250,000 loan while building equity 4x faster.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'How Loan Term Affects Principal and Interest: 15-Year vs. 30-Year Comparison',
    description:
      'Detailed loan tenure comparison analyzing the fundamental trade-off between monthly payment affordability and lifetime interest cost.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: '15-Year vs 30-Year Amortization Comparison',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function HowLoanTermAffectsPrincipalAndInterestPage() {
  return <AmortizationTermComparisonView locale="en" />;
}
