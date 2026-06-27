'use client';

import React, { useState, useMemo } from 'react';
import { Search, Sparkles, ArrowRight } from 'lucide-react';
import ToolCard from '@/components/ToolCard';
import AdBanner from '@/components/AdBanner';
import { categories } from '@/data/categories';
import { ToolMetadata } from '@/data/tools-master';

interface HomeClientContentProps {
  allTools: Pick<ToolMetadata, 'name' | 'slug' | 'description' | 'category' | 'keywords'>[];
  featuredToolSlugs: string[];
  heroHeadline: string;
  heroSubheadline: string;
}

export default function HomeClientContent({
  allTools,
  featuredToolSlugs,
  heroHeadline,
  heroSubheadline,
}: HomeClientContentProps) {
  const [search, setSearch] = useState('');

  // Filter tools dynamically based on search state
  const filteredTools = useMemo(() => {
    if (!search.trim()) return [];
    const query = search.toLowerCase();
    return allTools.filter(
      (tool) =>
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.keywords.toLowerCase().includes(query)
    );
  }, [search, allTools]);

  // Filter featured tools
  const featuredTools = useMemo(() => {
    return allTools.filter((t) => featuredToolSlugs.includes(t.slug));
  }, [allTools, featuredToolSlugs]);

  const handleShortcutClick = (term: string) => {
    setSearch(term);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a3c5e] to-[#0a1b2d] px-6 py-16 text-center shadow-xl sm:px-12 sm:py-20 lg:px-16 my-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#f97316]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative mx-auto max-w-2xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-900/40 border border-blue-500/30 px-3 py-1 text-xs font-semibold text-blue-300 mb-6">
            <Sparkles className="h-3.5 w-3.5 text-[#f97316]" />
            <span>100% Free & No Data Logging</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl bg-gradient-to-r from-white via-blue-100 to-orange-100 bg-clip-text text-transparent">
            {heroHeadline}
          </h1>
          <p className="mt-4 text-base text-blue-100/80 leading-relaxed max-w-xl mx-auto">
            {heroSubheadline}
          </p>

          {/* Hero Search Box */}
          <div className="mt-8 mx-auto max-w-lg relative flex items-center w-full">
            <Search className="absolute left-4 h-5 w-5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="What tool do you need today? e.g. EMI, age, base64..."
              aria-label="Search tools"
              className="w-full h-12 pl-12 pr-16 text-sm rounded-full border border-gray-700 bg-gray-900/80 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:border-transparent transition-all shadow-inner"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-4 text-xs font-bold text-gray-400 hover:text-white transition-colors cursor-pointer bg-transparent border-none"
              >
                Clear
              </button>
            )}
          </div>

          {/* Popular shortcuts */}
          <div className="mt-5 flex flex-wrap justify-center gap-2.5 text-xs text-gray-400">
            <span>Popular:</span>
            <button
              onClick={() => handleShortcutClick('EMI')}
              className="hover:text-white underline cursor-pointer bg-transparent border-none p-0 text-gray-400"
            >
              EMI Calculator
            </button>
            <span>•</span>
            <button
              onClick={() => handleShortcutClick('age')}
              className="hover:text-white underline cursor-pointer bg-transparent border-none p-0 text-gray-400"
            >
              Age Calculator
            </button>
            <span>•</span>
            <button
              onClick={() => handleShortcutClick('BMI')}
              className="hover:text-white underline cursor-pointer bg-transparent border-none p-0 text-gray-400"
            >
              BMI Calculator
            </button>
            <span>•</span>
            <button
              onClick={() => handleShortcutClick('password')}
              className="hover:text-white underline cursor-pointer bg-transparent border-none p-0 text-gray-400"
            >
              Password Gen
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Areas */}
      {search.trim() ? (
        // Search Results View
        <section className="my-12 animate-fade-in">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4 mb-6">
            <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">
              Search Results for &quot;{search}&quot;
            </h2>
            <button
              onClick={() => setSearch('')}
              className="text-xs font-bold text-[#f97316] dark:text-blue-400 hover:underline cursor-pointer bg-transparent border-none"
            >
              Clear Search
            </button>
          </div>
          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filteredTools.map((tool) => (
                <ToolCard
                  key={tool.slug}
                  name={tool.name}
                  slug={tool.slug}
                  description={tool.description}
                  category={tool.category}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
              <p className="text-gray-500 dark:text-gray-400">No tools found matching your search term.</p>
              <button
                onClick={() => setSearch('')}
                className="inline-flex items-center gap-1.5 mt-4 text-sm font-bold text-[#f97316] dark:text-blue-400 hover:underline cursor-pointer bg-transparent border-none"
              >
                <span>Browse all tools</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </section>
      ) : (
        // Normal Homepage View
        <>
          {/* Featured Tools Section */}
          <section className="my-12">
            <div className="flex items-center gap-2 pb-4 mb-6 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">Featured Utilities</h2>
              <span className="rounded-full bg-[#f97316]/10 text-[#f97316] text-[10px] font-bold px-2 py-0.5 uppercase">
                Trending
              </span>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredTools.map((tool) => (
                <ToolCard
                  key={tool.slug}
                  name={tool.name}
                  slug={tool.slug}
                  description={tool.description}
                  category={tool.category}
                />
              ))}
            </div>
          </section>

          {/* Categorized Tools Sections */}
          {categories.map((cat, idx) => {
            const categoryTools = allTools.filter((t) => t.category === cat.id);
            return (
              <React.Fragment key={cat.id}>
                <section id={cat.id} className="my-12 scroll-mt-20">
                  <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4 mb-6">
                    <div>
                      <h2 className="text-xl font-extrabold text-gray-900 dark:text-white bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-blue-100 bg-clip-text text-transparent inline-block">
                        {cat.name}
                      </h2>
                      <p className="text-xs text-slate-600 dark:text-blue-200/80 mt-1">
                        {cat.description}
                      </p>
                    </div>
                    <span className="text-xs font-bold bg-gray-100 dark:bg-gray-800/80 px-2.5 py-1 rounded-full text-slate-600 dark:text-blue-300">
                      {categoryTools.length} Tools
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {categoryTools.map((tool) => (
                      <ToolCard
                        key={tool.slug}
                        name={tool.name}
                        slug={tool.slug}
                        description={tool.description}
                        category={tool.category}
                      />
                    ))}
                  </div>
                </section>
                {idx === 1 && (
                  <AdBanner
                    adCode={process.env.NEXT_PUBLIC_ADSTERRA_BANNER_2 || ''}
                    width={300}
                    height={250}
                  />
                )}
              </React.Fragment>
            );
          })}
        </>
      )}
    </>
  );
}
