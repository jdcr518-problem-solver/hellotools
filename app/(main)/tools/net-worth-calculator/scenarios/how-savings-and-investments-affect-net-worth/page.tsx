import React from 'react';
import { Metadata } from 'next';
import NetWorthSavingsInvestmentsView from '@/components/scenarios/NetWorthSavingsInvestmentsView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/net-worth-calculator/scenarios/how-savings-and-investments-affect-net-worth';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'How Savings and Investments Affect Net Worth Over Time — HelloTools',
  description:
    'Examine how systematic cash savings, retirement contributions, and investment portfolios expand your personal balance sheet across multi-year milestones.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'How Savings and Investments Affect Net Worth Over Time',
    description:
      'Examine how systematic cash savings, retirement contributions, and investment portfolios expand your personal balance sheet across multi-year milestones.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'How Savings and Investments Affect Net Worth Over Time',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function HowSavingsAndInvestmentsAffectNetWorthPage() {
  return <NetWorthSavingsInvestmentsView locale="en" />;
}
