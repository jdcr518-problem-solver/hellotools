import React from 'react';
import { Metadata } from 'next';
import CiCompoundingFrequencyView from '@/components/scenarios/CiCompoundingFrequencyView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/compound-interest-calculator/scenarios/ci-compounding-frequency';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'How Compounding Frequency Affects Your Final Balance',
  description:
    'Compare the final balance of $5,000 at 8% for 15 years when compounded annually, quarterly, monthly, and daily. Explains the difference between nominal rate and effective annual rate (EAR) with a worked numerical example.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'How Compounding Frequency Affects Your Final Balance',
    description:
      'Annual vs. quarterly vs. monthly vs. daily compounding on $5,000 at 8% for 15 years — worked example and comparison table.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Compounding frequency comparison',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function CiCompoundingFrequencyPage() {
  return <CiCompoundingFrequencyView locale="en" />;
}
