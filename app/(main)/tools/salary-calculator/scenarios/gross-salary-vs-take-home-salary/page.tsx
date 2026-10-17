import React from 'react';
import { Metadata } from 'next';
import SalaryGrossVsNetView from '@/components/scenarios/SalaryGrossVsNetView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/salary-calculator/scenarios/gross-salary-vs-take-home-salary';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'Gross Salary vs Take-Home Salary: What You Actually Keep — HelloTools',
  description:
    'Learn the difference between gross contractual salary and take-home pay. See how mandatory taxes, FICA withholdings, and payroll deductions impact spendable income.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'Gross Salary vs Take-Home Salary: What You Actually Keep',
    description:
      'Learn the difference between gross contractual salary and take-home pay. See how mandatory taxes, FICA withholdings, and payroll deductions impact spendable income.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Gross Salary vs Take-Home Salary',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function SalaryGrossVsNetPage() {
  return <SalaryGrossVsNetView locale="en" />;
}
