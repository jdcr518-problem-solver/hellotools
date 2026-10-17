import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';

/* ── Pure Amortization Calculation Types & Utility ────────────────────────── */

export interface AmortizationScheduleRow {
  period: number;
  date: string | null;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
  isFinalPayment: boolean;
}

export interface AmortizationAnnualScheduleRow {
  year: number;
  totalPayment: number;
  totalPrincipal: number;
  totalInterest: number;
  endingBalance: number;
}

export interface AmortizationCalculationResult {
  regularPayment: number;
  totalInterest: number;
  totalCost: number;
  monthlySchedule: AmortizationScheduleRow[];
  annualSchedule: AmortizationAnnualScheduleRow[];
  finalPaymentDiffers: boolean;
  finalPaymentAmount: number;
}

/**
 * Safe calendar-month addition — clamps to last valid day of target month.
 */
export function addMonthsSafe(date: Date, months: number): Date {
  const yr = date.getFullYear();
  const mo = date.getMonth();
  const day = date.getDate();
  const totalMonths = mo + months;
  const targetYear = yr + Math.floor(totalMonths / 12);
  const targetMonth = ((totalMonths % 12) + 12) % 12;
  const lastDay = new Date(targetYear, targetMonth + 1, 0).getDate();
  return new Date(targetYear, targetMonth, Math.min(day, lastDay));
}

function formatPaymentDate(d: Date): string {
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

/**
 * Exact pure amortization calculation identical to AmortizationCalculator.tsx.
 * Runs on both server and client without Client Component boundaries.
 */
export function calculateAmortization(
  loanAmount: number,
  annualRate: number,
  termMonths: number,
  startDate?: Date | null
): AmortizationCalculationResult | null {
  if (!Number.isFinite(loanAmount) || loanAmount <= 0) return null;
  if (!Number.isFinite(annualRate) || annualRate < 0) return null;
  if (!Number.isFinite(termMonths) || termMonths < 1 || !Number.isInteger(termMonths)) return null;

  const monthlySchedule: AmortizationScheduleRow[] = [];
  let balance = loanAmount;
  let regularPayment: number;

  if (annualRate === 0) {
    regularPayment = loanAmount / termMonths;
    for (let i = 1; i <= termMonths; i++) {
      const isFinal = i === termMonths;
      const principal = isFinal ? balance : regularPayment;
      const interest = 0;
      const payment = principal + interest;
      balance = isFinal ? 0 : Math.max(0, balance - principal);
      const date = startDate ? formatPaymentDate(addMonthsSafe(startDate, i)) : null;
      monthlySchedule.push({ period: i, date, payment, principal, interest, balance, isFinalPayment: isFinal });
    }
  } else {
    const r = (annualRate / 100) / 12;
    const factor = Math.pow(1 + r, termMonths);
    regularPayment = (loanAmount * r * factor) / (factor - 1);

    for (let i = 1; i <= termMonths; i++) {
      const isFinal = i === termMonths;
      const interest = balance * r;

      let principal = 0;
      let payment = 0;

      if (isFinal) {
        principal = Math.max(0, balance);
        payment = principal + interest;
        balance = 0;
      } else {
        principal = regularPayment - interest;
        payment = regularPayment;
        balance = Math.max(0, balance - principal);
      }

      const date = startDate ? formatPaymentDate(addMonthsSafe(startDate, i)) : null;
      monthlySchedule.push({ period: i, date, payment, principal, interest, balance, isFinalPayment: isFinal });
    }
  }

  const annualSchedule: AmortizationAnnualScheduleRow[] = [];
  let yr = 1;
  let annPay = 0;
  let annPrin = 0;
  let annInt = 0;

  monthlySchedule.forEach((row, idx) => {
    annPay += row.payment;
    annPrin += row.principal;
    annInt += row.interest;
    const isYearEnd = (idx + 1) % 12 === 0;
    const isLoanEnd = idx === monthlySchedule.length - 1;
    if (isYearEnd || isLoanEnd) {
      annualSchedule.push({
        year: yr,
        totalPayment: annPay,
        totalPrincipal: annPrin,
        totalInterest: annInt,
        endingBalance: row.balance,
      });
      yr++;
      annPay = 0;
      annPrin = 0;
      annInt = 0;
    }
  });

  const totalInterest = monthlySchedule.reduce((s, r) => s + r.interest, 0);
  const totalCost = loanAmount + totalInterest;

  const finalRow = monthlySchedule[monthlySchedule.length - 1];
  const DISPLAY_THRESHOLD = 0.01;
  const finalPaymentDiffers = Math.abs(finalRow.payment - regularPayment) > DISPLAY_THRESHOLD;

  return {
    regularPayment,
    totalInterest,
    totalCost,
    monthlySchedule,
    annualSchedule,
    finalPaymentDiffers,
    finalPaymentAmount: finalRow.payment,
  };
}

/* ── Currency and Number Formatters ───────────────────────────────────────── */

export function formatCurrency(
  amount: number,
  locale: Locale = DEFAULT_LOCALE,
  decimals: number = 2
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

export interface AmortizationScenarioSectionI18n {
  heading: string;
  intro: string;
  viewAll: string;
  cards: {
    paymentsOverTime: { title: string; description: string; badge: string };
    rateImpact: { title: string; description: string; badge: string };
    termComparison: { title: string; description: string; badge: string };
  };
}

export const AMORTIZATION_SCENARIOS_SECTION_I18N: Record<Locale, AmortizationScenarioSectionI18n> = {
  en: {
    heading: 'Amortization Calculator Scenarios and Examples',
    intro:
      'Explore realistic loan amortization scenarios to see how loan amount, interest rate, and loan term determine monthly payments and how each installment is divided between principal and interest over the life of the loan.',
    viewAll: 'View All Amortization Calculator Scenarios',
    cards: {
      paymentsOverTime: {
        title: 'How Loan Payments Change Over Time',
        description:
          'See how the monthly payment breakdown shifts from interest-heavy in the early years to principal-heavy near loan maturity.',
        badge: 'Payment Breakdown',
      },
      rateImpact: {
        title: 'How Interest Rate Affects Total Loan Cost',
        description:
          'Compare how varying interest rates alter monthly installments, the principal-to-interest split, and the total cost of borrowing.',
        badge: 'Rate Sensitivity',
      },
      termComparison: {
        title: 'How Loan Term Affects Principal and Interest',
        description:
          'Evaluate the financial trade-off between shorter terms (higher monthly payments, lower interest) and longer terms (lower payments, higher interest).',
        badge: 'Term Comparison',
      },
    },
  },
  es: {
    heading: 'Escenarios y Ejemplos de la Calculadora de Amortización',
    intro:
      'Explore escenarios realistas de amortización de préstamos para comprobar cómo el monto del préstamo, la tasa de interés y el plazo determinan los pagos mensuales y la distribución entre capital e intereses.',
    viewAll: 'Ver todos los escenarios de la calculadora de amortización',
    cards: {
      paymentsOverTime: {
        title: 'Cómo cambian las cuotas del préstamo a lo largo del tiempo',
        description:
          'Compruebe cómo la composición del pago mensual pasa de pagar principalmente intereses al inicio a amortizar mayormente capital al final.',
        badge: 'Distribución de pagos',
      },
      rateImpact: {
        title: 'Cómo afecta la tasa de interés al costo total del préstamo',
        description:
          'Compare cómo distintas tasas de interés modifican la cuota mensual, el desglose capital/interés y el coste acumulado de financiación.',
        badge: 'Sensibilidad de tasa',
      },
      termComparison: {
        title: 'Cómo afecta el plazo del préstamo al capital y a los intereses',
        description:
          'Analice el equilibrio financiero entre plazos cortos (cuotas más altas, menor interés total) y plazos largos (cuotas más bajas, mayor interés total).',
        badge: 'Comparativa de plazos',
      },
    },
  },
  de: {
    heading: 'Tilgungsrechner Szenarien und Beispiele',
    intro:
      'Erkunden Sie praxisnahe Tilgungsszenarien, um zu verstehen, wie Darlehensbetrag, Zinssatz und Laufzeit die monatliche Rate und die Aufteilung zwischen Tilgung und Zinsen beeinflussen.',
    viewAll: 'Alle Tilgungsrechner-Szenarien anzeigen',
    cards: {
      paymentsOverTime: {
        title: 'Wie sich Darlehenszahlungen im Laufe der Zeit verändern',
        description:
          'Sehen Sie, wie sich die Monatsrate von anfangs hohem Zinsanteil zu überwiegender Tilgung gegen Ende der Laufzeit verschiebt.',
        badge: 'Zahlungsstruktur',
      },
      rateImpact: {
        title: 'Wie der Zinssatz die Gesamtkosten des Darlehens beeinflusst',
        description:
          'Vergleichen Sie, wie unterschiedliche Zinssätze die Monatsrate, das Verhältnis von Zins zu Tilgung und die Gesamtzinskosten verändern.',
        badge: 'Zinssensitivität',
      },
      termComparison: {
        title: 'Wie die Laufzeit Zinsen und Tilgung beeinflusst',
        description:
          'Vergleichen Sie kurze Laufzeiten (höhere Monatsrate, weniger Zinskosten) mit langen Laufzeiten (niedrigere Monatsrate, höhere Gesamtzinsen).',
        badge: 'Laufzeitvergleich',
      },
    },
  },
  fr: {
    heading: 'Scénarios et Exemples du Simulateur d’Amortissement',
    intro:
      'Découvrez des scénarios concrets d’amortissement pour comprendre comment le montant emprunté, le taux d’intérêt et la durée déterminent vos mensualités et la répartition entre capital et intérêts.',
    viewAll: 'Voir tous les scénarios du simulateur d’amortissement',
    cards: {
      paymentsOverTime: {
        title: 'Comment les remboursements évoluent au fil du temps',
        description:
          'Visualisez l’évolution de la mensualité, très chargée en intérêts au début puis consacrée au remboursement du capital vers la fin.',
        badge: 'Évolution des mensualités',
      },
      rateImpact: {
        title: 'Comment le taux d’intérêt influence le coût total du crédit',
        description:
          'Comparez comment plusieurs niveaux de taux modifient la mensualité, la part d’intérêts et le coût global de votre emprunt.',
        badge: 'Impact du taux',
      },
      termComparison: {
        title: 'Comment la durée du crédit influence le capital et les intérêts',
        description:
          'Évaluez l’arbitrage entre une durée courte (mensualités plus fortes, intérêts faibles) et une durée longue (mensualités modérées, coût total élevé).',
        badge: 'Comparaison des durées',
      },
    },
  },
  pt: {
    heading: 'Cenários e Exemplos da Calculadora de Amortização',
    intro:
      'Explore cenários práticos de amortização para entender como o valor do empréstimo, a taxa de juros e o prazo determinam a parcela mensal e a divisão entre amortização da dívida e juros.',
    viewAll: 'Ver todos os cenários da calculadora de amortização',
    cards: {
      paymentsOverTime: {
        title: 'Como as parcelas do empréstimo mudam com o tempo',
        description:
          'Entenda como a composição do pagamento migra de uma fase inicial dominada por juros para uma amortização acelerada de principal no final.',
        badge: 'Evolução de pagamentos',
      },
      rateImpact: {
        title: 'Como a taxa de juros afeta o custo total do empréstimo',
        description:
          'Compare como diferentes taxas de juros alteram as parcelas mensais, a proporção de juros e o custo total financiado.',
        badge: 'Sensibilidade aos juros',
      },
      termComparison: {
        title: 'Como o prazo do empréstimo afeta o principal e os juros',
        description:
          'Avalie a diferença entre prazos curtos (parcelas mais altas, menor juro total) e prazos longos (parcelas menores, juros acumulados elevados).',
        badge: 'Comparação de prazos',
      },
    },
  },
  ja: {
    heading: '元利均等返済・償還シミュレーションの具体例',
    intro:
      '借入金額、金利、返済期間が毎月の返済額や元金と利息の配分比率にどのように影響するか、具体的な償還シミュレーションでご確認いただけます。',
    viewAll: '償還シミュレーション一覧を見る',
    cards: {
      paymentsOverTime: {
        title: '返済期間の経過に伴う元金と利息の内訳変化',
        description:
          '返済当初は利息の割合が高く、完済に近づくにつれて元金返済が加速するメカニズムを解説します。',
        badge: '返済内訳の推移',
      },
      rateImpact: {
        title: '適用金利が借入総コストに及ぼす影響',
        description:
          '金利の違いが毎月の返済額、元金と利息の比率、そして総支払利息に与える影響を比較します。',
        badge: '金利感応度',
      },
      termComparison: {
        title: '返済期間が元金と総利息に及ぼす影響',
        description:
          '短期間返済（月々の返済額が高く総利息が少ない）と長期間返済（月々の負担が軽く総利息が多い）のトレードオフを検証します。',
        badge: '期間比較',
      },
    },
  },
};
