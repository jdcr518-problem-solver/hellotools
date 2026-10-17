import React from 'react';
import { Metadata } from 'next';
import AutoLoanDownPaymentVsTermView from '@/components/scenarios/AutoLoanDownPaymentVsTermView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/auto-loan-calculator/scenarios/larger-down-payment-vs-longer-loan-term';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'Larger Down Payment vs Longer Loan Term – Auto Loan Scenarios',
  description:
    'Compare monthly car payments and lifetime interest costs between larger down payments and longer repayment terms (36, 48, 60, and 72 months).',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'Larger Down Payment vs Longer Loan Term – Auto Loan Scenarios',
    description:
      'Detailed matrix and worked comparison of auto loan terms versus down payment amounts to demonstrate lifetime interest savings and negative equity risks.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Down Payment vs Loan Term Comparison',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function LargerDownPaymentVsLongerLoanTermPage() {
  return <AutoLoanDownPaymentVsTermView locale="en" />;
}
