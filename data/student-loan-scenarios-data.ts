import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';

/* ── Pure Student Loan Calculation Types & Utility ───────────────────────── */

export interface StudentLoanAmortizationRow {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  extra: number;
  balance: number;
}

export interface StudentLoanCalculationResult {
  loanAmount: number;
  interestRate: number;
  loanTermMonths: number;
  monthlyPayment: number;
  totalInterest: number;
  totalPayments: number;
  payoffMonths: number;
  extraPayment: number;
  acceleratedInterest: number;
  interestSaved: number;
  monthsSaved: number;
  monthlySchedule: StudentLoanAmortizationRow[];
}

/**
 * Exact pure calculation mirroring components/tools/StudentLoanCalculator.tsx.
 * Runs on both server and client without React hooks or side effects.
 */
export function calcStudentLoanDetails(params: {
  loanAmount: number;
  interestRate: number;
  loanTermMonths: number;
  extraPayment?: number;
}): StudentLoanCalculationResult {
  const P = params.loanAmount;
  const apr = params.interestRate;
  const N = params.loanTermMonths;
  const E = params.extraPayment || 0;

  if (P <= 0 || apr < 0 || N < 1) {
    return {
      loanAmount: P,
      interestRate: apr,
      loanTermMonths: N,
      monthlyPayment: 0,
      totalInterest: 0,
      totalPayments: 0,
      payoffMonths: 0,
      extraPayment: E,
      acceleratedInterest: 0,
      interestSaved: 0,
      monthsSaved: 0,
      monthlySchedule: [],
    };
  }

  const r = (apr / 100) / 12;

  // 1. Standard Monthly Payment (without extra payments)
  let stdPayment = 0;
  if (apr === 0) {
    stdPayment = P / N;
  } else {
    stdPayment = (P * (r * Math.pow(1 + r, N))) / (Math.pow(1 + r, N) - 1);
  }

  // Round to 2 decimal places to model standard financial ledger rounding
  const roundedStdPayment = Math.round(stdPayment * 100) / 100;

  // 2. Standard Repayment Simulation (ledger style to prevent math drift)
  let stdBalance = P;
  let stdTotalInterest = 0;
  for (let month = 1; month <= N; month++) {
    const interestPaid = Math.round(stdBalance * r * 100) / 100;
    let principalPaid = roundedStdPayment - interestPaid;
    if (stdBalance < principalPaid) {
      principalPaid = stdBalance;
    }
    stdTotalInterest += interestPaid;
    stdBalance -= principalPaid;
  }

  // 3. Accelerated Repayment Simulation
  let balance = P;
  let accTotalInterest = 0;
  let period = 0;
  const tempMonthly: StudentLoanAmortizationRow[] = [];

  while (balance > 0.01 && period < 600) {
    period++;
    const interestPaid = Math.round(balance * r * 100) / 100;
    let principalPaid = roundedStdPayment - interestPaid;

    if (balance < principalPaid) {
      principalPaid = balance;
    }

    let extraPaid = E;
    if (balance - principalPaid < extraPaid) {
      extraPaid = Math.max(0, balance - principalPaid);
    }

    accTotalInterest += interestPaid;
    balance = Math.max(0, balance - (principalPaid + extraPaid));

    tempMonthly.push({
      period,
      payment: roundedStdPayment,
      principal: principalPaid,
      interest: interestPaid,
      extra: extraPaid,
      balance: Math.round(balance * 100) / 100,
    });
  }

  const finalInterest = Math.round(stdTotalInterest * 100) / 100;
  const finalTotalPayments = Math.round((P + stdTotalInterest) * 100) / 100;

  return {
    loanAmount: P,
    interestRate: apr,
    loanTermMonths: N,
    monthlyPayment: roundedStdPayment,
    totalInterest: finalInterest,
    totalPayments: finalTotalPayments,
    payoffMonths: N,
    extraPayment: E,
    acceleratedInterest: Math.round(accTotalInterest * 100) / 100,
    interestSaved: Math.round(Math.max(0, stdTotalInterest - accTotalInterest) * 100) / 100,
    monthsSaved: Math.max(0, N - period),
    monthlySchedule: tempMonthly,
  };
}

/**
 * Calculates the maximum loan principal supported by a target monthly payment.
 */
export function calcMaxAffordableStudentLoan(
  targetMonthlyPayment: number,
  interestRate: number,
  loanTermMonths: number
): { maxPrincipal: number; verifiedDetails: StudentLoanCalculationResult } {
  if (targetMonthlyPayment <= 0 || loanTermMonths < 1) {
    const empty = calcStudentLoanDetails({ loanAmount: 0, interestRate, loanTermMonths });
    return { maxPrincipal: 0, verifiedDetails: empty };
  }

  const r = (interestRate / 100) / 12;
  const factor =
    interestRate === 0
      ? 1 / loanTermMonths
      : (r * Math.pow(1 + r, loanTermMonths)) / (Math.pow(1 + r, loanTermMonths) - 1);

  const maxPrincipal = Math.round(targetMonthlyPayment / factor);
  const verifiedDetails = calcStudentLoanDetails({
    loanAmount: maxPrincipal,
    interestRate,
    loanTermMonths,
  });

  return { maxPrincipal, verifiedDetails };
}

/* ── Currency Formatter ───────────────────────────────────────────────────── */

export function formatCurrency(
  amount: number,
  locale: Locale = DEFAULT_LOCALE,
  decimals: number = 0
): string {
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
    return `$${amount.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}`;
  }
}

export function formatNumber(
  val: number,
  locale: Locale = DEFAULT_LOCALE,
  decimals: number = 2
): string {
  const localeMap: Record<Locale, string> = {
    en: 'en-US',
    es: 'es-ES',
    de: 'de-DE',
    fr: 'fr-FR',
    pt: 'pt-BR',
    ja: 'ja-JP',
  };
  const tag = localeMap[locale] || 'en-US';
  return val.toLocaleString(tag, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/* ── Localized Scenario Metadata & Content ────────────────────────────────── */

export interface StudentLoanScenarioSectionI18n {
  heading: string;
  intro: string;
  viewAll: string;
  cards: {
    affordability: { title: string; description: string; badge: string };
    termComparison: { title: string; description: string; badge: string };
    rateImpact: { title: string; description: string; badge: string };
  };
}

export const STUDENT_LOAN_SCENARIOS_SECTION_I18N: Record<Locale, StudentLoanScenarioSectionI18n> = {
  en: {
    heading: 'Student Loan Calculator Scenarios and Examples',
    intro:
      'Explore realistic student loan scenarios demonstrating how loan amount, interest rate, loan term, and repayment assumptions may affect monthly payments and total repayment cost.',
    viewAll: 'View All Student Loan Calculator Scenarios',
    cards: {
      affordability: {
        title: 'How Much Student Loan Can I Afford?',
        description:
          'Estimate an affordable education loan balance based on standard monthly payment guidelines and entry-level salary benchmarks.',
        badge: 'Affordability',
      },
      termComparison: {
        title: 'How Loan Term Affects Monthly Payments and Total Interest',
        description:
          'Compare 5-year, 10-year, 15-year, 20-year, and 25-year repayment terms to see the trade-off between monthly payment and total interest paid.',
        badge: 'Term Comparison',
      },
      rateImpact: {
        title: 'How Interest Rate Changes Your Student Loan Cost',
        description:
          'See how varying fixed interest rates alter your monthly installment, lifetime borrowing charges, and total loan cost.',
        badge: 'Rate Impact',
      },
    },
  },
  es: {
    heading: 'Escenarios y Ejemplos de la Calculadora de Préstamos Estudiantiles',
    intro:
      'Explore escenarios realistas de préstamos educativos para ver cómo el monto del préstamo, la tasa de interés y el plazo de pago afectan las cuotas mensuales y el costo total.',
    viewAll: 'Ver todos los escenarios de la calculadora de préstamos estudiantiles',
    cards: {
      affordability: {
        title: '¿Cuánto préstamo estudiantil puedo pagar?',
        description:
          'Calcule un saldo de préstamo educativo asequible según pautas estándar de presupuesto e ingresos.',
        badge: 'Asequibilidad',
      },
      termComparison: {
        title: 'Cómo influye el plazo en las cuotas y los intereses totales',
        description:
          'Compare plazos de 5 a 25 años para evaluar el balance entre pago mensual e intereses acumulados.',
        badge: 'Comparación de Plazos',
      },
      rateImpact: {
        title: 'Cómo afecta la tasa de interés al costo del préstamo',
        description:
          'Analice el impacto de diferentes tasas fijas en su pago mensual y el costo total del financiamiento.',
        badge: 'Impacto de Tasa',
      },
    },
  },
  de: {
    heading: 'Studienkreditrechner Szenarien und Beispiele',
    intro:
      'Entdecken Sie praxisnahe Studienkreditszenarien, die zeigen, wie Darlehensbetrag, Zinssatz und Laufzeit die monatliche Rate und die Gesamtkosten beeinflussen.',
    viewAll: 'Alle Studienkredit-Szenarien anzeigen',
    cards: {
      affordability: {
        title: 'Wie viel Studienkredit kann ich mir leisten?',
        description:
          'Ermitteln Sie einen tragbaren Bildungskredit anhand bewährter Budgetregeln und monatlicher Einkommensgrenzen.',
        badge: 'Erschwinglichkeit',
      },
      termComparison: {
        title: 'Einfluss der Laufzeit auf Monatsrate und Gesamtzinsen',
        description:
          'Vergleichen Sie Laufzeiten von 5 bis 25 Jahren und prüfen Sie den Zielkonflikt zwischen monatlicher Entlastung und Zinskosten.',
        badge: 'Laufzeitvergleich',
      },
      rateImpact: {
        title: 'Wie der Zinssatz die Gesamtkosten des Kredits verändert',
        description:
          'Erfahren Sie, wie unterschiedliche Zinssätze die monatliche Belastung und die über die Laufzeit anfallenden Gesamtzinsen prägen.',
        badge: 'Zinseffekt',
      },
    },
  },
  fr: {
    heading: 'Scénarios et Exemples du Simulateur de Prêt Étudiant',
    intro:
      'Découvrez des scénarios réalistes de remboursement pour comprendre comment le montant emprunté, le taux d’intérêt et la durée influent sur les mensualités et le coût total.',
    viewAll: 'Voir tous les scénarios du prêt étudiant',
    cards: {
      affordability: {
        title: 'Quel montant de prêt étudiant puis-je assumer ?',
        description:
          'Estimez un emprunt d’études raisonnable en fonction de règles de budget et d’un salaire prévisionnel de début de carrière.',
        badge: 'Capacité d’emprunt',
      },
      termComparison: {
        title: 'Impact de la durée sur la mensualité et le coût des intérêts',
        description:
          'Comparez des durées de 5 à 25 ans pour équilibrer confort mensuel et coût total des intérêts.',
        badge: 'Comparatif de durée',
      },
      rateImpact: {
        title: 'Comment le taux d’intérêt modifie le coût de vos études',
        description:
          'Mesurez l’effet des variations de taux d’intérêt sur votre mensualité et la charge globale de remboursement.',
        badge: 'Impact du taux',
      },
    },
  },
  pt: {
    heading: 'Cenários e Exemplos da Calculadora de Financiamento Estudantil',
    intro:
      'Explore cenários práticos que demonstram como o valor do empréstimo, a taxa de juros e o prazo influenciam a parcela mensal e o custo total do financiamento.',
    viewAll: 'Ver todos os cenários de empréstimo estudantil',
    cards: {
      affordability: {
        title: 'Quanto posso pagar de empréstimo estudantil?',
        description:
          'Estime um valor financiável com base em parâmetros saudáveis de renda mensal e capacidade de pagamento.',
        badge: 'Acessibilidade',
      },
      termComparison: {
        title: 'Como o prazo afeta as parcelas mensais e o total de juros',
        description:
          'Compare prazos de 5 a 25 anos para avaliar o equilíbrio entre parcela mensal menor e juros acumulados maiores.',
        badge: 'Comparação de Prazos',
      },
      rateImpact: {
        title: 'Como a taxa de juros altera o custo do seu empréstimo',
        description:
          'Veja como diferentes taxas de juros impactam a prestação mensal e o valor total desembolsado.',
        badge: 'Impacto dos Juros',
      },
    },
  },
  ja: {
    heading: '奨学金・教育ローン計算機のシナリオと試算例',
    intro:
      '借入金額、金利、返済期間が毎月の返済額および返済総額にどのような影響を与えるかを、現実的な試算シナリオでご確認いただけます。',
    viewAll: '奨学金計算機の全シナリオを見る',
    cards: {
      affordability: {
        title: '返済可能な奨学金・教育ローンの借入額はいくら？',
        description:
          '初任給や月収の返済負担率を目安に、無理のない教育資金の借入可能額を試算します。',
        badge: '借入可能額',
      },
      termComparison: {
        title: '返済期間が毎月の返済額と利息総額に与える影響',
        description:
          '5年、10年、15年、20年、25年の返済期間を比較し、月々の負担軽減と利息増加のトレードオフを検証します。',
        badge: '返済期間の比較',
      },
      rateImpact: {
        title: '金利の違いが教育ローンの総返済額に与える影響',
        description:
          '固定金利の水準によって毎月の返済額や生涯で支払う利息総額がどう変わるかを比較します。',
        badge: '金利の影響',
      },
    },
  },
};
