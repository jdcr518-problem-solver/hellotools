import React from 'react';
import Link from 'next/link';
import { ChevronRight, LayoutList } from 'lucide-react';
import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';
import { AMORTIZATION_SCENARIOS_SECTION_I18N } from '@/data/amortization-scenarios-data';

interface AmortizationScenariosSectionProps {
  locale?: Locale;
}

/**
 * AmortizationScenariosSection
 *
 * A server component that renders the "Amortization Calculator Scenarios and Examples"
 * section on the Amortization Calculator tool page (for both English and localized pages).
 *
 * Placement: after the existing educational sections (howToUse, howItWorks, FAQs)
 * and before the RelatedTools / ToolInternalLinks section.
 */
export default function AmortizationScenariosSection({
  locale = DEFAULT_LOCALE,
}: AmortizationScenariosSectionProps) {
  const tData =
    AMORTIZATION_SCENARIOS_SECTION_I18N[locale] || AMORTIZATION_SCENARIOS_SECTION_I18N.en;
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const scenarios = [
    {
      href: `${prefix}/tools/amortization-calculator/scenarios/how-loan-payments-change-over-time`,
      title: tData.cards.paymentsOverTime.title,
      description: tData.cards.paymentsOverTime.description,
    },
    {
      href: `${prefix}/tools/amortization-calculator/scenarios/how-interest-rate-affects-amortization`,
      title: tData.cards.rateImpact.title,
      description: tData.cards.rateImpact.description,
    },
    {
      href: `${prefix}/tools/amortization-calculator/scenarios/how-loan-term-affects-principal-and-interest`,
      title: tData.cards.termComparison.title,
      description: tData.cards.termComparison.description,
    },
  ];

  return (
    <section aria-labelledby="amortization-scenarios-heading">
      {/* Section header */}
      <div className="flex items-center gap-2 mb-5">
        <LayoutList className="h-5 w-5 text-[#f97316]" aria-hidden="true" />
        <h2
          id="amortization-scenarios-heading"
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
        href={`${prefix}/tools/amortization-calculator/scenarios`}
        className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1a3c5e] dark:text-blue-400 hover:text-[#f97316] dark:hover:text-[#f97316] transition-colors"
      >
        {tData.viewAll}
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </section>
  );
}
