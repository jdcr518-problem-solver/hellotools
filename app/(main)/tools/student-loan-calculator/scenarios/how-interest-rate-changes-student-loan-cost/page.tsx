import React from 'react';
import { Metadata } from 'next';
import StudentLoanRateComparisonView from '@/components/scenarios/StudentLoanRateComparisonView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/student-loan-calculator/scenarios/how-interest-rate-changes-student-loan-cost';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'How Interest Rate Changes Your Student Loan Cost',
  description:
    'Compare 4.5%, 6.5%, 8.0%, and 10.0% APR on a $40,000 student loan over 10 years. See how interest rates change monthly installments and total borrowing costs.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'How Interest Rate Changes Your Student Loan Cost',
    description:
      'Numerical analysis demonstrating how a 2% rate difference adds thousands of dollars in cumulative student loan interest charges.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Student Loan Interest Rate Comparison',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function HowInterestRateChangesStudentLoanCostPage() {
  return <StudentLoanRateComparisonView locale="en" />;
}
