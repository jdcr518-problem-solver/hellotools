import React from 'react';
import Link from 'next/link';
import { ChevronRight, LayoutList } from 'lucide-react';
import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';
import { EMI_SCENARIOS_SECTION_I18N } from '@/data/emi-scenarios-data';

interface EmiScenariosSectionProps {
  locale?: Locale;
}

/**
 * EmiScenariosSection
 *
 * A server component that renders the "EMI Calculator Scenarios and Examples"
 * section on the EMI Calculator tool page (for both English and localized pages).
 *
 * Placement: after the existing educational sections (howToUse, howItWorks, FAQs)
 * and before the RelatedTools / ToolInternalLinks section.
 */
export default function EmiScenariosSection({ locale = DEFAULT_LOCALE }: EmiScenariosSectionProps) {
  const tData = EMI_SCENARIOS_SECTION_I18N[locale] || EMI_SCENARIOS_SECTION_I18N.en;
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const scenarios = [
    {
      href: `${prefix}/tools/emi-calculator/scenarios/emi-affordability-by-income`,
      title: tData.cards.affordability.title,
      description: tData.cards.affordability.description,
    },
    {
      href: `${prefix}/tools/emi-calculator/scenarios/emi-3-year-vs-5-year`,
      title: tData.cards.tenureComparison.title,
      description: tData.cards.tenureComparison.description,
    },
    {
      href: `${prefix}/tools/emi-calculator/scenarios/emi-extra-payment-savings`,
      title: tData.cards.extraPayment.title,
      description: tData.cards.extraPayment.description,
    },
  ];

  return (
    <section aria-labelledby="emi-scenarios-heading">
      {/* Section header */}
      <div className="flex items-center gap-2 mb-5">
        <LayoutList className="h-5 w-5 text-[#f97316]" aria-hidden="true" />
        <h2
          id="emi-scenarios-heading"
          className="text-xl font-bold text-gray-900 dark:text-white"
        >
          {tData.heading}
        </h2>
      </div>

      {/* Introductory paragraph */}
      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 mb-6 max-w-3xl">
        {tData.intro}
      </p>

      {/* Scenario cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {scenarios.map((scenario) => (
          <Link
            key={scenario.href}
            href={scenario.href}
            className="group block p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-[#f97316] dark:hover:border-[#f97316] hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-[#f97316] transition-colors leading-snug">
                {scenario.title}
              </h3>
              <ChevronRight
                className="h-4 w-4 shrink-0 mt-0.5 text-gray-400 group-hover:text-[#f97316] group-hover:translate-x-0.5 transition-all"
                aria-hidden="true"
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
              {scenario.description}
            </p>
          </Link>
        ))}
      </div>

      {/* "View All" link */}
      <Link
        href={`${prefix}/tools/emi-calculator/scenarios`}
        className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1a3c5e] dark:text-blue-400 hover:text-[#f97316] dark:hover:text-[#f97316] transition-colors"
      >
        {tData.viewAll}
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </section>
  );
}
