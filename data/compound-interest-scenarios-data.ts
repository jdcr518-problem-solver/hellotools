import { Locale } from '@/lib/i18n';

/* ── Pure Calculation Utilities ───────────────────────────────────────────── */

/**
 * Compound interest formula: A = P * (1 + r/n)^(n*t)
 * - P  : principal (initial lump sum)
 * - r  : nominal annual rate as a decimal (e.g. 0.07 for 7%)
 * - n  : compounding frequency per year (1, 4, 12, 365…)
 * - t  : time in years
 *
 * Matches the exact formula and rounding used by CompoundInterestCalculator
 * in components/tools/FinanceTools.tsx.
 */
export function calcCompoundInterest(
  principal: number,
  annualRatePct: number,
  frequencyPerYear: number,
  years: number
): { total: number; interest: number } {
  const r = annualRatePct / 100;
  const A = principal * Math.pow(1 + r / frequencyPerYear, frequencyPerYear * years);
  const total = Math.round(A * 100) / 100;
  const interest = Math.round((total - principal) * 100) / 100;
  return { total, interest };
}

/**
 * Inflation-adjusted (real) value of a future nominal amount.
 * Uses the same rounding convention as calcCompoundInterest.
 */
export function inflationAdjusted(nominalFutureValue: number, inflationRatePct: number, years: number): number {
  return Math.round((nominalFutureValue / Math.pow(1 + inflationRatePct / 100, years)) * 100) / 100;
}

/* ── Currency Formatter ───────────────────────────────────────────────────── */

export function formatCIValue(amount: number, decimals = 2): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
}

/* ── Section i18n Types ───────────────────────────────────────────────────── */

export interface CIScenarioSectionI18n {
  heading: string;
  intro: string;
  viewAll: string;
  cards: {
    growthOverTime: { title: string; description: string; badge: string };
    compoundingFrequency: { title: string; description: string; badge: string };
    inflationAdjusted: { title: string; description: string; badge: string };
  };
}

/* ── Localized Section Content ────────────────────────────────────────────── */

export const CI_SCENARIOS_SECTION_I18N: Record<Locale, CIScenarioSectionI18n> = {
  en: {
    heading: 'Compound Interest Calculator Scenarios and Examples',
    intro:
      'The examples below show how starting capital, annual interest rate, compounding frequency, and investment horizon interact to produce very different outcomes. Each scenario uses a fixed, worked numerical example so you can follow the calculation step by step.',
    viewAll: 'View All Compound Interest Scenarios',
    cards: {
      growthOverTime: {
        title: 'How Much Will a Lump-Sum Investment Grow Over Time?',
        description:
          'See how a single initial deposit of $10,000 at 7% annual rate compounds monthly over 5, 10, 15, and 20 years.',
        badge: 'Growth',
      },
      compoundingFrequency: {
        title: 'How Compounding Frequency Affects Your Final Balance',
        description:
          'Compare the end balance of the same principal at the same rate when compounded annually, quarterly, monthly, and daily.',
        badge: 'Frequency',
      },
      inflationAdjusted: {
        title: 'How Inflation Changes the Future Value of Your Money',
        description:
          'Understand the difference between nominal future value and real purchasing power after adjusting for a 3% annual inflation rate.',
        badge: 'Inflation',
      },
    },
  },
  es: {
    heading: 'Escenarios y Ejemplos de la Calculadora de Interés Compuesto',
    intro:
      'Los ejemplos a continuación muestran cómo el capital inicial, la tasa de interés, la frecuencia de capitalización y el plazo interactúan para generar resultados muy distintos.',
    viewAll: 'Ver todos los escenarios de interés compuesto',
    cards: {
      growthOverTime: {
        title: '¿Cuánto crece una inversión única a lo largo del tiempo?',
        description:
          'Observa cómo $10.000 al 7% anual, capitalizado mensualmente, evoluciona durante 5, 10, 15 y 20 años.',
        badge: 'Crecimiento',
      },
      compoundingFrequency: {
        title: '¿Cómo afecta la frecuencia de capitalización al saldo final?',
        description:
          'Compara el resultado de capitalizar el mismo capital al mismo tipo de interés de forma anual, trimestral, mensual y diaria.',
        badge: 'Frecuencia',
      },
      inflationAdjusted: {
        title: '¿Cómo modifica la inflación el valor futuro de tu dinero?',
        description:
          'Distingue el valor futuro nominal del poder adquisitivo real tras ajustar por una inflación anual del 3%.',
        badge: 'Inflación',
      },
    },
  },
  de: {
    heading: 'Zinseszins-Szenarien und Praxisbeispiele',
    intro:
      'Die folgenden Beispiele zeigen, wie Startkapital, Zinssatz, Zinsperiode und Anlagedauer in Kombination zu sehr unterschiedlichen Ergebnissen führen.',
    viewAll: 'Alle Zinseszins-Szenarien anzeigen',
    cards: {
      growthOverTime: {
        title: 'Wie wächst eine Einmalanlage über die Zeit?',
        description:
          'Beobachten Sie, wie 10.000 € bei 7 % p. a. und monatlichem Zinseszins nach 5, 10, 15 und 20 Jahren wächst.',
        badge: 'Wachstum',
      },
      compoundingFrequency: {
        title: 'Wie beeinflusst die Zinsperiode das Endkapital?',
        description:
          'Vergleichen Sie das Ergebnis desselben Kapitals beim gleichen Zinssatz mit jährlicher, vierteljährlicher, monatlicher und täglicher Verzinsung.',
        badge: 'Zinsperiode',
      },
      inflationAdjusted: {
        title: 'Wie verändert Inflation den zukünftigen Wert Ihres Geldes?',
        description:
          'Verstehen Sie den Unterschied zwischen nominalem Endwert und realem Kaufkraftwert nach 3 % jährlicher Inflation.',
        badge: 'Inflation',
      },
    },
  },
  fr: {
    heading: 'Scénarios et Exemples du Calculateur d\'Intérêts Composés',
    intro:
      'Les exemples ci-dessous montrent comment le capital de départ, le taux d\'intérêt, la fréquence de capitalisation et l\'horizon de placement interagissent pour produire des résultats très différents.',
    viewAll: 'Voir tous les scénarios d\'intérêts composés',
    cards: {
      growthOverTime: {
        title: 'Combien rapporte un placement unique sur la durée ?',
        description:
          'Observez comment 10 000 € à 7 % par an, capitalisés mensuellement, évoluent sur 5, 10, 15 et 20 ans.',
        badge: 'Croissance',
      },
      compoundingFrequency: {
        title: 'Comment la fréquence de capitalisation influe-t-elle sur le capital final ?',
        description:
          'Comparez le résultat du même capital au même taux selon une capitalisation annuelle, trimestrielle, mensuelle et quotidienne.',
        badge: 'Fréquence',
      },
      inflationAdjusted: {
        title: 'Comment l\'inflation modifie-t-elle la valeur future de votre argent ?',
        description:
          'Distinguez la valeur nominale future du pouvoir d\'achat réel après prise en compte d\'une inflation annuelle de 3 %.',
        badge: 'Inflation',
      },
    },
  },
  pt: {
    heading: 'Cenários e Exemplos da Calculadora de Juros Compostos',
    intro:
      'Os exemplos abaixo mostram como o capital inicial, a taxa de juros, a frequência de capitalização e o horizonte de investimento interagem para gerar resultados muito diferentes.',
    viewAll: 'Ver todos os cenários de juros compostos',
    cards: {
      growthOverTime: {
        title: 'Quanto cresce um investimento único ao longo do tempo?',
        description:
          'Veja como R$ 10.000 a 7% ao ano, capitalizados mensalmente, evoluem em 5, 10, 15 e 20 anos.',
        badge: 'Crescimento',
      },
      compoundingFrequency: {
        title: 'Como a frequência de capitalização afeta o saldo final?',
        description:
          'Compare o resultado do mesmo capital à mesma taxa com capitalização anual, trimestral, mensal e diária.',
        badge: 'Frequência',
      },
      inflationAdjusted: {
        title: 'Como a inflação altera o valor futuro do seu dinheiro?',
        description:
          'Entenda a diferença entre o valor futuro nominal e o poder de compra real após ajuste por inflação anual de 3%.',
        badge: 'Inflação',
      },
    },
  },
  ja: {
    heading: '複利計算ツール — シミュレーションと具体例',
    intro:
      '以下の例では、元本・年利・複利計算頻度・運用期間の組み合わせによって最終残高がどのように大きく変わるかを示します。各シナリオには具体的な数値例を掲載しています。',
    viewAll: 'すべての複利シミュレーションを見る',
    cards: {
      growthOverTime: {
        title: '一括投資は時間とともにどれほど成長するか？',
        description:
          '元本1万ドルを年利7%・月次複利で5年・10年・15年・20年運用した場合の残高推移を確認します。',
        badge: '成長',
      },
      compoundingFrequency: {
        title: '複利計算の頻度はどのように最終残高に影響するか？',
        description:
          '同じ元本・同じ金利で、年1回・四半期・月次・日次と複利頻度を変えた場合の最終残高を比較します。',
        badge: '複利頻度',
      },
      inflationAdjusted: {
        title: 'インフレはお金の将来価値をどう変えるか？',
        description:
          '名目上の将来価値と、年率3%のインフレを考慮した実質購買力の違いを確認します。',
        badge: 'インフレ',
      },
    },
  },
};
