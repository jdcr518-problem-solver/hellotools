import React from 'react';
import Link from 'next/link';
import { ChevronRight, LayoutList } from 'lucide-react';
import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';
import { FOUR_OH_ONE_K_SCENARIOS_SECTION_I18N } from '@/data/401k-scenarios-data';

interface FourOhOneKScenariosSectionProps {
  locale?: Locale;
}

/**
 * FourOhOneKScenariosSection
 *
 * Server component that renders the "401(k) Calculator Scenarios and Examples"
 * section on the 401(k) Calculator tool page.
 *
 * Placement: after educational content and FAQs and before the Related Tools section.
 */
export default function FourOhOneKScenariosSection({
  locale = DEFAULT_LOCALE,
}: FourOhOneKScenariosSectionProps) {
  const tData =
    FOUR_OH_ONE_K_SCENARIOS_SECTION_I18N[locale] || FOUR_OH_ONE_K_SCENARIOS_SECTION_I18N.en;
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const scenarios = [
    {
      href: `${prefix}/tools/401k-calculator/scenarios/how-employer-match-affects-401k-growth`,
      title: tData.cards.employerMatch.title,
      description: tData.cards.employerMatch.description,
      anchorText: 'How employer match affects 401(k) growth',
    },
    {
      href: `${prefix}/tools/401k-calculator/scenarios/how-contribution-rate-changes-projected-balance`,
      title: tData.cards.contributionRate.title,
      description: tData.cards.contributionRate.description,
      anchorText: 'How contribution rate changes projected balance',
    },
    {
      href: `${prefix}/tools/401k-calculator/scenarios/how-time-and-growth-affect-401k`,
      title: tData.cards.timeAndGrowth.title,
      description: tData.cards.timeAndGrowth.description,
      anchorText: 'How time and growth affect a 401(k)',
    },
  ];

  return (
    <section aria-labelledby="four-oh-one-k-scenarios-heading">
      {/* Section header */}
      <div className="flex items-center gap-2 mb-5">
        <LayoutList className="h-5 w-5 text-[#f97316]" aria-hidden="true" />
        <h2
          id="four-oh-one-k-scenarios-heading"
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
            aria-label={scenario.anchorText}
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
        href={`${prefix}/tools/401k-calculator/scenarios`}
        aria-label="View all 401(k) calculator scenarios"
        className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1a3c5e] dark:text-blue-400 hover:text-[#f97316] dark:hover:text-[#f97316] transition-colors"
      >
        {tData.viewAll}
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </section>
  );
}
