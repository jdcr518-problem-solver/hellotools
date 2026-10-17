import React from 'react';
import { Metadata } from 'next';
import StudentLoanTermComparisonView from '@/components/scenarios/StudentLoanTermComparisonView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/student-loan-calculator/scenarios/how-loan-term-affects-student-loan-cost';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'How Loan Term Affects Monthly Payments and Total Interest',
  description:
    'Compare 5, 10, 15, 20, and 25-year student loan terms on a $35,000 balance. See the trade-off between lower monthly payments and total interest charges.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'How Loan Term Affects Monthly Payments and Total Interest',
    description:
      'Detailed term comparison demonstrating how extending student loan repayment from 10 to 25 years increases total interest by over 180%.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Student Loan Term Comparison',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function HowLoanTermAffectsStudentLoanCostPage() {
  return <StudentLoanTermComparisonView locale="en" />;
}
