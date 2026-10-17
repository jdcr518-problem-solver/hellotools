import { Locale } from '@/lib/i18n';

/* ── Retirement Savings Calculation Utility ──────────────────────────────── */
/*
 * Mirrors the exact formula used in RetirementSavingsCalculator (FinanceTools.tsx).
 * Do NOT alter the arithmetic — it must match the live calculator identically.
 *
 * Formula:
 *   r     = annualRatePct / 12 / 100          (monthly interest rate)
 *   months = (retirementAge − currentAge) × 12
 *   FV    = currentSavings × (1 + r)^months
 *           + monthlyContribution × ((1 + r)^months − 1) / r
 *
 * When r === 0:
 *   FV = currentSavings + monthlyContribution × months
 *
 * Result is a NOMINAL future value (not inflation-adjusted).
 */
export interface RetirementResult {
  nestEgg: number;       // nominal future value, rounded to 2 dp
  months: number;        // total compounding months
  years: number;         // time horizon in years
  totalContributions: number; // currentSavings + monthlyContribution * months
  totalGrowth: number;   // nestEgg − totalContributions
}

export function calcRetirementNestEgg(
  currentAge: number,
  retirementAge: number,
  currentSavings: number,
  monthlyContribution: number,
  annualRatePct: number
): RetirementResult {
  const years = Math.max(0, retirementAge - currentAge);
  const months = years * 12;
  const r = (annualRatePct / 12) / 100;

  let total = currentSavings;

  if (r === 0) {
    total = currentSavings + monthlyContribution * months;
  } else {
    const savingsGrowth = currentSavings * Math.pow(1 + r, months);
    const annuityGrowth = monthlyContribution * ((Math.pow(1 + r, months) - 1) / r);
    total = savingsGrowth + annuityGrowth;
  }

  const nestEgg = Math.round(total * 100) / 100;
  const totalContributions = Math.round((currentSavings + monthlyContribution * months) * 100) / 100;
  const totalGrowth = Math.round((nestEgg - totalContributions) * 100) / 100;

  return { nestEgg, months, years, totalContributions, totalGrowth };
}

/**
 * Inflation-adjusted (real) purchasing power of a future nominal amount.
 * Formula: Real = Nominal ÷ (1 + inflationRatePct/100)^years
 */
export function inflationAdjustedRetirement(
  nominalFutureValue: number,
  inflationRatePct: number,
  years: number
): number {
  return Math.round((nominalFutureValue / Math.pow(1 + inflationRatePct / 100, years)) * 100) / 100;
}

/* ── Currency Formatter ───────────────────────────────────────────────────── */

export function formatRetirementValue(amount: number, decimals = 0): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
}

/* ── Section i18n Types ───────────────────────────────────────────────────── */

export interface RetirementScenarioSectionI18n {
  heading: string;
  intro: string;
  viewAll: string;
  cards: {
    nestedEgg: { title: string; description: string; badge: string };
    monthlyContribution: { title: string; description: string; badge: string };
    inflation: { title: string; description: string; badge: string };
  };
}

/* ── Localized Section Content ────────────────────────────────────────────── */

export const RETIREMENT_SCENARIOS_SECTION_I18N: Record<Locale, RetirementScenarioSectionI18n> = {
  en: {
    heading: 'Retirement Savings Calculator Scenarios and Examples',
    intro:
      'The examples below demonstrate how current savings balance, monthly contribution amount, time horizon (years until retirement), and expected annual return rate interact to affect your projected retirement nest egg. Every scenario is computed using the same monthly-compounding formula as the live Retirement Savings Calculator.',
    viewAll: 'View All Retirement Savings Scenarios',
    cards: {
      nestedEgg: {
        title: 'How Much Do I Need to Save for Retirement?',
        description:
          'See how different monthly contribution levels—from $100 to $750 per month—affect the projected nest egg when starting at age 30 with $5,000 and a 7% annual return over 35 years.',
        badge: 'Nest Egg Target',
      },
      monthlyContribution: {
        title: 'How Much Should I Save Each Month for Retirement?',
        description:
          'Understand how starting age changes the required monthly savings and final nest egg when contributing $300 per month with $5,000 in existing savings at 7% annual return.',
        badge: 'Monthly Savings',
      },
      inflation: {
        title: 'How Inflation Changes Your Retirement Savings Target',
        description:
          'Explore the difference between the nominal nest egg projected by the calculator and its real inflation-adjusted purchasing power across 20 to 40-year retirement horizons.',
        badge: 'Inflation Impact',
      },
    },
  },
  es: {
    heading: 'Escenarios y Ejemplos de la Calculadora de Ahorro para Jubilación',
    intro:
      'Los ejemplos a continuación muestran cómo el saldo actual, la aportación mensual, el horizonte temporal y la tasa de rendimiento esperada afectan el patrimonio proyectado para la jubilación.',
    viewAll: 'Ver todos los escenarios de ahorro para jubilación',
    cards: {
      nestedEgg: {
        title: '¿Cuánto necesito ahorrar para jubilarme?',
        description:
          'Descubre cómo distintos niveles de aportación mensual (de $100 a $750) afectan el patrimonio proyectado comenzando a los 30 años con $5,000 y un rendimiento anual del 7%.',
        badge: 'Meta de patrimonio',
      },
      monthlyContribution: {
        title: '¿Cuánto debería ahorrar cada mes para la jubilación?',
        description:
          'Entiende cómo la edad de inicio influye en el patrimonio final cuando aportas $300 al mes con $5,000 de ahorro inicial y un 7% de rendimiento anual.',
        badge: 'Ahorro mensual',
      },
      inflation: {
        title: 'Cómo la inflación cambia tu objetivo de ahorro para jubilación',
        description:
          'Explora la diferencia entre el patrimonio nominal proyectado y su poder adquisitivo real ajustado por inflación en horizontes de 20 a 40 años.',
        badge: 'Impacto de la inflación',
      },
    },
  },
  de: {
    heading: 'Altersvorsorge-Szenarien und Praxisbeispiele',
    intro:
      'Die folgenden Beispiele veranschaulichen, wie aktuelles Guthaben, monatliche Sparrate, Anlagehorizont und erwartete jährliche Rendite das prognostizierte Rentenvermögen beeinflussen.',
    viewAll: 'Alle Altersvorsorge-Szenarien anzeigen',
    cards: {
      nestedEgg: {
        title: 'Wie viel muss ich für die Rente sparen?',
        description:
          'Erfahren Sie, wie verschiedene monatliche Sparraten (von 100 € bis 750 €) das prognostizierte Rentenvermögen ab dem 30. Lebensjahr mit 5.000 € Startguthaben bei 7 % Rendite beeinflussen.',
        badge: 'Rentenvermögen',
      },
      monthlyContribution: {
        title: 'Wie viel sollte ich monatlich für die Rente sparen?',
        description:
          'Verstehen Sie, wie das Einstiegsalter das Endguthaben beeinflusst, wenn Sie monatlich 300 € mit 5.000 € Startguthaben bei 7 % Rendite ansparen.',
        badge: 'Monatsrate',
      },
      inflation: {
        title: 'Wie Inflation Ihr Rentenziel verändert',
        description:
          'Vergleichen Sie den nominalen Prognosewert mit der inflationsbereinigten Kaufkraft über 20 bis 40-jährige Anlagehorizonte.',
        badge: 'Inflationseffekt',
      },
    },
  },
  fr: {
    heading: 'Scénarios et Exemples du Calculateur d\'Épargne Retraite',
    intro:
      'Les exemples ci-dessous illustrent comment le solde d\'épargne actuel, le versement mensuel, l\'horizon temporel et le taux de rendement annuel attendu influencent le capital retraite projeté.',
    viewAll: 'Voir tous les scénarios d\'épargne retraite',
    cards: {
      nestedEgg: {
        title: 'De combien ai-je besoin pour ma retraite ?',
        description:
          'Découvrez comment différents niveaux de versement mensuel (de 100 $ à 750 $) affectent le capital retraite projeté à partir de 30 ans, avec 5 000 $ d\'épargne initiale et un rendement de 7 % par an.',
        badge: 'Capital retraite',
      },
      monthlyContribution: {
        title: 'Combien dois-je épargner chaque mois pour la retraite ?',
        description:
          'Comprenez comment l\'âge de départ influe sur le capital final avec 300 $ de versement mensuel, 5 000 $ d\'épargne initiale et un rendement annuel de 7 %.',
        badge: 'Épargne mensuelle',
      },
      inflation: {
        title: 'Comment l\'inflation modifie votre objectif d\'épargne retraite',
        description:
          'Explorez la différence entre le capital nominal projeté et son pouvoir d\'achat réel ajusté à l\'inflation sur des horizons de 20 à 40 ans.',
        badge: 'Impact de l\'inflation',
      },
    },
  },
  pt: {
    heading: 'Cenários e Exemplos da Calculadora de Poupança para Aposentadoria',
    intro:
      'Os exemplos abaixo mostram como o saldo atual, o aporte mensal, o horizonte de tempo e a taxa de retorno anual esperada afetam o patrimônio projetado para a aposentadoria.',
    viewAll: 'Ver todos os cenários de poupança para aposentadoria',
    cards: {
      nestedEgg: {
        title: 'Quanto preciso poupar para me aposentar?',
        description:
          'Veja como diferentes níveis de aporte mensal (de R$100 a R$750) afetam o patrimônio projetado ao começar aos 30 anos com R$5.000 e rendimento anual de 7%.',
        badge: 'Meta de patrimônio',
      },
      monthlyContribution: {
        title: 'Quanto devo poupar por mês para a aposentadoria?',
        description:
          'Entenda como a idade de início influencia o patrimônio final ao contribuir R$300/mês com R$5.000 em poupança existente a 7% ao ano.',
        badge: 'Poupança mensal',
      },
      inflation: {
        title: 'Como a inflação muda sua meta de poupança para aposentadoria',
        description:
          'Explore a diferença entre o patrimônio nominal projetado e seu poder de compra real ajustado pela inflação em horizontes de 20 a 40 anos.',
        badge: 'Impacto da inflação',
      },
    },
  },
  ja: {
    heading: '老後の貯蓄シミュレーションと具体例',
    intro:
      '以下の例では、現在の貯蓄残高・毎月の積立額・積立期間・期待年利が老後の資産見込みにどのような影響を与えるかを示します。すべてのシナリオは老後の貯蓄計算ツールと同じ月複利計算式を使用しています。',
    viewAll: 'すべての老後の貯蓄シミュレーションを見る',
    cards: {
      nestedEgg: {
        title: '老後に必要な貯蓄はいくらですか？',
        description:
          '毎月100ドル〜750ドルの積立額が、30歳スタート・初期貯蓄5,000ドル・年利7%で35年後の資産にどう影響するかを確認します。',
        badge: '老後の目標資産',
      },
      monthlyContribution: {
        title: '老後のために毎月いくら積み立てるべきですか？',
        description:
          '初期貯蓄5,000ドル・毎月300ドル積立・年利7%の条件で、積立開始年齢が最終資産にどう影響するかを比較します。',
        badge: '毎月の積立額',
      },
      inflation: {
        title: 'インフレが老後の貯蓄目標を変える理由',
        description:
          '計算ツールが示す名目資産と、20〜40年後のインフレ調整済みの実質購買力の差を確認します。',
        badge: 'インフレの影響',
      },
    },
  },
};
