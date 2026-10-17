import React from 'react';
import { Metadata } from 'next';
import AprVsInterestRateView from '@/components/scenarios/AprVsInterestRateView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/apr-calculator/scenarios/apr-vs-interest-rate-difference';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'APR vs Interest Rate: What Is the Difference? — HelloTools',
  description:
    'Learn why stated interest rates and APR diverge when upfront fees are charged. See worked numerical examples of how fees and terms impact real borrowing costs.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'APR vs Interest Rate: What Is the Difference?',
    description:
      'Learn why stated interest rates and APR diverge when upfront fees are charged. See worked numerical examples of how fees and terms impact real borrowing costs.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'APR vs Interest Rate: What Is the Difference?',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function AprVsInterestRatePage() {
  return <AprVsInterestRateView locale="en" />;
}
