import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';

/* ── Pure APR Calculation Types & Utility ────────────────────────────────── */

export interface APRResult {
  estimatedAPR: number;          // Nominal annualized APR: monthly rate * 12 * 100
  monthlyPayment: number;        // Monthly payment based on stated interest rate & full loan amount
  netProceeds: number;           // Loan Amount - Upfront Fees
  totalScheduledInterest: number;// Total interest paid across term at stated rate
  totalFees: number;             // Upfront fees entered
  totalInterestPlusFees: number; // Scheduled interest + upfront fees
  totalCashPaid: number;         // Total monthly payments + upfront fees
}

/**
 * Present Value helper for loan cash flows.
 * Handles r = 0 explicitly to prevent division by zero.
 */
export function pvAtRate(payment: number, n: number, r: number): number {
  if (r === 0) return payment * n;
  return payment * (1 - Math.pow(1 + r, -n)) / r;
}

/**
 * Exact pure calculation mirroring components/tools/APRCalculator.tsx.
 * Solves for Estimated APR using bisection method.
 * Runs on both server and client without React hooks or side effects.
 */
export function calculateAPR(
  loanAmount: number,
  statedRatePct: number,
  termMonths: number,
  feesAmount: number
): APRResult | { error: string } {
  // Input validations & guards
  if (!Number.isFinite(loanAmount) || loanAmount <= 0) {
    return { error: 'Loan amount must be greater than $0.' };
  }
  if (!Number.isFinite(statedRatePct) || statedRatePct < 0) {
    return { error: 'Stated interest rate must be 0% or greater.' };
  }
  if (!Number.isFinite(termMonths) || termMonths < 1 || !Number.isInteger(termMonths)) {
    return { error: 'Loan term must be a whole number of at least 1 month.' };
  }
  if (!Number.isFinite(feesAmount) || feesAmount < 0) {
    return { error: 'Fees cannot be negative.' };
  }
  if (feesAmount >= loanAmount) {
    return { error: 'Fees cannot equal or exceed the total loan amount.' };
  }

  const netProceeds = loanAmount - feesAmount;

  // Step 1: Calculate monthly payment based on stated interest rate and full loan amount
  let monthlyPayment = 0;
  if (statedRatePct === 0) {
    monthlyPayment = loanAmount / termMonths;
  } else {
    const rStated = (statedRatePct / 100) / 12;
    const factor = Math.pow(1 + rStated, termMonths);
    monthlyPayment = loanAmount * rStated * factor / (factor - 1);
  }

  // Step 2: Determine effective monthly rate (bisection solver)
  let effectiveMonthlyRate = 0;

  if (feesAmount === 0) {
    // If no fees, APR equals the stated rate
    effectiveMonthlyRate = (statedRatePct / 100) / 12;
  } else {
    // Bisect to solve for rate r such that PV(monthlyPayment, termMonths, r) === netProceeds
    let lo = 1e-10;
    let hi = 0.5; // High bound corresponding to 600% annual interest rate
    let converged = false;

    for (let i = 0; i < 200; i++) {
      const mid = (lo + hi) / 2;
      const pv = pvAtRate(monthlyPayment, termMonths, mid);
      if (pv > netProceeds) {
        lo = mid;
      } else {
        hi = mid;
      }
      if (Math.abs(hi - lo) < 1e-10) {
        converged = true;
        break;
      }
    }

    if (!converged && Math.abs(pvAtRate(monthlyPayment, termMonths, (lo + hi) / 2) - netProceeds) > 0.01) {
      return { error: 'Could not compute APR for the provided inputs.' };
    }

    effectiveMonthlyRate = (lo + hi) / 2;
  }

  // Step 3: Convert to nominal annualized APR
  const estimatedAPR = effectiveMonthlyRate * 12 * 100;

  // Step 4: Totals calculation
  const totalScheduledInterest = (monthlyPayment * termMonths) - loanAmount;
  const totalFees = feesAmount;
  const totalInterestPlusFees = totalScheduledInterest + totalFees;
  const totalCashPaid = (monthlyPayment * termMonths) + totalFees;

  return {
    estimatedAPR,
    monthlyPayment,
    netProceeds,
    totalScheduledInterest,
    totalFees,
    totalInterestPlusFees,
    totalCashPaid,
  };
}

/* ── Formatter Helpers ─────────────────────────────────────────────────── */

export function formatCurrency(amount: number): string {
  if (!Number.isFinite(amount)) return '—';
  return (
    '$' +
    amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

export function formatPercent(rate: number): string {
  if (!Number.isFinite(rate)) return '—';
  return rate.toFixed(2) + '%';
}

export function formatNumber(val: number): string {
  if (!Number.isFinite(val)) return '—';
  return val.toLocaleString('en-US');
}

/* ── Internationalized Content Dictionary ──────────────────────────────── */

export interface AprScenarioCardContent {
  title: string;
  description: string;
  badge: string;
}

export interface AprScenariosSectionContent {
  heading: string;
  intro: string;
  viewAll: string;
  cards: {
    aprVsInterestRate: AprScenarioCardContent;
    feesImpact: AprScenarioCardContent;
    comparingLoans: AprScenarioCardContent;
  };
}

export const APR_SCENARIOS_SECTION_I18N: Record<Locale, AprScenariosSectionContent> = {
  en: {
    heading: 'APR Calculator Scenarios and Examples',
    intro:
      'Explore realistic borrowing scenarios to see how interest rate, upfront fees, loan amount, and loan term affect your estimated annual percentage rate (APR) and total repayment cost.',
    viewAll: 'View All APR Calculator Scenarios',
    cards: {
      aprVsInterestRate: {
        title: 'APR vs Interest Rate: What Is the Difference?',
        description:
          'Understand why APR and stated interest rates diverge when upfront fees are charged, and why APR represents your true annualized borrowing cost.',
        badge: 'Rate vs APR',
      },
      feesImpact: {
        title: 'How Fees Affect the APR of a Loan',
        description:
          'See how origination fees, closing charges, and points increase the effective APR across different loan amounts and repayment terms.',
        badge: 'Fee Impact',
      },
      comparingLoans: {
        title: 'Comparing Two Loans Using APR',
        description:
          'Compare loan offers with different interest rates and fee structures to identify which loan genuinely costs less over its full term.',
        badge: 'Loan Comparison',
      },
    },
  },
  es: {
    heading: 'Escenarios y Ejemplos de la Calculadora de APR',
    intro:
      'Explore escenarios realistas de crédito para entender cómo la tasa de interés, comisiones iniciales, monto y plazo influyen en la Tasa Porcentual Anual (APR) y costo total.',
    viewAll: 'Ver todos los escenarios de APR',
    cards: {
      aprVsInterestRate: {
        title: 'APR vs Tasa de Interés: ¿Cuál es la Diferencia?',
        description:
          'Comprenda por qué el APR y la tasa nominal difieren al incluir comisiones y cómo refleja el costo financiero anual efectivo.',
        badge: 'Tasa vs APR',
      },
      feesImpact: {
        title: 'Cómo Influyen las Comisiones en el APR de un Préstamo',
        description:
          'Compruebe cómo los gastos de apertura y comisiones elevan el APR efectivo en distintos plazos y montos prestados.',
        badge: 'Impacto de Comisiones',
      },
      comparingLoans: {
        title: 'Comparación de Dos Préstamos Usando el APR',
        description:
          'Compare ofertas con distintas tasas y comisiones para determinar cuál opción resulta más económica en su plazo total.',
        badge: 'Comparativa de Créditos',
      },
    },
  },
  de: {
    heading: 'APR-Rechner Szenarien und Berechnungsbeispiele',
    intro:
      'Erkunden Sie praktische Kreditbeispiele, um zu verstehen, wie Zinssatz, Vorabgebühren, Kreditsumme und Laufzeit den effektiven Jahreszins (APR) und die Gesamtkosten bestimmen.',
    viewAll: 'Alle APR-Kreditszenarien anzeigen',
    cards: {
      aprVsInterestRate: {
        title: 'APR vs. Sollzins: Was ist der Unterschied?',
        description:
          'Verstehen Sie, warum Nominalzins und Effektivzins (APR) bei Vorabgebühren voneinander abweichen und welcher Wert entscheidend ist.',
        badge: 'Zins vs. APR',
      },
      feesImpact: {
        title: 'Wie Kreditgebühren den APR verändern',
        description:
          'Erfahren Sie, wie Bearbeitungsgebühren und Aufschläge den effektiven Jahreszins über unterschiedliche Laufzeiten anheben.',
        badge: 'Gebühreneffekt',
      },
      comparingLoans: {
        title: 'Kreditangebote anhand des APR vergleichen',
        description:
          'Vergleichen Sie Kredite mit verschiedenen Zinsen und Gebühren, um das tatsächlich günstigere Finanzierungsangebot zu ermitteln.',
        badge: 'Angebotsvergleich',
      },
    },
  },
  fr: {
    heading: 'Scénarios et Exemples du Simulateur de TAEG / APR',
    intro:
      'Découvrez des exemples concrets pour analyser comment le taux d’intérêt, les frais de dossier, le capital et la durée influent sur le TAEG (APR) et le coût global.',
    viewAll: 'Voir tous les scénarios de calcul d’APR',
    cards: {
      aprVsInterestRate: {
        title: 'APR vs Taux d’Intérêt Nominal : Quelle Différence ?',
        description:
          'Comprenez pourquoi le taux nominal et l’APR divergent dès que des frais s’appliquent, et comment l’APR reflète le coût réel de l’emprunt.',
        badge: 'Taux vs APR',
      },
      feesImpact: {
        title: 'Comment les Frais Influent sur l’APR d’un Emprunt',
        description:
          'Mesurez l’incidence des frais d’ouverture et points de crédit sur le taux annuel effectif selon la durée de remboursement.',
        badge: 'Impact des Frais',
      },
      comparingLoans: {
        title: 'Comparer Deux Offres de Prêt grâce à l’APR',
        description:
          'Évaluez deux propositions de financement aux taux et frais distincts pour identifier l’offre la plus avantageuse sur la durée.',
        badge: 'Comparatif d’Offres',
      },
    },
  },
  pt: {
    heading: 'Cenários e Exemplos da Calculadora de Custo Efetivo (APR)',
    intro:
      'Veja simulações práticas de como a taxa de juros, taxas iniciais, valor financiado e prazo afetam o custo anual total (APR) e o montante pago.',
    viewAll: 'Ver todos os cenários de APR',
    cards: {
      aprVsInterestRate: {
        title: 'APR vs Taxa de Juros Nominal: Qual a Diferença?',
        description:
          'Entenda por que o APR e os juros nominais divergem quando há tarifas iniciais e como o APR indica o custo real do financiamento.',
        badge: 'Juros vs APR',
      },
      feesImpact: {
        title: 'Como as Tarifas Afetam o APR de um Financiamento',
        description:
          'Veja como taxas de abertura e encargos iniciais elevam o APR em diferentes prazos de amortização.',
        badge: 'Impacto de Tarifas',
      },
      comparingLoans: {
        title: 'Comparando Dois Empréstimos Usando o APR',
        description:
          'Compare propostas de crédito com taxas e encargos diferentes para identificar a opção genuinamente mais barata ao final do prazo.',
        badge: 'Comparação de Empréstimos',
      },
    },
  },
  ja: {
    heading: 'APR（実質年率）計算機のシナリオと試算例',
    intro:
      '表面金利、借入諸費用、融資金額、返済期間が実質年率（APR）および総返済コストに与える影響を、現実的な試算シナリオでご確認いただけます。',
    viewAll: 'APR計算機の全シナリオを見る',
    cards: {
      aprVsInterestRate: {
        title: 'APRと表面金利の違いとは？',
        description:
          '手数料が発生すると表面金利と実質年率（APR）が乖離する仕組みと、真の借入コストを評価する重要性を解説します。',
        badge: '金利 vs APR',
      },
      feesImpact: {
        title: '融資手数料がAPRに与える影響',
        description:
          '事務手数料や保証料が実質年率（APR）をどの程度押し上げるかを、借入金額や返済期間別に比較します。',
        badge: '手数料の影響',
      },
      comparingLoans: {
        title: 'APRを使った2つのローン提案の比較',
        description:
          '金利と諸費用の組み合わせが異なる複数のローン提案を比較し、完済までに最も有利な選択肢を見極めます。',
        badge: 'ローン比較',
      },
    },
  },
};
