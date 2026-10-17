import React from 'react';
import { Metadata } from 'next';
import EmiTenureComparisonView from '@/components/scenarios/EmiTenureComparisonView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/emi-calculator/scenarios/emi-3-year-vs-5-year';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: '3-Year vs 5-Year Loan: Monthly EMI and Total Interest Compared',
  description:
    'Side-by-side comparison of a 3-year and 5-year loan on the same $10,000 principal at 8% p.a. See the exact difference in monthly EMI and total interest paid.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: '3-Year vs 5-Year Loan: Monthly EMI and Total Interest Compared',
    description:
      'Compare monthly EMI and total interest for a 3-year and 5-year loan on the same principal. Worked example with a comparison table.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: '3-year vs 5-year loan comparison',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function Emi3YearVs5YearPage() {
  return <EmiTenureComparisonView locale="en" />;
}
