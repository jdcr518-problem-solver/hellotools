import React from 'react';
import { Metadata } from 'next';
import CiInflationAdjustedView from '@/components/scenarios/CiInflationAdjustedView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/compound-interest-calculator/scenarios/ci-inflation-adjusted-returns';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'How Inflation Changes the Future Value of Your Money',
  description:
    'Understand the difference between nominal future value and real purchasing power. Worked example: $10,000 at 7% compounded monthly over 20 years adjusted for 3% annual inflation. Includes a step-by-step explanation and comparison table.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'How Inflation Changes the Future Value of Your Money',
    description:
      'Nominal vs. real value of $10,000 at 7% over 20 years with 3% inflation — what your money buys vs. what the account shows.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'How inflation affects compound interest future value',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function CiInflationAdjustedPage() {
  return <CiInflationAdjustedView locale="en" />;
}
