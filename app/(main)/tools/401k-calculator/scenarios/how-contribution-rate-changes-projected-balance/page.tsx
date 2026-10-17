import React from 'react';
import { Metadata } from 'next';
import FourOhOneKContributionRateView from '@/components/scenarios/FourOhOneKContributionRateView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/401k-calculator/scenarios/how-contribution-rate-changes-projected-balance';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'How Contribution Rate Changes Your Projected 401(k) Balance — HelloTools',
  description:
    'Compare elective deferral rates from 3% to 15% of salary to evaluate how small percentage increases in regular retirement savings multiply your ending balance.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'How Contribution Rate Changes Your Projected 401(k) Balance',
    description:
      'Compare elective deferral rates from 3% to 15% of salary to evaluate how small percentage increases in regular retirement savings multiply your ending balance.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'How Contribution Rate Changes Projected Balance',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function FourOhOneKContributionRatePage() {
  return <FourOhOneKContributionRateView locale="en" />;
}
