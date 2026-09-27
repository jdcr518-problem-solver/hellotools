import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { getDbData } from '@/lib/db';
import { categories } from '@/data/categories';
import AdBanner from '@/components/AdBanner';
import {
  ChevronRight,
  Home,
  BookOpen,
  ArrowRight,
  DollarSign,
  Hash,
  FileText,
  Heart,
  Cpu,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface CategoryPageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

// ─── Category static details ─────────────────────────────────────────────────

const CATEGORY_DETAIL: Record<
  string,
  {
    Icon: React.ElementType;
    title: string;
    metaTitle: string;
    metaDesc: string;
    intro: string;
    /** Which blog category keywords map to this hub (for fetching articles) */
    blogCategory: string | null;
  }
> = {
  finance: {
    Icon: DollarSign,
    title: 'Finance Calculators',
    metaTitle: 'Free Online Finance Calculators & Loan Solvers | HelloTools',
    metaDesc:
      'Explore free, private financial calculators for loan EMI, mortgage payments, compound interest, salary deductions, and retirement planning. No signup needed.',
    intro:
      'Plan loans, forecast investment growth, and calculate tax obligations with full mathematical transparency. Every calculation runs directly inside your web browser — your financial inputs are never stored or transmitted.',
    blogCategory: 'finance',
  },
  health: {
    Icon: Heart,
    title: 'Health & Fitness Calculators',
    metaTitle: 'Free Health & Fitness Calculators | HelloTools',
    metaDesc:
      'Calculate BMI, daily calorie needs (TDEE), body fat percentage, ideal weight, and pregnancy due dates instantly with verified clinical formulas.',
    intro:
      'Track personal wellness benchmarks using standard World Health Organization (WHO) and clinical formulas. Your physical metrics are computed locally in your browser and are never stored or tracked by our servers.',
    blogCategory: null,
  },
  math: {
    Icon: Hash,
    title: 'Math & Time Calculators',
    metaTitle: 'Free Math, Time & Statistics Calculators | HelloTools',
    metaDesc:
      'Free online math calculators: percentage change, chronological age, GPA, scientific operations, date difference, and standard deviation.',
    intro:
      'Perform precision calculations for academic, professional, and everyday number problems. Instant, responsive, and completely client-side — no server round-trips required.',
    blogCategory: null,
  },
  text: {
    Icon: FileText,
    title: 'Text Utility Tools',
    metaTitle: 'Free Text Utilities & Writing Tools | HelloTools',
    metaDesc:
      'Count words, analyze reading time, convert text case, remove duplicate lines, and format markdown with client-side text utilities.',
    intro:
      'Format, clean, and inspect your writing without uploading sensitive documents to any server. All text processing happens inside your local browser memory.',
    blogCategory: null,
  },
  utility: {
    Icon: Cpu,
    title: 'Developer & Utility Tools',
    metaTitle: 'Free Developer Utilities & Converter Tools | HelloTools',
    metaDesc:
      'Secure client-side developer utilities: generate strong passwords, format JSON, encode/decode Base64, test regular expressions, and convert binary representations.',
    intro:
      'Engineering and developer tools built for security and efficiency. Generate credentials, validate formats, and convert data representations entirely on your device.',
    blogCategory: null,
  },
};

// ─── Static params (pre-generate 5 category routes at build time) ─────────────

export async function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.id }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata(props: CategoryPageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const detail = CATEGORY_DETAIL[slug];
  if (!detail) return { title: 'Category Not Found' };

  const baseUrl = 'https://hellotools.net';
  return {
    title: detail.metaTitle,
    description: detail.metaDesc,
    alternates: { canonical: `${baseUrl}/category/${slug}` },
    openGraph: {
      title: detail.metaTitle,
      description: detail.metaDesc,
      url: `${baseUrl}/category/${slug}`,
      type: 'website',
      siteName: 'HelloTools',
      images: [{ url: `${baseUrl}/og-image.png`, width: 1200, height: 630, alt: detail.metaTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: detail.metaTitle,
      description: detail.metaDesc,
      images: [`${baseUrl}/og-image.png`],
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function CategoryPage(props: CategoryPageProps) {
  const { slug } = await props.params;
  const cat = categories.find((c) => c.id === slug);
  const detail = CATEGORY_DETAIL[slug];

  if (!cat || !detail) notFound();

  const data = getDbData();
  const tools = data.tools.filter((t) => t.category === slug);

  // For now only finance articles exist; expand when health/dev guides are published
  const relevantBlogs = detail.blogCategory
    ? data.blogs.slice(0, 5) // all current blogs are finance
    : [];

  const { Icon, title, intro } = detail;
  const baseUrl = 'https://hellotools.net';

  // Schema.org CollectionPage structured data
  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description: detail.metaDesc,
    url: `${baseUrl}/category/${slug}`,
    hasPart: tools.map((t) => ({
      '@type': 'WebApplication',
      name: t.name,
      url: `${baseUrl}/tools/${t.slug}`,
      description: t.description,
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: 'All Tools', item: `${baseUrl}/tools` },
      { '@type': 'ListItem', position: 3, name: title, item: `${baseUrl}/category/${slug}` },
    ],
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800/80 px-4 py-2.5 rounded-xl"
      >
        <Link href="/" className="hover:text-gray-950 dark:hover:text-white flex items-center gap-1">
          <Home className="h-3.5 w-3.5" />
          <span>Home</span>
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/tools" className="hover:text-gray-950 dark:hover:text-white">
          All Tools
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#f97316] dark:text-blue-400 font-bold">{title}</span>
      </nav>

      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a3c5e] to-[#0a1b2d] px-6 py-14 text-center shadow-xl sm:px-12 my-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#f97316]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative mx-auto max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-900/40 border border-blue-500/30 px-3.5 py-1 text-xs font-semibold text-blue-300 mb-4">
            <Icon className="h-4 w-4 text-[#f97316]" aria-hidden="true" />
            <span>{cat.name} Category Hub</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {title}
          </h1>
          <p className="mt-3 text-sm text-blue-100/80 max-w-2xl mx-auto leading-relaxed">
            {intro}
          </p>
        </div>
      </div>

      {/* Top Banner Ad */}
      <AdBanner
        adCode={process.env.NEXT_PUBLIC_ADSTERRA_BANNER_1 || ''}
        width={728}
        height={90}
      />

      {/* ── Tools Grid ─────────────────────────────────────────────────────── */}
      <section className="my-10">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-800 pb-2">
          Available {cat.name} Tools{' '}
          <span className="text-sm font-normal text-gray-400 ml-1">({tools.length})</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="group p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-[#f97316] dark:hover:border-[#f97316] hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <h3 className="font-bold text-base text-gray-900 dark:text-white group-hover:text-[#f97316] transition-colors flex items-center justify-between">
                  <span className="leading-snug">{tool.name}</span>
                  <ChevronRight
                    className="h-4 w-4 shrink-0 transform group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 line-clamp-3 leading-relaxed">
                  {tool.description}
                </p>
              </div>
              <span className="text-[11px] font-semibold text-[#1a3c5e] dark:text-blue-400 group-hover:text-[#f97316] mt-4 flex items-center gap-1 transition-colors">
                <span>Open Calculator</span>
                <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Category Guides & Blog Articles ───────────────────────────────── */}
      {relevantBlogs.length > 0 && (
        <section className="my-12">
          <div className="flex items-center gap-2 mb-6 border-b border-gray-200 dark:border-gray-800 pb-2">
            <BookOpen className="h-5 w-5 text-[#f97316]" aria-hidden="true" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {cat.name} Guides &amp; Calculations Explained
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {relevantBlogs.map((blog) => (
              <Link
                key={blog.slug}
                href={`/blog/${blog.slug}`}
                className="group p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#f97316] bg-orange-50 dark:bg-orange-950/30 px-2 py-0.5 rounded">
                    {blog.keyword || 'Guide'}
                  </span>
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors mt-2.5 line-clamp-2 leading-snug">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                    {blog.metaDescription}
                  </p>
                </div>
                <div className="flex items-center justify-between text-[11px] text-gray-400 mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
                  <span>{blog.date}</span>
                  <span className="font-semibold text-blue-500 group-hover:underline">
                    Read Guide &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── Other Category Cross-Links ─────────────────────────────────────── */}
      <section className="my-12 p-6 rounded-3xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-4">
          Browse Other Calculator Categories
        </h3>
        <div className="flex flex-wrap gap-2.5">
          {categories
            .filter((c) => c.id !== slug)
            .map((otherCat) => (
              <Link
                key={otherCat.id}
                href={`/category/${otherCat.id}`}
                className="px-4 py-2 rounded-xl bg-white dark:bg-gray-800 text-xs font-semibold text-gray-800 dark:text-gray-200 hover:border-[#f97316] hover:text-[#f97316] border border-gray-200 dark:border-gray-700 transition-colors"
              >
                {otherCat.name} Tools &rarr;
              </Link>
            ))}
          <Link
            href="/tools"
            className="px-4 py-2 rounded-xl bg-[#1a3c5e] text-white text-xs font-semibold hover:bg-[#112942] transition-colors"
          >
            View All 71 Tools &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
