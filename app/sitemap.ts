import { getDbData } from '@/lib/db';
import { MetadataRoute } from 'next';
import { NON_DEFAULT_LOCALES, PILOT_TOOLS } from '@/lib/i18n';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hellotools.net';

  try {
    const data = getDbData();

    // 1. Existing 71 English tool pages
    const englishToolPages = data.tools.map((tool) => ({
      url: `${baseUrl}/tools/${tool.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }));

    // 2. Localized pilot tool pages (10 pilot tools × 5 locales = 50 URLs)
    const localizedToolPages: MetadataRoute.Sitemap = [];
    for (const locale of NON_DEFAULT_LOCALES) {
      for (const slug of PILOT_TOOLS) {
        localizedToolPages.push({
          url: `${baseUrl}/${locale}/tools/${slug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        });
      }
    }

    // 3. Dynamic blog pages
    const blogPages = data.blogs.map((blog) => {
      let lastMod = new Date();
      if (blog.date) {
        const parsed = Date.parse(blog.date);
        if (!isNaN(parsed)) {
          lastMod = new Date(parsed);
        }
      }
      return {
        url: `${baseUrl}/blog/${blog.slug}`,
        lastModified: lastMod,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      };
    });

    // 4. Localized homepages (/es, /de, /fr, /pt, /ja = 5 URLs)
    const localizedHomepages = NON_DEFAULT_LOCALES.map((locale) => ({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    }));

    // 5. Trust & policy pages
    const trustPages: MetadataRoute.Sitemap = [
      { url: `${baseUrl}/about`,   lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
      { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
      { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.4 },
      { url: `${baseUrl}/terms`,   lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.4 },
    ];

    // 6. Category hub pages
    const categoryHubPages: MetadataRoute.Sitemap = [
      'finance', 'health', 'math', 'text', 'utility',
    ].map((slug) => ({
      url: `${baseUrl}/category/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    }));

    // 7. EMI Calculator scenario pages (English + Localized)
    const emiScenarioPaths = [
      '/tools/emi-calculator/scenarios',
      '/tools/emi-calculator/scenarios/emi-affordability-by-income',
      '/tools/emi-calculator/scenarios/emi-3-year-vs-5-year',
      '/tools/emi-calculator/scenarios/emi-extra-payment-savings',
    ];

    const emiScenarioPages: MetadataRoute.Sitemap = emiScenarioPaths.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

    for (const locale of NON_DEFAULT_LOCALES) {
      for (const path of emiScenarioPaths) {
        emiScenarioPages.push({
          url: `${baseUrl}/${locale}${path}`,
          lastModified: new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        });
      }
    }

    // 8. Compound Interest Calculator scenario pages (English + Localized)
    const ciScenarioPaths = [
      '/tools/compound-interest-calculator/scenarios',
      '/tools/compound-interest-calculator/scenarios/ci-growth-over-time',
      '/tools/compound-interest-calculator/scenarios/ci-compounding-frequency',
      '/tools/compound-interest-calculator/scenarios/ci-inflation-adjusted-returns',
    ];

    const ciScenarioPages: MetadataRoute.Sitemap = ciScenarioPaths.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

    for (const locale of NON_DEFAULT_LOCALES) {
      for (const path of ciScenarioPaths) {
        ciScenarioPages.push({
          url: `${baseUrl}/${locale}${path}`,
          lastModified: new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        });
      }
    }

    // 9. Savings Goal Calculator scenario pages (English + Localized)
    const savingsGoalScenarioPaths = [
      '/tools/savings-goal-calculator/scenarios',
      '/tools/savings-goal-calculator/scenarios/how-much-to-save-each-month',
      '/tools/savings-goal-calculator/scenarios/how-long-to-reach-savings-goal',
      '/tools/savings-goal-calculator/scenarios/how-inflation-affects-savings-goal',
    ];

    const savingsGoalScenarioPages: MetadataRoute.Sitemap = savingsGoalScenarioPaths.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

    for (const locale of NON_DEFAULT_LOCALES) {
      for (const path of savingsGoalScenarioPaths) {
        savingsGoalScenarioPages.push({
          url: `${baseUrl}/${locale}${path}`,
          lastModified: new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        });
      }
    }

    // 10. Retirement Savings Calculator scenario pages (English + Localized)
    const retirementScenarioPaths = [
      '/tools/retirement-calculator/scenarios',
      '/tools/retirement-calculator/scenarios/how-much-to-save-for-retirement',
      '/tools/retirement-calculator/scenarios/how-much-to-save-each-month-for-retirement',
      '/tools/retirement-calculator/scenarios/how-inflation-affects-retirement-savings',
    ];

    const retirementScenarioPages: MetadataRoute.Sitemap = retirementScenarioPaths.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

    for (const locale of NON_DEFAULT_LOCALES) {
      for (const path of retirementScenarioPaths) {
        retirementScenarioPages.push({
          url: `${baseUrl}/${locale}${path}`,
          lastModified: new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        });
      }
    }

    // 11. Mortgage Calculator scenario pages (English + Localized)
    const mortgageScenarioPaths = [
      '/tools/mortgage-calculator/scenarios',
      '/tools/mortgage-calculator/scenarios/how-much-house-can-i-afford',
      '/tools/mortgage-calculator/scenarios/15-year-vs-30-year-mortgage',
      '/tools/mortgage-calculator/scenarios/how-down-payment-affects-mortgage',
    ];

    const mortgageScenarioPages: MetadataRoute.Sitemap = mortgageScenarioPaths.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

    for (const locale of NON_DEFAULT_LOCALES) {
      for (const path of mortgageScenarioPaths) {
        mortgageScenarioPages.push({
          url: `${baseUrl}/${locale}${path}`,
          lastModified: new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        });
      }
    }

    // 12. Auto Loan Calculator scenario pages (English + Localized)
    const autoLoanScenarioPaths = [
      '/tools/auto-loan-calculator/scenarios',
      '/tools/auto-loan-calculator/scenarios/how-much-car-can-i-afford',
      '/tools/auto-loan-calculator/scenarios/larger-down-payment-vs-longer-loan-term',
      '/tools/auto-loan-calculator/scenarios/how-trade-in-affects-auto-loan',
    ];

    const autoLoanScenarioPages: MetadataRoute.Sitemap = autoLoanScenarioPaths.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

    for (const locale of NON_DEFAULT_LOCALES) {
      for (const path of autoLoanScenarioPaths) {
        autoLoanScenarioPages.push({
          url: `${baseUrl}/${locale}${path}`,
          lastModified: new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        });
      }
    }

    // 13. Amortization Calculator scenario pages (English + Localized)
    const amortizationScenarioPaths = [
      '/tools/amortization-calculator/scenarios',
      '/tools/amortization-calculator/scenarios/how-loan-payments-change-over-time',
      '/tools/amortization-calculator/scenarios/how-interest-rate-affects-amortization',
      '/tools/amortization-calculator/scenarios/how-loan-term-affects-principal-and-interest',
    ];

    const amortizationScenarioPages: MetadataRoute.Sitemap = amortizationScenarioPaths.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

    for (const locale of NON_DEFAULT_LOCALES) {
      for (const path of amortizationScenarioPaths) {
        amortizationScenarioPages.push({
          url: `${baseUrl}/${locale}${path}`,
          lastModified: new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        });
      }
    }

    // 14. Student Loan Calculator scenario pages (English + Localized)
    const studentLoanScenarioPaths = [
      '/tools/student-loan-calculator/scenarios',
      '/tools/student-loan-calculator/scenarios/how-much-student-loan-can-i-afford',
      '/tools/student-loan-calculator/scenarios/how-loan-term-affects-student-loan-cost',
      '/tools/student-loan-calculator/scenarios/how-interest-rate-changes-student-loan-cost',
    ];

    const studentLoanScenarioPages: MetadataRoute.Sitemap = studentLoanScenarioPaths.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

    for (const locale of NON_DEFAULT_LOCALES) {
      for (const path of studentLoanScenarioPaths) {
        studentLoanScenarioPages.push({
          url: `${baseUrl}/${locale}${path}`,
          lastModified: new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        });
      }
    }

    // 15. APR Calculator scenario pages (English + Localized)
    const aprScenarioPaths = [
      '/tools/apr-calculator/scenarios',
      '/tools/apr-calculator/scenarios/apr-vs-interest-rate-difference',
      '/tools/apr-calculator/scenarios/how-fees-affect-loan-apr',
      '/tools/apr-calculator/scenarios/comparing-two-loans-using-apr',
    ];

    const aprScenarioPages: MetadataRoute.Sitemap = aprScenarioPaths.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

    for (const locale of NON_DEFAULT_LOCALES) {
      for (const path of aprScenarioPaths) {
        aprScenarioPages.push({
          url: `${baseUrl}/${locale}${path}`,
          lastModified: new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        });
      }
    }

    // 16. Salary Calculator scenario pages (English + Localized)
    const salaryScenarioPaths = [
      '/tools/salary-calculator/scenarios',
      '/tools/salary-calculator/scenarios/gross-salary-vs-take-home-salary',
      '/tools/salary-calculator/scenarios/monthly-vs-annual-salary-conversion',
      '/tools/salary-calculator/scenarios/how-much-should-i-save-from-salary',
    ];

    const salaryScenarioPages: MetadataRoute.Sitemap = salaryScenarioPaths.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

    for (const locale of NON_DEFAULT_LOCALES) {
      for (const path of salaryScenarioPaths) {
        salaryScenarioPages.push({
          url: `${baseUrl}/${locale}${path}`,
          lastModified: new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        });
      }
    }

    // 17. Tax Calculator scenario pages (English + Localized)
    const taxScenarioPaths = [
      '/tools/tax-calculator/scenarios',
      '/tools/tax-calculator/scenarios/how-tax-brackets-affect-income-tax',
      '/tools/tax-calculator/scenarios/gross-income-vs-taxable-income',
      '/tools/tax-calculator/scenarios/how-deductions-change-estimated-tax',
    ];

    const taxScenarioPages: MetadataRoute.Sitemap = taxScenarioPaths.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

    for (const locale of NON_DEFAULT_LOCALES) {
      for (const path of taxScenarioPaths) {
        taxScenarioPages.push({
          url: `${baseUrl}/${locale}${path}`,
          lastModified: new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        });
      }
    }

    // 18. Inflation Calculator scenario pages (English + Localized)
    const inflationScenarioPaths = [
      '/tools/inflation-calculator/scenarios',
      '/tools/inflation-calculator/scenarios/how-inflation-reduces-purchasing-power',
      '/tools/inflation-calculator/scenarios/how-much-will-prices-rise-over-time',
      '/tools/inflation-calculator/scenarios/inflation-adjusted-savings-goal',
    ];

    const inflationScenarioPages: MetadataRoute.Sitemap = inflationScenarioPaths.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

    for (const locale of NON_DEFAULT_LOCALES) {
      for (const path of inflationScenarioPaths) {
        inflationScenarioPages.push({
          url: `${baseUrl}/${locale}${path}`,
          lastModified: new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        });
      }
    }

    // 19. 401(k) Calculator scenario pages (English + Localized)
    const fourOhOneKScenarioPaths = [
      '/tools/401k-calculator/scenarios',
      '/tools/401k-calculator/scenarios/how-employer-match-affects-401k-growth',
      '/tools/401k-calculator/scenarios/how-contribution-rate-changes-projected-balance',
      '/tools/401k-calculator/scenarios/how-time-and-growth-affect-401k',
    ];

    const fourOhOneKScenarioPages: MetadataRoute.Sitemap = fourOhOneKScenarioPaths.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

    for (const locale of NON_DEFAULT_LOCALES) {
      for (const path of fourOhOneKScenarioPaths) {
        fourOhOneKScenarioPages.push({
          url: `${baseUrl}/${locale}${path}`,
          lastModified: new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        });
      }
    }

    // 20. Freelancer Quarterly Tax Calculator scenario pages (English + Localized)
    const freelancerTaxScenarioPaths = [
      '/tools/freelancer-tax-calculator/scenarios',
      '/tools/freelancer-tax-calculator/scenarios/how-much-to-set-aside-from-each-payment',
      '/tools/freelancer-tax-calculator/scenarios/how-quarterly-estimated-payments-are-calculated',
      '/tools/freelancer-tax-calculator/scenarios/how-income-changes-affect-quarterly-estimates',
    ];

    const freelancerTaxScenarioPages: MetadataRoute.Sitemap = freelancerTaxScenarioPaths.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

    for (const locale of NON_DEFAULT_LOCALES) {
      for (const path of freelancerTaxScenarioPaths) {
        freelancerTaxScenarioPages.push({
          url: `${baseUrl}/${locale}${path}`,
          lastModified: new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        });
      }
    }

    // 21. Net Worth Calculator scenario pages (English + Localized)
    const netWorthScenarioPaths = [
      '/tools/net-worth-calculator/scenarios',
      '/tools/net-worth-calculator/scenarios/how-to-calculate-net-worth',
      '/tools/net-worth-calculator/scenarios/how-debt-affects-net-worth',
      '/tools/net-worth-calculator/scenarios/how-savings-and-investments-affect-net-worth',
    ];

    const netWorthScenarioPages: MetadataRoute.Sitemap = netWorthScenarioPaths.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

    for (const locale of NON_DEFAULT_LOCALES) {
      for (const path of netWorthScenarioPaths) {
        netWorthScenarioPages.push({
          url: `${baseUrl}/${locale}${path}`,
          lastModified: new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        });
      }
    }

    // 22. EV Charging vs Gas Cost Calculator scenario pages (English + Localized)
    const evCostScenarioPaths = [
      '/tools/ev-cost-calculator/scenarios',
      '/tools/ev-cost-calculator/scenarios/ev-vs-gas-cost-for-10000-miles-per-year',
      '/tools/ev-cost-calculator/scenarios/how-electricity-price-affects-ev-charging-savings',
      '/tools/ev-cost-calculator/scenarios/how-gas-price-changes-the-ev-savings-gap',
    ];

    const evCostScenarioPages: MetadataRoute.Sitemap = evCostScenarioPaths.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

    for (const locale of NON_DEFAULT_LOCALES) {
      for (const path of evCostScenarioPaths) {
        evCostScenarioPages.push({
          url: `${baseUrl}/${locale}${path}`,
          lastModified: new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        });
      }
    }

    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1.0,
      },
      ...localizedHomepages,
      {
        url: `${baseUrl}/tools`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
      },
      {
        url: `${baseUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      },
      ...trustPages,
      ...categoryHubPages,
      ...englishToolPages,
      ...localizedToolPages,
      ...blogPages,
      ...emiScenarioPages,
      ...ciScenarioPages,
      ...savingsGoalScenarioPages,
      ...retirementScenarioPages,
      ...mortgageScenarioPages,
      ...autoLoanScenarioPages,
      ...amortizationScenarioPages,
      ...studentLoanScenarioPages,
      ...aprScenarioPages,
      ...salaryScenarioPages,
      ...taxScenarioPages,
      ...inflationScenarioPages,
      ...fourOhOneKScenarioPages,
      ...freelancerTaxScenarioPages,
      ...netWorthScenarioPages,
      ...evCostScenarioPages,
    ];
  } catch (error) {
    console.error('Error generating dynamic sitemap, falling back to static config:', error);

    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1.0,
      },
      {
        url: `${baseUrl}/tools`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
      },
      {
        url: `${baseUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      },
    ];
  }
}
