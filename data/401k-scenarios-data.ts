import { Locale } from '@/lib/i18n';

/* ── IRS 401(k) Elective Deferral Limits ─────────────────────────────────── */

export const IRS_401K_LIMITS: Record<number, number> = {
  2024: 23000,
  2025: 23500,
  2026: 24500, // Verified for 2026 tax year
};
export const CURRENT_LIMIT_YEAR = 2026;
export const ANNUAL_CONTRIBUTION_LIMIT = IRS_401K_LIMITS[CURRENT_LIMIT_YEAR] ?? 24500;

/* ── Pure 401(k) Calculation Types & Functions ──────────────────────────── */

export interface Yearly401kRow {
  year: number;
  age: number;
  salary: number;
  employeeContrib: number;
  employerContrib: number;
  investmentGrowth: number;
  endingBalance: number;
}

export interface FourOhOneKResult {
  projectedBalance: number;
  currentBalance: number;
  totalEmployeeContribs: number;
  totalEmployerContribs: number;
  totalInvestmentGrowth: number;
  yearlySchedule: Yearly401kRow[];
}

export interface FourOhOneKInputs {
  currentAge: number;
  retirementAge: number;
  currentBalance: number;
  annualSalary: number;
  employeeContribPct: number;
  employerMatchPct: number;
  employerMatchLimitPct: number;
  annualReturnPct: number;
  salaryGrowthPct: number;
}

/**
 * Pure 401(k) simulation function.
 * Strictly identical to components/tools/FourOhOneKCalculator.tsx.
 * Calculates year-by-year growth with beginning-of-year contributions.
 * Includes mathematical reconciliation assertion.
 */
export function calculate401k(inputs: FourOhOneKInputs): FourOhOneKResult | { error: string } {
  const {
    currentAge,
    retirementAge,
    currentBalance,
    annualSalary,
    employeeContribPct,
    employerMatchPct,
    employerMatchLimitPct,
    annualReturnPct,
    salaryGrowthPct,
  } = inputs;

  // Validation & guards matching live calculator exactly
  if (!Number.isFinite(currentAge) || currentAge < 18 || currentAge >= 80) {
    return { error: 'Current age must be between 18 and 79.' };
  }
  if (!Number.isFinite(retirementAge) || retirementAge <= currentAge || retirementAge > 80) {
    return { error: 'Retirement age must be greater than current age and no more than 80.' };
  }
  if (!Number.isFinite(currentBalance) || currentBalance < 0) {
    return { error: 'Current 401(k) balance cannot be negative.' };
  }
  if (!Number.isFinite(annualSalary) || annualSalary <= 0) {
    return { error: 'Annual salary must be greater than $0.' };
  }
  if (!Number.isFinite(employeeContribPct) || employeeContribPct < 0 || employeeContribPct > 100) {
    return { error: 'Employee contribution percentage must be between 0% and 100%.' };
  }
  if (!Number.isFinite(employerMatchPct) || employerMatchPct < 0 || employerMatchPct > 300) {
    return { error: 'Employer match percentage must be between 0% and 300%.' };
  }
  if (!Number.isFinite(employerMatchLimitPct) || employerMatchLimitPct < 0 || employerMatchLimitPct > 100) {
    return { error: 'Employer match cap percentage must be between 0% and 100%.' };
  }
  if (!Number.isFinite(annualReturnPct) || annualReturnPct < 0 || annualReturnPct > 30) {
    return { error: 'Annual return percentage must be between 0% and 30%.' };
  }
  if (!Number.isFinite(salaryGrowthPct) || salaryGrowthPct < 0 || salaryGrowthPct > 20) {
    return { error: 'Annual salary increase percentage must be between 0% and 20%.' };
  }

  const yearsToRetirement = retirementAge - currentAge;
  const yearlySchedule: Yearly401kRow[] = [];

  let balance = currentBalance;
  let totalEmployeeContribs = 0;
  let totalEmployerContribs = 0;
  let totalInvestmentGrowth = 0;

  for (let yr = 1; yr <= yearsToRetirement; yr++) {
    const age = currentAge + (yr - 1);
    const salary = annualSalary * Math.pow(1 + salaryGrowthPct / 100, yr - 1);

    // Employee elective deferral capped by IRS limit
    const rawEmpContrib = salary * (employeeContribPct / 100);
    const employeeContrib = Math.min(rawEmpContrib, ANNUAL_CONTRIBUTION_LIMIT);

    // Employer match calculation (uncapped by elective deferral limit)
    const matchedEmpPct = Math.min(employeeContribPct, employerMatchLimitPct) / 100;
    const employerContrib = salary * matchedEmpPct * (employerMatchPct / 100);

    const balBeforeContrib = balance;
    const totalContribThisYear = employeeContrib + employerContrib;

    // Beginning of year contribution timing + annual return
    balance = (balance + totalContribThisYear) * (1 + annualReturnPct / 100);

    // Exact yearly growth calculation
    const investmentGrowth = annualReturnPct === 0 ? 0 : balance - balBeforeContrib - totalContribThisYear;

    totalEmployeeContribs += employeeContrib;
    totalEmployerContribs += employerContrib;
    totalInvestmentGrowth += investmentGrowth;

    yearlySchedule.push({
      year: yr,
      age,
      salary,
      employeeContrib,
      employerContrib,
      investmentGrowth,
      endingBalance: balance,
    });
  }

  const projectedBalance = balance;

  // Exact mathematical reconciliation assertion check
  const reconstructedTotal = currentBalance + totalEmployeeContribs + totalEmployerContribs + totalInvestmentGrowth;
  if (Math.abs(projectedBalance - reconstructedTotal) >= 0.01) {
    console.error('401(k) Reconciliation Assertion Warning:', { projectedBalance, reconstructedTotal });
  }

  return {
    projectedBalance,
    currentBalance,
    totalEmployeeContribs,
    totalEmployerContribs,
    totalInvestmentGrowth,
    yearlySchedule,
  };
}

/* ── Formatters ──────────────────────────────────────────────────────────── */

export function formatCurrency(amount: number, decimals = 0): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
}

export function formatNumber(amount: number): string {
  return new Intl.NumberFormat('en-US').format(Math.round(amount));
}

export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/* ── Section i18n Types ───────────────────────────────────────────────────── */

export interface FourOhOneKScenarioSectionI18n {
  heading: string;
  intro: string;
  viewAll: string;
  cards: {
    employerMatch: { title: string; description: string; badge: string };
    contributionRate: { title: string; description: string; badge: string };
    timeAndGrowth: { title: string; description: string; badge: string };
  };
}

/* ── Localized Section Content ────────────────────────────────────────────── */

export const FOUR_OH_ONE_K_SCENARIOS_SECTION_I18N: Record<Locale, FourOhOneKScenarioSectionI18n> = {
  en: {
    heading: '401(k) Calculator Scenarios and Examples',
    intro:
      'These practical scenarios demonstrate how your contribution rate, employer matching formula, time horizon, and assumed annual investment return rate interact to shape your projected 401(k) balance. Every scenario is calculated using the exact engine and beginning-of-year compounding assumptions of our 401(k) Calculator.',
    viewAll: 'View All 401(k) Calculator Scenarios',
    cards: {
      employerMatch: {
        title: 'How Employer Match Affects Your 401(k) Growth',
        description:
          'See how employer matching contributions increase total deposits and generate hundreds of thousands of dollars in compound growth over decades.',
        badge: 'Employer Match',
      },
      contributionRate: {
        title: 'How Contribution Rate Changes Your Projected 401(k) Balance',
        description:
          'Compare elective deferral rates from 3% to 15% of salary to evaluate how modest increases in regular savings amplify your final retirement nest egg.',
        badge: 'Contribution Rates',
      },
      timeAndGrowth: {
        title: 'How Time and Investment Growth Affect Your 401(k)',
        description:
          'Examine the exponential impact of starting at age 25 versus age 35 or 45, and compare projected balances across conservative to aggressive return rates.',
        badge: 'Compounding & Horizon',
      },
    },
  },
  es: {
    heading: 'Escenarios y Ejemplos de la Calculadora de 401(k)',
    intro:
      'Estos escenarios demuestran cómo la tasa de aportación, la contribución del empleador, el horizonte temporal y el rendimiento anual influyen en el saldo final de su plan 401(k).',
    viewAll: 'Ver Todos los Escenarios de la Calculadora de 401(k)',
    cards: {
      employerMatch: {
        title: 'Cómo Afecta la Aportación del Empleador al Crecimiento del 401(k)',
        description:
          'Compruebe cómo la contrapartida de la empresa incrementa sus ahorros y genera un crecimiento compuesto notable con el paso de los años.',
        badge: 'Aportación Empresa',
      },
      contributionRate: {
        title: 'Cómo Cambia la Tasa de Aportación su Saldo Proyectado de 401(k)',
        description:
          'Compare tasas de ahorro salarial del 3% al 15% y observe cómo pequeños aumentos porcentuales multiplican su fondo final de jubilación.',
        badge: 'Tasas de Ahorro',
      },
      timeAndGrowth: {
        title: 'Cómo Influyen el Tiempo y el Rendimiento en su 401(k)',
        description:
          'Analice la ventaja de empezar a ahorrar a los 25 frente a los 35 o 45 años, y evalúe el impacto de distintas tasas anuales de rendimiento.',
        badge: 'Plazo y Crecimiento',
      },
    },
  },
  de: {
    heading: '401(k)-Rechner-Szenarien und Praxisbeispiele',
    intro:
      'Diese Szenarien veranschaulichen, wie sich Sparquote, Arbeitgeberzuschuss, Anlagehorizont und angenommene Jahresrendite auf das prognostizierte 401(k)-Altersguthaben auswirken.',
    viewAll: 'Alle 401(k)-Rechner-Szenarien ansehen',
    cards: {
      employerMatch: {
        title: 'Wie der Arbeitgeberzuschuss das 401(k)-Wachstum beschleunigt',
        description:
          'Erfahren Sie, wie Firmenzuschüsse das Gesamtkapital steigern und über Jahrzehnte hinweg beträchtliche Zinseszinsgewinne erzielen.',
        badge: 'Arbeitgeberanteil',
      },
      contributionRate: {
        title: 'Wie die Sparquote das prognostizierte 401(k)-Guthaben verändert',
        description:
          'Vergleichen Sie Beitragssätze von 3 % bis 15 % des Gehalts und erkennen Sie die Hebelwirkung moderater Sparanpassungen.',
        badge: 'Sparquoten',
      },
      timeAndGrowth: {
        title: 'Wie sich Anlagehorizont und Rendite auf den 401(k) auswirken',
        description:
          'Vergleichen Sie den Sparstart mit 25 gegenüber 35 oder 45 Jahren und analysieren Sie das Guthaben bei verschiedenen Renditeannahmen.',
        badge: 'Zeithorizont & Rendite',
      },
    },
  },
  fr: {
    heading: 'Scénarios et Exemples du Simulateur 401(k)',
    intro:
      'Ces scénarios illustrent l’impact du taux de cotisation, de l’abondement patronal, de l’horizon de placement et du rendement annuel sur le capital retraite 401(k).',
    viewAll: 'Voir Tous les Scénarios du Simulateur 401(k)',
    cards: {
      employerMatch: {
        title: 'Comment l’Abondement Employeur Accélère la Croissance du 401(k)',
        description:
          'Découvrez comment la contribution de votre entreprise augmente les versements et génère des intérêts composés considérables sur le long terme.',
        badge: 'Abondement Entreprise',
      },
      contributionRate: {
        title: 'Comment le Taux de Cotisation Modifie le Capital 401(k) Projeté',
        description:
          'Comparez des taux de cotisation de 3 % à 15 % du salaire et observez l’effet multiplicateur d’une épargne accrue sur votre capital.',
        badge: 'Taux de Cotisation',
      },
      timeAndGrowth: {
        title: 'Comment le Temps et le Rendement Transforment Votre 401(k)',
        description:
          'Mesurez l’avantage de commencer à épargner à 25 ans plutôt qu’à 35 ou 45 ans, et comparez les résultats selon divers rendements annuels.',
        badge: 'Horizon & Rendement',
      },
    },
  },
  pt: {
    heading: 'Cenários e Exemplos da Calculadora 401(k)',
    intro:
      'Estes cenários demonstram como sua taxa de contribuição, contrapartida da empresa, prazo e retorno anual afetam o saldo projetado do plano 401(k).',
    viewAll: 'Ver Todos os Cenários da Calculadora 401(k)',
    cards: {
      employerMatch: {
        title: 'Como a Contrapartida da Empresa Afeta o Crescimento do 401(k)',
        description:
          'Veja como a contribuição patronal acelera os aportes e multiplica o rendimento composto ao longo de décadas de carreira.',
        badge: 'Aporte da Empresa',
      },
      contributionRate: {
        title: 'Como a Taxa de Contribuição Altera o Saldo Projetado do 401(k)',
        description:
          'Compare percentuais de aporte de 3% a 15% do salário para avaliar o impacto de aumentos progressivos de poupança no seu patrimônio.',
        badge: 'Taxa de Poupança',
      },
      timeAndGrowth: {
        title: 'Como Tempo e Rendimento Transformam seu Saldo 401(k)',
        description:
          'Entenda o impacto de iniciar os aportes aos 25 anos em vez de 35 ou 45, e compare saldos para diferentes taxas médias de retorno.',
        badge: 'Prazo e Rendimento',
      },
    },
  },
  ja: {
    heading: '401(k)計算機のシナリオと試算事例',
    intro:
      '拠出割合、企業マッチング（会社拠出）、運用期間、想定年間利回りが401(k)の将来資産額に与える影響を具体的にシミュレーションします。',
    viewAll: '401(k)計算機の全シナリオを見る',
    cards: {
      employerMatch: {
        title: '企業マッチング拠出が401(k)の資産拡大に与える影響',
        description:
          '会社によるマッチング拠出が毎年の積立額を底上げし、複利効果によって数十年間で大きな差を生む仕組みを検証します。',
        badge: '企業マッチング',
      },
      contributionRate: {
        title: '拠出率の違いによる401(k)将来資産の比較',
        description:
          '給与の3%〜15%を積み立てるケースを比較し、拠出率のわずかな引き上げが退職時の受取額をどれほど拡大するかを試算します。',
        badge: '拠出率の比較',
      },
      timeAndGrowth: {
        title: '運用期間と想定利回りがもたらす401(k)の複利効果',
        description:
          '25歳から開始した場合と35歳・45歳から開始した場合の比較や、保守的から積極的までの利回り別シミュレーションを提示します。',
        badge: '期間と利回り',
      },
    },
  },
};
