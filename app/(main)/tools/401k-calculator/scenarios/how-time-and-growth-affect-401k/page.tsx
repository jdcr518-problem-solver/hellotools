import React from 'react';
import { Metadata } from 'next';
import FourOhOneKTimeAndGrowthView from '@/components/scenarios/FourOhOneKTimeAndGrowthView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/401k-calculator/scenarios/how-time-and-growth-affect-401k';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'How Time and Investment Growth Affect Your 401(k) — HelloTools',
  description:
    'Examine how compound interest accelerates over 20 to 40 years, why starting 10 years earlier doubles your nest egg, and compare results across return rates.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'How Time and Investment Growth Affect Your 401(k)',
    description:
      'Examine how compound interest accelerates over 20 to 40 years, why starting 10 years earlier doubles your nest egg, and compare results across return rates.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'How Time and Investment Growth Affect Your 401(k)',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function FourOhOneKTimeAndGrowthPage() {
  return <FourOhOneKTimeAndGrowthView locale="en" />;
}
