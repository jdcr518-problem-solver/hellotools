import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, TrendingDown } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import DisclaimerBox from '@/components/DisclaimerBox';
import { Locale, DEFAULT_LOCALE } from '@/lib/i18n';
import { loadTranslations, t } from '@/lib/translations';
import { getToolTranslation } from '@/lib/pilot-translations';
import { calcEmi, simulateRepayment, formatCurrency } from '@/data/emi-scenarios-data';

interface EmiExtraPaymentViewProps {
  locale?: Locale;
}

const PRINCIPAL = 10_000;
const RATE = 8;
const TENURE_MONTHS = 60;
const EXTRA_AMOUNTS = [50, 100, 150, 200];

interface LocalizedExtraPaymentContent {
  h1: string;
  intro: string;
  howTitle: string;
  howP1: string;
  howP2: string;
  howP3: string;
  workedTitle: string;
  cardMonthsSaved: string;
  cardEarlier: string;
  cardInterestSaved: string;
  cardLessInterest: string;
  cardRepaidIn: string;
  cardInsteadOf: string;
  tableTitle: string;
  tableBaselineNote: string;
  thExtra: string;
  thPeriod: string;
  thTotalInterest: string;
  thInterestSaved: string;
  baselineLabel: string;
  moEarlier: string;
  tableFootnote: string;
  meaningTitle: string;
  bullets: string[];
  faqsTitle: string;
  faqs: { q: string; a: string }[];
  btnCalc: string;
  btnHub: string;
  btnAmort: string;
}

const CONTENT: Record<Locale, LocalizedExtraPaymentContent> = {
  en: {
    h1: 'How Much Interest Can I Save by Paying Extra Each Month?',
    intro:
      'If you can afford to pay a little more than your scheduled EMI each month, that extra amount goes directly toward reducing your loan principal. A lower principal means less future interest, a shorter repayment period, and less total money paid overall.',
    howTitle: 'How Extra Payments Work',
    howP1:
      'Each monthly EMI has two parts: an interest component (interest on the remaining balance for that month) and a principal component (which amortizes the balance).',
    howP2:
      'When you pay above your scheduled EMI, the entire surplus directly reduces the outstanding principal balance.',
    howP3:
      'Because interest compounds on a smaller balance in every following month, regular extra payments produce an accelerating snowball of interest savings.',
    workedTitle: 'Worked Example: $100 Extra Per Month ($10,000 at 8% for 5 Years)',
    cardMonthsSaved: 'Months saved',
    cardEarlier: 'months earlier',
    cardInterestSaved: 'Interest saved',
    cardLessInterest: 'less total interest',
    cardRepaidIn: 'Repaid in',
    cardInsteadOf: 'instead of 5 years',
    tableTitle: 'Savings at Different Extra Payment Levels',
    tableBaselineNote: 'Baseline: $10,000 at 8% p.a. over 5 years. Standard EMI = $202.76/month.',
    thExtra: 'Extra/Month',
    thPeriod: 'Repayment Period',
    thTotalInterest: 'Total Interest',
    thInterestSaved: 'Interest Saved',
    baselineLabel: '$0 (standard)',
    moEarlier: 'mo earlier',
    tableFootnote: 'Estimates based on standard monthly amortization simulation without prepayment fees or taxes.',
    meaningTitle: 'What the Results Mean',
    bullets: [
      'Even a modest extra payment of $50/month noticeably reduces the loan duration and overall interest cost.',
      'Savings are front-loaded: starting extra payments in Year 1 saves significantly more than starting in Year 4.',
      'Check your loan terms for prepayment penalties (especially on fixed-rate loans) before beginning regular extra payments.',
    ],
    faqsTitle: 'Frequently Asked Questions',
    faqs: [
      {
        q: 'Does 100% of the extra amount go toward reducing principal?',
        a: 'Yes, because the scheduled monthly EMI already covers the required interest for that period. Any additional amount directly lowers the principal.',
      },
      {
        q: 'Can I make lump-sum prepayments instead of monthly additions?',
        a: 'Yes. An occasional lump-sum payment has a very similar compounding benefit, particularly when made early in the loan tenure.',
      },
      {
        q: 'Do banks charge prepayment fees?',
        a: 'Many consumer and auto loans permit partial prepayment with zero penalty, but terms vary. Review your agreement carefully.',
      },
      {
        q: 'Does an extra payment lower my next scheduled EMI?',
        a: 'Usually lenders keep the monthly payment the same and shorten the remaining term. Some allow tenure retention with a recast EMI.',
      },
      {
        q: 'Does the live EMI Calculator show prepayment savings?',
        a: 'The main EMI Calculator displays standard schedules; this scenario page models the voluntary prepayment advantage.',
      },
    ],
    btnCalc: 'Open EMI Calculator',
    btnHub: 'View All EMI Scenarios',
    btnAmort: 'Amortization Calculator',
  },
  es: {
    h1: '¿Cuánto interés puedo ahorrar pagando un extra cada mes?',
    intro:
      'Pagar una pequeña cantidad adicional por encima de tu cuota mensual reduce directamente el capital pendiente de amortizar. Menos deuda implica menos intereses futuros y la cancelación anticipada del préstamo.',
    howTitle: 'Cómo funcionan las amortizaciones extraordinarias',
    howP1:
      'Cada cuota mensual se compone de intereses y amortización de capital. Al inicio del préstamo, la proporción de intereses es más alta.',
    howP2:
      'Todo importe adicional que aportes va íntegramente a reducir el capital pendiente, sin destinarse a intereses.',
    howP3:
      'Al reducirse la deuda antes de tiempo, cada cuota posterior devenga menos intereses, acelerando el ahorro de forma exponencial.',
    workedTitle: 'Ejemplo práctico: $100 extra al mes ($10.000 al 8% a 5 años)',
    cardMonthsSaved: 'Meses ahorrados',
    cardEarlier: 'meses antes',
    cardInterestSaved: 'Intereses ahorrados',
    cardLessInterest: 'menos en intereses totales',
    cardRepaidIn: 'Cancelado en',
    cardInsteadOf: 'en lugar de 5 años',
    tableTitle: 'Ahorro según diferentes aportaciones extraordinarias',
    tableBaselineNote: 'Base: Préstamo de $10.000 al 8% anual a 5 años. Cuota estándar = $202,76/mes.',
    thExtra: 'Aportación Extra',
    thPeriod: 'Plazo Resultante',
    thTotalInterest: 'Intereses Totales',
    thInterestSaved: 'Ahorro en Intereses',
    baselineLabel: '$0 (estándar)',
    moEarlier: 'meses antes',
    tableFootnote: 'Simulación matemática orientativa basada en amortización francesa pura sin comisiones.',
    meaningTitle: 'Claves para tu estrategia de amortización',
    bullets: [
      'Incluso una aportación modesta de $50 al mes reduce notablemente los meses de endeudamiento.',
      'El impacto es mayor cuanto antes empieces, ya que la deuda pendiente sobre la que se calculan intereses es más alta.',
      'Verifica si tu entidad aplica comisiones por amortización anticipada parcial antes de iniciar aportaciones periódicas.',
    ],
    faqsTitle: 'Preguntas Frecuentes',
    faqs: [
      {
        q: '¿Se destina el 100% del pago extra a reducir el capital?',
        a: 'Sí, porque la cuota mensual obligatoria ya ha cubierto la totalidad de los intereses correspondientes al mes.',
      },
      {
        q: '¿Es mejor aportar cada mes o hacer un pago único al año?',
        a: 'Aportar mes a mes ahorra un poco más de intereses al reducir la deuda mes a mes, aunque ambas fórmulas son muy ventajosas.',
      },
      {
        q: '¿Cobran los bancos comisiones por amortizar anticipadamente?',
        a: 'En muchos préstamos personales o hipotecas las comisiones están limitadas por ley (0% a 0,5%). Consulta tu contrato.',
      },
      {
        q: '¿Reduce el pago extra la cuota futura o el plazo?',
        a: 'La mayoría de entidades permiten elegir entre reducir el plazo de vencimiento o rebajar la cuota mensual futura.',
      },
      {
        q: '¿Muestra la calculadora EMI principal esta simulación?',
        a: 'La herramienta principal calcula la cuota estándar sin prepagos; esta página ilustra el efecto de las amortizaciones anticipadas.',
      },
    ],
    btnCalc: 'Abrir Calculadora EMI',
    btnHub: 'Ver todos los escenarios',
    btnAmort: 'Calculadora de Amortización',
  },
  de: {
    h1: 'Wie viele Zinsen spare ich durch monatliche Sondertilgungen?',
    intro:
      'Zusätzliche monatliche Rückzahlungen über die vereinbarte Rate hinaus fließen zu 100 % in die Tilgung der Restschuld. Weniger Restschuld bedeutet geringere Zinsen in allen Folgemonaten und eine frühere Schuldenfreiheit.',
    howTitle: 'Wirkungsweise von regelmäßigen Sondertilgungen',
    howP1:
      'Jede Monatsrate besteht aus einem Zins- und einem Tilgungsanteil. Zu Beginn der Laufzeit ist der Zinsanteil am höchsten.',
    howP2:
      'Jeder Euro, den Sie zusätzlich überweisen, reduziert direkt und vollständig die verbleibende Darlehensschuld.',
    howP3:
      'Da die Zinsen stets auf die verbleibende Restschuld berechnet werden, sinkt die Zinslast in jedem Folgemonat schneller.',
    workedTitle: 'Modellrechnung: 100 € monatliche Sondertilgung (10.000 € zu 8 % auf 5 Jahre)',
    cardMonthsSaved: 'Verkürzung',
    cardEarlier: 'Monate früher getilgt',
    cardInterestSaved: 'Zinsersparnis',
    cardLessInterest: 'weniger Zinsen an die Bank',
    cardRepaidIn: 'Laufzeit neu',
    cardInsteadOf: 'statt 60 Monate',
    tableTitle: 'Zins- und Laufzeitersparnis nach Sondertilgungshöhe',
    tableBaselineNote: 'Basis: 10.000 € Darlehen zu 8 % p. a. über 5 Jahre. Standardrate = 202,76 €/Monat.',
    thExtra: 'Zusatzrate/Monat',
    thPeriod: 'Tatsächliche Laufzeit',
    thTotalInterest: 'Gesamtzinsen',
    thInterestSaved: 'Eingesparte Zinsen',
    baselineLabel: '0 € (Standard)',
    moEarlier: 'Monate früher',
    tableFootnote: 'Mathematische Simulation auf Basis klassischer Annuitätentilgung ohne Vorfälligkeitsentschädigung.',
    meaningTitle: 'Praxistipps für Ihre Sondertilgung',
    bullets: [
      'Bereits 50 € zusätzlich im Monat verkürzen die Rückzahlungsdauer spürbar und sparen Zinsen.',
      'Je früher die Sondertilgungen beginnen, desto stärker greift der Zinseszinseffekt zu Ihren Gunsten.',
      'Prüfen Sie im Kreditvertrag, ob kostenfreie Sondertilgungen im gewählten Umfang vereinbart sind.',
    ],
    faqsTitle: 'Häufig gestellte Fragen',
    faqs: [
      {
        q: 'Fließt die Sondertilgung wirklich zu 100 % in die Tilgung?',
        a: 'Ja, da der Zinsanspruch des Monats bereits durch die reguläre Annuitätenrate beglichen ist.',
      },
      {
        q: 'Sind monatliche Raten oder jährliche Einmalzahlungen besser?',
        a: 'Monatliche Zahlungen tilgen die Restschuld kontinuierlich und sparen marginal mehr Zinsen als eine jährliche Einmalzahlung.',
      },
      {
        q: 'Können Vorfälligkeitsentschädigungen anfallen?',
        a: 'Bei Ratenkrediten sind Sondertilgungen oft kostenlos; bei Baufinanzierungen gelten vertraglich vereinbarte Freibeträge (z. B. 5 % p. a.).',
      },
      {
        q: 'Verkürzt sich die Laufzeit oder sinkt die Folgerate?',
        a: 'In der Regel verkürzt sich die Gesamtlaufzeit des Kredits bei gleichbleibender Monatsrate.',
      },
      {
        q: 'Berechnet der Standard-Ratenrechner diese Ersparnis?',
        a: 'Der Standardrechner zeigt den regulären Tilgungsplan; diese Szenarioseite simuliert den Sondertilgungsvorteil.',
      },
    ],
    btnCalc: 'Kreditratenrechner öffnen',
    btnHub: 'Alle Szenarien anzeigen',
    btnAmort: 'Tilgungsrechner',
  },
  fr: {
    h1: 'Combien d\'intérêts économiser avec un remboursement mensuel supplémentaire ?',
    intro:
      'Verser un montant additionnel chaque mois permet d\'amortir directement le capital restant dû. Une dette allégée engendre moins d\'intérêts futurs et accélère la libération de votre crédit.',
    howTitle: 'Le mécanisme du remboursement anticipé régulier',
    howP1:
      'Chaque échéance combine amortissement du capital et paiement des intérêts courus sur le mois.',
    howP2:
      'Tout montant versé en plus de la mensualité contractuelle est déduit à 100 % du capital restant dû.',
    howP3:
      'Les intérêts futurs étant recalculés sur un capital réduit, vous déclenchez un effet boule de neige d\'économies.',
    workedTitle: 'Exemple chiffré : 100 € supplémentaires par mois (10 000 € à 8 % sur 5 ans)',
    cardMonthsSaved: 'Mois gagnés',
    cardEarlier: 'mois plus tôt',
    cardInterestSaved: 'Intérêts économisés',
    cardLessInterest: 'd\'intérêts en moins',
    cardRepaidIn: 'Soldé en',
    cardInsteadOf: 'au lieu de 5 ans',
    tableTitle: 'Économies selon le montant du versement mensuel supplémentaire',
    tableBaselineNote: 'Base : Emprunt de 10 000 € à 8 % sur 5 ans. Mensualité de base = 202,76 €/mois.',
    thExtra: 'Versement Extra',
    thPeriod: 'Durée Réelle',
    thTotalInterest: 'Coût des Intérêts',
    thInterestSaved: 'Intérêts Économisés',
    baselineLabel: '0 € (standard)',
    moEarlier: 'mois plus tôt',
    tableFootnote: 'Simulation actuarielle indicative hors indemnités de remboursement anticipé.',
    meaningTitle: 'Conseils pratiques pour amortir plus vite',
    bullets: [
      'Un effort modéré de 50 € par mois raccourcit la durée du prêt et réduit notablement son coût global.',
      'Plus le versement supplémentaire intervient tôt dans la vie du prêt, plus l\'économie d\'intérêts est importante.',
      'Vérifiez les clauses de votre contrat concernant les pénalités de remboursement anticipé éventuelles.',
    ],
    faqsTitle: 'Questions Fréquentes',
    faqs: [
      {
        q: 'Le versement supplémentaire réduit-il à 100 % le capital ?',
        a: 'Oui, car les intérêts de la période ont déjà été réglés par la mensualité de base.',
      },
      {
        q: 'Vaut-il mieux verser chaque mois ou en une fois par an ?',
        a: 'Le versement mensuel régulier optimise les gains en diminuant le capital sans attendre la fin d\'année.',
      },
      {
        q: 'Existe-t-il des frais de remboursement anticipé ?',
        a: 'En crédit à la consommation, ils sont généralement nuls pour les petits montants ; en prêt immobilier, ils sont plafonnés par la loi.',
      },
      {
        q: 'L\'opération réduit-elle la mensualité ou la durée ?',
        a: 'Le cas le plus fréquent et le plus avantageux est la réduction de la durée restante du prêt.',
      },
      {
        q: 'Le simulateur EMI standard intègre-t-il cette option ?',
        a: 'Le simulateur principal calcule l\'échéancier contractuel ; cette page modélise l\'effet des versements volontaires.',
      },
    ],
    btnCalc: 'Ouvrir le Calculateur EMI',
    btnHub: 'Voir tous les scénarios',
    btnAmort: 'Calculateur d\'Amortissement',
  },
  pt: {
    h1: 'Quanto posso economizar em juros pagando um valor extra todo mês?',
    intro:
      'Pagar uma quantia adicional além da parcela contratada amortiza diretamente o saldo devedor principal. Menos dívida em aberto significa menos juros acumulados e quitação antecipada do financiamento.',
    howTitle: 'Como funciona a amortização extraordinária recorrente',
    howP1:
      'Cada parcela mensal é dividida em juros e amortização da dívida contratada.',
    howP2:
      'Qualquer valor pago além da prestação do mês é abatido integralmente do saldo devedor restante.',
    howP3:
      'Com o saldo devedor menor, os juros dos meses seguintes caem imediatamente, gerando um efeito multiplicador de economia.',
    workedTitle: 'Exemplo prático: R$ 100 adicionais por mês (R$ 10.000 a 8% por 5 anos)',
    cardMonthsSaved: 'Meses economizados',
    cardEarlier: 'meses mais cedo',
    cardInterestSaved: 'Juros poupados',
    cardLessInterest: 'a menos em juros',
    cardRepaidIn: 'Quitado em',
    cardInsteadOf: 'em vez de 5 anos',
    tableTitle: 'Economia projetada conforme o valor extra mensal',
    tableBaselineNote: 'Base: Financiamento de R$ 10.000 a 8% ao ano por 5 anos. Parcela padrão = R$ 202,76/mês.',
    thExtra: 'Aporte Extra',
    thPeriod: 'Prazo Efetivo',
    thTotalInterest: 'Total de Juros',
    thInterestSaved: 'Economia de Juros',
    baselineLabel: 'R$ 0 (padrão)',
    moEarlier: 'meses antes',
    tableFootnote: 'Simulação matemática orientativa pela Tabela Price sem taxas contratuais ou tributos.',
    meaningTitle: 'Orientações para o seu planejamento',
    bullets: [
      'Até mesmo um pequeno valor como R$ 50 mensais encurta o prazo do financiamento de forma expressiva.',
      'Amortizar no início do contrato traz uma economia muito maior do que nos anos finais.',
      'O Código de Defesa do Consumidor assegura o desconto proporcional de juros na quitação antecipada.',
    ],
    faqsTitle: 'Perguntas Frequentes',
    faqs: [
      {
        q: 'O valor extra vai 100% para abater o saldo devedor?',
        a: 'Sim, pois a parcela regular já quitou os juros correspondentes àquele período.',
      },
      {
        q: 'É melhor pagar todo mês ou juntar para pagar no fim do ano?',
        a: 'Pagar mensalmente reduz o saldo devedor mais cedo, maximizando a economia de juros mês a mês.',
      },
      {
        q: 'Os bancos podem cobrar taxa de amortização antecipada?',
        a: 'No Brasil, a regulamentação do Banco Central proíbe a cobrança de tarifas por liquidação antecipada para pessoas físicas.',
      },
      {
        q: 'O pagamento extra reduz o valor da parcela ou o prazo?',
        a: 'Você pode escolher entre reduzir o prazo restante ou reduzir o valor das parcelas futuras.',
      },
      {
        q: 'O simulador padrão de parcelas mostra amortizações extras?',
        a: 'O simulador padrão calcula as prestações contratuais regulares; este cenário modela o ganho de amortizar a mais.',
      },
    ],
    btnCalc: 'Abrir Calculadora de Parcelas',
    btnHub: 'Ver todos os cenários',
    btnAmort: 'Calculadora de Amortização',
  },
  ja: {
    h1: '毎月少し多めに返済すると利息はいくら節約できる？',
    intro:
      '毎月の約定返済額に加えて少額でも上乗せして返済（繰り上げ返済）すると、その全額が借入元金の返済に充てられます。元金が早く減ることで将来の利息負担が大幅に軽減し、完済時期を前倒しできます。',
    howTitle: '繰り上げ返済（元金均等繰上）の仕組み',
    howP1:
      '毎月のローン返済額は「利息」と「元金返済」の2つで構成されています。',
    howP2:
      '約定返済額を超えて追加で支払った金額は、100％すべて借入残高（元金）の圧縮に充当されます。',
    howP3:
      '翌月以降の利息は減額された元金をベースに計算されるため、支払う利息が雪だるま式に減っていきます。',
    workedTitle: '計算具体例：毎月100ドル（約1.5万円）上乗せ返済した場合（元金10,000ドル・年利8%・5年返済）',
    cardMonthsSaved: '短縮期間',
    cardEarlier: 'ヶ月早く完済',
    cardInterestSaved: '節約利息額',
    cardLessInterest: 'の利息を削減',
    cardRepaidIn: '実際の返済期間',
    cardInsteadOf: '（当初5年から短縮）',
    tableTitle: '毎月の上乗せ額別の利息削減効果一覧表',
    tableBaselineNote: '基準：元金10,000ドル・年利8%・5年（60回）。毎月の標準返済額 = 202.76ドル/月。',
    thExtra: '毎月の上乗せ額',
    thPeriod: '完済までの期間',
    thTotalInterest: '支払利息総額',
    thInterestSaved: '利息削減額',
    baselineLabel: '0ドル（通常返済）',
    moEarlier: 'ヶ月短縮',
    tableFootnote: '※ 元利均等返済における元金繰り上げ返済シミュレーションに基づく推計値です。',
    meaningTitle: '賢く繰り上げ返済を活用するコツ',
    bullets: [
      '毎月50ドル程度の少額な上乗せでも、総返済期間と支払利息を着実に削ることができます。',
      '借入残高が多い返済初期に繰り上げ返済を始めるほど、将来の利息削減効果が大きくなります。',
      '金融機関によっては繰り上げ返済手数料が発生する場合がありますので事前にご確認ください。',
    ],
    faqsTitle: 'よくある質問',
    faqs: [
      {
        q: '上乗せした金額はすべて元金返済に充てられますか？',
        a: 'はい。通常の約定返済でその月の利息は支払い済みのため、追加返済額はすべて元金の減額に使われます。',
      },
      {
        q: '毎月少しずつ返すのと、ボーナス等で一括返済するのはどちらがお得ですか？',
        a: '毎月こまめに返す方が元金が早く減るため、利息削減効果は高くなります。',
      },
      {
        q: '繰り上げ返済に手数料はかかりますか？',
        a: 'インターネットバンキングからの手続きであれば手数料無料の銀行が多いですが、契約形態により異なります。',
      },
      {
        q: '期間短縮型と返済額軽減型のどちらが良いですか？',
        a: '利息削減効果を最優先するなら「期間短縮型」、毎月の負担を軽くしたいなら「返済額軽減型」が適しています。',
      },
      {
        q: 'メインの返済額計算機でも繰り上げ返済は試算できますか？',
        a: 'メインツールは基本の返済予定表を表示します。本ページは継続的な上乗せ返済の効果を解説した特別シミュレーションです。',
      },
    ],
    btnCalc: '返済額計算ツールを開く',
    btnHub: 'すべてのシミュレーションを見る',
    btnAmort: '元利均等返済スケジュール計算',
  },
};

export default function EmiExtraPaymentView({ locale = DEFAULT_LOCALE }: EmiExtraPaymentViewProps) {
  const common = loadTranslations(locale);
  const toolContent = getToolTranslation('emi-calculator', locale);
  const tData = CONTENT[locale] || CONTENT.en;
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  const homeLabel = t(common, 'nav.home') || 'Home';
  const financeLabel = t(common, 'categories.finance') || 'Finance';
  const toolName = toolContent?.name || 'EMI Calculator';

  const standardEmi = Math.round(calcEmi(PRINCIPAL, RATE, TENURE_MONTHS).emi * 100) / 100;
  const noExtra = simulateRepayment(PRINCIPAL, RATE, standardEmi);
  const with100 = simulateRepayment(PRINCIPAL, RATE, standardEmi + 100);

  const interestSaved100 = Math.round((noExtra.totalInterest - with100.totalInterest) * 100) / 100;
  const monthsSaved100 = noExtra.months - with100.months;

  const extraRows = EXTRA_AMOUNTS.map((extra) => {
    const res = simulateRepayment(PRINCIPAL, RATE, standardEmi + extra);
    return {
      extra,
      months: res.months,
      years: Math.floor(res.months / 12),
      remMonths: res.months % 12,
      totalInterest: res.totalInterest,
      saved: Math.round((noExtra.totalInterest - res.totalInterest) * 100) / 100,
      monthsSaved: noExtra.months - res.months,
    };
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
        <TrendingDown className="h-7 w-7 text-[#f97316] shrink-0 mt-1" aria-hidden="true" />
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
        {/* How it works */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            {tData.howTitle}
          </h2>
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <p>{tData.howP1}</p>
            <p>{tData.howP2}</p>
            <p>{tData.howP3}</p>
          </div>
        </section>

        {/* Worked example */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {tData.workedTitle}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-[#1a3c5e] text-white text-center">
              <p className="text-[10px] uppercase tracking-wider opacity-75 mb-1">{tData.cardMonthsSaved}</p>
              <p className="text-3xl font-extrabold">{monthsSaved100}</p>
              <p className="text-xs opacity-75 mt-0.5">{tData.cardEarlier}</p>
            </div>
            <div className="p-5 rounded-xl bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/40 text-center">
              <p className="text-[10px] uppercase tracking-wider text-orange-700 dark:text-orange-300 mb-1">{tData.cardInterestSaved}</p>
              <p className="text-3xl font-extrabold text-[#f97316]">{formatCurrency(interestSaved100, locale, 2)}</p>
              <p className="text-xs text-orange-600 dark:text-orange-400 mt-0.5">{tData.cardLessInterest}</p>
            </div>
            <div className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 text-center">
              <p className="text-[10px] uppercase tracking-wider text-emerald-700 dark:text-emerald-300 mb-1">{tData.cardRepaidIn}</p>
              <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
                {Math.floor(with100.months / 12)}y {with100.months % 12}m
              </p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">{tData.cardInsteadOf}</p>
            </div>
          </div>
        </section>

        {/* Savings table */}
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {tData.tableTitle}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-5">
            {tData.tableBaselineNote}
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                  <th className="py-3 pr-4 font-semibold">{tData.thExtra}</th>
                  <th className="py-3 pr-4 font-semibold">{tData.thPeriod}</th>
                  <th className="py-3 pr-4 font-semibold">{tData.thTotalInterest}</th>
                  <th className="py-3 font-semibold">{tData.thInterestSaved}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                <tr className="bg-gray-50 dark:bg-gray-800/30">
                  <td className="py-3 pr-4 font-semibold text-gray-700 dark:text-gray-300">{tData.baselineLabel}</td>
                  <td className="py-3 pr-4 text-gray-600 dark:text-gray-400">
                    {Math.floor(noExtra.months / 12)}y {noExtra.months % 12}m ({noExtra.months} mo)
                  </td>
                  <td className="py-3 pr-4 text-gray-700 dark:text-gray-300">{formatCurrency(noExtra.totalInterest, locale, 2)}</td>
                  <td className="py-3 text-gray-400">—</td>
                </tr>
                {extraRows.map((row) => (
                  <tr key={row.extra} className="hover:bg-gray-50 dark:hover:bg-gray-800/20 transition-colors">
                    <td className="py-3 pr-4 font-bold text-[#f97316]">+{formatCurrency(row.extra, locale)}</td>
                    <td className="py-3 pr-4 text-gray-700 dark:text-gray-300">
                      {row.years}y {row.remMonths}m ({row.months} mo)
                    </td>
                    <td className="py-3 pr-4 text-gray-700 dark:text-gray-300">{formatCurrency(row.totalInterest, locale, 2)}</td>
                    <td className="py-3 font-bold text-emerald-600 dark:text-emerald-400">
                      {formatCurrency(row.saved, locale, 2)}{' '}
                      <span className="text-xs font-normal text-gray-400">
                        ({row.monthsSaved} {tData.moEarlier})
                      </span>
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
