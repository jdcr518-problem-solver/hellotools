import React from 'react';
import Link from 'next/link';
import { Calculator, ArrowRight } from 'lucide-react';

interface BlogToolCTAProps {
  /** slug used to construct /tools/<slug> href */
  toolSlug: string;
  /** Display name of the tool */
  toolName: string;
  /** One-sentence benefit description shown beneath the title */
  description: string;
  /** Small uppercase badge above the title. Defaults to 'Try the Free Tool'. */
  badge?: string;
}

/**
 * BlogToolCTA
 *
 * An in-article call-to-action box placed within the first 2–3 paragraphs
 * of a finance or health blog post. Drives readers from the editorial guide
 * to the relevant interactive calculator.
 *
 * Usage (inside blog post HTML content via dangerouslySetInnerHTML is NOT
 * recommended; instead render this ABOVE the <div dangerouslySetInnerHTML>
 * block by conditionally including it in the blog page component).
 */
export default function BlogToolCTA({
  toolSlug,
  toolName,
  description,
  badge = 'Try the Free Tool',
}: BlogToolCTAProps) {
  return (
    <aside
      className="my-6 p-5 rounded-2xl bg-gradient-to-r from-blue-50/80 to-orange-50/40 dark:from-blue-950/30 dark:to-gray-900 border border-blue-200/60 dark:border-blue-900/40 shadow-sm not-prose"
      aria-label={`Interactive tool: ${toolName}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left – label + name + description */}
        <div className="space-y-1 min-w-0">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#f97316]">
            <Calculator className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{badge}</span>
          </div>
          <h4 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white leading-snug">
            {toolName}
          </h4>
          <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Right – CTA button */}
        <Link
          href={`/tools/${toolSlug}`}
          className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#1a3c5e] hover:bg-[#112942] text-white text-xs font-bold shrink-0 transition-colors"
        >
          <span>Calculate Now</span>
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </aside>
  );
}
