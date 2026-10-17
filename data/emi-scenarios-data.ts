import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';

/* ── Calculation Utilities (Reused and pure) ──────────────────────────────── */

export function calcEmi(
  principal: number,
  annualRatePct: number,
  months: number
): { emi: number; totalPayment: number; totalInterest: number } {
  const r = annualRatePct / 12 / 100;
  const emi =
    r === 0
      ? principal / months
      : (principal * r * Math.pow(1 + r, months)) /
        (Math.pow(1 + r, months) - 1);
  const roundedEmi = Math.round(emi * 100) / 100;
  const totalPayment = Math.round(roundedEmi * months * 100) / 100;
  const totalInterest = Math.round((totalPayment - principal) * 100) / 100;
  return { emi: roundedEmi, totalPayment, totalInterest };
}

export function maxLoan(maxEmi: number, annualRatePct: number, months: number): number {
  const r = annualRatePct / 12 / 100;
  if (r === 0) return maxEmi * months;
  const factor = (r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  return Math.round(maxEmi / factor);
}

export function simulateRepayment(
  principal: number,
  annualRatePct: number,
  monthlyPayment: number
): { months: number; totalInterest: number; totalPaid: number } {
  const r = annualRatePct / 12 / 100;
  let balance = principal;
  let totalInterest = 0;
  let months = 0;

  while (balance > 0.005) {
    const interestThisMonth = balance * r;
    const principalThisMonth = Math.min(monthlyPayment - interestThisMonth, balance);
    if (principalThisMonth <= 0) {
      return { months: Infinity, totalInterest: Infinity, totalPaid: Infinity };
    }
    totalInterest += interestThisMonth;
    balance -= principalThisMonth;
    months += 1;
    if (months > 1200) break;
  }

  const totalPaid = principal + totalInterest;
  return {
    months,
    totalInterest: Math.round(totalInterest * 100) / 100,
    totalPaid: Math.round(totalPaid * 100) / 100,
  };
}

/* ── Currency Formatter ───────────────────────────────────────────────────── */

export function formatCurrency(amount: number, locale: Locale = DEFAULT_LOCALE, decimals: number = 0): string {
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
    return `$${amount.toLocaleString()}`;
  }
}

/* ── Localized Scenario Metadata & Content ────────────────────────────────── */

export interface ScenarioSectionI18n {
  heading: string;
  intro: string;
  viewAll: string;
  cards: {
    affordability: { title: string; description: string; badge: string };
    tenureComparison: { title: string; description: string; badge: string };
    extraPayment: { title: string; description: string; badge: string };
  };
}

export const EMI_SCENARIOS_SECTION_I18N: Record<Locale, ScenarioSectionI18n> = {
  en: {
    heading: 'EMI Calculator Scenarios and Examples',
    intro:
      'The pages below walk through real-world loan decisions using the same EMI formula this calculator uses. Each example shows how changing the loan amount, interest rate, loan tenure, monthly income, or extra payments can affect your monthly EMI and the total interest you pay over the life of the loan.',
    viewAll: 'View All EMI Calculator Scenarios',
    cards: {
      affordability: {
        title: 'How Much EMI Can I Afford on My Monthly Income?',
        description:
          'Understand how lenders use income-to-EMI ratios to determine a comfortable loan EMI ceiling for different salary levels.',
        badge: 'Affordability',
      },
      tenureComparison: {
        title: '3-Year vs 5-Year Loan: Monthly EMI and Total Interest',
        description:
          'Compare the monthly payment and total interest cost of a shorter versus a longer loan tenure on the same principal.',
        badge: 'Comparison',
      },
      extraPayment: {
        title: 'How Much Interest Can I Save by Paying Extra Each Month?',
        description:
          'See how a small additional monthly payment can meaningfully shorten your repayment period and reduce total interest.',
        badge: 'Prepayment',
      },
    },
  },
  es: {
    heading: 'Escenarios y Ejemplos de la Calculadora de Cuota (EMI)',
    intro:
      'Las páginas siguientes analizan decisiones de financiación reales aplicando la misma fórmula matemática que este simulador. Cada ejemplo muestra cómo la variación del monto, tasa de interés, plazo, ingresos mensuales o pagos extra influye en la cuota fija y en los intereses totales.',
    viewAll: 'Ver todos los escenarios de la calculadora de cuota (EMI)',
    cards: {
      affordability: {
        title: '¿Cuánta cuota (EMI) puedo permitirme según mis ingresos?',
        description:
          'Descubre cómo las entidades financieras aplican la regla del 40-50% para definir un límite saludable de endeudamiento mensual.',
        badge: 'Capacidad de pago',
      },
      tenureComparison: {
        title: 'Préstamo a 3 años vs. 5 años: Cuota mensual e intereses totales',
        description:
          'Compara la cuota mensual y el sobrecoste de intereses entre un plazo más corto y otro más largo para el mismo capital.',
        badge: 'Comparativa',
      },
      extraPayment: {
        title: '¿Cuánto interés puedo ahorrar pagando un extra cada mes?',
        description:
          'Comprueba cómo un pago extraordinario mensual reduce directamente el capital pendiente, acortando el plazo y ahorrando intereses.',
        badge: 'Amortización anticipada',
      },
    },
  },
  de: {
    heading: 'Kreditraten-Szenarien und Praxisbeispiele (EMI)',
    intro:
      'Die folgenden Seiten veranschaulichen typische Kreditentscheidungen auf Basis derselben Annuitätenformel. Jeder Fall zeigt, wie sich Kredithöhe, Zinssatz, Laufzeit, Monatseinkommen oder Sondertilgungen auf die Monatsrate und die Gesamtzinsbelastung auswirken.',
    viewAll: 'Alle Kreditraten-Szenarien anzeigen',
    cards: {
      affordability: {
        title: 'Wie viel Kreditrate kann ich mir mit meinem Einkommen leisten?',
        description:
          'Erfahren Sie, wie Banken das Verhältnis von Einkommen zu Kreditrate bewerten, um eine tragbare Monatsratenobergrenze festzulegen.',
        badge: 'Leistbarkeit',
      },
      tenureComparison: {
        title: '3 Jahre vs. 5 Jahre Laufzeit: Monatsrate und Gesamtzinsen im Vergleich',
        description:
          'Vergleichen Sie Monatsrate und Zinskosten einer kürzeren versus längeren Kreditlaufzeit für dieselbe Kreditsumme.',
        badge: 'Laufzeitvergleich',
      },
      extraPayment: {
        title: 'Wie viele Zinsen spare ich durch monatliche Sondertilgungen?',
        description:
          'Erfahren Sie, wie eine regelmäßige Zusatzrückzahlung die Gesamtlaufzeit verkürzt und Zinskosten spürbar senkt.',
        badge: 'Sondertilgung',
      },
    },
  },
  fr: {
    heading: 'Scénarios et Exemples du Calculateur de Mensualité (EMI)',
    intro:
      'Les pages ci-dessous détaillent des choix d\'emprunt concrets en utilisant la même formule actuarielle que ce calculateur. Chaque exemple illustre l\'impact du montant, du taux d\'intérêt, de la durée, du revenu ou des versements anticipés sur votre mensualité et le coût total.',
    viewAll: 'Voir tous les scénarios du calculateur de mensualité',
    cards: {
      affordability: {
        title: 'Quelle mensualité (EMI) puis-je assumer avec mes revenus ?',
        description:
          'Découvrez comment le taux d\'endettement maximal (33-40%) permet de déterminer votre capacité de remboursement mensuelle.',
        badge: 'Capacité d\'emprunt',
      },
      tenureComparison: {
        title: 'Prêt sur 3 ans vs 5 ans : Mensualité et coût total des intérêts',
        description:
          'Comparez la mensualité et le surcoût d\'intérêts d\'une durée courte par rapport à une durée longue pour un même montant.',
        badge: 'Comparatif',
      },
      extraPayment: {
        title: 'Combien d\'intérêts économiser avec un remboursement mensuel supplémentaire ?',
        description:
          'Observez comment un versement additionnel régulier réduit le capital restant dû et permet de solder le crédit plus tôt.',
        badge: 'Remboursement anticipé',
      },
    },
  },
  pt: {
    heading: 'Cenários e Exemplos da Calculadora de Parcelas (EMI)',
    intro:
      'As páginas a seguir demonstram decisões práticas de crédito utilizando a mesma fórmula da Tabela Price deste simulador. Cada cenário avalia o impacto do valor financiado, taxa de juros, prazo, renda mensal e amortizações extras no valor da parcela e no total de juros.',
    viewAll: 'Ver todos os cenários da calculadora de parcelas',
    cards: {
      affordability: {
        title: 'Qual parcela de empréstimo posso pagar com a minha renda mensal?',
        description:
          'Entenda como as instituições avaliam a margem consignável e o limite de comprometimento de renda (30-40%).',
        badge: 'Capacidade de pagamento',
      },
      tenureComparison: {
        title: 'Financiamento em 3 anos vs. 5 anos: Parcela mensal e juros totais',
        description:
          'Compare o valor da prestação e a diferença real de juros acumulados entre um prazo reduzido e um prazo estendido.',
        badge: 'Comparativo',
      },
      extraPayment: {
        title: 'Quanto posso economizar em juros pagando um valor extra todo mês?',
        description:
          'Veja como uma amortização mensal recorrente abate o saldo devedor e diminui expressivamente os juros futuros.',
        badge: 'Amortização extra',
      },
    },
  },
  ja: {
    heading: 'EMIローン返済額のシミュレーションと具体例',
    intro:
      '以下のページでは、当ツールの計算式（元利均等返済）を用いた具体的な返済計画シナリオを解説しています。借入金額、金利、返済期間、月収、繰り上げ返済額の違いが月々の返済額と総支払利息に与える影響をご確認いただけます。',
    viewAll: 'すべてのEMIローン返済シミュレーションを見る',
    cards: {
      affordability: {
        title: '月収から考える適正な毎月返済額（EMI）の目安は？',
        description:
          '金融機関が審査で重視する返済負担率（30〜40%）の目安と、収入に応じた無理のない借入限度額を解説します。',
        badge: '借入適正額',
      },
      tenureComparison: {
        title: '3年返済 vs 5年返済：毎月の返済額と総利息額の比較',
        description:
          '同じ借入金額でも返済期間（3年 vs 5年）によって月々の返済負担と総支払利息がどう変わるかを比較します。',
        badge: '期間比較',
      },
      extraPayment: {
        title: '毎月少し多めに返済すると利息はいくら節約できる？',
        description:
          '毎月の約定返済額に少額を上乗せして繰り上げ返済することで、返済期間短縮と利息削減がどう進むかを解説します。',
        badge: '繰り上げ返済',
      },
    },
  },
};
