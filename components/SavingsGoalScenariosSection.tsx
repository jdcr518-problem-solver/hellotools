import React from 'react';
import Link from 'next/link';
import { ChevronRight, LayoutList } from 'lucide-react';
import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';
import { SAVINGS_GOAL_SCENARIOS_SECTION_I18N } from '@/data/savings-goal-scenarios-data';

interface SavingsGoalScenariosSectionProps {
  locale?: Locale;
}

/**
 * SavingsGoalScenariosSection
 *
 * A server component that renders the "Savings Goal Calculator Scenarios and Examples"
 * section on the Savings Goal Calculator tool page.
 *
 * Placement: after the existing educational sections (howToUse, howItWorks, FAQs)
 * and before the RelatedTools / ToolInternalLinks section.
 *
 * Reuses the approved scenario-section design, card layout, spacing, typography, and hover states.
 */
export default function SavingsGoalScenariosSection({ locale = DEFAULT_LOCALE }: SavingsGoalScenariosSectionProps) {
  const tData = SAVINGS_GOAL_SCENARIOS_SECTION_I18N[locale] || SAVINGS_GOAL_SCENARIOS_SECTION_I18N.en;
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const scenarios = [
    {
      href: `${prefix}/tools/savings-goal-calculator/scenarios/how-much-to-save-each-month`,
      title: tData.cards.monthlyDeposit.title,
      description: tData.cards.monthlyDeposit.description,
    },
    {
      href: `${prefix}/tools/savings-goal-calculator/scenarios/how-long-to-reach-savings-goal`,
      title: tData.cards.timeline.title,
      description: tData.cards.timeline.description,
    },
    {
      href: `${prefix}/tools/savings-goal-calculator/scenarios/how-inflation-affects-savings-goal`,
      title: tData.cards.inflation.title,
      description: tData.cards.inflation.description,
    },
  ];

  return (
    <section aria-labelledby="savings-goal-scenarios-heading">
      {/* Section header */}
      <div className="flex items-center gap-2 mb-5">
        <LayoutList className="h-5 w-5 text-[#f97316]" aria-hidden="true" />
        <h2
          id="savings-goal-scenarios-heading"
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
        href={`${prefix}/tools/savings-goal-calculator/scenarios`}
        className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1a3c5e] dark:text-blue-400 hover:text-[#f97316] dark:hover:text-[#f97316] transition-colors"
      >
        {tData.viewAll}
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </section>
  );
}
