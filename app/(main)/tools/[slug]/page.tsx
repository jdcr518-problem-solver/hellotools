import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { getDbData } from '@/lib/db';
import { getHreflangMap } from '@/lib/i18n';
import { toolsRegistry } from '@/components/tools/registry';
import RelatedTools from '@/components/RelatedTools';
import FAQ from '@/components/FAQ';
import ShareButtons from '@/components/ShareButtons';
import AdBanner from '@/components/AdBanner';
import { ChevronRight, Home } from 'lucide-react';
import EmbedWidgetBox from '@/components/EmbedWidgetBox';

interface ToolPageProps {
  params: Promise<{ slug: string }> | { slug: string };
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }> | { [key: string]: string | string[] | undefined };
}

// Pre-generate all 71 tool routes at build time
export async function generateStaticParams() {
  const data = getDbData();
  return data.tools.map((tool) => ({
    slug: tool.slug,
  }));
}

// Generate dynamic SEO metadata
export async function generateMetadata(
  props: ToolPageProps
): Promise<Metadata> {
  const resolvedParams = await props.params;
  const data = getDbData();
  const tool = data.tools.find((t) => t.slug === resolvedParams?.slug);
  const baseUrl = 'https://hellotools.net';

  if (!tool) {
    return {
      title: 'Tool Not Found - HelloTools',
    };
  }

  const rawSeoTitle = tool.seoTitle || `${tool.name} - Free Online ${tool.name} | HelloTools`;
  // Strip trailing '| HelloTools' so the layout title.template doesn't produce a double suffix
  const seoTitle = rawSeoTitle.replace(/\s*\|\s*HelloTools\s*$/i, '');
  const seoDescription = tool.seoDescription || tool.description;

  const hreflangLanguages = getHreflangMap(tool.slug);

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: tool.keywords,
    alternates: {
      canonical: `${baseUrl}/tools/${tool.slug}`,
      ...(hreflangLanguages ? { languages: hreflangLanguages } : {}),
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `${baseUrl}/tools/${tool.slug}`,
      type: 'website',
      siteName: 'HelloTools',
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: seoTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: [`${baseUrl}/og-image.png`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ToolPage(props: ToolPageProps) {
  const resolvedParams = await props.params;
  const resolvedSearchParams = props.searchParams ? await props.searchParams : {};
  const isEmbed = resolvedSearchParams.embed === 'true';
  const data = getDbData();
  const tool = data.tools.find((t) => t.slug === resolvedParams?.slug);
  const baseUrl = 'https://hellotools.net';

  if (!tool) {
    notFound();
  }

  const ToolComponent = toolsRegistry[resolvedParams?.slug];

  if (isEmbed) {
    return (
      <div className="p-4 bg-transparent">
        <style dangerouslySetInnerHTML={{ __html: `
          header, footer { display: none !important; }
          body { background: transparent !important; }
          main { padding: 0 !important; }
        ` }} />
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm max-w-2xl mx-auto animate-fade-in">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-1.5 justify-center">
              <span>{tool.name}</span>
            </h3>
          </div>
          <ToolComponent />
          <div className="mt-4 text-center">
            <a 
              href={`${baseUrl}/tools/${tool.slug}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[10px] text-gray-400 hover:text-blue-500 hover:underline transition-colors font-medium"
            >
              Powered by HelloTools
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (!ToolComponent) {
    notFound();
  }

  // Category Display Name Mapping
  const categoryNames: Record<string, string> = {
    finance: 'Finance',
    math: 'Math & Time',
    text: 'Text Utilities',
    health: 'Health & Fitness',
    utility: 'Developer & Utility',
  };

  const categoryName = categoryNames[tool.category] || 'Utility';

  // Construct JSON-LD Schema structures
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': baseUrl,
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': categoryName,
        'item': `${baseUrl}/#${tool.category}`,
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': tool.name,
        'item': `${baseUrl}/tools/${tool.slug}`,
      },
    ],
  };

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': tool.name,
    'url': `${baseUrl}/tools/${tool.slug}`,
    'description': tool.seoDescription || tool.description,
    'applicationCategory': ({ finance: 'FinanceApplication', health: 'HealthApplication', math: 'EducationalApplication', text: 'UtilitiesApplication', utility: 'UtilitiesApplication' })[tool.category] || 'UtilitiesApplication',
    'operatingSystem': 'Any',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD',
    },
  };

  const faqsToUse = tool.seoFaqs || tool.faqs || [];
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqsToUse.map((faq) => ({
      '@type': 'Question',
      'name': faq.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.a,
      },
    })),
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Schema Markup Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      {faqsToUse.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800/80 px-4 py-2.5 rounded-xl">
        <Link href="/" className="hover:text-gray-950 dark:hover:text-white flex items-center gap-1">
          <Home className="h-3.5 w-3.5" />
          <span>Home</span>
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link href={`/#${tool.category}`} className="hover:text-gray-950 dark:hover:text-white">
          {categoryName}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#f97316] dark:text-blue-400 font-bold truncate">{tool.name}</span>
      </nav>

      {/* Top Advertisement Banner */}
      <AdBanner 
        adCode={process.env.NEXT_PUBLIC_ADSTERRA_BANNER_1 || ''} 
        width={728} 
        height={90} 
      />

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-blue-100 bg-clip-text text-transparent inline-block">
          {tool.name}
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-blue-200/80 leading-relaxed max-w-3xl">
          {tool.description}
        </p>
      </div>

      {/* Overview Summary Box (AEO Optimization) */}
      {tool.quickAnswer && (
        <div className="mb-8 p-4 rounded-xl bg-orange-50/50 dark:bg-blue-950/20 border border-orange-200/50 dark:border-blue-900/30 text-slate-700 dark:text-blue-200 text-sm leading-relaxed flex items-start gap-2">
          <span className="font-bold text-[#f97316] dark:text-blue-400 shrink-0">Summary:</span>
          <span>{tool.quickAnswer}</span>
        </div>
      )}

      {/* Main Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Side: Dynamic Tool Component */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
            <ToolComponent />
          </div>

          {/* Embed Code Widget Box */}
          <EmbedWidgetBox slug={tool.slug} name={tool.name} />

          {/* Under-Calculator Ad banner (300x250) */}
          <AdBanner 
            adCode={process.env.NEXT_PUBLIC_ADSTERRA_BANNER_2 || ''} 
            width={300} 
            height={250} 
          />
        </div>

        {/* Right Side: Sidebar Widgets */}
        <div className="space-y-6">
          {/* Share buttons widget */}
          <ShareButtons />

          {/* Sidebar Advertisement placeholder (160x600, desktop only) */}
          <div className="hidden lg:block">
            <AdBanner 
              adCode={process.env.NEXT_PUBLIC_ADSTERRA_BANNER_3 || ''} 
              width={160} 
              height={600} 
            />
          </div>
        </div>
      </div>

      {/* Structured SEO / AEO Text Sections */}
      <div className="mt-12 max-w-4xl space-y-10">
        {/* How to Use Section */}
        {tool.seoHowToUse && (
          <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              How to Use {tool.name}
            </h2>
            <div className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-blue-200/70 whitespace-pre-line">
              {tool.seoHowToUse}
            </div>
          </section>
        )}

        {/* Formula / How It Works Section */}
        {tool.seoHowItWorks && (
          <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {tool.name} Formula / How It Works
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-blue-200/70">
              {tool.seoHowItWorks}
            </p>
            {tool.formula && (
              <div className="bg-gray-55/50 bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl border border-gray-150 dark:border-gray-800 font-mono text-[11px] break-words text-gray-600 dark:text-gray-300">
                <span className="text-xs font-bold text-gray-400 dark:text-gray-500 block mb-2 uppercase tracking-wider">Formula:</span>
                {tool.formula}
              </div>
            )}
            {tool.seoExample && (
              <div className="bg-blue-50/20 dark:bg-blue-950/10 border border-blue-100/30 dark:border-blue-900/20 p-5 rounded-xl">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block mb-2 uppercase tracking-wider">Example Calculation:</span>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-blue-200/70">
                  {tool.seoExample}
                </p>
              </div>
            )}
          </section>
        )}

        {/* Frequently Asked Questions */}
        {faqsToUse.length > 0 && (
          <section>
            <FAQ faqs={faqsToUse} />
          </section>
        )}

        {/* Related Tools */}
        <section>
          <RelatedTools relatedSlugs={tool.relatedSlugs} />
        </section>
      </div>
    </div>
  );
}
