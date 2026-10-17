import { Locale } from '@/lib/i18n';

/* ── Pure Calculation Utilities (Reused from SavingsGoalCalculator.tsx) ──── */

export interface MonthlyBreakdown {
  month: number;
  deposit: number;
  interestEarned: number;
  totalInterest: number;
  balance: number;
}

export interface SimulationResult {
  months: number;
  deposits: number;
  interest: number;
  balance: number;
  breakdown: MonthlyBreakdown[];
}

export interface RequiredDepositResult extends SimulationResult {
  requiredDeposit: number;
}

/**
 * Calculates the monthly interest factor based on APR and compound frequency.
 * Exactly matches getMonthlyInterestFactor in SavingsGoalCalculator.tsx.
 */
export function getMonthlyInterestFactor(apr: number, freq: number): number {
  const r = apr / 100;
  if (r === 0) return 0;
  return Math.pow(1 + r / freq, freq / 12) - 1;
}

/**
 * Simulates month-by-month savings timeline to reach a goal.
 * Exactly matches simulateTimeline in SavingsGoalCalculator.tsx.
 */
export function simulateTimeline(
  goal: number,
  start: number,
  apr: number,
  freq: number,
  monthlySave: number
): SimulationResult {
  let balance = start;
  let totalInterest = 0;
  let t = 0;
  const tempBreakdown: MonthlyBreakdown[] = [];

  const mFactor = getMonthlyInterestFactor(apr, freq);

  if (balance >= goal) {
    return { months: 0, deposits: 0, interest: 0, balance, breakdown: [] };
  }

  while (balance < goal && t < 600) {
    t++;
    const interestThisMonth = Math.round(balance * mFactor * 100) / 100;
    totalInterest = Math.round((totalInterest + interestThisMonth) * 100) / 100;
    balance = Math.round((balance + interestThisMonth + monthlySave) * 100) / 100;

    tempBreakdown.push({
      month: t,
      deposit: monthlySave,
      interestEarned: interestThisMonth,
      totalInterest,
      balance,
    });
  }

  const totalSaved = start + monthlySave * t;

  return {
    months: t,
    deposits: totalSaved,
    interest: totalInterest,
    balance,
    breakdown: tempBreakdown,
  };
}

/**
 * Calculates the required regular monthly deposit to hit a target goal within a specified number of months.
 * Exactly matches binary search solver in SavingsGoalCalculator.tsx.
 */
export function calculateRequiredMonthlyDeposit(
  goal: number,
  start: number,
  apr: number,
  freq: number,
  targetMonths: number
): RequiredDepositResult {
  let low = 0;
  let high = goal;
  let bestDeposit = 0;

  for (let i = 0; i < 30; i++) {
    const mid = (low + high) / 2;
    const res = simulateTimeline(goal, start, apr, freq, mid);
    if (res.months <= targetMonths && res.months > 0) {
      bestDeposit = mid;
      high = mid;
    } else {
      low = mid;
    }
  }

  const roundedDeposit = Math.round(bestDeposit * 100) / 100;
  const res = simulateTimeline(goal, start, apr, freq, roundedDeposit);

  return {
    requiredDeposit: roundedDeposit,
    ...res,
  };
}

/**
 * Inflation-adjusted (real) value of a future nominal amount.
 * Reuses the same formula as compound-interest-scenarios-data.ts.
 */
export function inflationAdjusted(nominalFutureValue: number, inflationRatePct: number, years: number): number {
  return Math.round((nominalFutureValue / Math.pow(1 + inflationRatePct / 100, years)) * 100) / 100;
}

/* ── Currency Formatter ───────────────────────────────────────────────────── */

export function formatSavingsValue(amount: number, decimals = 2): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
}

/* ── Section i18n Types ───────────────────────────────────────────────────── */

export interface SavingsGoalScenarioSectionI18n {
  heading: string;
  intro: string;
  viewAll: string;
  cards: {
    monthlyDeposit: { title: string; description: string; badge: string };
    timeline: { title: string; description: string; badge: string };
    inflation: { title: string; description: string; badge: string };
  };
}

/* ── Localized Section Content ────────────────────────────────────────────── */

export const SAVINGS_GOAL_SCENARIOS_SECTION_I18N: Record<Locale, SavingsGoalScenarioSectionI18n> = {
  en: {
    heading: 'Savings Goal Calculator Scenarios and Examples',
    intro:
      'The examples below demonstrate how target amount, current savings, regular monthly contributions, time horizon, compounding frequency, and inflation interact to determine your savings progress. Every scenario is computed using the calculator’s verified monthly compounding algorithm.',
    viewAll: 'View All Savings Goal Scenarios',
    cards: {
      monthlyDeposit: {
        title: 'How Much Should I Save Each Month to Reach My Goal?',
        description:
          'Find the exact monthly contribution required to turn $1,000 in starting savings into a $10,000 target over 1, 2, 3, 4, or 5 years at 5% APY.',
        badge: 'Monthly Deposit',
      },
      timeline: {
        title: 'How Long Will It Take to Reach My Savings Goal?',
        description:
          'Compare how saving $100, $200, $300, or $500 each month accelerates the time required to accumulate a $10,000 goal with monthly compounding.',
        badge: 'Timeline',
      },
      inflation: {
        title: 'How Inflation Affects Your Savings Goal',
        description:
          'Learn the difference between reaching a nominal $10,000 goal and retaining its real purchasing power across multi-year timeframes.',
        badge: 'Inflation',
      },
    },
  },
  es: {
    heading: 'Escenarios y Ejemplos de la Calculadora de Meta de Ahorro',
    intro:
      'Los siguientes ejemplos muestran cómo el objetivo, el saldo inicial, las aportaciones mensuales, el plazo y la tasa de interés determinan tu avance de ahorro.',
    viewAll: 'Ver todos los escenarios de meta de ahorro',
    cards: {
      monthlyDeposit: {
        title: '¿Cuánto debería ahorrar cada mes para alcanzar mi meta?',
        description:
          'Calcula la aportación mensual necesaria para pasar de $1.000 a $10.000 en 1, 2, 3, 4 o 5 años al 5% de interés anual.',
        badge: 'Aporte mensual',
      },
      timeline: {
        title: '¿Cuánto tiempo tomará alcanzar mi meta de ahorro?',
        description:
          'Compara cómo aportar $100, $200, $300 o $500 al mes reduce el tiempo necesario para acumular $10.000.',
        badge: 'Plazo',
      },
      inflation: {
        title: 'Cómo afecta la inflación a tu meta de ahorro',
        description:
          'Descubre la diferencia entre una meta nominal de $10.000 y conservar el poder adquisitivo real en distintos plazos.',
        badge: 'Inflación',
      },
    },
  },
  de: {
    heading: 'Sparziel-Szenarien und Praxisbeispiele',
    intro:
      'Die folgenden Beispiele veranschaulichen, wie Sparziel, Startguthaben, monatliche Sparrate, Laufzeit und Zinssatz das Erreichen Ihres Ziels beeinflussen.',
    viewAll: 'Alle Sparziel-Szenarien anzeigen',
    cards: {
      monthlyDeposit: {
        title: 'Wie viel sollte ich monatlich sparen, um mein Ziel zu erreichen?',
        description:
          'Ermitteln Sie die erforderliche Monatsrate, um mit 1.000 € Startguthaben und 5 % Zinsen in 1 bis 5 Jahren 10.000 € zu erreichen.',
        badge: 'Monatsrate',
      },
      timeline: {
        title: 'Wie lange dauert es, bis ich mein Sparziel erreiche?',
        description:
          'Vergleichen Sie, wie Monatsraten von 100 €, 200 €, 300 € oder 500 € die Spardauer für 10.000 € verkürzen.',
        badge: 'Spardauer',
      },
      inflation: {
        title: 'Wie Inflation Ihr Sparziel beeinflusst',
        description:
          'Verstehen Sie den Unterschied zwischen einem nominalen Sparziel von 10.000 € und der realen Kaufkraft über mehrere Jahre.',
        badge: 'Inflation',
      },
    },
  },
  fr: {
    heading: 'Scénarios et Exemples du Calculateur d\'Objectif d\'Épargne',
    intro:
      'Ces exemples illustrent l\'impact du montant cible, du capital initial, des versements mensuels, de la durée et du taux d\'intérêt sur votre plan d\'épargne.',
    viewAll: 'Voir tous les scénarios d\'objectif d\'épargne',
    cards: {
      monthlyDeposit: {
        title: 'Combien dois-je épargner chaque mois pour atteindre mon objectif ?',
        description:
          'Calculez l\'épargne mensuelle nécessaire pour atteindre 10 000 € à partir de 1 000 € en 1 à 5 ans avec un taux de 5 %.',
        badge: 'Versement mensuel',
      },
      timeline: {
        title: 'Combien de temps faudra-t-il pour atteindre mon objectif d\'épargne ?',
        description:
          'Comparez comment des versements de 100 €, 200 €, 300 € ou 500 € par mois réduisent la durée nécessaire pour accumuler 10 000 €.',
        badge: 'Durée',
      },
      inflation: {
        title: 'Comment l\'inflation affecte votre objectif d\'épargne',
        description:
          'Comprenez la différence entre un objectif nominal de 10 000 € et son pouvoir d\'achat réel au fil des ans.',
        badge: 'Inflation',
      },
    },
  },
  pt: {
    heading: 'Cenários e Exemplos da Calculadora de Meta de Poupança',
    intro:
      'Os exemplos abaixo mostram como a meta, o saldo inicial, os aportes mensais, o prazo e a rentabilidade definem a evolução da sua poupança.',
    viewAll: 'Ver todos os cenários de meta de poupança',
    cards: {
      monthlyDeposit: {
        title: 'Quanto devo poupar por mês para atingir minha meta?',
        description:
          'Descubra o aporte mensal necessário para transformar R$ 1.000 em R$ 10.000 em 1, 2, 3, 4 ou 5 anos a 5% ao ano.',
        badge: 'Aporte mensal',
      },
      timeline: {
        title: 'Quanto tempo leva para atingir minha meta de poupança?',
        description:
          'Compare como aportes de R$ 100, R$ 200, R$ 300 ou R$ 500 reduzem o tempo para acumular R$ 10.000.',
        badge: 'Prazo',
      },
      inflation: {
        title: 'Como a inflação afeta sua meta de poupança',
        description:
          'Entenda a diferença entre atingir uma meta nominal de R$ 10.000 e manter o poder de compra real no longo prazo.',
        badge: 'Inflação',
      },
    },
  },
  ja: {
    heading: '目標貯金シミュレーションと具体例',
    intro:
      '以下の例では、目標額・初期貯蓄額・毎月の積立額・期間・利息・インフレが貯金の達成ペースにどのように影響するかを示します。',
    viewAll: 'すべての貯金目標シミュレーションを見る',
    cards: {
      monthlyDeposit: {
        title: '目標達成には毎月いくら貯金すればいいですか？',
        description:
          '初期残高1,000ドルから年利5%で1年〜5年で10,000ドルを達成するための必要積立額を試算します。',
        badge: '毎月の積立額',
      },
      timeline: {
        title: '貯金目標を達成するまでにどれくらいの期間がかかりますか？',
        description:
          '毎月100ドル、200ドル、300ドル、500ドルを積み立てた場合に10,000ドルに達するまでの月数を比較します。',
        badge: '達成期間',
      },
      inflation: {
        title: 'インフレは貯金目標にどう影響するか',
        description:
          '名目上の10,000ドル達成と、複数年後の実質的な購買力維持の違いを確認します。',
        badge: 'インフレ',
      },
    },
  },
};
