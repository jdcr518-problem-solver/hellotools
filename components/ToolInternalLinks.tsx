import React from 'react';
import Link from 'next/link';
import { toolsMaster } from '@/data/tools-master';
import { ChevronRight, ArrowLeft, BookOpen, Calculator } from 'lucide-react';

export interface RelatedArticle {
  slug: string;
  title: string;
  readingTime?: string;
  snippet?: string;
}

interface ToolInternalLinksProps {
  /** e.g. 'finance' | 'health' | 'math' | 'text' | 'utility' */
  categorySlug: string;
  /** Human-readable name shown in headings, e.g. 'Finance' */
  categoryName: string;
  /** Up to 4 tool slugs to feature in the Related Calculators grid */
  relatedToolSlugs: string[];
  /**
   * Optional blog articles to feature in the Learn More section.
   * When empty the component falls back to a single "Browse Hub" card.
   */
  articles?: RelatedArticle[];
}

/**
 * ToolInternalLinks
 *
 * Bottom-of-page linking hub rendered on every tool page.
 * Three structural parts:
 *  1. "← Back to <Category> Tools" breadcrumb link to /category/<slug>
 *  2. Related Calculators grid (card links to sibling tools)
 *  3. Learn More section (article cards or fallback hub link)
 *
 * This component is a SERVER component (no 'use client') so it
 * does NOT affect the existing client-side calculator logic.
 */
export default function ToolInternalLinks({
  categorySlug,
  categoryName,
  relatedToolSlugs,
  articles = [],
}: ToolInternalLinksProps) {
  const tools = toolsMaster
    .filter((t) => relatedToolSlugs.includes(t.slug))
    .slice(0, 4);

  return (
    <div className="my-12 space-y-10 border-t border-gray-100 dark:border-gray-800 pt-8">

      {/* ── 1. Back to Category Hub ───────────────────────────────── */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <Link
          href={`/category/${categorySlug}`}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#1a3c5e] dark:text-blue-400 hover:text-[#f97316] dark:hover:text-[#f97316] transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Back to All {categoryName} Tools</span>
        </Link>
        <span className="text-[11px] text-gray-400 dark:text-gray-500 uppercase tracking-wider font-semibold hidden sm:inline">
          {categoryName} Calculator Hub
        </span>
      </div>

      {/* ── 2. Related Calculators ───────────────────────────────── */}
      {tools.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-5">
            <Calculator className="h-5 w-5 text-[#f97316]" aria-hidden="true" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Related Calculators &amp; Solvers
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {tools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group block p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-[#f97316] dark:hover:border-[#f97316] hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center justify-between text-sm font-bold text-gray-900 dark:text-white group-hover:text-[#f97316] transition-colors">
                  <span className="leading-snug">{tool.name}</span>
                  <ChevronRight className="h-4 w-4 shrink-0 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 leading-relaxed line-clamp-2">
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── 3. Learn More & Guides ───────────────────────────────── */}
      <section>
        <div className="flex items-center gap-2 mb-5">
          <BookOpen className="h-5 w-5 text-blue-500" aria-hidden="true" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Learn More &amp; In-Depth Guides
          </h2>
        </div>

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>
                  {article.snippet && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 line-clamp-2 leading-relaxed">
                      {article.snippet}
                    </p>
                  )}
                </div>
                <span className="text-[11px] text-gray-400 dark:text-gray-500 mt-3 font-semibold uppercase tracking-wide">
                  {article.readingTime ?? 'Guide'} &rarr; Read article
                </span>
              </Link>
            ))}
          </div>
        ) : (
          /* Fallback: no articles yet → point to category hub */
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-5 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-sm">
            <p className="text-gray-600 dark:text-gray-300">
              Looking for formulas, comparisons, and deeper guides on{' '}
              <span className="font-semibold text-gray-900 dark:text-white">
                {categoryName}
              </span>{' '}
              topics?
            </p>
            <Link
              href={`/category/${categorySlug}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#f97316] hover:underline whitespace-nowrap"
            >
              Explore {categoryName} Hub &rarr;
            </Link>
          </div>
        )}
      </section>

    </div>
  );
}
