import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';

/* ── Pure Mortgage Calculation Utilities (Reused from FinanceTools.tsx) ────── */

export interface MortgageScenarioInputs {
  homeValue: number;
  downPayment: number;
  rate: number; // annual rate % (e.g. 4.5)
  years: number; // loan term in years (e.g. 30 or 15)
  tax?: number; // annual property tax % (default 1.2)
  insurance?: number; // annual insurance in $ (default 1200)
  pmi?: number; // annual PMI % if downPayment < 20% (default 0.5)
}

export interface MortgageScenarioResult {
  homeValue: number;
  downPayment: number;
  loanAmount: number;
  monthlyPrincipalAndInterest: number;
  monthlyTax: number;
  monthlyInsurance: number;
  monthlyPMI: number;
  monthlyTotal: number;
  requiresPMI: boolean;
  totalPrincipalAndInterest: number;
  totalInterest: number;
  totalMonths: number;
}

/**
 * Calculates exact mortgage payment components matching MortgageCalculator in FinanceTools.tsx.
 */
export function calcMortgageDetails({
  homeValue,
  downPayment,
  rate,
  years,
  tax = 1.2,
  insurance = 1200,
  pmi = 0.5,
}: MortgageScenarioInputs): MortgageScenarioResult {
  const P = Math.max(0, homeValue - downPayment);
  const r = (rate / 12) / 100;
  const n = years * 12;

  let emi = 0;
  if (P > 0 && n > 0) {
    if (r === 0) {
      emi = P / n;
    } else {
      emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }
  }

  const monthlyTax = (homeValue * (tax / 100)) / 12;
  const monthlyInsurance = insurance / 12;

  // PMI is applied if down payment is strictly less than 20% of home value
  const requiresPMI = downPayment < homeValue * 0.2;
  const monthlyPMI = requiresPMI && P > 0 ? (P * (pmi / 100)) / 12 : 0;

  const total = emi + monthlyTax + monthlyInsurance + monthlyPMI;

  const roundedEmi = Math.round(emi * 100) / 100;
  const roundedTax = Math.round(monthlyTax * 100) / 100;
  const roundedInsurance = Math.round(monthlyInsurance * 100) / 100;
  const roundedPMI = Math.round(monthlyPMI * 100) / 100;
  const roundedTotal = Math.round(total * 100) / 100;

  const totalPrincipalAndInterest = Math.round(roundedEmi * n * 100) / 100;
  const totalInterest = r === 0 ? 0 : Math.max(0, Math.round((totalPrincipalAndInterest - P) * 100) / 100);

  return {
    homeValue,
    downPayment,
    loanAmount: P,
    monthlyPrincipalAndInterest: roundedEmi,
    monthlyTax: roundedTax,
    monthlyInsurance: roundedInsurance,
    monthlyPMI: roundedPMI,
    monthlyTotal: roundedTotal,
    requiresPMI,
    totalPrincipalAndInterest,
    totalInterest,
    totalMonths: n,
  };
}

/* ── Currency Formatter ───────────────────────────────────────────────────── */

export function formatCurrency(amount: number, locale: Locale = DEFAULT_LOCALE, decimals: number = 0): string {
  const localeMap: Record<Locale, { tag: string; currency: string }> = {
    en: { tag: 'en-US', currency: 'USD' },
    es: { tag: 'es-ES', currency: 'USD' },
    de: { tag: 'de-DE', currency: 'EUR' },
    fr: { tag: 'fr-FR', currency: 'EUR' },
    pt: { tag: 'pt-BR', currency: 'BRL' },
    ja: { tag: 'ja-JP', currency: 'JPY' },
  };

  const { tag, currency } = localeMap[locale] || localeMap.en;
  try {
    return new Intl.NumberFormat(tag, {
      style: 'currency',
      currency,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(amount);
  } catch {
    return `$${amount.toLocaleString()}`;
  }
}

/* ── Localized Scenario Metadata & Content ────────────────────────────────── */

export interface MortgageScenarioSectionI18n {
  heading: string;
  intro: string;
  viewAll: string;
  cards: {
    affordability: { title: string; description: string; badge: string };
    termComparison: { title: string; description: string; badge: string };
    downPayment: { title: string; description: string; badge: string };
  };
}

export const MORTGAGE_SCENARIOS_SECTION_I18N: Record<Locale, MortgageScenarioSectionI18n> = {
  en: {
    heading: 'Mortgage Calculator Scenarios and Examples',
    intro:
      'Explore practical mortgage scenarios to understand how home price, down payment, loan amount, interest rate, and mortgage term affect monthly payments and total interest over time.',
    viewAll: 'View All Mortgage Calculator Scenarios',
    cards: {
      affordability: {
        title: 'How Much House Can I Afford?',
        description: 'See estimated monthly payments across home price tiers to help benchmark affordability for your budget.',
        badge: 'Affordability',
      },
      termComparison: {
        title: '15-Year vs 30-Year Mortgage: Monthly Payment and Total Interest',
        description: 'Compare 15-year and 30-year fixed loan terms to see the trade-off between monthly payment and lifetime interest.',
        badge: 'Term Comparison',
      },
      downPayment: {
        title: 'How Does a Larger Down Payment Change Your Mortgage?',
        description: 'Analyze how putting 5%, 10%, 15%, or 20% down alters your monthly payment, removes PMI, and saves interest.',
        badge: 'Down Payment',
      },
    },
  },
  es: {
    heading: 'Escenarios y Ejemplos de la Calculadora de Hipotecas',
    intro:
      'Explore escenarios prácticos para entender cómo el precio de la vivienda, el pago inicial, el monto del préstamo, la tasa de interés y el plazo afectan sus cuotas mensuales y el interés total.',
    viewAll: 'Ver Todos los Escenarios de la Calculadora de Hipotecas',
    cards: {
      affordability: {
        title: '¿Cuánta Casa Puedo Pagar?',
        description: 'Vea pagos mensuales estimados en diferentes precios de vivienda para orientar su presupuesto.',
        badge: 'Accesibilidad',
      },
      termComparison: {
        title: 'Hipoteca a 15 Años vs 30 Años: Pago Mensual e Interés Total',
        description: 'Compare plazos fijos a 15 y 30 años para evaluar el equilibrio entre cuota mensual e interés total acumulado.',
        badge: 'Comparación de Plazos',
      },
      downPayment: {
        title: '¿Cómo Cambia su Hipoteca un Pago Inicial Mayor?',
        description: 'Analice cómo aportar 5%, 10%, 15% o 20% reduce su pago mensual, elimina el seguro PMI y ahorra intereses.',
        badge: 'Pago Inicial',
      },
    },
  },
  de: {
    heading: 'Hypothekenrechner-Szenarien und Beispiele',
    intro:
      'Entdecken Sie praxisnahe Hypothekenszenarien, um zu verstehen, wie sich Kaufpreis, Eigenkapital, Darlehensbetrag, Zinssatz und Laufzeit auf Monatsrate und Gesamtzinsen auswirken.',
    viewAll: 'Alle Hypothekenrechner-Szenarien anzeigen',
    cards: {
      affordability: {
        title: 'Wie viel Immobilie kann ich mir leisten?',
        description: 'Sehen Sie geschätzte Monatsraten über verschiedene Immobilienpreise zur Orientierung für Ihr Budget.',
        badge: 'Leistbarkeit',
      },
      termComparison: {
        title: '15 Jahre vs. 30 Jahre Hypothek: Monatsrate und Gesamtzinsen',
        description: 'Vergleichen Sie 15- und 30-jährige Laufzeiten bezüglich Monatsbelastung und Zinskosten über die Gesamtlaufzeit.',
        badge: 'Laufzeitvergleich',
      },
      downPayment: {
        title: 'Wie verändert mehr Eigenkapital Ihre Hypothek?',
        description: 'Erfahren Sie, wie 5 %, 10 %, 15 % oder 20 % Eigenkapital die Monatsrate senken, Zusatzversicherungen sparen und Zinskosten verringern.',
        badge: 'Eigenkapital',
      },
    },
  },
  fr: {
    heading: 'Scénarios et Exemples du Simulateur de Prêt Immobilier',
    intro:
      'Découvrez des scénarios concrets pour comprendre comment le prix d’achat, l’apport personnel, le montant emprunté, le taux d’intérêt et la durée influent sur vos mensualités et le coût total du crédit.',
    viewAll: 'Voir Tous les Scénarios du Prêt Immobilier',
    cards: {
      affordability: {
        title: 'Quelle Valeur de Logement Puis-je Acheter ?',
        description: 'Consultez les mensualités estimées selon différents montants d’achat pour guider votre budget.',
        badge: 'Capacité d’Achat',
      },
      termComparison: {
        title: 'Prêt sur 15 Ans vs 30 Ans : Mensualité et Intérêts Totaux',
        description: 'Comparez des durées fixes de 15 et 30 ans pour évaluer l’équilibre entre mensualité courante et intérêts totaux.',
        badge: 'Comparatif de Durée',
      },
      downPayment: {
        title: 'Quel est l’Impact d’un Apport Plus Élevé ?',
        description: 'Analysez comment un apport de 5 %, 10 %, 15 % ou 20 % réduit vos mensualités, supprime l’assurance PMI et réduit le coût du crédit.',
        badge: 'Apport Personnel',
      },
    },
  },
  pt: {
    heading: 'Cenários e Exemplos da Calculadora de Hipoteca',
    intro:
      'Explore cenários práticos para entender como o valor do imóvel, a entrada, o valor financiado, a taxa de juros e o prazo influenciam a parcela mensal e o custo total de juros.',
    viewAll: 'Ver Todos os Cenários da Calculadora de Hipoteca',
    cards: {
      affordability: {
        title: 'Quanto Posso Pagar em um Imóvel?',
        description: 'Veja parcelas mensais estimadas em diferentes faixas de valor para calibrar seu orçamento.',
        badge: 'Capacidade de Compra',
      },
      termComparison: {
        title: 'Hipoteca de 15 vs 30 Anos: Parcela Mensal e Juros Totais',
        description: 'Compare prazos de 15 e 30 anos e entenda o equilíbrio entre prestação mensal e juros acumulados ao longo do tempo.',
        badge: 'Comparação de Prazos',
      },
      downPayment: {
        title: 'Como uma Entrada Maior Modifica sua Hipoteca?',
        description: 'Analise como dar 5%, 10%, 15% ou 20% de entrada reduz sua prestação, elimina o seguro PMI e economiza em juros.',
        badge: 'Entrada Inicial',
      },
    },
  },
  ja: {
    heading: '住宅ローン計算機のシミュレーションと具体例',
    intro:
      '物件価格、頭金、借入額、金利、返済期間が毎月の返済額や総利息にどのように影響するか、具体的なシミュレーションで確認できます。',
    viewAll: '住宅ローンのすべてのシミュレーションを見る',
    cards: {
      affordability: {
        title: 'いくらの住宅が購入できる？',
        description: '物件価格ごとの毎月返済額の目安を確認し、ご自身の予算計画の参考にできます。',
        badge: '借入目安',
      },
      termComparison: {
        title: '15年返済 vs 30年返済：毎月返済額と総利息の比較',
        description: '15年と30年の固定期間を比較し、月々の返済負担と長期的な利息総額のトレードオフを解説します。',
        badge: '期間比較',
      },
      downPayment: {
        title: '頭金を増やすと住宅ローンはどう変わる？',
        description: '頭金5%、10%、15%、20%で毎月の返済額、PMI保険料の有無、支払利息がどう変わるかを比較します。',
        badge: '頭金シミュレーション',
      },
    },
  },
};
