import { Locale } from '@/lib/i18n';

/* ── Pure Net Worth Calculation Types & Functions ─────────────────────────── */

export interface NetWorthInputs {
  // Assets
  cash: number;
  investments: number;
  realEstate: number;
  vehicles: number;
  retirement: number;
  otherAssets: number;

  // Liabilities
  mortgage: number;
  studentLoans: number;
  creditCards: number;
  carLoans: number;
  otherDebts: number;
}

export interface NetWorthResult {
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
  assetsToDebtRatio: number;
  isPositive: boolean;
}

/**
 * Pure net worth calculation function.
 * Strictly identical to components/tools/NetWorthCalculator.tsx.
 *
 * Formula:
 *   Total Assets = cash + investments + realEstate + vehicles + retirement + otherAssets
 *   Total Liabilities = mortgage + studentLoans + creditCards + carLoans + otherDebts
 *   Net Worth = Total Assets - Total Liabilities
 *   Debt Ratio = (Total Liabilities / Total Assets) * 100 (capped at 100%)
 */
export function calculateNetWorth(inputs: Partial<NetWorthInputs>): NetWorthResult {
  const val = (n: number | undefined) => (typeof n === 'number' && Number.isFinite(n) ? Math.max(0, n) : 0);

  const assetsSum =
    val(inputs.cash) +
    val(inputs.investments) +
    val(inputs.realEstate) +
    val(inputs.vehicles) +
    val(inputs.retirement) +
    val(inputs.otherAssets);

  const liabilitiesSum =
    val(inputs.mortgage) +
    val(inputs.studentLoans) +
    val(inputs.creditCards) +
    val(inputs.carLoans) +
    val(inputs.otherDebts);

  const result = assetsSum - liabilitiesSum;

  let debtRatio = 0;
  if (assetsSum === 0) {
    debtRatio = liabilitiesSum > 0 ? 100 : 0;
  } else {
    debtRatio = Math.min(100, (liabilitiesSum / assetsSum) * 100);
  }

  return {
    totalAssets: assetsSum,
    totalLiabilities: liabilitiesSum,
    netWorth: result,
    assetsToDebtRatio: debtRatio,
    isPositive: result >= 0,
  };
}

/* ── Formatters ──────────────────────────────────────────────────────────── */

export function formatCurrency(amount: number, decimals = 2): string {
  const isNegative = amount < 0;
  const absFormatted = Math.abs(amount).toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${isNegative ? '-' : ''}$${absFormatted}`;
}

export function formatNumber(amount: number): string {
  return new Intl.NumberFormat('en-US').format(Math.round(amount));
}

export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/* ── Section i18n Types ───────────────────────────────────────────────────── */

export interface NetWorthScenarioSectionI18n {
  heading: string;
  intro: string;
  viewAll: string;
  cards: {
    calculateNetWorth: { title: string; description: string; badge: string };
    debtImpact: { title: string; description: string; badge: string };
    savingsAndInvestments: { title: string; description: string; badge: string };
  };
}

/* ── Localized Section Content ────────────────────────────────────────────── */

export const NET_WORTH_SCENARIOS_SECTION_I18N: Record<Locale, NetWorthScenarioSectionI18n> = {
  en: {
    heading: 'Net Worth Calculator Scenarios and Examples',
    intro:
      'These practical scenarios demonstrate how your assets, liabilities, savings, and debt obligations interact to determine your net worth snapshot and debt-to-asset ratio. Every scenario is calculated using the exact formulas and supported balance-sheet inputs of our Net Worth Calculator.',
    viewAll: 'View All Net Worth Calculator Scenarios',
    cards: {
      calculateNetWorth: {
        title: 'How to Calculate Your Net Worth',
        description:
          'Learn how to inventory your liquid and fixed assets, sum up outstanding liabilities, and compute your total personal net worth snapshot step-by-step.',
        badge: 'Basics & Assets',
      },
      debtImpact: {
        title: 'How Debt Affects Your Net Worth',
        description:
          'Examine how mortgages, student loans, car debt, and credit card balances increase your debt ratio and directly reduce your personal net worth.',
        badge: 'Liabilities & Ratio',
      },
      savingsAndInvestments: {
        title: 'How Savings and Investments Affect Net Worth Over Time',
        description:
          'See how accumulating cash reserves, retirement accounts, and investment portfolios elevates your personal balance sheet across financial milestones.',
        badge: 'Wealth Building',
      },
    },
  },
  es: {
    heading: 'Escenarios y Ejemplos de la Calculadora de Patrimonio Neto',
    intro:
      'Estos escenarios prácticos demuestran cómo sus activos, pasivos, ahorros y deudas interactúan para determinar su patrimonio neto y ratio de endeudamiento, utilizando los campos exactos de nuestra calculadora.',
    viewAll: 'Ver Todos los Escenarios de la Calculadora de Patrimonio Neto',
    cards: {
      calculateNetWorth: {
        title: 'Cómo Calcular su Patrimonio Neto',
        description:
          'Aprenda a sumar sus activos líquidos y fijos, restar sus pasivos pendientes y obtener una estimación clara de su patrimonio personal.',
        badge: 'Cálculo Básico',
      },
      debtImpact: {
        title: 'Cómo Afecta la Deuda a su Patrimonio Neto',
        description:
          'Descubra cómo las hipotecas, préstamos estudiantiles y tarjetas de crédito incrementan su porcentaje de deuda y reducen su saldo patrimonial.',
        badge: 'Deudas y Pasivos',
      },
      savingsAndInvestments: {
        title: 'Cómo Influyen el Ahorro y las Inversiones en el Patrimonio Neto',
        description:
          'Analice cómo el crecimiento de cuentas bancarias, fondos de retiro y carteras de inversión fortalece su balance financiero a lo largo del tiempo.',
        badge: 'Crecimiento de Activos',
      },
    },
  },
  de: {
    heading: 'Nettovermögen-Rechner-Szenarien und Praxisbeispiele',
    intro:
      'Diese Szenarien veranschaulichen, wie Vermögenswerte, Verbindlichkeiten, Ersparnisse und Schulden das persönliche Nettovermögen und die Schuldenquote gemäß den exakten Eingabefeldern unseres Rechners bestimmen.',
    viewAll: 'Alle Nettovermögen-Rechner-Szenarien ansehen',
    cards: {
      calculateNetWorth: {
        title: 'Wie Sie Ihr Nettovermögen berechnen',
        description:
          'Erfahren Sie Schritt für Schritt, wie Sie liquide und feste Vermögenswerte erfassen, Schulden abziehen und Ihr Nettovermögen ermitteln.',
        badge: 'Grundlagen & Bilanz',
      },
      debtImpact: {
        title: 'Wie sich Schulden auf Ihr Nettovermögen auswirken',
        description:
          'Untersuchen Sie, wie Hypotheken, Studienkredite und Kreditkartenschulden Ihre Schuldenquote erhöhen und das Nettovermögen schmälern.',
        badge: 'Schulden & Verbindlichkeiten',
      },
      savingsAndInvestments: {
        title: 'Wie Sparen und Geldanlagen das Nettovermögen im Laufe der Zeit steigern',
        description:
          'Erkennen Sie, wie der systematische Aufbau von Bargeldreserven, Altersvorsorge und Wertpapieranlagen Ihre persönliche Vermögensbilanz stärkt.',
        badge: 'Vermögensaufbau',
      },
    },
  },
  fr: {
    heading: 'Scénarios et Exemples du Simulateur de Valeur Nette',
    intro:
      'Ces scénarios pratiques illustrent l’impact de vos actifs, passifs, épargnes et dettes sur votre patrimoine net et votre ratio d’endettement, d’après les données réelles de notre calculateur.',
    viewAll: 'Voir Tous les Scénarios du Simulateur de Valeur Nette',
    cards: {
      calculateNetWorth: {
        title: 'Comment Calculer Votre Valeur Nette Personnelle',
        description:
          'Découvrez comment inventorier vos actifs financiers et immobiliers, soustraire vos dettes et obtenir un bilan patrimonial clair et précis.',
        badge: 'Principes de Base',
      },
      debtImpact: {
        title: 'Comment la Dette Affecte Votre Valeur Nette',
        description:
          'Analysez comment les crédits immobiliers, prêts étudiants et dettes de cartes de crédit augmentent votre ratio de dette et diminuent votre valeur nette.',
        badge: 'Impact des Dettes',
      },
      savingsAndInvestments: {
        title: 'Comment l’Épargne et les Investissements Développent la Valeur Nette',
        description:
          'Observez comment l’accumulation de liquidités, de comptes de retraite et d’investissements renforce durablement votre bilan personnel.',
        badge: 'Enrichissement',
      },
    },
  },
  pt: {
    heading: 'Cenários e Exemplos da Calculadora de Patrimônio Líquido',
    intro:
      'Estes cenários práticos demonstram como ativos, passivos, economias e dívidas interagem para definir seu patrimônio líquido e índice de endividamento.',
    viewAll: 'Ver Todos os Cenários da Calculadora de Patrimônio Líquido',
    cards: {
      calculateNetWorth: {
        title: 'Como Calcular seu Patrimônio Líquido',
        description:
          'Aprenda a somar seus ativos líquidos e bens imobilizados, abater dívidas em aberto e calcular seu patrimônio pessoal passo a passo.',
        badge: 'Cálculo Básico',
      },
      debtImpact: {
        title: 'Como as Dívidas Afetam seu Patrimônio Líquido',
        description:
          'Entenda como financiamentos imobiliários, empréstimos estudantis e faturas de cartão elevam seu endividamento e reduzem sua riqueza real.',
        badge: 'Dívidas e Passivos',
      },
      savingsAndInvestments: {
        title: 'Como a Poupança e os Investimentos Aumentam o Patrimônio com o Tempo',
        description:
          'Veja como a reserva de emergência, previdência e carteiras de investimento valorizam o seu balanço patrimonial ao longo dos anos.',
        badge: 'Construção de Riqueza',
      },
    },
  },
  ja: {
    heading: '純資産計算機のシナリオと試算事例',
    intro:
      '保有資産、負債残高、貯蓄、ローンが個人の純資産スナップショットおよび負債比率に与える影響を、計算機の入力項目に基づいて分かりやすく検証します。',
    viewAll: '純資産計算機の全シナリオを見る',
    cards: {
      calculateNetWorth: {
        title: '純資産の基本的な計算方法と手順',
        description:
          '現金預金、投資口座、不動産、車両などの資産を合算し、各種ローンや債務を差し引いて正確な個人純資産を算出する手順を解説します。',
        badge: '基礎と計算手順',
      },
      debtImpact: {
        title: '負債と借入が純資産に与える影響の検証',
        description:
          '住宅ローン、教育ローン、自動車ローン、クレジットカード残高が資産に対する負債比率を押し上げ、純資産をどう圧縮するかを分析します。',
        badge: '負債と比率',
      },
      savingsAndInvestments: {
        title: '貯蓄と投資の積み上げが純資産を拡大する仕組み',
        description:
          '手元資金の貯蓄、確定拠出年金・退職金口座、投資信託などの資産形成が、時系列でどのように個人の貸借対照表を強化するかを比較します。',
        badge: '資産形成',
      },
    },
  },
};
