import { Locale } from '@/lib/i18n';

/* ── CPI-U Data & Types ─────────────────────────────────────────────────── */

export const CPI_DATA: Record<number, number> = {
  1913: 9.9,  1914: 10.0, 1915: 10.1, 1916: 10.9, 1917: 12.8, 1918: 15.1,
  1919: 17.3, 1920: 20.0, 1921: 17.9, 1922: 16.8, 1923: 17.1, 1924: 17.1,
  1925: 17.5, 1926: 17.7, 1927: 17.4, 1928: 17.1, 1929: 17.1, 1930: 16.7,
  1931: 15.2, 1932: 13.7, 1933: 13.0, 1934: 13.4, 1935: 13.7, 1936: 13.9,
  1937: 14.4, 1938: 14.1, 1939: 13.9, 1940: 14.0, 1941: 14.7, 1942: 16.3,
  1943: 17.3, 1944: 17.6, 1945: 18.0, 1946: 19.5, 1947: 22.3, 1948: 24.1,
  1949: 23.8, 1950: 24.1, 1951: 26.0, 1952: 26.5, 1953: 26.7, 1954: 26.9,
  1955: 26.8, 1956: 27.2, 1957: 28.1, 1958: 28.9, 1959: 29.1, 1960: 29.6,
  1961: 29.9, 1962: 30.2, 1963: 30.6, 1964: 31.0, 1965: 31.5, 1966: 32.4,
  1967: 33.4, 1968: 34.8, 1969: 36.7, 1970: 38.8, 1971: 40.5, 1972: 41.8,
  1973: 44.4, 1974: 49.3, 1975: 53.8, 1976: 56.9, 1977: 60.6, 1978: 65.2,
  1979: 72.6, 1980: 82.4, 1981: 90.9, 1982: 96.5, 1983: 99.6, 1984: 103.9,
  1985: 107.6, 1986: 109.6, 1987: 113.6, 1988: 118.3, 1989: 124.0, 1990: 130.7,
  1991: 136.2, 1992: 140.3, 1993: 144.5, 1994: 148.2, 1995: 152.4, 1996: 156.9,
  1997: 160.5, 1998: 163.0, 1999: 166.6, 2000: 172.2, 2001: 177.1, 2002: 179.9,
  2003: 184.0, 2004: 188.9, 2005: 195.3, 2006: 201.6, 2007: 207.3, 2008: 215.3,
  2009: 214.5, 2010: 218.1, 2011: 224.9, 2012: 229.6, 2013: 233.0, 2014: 236.7,
  2015: 237.0, 2016: 240.0, 2017: 245.1, 2018: 251.1, 2019: 255.7, 2020: 258.8,
  2021: 270.9, 2022: 292.7, 2023: 304.7, 2024: 314.0,
};

export interface HistoricalInflationResult {
  mode: 'historical';
  originalAmount: number;
  equivalentValue: number;
  additionalCost: number;
  cumulativeInflationPct: number;
  startYear: number;
  endYear: number;
  startCPI: number;
  endCPI: number;
}

export interface FutureInflationResult {
  mode: 'projection';
  originalAmount: number;
  equivalentFutureCost: number;
  additionalCost: number;
  cumulativeInflationPct: number;
  purchasingPower: number;
  years: number;
  rate: number;
  yearlyData: { year: number; value: number; cumulativePct: number }[];
}

/**
 * Pure calculation function strictly mirroring components/tools/InflationCalculator.tsx.
 * Computes historical BLS CPI-U inflation between two years.
 */
export function calculateHistoricalInflation(
  amount: number,
  startYear: number,
  endYear: number
): HistoricalInflationResult | { error: string } {
  if (!Number.isFinite(amount) || amount <= 0) return { error: 'Amount must be greater than 0.' };
  if (!CPI_DATA[startYear] || !CPI_DATA[endYear]) return { error: 'CPI data not available for selected years.' };

  const startCPI = CPI_DATA[startYear];
  const endCPI   = CPI_DATA[endYear];

  if (startYear === endYear) {
    return {
      mode: 'historical',
      originalAmount: amount,
      equivalentValue: amount,
      additionalCost: 0,
      cumulativeInflationPct: 0,
      startYear,
      endYear,
      startCPI,
      endCPI,
    };
  }

  const equivalentValue = amount * (endCPI / startCPI);
  const additionalCost  = equivalentValue - amount;
  const cumulativeInflationPct = (additionalCost / amount) * 100;

  return {
    mode: 'historical',
    originalAmount: amount,
    equivalentValue,
    additionalCost,
    cumulativeInflationPct,
    startYear,
    endYear,
    startCPI,
    endCPI,
  };
}

/**
 * Pure calculation function strictly mirroring components/tools/InflationCalculator.tsx.
 * Projects future cost, cumulative inflation, and purchasing power under an assumed annual rate.
 */
export function calculateFutureInflation(
  amount: number,
  years: number,
  ratePct: number
): FutureInflationResult | { error: string } {
  if (!Number.isFinite(amount) || amount <= 0) return { error: 'Amount must be greater than 0.' };
  if (!Number.isFinite(years) || years < 1 || !Number.isInteger(years)) return { error: 'Years must be a whole number ≥ 1.' };
  if (!Number.isFinite(ratePct)) return { error: 'Inflation rate must be a valid number.' };

  const base = 1 + ratePct / 100;
  if (base <= 0) return { error: 'Inflation rate is too negative — result would be mathematically undefined.' };

  const equivalentFutureCost  = amount * Math.pow(base, years);
  const additionalCost         = equivalentFutureCost - amount;
  const cumulativeInflationPct = (additionalCost / amount) * 100;
  const purchasingPower        = amount / Math.pow(base, years);

  const yearlyData = Array.from({ length: years }, (_, i) => {
    const y = i + 1;
    const val = amount * Math.pow(base, y);
    return { year: y, value: val, cumulativePct: ((val - amount) / amount) * 100 };
  });

  return {
    mode: 'projection',
    originalAmount: amount,
    equivalentFutureCost,
    additionalCost,
    cumulativeInflationPct,
    purchasingPower,
    years,
    rate: ratePct,
    yearlyData,
  };
}

/* ── Formatting Helpers ─────────────────────────────────────────────────── */

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

export function formatPercent(val: number): string {
  if (!Number.isFinite(val)) return '0.00%';
  return (val >= 0 ? '+' : '') + val.toFixed(2) + '%';
}

export function formatNumber(val: number): string {
  if (!Number.isFinite(val)) return '0';
  return val.toLocaleString('en-US');
}

/* ── Internationalized Content Dictionary ──────────────────────────────── */

export interface InflationScenarioCardContent {
  title: string;
  description: string;
  badge: string;
}

export interface InflationScenariosSectionContent {
  heading: string;
  intro: string;
  viewAll: string;
  cards: {
    purchasingPower: InflationScenarioCardContent;
    priceRise: InflationScenarioCardContent;
    savingsGoal: InflationScenarioCardContent;
  };
}

export const INFLATION_SCENARIOS_SECTION_I18N: Record<Locale, InflationScenariosSectionContent> = {
  en: {
    heading: 'Inflation Calculator Scenarios and Examples',
    intro:
      'These scenarios demonstrate how an assumed annual inflation rate and time period affect purchasing power, future prices, and savings targets based on compound inflation principles.',
    viewAll: 'View All Inflation Calculator Scenarios',
    cards: {
      purchasingPower: {
        title: 'How Inflation Reduces Purchasing Power',
        description:
          'Learn how a fixed dollar amount buys fewer goods and services over time and how to calculate real purchasing power at an assumed inflation rate.',
        badge: 'Purchasing Power',
      },
      priceRise: {
        title: 'How Much Will Prices Rise Over Time?',
        description:
          'Project how current living expenses and product costs change over 5 to 30 years under constant annual inflation assumptions.',
        badge: 'Future Cost',
      },
      savingsGoal: {
        title: 'Inflation-Adjusted Savings Goal',
        description:
          'Discover why a future savings target must be adjusted upward to preserve today’s buying power and avoid a purchasing power shortfall.',
        badge: 'Savings Targets',
      },
    },
  },
  es: {
    heading: 'Escenarios y Ejemplos de la Calculadora de Inflación',
    intro:
      'Estos escenarios muestran cómo una tasa de inflación anual estimada y un plazo influyen en el poder adquisitivo, los precios futuros y las metas de ahorro.',
    viewAll: 'Ver Todos los Escenarios de la Calculadora de Inflación',
    cards: {
      purchasingPower: {
        title: 'Cómo Reduce la Inflación el Poder Adquisitivo',
        description:
          'Vea cómo una cantidad fija de dinero compra menos bienes a lo largo del tiempo y cómo estimar el poder adquisitivo real.',
        badge: 'Poder Adquisitivo',
      },
      priceRise: {
        title: '¿Cuánto Subirán los Precios con el Tiempo?',
        description:
          'Proyecte cómo aumentan los costos de vida y productos en un período de 5 a 30 años según tasas de inflación supuestas.',
        badge: 'Costo Futuro',
      },
      savingsGoal: {
        title: 'Meta de Ahorro Ajustada por Inflación',
        description:
          'Comprenda por qué el objetivo de ahorro futuro debe ser mayor al actual para mantener el mismo poder de compra.',
        badge: 'Metas de Ahorro',
      },
    },
  },
  de: {
    heading: 'Inflationsrechner-Szenarien und Praxisbeispiele',
    intro:
      'Diese Szenarien veranschaulichen, wie sich eine angenommene jährliche Inflationsrate und der Zeithorizont auf Kaufkraft, zukünftige Preise und Sparziele auswirken.',
    viewAll: 'Alle Inflationsrechner-Szenarien ansehen',
    cards: {
      purchasingPower: {
        title: 'Wie Inflation die Kaufkraft mindert',
        description:
          'Erfahren Sie, wie ein fester Geldbetrag mit der Zeit an realem Wert verliert und wie reale Kaufkraft berechnet wird.',
        badge: 'Kaufkraft',
      },
      priceRise: {
        title: 'Wie stark steigen die Preise im Laufe der Zeit?',
        description:
          'Simulieren Sie, wie sich heutige Lebenshaltungskosten über 5 bis 30 Jahre bei konstanter Inflationsannahme verändern.',
        badge: 'Zukunftskosten',
      },
      savingsGoal: {
        title: 'Inflationsbereinigtes Sparziel',
        description:
          'Verstehen Sie, warum ein Sparziel in der Zukunft höher sein muss, um die heutige reale Kaufkraft zu erhalten.',
        badge: 'Sparziele',
      },
    },
  },
  fr: {
    heading: 'Scénarios et Exemples du Simulateur d’Inflation',
    intro:
      'Ces scénarios illustrent l’impact d’un taux d’inflation annuel supposé et de la durée sur le pouvoir d’achat, les prix futurs et les objectifs d’épargne.',
    viewAll: 'Voir Tous les Scénarios du Simulateur d’Inflation',
    cards: {
      purchasingPower: {
        title: 'Comment l’Inflation Réduit le Pouvoir d’Achat',
        description:
          'Découvrez comment une somme fixe perd de sa valeur réelle dans le temps et comment estimer votre pouvoir d’achat futur.',
        badge: 'Pouvoir d’Achat',
      },
      priceRise: {
        title: 'De Combien les Prix Vont-ils Augmenter avec le Temps ?',
        description:
          'Projetez l’évolution de vos dépenses et du coût de la vie sur 5 à 30 ans selon différents taux d’inflation.',
        badge: 'Coût Futur',
      },
      savingsGoal: {
        title: 'Objectif d’Épargne Ajusté à l’Inflation',
        description:
          'Comprenez pourquoi un objectif d’épargne futur doit être revu à la hausse pour préserver votre pouvoir d’achat réel.',
        badge: 'Objectif d’Épargne',
      },
    },
  },
  pt: {
    heading: 'Cenários e Exemplos da Calculadora de Inflação',
    intro:
      'Estes cenários demonstram como uma taxa de inflação anual presumida e o tempo afetam o poder de compra, preços futuros e metas de poupança.',
    viewAll: 'Ver Todos os Cenários da Calculadora de Inflação',
    cards: {
      purchasingPower: {
        title: 'Como a Inflação Reduz o Poder de Compra',
        description:
          'Entenda como um valor monetário fixo adquire menos produtos ao longo do tempo e como calcular o poder de compra real.',
        badge: 'Poder de Compra',
      },
      priceRise: {
        title: 'Quanto os Preços Vão Subir ao Longo do Tempo?',
        description:
          'Projete como custos de vida e despesas atuais mudam em prazos de 5 a 30 anos com base na inflação estimada.',
        badge: 'Custo Futuro',
      },
      savingsGoal: {
        title: 'Meta de Poupança Ajustada pela Inflação',
        description:
          'Descubra por que sua meta financeira futura precisa ser maior do que a de hoje para preservar o poder de compra.',
        badge: 'Metas Financeiras',
      },
    },
  },
  ja: {
    heading: 'インフレ計算機のシナリオと試算事例',
    intro:
      '想定インフレ率と期間が将来の購買力、物価の上昇、貯蓄目標額にどのような影響を与えるかを具体的にシミュレーションします。',
    viewAll: 'インフレ計算機の全シナリオを見る',
    cards: {
      purchasingPower: {
        title: 'インフレが購買力を低下させる仕組み',
        description:
          '一定の金額が時間経過とともにどれほど価値を減じるか、想定インフレ率に基づく実質購買力の試算方法を解説します。',
        badge: '購買力の推移',
      },
      priceRise: {
        title: '時間の経過とともに物価はどれくらい上昇するか？',
        description:
          '現在の生活費や商品の価格が、5年〜30年の期間でどのように増加するかを将来予測モデルで試算します。',
        badge: '将来コスト',
      },
      savingsGoal: {
        title: 'インフレ調整後の貯蓄目標額',
        description:
          '将来の購買力を維持するために、額面上の貯蓄目標額をどれだけ引き上げる必要があるかを明らかにします。',
        badge: '貯蓄目標',
      },
    },
  },
};
