import { Locale } from '@/lib/i18n';

/* ── Pure Salary Calculation Types & Utility ────────────────────────────── */

export type SalaryPayPeriod = 'year' | 'month' | 'week' | 'hour';

export interface SalaryBreakdownResult {
  annualSalary: number;
  monthly: number;
  biweekly: number;
  weekly: number;
  daily: number;
  hourly: number;
  hoursPerWeek: number;
  inputAmount: number;
  inputPeriod: SalaryPayPeriod;
}

/**
 * Pure calculation function strictly mirroring components/tools/FinanceTools.tsx:SalaryCalculator.
 * Converts input wages into annual baseline and derives standard frequency breakdowns.
 * Runs on both server and client without React hooks or side effects.
 */
export function calculateSalaryBreakdown(
  payAmount: number,
  period: SalaryPayPeriod = 'year',
  hoursPerWeek: number = 40
): SalaryBreakdownResult {
  const safeAmount = Number.isFinite(payAmount) && payAmount > 0 ? payAmount : 0;
  const weeklyHours = Number.isFinite(hoursPerWeek) && hoursPerWeek > 0 ? hoursPerWeek : 40;

  let annualSalary = 0;

  if (period === 'year') {
    annualSalary = safeAmount;
  } else if (period === 'month') {
    annualSalary = safeAmount * 12;
  } else if (period === 'week') {
    annualSalary = safeAmount * 52;
  } else if (period === 'hour') {
    annualSalary = safeAmount * weeklyHours * 52;
  }

  return {
    annualSalary,
    monthly: annualSalary / 12,
    biweekly: annualSalary / 26,
    weekly: annualSalary / 52,
    daily: annualSalary / 260, // 52 weeks * 5 days per week
    hourly: annualSalary / (weeklyHours * 52),
    hoursPerWeek: weeklyHours,
    inputAmount: safeAmount,
    inputPeriod: period,
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

export interface SalaryScenarioCardContent {
  title: string;
  description: string;
  badge: string;
}

export interface SalaryScenariosSectionContent {
  heading: string;
  intro: string;
  viewAll: string;
  cards: {
    grossVsTakeHome: SalaryScenarioCardContent;
    monthlyVsAnnual: SalaryScenarioCardContent;
    howMuchToSave: SalaryScenarioCardContent;
  };
}

export const SALARY_SCENARIOS_SECTION_I18N: Record<Locale, SalaryScenariosSectionContent> = {
  en: {
    heading: 'Salary Calculator Scenarios and Examples',
    intro:
      'Explore practical salary scenarios to see how pay frequency, wage conversions, gross-versus-take-home differences, and savings targets impact your earnings. Our calculator provides instant gross salary conversions across hourly, weekly, bi-weekly, monthly, and annual schedules.',
    viewAll: 'View All Salary Calculator Scenarios',
    cards: {
      grossVsTakeHome: {
        title: 'Gross Salary vs Take-Home Salary',
        description:
          'Learn the distinction between your contractual gross salary and estimated take-home pay after mandatory taxes and payroll deductions.',
        badge: 'Gross vs Net',
      },
      monthlyVsAnnual: {
        title: 'Monthly vs Annual Salary Conversion',
        description:
          'Understand how monthly earnings translate accurately into annual, bi-weekly, and hourly pay under standard workweek assumptions.',
        badge: 'Pay Conversion',
      },
      howMuchToSave: {
        title: 'How Much Should I Save From My Salary?',
        description:
          'Explore benchmark savings percentages (like the 50/30/20 guideline) applied to your income to establish emergency and retirement reserves.',
        badge: 'Savings Targets',
      },
    },
  },
  es: {
    heading: 'Escenarios y Ejemplos de la Calculadora de Salario',
    intro:
      'Explore escenarios salariales prácticos para comprender cómo la frecuencia de pago, conversiones salariales, diferencias entre salario bruto y neto, y metas de ahorro influyen en sus ingresos.',
    viewAll: 'Ver todos los escenarios salariales',
    cards: {
      grossVsTakeHome: {
        title: 'Salario Bruto vs Salario Neto (En Mano)',
        description:
          'Comprenda la diferencia entre el sueldo bruto pactado y el ingreso neto final tras deducciones e impuestos obligatorios.',
        badge: 'Bruto vs Neto',
      },
      monthlyVsAnnual: {
        title: 'Conversión de Salario Mensual a Anual',
        description:
          'Aprenda cómo se calcula la equivalencia exacta entre salario mensual, anual, quincenal y por hora con semanas laborales estándar.',
        badge: 'Conversión de Pagos',
      },
      howMuchToSave: {
        title: '¿Cuánto Debería Ahorrar de mi Salario?',
        description:
          'Calcule porcentajes de ahorro recomendados (como la regla 50/30/20) aplicados a su sueldo para fondo de emergencia y retiro.',
        badge: 'Metas de Ahorro',
      },
    },
  },
  de: {
    heading: 'Gehaltsrechner Szenarien und Berechnungsbeispiele',
    intro:
      'Erkunden Sie praxisnahe Gehaltsbeispiele, um zu verstehen, wie Auszahlungsintervalle, Brutto-Netto-Unterschiede und Sparziele Ihre Finanzen beeinflussen.',
    viewAll: 'Alle Gehaltsrechner-Szenarien anzeigen',
    cards: {
      grossVsTakeHome: {
        title: 'Bruttogehalt vs. Nettogehalt',
        description:
          'Erfahren Sie den Unterschied zwischen vertraglichem Bruttoeinkommen und dem tatsächlichen Auszahlungsbetrag nach Abzügen.',
        badge: 'Brutto vs. Netto',
      },
      monthlyVsAnnual: {
        title: 'Monatsgehalt in Jahresgehalt umrechnen',
        description:
          'Präzise Umrechnung zwischen Monats-, Jahres-, Wochen- und Stundenlöhnen unter Berücksichtigung standardisierter Arbeitszeiten.',
        badge: 'Lohnumrechnung',
      },
      howMuchToSave: {
        title: 'Wie viel sollte man vom Gehalt sparen?',
        description:
          'Entdecken Sie gängige Sparquoten (z. B. die 50/30/20-Regel), um systematisch Rücklagen und Altersvorsorge aufzubauen.',
        badge: 'Sparziele',
      },
    },
  },
  fr: {
    heading: 'Scénarios et Exemples du Calculateur de Salaire',
    intro:
      'Découvrez des exemples concrets pour analyser la conversion entre salaire horaire, mensuel et annuel, l’écart entre brut et net, et l’optimisation de votre épargne.',
    viewAll: 'Voir tous les scénarios de calcul de salaire',
    cards: {
      grossVsTakeHome: {
        title: 'Salaire Brut vs Salaire Net',
        description:
          'Comprenez la différence fondamentale entre votre salaire contractuel brut et votre rémunération nette perçue après cotisations.',
        badge: 'Brut vs Net',
      },
      monthlyVsAnnual: {
        title: 'Conversion Salaire Mensuel en Annuel',
        description:
          'Convertissez fidèlement vos revenus entre bases mensuelle, annuelle, hebdomadaire et taux horaire selon le temps de travail.',
        badge: 'Conversion Salariale',
      },
      howMuchToSave: {
        title: 'Combien Épargner sur son Salaire ?',
        description:
          'Appliquez des ratios de référence (tels que la règle 50/30/20) à votre revenu pour constituer une épargne de sécurité.',
        badge: 'Objectifs d’Épargne',
      },
    },
  },
  pt: {
    heading: 'Cenários e Exemplos da Calculadora de Salário',
    intro:
      'Explore simulações práticas sobre periodicidade de pagamento, conversão de remuneração, salário bruto versus líquido e metas de poupança financeira.',
    viewAll: 'Ver todos os cenários da calculadora de salário',
    cards: {
      grossVsTakeHome: {
        title: 'Salário Bruto vs Salário Líquido',
        description:
          'Entenda a diferença entre o salário bruto contratual e o montante líquido recebido após impostos e retenções.',
        badge: 'Bruto vs Líquido',
      },
      monthlyVsAnnual: {
        title: 'Conversão de Salário Mensal para Anual',
        description:
          'Veja como converter ganhos mensais em anuais, semanais e por hora com base em jornadas de trabalho regulares.',
        badge: 'Conversão Salarial',
      },
      howMuchToSave: {
        title: 'Quanto Devo Guardar do Meu Salário?',
        description:
          'Descubra porcentagens recomendadas de economia (como a regra 50/30/20) para planejar reservas e investimentos.',
        badge: 'Metas de Poupança',
      },
    },
  },
  ja: {
    heading: '給与計算機のシナリオと試算例',
    intro:
      '支払頻度、時給・月給・年収の換算、総支給額（額面）と手取り額の違い、貯蓄目標などを実践的なシナリオでわかりやすく解説します。',
    viewAll: '給与計算機の全シナリオを見る',
    cards: {
      grossVsTakeHome: {
        title: '額面給与（総支給）と手取り給与の違い',
        description:
          '雇用契約上の総支給額と、税金や社会保険料控除後に実際に受け取る手取り額の仕組みを解説します。',
        badge: '額面 vs 手取り',
      },
      monthlyVsAnnual: {
        title: '月給と年収の正確な換算方法',
        description:
          '標準労働時間をもとに、月給から年収・週給・時給を正確に算出する計算ロジックと前提条件を解説します。',
        badge: '給与換算',
      },
      howMuchToSave: {
        title: '給与から毎月いくら貯蓄すべきか？',
        description:
          '50/30/20ルールなどの貯蓄ベンチマークを活用し、収入に応じた生活防衛資金や将来資金の積立計画を立てます。',
        badge: '貯蓄目標',
      },
    },
  },
};
