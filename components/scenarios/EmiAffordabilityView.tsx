import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, DollarSign } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import DisclaimerBox from '@/components/DisclaimerBox';
import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';
import { loadTranslations, t } from '@/lib/translations';
import { getToolTranslation } from '@/lib/pilot-translations';
import { maxLoan, formatCurrency } from '@/data/emi-scenarios-data';

interface EmiAffordabilityViewProps {
  locale?: Locale;
}

const RATE = 8;
const MONTHS = 60;

const INCOME_LEVELS = [3000, 4000, 5000, 6000, 7000];

interface LocalizedAffordabilityContent {
  h1: string;
  intro: string;
  sec1Title: string;
  sec1P1: string;
  sec1P2: string;
  formulaBoxTitle: string;
  formulaBoxText: string;
  assumptionsNote: string;
  workedTitle: string;
  workedIntro: string;
  step1: string;
  step2: string;
  step3: string;
  stepFactor: string;
  maxPrincipalResult: string;
  calcPrecisionNote: string;
  tableTitle: string;
  tableAssumptions: string;
  thIncome: string;
  thMaxEmi: string;
  thMaxPrincipal: string;
  tableFootnote: string;
  meaningTitle: string;
  bullets: string[];
  faqsTitle: string;
  faqs: { q: string; a: string }[];
  btnCalc: string;
  btnHub: string;
  btnAmort: string;
}

const CONTENT: Record<Locale, LocalizedAffordabilityContent> = {
  en: {
    h1: 'How Much EMI Can I Afford on My Monthly Income?',
    intro:
      'A common rule of thumb used for loan planning is to keep your total monthly loan repayments (EMI) at or below 40–50% of your monthly take-home income. This page shows what that limit means in practice for several income levels, using a fixed worked example — not a personalised assessment.',
    sec1Title: 'The Income-to-EMI Guideline',
    sec1P1:
      'Lenders and personal-finance guidelines generally recommend that your total monthly loan payments — across all loans — should not exceed 40% to 50% of your monthly income. A widely used planning target is 40%.',
    sec1P2:
      'The practical reason: keeping EMI within this range leaves enough room for living expenses, savings, and unexpected costs. If your EMI exceeds roughly half your income, managing month-to-month cash flow becomes noticeably harder.',
    formulaBoxTitle: 'Affordability rule (planning estimate only):',
    formulaBoxText: 'Maximum affordable EMI = Monthly take-home income × 0.40',
    assumptionsNote:
      'Assumptions for this example: The 40% figure is applied to take-home (net) income. Your lender may use gross income or a different percentage. This is a planning estimate, not a credit decision.',
    workedTitle: 'Worked Example: $4,000 Monthly Income',
    workedIntro: 'Suppose your monthly take-home income is $4,000. Applying the 40% guideline:',
    step1: 'Maximum affordable EMI = $4,000 × 40% = $1,600/month',
    step2: 'Assume an interest rate of 8% per annum and a loan tenure of 5 years (60 months).',
    step3: 'Using the EMI formula to find the loan principal that produces an EMI of $1,600:',
    stepFactor: 'Monthly interest rate (r) = 8 ÷ 12 ÷ 100 = 0.6667% · Term = 60 months · Factor ≈ 0.02028',
    maxPrincipalResult: 'Maximum loan principal ≈ $1,600 ÷ 0.02028 ≈ $78,900 (estimate)',
    calcPrecisionNote: 'Results are rounded estimates. Use the EMI Calculator with your exact figures to get precise results.',
    tableTitle: 'Affordability Table by Income Level',
    tableAssumptions: 'Assumptions: 40% income-to-EMI ratio · Interest rate 8% p.a. · Loan tenure 5 years · All figures are estimates.',
    thIncome: 'Monthly Income',
    thMaxEmi: 'Max EMI (40%)',
    thMaxPrincipal: 'Est. Max Loan Principal',
    tableFootnote: 'These figures are illustrative estimates for planning only. Actual eligibility depends on credit score, existing obligations, and lender policy.',
    meaningTitle: 'What This Means for Your Loan Decision',
    bullets: [
      'The table shows the maximum loan you could potentially service at a given income — not how much a lender will approve. Approval also depends on credit history, existing debt, and lender policy.',
      'A longer tenure (e.g. 7 years instead of 5) reduces the monthly EMI for the same principal, allowing a larger loan within the same income ceiling — but increases total interest paid.',
      'If you have existing EMIs (car loan, student loan, etc.), subtract those from the maximum affordable EMI before estimating how much you can borrow for a new loan.',
    ],
    faqsTitle: 'Frequently Asked Questions',
    faqs: [
      {
        q: 'Is the 40% rule a hard limit?',
        a: 'No. The 40–50% guideline is a commonly used planning rule, not a universal legal cap. Different lenders have different policies. Always check directly with your lender.',
      },
      {
        q: 'Does the ratio apply to gross income or take-home (net) income?',
        a: 'Lenders often assess eligibility using gross income, but it is safer to plan affordability using your take-home (net) pay so you are not over-committing.',
      },
      {
        q: 'Does this include existing loan payments?',
        a: 'Yes, lenders assess total debt obligations — all existing EMIs plus the new proposed EMI relative to income.',
      },
      {
        q: 'Why do the loan amounts change if I use a different interest rate?',
        a: 'A higher interest rate increases the monthly payment for a given principal, so the same maximum EMI supports a smaller loan.',
      },
    ],
    btnCalc: 'Open EMI Calculator',
    btnHub: 'View All EMI Scenarios',
    btnAmort: 'Amortization Calculator',
  },
  es: {
    h1: '¿Cuánta cuota (EMI) puedo permitirme según mis ingresos?',
    intro:
      'Una regla práctica habitual en finanzas personales es limitar el pago total mensual de cuotas al 40–50% de tus ingresos netos mensuales. Esta página explica qué implica este límite para varios niveles de sueldo con un ejemplo numérico detallado.',
    sec1Title: 'La regla del porcentaje de ingresos frente a la cuota',
    sec1P1:
      'Las entidades bancarias y asesores recomiendan que la suma de todas las cuotas de tus préstamos no supere el 40% o 50% de tus ingresos netos mensuales. El objetivo de referencia suele fijarse en el 40%.',
    sec1P2:
      'El motivo: mantener las cuotas en este umbral deja margen suficiente para vivienda, alimentación, ahorro y gastos imprevistos.',
    formulaBoxTitle: 'Fórmula de capacidad de pago (estimación orientativa):',
    formulaBoxText: 'Cuota máxima recomendada = Ingresos netos mensuales × 0,40',
    assumptionsNote:
      'Supuestos: Se aplica el 40% a ingresos netos disponibles. Las políticas bancarias pueden usar ingresos brutos o baremos diferentes.',
    workedTitle: 'Ejemplo práctico: Ingresos mensuales de $4.000',
    workedIntro: 'Supongamos unos ingresos netos disponibles de $4.000 al mes aplicando el criterio del 40%:',
    step1: 'Cuota mensual máxima = $4.000 × 40% = $1.600/mes',
    step2: 'Tasa de interés supuesta del 8% anual y plazo de amortización de 5 años (60 meses).',
    step3: 'Aplicando la fórmula de amortización francesa para hallar el capital financiable con esa cuota:',
    stepFactor: 'Tasa mensual (r) = 8 ÷ 12 ÷ 100 = 0,6667% · Plazo = 60 meses · Factor actuarielle ≈ 0,02028',
    maxPrincipalResult: 'Capital máximo estimado ≈ $1.600 ÷ 0,02028 ≈ $78.900 (estimado)',
    calcPrecisionNote: 'Los resultados son estimaciones orientativas. Usa la Calculadora EMI para personalizar tus números exactos.',
    tableTitle: 'Tabla orientativa de cuota máxima según ingresos',
    tableAssumptions: 'Supuestos: 40% de ingresos netos · Tasa 8% anual · Plazo 5 años · Cifras redondeadas.',
    thIncome: 'Ingresos Mensuales',
    thMaxEmi: 'Cuota Máxima (40%)',
    thMaxPrincipal: 'Capital Máximo Estimado',
    tableFootnote: 'Valores informativos para planificación financiera. La aprobación definitiva depende del scoring bancario y deudas previas.',
    meaningTitle: 'Qué significa esto para tu préstamo',
    bullets: [
      'Muestra el préstamo máximo que tu presupuesto puede sostener con comodidad, no una garantía de concesión bancaria.',
      'Un plazo mayor (7 años en lugar de 5) reduce la cuota mensual, permitiendo pedir más capital dentro del mismo porcentaje, pero eleva los intereses totales.',
      'Si ya pagas otras cuotas (coche, tarjetas), réstalas antes de calcular la cuota disponible para un nuevo crédito.',
    ],
    faqsTitle: 'Preguntas Frecuentes',
    faqs: [
      {
        q: '¿Es el 40% un límite obligatorio e inamovible?',
        a: 'No, es una pauta prudencial de gestión presupuestaria. Cada banco tiene sus propios criterios de concesión.',
      },
      {
        q: '¿Se aplica sobre el sueldo bruto o el salario neto?',
        a: 'Los bancos evalúan ambos, pero para tu tranquilidad personal es mucho más seguro planificar con el dinero neto que ingresas en cuenta.',
      },
      {
        q: '¿Incluye este cálculo otros créditos vigentes?',
        a: 'Sí. El porcentaje debe abarcar todas las deudas activas combinadas.',
      },
      {
        q: '¿Cómo cambia el capital prestado si varía el tipo de interés?',
        a: 'A mayor tipo de interés, mayor proporción de la cuota se destina a intereses, reduciendo el capital que puedes solicitar.',
      },
    ],
    btnCalc: 'Abrir Calculadora EMI',
    btnHub: 'Ver todos los escenarios',
    btnAmort: 'Calculadora de Amortización',
  },
  de: {
    h1: 'Wie viel Kreditrate kann ich mir mit meinem Einkommen leisten?',
    intro:
      'Als bewährte Faustregel in der Finanzplanung gilt, dass die monatliche Kreditbelastung 40–50 % des Nettoeinkommens nicht übersteigen sollte. Diese Seite zeigt anhand eines Rechenbeispiels, was das in der Praxis bedeutet.',
    sec1Title: 'Die Richtlinie zur Ratenbelastung (Schuldendienstquote)',
    sec1P1:
      'Banken und Finanzexperten empfehlen, dass alle monatlichen Darlehensraten zusammen maximal 40 % bis 50 % des Nettoeinkommens ausmachen sollten. 40 % gelten als sichere Obergrenze.',
    sec1P2:
      'So bleibt ausreichend finanzieller Puffer für Lebenshaltungskosten, Altersvorsorge und unerwartete Ausgaben.',
    formulaBoxTitle: 'Faustformel für die maximale Rate:',
    formulaBoxText: 'Maximal tragbare Monatsrate = Monatliches Nettoeinkommen × 0,40',
    assumptionsNote:
      'Annahmen: 40 % bezogen auf das monatliche Nettoeinkommen. Dient als Orientierung, ersetzt keine Bankprüfung.',
    workedTitle: 'Rechenbeispiel: 4.000 € monatliches Nettoeinkommen',
    workedIntro: 'Bei einem Haushaltsnettoeinkommen von 4.000 € und der 40-%-Regel ergibt sich:',
    step1: 'Maximal tragbare Monatsrate = 4.000 € × 40 % = 1.600 €/Monat',
    step2: 'Angenommener Zinssatz von 8 % p. a. und 5 Jahre Laufzeit (60 Monate).',
    step3: 'Berechnung des maximalen Darlehensbetrags anhand der Annuitätenformel:',
    stepFactor: 'Monatszins (r) = 8 ÷ 12 ÷ 100 = 0,6667 % · Laufzeit = 60 Monate · Annuitätenfaktor ≈ 0,02028',
    maxPrincipalResult: 'Maximaler Darlehensbetrag ≈ 1.600 € ÷ 0,02028 ≈ 78.900 € (Schätzwert)',
    calcPrecisionNote: 'Gerundete Richtwerte. Nutzen Sie den Kreditrechner für exakte Berechnungen.',
    tableTitle: 'Übersicht: Einkommen und maximale Kreditrate',
    tableAssumptions: 'Annahmen: 40 % Belastungsquote · 8 % Sollzins p. a. · 5 Jahre Laufzeit.',
    thIncome: 'Monatseinkommen',
    thMaxEmi: 'Max. Rate (40 %)',
    thMaxPrincipal: 'Geschätzter Kreditbetrag',
    tableFootnote: 'Dient der unverbindlichen Orientierung. Bonitätsprüfung und bestehende Verpflichtungen vorbehalten.',
    meaningTitle: 'Bedeutung für Ihre Finanzierungsentscheidung',
    bullets: [
      'Zeigt, welchen Kreditbetrag Ihr Budget tragen kann – keine Kreditzusage durch eine Bank.',
      'Eine längere Laufzeit senkt die Monatsrate, erhöht jedoch den Gesamtzinsaufwand spürbar.',
      'Bestehende Monatsraten (Auto, Ratenkauf) müssen vom Spielraum abgezogen werden.',
    ],
    faqsTitle: 'Häufig gestellte Fragen',
    faqs: [
      {
        q: 'Gilt die 40-%-Grenze gesetzlich verpflichtend?',
        a: 'Nein, es handelt sich um eine bewährte Planungsregel. Kreditinstitute wenden eigene Haushaltsrechnungen an.',
      },
      {
        q: 'Berechnet man dies vom Brutto- oder Nettoeinkommen?',
        a: 'Für die private Budgetplanung empfiehlt sich stets das tatsächlich verfügbare Nettoeinkommen.',
      },
      {
        q: 'Sind bestehende Kredite einzubeziehen?',
        a: 'Ja, die Quote gilt für alle laufenden Ratenverpflichtungen insgesamt.',
      },
      {
        q: 'Welchen Einfluss hat der Zinssatz?',
        a: 'Höhere Zinsen binden einen größeren Ratenanteil für den Zinsdienst, wodurch der tilgbare Darlehensbetrag sinkt.',
      },
    ],
    btnCalc: 'Kreditratenrechner öffnen',
    btnHub: 'Alle Szenarien anzeigen',
    btnAmort: 'Tilgungsrechner',
  },
  fr: {
    h1: 'Quelle mensualité (EMI) puis-je assumer avec mes revenus ?',
    intro:
      'Une règle courante en matière de gestion budgétaire consiste à plafonner le total de ses remboursements d\'emprunt à 33–40 % de ses revenus nets mensuels. Cette page illustre ce calcul à travers des exemples concrets.',
    sec1Title: 'La règle du taux d\'endettement maximal',
    sec1P1:
      'Les organismes financiers et conseillers recommandent généralement que l\'ensemble de vos mensualités de crédit n\'excède pas 35 à 40 % de vos revenus nets. 40 % constitue un plafond de sécurité.',
    sec1P2:
      'Ce plafond garantit un reste à vivre suffisant pour les charges fixes, l\'épargne et les imprévus.',
    formulaBoxTitle: 'Formule de capacité de remboursement :',
    formulaBoxText: 'Mensualité maximale conseillée = Revenus nets mensuels × 0,40',
    assumptionsNote:
      'Hypothèses : 40 % des revenus nets du foyer. Estimation budgétaire ne valant pas accord de financement.',
    workedTitle: 'Exemple chiffré : Revenus de 4 000 € / mois',
    workedIntro: 'Pour un revenu net mensuel de 4 000 € avec une limite de 40 % :',
    step1: 'Mensualité maximale recommandée = 4 000 € × 40 % = 1 600 €/mois',
    step2: 'Hypothèse d\'un taux d\'intérêt de 8 % par an sur 5 ans (60 mois).',
    step3: 'Application de la formule actuarielle pour déterminer le capital empruntable :',
    stepFactor: 'Taux mensuel (r) = 8 ÷ 12 ÷ 100 = 0,6667 % · Durée = 60 mois · Facteur ≈ 0,02028',
    maxPrincipalResult: 'Capital empruntable estimé ≈ 1 600 € ÷ 0,02028 ≈ 78 900 € (estimation)',
    calcPrecisionNote: 'Estimations indicatives. Utilisez le simulateur pour vos paramètres exacts.',
    tableTitle: 'Barème indicatif de mensualité et capacité d\'emprunt',
    tableAssumptions: 'Hypothèses : Taux d\'endettement 40 % · Taux 8 % / an · Durée 5 ans.',
    thIncome: 'Revenus Mensuels',
    thMaxEmi: 'Mensualité Max (40 %)',
    thMaxPrincipal: 'Capital Max Estimé',
    tableFootnote: 'Chiffres indicatifs pour vous aider à préparer votre projet de crédit.',
    meaningTitle: 'Conseils pour votre décision d\'emprunt',
    bullets: [
      'Ce barème indique le capital théorique supportable, sans préjuger de la décision finale de la banque.',
      'Allonger la durée réduit la mensualité mais majore sensiblement le coût total des intérêts.',
      'Déduisez toujours vos crédits en cours pour connaître votre mensualité résiduelle disponible.',
    ],
    faqsTitle: 'Questions Fréquentes',
    faqs: [
      {
        q: 'Le seuil de 40 % est-il une obligation légale ?',
        a: 'En France, le HCSF fixe généralement un seuil d\'endettement à 35 % pour les crédits immobiliers. 40 % est une référence budgétaire générale.',
      },
      {
        q: 'Le calcul repose-t-il sur le net ou le brut ?',
        a: 'Pour une gestion saine au quotidien, basez-vous toujours sur votre revenu net réellement disponible.',
      },
      {
        q: 'Doit-on intégrer les autres prêts en cours ?',
        a: 'Oui, le plafond s\'applique au cumul de l\'ensemble de vos mensualités.',
      },
      {
        q: 'Quel est l\'impact du taux d\'intérêt ?',
        a: 'Plus le taux est élevé, plus les intérêts pèsent lourd dans chaque mensualité, diminuant ainsi le capital empruntable.',
      },
    ],
    btnCalc: 'Ouvrir le Calculateur EMI',
    btnHub: 'Voir tous les scénarios',
    btnAmort: 'Calculateur d\'Amortissement',
  },
  pt: {
    h1: 'Qual parcela de empréstimo posso pagar com a minha renda mensal?',
    intro:
      'Uma regra fundamental de educação financeira é não comprometer mais do que 30% a 40% da renda líquida mensal com parcelas de empréstimos e financiamentos. Veja nesta página o que isso significa na prática com exemplos numéricos.',
    sec1Title: 'O limite recomendado de comprometimento de renda',
    sec1P1:
      'Bancos e especialistas em finanças pessoais recomendam que o total de prestações de dívidas não ultrapasse 40% da renda líquida comprovada.',
    sec1P2:
      'Esse teto preserva a margem necessária para despesas essenciais, alimentação, reserva de emergência e lazer.',
    formulaBoxTitle: 'Fórmula de estimativa de parcela máxima:',
    formulaBoxText: 'Parcela máxima recomendada = Renda líquida mensal × 0,40',
    assumptionsNote:
      'Premissas: 40% sobre a renda líquida. Valor de referência para planejamento, sujeito a análise cadastral.',
    workedTitle: 'Exemplo prático: Renda mensal de R$ 4.000',
    workedIntro: 'Com uma renda líquida disponível de R$ 4.000 e teto de comprometimento de 40%:',
    step1: 'Parcela máxima recomendada = R$ 4.000 × 40% = R$ 1.600/mês',
    step2: 'Taxa de juros estimada em 8% ao ano com prazo de 5 anos (60 meses).',
    step3: 'Cálculo do valor financiado suportado por essa prestação:',
    stepFactor: 'Taxa mensal (r) = 8 ÷ 12 ÷ 100 = 0,6667% · Prazo = 60 meses · Coeficiente ≈ 0,02028',
    maxPrincipalResult: 'Valor financiado máximo estimado ≈ R$ 1.600 ÷ 0,02028 ≈ R$ 78.900 (estimado)',
    calcPrecisionNote: 'Valores aproximados. Utilize a calculadora para simular com suas condições exatas.',
    tableTitle: 'Tabela de parcela máxima e capacidade de crédito',
    tableAssumptions: 'Premissas: Margem de 40% · Juros de 8% a.a. · Prazo de 5 anos.',
    thIncome: 'Renda Mensal',
    thMaxEmi: 'Parcela Máxima (40%)',
    thMaxPrincipal: 'Valor Financiado Estimado',
    tableFootnote: 'Simulação orientativa para apoio à tomada de decisão financeira.',
    meaningTitle: 'O que levar em conta antes de contratar',
    bullets: [
      'O valor indica a capacidade teórica de pagamento, não garantindo a aprovação automática de crédito.',
      'Prazos maiores aliviam a parcela mensal, mas encarecem consideravelmente o montante total de juros pagos.',
      'Financiamentos ou dívidas ativas devem ser subtraídos desse limite disponível.',
    ],
    faqsTitle: 'Perguntas Frequentes',
    faqs: [
      {
        q: 'O limite de 40% é uma exigência legal?',
        a: 'No crédito consignado costuma haver margem legal específica (geralmente 35% a 40%). Para outras modalidades é uma recomendação de segurança.',
      },
      {
        q: 'O cálculo deve ser feito com a renda bruta ou líquida?',
        a: 'Para controle do orçamento doméstico, o cálculo mais prudente é sempre sobre a renda líquida na conta.',
      },
      {
        q: 'Outras parcelas entram nessa conta?',
        a: 'Sim, o teto abrange a soma de todas as dívidas e financiamentos contratados.',
      },
      {
        q: 'Qual o efeito da variação da taxa de juros?',
        a: 'Com juros mais altos, uma fração maior de cada parcela paga juros, reduzindo o capital que o banco libera para você.',
      },
    ],
    btnCalc: 'Abrir Calculadora de Parcelas',
    btnHub: 'Ver todos os cenários',
    btnAmort: 'Calculadora de Amortização',
  },
  ja: {
    h1: '月収から考える適正な毎月返済額（EMI）の目安は？',
    intro:
      '無理のないローン計画の一般的な基準として、毎月の総返済額を手取り月収の30〜40％以内に抑えることが推奨されています。本ページでは具体的な年利・期間の数値例を用いて、月収に応じた適正返済額と借入可能額の目安を解説します。',
    sec1Title: '返済負担率（返済比率）の目安',
    sec1P1:
      '金融機関やファイナンシャルプランナーは、毎月の返済額の合計が月収の30〜40％を超えないことを推奨しています。安全な計画目安として40％が上限とされます。',
    sec1P2:
      'この範囲内に抑えることで、生活費、貯蓄、不測の事態への備えを十分に確保できます。',
    formulaBoxTitle: '適正返済額の計算基準（計画目安）：',
    formulaBoxText: '上限目安の毎月返済額 ＝ 手取り月収 × 0.40',
    assumptionsNote:
      '前提条件：手取り月収に対する40％の試算です。実際の融資審査基準は金融機関により異なります。',
    workedTitle: '計算具体例：月収40万円の場合',
    workedIntro: '手取り月収40万円（4,000ドル相当）で40％基準を適用した場合：',
    step1: '上限目安の毎月返済額 ＝ 40万円 × 40％ ＝ 16万円／月',
    step2: '年利8％、返済期間5年（60回払い）と仮定します。',
    step3: '元利均等返済の計算式を逆算して借入可能額を算出：',
    stepFactor: '月利 (r) ＝ 8 ÷ 12 ÷ 100 ＝ 0.6667％ · 期間 ＝ 60回 · 係数 ≈ 0.02028',
    maxPrincipalResult: '借入可能額の目安 ≈ 16万円 ÷ 0.02028 ≈ 約789万円（推計値）',
    calcPrecisionNote: '試算結果は概算です。正確な数値は返済額計算ツールでご確認ください。',
    tableTitle: '月収別の適正返済額と借入限度額目安表',
    tableAssumptions: '前提：返済比率40％ · 年利8％ · 返済期間5年（固定）。',
    thIncome: '月収目安',
    thMaxEmi: '上限返済額（40%）',
    thMaxPrincipal: '借入可能額の目安',
    tableFootnote: '本表はライフプラン作成のためのシミュレーションです。審査結果を保証するものではありません。',
    meaningTitle: 'ローン検討における重要なポイント',
    bullets: [
      '表の金額は家計が無理なく返済できる上限の目安であり、審査の通過を保証するものではありません。',
      '返済期間を延ばす（例：5年から7年）と毎月の返済額は減りますが、支払う総利息額は大幅に増加します。',
      '既存のローン（カーローン、教育ローン等）がある場合は、その返済額を差し引いて算出してください。',
    ],
    faqsTitle: 'よくある質問',
    faqs: [
      {
        q: '40％の基準は法律上の上限ですか？',
        a: 'いいえ、家計管理上の安全基準です。住宅ローン審査では年収に応じた返済比率（30〜35％程度）が用いられることが一般的です。',
      },
      {
        q: '額面年収と手取り月収のどちらで計算すべきですか？',
        a: '審査では額面年収が使われることが多いですが、ご自身の無理のない返済計画には手取り額で試算することを強くおすすめします。',
      },
      {
        q: '他のローンの返済額も含める必要がありますか？',
        a: 'はい。すべての借入（クレジットカードのリボ払い等含む）の合計返済額で比率を計算します。',
      },
      {
        q: '金利が変わると借入可能額はどう変わりますか？',
        a: '金利が高くなると毎回の利息支払いが増えるため、同じ返済額でも借りられる元金は少なくなります。',
      },
    ],
    btnCalc: '返済額計算ツールを開く',
    btnHub: 'すべてのシミュレーションを見る',
    btnAmort: '元利均等返済スケジュール計算',
  },
};

export default function EmiAffordabilityView({ locale = DEFAULT_LOCALE }: EmiAffordabilityViewProps) {
  const common = loadTranslations(locale);
  const toolContent = getToolTranslation('emi-calculator', locale);
  const tData = CONTENT[locale] || CONTENT.en;
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const homeLabel = t(common, 'nav.home') || 'Home';
  const financeLabel = t(common, 'categories.finance') || 'Finance';
  const toolName = toolContent?.name || 'EMI Calculator';

  const rows = INCOME_LEVELS.map((income) => {
    const maxEmi = Math.round(income * 0.4);
    const maxPrincipal = maxLoan(maxEmi, RATE, MONTHS);
    return { income, maxEmi, maxPrincipal };
  });

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
        <DollarSign className="h-7 w-7 text-[#f97316] shrink-0 mt-1" aria-hidden="true" />
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
        {/* Section 1 */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            {tData.sec1Title}
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            {tData.sec1P1}
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            {tData.sec1P2}
          </p>
          <div className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl border border-gray-200 dark:border-gray-800 font-mono text-[13px] text-gray-700 dark:text-gray-200">
            <span className="block mb-1 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              {tData.formulaBoxTitle}
            </span>
            {tData.formulaBoxText}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 leading-relaxed">
            {tData.assumptionsNote}
          </p>
        </section>

        {/* Section 2 - Worked Example */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {tData.workedTitle}
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            {tData.workedIntro}
          </p>
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <div className="flex gap-2">
              <span className="font-bold text-[#1a3c5e] dark:text-blue-300 shrink-0">1.</span>
              <span>{tData.step1}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold text-[#1a3c5e] dark:text-blue-300 shrink-0">2.</span>
              <span>{tData.step2}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold text-[#1a3c5e] dark:text-blue-300 shrink-0">3.</span>
              <span>{tData.step3}</span>
            </div>
          </div>
          <div className="bg-blue-50/30 dark:bg-blue-950/10 border border-blue-100/40 dark:border-blue-900/20 p-5 rounded-xl text-sm text-slate-700 dark:text-slate-300 space-y-2">
            <p>{tData.stepFactor}</p>
            <p className="font-semibold text-gray-900 dark:text-white">
              {tData.maxPrincipalResult}
            </p>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            {tData.calcPrecisionNote}
          </p>
        </section>

        {/* Section 3 - Table */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {tData.tableTitle}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-5">
            {tData.tableAssumptions}
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                  <th className="py-3 pr-4 font-semibold">{tData.thIncome}</th>
                  <th className="py-3 pr-4 font-semibold">{tData.thMaxEmi}</th>
                  <th className="py-3 font-semibold">{tData.thMaxPrincipal}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {rows.map((row) => (
                  <tr key={row.income} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                    <td className="py-3 pr-4 font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(row.income, locale)}
                    </td>
                    <td className="py-3 pr-4 text-[#f97316] font-bold">
                      {formatCurrency(row.maxEmi, locale)}
                    </td>
                    <td className="py-3 text-gray-700 dark:text-gray-300">
                      ≈ {formatCurrency(row.maxPrincipal, locale)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-4">
            {tData.tableFootnote}
          </p>
        </section>

        {/* Section 4 - Meaning */}
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

        {/* Nav Links */}
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
