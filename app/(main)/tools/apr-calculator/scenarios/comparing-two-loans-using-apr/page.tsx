import React from 'react';
import { Metadata } from 'next';
import AprLoanComparisonView from '@/components/scenarios/AprLoanComparisonView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/apr-calculator/scenarios/comparing-two-loans-using-apr';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'Comparing Two Loans Using APR — HelloTools',
  description:
    'Compare loan offers with different stated interest rates and upfront fees. Learn how to identify the true lowest-cost borrowing option and calculate break-even horizons.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'Comparing Two Loans Using APR',
    description:
      'Compare loan offers with different stated interest rates and upfront fees. Learn how to identify the true lowest-cost borrowing option and calculate break-even horizons.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Comparing Two Loans Using APR',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function ComparingTwoLoansUsingAprPage() {
  return <AprLoanComparisonView locale="en" />;
}
