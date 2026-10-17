import React from 'react';
import { Metadata } from 'next';
import StudentLoanAffordabilityView from '@/components/scenarios/StudentLoanAffordabilityView';
import { getScenarioHreflangMap } from '@/lib/i18n';

const PATH = '/tools/student-loan-calculator/scenarios/how-much-student-loan-can-i-afford';
const hreflangLanguages = getScenarioHreflangMap(PATH);

export const metadata: Metadata = {
  title: 'How Much Student Loan Can I Afford? – Education Debt Scenarios',
  description:
    'Find out how much student debt is affordable based on your expected monthly income, starting salary guidelines, and standard 10-year repayment terms.',
  alternates: {
    canonical: `https://hellotools.net${PATH}`,
    languages: hreflangLanguages,
  },
  openGraph: {
    title: 'How Much Student Loan Can I Afford? – Education Debt Scenarios',
    description:
      'Worked student loan affordability calculations across income levels using the standard 10% debt budget guideline and 10-year amortization.',
    url: `https://hellotools.net${PATH}`,
    type: 'website',
    siteName: 'HelloTools',
    images: [
      {
        url: 'https://hellotools.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Student Loan Affordability Calculation',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function HowMuchStudentLoanCanIAffordPage() {
  return <StudentLoanAffordabilityView locale="en" />;
}
