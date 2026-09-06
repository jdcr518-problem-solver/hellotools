'use client';

import React, { useState, useMemo } from 'react';
import { Search, Calculator, Sparkles, Filter, ArrowRight } from 'lucide-react';
import ToolCard from '@/components/ToolCard';
import { categories } from '@/data/categories';
import { ToolMetadata } from '@/data/tools-master';

interface ToolsDirectoryClientProps {
  allTools: Pick<ToolMetadata, 'name' | 'slug' | 'description' | 'category' | 'keywords'>[];
}

export default function ToolsDirectoryClient({ allTools }: ToolsDirectoryClientProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Count tools per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: allTools.length };
    categories.forEach((cat) => {
      counts[cat.id] = allTools.filter((t) => t.category === cat.id).length;
    });
    return counts;
  }, [allTools]);

  // Filter tools dynamically based on search query and category tab
  const filteredTools = useMemo(() => {
    let list = allTools;

    if (selectedCategory !== 'all') {
      list = list.filter((tool) => tool.category === selectedCategory);
    }

    if (search.trim()) {
      const query = search.toLowerCase();
      list = list.filter(
        (tool) =>
          tool.name.toLowerCase().includes(query) ||
          tool.description.toLowerCase().includes(query) ||
          tool.keywords.toLowerCase().includes(query)
      );
    }

    return list;
  }, [allTools, selectedCategory, search]);

  return (
    <div className="space-y-8">
      {/* Search Bar & Category Filter Bar */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
        {/* Search Input */}
        <div className="relative flex items-center w-full">
          <Search className="absolute left-4 h-5 w-5 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search across all 71+ calculators and utilities (e.g. loan, tax, bmi, percent)..."
            aria-label="Search all tools"
            className="w-full h-12 pl-12 pr-16 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:border-transparent transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-4 text-xs font-bold text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors cursor-pointer bg-transparent border-none"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#f97316] text-white shadow-sm'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <span>All Tools</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${selectedCategory === 'all' ? 'bg-white/20 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>
              {categoryCounts.all}
            </span>
          </button>

          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-[#f97316] text-white shadow-sm'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${isSelected ? 'bg-white/20 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>
                  {categoryCounts[cat.id] || 0}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count & Quick Status */}
      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 px-1">
        <span>
          Showing <strong>{filteredTools.length}</strong> {filteredTools.length === 1 ? 'tool' : 'tools'}
          {selectedCategory !== 'all' ? ` in ${categories.find(c => c.id === selectedCategory)?.name}` : ''}
          {search.trim() ? ` matching "${search}"` : ''}
        </span>
        {(search || selectedCategory !== 'all') && (
          <button
            onClick={() => {
              setSearch('');
              setSelectedCategory('all');
            }}
            className="text-[#f97316] dark:text-blue-400 hover:underline cursor-pointer font-bold"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Tools Grid */}
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
          <Calculator className="h-10 w-10 text-gray-400 mx-auto mb-3" />
          <p className="text-sm font-bold text-gray-700 dark:text-gray-200">No calculators or utilities found</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Try adjusting your keyword or choosing a different category.</p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedCategory('all');
            }}
            className="inline-flex items-center gap-1 mt-4 px-4 py-2 bg-[#f97316] text-white text-xs font-bold rounded-xl hover:bg-orange-600 transition-colors"
          >
            <span>Show All 71 Tools</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
