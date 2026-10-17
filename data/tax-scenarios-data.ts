import { Locale } from '@/lib/i18n';

/* ── Pure Tax Calculation Types & Utility ────────────────────────────────── */

export interface TaxBracket {
  limit: number;
  rate: number;
}

export const FEDERAL_TAX_BRACKETS_2024: TaxBracket[] = [
  { limit: 11600, rate: 0.10 },
  { limit: 47150, rate: 0.12 },
  { limit: 100525, rate: 0.22 },
  { limit: 191950, rate: 0.24 },
  { limit: 243725, rate: 0.32 },
  { limit: 609350, rate: 0.35 },
  { limit: Infinity, rate: 0.37 }
];

export interface TaxBracketBreakdownItem {
  rate: number;
  ratePercentStr: string;
  rangeLabel: string;
  taxableInBracket: number;
  taxInBracket: number;
}

export interface TaxCalculationResult {
  grossIncome: number;
  deductions: number;
  taxableIncome: number;
  taxOwed: number;
  effectiveRate: number;
  netIncome: number;
  marginalRate: number;
  bracketBreakdown: TaxBracketBreakdownItem[];
}

/**
 * Pure calculation function strictly mirroring components/tools/FinanceTools.tsx:TaxCalculator.
 * Computes progressive 2024 single filer federal tax liability, effective rate, and net income.
 * Runs on both server and client without React hooks or side effects.
 */
export function calculateTaxEstimate(
  income: number,
  deductions: number = 14600
): TaxCalculationResult {
  const safeIncome = Number.isFinite(income) && income > 0 ? income : 0;
  const safeDeductions = Number.isFinite(deductions) && deductions > 0 ? deductions : 0;
  const taxableIncome = Math.max(0, safeIncome - safeDeductions);

  let remaining = taxableIncome;
  let computedTax = 0;
  let previousLimit = 0;
  let marginalRate = 0;
  const bracketBreakdown: TaxBracketBreakdownItem[] = [];

  for (const bracket of FEDERAL_TAX_BRACKETS_2024) {
    const currentSpan = bracket.limit - previousLimit;
    const taxableInBracket = Math.min(remaining, currentSpan);
    const taxInBracket = taxableInBracket * bracket.rate;

    const lowerBoundStr = '$' + previousLimit.toLocaleString('en-US');
    const upperBoundStr = bracket.limit === Infinity ? '+' : ' – $' + bracket.limit.toLocaleString('en-US');
    const rangeLabel = `${lowerBoundStr}${upperBoundStr}`;

    bracketBreakdown.push({
      rate: bracket.rate,
      ratePercentStr: `${Math.round(bracket.rate * 100)}%`,
      rangeLabel,
      taxableInBracket: Math.round(taxableInBracket * 100) / 100,
      taxInBracket: Math.round(taxInBracket * 100) / 100,
    });

    if (taxableInBracket > 0) {
      marginalRate = bracket.rate;
    }

    computedTax += taxInBracket;
    remaining -= taxableInBracket;
    previousLimit = bracket.limit;

    if (remaining <= 0) break;
  }

  const net = safeIncome - computedTax;
  const ratePercentage = safeIncome > 0 ? (computedTax / safeIncome) * 100 : 0;

  return {
    grossIncome: safeIncome,
    deductions: safeDeductions,
    taxableIncome: Math.round(taxableIncome * 100) / 100,
    taxOwed: Math.round(computedTax * 100) / 100,
    effectiveRate: Math.round(ratePercentage * 100) / 100,
    netIncome: Math.round(net * 100) / 100,
    marginalRate,
    bracketBreakdown,
  };
}

/* ── Formatter Helpers ─────────────────────────────────────────────────── */

export function formatCurrency(amount: number): string {
  if (!Number.isFinite(amount)) return '$0.00';
  return (
    '$' +
    amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

export function formatNumber(val: number): string {
  if (!Number.isFinite(val)) return '0';
  return val.toLocaleString('en-US');
}

export function formatPercent(rate: number): string {
  if (!Number.isFinite(rate)) return '0.00%';
  return rate.toFixed(2) + '%';
}

/* ── Internationalized Content Dictionary ──────────────────────────────── */

export interface TaxScenarioCardContent {
  title: string;
  description: string;
  badge: string;
}

export interface TaxScenariosSectionContent {
  heading: string;
  intro: string;
  viewAll: string;
  cards: {
    taxBrackets: TaxScenarioCardContent;
    grossVsTaxable: TaxScenarioCardContent;
    deductionsImpact: TaxScenarioCardContent;
  };
}

export const TAX_SCENARIOS_SECTION_I18N: Record<Locale, TaxScenariosSectionContent> = {
  en: {
    heading: 'Tax Calculator Scenarios and Examples',
    intro:
      'Explore realistic tax scenarios to see how income, deductions, filing assumptions, and progressive tax brackets affect your estimated federal tax liability, effective tax rate, and take-home pay.',
    viewAll: 'View All Tax Calculator Scenarios',
    cards: {
      taxBrackets: {
        title: 'How Tax Brackets Affect Your Income Tax',
        description:
          'Learn how progressive marginal tax brackets work in practice and why entering a higher bracket never reduces your total take-home pay.',
        badge: 'Progressive Rates',
      },
      grossVsTaxable: {
        title: 'Gross Income vs Taxable Income',
        description:
          'Understand the crucial distinction between total pre-tax earnings and the taxable income base after subtracting allowable deductions.',
        badge: 'Income Base',
      },
      deductionsImpact: {
        title: 'How Deductions Change Your Estimated Tax',
        description:
          'See how claiming standard or higher deductions directly shelters income at your marginal bracket to generate valuable tax savings.',
        badge: 'Tax Deductions',
      },
    },
  },
  es: {
    heading: 'Escenarios y Ejemplos de la Calculadora de Impuestos',
    intro:
      'Explore escenarios fiscales reales para ver cómo los ingresos brutos, las deducciones y los tramos impositivos progresivos determinan su impuesto estimado y su ingreso neto.',
    viewAll: 'Ver Todos los Escenarios de la Calculadora de Impuestos',
    cards: {
      taxBrackets: {
        title: 'Cómo Afectan los Tramos Impositivos a su Impuesto',
        description:
          'Descubra cómo funcionan los tramos impositivos marginales y por qué un aumento salarial nunca reduce su ingreso neto disponible.',
        badge: 'Tasas Progresivas',
      },
      grossVsTaxable: {
        title: 'Ingreso Bruto vs Ingreso Imponible',
        description:
          'Comprenda la diferencia fundamental entre sus ingresos brutos totales y la base imponible sobre la cual se aplican los impuestos.',
        badge: 'Base Imponible',
      },
      deductionsImpact: {
        title: 'Cómo Modifican las Deducciones su Impuesto Estimado',
        description:
          'Observe cómo las deducciones estándar reducen la base imponible a su tasa marginal para generar ahorros tributarios directos.',
        badge: 'Deducciones',
      },
    },
  },
  de: {
    heading: 'Steuerrechner-Szenarien und Praxisbeispiele',
    intro:
      'Erkunden Sie realistische Steuerszenarien, um zu verstehen, wie Bruttoeinkommen, Freibeträge und progressive Tarifstufen die geschätzte Steuerlast und das Nettoeinkommen beeinflussen.',
    viewAll: 'Alle Steuerrechner-Szenarien ansehen',
    cards: {
      taxBrackets: {
        title: 'Wie Steuerstufen Ihre Einkommensteuer beeinflussen',
        description:
          'Erfahren Sie, wie progressive Grenzsteuersätze funktionieren und warum ein höheres Gehalt niemals Ihr gesamtes Nettoeinkommen schmälert.',
        badge: 'Progression',
      },
      grossVsTaxable: {
        title: 'Bruttoeinkommen vs. zu versteuerndes Einkommen',
        description:
          'Verstehen Sie den entscheidenden Unterschied zwischen dem gesamten Bruttolohn und der tatsächlichen steuerlichen Bemessungsgrundlage.',
        badge: 'Steuerbasis',
      },
      deductionsImpact: {
        title: 'Wie Abzüge Ihre geschätzte Steuerlast verändern',
        description:
          'Sehen Sie, wie Standardabzüge und Freibeträge Ihr zu versteuerndes Einkommen senken und spürbare Steuerersparnisse erzielen.',
        badge: 'Steuerabzüge',
      },
    },
  },
  fr: {
    heading: 'Scénarios et Exemples du Simulateur d’Impôt',
    intro:
      'Découvrez des simulations fiscales concrètes pour comprendre comment le revenu brut, les déductions et les tranches d’imposition progressives influent sur votre impôt estimé et votre revenu net.',
    viewAll: 'Voir Tous les Scénarios du Simulateur d’Impôt',
    cards: {
      taxBrackets: {
        title: 'Comment les Tranches d’Impôt Influent sur Votre Impôt',
        description:
          'Comprenez le fonctionnement des taux marginaux progressifs et pourquoi franchir une tranche ne diminue jamais votre salaire net.',
        badge: 'Taux Progressifs',
      },
      grossVsTaxable: {
        title: 'Revenu Brut vs Revenu Imposable',
        description:
          'Saisissez la différence essentielle entre rémunération brute totale et assiette imposable soumise aux barèmes fiscaux.',
        badge: 'Assiette Fiscale',
      },
      deductionsImpact: {
        title: 'Comment les Déductions Modifient Votre Impôt Estimé',
        description:
          'Voyez comment les déductions forfaitaires réduisent l’impôt en protégeant vos revenus à votre taux marginal d’imposition.',
        badge: 'Déductions',
      },
    },
  },
  pt: {
    heading: 'Cenários e Exemplos da Calculadora de Impostos',
    intro:
      'Explore cenários tributários práticos para compreender como a renda bruta, as deduções e as faixas progressivas impactam seu imposto estimado e sua renda líquida final.',
    viewAll: 'Ver Todos os Cenários da Calculadora de Impostos',
    cards: {
      taxBrackets: {
        title: 'Como as Faixas de Imposto Afetam Seu Imposto de Renda',
        description:
          'Entenda como as alíquotas marginais progressivas operam e por que mudar de faixa salarial nunca reduz seu rendimento líquido.',
        badge: 'Faixas Progressivas',
      },
      grossVsTaxable: {
        title: 'Renda Bruta vs Renda Tributável',
        description:
          'Compreenda a distinção entre a remuneração bruta total e a base de cálculo tributável após abater deduções legais.',
        badge: 'Base Tributável',
      },
      deductionsImpact: {
        title: 'Como as Deduções Alteram Seu Imposto Estimado',
        description:
          'Veja como a dedução padrão reduz a base tributável na sua alíquota marginal para proporcionar economia de impostos.',
        badge: 'Deduções Fiscais',
      },
    },
  },
  ja: {
    heading: '税金計算機のシナリオと試算事例',
    intro:
      '総収入、控除額、累進課税ブラケットが推定所得税額、実効税率、手取り額にどのように影響するか、具体的なシミュレーションでご確認いただけます。',
    viewAll: '税金計算機の全シナリオを見る',
    cards: {
      taxBrackets: {
        title: '税率ブラケットが所得税額に与える影響',
        description:
          '累進課税制度の仕組みと、ブラケットが上がっても手取り総額が減らない理由を分かりやすく解説します。',
        badge: '累進課税',
      },
      grossVsTaxable: {
        title: '総収入と課税所得の違い',
        description:
          '税引前の総支給額と、各種控除を差し引いた後の課税基準額（課税所得）の根本的な違いを学びます。',
        badge: '課税ベース',
      },
      deductionsImpact: {
        title: '控除が推定所得税額をどのように軽減するか',
        description:
          '基礎控除や各種控除の適用により、限界税率に応じて所得税がどれほど圧縮されるかを試算します。',
        badge: '所得控除',
      },
    },
  },
};
