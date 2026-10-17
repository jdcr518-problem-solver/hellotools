import React from 'react';
import { Metadata } from 'next';
import CiGrowthOverTimeView from '@/components/scenarios/CiGrowthOverTimeView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/compound-interest-calculator/scenarios/ci-growth-over-time';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'How Much Will a Lump-Sum Investment Grow Over Time?',
  description:
    'See how $10,000 at 7% annual interest compounded monthly grows over 5, 10, 15, and 20 years. Includes a step-by-step worked example, comparison table, and a plain-language explanation of compound interest growth.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'How Much Will a Lump-Sum Investment Grow Over Time?',
    description:
      'Worked compound interest example: $10,000 at 7% compounded monthly over 5–20 years. Understand how time and compounding drive exponential growth.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Lump-sum investment growth over time',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function CiGrowthOverTimePage() {
  return <CiGrowthOverTimeView locale="en" />;
}
