import React from 'react';
import { Metadata } from 'next';
import Mortgage15Vs30YearView from '@/components/scenarios/Mortgage15Vs30YearView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/mortgage-calculator/scenarios/15-year-vs-30-year-mortgage';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: '15-Year vs 30-Year Mortgage: Monthly Payment and Total Interest Comparison',
  description:
    'Compare 15-year and 30-year fixed mortgages side by side. See the exact difference in monthly payment and discover how much interest a 15-year term saves you.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: '15-Year vs 30-Year Mortgage: Monthly Payment and Total Interest Comparison',
    description:
      'Side-by-side comparison of 15-year and 30-year mortgages with verified payment calculations and interest savings.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: '15-Year vs 30-Year Mortgage Comparison',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function Mortgage15Vs30YearPage() {
  return <Mortgage15Vs30YearView locale="en" />;
}
