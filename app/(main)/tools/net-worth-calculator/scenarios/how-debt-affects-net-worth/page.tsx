import React from 'react';
import { Metadata } from 'next';
import NetWorthDebtImpactView from '@/components/scenarios/NetWorthDebtImpactView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/net-worth-calculator/scenarios/how-debt-affects-net-worth';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'How Debt Affects Your Net Worth — Liabilities Analysis — HelloTools',
  description:
    'Discover how mortgages, student loans, car notes, and credit cards reduce personal net worth and change your debt-to-asset leverage ratio.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'How Debt Affects Your Net Worth — Liabilities Analysis',
    description:
      'Discover how mortgages, student loans, car notes, and credit cards reduce personal net worth and change your debt-to-asset leverage ratio.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'How Debt Affects Your Net Worth',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function HowDebtAffectsNetWorthPage() {
  return <NetWorthDebtImpactView locale="en" />;
}
