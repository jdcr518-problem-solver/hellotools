import React from 'react';
import { Metadata } from 'next';
import SalaryMonthlyVsAnnualView from '@/components/scenarios/SalaryMonthlyVsAnnualView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/salary-calculator/scenarios/monthly-vs-annual-salary-conversion';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'Monthly vs Annual Salary Conversion: How to Convert Pay Accurately — HelloTools',
  description:
    'Convert monthly salary to annual, bi-weekly, weekly, and hourly pay accurately. Avoid the 4-week month mistake with verified payroll conversion formulas.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'Monthly vs Annual Salary Conversion: How to Convert Pay Accurately',
    description:
      'Convert monthly salary to annual, bi-weekly, weekly, and hourly pay accurately. Avoid the 4-week month mistake with verified payroll conversion formulas.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Monthly vs Annual Salary Conversion',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function SalaryMonthlyVsAnnualPage() {
  return <SalaryMonthlyVsAnnualView locale="en" />;
}
