import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, BarChart2 } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import DisclaimerBox from '@/components/DisclaimerBox';
import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';
import { loadTranslations, t } from '@/lib/translations';
import { getToolTranslation } from '@/lib/pilot-translations';
import { calcEmi, formatCurrency } from '@/data/emi-scenarios-data';

interface EmiTenureComparisonViewProps {
  locale?: Locale;
}

const PRINCIPAL = 10_000;
const RATE = 8;

interface LocalizedTenureContent {
  h1: string;
  intro: string;
  assumptionsTitle: string;
  assumptions: { label: string; value: string }[];
  workedTitle: string;
  formulaLabel: string;
  formulaNote: string;
  optATitle: string;
  optBTitle: string;
  lblMonthlyRate: string;
  lblMonths: string;
  lblEmi: string;
  lblTotalPaid: string;
  lblTotalInterest: string;
  tableTitle: string;
  thMetric: string;
  th3Year: string;
  th5Year: string;
  diffRowLabel: string;
  diffMoreInterest: string;
  diffLessMonthly: string;
  meaningTitle: string;
  bullets: string[];
  faqsTitle: string;
  faqs: { q: string; a: string }[];
  btnCalc: string;
  btnHub: string;
  btnAmort: string;
}

const CONTENT: Record<Locale, LocalizedTenureContent> = {
  en: {
    h1: '3-Year vs 5-Year Loan: Monthly EMI and Total Interest',
    intro:
      'Choosing a shorter or longer loan tenure is one of the most common trade-offs borrowers face. This page compares the two options side-by-side using a worked example, so you can see exactly what each choice costs in monthly payments and in total interest.',
    assumptionsTitle: 'Example Assumptions',
    assumptions: [
      { label: 'Loan Principal', value: '$10,000' },
      { label: 'Interest Rate', value: '8% per annum' },
      { label: 'Compounding', value: 'Monthly' },
      { label: 'Option A tenure', value: '3 years (36 months)' },
      { label: 'Option B tenure', value: '5 years (60 months)' },
      { label: 'Figures', value: 'Estimates, rounded to 2 decimals' },
    ],
    workedTitle: 'Worked Calculation',
    formulaLabel: 'EMI formula:',
    formulaNote: 'where r = annual rate ÷ 12 ÷ 100, n = months',
    optATitle: 'Option A — 3 Years (36 months)',
    optBTitle: 'Option B — 5 Years (60 months)',
    lblMonthlyRate: 'r = 8 ÷ 12 ÷ 100 = 0.6667%',
    lblMonths: 'n = ',
    lblEmi: 'EMI = ',
    lblTotalPaid: 'Total paid = ',
    lblTotalInterest: 'Total interest = ',
    tableTitle: 'Side-by-Side Comparison',
    thMetric: 'Metric',
    th3Year: '3-Year Loan',
    th5Year: '5-Year Loan',
    diffRowLabel: 'Difference (5yr − 3yr)',
    diffMoreInterest: 'more interest',
    diffLessMonthly: '/mo less',
    meaningTitle: 'What the Numbers Mean',
    bullets: [
      'Choosing 5 years instead of 3 lowers your monthly payment, offering breathing room if monthly cash flow is tight.',
      'However, you pay substantially more total interest over the life of the loan for that lower payment.',
      'Neither option is universally better: pick the shorter tenure if you can comfortably afford the payment, or the longer tenure if cash flow protection is your priority.',
    ],
    faqsTitle: 'Frequently Asked Questions',
    faqs: [
      {
        q: 'Why does the 5-year loan cost more in total even though the monthly payment is lower?',
        a: 'With a longer tenure, the outstanding principal stays unpaid for more months, accumulating interest over a longer timeframe.',
      },
      {
        q: 'Is a shorter loan always better?',
        a: 'Not necessarily. If the higher monthly EMI strains your budget and prevents savings or emergency funds, a 5-year loan may be safer.',
      },
      {
        q: 'How does the interest rate affect this comparison?',
        a: 'Higher rates widen the cost difference dramatically. At 12–15%, the extra interest on a 5-year term is much steeper.',
      },
      {
        q: 'Can I choose 5 years and prepay earlier?',
        a: 'Yes, if your lender allows prepayments without penalties, you can keep the flexibility of a low mandatory EMI while prepaying when possible.',
      },
    ],
    btnCalc: 'Open EMI Calculator',
    btnHub: 'View All EMI Scenarios',
    btnAmort: 'Amortization Calculator',
  },
  es: {
    h1: 'Préstamo a 3 años vs. 5 años: Cuota mensual e intereses totales',
    intro:
      'Elegir entre un plazo de amortización corto o largo es una decisión clave al pedir financiación. Esta comparativa analiza el impacto en la cuota mensual fija y en el sobrecoste total de intereses.',
    assumptionsTitle: 'Supuestos del ejemplo',
    assumptions: [
      { label: 'Capital del préstamo', value: '$10.000' },
      { label: 'Tipo de interés', value: '8% anual' },
      { label: 'Amortización', value: 'Mensual constante' },
      { label: 'Opción A (plazo)', value: '3 años (36 meses)' },
      { label: 'Opción B (plazo)', value: '5 años (60 meses)' },
      { label: 'Valores', value: 'Estimaciones redondeadas a 2 decimales' },
    ],
    workedTitle: 'Cálculo paso a paso',
    formulaLabel: 'Fórmula de amortización (cuota constante):',
    formulaNote: 'donde r = tasa anual ÷ 12 ÷ 100, n = meses',
    optATitle: 'Opción A — 3 Años (36 meses)',
    optBTitle: 'Opción B — 5 Años (60 meses)',
    lblMonthlyRate: 'r = 8 ÷ 12 ÷ 100 = 0,6667%',
    lblMonths: 'n = ',
    lblEmi: 'Cuota mensual = ',
    lblTotalPaid: 'Importe total pagado = ',
    lblTotalInterest: 'Intereses totales = ',
    tableTitle: 'Comparativa frente a frente',
    thMetric: 'Concepto',
    th3Year: 'Préstamo 3 Años',
    th5Year: 'Préstamo 5 Años',
    diffRowLabel: 'Diferencia (5 años vs. 3 años)',
    diffMoreInterest: 'más en intereses',
    diffLessMonthly: '/mes de ahorro en cuota',
    meaningTitle: 'Interpretación de los resultados',
    bullets: [
      'Alargar el plazo a 5 años rebaja la cuota mensual y desahoga el presupuesto cotidiano.',
      'Sin embargo, pagas un sobrecoste de intereses muy relevante a lo largo del crédito.',
      'Si tus ingresos te permiten asumir con holgura la cuota a 3 años, liquidarás tu deuda antes con el mínimo coste.',
    ],
    faqsTitle: 'Preguntas Frecuentes',
    faqs: [
      {
        q: '¿Por qué el préstamo a 5 años cuesta más si la cuota es menor?',
        a: 'Porque mantienes el dinero prestado durante dos años más, devengando intereses sobre el saldo pendiente durante 24 meses adicionales.',
      },
      {
        q: '¿Conviene siempre elegir el plazo más corto?',
        a: 'No siempre. Si la cuota alta compromete tu liquidez o fondo de emergencias, el plazo largo aporta mayor seguridad.',
      },
      {
        q: '¿Cómo influye la tasa de interés en esta diferencia?',
        a: 'A mayor tipo de interés, la brecha de costes se dispara exponencialmente.',
      },
      {
        q: '¿Puedo contratar a 5 años y amortizar anticipadamente?',
        a: 'Sí, siempre que las condiciones contractuales permitan amortizaciones parciales sin comisiones elevadas.',
      },
    ],
    btnCalc: 'Abrir Calculadora EMI',
    btnHub: 'Ver todos los escenarios',
    btnAmort: 'Calculadora de Amortización',
  },
  de: {
    h1: '3 Jahre vs. 5 Jahre Laufzeit: Monatsrate und Gesamtzinsen im Vergleich',
    intro:
      'Die Wahl zwischen kurzer und langer Kreditlaufzeit ist eine der zentralen Fragen jeder Finanzierung. Dieser Vergleich stellt Monatsrate und Gesamtzinskosten für 10.000 € gegenüber.',
    assumptionsTitle: 'Annahmen der Modellrechnung',
    assumptions: [
      { label: 'Kreditsumme', value: '10.000 €' },
      { label: 'Sollzinssatz', value: '8 % p. a.' },
      { label: 'Tilgungsart', value: 'Monatliche Annuität' },
      { label: 'Option A (Laufzeit)', value: '3 Jahre (36 Monate)' },
      { label: 'Option B (Laufzeit)', value: '5 Jahre (60 Monate)' },
      { label: 'Berechnung', value: 'Kaufmännisch gerundet' },
    ],
    workedTitle: 'Detaillierte Ratenberechnung',
    formulaLabel: 'Annuitätenformel:',
    formulaNote: 'wobei r = Jahreszins ÷ 12 ÷ 100, n = Monate',
    optATitle: 'Option A — 3 Jahre (36 Monate)',
    optBTitle: 'Option B — 5 Jahre (60 Monate)',
    lblMonthlyRate: 'r = 8 ÷ 12 ÷ 100 = 0,6667 %',
    lblMonths: 'n = ',
    lblEmi: 'Monatliche Rate = ',
    lblTotalPaid: 'Gesamtrückzahlung = ',
    lblTotalInterest: 'Zinsaufwand gesamt = ',
    tableTitle: 'Direkter Raten- und Zinsvergleich',
    thMetric: 'Kennzahl',
    th3Year: '3 Jahre Laufzeit',
    th5Year: '5 Jahre Laufzeit',
    diffRowLabel: 'Differenz (5 Jahre vs. 3 Jahre)',
    diffMoreInterest: 'mehr Zinsen',
    diffLessMonthly: '/Monat geringere Belastung',
    meaningTitle: 'Was bedeuten diese Zahlen für Sie?',
    bullets: [
      '5 Jahre Laufzeit schonen die monatliche Liquidität spürbar.',
      'Dafür bezahlen Sie insgesamt deutlich mehr Zinsen an die Bank.',
      'Wählen Sie 3 Jahre, wenn die Rate Ihr Budget nicht überlastet; wählen Sie 5 Jahre für maximale Ratenstabilität.',
    ],
    faqsTitle: 'Häufig gestellte Fragen',
    faqs: [
      {
        q: 'Warum ist der 5-Jahres-Kredit teurer trotz niedrigerer Monatsrate?',
        a: 'Weil die Darlehensschuld zwei Jahre länger verzinst wird.',
      },
      {
        q: 'Ist eine kürzere Laufzeit immer die beste Wahl?',
        a: 'Nur, wenn die höhere Monatsrate nicht zu Lasten wichtiger Rücklagen geht.',
      },
      {
        q: 'Wie wirkt sich das Zinsniveau aus?',
        a: 'Bei hohen Zinsen wie 10–12 % vergrößert sich der Mehrzinsaufwand der längeren Laufzeit drastisch.',
      },
      {
        q: 'Kann ich 5 Jahre wählen und Sondertilgungen leisten?',
        a: 'Ja, bei kostenlosen Sondertilgungen sichern Sie sich eine niedrige Pflichtrate und tilgen nach Möglichkeit schneller.',
      },
    ],
    btnCalc: 'Kreditratenrechner öffnen',
    btnHub: 'Alle Szenarien anzeigen',
    btnAmort: 'Tilgungsrechner',
  },
  fr: {
    h1: 'Prêt sur 3 ans vs 5 ans : Mensualité et coût total des intérêts',
    intro:
      'Arbitrer entre durée courte et durée longue est une étape clé lors de la souscription d\'un crédit. Cette analyse compare la mensualité et le coût total des intérêts pour un emprunt de 10 000 €.',
    assumptionsTitle: 'Hypothèses de calcul',
    assumptions: [
      { label: 'Capital emprunté', value: '10 000 €' },
      { label: 'Taux d\'intérêt', value: '8 % par an' },
      { label: 'Amortissement', value: 'Mensualités constantes' },
      { label: 'Option A (durée)', value: '3 ans (36 mois)' },
      { label: 'Option B (durée)', value: '5 ans (60 mois)' },
      { label: 'Chiffres', value: 'Arrondis à 2 décimales' },
    ],
    workedTitle: 'Détail des calculs actuariels',
    formulaLabel: 'Formule de mensualité constante :',
    formulaNote: 'avec r = taux annuel ÷ 12 ÷ 100, n = nombre de mensualités',
    optATitle: 'Option A — 3 Ans (36 mois)',
    optBTitle: 'Option B — 5 Ans (60 mois)',
    lblMonthlyRate: 'r = 8 ÷ 12 ÷ 100 = 0,6667 %',
    lblMonths: 'n = ',
    lblEmi: 'Mensualité fixe = ',
    lblTotalPaid: 'Montant total remboursé = ',
    lblTotalInterest: 'Coût total des intérêts = ',
    tableTitle: 'Tableau comparatif direct',
    thMetric: 'Indicateur',
    th3Year: 'Crédit 3 Ans',
    th5Year: 'Crédit 5 Ans',
    diffRowLabel: 'Écart (5 ans − 3 ans)',
    diffMoreInterest: 'd\'intérêts supplémentaires',
    diffLessMonthly: '/mois d\'allègement',
    meaningTitle: 'Enseignements pour votre choix',
    bullets: [
      'Emprunter sur 5 ans allège votre trésorerie mensuelle.',
      'En contrepartie, vous payez un surcoût d\'intérêts substantiel.',
      'Si votre budget le supporte aisément, la durée sur 3 ans reste la solution la plus économique.',
    ],
    faqsTitle: 'Questions Fréquentes',
    faqs: [
      {
        q: 'Pourquoi le prêt sur 5 ans coûte-t-il plus cher au global ?',
        a: 'Le capital restant dû génère des intérêts pendant 24 mois supplémentaires.',
      },
      {
        q: 'Une durée courte est-elle toujours préférable ?',
        a: 'Pas si la mensualité accrue vous prive de votre capacité d\'épargne de précaution.',
      },
      {
        q: 'Quel est l\'effet d\'un taux d\'intérêt plus élevé ?',
        a: 'L\'écart de coût des intérêts se creuse d\'autant plus que le taux nominal augmente.',
      },
      {
        q: 'Peut-on choisir 5 ans et rembourser par anticipation ?',
        a: 'Oui, si les indemnités de remboursement anticipé sont réduites ou nulles.',
      },
    ],
    btnCalc: 'Ouvrir le Calculateur EMI',
    btnHub: 'Voir tous les scénarios',
    btnAmort: 'Calculateur d\'Amortissement',
  },
  pt: {
    h1: 'Financiamento em 3 anos vs. 5 anos: Parcela mensal e juros totais',
    intro:
      'Optar por um prazo mais curto ou mais longo é uma das decisões mais importantes no crédito. Veja este comparativo direto para um financiamento de R$ 10.000.',
    assumptionsTitle: 'Premissas do cálculo',
    assumptions: [
      { label: 'Valor financiado', value: 'R$ 10.000' },
      { label: 'Taxa de juros', value: '8% ao ano' },
      { label: 'Sistema', value: 'Tabela Price (parcelas fixas)' },
      { label: 'Opção A (prazo)', value: '3 anos (36 meses)' },
      { label: 'Opção B (prazo)', value: '5 anos (60 meses)' },
      { label: 'Valores', value: 'Estimativas arredondadas' },
    ],
    workedTitle: 'Cálculo passo a passo',
    formulaLabel: 'Fórmula da Tabela Price:',
    formulaNote: 'onde r = taxa anual ÷ 12 ÷ 100, n = número de parcelas',
    optATitle: 'Opção A — 3 Anos (36 meses)',
    optBTitle: 'Opção B — 5 Anos (60 meses)',
    lblMonthlyRate: 'r = 8 ÷ 12 ÷ 100 = 0,6667%',
    lblMonths: 'n = ',
    lblEmi: 'Parcela mensal = ',
    lblTotalPaid: 'Total desembolsado = ',
    lblTotalInterest: 'Juros acumulados = ',
    tableTitle: 'Comparativo lado a lado',
    thMetric: 'Indicador',
    th3Year: 'Prazo 3 Anos',
    th5Year: 'Prazo 5 Anos',
    diffRowLabel: 'Diferença (5 anos − 3 anos)',
    diffMoreInterest: 'a mais em juros',
    diffLessMonthly: '/mês de alívio na prestação',
    meaningTitle: 'O que esses números significam',
    bullets: [
      'Estender para 5 anos reduz a parcela mensal e desonera o fluxo de caixa diário.',
      'Por outro lado, o valor total de juros desembolsado é bem mais alto.',
      'Se a sua renda comporta a parcela de 3 anos com segurança, você se livra da dívida mais rápido e gasta menos.',
    ],
    faqsTitle: 'Perguntas Frequentes',
    faqs: [
      {
        q: 'Por que o financiamento de 5 anos custa mais no total?',
        a: 'Porque os juros incidem sobre o saldo devedor por 24 meses a mais.',
      },
      {
        q: 'Um prazo menor é sempre a melhor escolha?',
        a: 'Apenas se a prestação não comprometer o sustento da família e a reserva financeira.',
      },
      {
        q: 'Qual o efeito de taxas de juros mais altas?',
        a: 'Em taxas elevadas (12–15% a.a.), a diferença de juros entre os dois prazos aumenta substancialmente.',
      },
      {
        q: 'Posso contratar em 5 anos e amortizar antes?',
        a: 'Sim, a legislação garante o abatimento proporcional de juros na amortização antecipada.',
      },
    ],
    btnCalc: 'Abrir Calculadora de Parcelas',
    btnHub: 'Ver todos os cenários',
    btnAmort: 'Calculadora de Amortização',
  },
  ja: {
    h1: '3年返済 vs 5年返済：毎月の返済額と総利息額の比較',
    intro:
      '返済期間を短く設定するか、長く設定するかはローン契約時の最大の分岐点です。借入額10,000ドル（約100万円〜150万円相当）を例に、月々の返済額と総支払利息の差を比較解説します。',
    assumptionsTitle: 'シミュレーションの前提条件',
    assumptions: [
      { label: '借入金額', value: '$10,000' },
      { label: '適用金利', value: '年利8%（固定）' },
      { label: '返済方式', value: '元利均等返済' },
      { label: 'プランA（返済期間）', value: '3年（36回払い）' },
      { label: 'プランB（返済期間）', value: '5年（60回払い）' },
      { label: '端数処理', value: '四捨五入（概算値）' },
    ],
    workedTitle: '元利均等返済の計算内訳',
    formulaLabel: '返済額計算式（元利均等）：',
    formulaNote: '※ r ＝ 月利（年利÷12÷100）、n ＝ 返済月数',
    optATitle: 'プランA — 3年返済（36回）',
    optBTitle: 'プランB — 5年返済（60回）',
    lblMonthlyRate: 'r ＝ 8 ÷ 12 ÷ 100 ＝ 0.6667%',
    lblMonths: 'n ＝ ',
    lblEmi: '毎月の返済額 ＝ ',
    lblTotalPaid: '総返済額 ＝ ',
    lblTotalInterest: '総利息額 ＝ ',
    tableTitle: '返済期間別 比較一覧表',
    thMetric: '比較項目',
    th3Year: '3年返済',
    th5Year: '5年返済',
    diffRowLabel: '差額（5年返済 − 3年返済）',
    diffMoreInterest: '利息負担増',
    diffLessMonthly: '／月の負担軽減',
    meaningTitle: '比較結果からわかるポイント',
    bullets: [
      '5年返済を選ぶと毎月の返済額が抑えられ、家計の資金繰りにゆとりが生まれます。',
      'しかし、借入期間が長い分、最終的に支払う利息総額は大幅に増加します。',
      '家計に余裕があれば3年返済で早期完済を目指し、毎月の安定を最優先するなら5年返済を選ぶのが定石です。',
    ],
    faqsTitle: 'よくある質問',
    faqs: [
      {
        q: '毎月の支払いが少ない5年返済の方がなぜ総額は高いのですか？',
        a: '元金の返済スピードが遅く、借入残高に対して利息が発生する期間が2年間長くなるためです。',
      },
      {
        q: '常に短い返済期間を選ぶべきですか？',
        a: 'いいえ。返済額が高すぎて緊急時の蓄えができなくなるリスクがある場合は、長めの期間が無難です。',
      },
      {
        q: '金利水準による影響の違いは？',
        a: '金利が高いローンほど、期間を延ばした際の利息増加額が跳ね上がります。',
      },
      {
        q: '5年で契約して繰り上げ返済することは可能ですか？',
        a: 'はい、繰り上げ返済手数料が無料または少額のローンであれば、最も柔軟でおすすめな方法です。',
      },
    ],
    btnCalc: '返済額計算ツールを開く',
    btnHub: 'すべてのシミュレーションを見る',
    btnAmort: '元利均等返済スケジュール計算',
  },
};

export default function EmiTenureComparisonView({ locale = DEFAULT_LOCALE }: EmiTenureComparisonViewProps) {
  const common = loadTranslations(locale);
  const toolContent = getToolTranslation('emi-calculator', locale);
  const tData = CONTENT[locale] || CONTENT.en;
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const homeLabel = t(common, 'nav.home') || 'Home';
  const financeLabel = t(common, 'categories.finance') || 'Finance';
  const toolName = toolContent?.name || 'EMI Calculator';

  const three = calcEmi(PRINCIPAL, RATE, 36);
  const five = calcEmi(PRINCIPAL, RATE, 60);
  const extraInterest = Math.round((five.totalInterest - three.totalInterest) * 100) / 100;
  const monthlyDiff = Math.round((three.emi - five.emi) * 100) / 100;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800/80 px-4 py-2.5 rounded-xl flex-wrap"
      >
        <Link href={prefix || '/'} className="hover:text-gray-950 dark:hover:text-white flex items-center gap-1">
          <Home className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{homeLabel}</span>
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <Link href={`${prefix}/#finance`} className="hover:text-gray-950 dark:hover:text-white">{financeLabel}</Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <Link href={`${prefix}/tools/emi-calculator`} className="hover:text-gray-950 dark:hover:text-white">{toolName}</Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <Link href={`${prefix}/tools/emi-calculator/scenarios`} className="hover:text-gray-950 dark:hover:text-white">
          {locale === 'en' ? 'Scenarios' : 'Scenarios'}
        </Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <span className="text-[#f97316] dark:text-blue-400 font-bold truncate">{tData.h1}</span>
      </nav>

      {/* Top Ad */}
      <AdBanner
        adCode={process.env.NEXT_PUBLIC_ADSTERRA_BANNER_1 || ''}
        width={728}
        height={90}
      />

      {/* Header */}
      <div className="mt-6 mb-8 flex items-start gap-3">
        <BarChart2 className="h-7 w-7 text-[#f97316] shrink-0 mt-1" aria-hidden="true" />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {tData.h1}
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-blue-200/80 leading-relaxed max-w-2xl">
            {tData.intro}
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Assumptions */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            {tData.assumptionsTitle}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {tData.assumptions.map((item) => (
              <div
                key={item.label}
                className="bg-gray-50 dark:bg-gray-800/40 p-3 rounded-xl border border-gray-100 dark:border-gray-800"
              >
                <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-400 dark:text-gray-500 mb-0.5">
                  {item.label}
                </p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Calculation cards */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {tData.workedTitle}
          </h2>
          <div className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl border border-gray-200 dark:border-gray-800 font-mono text-xs text-gray-700 dark:text-gray-200">
            <p className="font-bold mb-2 uppercase tracking-wider text-[10px] text-gray-400">{tData.formulaLabel}</p>
            <p>EMI = P × r × (1 + r)^n ÷ ((1 + r)^n − 1)</p>
            <p className="mt-1 text-gray-500 dark:text-gray-400">{tData.formulaNote}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* 3-year */}
            <div className="bg-blue-50/30 dark:bg-blue-950/10 border border-blue-100/40 dark:border-blue-900/20 p-5 rounded-xl">
              <p className="text-xs font-bold uppercase tracking-wider text-[#1a3c5e] dark:text-blue-300 mb-3">
                {tData.optATitle}
              </p>
              <div className="space-y-1 text-sm text-slate-700 dark:text-slate-300">
                <p>{tData.lblMonthlyRate}</p>
                <p>{tData.lblMonths}36</p>
                <p>
                  {tData.lblEmi}
                  <strong className="text-[#1a3c5e] dark:text-blue-300">
                    {formatCurrency(three.emi, locale, 2)}
                  </strong>
                </p>
                <p>{tData.lblTotalPaid}<strong>{formatCurrency(three.totalPayment, locale, 2)}</strong></p>
                <p>
                  {tData.lblTotalInterest}
                  <strong className="text-[#f97316]">
                    {formatCurrency(three.totalInterest, locale, 2)}
                  </strong>
                </p>
              </div>
            </div>

            {/* 5-year */}
            <div className="bg-orange-50/30 dark:bg-orange-950/10 border border-orange-100/40 dark:border-orange-900/20 p-5 rounded-xl">
              <p className="text-xs font-bold uppercase tracking-wider text-[#f97316] mb-3">
                {tData.optBTitle}
              </p>
              <div className="space-y-1 text-sm text-slate-700 dark:text-slate-300">
                <p>{tData.lblMonthlyRate}</p>
                <p>{tData.lblMonths}60</p>
                <p>
                  {tData.lblEmi}
                  <strong className="text-[#f97316]">
                    {formatCurrency(five.emi, locale, 2)}
                  </strong>
                </p>
                <p>{tData.lblTotalPaid}<strong>{formatCurrency(five.totalPayment, locale, 2)}</strong></p>
                <p>
                  {tData.lblTotalInterest}
                  <strong className="text-[#f97316]">
                    {formatCurrency(five.totalInterest, locale, 2)}
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Side by side comparison table */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">
            {tData.tableTitle}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                  <th className="py-3 pr-4 font-semibold">{tData.thMetric}</th>
                  <th className="py-3 pr-4 font-semibold text-[#1a3c5e] dark:text-blue-300">{tData.th3Year}</th>
                  <th className="py-3 font-semibold text-[#f97316]">{tData.th5Year}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/20 transition-colors">
                  <td className="py-3 pr-4 text-gray-600 dark:text-gray-400 font-medium">Principal</td>
                  <td className="py-3 pr-4 font-bold text-[#1a3c5e] dark:text-blue-300">{formatCurrency(PRINCIPAL, locale)}</td>
                  <td className="py-3 font-bold text-[#f97316]">{formatCurrency(PRINCIPAL, locale)}</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/20 transition-colors">
                  <td className="py-3 pr-4 text-gray-600 dark:text-gray-400 font-medium">Rate (p.a.)</td>
                  <td className="py-3 pr-4 font-bold text-[#1a3c5e] dark:text-blue-300">8%</td>
                  <td className="py-3 font-bold text-[#f97316]">8%</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800/30">
                  <td className="py-3 pr-4 text-gray-600 dark:text-gray-400 font-medium">Monthly EMI</td>
                  <td className="py-3 pr-4 font-bold text-[#1a3c5e] dark:text-blue-300">{formatCurrency(three.emi, locale, 2)}</td>
                  <td className="py-3 font-bold text-[#f97316]">{formatCurrency(five.emi, locale, 2)}</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/20 transition-colors">
                  <td className="py-3 pr-4 text-gray-600 dark:text-gray-400 font-medium">Total Paid</td>
                  <td className="py-3 pr-4 font-bold text-[#1a3c5e] dark:text-blue-300">{formatCurrency(three.totalPayment, locale, 2)}</td>
                  <td className="py-3 font-bold text-[#f97316]">{formatCurrency(five.totalPayment, locale, 2)}</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800/30">
                  <td className="py-3 pr-4 text-gray-600 dark:text-gray-400 font-medium">Total Interest</td>
                  <td className="py-3 pr-4 font-bold text-[#1a3c5e] dark:text-blue-300">{formatCurrency(three.totalInterest, locale, 2)}</td>
                  <td className="py-3 font-bold text-[#f97316]">{formatCurrency(five.totalInterest, locale, 2)}</td>
                </tr>
                <tr className="border-t-2 border-gray-200 dark:border-gray-700 bg-amber-50/40 dark:bg-amber-950/10">
                  <td className="py-3 pr-4 font-bold text-gray-900 dark:text-white">
                    {tData.diffRowLabel}
                  </td>
                  <td colSpan={2} className="py-3 font-bold text-gray-900 dark:text-white">
                    <span className="text-[#f97316]">+{formatCurrency(extraInterest, locale, 2)} {tData.diffMoreInterest}</span>
                    {' '}·{' '}
                    <span className="text-[#1a3c5e] dark:text-blue-300">{formatCurrency(monthlyDiff, locale, 2)}{tData.diffLessMonthly}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Meaning */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            {tData.meaningTitle}
          </h2>
          <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            {tData.bullets.map((b, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-[#f97316] font-bold shrink-0">•</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Disclaimer */}
        <DisclaimerBox type="finance" compact={false} />

        {/* FAQs */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            {tData.faqsTitle}
          </h2>
          <div className="space-y-5 divide-y divide-gray-100 dark:divide-gray-800">
            {tData.faqs.map((faq, i) => (
              <div key={i} className={i === 0 ? '' : 'pt-5'}>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1.5">{faq.q}</h3>
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Nav links */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href={`${prefix}/tools/emi-calculator`}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-white bg-[#1a3c5e] dark:bg-blue-600 hover:bg-[#112942] dark:hover:bg-blue-700 px-4 py-2.5 rounded-lg transition-colors"
          >
            {tData.btnCalc}
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href={`${prefix}/tools/emi-calculator/scenarios`}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1a3c5e] dark:text-blue-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
          >
            {tData.btnHub}
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href={`${prefix}/tools/amortization-calculator`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316] px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
          >
            {tData.btnAmort}
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
