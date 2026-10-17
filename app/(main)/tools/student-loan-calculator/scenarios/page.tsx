import React from 'react';
import { Metadata } from 'next';
import StudentLoanScenariosHubView from '@/components/scenarios/StudentLoanScenariosHubView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/student-loan-calculator/scenarios';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'Student Loan Calculator Scenarios and Examples',
  description:
    'Explore worked student loan scenarios: estimating affordable debt by starting salary, comparing 5- to 25-year repayment terms, and evaluating interest rate sensitivity.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'Student Loan Calculator Scenarios and Examples',
    description:
      'Realistic student loan repayment scenarios demonstrating how loan balance, term length, and APR affect monthly payments and total interest cost.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Student Loan Calculator Scenarios and Examples',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function StudentLoanScenariosHubPage() {
  return <StudentLoanScenariosHubView locale="en" />;
}
