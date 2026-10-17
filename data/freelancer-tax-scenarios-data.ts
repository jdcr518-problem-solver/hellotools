import { Locale } from '@/lib/i18n';

/* ── IRS Tax Configuration Mirrors ─────────────────────────────────────────── */

export interface TaxYearConfig {
  name: string;
  ssCap: number;
  stdSingle: number;
  stdJoint: number;
  stdHead: number;
  stdSeparate: number;
}

export const FREELANCE_TAX_YEAR_CONFIG: Record<string, TaxYearConfig> = {
  '2024': { name: '2024 Tax Year', ssCap: 168600, stdSingle: 14600, stdJoint: 29200, stdHead: 21900, stdSeparate: 14600 },
  '2025': { name: '2025 Tax Year', ssCap: 176100, stdSingle: 15000, stdJoint: 30000, stdHead: 22500, stdSeparate: 15000 },
  '2026': { name: '2026 Tax Year', ssCap: 181800, stdSingle: 15700, stdJoint: 31400, stdHead: 23550, stdSeparate: 15700 },
};

export const FREELANCE_STATE_TAX_PRESETS: Record<string, { name: string; rate: number }> = {
  'none': { name: 'No State Income Tax (TX, FL, WA, NV, AK, SD, WY, TN)', rate: 0.0 },
  'CA': { name: 'California (~9.3%)', rate: 9.3 },
  'NY': { name: 'New York (~6.5%)', rate: 6.5 },
  'PA': { name: 'Pennsylvania (3.07% Flat)', rate: 3.07 },
  'IL': { name: 'Illinois (4.95% Flat)', rate: 4.95 },
  'MA': { name: 'Massachusetts (5.0% Flat)', rate: 5.0 },
  'NC': { name: 'North Carolina (4.75% Flat)', rate: 4.75 },
  'CO': { name: 'Colorado (4.4% Flat)', rate: 4.4 },
  'GA': { name: 'Georgia (~5.49%)', rate: 5.49 },
  'VA': { name: 'Virginia (~5.75%)', rate: 5.75 },
  'custom': { name: 'Custom Rate %', rate: 5.0 },
};

/* ── Pure Freelancer Tax Types & Calculation Function ──────────────────────── */

export type FilingStatus = 'single' | 'joint' | 'head' | 'separate';
export type TaxYearKey = '2024' | '2025' | '2026';

export interface FreelancerTaxInputs {
  taxYear?: TaxYearKey;
  grossIncome: number;
  expenses: number;
  filingStatus?: FilingStatus;
  stateTaxRate?: number;
  includeState?: boolean;
}

export interface FreelancerTaxResult {
  grossIncome: number;
  expenses: number;
  netIncome: number;
  seTaxableIncome: number;
  socialSecurityTax: number;
  medicareTax: number;
  addMedicareTax: number;
  selfEmploymentTax: number;
  halfSeDeduction: number;
  standardDeduction: number;
  taxableFederalBase: number;
  estimatedIncomeTax: number;
  stateTax: number;
  totalAnnualTax: number;
  quarterlyPayment: number;
  effectiveTaxRate: number;
}

/**
 * Pure calculation function strictly mirroring components/tools/FreelancerTaxCalculator.tsx.
 * Runs on both server and client without React hooks or side effects.
 */
export function calculateFreelancerTax(inputs: FreelancerTaxInputs): FreelancerTaxResult {
  const taxYear = inputs.taxYear ?? '2024';
  const filingStatus = inputs.filingStatus ?? 'single';
  const includeState = inputs.includeState ?? false;
  const stateRate = includeState ? Math.max(0, inputs.stateTaxRate ?? 0) : 0;

  const gross = Math.max(0, Number.isFinite(inputs.grossIncome) ? inputs.grossIncome : 0);
  const exp = Math.max(0, Number.isFinite(inputs.expenses) ? inputs.expenses : 0);

  const net = Math.max(0, gross - exp);
  const seProfits = net * 0.9235;

  const config = FREELANCE_TAX_YEAR_CONFIG[taxYear] || FREELANCE_TAX_YEAR_CONFIG['2024'];

  // Social Security Tax (12.4% up to SS Cap)
  const ssTaxable = Math.min(seProfits, config.ssCap);
  const ssTax = ssTaxable * 0.124;

  // Medicare Tax (2.9% on all SE profits)
  const medTax = seProfits * 0.029;

  // Additional Medicare Tax (0.9% on SE profits above threshold)
  let addMedicareThreshold = 200000;
  if (filingStatus === 'joint') addMedicareThreshold = 250000;
  const addMedTax = seProfits > addMedicareThreshold ? (seProfits - addMedicareThreshold) * 0.009 : 0;

  // Total Self-Employment Tax
  const totalSeTax = ssTax + medTax + addMedTax;

  // 50% SE Tax Deduction from Adjusted Gross Income
  const seDeduction = totalSeTax * 0.5;

  // Standard deduction based on tax year & filing status
  let stdDeduction = config.stdSingle;
  if (filingStatus === 'joint') stdDeduction = config.stdJoint;
  else if (filingStatus === 'head') stdDeduction = config.stdHead;
  else if (filingStatus === 'separate') stdDeduction = config.stdSeparate;

  const taxableIncomeForFederal = Math.max(0, net - seDeduction - stdDeduction);

  // Federal Progressive Tax Brackets calculation (2024 IRS Brackets from live calculator)
  let fedTax = 0;
  if (filingStatus === 'joint') {
    if (taxableIncomeForFederal > 383900) fedTax = 78221 + (taxableIncomeForFederal - 383900) * 0.32;
    else if (taxableIncomeForFederal > 201050) fedTax = 34337 + (taxableIncomeForFederal - 201050) * 0.24;
    else if (taxableIncomeForFederal > 94300) fedTax = 10852 + (taxableIncomeForFederal - 94300) * 0.22;
    else if (taxableIncomeForFederal > 23200) fedTax = 2320 + (taxableIncomeForFederal - 23200) * 0.12;
    else fedTax = taxableIncomeForFederal * 0.10;
  } else {
    if (taxableIncomeForFederal > 191950) fedTax = 39110.50 + (taxableIncomeForFederal - 191950) * 0.32;
    else if (taxableIncomeForFederal > 100525) fedTax = 17168.50 + (taxableIncomeForFederal - 100525) * 0.24;
    else if (taxableIncomeForFederal > 47150) fedTax = 5426.00 + (taxableIncomeForFederal - 47150) * 0.22;
    else if (taxableIncomeForFederal > 11600) fedTax = 1160.00 + (taxableIncomeForFederal - 11600) * 0.12;
    else fedTax = taxableIncomeForFederal * 0.10;
  }

  // State Tax Calculation: State Rate x Taxable Federal Base
  const stTax = Math.max(0, (taxableIncomeForFederal * stateRate) / 100);

  // Totals
  const annualTotal = totalSeTax + fedTax + stTax;
  const quarterlyPayment = annualTotal / 4;
  const effectiveTaxRate = gross > 0 ? (annualTotal / gross) * 100 : 0;

  return {
    grossIncome: gross,
    expenses: exp,
    netIncome: net,
    seTaxableIncome: seProfits,
    socialSecurityTax: ssTax,
    medicareTax: medTax,
    addMedicareTax: addMedTax,
    selfEmploymentTax: totalSeTax,
    halfSeDeduction: seDeduction,
    standardDeduction: stdDeduction,
    taxableFederalBase: taxableIncomeForFederal,
    estimatedIncomeTax: fedTax,
    stateTax: stTax,
    totalAnnualTax: annualTotal,
    quarterlyPayment,
    effectiveTaxRate,
  };
}

/* ── Formatters ──────────────────────────────────────────────────────────── */

export function formatCurrency(amount: number, decimals = 2): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
}

export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/* ── Section i18n Types ───────────────────────────────────────────────────── */

export interface ScenarioCardMeta {
  title: string;
  description: string;
  badge: string;
  anchorText: string;
}

export interface FreelancerTaxScenarioSectionI18n {
  heading: string;
  intro: string;
  viewAll: string;
  cards: {
    setAsideReserve: ScenarioCardMeta;
    calculationSteps: ScenarioCardMeta;
    incomeImpact: ScenarioCardMeta;
  };
}

export const FREELANCER_TAX_SCENARIOS_SECTION_I18N: Record<Locale, FreelancerTaxScenarioSectionI18n> = {
  en: {
    heading: 'Freelancer Quarterly Tax Calculator Scenarios and Examples',
    intro:
      'These practical scenarios demonstrate how estimated 1099 freelance revenue, deductible business write-offs, standard deductions, filing status, state tax assumptions, and 4x annual payment frequency interact to shape your estimated quarterly tax obligations.',
    viewAll: 'View All Freelancer Quarterly Tax Calculator Scenarios',
    cards: {
      setAsideReserve: {
        title: 'How Much Should I Set Aside From Each Freelance Payment?',
        description:
          'Learn how to establish a consistent percentage-based reserve (typically 20% to 30%) from every client invoice to reliably cover self-employment tax and federal income tax.',
        badge: 'Invoice Planning',
        anchorText: 'How much should I set aside from each payment?',
      },
      calculationSteps: {
        title: 'How Quarterly Estimated Payments Are Calculated',
        description:
          'Walk through the complete mathematical sequence from gross revenue and deductible expenses to Schedule SE profit, 15.3% SE tax, standard deduction, and 4 quarterly payment vouchers.',
        badge: 'Step-by-Step Breakdown',
        anchorText: 'How quarterly estimated payments are calculated',
      },
      incomeImpact: {
        title: 'How Income Changes Affect Your Quarterly Estimate',
        description:
          'Compare low ($35k), moderate ($80k), and high ($150k) freelance gross income levels to see how progressive brackets and business expense ratios alter your quarterly vouchers.',
        badge: 'Income Comparison',
        anchorText: 'How income changes affect quarterly estimates',
      },
    },
  },
  es: {
    heading: 'Escenarios y Ejemplos de la Calculadora de Impuestos Trimestrales para Freelancers',
    intro:
      'Estos escenarios prácticos demuestran cómo los ingresos brutos 1099, los gastos comerciales deducibles, la deducción estándar y la frecuencia de pagos trimestrales determinan sus cuotas fiscales estimadas.',
    viewAll: 'Ver Todos los Escenarios de Impuestos para Freelancers',
    cards: {
      setAsideReserve: {
        title: '¿Cuánto Debería Reservar de Cada Pago de Freelance?',
        description:
          'Aprenda a reservar un porcentaje constante (típicamente del 20% al 30%) de cada factura para cubrir el impuesto sobre el trabajo por cuenta propia y el impuesto sobre la renta.',
        badge: 'Planificación de Facturas',
        anchorText: '¿Cuánto debería reservar de cada pago?',
      },
      calculationSteps: {
        title: 'Cómo se Calculan los Pagos Trimestrales Estimados',
        description:
          'Conozca el proceso paso a paso desde ingresos brutos y gastos deducibles hasta el 15.3% de SE tax, deducción estándar y 4 cupones trimestrales.',
        badge: 'Paso a Paso',
        anchorText: 'Cómo se calculan los pagos trimestrales estimados',
      },
      incomeImpact: {
        title: 'Cómo Afectan los Cambios de Ingresos a su Pago Trimestral',
        description:
          'Compare niveles de ingresos freelance de $35,000, $80,000 y $150,000 para observar cómo los tramos impositivos modifican su tasa efectiva.',
        badge: 'Comparativa de Ingresos',
        anchorText: 'Cómo afectan los cambios de ingresos a los pagos trimestrales',
      },
    },
  },
  de: {
    heading: 'Szenarien und Beispiele des Rechners für geschätzte Steuern von Freiberuflern',
    intro:
      'Diese Szenarien veranschaulichen, wie sich geschätzte freiberufliche Einkünfte, Betriebsausgaben, Standardabzüge und 4 vierteljährliche Zahlungen auf die Steuerbelastung auswirken.',
    viewAll: 'Alle Freiberufler-Steuerszenarien anzeigen',
    cards: {
      setAsideReserve: {
        title: 'Wie viel sollte ich von jedem Honorar für Steuern zurücklegen?',
        description:
          'Erfahren Sie, wie eine prozentuale Rücklage von 20% bis 30% pro Rechnung hilft, Selbstständigenabgaben und Einkommensteuer zuverlässig zu decken.',
        badge: 'Rechnungsplanung',
        anchorText: 'Wie viel sollte ich von jedem Honorar zurücklegen?',
      },
      calculationSteps: {
        title: 'Wie vierteljährliche Vorauszahlungen berechnet werden',
        description:
          'Schritt-für-Schritt-Ablauf von Bruttoeinnahmen und Ausgaben über den 15,3% SE-Satz bis zur Aufteilung in 4 Quartalsüberweisungen.',
        badge: 'Schritt-für-Schritt',
        anchorText: 'Wie vierteljährliche Vorauszahlungen berechnet werden',
      },
      incomeImpact: {
        title: 'Wie sich Einkommensänderungen auf Quartalszahlungen auswirken',
        description:
          'Vergleichen Sie Einkommen von $35.000, $80.000 und $150.000, um den Einfluss progressiver Tarife auf die effektive Steuerlast zu verstehen.',
        badge: 'Einkommensvergleich',
        anchorText: 'Wie sich Einkommensänderungen auf Quartalszahlungen auswirken',
      },
    },
  },
  fr: {
    heading: 'Scénarios et Exemples du Simulateur d’Impôts Trimestriels pour Freelances',
    intro:
      'Ces scénarios démontrent l’impact des revenus bruts de freelance, des dépenses professionnelles déductibles et des 4 versements trimestriels sur votre charge fiscale estimée.',
    viewAll: 'Voir Tous les Scénarios d’Impôts pour Freelances',
    cards: {
      setAsideReserve: {
        title: 'Combien Mettre de Côté sur Chaque Facture Freelance ?',
        description:
          'Découvrez comment provisionner 20% à 30% de chaque facture client pour couvrir sereinement les charges sociales et l’impôt sur le revenu.',
        badge: 'Planification',
        anchorText: 'Combien mettre de côté sur chaque facture ?',
      },
      calculationSteps: {
        title: 'Comment Sont Calculés les Acomptes Provisionnels Trimestriels',
        description:
          'Découvrez la décomposition du calcul : recettes brutes, frais déductibles, taxe d’activité indépendante de 15,3% et division en 4 acomptes.',
        badge: 'Étape par Étape',
        anchorText: 'Comment sont calculés les acomptes provisionnels',
      },
      incomeImpact: {
        title: 'Comment la Variation des Revenus Modifie l’Acompte Trimestriel',
        description:
          'Comparez des revenus de 35 000 $, 80 000 $ et 150 000 $ pour comprendre la progression du taux effectif et des acomptes trimestriels.',
        badge: 'Comparatif',
        anchorText: 'Comment la variation des revenus modifie les acomptes trimestriels',
      },
    },
  },
  pt: {
    heading: 'Cenários e Exemplos da Calculadora de Imposto Trimestral para Freelancers',
    intro:
      'Esses cenários ilustram como receitas brutas de freelance, despesas operacionais dedutíveis e a frequência de 4 pagamentos trimestrais afetam suas obrigações tributárias.',
    viewAll: 'Ver Todos os Cenários para Freelancers',
    cards: {
      setAsideReserve: {
        title: 'Quanto Guardar de Cada Pagamento de Freelancer?',
        description:
          'Aprenda a reservar uma porcentagem constante (20% a 30%) de cada fatura para cobrir tributos de autônomo e imposto de renda.',
        badge: 'Planejamento de Faturas',
        anchorText: 'Quanto guardar de cada pagamento?',
      },
      calculationSteps: {
        title: 'Como os Pagamentos Trimestrais Estimados São Calculados',
        description:
          'Veja o passo a passo completo: receita bruta, despesas dedutíveis, alíquota SE de 15,3%, dedução padrão e 4 parcelas trimestrais.',
        badge: 'Passo a Passo',
        anchorText: 'Como os pagamentos trimestrais são calculados',
      },
      incomeImpact: {
        title: 'Como Variações de Renda Alteram a Estimativa Trimestral',
        description:
          'Compare faixas de renda de US$ 35.000, US$ 80.000 e US$ 150.000 para analisar o impacto das alíquotas progressivas no valor do trimestre.',
        badge: 'Comparativo de Renda',
        anchorText: 'Como variações de renda alteram a estimativa trimestral',
      },
    },
  },
  ja: {
    heading: 'フリーランス予定納税計算機のシミュレーションと具体例',
    intro:
      'このシミュレーションでは、想定フリーランス総収入、経費控除、基礎控除、四半期ごとの4回分割払いが納税額に与える影響を検証します。',
    viewAll: 'フリーランス税金シミュレーション一覧を見る',
    cards: {
      setAsideReserve: {
        title: 'フリーランスの報酬から何％を税金用に確保すべきか？',
        description:
          '各請求額から一定割合（通常20%〜30%）を取り分け、個人事業主税と所得税の支払いに備える適切な準備率を解説します。',
        badge: '請求別税金準備',
        anchorText: '報酬から何％を税金用に確保すべきか？',
      },
      calculationSteps: {
        title: '四半期予定納税額の計算手順と仕組み',
        description:
          '総収入から必要経費の控除、92.35%課税対象基準、15.3%自営業税、基礎控除、四半期4分割計算までの手順を解説します。',
        badge: '計算ステップ解説',
        anchorText: '四半期予定納税額の計算手順と仕組み',
      },
      incomeImpact: {
        title: '収入変動が四半期納税額に与える影響の比較',
        description:
          '年収3.5万ドル、8万ドル、15万ドルの3段階で比較し、累進税率と経費率が四半期納付額に及ぼす影響を比較します。',
        badge: '収入別比較',
        anchorText: '収入変動が四半期納税額に与える影響の比較',
      },
    },
  },
};
