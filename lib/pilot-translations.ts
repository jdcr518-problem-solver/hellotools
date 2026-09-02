/**
 * Centralized Pilot Tools Translations for Phase 2
 *
 * Supported Locales: es, de, fr, pt, ja
 * Supported Pilot Tools:
 *  1. amortization-calculator
 *  2. bmi-calculator
 *  3. age-calculator
 *  4. compound-interest-calculator
 *  5. percentage-calculator
 *  6. emi-calculator
 *  7. calorie-calculator
 *  8. tip-calculator
 *  9. mortgage-calculator
 * 10. unit-converter
 */

import { Locale } from '@/lib/i18n';
import { FAQItem, toolsMaster } from '@/data/tools-master';

export interface LocalizedToolContent {
  name: string;
  seoTitle: string;
  seoDescription: string;
  description: string;
  quickAnswer: string;
  seoHowToUse: string;
  seoHowItWorks: string;
  formula: string;
  seoExample: string;
  faqs: FAQItem[];
  ui?: Record<string, string>;
}

export const PILOT_TRANSLATIONS: Record<string, Partial<Record<Locale, LocalizedToolContent>>> = {
  'amortization-calculator': {
    es: {
      name: "Calculadora de Amortización",
      seoTitle: "Calculadora de Amortización de Préstamos | HelloTools",
      seoDescription: "Calcula el calendario de amortización mensual de tu préstamo, cuotas e intereses totales.",
      description: "Genera un calendario de amortización detallado mes a mes para visualizar pagos de principal e intereses.",
      quickAnswer: "Una tabla de amortización desglosa cada cuota mensual en pago de capital e intereses durante la vida del préstamo.",
      seoHowToUse: "1. Introduce el importe del préstamo.\n2. Indica la tasa de interés anual (% p.a.).\n3. Selecciona el plazo del préstamo en años o meses.\n4. Revisa la cuota mensual y la tabla detallada.",
      seoHowItWorks: "La amortización utiliza la fórmula de cuota fija donde el interés se calcula sobre el saldo pendiente residual.",
      formula: "Cuota Mensual = P * [r(1+r)^n] / [(1+r)^n - 1]",
      seoExample: "Para un préstamo de $100.000 al 5% anual a 30 años, la cuota fija mensual es de $536,82.",
      faqs: [
        { q: "¿Qué es una tabla o calendario de amortización de préstamos?", a: "Es un desglose cronológico de cada pago mensual del préstamo que muestra con precisión qué importe se destina a amortizar el capital y cuánto corresponde al pago de intereses." },
        { q: "¿Por qué la proporción de capital aumenta con el paso del tiempo?", a: "Porque los intereses de cada cuota se calculan sobre el saldo pendiente de deuda. Al reducirse la deuda con cada pago mensual, el cargo por intereses disminuye y una mayor parte de la cuota amortiza capital." },
        { q: "¿Admite esta calculadora pagos extraordinarios o amortizaciones anticipadas?", a: "Muestra el cuadro de amortización estándar a cuota constante sin prepagos extraordinarios. Para evaluar escenarios con amortización parcial puedes ajustar el capital inicial y recalcular." },
        { q: "¿Sirve para hipotecas, créditos de coche y préstamos personales?", a: "Sí. Cualquier financiación con cuotas periódicas fijas a tipo de interés constante utiliza el sistema de amortización francés que implementa esta calculadora." },
        { q: "¿Es exacto el desglose de amortización frente al banco?", a: "Sí. Aplica la formulación matemática oficial de préstamos amortizables. Pequeñas diferencias de céntimos pueden deberse a si la entidad computa años comerciales (360 días) o naturales (365 días)." }
      ]
    },
    de: {
      name: "Tilgungsrechner",
      seoTitle: "Tilgungsrechner & Kredit-Tilgungsplan | HelloTools",
      seoDescription: "Berechnen Sie Ihren detaillierten Tilgungsplan, Monatstilgungen und Gesamtzinsen.",
      description: "Erstellen Sie einen vollständigen Tilgungsplan zur Visualisierung von Tilgungs- und Zinsanteilen.",
      quickAnswer: "Ein Tilgungsplan schlüsselt jede monatliche Rate in Zins- und Tilgungsanteile über die gesamte Laufzeit auf.",
      seoHowToUse: "1. Geben Sie den Kreditbetrag ein.\n2. Tragen Sie den Jahreszinssatz ein.\n3. Wählen Sie die Laufzeit in Jahren oder Monaten.\n4. Lesen Sie die Monatsrate und den Tilgungsplan ab.",
      seoHowItWorks: "Die Annuitätentilgung berechnet eine gleichbleibende Monatsrate, wobei der Zinsanteil mit sinkender Restschuld abnimmt.",
      formula: "Rate = K * [i*(1+i)^n] / [(1+i)^n - 1]",
      seoExample: "Bei einem Kredit von 100.000 € zu 5 % Zinsen über 30 Jahre beträgt die Monatsrate 536,82 €.",
      faqs: [
        { q: "Was ist ein Tilgungsplan für Darlehen?", a: "Ein Tilgungsplan ist eine detaillierte Tabelle aller monatlichen Raten über die Gesamtlaufzeit, die den Tilgungsanteil, den Zinsanteil und die jeweilige Restschuld transparent aufschlüsselt." },
        { q: "Warum steigt der Tilgungsanteil im Laufe der Zeit kontinuierlich an?", a: "Weil die Zinsen stets auf die verbleibende Restschuld berechnet werden. Durch jede monatliche Tilgung sinkt die Restschuld, wodurch die Zinslast abnimmt und bei gleichbleibender Rate mehr getilgt wird." },
        { q: "Unterstützt dieser Tilgungsrechner Sondertilgungen?", a: "Er bildet den klassischen Annuitätentilgungsplan ohne außerplanmäßige Sondertilgungen ab. Für Szenarien mit Sondertilgung können Sie die verbleibende Restsumme als neuen Kredit berechnen." },
        { q: "Gilt der Tilgungsplan für Immobilienkredite und Konsumentenkredite?", a: "Ja. Alle Festzinsdarlehen mit gleichbleibender monatlicher Annuität folgen exakt dieser finanzmathematischen Gesetzmäßigkeit." },
        { q: "Wie genau ist der ausgewiesene Tilgungsverlauf?", a: "Die Berechnung ist centgenau nach finanzmathematischen Standards. Geringfügige Abweichungen zu Bankunterlagen können durch unterschiedliche Zinstageszählkonventionen (30/360 vs. act/act) entstehen." }
      ]
    },
    fr: {
      name: "Calculateur d'Amortissement",
      seoTitle: "Calculateur d'Amortissement de Prêt | HelloTools",
      seoDescription: "Calculez votre tableau d'amortissement, vos mensualités et le coût total des intérêts.",
      description: "Générez un tableau d'amortissement détaillé mois par mois pour visualiser le capital et les intérêts.",
      quickAnswer: "Un tableau d'amortissement décompose chaque mensualité entre remboursement du capital et paiement des intérêts.",
      seoHowToUse: "1. Entrez le montant du prêt.\n2. Indiquez le taux d'intérêt annuel.\n3. Choisissez la durée en années ou mois.\n4. Consultez votre mensualité et le tableau d'amortissement.",
      seoHowItWorks: "L'amortissement à mensualité constante réduit progressivement la part d'intérêts au profit de l'amortissement du capital.",
      formula: "Mensualité = P * [r(1+r)^n] / [(1+r)^n - 1]",
      seoExample: "Pour un prêt de 100 000 € à 5 % sur 30 ans, la mensualité constante est de 536,82 €.",
      faqs: [
        { q: "Qu'est-ce qu'un tableau d'amortissement de crédit ?", a: "C'est l'échéancier complet détaillant chaque mensualité sur la durée du prêt, avec la répartition exacte entre capital remboursé, intérêts payés et capital restant dû." },
        { q: "Pourquoi la part de capital remboursé augmente-t-elle à chaque mois ?", a: "Parce que les intérêts sont calculés sur le capital restant dû. Comme ce solde diminue après chaque paiement, la part d'intérêts baisse au profit direct du capital amorti." },
        { q: "Le calculateur intègre-t-il les remboursements anticipés ?", a: "Il génère le tableau d'amortissement standard à échéances fixes. Pour mesurer l'effet d'un remboursement partiel, vous pouvez réinjecter le nouveau solde restant dû dans l'outil." },
        { q: "Convient-il pour un prêt immobilier, auto ou consommation ?", a: "Oui. Tout crédit amortissable à taux fixe et mensualité constante utilise ce mode d'amortissement progressif." },
        { q: "Les montants correspondent-ils fidèlement au plan de la banque ?", a: "Oui. Le calcul respecte la formule financière officielle. De légères variations de quelques centimes peuvent découler de la convention de comptage des jours (360 ou 365 jours)." }
      ]
    },
    pt: {
      name: "Calculadora de Amortização",
      seoTitle: "Calculadora de Amortização de Empréstimos | HelloTools",
      seoDescription: "Calcule a tabela de amortização do seu empréstimo, parcelas mensais e juros totais.",
      description: "Gere um cronograma de amortização detalhado mês a mês para acompanhar pagamentos de principal e juros.",
      quickAnswer: "Uma tabela de amortização detalha a divisão de cada parcela entre amortização do saldo devedor e juros.",
      seoHowToUse: "1. Digite o valor do empréstimo.\n2. Informe a taxa de juros anual.\n3. Selecione o prazo em anos ou meses.\n4. Visualize o valor da parcela e a tabela completa.",
      seoHowItWorks: "A amortização utiliza cálculo de parcelas fixas onde a proporção de juros diminui conforme o saldo devedor cai.",
      formula: "Parcela = P * [i*(1+i)^n] / [(1+i)^n - 1]",
      seoExample: "Para um empréstimo de R$ 100.000 a 5% ao ano por 30 anos, a parcela mensal é de R$ 536,82.",
      faqs: [
        { q: "O que é uma tabela ou cronograma de amortização?", a: "É um demonstrativo mês a mês de todos os pagamentos do empréstimo, especificando quanto de cada prestação reduz a dívida principal e quanto quita juros contratuais." },
        { q: "Por que a parcela de amortização cresce ao longo do contrato?", a: "Porque os juros de cada mês incidem sobre o saldo devedor remanescente. Com a dívida encolhendo a cada mês, os juros caem e uma proporção maior da parcela amortiza o saldo." },
        { q: "A ferramenta permite simular amortizações extraordinárias avulsas?", a: "Apresenta a evolução padrão pelo sistema de prestações constantes (Price). Para simular uma amortização avulsa, recalcule o saldo com o novo valor reduzido de principal." },
        { q: "Serve para financiamentos imobiliários, de veículos e pessoais?", a: "Sim. Aplica-se a qualquer financiamento a taxa pré-fixada contratado no regime de amortização com parcelas regulares uniformes." },
        { q: "O cronograma é exato frente ao extrato do banco financiador?", a: "Sim. A formulação segue os parâmetros oficiais do Banco Central e sistemas contábeis bancários, com mínimas variações de centavos por critérios de truncamento." }
      ]
    },
    ja: {
      name: "ローン返済シミュレーション",
      seoTitle: "ローン返済・返済スケジュール計算機 | HelloTools",
      seoDescription: "毎月の返済額、元金・利息の内訳、総返済額および返済表を元利均等方式で瞬時に計算します。",
      description: "毎月のローン返済額と詳細な返済スケジュール（元金・利息内訳）をシミュレーションします。",
      quickAnswer: "返済シミュレーションは毎月の返済額に含まれる元金充当分と利息分を期間ごとに明示します。",
      seoHowToUse: "1. 借入金額を入力します。\n2. 年利（金利 %）を入力します。\n3. 返済期間（年または月）を選択します。\n4. 毎月の返済額と返済スケジュールを確認します。",
      seoHowItWorks: "元利均等返済方式では毎月の支払額を一定に保ち、残高の減少に伴い利息割合が減少し元金割合が増加します。",
      formula: "毎月返済額 = P * [r(1+r)^n] / [(1+r)^n - 1]",
      seoExample: "1000万円を年利5%、30年返済（360回）で借り入れた場合、毎月の返済額は53,682円です。",
      faqs: [
        { q: "ローンの返済スケジュール（償還予定表）とは何ですか？", a: "借入期間中の全返済月における元金返済分、利息支払分、および返済後の借入残高の推移を月単位で一覧表示した明細表です。" },
        { q: "返済が進むにつれて元金の減るペースが早くなるのはなぜですか？", a: "利息は毎月の「未返済残高」に対して計算されるためです。毎月元金が減ると利息負担が小さくなり、一定の毎月返済額の中で元金返済に充てられる割合が増加します。" },
        { q: "繰り上げ返済のシミュレーションには対応していますか？", a: "約定返済のみの標準的な元利均等スケジュールを表示します。繰り上げ返済の効果を確かめるには、返済後の残高を新たな元金として再試算してください。" },
        { q: "住宅ローン、自動車ローン、カードローンいずれにも使えますか？", a: "はい。固定金利で元利均等返済を採用しているローンであれば、融資目的を問わず同一の計算式で償還予定を算出できます。" },
        { q: "実際の金融機関の明細書と誤差は生じますか？", a: "金融工学の標準式を用いているためほぼ完全一致します。端数処理（円未満の丸め処理）やうるう年の日数計算ルールにより、銀行明細と数円程度の差が生じることがあります。" }
      ]
    }
  },

  'bmi-calculator': {
    es: {
      name: "Calculadora de IMC",
      seoTitle: "Calculadora de IMC (Índice de Masa Corporal) | HelloTools",
      seoDescription: "Calcula tu Índice de Masa Corporal (IMC) según tu altura y peso de forma instantánea.",
      description: "Calcula tu IMC exacto y descubre tu categoría de peso corporal según los estándares de la OMS.",
      quickAnswer: "El IMC es una medida basada en el peso y la estatura que clasifica el peso en bajo peso, normal, sobrepeso u obesidad.",
      seoHowToUse: "1. Selecciona el sistema de unidades (Métrico o Imperial).\n2. Introduce tu altura y peso.\n3. Haz clic en Calcular para ver tu resultado de IMC y categoría.",
      seoHowItWorks: "El IMC se calcula dividiendo el peso en kilogramos por el cuadrado de la estatura en metros.",
      formula: "IMC = Peso (kg) / [Altura (m)]²",
      seoExample: "Una persona con un peso de 70 kg y una altura de 1,75 m tiene un IMC de 22,86 (Peso Normal).",
      faqs: [
        { q: "¿Qué rangos de IMC definen normopeso, sobrepeso y obesidad según la OMS?", a: "Según la Organización Mundial de la Salud (OMS), un IMC inferior a 18,5 indica bajo peso, entre 18,5 y 24,9 es peso normal, entre 25,0 y 29,9 indica sobrepeso y 30,0 o más clasifica como obesidad." },
        { q: "¿Distingue el IMC entre masa muscular magra y grasa corporal?", a: "No. El IMC se basa únicamente en el peso y la altura, por lo que deportistas o personas con alta masa muscular pueden ser catalogados con sobrepeso a pesar de tener un bajo porcentaje de grasa." },
        { q: "¿Cuál es la fórmula matemática del Índice de Masa Corporal?", a: "La fórmula es IMC = Peso (kg) / [Altura (m)]². En el sistema anglosajón se calcula como: Peso (lb) × 703 / [Altura (pulgadas)]²." },
        { q: "¿Se aplica el mismo criterio de IMC para niños y adolescentes?", a: "No. En menores de 18 años se utilizan percentiles de crecimiento por edad y sexo (curvas de la OMS o CDC), no los umbrales fijos de los adultos." },
        { q: "¿Almacena esta calculadora de IMC mis datos biométricos?", a: "No. Los cálculos se procesan íntegramente de forma local y privada en tu navegador web, sin guardar historial ni registrar medidas corporales." }
      ]
    },
    de: {
      name: "BMI Rechner",
      seoTitle: "BMI Rechner — Body Mass Index Berechnen | HelloTools",
      seoDescription: "Berechnen Sie Ihren Body-Mass-Index (BMI) schnell und präzise nach WHO-Standard.",
      description: "Ermitteln Sie Ihren genauen BMI und Ihre Gewichtskategorie basierend auf Größe und Gewicht.",
      quickAnswer: "Der BMI bewertet das Körpergewicht im Verhältnis zur Körpergröße und teilt es in Untergewicht, Normalgewicht und Übergewicht ein.",
      seoHowToUse: "1. Wählen Sie das Einheitensystem (Metrisch oder Imperial).\n2. Geben Sie Körpergröße und Gewicht ein.\n3. Klicken Sie auf Berechnen, um Ihren BMI zu sehen.",
      seoHowItWorks: "Der BMI ergibt sich aus dem Körpergewicht in Kilogramm geteilt durch das Quadrat der Körpergröße in Metern.",
      formula: "BMI = Gewicht (kg) / [Größe (m)]²",
      seoExample: "Eine Person mit 70 kg Gewicht und 1,75 m Körpergröße hat einen BMI von 22,86 (Normalgewicht).",
      faqs: [
        { q: "Welche BMI-Kategorien gelten laut WHO für Erwachsene?", a: "Laut Weltgesundheitsorganisation (WHO) gilt ein BMI unter 18,5 als Untergewicht, 18,5 bis 24,9 als Normalgewicht, 25,0 bis 29,9 als Übergewicht und ab 30,0 als Adipositas." },
        { q: "Unterscheidet der BMI zwischen Muskel- und Fettgewebe?", a: "Nein. Da der BMI ausschließlich Gewicht und Körpergröße ins Verhältnis setzt, können Kraftsportler mit hohem Muskelanteil fälschlicherweise als übergewichtig eingestuft werden." },
        { q: "Wie lautet die Berechnungsformel des Body-Mass-Index?", a: "Die Standardformel lautet: BMI = Körpergewicht in Kilogramm geteilt durch Körpergröße in Metern zum Quadrat (kg/m²)." },
        { q: "Gilt derselbe BMI-Bereich auch für Kinder und Jugendliche?", a: "Nein. Bei Kindern und Jugendlichen unter 18 Jahren wird der BMI anhand von alters- und geschlechtsspezifischen Perzentilenkurven beurteilt." },
        { q: "Werden meine eingegebenen Körpermaße gespeichert?", a: "Nein. Sämtliche Berechnungen laufen anonym und clientseitig in Ihrem Browser ab. Keine Messdaten werden gespeichert oder übermittelt." }
      ]
    },
    fr: {
      name: "Calculateur d'IMC",
      seoTitle: "Calculateur d'IMC (Indice de Masse Corporelle) | HelloTools",
      seoDescription: "Calculez rapidement votre IMC selon votre taille et poids selon les normes OMS.",
      description: "Déterminez votre IMC exact et votre tranche de poids de santé facilement.",
      quickAnswer: "L'IMC est un indicateur mesurant la corpulence en rapportant le poids à la taille au carré.",
      seoHowToUse: "1. Choisissez le système d'unités (Métrique ou Impérial).\n2. Saisissez votre taille et votre poids.\n3. Cliquez sur Calculer pour afficher votre résultat.",
      seoHowItWorks: "L'IMC est calculé en divisant le poids en kilogrammes par le carré de la taille en mètres.",
      formula: "IMC = Poids (kg) / [Taille (m)]²",
      seoExample: "Une personne mesurant 1,75 m pour 70 kg a un IMC de 22,86 (Corpulence normale).",
      faqs: [
        { q: "Quelles sont les tranches d'IMC établies par l'OMS pour les adultes ?", a: "Selon l'Organisation mondiale de la santé (OMS), un IMC inférieur à 18,5 indique une maigreur, entre 18,5 et 24,9 un poids normal, entre 25,0 et 29,9 un surpoids et 30,0 ou plus une obésité." },
        { q: "L'IMC fait-il la distinction entre masse musculaire et masse grasse ?", a: "Non. L'IMC ne différencie pas le muscle de la graisse corporelle. Un sportif très musclé peut présenter un IMC élevé tout en ayant un taux de masse grasse très faible." },
        { q: "Quelle est la formule de calcul de l'Indice de Masse Corporelle ?", a: "La formule officielle est : IMC = Poids (kg) / [Taille (m)]². Le résultat s'exprime en kg/m²." },
        { q: "Les seuils d'IMC sont-ils identiques pour les enfants et adolescents ?", a: "Non. Pour les moins de 18 ans, l'interprétation repose sur les courbes de corpulence en percentiles par âge et par sexe du carnet de santé." },
        { q: "Mes données de poids et de taille sont-elles enregistrées ?", a: "Non. Le calcul s'exécute strictement en local dans votre navigateur. Aucune donnée de santé n'est collectée ni conservée." }
      ]
    },
    pt: {
      name: "Calculadora de IMC",
      seoTitle: "Calculadora de IMC (Índice de Massa Corporal) | HelloTools",
      seoDescription: "Calcule seu IMC em segundos e confira sua classificação de peso segundo a OMS.",
      description: "Descubra seu IMC exato e saiba se você está no peso ideal.",
      quickAnswer: "O IMC é uma métrica universal que relaciona peso e altura para indicar faixas de peso corporal.",
      seoHowToUse: "1. Escolha o sistema métrico ou imperial.\n2. Insira sua altura e seu peso.\n3. Clique em Calcular para ver o IMC e a classificação.",
      seoHowItWorks: "O IMC é calculado dividindo o peso em quilos pela altura em metros ao quadrado.",
      formula: "IMC = Peso (kg) / [Altura (m)]²",
      seoExample: "Uma pessoa com 70 kg e 1,75 m de altura possui IMC de 22,86 (Peso normal).",
      faqs: [
        { q: "Quais são as faixas de classificação do IMC segundo a OMS?", a: "Pela OMS, IMC abaixo de 18,5 indica baixo peso; entre 18,5 e 24,9 é peso normal; entre 25,0 e 29,9 classifica-se como sobrepeso; e 30,0 ou mais indica obesidade." },
        { q: "O IMC diferencia massa muscular de gordura corporal acumulada?", a: "Não. O índice utiliza somente peso e altura, podendo classificar praticantes de musculação e atletas com sobrepeso apesar de baixo percentual de gordura." },
        { q: "Qual a fórmula matemática do Índice de Massa Corporal?", a: "A fórmula é IMC = Peso (kg) / [Altura (m)]². Exemplo: 70 kg e 1,75 m resulta em 70 / (1,75 × 1,75) = 22,86 kg/m²." },
        { q: "Os mesmos valores de IMC se aplicam para crianças e idosos?", a: "Não. Em crianças utilizam-se curvas de percentis de crescimento. Para idosos (acima de 60 anos), a faixa de normalidade recomendada é habitualmente entre 22 e 27 kg/m²." },
        { q: "Os dados informados nesta calculadora de IMC são salvos?", a: "Não. Os cálculos ocorrem em tempo real e de maneira confidencial no seu navegador, sem armazenamento em servidores." }
      ]
    },
    ja: {
      name: "BMI計算ツール",
      seoTitle: "BMI（体格指数）計算ツール | HelloTools",
      seoDescription: "身長と体重を入力するだけで、あなたのBMIと肥満度判定を瞬時に計算します。",
      description: "WHO（世界保健機関）および日本肥満学会の基準に基づき、正確なBMIを計算します。",
      quickAnswer: "BMI（Body Mass Index）は体重と身長から肥満度を判定する国際的な指標です。",
      seoHowToUse: "1. 単位系（メートル法）を選択します。\n2. 身長（cmまたはm）と体重（kg）を入力します。\n3. 「計算」ボタンを押してBMIと判定結果を確認します。",
      seoHowItWorks: "体重（kg）を身長（m）の2乗で割ることでBMI値を算出します。",
      formula: "BMI = 体重 (kg) / [身長 (m)]²",
      seoExample: "身長175cm、体重70kgの人のBMIは 22.86（普通体重）となります。",
      faqs: [
        { q: "日本肥満学会によるBMIの判定基準はどうなっていますか？", a: "18.5未満が「低体重（やせ）」、18.5以上25.0未満が「普通体重」、25.0以上が「肥満」と判定されます。最も病気になりにくい標準体重のBMIは「22」です。" },
        { q: "BMIは筋肉量と体脂肪率の違いを判別できますか？", a: "判別できません。体重と身長のみから算出するため、筋肉量が多いアスリートは体脂肪が少なくてもBMI上は「肥満」と判定される場合があります。" },
        { q: "BMI（体格指数）の計算式を教えてください。", a: "計算式は「BMI ＝ 体重(kg) ÷ 身長(m) ÷ 身長(m)」です。例えば体重65kg、身長1.72mの場合、65 ÷ 1.72 ÷ 1.72 ＝ 21.97 となります。" },
        { q: "子どもの肥満度判定にも成人のBMI基準が使えますか？", a: "小児には成人の基準は使えません。小児期（幼児・学童）は年齢と性別ごとの「カウプ指数」や「ローレル指数」、性別・年齢別BMIパーセンタイル値を用います。" },
        { q: "身長や体重の入力データが外部に送信・保存されることはありますか？", a: "いいえ。すべての演算はお使いのブラウザ内部でのみ即時実行され、個人情報や身体データが記録・送信されることは一切ありません。" }
      ]
    }
  },

  'age-calculator': {
    es: {
      name: "Calculadora de Edad",
      seoTitle: "Calculadora de Edad Precisa — Años, Meses, Días | HelloTools",
      seoDescription: "Calcula tu edad exacta en años, meses, días, horas y minutos con tu fecha de nacimiento.",
      description: "Descubre tu edad exacta transcurrida en años, meses, días e incluso el día de la semana en que naciste.",
      quickAnswer: "La calculadora de edad determina el tiempo transcurrido exacto entre tu fecha de nacimiento y el día de hoy.",
      seoHowToUse: "1. Selecciona tu fecha de nacimiento.\n2. Elige la fecha de cálculo (por defecto es hoy).\n3. Revisa tu edad en años, meses, días y minutos.",
      seoHowItWorks: "Calcula la diferencia exacta de días bisiestos y meses de diferente duración entre dos fechas.",
      formula: "Edad = Fecha de Referencia - Fecha de Nacimiento",
      seoExample: "Si naciste el 15 de enero de 1990 y hoy es 15 de enero de 2025, tienes exactamente 35 años.",
      faqs: [
        { q: "¿Cómo calcula la edad exacta esta calculadora?", a: "Calcula la diferencia matemática entre la fecha de nacimiento y la fecha actual o de destino, desglosando los años, meses, días, horas y minutos exactos transcurridos según el calendario gregoriano." },
        { q: "¿Tiene en cuenta los años bisiestos en el cómputo de días?", a: "Sí. Reconoce automáticamente los años bisiestos de 366 días (aquellos divisibles por 4, excepto finales de siglo no divisibles por 400) para garantizar precisión exacta en el recuento total de días." },
        { q: "¿Puedo calcular qué edad tendré en una fecha futura?", a: "Sí. Puedes seleccionar cualquier fecha futura en el selector de fecha final para conocer tu edad proyectada en un acontecimiento, jubilación o aniversario." },
        { q: "¿Cómo se determina el próximo cumpleaños y los días restantes?", a: "Compara el día y mes de nacimiento con la fecha del año en curso y calcula los días exactos que faltan hasta tu próximo aniversario." },
        { q: "¿Se guarda mi fecha de nacimiento en algún servidor?", a: "No. Todo el cálculo de edad se efectúa localmente en la memoria de tu navegador, garantizando total confidencialidad sobre tus datos personales." }
      ]
    },
    de: {
      name: "Altersrechner",
      seoTitle: "Altersrechner — Genaues Alter in Jahren, Monaten, Tagen | HelloTools",
      seoDescription: "Berechnen Sie Ihr exaktes Alter in Jahren, Monaten, Tagen, Stunden und Minuten.",
      description: "Ermitteln Sie die exakte verstrichene Zeit seit Ihrem Geburtsdatum auf den Tag genau.",
      quickAnswer: "Der Altersrechner ermittelt die genaue Zeitspanne zwischen Ihrem Geburtsdatum und dem heutigen Tag.",
      seoHowToUse: "1. Geben Sie Ihr Geburtsdatum ein.\n2. Wählen Sie das Vergleichsdatum (Standard: Heute).\n3. Lesen Sie Ihr exaktes Alter ab.",
      seoHowItWorks: "Berücksichtigt Schaltjahre und unterschiedliche Monatslängen bei der Differenzberechnung.",
      formula: "Alter = Zieldatum - Geburtsdatum",
      seoExample: "Geboren am 15. Januar 1990 ergibt am 15. Januar 2025 exakt 35 Jahre.",
      faqs: [
        { q: "Wie ermittelt dieser Altersrechner das exakte Lebensalter?", a: "Er berechnet die genaue Differenz zwischen Geburtsdatum und dem heutigen Stichtag und weist das Alter aufgeschlüsselt in Jahren, Monaten, Tagen, Stunden und Minuten aus." },
        { q: "Werden Schaltjahre bei der Tageszählung korrekt berücksichtigt?", a: "Ja, alle 366-Tage-Schaltjahre werden nach den Regeln des gregorianischen Kalenders fehlerfrei in die Gesamttageszahl eingerechnet." },
        { q: "Kann man das Alter zu einem künftigen Zeitpunkt berechnen?", a: "Ja, Sie können jedes beliebige Zieldatum in der Zukunft einstellen, um beispielsweise Ihr Alter beim Renteneintritt oder bei Jubiläen zu planen." },
        { q: "Wie werden die verbleibenden Tage bis zum nächsten Geburtstag berechnet?", a: "Das Tool vergleicht den Geburtstag mit dem aktuellen Kalenderdatum und ermittelt die exakte Tagesdifferenz bis zur nächsten Vollendung eines Lebensjahres." },
        { q: "Wird mein Geburtsdatum online gespeichert oder getrackt?", a: "Nein. Sämtliche Berechnungen laufen anonym und isoliert im lokalen Speicher Ihres Browsers ab." }
      ]
    },
    fr: {
      name: "Calculateur d'Âge",
      seoTitle: "Calculateur d'Âge Exact — Années, Mois, Jours | HelloTools",
      seoDescription: "Calculez votre âge exact en années, mois, jours, heures et minutes rapidement.",
      description: "Déterminez le temps exact écoulé depuis votre date de naissance avec précision.",
      quickAnswer: "Ce calculateur mesure l'intervalle de temps précis séparant votre naissance de la date actuelle.",
      seoHowToUse: "1. Indiquez votre date de naissance.\n2. Sélectionnez la date cible (aujourd'hui par défaut).\n3. Obtenez votre âge détaillé.",
      seoHowItWorks: "Il calcule la différence calendaire en tenant compte des années bissextiles.",
      formula: "Âge = Date actuelle - Date de naissance",
      seoExample: "Né le 15 janvier 1990, vous avez exactement 35 ans le 15 janvier 2025.",
      faqs: [
        { q: "Comment ce calculateur détermine-t-il l'âge exact ?", a: "Il calcule l'écart précis entre votre date de naissance et la date du jour, avec le détail complet en années, mois, jours, heures et minutes écoulés." },
        { q: "Les années bissextiles sont-elles prises en considération ?", a: "Oui. Le calendrier grégorien complet est modélisé, intégrant tous les 29 février pour un décompte rigoureux du nombre total de jours vécus." },
        { q: "Peut-on calculer son âge à une date future déterminée ?", a: "Oui. Il suffit de modifier la date de fin pour connaître votre âge exact lors d'un événement à venir, d'un départ en retraite ou d'un examen." },
        { q: "Comment est calculé le compte à rebours jusqu'au prochain anniversaire ?", a: "L'outil identifie la prochaine occurrence de votre jour de naissance et compte les jours restants avec exactitude." },
        { q: "Ma date de naissance est-elle conservée sur vos serveurs ?", a: "Non. Aucun traitement serveur n'a lieu : le calcul est exécuté instantanément sur votre appareil dans le respect de votre vie privée." }
      ]
    },
    pt: {
      name: "Calculadora de Idade",
      seoTitle: "Calculadora de Idade Exata — Anos, Meses e Dias | HelloTools",
      seoDescription: "Descubra sua idade exata em anos, meses, dias, horas e minutos a partir da data de nascimento.",
      description: "Calcule o tempo exato decorrido desde o seu nascimento em múltiplos formatos.",
      quickAnswer: "A calculadora determina o tempo preciso decorrido entre sua data de nascimento e o momento atual.",
      seoHowToUse: "1. Selecione sua data de nascimento.\n2. Escolha a data de comparação (hoje por padrão).\n3. Veja sua idade detalhada.",
      seoHowItWorks: "Calcula a diferença calendário considerando anos bissextos e duração exata de cada mês.",
      formula: "Idade = Data Atual - Data de Nascimento",
      seoExample: "Quem nasceu em 15/01/1990 completa exatamente 35 anos em 15/01/2025.",
      faqs: [
        { q: "Como a calculadora determina a idade exata em anos, meses e dias?", a: "Ela calcula a diferença matemática cronológica entre a data de nascimento e o dia de referência, considerando a duração exata de cada mês do calendário gregoriano." },
        { q: "Os anos bissextos são computados no total de dias de vida?", a: "Sim. Todos os anos bissextos com 29 de fevereiro são contabilizados automaticamente para garantir precisão no total absoluto de dias vividos." },
        { q: "É possível descobrir qual será minha idade em uma data futura?", a: "Sim. Basta alterar a data final para qualquer momento no futuro e visualizar sua idade projetada para viagens, aposentadoria ou concursos." },
        { q: "Como é calculada a contagem regressiva para o próximo aniversário?", a: "O sistema cruza o dia e mês do seu aniversário com a data de hoje e exibe quantos dias e meses faltam para a próxima comemoração." },
        { q: "Minha data de nascimento fica registrada no site?", a: "Não. Os dados fornecidos são processados unicamente na sessão do seu navegador, sem armazenamento externo ou cookies de identificação." }
      ]
    },
    ja: {
      name: "年齢計算ツール",
      seoTitle: "年齢計算機 — 生年月日から正確な年齢・経過日数 | HelloTools",
      seoDescription: "生年月日を入力するだけで、現在の満年齢、誕生してからの経過日数、月数、時間を正確に計算します。",
      description: "生年月日から満年齢、経過月数、総経過日数、生まれた曜日を正確に算出します。",
      quickAnswer: "生年月日と基準日の間の正確な年・月・日・時間を計算するツールです。",
      seoHowToUse: "1. 生年月日を入力します。\n2. 計算基準日（デフォルトは本日）を設定します。\n3. 「計算」をクリックして満年齢と経過日数を確認します。",
      seoHowItWorks: "閏年（うるう年）や月ごとの日数の違いを考慮して日付の差分を正確に計算します。",
      formula: "経過期間 = 計算基準日 - 生年月日",
      seoExample: "1990年1月15日生まれの場合、2025年1月15日で満35歳となります。",
      faqs: [
        { q: "満年齢と生後日数（日齢）はどのように計算されますか？", a: "生年月日と現在の日時（または指定日）の差分を、グレゴリオ暦の正確な暦法に基づき「○歳○ヶ月○日」および通算日数として算出します。" },
        { q: "うるう年（2月29日）の計算にも正確に対応していますか？", a: "はい。4年に1度のうるう年の366日を完全に判別し、総日数や月日の計算に狂いが生じないよう設計されています。" },
        { q: "将来の特定の日における自分の年齢を調べることはできますか？", a: "可能です。基準日を未来の日付に指定することで、定年退職日や節目の記念日時点での正確な年齢を逆算できます。" },
        { q: "次の誕生日までの残り日数はどうやって計算しますか？", a: "現在の暦日と次回来る誕生日の日付を比較し、次回誕生日を迎えるまでの残り日数と曜日を即座に表示します。" },
        { q: "入力した生年月日のデータがサーバーに記録されることはありますか？", a: "いいえ。すべての計算はお使いのブラウザ上でローカル処理され、生年月日等のプライベートな情報が外部に保存されることはありません。" }
      ]
    }
  },

  'compound-interest-calculator': {
    es: {
      name: "Calculadora de Interés Compuesto",
      seoTitle: "Calculadora de Interés Compuesto | HelloTools",
      seoDescription: "Calcula el crecimiento de tu inversión con interés compuesto a lo largo del tiempo.",
      description: "Visualiza la fuerza del interés compuesto en tus ahorros e inversiones con aportaciones periódicas.",
      quickAnswer: "El interés compuesto suma los intereses generados al capital inicial, haciendo que los intereses futuros generen aún más intereses.",
      seoHowToUse: "1. Introduce el capital inicial.\n2. Indica la tasa de interés anual.\n3. Selecciona el plazo y la frecuencia de capitalización.\n4. Revisa el balance final acumulado.",
      seoHowItWorks: "Aplica la fórmula exponencial de capitalización continua o periódica sobre el capital acumulado.",
      formula: "A = P * (1 + r/n)^(n*t)",
      seoExample: "Un depósito de $10.000 al 6% anual durante 10 años capitalizable anualmente crece hasta $17.908,48.",
      faqs: [
        { q: "¿Qué frecuencias de capitalización admite esta calculadora de interés compuesto?", a: "Admite capitalización diaria, semanal, mensual, trimestral, semestral y anual. Una mayor frecuencia de capitalización genera un rendimiento final ligeramente superior al reinvertir los intereses más a menudo." },
        { q: "¿Puedo usarla para depósitos a plazo fijo, cuentas remuneradas o fondos de inversión?", a: "Sí. Para plazos fijos y depósitos garantizados el cálculo es exacto. Para fondos de inversión y acciones representa una proyección teórica estimada, ya que la rentabilidad real de los mercados no es constante." },
        { q: "¿Es precisa esta calculadora de interés compuesto?", a: "Sí. Emplea la fórmula estándar A = P(1 + r/n)^(nt) con aritmética de punto flotante de 64 bits. Los resultados son matemáticamente exactos para los parámetros proporcionados." },
        { q: "¿Cómo calculo el crecimiento de mi inversión en la herramienta?", a: "Indica el capital inicial, la tasa anual esperada, el horizonte temporal, la frecuencia de capitalización y las aportaciones periódicas opcionales. Obtendrás el saldo final y los intereses totales acumulados." },
        { q: "¿Incluye la calculadora impuestos o comisiones de custodia?", a: "No. Los resultados reflejan el rendimiento bruto antes de impuestos sobre las plusvalías y comisiones de gestión. El rendimiento neto dependerá de la fiscalidad aplicable en tu país." }
      ]
    },
    de: {
      name: "Zinseszinsrechner",
      seoTitle: "Zinseszinsrechner — Zinseszins Online Berechnen | HelloTools",
      seoDescription: "Berechnen Sie das Wachstum Ihrer Geldanlage durch den Zinseszinseffekt.",
      description: "Simulieren Sie Vermögensaufbau und Zinseszinswachstum mit monatlichen Sparraten.",
      quickAnswer: "Beim Zinseszins werden erwirtschaftete Zinsen dem Kapital zugeschlagen und in Folgeperioden mitverzinst.",
      seoHowToUse: "1. Geben Sie das Startkapital ein.\n2. Tragen Sie den Zinssatz pro Jahr ein.\n3. Wählen Sie Anlagedauer und Zinsintervall.\n4. Lesen Sie das Endkapital ab.",
      seoHowItWorks: "Berechnet den exponentiellen Vermögenszuwachs durch die Wiederanlage von Zinserträgen.",
      formula: "Endkapital = K * (1 + p/100)^n",
      seoExample: "10.000 € Anlagesumme bei 6 % Zinsen über 10 Jahre wachsen auf 17.908,48 € an.",
      faqs: [
        { q: "Welche Zinseszins-Intervalle unterstützt dieser Rechner?", a: "Der Rechner unterstützt tägliche, wöchentliche, monatliche, vierteljährliche, halbjährliche und jährliche Zinseszinsperioden. Kürzere Zinsperioden führen zu einem leicht höheren Endbetrag, da Zinsen schneller wieder Zinsen tragen." },
        { q: "Kann ich den Rechner für Festgeld, Tagesgeld oder ETFs nutzen?", a: "Ja. Für Festgeld und Tagesgeld mit fixem Zinssatz liefert er exakte Werte. Bei ETF-Sparplänen und Fonds handelt es sich um eine Modellrechnung bei angenommener konstanter Jahresrendite ohne Gewähr." },
        { q: "Wie exakt arbeitet die Zinseszinsberechnung?", a: "Sie basiert auf der Standardformel A = P(1 + r/n)^(nt) und liefert mathematisch präzise Resultate auf Cent-Basis für die eingegebenen Parameter." },
        { q: "Wie berechne ich das Wachstum meines Vermögens?", a: "Tragen Sie Anfangskapital, Zinssatz, Anlagedauer, Zinsperiode sowie optionale monatliche Sparraten ein. Das Tool weist Endkapital, Gesamteinzahlungen und den Zinsgewinn aus." },
        { q: "Werden Kapitalertragsteuern oder Fondskosten abgezogen?", a: "Nein. Der Rechner weist das Brutto-Wachstum vor Steuern und Gebühren aus. Für den realen Nettoertrag müssen Abgeltungsteuer und Verwaltungsgebühren berücksichtigt werden." }
      ]
    },
    fr: {
      name: "Calculateur d'Intérêts Composés",
      seoTitle: "Calculateur d'Intérêts Composés — Croissance de Capital | HelloTools",
      seoDescription: "Calculez la valeur future de votre épargne grâce à l'effet des intérêts composés.",
      description: "Simulez la croissance de vos placements financière avec versements réguliers.",
      quickAnswer: "Les intérêts composés sont ajoutés au capital initial pour générer à leur tour de nouveaux intérêts.",
      seoHowToUse: "1. Entrez le capital initial.\n2. Indiquez le taux d'intérêt annuel.\n3. Choisissez la durée et la fréquence de capitalisation.\n4. Consultez le montant final.",
      seoHowItWorks: "Applique la formule exponentielle où les intérêts générés s'ajoutent au capital accumulé.",
      formula: "Montant = P * (1 + r/n)^(n*t)",
      seoExample: "Un placement de 10 000 € à 6 % par an pendant 10 ans atteint 17 908,48 €.",
      faqs: [
        { q: "Quelles fréquences de capitalisation sont prises en charge ?", a: "Le calculateur gère la capitalisation quotidienne, hebdomadaire, mensuelle, trimestrielle, semestrielle et annuelle. Plus la capitalisation est fréquente, plus le rendement cumulé est élevé." },
        { q: "Est-il utilisable pour les livrets, comptes à terme ou l'assurance-vie ?", a: "Oui. Pour les comptes à terme et livrets bancaires à taux fixe, le résultat est rigoureux. Pour les ETF ou l'assurance-vie en unités de compte, il s'agit d'une projection basée sur un taux annuel constant." },
        { q: "Ce calculateur d'intérêts composés est-il fiable ?", a: "Oui. Il met en œuvre la formule actuarielle A = P(1 + r/n)^(nt) avec une haute précision numérique. Les résultats correspondent fidèlement aux paramètres renseignés." },
        { q: "Comment simuler l'évolution de mon épargne ?", a: "Saisissez le capital initial, le taux d'intérêt annuel, la durée, la fréquence de capitalisation et les versements réguliers éventuels. Cliquez sur Calculer pour visualiser le capital acquis." },
        { q: "Les prélèvements sociaux ou impôts sont-ils déduits ?", a: "Non. Il présente une valorisation brute avant impôt sur le revenu, prélèvements sociaux et frais de gestion de contrat." }
      ]
    },
    pt: {
      name: "Calculadora de Juros Compostos",
      seoTitle: "Calculadora de Juros Compostos | HelloTools",
      seoDescription: "Calcule a evolução dos seus investimentos com a força dos juros compostos.",
      description: "Simule o crescimento do seu patrimônio com depósitos iniciais e aportes mensais.",
      quickAnswer: "Juros compostos são juros sobre juros: os rendimentos de cada período são incorporados ao principal.",
      seoHowToUse: "1. Insira o valor inicial investido.\n2. Digite a taxa de juros anual ou mensal.\n3. Defina o período do investimento.\n4. Veja o montante final acumulado.",
      seoHowItWorks: "Calcula o rendimento exponencial somando os juros ao montante a cada período de capitalização.",
      formula: "M = C * (1 + i)^t",
      seoExample: "Um aporte de R$ 10.000 a 6% ao ano durante 10 anos rende um total final de R$ 17.908,48.",
      faqs: [
        { q: "Quais frequências de capitalização de juros são suportadas?", a: "Suporta capitalização diária, semanal, mensal, trimestral, semestral e anual. Intervalos menores aumentam ligeiramente o valor acumulado pelo efeito multiplicador dos juros sobre juros." },
        { q: "Posso usar para simular CDB, LCI, Tesouro Direto ou Fundos Imobiliários?", a: "Sim. Em investimentos de renda fixa com taxa pré-fixada o cálculo é preciso. Para ações ou fundos multimercado, a ferramenta opera como projeção de rentabilidade média teórica." },
        { q: "A fórmula utilizada é matematicamente exata?", a: "Sim. Utiliza a fórmula exponencial M = C(1 + i/n)^(nt) com precisão IEEE-754 de 64 bits, garantindo conformidade matemática absoluta com as variáveis inseridas." },
        { q: "Como calcular o retorno de aportes mensais na ferramenta?", a: "Preencha o investimento inicial, taxa nominal anual, tempo de aplicação e o valor dos aportes mensais regulares. O sistema calculará o patrimônio final e o montante de juros gerados." },
        { q: "O cálculo desconta Imposto de Renda (IR) regressivo ou inflação?", a: "Não. O resultado apresentado é bruto. O rendimento líquido dependerá da alíquota de IR vigente e da taxa de inflação apurada no período." }
      ]
    },
    ja: {
      name: "複利計算シミュレーター",
      seoTitle: "複利計算シミュレーター — 資産運用・積立計算 | HelloTools",
      seoDescription: "元本・金利・期間・積立額を入力して資産が複利効果でどのように増えるかをシミュレーションします。",
      description: "長期投資や資産形成における複利効果（元本＋利息への利息発生）を正確に計算します。",
      quickAnswer: "複利計算とは、得られた利息を元本に組み入れて再び利息を発生させる計算方式です。",
      seoHowToUse: "1. 初期投資額（元本）を入力します。\n2. 年利（金利 %）を入力します。\n3. 運用期間（年）を選択します。\n4. 将来の運用成果（元利合計）を確認します。",
      seoHowItWorks: "期間ごとに生じる利息を次期の元本に加算して指数関数的な運用成長を算出します。",
      formula: "元利合計 = 元本 * (1 + 年利)^運用年数",
      seoExample: "元本100万円を年利6%で10年間複利運用すると、元利合計は約179万848円になります。",
      faqs: [
        { q: "どの複利周期（年・月・日）の計算に対応していますか？", a: "年複利、半年複利、四半期複利、月複利、週複利、日複利に対応しています。複利の計算頻度が高いほど利息が元本に組み込まれるスピードが上がり、最終資産額が増加します。" },
        { q: "定期預金、つみたてNISA、投資信託の試算に使えますか？", a: "はい。固定金利の定期預金では正確な満期受取額を計算できます。NISAや投資信託では想定利回りを一定と仮定した長期資産形成シミュレーションとして活用できます。" },
        { q: "複利計算の正確性について教えてください。", a: "金融工学で標準の複利計算式 A = P(1 + r/n)^(nt) に準拠しており、倍精度浮動小数点演算により入力数値に応じた高精度な結果を算出します。" },
        { q: "積立投資の複利効果はどうやって計算しますか？", a: "初期投資額、想定年利、投資年数、複利周期、毎月の積立額を入力して「計算」をクリックすると、元本累計、受取利息合計、最終到達資産額が即時に表示されます。" },
        { q: "利息にかかる税金や信託報酬手数料は差し引かれますか？", a: "いいえ。税引前・手数料控除前の純粋な資産成長をシミュレーションします。課税口座での受取時は約20.315%の源泉分離課税が発生します。" }
      ]
    }
  },

  'percentage-calculator': {
    es: {
      name: "Calculadora de Porcentajes",
      seoTitle: "Calculadora de Porcentajes Rápida | HelloTools",
      seoDescription: "Calcula porcentajes, aumentos, descuentos y variaciones porcentuales al instante.",
      description: "Resuelve cualquier cálculo de porcentaje: qué porcentaje es X de Y, aumento o descuento.",
      quickAnswer: "Un porcentaje representa una fracción de 100 partes iguales.",
      seoHowToUse: "1. Elige el tipo de cálculo de porcentaje.\n2. Introduce los números.\n3. Obtén el resultado inmediato.",
      seoHowItWorks: "Utiliza reglas de proporción directa sobre una base cien.",
      formula: "Porcentaje = (Parte / Total) * 100",
      seoExample: "El 20% de 150 es 30.",
      faqs: [
        { q: "¿Qué operaciones resuelve esta calculadora de porcentajes?", a: "Resuelve los tres problemas porcentuales básicos: calcular el porcentaje de un número (X% de Y), qué porcentaje representa un valor respecto a otro (X es qué % de Y) y la variación porcentual entre dos valores." },
        { q: "¿Cómo se calcula el aumento o disminución porcentual entre dos números?", a: "La fórmula es: Variación% = [(Valor Final - Valor Inicial) / Valor Inicial] × 100. Un resultado positivo indica incremento y uno negativo indica descenso." },
        { q: "¿Cómo aplico un porcentaje de descuento o de recargo a un precio?", a: "Para sumar un recargo (ej. 21% IVA): Precio × 1,21. Para restar un descuento (ej. 15% de rebaja): Precio × (1 - 0,15) = Precio × 0,85." },
        { q: "¿Cuál es la diferencia entre puntos porcentuales y porcentaje?", a: "Un porcentaje mide el cambio relativo respecto al valor previo, mientras que los puntos porcentuales miden la diferencia aritmética simple entre dos tasas (ej. subir del 5% al 7% son 2 puntos porcentuales, pero un 40% de aumento relativo)." },
        { q: "¿Qué precisión tienen los resultados porcentuales?", a: "Aplica aritmética de doble precisión con visualización redondeada habitualmente a dos decimales sin pérdida de exactitud intermedia." }
      ]
    },
    de: {
      name: "Prozentrechner",
      seoTitle: "Prozentrechner — Prozentwert, Prozentsatz Berechnen | HelloTools",
      seoDescription: "Berechnen Sie Prozentwerte, prozentuale Veränderungen und Rabatte sofort.",
      description: "Einfacher Prozentrechner für alle mathematischen Prozentfragen des Alltags.",
      quickAnswer: "Ein Prozent ist ein Hundertstel eines Gesamtwertes.",
      seoHowToUse: "1. Wählen Sie die Rechenart.\n2. Geben Sie die Werte ein.\n3. Lesen Sie das Ergebnis ab.",
      seoHowItWorks: "Berechnet Werte auf Basis des Verhältnisses zu 100.",
      formula: "Prozentwert = (Grundwert * Prozentsatz) / 100",
      seoExample: "20 % von 150 ist 30.",
      faqs: [
        { q: "Welche Grundaufgaben der Prozentrechnung deckt der Rechner ab?", a: "Er löst die drei klassischen Typen: den Prozentwert (X % von Y), den Prozentsatz (Wie viel % ist X von Y?) und die prozentuale Zunahme oder Abnahme zwischen zwei Werten." },
        { q: "Wie berechnet man die prozentuale Veränderung (Steigerung/Verlust)?", a: "Die Formel lautet: Veränderung in % = [(Neuer Wert - Alter Wert) / Alter Wert] × 100. Ein positives Ergebnis steht für Gewinn/Zuwachs, ein negatives für Verlust." },
        { q: "Wie schlägt man die Mehrwertsteuer (z. B. 19 %) auf einen Nettopreis auf?", a: "Multiplizieren Sie den Nettopreis einfach mit 1,19. Um aus dem Bruttopreis die Mehrwertsteuer herauszurechnen, teilen Sie den Betrag durch 1,19." },
        { q: "Was unterscheidet Prozentpunkte von Prozent?", a: "Prozentpunkte bezeichnen die einfache Differenz zweier Zinssätze (von 4 % auf 5 % ist 1 Prozentpunkt). Der prozentuale Anstieg beträgt dabei jedoch relative 25 %." },
        { q: "Wie exakt rechnet der Prozentrechner?", a: "Er nutzt IEEE-754-Fließkomma-Genauigkeit und rundet das Ergebnis standardmäßig auf zwei Nachkommastellen kaufmännisch." }
      ]
    },
    fr: {
      name: "Calculateur de Pourcentage",
      seoTitle: "Calculateur de Pourcentage Gratuit | HelloTools",
      seoDescription: "Calculez des pourcentages, augmentations, réductions et variations facilement.",
      description: "Outil polyvalent pour tous vos calculs de pourcentage au quotidien.",
      quickAnswer: "Un pourcentage exprime une proportion sur une base de 100.",
      seoHowToUse: "1. Choisissez le type de calcul.\n2. Entrez vos valeurs.\n3. Obtenez le résultat instantanément.",
      seoHowItWorks: "Applique la règle de trois basée sur 100.",
      formula: "Valeur = (Total * Pourcentage) / 100",
      seoExample: "20% de 150 égale 30.",
      faqs: [
        { q: "Quels calculs de pourcentages ce calculateur permet-il d'effectuer ?", a: "Il traite le calcul d'une fraction de valeur (X % de Y), la proportion d'une grandeur par rapport à une autre (X représente quel % de Y) et le taux de variation en pourcentage." },
        { q: "Comment calculer un pourcentage d'évolution (hausse ou baisse) ?", a: "La formule est : Taux d'évolution (%) = [(Valeur Finale - Valeur Initiale) / Valeur Initiale] × 100. Un signe négatif indique une diminution." },
        { q: "Comment ajouter la TVA de 20 % à un montant hors taxes ?", a: "Multipliez le montant HT par 1,20 pour obtenir le montant TTC. Pour retrouver le montant HT depuis le TTC, divisez par 1,20." },
        { q: "Quelle est la différence entre pourcentage et point de pourcentage ?", a: "Les points de pourcentage mesurent l'écart direct entre deux pourcentages (passer de 10 % à 12 % équivaut à 2 points de hausse, mais correspond à une augmentation relative de 20 %)." },
        { q: "Quelle est la précision numérique des conversions ?", a: "Les calculs sont précis avec une résolution décimale rigoureuse adaptée aux usages financiers et scientifiques." }
      ]
    },
    pt: {
      name: "Calculadora de Porcentagem",
      seoTitle: "Calculadora de Porcentagem Online | HelloTools",
      seoDescription: "Calcule porcentagens, aumentos, descontos e variações percentuais em segundos.",
      description: "Ferramenta rápida para resolver qualquer conta de porcentagem.",
      quickAnswer: "Porcentagem é uma razão que representa uma fração de 100.",
      seoHowToUse: "1. Escolha o tipo de cálculo.\n2. Digite os valores.\n3. Veja o resultado imediatamente.",
      seoHowItWorks: "Aplica a regra de três direta proporcional a 100.",
      formula: "Resultado = (Valor * Porcentagem) / 100",
      seoExample: "20% de 150 é igual a 30.",
      faqs: [
        { q: "Quais tipos de cálculos com porcentagem este simulador realiza?", a: "Executa o cálculo de porcentagem de um valor (X% de Y), a proporção percentual relativa (X é qual % de Y) e a variação percentual de acréscimo ou desconto entre dois valores." },
        { q: "Como se calcula a variação percentual entre dois números?", a: "A fórmula é: Variação% = [(Valor Final - Valor Inicial) / Valor Inicial] × 100. Valores positivos indicam alta e negativos indicam retração percentual." },
        { q: "Como aplicar um acréscimo ou desconto percentual direto?", a: "Para aplicar acréscimo de 10%: multiplique por 1,10. Para conceder desconto de 15%: multiplique o valor por 0,85." },
        { q: "Qual a diferença técnica entre pontos percentuais e porcentagem?", a: "Pontos percentuais representam a subtração aritmética entre duas taxas (subir de 8% para 10% são 2 pontos percentuais a mais, equivalendo a uma alta relativa de 25%)." },
        { q: "A ferramenta realiza o arredondamento de casas decimais?", a: "Sim, apresenta o resultado com duas casas decimais formatadas no padrão comercial comum." }
      ]
    },
    ja: {
      name: "パーセント計算ツール",
      seoTitle: "パーセント計算ツール — 割合・割引・変化率 | HelloTools",
      seoDescription: "「〇〇の数値のXX%は？」「〇〇からXX%引きの価格は？」などの計算を瞬時に行います。",
      description: "日常や仕事で使うあらゆるパーセント（割合・値引き・増加率）を簡単に計算します。",
      quickAnswer: "パーセント（百分率）は全体を100としたときの割合を表す単位です。",
      seoHowToUse: "1. 計算したい項目を選択します。\n2. 数値を入力します。\n3. 計算結果が瞬時に表示されます。",
      seoHowItWorks: "全体を100基準とした比例計算を行います。",
      formula: "割合結果 = (全体 * パーセント) / 100",
      seoExample: "150の20%は 30 です。",
      faqs: [
        { q: "このパーセント計算ツールでできる計算の種類は何ですか？", a: "「YのX%はいくらか」「XはYの何%にあたるか」「ある数値から別の数値への増減率（変化率%）」の3大基本計算に対応しています。" },
        { q: "前年比や増加率・減少率（パーセント増減）はどう計算しますか？", a: "計算式は「(新数値 － 旧数値) ÷ 旧数値 × 100」です。プラスなら増加率（UP）、マイナスなら減少率（DOWN）を示します。" },
        { q: "消費税（10%）の上乗せ計算や税抜きの計算方法は？", a: "税込価格を出すには「税抜金額 × 1.10」、税込価格から本体価格（税抜）を逆算するには「税込金額 ÷ 1.10」で求められます。" },
        { q: "「パーセント」と「パーセントポイント」の違いは何ですか？", a: "金利が1%から2%に上がった場合、単純な引き算の差である「1ポイント上昇」と、比率として倍になった「100%増加」という明確な違いがあります。" },
        { q: "計算結果の丸め処理（小数点以下）はどうなっていますか？", a: "高精度の浮動小数点演算を行い、一般的に分かりやすい小数点以下第2位までの四捨五入で明快に表示します。" }
      ]
    }
  },

  'emi-calculator': {
    es: {
      name: "Calculadora de Cuota Mensual (EMI)",
      seoTitle: "Calculadora de Cuotas de Préstamo (EMI) | HelloTools",
      seoDescription: "Calcula tu cuota mensual estimada para préstamos personales, de auto o hipotecarios.",
      description: "Estima la cuota fija mensual (EMI) de tu crédito e intereses totales.",
      quickAnswer: "EMI (Equated Monthly Installment) es la cantidad fija que pagas cada mes a la entidad financiera.",
      seoHowToUse: "1. Ingrese el monto del crédito.\n2. Ajuste la tasa de interés.\n3. Indique el plazo.",
      seoHowItWorks: "Utiliza el método de amortización francés de cuota constante.",
      formula: "EMI = P * r * (1+r)^n / [(1+r)^n - 1]",
      seoExample: "Para $50.000 al 8% a 5 años, la cuota es $1.013,82.",
      faqs: [
        { q: "¿Para qué tipos de préstamos sirve esta calculadora EMI?", a: "Sirve para hipotecas, préstamos personales, créditos de auto y cualquier financiamiento a tipo fijo con cuotas constantes. Calcula el desglose mensual de capital e intereses sin incluir comisiones de apertura o seguros." },
        { q: "¿Incluye esta calculadora comisiones bancarias o solo capital e intereses?", a: "Incluye exclusivamente capital e intereses dentro de la fórmula de amortización. Las comisiones bancarias, gastos notariales y primas de seguro deben consultarse en la calculadora de TAE/APR." },
        { q: "¿Es precisa esta calculadora comparada con las liquidaciones de los bancos?", a: "Sí. Emplea la fórmula estándar de amortización francesa con aritmética de doble precisión, coincidiendo con los cronogramas bancarios oficiales. Pueden existir diferencias menores de céntimos según los criterios de redondeo del banco." },
        { q: "¿Cómo calculo la cuota mensual de mi préstamo con esta herramienta?", a: "Introduce el importe del préstamo, la tasa de interés anual y el plazo en meses o años, y pulsa Calcular. Obtendrás al instante la cuota mensual fija, el interés total devengado y el coste global." },
        { q: "¿Puedo usar esta calculadora si mi préstamo es a tasa variable?", a: "Está diseñada para préstamos a tasa fija. En hipotecas variables puedes simular diferentes escenarios ajustando la tasa de interés periódicamente, pero tu cuota real fluctuará según el índice de referencia." }
      ]
    },
    de: {
      name: "Kreditratenrechner (EMI)",
      seoTitle: "Kreditratenrechner — Monatsrate Berechnen | HelloTools",
      seoDescription: "Berechnen Sie Ihre monatliche Kreditrate für Ratenkredite und Autokredite.",
      description: "Ermitteln Sie die genaue Monatsrate und die Gesamtkosten Ihres Kredits.",
      quickAnswer: "Die EMI (Equal Monthly Installment) ist die gleichbleibende monatliche Rückzahlungsrate.",
      seoHowToUse: "1. Kreditbetrag eingeben.\n2. Zinssatz anpassen.\n3. Laufzeit wählen.",
      seoHowItWorks: "Berechnung nach der Standard-Annuitätenformel.",
      formula: "Rate = K * i * (1+i)^n / [(1+i)^n - 1]",
      seoExample: "Bei 50.000 € zu 8 % über 5 Jahre beträgt die Monatsrate 1.013,82 €.",
      faqs: [
        { q: "Für welche Kreditarten eignet sich dieser Ratenrechner (EMI)?", a: "Der Rechner eignet sich für Ratenkredite, Baufinanzierungen, Autokredite und alle Annuitätendarlehen mit festem Zinssatz. Er berechnet die monatliche Zins- und Tilgungsrate ohne Bearbeitungs- oder Nebengebühren." },
        { q: "Berücksichtigt der Rechner Nebengebühren oder nur Tilgung und Zinsen?", a: "Er berücksichtigt ausschließlich Tilgungs- und Zinsanteile. Zusätzliche Abschlussgebühren oder Restschuldversicherungen fließen nicht ein; nutzen Sie dafür den Effektivzins-Rechner (APR)." },
        { q: "Wie genau ist dieser Rechner im Vergleich zu Bankauskünften?", a: "Die Ergebnisse stimmen exakt mit gängigen Bankberechnungen überein, da die standardisierte mathematische Annuitätenformel verwendet wird. Geringe Cent-Abweichungen können durch bankinterne Rundungsmethoden entstehen." },
        { q: "Wie berechne ich meine monatliche Kreditrate?", a: "Geben Sie den Darlehensbetrag, den Sollzinssatz pro Jahr und die Laufzeit in Monaten oder Jahren ein. Klicken Sie auf Berechnen, um die Monatsrate, die Gesamtzinsen und den gesamten Rückzahlungsbetrag anzuzeigen." },
        { q: "Funktioniert der Rechner auch bei variablen Zinssätzen?", a: "Er ist für Festzinskredite ausgelegt. Bei variablen Zinssätzen können Sie verschiedene Zinsniveaus simulieren, die tatsächliche Rate passt sich jedoch künftigen Marktzinsanpassungen an." }
      ]
    },
    fr: {
      name: "Calculateur de Mensualité de Prêt (EMI)",
      seoTitle: "Calculateur de Mensualité de Prêt (EMI) | HelloTools",
      seoDescription: "Estimez la mensualité constante de votre crédit personnel ou auto.",
      description: "Calculez votre échéance mensuelle et le coût total de votre prêt.",
      quickAnswer: "L'EMI est la mensualité constante versée à la banque chaque mois.",
      seoHowToUse: "1. Entrez le capital emprunté.\n2. Indiquez le taux d'intérêt.\n3. Choisissez la durée.",
      seoHowItWorks: "Basé sur la formule mathématique des mensualités constantes.",
      formula: "Mensualité = P * r * (1+r)^n / [(1+r)^n - 1]",
      seoExample: "Pour 50 000 € à 8 % sur 5 ans, la mensualité est de 1 013,82 €.",
      faqs: [
        { q: "Pour quels types de prêts ce calculateur d'échéance (EMI) est-il adapté ?", a: "Il convient aux prêts immobiliers, prêts personnels, crédits auto et tout financement amortissable à taux fixe. Il calcule la mensualité constante de capital et d'intérêts sans frais annexes." },
        { q: "Ce calculateur inclut-il les frais de dossier ou uniquement le capital et les intérêts ?", a: "Il calcule uniquement le capital et les intérêts selon la formule actuarielle standard. Pour évaluer le coût global incluant frais de dossier et assurances, utilisez notre calculateur de TAEG (APR)." },
        { q: "Ce calculateur est-il conforme aux échéanciers bancaires ?", a: "Oui. Il applique la formule mathématique standard de mensualité constante à double précision. De minimes écarts de centimes peuvent survenir selon les règles d'arrondi propres à chaque banque." },
        { q: "Comment calculer ma mensualité de crédit avec cet outil ?", a: "Renseignez le montant emprunté, le taux d'intérêt annuel et la durée en mois ou en années, puis cliquez sur Calculer. L'outil affiche immédiatement votre mensualité fixe et le montant total des intérêts." },
        { q: "Puis-je utiliser ce calculateur pour un prêt à taux variable ?", a: "Il est conçu pour les prêts à taux fixe. Pour un taux révisable, vous pouvez simuler différents paliers de taux, mais vos mensualités réelles évolueront au rythme des révisions contractuelles." }
      ]
    },
    pt: {
      name: "Calculadora de Parcelas (EMI)",
      seoTitle: "Calculadora de Parcelas de Empréstimo (EMI) | HelloTools",
      seoDescription: "Calcule o valor da parcela mensal estimada para seu empréstimo ou financiamento.",
      description: "Simule o valor da prestação mensal fixa e os juros totais contratados.",
      quickAnswer: "EMI é a parcela mensal constante paga ao banco durante a vigência do empréstimo.",
      seoHowToUse: "1. Digite o valor financiado.\n2. Insira a taxa de juros.\n3. Selecione o prazo.",
      seoHowItWorks: "Utiliza a fórmula da Tabela Price de prestações iguais.",
      formula: "Parcela = P * i * (1+i)^n / [(1+i)^n - 1]",
      seoExample: "Para R$ 50.000 a 8% ao ano por 5 anos, a parcela mensal é de R$ 1.013,82.",
      faqs: [
        { q: "Para quais modalidades de crédito esta calculadora de parcelas serve?", a: "Serve para financiamentos imobiliários, crédito pessoal, financiamento veicular e qualquer empréstimo com parcelas fixas (Tabela Price). Calcula a amortização pura sem taxas administrativas ou seguros." },
        { q: "A calculadora inclui tarifas de contratação ou apenas capital e juros?", a: "Calcula estritamente capital e juros contratados. Taxas de abertura de crédito (TAC), IOF e seguros embutidos devem ser avaliados por meio da calculadora de Custo Efetivo Total (CET/APR)." },
        { q: "O cálculo é exato comparado às simulações dos bancos?", a: "Sim. A fórmula empregada segue o padrão bancário internacional de amortização com precisão decimal completa. Diferenças residuais de centavos decorrem apenas de critérios de arredondamento bancário." },
        { q: "Como calcular o valor da prestação mensal no simulador?", a: "Informe o montante financiado, a taxa anual de juros e o prazo em meses ou anos, clicando em seguida em Calcular. O valor da parcela e o acumulado de juros serão exibidos instantaneamente." },
        { q: "Posso usar esta ferramenta para contratos com juros pós-fixados?", a: "O simulador opera com taxas pré-fixadas. Para contratos atrelados a índices variáveis (como IPCA ou CDI), utilize-o para simular cenários de taxas médias projetadas." }
      ]
    },
    ja: {
      name: "EMIローン月額計算ツール",
      seoTitle: "EMIローン毎月返済額計算機 | HelloTools",
      seoDescription: "自動車ローンや個人ローンの毎月の返済額（EMI）と利息総額を簡単に試算できます。",
      description: "借入金、金利、返済期間から毎月の定額返済額（EMI）を算出します。",
      quickAnswer: "EMI（Equated Monthly Installment）とは、毎月均等に返済する定額返済額のことです。",
      seoHowToUse: "1. 借入希望額を入力します。\n2. 年利（%）を設定します。\n3. 返済期間を指定します。",
      seoHowItWorks: "元利均等返済の計算式に基づき算出します。",
      formula: "毎月返済額 = P * r * (1+r)^n / [(1+r)^n - 1]",
      seoExample: "500万円を年利8%、5年（60回）返済で借りた場合、毎月の返済額は101,382円です。",
      faqs: [
        { q: "この返済額（EMI）計算ツールはどのローンに対応していますか？", a: "住宅ローン、マイカーローン、教育ローン、各種フリーローンなど、一般的な固定金利の元利均等返済ローンに対応しています。元金と利息の返済額を算定し、諸費用は含みません。" },
        { q: "事務手数料や保証料は計算結果に含まれますか？", a: "元金と金利のみを計算対象としており、融資手数料や保証料は含まれません。諸費用を含めた実質負担率を確認したい場合は「実質年率（APR）計算ツール」をご利用ください。" },
        { q: "銀行の試算や返済予定表と一致しますか？", a: "はい。日本の金融機関で標準採用されている元利均等返済の計算式を倍精度で計算しているため、ほぼ同一の結果が得られます。端数処理（円未満四捨五入・切捨て）による微小な差異が生じる場合があります。" },
        { q: "毎月のローン返済額はどのように算出しますか？", a: "借入希望額、年利（表面金利）、借入期間（年数または月数）を入力し、「計算」を押すだけで、月々の返済額と総利息額が即座に表示されます。" },
        { q: "変動金利ローンの試算にも利用できますか？", a: "固定金利向けに設計されていますが、金利見直し時の数値を入力することで将来の返済額シミュレーションとして活用可能です。実際の変動金利では金利見直しに伴い返済額が変動します。" }
      ]
    }
  },

  'calorie-calculator': {
    es: {
      name: "Calculadora de Calorías",
      seoTitle: "Calculadora de Calorías Diarias (TDEE & BMR) | HelloTools",
      seoDescription: "Calcula tus necesidades calóricas diarias para mantener, perder o ganar peso.",
      description: "Descubre tu Gasto Energético Total Diario (TDEE) y Tasa de Metabolismo Basal (BMR).",
      quickAnswer: "Tu TDEE son las calorías totales que quemas al día según tu actividad física.",
      seoHowToUse: "1. Introduce edad, género, peso y altura.\n2. Selecciona tu nivel de actividad física.\n3. Obtén tus calorías objetivo.",
      seoHowItWorks: "Utiliza la ecuación de Mifflin-St Jeor ajustada por factor de actividad.",
      formula: "TDEE = BMR * Factor de Actividad",
      seoExample: "Una persona con BMR de 1.600 kcal moderadamente activa necesita unas 2.480 kcal/día.",
      faqs: [
        { q: "¿Qué es el TDEE o Gasto Energético Total Diario?", a: "El TDEE es la cantidad total de calorías que quema tu cuerpo en 24 horas, sumando tu metabolismo basal, el efecto térmico de los alimentos y la actividad física diaria." },
        { q: "¿Cuántas calorías debo recortar para perder grasa de forma saludable?", a: "Un déficit moderado y sostenible de 300 a 500 calorías al día respecto a tu TDEE promueve una pérdida aproximada de 0,3 a 0,5 kg de grasa por semana preservando la masa muscular." },
        { q: "¿Cuántas calorías necesito para aumentar masa muscular?", a: "Se aconseja un superávit controlado de 250 a 400 calorías al día sobre tu mantenimiento calórico, combinado con entrenamiento de fuerza progresivo y adecuada ingesta de proteínas." },
        { q: "¿Por qué el ritmo de pérdida de peso se ralentiza tras unas semanas?", a: "Conforme pierdes peso corporal, tu gasto metabólico disminuye (adaptación metabólica) y necesitas reajustar tus calorías a tu nuevo peso actual." },
        { q: "¿Es fiable esta calculadora calórica para deportistas?", a: "Sí. Utiliza la fórmula de Mifflin-St Jeor con factores de actividad multiplicadores que van desde 1,2 (sedentario) hasta 1,9 (actividad intensa o atletas)." }
      ]
    },
    de: {
      name: "Kalorienrechner",
      seoTitle: "Kalorienrechner — Täglicher Kalorienbedarf (TDEE) | HelloTools",
      seoDescription: "Berechnen Sie Ihren täglichen Kalorienbedarf zum Abnehmen, Halten oder Zunehmen.",
      description: "Ermitteln Sie Ihren Grundumsatz (BMR) und Gesamtumsatz (TDEE) präzise.",
      quickAnswer: "Der Gesamtumsatz gibt an, wie viele Kalorien Sie am Tag insgesamt verbrennen.",
      seoHowToUse: "1. Alter, Geschlecht, Gewicht und Größe eingeben.\n2. Aktivitätslevel wählen.\n3. Zielkalorien ablesen.",
      seoHowItWorks: "Berechnung nach der Mifflin-St Jeor-Formel multipliziert mit dem Aktivitätsfaktor.",
      formula: "Gesamtumsatz = Grundumsatz * Aktivitätsfaktor",
      seoExample: "Bei einem Grundumsatz von 1.600 kcal und moderater Aktivität liegt der Bedarf bei 2.480 kcal/Tag.",
      faqs: [
        { q: "Was versteht man unter dem täglichen Gesamtenergiebedarf (TDEE)?", a: "Der TDEE beziffert den gesamten Kalorienverbrauch eines Tages, bestehend aus Grundumsatz (BMR), nahrungsinduzierter Thermogenese und körperlicher Aktivität (PAL-Faktor)." },
        { q: "Wie groß sollte das Kaloriendefizit zum gesunden Abnehmen sein?", a: "Ein moderates Defizit von 300 bis 500 kcal unter dem TDEE führt zu einem nachhaltigen Fettabbau von etwa 0,3 bis 0,5 kg pro Woche ohne unnötigen Muskelverlust." },
        { q: "Wie viele Kalorien benötigt man für kontrollierten Muskelaufbau?", a: "Ein Kalorienüberschuss von 200 bis 400 kcal täglich über dem Erhaltungsbedarf gilt bei gleichzeitigem progressiven Krafttraining als optimaler Aufbaukorridor." },
        { q: "Warum stagniert die Gewichtsabnahme nach einiger Zeit oft?", a: "Durch den Gewichtsverlust sinkt der Grundumsatz (metabolische Anpassung). Die Kalorienzufuhr muss daher in regelmäßigen Abständen nachjustiert werden." },
        { q: "Welche Berechnungsformel liegt dem Kalorienrechner zugrunde?", a: "Die Berechnung beruht auf der international anerkannten Mifflin-St-Jeor-Formel multipliziert mit dem jeweiligen Aktivitätsfaktor." }
      ]
    },
    fr: {
      name: "Calculateur de Calories",
      seoTitle: "Calculateur de Calories Quotidiennes (TDEE) | HelloTools",
      seoDescription: "Calculez votre besoin calorique quotidien pour perdre, maintenir ou prendre du poids.",
      description: "Déterminez votre métabolisme de base (MB) et votre dépense énergétique totale (TDEE).",
      quickAnswer: "Le TDEE représente le nombre total de calories brûlées chaque jour.",
      seoHowToUse: "1. Entrez âge, sexe, poids et taille.\n2. Choisissez votre niveau d'activité.\n3. Obtenez vos apports conseillés.",
      seoHowItWorks: "Utilise la formule de Mifflin-St Jeor pondérée par le coefficient d'activité.",
      formula: "TDEE = BMR * Facteur d'activité",
      seoExample: "Avec un MB de 1 600 kcal et une activité modérée, votre besoin est de 2 480 kcal/jour.",
      faqs: [
        { q: "Qu'est-ce que la Dépense Énergétique Totale (DET / TDEE) ?", a: "La DET représente le nombre total de calories dépensées par votre organisme en 24 heures, englobant le métabolisme de base et la dépense liée aux mouvements et au sport." },
        { q: "Quel déficit calorique adopter pour perdre du poids sans danger ?", a: "Un déficit modéré de 300 à 500 kcal par jour par rapport à votre DET permet une perte durable de 1 à 2 kg de graisse par mois tout en épargnant la masse musculaire." },
        { q: "Combien de calories consommer pour une prise de masse musculaire ?", a: "Un surplus calorique contrôlé de 250 à 400 kcal au-delà de la maintenance, associé à un entraînement de musculation suffisant, favorise le développement musculaire." },
        { q: "Pourquoi le métabolisme s'adapte-t-il pendant un régime hypocalorique ?", a: "Lorsque le poids diminue, le corps consomme naturellement moins d'énergie au repos et en mouvement. Il est donc normal d'ajuster ses rations au fil de l'évolution." },
        { q: "Comment le niveau d'activité physique est-il évalué ?", a: "Il est calculé via des coefficients multiplicateurs d'activité standardisés allant de 1,2 (sédentaire) à 1,9 (sportif intensif de haut niveau)." }
      ]
    },
    pt: {
      name: "Calculadora de Calorias",
      seoTitle: "Calculadora de Calorias Diárias (TDEE) | HelloTools",
      seoDescription: "Calcule o gasto calórico diário recomendado para emagrecer, manter ou ganhar peso.",
      description: "Descubra sua Taxa Metabólica Basal (BMR) e seu Gasto Energético Total (TDEE).",
      quickAnswer: "O TDEE é a quantidade total de calorias que seu corpo queima por dia.",
      seoHowToUse: "1. Insira idade, sexo, peso e altura.\n2. Escolha o nível de atividade física.\n3. Veja suas calorias meta.",
      seoHowItWorks: "Aplica a equação Mifflin-St Jeor multiplicada pelo fator de atividade.",
      formula: "TDEE = BMR * Fator de Atividade",
      seoExample: "Com BMR de 1.600 kcal e atividade moderada, a meta é de 2.480 kcal/dia.",
      faqs: [
        { q: "O que representa o Gasto Energético Total Diário (TDEE)?", a: "O TDEE indica o total de calorias queimadas pelo organismo em um dia completo, unindo a taxa metabólica basal à queima por atividades ocupacionais e esportivas." },
        { q: "Qual déficit calórico é recomendado para queimar gordura com saúde?", a: "Um déficit moderado entre 300 e 500 calorias diárias abaixo do TDEE proporciona perda sustentável de 0,3 a 0,5 kg semanais sem comprometer a massa magra." },
        { q: "Quantas calorias a mais são necessárias para ganhar massa muscular?", a: "Recomenda-se um superávit calórico controlado de 250 a 400 calorias por dia acima da manutenção, acompanhado de treino de força hipertrófico." },
        { q: "Por que o peso costuma estagnar após algum tempo de dieta?", a: "Com a redução do peso corporal, o gasto calórico basal diminui naturalmente. É fundamental recalcular o TDEE conforme a nova composição corporal." },
        { q: "A calculadora diferencia o metabolismo por gênero e idade?", a: "Sim. A equação de Mifflin-St Jeor incorpora idade, sexo biológico, estatura e peso para máxima fidelidade fisiológica." }
      ]
    },
    ja: {
      name: "カロリー計算ツール",
      seoTitle: "1日の必要カロリー計算ツール（TDEE・基礎代謝） | HelloTools",
      seoDescription: "年齢・性別・身長・体重・活動量から、1日の消費カロリー（TDEE）と基礎代謝（BMR）を計算します。",
      description: "ダイエット、現状維持、増量に必要な1日の推定摂取カロリーを計算します。",
      quickAnswer: "TDEE（総消費カロリー）は日常生活や運動で1日に消費する総エネルギー量です。",
      seoHowToUse: "1. 年齢・性別・身長・体重を入力します。\n2. 普段の運動レベルを選択します。\n3. 目標に応じた必要カロリーを確認します。",
      seoHowItWorks: "Mifflin-St Jeor式で基礎代謝を計算し、活動度係数を掛け合わせて算出します。",
      formula: "TDEE = 基礎代謝(BMR) * 活動度係数",
      seoExample: "基礎代謝1,600kcalで適度な運動をする人の1日の消費カロリーは約2,480kcalです。",
      faqs: [
        { q: "1日の総消費エネルギー量（TDEE）とは何ですか？", a: "生命維持に必要な「基礎代謝量（BMR）」に、日常生活の動作や運動で消費される活動エネルギーを加算した、1日の総消費カロリーです。" },
        { q: "健康的に体脂肪を落とすための適切な摂取カロリーは？", a: "TDEEから300〜500kcal程度を差し引いたアンダーカロリーが推奨されます。これにより筋肉量を維持しながら月1〜2kg程度の脂肪減少が目指せます。" },
        { q: "筋肉を増やす（バルクアップ）には何kcal上乗せすべきですか？", a: "TDEEに250〜400kcal程度を上乗せしたマイルドなオーバーカロリーとし、適切な筋力トレーニングと十分なタンパク質摂取を組み合わせることが理想的です。" },
        { q: "ダイエット中に体重の減少ペースが停滞するのはなぜですか？", a: "体重減少に伴い基礎代謝や運動消費が自然に下がる（適応性熱産生）ためです。体重の変化に合わせて定期的に必要摂取カロリーを再計算してください。" },
        { q: "運動強度の係数はどのように設定されていますか？", a: "座り仕事中心の1.2から、立ち仕事や日常的な激しい運動を行うアスリートレベルの1.9まで、5段階の活動レベル指数を用いて算出しています。" }
      ]
    }
  },

  'tip-calculator': {
    es: {
      name: "Calculadora de Propina",
      seoTitle: "Calculadora de Propina y División de Cuenta | HelloTools",
      seoDescription: "Calcula rápidamente la propina adecuada y divide la cuenta por persona.",
      description: "Calcula el monto de propina y divide el total entre el grupo fácilmente.",
      quickAnswer: "Permite calcular el porcentaje de propina e igualar la cuenta por comensal.",
      seoHowToUse: "1. Introduce la cuenta total.\n2. Selecciona el % de propina.\n3. Indica el número de personas.",
      seoHowItWorks: "Multiplica la cuenta por el porcentaje de propina y divide el total entre los comensales.",
      formula: "Total por Persona = (Cuenta + Propina) / Personas",
      seoExample: "Para una cuenta de $100 con 15% de propina entre 4 personas, cada una paga $28,75.",
      faqs: [
        { q: "¿Cómo se calcula la propina y la división de la cuenta entre comensales?", a: "Introduce el importe total de la factura, el porcentaje de propina elegido y el número de personas. La calculadora desglosa la propina total, el importe global y lo que debe pagar cada persona." },
        { q: "¿Cuál es el porcentaje de propina habitual en restaurantes?", a: "En EE.UU. el estándar habitual es del 15% al 20%. En la mayoría de los países europeos y latinoamericanos la propina es voluntaria y suele situarse entre el 5% y el 10% del total." },
        { q: "¿Se puede utilizar esta calculadora para taxis, peluquerías o repartidores?", a: "Sí. El cálculo porcentual de propina se aplica exactamente igual para servicios de entrega a domicilio, viajes en taxi o servicios de estética y peluquería." },
        { q: "¿Se debe calcular la propina sobre el total antes o después de impuestos?", a: "Tradicionalmente se recomienda calcular la propina sobre el subtotal antes de impuestos, aunque en muchos países es habitual aplicar el porcentaje directamente sobre el ticket final." },
        { q: "¿Almacena esta herramienta datos bancarios o información de consumo?", a: "No. Toda la operación se procesa de forma instantánea y anónima en tu propio navegador web, sin registrar importes ni conservar ningún dato." }
      ]
    },
    de: {
      name: "Trinkgeldrechner",
      seoTitle: "Trinkgeldrechner & Rechnung Teilen | HelloTools",
      seoDescription: "Berechnen Sie Trinkgeld und teilen Sie die Restaurantrechnung pro Person.",
      description: "Schneller Trinkgeldrechner für Restaurantbesuche und Gruppenrechnungen.",
      quickAnswer: "Berechnet den Trinkgeldbetrag und den Anteil pro Person.",
      seoHowToUse: "1. Rechnungsbetrag eingeben.\n2. Trinkgeld-Prozentsatz wählen.\n3. Personenanzahl angeben.",
      seoHowItWorks: "Addiert das Trinkgeld zur Rechnung und teilt durch die Personenanzahl.",
      formula: "Betrag pro Person = (Rechnung + Trinkgeld) / Personen",
      seoExample: "100 € Rechnung mit 15 % Trinkgeld auf 4 Personen aufgeteilt ergibt 28,75 € pro Person.",
      faqs: [
        { q: "Wie berechnet man das Trinkgeld und teilt die Restaurantrechnung?", a: "Geben Sie den Rechnungsbetrag, den gewünschten Trinkgeldprozentsatz und die Personenanzahl ein. Das Tool weist Trinkgeldsumme, Gesamtrechnung und den genauen Pro-Kopf-Betrag aus." },
        { q: "Wie viel Trinkgeld gibt man üblicherweise in der Gastronomie?", a: "In Deutschland und Österreich sind 5 % bis 10 % Trinkgeld bei gutem Service üblich. In den USA gelten 15 % bis 20 % als sozialer Standard." },
        { q: "Eignet sich der Rechner auch für Lieferdienste oder Taxifahrten?", a: "Ja, die Prozentlogik funktioniert universell für Essenslieferdienste, Taxifahrten, Friseure und handwerkliche Dienstleistungen." },
        { q: "Wird das Trinkgeld auf den Netto- oder Bruttobetrag berechnet?", a: "Im europäischen Alltag wird das Trinkgeld meist bequem auf den Brutto-Endbetrag der Rechnung aufgeschlagen oder auf den nächsten runden Eurobetrag aufgerundet." },
        { q: "Werden Zahlungsdaten oder Rechnungsbeträge gespeichert?", a: "Nein. Sämtliche Eingaben verbleiben lokal in Ihrem Browser und werden weder übertragen noch gespeichert." }
      ]
    },
    fr: {
      name: "Calculateur de Pourboire",
      seoTitle: "Calculateur de Pourboire et Partage d'Addition | HelloTools",
      seoDescription: "Calculez le pourboire et divisez l'addition par personne facilement.",
      description: "Outil pratique pour partager la note au restaurant.",
      quickAnswer: "Calcule le montant du pourboire et le montant dû par convive.",
      seoHowToUse: "1. Entrez le montant total de l'addition.\n2. Choisissez le % de pourboire.\n3. Indiquez le nombre de personnes.",
      seoHowItWorks: "Ajoute le pourboire au total et divise par le nombre de personnes.",
      formula: "Part = (Addition + Pourboire) / Convives",
      seoExample: "Une note de 100 € avec 15 % de pourboire divisée par 4 donne 28,75 € par personne.",
      faqs: [
        { q: "Comment calculer le pourboire et partager l'addition entre amis ?", a: "Indiquez le montant de la note, le pourcentage de pourboire et le nombre de convives. Vous obtiendrez le montant du pourboire, le total général et la part exacte par personne." },
        { q: "Quel est le montant habituel du pourboire au restaurant ?", a: "En France, le service est inclus dans l'addition par la loi, mais un pourboire de 5 % à 10 % est d'usage pour un service de qualité. En Amérique du Nord, 15 % à 20 % est la norme." },
        { q: "Peut-on l'utiliser pour les livreurs à domicile ou les taxis ?", a: "Oui. Vous pouvez calculer un pourboire adapté pour les livreurs de repas, chauffeurs VTC, coiffeurs ou guides touristiques." },
        { q: "Le pourboire doit-il être calculé hors taxes ou toutes taxes comprises ?", a: "La bonne pratique consiste à calculer le pourboire sur le sous-total hors taxes, même si l'arrondi s'effectue souvent sur le montant TTC final." },
        { q: "L'outil conserve-t-il les montants de mes additions ?", a: "Non. Aucun historique ni donnée de paiement n'est collecté ni enregistré sur nos serveurs." }
      ]
    },
    pt: {
      name: "Calculadora de Gorjeta",
      seoTitle: "Calculadora de Gorjeta e Divisão de Conta | HelloTools",
      seoDescription: "Calcule a gorjeta do restaurante e divida a conta por pessoa rapidamente.",
      description: "Facilite a divisão da conta e o cálculo da gorjeta entre amigos.",
      quickAnswer: "Calcula o valor da gorjeta e a parte correspondente a cada pessoa.",
      seoHowToUse: "1. Insira o valor total da conta.\n2. Escolha a porcentagem de gorjeta.\n3. Digite o número de pessoas.",
      seoHowItWorks: "Soma a gorjeta ao valor total e divide igualmente entre os participantes.",
      formula: "Valor por Pessoa = (Conta + Gorjeta) / Pessoas",
      seoExample: "Uma conta de R$ 100 com 15% de gorjeta dividida para 4 pessoas resulta em R$ 28,75 por pessoa.",
      faqs: [
        { q: "Como calcular a gorjeta e dividir a conta do bar ou restaurante?", a: "Insira o valor total da comanda, a porcentagem de serviço desejada e o número de pessoas na mesa. O sistema indica o total da gorjeta, o valor global e o rateio por pessoa." },
        { q: "Qual o percentual padrão de gorjeta cobrado no Brasil e no exterior?", a: "No Brasil, a taxa de serviço sugerida na conta costuma ser de 10% a 13%. Nos Estados Unidos, a gorjeta padrão varia entre 15% e 20% sobre o consumo." },
        { q: "A calculadora serve para entregadores de aplicativo e motoristas?", a: "Sim. A mesma proporção matemática se aplica para calcular gorjetas voluntárias em corridas de aplicativo, delivery de comida e serviços pessoais." },
        { q: "A taxa de serviço incide sobre o valor antes ou depois dos impostos?", a: "O cálculo padrão de serviço é aplicado sobre o subtotal do consumo, embora a maioria dos estabelecimentos aplique os 10% sobre a fatura consolidada." },
        { q: "Os valores digitados são gravados ou compartilhados?", a: "Não. Todos os cálculos ocorrem em tempo real e de maneira estritamente confidencial no seu próprio dispositivo." }
      ]
    },
    ja: {
      name: "チップ計算ツール",
      seoTitle: "チップ計算＆会計割り勘ツール | HelloTools",
      seoDescription: "海外旅行でのチップ額の計算や、大人数での会計割り勘（割り勘計算）を正確に行います。",
      description: "お会計金額、チップ率、人数を入力して1人あたりの支払額を計算します。",
      quickAnswer: "チップ額およびグループでの1人あたりのお会計支払額を算出します。",
      seoHowToUse: "1. お会計の合計金額を入力します。\n2. チップ率（%）を選択します。\n3. 人数を入力します。",
      seoHowItWorks: "合計額にチップ額を加え、人数で等分します。",
      formula: "1人あたりの支払額 = (会計額 + チップ額) / 人数",
      seoExample: "100ドルの会計でチップ15%の場合、合計115ドルとなり、4人で割ると1人28.75ドルです。",
      faqs: [
        { q: "チップの計算と割り勘金額の算出はどのように行いますか？", a: "合計請求額、チップの割合（パーセント）、参加人数を入力します。チップ総額、支払総額、1人あたりの正確な負担額が即時に表示されます。" },
        { q: "海外旅行でのチップの相場は何パーセントですか？", a: "アメリカやカナダの飲食店では15〜20%が一般的です。タクシーでは10〜15%、ホテルのサービスでは1〜2ドル相当を渡すのが標準的なマナーです。" },
        { q: "フードデリバリーや配車サービスのチップ計算にも使えますか？", a: "はい。Uberや出前アプリ、ホテル、サロンなど、パーセンテージに応じたチップ計算が必要なあらゆる場面でご活用いただけます。" },
        { q: "チップは税引前と税込のどちらの金額に対して計算しますか？", a: "本来のマナーとしては税引前（Subtotal）に対して計算しますが、簡便のため税込合計から計算されることも多く見られます。" },
        { q: "入力した金額や支払データはサーバーに保存されますか？", a: "いいえ。すべての計算はお使いのブラウザ内部でのみ完結し、外部サーバーへの通信やデータ記録は一切行われません。" }
      ]
    }
  },

  'mortgage-calculator': {
    es: {
      name: "Calculadora de Hipoteca",
      seoTitle: "Calculadora de Hipoteca | HelloTools",
      seoDescription: "Calcula las cuotas mensuales de tu hipoteca, costo total e intereses.",
      description: "Estima la cuota mensual de tu préstamo hipotecario para la compra de vivienda.",
      quickAnswer: "Calcula el pago periódico mensual para amortizar una hipoteca inmobiliaria.",
      seoHowToUse: "1. Ingrese el precio de la vivienda y entrada inicial.\n2. Indique tasa de interés y plazo.",
      seoHowItWorks: "Aplica el sistema de amortización de préstamos hipotecarios a tasa fija.",
      formula: "Cuota = Principal * r * (1+r)^n / [(1+r)^n - 1]",
      seoExample: "Para una hipoteca de $200.000 al 4% a 30 años, la cuota es $954,83/mes.",
      faqs: [
        { q: "¿Incluye esta calculadora de hipotecas impuestos y seguros (PITI)?", a: "Sí. Puedes añadir estimaciones de impuestos sobre bienes inmuebles y seguro de hogar para visualizar tu cuota mensual completa (capital, interés, impuestos y seguros)." },
        { q: "¿Qué es el seguro hipotecario privado (PMI) y cuándo es obligatorio?", a: "El PMI es un seguro que exigen los bancos cuando la entrada aportada es inferior al 20% del valor de tasación de la vivienda. Se elimina habitualmente cuando la deuda se reduce por debajo del 80% del valor del inmueble." },
        { q: "¿Cómo afecta una mayor entrada al pago mensual de mi hipoteca?", a: "Una entrada más alta reduce directamente el importe del préstamo a financiar, disminuyendo tanto la cuota mensual como los intereses acumulados y eliminando el coste del seguro hipotecario." },
        { q: "¿Qué es mejor: una hipoteca a 15 años o a 30 años?", a: "La hipoteca a 15 años ofrece tipos de interés menores y ahorra una gran cantidad de intereses totales, pero exige cuotas mensuales más elevadas. La opción a 30 años brinda mayor desahogo presupuestario mensual." },
        { q: "¿Puede una subrogación o refinanciación abaratar mi cuota hipotecaria?", a: "Sí, conseguir un tipo de interés más bajo o ampliar el plazo reduce la mensualidad. Sin embargo, debes calcular los costes de notaría y cancelación para determinar el plazo de amortización del gasto." }
      ]
    },
    de: {
      name: "Hypothekenrechner",
      seoTitle: "Hypothekenrechner — Baufinanzierung Berechnen | HelloTools",
      seoDescription: "Berechnen Sie Ihre monatliche Baufinanzierungsrate und Zinskosten.",
      description: "Ermitteln Sie die Monatsrate für Ihre Immobilienfinanzierung.",
      quickAnswer: "Berechnet die monatliche Immobilienrate bei fester Verzinsung.",
      seoHowToUse: "1. Kaufpreis und Eigenkapital eingeben.\n2. Zinssatz und Tilgung festlegen.",
      seoHowItWorks: "Berechnung basierend auf Annuitätendarlehen.",
      formula: "Rate = K * i * (1+i)^n / [(1+i)^n - 1]",
      seoExample: "200.000 € Darlehen zu 4 % über 30 Jahre ergibt 954,83 € Monatsrate.",
      faqs: [
        { q: "Enthält dieser Baufinanzierungsrechner Grundsteuer und Gebäudeversicherung?", a: "Ja, Sie können geschätzte laufende Nebenkosten wie Grundsteuer und Wohngebäudeversicherung erfassen, um die tatsächliche monatliche Warmbelastung transparent zu planen." },
        { q: "Was bedeutet Eigenkapitalquote und warum sind 20 % empfehlenswert?", a: "Eine Eigenkapitalquote von mindestens 20 % deckt die Kaufnebenkosten (Notar, Grunderwerbsteuer, Makler) ab und sichert bei den Banken deutlich günstigere Zinskonditionen." },
        { q: "Wie wirkt sich eine höhere Anfangstilgung auf das Darlehen aus?", a: "Eine höhere Tilgungsrate (z. B. 3 % statt 1 %) verkürzt die Entschuldungsdauer drastisch und spart Zehntausende Euro an Zinskosten über die Gesamtlaufzeit." },
        { q: "Sollte man sich für 10, 15 oder 20 Jahre Zinsbindung entscheiden?", a: "In Niedrigzinsphasen bietet eine Zinsbindung von 15 bis 20 Jahren langfristige Planungssicherheit. Bei hohen Zinsen bieten kürzere Zinsbindungen die Chance auf spätere Anschlussfinanzierungen zu besseren Konditionen." },
        { q: "Kann eine Umschuldung (Prolongation) die monatliche Belastung senken?", a: "Ja. Wenn das Zinsniveau zum Ende der Zinsbindung niedriger ist oder Sie das Darlehen bei einer anderen Bank zu besseren Zinsen umschulden, sinkt Ihre Monatsrate." }
      ]
    },
    fr: {
      name: "Calculateur Hypothécaire",
      seoTitle: "Calculateur d'Emprunt Immobilier et Hypothèque | HelloTools",
      seoDescription: "Calculez la mensualité de votre prêt immobilier et le coût total.",
      description: "Estimez vos mensualités pour votre projet d'achat immobilier.",
      quickAnswer: "Calcule l'échéance mensuelle d'un crédit immobilier.",
      seoHowToUse: "1. Entrez le prix du bien et votre apport.\n2. Indiquez le taux et la durée.",
      seoHowItWorks: "Formule des prêts amortissables à taux fixe.",
      formula: "Mensualité = P * r * (1+r)^n / [(1+r)^n - 1]",
      seoExample: "Pour un emprunt de 200 000 € à 4 % sur 30 ans, la mensualité est de 954,83 €.",
      faqs: [
        { q: "Ce calculateur de prêt immobilier intègre-t-il l'assurance emprunteur et les taxes ?", a: "Oui. Vous pouvez ajouter le coût estimé de l'assurance décès-invalidité et des taxes foncières pour connaître la charge mensuelle totale de votre projet immobilier." },
        { q: "Quel est l'apport personnel minimum recommandé pour un achat immobilier ?", a: "Les banques exigent généralement au moins 10 % d'apport pour couvrir les frais de notaire et de garantie. Un apport de 20 % permet d'obtenir les barèmes de taux les plus avantageux." },
        { q: "Comment un apport plus important modifie-t-il les mensualités ?", a: "Un apport plus élevé diminue le montant emprunté, ce qui abaisse mécaniquement la mensualité ainsi que le coût total de l'assurance emprunteur." },
        { q: "Vaut-il mieux emprunter sur 15 ans, 20 ans ou 25 ans ?", a: "Un emprunt sur 15 ou 20 ans limite considérablement le coût des intérêts, tandis qu'un emprunt sur 25 ans réduit la mensualité pour respecter le taux d'endettement maximal de 35 %." },
        { q: "Le rachat de crédit ou la renégociation permet-il de baisser la mensualité ?", a: "Oui. Renégocier un taux plus bas avec votre banque ou faire racheter le prêt par un concurrent réduit les mensualités ou raccourcit la durée restante, sous réserve de rentabiliser les pénalités de remboursement anticipé." }
      ]
    },
    pt: {
      name: "Calculadora de Hipoteca",
      seoTitle: "Calculadora de Financiamento Imobiliário | HelloTools",
      seoDescription: "Calcule o valor das parcelas do seu financiamento imobiliário.",
      description: "Simule as parcelas mensais e o custo total da compra da casa própria.",
      quickAnswer: "Estima as prestações periódicas de um empréstimo imobiliário.",
      seoHowToUse: "1. Digite o valor do imóvel e a entrada.\n2. Informe a taxa de juros e o prazo.",
      seoHowItWorks: "Calcula o parcelamento com base em parcelas fixas ou amortização.",
      formula: "Parcela = P * i * (1+i)^n / [(1+i)^n - 1]",
      seoExample: "Um financiamento de R$ 200.000 a 4% ao ano por 30 anos gera parcelas de R$ 954,83.",
      faqs: [
        { q: "Esta calculadora de financiamento imobiliário inclui seguros e impostos?", a: "Sim. É possível incluir estimativas de seguro DFI/MIP e IPTU para simular o custo total da prestação mensal no Sistema Financeiro de Habitação." },
        { q: "Qual percentual mínimo de entrada é exigido pelas instituições financeiras?", a: "A maioria dos bancos financia no máximo 80% do valor do imóvel, exigindo ao menos 20% de entrada com recursos próprios ou saldo do FGTS." },
        { q: "Como o valor da entrada impacta no custo do financiamento?", a: "Quanto maior a entrada, menor o saldo devedor financiado, o que resulta em parcelas mais baixas e menor cobrança de juros e prêmios de seguro habitacional." },
        { q: "Qual a diferença entre amortização pela Tabela SAC e Tabela Price?", a: "No sistema SAC as parcelas são decrescentes e amortizam a dívida mais rápido. Na Tabela Price as parcelas são constantes ao longo do tempo." },
        { q: "A portabilidade de crédito imobiliário pode reduzir a parcela?", a: "Sim. A portabilidade para uma instituição que ofereça taxa de juros menor reduz imediatamente o valor das parcelas sem custo de tarifas de transferência." }
      ]
    },
    ja: {
      name: "住宅ローン計算ツール",
      seoTitle: "住宅ローン計算シミュレーター | HelloTools",
      seoDescription: "物件価格、頭金、金利、返済期間から毎月の住宅ローン返済額を試算します。",
      description: "マイホーム購入のための住宅ローン毎月返済額と総支払額をシミュレーションします。",
      quickAnswer: "住宅購入時の借入金に対する毎月の返済額を算出します。",
      seoHowToUse: "1. 物件価格と頭金を入力します。\n2. 借入金利（%）と返済期間（年）を設定します。",
      seoHowItWorks: "元利均等返済方式で毎月の支払額を計算します。",
      formula: "毎月返済額 = P * r * (1+r)^n / [(1+r)^n - 1]",
      seoExample: "2000万円を金利4%、30年返済で借りた場合、毎月の返済額は95,483円です。",
      faqs: [
        { q: "この住宅ローン計算ツールは火災保険や固定資産税の概算も含められますか？", a: "はい。元利均等返済額に加えて、概算の固定資産税や団体信用生命保険料・火災保険料を合算して月々の総住居費をシミュレーションできます。" },
        { q: "頭金は購入価格の何パーセント用意するのが理想的ですか？", a: "物件価格の10〜20%以上の頭金を用意するのが一般的です。自己資金比率を高めることで借入金利が優遇され、毎月の返済負担を大きく軽減できます。" },
        { q: "頭金を多く入れると月々の返済はどう変わりますか？", a: "借入元金そのものが減るため、月々の返済額が下がるだけでなく、借入期間全体で支払う総利息額を大幅に削減できます。" },
        { q: "住宅ローンの返済期間は35年と20年のどちらが良いですか？", a: "35年返済は月々の返済額が低く家計の安全マージンが確保できますが、総返済額は増えます。20年返済は総利息を大幅に抑えられますが、毎月の返済負担が重くなります。" },
        { q: "住宅ローンの借り換えで毎月の返済額を削減できますか？", a: "はい。現在の適用金利より0.5〜1.0%以上低い金利に借り換える場合、諸費用（登記費用や融資事務手数料）を差し引いても返済額を削減できる可能性が高いです。" }
      ]
    }
  },

  'unit-converter': {
    es: {
      name: "Conversor de Unidades",
      seoTitle: "Conversor de Unidades Universal | HelloTools",
      seoDescription: "Convierte longitud, peso, temperatura, área y volumen al instante.",
      description: "Convierte fácilmente entre unidades métricas e imperiales de forma precisa.",
      quickAnswer: "Permite transformar magnitudes de una unidad de medida a otra.",
      seoHowToUse: "1. Selecciona la categoría de unidad.\n2. Ingrese el valor y elige las unidades.",
      seoHowItWorks: "Utiliza factores de conversión internacionales estandarizados.",
      formula: "Valor Convertido = Valor Original * Factor",
      seoExample: "1 pulgada equivale a 2,54 centímetros.",
      faqs: [
        { q: "¿Qué magnitudes físicas y unidades puede convertir esta herramienta?", a: "Convierte longitud, masa/peso, temperatura, volumen, superficie, velocidad, tiempo, presión, energía y almacenamiento digital de datos entre el sistema métrico internacional e imperial." },
        { q: "¿Cómo se convierten grados Celsius a Fahrenheit y Kelvin?", a: "Para Fahrenheit: °F = (°C × 9/5) + 32. Para Kelvin: K = °C + 273,15. El calculador realiza la transformación bidireccional instantánea." },
        { q: "¿Cuál es la relación exacta entre millas y kilómetros o libras y kilogramos?", a: "1 milla terrestre equivale exactamente a 1,609344 kilómetros, y 1 libra internacional (lb) equivale exactamente a 0,45359237 kilogramos." },
        { q: "¿Qué precisión decimal mantienen las conversiones de ingeniería?", a: "Aplica factores de conversión oficiales según el Instituto Nacional de Estándares y Tecnología (NIST) con hasta 8 cifras decimales de precisión." },
        { q: "¿Funciona este conversor sin conexión a internet?", a: "Sí. Toda la tabla de coeficientes matemáticos se procesa localmente en JavaScript en tu navegador web." }
      ]
    },
    de: {
      name: "Einheitenumrechner",
      seoTitle: "Einheitenumrechner — Länge, Gewicht, Temperatur | HelloTools",
      seoDescription: "Rechnen Sie Maßeinheiten für Länge, Gewicht, Temperatur und Fläche um.",
      description: "Universeller Umrechner für das metrische und imperiale System.",
      quickAnswer: "Wandelt Messwerte von einer Einheit in eine andere um.",
      seoHowToUse: "1. Kategorie wählen.\n2. Wert eingeben und Einheiten festlegen.",
      seoHowItWorks: "Verwendet exakte internationale Umrechnungsfaktoren.",
      formula: "Zielwert = Ausgangswert * Faktor",
      seoExample: "1 Zoll entspricht 2,54 Zentimetern.",
      faqs: [
        { q: "Welche physikalischen Einheiten kann dieser Einheitenumrechner konvertieren?", a: "Er rechnet Länge, Gewicht/Masse, Temperatur, Volumen, Fläche, Geschwindigkeit, Druck, Energie und digitale Datenmengen zwischen metrischem und angloamerikanischem System um." },
        { q: "Wie rechnet man Grad Celsius in Fahrenheit und Kelvin um?", a: "Formel für Fahrenheit: °F = (°C × 1,8) + 32. Formel für Kelvin: K = °C + 273,15. Der Rechner transformiert Werte verzögerungsfrei in beide Richtungen." },
        { q: "Wie lauten die exakten Umrechnungsfaktoren für Meilen und Pfund?", a: "1 Meile entspricht exakt 1,609344 Kilometern. 1 Pfund (lb) entspricht per Definition exakt 0,45359237 Kilogramm." },
        { q: "Welche Normen liegen den Umrechnungsfaktoren zugrunde?", a: "Die Faktoren basieren auf den internationalen SI-Einheiten und den amtlichen Tabellen der Physikalisch-Technischen Bundesanstalt (PTB) und des NIST." },
        { q: "Funktioniert der Einheitenrechner auch offline im Browser?", a: "Ja, alle mathematischen Faktoren sind im Client-Code hinterlegt und laufen ohne Netzwerkaufrufe." }
      ]
    },
    fr: {
      name: "Convertisseur d'Unités",
      seoTitle: "Convertisseur d'Unités Universal | HelloTools",
      seoDescription: "Convertissez longueur, masse, température, surface et volume facilement.",
      description: "Convertissez rapidement entre le système métrique et impérial.",
      quickAnswer: "Permet de convertir des valeurs entre différentes unités de mesure.",
      seoHowToUse: "1. Sélectionnez la catégorie.\n2. Saisissez la valeur et choisissez les unités.",
      seoHowItWorks: "Applique des facteurs de conversion normalisés.",
      formula: "Valeur Convertie = Valeur de Départ * Facteur",
      seoExample: "1 pouce équivaut à 2,54 centimètres.",
      faqs: [
        { q: "Quelles grandeurs physiques ce convertisseur d'unités prend-il en charge ?", a: "Il convertit la longueur, la masse, la température, le volume, la superficie, la vitesse, la pression, l'énergie et les unités de stockage informatique entre systèmes métrique et impérial." },
        { q: "Comment convertir des degrés Celsius en Fahrenheit et en Kelvin ?", a: "La formule est : °F = (°C × 9/5) + 32, et K = °C + 273,15. L'outil effectue la conversion dynamique en temps réel." },
        { q: "Quels sont les rapports de conversion exacts pour les miles et les livres ?", a: "1 mile international équivaut rigoureusement à 1,609344 km et 1 livre (lb) correspond à 0,45359237 kg." },
        { q: "Quelle est la précision scientifique des facteurs de conversion ?", a: "Les coefficients sont conformes aux définitions métrologiques du Bureau International des Poids et Mesures (BIPM)." },
        { q: "L'outil est-il disponible hors connexion ?", a: "Oui, le module de calcul s'exécute localement dans le navigateur sans nécessiter de serveur distant." }
      ]
    },
    pt: {
      name: "Conversor de Unidades",
      seoTitle: "Conversor de Unidades Online | HelloTools",
      seoDescription: "Converta comprimento, peso, temperatura, área e volume em segundos.",
      description: "Conversão rápida entre o sistema métrico e o sistema imperial.",
      quickAnswer: "Transforma medidas de uma unidade para outra com precisão.",
      seoHowToUse: "1. Escolha a categoria de medida.\n2. Digite o valor e selecione as unidades.",
      seoHowItWorks: "Utiliza fatores de conversão internacionais padrão.",
      formula: "Valor Convertido = Valor * Fator",
      seoExample: "1 polegada equivale a 2,54 centímetros.",
      faqs: [
        { q: "Quais grandezas e sistemas de medidas esta ferramenta converte?", a: "Converte comprimento, massa/peso, temperatura, volume, área, velocidade, pressão, energia e armazenamento de dados entre o Sistema Internacional (SI) e o sistema imperial." },
        { q: "Como converter graus Celsius para Fahrenheit e Kelvin?", a: "Para Fahrenheit: °F = (°C × 1,8) + 32. Para Kelvin: K = °C + 273,15. O conversor realiza o cálculo bidirecional imediato." },
        { q: "Qual a equivalência exata entre milhas e quilômetros, ou libras e quilos?", a: "1 milha equivale exatamente a 1,609344 km, enquanto 1 libra comercial (lb) equivale a 0,45359237 kg." },
        { q: "Qual o grau de precisão decimal utilizado nas fórmulas?", a: "Utiliza os fatores de conversão estabelecidos pelo Inmetro e NIST com até 8 casas decimais de precisão." },
        { q: "O conversor depende de internet para funcionar?", a: "Não. Todas as conversões físicas rodam de forma autônoma em JavaScript no navegador do usuário." }
      ]
    },
    ja: {
      name: "単位換算ツール",
      seoTitle: "単位換算ツール — 長さ・重さ・温度・面積 | HelloTools",
      seoDescription: "長さ、重量、温度、面積、体積などの単位を即座に相互換算します。",
      description: "メートル法とヤード・ポンド法（インチ、ポンド等）を簡単かつ正確に相互変換します。",
      quickAnswer: "異なる単位間の度量衡を計算・変換するツールです。",
      seoHowToUse: "1. 換算したい測定カテゴリを選択します。\n2. 数値を入力し、変換前後の単位を指定します。",
      seoHowItWorks: "国際標準の単位換算係数に基づいて算定します。",
      formula: "変換後数値 = 変換前数値 * 換算係数",
      seoExample: "1インチは 2.54センチメートルです。",
      faqs: [
        { q: "この単位換算ツールで変換できる物理単位の種類は？", a: "長さ、重さ・質量、温度、体積・容積、面積、速度、圧力、エネルギー、デジタルデータ容量（バイト換算）の主要単位系に対応しています。" },
        { q: "摂氏（℃）から華氏（℉）およびケルビン（K）への換算式は？", a: "華氏への換算は「°F ＝ (°C × 1.8) ＋ 32」、絶対温度ケルビンへの換算は「K ＝ °C ＋ 273.15」で計算されます。" },
        { q: "マイルからキロメートル、ポンドからキログラムの換算レートは？", a: "国際基準により、1マイルは正確に1.609344キロメートル、1ポンド（lb）は正確に0.45359237キログラムと定義されています。" },
        { q: "坪・畳や尺貫法など日本の伝統単位にも対応していますか？", a: "面積における坪（約3.3㎡）や畳換算など、日本の不動産・建築で使われる単位の比較にも対応しています。" },
        { q: "計算処理は安全・高速に行われますか？", a: "国際度量衡局（BIPM）の換算定数に基づき、ブラウザローカルでミリ秒単位の高速・正確な演算を行います。" }
      ]
    }
  },

  'discount-calculator': {
    es: {
      name: "Calculadora de Descuentos",
      seoTitle: "Calculadora de Descuentos y Rebajas | HelloTools",
      seoDescription: "Calcula el precio final con descuento, el ahorro total y el importe antes y después de rebajas.",
      description: "Calcula cuánto ahorras y el precio final de cualquier producto con descuento.",
      quickAnswer: "Permite calcular el precio final reducido restando el porcentaje de descuento al precio original.",
      seoHowToUse: "1. Introduce el precio original del producto.\n2. Indica el porcentaje de descuento.\n3. Revisa el precio final rebajado y el dinero ahorrado.",
      seoHowItWorks: "Resta el porcentaje de descuento del precio base: Precio Final = Precio Original * (1 - Descuento/100).",
      formula: "Precio Final = Precio Original * (1 - % Descuento / 100)",
      seoExample: "Un producto de $100 con un 20% de descuento cuesta $80, ahorrando $20.",
      faqs: [
        { q: "¿Cómo se calcula el precio final tras aplicar un descuento?", a: "El precio con descuento es igual al Precio Original × (1 - Porcentaje / 100). Por ejemplo, un artículo de 80 € con 25% de descuento cuesta 80 × 0,75 = 60 €." },
        { q: "¿Esta calculadora admite descuentos acumulativos o encadenados?", a: "Calcula un porcentaje de descuento a la vez. En ofertas encadenadas (ej. 20% más 10% adicional), calcula primero el primer descuento y aplica el segundo sobre ese importe intermedio." },
        { q: "¿Puedo ingresar rebajas en importe fijo además de porcentajes?", a: "Sí. Puedes introducir un descuento en cantidad monetaria fija para conocer el porcentaje que representa o verificar el precio neto resultante." },
        { q: "¿El precio final con descuento incluye impuestos (IVA)?", a: "Muestra el precio neto de descuento. El IVA o impuesto a las ventas se aplica sobre el precio rebajado según la legislación fiscal de cada región." },
        { q: "¿Qué precisión tiene este calculador de descuentos?", a: "El cálculo matemático es exacto con redondeo comercial automático a dos cifras decimales (céntimos)." }
      ]
    },
    de: {
      name: "Rabattrechner",
      seoTitle: "Rabattrechner — Endpreis & Ersparnis Berechnen | HelloTools",
      seoDescription: "Berechnen Sie den reduzierten Endpreis und Ihre Ersparnis bei Rabatten und Sonderangeboten.",
      description: "Ermitteln Sie schnell den Endpreis und Ihren Preisvorteil bei Rabattaktionen.",
      quickAnswer: "Der Rabattrechner zieht den Prozentsatz vom ursprünglichen Preis ab und zeigt den Sparbetrag.",
      seoHowToUse: "1. Geben Sie den ursprünglichen Preis ein.\n2. Tragen Sie den Rabatt in Prozent ein.\n3. Lesen Sie den Endpreis ab.",
      seoHowItWorks: "Berechnet den Abzug: Endpreis = Ursprungspreis * (1 - Rabatt/100).",
      formula: "Endpreis = Ursprungspreis * (1 - Rabatt% / 100)",
      seoExample: "Bei 100 € Ursprungspreis und 20 % Rabatt beträgt der Endpreis 80 € (Ersparnis 20 €).",
      faqs: [
        { q: "Wie berechnet man den Endpreis nach Abzug eines Rabatts?", a: "Der rabattierte Preis errechnet sich durch: Endpreis = Ursprungspreis × (1 - Rabatt% / 100). Ein Artikel für 100 € mit 20 % Rabatt kostet somit 80 €." },
        { q: "Werden gestaffelte oder mehrfache Rabatte unterstützt?", a: "Der Rechner ermittelt einzelne Rabattstufen. Für mehrfache Rabatte (z. B. 20 % + 10 % Extra) muss der zweite Rabatt auf den bereits reduzierten Zwischenpreis angewendet werden." },
        { q: "Kann ich feste Geldbeträge anstelle von Prozentsätzen eingeben?", a: "Ja, Sie können sowohl den Nachlass in Euro als auch in Prozent eintragen und die Ersparnis unmittelbar vergleichen." },
        { q: "Ist die Mehrwertsteuer im rabattierten Betrag enthalten?", a: "Der Rechner wendet den Rabatt direkt auf den eingegebenen Brutto- oder Nettobetrag an. Im Einzelhandel bezieht sich der Rabatt stets auf den Endverbraucherpreis inklusive MwSt." },
        { q: "Wie genau arbeitet die Rabattberechnung?", a: "Die Berechnung erfolgt mathematisch exakt mit kaufmännischer Rundung auf zwei Nachkommastellen (Cent-Genauigkeit)." }
      ]
    },
    fr: {
      name: "Calculateur de Solde et Réduction",
      seoTitle: "Calculateur de Solde et Réduction | HelloTools",
      seoDescription: "Calculez le prix soldé et l'économie réalisée lors de vos achats.",
      description: "Déterminez facilement le prix final après remise et le montant de l'économie.",
      quickAnswer: "Calcule le montant de la remise et le prix net à payer après réduction.",
      seoHowToUse: "1. Entrez le prix initial.\n2. Indiquez le pourcentage de remise.\n3. Obtenez le prix final soldé.",
      seoHowItWorks: "Soustrait le pourcentage du prix initial.",
      formula: "Prix Final = Prix Initial * (1 - % Remise / 100)",
      seoExample: "Un article à 100 € avec 20 % de remise coûte 80 € (économie de 20 €).",
      faqs: [
        { q: "Comment calculer le prix après réduction ou solde ?", a: "Le prix final est obtenu par la formule : Prix Soldé = Prix d'Origine × (1 - Remise% / 100). Par exemple, un vêtement à 80 € soldé à -25 % revient à 60 €." },
        { q: "Gère-t-il les remises cumulatives ou remises en cascade ?", a: "Il traite une remise unitaire. Pour des remises successives (ex. -30 % puis -10 % supplémentaires), appliquez la seconde remise sur le prix déjà soldé." },
        { q: "Puis-je calculer une réduction en montant fixe en euros ?", a: "Oui. Vous pouvez saisir une déduction forfaitaire pour connaître le montant économisé et le pourcentage effectif correspondant." },
        { q: "La TVA est-elle comprise dans le prix affiché ?", a: "Le calcul s'applique directement sur le montant saisi. Pour les particuliers, les prix soldés s'entendent toutes taxes comprises (TTC)." },
        { q: "Quelle est la précision des calculs de remise ?", a: "Le résultat est rigoureux et conforme aux règles d'arrondi bancaire et commercial à deux décimales." }
      ]
    },
    pt: {
      name: "Calculadora de Desconto",
      seoTitle: "Calculadora de Desconto e Preço Final | HelloTools",
      seoDescription: "Calcule o preço final com desconto e veja quanto você economiza em suas compras.",
      description: "Descubra o valor economizado e o preço final após aplicar a porcentagem de desconto.",
      quickAnswer: "Subtrai o percentual de desconto do preço original para mostrar o valor final a pagar.",
      seoHowToUse: "1. Digite o preço original do produto.\n2. Insira a porcentagem de desconto.\n3. Veja o preço final e a economia.",
      seoHowItWorks: "Calcula o desconto direto sobre o valor do produto.",
      formula: "Preço Final = Preço Original * (1 - % Desconto / 100)",
      seoExample: "Um produto de R$ 100 com 20% de desconto sai por R$ 80, economizando R$ 20.",
      faqs: [
        { q: "Como calcular o preço com desconto de uma mercadoria?", a: "O valor final é obtido multiplicando o Preço Original por (1 - Desconto% / 100). Um produto de R$ 200 com 15% de desconto passa a custar R$ 170." },
        { q: "A calculadora aceita descontos sucessivos ou cumulativos?", a: "Calcula um percentual por operação. Para descontos cumulativos (ex.: 20% + 5% no Pix), aplique o segundo percentual sobre o subtotal já reduzido." },
        { q: "Posso calcular descontos expressos em valor fixo (R$)?", a: "Sim. Você pode inserir a quantia exata do abatimento financeiro para descobrir qual o percentual proporcional economizado." },
        { q: "O valor calculado já considera os tributos embutidos?", a: "O desconto incide diretamente sobre o valor informado. No varejo brasileiro, os preços ao consumidor já incluem os tributos (ICMS/PIS/Cofins)." },
        { q: "A ferramenta realiza o cálculo com precisão centesimal?", a: "Sim, a ferramenta aplica arredondamento contábil padrão de duas casas decimais, garantindo exatidão no fechamento da conta." }
      ]
    },
    ja: {
      name: "割引計算ツール",
      seoTitle: "割引計算ツール — 〇〇%引き・割引き価格 | HelloTools",
      seoDescription: "元の価格と割引率（%引き・〇割引き）を入力して、割引後の価格と節約額を計算します。",
      description: "ショッピングやセールの割引価格と割引額を瞬時に計算します。",
      quickAnswer: "元の価格から指定された割引率を引いた最終価格を算出します。",
      seoHowToUse: "1. 元の価格を入力します。\n2. 割引率（%引き）を指定します。\n3. 割引後の支払価格を確認します。",
      seoHowItWorks: "元の金額に (1 - 割引率) を掛けて算出します。",
      formula: "割引後価格 = 元の価格 * (1 - 割引率 / 100)",
      seoExample: "10,000円の20%引きは 8,000円（2,000円お得）になります。",
      faqs: [
        { q: "割引後の支払価格はどのように計算されますか？", a: "定価 × (1 - 割引率 / 100) で求められます。例えば定価8,000円の商品に25%割引を適用すると、8,000 × 0.75 ＝ 6,000円となります。" },
        { q: "タイムセールなどの二重割引（重ね履き）にも対応していますか？", a: "1段階ごとの割引率を正確に算出します。「20%OFFからさらに10%OFF」のような重ね引きの場合は、一度20%OFFを計算した金額に対して次の10%OFFを適用します。" },
        { q: "割引率（%）だけでなく値引き額（円）からの計算も可能ですか？", a: "はい。金額による値引き額の入力にも対応しており、何パーセントの割引に相当するかを瞬時に逆算できます。" },
        { q: "消費税は割引後の価格に含まれますか？", a: "入力された金額ベースで減額計算を行います。税抜価格を入力した場合は割引後に消費税を加算、税込価格を入力した場合はそのまま税込の支払額となります。" },
        { q: "計算結果の端数処理はどうなりますか？", a: "日本の商習慣に則り、1円未満の端数切り捨てまたは四捨五入に対応した正確な整数値で金額を表示します。" }
      ]
    }
  },

  'simple-interest-calculator': {
    es: {
      name: "Calculadora de Interés Simple",
      seoTitle: "Calculadora de Interés Simple | HelloTools",
      seoDescription: "Calcula los intereses devengados y el saldo final de un capital sin interés compuesto.",
      description: "Calcula los intereses lineales generados sobre un capital inicial.",
      quickAnswer: "El interés simple se calcula únicamente sobre el capital original prestado o invertido.",
      seoHowToUse: "1. Introduce el capital inicial.\n2. Indica la tasa de interés anual (%).\n3. Selecciona el plazo en años o meses.",
      seoHowItWorks: "Multiplica el capital por la tasa de interés y por el tiempo.",
      formula: "Interés = Capital * Tasa * Tiempo",
      seoExample: "Un capital de $1.000 al 5% anual durante 3 años genera $150 de interés.",
      faqs: [
        { q: "¿Dónde se utiliza habitualmente el interés simple?", a: "El interés simple se utiliza comúnmente en préstamos personales a corto plazo, pagarés, descuentos comerciales y ciertos bonos gubernamentales donde los intereses no se capitalizan." },
        { q: "¿En qué se diferencia el interés simple del interés compuesto?", a: "El interés simple se calcula únicamente sobre el capital original prestado (I = P × r × t), mientras que el interés compuesto genera intereses sobre el capital más los intereses previamente acumulados." },
        { q: "¿Cómo calculo el interés simple para periodos en meses o días?", a: "Debes expresar el tiempo en años dividiendo los meses entre 12 o los días entre 365. Luego aplica la fórmula I = P × r × t con la tasa anual en decimales." },
        { q: "¿El interés simple favorece más al prestatario o al prestamista?", a: "Favorece al prestatario porque el total de intereses pagados a lo largo del tiempo es sustancialmente menor que bajo un régimen de capitalización compuesta." },
        { q: "¿Cuál es la fórmula matemática del interés simple?", a: "La fórmula es Interés (I) = P × r × t, donde P es el capital inicial, r es la tasa anual en tanto por uno, y t es el tiempo transcurrido en años." }
      ]
    },
    de: {
      name: "Einfacher Zinsrechner",
      seoTitle: "Einfacher Zinsrechner — Zinsen ohne Zinseszins | HelloTools",
      seoDescription: "Berechnen Sie Zinsertrag und Endkapital bei linearer Verzinsung.",
      description: "Ermitteln Sie die Zinsen auf das ursprüngliche Startkapital.",
      quickAnswer: "Der einfache Zins berechnet Zinsen ausschließlich auf das Anfangskapital.",
      seoHowToUse: "1. Startkapital eingeben.\n2. Zinssatz angeben.\n3. Laufzeit wählen.",
      seoHowItWorks: "Multipliziert Kapital, Zinssatz und Laufzeit.",
      formula: "Zinsen = Kapital * Zinssatz * Zeit",
      seoExample: "1.000 € zu 5 % über 3 Jahre ergeben 150 € Zinsen.",
      faqs: [
        { q: "Wo wird die einfache Zinsrechnung heute noch angewendet?", a: "Einfache Zinsen werden vor allem bei kurzfristigen Überbrückungskrediten, Geldmarktanlagen, Festgeldern ohne Wiederanlage und Verzugszinsberechnungen verwendet." },
        { q: "Wie unterscheidet sich der einfache Zins vom Zinseszins?", a: "Einfache Zinsen werden immer nur auf den ursprünglichen Kapitalbetrag berechnet (Z = K × p × t). Beim Zinseszins werden anfallende Zinsen dem Kapital zugeschlagen und künftig mitverzinst." },
        { q: "Wie berechnet man einfache Zinsen für Monate oder Tage?", a: "Teilen Sie die Anzahl der Monate durch 12 oder die Tage durch 360 bzw. 365, um den Jahresbruchteil t zu erhalten. Setzen Sie diesen in Z = K × p × t ein." },
        { q: "Ist die einfache Verzinsung günstiger für Kreditnehmer oder Gläubiger?", a: "Sie ist günstiger für Kreditnehmer, da die Zinslast linear und nicht exponentiell ansteigt. Für Gläubiger führt Zinseszins zu höheren Erträgen." },
        { q: "Wie lautet die exakte Formel für einfache Zinsen?", a: "Die Grundformel lautet: Zinsen = Kapital × Zinssatz × Zeit (Z = K × p × t / 100). Der Gesamtrückzahlungsbetrag ergibt sich aus Kapital plus Zinsen." }
      ]
    },
    fr: {
      name: "Calculateur d'Intérêts Simples",
      seoTitle: "Calculateur d'Intérêts Simples | HelloTools",
      seoDescription: "Calculez les intérêts linéaires et le montant final de votre placement.",
      description: "Calculez le rendement d'un capital sans capitalisation des intérêts.",
      quickAnswer: "Les intérêts simples sont calculés uniquement sur le capital initial.",
      seoHowToUse: "1. Entrez le capital initial.\n2. Indiquez le taux d'intérêt annuel.\n3. Choisissez la durée.",
      seoHowItWorks: "Multiplie le capital par le taux et la durée.",
      formula: "Intérêts = Capital * Taux * Durée",
      seoExample: "1 000 € à 5 % sur 3 ans produisent 150 € d'intérêts.",
      faqs: [
        { q: "Où les intérêts simples sont-ils couramment utilisés ?", a: "Les intérêts simples s'appliquent aux découverts bancaires, aux prêts court terme entre particuliers, aux crédits relais et à certains bons du Trésor." },
        { q: "Quelle est la différence entre intérêt simple et intérêt composé ?", a: "L'intérêt simple est calculé uniquement sur le capital initial (I = C × t × n). L'intérêt composé réintègre les intérêts au capital pour produire de nouveaux intérêts." },
        { q: "Comment calculer les intérêts simples pour des mois ou des jours ?", a: "Exprimez la durée en fraction d'année en divisant le nombre de mois par 12 (ou jours par 365). Multipliez ensuite le capital par le taux annuel et cette fraction temporelle." },
        { q: "L'intérêt simple est-il plus avantageux pour l'emprunteur ou le prêteur ?", a: "Il est plus avantageux pour l'emprunteur car le coût total de la dette reste modéré sans effet boule de neige financier." },
        { q: "Quelle est la formule mathématique des intérêts simples ?", a: "La formule est I = C × r × t, où C est le capital initial, r le taux d'intérêt annuel décimal et t la durée en années. Le montant total restitué vaut C + I." }
      ]
    },
    pt: {
      name: "Calculadora de Juros Simples",
      seoTitle: "Calculadora de Juros Simples | HelloTools",
      seoDescription: "Calcule os juros simples e o montante final acumulado sobre o valor inicial.",
      description: "Simule o rendimento de juros diretos sem capitalização composta.",
      quickAnswer: "Juros simples incidem exclusivamente sobre o valor do principal investido.",
      seoHowToUse: "1. Digite o valor principal.\n2. Insira a taxa de juros ao ano.\n3. Informe o tempo.",
      seoHowItWorks: "Multiplica o valor investido pela taxa e pelo período.",
      formula: "Juros = Principal * Taxa * Tempo",
      seoExample: "R$ 1.000 a 5% ao ano por 3 anos gera R$ 150 de juros (Montante R$ 1.150).",
      faqs: [
        { q: "Onde os juros simples são comumente aplicados?", a: "São aplicados em operações mercantis de curto prazo, duplicatas, títulos judiciais, cobrança de juros de mora e empréstimos familiares." },
        { q: "Qual a diferença crucial entre juros simples e compostos?", a: "Nos juros simples, o rendimento incide sempre e unicamente sobre o capital inicial (J = C × i × t). Nos compostos, os juros auferidos são capitalizados mês a mês." },
        { q: "Como fazer a conta de juros simples para prazos em meses ou dias?", a: "Converta o tempo em anos fracionários (meses divididos por 12 ou dias por 365) e aplique na equação clássica J = C × i × t, com taxa e tempo na mesma base." },
        { q: "O regime de juros simples é mais benéfico para quem toma crédito?", a: "Sim, é muito mais vantajoso para o devedor, pois impede a incidência de juros sobre juros e mantém o crescimento da dívida estritamente linear." },
        { q: "Qual a fórmula matemática exata do juro simples?", a: "A fórmula é J = C × i × t, sendo J os juros, C o capital inicial, i a taxa unitária e t o prazo em períodos equivalentes. Montante = C + J." }
      ]
    },
    ja: {
      name: "単利計算ツール",
      seoTitle: "単利計算ツール — 元本・金利・利息額 | HelloTools",
      seoDescription: "元本、年利（%）、運用期間から、単利方式による利息額と元利合計を瞬時に計算します。",
      description: "元本のみに金利がかかる単利の運用結果を計算します。",
      quickAnswer: "単利計算は当初の元本に対してのみ利息を計算する方式です。",
      seoHowToUse: "1. 元本金額を入力します。\n2. 年利（%）を指定します。\n3. 運用期間を入力します。",
      seoHowItWorks: "元本 * 金利 * 期間 で利息を算出します。",
      formula: "利息 = 元本 * (年利 / 100) * 期間",
      seoExample: "100万円を年利5%で3年間単利運用した場合、利息は15万円（合計115万円）です。",
      faqs: [
        { q: "単利計算はどのような金融商品で利用されますか？", a: "短期の個人間融資、手形割引、定期預金の単利型利払い、延滞利息の法的算定などで広く用いられています。" },
        { q: "単利と複利の最大の違いは何ですか？", a: "単利は当初預け入れた「元金」のみに対して利息が発生し（利息＝元金×年利×期間）、複利は発生した利息が元本に組み込まれて雪だるま式に増える点です。" },
        { q: "月単位や日単位の単利はどう計算しますか？", a: "月数の場合は月数/12、日数の場合は日数/365として年単位に換算し、元金×年利×換算期間で算出します。" },
        { q: "単利計算は借り手と貸し手のどちらに有利ですか？", a: "借入総コストが膨らみにくいため借り手に有利です。長期投資や預金では複利の方が貸し手・預金者に大きな利益をもたらします。" },
        { q: "単利の計算公式を教えてください。", a: "利息 ＝ 元金(P) × 年利(r) × 年数(t) です。最終返済（受取）合計金額は「元金 ＋ 利息」となります。" }
      ]
    }
  },

  'bmr-calculator': {
    es: {
      name: "Calculadora de BMR (Tasa Metabólica Basal)",
      seoTitle: "Calculadora de BMR (Metabolismo Basal) | HelloTools",
      seoDescription: "Calcula tu Tasa Metabólica Basal (BMR) e indica las calorías que quemas en reposo.",
      description: "Descubre las calorías mínimas que tu cuerpo necesita para mantenerse vivo en reposo.",
      quickAnswer: "El BMR es la cantidad de energía que el cuerpo quema en reposo absoluto durante 24 horas.",
      seoHowToUse: "1. Introduce edad, género, peso y altura.\n2. Revisa tu BMR en kilocalorías diarias.",
      seoHowItWorks: "Utiliza la ecuación científica de Mifflin-St Jeor.",
      formula: "BMR (Hombres) = 10w + 6,25h - 5a + 5 | BMR (Mujeres) = 10w + 6,25h - 5a - 161",
      seoExample: "Un hombre de 30 años, 70 kg y 175 cm tiene un BMR de aprox. 1.650 kcal/día.",
      faqs: [
        { q: "¿Qué mide exactamente la Tasa Metabólica Basal (TMB / BMR)?", a: "La TMB mide las calorías mínimas que consume el cuerpo en reposo absoluto para mantener funciones vitales como respirar, latido cardíaco, regeneración celular y temperatura corporal." },
        { q: "¿Cuál es la diferencia fundamental entre TMB y TDEE?", a: "La TMB son las calorías gastadas en reposo sin movimiento. El TDEE es la TMB multiplicada por el factor de actividad física; es decir, tu gasto total diario real." },
        { q: "¿Qué fórmula matemática utiliza esta calculadora de metabolismo basal?", a: "Aplica la fórmula de Mifflin-St Jeor (1990), considerada por los consensos dietéticos internacionales como la más precisa para adultos: TMB = (10 × peso kg) + (6,25 × talla cm) - (5 × edad) + 5 (hombres) o -161 (mujeres)." },
        { q: "¿Se debe comer por debajo de la Tasa Metabólica Basal?", a: "No se recomienda comer crónicamente por debajo de tu TMB, ya que puede desencadenar fatiga, pérdida de masa muscular, déficits nutricionales y ralentización metabólica adaptativa." },
        { q: "¿Cómo influye la masa muscular en la TMB?", a: "El tejido muscular es metabólicamente más activo que el tejido graso. A mayor masa muscular, mayor será tu TMB y más calorías quemarás incluso en reposo." }
      ]
    },
    de: {
      name: "Grundumsatzrechner (BMR)",
      seoTitle: "Grundumsatzrechner (BMR) Berechnen | HelloTools",
      seoDescription: "Berechnen Sie Ihren Grundumsatz (BMR) in Kalorien pro Tag.",
      description: "Ermitteln Sie den minimalen Kalorienbedarf Ihres Körpers im Ruhezustand.",
      quickAnswer: "Der Grundumsatz (BMR) ist die Energiemenge, die der Körper bei absoluter Ruhe benötigt.",
      seoHowToUse: "1. Alter, Geschlecht, Gewicht und Größe eingeben.\n2. Grundumsatz ablesen.",
      seoHowItWorks: "Berechnet nach der modernen Mifflin-St Jeor-Formel.",
      formula: "BMR (Männer) = 10w + 6.25h - 5a + 5 | BMR (Frauen) = 10w + 6.25h - 5a - 161",
      seoExample: "Ein 30-jähriger Mann mit 70 kg und 175 cm hat einen Grundumsatz von ca. 1.650 kcal/Tag.",
      faqs: [
        { q: "Was beziffert der Grundumsatz (BMR) des menschlichen Körpers?", a: "Der Grundumsatz ist die Energiemenge, die der Körper bei völliger Ruhe zur Aufrechterhaltung der lebensnotwendigen Organfunktionen (Atmung, Kreislauf, Zellregeneration) pro Tag benötigt." },
        { q: "Was unterscheidet den Grundumsatz (BMR) vom Leistungsumsatz?", a: "Der Grundumsatz ist der Ruhezustandsverbrauch. Der Leistungsumsatz umfasst alle zusätzlichen Kalorien durch Bewegung und Arbeit. Beide zusammen ergeben den Gesamtumsatz (TDEE)." },
        { q: "Welche wissenschaftliche Formel wird für die BMR-Berechnung genutzt?", a: "Verwendet wird die moderne Mifflin-St-Jeor-Formel, die in klinischen Studien eine Abweichung von unter 10 % gegenüber Messungen im Schlaflabor aufweist." },
        { q: "Darf man bei einer Diät weniger Kalorien als den Grundumsatz essen?", a: "Eine dauerhafte Kalorienzufuhr unterhalb des Grundumsatzes wird nicht empfohlen, da sie zu Nährstoffmangel, Leistungsabfall und Schilddrüsenanpassungen führen kann." },
        { q: "Welchen Einfluss hat Krafttraining auf den Grundumsatz?", a: "Da Muskelgewebe auch im Ruhezustand kontinuierlich Energie verbraucht, steigert ein höherer Muskelanteil den täglichen Grundumsatz nachhaltig." }
      ]
    },
    fr: {
      name: "Calculateur de Métabolisme de Base (MB)",
      seoTitle: "Calculateur de Métabolisme de Base (MB / BMR) | HelloTools",
      seoDescription: "Calculez votre métabolisme de base (MB) et découvrez vos calories au repos.",
      description: "Déterminez l'énergie minimale consommée par votre organisme au repos.",
      quickAnswer: "Le MB représente la quantité de calories brûlées par le corps au repos complet.",
      seoHowToUse: "1. Entrez âge, sexe, poids et taille.\n2. Obtenez votre métabolisme de base.",
      seoHowItWorks: "Applique la formule reconnue de Mifflin-St Jeor.",
      formula: "MB (Hommes) = 10p + 6.25t - 5a + 5 | MB (Femmes) = 10p + 6.25t - 5a - 161",
      seoExample: "Un homme de 30 ans, 70 kg et 175 cm a un MB d'environ 1 650 kcal/jour.",
      faqs: [
        { q: "Que mesure le Métabolisme de Base (MB / BMR) ?", a: "Le métabolisme de base représente la dépense énergétique incompressible de l'organisme au repos complet, nécessaire au fonctionnement du cerveau, du cœur, des poumons et de la régulation thermique." },
        { q: "Quelle est la différence entre Métabolisme de Base et Dépense Totale ?", a: "Le métabolisme de base correspond à la dépense vitale au lit sans activité. La dépense totale y ajoute l'effet thermique des repas et l'ensemble des activités physiques quotidiennes." },
        { q: "Quelle équation mathématique est utilisée par le calculateur ?", a: "Il intègre l'équation validée de Mifflin-St Jeor : MB = (10 × poids kg) + (6,25 × taille cm) - (5 × âge) + 5 (hommes) ou -161 (femmes)." },
        { q: "Est-il dangereux de consommer moins de calories que son métabolisme de base ?", a: "Oui, descendre durablement sous son MB peut dégrader la masse musculaire, altérer l'équilibre hormonal et provoquer un état de fatigue chronique." },
        { q: "Pourquoi la masse musculaire augmente-t-elle le métabolisme de base ?", a: "Le muscle est un tissu métaboliquement coûteux : chaque kilogramme de muscle supplémentaire augmente la dépense énergétique de repos jour et nuit." }
      ]
    },
    pt: {
      name: "Calculadora de Taxa Metabólica Basal (TMB)",
      seoTitle: "Calculadora de TMB (Taxa Metabólica Basal) | HelloTools",
      seoDescription: "Calcule sua Taxa Metabólica Basal (TMB) e descubra seu gasto calórico em repouso.",
      description: "Descubra a quantidade mínima de calorias que seu corpo queima para se manter vivo.",
      quickAnswer: "A TMB é a quantidade de energia necessária para manter as funções vitais em repouso.",
      seoHowToUse: "1. Digite idade, sexo, peso e altura.\n2. Veja seu resultado em calorias/dia.",
      seoHowItWorks: "Utiliza a equação validada de Mifflin-St Jeor.",
      formula: "TMB (Homens) = 10w + 6,25h - 5a + 5 | TMB (Mulheres) = 10w + 6,25h - 5a - 161",
      seoExample: "Um homem de 30 anos, 70 kg e 175 cm tem TMB de aprox. 1.650 kcal/dia.",
      faqs: [
        { q: "O que mede a Taxa Metabólica Basal (TMB / BMR)?", a: "A TMB calcula a quantidade mínima de energia que o corpo gasta em repouso absoluto em 24 horas para manter batimentos cardíacos, respiração e temperatura interna estáveis." },
        { q: "Qual a diferença entre a Taxa Metabólica Basal e o gasto calórico diário?", a: "A TMB é a queima corporal no estado de repouso absoluto. O gasto total diário soma à TMB as calorias gastas com caminhadas, tarefas diárias e prática esportiva." },
        { q: "Qual fórmula científica é adotada nesta calculadora?", a: "Utiliza a fórmula de Mifflin-St Jeor (1990), considerada na literatura médica internacional como a mais confiável para a população geral." },
        { q: "É prejudicial consumir calorias abaixo da Taxa Metabólica Basal?", a: "Sim. Dietas muito restritivas abaixo da TMB forçam o corpo a catabolizar músculos, além de reduzirem a disposição e desacelerarem a tireoide." },
        { q: "De que maneira o ganho de massa muscular altera a TMB?", a: "O músculo esquelético consome muito mais energia que o tecido adiposo. O aumento de massa magra eleva a TMB permanentemente, mesmo dormindo." }
      ]
    },
    ja: {
      name: "基礎代謝量（BMR）計算ツール",
      seoTitle: "基礎代謝量（BMR）計算ツール — 安静時カロリー | HelloTools",
      seoDescription: "年齢、性別、身長、体重から、1日あたり呼吸や体温維持等で消費する基礎代謝量（BMR）を計算します。",
      description: "呼吸や心拍など生命維持に最低限必要な1日の消費エネルギー量を計算します。",
      quickAnswer: "BMR（基礎代謝量）は体が24時間完全な安静状態で消費する最小エネルギーです。",
      seoHowToUse: "1. 年齢・性別・身長・体重を入力します。\n2. 基礎代謝量（kcal/日）を確認します。",
      seoHowItWorks: "国際的に標準的なMifflin-St Jeor式を用いて算出します。",
      formula: "BMR = 10*体重(kg) + 6.25*身長(cm) - 5*年齢 + 調整値",
      seoExample: "30歳・男性・体重70kg・身長175cmの場合、基礎代謝量は約1,650kcal/日です。",
      faqs: [
        { q: "基礎代謝量（BMR）とは何を数値化したものですか？", a: "呼吸、心拍、体温調節、細胞修復など、覚醒時に横になって完全に安静を保っている状態で消費される、生命維持に必須の最小エネルギー消費量です。" },
        { q: "基礎代謝量（BMR）と1日の総消費エネルギー（TDEE）の違いは？", a: "基礎代謝量は「何もしなくても消費される最低限の熱量」です。これに通学・通勤・仕事・スポーツなどの活動代謝を加えたものが総消費エネルギーです。" },
        { q: "このツールはどの基礎代謝計算式を採用していますか？", a: "国際的な栄養学研究で成人に対して最も精度が高いとされるミフリン・サン・ジェオール式（Mifflin-St Jeor）を採用しています。" },
        { q: "基礎代謝量を下回る極端な食事制限は健康上問題がありますか？", a: "はい。基礎代謝未満のカロリー制限を長期間続けると、筋肉の分解、低体温、倦怠感、基礎代謝の低下（省エネモード）を招くリスクがあります。" },
        { q: "筋力トレーニングを行うと基礎代謝は向上しますか？", a: "向上します。筋肉は脂肪細胞と比べて安静時のエネルギー消費率が高いため、筋肉量を増やすことで基礎代謝が底上げされ太りにくい体質になります。" }
      ]
    }
  },

  'water-intake-calculator': {
    es: {
      name: "Calculadora de Consumo de Agua",
      seoTitle: "Calculadora de Consumo Diario de Agua | HelloTools",
      seoDescription: "Calcula cuánta agua debes beber al día según tu peso corporal y actividad física.",
      description: "Calcula tu meta diaria recomendada de hidratación en litros y vasos de agua.",
      quickAnswer: "Estima el agua necesaria cada día para mantener una hidratación óptima.",
      seoHowToUse: "1. Introduce tu peso en kg.\n2. Selecciona tu nivel de actividad diaria.\n3. Obtén los litros recomendados al día.",
      seoHowItWorks: "Calcula aproximadamente 35 ml de agua por kg de peso corporal más compensación por ejercicio.",
      formula: "Agua (L) = (Peso kg * 0.033) + Ajuste por Ejercicio",
      seoExample: "Una persona de 70 kg necesita aproximadamente 2,4 a 2,8 litros de agua al día.",
      faqs: [
        { q: "¿Cuánta agua debo beber al día según mi peso corporal?", a: "Una regla médica general recomienda entre 30 y 35 ml de agua por kilogramo de peso corporal al día. Por ejemplo, una persona de 70 kg requiere aproximadamente entre 2,1 y 2,5 litros diarios." },
        { q: "¿Cómo incrementa la práctica de ejercicio la necesidad de hidratación?", a: "Se aconseja añadir entre 350 y 500 ml de agua adicionales por cada 30 minutos de ejercicio físico moderado o intenso para reponer las pérdidas por sudoración." },
        { q: "¿Cuentan las infusiones, el café o los alimentos en la ingesta hídrica?", a: "Sí. Aproximadamente el 20% del agua diaria proviene de frutas y verduras frescas, e infusiones o sopas también contribuyen a la hidratación global." },
        { q: "¿Cuáles son los primeros signos de una hidratación insuficiente?", a: "Orina de color amarillo oscuro, sensación de sed, sequedad de boca, cefalea leve y fatiga suelen indicar que el organismo requiere líquidos." },
        { q: "¿Puede ser perjudicial beber un exceso de agua (hiperhidratación)?", a: "Sí. Ingerir cantidades masivas en lapsos muy cortos puede causar hiponatremia (dilución peligrosa del sodio en sangre). Se recomienda repartir la ingesta de forma regular durante el día." }
      ]
    },
    de: {
      name: "Wasserbedarfsrechner",
      seoTitle: "Wasserbedarfsrechner — Wie viel Wasser trinken? | HelloTools",
      seoDescription: "Berechnen Sie Ihren täglichen Wasserbedarf basierend auf Körpergewicht und Sport.",
      description: "Ermitteln Sie Ihre optimale tägliche Flüssigkeitsmenge in Litern.",
      quickAnswer: "Der Wasserbedarfsrechner zeigt die empfohlene Trinkmenge für Ihren Körper.",
      seoHowToUse: "1. Körpergewicht eingeben.\n2. Aktivitätslevel wählen.\n3. Tagesbedarf in Litern ablesen.",
      seoHowItWorks: "Basiert auf der Richtlinie von ca. 30-35 ml Wasser pro kg Körpergewicht.",
      formula: "Wasser (L) = (Gewicht kg * 0,033) + Sportzuschlag",
      seoExample: "Bei 70 kg Körpergewicht liegt der empfohlene Richtwert bei ca. 2,4 Litern täglich.",
      faqs: [
        { q: "Wie viel Wasser sollte man täglich bezogen auf das Körpergewicht trinken?", a: "Die Faustregel lautet 30 bis 35 ml Wasser pro Kilogramm Körpergewicht pro Tag. Bei 70 kg Körpergewicht entspricht das rund 2,1 bis 2,4 Litern Flüssigkeit." },
        { q: "Wie erhöht sportliche Aktivität den Flüssigkeitsbedarf?", a: "Pro 30 Minuten schweißtreibendem Training sollten zusätzlich 300 bis 500 ml Wasser getrunken werden, um den Flüssigkeitsverlust auszugleichen." },
        { q: "Zählen ungesüßte Tees und feste Nahrung zur Flüssigkeitsbilanz?", a: "Ja. Etwa 20 % des täglichen Wasserbedarfs werden über feste Nahrungsmittel (Obst, Gemüse) abgedeckt; ungesüßte Kräutertees zählen ebenfalls voll mit." },
        { q: "Woran erkennt man eine beginnende Dehydration im Alltag?", a: "Dunkelgelber Urin, Mundtrockenheit, Kopfschmerzen und Konzentrationsschwächen sind typische Warnsignale für Flüssigkeitsmangel." },
        { q: "Gibt es ein Zuviel an Wasser am Tag?", a: "Ja, extremes Trinken von mehreren Litern innerhalb kürzester Zeit kann zur sogenannten Wasserintoxikation (Hyponatriämie) führen. Trinken Sie gleichmäßig über den Tag verteilt." }
      ]
    },
    fr: {
      name: "Calculateur d'Apport en Eau",
      seoTitle: "Calculateur d'Apport en Eau Quotidien | HelloTools",
      seoDescription: "Calculez combien de litres d'eau vous devez boire par jour selon votre poids.",
      description: "Déterminez votre objectif quotidien d'hydratation en litres et verres d'eau.",
      quickAnswer: "Estime la quantité d'eau idéale pour maintenir une bonne hydratation.",
      seoHowToUse: "1. Entrez votre poids en kg.\n2. Choisissez votre temps d'exercice.\n3. Consultez votre recommandation.",
      seoHowItWorks: "Repose sur le calcul de 35 ml d'eau par kilo de poids corporel.",
      formula: "Eau (L) = (Poids kg * 0.035) + Supplément Sport",
      seoExample: "Une personne de 70 kg a besoin d'environ 2,45 litres d'eau par jour.",
      faqs: [
        { q: "Combien d'eau boire par jour en fonction de son poids ?", a: "La recommandation courante est de 30 à 35 ml d'eau par kilo de poids corporel par jour, soit environ 2,1 à 2,5 litres d'eau pour un adulte de 70 kg." },
        { q: "Combien d'eau ajouter en cas d'effort physique ou de forte chaleur ?", a: "Ajoutez 300 à 500 ml d'eau par tranche de 30 minutes d'entraînement sportif ou lors de journées de forte chaleur estivale." },
        { q: "Le thé, le café et les fruits participent-ils à l'hydratation ?", a: "Oui. Environ 20 % de nos apports hydriques proviennent de l'alimentation (fruits, crudités), et le thé ou les tisanes contribuent pleinement à l'équilibre hydrique." },
        { q: "Quel est l'indicateur le plus simple d'une bonne hydratation ?", a: "La couleur des urines : une teinte jaune clair à transparente indique une hydratation optimale, tandis qu'un jaune foncé signale un manque d'eau." },
        { q: "Peut-on boire trop d'eau en une journée ?", a: "Oui, une consommation excessive et trop rapide d'eau peut provoquer une hyponatrie (baisse critique du sodium). Répartissez vos verres d'eau tout au long de la journée." }
      ]
    },
    pt: {
      name: "Calculadora de Consumo de Água",
      seoTitle: "Calculadora de Consumo Diário de Água | HelloTools",
      seoDescription: "Descubra quantos litros de água você deve beber por dia conforme seu peso.",
      description: "Calcule sua meta diária de hidratação em litros e copos de água.",
      quickAnswer: "Calcula a quantidade recomendada de água com base no peso e exercícios.",
      seoHowToUse: "1. Insira seu peso corporal em kg.\n2. Informe seu nível de atividade física.\n3. Veja a meta recomendada em litros.",
      seoHowItWorks: "Aplica a fórmula médica de 35 ml de água para cada kg de peso corporal.",
      formula: "Água (L) = (Peso kg * 0,035) + Adicional por Exercício",
      seoExample: "Uma pessoa de 70 kg precisa beber cerca de 2,45 litros de água por dia.",
      faqs: [
        { q: "Qual a quantidade ideal de água para beber por dia conforme o peso?", a: "A recomendação clínica padrão é de 35 ml de água por quilo de peso corporal ao dia. Uma pessoa pesando 70 kg deve consumir em média 2,45 litros diários." },
        { q: "Quanto devo beber a mais em dias de treino ou calor intenso?", a: "Adicione de 400 a 600 ml de água para cada 45 minutos a 1 hora de exercícios físicos moderados ou pesados para recompor o suor." },
        { q: "Chás e alimentos com água contam na meta diária de hidratação?", a: "Sim. Frutas aquosas (melancia, laranja), sopas e chás sem açúcar contribuem com cerca de 20% do volume total de água necessário." },
        { q: "Como identificar se o corpo está precisando de mais água?", a: "Urina com coloração amarela escura, lábios ressecados, dor de cabeça e lentidão no raciocínio são sinais evidentes de desidratação." },
        { q: "Existe risco em tomar água em excesso repentinamente?", a: "Sim, a ingestão volumosa de água em pouco tempo pode causar hiponatremia (queda do sódio sanguíneo). Beba pequenos goles espaçados ao longo do dia." }
      ]
    },
    ja: {
      name: "水分摂取量計算ツール",
      seoTitle: "1日の推奨水分摂取量計算ツール | HelloTools",
      seoDescription: "体重と運動時間から、健康維持に必要な1日の推奨水分摂取量（リットル）を計算します。",
      description: "体重と運動量に応じた最適な1日の水分補給量を算出します。",
      quickAnswer: "体重1kgあたり約30〜35mlを基準に1日の必要水分量を計算します。",
      seoHowToUse: "1. 体重（kg）を入力します。\n2. 1日の運動時間を指定します。\n3. 推奨される水分摂取量（L）を確認します。",
      seoHowItWorks: "体重に応じた基本必要量に運動による発汗補正を加えて算出します。",
      formula: "必要水分量(L) = 体重(kg) * 0.033 + 運動加算",
      seoExample: "体重70kgの人の目安は1日あたり約2.3〜2.5リットルです。",
      faqs: [
        { q: "体重に応じた1日の適切な水分補給量の目安は？", a: "一般的に「体重(kg) × 30〜35ml」が目安とされます。例えば体重60kgの方の場合、1日に約1.8〜2.1リットルの水分が必要です。" },
        { q: "運動時や夏場はどれくらい水分を追加すべきですか？", a: "中強度の運動30分につき約300〜500mlの追加補給が推奨されます。発汗量が多い場合は電解質（塩分）を含んだ水分補給が重要です。" },
        { q: "食事やお茶、コーヒーも水分摂取量に含まれますか？", a: "はい。食事に含まれる水分（野菜・果物・汁物）から1日の約20〜30%が摂取されます。麦茶やカフェインの少ないお茶も水分補給に適しています。" },
        { q: "水分不足（脱水傾向）を確認する最も簡単な方法は？", a: "尿の色をチェックすることです。薄いレモン色であれば適切な水分量であり、濃い黄色や茶褐色の場合は水分補給が必要です。" },
        { q: "一度に大量の水を飲むと健康被害はありますか？", a: "はい。短時間に過剰な水分を摂取すると血中ナトリウム濃度が急低下する「水中毒（低ナトリウム血症）」の恐れがあります。こまめに分散して飲みましょう。" }
      ]
    }
  },

  'date-difference-calculator': {
    es: {
      name: "Calculadora de Diferencia de Fechas",
      seoTitle: "Calculadora de Diferencia de Fechas (Días y Meses) | HelloTools",
      seoDescription: "Calcula el número exacto de días, semanas y meses transcurridos entre dos fechas.",
      description: "Descubre cuántos días hay entre dos fechas cualesquiera.",
      quickAnswer: "Mide el intervalo de tiempo preciso que separa dos fechas del calendario.",
      seoHowToUse: "1. Selecciona la fecha de inicio y la fecha final.\n2. Revisa la diferencia en días totales, semanas y meses.",
      seoHowItWorks: "Calcula la diferencia calendárica teniendo en cuenta años bisiestos.",
      formula: "Diferencia = Fecha Final - Fecha Inicial",
      seoExample: "Entre el 1 de enero y el 31 de diciembre hay exactamente 364 días (o 365 en bisiesto).",
      faqs: [
        { q: "¿Cómo se calcula el número de días entre dos fechas?", a: "Convierte ambas fechas a tiempo universal coordinado (UTC) en milisegundos y divide la diferencia absoluta entre 86.400.000 milisegundos (24 horas × 60 min × 60 s × 1.000 ms)." },
        { q: "¿Incluye la calculadora la fecha final en el recuento?", a: "Por defecto calcula los días transcurridos entre ambas fechas (excluyendo el día final). Puedes activar la opción de incluir ambos días en el cómputo." },
        { q: "¿Se pueden excluir fines de semana (sábados y domingos)?", a: "Sí. Permite contar únicamente los días laborables (lunes a viernes), útil para plazos judiciales, plazos administrativos o presupuestos de proyectos." },
        { q: "¿Cómo desglosa la diferencia en años, meses y días?", a: "Computa los años completos cumplidos, luego los meses naturales completos y finalmente los días restantes según la duración real de cada mes." },
        { q: "¿Tiene en cuenta los cambios de horario de verano en el cálculo?", a: "Al operar en horario UTC estándar de medianoche a medianoche, los cambios de hora estacional no generan errores de 23 o 25 horas." }
      ]
    },
    de: {
      name: "Datumsdifferenz-Rechner",
      seoTitle: "Datumsdifferenz-Rechner — Tage Zwischen Zwei Daten | HelloTools",
      seoDescription: "Berechnen Sie die exakte Anzahl an Tagen, Wochen und Monaten zwischen zwei Datumsangaben.",
      description: "Ermitteln Sie den genauen Zeitabstand zwischen zwei Daten.",
      quickAnswer: "Zählt die exakten Kalendertage zwischen einem Start- und Enddatum.",
      seoHowToUse: "1. Startdatum und Enddatum auswählen.\n2. Differenz in Tagen und Wochen ablesen.",
      seoHowItWorks: "Berücksichtigt Schaltjahre und unterschiedliche Monatslängen.",
      formula: "Differenz = Enddatum - Startdatum",
      seoExample: "Vom 1. Januar bis 31. Dezember vergehen genau 364 Tage.",
      faqs: [
        { q: "Wie wird die Anzahl der Tage zwischen zwei Terminen exakt ermittelt?", a: "Die Zeitstempel beider Daten werden in Millisekunden umgerechnet und die Differenz durch 86.400.000 geteilt, um die genaue Tageszahl zu erhalten." },
        { q: "Zählt der Endtag bei der Fristberechnung mit?", a: "Standardmäßig wird die Spanne zwischen den Terminen ermittelt (Enddatum exklusiv). Eine Option erlaubt den Einschluss des Endtages." },
        { q: "Kann man nur Werktage (ohne Samstage und Sonntage) zählen?", a: "Ja, das Tool kann Werktage (Montag bis Freitag) separat ausweisen, was ideal für Fristen und Projektarbeitszeiten ist." },
        { q: "Wie schlüsselt der Rechner die Differenz in Jahre, Monate und Tage auf?", a: "Er zieht die vollen Kalenderjahre und -monate unter Berücksichtigung der unterschiedlichen Monatslängen ab und weist verbleibende Tage separat aus." },
        { q: "Verursacht die Zeitumstellung (Sommer-/Winterzeit) Berechnungsfehler?", a: "Nein, da alle Zeitberechnungen in standardisierter UTC-Zeit erfolgen, fallen Zeitumstellungsstunden rechnerisch nicht ins Gewicht." }
      ]
    },
    fr: {
      name: "Calculateur de Différence entre Dates",
      seoTitle: "Calculateur de Différence entre Deux Dates | HelloTools",
      seoDescription: "Calculez le nombre de jours, semaines et mois exacts entre deux dates.",
      description: "Calculez l'écart calendaire précis entre deux dates.",
      quickAnswer: "Mesure la durée exacte écoulée entre une date de début et une date de fin.",
      seoHowToUse: "1. Choisissez la date de début et la date de fin.\n2. Obtenez la différence exacte.",
      seoHowItWorks: "Calcule l'intervalle en jours ouvrés ou calendaires.",
      formula: "Écart = Date de fin - Date de début",
      seoExample: "Du 1er janvier au 31 décembre, il y a 364 jours écoulés.",
      faqs: [
        { q: "Comment le calculateur compte-t-il les jours entre deux dates ?", a: "Il soustrait les valeurs temporelles en millisecondes UTC des deux dates et divise le résultat par 86 400 000 millisecondes (soit 24 heures)." },
        { q: "La date de fin est-elle comprise dans le décompte ?", a: "Par défaut, le jour de départ est inclus et le jour d'arrivée est exclu (durée écoulée). Une option permet de compter le jour de fin." },
        { q: "Est-il possible d'obtenir le nombre de jours ouvrés (hors week-ends) ?", a: "Oui. Le calculateur peut isoler les jours de semaine (du lundi au vendredi) pour le suivi de chantiers ou les délais administratifs." },
        { q: "Comment la durée est-elle convertie en années, mois et jours ?", a: "L'algorithme comptabilise les années civiles révolues, les mois calendaires effectifs et le solde de jours résiduels." },
        { q: "Les fuseaux horaires affectent-ils la précision du décompte ?", a: "Non, les calculs s'effectuent à minuit heure UTC pour neutraliser tout décalage d'heure d'été ou d'hiver." }
      ]
    },
    pt: {
      name: "Calculadora de Diferença de Datas",
      seoTitle: "Calculadora de Diferença entre Datas | HelloTools",
      seoDescription: "Calcule o número exato de dias, semanas e meses entre duas datas no calendário.",
      description: "Calcule a quantidade de dias transcorridos entre duas datas.",
      quickAnswer: "Mede o intervalo preciso em dias e meses entre duas datas.",
      seoHowToUse: "1. Selecione a data inicial e a data final.\n2. Veja o total de dias transcorridos.",
      seoHowItWorks: "Calcula a diferença exata considerando os anos bissextos.",
      formula: "Diferença = Data Final - Data Inicial",
      seoExample: "Entre 01/01 e 31/12 existem 364 dias decorridos.",
      faqs: [
        { q: "Como é calculada a quantidade exata de dias entre duas datas?", a: "As datas são convertidas para milissegundos UTC e a diferença matemática é dividida por 86.400.000 (o número de milissegundos de um dia completo)." },
        { q: "O último dia é incluído na contagem de prazo?", a: "Por padrão, calcula-se o intervalo transcorrido (data final exclusiva). É possível ativar a opção de incluir o dia final no cômputo total." },
        { q: "A ferramenta calcula dias úteis desconsiderando fins de semana?", a: "Sim. É possível filtrar apenas os dias úteis (segunda a sexta-feira), indispensável para contagem de prazos processuais e contratos." },
        { q: "Como a diferença é decomposta em anos, meses e semanas?", a: "O sistema decompõe o período em anos calendários inteiros, meses completos e saldo de dias e semanas remanescentes." },
        { q: "A mudança de fuso horário interfere no cálculo de dias?", a: "Não. Ao utilizar horário neutro UTC fixado na meia-noite, eventuais ajustes de horário de verão não provocam distorções de contagem." }
      ]
    },
    ja: {
      name: "日付差分計算ツール",
      seoTitle: "日付差分計算ツール — 2つの日付間の日数計算 | HelloTools",
      seoDescription: "開始日と終了日を指定して、2つの日付の間の正確な日数、週数、月数、年数を計算します。",
      description: "2つの日付の間の経過日数や指定日までのカウントダウン日数を計算します。",
      quickAnswer: "開始日と終了日の間の正確な日数差を計算します。",
      seoHowToUse: "1. 開始日と終了日を選択します。\n2. 総経過日数、週数、月数を確認します。",
      seoHowItWorks: "うるう年や各月の日数を考慮して差分を求めます。",
      formula: "経過日数 = 終了日 - 開始日",
      seoExample: "1月1日から12月31日までの間は364日（うるう年は365日）です。",
      faqs: [
        { q: "2つの日付間の日数はどのように計算されますか？", a: "指定された2つの日付を協定世界時（UTC）ベースのミリ秒数に変換し、1日のミリ秒数（86,400,000ミリ秒）で除算して正確な暦日数を算出します。" },
        { q: "開始日と終了日の「両端入れ」「片端入れ」に対応していますか？", a: "対応しています。標準では片端入れ（満了日数）で計算しますが、初日と最終日の両方を含める「両端入れ」の計算にも切り替え可能です。" },
        { q: "土日祝日を除いた「営業日・平日のみ」の日数計算はできますか？", a: "はい。土曜日・日曜日を除外した実働稼働日（平日日数）のカウントにも対応しており、納期管理や業務計画に便利です。" },
        { q: "日数のほかに「○年○ヶ月○日」という期間の内訳も分かりますか？", a: "各月の日数（28日〜31日）を正確に考慮し、通算日数だけでなく年数・月数・日数の詳細な内訳を表示します。" },
        { q: "夏時間（サマータイム）による時間のズレは発生しませんか？", a: "日付単位の計算はタイムゾーンの時差影響を受けない標準化UTCロジックを用いているため、時間のズレによる日数の狂いは発生しません。" }
      ]
    }
  },

  'time-calculator': {
    es: {
      name: "Calculadora de Tiempo",
      seoTitle: "Calculadora de Tiempo — Sumar y Restar Horas | HelloTools",
      seoDescription: "Suma, resta y calcula intervalos de horas, minutos y segundos fácilmente.",
      description: "Operaciones rápidas con horas, minutos y segundos.",
      quickAnswer: "Permite sumar o restar duraciones de tiempo de forma exacta.",
      seoHowToUse: "1. Introduce las horas, minutos y segundos.\n2. Elige sumar o restar.\n3. Obtén el total formateado.",
      seoHowItWorks: "Convierte tiempos a segundos totales, opera y reformatea.",
      formula: "Total Segundos = Horas*3600 + Minutos*60 + Segundos",
      seoExample: "2 horas 30 min + 1 hora 45 min = 4 horas 15 min.",
      faqs: [
        { q: "¿Qué operaciones de tiempo se pueden realizar con esta calculadora?", a: "Permite sumar o restar horas, minutos y segundos a una hora concreta, calcular la duración entre dos horas y acumular hojas de horas de trabajo." },
        { q: "¿Cómo se suman horas que superan las 24 horas del día?", a: "El calculador acumula el exceso como días adicionales (ej. sumar 14 horas a las 18:00 resulta en las 08:00 del día siguiente, con +1 día indicado)." },
        { q: "¿Se puede utilizar para calcular horas trabajadas y horas extras?", a: "Sí. Puedes introducir las horas de entrada y salida (descontando descansos) para conocer las horas netas trabajadas y verificar horas extraordinarias." },
        { q: "¿Cómo se convierten horas y minutos en formato decimal?", a: "Para convertir a formato decimal: divide los minutos entre 60. Por ejemplo, 7 horas y 45 minutos = 7 + (45/60) = 7,75 horas decimales." },
        { q: "¿Admite formato horario de 12 horas (AM/PM) y militar de 24 horas?", a: "Sí. Es compatible con la notación estándar de 24 horas y con el sistema AM/PM de 12 horas." }
      ]
    },
    de: {
      name: "Zeitrechner",
      seoTitle: "Zeitrechner — Stunden und Minuten Rechnen | HelloTools",
      seoDescription: "Addieren und subtrahieren Sie Stunden, Minuten und Sekunden präzise.",
      description: "Zeiten und Zeitspannen einfach berechnen.",
      quickAnswer: "Addiert oder subtrahiert Zeitangaben in Stunden und Minuten.",
      seoHowToUse: "1. Zeiten eingeben.\n2. Plus oder Minus wählen.\n3. Ergebnis ablesen.",
      seoHowItWorks: "Rechnet Zeiten in Sekunden um und formatiert das Ergebnis.",
      formula: "Gesamt = Zeit 1 +/- Zeit 2",
      seoExample: "2 Std 30 Min + 1 Std 45 Min = 4 Std 15 Min.",
      faqs: [
        { q: "Welche Zeitberechnungen unterstützt dieser Zeitrechner?", a: "Er addiert und subtrahiert Stunden, Minuten und Sekunden, berechnet Zeitspannen zwischen zwei Uhrzeiten und summiert Arbeitsstundenlisten." },
        { q: "Was passiert, wenn die Addition 24 Stunden überschreitet?", a: "Der Rechner springt auf den Folgetag um und weist die Anzahl der zusätzlich vergangenen Tage übersichtlich aus." },
        { q: "Eignet sich das Tool zur Erfassung von Arbeitszeit und Überstunden?", a: "Ja, ideal zum Ausrechnen von Beginn, Ende und Pausenzeiten zur Bestimmung der täglichen Netto-Arbeitszeit." },
        { q: "Wie rechnet man Zeit in Industrie- bzw. Dezimalstunden um?", a: "Teilen Sie die Minuten durch 60. Beispiel: 8 Stunden und 15 Minuten entsprechen 8 + 15/60 = 8,25 Dezimalstunden." },
        { q: "Werden sowohl 24-Stunden- als auch AM/PM-Formate akzeptiert?", a: "Ja, das Tool unterstützt das europäische 24-Stunden-Format sowie das internationale 12-Stunden-System mit AM/PM." }
      ]
    },
    fr: {
      name: "Calculateur de Temps",
      seoTitle: "Calculateur de Temps — Heures et Minutes | HelloTools",
      seoDescription: "Additionnez et soustrayez des heures, minutes et secondes facilement.",
      description: "Calculs simples sur les durées et horaires.",
      quickAnswer: "Permet de faire la somme ou la différence de durées temporelles.",
      seoHowToUse: "1. Saisissez les heures et minutes.\n2. Choisissez l'opération.\n3. Obtenez le résultat.",
      seoHowItWorks: "Convertit en secondes puis re-formate en HH:MM:SS.",
      formula: "Durée Totale = Durée 1 +/- Durée 2",
      seoExample: "2h 30m + 1h 45m = 4h 15m.",
      faqs: [
        { q: "Quelles opérations temporelles ce calculateur prend-il en charge ?", a: "Il permet d'ajouter ou soustraire des heures, minutes et secondes, de calculer la durée entre deux moments précis et de totaliser des heures de travail." },
        { q: "Comment sont gérés les dépassements de minuit (plus de 24 heures) ?", a: "Le compteur bascule sur le jour suivant et indique le nombre de jours calendaires cumulés (ex. +1 jour)." },
        { q: "Peut-on l'utiliser pour établir un relevé d'heures de travail ?", a: "Oui. Saisissez vos heures d'embauche et de débauche en retranchant la pause déjeuner pour obtenir le temps de travail effectif." },
        { q: "Comment convertir des heures et minutes en heures décimales ?", a: "Divisez les minutes par 60 et ajoutez-les aux heures. Exemple : 7 h 30 min = 7 + (30 / 60) = 7,50 heures décimales." },
        { q: "Prend-il en charge le format 24 heures et le format 12 heures (AM/PM) ?", a: "Oui, l'interface s'adapte indifféremment à la saisie au format militaire 24 h ou avec distinction AM/PM." }
      ]
    },
    pt: {
      name: "Calculadora de Tempo",
      seoTitle: "Calculadora de Tempo — Somar e Subtrair Horas | HelloTools",
      seoDescription: "Somar e subtrair horas, minutos e segundos de forma rápida e exata.",
      description: "Faça cálculos com horários e durações de tempo.",
      quickAnswer: "Calcula a soma ou a diferença entre intervalos de tempo.",
      seoHowToUse: "1. Digite as horas, minutos e segundos.\n2. Selecione a operação (+ ou -).\n3. Veja o total.",
      seoHowItWorks: "Converte os intervalos para segundos e aplica a operação.",
      formula: "Total = Tempo 1 +/- Tempo 2",
      seoExample: "2h 30m + 1h 45m = 4h 15m.",
      faqs: [
        { q: "Quais cálculos de tempo e horas são possíveis nesta ferramenta?", a: "Permite somar e subtrair horas, minutos e segundos, encontrar o intervalo entre dois horários e somar folhas de ponto de trabalho." },
        { q: "Como a calculadora lida com somas que ultrapassam 24 horas?", a: "O sistema contabiliza a transição de dias, indicando as horas do novo dia com a marcação de dias decorridos (+1 ou mais dias)." },
        { q: "Serve para controlar banco de horas e calcular horas extras?", a: "Sim. Permite lançar horários de entrada e saída, descontar intervalos de almoço e apurar o saldo de jornada líquida trabalhada." },
        { q: "Como converter horas e minutos para horas decimais de folha de pagamento?", a: "Divida os minutos por 60. Por exemplo: 8 horas e 45 minutos equivalem a 8 + (45/60) = 8,75 horas decimais." },
        { q: "A ferramenta aceita horário no formato 24h e 12h (AM/PM)?", a: "Sim, suporta tanto o formato padrão brasileiro de 24 horas quanto o padrão de 12 horas com sufixos AM e PM." }
      ]
    },
    ja: {
      name: "時間計算ツール",
      seoTitle: "時間計算ツール — 時間・分・秒の加算・減算 | HelloTools",
      seoDescription: "時間、分、秒の足し算・引き算や、タイムカードの勤務時間合計を正確に計算します。",
      description: "時間・分・秒の計算や時間差を簡単に求められます。",
      quickAnswer: "時間、分、秒の単位で時間の足し算や引き算を行うツールです。",
      seoHowToUse: "1. 時間・分・秒を入力します。\n2. 加算（+）または減算（-）を選択します。\n3. 計算結果の時間を確認します。",
      seoHowItWorks: "すべての時間を秒単位に換算して計算し、再度「時:分:秒」に変換します。",
      formula: "合計時間 = 時間1 +/- 時間2",
      seoExample: "2時間30分 + 1時間45分 = 4時間15分 です。",
      faqs: [
        { q: "この時間計算ツールでどのような時間の計算ができますか？", a: "「時間の足し算・引き算」「2つの時刻の間の経過時間計算」「タイムカード（勤務時間）の合計計算」が可能です。" },
        { q: "24時間を超える時間の加算はどう表示されますか？", a: "翌日以降の日数繰り上げとして処理され、「○日と○時間○分」または通算時間数として分かりやすく表示されます。" },
        { q: "出勤・退勤時刻から実労働時間や残業時間を計算できますか？", a: "はい。出勤時間と退勤時間を入力し、休憩時間を差し引くことで実働時間と時間外労働（残業時間）を即座に計算できます。" },
        { q: "「時間・分」を給与計算用の「10進数（小数時間）」に直すには？", a: "分数を60で割ります。例えば7時間45分の場合は、7 ＋ (45÷60) ＝ 7.75時間（10進法時間）となります。" },
        { q: "24時間表記と午前/午後（AM/PM）のどちらにも対応していますか？", a: "はい。日本で一般的な24時間制の入力と、12時間制（AM/PM）の入力の双方に対応しています。" }
      ]
    }
  },

  'fraction-calculator': {
    es: {
      name: "Calculadora de Fracciones",
      seoTitle: "Calculadora de Fracciones — Suma, Resta, Multiplicación | HelloTools",
      seoDescription: "Realiza operaciones con fracciones (sumar, restar, multiplicar, dividir) y simplifica el resultado.",
      description: "Resuelve problemas matemáticos con fracciones paso a paso.",
      quickAnswer: "Calcula operaciones entre fracciones e identifica la fracción simplificada resultante.",
      seoHowToUse: "1. Introduce el numerador y denominador de cada fracción.\n2. Selecciona la operación (+, -, *, /).\n3. Obtén la fracción reducida.",
      seoHowItWorks: "Utiliza el mínimo común múltiplo para sumas y simplifica mediante el MCD.",
      formula: "a/b + c/d = (ad + bc) / bd",
      seoExample: "1/2 + 1/4 = 3/4.",
      faqs: [
        { q: "¿Qué operaciones con fracciones resuelve esta calculadora?", a: "Realiza suma, resta, multiplicación y división de fracciones comunes, fracciones impropias y números mixtos, simplificando siempre el resultado a su mínima expresión." },
        { q: "¿Cómo se suman o restan fracciones con distinto denominador?", a: "Se calcula el mínimo común múltiplo (MCM) de los denominadores para homogenizar las fracciones, se suman o restan los numeradores resultantes y se simplifica." },
        { q: "¿Muestra el resultado simplificado y en forma decimal?", a: "Sí. Muestra la fracción irreducible simplificada, su valor decimal equivalente y su representación como número mixto si el numerador supera al denominador." },
        { q: "¿Cómo se divide una fracción entre otra?", a: "Se multiplica la primera fracción por la inversa de la segunda: (a/b) ÷ (c/d) = (a × d) / (b × c)." },
        { q: "¿Puede manejar números mixtos (enteros con fracción)?", a: "Sí. Puedes introducir números mixtos (ej. 2 3/4) que la herramienta convierte internamente a fracciones impropias (11/4) antes de operar." }
      ]
    },
    de: {
      name: "Bruchrechner",
      seoTitle: "Bruchrechner — Brüche Addieren, Subtrahieren, Multiplizieren | HelloTools",
      seoDescription: "Führen Sie Bruchrechnungen durch und kürzen Sie das Ergebnis automatisch.",
      description: "Brüche einfach berechnen und vereinfachen.",
      quickAnswer: "Berechnet Grundrechenarten für Brüche und gibt den gekürzten Bruch aus.",
      seoHowToUse: "1. Zähler und Nenner eingeben.\n2. Rechenzeichen wählen.\n3. Ergebnis ablesen.",
      seoHowItWorks: "Nutzt den Hauptnenner zum Addieren und kürzt mit dem ggT.",
      formula: "a/b + c/d = (ad + bc) / bd",
      seoExample: "1/2 + 1/4 = 3/4.",
      faqs: [
        { q: "Welche Bruchrechenarten unterstützt dieser Bruchrechner?", a: "Er führt Addition, Subtraktion, Multiplikation und Division mit echten, unechten Brüchen und gemischten Zahlen durch und kürzt das Ergebnis vollautomatisch." },
        { q: "Wie addiert man Brüche mit unterschiedlichen Nennern?", a: "Man bringt die Brüche durch Erweitern auf den kleinsten gemeinsamen Nenner (kgV), addiert die Zähler und kürzt das Ergebnis vollständig." },
        { q: "Werden Brüche auch als Dezimalzahl und gemischter Bruch angezeigt?", a: "Ja, das Tool liefert den gekürzten Bruch, die äquivalente Dezimalzahl und bei unechten Brüchen die gemischte Schreibweise." },
        { q: "Wie lautet die Regel für die Division zweier Brüche?", a: "Man multipliziert den ersten Bruch mit dem Kehrwert des zweiten Bruchs: (a/b) : (c/d) = (a × d) / (b × c)." },
        { q: "Unterstützt der Rechner gemischte Brüche (Ganzzahl + Bruch)?", a: "Ja. Gemischte Zahlen (z. B. 1 1/2) werden automatisch in unechte Brüche (3/2) umgerechnet und berechnet." }
      ]
    },
    fr: {
      name: "Calculateur de Fractions",
      seoTitle: "Calculateur de Fractions — Addition, Multiplication | HelloTools",
      seoDescription: "Effectuez des calculs de fractions avec simplification automatique du résultat.",
      description: "Calculez et simplifiez vos fractions facilement.",
      quickAnswer: "Réalise les opérations arithmétiques sur les fractions et simplifie le résultat.",
      seoHowToUse: "1. Entrez les numérateurs et dénominateurs.\n2. Choisissez l'opération.\n3. Lisez la fraction simplifiée.",
      seoHowItWorks: "Trouve le dénominateur commun et simplifie par le PGCD.",
      formula: "a/b + c/d = (ad + bc) / bd",
      seoExample: "1/2 + 1/4 = 3/4.",
      faqs: [
        { q: "Quelles opérations sur les fractions peut-on effectuer ?", a: "Il prend en charge l'addition, la soustraction, la multiplication et la division de fractions ordinaires et de nombres mixtes avec réduction automatique." },
        { q: "Comment additionner deux fractions de dénominateurs différents ?", a: "Il faut réduire les fractions au même dénominateur commun (PPCM), additionner les numérateurs obtenus puis simplifier la fraction résultante." },
        { q: "Le résultat est-il affiché sous forme irréductible et décimale ?", a: "Oui. Le calculateur fournit la fraction simplifiée irréductible, sa valeur décimale et son écriture en fraction mixte." },
        { q: "Comment diviser une fraction par une autre fraction ?", a: "Pour diviser par une fraction, on multiplie la première par l'inverse de la seconde : (a/b) / (c/d) = (a × d) / (b × c)." },
        { q: "Prend-il en compte les nombres mixtes ?", a: "Oui, vous pouvez saisir des nombres mixtes qui sont instantanément convertis en fractions impropres pour le calcul." }
      ]
    },
    pt: {
      name: "Calculadora de Frações",
      seoTitle: "Calculadora de Frações — Somar, Subtrair e Multiplicar | HelloTools",
      seoDescription: "Faça contas com frações e obtenha o resultado simplificado automaticamente.",
      description: "Resolva operações de frações de forma simples e rápida.",
      quickAnswer: "Executa as 4 operações básicas com frações e simplifica a resposta.",
      seoHowToUse: "1. Digite o numerador e denominador das frações.\n2. Escolha a operação.\n3. Veja a fração simplificada.",
      seoHowItWorks: "Aplica o Mínimo Múltiplo Comum (MMC) e simplifica pelo MDC.",
      formula: "a/b + c/d = (ad + bc) / bd",
      seoExample: "1/2 + 1/4 = 3/4.",
      faqs: [
        { q: "Quais operações com frações a calculadora executa?", a: "Realiza adição, subtração, multiplicação e divisão de frações próprias, impróprias e números mistos, simplificando automaticamente a fração resultante." },
        { q: "Como somar frações que possuem denominadores diferentes?", a: "Encontra-se o Mínimo Múltiplo Comum (MMC) dos denominadores para igualar as bases, somam-se os novos numeradores e simplifica-se pelo MDC." },
        { q: "A resposta é apresentada na forma simplificada e em decimal?", a: "Sim. A calculadora exibe a fração irredutível, o valor decimal correspondente e a forma de número misto se aplicável." },
        { q: "Qual a regra matemática para dividir duas frações?", a: "Multiplica-se a primeira fração pelo inverso da segunda fração: (a/b) ÷ (c/d) = (a × d) / (b × c)." },
        { q: "A ferramenta aceita números mistos (inteiro com fração)?", a: "Sim. Permite inserir frações mistas (ex.: 3 1/2), transformando-as em frações impróprias (7/2) para efetuar a conta." }
      ]
    },
    ja: {
      name: "分数計算ツール",
      seoTitle: "分数計算ツール — 分数の足し算・引き算・掛け算・割り算 | HelloTools",
      seoDescription: "分子と分母を入力して、分数の四則演算と自動約分（通分・帯分数表示）を行います。",
      description: "分数の足し算・引き算・掛け算・割り算を簡単に行い、約分した結果を表示します。",
      quickAnswer: "分数の四則演算を行い、最大公約数で約分した結果を算出します。",
      seoHowToUse: "1. 分数1と分数2の分子・分母を入力します。\n2. 演算子（＋, −, ×, ÷）を選択します。\n3. 約分された計算結果を確認します。",
      seoHowItWorks: "通分して計算後、最大公約数（GCD）で約分します。",
      formula: "a/b + c/d = (ad + bc) / bd",
      seoExample: "1/2 + 1/4 = 3/4 です。",
      faqs: [
        { q: "この分数計算ツールでできる計算の種類は何ですか？", a: "分数の足し算（加算）、引き算（減算）、掛け算（乗算）、割り算（除算）、および帯分数の計算に対応し、自動で約分して表示します。" },
        { q: "分母が異なる分数同士の足し算・引き算はどう計算しますか？", a: "分母の最小公倍数（LCM）を求めて通分を行い、分子同士を加減算した後に最大公約数で約分して既約分数にします。" },
        { q: "計算結果は既約分数と小数の両方で確認できますか？", a: "はい。最もシンプルな既約分数（仮分数・帯分数）と、それに相当する小数値を同時に表示します。" },
        { q: "分数の割り算の計算ルールはどうなっていますか？", a: "「割る分数の分子と分母をひっくり返して掛ける（逆数を掛ける）」という規則に従って計算されます：(a/b) ÷ (c/d) ＝ (a×d) / (b×c)。" },
        { q: "帯分数（整数＋分数）の混ざった計算にも対応していますか？", a: "対応しています。帯分数を内部で仮分数に自動変換してから正確に計算し、結果も帯分数と仮分数の両形式で出力します。" }
      ]
    }
  },

  'average-calculator': {
    es: {
      name: "Calculadora de Promedio y Media",
      seoTitle: "Calculadora de Promedio, Media, Mediana y Moda | HelloTools",
      seoDescription: "Calcula la media aritmética, mediana, moda y rango de una serie de números.",
      description: "Obtén el promedio exacto y estadísticas básicas de tus datos.",
      quickAnswer: "Suma todos los números de un conjunto y divide el resultado entre la cantidad total de valores.",
      seoHowToUse: "1. Introduce una lista de números separados por comas o espacios.\n2. Revisa la media, mediana, moda y suma total.",
      seoHowItWorks: "Divide la suma de los valores entre la cantidad de elementos.",
      formula: "Media = Suma(X) / N",
      seoExample: "El promedio de 10, 20 y 30 es (10+20+30)/3 = 20.",
      faqs: [
        { q: "¿Qué estadísticas calcula esta calculadora de promedios?", a: "Calcula la media aritmética (promedio), la mediana, la moda, el rango, el valor mínimo, el valor máximo y la suma total de cualquier conjunto de números." },
        { q: "¿Cuál es la diferencia entre la media y la mediana?", a: "La media es la suma de todos los valores dividida entre la cantidad de elementos. La mediana es el valor central cuando los datos están ordenados, siendo insensible a valores atípicos extremos." },
        { q: "¿Cómo introduzco los datos numéricos en la calculadora?", a: "Puedes pegar o escribir tus números separados por comas, espacios o saltos de línea (ej. 12, 15, 20, 25). El cálculo es instantáneo." },
        { q: "¿Qué significa la moda en estadística?", a: "La moda es el valor o valores que se repiten con mayor frecuencia en la muestra de datos. Un conjunto puede ser unimodal, bimodal o no tener moda si ningún número se repite." },
        { q: "¿Hay límite en la cantidad de números que puedo promediar?", a: "No. Puedes procesar cientos o miles de valores numéricos de forma inmediata sin demoras en tu navegador." }
      ]
    },
    de: {
      name: "Mittelwertsrechner",
      seoTitle: "Mittelwertsrechner — Durchschnitt, Median, Modus | HelloTools",
      seoDescription: "Berechnen Sie den arithmetischen Durchschnitt, Median und Modus einer Zahlenreihe.",
      description: "Statistische Kennzahlen einfach ermitteln.",
      quickAnswer: "Berechnet den Durchschnitt (Mittelwert) einer Reihe von Zahlen.",
      seoHowToUse: "1. Zahlen kommagetrennt eingeben.\n2. Durchschnitt, Median und Summe ablesen.",
      seoHowItWorks: "Teilt die Gesamtsumme durch die Anzahl der Zahlen.",
      formula: "Durchschnitt = Summe / Anzahl",
      seoExample: "Der Durchschnitt von 10, 20 und 30 ist 20.",
      faqs: [
        { q: "Welche statistischen Kennzahlen berechnet dieser Mittelwert-Rechner?", a: "Er ermittelt das arithmetische Mittel (Durchschnitt), den Median (Zentralwert), den Modalwert (Modus), die Spannweite, Min/Max und die Gesamtsumme." },
        { q: "Was unterscheidet den Durchschnitt (Mittelwert) vom Median?", a: "Der Durchschnitt summiert alle Werte und teilt durch die Anzahl. Der Median ist der exakt mittlere Wert der sortierten Reihe und daher unempfindlich gegenüber extremen Ausreißern." },
        { q: "In welchem Format können die Zahlen eingegeben werden?", a: "Zahlen können durch Kommas, Leerzeichen oder Zeilenumbrüche getrennt eingegeben oder aus Tabellenkalkulationen (Excel) hineinkopiert werden." },
        { q: "Was drückt der Modalwert (Modus) aus?", a: "Der Modus ist der am häufigsten vorkommende Wert eines Datensatzes. Er zeigt typische Häufungspunkte in Messreihen auf." },
        { q: "Ist die Datenmenge bei der Mittelwertberechnung begrenzt?", a: "Nein, das Tool verarbeitet auch umfangreiche Datenreihen mit tausenden Werten im Bruchteil einer Sekunde." }
      ]
    },
    fr: {
      name: "Calculateur de Moyenne",
      seoTitle: "Calculateur de Moyenne, Médiane et Mode | HelloTools",
      seoDescription: "Calculez la moyenne arithmétique, la médiane et le mode d'une série de nombres.",
      description: "Obtenez la moyenne statistique de vos données.",
      quickAnswer: "Calcule la somme d'un ensemble de valeurs divisée par leur nombre total.",
      seoHowToUse: "1. Entrez vos nombres séparés par des virgules.\n2. Obtenez la moyenne et la médiane.",
      seoHowItWorks: "Divise la somme totale par l'effectif.",
      formula: "Moyenne = Somme / Effectif",
      seoExample: "La moyenne de 10, 20 et 30 est 20.",
      faqs: [
        { q: "Quels indicateurs statistiques ce calculateur fournit-il ?", a: "Il calcule la moyenne arithmétique, la médiane, le mode, l'étendue, le minimum, le maximum et la somme cumulée de votre série statistique." },
        { q: "Quelle est la différence fondamentale entre moyenne et médiane ?", a: "La moyenne est sensible aux valeurs extrêmes car elle fait la somme de tous les termes divisée par N. La médiane partage la série ordonnée en deux groupes égaux et résiste aux anomalies." },
        { q: "Comment saisir la liste des nombres à analyser ?", a: "Séparez simplement vos valeurs par des virgules, des espaces ou des retours à la ligne. Vous pouvez copier-coller directement depuis un tableur." },
        { q: "Que représente le mode d'une série statistique ?", a: "Le mode est la valeur qui apparaît le plus grand nombre de fois dans la série de données." },
        { q: "Existe-t-il une limite sur la taille du jeu de données ?", a: "Non, le script gère efficacement des centaines ou milliers de valeurs numériques instantanément dans votre navigateur." }
      ]
    },
    pt: {
      name: "Calculadora de Média",
      seoTitle: "Calculadora de Média, Mediana e Moda | HelloTools",
      seoDescription: "Calcule a média aritmética, mediana, moda e soma de um conjunto de números.",
      description: "Descubra a média exata e métricas estatísticas dos seus dados.",
      quickAnswer: "Soma todos os valores e divide pela quantidade total de elementos.",
      seoHowToUse: "1. Insira os números separados por vírgula.\n2. Veja a média, mediana e total.",
      seoHowItWorks: "Divide a soma dos números pelo total de elementos.",
      formula: "Média = Soma / Quantidade",
      seoExample: "A média de 10, 20 e 30 é (10+20+30)/3 = 20.",
      faqs: [
        { q: "Quais medidas de tendência central são calculadas nesta ferramenta?", a: "Calcula a média aritmética simples, a mediana (ponto central), a moda (valor mais frequente), a amplitude total, os valores mínimo e máximo e a somatória." },
        { q: "Qual a diferença entre a média aritmética e a mediana?", a: "A média soma todos os elementos e divide pela contagem. A mediana é o valor que divide o conjunto ordenado exatamente ao meio, imune a valores extremos distorcidos." },
        { q: "Como inserir os conjuntos de números no sistema?", a: "Basta digitar ou colar seus números separados por vírgulas, espaços ou quebras de linha direto do Excel." },
        { q: "O que indica a moda em uma amostra de dados?", a: "A moda identifica o número que apresenta maior frequência de repetição no conjunto analisado." },
        { q: "Há limite de números para calcular a média de uma vez?", a: "Não. É possível colar centenas de dados de pesquisas, notas ou medições sem qualquer travamento." }
      ]
    },
    ja: {
      name: "平均値・中央値計算ツール",
      seoTitle: "平均値・中央値・最頻値計算ツール | HelloTools",
      seoDescription: "数値データを入力するだけで、算術平均値、中央値（メディアン）、最頻値（モード）、合計値を計算します。",
      description: "複数の数値から平均値や統計指標を簡単に算出します。",
      quickAnswer: "すべての数値の合計をデータの個数で割った平均値を計算します。",
      seoHowToUse: "1. 数値をカンマやスペース区切りで入力します。\n2. 平均値、中央値、合計値を確認します。",
      seoHowItWorks: "合計値を要素数で除算して平均値を求めて表示します。",
      formula: "平均値 = 数値の合計 / データの個数",
      seoExample: "10, 20, 30 の平均値は (10+20+30)/3 = 20 です。",
      faqs: [
        { q: "この平均値計算ツールで算出できる統計指標は何ですか？", a: "相加平均（一般的な平均値）、中央値（メディアン）、最頻値（モード）、範囲（レンジ）、最大値、最小値、合計値を一括計算します。" },
        { q: "「平均値」と「中央値」の違いと使い分けは？", a: "平均値は全数値の合計を個数で割った値で外れ値（極端な大企業や富裕層の数値など）に引っ張られやすいのに対し、中央値は順に並べた中央の数値を指し実態を正確に反映します。" },
        { q: "数値データの入力形式はどうすればよいですか？", a: "カンマ、空白スペース、改行で区切って自由に入力・ペーストできます。Excelのスプレッドシート列をそのままコピー＆ペースト可能です。" },
        { q: "統計学における「最頻値（モード）」とは何ですか？", a: "データセットの中で最も出現回数の多い（重複度が高い）数値を指します。" },
        { q: "データ件数に上限はありますか？", a: "上限はありません。ブラウザの高速演算処理により、数百〜数千件の測定データであっても瞬時に平均統計を算出します。" }
      ]
    }
  },

  'word-counter': {
    es: {
      name: "Contador de Palabras y Caracteres",
      seoTitle: "Contador de Palabras y Caracteres Online | HelloTools",
      seoDescription: "Cuenta palabras, caracteres con y sin espacios, frases, párrafos y tiempo de lectura.",
      description: "Analiza la extensión de tu texto en tiempo real.",
      quickAnswer: "Cuenta instantáneamente el número de palabras y caracteres de cualquier texto.",
      seoHowToUse: "1. Pega tu texto en el recuadro.\n2. Revisa el conteo de palabras, caracteres y párrafos.",
      seoHowItWorks: "Procesa la cadena de texto separando por espacios y signos de puntuación.",
      formula: "Palabras = Conteo de bloques de texto no vacíos",
      seoExample: "El texto \"Hola mundo\" contiene 2 palabras y 10 caracteres.",
      faqs: [
        { q: "¿Cómo cuenta las palabras y caracteres este contador de texto?", a: "Analiza tu texto en tiempo real dividiéndolo por límites de espacio en blanco y signos de puntuación, desglosando palabras, caracteres con y sin espacios, oraciones y párrafos." },
        { q: "¿Incluye tiempo estimado de lectura y tiempo de locución?", a: "Sí. Estima el tiempo de lectura silenciosa sobre un promedio estándar de 200 a 250 palabras por minuto, y el tiempo de locución o discurso a 130-150 palabras por minuto." },
        { q: "¿Cuáles son los límites de palabras habituales en redes sociales y ensayos?", a: "Un tweet/post en X admite hasta 280 caracteres; los ensayos académicos universitarios suelen oscilar entre 1.000 y 3.000 palabras; y los artículos SEO optimizados entre 1.200 y 2.500 palabras." },
        { q: "¿Distingue entre caracteres con espacios y sin espacios?", a: "Sí. Ofrece métricas separadas de caracteres totales y caracteres limpios sin espacios, indispensable para traducciones y formularios oficiales." },
        { q: "¿Se envía mi texto a algún servidor o base de datos externa?", a: "No. El análisis léxico se realiza completamente en el navegador del usuario en memoria temporal, garantizando absoluta privacidad para documentos confidenciales." }
      ]
    },
    de: {
      name: "Wortzähler & Zeichenzähler",
      seoTitle: "Wortzähler Online — Wörter und Zeichen Zählen | HelloTools",
      seoDescription: "Zählen Sie Wörter, Zeichen mit/ohne Leerzeichen, Sätze und Lesezeit in Echtzeit.",
      description: "Textlänge und Zeichenanzahl sofort analysieren.",
      quickAnswer: "Zählt Wörter und Zeichen eines eingegebenen Textes in Echtzeit.",
      seoHowToUse: "1. Text in das Feld einfügen.\n2. Anzahl der Wörter und Zeichen ablesen.",
      seoHowItWorks: "Zerlegt den Text anhand von Leerzeichen in Wörter.",
      formula: "Wörter = Anzahl wortgetrennter Abschnitte",
      seoExample: "Der Satz \"Hallo Welt\" besteht aus 2 Wörtern und 10 Zeichen.",
      faqs: [
        { q: "Wie zählt dieser Wörterzähler Wörter und Zeichen genau?", a: "Er analysiert den eingegebenen Text in Echtzeit und trennt Wörter anhand von Leerzeichen und Satzzeichen, um Wortanzahl, Zeichen (mit/ohne Leerzeichen), Sätze und Absätze zu erfassen." },
        { q: "Wird die Lesezeit und Sprechzeit des Textes geschätzt?", a: "Ja, das Tool berechnet die durchschnittliche Lesezeit auf Basis von 200 bis 230 Wörtern pro Minute sowie die Vortragszeit bei rund 130 bis 150 Wörtern pro Minute." },
        { q: "Welche Zeichen- und Wortgrenzen gelten für gängige Textformate?", a: "Beiträge auf X (Twitter) fassen 280 Zeichen, Blogbeiträge für SEO zielen oft auf 1.000 bis 2.000 Wörter, wissenschaftliche Hausarbeiten auf 3.000 bis 5.000 Wörter." },
        { q: "Werden Zeichen mit und ohne Leerzeichen separat ausgewiesen?", a: "Ja, Sie sehen die genaue Zeichenzahl inklusive Leerzeichen sowie die reine Nettolänge ohne Leerzeichen auf einen Blick." },
        { q: "Wird der eingegebene Text online gespeichert oder übertragen?", a: "Nein, die Textanalyse erfolgt rein clientseitig im Browser. Vertrauliche Texte und Dokumente bleiben zu 100 % privat." }
      ]
    },
    fr: {
      name: "Compteur de Mots et Caractères",
      seoTitle: "Compteur de Mots et Caractères en Ligne | HelloTools",
      seoDescription: "Comptez les mots, caractères, phrases, paragraphes et temps de lecture de vos textes.",
      description: "Analyse la longueur de vos textes en temps réel.",
      quickAnswer: "Compte instantanément le nombre de mots et de caractères d'un texte.",
      seoHowToUse: "1. Collez votre texte dans la zone dédiée.\n2. Lisez le nombre de mots et de caractères.",
      seoHowItWorks: "Découpe la chaîne de caractères selon les espaces.",
      formula: "Mots = Nombre de mots séparés par des espaces",
      seoExample: "La phrase \"Bonjour le monde\" contient 3 mots et 16 caractères.",
      faqs: [
        { q: "Comment ce compteur dénombre-t-il les mots et les caractères ?", a: "Il analyse votre texte en temps réel en identifiant les séparateurs d'espaces et de ponctuation, affichant le nombre de mots, de signes, de phrases et de paragraphes." },
        { q: "Calcule-t-il le temps de lecture et d'élocution estimé ?", a: "Oui. Le temps de lecture est estimé sur un rythme moyen de 200 à 250 mots par minute, et le temps de parole en public sur une cadence de 130 à 150 mots par minute." },
        { q: "Quels sont les quotas de mots courants pour les écrits web ?", a: "Un message sur X est limité à 280 caractères, une méta-description SEO idéale compte entre 120 et 160 caractères, et un article de fond entre 1 000 et 2 000 mots." },
        { q: "Distingue-t-il le nombre de caractères avec et sans espaces ?", a: "Oui. Les deux compteurs sont affichés séparément, ce qui est essentiel pour la facturation des traducteurs et rédacteurs." },
        { q: "Mon texte reste-t-il confidentiel lors de l'analyse ?", a: "Oui. Aucun texte n'est envoyé sur un serveur distant : l'analyse syntaxique est opérée exclusivement en local sur votre machine." }
      ]
    },
    pt: {
      name: "Contador de Palavras e Caracteres",
      seoTitle: "Contador de Palavras e Caracteres Online | HelloTools",
      seoDescription: "Conte palavras, caracteres com e sem espaços, frases e tempo estimado de leitura.",
      description: "Analise o tamanho do seu texto em tempo real.",
      quickAnswer: "Conta o número de palavras e caracteres de qualquer texto instantaneamente.",
      seoHowToUse: "1. Cole ou digite seu texto no campo.\n2. Veja a contagem de palavras e caracteres.",
      seoHowItWorks: "Analisa a string de texto identificando separadores de palavras.",
      formula: "Palabras = Total de blocos de texto delimitados",
      seoExample: "A frase \"Olá mundo\" tem 2 palavras e 9 caracteres.",
      faqs: [
        { q: "Como este contador afere a quantidade de palavras e caracteres?", a: "O algoritmo lê o texto em tempo real dividindo os blocos por pontuação e espaços em branco, computando palavras, caracteres totais, frases e parágrafos." },
        { q: "A ferramenta calcula o tempo estimado de leitura e fala?", a: "Sim. Estima o tempo de leitura silenciosa com base na média de 200 a 250 palavras por minuto e o tempo de oratória a 130-150 palavras por minuto." },
        { q: "Quais os limites de caracteres mais comuns nas plataformas?", a: "Publicações no X (antigo Twitter) comportam até 280 caracteres; meta descriptions do Google devem ter 120 a 160 caracteres; artigos de blog recomendam 1.500 palavras." },
        { q: "É possível visualizar caracteres com e sem espaço separadamente?", a: "Sim. A ferramenta exibe ambas as métricas de forma individualizada, facilitando orçamentos de revisão e tradução textual." },
        { q: "Os textos colados na ferramenta são guardados em banco de dados?", a: "Não. Todo o processamento léxico é efetuado localmente no navegador, sem retenção de conteúdo em servidores externos." }
      ]
    },
    ja: {
      name: "文字数・単語数カウントツール",
      seoTitle: "文字数カウント・単語数カウントツール | HelloTools",
      seoDescription: "文章を入力するだけで、文字数（スペースあり/なし）、単語数、原稿用紙枚数、読了時間をカウントします。",
      description: "リアルタイムで文字数、単語数、行数、読了時間をカウントします。",
      quickAnswer: "入力された文章の文字数や単語数をリアルタイムで計測・表示します。",
      seoHowToUse: "1. テキストボックスに文章を貼り付けます。\n2. 文字数、単語数、行数を確認します。",
      seoHowItWorks: "文字列の長さおよび単語区切り文字を解析します。",
      formula: "文字数 = 全文字数の長さを取得",
      seoExample: "「こんにちは世界」は7文字です。",
      faqs: [
        { q: "文字数と単語数はどのようにカウントされますか？", a: "入力されたテキストをリアルタイムに解析し、日本語の文字数（全角・半角）、空白を含む文字数・空白なし文字数、段落数、行数を瞬時に集計します。" },
        { q: "読了時間（読むのにかかる時間）の目安は算出されますか？", a: "はい。成人の一般的な日本語読書スピードである「1分間に約400〜600文字」および英語の読字速度を基準に、推定読了時間を自動算出します。" },
        { q: "各種Web媒体や原稿用紙の標準的な文字数目安は？", a: "一般的な原稿用紙は1枚400字、X（旧Twitter）は全角140字（半角280字）、SEO記事の見出しは30字前後、Web記事本文は2,000〜5,000文字程度が目安です。" },
        { q: "空白（スペースや改行）を含めた文字数と除外した文字数は分かりますか？", a: "はい。スペース込み文字数とスペース除外文字数を別々に明確にカウント表示します。" },
        { q: "入力した文章データが外部に送信・保存されることはありますか？", a: "いいえ。すべての文字カウント処理はお使いのブラウザ内部でのみ完結し、機密文書や原稿が外部に漏洩することはありません。" }
      ]
    }
  },

  'character-counter': {
    es: {
      name: "Contador de Caracteres",
      seoTitle: "Contador de Caracteres Online (Con y Sin Espacios) | HelloTools",
      seoDescription: "Cuenta caracteres totales con y sin espacios para redes sociales y textos.",
      description: "Cuenta el número exacto de caracteres de tu texto.",
      quickAnswer: "Mide la cantidad exacta de caracteres impresos y espacios.",
      seoHowToUse: "1. Escribe o pega tu texto.\n2. Lee los caracteres totales al instante.",
      seoHowItWorks: "Mide la longitud de la cadena de texto.",
      formula: "Caracteres = Longitud de texto",
      seoExample: "El texto \"Hola\" tiene 4 caracteres.",
      faqs: [
        { q: "¿Qué mide exactamente este contador de caracteres?", a: "Mide con precisión el número de caracteres totales, caracteres sin espacios, letras, dígitos numéricos, signos de puntuación y bytes ocupados por el texto." },
        { q: "¿Cómo ayuda a cumplir los límites de caracteres en redes sociales?", a: "Permite verificar al instante si tu texto respeta los límites de Twitter/X (280 caracteres), títulos SEO de Google (50-60 caracteres) o descripciones de YouTube." },
        { q: "¿Es compatible con caracteres especiales y emojis?", a: "Sí. Cuenta adecuadamente emojis y caracteres Unicode multidigitales según las normas de codificación UTF-8 / UTF-16." },
        { q: "¿Cuál es la diferencia entre conteo de caracteres y tamaño en bytes?", a: "Los caracteres básicos ASCII ocupan 1 byte, mientras que los caracteres acentuados, letras no latinas y emojis pueden ocupar de 2 a 4 bytes cada uno." },
        { q: "¿Se guarda el texto que pego en el contador?", a: "No. El cálculo se ejecuta exclusivamente en la memoria local de tu navegador sin conexión a servidores externos." }
      ]
    },
    de: {
      name: "Zeichenzähler",
      seoTitle: "Zeichenzähler — Zeichen Mit und Ohne Leerzeichen | HelloTools",
      seoDescription: "Zählen Sie die genaue Zeichenanzahl für Social Media und Texte.",
      description: "Zeichenanzahl Ihres Textes genau bestimmen.",
      quickAnswer: "Gibt die exakte Anzahl der Zeichen eines Textes an.",
      seoHowToUse: "1. Text eingeben.\n2. Zeichenzahl ablesen.",
      seoHowItWorks: "Misst die Länge des String-Objekts.",
      formula: "Zeichen = String.length",
      seoExample: "Das Wort \"Hallo\" hat 5 Zeichen.",
      faqs: [
        { q: "Was zählt dieser Zeichenzähler im Detail?", a: "Er ermittelt die Gesamtzahl aller Zeichen, Zeichen ohne Leerzeichen, reine Buchstaben, Ziffern, Sonderzeichen und die Textgröße in Bytes." },
        { q: "Wie hilft das Tool bei Zeichenbegrenzungen im Online-Marketing?", a: "Sie können Werbetexte, Social-Media-Beiträge (z. B. LinkedIn, X) und Google Ads exakt auf die vorgegebenen Zeichenlimits abstimmen." },
        { q: "Werden Emojis und Sonderzeichen korrekt erfasst?", a: "Ja, das Tool unterstützt den vollständigen Unicode-Zeichensatz und zählt Emojis und Umlaute präzise." },
        { q: "Was ist der Unterschied zwischen Zeichenanzahl und Byte-Größe?", a: "Ein Buchstabe im ASCII-Satz belegt 1 Byte, während deutsche Umlaute und Emojis in UTF-8-Kodierung 2 bis 4 Bytes Speicherplatz beanspruchen." },
        { q: "Bleiben eingegebene Texte geschützt und vertraulich?", a: "Ja, die Zählung läuft ausschließlich lokal in Ihrem Webbrowser ab, ohne serverseitige Speicherung." }
      ]
    },
    fr: {
      name: "Compteur de Caractères",
      seoTitle: "Compteur de Caractères Gratuit en Ligne | HelloTools",
      seoDescription: "Comptez la quantité exacte de caractères avec et sans espaces.",
      description: "Mesurez le nombre exact de caractères de vos messages.",
      quickAnswer: "Compte le nombre total de lettres, chiffres, symboles et espaces.",
      seoHowToUse: "1. Collez votre texte.\n2. Consultez le nombre de caractères.",
      seoHowItWorks: "Calcule la longueur de la chaîne.",
      formula: "Caractères = Longueur de chaîne",
      seoExample: "Le mot \"Bonjour\" contient 7 caractères.",
      faqs: [
        { q: "Quelles métriques précises fournit ce compteur de caractères ?", a: "Il quantifie le total des caractères, les caractères hors espaces, les lettres alphabétiques, les chiffres, les signes de ponctuation et le poids en octets." },
        { q: "Comment vérifier le respect des limites imposées par les plateformes ?", a: "Il permet d'ajuster vos textes aux formats stricts : posts X (280 caractères), SMS (160 caractères par tranche) ou balises title SEO (60 caractères)." },
        { q: "Prend-il en charge les émojis et les caractères accentués ?", a: "Oui. L'analyse gère nativement le codage Unicode UTF-8 pour comptabiliser fidèlement les lettres accentuées et les pictogrammes." },
        { q: "Quelle est la différence entre nombre de signes et octets ?", a: "Un caractère standard pèse 1 octet, tandis qu'un caractère accentué ou un émoji occupe entre 2 et 4 octets de données." },
        { q: "Le contenu saisi est-il enregistré ou analysé à distance ?", a: "Non. Tout le traitement est exécuté localement sur votre ordinateur sans aucune transmission de données." }
      ]
    },
    pt: {
      name: "Contador de Caracteres",
      seoTitle: "Contador de Caracteres Online | HelloTools",
      seoDescription: "Contagem exata de caracteres com e sem espaços para redes sociais.",
      description: "Descubra a quantidade de caracteres do seu texto.",
      quickAnswer: "Conta todos os caracteres digitados no texto.",
      seoHowToUse: "1. Digite seu texto.\n2. Veja o total de caracteres.",
      seoHowItWorks: "Mede o comprimento total da string.",
      formula: "Caracteres = Comprimento do texto",
      seoExample: "A palavra \"Brasil\" tem 6 caracteres.",
      faqs: [
        { q: "Quais parâmetros este contador de caracteres avalia?", a: "Computa caracteres totais, caracteres líquidos sem espaços, letras, algarismos numéricos, símbolos de pontuação e tamanho em bytes." },
        { q: "Como a ferramenta auxilia no cumprimento de limites em redes sociais?", a: "Garante que sua mensagem fique dentro do limite do X/Twitter (280 caracteres), legendas de anúncio, metatags de SEO e SMS (160 caracteres)." },
        { q: "A contagem funciona perfeitamente com emojis e acentos?", a: "Sim. O sistema interpreta o padrão Unicode UTF-8 de maneira correta para palavras com acentuação e símbolos gráficos." },
        { q: "Qual a diferença técnica entre caracteres e contagem de bytes?", a: "Caracteres alfanuméricos simples pesam 1 byte, ao passo que acentos da língua portuguesa e emojis demandam de 2 a 4 bytes em codificação UTF-8." },
        { q: "Os dados digitados são armazenados no servidor da HelloTools?", a: "Não. O contador processa as métricas exclusivamente no navegador do usuário, com sigilo total de dados." }
      ]
    },
    ja: {
      name: "文字数カウントツール",
      seoTitle: "文字数カウントツール — 単純文字数計測 | HelloTools",
      seoDescription: "SNSの投稿文やSEO文章の文字数（スペースあり・なし）を瞬時に測定します。",
      description: "入力した文章の文字数を正確に計測します。",
      quickAnswer: "文字列の長さ（文字数）を正確に計算します。",
      seoHowToUse: "1. 文章を入力します。\n2. 総文字数を確認します。",
      seoHowItWorks: "JavaScriptの文字列長（length）を取得してカウントします。",
      formula: "文字数 = String.length",
      seoExample: "「テスト」は 3文字です。",
      faqs: [
        { q: "この文字数カウンターはどのような文字種別を判別しますか？", a: "総文字数、空白なし文字数、半角英数字、全角ひらがな・カタカナ・漢字、記号、改行数、バイト数（UTF-8）を個別に計測します。" },
        { q: "SNSやWeb広告の文字数制限チェックに役立ちますか？", a: "はい。X（140文字/半角280文字）、Googleリスティング広告の見出し（30文字）、メタディスクリプション（120文字前後）などの制限確認に最適です。" },
        { q: "絵文字や特殊記号の文字数カウントにも対応していますか？", a: "はい。サロゲートペアや異体字セレクタを含むUnicode絵文字も正確に判定してカウントします。" },
        { q: "「文字数」と「バイト数」の違いは何ですか？", a: "文字数は見かけの文字数、バイト数はPCが保持するデータ容量です（半角英数は1バイト、日本語の漢字やひらがなは通常3バイト、絵文字は4バイト）。" },
        { q: "コピー＆ペーストした文章が第三者に見られる心配はありませんか？", a: "ありません。すべての文字数カウントはお使いの端末のブラウザ上でローカル処理され、外部への通信は行われません。" }
      ]
    }
  },

  'password-generator': {
    es: {
      name: "Generador de Contraseñas Seguras",
      seoTitle: "Generador de Contraseñas Seguras y Aleatorias | HelloTools",
      seoDescription: "Crea contraseñas ultra seguras e indescifrables con longitud y símbolos personalizables.",
      description: "Genera claves al azar fuertes y seguras directamente en tu navegador.",
      quickAnswer: "Crea contraseñas criptográficamente seguras combinando mayúsculas, minúsculas, números y símbolos.",
      seoHowToUse: "1. Selecciona la longitud deseada (ej. 16 caracteres).\n2. Elige si incluir símbolos o números.\n3. Haz clic en Copiar.",
      seoHowItWorks: "Utiliza el motor criptográfico aleatorio del navegador (crypto.getRandomValues).",
      formula: "Entropía = Log2(Conjunto^Longitud)",
      seoExample: "Una clave de 16 caracteres con símbolos ofrece más de 95 bits de entropía.",
      faqs: [
        { q: "¿Qué nivel de seguridad y entropía ofrecen las contraseñas generadas?", a: "Genera claves con entropía criptográfica utilizando crypto.getRandomValues del navegador, produciendo contraseñas resistentes a ataques de fuerza bruta y diccionarios de hackers." },
        { q: "¿Cuál es la longitud de contraseña recomendada hoy en día?", a: "Los estándares de ciberseguridad actuales recomiendan contraseñas de al menos 16 a 20 caracteres combinando letras mayúsculas, minúsculas, números y símbolos especiales." },
        { q: "¿Se envían o guardan las contraseñas generadas en algún servidor?", a: "No. Las contraseñas se crean estrictamente en tu navegador mediante la API de Criptografía Web local. Ninguna clave viaja por internet ni queda registrada." },
        { q: "¿Permite excluir caracteres ambiguos como l, 1, I, O y 0?", a: "Sí. Puedes marcar la opción de excluir caracteres similares para evitar confusiones al transcribir claves manualmente." },
        { q: "¿Es seguro copiar la contraseña generada al portapapeles?", a: "Sí. Puedes copiar la clave con un clic directamente a tu gestor de contraseñas de confianza (1Password, Bitwarden, KeePass)." }
      ]
    },
    de: {
      name: "Passwörter-Generator",
      seoTitle: "Passwort Generator — Sichere Passwörter Erstellen | HelloTools",
      seoDescription: "Erstellen Sie hochsichere, zufällige Passwörter direkt im Browser.",
      description: "Erzeugen Sie zufällige und starke Passwörter.",
      quickAnswer: "Generiert kryptografisch sichere Zufallspasswörter im Browser.",
      seoHowToUse: "1. Länge wählen (z.B. 16 Zeichen).\n2. Zeichenarten festlegen.\n3. Passwort kopieren.",
      seoHowItWorks: "Nutzt den sicheren Zufallsgenerator des Browsers.",
      formula: "Entropie = Log2(Zeichenvorrat^Länge)",
      seoExample: "Ein 16-stelliges Passwort mit Sonderzeichen bietet höchste Sicherheit.",
      faqs: [
        { q: "Wie sicher sind die mit diesem Generator erstellten Passwörter?", a: "Sie werden über die kryptografische Web Crypto API des Browsers generiert und bieten maximale Entropie gegen Wörterbuch- und Brute-Force-Angriffe." },
        { q: "Welche Passwortlänge wird vom BSI aktuell empfohlen?", a: "Das Bundesamt für Sicherheit in der Informationstechnik (BSI) empfiehlt mindestens 12 bis 16 Zeichen bestehend aus Groß- und Kleinbuchstaben, Zahlen und Sonderzeichen." },
        { q: "Werden die Passwörter über das Internet versendet oder gespeichert?", a: "Nein, die Generierung erfolgt zu 100 % lokal auf Ihrem Endgerät. Kein Passwort verlässt jemals Ihren Browser." },
        { q: "Können leicht verwechselbare Zeichen (z. B. l, 1, I, O, 0) ausgeschlossen werden?", a: "Ja, eine Option filtert optisch ähnliche Zeichen heraus, um Ablesefehler bei manuellen Passworteingaben zu verhindern." },
        { q: "Wie sollte man die erzeugten Passwörter am besten aufbewahren?", a: "Wir empfehlen die direkte Übernahme in einen sicheren Passwort-Manager (wie Bitwarden, 1Password oder KeePass)." }
      ]
    },
    fr: {
      name: "Générateur de Mots de Passe Sécurisés",
      seoTitle: "Générateur de Mots de Passe Sécurisés en Ligne | HelloTools",
      seoDescription: "Générez des mots de passe forts et aléatoires pour sécuriser vos comptes.",
      description: "Créez des mots de passe complexes et uniques.",
      quickAnswer: "Génère des mots de passe aléatoires hautement sécurisés.",
      seoHowToUse: "1. Définissez la longueur désirée.\n2. Cochez les options de caractères.\n3. Copiez votre mot de passe.",
      seoHowItWorks: "Utilise l'API de cryptographie du navigateur.",
      formula: "Entropie = Log2(Taille ensemble^Longueur)",
      seoExample: "Un mot de passe de 16 caractères avec symboles offre une sécurité maximale.",
      faqs: [
        { q: "Quel niveau de robustesse cryptographique ce générateur garantit-il ?", a: "Il fait appel à la fonction crypto.getRandomValues de votre système, générant un niveau d'entropie élevé immunisé contre les attaques par force brute." },
        { q: "Quelle est la longueur de mot de passe recommandée par l'ANSSI ?", a: "L'ANSSI recommande des mots de passe d'au moins 15 à 16 caractères hétérogènes mêlant majuscules, minuscules, chiffres et caractères spéciaux." },
        { q: "Les mots de passe créés sont-ils transmis ou enregistrés sur vos serveurs ?", a: "Jamais. La création cryptographique est 100 % locale dans la mémoire de votre navigateur : aucun mot de passe n'est tracé." },
        { q: "Peut-on exclure les caractères ambigus (comme l, 1, I, O et 0) ?", a: "Oui, une case à cocher permet d'éliminer les caractères à risque de confusion lors d'une saisie manuelle." },
        { q: "Comment sauvegarder efficacement les clés générées ?", a: "Copiez directement la clé dans un gestionnaire de mots de passe certifié (Bitwarden, Dashlane, 1Password, KeePass)." }
      ]
    },
    pt: {
      name: "Gerador de Senhas Seguras",
      seoTitle: "Gerador de Senhas Seguras e Fortes | HelloTools",
      seoDescription: "Crie senhas aleatórias e fortes com maiúsculas, números e símbolos.",
      description: "Gere senhas seguras e aleatórias no seu navegador.",
      quickAnswer: "Gera senhas criptograficamente seguras para proteger suas contas.",
      seoHowToUse: "1. Escolha o tamanho da senha (ex: 16 caracteres).\n2. Marque incluir símbolos e números.\n3. Copie a senha.",
      seoHowItWorks: "Utiliza o gerador aleatório seguro do próprio navegador.",
      formula: "Entropia = Log2(Conjunto^Tamanho)",
      seoExample: "Uma senha de 16 caracteres com símbolos garante alta proteção.",
      faqs: [
        { q: "Qual o nível de segurança das senhas geradas pela ferramenta?", a: "A ferramenta utiliza a API Web Crypto nativa do sistema operacional, gerando sequências de alta entropia resistentes a ataques automatizados de força bruta." },
        { q: "Qual o comprimento ideal de senha recomendado por especialistas?", a: "Recomenda-se um tamanho mínimo de 16 a 20 caracteres alfanuméricos mesclando maiúsculas, minúsculas, números e caracteres especiais." },
        { q: "As senhas geradas são enviadas para algum servidor?", a: "Não. O algoritmo roda exclusivamente no navegador do seu dispositivo. Nenhuma senha trafega pela internet ou fica armazenada." },
        { q: "É possível excluir caracteres semelhantes que causam confusão visual?", a: "Sim. A opção de remover caracteres ambíguos (como 1, l, I, 0, O) facilita a leitura e digitação manual sem perder segurança." },
        { q: "Como armazenar a senha de forma protegida?", a: "Copie a senha com um clique diretamente para o cofre do seu gerenciador de senhas predileto (ex.: Bitwarden, 1Password)." }
      ]
    },
    ja: {
      name: "パスワード自動生成ツール",
      seoTitle: "安全なパスワード自動生成ツール | HelloTools",
      seoDescription: "文字数や使用文字（英大文字・小文字・数字・記号）を指定して強力なパスワードを自動生成します。",
      description: "セキュリティの高いランダムパスワードを即座に生成します。",
      quickAnswer: "暗号学的に安全な乱数を用いて強力なランダムパスワードを生成します。",
      seoHowToUse: "1. パスワードの文字数（桁数）を指定します。\n2. 記号や数字の有無を選択します。\n3. 「コピー」をクリックして利用します。",
      seoHowItWorks: "ブラウザの安全な乱数API (crypto.getRandomValues) を使用します。",
      formula: "エントロピー = Log2(文字種数^桁数)",
      seoExample: "16桁（記号あり）のパスワードは極めて高い安全性を誇ります。",
      faqs: [
        { q: "生成されるパスワードの安全性（暗号学的強度）はどの程度ですか？", a: "ブラウザ標準の暗号論的疑似乱数生成器（crypto.getRandomValues）を使用しており、辞書攻撃や総当たり攻撃（ブルートフォース攻撃）に極めて強い高エントロピーなパスワードを生成します。" },
        { q: "現在推奨される安全なパスワードの文字数は何桁ですか？", a: "情報処理推進機構（IPA）や主要セキュリティ標準では、英大文字・小文字・数字・記号を組み合わせた「16〜20文字以上」の長さが推奨されています。" },
        { q: "生成されたパスワードがサーバーに記録・送信される危険性はありますか？", a: "一切ありません。パスワード生成ロジックは100%端末側のブラウザ内部でのみ実行され、外部通信は完全にゼロです。" },
        { q: "見分けにくい文字（小文字のl、数字の1、大文字のI、数字の0、大文字のOなど）を除外できますか？", a: "はい。「類似文字を除外」オプションにより、手入力時の見間違い・打ち間違いを防ぐ文字構成に設定できます。" },
        { q: "生成したパスワードの安全な保管方法は？", a: "1PasswordやBitwarden、KeePassなどの信頼できる専用パスワードマネージャーに直接保存することを推奨します。" }
      ]
    }
  },

  'password-strength-checker': {
    es: {
      name: "Medidor de Fuerza de Contraseña",
      seoTitle: "Medidor de Fuerza y Seguridad de Contraseñas | HelloTools",
      seoDescription: "Comprueba la fuerza, entropía en bits y tiempo estimado para descifrar tu clave.",
      description: "Evalúa la seguridad de tus contraseñas antes de usarlas.",
      quickAnswer: "Mide la robustez de una contraseña calculando su entropía matemática.",
      seoHowToUse: "1. Escribe la contraseña a evaluar.\n2. Revisa el nivel de seguridad y tiempo de descifrado.",
      seoHowItWorks: "Calcula el espacio de búsqueda y combinaciones posibles.",
      formula: "Entropía (bits) = Longitud * Log2(Variedad de Caracteres)",
      seoExample: "Una clave con 12 letras y números requiere años para ser descifrada por fuerza bruta.",
      faqs: [
        { q: "¿Cómo evalúa este comprobador la fortaleza de una contraseña?", a: "Analiza la entropía en bits, la longitud del texto, la variedad de conjuntos de caracteres y la ausencia de patrones previsibles o palabras de diccionario comunes." },
        { q: "¿Qué es la entropía de una contraseña y cómo se mide en bits?", a: "La entropía mide la imprevisibilidad matemática de la clave: 60 bits se consideran aceptables, 80 bits ofrecen buena seguridad y más de 100 bits brindan protección prácticamente inviolable." },
        { q: "¿Qué tiempo tardaría un ordenador atacante en descifrar mi clave?", a: "La herramienta calcula el tiempo estimado de descifrado frente a superordenadores y equipos de minería que prueban miles de millones de combinaciones por segundo." },
        { q: "¿Es seguro escribir mi contraseña real en este comprobador?", a: "Sí, porque el código de análisis corre 100% en tu navegador y no realiza llamadas de red ni guarda registros de lo que escribes." },
        { q: "¿Cuáles son los fallos más habituales en contraseñas vulnerables?", a: "Tener menos de 10 caracteres, usar secuencias de teclado (\"123456\", \"qwerty\"), fechas de nacimiento o nombres propios comunes sin símbolos." }
      ]
    },
    de: {
      name: "Passwort-Stärke-Prüfer",
      seoTitle: "Passwort-Stärke Prüfen — Wie Sicher Ist Mein Passwort? | HelloTools",
      seoDescription: "Testen Sie die Sicherheit, Entropie und Knackzeit Ihres Passworts.",
      description: "Bewerten Sie die Stärke Ihres Passworts in Echtzeit.",
      quickAnswer: "Misst die mathematische Sicherheit und Knackdauer eines Passworts.",
      seoHowToUse: "1. Passwort eingeben.\n2. Sicherheitsstufe und Knackzeit prüfen.",
      seoHowItWorks: "Berechnet Entropie basierend auf Zeichenvielfalt.",
      formula: "Entropie = Länge * Log2(Zeichenumfang)",
      seoExample: "Ein 12-stelliges komplexes Passwort benötigt Jahre zum Knacken.",
      faqs: [
        { q: "Wie beurteilt dieser Passwort-Tester die Sicherheit eines Passworts?", a: "Er ermittelt die Informationsentropie in Bits, prüft Zeichenlänge, Vielfalt des Zeichensatzes und gleicht typische Muster und Wörterbuchbegriffe ab." },
        { q: "Was bedeutet die Entropie eines Passworts in Bits?", a: "Die Entropie beziffert die Unvorhersehbarkeit: Ab 60 Bits gilt ein Passwort als widerstandsfähig, ab 80 Bits als sehr sicher und über 100 Bits als unknackbar." },
        { q: "Wie berechnet das Tool die geschätzte Knackzeit (Crack Time)?", a: "Es simuliert die Berechnungsleistung moderner Hashcat-Cluster mit Milliarden Hashversuchen pro Sekunde bei Offline-Angriffen." },
        { q: "Ist es sicher, reale Passwörter in dieses Online-Tool einzugeben?", a: "Ja, die gesamte Entropie-Analyse wird isoliert in Ihrem Browser per JavaScript durchgeführt, ohne dass Daten übertragen werden." },
        { q: "Was sind die häufigsten Sicherheitsrisiken bei schwachen Passwörtern?", a: "Zu kurze Passwörter (unter 12 Zeichen), vorhersehbare Tastenmuster (\"qwertz\") oder persönliche Datumsangaben." }
      ]
    },
    fr: {
      name: "Testeur de Force de Mot de Passe",
      seoTitle: "Testeur de Force de Mot de Passe en Ligne | HelloTools",
      seoDescription: "Testez la robustesse, l'entropie et le temps de piratage de votre mot de passe.",
      description: "Évaluez la résistance de vos mots de passe aux attaques.",
      quickAnswer: "Mesure la sécurité d'un mot de passe en analysant sa complexité.",
      seoHowToUse: "1. Saisissez votre mot de passe.\n2. Consultez le temps de piratage estimé.",
      seoHowItWorks: "Calcule l'entropie en bits selon la variété de caractères.",
      formula: "Entropie = Longueur * Log2(Jeu de caractères)",
      seoExample: "Un mot de passe de 12 caractères complexes demande des années à être percé.",
      faqs: [
        { q: "Comment cet outil évalue-t-il la sécurité d'un mot de passe ?", a: "Il calcule l'entropie en bits, examine la diversité des caractères (minuscules, majuscules, chiffres, symboles) et détecte les motifs récurrents." },
        { q: "Que signifie l'entropie en bits d'un mot de passe ?", a: "L'entropie mesure le niveau d'aléa mathématique : 60 bits offrent une sécurité moyenne, 80 bits un niveau robuste et 100 bits une résistance militaire." },
        { q: "Comment est estimé le temps nécessaire pour craquer le mot de passe ?", a: "Le simulateur calcule le temps requis pour une attaque par dictionnaire et force brute menée par des clusters de cartes graphiques (GPU)." },
        { q: "Puis-je tester mon vrai mot de passe sans risque pour ma sécurité ?", a: "Oui, car l'analyse de robustesse est exécutée exclusivement en local sur votre poste : aucun mot de passe n'est envoyé sur Internet." },
        { q: "Quels sont les pièges les plus fréquents des mots de passe faibles ?", a: "L'utilisation de mots du dictionnaire, de dates de naissance, de suites de chiffres (\"123456\") ou une longueur inférieure à 12 caractères." }
      ]
    },
    pt: {
      name: "Verificador de Força de Senha",
      seoTitle: "Verificador de Força de Senha | HelloTools",
      seoDescription: "Verifique a segurança, entropia e tempo necessário para quebrar sua senha.",
      description: "Avalie o nível de segurança da sua senha instantaneamente.",
      quickAnswer: "Avalia a força de uma senha calculando sua entropia em bits.",
      seoHowToUse: "1. Digite a senha que deseja testar.\n2. Confira o tempo estimado de quebra por força bruta.",
      seoHowItWorks: "Calcula as combinações possíveis baseadas no tamanho e tipos de caracteres.",
      formula: "Entropia = Tamanho * Log2(Variedade)",
      seoExample: "Senhas longas com mistura de caracteres levariam anos para serem descobertas.",
      faqs: [
        { q: "Como este medidor classifica a força de uma senha?", a: "Analisa a entropia em bits, o tamanho total da sequência, a mescla de caracteres e a ausência de padrões previsíveis ou palavras do dicionário." },
        { q: "O que representa a entropia em bits na segurança de senhas?", a: "Mede o grau de imprevisibilidade: 60 bits é razoável, 80 bits é muito seguro e acima de 100 bits é considerado praticamente indecifrável." },
        { q: "Como a ferramenta calcula o tempo estimado para quebrar a senha?", a: "Calcula o tempo necessário para ataques de força bruta com computadores potentes testando bilhões de combinações por segundo." },
        { q: "É seguro digitar minha senha pessoal neste verificador?", a: "Sim. A análise de força ocorre unicamente no seu navegador, sem envio de pacotes de dados pela internet." },
        { q: "Quais erros tornam uma senha vulnerável a invasões?", a: "Comprimento curto (menos de 12 dígitos), sequências óbvias de teclado (\"123456\", \"qwerty\") e dados biográficos previsíveis." }
      ]
    },
    ja: {
      name: "パスワード強度判定ツール",
      seoTitle: "パスワード強度判定・安全性チェッカー | HelloTools",
      seoDescription: "パスワードの安全度、エントロピー（bits）、解読に必要な推定時間をリアルタイムで判定します。",
      description: "パスワードのセキュリティ強度や推定解読時間を診断します。",
      quickAnswer: "文字種と桁数から計算される数学的エントロピーに基づき安全度を試算します。",
      seoHowToUse: "1. テストしたいパスワードを入力します。\n2. 強度ランクと推定解読時間を確認します。",
      seoHowItWorks: "組み合わせの総数を計算してエントロピー値を出力します。",
      formula: "エントロピー = 桁数 * Log2(使用文字種数)",
      seoExample: "英数記号を含む12桁以上のパスワードは解析に数年以上かかります。",
      faqs: [
        { q: "このパスワード強度チェッカーはどのような基準で安全性を評価しますか？", a: "文字数、文字種別（大文字・小文字・数字・記号）の組み合わせ、辞書単語やキーボード配列パターンの有無から、暗号学的エントロピー（bit数）を算出して評価します。" },
        { q: "パスワードのエントロピー（bit数）とは何ですか？", a: "パスワードの予測不可能性を示す指標です。60ビット以上で実用レベル、80ビット以上で極めて強固、100ビット以上で総当たり攻撃に対して突破不可能とみなされます。" },
        { q: "パスワード解読にかかる推定時間はどのように計算されますか？", a: "最新の専用コンピュータ（GPUクラスタ）が毎秒数百億回のハッシュ試行を行うオフラインブルートフォース攻撃を想定して算出されます。" },
        { q: "実際のパスワードを入力しても情報漏洩の心配はありませんか？", a: "ありません。すべての安全性判定アルゴリズムはお使いのブラウザ上でローカル動作し、入力した文字列がネットワークを介して送信されることはありません。" },
        { q: "破られやすい脆弱なパスワードの典型的な特徴は？", a: "10文字未満の短い長さ、「123456」「password」のような推測容易な文字列、誕生日や記念日などの個人情報の使用が挙げられます。" }
      ]
    }
  },

  'json-formatter': {
    es: {
      name: "Formateador y Validador JSON",
      seoTitle: "Formateador y Validador JSON Online | HelloTools",
      seoDescription: "Formatea, embellece, valida y minifica código JSON con resaltado de sintaxis.",
      description: "Embellece y valida estructuras de código JSON fácilmente.",
      quickAnswer: "Valida la sintaxis de archivos JSON y les aplica sangría limpia para facilitar su lectura.",
      seoHowToUse: "1. Pega tu código JSON.\n2. Haz clic en Formatear o Minificar.\n3. Copia el resultado validado.",
      seoHowItWorks: "Utiliza el analizador sintáctico JSON nativo (JSON.parse / JSON.stringify).",
      formula: "Formato = JSON.stringify(JSON.parse(input), null, 2)",
      seoExample: "Transforma {\"a\":1} en una estructura jerárquica con sangría legible.",
      faqs: [
        { q: "¿Qué hace este formateador y validador de JSON?", a: "Analiza tu código JSON sin formato o minificado y lo estructura con sangría adecuada (2 o 4 espacios), saltos de línea y resaltado sintáctico, validando que no contenga errores." },
        { q: "¿Detecta y señala la posición exacta de errores de sintaxis?", a: "Sí. Si el JSON contiene errores como comas finales sobrantes, claves sin comillas o corchetes desparejados, resalta la línea y el carácter exacto del error." },
        { q: "¿Admite archivos JSON de gran tamaño o estructuras anidadas profundas?", a: "Sí. Procesa estructuras complejas y de varios megabytes en la memoria de tu navegador de forma fluida y sin colapsar." },
        { q: "¿Permite minificar o compactar el JSON para APIs?", a: "Sí. Además de embellecerlo, puedes minificar el JSON con un clic para eliminar espacios y saltos de línea superfluos, reduciendo el peso de las cargas útiles HTTP." },
        { q: "¿Se envía mi estructura JSON a algún servidor externo?", a: "No. El análisis y formateo de JSON se ejecuta al 100% en tu navegador con JSON.parse nativo, garantizando la privacidad de tus datos de desarrollo." }
      ]
    },
    de: {
      name: "JSON Formatter & Validator",
      seoTitle: "JSON Formatter & Validator — JSON Verschönern | HelloTools",
      seoDescription: "Formatieren, validieren und minimieren Sie JSON-Code direkt im Browser.",
      description: "JSON-Code schnell formatieren und auf Fehler prüfen.",
      quickAnswer: "Prüft JSON auf Syntaxfehler und bringt es in eine lesbare Form.",
      seoHowToUse: "1. JSON-Code einfügen.\n2. Auf Formatieren klicken.\n3. Formatiertes JSON kopieren.",
      seoHowItWorks: "Nutzt den nativen Parser JSON.parse & JSON.stringify.",
      formula: "Output = JSON.stringify(data, null, 2)",
      seoExample: "Macht unübersichtlichen JSON-Text sofort sauber lesbar.",
      faqs: [
        { q: "Welche Funktionen bietet dieser JSON-Formatierer und Validator?", a: "Er formatiert unübersichtlichen oder minifizierten JSON-Code mit sauberer Einrückung (2 oder 4 Leerzeichen) und prüft die Syntax auf Validität." },
        { q: "Zeigt das Tool Syntaxfehler mit Zeilen- und Spaltennummer an?", a: "Ja, bei fehlenden Anführungszeichen, überflüssigen Kommas oder ungeschlossenen Klammern markiert das Tool die exakte Fehlerstelle mit hilfreicher Meldung." },
        { q: "Können auch große oder tief verschachtelte JSON-Objekte verarbeitet werden?", a: "Ja, moderne Browser-Engines parsen auch mehrteilige Datenmengen mit mehreren Megabytes verzögerungsfrei im Arbeitsspeicher." },
        { q: "Unterstützt das Tool die Minifizierung von JSON für Schnittstellen (APIs)?", a: "Ja, Sie können zwischen formatierter Schönschrift (Pretty Print) und komprimierter Minifizierung ohne Leerzeichen wählen." },
        { q: "Werden sensible JSON-Daten auf fremde Server hochgeladen?", a: "Nein, das Parsen geschieht ausschließlich clientseitig in Ihrem Browser. API-Payloads und Testdaten bleiben vollständig vertraulich." }
      ]
    },
    fr: {
      name: "Formateur et Validateur JSON",
      seoTitle: "Formateur et Validateur JSON en Ligne | HelloTools",
      seoDescription: "Formatez, embellissez, validez et minifiez votre code JSON instantanément.",
      description: "Rendez votre code JSON lisible et valide.",
      quickAnswer: "Vérifie la syntaxe JSON et applique l'indentation.",
      seoHowToUse: "1. Collez votre code JSON.\n2. Cliquez sur Formater.\n3. Copiez le résultat.",
      seoHowItWorks: "Analyse la structure via l'API JSON native du navigateur.",
      formula: "Sortie = JSON.stringify(JSON.parse(code), null, 2)",
      seoExample: "Transforme du JSON brut en code propre et indenté.",
      faqs: [
        { q: "À quoi sert ce formateur et validateur JSON en ligne ?", a: "Il prend en charge votre code JSON brut ou minifié pour le restructurer avec indentation propre (2 ou 4 espaces), sauts de ligne et vérification stricte de validité." },
        { q: "Localise-t-il les erreurs de syntaxe dans le document ?", a: "Oui. En cas de virgule résiduelle, de guillemets manquants ou d'accolades orphelines, l'outil pointe directement la ligne et la colonne fautive." },
        { q: "Peut-il traiter des fichiers volumineux et des arborescences profondes ?", a: "Oui, l'interpréteur JavaScript local gère des flux de plusieurs mégaoctets avec une grande fluidité." },
        { q: "Permet-il de minifier le code JSON pour les échanges API ?", a: "Oui. Vous pouvez basculer d'un clic entre l'affichage aéré lisible (beautify) et la version compacte minifiée sans espaces." },
        { q: "Mes données JSON sont-elles envoyées sur un serveur distant ?", a: "Non, aucune requête réseau n'est émise : la conformité JSON est validée dans votre navigateur." }
      ]
    },
    pt: {
      name: "Formatador e Validador JSON",
      seoTitle: "Formatador e Validador JSON Online | HelloTools",
      seoDescription: "Formate, idente, valide e minifique códigos JSON no seu navegador.",
      description: "Embora e valide estruturas de código JSON facilmente.",
      quickAnswer: "Valida a sintaxe JSON e aplica a identação adequada.",
      seoHowToUse: "1. Cole seu código JSON.\n2. Clique em Formatar ou Minificar.\n3. Copie o resultado.",
      seoHowItWorks: "Processa a estrutura usando JSON.parse nativo.",
      formula: "JSON Formatado = JSON.stringify(data, null, 2)",
      seoExample: "Converte JSON compacto em um texto organizado e legível.",
      faqs: [
        { q: "O que faz este formatador e validador de JSON?", a: "Estrutura arquivos JSON brutos com indentação legível (2 ou 4 espaços), quebras de linha corretas e checagem de erros de sintaxe em tempo real." },
        { q: "A ferramenta indica onde estão os erros de sintaxe do JSON?", a: "Sim. Aponta com precisão a linha e coluna exatas de vírgulas sobrando, chaves abertas ou aspas ausentes nas propriedades." },
        { q: "Suporta objetos JSON pesados e com múltiplos níveis aninhados?", a: "Sim. A ferramenta processa estruturas complexas de dados de vários megabytes diretamente na memória do navegador." },
        { q: "É possível minificar o código JSON para otimizar payloads de APIs?", a: "Sim. Com um único clique você pode minificar o JSON, removendo espaços e quebras de linha para reduzir o tráfego de rede." },
        { q: "Meus dados e credenciais em JSON são enviados para terceiros?", a: "Não. O processamento é realizado integralmente no navegador do usuário sem tráfego de dados para servidores." }
      ]
    },
    ja: {
      name: "JSON整形・バリデーター",
      seoTitle: "JSON整形・バリデーター（インデント・軽量化） | HelloTools",
      seoDescription: "JSONコードの整形（インデント付与）、構文エラーチェック（バリデーション）、圧縮（ミニファイ）を行います。",
      description: "JSONコードの整形、構文エラーチェック、軽量化を瞬時に行います。",
      quickAnswer: "JSONコードの構文チェックを行い、読みやすいインデント形式に整形します。",
      seoHowToUse: "1. JSONコードを貼り付けます。\n2. 「整形」または「圧縮」をクリックします。\n3. 整形されたコードをコピーします。",
      seoHowItWorks: "ブラウザの標準機能 (JSON.parse / JSON.stringify) を用いて処理します。",
      formula: "JSON整形 = JSON.stringify(JSON.parse(text), null, 2)",
      seoExample: "1行のつぶれたJSONコードを見やすいツリー状に成形します。",
      faqs: [
        { q: "このJSON整形・検証（バリデーター）ツールの主な機能は？", a: "改行のない圧縮JSONや崩れたコードを、2スペースまたは4スペースの適切なインデントで美しく整形（Pretty Print）し、構文エラーがないかを即時に検証します。" },
        { q: "JSONの構文エラー（シンタックスエラー）の発生箇所を特定できますか？", a: "はい。末尾の余計なカンマ、ダブルクォーテーションの欠落、カッコの不一致などの構文エラーを行番号と文字位置でハイライト表示します。" },
        { q: "大容量のJSONファイルや深いネスト（階層構造）にも対応していますか？", a: "はい。数メガバイト規模の大きなJSONデータであっても、ブラウザのネイティブJSONパーサーにより高速に処理できます。" },
        { q: "API通信のペイロード削減用にJSONをミニファイ（圧縮）できますか？", a: "はい。不要なスペースや改行をすべて除去して最小バイト数にする「Minify（最小化）」機能も備えています。" },
        { q: "入力したJSONデータが外部サーバーに送信されることはありますか？", a: "一切ありません。すべてのパースおよび整形処理はお使いのブラウザ内部でのみ実行されるため、APIの秘匿情報や顧客データも安全に扱えます。" }
      ]
    }
  },

  'qr-code-generator': {
    es: {
      name: "Generador de Códigos QR",
      seoTitle: "Generador de Códigos QR Gratuito | HelloTools",
      seoDescription: "Crea códigos QR personalizados para páginas web, texto y Wi-Fi en formato imagen.",
      description: "Genera códigos QR de alta resolución para descargar gratis.",
      quickAnswer: "Convierte enlaces o textos en códigos QR escaneables por móviles.",
      seoHowToUse: "1. Escribe la URL o texto a convertir.\n2. Ajusta el tamaño deseado.\n3. Descarga la imagen en PNG.",
      seoHowItWorks: "Codifica los caracteres en una matriz gráfica bidimensional de datos.",
      formula: "Matriz QR = Codificación de texto a imagen vectorizada",
      seoExample: "Convierte https://hellotools.net en un código QR listo para imprimir.",
      faqs: [
        { q: "¿Qué tipos de datos puedo codificar en un código QR?", a: "Puedes codificar enlaces web (URLs), texto libre, credenciales de redes Wi-Fi (WPA/WPA2), direcciones de correo electrónico, números de teléfono y tarjetas de contacto (vCard)." },
        { q: "¿Tienen fecha de caducidad los códigos QR generados?", a: "No. Son códigos QR estáticos estándar que contienen la información codificada directamente en la matriz de puntos, por lo que nunca caducan." },
        { q: "¿Qué nivel de corrección de errores (ECC) es recomendable?", a: "El nivel medio (M - 15%) es óptimo para pantallas. Si vas a imprimir el código en soportes rugosos o colocar un logotipo en el centro, se recomienda nivel alto (H - 30%)." },
        { q: "¿Puedo descargar el código QR en alta resolución?", a: "Sí. Puedes exportar el código en formato PNG de alta resolución o gráficos vectoriales escalables SVG listos para imprenta." },
        { q: "¿Contienen publicidad o redirecciones de terceros los códigos?", a: "No. El código QR apunta de forma directa y limpia al contenido que tú escribas, sin intermediarios ni pantallas de publicidad." }
      ]
    },
    de: {
      name: "QR-Code Generator",
      seoTitle: "Kostenloser QR-Code Generator | HelloTools",
      seoDescription: "Erstellen Sie hochauflösende QR-Codes für URLs, Texte und Kontaktdaten.",
      description: "QR-Codes einfach erstellen und als Bild herunterladen.",
      quickAnswer: "Wandelt Links oder Texte in scannbare QR-Codes um.",
      seoHowToUse: "1. URL oder Text eingeben.\n2. Größe anpassen.\n3. QR-Code herunterladen.",
      seoHowItWorks: "Kodiert Daten in eine zweidimensionale Matrix.",
      formula: "QR-Matrix = Datenmatrix-Generierung",
      seoExample: "Erzeugt aus einer Web-Adresse einen sofort scanbaren QR-Code.",
      faqs: [
        { q: "Welche Inhalte lassen sich in den QR-Code einbetten?", a: "Sie können Web-URLs, Freitext, WLAN-Zugangsdaten (SSID & Passwort), Telefonnummern, E-Mails und digitale Visitenkarten (vCard) codieren." },
        { q: "Haben die erstellten QR-Codes ein Ablaufdatum?", a: "Nein, es handelt sich um statische QR-Codes, bei denen die Information direkt im Punktmuster verankert ist. Sie sind zeitlich unbegrenzt gültig." },
        { q: "Welche Fehlerkorrekturstufe (ECC) sollte man wählen?", a: "Für Webseiten reicht Stufe M (15 % Redundanz). Für Drucksachen oder Plakate empfiehlt sich Stufe H (30 %), damit der Code auch bei Beschädigung lesbar bleibt." },
        { q: "In welchen Dateiformaten kann der QR-Code heruntergeladen werden?", a: "Sie können den Code als hochauflösende PNG-Grafik oder als verlustfrei skalierbare Vektordatei (SVG) für Printmedien herunterladen." },
        { q: "Gibt es Werbeeinblendungen oder Weiterleitungen über fremde Server?", a: "Nein. Der Code verlinkt direkt auf Ihr Ziel ohne Umwege über Tracking-Server oder Drittanbieter." }
      ]
    },
    fr: {
      name: "Générateur de Code QR",
      seoTitle: "Générateur de Code QR Gratuit en Ligne | HelloTools",
      seoDescription: "Créez des codes QR personnalisés pour sites web et textes à télécharger.",
      description: "Créez des codes QR haute résolution gratuitement.",
      quickAnswer: "Transforme une URL ou un texte en image QR scannable.",
      seoHowToUse: "1. Saisissez votre texte ou lien.\n2. Personnalisez l'affichage.\n3. Téléchargez l'image.",
      seoHowItWorks: "Encode l'information dans une matrice de points bidimensionnelle.",
      formula: "Image QR = Encodage matriciel 2D",
      seoExample: "Génère un code QR pour partager votre site internet facilement.",
      faqs: [
        { q: "Quels contenus peut-on encoder dans ces codes QR ?", a: "Vous pouvez coder des liens web (URL), du texte brut, des identifiants Wi-Fi sécurisés, des numéros de téléphone, des courriels et des fiches contacts (vCard)." },
        { q: "Ces codes QR ont-ils une durée de validité limitée ?", a: "Non. Ce sont des QR codes statiques dans lesquels les données sont directement gravées dans la matrice, sans aucune date d'expiration." },
        { q: "Quel niveau de correction d'erreur (ECC) choisir ?", a: "Le niveau M (15 %) est adapté à la plupart des usages d'écran. Le niveau H (30 %) est conseillé pour les impressions papier susceptibles de subir des rayures." },
        { q: "Quels sont les formats de téléchargement disponibles ?", a: "Vous pouvez télécharger votre QR code en image PNG haute définition ou en format vectoriel SVG sans perte pour l'imprimerie." },
        { q: "Les codes contiennent-ils des redirections publicitaires ?", a: "Non. Vos codes pointent directement et fidèlement vers votre destination sans passer par des serveurs intermédiaires." }
      ]
    },
    pt: {
      name: "Gerador de Código QR",
      seoTitle: "Gerador de Código QR Gratuito | HelloTools",
      seoDescription: "Crie códigos QR para links, textos e contatos prontos para baixar em PNG.",
      description: "Gere códigos QR de alta resolução gratuitamente.",
      quickAnswer: "Converte URLs ou textos em imagens de código QR escaneáveis.",
      seoHowToUse: "1. Digite a URL ou o texto desejado.\n2. Escolha o tamanho.\n3. Baixe a imagem gerada.",
      seoHowItWorks: "Codifica a informação em uma matriz de pontos bidimensional.",
      formula: "Código QR = Matriz bidimensional de dados",
      seoExample: "Crie um código QR para acessar seu site diretamente pela câmera do celular.",
      faqs: [
        { q: "Quais tipos de informações podem ser inseridas no QR Code?", a: "É possível codificar links de sites (URLs), textos comuns, senhas de redes Wi-Fi, endereços de email, números de telefone e cartões de contato virtuais (vCard)." },
        { q: "Os códigos QR gerados expiram com o tempo?", a: "Não. São QR Codes estáticos em que o conteúdo fica gravado diretamente no desenho dos pixels, possuindo validade permanente." },
        { q: "Qual nível de correção de erro (ECC) deve ser configurado?", a: "O nível M (15% de redundância) atende a maioria das aplicações. Para impressos em materiais físicos ou panfletos, escolha o nível H (30%)." },
        { q: "Em quais formatos de imagem posso baixar o QR Code?", a: "É possível fazer o download em imagem PNG de alta resolução para web ou em vetor SVG para materiais gráficos impressos." },
        { q: "Existe intermediação de anúncios ou redirecionamentos?", a: "Não. O QR Code gerado é limpo e direto, apontando exclusivamente para o destino que você cadastrou." }
      ]
    },
    ja: {
      name: "QRコード作成ツール",
      seoTitle: "無料QRコード作成・自動生成ツール | HelloTools",
      seoDescription: "ウェブサイトのURLやテキストから、高画質なQRコード画像を即座に作成・ダウンロードできます。",
      description: "URLやテキストを埋め込んだQRコード画像を瞬時に生成します。",
      quickAnswer: "テキストやURLをスマートフォンで読み取り可能な2次元バーコード（QRコード）に変換します。",
      seoHowToUse: "1. QRコードにしたいURLやテキストを入力します。\n2. サイズを指定します。\n3. 「ダウンロード」をクリックして保存します。",
      seoHowItWorks: "入力データを2次元シンボルのドットパターンにエンコードします。",
      formula: "QRコード = 2次元コードマトリックス生成",
      seoExample: "https://hellotools.net のリンクを印刷用QR画像に変換できます。",
      faqs: [
        { q: "QRコードジェネレーターでどのようなデータをQRコード化できますか？", a: "WebサイトのURL、プレーンテキスト、Wi-Fi自動接続情報（SSID/パスワード）、メールアドレス、電話番号、電子名刺（vCard）などをコード化できます。" },
        { q: "生成されたQRコードに有効期限はありますか？有料化されますか？", a: "期限はありません。データそのものがマトリックス構造に直接記録される「静的QRコード」のため、永久に無料で読み取り可能です。" },
        { q: "誤り訂正レベル（エラー訂正率）はどれを選べばよいですか？", a: "通常の画面表示や名刺ならレベルM（約15%補正）で十分です。屋外ポスターや汚損が予想される印刷物にはレベルH（約30%補正）が推奨されます。" },
        { q: "どのような画像フォーマットでダウンロードできますか？", a: "高解像度のPNG画像形式や、拡大印刷しても画質が劣化しないベクター形式（SVG）でダウンロード可能です。" },
        { q: "広告リンクや第三者サーバーへのリダイレクトは入りますか？", a: "一切入りません。入力したURLや文字列へダイレクトに読み取れる純粋なQRコードが生成されます。" }
      ]
    }
  },

  'base64-converter': {
    es: {
      name: "Codificador y Decodificador Base64",
      seoTitle: "Codificador y Decodificador Base64 Online | HelloTools",
      seoDescription: "Convierte texto normal a codificación Base64 y decodifica cadenas Base64 al instante.",
      description: "Codifica y decodifica texto en formato Base64.",
      quickAnswer: "Transforma texto en formato de codificación Base64 y viceversa.",
      seoHowToUse: "1. Pega tu texto o cadena Base64.\n2. Selecciona Codificar o Decodificar.\n3. Copia el resultado.",
      seoHowItWorks: "Agrupa datos binarios en bloques de 6 bits representados en caracteres ASCII.",
      formula: "Base64 = btoa(texto) | Texto = atob(base64)",
      seoExample: "\"Hola\" en Base64 se convierte en \"SG9sYQ==\".",
      faqs: [
        { q: "¿Qué es la codificación Base64 y para qué se utiliza?", a: "Base64 es un sistema de codificación que representa datos binarios o texto utilizando un conjunto de 64 caracteres ASCII imprimibles, ampliamente empleado para incrustar imágenes en HTML/CSS y transmitir datos en APIs y correos electrónicos." },
        { q: "¿Aumenta el tamaño del archivo o texto al codificar en Base64?", a: "Sí. La codificación Base64 incrementa el tamaño de los datos en aproximadamente un 33% debido a que utiliza 4 caracteres de texto por cada 3 bytes binarios." },
        { q: "¿Qué significan los signos de igual (=) al final de una cadena Base64?", a: "Son caracteres de relleno (padding) que se añaden para asegurar que la longitud de la cadena codificada sea múltiplo exacto de 4 caracteres." },
        { q: "¿Es Base64 una forma de cifrado de seguridad?", a: "No. Base64 es únicamente un formato de representación de datos, no un cifrado. Cualquiera puede decodificarlo instantáneamente a su valor original." },
        { q: "¿Soporta caracteres especiales en español con acentos y emojis?", a: "Sí. Utiliza codificación previa UTF-8 completa para que las letras con tilde y los emojis no se corrompan al codificar o decodificar." }
      ]
    },
    de: {
      name: "Base64 Kodierer & Dekodierer",
      seoTitle: "Base64 Kodieren & Dekodieren Online | HelloTools",
      seoDescription: "Konvertieren Sie Text in Base64 und dekodieren Sie Base64-Strings.",
      description: "Text in Base64 umwandeln und wieder entschlüsseln.",
      quickAnswer: "Wandelt Zeichenketten in das Base64-Format um und umgekehrt.",
      seoHowToUse: "1. Text eingeben.\n2. Kodieren oder Dekodieren wählen.\n3. Ergebnis kopieren.",
      seoHowItWorks: "Kodiert Binärdaten in 64 druckbare ASCII-Zeichen.",
      formula: "Base64 = btoa(text) | Text = atob(base64)",
      seoExample: "Der Text \"Hallo\" wird zu \"SGFsbG8=\".",
      faqs: [
        { q: "Was ist eine Base64-Codierung und wozu wird sie eingesetzt?", a: "Base64 übersetzt Binärdaten oder Texte in eine Folge von 64 standardisierten ASCII-Zeichen, um Bilder direkt in HTML/CSS einzubetten oder Daten sicher über E-Mail und HTTP zu übertragen." },
        { q: "Erhöht sich das Datenvolumen durch die Base64-Umwandlung?", a: "Ja, durch die Codierung steigt der Speicherbedarf um rund 33 %, da jeweils 3 Byte Nutzdaten in 4 druckbare ASCII-Zeichen umgewandelt werden." },
        { q: "Welche Bedeutung haben die Gleichheitszeichen (=) am Ende?", a: "Das Gleichheitszeichen dient als Füllzeichen (Padding), um die Gesamtzeichenlänge auf ein Vielfaches von 4 aufzufüllen." },
        { q: "Ist Base64 eine Verschlüsselungsmethode?", a: "Nein, Base64 ist ein reines Darstellungsformat und bietet keinerlei kryptografische Geheimhaltung oder Schutz vor Auslesen." },
        { q: "Werden Sonderzeichen und Umlaute fehlerfrei decodiert?", a: "Ja, die Umwandlung basiert auf vollständiger UTF-8-Unterstützung, sodass deutsche Umlaute und Sonderzeichen unverändert erhalten bleiben." }
      ]
    },
    fr: {
      name: "Convertisseur Base64 (Encoder/Decoder)",
      seoTitle: "Convertisseur Base64 en Ligne | HelloTools",
      seoDescription: "Encodez et décodez des chaînes de texte au format Base64 facilement.",
      description: "Encodez et décodez du texte en Base64.",
      quickAnswer: "Convertit du texte brut en code Base64 et inversement.",
      seoHowToUse: "1. Entrez votre texte.\n2. Choisissez Encoder ou Décoder.\n3. Copiez le résultat.",
      seoHowItWorks: "Représente les données binaires en caractères ASCII.",
      formula: "Base64 = btoa(texte) | Texte = atob(base64)",
      seoExample: "\"Bonjour\" devient \"Qm9uam91cg==\" en Base64.",
      faqs: [
        { q: "Qu'est-ce que l'encodage Base64 et dans quels cas l'utiliser ?", a: "Le Base64 traduit des données binaires ou textuelles en une chaîne de 64 caractères ASCII lisibles, couramment utilisée pour intégrer des images dans du code CSS ou transporter des pièces jointes d'emails." },
        { q: "L'encodage en Base64 alourdit-il le volume des données ?", a: "Oui, la chaîne encodée pèse environ 33 % de plus que le contenu d'origine, 3 octets de données étant représentés par 4 caractères." },
        { q: "Que signifient les symboles égal (=) situés à la fin ?", a: "Il s'agit de caractères de remplissage (padding) servant à aligner la taille de la chaîne sur un multiple de 4." },
        { q: "Le Base64 constitue-t-il une protection par chiffrement ?", a: "Non. Il s'agit d'une simple méthode d'encodage public qui ne protège aucunement la confidentialité des données." },
        { q: "Prend-il en charge l'alphabet Unicode et les caractères accentués ?", a: "Oui. Le convertisseur applique le standard UTF-8 pour garantir une restitution parfaite des caractères accentués et émojis." }
      ]
    },
    pt: {
      name: "Codificador e Decodificador Base64",
      seoTitle: "Codificador e Decodificador Base64 Online | HelloTools",
      seoDescription: "Converta texto para Base64 e decodifique strings Base64 no navegador.",
      description: "Codifique e decodifique textos no formato Base64.",
      quickAnswer: "Converte texto comum para a representação em Base64 e vice-versa.",
      seoHowToUse: "1. Cole seu texto.\n2. Escolha Codificar ou Decodificar.\n3. Copie a saída.",
      seoHowItWorks: "Converte dados binários em 64 caracteres ASCII legíveis.",
      formula: "Base64 = btoa(texto) | Texto = atob(base64)",
      seoExample: "\"Brasil\" em Base64 fica \"QnJhc2ls\".",
      faqs: [
        { q: "O que é a codificação Base64 e para que serve?", a: "Base64 é um método de codificação que transforma dados binários ou textos em caracteres ASCII imprimíveis, muito usado para embutir imagens em CSS/HTML e transportar dados em APIs." },
        { q: "O arquivo fica maior após ser codificado em Base64?", a: "Sim. Há um aumento de cerca de 33% no tamanho final dos dados, pois cada 3 bytes de informação são convertidos em 4 caracteres alfanuméricos." },
        { q: "Qual a função do caractere de igual (=) no fim do código Base64?", a: "Serve como caractere de preenchimento (padding) para completar blocos múltiplos de 4 caracteres na decodificação." },
        { q: "Base64 pode ser considerado uma forma de criptografia?", a: "Não. É apenas uma codificação pública reversível sem chaves de segurança; qualquer pessoa pode decodificar o conteúdo instantaneamente." },
        { q: "A ferramenta codifica acentos da língua portuguesa sem erros?", a: "Sim. Possui compatibilidade total com o padrão UTF-8, garantindo que acentos e cedilhas permaneçam preservados." }
      ]
    },
    ja: {
      name: "Base64エンコード・デコードツール",
      seoTitle: "Base64エンコード・デコード変換ツール | HelloTools",
      seoDescription: "文字列をBase64形式に符号化（エンコード）、またはBase64文字列を元のテキストへ復号（デコード）します。",
      description: "テキストのBase64エンコードおよびデコードを即座に行います。",
      quickAnswer: "テキストデータをASCII文字セットによるBase64エンコード形式に変換します。",
      seoHowToUse: "1. 変換したい文字列を入力します。\n2. 「エンコード」または「デコード」を選択します。\n3. 変換後の文字列をコピーします。",
      seoHowItWorks: "ブラウザ標準の btoa / atob 関数を用いて高速変換します。",
      formula: "Base64 = btoa(text) | テキスト = atob(base64)",
      seoExample: "「Hello」をBase64変換すると「SGVsbG8=」になります。",
      faqs: [
        { q: "Base64エンコードとは何ですか？どのような用途で使われますか？", a: "画像などのバイナリデータや文字列を、ASCIIの印字可能文字（64種類の英数字と記号）に変換する技術です。HTMLやCSSへの画像の埋め込みや、メール添付、API通信で広く使われます。" },
        { q: "Base64に変換するとデータ容量は増えますか？", a: "はい。3バイトのバイナリデータを4文字のテキストに変換するため、データ容量は約33%増加します。" },
        { q: "Base64文字列の末尾に付くイコール記号（=）の意味は？", a: "データの長さが4の倍数になるように末尾を埋める「パディング記号」です。データ長に応じて末尾に1個または2個付与されます。" },
        { q: "Base64はセキュリティ上の暗号化技術ですか？", a: "いいえ。Base64はデータの表現形式を変換するだけの技術であり、暗号化ではないため誰でも簡単に元のデータへ復元（デコード）できます。" },
        { q: "日本語の全角文字や絵文字のエンコードに対応していますか？", a: "はい。UTF-8文字コードをベースに安全に相互変換するため、日本語の文章や特殊記号も文字化けすることなく完全に復元できます。" }
      ]
    }
  },

  'savings-goal-calculator': {
    es: {
      name: "Calculadora de Metas de Ahorro",
      seoTitle: "Calculadora de Metas de Ahorro | HelloTools",
      seoDescription: "Calcula el ahorro mensual necesario para alcanzar tu objetivo financiero.",
      description: "Descubre cuánto debes ahorrar cada mes para lograr tu meta de ahorro.",
      quickAnswer: "Calcula la cuota de ahorro mensual requerida para alcanzar una cantidad objetivo.",
      seoHowToUse: "1. Introduce la cantidad objetivo a ahorrar.\n2. Indica el plazo en meses o años.\n3. Añade la tasa de interés anual estimada.",
      seoHowItWorks: "Utiliza la fórmula de valor futuro de una anualidad ordinaria.",
      formula: "Ahorro Mensual = Meta / [((1 + r)^n - 1) / r]",
      seoExample: "Para ahorrar $10.000 en 2 años al 5% anual, necesitas ahorrar aprox. $397 al mes.",
      faqs: [
        { q: "¿Cómo funciona esta calculadora de metas de ahorro?", a: "Calcula la aportación periódica necesaria para alcanzar un capital objetivo en un plazo determinado, considerando un rendimiento anual esperado y un saldo inicial." },
        { q: "¿Qué rentabilidad anual es prudente asumir para el ahorro?", a: "Para cuentas remuneradas de alta rentabilidad se suele estimar un 2% a 4%, mientras que para fondos indexados diversificados a largo plazo se proyecta habitualmente entre un 5% y un 7% anual." },
        { q: "¿Sirve para objetivos a corto plazo y a largo plazo?", a: "Sí. Es ideal tanto para fondos de emergencia a 6 meses como para la entrada de una vivienda a 5 años o la educación universitaria a 15 años." },
        { q: "¿Incluye la calculadora impuestos sobre los intereses ganados?", a: "No. El cálculo se realiza en términos brutos. Los rendimientos reales estarán sujetos a las retenciones fiscales sobre el ahorro vigentes en tu país." },
        { q: "¿Qué fiabilidad tienen las cifras de ahorro obtenidas?", a: "La fórmula financiera de valor futuro es matemáticamente rigurosa, asumiendo aportaciones regulares constantes y tipos de interés uniformes." }
      ]
    },
    de: {
      name: "Sparzielrechner",
      seoTitle: "Sparzielrechner — Monatliche Sparrate Berechnen | HelloTools",
      seoDescription: "Berechnen Sie die erforderliche monatliche Sparrate für Ihr Sparziel.",
      description: "Ermitteln Sie, wie viel Sie monatlich sparen müssen, um Ihr Ziel zu erreichen.",
      quickAnswer: "Errechnet die monatliche Sparrate zur Erreichung eines Vermögensziels.",
      seoHowToUse: "1. Zielbetrag eingeben.\n2. Laufzeit in Jahren oder Monaten angeben.\n3. Zinssatz eintragen.",
      seoHowItWorks: "Berechnet die Sparrate mittels Rentenendwertformel.",
      formula: "Monatsrate = Ziel / [((1 + r)^n - 1) / r]",
      seoExample: "Für 10.000 € in 2 Jahren bei 5 % Zinsen sparen Sie ca. 397 € monatlich.",
      faqs: [
        { q: "Wie funktioniert dieser Sparziel-Rechner?", a: "Er ermittelt die erforderliche monatliche Sparrate, um bei einem bestimmten Anlagezins und Zeithorizont ein definiertes Sparziel zu erreichen." },
        { q: "Welche Rendite sollte man realistisch für Sparziele ansetzen?", a: "Auf Tagesgeld oder Festgeld sind 2 % bis 3,5 % realistisch. Für langfristige ETF-Sparpläne werden historisch oft 5 % bis 7 % Jahresrendite als Modellannahme genutzt." },
        { q: "Kann man kurzfristige und langfristige Sparziele planen?", a: "Ja, vom Notgroschen für 6 Monate über den Eigenkapitalaufbau für eine Immobilie bis hin zu mehrjährigen Ausbildungsfonds." },
        { q: "Werden Steuern auf Zinserträge im Sparziel berücksichtigt?", a: "Der Rechner kalkuliert das Bruttowachstum. Kapitalertragsteuern oberhalb des Sparer-Pauschbetrags sollten separat eingeplant werden." },
        { q: "Wie exakt ist die Berechnung der monatlichen Sparrate?", a: "Sie basiert auf der finanzmathematischen Barwert- und Rentenendwertformel und ist bei gleichbleibenden Sparraten mathematisch exakt." }
      ]
    },
    fr: {
      name: "Calculateur d'Objectif d'Épargne",
      seoTitle: "Calculateur d'Objectif d'Épargne | HelloTools",
      seoDescription: "Calculez l'épargne mensuelle nécessaire pour atteindre votre objectif financier.",
      description: "Déterminez combien mettre de côté chaque mois pour réaliser vos projets.",
      quickAnswer: "Calcule le versement mensuel requis pour atteindre un capital cible.",
      seoHowToUse: "1. Entrez le montant cible d'épargne.\n2. Indiquez la durée.\n3. Ajoutez le taux d'intérêt estimé.",
      seoHowItWorks: "Utilise la formule d'annuité de valeur future.",
      formula: "Épargne Mensuelle = Objectif / [((1 + r)^n - 1) / r]",
      seoExample: "Pour épargner 10 000 € en 2 ans à 5 %, mettez de côté environ 397 € par mois.",
      faqs: [
        { q: "Comment fonctionne ce calculateur d'objectif d'épargne ?", a: "Il détermine l'effort d'épargne mensuel requis pour constituer un capital cible à une date donnée, en tenant compte d'un taux d'intérêt annuel composé." },
        { q: "Quel taux de rendement est-il raisonnable d'envisager ?", a: "Pour des livrets d'épargne sécurisés, comptez entre 2 % et 3 %. Pour un portefeuille d'actions diversifié sur le long terme, une hypothèse de 5 % à 7 % brut est courante." },
        { q: "Peut-on l'utiliser pour des projets court terme et long terme ?", a: "Oui, qu'il s'agisse de constituer une réserve de précaution sur 1 an, de financer un voyage ou de préparer un apport immobilier sur 10 ans." },
        { q: "Les prélèvements fiscaux sur les gains sont-ils inclus ?", a: "Non, les résultats sont exprimés bruts d'impôts. Sur les placements fiscalisés, le prélèvement forfaitaire unique (flat tax) viendra réduire le gain net." },
        { q: "Quelle est la fiabilité des montants d'épargne calculés ?", a: "Le calcul actuariel est exact sur le plan mathématique pour les hypothèses de versement et de taux renseignées." }
      ]
    },
    pt: {
      name: "Calculadora de Meta de Economia",
      seoTitle: "Calculadora de Meta de Economia | HelloTools",
      seoDescription: "Calcule o valor mensal que você precisa economizar para atingir seu objetivo.",
      description: "Descubra quanto poupar por mês para realizar seus objetivos financeiros.",
      quickAnswer: "Calcula a parcela mensal necessária para atingir um valor acumulado desejado.",
      seoHowToUse: "1. Digite o valor que deseja acumular.\n2. Informe o tempo em meses ou anos.\n3. Digite a taxa de rendimento estimada.",
      seoHowItWorks: "Calcula a contribuição periódica considerando os juros compostos.",
      formula: "Economia Mensal = Meta / [((1 + r)^n - 1) / r]",
      seoExample: "Para poupar R$ 10.000 em 2 anos com rendimento de 5% a.a., economize cerca de R$ 397/mês.",
      faqs: [
        { q: "Como opera esta calculadora de meta de economia e investimento?", a: "Ela calcula o valor exato do aporte mensal necessário para atingir um patrimônio almejado em determinado prazo, considerando a taxa de juros composta." },
        { q: "Qual taxa de rentabilidade média deve ser estimada?", a: "Para reserva de emergência em títulos pós-fixados a projeção varia conforme a taxa Selic/CDI. Para prazos longos em fundos ou ações, projeta-se entre 6% e 10% ao ano." },
        { q: "Serve para metas financeiras de curto, médio e longo prazo?", a: "Sim. É indicada para montar reservas financeiras de 6 meses, comprar veículos em 3 anos ou planejar a independência financeira em 20 anos." },
        { q: "O valor final considera os descontos de Imposto de Renda?", a: "A ferramenta apresenta o cálculo bruto nominal. Aplicações sujeitas à tabela regressiva de IR terão dedução no momento do resgate." },
        { q: "Os resultados projetados são garantidos?", a: "Representam cálculos matemáticos rigorosos sob a hipótese de constância nos aportes e na taxa de juros estipulada." }
      ]
    },
    ja: {
      name: "貯蓄目標計算ツール",
      seoTitle: "貯蓄目標計算ツール — 毎月の目標貯蓄額 | HelloTools",
      seoDescription: "目標貯蓄金額、達成期間、想定利回り（%）から、毎月必要な貯蓄額を計算します。",
      description: "目標金額を達成するために必要な毎月の積立額を計算します。",
      quickAnswer: "目標金額と達成年数・想定利回りから、毎月の必要積立額を算定します。",
      seoHowToUse: "1. 目標貯蓄金額を入力します。\n2. 達成までの年数または月数を指定します。\n3. 想定年利（%）を入力します。",
      seoHowItWorks: "積立年金の将来価値公式を用いて毎月の積立金額を計算します。",
      formula: "毎月積立額 = 目標額 / [((1 + r)^n - 1) / r]",
      seoExample: "100万円を2年後（年利5%）までに貯めるには、毎月約39,700円の積立が必要です。",
      faqs: [
        { q: "目標貯蓄額（貯金目標）計算ツールの仕組みを教えてください。", a: "目標とする金額、現在の準備資金、想定利回り、目標達成までの期間から、毎月いくら積み立てる必要があるかを逆算するツールです。" },
        { q: "利回りはどの程度を想定して設定すべきですか？", a: "普通預金や定期預金では0.1〜0.5%、長期の分散投資（インデックス投資など）では年利3〜5%程度を手堅い想定利回りとして置くのが一般的です。" },
        { q: "短期の目標（旅行・教育資金）から長期（老後資金）まで使えますか？", a: "はい。数ヶ月後の緊急予備資金の準備から、10年後の住宅購入頭金、20年後のリタイア資金づくりまで幅広く対応しています。" },
        { q: "利息に対する税金（源泉徴収税）は控除されていますか？", a: "税引前の資産成長モデルとして算出しています。特定口座等の課税対象口座では利益に対して約20.315%の税金が発生します。" },
        { q: "毎月の必要積立額の計算精度はどのくらいですか？", a: "元利均等年金現価・終価の金融工学計算式に基づいており、入力された利回り条件下で正確な積立必要額を導き出します。" }
      ]
    }
  },

  'auto-loan-calculator': {
    es: {
      name: "Calculadora de Préstamo Automotriz",
      seoTitle: "Calculadora de Préstamo Automotriz y Crédito Coche | HelloTools",
      seoDescription: "Calcula la cuota mensual de tu financiamiento automotriz, enganche e intereses.",
      description: "Calcula el pago mensual de tu crédito vehicular o préstamo para coche.",
      quickAnswer: "Estima la cuota mensual de un préstamo para automóvil basándose en precio, pago inicial e interés.",
      seoHowToUse: "1. Introduce el precio del vehículo.\n2. Indica el pago inicial (enganche).\n3. Selecciona la tasa de interés y el plazo.",
      seoHowItWorks: "Utiliza el método de amortización constante sobre el saldo financiado.",
      formula: "Cuota = Monto Financiado * [r(1+r)^n] / [(1+r)^n - 1]",
      seoExample: "Para un auto de $25.000 con $5.000 de enganche al 6% a 5 años, la cuota es de $386/mes.",
      faqs: [
        { q: "¿Qué tipo de interés es competitivo para un préstamo de coche?", a: "Para compradores con buen historial crediticio, las tasas suelen oscilar entre el 5% y el 8% anual en vehículos nuevos, y entre el 7% y el 11% en vehículos de ocasión." },
        { q: "¿Es aconsejable financiar un vehículo a plazos muy largos (72 u 84 meses)?", a: "Aunque reduce la cuota mensual, incrementa drásticamente los intereses pagados y eleva el riesgo de deber más dinero del que vale el coche en el mercado." },
        { q: "¿Cómo se incluyen los impuestos sobre el vehículo en la financiación?", a: "Puedes sumar el impuesto de matriculación o el IVA al precio del coche antes de financiar para conocer la cuota total definitiva." },
        { q: "¿Cuánta entrada inicial conviene aportar al comprar un automóvil?", a: "Los expertos recomiendan aportar al menos un 20% en vehículos nuevos y un 10% en seminuevos para amortiguar la depreciación del primer año." },
        { q: "¿Se puede amortizar anticipadamente un préstamo de auto sin penalización?", a: "La mayoría de contratos permiten amortizaciones parciales o totales con penalizaciones reguladas por ley (habitualmente del 0,5% al 1% del capital amortizado)." }
      ]
    },
    de: {
      name: "Autokreditrechner",
      seoTitle: "Autokreditrechner — Monatliche Rate Berechnen | HelloTools",
      seoDescription: "Berechnen Sie die monatliche Kreditrate für Ihren Autokauf.",
      description: "Ermitteln Sie die Monatsrate für Ihre Autofinanzierung.",
      quickAnswer: "Berechnet die Kreditrate für ein Fahrzeug unter Berücksichtigung von Anzahlung und Zins.",
      seoHowToUse: "1. Fahrzeugpreis eingeben.\n2. Anzahlung angeben.\n3. Laufzeit und Zinssatz wählen.",
      seoHowItWorks: "Berechnet die Annuitätsrate auf den Nettodarlehensbetrag.",
      formula: "Monatsrate = Kreditbetrag * [i*(1+i)^n] / [(1+i)^n - 1]",
      seoExample: "Bei 25.000 € Kaufpreis und 5.000 € Anzahlung (6 % Zins, 5 Jahre) beträgt die Rate ca. 386 €/Monat.",
      faqs: [
        { q: "Welcher Zinssatz gilt aktuell als günstig für einen Autokredit?", a: "Bei guter Bonität liegen Autokreditzinsen für Neuwagen meist zwischen 4,5 % und 7,5 % eff. Jahreszins. Gebrauchtwagenfinanzierungen liegen im Schnitt etwas höher." },
        { q: "Sind lange Kreditlaufzeiten von 72 oder 84 Monaten sinnvoll?", a: "Lange Laufzeiten senken zwar die Monatsrate, verteuern den Kredit durch Zinsen aber massiv und bergen die Gefahr, dass der Wagen schneller an Wert verliert als der Kredit getilgt wird." },
        { q: "Werden Überführungskosten und Zulassung in den Kredit einberechnet?", a: "Sie können Überführungskosten und Sonderausstattungen direkt zum Fahrzeugkaufpreis addieren, um den Gesamtkreditbetrag zu ermitteln." },
        { q: "Wie viel Anzahlung sollte man für einen Autokauf leisten?", a: "Eine Anzahlung von 15 % bis 20 % des Kaufpreises wird empfohlen, um den anfänglichen Wertverlust des Fahrzeugs abzufedern." },
        { q: "Kann man einen Autokredit vorzeitig kostenlos kündigen?", a: "Nach deutschem Verbraucherkreditrecht ist eine vorzeitige Tilgung jederzeit möglich; Banken dürfen dabei eine Vorfälligkeitsentschädigung von maximal 1 % der Restschuld verlangen." }
      ]
    },
    fr: {
      name: "Calculateur de Crédit Auto",
      seoTitle: "Calculateur de Crédit Auto et Prêt Véhicule | HelloTools",
      seoDescription: "Calculez les mensualités de votre prêt automobile et le coût total de financement.",
      description: "Calculez la mensualité exacte de votre crédit voiture.",
      quickAnswer: "Estime les mensualités d'un crédit automobile selon l'apport et le taux d'intérêt.",
      seoHowToUse: "1. Entrez le prix du véhicule.\n2. Indiquez votre apport personnel.\n3. Choisissez la durée et le taux.",
      seoHowItWorks: "Applique le calcul d'amortissement à mensualité constante.",
      formula: "Mensualité = Montant Emprunté * [r(1+r)^n] / [(1+r)^n - 1]",
      seoExample: "Pour une voiture de 25 000 € avec 5 000 € d'apport à 6 % sur 5 ans, la mensualité est de 386 €/mois.",
      faqs: [
        { q: "Quel est le taux d'intérêt moyen pour un crédit automobile ?", a: "Les taux pour un crédit auto neuf se situent généralement entre 4,5 % et 7 % TAEG selon le profil de l'emprunteur, et entre 6 % et 9 % pour un véhicule d'occasion." },
        { q: "Faut-il choisir une durée longue (60 à 84 mois) pour financer sa voiture ?", a: "Une durée allongée diminue la mensualité mais majore lourdement le coût total du crédit et augmente le risque de valeur résiduelle inférieure au capital dû." },
        { q: "Le montant emprunté peut-il inclure les frais d'immatriculation ?", a: "Oui, vous pouvez intégrer le coût de la carte grise et les options au montant total emprunté pour financer l'ensemble du projet." },
        { q: "Quel apport personnel est conseillé pour un achat de véhicule ?", a: "Un apport de 15 % à 20 % est fortement recommandé pour couvrir la décote immédiate du véhicule dès sa mise en circulation." },
        { q: "Est-il possible de solder son crédit auto par anticipation ?", a: "Oui, la loi encadre le remboursement anticipé avec des indemnités plafonnées à 0,5 % ou 1 % du capital restant dû selon la durée restante." }
      ]
    },
    pt: {
      name: "Calculadora de Financiamento de Veículos",
      seoTitle: "Calculadora de Financiamento de Veículos y Carros | HelloTools",
      seoDescription: "Calcule o valor das parcelas do financiamento do seu carro ou moto.",
      description: "Simule as parcelas mensais do seu financiamento automotivo.",
      quickAnswer: "Estima o valor da parcela mensal do financiamento do veículo.",
      seoHowToUse: "1. Digite o valor do veículo.\n2. Insira o valor da entrada.\n3. Selecione a taxa de juros e o prazo em meses.",
      seoHowItWorks: "Aplica a tabela Price sobre o saldo devedor financiado.",
      formula: "Parcela = Saldo Financiado * [r(1+r)^n] / [(1+r)^n - 1]",
      seoExample: "Um carro de R$ 50.000 com R$ 10.000 de entrada a 1,2% a.m. em 48x fica em parcelas de R$ 1.100/mês.",
      faqs: [
        { q: "Qual a taxa de juros média para financiamento de veículos (CDC)?", a: "As taxas variam conforme o score de crédito e o ano do veículo, girando tipicamente entre 1,2% e 2,2% ao mês para automóveis novos e seminovos." },
        { q: "Vale a pena financiar um carro em 60 parcelas?", a: "Prazos longos reduzem a parcela mas multiplicam o montante de juros pagos, gerando o risco do saldo devedor superar o valor da Tabela Fipe do veículo." },
        { q: "Como o IOF e o emplacamento entram no financiamento?", a: "O Imposto sobre Operações Financeiras (IOF) e as tarifas de cadastro são comumente financiados junto ao valor do bem, elevando o Custo Efetivo Total." },
        { q: "Qual percentual de entrada é recomendável dar em um carro?", a: "Recomenda-se oferecer pelo menos 20% a 30% de entrada para reduzir as taxas de juros oferecidas pelas financeiras e o risco de inadimplência." },
        { q: "É garantido o desconto de juros na quitação antecipada de parcelas?", a: "Sim. Pelo Código de Defesa do Consumidor, o banco é obrigado a conceder desconto proporcional dos juros futuros na liquidação antecipada de parcelas." }
      ]
    },
    ja: {
      name: "自動車ローン計算ツール",
      seoTitle: "自動車ローン計算ツール — 月々返済額シミュレーション | HelloTools",
      seoDescription: "車両本体価格、頭金、金利（年利）、ローン期間から毎月の返済額と総支払額を計算します。",
      description: "マイカーローンの月々返済額やボーナス加算額をシミュレーションします。",
      quickAnswer: "購入車両価格から頭金を引いた借入額に対する毎月のローン返済額を算出します。",
      seoHowToUse: "1. 車両価格を入力します。\n2. 頭金金額を指定します。\n3. 年利（%）と返済期間（年/月）を選択します。",
      seoHowItWorks: "元利均等返済方式を用いて毎月の返済金額を求めます。",
      formula: "返済額 = 借入金 * [r(1+r)^n] / [(1+r)^n - 1]",
      seoExample: "300万円の車で頭金50万円、金利3%・5年ローンの場合、毎月の返済額は約44,900円です。",
      faqs: [
        { q: "自動車ローンの適正な金利相場はどれくらいですか？", a: "ディーラーローンの金利相場は年利3.5〜8.0%程度、銀行系のマイカーローンでは年利1.5〜3.0%前後が一般的な相場水準です。" },
        { q: "6年（72回）や7年（84回）の長期返済はおすすめできますか？", a: "月々の支払いは抑えられますが、総利息負担が増大し、車の査定価格よりも残債が多くなる「オーバーローン」のリスクが高まります。" },
        { q: "諸費用（自動車税・自賠責・登録費用）も借入金額に含められますか？", a: "多くの金融機関で車体本体価格に加え、各種税金やオプション代金、登録諸費用を含めた総額での借入に対応しています。" },
        { q: "マイカー購入時に頭金はどれくらい入れるべきですか？", a: "車両価格の20〜30%程度を頭金として充当することで、借入金利の優遇を受けやすくなり毎月の支払い負担も軽減されます。" },
        { q: "自動車ローンは途中で繰り上げ返済や一括完済ができますか？", a: "可能です。繰り上げ返済を行うことで将来支払う予定だった利息が減免されますが、金融機関によっては所定の繰上手数料が発生する場合があります。" }
      ]
    }
  },

  'net-worth-calculator': {
    es: {
      name: "Calculadora de Patrimonio Neto",
      seoTitle: "Calculadora de Patrimonio Neto (Activos y Pasivos) | HelloTools",
      seoDescription: "Calcula tu valor neto personal sumando tus activos y restando tus pasivos.",
      description: "Calcula tu patrimonio neto total para evaluar tu salud financiera.",
      quickAnswer: "Mide la diferencia entre todo lo que posees (activos) y todo lo que debes (pasivos).",
      seoHowToUse: "1. Suma tus activos (propiedades, ahorros, inversiones).\n2. Suma tus pasivos (hipotecas, deudas, tarjetas).\n3. Obtén tu patrimonio neto.",
      seoHowItWorks: "Resta el total de pasivos del total de activos.",
      formula: "Patrimonio Neto = Total Activos - Total Pasivos",
      seoExample: "Si tienes $200.000 en activos y $50.000 en deudas, tu patrimonio neto es de $150.000.",
      faqs: [
        { q: "¿Qué elementos se consideran activos en esta calculadora de patrimonio neto?", a: "Los activos comprenden bienes y derechos con valor económico: cuentas corrientes, depósitos, inversiones bursátiles, fondos de pensiones, bienes inmuebles a valor de mercado y vehículos." },
        { q: "¿Qué se computa como pasivo en el patrimonio neto?", a: "Los pasivos abarcan todas las deudas vigentes: saldo pendiente de hipotecas, créditos personales, saldos deudores de tarjetas de crédito y préstamos estudiantiles." },
        { q: "¿Con qué frecuencia conviene actualizar el cálculo de patrimonio neto?", a: "Es aconsejable actualizarlo con periodicidad trimestral o anual para monitorizar la tendencia financiera sin verse perturbado por oscilaciones bursátiles de corto plazo." },
        { q: "¿Almacena esta calculadora mis datos patrimoniales o financieros?", a: "No. Todos los datos introducidos se calculan en la memoria volátil de tu navegador web y no se transmiten a ningún servidor externo." },
        { q: "¿Cómo se interpreta el resultado del patrimonio neto personal?", a: "Patrimonio Neto = Activos Totales - Pasivos Totales. Un valor positivo creciente refleja un fortalecimiento patrimonial sostenido hacia la independencia financiera." }
      ]
    },
    de: {
      name: "Vermögensrechner (Net Worth)",
      seoTitle: "Nettovermögen Rechner — Aktiva minus Passiva | HelloTools",
      seoDescription: "Berechnen Sie Ihr persönliches Nettovermögen aus Vermögenswerten und Schulden.",
      description: "Ermitteln Sie Ihren finanziellen Status durch Berechnung Ihres Nettovermögens.",
      quickAnswer: "Zieht alle Verbindlichkeiten von Ihren Gesamtwerten ab.",
      seoHowToUse: "1. Vermögenswerte (Immobilien, Ersparnisse) eingeben.\n2. Verbindlichkeiten (Kredite, Schulden) angeben.\n3. Nettovermögen ablesen.",
      seoHowItWorks: "Subtrahiert die Passiva von den Aktiva.",
      formula: "Nettovermögen = Aktiva - Passiva",
      seoExample: "200.000 € Vermögen minus 50.000 € Schulden ergibt 150.000 € Nettovermögen.",
      faqs: [
        { q: "Was zählt als Vermögenswert (Aktiva) in diesem Rechner?", a: "Zu den Aktiva gehören alle wirtschaftlichen Besitztümer: Bankguthaben, Depots, Edelmetalle, Immobilien zum aktuellen Marktwert, Altersvorsorgeguthaben und Fahrzeuge." },
        { q: "Was wird als Verbindlichkeit (Passiva) erfasst?", a: "Als Verbindlichkeiten gelten alle offenen Schulden: Resthypotheken, Ratenkredite, Kreditkartensalden, Studienkredite und sonstige Zahlungsverpflichtungen." },
        { q: "Wie oft sollte man sein Nettovermögen ermitteln?", a: "Ein Rhythmus von vierteljährlich oder einmal jährlich ist optimal, um den langfristigen Vermögensaufbau ohne kurzfristiges Börsenrauschen zu messen." },
        { q: "Werden meine persönlichen Vermögensangaben gespeichert?", a: "Nein. Sämtliche Zahlen werden ausschließlich lokal in Ihrem Browser verarbeitet und zu keinem Zeitpunkt übertragen oder gespeichert." },
        { q: "Was sagt das berechnete Nettovermögen aus?", a: "Nettovermögen = Gesamtvermögen minus Gesamtschulden. Es ist die maßgebliche Kennzahl für Ihre finanzielle Gesundheit und Unabhängigkeit." }
      ]
    },
    fr: {
      name: "Calculateur de Valeur Nette",
      seoTitle: "Calculateur de Valeur Nette et Patrimoine | HelloTools",
      seoDescription: "Calculez votre patrimoine net en faisant le bilan de vos actifs et dettes.",
      description: "Évaluez votre santé financière globale en calculant votre valeur nette.",
      quickAnswer: "Évalue la différence entre la valeur de vos possessions et le montant de vos dettes.",
      seoHowToUse: "1. Listez vos actifs (épargne, immobilier).\n2. Indiquez vos passifs (emprunts, dettes).\n3. Lisez votre valeur nette.",
      seoHowItWorks: "Soustrait les passifs du montant total des actifs.",
      formula: "Valeur Nette = Total Actifs - Total Passifs",
      seoExample: "Avec 200 000 € d'actifs et 50 000 € de dettes, votre valeur nette est de 150 000 €.",
      faqs: [
        { q: "Quels éléments constituent les actifs dans ce bilan de patrimoine ?", a: "Les actifs regroupent l'ensemble de vos avoirs : épargne bancaire, comptes-titres, PEA, biens immobiliers estimés au prix du marché, véhicules et contrats d'assurance-vie." },
        { q: "Que comprend la catégorie des passifs financiers ?", a: "Les passifs représentent la totalité de vos dettes : capital restant dû sur emprunts immobiliers, crédits à la consommation, dettes d'études et soldes débiteurs." },
        { q: "À quelle fréquence est-il recommandé d'évaluer sa valeur nette ?", a: "Un bilan semestriel ou annuel est idéal pour analyser votre trajectoire d'enrichissement sans surréagir aux variations boursières quotidiennes." },
        { q: "Mes informations patrimoniales restent-elles confidentielles ?", a: "Oui. Le calcul est strictement exécuté sur votre terminal sans aucune transmission de données personnelles vers un serveur distant." },
        { q: "Comment analyser la valeur nette calculée ?", a: "Patrimoine Net = Total des Actifs - Total des Passifs. Une valeur positive et en progression témoigne d'une gestion financière saine et pérenne." }
      ]
    },
    pt: {
      name: "Calculadora de Patrimônio Líquido",
      seoTitle: "Calculadora de Patrimônio Líquido | HelloTools",
      seoDescription: "Calcule seu patrimônio líquido somando seus bens e subtraindo suas dívidas.",
      description: "Descubra seu valor financeiro líquido real.",
      quickAnswer: "Mede a diferença entre todos os seus bens e todas as suas dívidas.",
      seoHowToUse: "1. Digite o valor dos seus ativos (imóveis, investimentos, dinheiro).\n2. Informe seus passivos (financiamentos, dívidas).\n3. Veja seu patrimônio líquido.",
      seoHowItWorks: "Subtrai o total de dívidas do total de bens.",
      formula: "Patrimônio Líquido = Total de Ativos - Total de Passivos",
      seoExample: "Com R$ 200.000 em bens e R$ 50.000 em dívidas, seu patrimônio líquido é de R$ 150.000.",
      faqs: [
        { q: "O que deve ser incluído na lista de ativos patrimoniais?", a: "Ativos incluem saldo em contas bancárias, títulos de renda fixa, ações, previdência privada, valor venal de imóveis próprios e veículos quitados." },
        { q: "Quais itens se qualificam como passivos ou obrigações?", a: "Passivos englobam o saldo devedor de financiamentos imobiliários, saldo devedor de veículos, empréstimos consignados e dívidas de cartão de crédito." },
        { q: "Com que frequência devo apurar meu patrimônio líquido?", a: "A apuração trimestral ou anual é a mais indicada para acompanhar o crescimento real do patrimônio sem o ruído das flutuações diárias do mercado." },
        { q: "Os dados digitados nesta ferramenta são gravados?", a: "Não. Os dados são processados unicamente na sessão do seu navegador, com proteção integral de sigilo e privacidade." },
        { q: "Qual a fórmula e interpretação do patrimônio líquido?", a: "Patrimônio Líquido = Total de Bens e Direitos (Ativos) - Total de Dívidas (Passivos). Indica o valor financeiro real que você possui livre de dívidas." }
      ]
    },
    ja: {
      name: "純資産計算ツール",
      seoTitle: "純資産計算ツール — 資産・負債・自己資本 | HelloTools",
      seoDescription: "預貯金、不動産、株式などの資産と、住宅ローンや借入金などの負債から、あなたの純資産総額を算出します。",
      description: "資産と負債のバランスから個人の純資産総額を計算します。",
      quickAnswer: "所有する総資産からすべての負債を差し引いた実質的な純資産額を算出します。",
      seoHowToUse: "1. 資産項目（現金、不動産、株式等）の合計を入力します。\n2. 負債項目（ローン、借入金等）の合計を入力します。\n3. 純資産額を確認します。",
      seoHowItWorks: "総資産から総負債を控除して算定します。",
      formula: "純資産 = 総資産 - 総負債",
      seoExample: "資産2,000万円・負債500万円の場合、純資産は1,500万円となります。",
      faqs: [
        { q: "純資産計算における「資産」には何が含まれますか？", a: "預貯金、株式・投資信託、不動産（現在の時価評価額）、生命保険の解約返戻金、自動車、暗号資産など、換金性のあるすべての財産が含まれます。" },
        { q: "「負債」にはどのような項目を計上すべきですか？", a: "住宅ローン残高、マイカーローン残高、奨学金の返済残高、クレジットカードのリボ・分割残高など、将来返済義務のあるすべての債務です。" },
        { q: "純資産の算出はどのくらいの頻度で行うのが理想的ですか？", a: "半期に1回または年に1回の棚卸しが推奨されます。市場の短期的な値動きに一喜一憂せず、長期的な家計の健全度を追跡できます。" },
        { q: "入力した資産額や借入残高が外部に漏れる心配はありませんか？", a: "ありません。本ツールの演算はお使いの端末（ブラウザ）ローカルでのみ実行され、入力された財務情報がサーバーに送信されることは一切ありません。" },
        { q: "純資産の計算式と意味について教えてください。", a: "「純資産 ＝ 総資産 － 総負債」です。すべての借金を全額完済した後に手元に残る真の財産価値を表す最も重要な家計指標です。" }
      ]
    }
  },

  'salary-calculator': {
    es: {
      name: "Calculadora de Salario",
      seoTitle: "Calculadora de Salario (Hora, Mes, Año) | HelloTools",
      seoDescription: "Convierte tu salario entre tarifas por hora, semanales, mensuales y anuales.",
      description: "Convierte tu sueldo a cualquier frecuencia de pago.",
      quickAnswer: "Convierte equivalencias salariales entre pago por hora, mensual y anual.",
      seoHowToUse: "1. Introduce la tarifa salarial.\n2. Selecciona la frecuencia actual (hora, mes, año).\n3. Revisa la tabla de equivalencias.",
      seoHowItWorks: "Asume un año laboral estándar de 2.080 horas (40h/semana).",
      formula: "Salario Anual = Tarifa Hora * 2080 | Salario Mensual = Salario Anual / 12",
      seoExample: "Un pago de $25/hora equivale a $4.333/mes o $52.000/año brutos.",
      faqs: [
        { q: "¿Cuántas horas laborables contiene un año estándar?", a: "Un año laboral estándar a jornada completa contiene 2.080 horas, calculadas como 40 horas semanales por 52 semanas al año." },
        { q: "¿Cómo convierto mi salario por hora a sueldo anual?", a: "Multiplica tu tarifa por hora por las horas trabajadas a la semana y luego multiplica por 52 semanas. Por ejemplo: 20 €/hora × 40 horas × 52 semanas = 41.600 € anuales." },
        { q: "¿Cuál es la diferencia entre pago quincenal y catorcenal?", a: "El pago quincenal ocurre dos veces al mes (24 pagas anuales), mientras que el pago catorcenal (bi-weekly) se realiza cada dos semanas (26 pagas anuales)." },
        { q: "¿Este calculador muestra el salario bruto o neto libre de impuestos?", a: "Muestra la equivalencia del salario bruto entre diferentes frecuencias de cobro. No descuenta impuestos sobre la renta ni cotizaciones de la seguridad social." },
        { q: "¿Cómo computo jornadas parciales o semanas no remuneradas?", a: "Introduce tu promedio real de horas trabajadas por semana en lugar de las 40 estándar para que todas las proyecciones horarias, mensuales y anuales se ajusten fielmente." }
      ]
    },
    de: {
      name: "Gehaltsrechner",
      seoTitle: "Gehaltsrechner — Stundenlohn in Monatsgehalt Umrechnen | HelloTools",
      seoDescription: "Rechnen Sie Stundenlohn, Monatsgehalt und Jahresgehalt einfach um.",
      description: "Gehaltsangaben in verschiedene Zahlungsintervalle umrechnen.",
      quickAnswer: "Rechnet Löhne zwischen Stunden-, Monats- und Jahreswerten um.",
      seoHowToUse: "1. Gehaltsbetrag eingeben.\n2. Zahlungsintervall wählen.\n3. Tabelle der Lohnstufen ablesen.",
      seoHowItWorks: "Geht von einer Standardarbeitszeit von 40 Stunden/Woche aus.",
      formula: "Jahresgehalt = Stundenlohn * 2080",
      seoExample: "25 €/Stunde entsprechen ca. 4.333 €/Monat bzw. 52.000 €/Jahr brutto.",
      faqs: [
        { q: "Wie viele Arbeitsstunden hat ein Vollzeit-Jahr im Durchschnitt?", a: "Ein reguläres Vollzeit-Arbeitsjahr umfasst bei einer 40-Stunden-Woche rechnerisch 2.080 Arbeitsstunden (40 Stunden × 52 Wochen)." },
        { q: "Wie rechnet man den Stundenlohn in ein Jahresgehalt um?", a: "Multiplizieren Sie den Stundenlohn mit der Wochenarbeitszeit und anschließend mit 52 Wochen. Beispiel: 25 € × 40 Stunden × 52 Wochen = 52.000 € Brutto-Jahresgehalt." },
        { q: "Was ist der Unterschied zwischen Monatsgehalt und 13. Monatsgehalt?", a: "Das Monatsgehalt teilt das Jahresgrundgehalt durch 12. Ein 13. Gehalt (Weihnachtsgeld) erhöht das Gesamtbrutto auf 13 Teilbeträge." },
        { q: "Zeigt dieser Gehaltsrechner Brutto- oder Netto-Beträge?", a: "Er rechnet Brutto-Vergütungen exakt zwischen Stunden-, Tages-, Wochen-, Monats- und Jahresintervallen um, ohne individuelle Lohnsteuerabzüge." },
        { q: "Wie rechne ich Teilzeitarbeit mit wechselnden Stunden ab?", a: "Geben Sie Ihre vertraglich vereinbarte durchschnittliche Wochenstundenzahl ein, um das korrespondierende Monats- und Jahresgehalt abzulesen." }
      ]
    },
    fr: {
      name: "Calculateur de Salaire",
      seoTitle: "Calculateur de Salaire — Taux Horaire, Mensuel, Annuel | HelloTools",
      seoDescription: "Convertissez votre salaire entre taux horaire, mensuel et annuel brut.",
      description: "Convertissez votre rémunération à n'importe quelle périodicité.",
      quickAnswer: "Calcule les équivalences entre salaire horaire, mensuel et annuel.",
      seoHowToUse: "1. Saisissez votre montant de rémunération.\n2. Sélectionnez la fréquence.\n3. Consultez la grille de conversion.",
      seoHowItWorks: "Basé sur une base annuelle de travail standard.",
      formula: "Salaire Annuel = Taux Horaire * 2080",
      seoExample: "25 €/heure équivalent à environ 4 333 €/mois ou 52 000 €/an brut.",
      faqs: [
        { q: "Combien d'heures de travail compte une année à temps plein ?", a: "Une année de travail à temps plein correspond à 1 820 heures sur la base légale de 35 heures par semaine (35 h × 52 semaines), ou 2 080 heures sur une base de 40 heures." },
        { q: "Comment convertir un taux horaire en salaire annuel brut ?", a: "Multipliez votre taux horaire par le nombre d'heures hebdomadaires, puis par 52 semaines. Exemple : 20 €/h × 35 h × 52 semaines = 36 400 € brut par an." },
        { q: "Quelle est la différence entre salaire mensuel et salaire sur 13 mois ?", a: "Le salaire mensuel classique correspond au brut annuel divisé par 12, tandis qu'une convention à 13 mois répartit la rémunération annuelle en 13 versements." },
        { q: "Le calculateur affiche-t-il le salaire brut ou net d'impôts ?", a: "Il convertit le salaire brut entre différentes périodicités. Pour obtenir le salaire net, il convient de déduire les cotisations sociales salariales (environ 22 à 25 %)." },
        { q: "Comment modéliser un contrat à temps partiel ?", a: "Indiquez le nombre exact d'heures effectuées par semaine pour obtenir la conversion précise de votre rémunération mensuelle et annuelle." }
      ]
    },
    pt: {
      name: "Calculadora de Salário",
      seoTitle: "Calculadora de Salário — Hora, Mês e Ano | HelloTools",
      seoDescription: "Converta seu salário entre valor por hora, dia, mês e ano.",
      description: "Converta sua remuneração para qualquer período de pagamento.",
      quickAnswer: "Converte equivalências salariais entre ganho por hora, mês e ano.",
      seoHowToUse: "1. Digite o valor do salário.\n2. Selecione o período de pagamento.\n3. Veja a equivalência para todos os períodos.",
      seoHowItWorks: "Baseado na jornada padrão de 44 horas semanais ou 220 horas mensais.",
      formula: "Salário Anual = Valor Hora * Horas Anuais",
      seoExample: "Um salário de R$ 25/hora equivale a aprox. R$ 4.400/mês brutos.",
      faqs: [
        { q: "Quantas horas de trabalho compõem um ano de jornada integral?", a: "Pela legislação trabalhista padrão de 44 horas semanais, somam-se 2.288 horas anuais; para jornadas de 40 horas semanais, são 2.080 horas ao ano." },
        { q: "Como converter o valor da hora de trabalho em salário mensal?", a: "Multiplique o salário-hora pela carga horária semanal e pelo fator mensal médio de 4,33 semanas (ou multiplique por 220 horas para o padrão CLT brasileiro de 44h)." },
        { q: "Qual a diferença no cálculo do salário com o 13º salário?", a: "O salário base mensal considera a divisão por 12 meses. O 13º salário e o terço constitucional de férias representam remunerações adicionais obrigatórias." },
        { q: "Esta calculadora reflete o salário bruto ou o valor líquido?", a: "A ferramenta apresenta a conversão de salários brutos. Não deduz INSS, Imposto de Renda Retido na Fonte (IRRF) ou descontos sindicais." },
        { q: "Como calcular remuneração para prestador de serviços ou PJ?", a: "Informe o valor total faturado por hora ou por mês e utilize as opções de conversão para comparar com propostas equivalentes sob regime CLT." }
      ]
    },
    ja: {
      name: "給与換算計算ツール",
      seoTitle: "給与換算計算ツール — 時給・月給・年収相互換算 | HelloTools",
      seoDescription: "時給、日給、月給、年収を入力するだけで、それぞれの相互換算額を瞬時に算出します。",
      description: "時給・日給・月給・年収の給与額を互いに簡単換算します。",
      quickAnswer: "勤務時間や出勤日数に基づき、時給から年収、月給から時給などを換算します。",
      seoHowToUse: "1. 金額を入力します。\n2. 給与形態（時給・月給・年収など）を選択します。\n3. 換算結果一覧を確認します。",
      seoHowItWorks: "年間標準労働時間（週40時間＝年間2,080時間換算等）をベースに算出します。",
      formula: "想定年収 = 時給 * 年間労働時間",
      seoExample: "時給1,500円でフルタイム（月160時間）勤務の場合、月給は約24万円、年収は約288万円です。",
      faqs: [
        { q: "フルタイム勤務における年間の標準労働時間は何時間ですか？", a: "週40時間勤務をベースとした場合、1年間（52週）の総労働時間は約2,080時間となります。日本の所定労働時間（実働8時間・年間休日120日）では約1,960時間です。" },
        { q: "時給から年収を計算するにはどうすればよいですか？", a: "時給に週の勤務時間数を掛け、さらに52週（1年間）を掛けます。例：時給2,000円×週40時間×52週 ＝ 年収416万円となります。" },
        { q: "月給制と年俸制・賞与ありでは計算はどう異なりますか？", a: "月給制は年収を12分割しますが、賞与（ボーナス）が年4ヶ月分出る場合は年収を16等分したものが基本月給の目安となります。" },
        { q: "この給与計算ツールは額面給与と手取り給与のどちらを表示しますか？", a: "額面給与（総支給額）を基準に時給・日給・月給・年収の相互換算を行います。所得税や住民税、社会保険料は控除されていません。" },
        { q: "パートタイムや時短勤務の給与計算にも利用できますか？", a: "はい。実際の週あたり労働時間を入力することで、パート・アルバイトや時短勤務における正確な月収および年収見込額を換算できます。" }
      ]
    }
  },

  'currency-converter': {
    es: {
      name: "Conversor de Divisas",
      seoTitle: "Conversor de Divisas y Cambio de Moneda | HelloTools",
      seoDescription: "Convierte montos entre las principales divisas del mundo (USD, EUR, GBP, JPY, MXN).",
      description: "Calcula tipos de cambio entre diferentes monedas del mundo.",
      quickAnswer: "Permite convertir rápidamente importes entre diferentes monedas internacionales.",
      seoHowToUse: "1. Introduce la cantidad a convertir.\n2. Selecciona la moneda de origen y destino.\n3. Consulta el resultado del cambio.",
      seoHowItWorks: "Multiplica la cantidad por la tasa de cambio entre las monedas.",
      formula: "Resultado = Importe * Tasa de Cambio",
      seoExample: "100 USD equivalen a aproximadamente 92 EUR según los tipos de cambio de mercado.",
      faqs: [
        { q: "¿Qué fuente de datos de tipos de cambio utiliza este conversor de divisas?", a: "Utiliza tipos de cambio de mercado interbancario procedentes de fuentes financieras oficiales en tiempo real, reflejando el punto medio exacto de compra y venta internacional." },
        { q: "¿Con qué periodicidad se actualizan las cotizaciones monetarias?", a: "Las tasas de cambio se actualizan de forma continua durante los días hábiles del mercado financiero de divisas (Forex)." },
        { q: "¿Se puede utilizar para viajes, facturación comercial o contabilidad?", a: "Sí, como referencia económica precisa. Para transacciones bancarias reales debe contemplarse el margen comercial aplicado por cada entidad." },
        { q: "¿Incluye este conversor comisiones bancarias o margen de diferencial?", a: "Muestra el tipo de cambio medio interbancario puro sin comisiones. Los bancos y casas de cambio aplican típicamente un margen adicional del 1% al 3%." },
        { q: "¿Qué precisión tienen los cálculos de conversión monetaria?", a: "Aplica aritmética matemática de alta precisión con hasta 4 decimales de tasa y redondeo reglamentario a 2 decimales en la divisa de destino." }
      ]
    },
    de: {
      name: "Währungsrechner",
      seoTitle: "Währungsrechner — Umrechnung Weltweiter Währungen | HelloTools",
      seoDescription: "Rechnen Sie Beträge zwischen Euro, US-Dollar, Yen und anderen Währungen um.",
      description: "Währungsbeträge schnell und einfach umrechnen.",
      quickAnswer: "Rechnet Beträge basierend auf aktuellen Wechselkursen um.",
      seoHowToUse: "1. Betrag eingeben.\n2. Ausgangs- und Zielwährung wählen.\n3. Umgerechneten Betrag ablesen.",
      seoHowItWorks: "Multipliziert den Betrag mit dem aktuellen Wechselkursverhältnis.",
      formula: "Ergebnis = Betrag * Wechselkurs",
      seoExample: "100 USD entsprechen ca. 92 EUR zum aktuellen Richtkurs.",
      faqs: [
        { q: "Welche Datenquellen nutzt dieser Währungsrechner?", a: "Er greift auf offizielle Interbanken-Mittelkurse in Echtzeit zurück, die das reale Marktgleichgewicht zwischen Kauf- und Verkaufspreisen im Devisenhandel widerspiegeln." },
        { q: "Wie oft werden die Währungskurse aktualisiert?", a: "Die Wechselkurse für alle Haupt- und Nebenwährungen werden an Bankarbeitstagen laufend aktualisiert." },
        { q: "Eignet sich der Rechner für Reiseplanung und geschäftliche Kalkulationen?", a: "Ja, als verlässliche Orientierungsgrundlage für Reisebudgets, Auslandsüberweisungen und Rechnungsprüfungen." },
        { q: "Sind Wechselgebühren oder Spreads der Banken eingerechnet?", a: "Nein, es handelt sich um den reinen Devisenmittelkurs. Bei tatsächlichen Geldwechseln erheben Banken in der Regel einen Aufschlag von 1 % bis 3 %." },
        { q: "Wie genau ist die Betragskonvertierung?", a: "Die Beträge werden anhand des tagesaktuellen Devisenkurses präzise mit zwei Nachkommastellen berechnet." }
      ]
    },
    fr: {
      name: "Convertisseur de Devises",
      seoTitle: "Convertisseur de Devises en Ligne | HelloTools",
      seoDescription: "Convertissez des montants entre les principales monnaies internationales.",
      description: "Calculez la conversion entre différentes monnaies du monde.",
      quickAnswer: "Convertit un montant d'une devises vers une autre au taux de change du marché.",
      seoHowToUse: "1. Saisissez le montant.\n2. Choisissez la devise de départ et d'arrivée.\n3. Obtenez la valeur convertie.",
      seoHowItWorks: "Applique le taux de conversion en vigueur entre les deux monnaies.",
      formula: "Montant Converti = Montant * Taux de Change",
      seoExample: "100 USD équivalent à environ 92 EUR.",
      faqs: [
        { q: "Quelle est la source des taux de change de ce convertisseur ?", a: "Il s'appuie sur les cours moyens du marché interbancaire en direct, représentant la moyenne exacte entre l'offre et la demande sur le marché des devises." },
        { q: "À quelle fréquence les cours des devises sont-ils actualisés ?", a: "Les taux sont actualisés en continu au cours des séances de négociation des devises sur les places financières mondiales." },
        { q: "Peut-on l'utiliser pour les voyages ou la facturation internationale ?", a: "Oui, comme référence officielle pour évaluer les coûts de conversion, établir des devis et gérer des budgets de déplacement." },
        { q: "Le convertisseur intègre-t-il les commissions de change bancaires ?", a: "Non, il présente le cours interbancaire brut. Les banques et bureaux de change appliquent généralement une marge de change comprise entre 1 % et 3 %." },
        { q: "Quelle est la précision du calcul des conversions de devises ?", a: "Le calcul applique le taux de change avec 4 décimales de précision et arrondit le montant converti aux centimes conventionnels." }
      ]
    },
    pt: {
      name: "Conversor de Moedas",
      seoTitle: "Conversor de Moedas e Cotação de Câmbio | HelloTools",
      seoDescription: "Converta valores entre Dólar, Euro, Real, Iene e outras moedas mundiais.",
      description: "Calcule a conversão entre diferentes moedas globais.",
      quickAnswer: "Converte valores monetários com base nas taxas de câmbio internacionais.",
      seoHowToUse: "1. Digite a quantia a ser convertida.\n2. Escolha a moeda de origem e a de destino.\n3. Veja o valor convertido.",
      seoHowItWorks: "Multiplica o valor pela taxa de câmbio vigente entre os pares.",
      formula: "Valor Convertido = Quantia * Taxa de Câmbio",
      seoExample: "100 USD equivalem a aproximadamente R$ 500 no câmbio atual.",
      faqs: [
        { q: "Qual a fonte das cotações utilizadas no conversor de moedas?", a: "Utiliza as cotações médias do mercado interbancário internacional em tempo real, que representam a taxa neutra entre compra e venda." },
        { q: "Com que frequência as taxas cambiais são atualizadas?", a: "As cotações das principais moedas mundiais são atualizadas periodicamente nos dias de funcionamento do mercado financeiro global." },
        { q: "A ferramenta pode ser utilizada para orçamentos de viagens e negócios?", a: "Sim, como excelente balizador de preços para compras no exterior, planejamento de viagens internacionais e transações corporativas." },
        { q: "As taxas de spread bancário e IOF estão inclusas na conta?", a: "Não. A conversão reflete o câmbio comercial puro. Operações reais em cartões ou bancos incidem margem cambial (spread) e tributos como o IOF." },
        { q: "A precisão do valor convertido atende aos padrões financeiros?", a: "Sim, as operações utilizam precisão estrita de quatro casas decimais na cotação com arredondamento comercial no valor convertido." }
      ]
    },
    ja: {
      name: "通貨換算ツール",
      seoTitle: "通貨換算ツール — 為替レート計算 | HelloTools",
      seoDescription: "日本円（JPY）、米ドル（USD）、ユーロ（EUR）など、世界の主要通貨を為替レートで瞬時に換算します。",
      description: "世界の主要通貨間の最新為替換算を計算します。",
      quickAnswer: "指定された通貨間の為替レートに基づき金額を相互換算します。",
      seoHowToUse: "1. 換算したい金額を入力します。\n2. 変換元の通貨と変換先の通貨を選択します。\n3. 換算後の金額を確認します。",
      seoHowItWorks: "基軸レートに基づき通貨ペアごとの対比計算を行います。",
      formula: "換算金額 = 元の金額 * 為替レート",
      seoExample: "100米ドルは現在のレートで約15,000円に換算されます。",
      faqs: [
        { q: "為替レートのデータソースは何を使用していますか？", a: "国際外国為替市場（インターバンク市場）のリアルタイム公定仲値（ミッドレート）を参照しています。" },
        { q: "為替レートはどのくらいの頻度で更新されますか？", a: "平日の為替市場取引時間中に定期的に自動更新され、最新の市場相場を反映しています。" },
        { q: "海外旅行の予算管理や海外通販の決済目安に使えますか？", a: "はい。旅行時の換金目安や海外ネット通販の概算支払額の把握に最適です。" },
        { q: "クレジットカードの手数料や両替手数料は含まれますか？", a: "いいえ。手数料を含まない為替市場の純粋な基準レートを表示しています。実際の両替やカード決済では1.5〜3.0%前後の為替手数料が上乗せされます。" },
        { q: "為替換算の計算精度について教えてください。", a: "主要通貨ペアに対して適切な有効桁数を保持し、通貨の最小単位に合わせた正確な四捨五入計算を行っています。" }
      ]
    }
  },

  'scientific-calculator': {
    es: {
      name: "Calculadora Científica",
      seoTitle: "Calculadora Científica Online | HelloTools",
      seoDescription: "Calculadora científica completa con funciones trigonométricas, logaritmos y potencias.",
      description: "Resuelve operaciones matemáticas complejas directamente en tu navegador.",
      quickAnswer: "Ejecuta operaciones matemáticas avanzadas como sin, cos, tan, log y potencias.",
      seoHowToUse: "1. Utiliza el teclado numérico y los botones de funciones.\n2. Pulsa = para obtener el resultado.",
      seoHowItWorks: "Utiliza las funciones matemáticas integradas en el motor JavaScript de tu navegador.",
      formula: "Funciones = Math.sin(), Math.cos(), Math.log(), Math.pow()",
      seoExample: "sin(30°) = 0,5 | log10(100) = 2.",
      faqs: [
        { q: "¿Qué funciones matemáticas avanzadas incluye esta calculadora científica?", a: "Incluye trigonometría (seno, coseno, tangente y sus inversas), logaritmos (ln, log10), exponenciales, potencias, raíces, factorial y constantes (π, e)." },
        { q: "¿Admite cálculos en grados sexagesimales (DEG) y radianes (RAD)?", a: "Sí. Puedes alternar fácilmente entre los modos DEG (grados) y RAD (radianes) para trigonometría." },
        { q: "¿Respeta la jerarquía matemática estándar de las operaciones (PEMDAS)?", a: "Sí. Ejecuta primero paréntesis, exponentes, multiplicaciones/divisiones y finalmente sumas/restas de izquierda a derecha." },
        { q: "¿Puedo encadenar operaciones complejas con paréntesis anidados?", a: "Sí. Puedes introducir expresiones complejas con múltiples niveles de paréntesis y evaluar la expresión completa." },
        { q: "¿Se requiere conexión a internet para usar la calculadora científica?", a: "No. Toda la lógica del motor matemático corre directamente en JavaScript en tu navegador de forma autónoma." }
      ]
    },
    de: {
      name: "Wissenschaftlicher Taschenrechner",
      seoTitle: "Wissenschaftlicher Taschenrechner Online | HelloTools",
      seoDescription: "Vollwertiger wissenschaftlicher Rechner mit Trigonometrie, Logarithmen und Potenzen.",
      description: "Komplexe mathematische Funktionen direkt im Browser berechnen.",
      quickAnswer: "Führt fortgeschrittene Mathe-Funktionen wie Sinus, Kosinus, Logarithmus und Potenzen aus.",
      seoHowToUse: "1. Formel über die Funktionstasten eingeben.\n2. Auf = drücken.",
      seoHowItWorks: "Nutzt die mathematischen Funktionen des Browsers.",
      formula: "Funktionen = Math.sin(), Math.cos(), Math.log(), Math.pow()",
      seoExample: "sin(30°) = 0.5 | log10(100) = 2.",
      faqs: [
        { q: "Welche wissenschaftlichen Funktionen sind integriert?", a: "Trigonometrie (sin, cos, tan), Umkehrfunktionen, Logarithmen (ln, log), Potenzen, Wurzeln, Fakultät sowie die mathematischen Konstanten Pi (π) und Euler (e)." },
        { q: "Kann man zwischen Gradmaß (DEG) und Bogenmaß (RAD) umschalten?", a: "Ja, ein Schalter ermöglicht den nahtlosen Wechsel zwischen DEG (Grad) und RAD (Radiant) für alle Winkelfunktionen." },
        { q: "Beachtet der Rechner die Punkt-vor-Strich-Regel und Klammern?", a: "Ja, die Auswertung folgt streng den Standardregeln der algebraischen Operator-Hierarchie (Klammern, Potenzen, Punkt vor Strich)." },
        { q: "Werden verschachtelte Klammerausdrücke unterstützt?", a: "Ja, Sie können komplexe mathematische Terme mit mehreren Klammerebenen übersichtlich eingeben und berechnen." },
        { q: "Funktioniert der wissenschaftliche Rechner auch offline?", a: "Ja, die gesamte Mathematik läuft lokal und unabhängig im Browser ohne Serverabhängigkeit." }
      ]
    },
    fr: {
      name: "Calculatrice Scientifique",
      seoTitle: "Calculatrice Scientifique en Ligne | HelloTools",
      seoDescription: "Calculatrice scientifique complète avec trigonométrie, logarithmes et puissances.",
      description: "Résolvez des opérations mathématiques complexes en ligne.",
      quickAnswer: "Exécute des calculs scientifiques avancés comme sin, cos, tan, log et exponentielles.",
      seoHowToUse: "1. Utilisez les touches de fonctions scientifiques.\n2. Obtenez le résultat instantané.",
      seoHowItWorks: "Repose sur la bibliothèque mathématique JavaScript native.",
      formula: "Fonctions = Math.sin(), Math.cos(), Math.log()",
      seoExample: "sin(30°) = 0,5 | log10(100) = 2.",
      faqs: [
        { q: "Quelles fonctions avancées propose cette calculatrice scientifique ?", a: "Trigonométrie (sin, cos, tan, arcsin, arccos, arctan), logarithmes (ln, log10), exponentielles, puissances, racines, factorielle et constantes Pi et e." },
        { q: "Prend-elle en charge les modes Degrés (DEG) et Radians (RAD) ?", a: "Oui. Vous pouvez basculer d'un simple clic entre le calcul trigonométrique en degrés ou en radians." },
        { q: "Respecte-t-elle l'ordre de priorité des opérations (PEMDAS) ?", a: "Oui. Les parenthèses, exposants, multiplications/divisions et additions/soustractions sont rigoureusement ordonnés." },
        { q: "Peut-on formuler des expressions mathématiques complexes ?", a: "Oui, vous pouvez imbriquer plusieurs niveaux de parenthèses pour résoudre des équations élaborées." },
        { q: "Nécessite-t-elle un accès serveur pour calculer ?", a: "Non. L'interpréteur mathématique s'exécute entièrement sur votre appareil en JavaScript." }
      ]
    },
    pt: {
      name: "Calculadora Científica",
      seoTitle: "Calculadora Científica Online Gratuita | HelloTools",
      seoDescription: "Calculadora científica com seno, cosseno, tangente, logaritmos e potências.",
      description: "Execute contas matemáticas complexas diretamente no seu navegador.",
      quickAnswer: "Calcula funções avançadas como trigonometria, logaritmos e potências.",
      seoHowToUse: "1. Insira os números e selecione as funções desejadas.\n2. Pressione = para calcular.",
      seoHowItWorks: "Processa cálculos avançados usando funções matemáticas nativas do navegador.",
      formula: "Funções = Math.sin(), Math.cos(), Math.log()",
      seoExample: "sen(30°) = 0,5 | log10(100) = 2.",
      faqs: [
        { q: "Quais funções avançadas estão disponíveis na calculadora científica?", a: "Trigonometria completa (seno, cosseno, tangente e arcos), logaritmos natural (ln) e decimal (log), potências, radiciação, fatorial e constantes π e e." },
        { q: "É possível alternar entre Graus (DEG) e Radianos (RAD)?", a: "Sim. Um botão seletor permite alternar entre ângulos em graus e radianos para qualquer função trigonométrica." },
        { q: "O motor de cálculo segue a precedência padrão das operações?", a: "Sim. Respeita rigorosamente a ordem de parênteses, expoentes, multiplicação, divisão, adição e subtração." },
        { q: "A ferramenta suporta expressões com parênteses encadeados?", a: "Sim, suporta expressões matemáticas longas com múltiplos níveis de abertura e fechamento de parênteses." },
        { q: "A calculadora necessita de internet ativa para processar as contas?", a: "Não. O processamento matemático é 100% autônomo e executado no navegador do usuário." }
      ]
    },
    ja: {
      name: "科学計算電卓ツール",
      seoTitle: "Web科学計算電卓 — 三角関数・対数・指数 | HelloTools",
      seoDescription: "三角関数（sin, cos, tan）、対数（log, ln）、乗根、階乗などを計算できる高機能Web関数電卓です。",
      description: "高度な数学・科学計算をブラウザ上で実行します。",
      quickAnswer: "三角関数や対数、指数関数などの高度な科学計算を瞬時に行う電卓です。",
      seoHowToUse: "1. 画面上の関数キーや数字ボタンをクリック（入力）します。\n2. ＝を押して計算結果を表示します。",
      seoHowItWorks: "JavaScriptの高精度数学オブジェクト (Math) を用いて計算処理します。",
      formula: "関数 = Math.sin(), Math.cos(), Math.log(), Math.pow()",
      seoExample: "sin(30°) = 0.5 、 log10(100) = 2 となります。",
      faqs: [
        { q: "この関数電卓はどのような高度な数学計算に対応していますか？", a: "三角関数（sin, cos, tan）、逆三角関数、対数（自然対数ln、常用対数log）、累乗、平方根・立方根、階乗（!）、円周率π、自然対数の底eに対応しています。" },
        { q: "度数法（DEG）と弧度法（RAD：ラジアン）の切り替えは可能ですか？", a: "はい。ワンクリックで角度の単位系（DEG / RAD）を簡単に切り替えて三角関数計算が可能です。" },
        { q: "四則演算の優先順位（カッコ・乗除優先）は守られますか？", a: "はい。数学標準の演算優先規則（カッコ内最優先、累乗、乗除、加減の順）に厳密に従って数式を評価します。" },
        { q: "カッコを多重に使った複雑な数式の入力も計算できますか？", a: "はい。入れ子状のカッコを含んだ長文の数式をそのまま入力し、正確な答えを一括計算できます。" },
        { q: "通信環境のないオフライン環境でも動作しますか？", a: "はい。すべての数学演算エンジンはお使いのブラウザ内部のJavaScriptで動作するため、通信不要で快適に計算できます。" }
      ]
    }
  },

  'square-root-calculator': {
    es: {
      name: "Calculadora de Raíz Cuadrada",
      seoTitle: "Calculadora de Raíz Cuadrada y Raíces N-ésimas | HelloTools",
      seoDescription: "Calcula la raíz cuadrada (√x) y la raíz n-ésima de cualquier número positivo o decimal.",
      description: "Calcula la raíz cuadrada y cúbica de cualquier número.",
      quickAnswer: "Determina el número que multiplicado por sí mismo da como resultado el valor original.",
      seoHowToUse: "1. Introduce el número deseado.\n2. Selecciona si deseas la raíz cuadrada (√) o n-ésima.\n3. Obtén el resultado exacto.",
      seoHowItWorks: "Aplica la función Math.sqrt() o la potencia fraccionaria Math.pow(x, 1/n).",
      formula: "√x = x^(1/2)",
      seoExample: "La raíz cuadrada de 144 es 12.",
      faqs: [
        { q: "¿Qué raíces matemáticas calcula esta herramienta?", a: "Calcula raíces cuadradas (√x), raíces cúbicas (∛x) y cualquier raíz enésima personalizada (ⁿ√x) con alta precisión decimal." },
        { q: "¿Cómo se simplifica una raíz cuadrada no exacta?", a: "La herramienta descompone el radicando en factores primos para extraer los cuadrados perfectos fuera del radical (ej. √75 = 5√3) además de mostrar el decimal." },
        { q: "¿Qué ocurre al calcular la raíz cuadrada de un número negativo?", a: "En el conjunto de los números reales no existe solución real; el resultado pertenece a los números complejos e imaginarios (ej. √-9 = 3i)." },
        { q: "¿Qué es un número cuadrado perfecto?", a: "Es un número entero obtenido al multiplicar un entero por sí mismo (ej. 1, 4, 9, 16, 25, 36, 49, 64, 81, 100), cuya raíz cuadrada es exacta." },
        { q: "¿Cuál es la fórmula algebraica de una raíz enésima?", a: "Una raíz equivale a una potencia fraccionaria: ⁿ√x = x^(1/n)." }
      ]
    },
    de: {
      name: "Quadratwurzelrechner",
      seoTitle: "Quadratwurzelrechner — Wurzel Ziehen (√x) | HelloTools",
      seoDescription: "Berechnen Sie Quadratwurzeln und n-te Wurzeln präzise online.",
      description: "Quadratwurzeln und Kubikwurzeln schnell berechnen.",
      quickAnswer: "Berechnet die Zahl, die mit sich selbst multipliziert den Eingabewert ergibt.",
      seoHowToUse: "1. Zahl eingeben.\n2. Wurzeltyp wählen.\n3. Ergebnis ablesen.",
      seoHowItWorks: "Verwendet Math.sqrt() oder Exponentialrechnung.",
      formula: "√x = x^(1/2)",
      seoExample: "Die Quadratwurzel aus 144 ist 12.",
      faqs: [
        { q: "Welche Wurzeln kann dieser Wurzelrechner berechnen?", a: "Er berechnet Quadratwurzeln (√), Kubikwurzeln (∛) und beliebige n-te Wurzeln (ⁿ√) mit hoher Dezimalpräzision." },
        { q: "Wird die Wurzel auch exakt radiziert und vereinfacht?", a: "Ja, das Tool liefert neben dem Dezimalwert auch die teilradizierte exakte Form durch Zerlegung in Quadratzahlen (z. B. √50 = 5√2)." },
        { q: "Kann man die Quadratwurzel aus negativen Zahlen ziehen?", a: "Im reellen Zahlenbereich ist dies nicht definiert; die Lösung liegt im Bereich der komplexen Zahlen mit der imaginären Einheit i (z. B. √-16 = 4i)." },
        { q: "Was versteht man unter einer Quadratzahl?", a: "Eine Quadratzahl entsteht durch Multiplikation einer ganzen Zahl mit sich selbst (z. B. 7 × 7 = 49). Ihre Quadratwurzel ist eine ganze Zahl." },
        { q: "Wie lautet die Potenzschreibweise für Wurzeln?", a: "Jede Wurzel lässt sich als Bruchpotenz ausdrücken: Die n-te Wurzel aus x entspricht x^(1/n)." }
      ]
    },
    fr: {
      name: "Calculateur de Racine Carrée",
      seoTitle: "Calculateur de Racine Carrée (√x) | HelloTools",
      seoDescription: "Calculez la racine carrée et la racine n-ième de n'importe quel nombre.",
      description: "Trouvez la racine carrée exacte de vos nombres.",
      quickAnswer: "Détermine la valeur qui, multipliée par elle-même, donne le nombre initial.",
      seoHowToUse: "1. Saisissez le nombre.\n2. Choisissez le degré de racine.\n3. Lisez le résultat.",
      seoHowItWorks: "Utilise la fonction Math.sqrt().",
      formula: "√x = x^(1/2)",
      seoExample: "La racine carrée de 144 est 12.",
      faqs: [
        { q: "Quels types de racines ce calculateur permet-il de résoudre ?", a: "Il extrait les racines carrées (√x), les racines cubiques (∛x) et n'importe quelle racine n-ième (ⁿ√x) avec précision." },
        { q: "Permet-il de simplifier un radical sous forme exacte ?", a: "Oui, il identifie les carrés parfaits pour simplifier l'écriture sous le radical (ex. √72 = 6√2) en plus d'afficher la valeur décimale." },
        { q: "Quelle est la racine carrée d'un nombre négatif ?", a: "Elle n'admet aucune solution dans les nombres réels et fait appel aux nombres imaginaires complexes (ex. √-25 = 5i)." },
        { q: "Qu'est-ce qu'un carré parfait en arithmétique ?", a: "Un entier dont la racine carrée est un nombre entier exact (ex. 1, 4, 9, 16, 25, 36, 49, 64, 81, 100)." },
        { q: "Comment exprimer une racine sous forme d'exposant ?", a: "La racine n-ième d'un nombre équivaut mathématiquement à l'élever à la puissance 1/n : ⁿ√x = x^(1/n)." }
      ]
    },
    pt: {
      name: "Calculadora de Raiz Quadrada",
      seoTitle: "Calculadora de Raiz Quadrada (√x) | HelloTools",
      seoDescription: "Calcule a raiz quadrada e a raiz n-ésima de números inteiros e decimais.",
      description: "Descubra a raiz quadrada exata de qualquer número.",
      quickAnswer: "Calcula o valor que multiplicado por ele mesmo resulta no número digitado.",
      seoHowToUse: "1. Digite o número.\n2. Escolha o tipo de raiz (quadrada ou n-ésima).\n3. Veja a resposta.",
      seoHowItWorks: "Aplica a função de potenciação fracionária.",
      formula: "√x = x^(1/2)",
      seoExample: "A raiz quadrada de 144 é 12.",
      faqs: [
        { q: "Quais tipos de raízes matemáticas podem ser calculadas?", a: "Calcula raiz quadrada (√), raiz cúbica (∛) e qualquer raiz de índice n (ⁿ√x) com precisão decimal estrita." },
        { q: "A ferramenta simplifica radicais não exatos?", a: "Sim. Além do valor decimal aproximado, extrai fatores do radicando para exibir a forma simplificada exata (ex.: √32 = 4√2)." },
        { q: "É possível extrair a raiz quadrada de um número negativo?", a: "Não existem raízes quadradas reais de números negativos; a resposta recai no conjunto dos números complexos (ex.: √-4 = 2i)." },
        { q: "O que define um número como quadrado perfeito?", a: "É o produto da multiplicação de um número inteiro por ele mesmo (como 9, 16, 25, 49, 64), possuindo raiz quadrada inteira." },
        { q: "Qual a relação entre raízes e potências fracionárias?", a: "Toda raiz pode ser escrita como expoente fracionário: a raiz n-ésima de x é rigorosamente igual a x^(1/n)." }
      ]
    },
    ja: {
      name: "平方根（ルート）計算ツール",
      seoTitle: "平方根（ルート √）計算ツール | HelloTools",
      seoDescription: "数値の平方根（√x）や立方根、指定したn乗根を小数点以下の精度で計算します。",
      description: "数値の平方根（ルート）やn乗根を計算します。",
      quickAnswer: "二乗（二乗して元の数になる）するとその数になる値を計算します。",
      seoHowToUse: "1. 数値を入力します。\n2. 平方根（√）または任意のn乗根を選択します。\n3. 計算結果を確認します。",
      seoHowItWorks: "JavaScriptの Math.sqrt() または Math.pow(x, 1/n) を用いて処理します。",
      formula: "√x = x^(1/2)",
      seoExample: "144の平方根（√144）は 12 です。",
      faqs: [
        { q: "平方根計算ツールで計算できるルートの種類は？", a: "通常の平方根（2乗根・√x）、立方根（3乗根・∛x）、および任意のn乗根（ⁿ√x）の計算に対応しています。" },
        { q: "ルートの簡約化（素因数分解による根号の変形）はできますか？", a: "はい。小数値の表示だけでなく、平方根の整数部分をルートの外に出す「a√b」の形式（例：√48 ＝ 4√3）にも対応しています。" },
        { q: "マイナスの数値（負の数）の平方根はどうなりますか？", a: "実数の範囲内では解が存在せず、虚数単位 i を用いた複素数として扱われます（例：√-9 ＝ 3i）。" },
        { q: "「完全平方数（平方数）」とは何ですか？", a: "ある整数を2乗して得られる整数（1, 4, 9, 16, 25, 36, 49, 64, 81, 100など）のことで、ルートをつけると小数の端数が出ず整数になります。" },
        { q: "累乗（指数）でルートを表現するにはどうしますか？", a: "数学の定義上、n乗根は「xの(1/n)乗」と等しくなります。例えば平方根√xはx^(1/2)、立方根∛xはx^(1/3)と表されます。" }
      ]
    }
  },

  'random-number-generator': {
    es: {
      name: "Generador de Números Aleatorios",
      seoTitle: "Generador de Números Aleatorios Online | HelloTools",
      seoDescription: "Genera números enteros o decimales al azar entre un rango mínimo y máximo.",
      description: "Obtén números aleatorios dentro del rango que tú elijas.",
      quickAnswer: "Genera valores numéricos al azar dentro de un rango especificado.",
      seoHowToUse: "1. Introduce el valor mínimo y máximo.\n2. Elige la cantidad de números deseada.\n3. Haz clic en Generar.",
      seoHowItWorks: "Utiliza el algoritmo de generación pseudoaleatoria de alta velocidad del navegador.",
      formula: "Resultado = Math.floor(Math.random() * (Max - Min + 1)) + Min",
      seoExample: "Generar un número entre 1 y 100 devuelve un valor al azar como 42.",
      faqs: [
        { q: "¿Qué método de aleatoriedad utiliza este generador?", a: "Utiliza la API de Criptografía Web nativa del navegador (crypto.getRandomValues), garantizando valores pseudoaleatorios criptográficamente seguros para sorteos y estadísticas." },
        { q: "¿Permite generar listas de números únicos sin repetición?", a: "Sí. Puedes seleccionar la opción \"Sin duplicados\" para generar sorteos de lotería o listas de números únicos dentro de un rango determinado." },
        { q: "¿Puedo definir un rango mínimo y máximo personalizado?", a: "Sí. Puedes establecer libremente cualquier valor mínimo y máximo, incluidos números negativos." },
        { q: "¿Sirve para sorteos justos o concursos en línea?", a: "Sí. Al utilizar entropía criptográfica del sistema operativo, cada número tiene exactamente la misma probabilidad matemática de ser elegido." },
        { q: "¿Se almacenan los números generados?", a: "No. Todos los resultados se producen de forma efímera en tu navegador sin registro en bases de datos." }
      ]
    },
    de: {
      name: "Zufallszahlen-Generator",
      seoTitle: "Zufallszahlen Generator — Zahlen Zufällig Generieren | HelloTools",
      seoDescription: "Generieren Sie Zufallszahlen zwischen frei wählbaren Min- und Max-Werten.",
      description: "Zufällige Zahlen schnell und einfach erzeugen.",
      quickAnswer: "Erzeugt echte Pseudozufallszahlen in einem festgelegten Bereich.",
      seoHowToUse: "1. Minimum und Maximum festlegen.\n2. Anzahl der Zahlen wählen.\n3. Auf Generieren klicken.",
      seoHowItWorks: "Verwendet Math.random() zur Berechnung.",
      formula: "Zahl = Math.floor(Math.random() * (Max - Min + 1)) + Min",
      seoExample: "Eine Zufallszahl zwischen 1 und 100 könnte z.B. 42 sein.",
      faqs: [
        { q: "Welche Zufallslogik verwendet dieser Zufallsgenerator?", a: "Er nutzt die kryptografisch sichere Web Crypto API (crypto.getRandomValues) des Browsers, was eine gleichmäßige und manipulationssichere Zufallsverteilung garantiert." },
        { q: "Kann man Zahlenfolgen ohne Wiederholungen (Duplikate) erzeugen?", a: "Ja, aktivieren Sie die Option \"Keine Duplikate\", um Zahlen für Tombolas, Verlosungen oder Zufallsstichproben ohne Dopplungen zu generieren." },
        { q: "Lassen sich negative Zahlenbereiche festlegen?", a: "Ja, Sie können beliebige Min- und Max-Werte frei definieren, einschließlich negativer Spannen (z. B. von -50 bis +50)." },
        { q: "Eignet sich der Generator für rechtskonforme Gewinnspiele?", a: "Ja, durch die kryptografische Zufallsquelle des Betriebssystems ist die statistische Chancengleichheit jedes einzelnen Wertes gewährleistet." },
        { q: "Werden generierte Zahlenfolgen gespeichert?", a: "Nein, alle Zufallszahlen werden ausschließlich im flüchtigen Speicher des Browsers erzeugt." }
      ]
    },
    fr: {
      name: "Générateur de Nombres Aléatoires",
      seoTitle: "Générateur de Nombres Aléatoires en Ligne | HelloTools",
      seoDescription: "Générez des nombres au hasard entre une valeur minimale et maximale.",
      description: "Tirez des nombres au sort facilement.",
      quickAnswer: "Génère un ou plusieurs nombres au hasard dans une plage donnée.",
      seoHowToUse: "1. Définissez la borne min et max.\n2. Indiquez le nombre de tirages.\n3. Cliquez sur Générer.",
      seoHowItWorks: "Repose sur l'algorithme aléatoire du moteur JS.",
      formula: "Nombre = Math.floor(Math.random() * (Max - Min + 1)) + Min",
      seoExample: "Un tirage entre 1 et 100 peut donner par exemple 42.",
      faqs: [
        { q: "Quel algorithme régit la génération des nombres aléatoires ?", a: "Il utilise l'API Web Crypto standard du navigateur (crypto.getRandomValues), assurant une génération pseudo-aléatoire de qualité cryptographique." },
        { q: "Peut-on tirer des nombres uniques sans doublon ?", a: "Oui. L'option de tirage sans remise garantit que chaque nombre de la série n'est tiré qu'une seule fois." },
        { q: "Est-il possible de définir des bornes négatives et positives ?", a: "Oui. Vous pouvez définir librement les valeurs minimale et maximale dans n'importe quelle plage d'entiers." },
        { q: "Est-il adapté aux tirages au sort de concours ?", a: "Oui. L'impartialité statistique est garantie par la source d'entropie système du navigateur." },
        { q: "Les tirages sont-ils enregistrés sur vos serveurs ?", a: "Non. Les tirages sont éphémères et traités localement sans aucune sauvegarde." }
      ]
    },
    pt: {
      name: "Gerador de Números Aleatórios",
      seoTitle: "Gerador de Números Aleatórios | HelloTools",
      seoDescription: "Gere números inteiros ou decimais aleatórios em um intervalo escolhido.",
      description: "Gere números ao acaso de forma simples e rápida.",
      quickAnswer: "Sortia números aleatórios entre um limite mínimo e máximo.",
      seoHowToUse: "1. Insira o valor mínimo e o máximo.\n2. Escolha a quantidade de números.\n3. Clique em Gerar.",
      seoHowItWorks: "Processa o sorteio via Math.random().",
      formula: "Número = Math.floor(Math.random() * (Max - Min + 1)) + Min",
      seoExample: "Gerar um número de 1 a 100 pode resultar em 42.",
      faqs: [
        { q: "Qual o critério de aleatoriedade do gerador de números?", a: "Utiliza a Web Crypto API criptograficamente segura do navegador, proporcionando aleatoriedade de alta entropia sem viés estatístico." },
        { q: "É possível gerar sorteios com números únicos sem repetição?", a: "Sim. Basta habilitar a opção \"Sem repetição\" para sortear rifas, loterias ou listas exclusivas sem duplicatas." },
        { q: "A ferramenta permite intervalos com valores negativos?", a: "Sim. Você pode configurar qualquer intervalo entre limites mínimos e máximos inteiros." },
        { q: "Serve para realizar sorteios justos em eventos e redes sociais?", a: "Sim. Todos os números possuem idêntica probabilidade matemática de serem selecionados." },
        { q: "Os números gerados ficam salvos na plataforma?", a: "Não. Os dados são gerados localmente e descartados ao atualizar a página." }
      ]
    },
    ja: {
      name: "乱数生成ツール",
      seoTitle: "乱数生成ツール — ランダム数字作成 | HelloTools",
      seoDescription: "最小値と最大値を指定して、ランダムな数値（整数・小数）を自動生成します（重複排除機能付き）。",
      description: "指定した範囲からランダムな数字を生成します。",
      quickAnswer: "指定された範囲内で条件に合うランダムな数字を作成します。",
      seoHowToUse: "1. 最小値と最大値を入力します。\n2. 生成したい個数を指定します。\n3. 「生成」ボタンを押します。",
      seoHowItWorks: "JavaScriptの Math.random() 乱数処理アルゴリズムを用いて生成します。",
      formula: "乱数 = Math.floor(Math.random() * (Max - Min + 1)) + Min",
      seoExample: "1から100の範囲で乱数を1個生成すると、42のような数字がランダムに出力されます。",
      faqs: [
        { q: "乱数生成のアルゴリズムには何が使用されていますか？", a: "ブラウザ標準の暗号論的疑似乱数生成API（crypto.getRandomValues）を採用しており、偏りのない安全で公平な乱数を生成します。" },
        { q: "重複なし（ユニークな数字のみ）の抽選リストを作成できますか？", a: "はい。「重複なし」設定を有効にすることで、ビンゴ大会や抽選会、席替えなどで同一の数字が複数回選ばれないように設定できます。" },
        { q: "最小値・最大値や負の数（マイナス値）の範囲指定は可能ですか？", a: "はい。最小値から最大値までの範囲を自由に設定でき、負の数を含めた数値範囲にも完全対応しています。" },
        { q: "プレゼント企画やオンライン抽選の公正なツールとして使えますか？", a: "はい。OSの物理エントロピーを利用した高度な乱数生成器を使用しているため、誰に対しても公平な抽選結果が得られます。" },
        { q: "生成された番号リストはサーバーに記録されますか？", a: "いいえ。すべての乱数生成はお使いのブラウザ上でローカルに行われ、外部サーバーへの通信・ログ記録は一切ありません。" }
      ]
    }
  },

  'grade-calculator': {
    es: {
      name: "Calculadora de Calificaciones",
      seoTitle: "Calculadora de Calificaciones y Notas Ponderadas | HelloTools",
      seoDescription: "Calcula tu nota final ponderada introduciendo tus exámenes, tareas y sus porcentajes.",
      description: "Calcula tu nota media final basada en el peso de cada evaluación.",
      quickAnswer: "Obtiene la nota media ponderada multiplicando cada calificación por su porcentaje de peso.",
      seoHowToUse: "1. Introduce la nota obtenida en cada examen o tarea.\n2. Indica el porcentaje de peso de cada una.\n3. Lee tu calificación final.",
      seoHowItWorks: "Suma las notas ponderadas y las divide entre la suma de pesos.",
      formula: "Nota Final = Σ (Nota * Peso) / Σ (Peso)",
      seoExample: "Si sacas un 8 (peso 40%) y un 9 (peso 60%), tu nota final ponderada es 8,6.",
      faqs: [
        { q: "¿Cómo calcula esta herramienta la nota final de una asignatura?", a: "Calcula la media ponderada de todas tus tareas, exámenes y proyectos multiplicando cada calificación por su porcentaje de peso asignado." },
        { q: "¿Qué escala de calificaciones admite este calculador de notas?", a: "Admite escalas numéricas estándar (0 a 10, 0 a 100) y su correspondencia con el sistema de letras (A, B, C, D, F)." },
        { q: "¿Puedo calcular qué nota necesito sacar en el examen final para aprobar?", a: "Sí. Puedes introducir las notas de los trabajos evaluados hasta la fecha para averiguar qué puntuación mínima requieres en el examen final." },
        { q: "¿Es matemáticamente exacto el cálculo de la nota media?", a: "Sí. Utiliza la fórmula rigurosa de media ponderada: Nota Final = Σ(Calificación × Peso) / Σ(Pesos)." },
        { q: "¿Se guardan mis notas académicas en internet?", a: "No. Todas tus calificaciones se introducen y calculan de forma anónima en tu propio dispositivo sin guardarse en bases de datos." }
      ]
    },
    de: {
      name: "Notenrechner",
      seoTitle: "Notenrechner — Gewichtigten Notendurchschnitt Berechnen | HelloTools",
      seoDescription: "Berechnen Sie Ihren gewichteten Notendurchschnitt für Schule, Ausbildung und Studium.",
      description: "Ermitteln Sie Ihre Endnote basierend auf der Gewichtung von Arbeiten.",
      quickAnswer: "Berechnet den Notendurchschnitt unter Berücksichtigung der prozentualen Gewichtung.",
      seoHowToUse: "1. Noten der Prüfungen eingeben.\n2. Die jeweilige Gewichtung (in %) angeben.\n3. Gesamtnote ablesen.",
      seoHowItWorks: "Multipliziert jede Note mit ihrem Gewicht und summiert die Werte.",
      formula: "Endnote = Σ (Note * Gewicht) / Σ (Gewicht)",
      seoExample: "Eine 2,0 (Gewicht 40 %) und eine 1,0 (Gewicht 60 %) ergeben den Durchschnitt 1,4.",
      faqs: [
        { q: "Wie berechnet der Notenrechner die Gesamtnote eines Kurses?", a: "Er bildet den gewichteten Durchschnitt aller Klausuren, Hausarbeiten und mündlichen Noten basierend auf deren prozentualer Gewichtung." },
        { q: "Welche Notenskalen können eingegeben werden?", a: "Es können sowohl die deutsche Schulnotenskala (1 bis 6), das gymnasiale Punktesystem (0 bis 15 Punkte) als auch Prozentwerte flexibel gewichtet werden." },
        { q: "Kann man die benötigte Note für die Abschlussprüfung berechnen?", a: "Ja. Tragen Sie die bisherigen Noten ein, um die Mindestnote zu ermitteln, die in der finalen Prüfung für das Gesamtziel erforderlich ist." },
        { q: "Wie exakt ist die Berechnung des Notendurchschnitts?", a: "Die Berechnung erfolgt mathematisch exakt nach der Formel des gewichteten arithmetischen Mittels." },
        { q: "Werden Schulnoten oder Zeugnisdaten online gespeichert?", a: "Nein. Sämtliche Noteneingaben verbleiben rein lokal und vertraulich in Ihrem Browser." }
      ]
    },
    fr: {
      name: "Calculateur de Notes",
      seoTitle: "Calculateur de Notes et Moyenne Pondérée | HelloTools",
      seoDescription: "Calculez votre moyenne générale pondérée avec les coefficients de chaque matière.",
      description: "Calculez votre note finale en fonction des coefficients.",
      quickAnswer: "Multiplie chaque note par son coefficient pour calculer la moyenne pondérée.",
      seoHowToUse: "1. Entrez les notes obtenues.\n2. Indiquez le coefficient de chaque devoir.\n3. Obtenez votre moyenne finale.",
      seoHowItWorks: "Fait la somme des produits (note x coeff) divisée par la somme des coefficients.",
      formula: "Moyenne = Σ (Note * Coefficient) / Σ (Coefficient)",
      seoExample: "Un 15 (coeff 2) et un 18 (coeff 3) donnent une moyenne de 16,8 / 20.",
      faqs: [
        { q: "Comment ce calculateur évalue-t-il la moyenne générale pondérée ?", a: "Il effectue la moyenne pondérée de vos devoirs, partiels et examens en multipliant chaque note par son coefficient respectif." },
        { q: "Quels barèmes de notation sont compatibles ?", a: "Il est compatible avec la notation française standard sur 20, le système sur 100 et les barèmes universitaires avec crédits ECTS." },
        { q: "Peut-on calculer la note minimale à obtenir au partiel final pour valider ?", a: "Oui. Renseignez vos notes obtenues en contrôle continu pour connaître la note requise à l'examen terminal pour atteindre la moyenne cible." },
        { q: "La formule de calcul correspond-elle à celle de l'université ou du lycée ?", a: "Oui. La moyenne générale est calculée strictement par la formule légale : Somme des (Notes × Coefficients) / Somme des Coefficients." },
        { q: "Mes résultats scolaires sont-ils protégés et confidentiels ?", a: "Oui. Aucune note n'est transmise ni enregistrée sur nos serveurs." }
      ]
    },
    pt: {
      name: "Calculadora de Notas e Médias",
      seoTitle: "Calculadora de Notas e Média Ponderada | HelloTools",
      seoDescription: "Calcule sua nota final ponderada de provas, trabalhos e atividades acadêmicas.",
      description: "Descubra sua média final escolar ou universitária.",
      quickAnswer: "Calcula a média escolar multiplicando as notas pelos respectivos pesos.",
      seoHowToUse: "1. Digite as notas obtidas nas provas.\n2. Insira o peso de cada avaliação.\n3. Veja sua nota média final.",
      seoHowItWorks: "Divide a soma das notas ponderadas pela soma total dos pesos.",
      formula: "Média Ponderada = Σ (Nota * Peso) / Σ (Peso)",
      seoExample: "Nota 7 (peso 4) e Nota 9 (peso 6) resultam em média ponderada 8,2.",
      faqs: [
        { q: "Como a calculadora calcula a média ponderada final de uma matéria?", a: "Calcula a média ponderada multiplicando cada nota de prova ou trabalho pelo seu respectivo peso avaliativo e dividindo pela soma dos pesos." },
        { q: "Quais escalas de notas acadêmicas são aceitas?", a: "Aceita notas decimais de 0 a 10, notas de 0 a 100 e sistemas alfabéticos com conversão de conceitos (A, B, C)." },
        { q: "Posso calcular qual nota preciso tirar na prova final para passar?", a: "Sim. Insira as notas das avaliações parciais já realizadas para descobrir a pontuação mínima necessária na prova final." },
        { q: "O cálculo reflete as regras das universidades e colégios?", a: "Sim. Segue o modelo matemático oficial de média ponderada adotado pelas instituições de ensino." },
        { q: "Minhas notas acadêmicas ficam salvas na rede?", a: "Não. Os dados lançados são processados unicamente na aba do seu navegador, sem armazenamento permanente." }
      ]
    },
    ja: {
      name: "成績・点数計算ツール",
      seoTitle: "成績計算ツール — 加重平均点数・単位 | HelloTools",
      seoDescription: "各テストやレポートの得点と、その配分比率（ウェイト・単位数）から最終的な加重平均点を計算します。",
      description: "配分比率（重み）に応じた成績の加重平均点を算出します。",
      quickAnswer: "試験や課題の点数と配分率から加重平均点数を計算します。",
      seoHowToUse: "1. 得点を入力します。\n2. 各評価項目の配分率（%や単位数）を指定します。\n3. 加重平均点数を確認します。",
      seoHowItWorks: "（得点 * 配分率）の合計を総配分率で割って算出します。",
      formula: "最終点数 = Σ (点数 * 重み) / Σ (重み)",
      seoExample: "中間テスト80点（配分40%）、期末テスト90点（配分60%）の場合、最終成績は86点です。",
      faqs: [
        { q: "成績（加重平均点）はどのように計算されますか？", a: "小テスト、レポート課題、中間試験、期末試験の各点数に配点割合（ウェイト%）を掛け合わせ、加重平均によって最終成績を算出します。" },
        { q: "どのような成績評価スケールに対応していますか？", a: "100点満点の素点評価、大学のGPA評価（S/A/B/C/F）、および高校・大学の単位数加重に対応しています。" },
        { q: "単位取得に必要な期末試験の目標点数を逆算できますか？", a: "はい。現在までに確定している中間点や課題点を入力することで、単位取得（60点以上など）に必要な期末試験の最低目標点を計算できます。" },
        { q: "大学や専門学校の成績算出基準と合致しますか？", a: "シラバスに記載されている配点比率（例：期末50%、中間30%、平常点20%）通りに設定すれば、学校側の成績集計と完全に一致します。" },
        { q: "入力したテストの点数データが外部に送信されることはありますか？", a: "いいえ。すべての成績データはお使いの端末でのみ計算され、外部への送信や保存は一切ありません。" }
      ]
    }
  },

  'case-converter': {
    es: {
      name: "Convertidor de Mayúsculas y Minúsculas",
      seoTitle: "Convertidor de Mayúsculas y Minúsculas Online | HelloTools",
      seoDescription: "Convierte textos a MAYÚSCULAS, minúsculas, Tipo Título y Tipo Oración.",
      description: "Cambia el formato de mayúsculas y minúsculas de cualquier texto.",
      quickAnswer: "Transforma instantáneamente el formato de letras de un texto.",
      seoHowToUse: "1. Pega tu texto en la herramienta.\n2. Elige el botón del formato deseado (MAYÚSCULAS, minúsculas, etc.).\n3. Copia el texto resultante.",
      seoHowItWorks: "Aplica los métodos toUpperCase() y toLowerCase() de cadena.",
      formula: "Formato = String.toUpperCase() | String.toLowerCase()",
      seoExample: "Transforma \"hola mundo\" en \"HOLA MUNDO\" o \"Hola Mundo\".",
      faqs: [
        { q: "¿Qué estilos de mayúsculas y minúsculas admite este conversor?", a: "Convierte texto a MAYÚSCULAS, minúsculas, Tipo Título (Title Case), Formato Oración (Sentence case), camelCase, snake_case, kebab-case y PascalCase." },
        { q: "¿Cómo funciona la conversión a Tipo Título (Title Case)?", a: "Capitaliza la primera letra de cada palabra principal, manteniendo en minúsculas preposiciones y conjunciones cortas según las reglas editoriales habituales." },
        { q: "¿Para qué se utilizan los formatos camelCase, snake_case y kebab-case?", a: "Son convenciones de nomenclatura en programación: camelCase se usa comúnmente en JavaScript, snake_case en Python y bases de datos, y kebab-case en URLs y clases CSS." },
        { q: "¿Respeta las tildes y caracteres especiales del español (ñ, á, é, í, ó, ú)?", a: "Sí. Utiliza funciones estándar Unicode que transforman correctamente caracteres acentuados y la letra eñe (ej. \"año\" a \"AÑO\")." },
        { q: "¿Existe límite en la cantidad de texto que puedo convertir?", a: "No. Puedes transformar párrafos enteros, artículos completos o listas de código fuente de una sola vez." }
      ]
    },
    de: {
      name: "Groß-/Kleinschreibung-Umwandler",
      seoTitle: "Groß-/Kleinschreibung Umwandeln Online | HelloTools",
      seoDescription: "Text in GROSSBUCHSTABEN, kleinbuchstaben oder Titelformat umwandeln.",
      description: "Formatierung von Texten schnell anpassen.",
      quickAnswer: "Wandelt die Groß- und Kleinschreibung von Texten per Klick um.",
      seoHowToUse: "1. Text einfügen.\n2. Format wählen (GROSS, klein, Titel).\n3. Text kopieren.",
      seoHowItWorks: "Nutzt String-Transformationen wie toUpperCase().",
      formula: "Text = String.toUpperCase()",
      seoExample: "Wandelt \"hallo welt\" in \"HALLO WELT\" um.",
      faqs: [
        { q: "Welche Text- und Groß-/Kleinschreib-Modi stehen zur Verfügung?", a: "GROSSBUCHSTABEN (UPPERCASE), kleinbuchstaben (lowercase), Titel-Schreibweise (Title Case), Satzanfang groß (Sentence case), camelCase, snake_case und kebab-case." },
        { q: "Wie funktioniert die deutsche Satzanfang-Konvertierung (Sentence case)?", a: "Sie setzt den ersten Buchstaben jedes Satzes nach einem Punkt, Ausrufezeichen oder Fragezeichen automatisch in Großbuchstaben." },
        { q: "Wofür werden camelCase, snake_case und kebab-case in der Softwareentwicklung genutzt?", a: "camelCase ist Standard in JavaScript/Java, snake_case in Python und SQL, und kebab-case in Web-URLs und CSS-Selektoren." },
        { q: "Werden deutsche Umlaute (ä, ö, ü) und das Eszett (ß) korrekt umgewandelt?", a: "Ja, die Umwandlung basiert auf modernen Unicode-Standards, sodass Umlaute und Sonderzeichen fehlerfrei transformiert werden." },
        { q: "Gibt es eine Obergrenze für die Zeichenlänge bei der Umwandlung?", a: "Nein, Sie können umfangreiche Dokumente oder Quellcodedateien mit einem Klick konvertieren." }
      ]
    },
    fr: {
      name: "Convertisseur de Casse",
      seoTitle: "Convertisseur de Casse (Majuscules / Minuscules) | HelloTools",
      seoDescription: "Convertissez du texte en MAJUSCULES, minuscules, ou Première Lettre Majuscule.",
      description: "Modifiez la casse de vos textes en un clic.",
      quickAnswer: "Change la casse des lettres d'un texte selon le style sélectionné.",
      seoHowToUse: "1. Collez votre texte.\n2. Cliquez sur le style désiré.\n3. Copiez le résultat.",
      seoHowItWorks: "Applique les méthodes d'analyse de chaîne JavaScript.",
      formula: "Casse = String.toUpperCase()",
      seoExample: "Transforme \"bonjour tout le monde\" en \"BONJOUR TOUT LE MONDE\".",
      faqs: [
        { q: "Quels formats de casse de texte sont pris en charge ?", a: "MAJUSCULES (UPPERCASE), minuscules (lowercase), Casse Titre (Title Case), Casse Phrase (Sentence case), camelCase, snake_case, kebab-case et PascalCase." },
        { q: "Comment fonctionne la Casse Phrase (Sentence case) ?", a: "Elle met en majuscule la première lettre de chaque phrase après un point et conserve le reste en minuscules." },
        { q: "À quoi servent les formats camelCase, snake_case et kebab-case ?", a: "Ce sont des normes de programmation informatique : camelCase en JavaScript, snake_case en Python/SQL et kebab-case dans les URLs." },
        { q: "Les lettres accentuées françaises (é, è, ç, à, etc.) sont-elles respectées ?", a: "Oui. Le moteur utilise les tables Unicode complètes pour capitaliser rigoureusement les voyelles accentuées et la cédille." },
        { q: "Y a-t-il une limite de volume de texte lors de la conversion ?", a: "Non, vous pouvez coller des chapitres entiers sans ralentissement." }
      ]
    },
    pt: {
      name: "Conversor de Maiúsculas e Minúsculas",
      seoTitle: "Conversor de Maiúsculas e Minúsculas | HelloTools",
      seoDescription: "Converta textos para MAIÚSCULAS, minúsculas, Formato Título e Primeira Letra.",
      description: "Altere a formatação de maiúsculas e minúsculas do seu texto.",
      quickAnswer: "Transforma o formato das letras do texto selecionado.",
      seoHowToUse: "1. Cole seu texto.\n2. Selecione a conversão desejada.\n3. Copie o texto convertido.",
      seoHowItWorks: "Utiliza funções de conversão de texto.",
      formula: "Texto = String.toUpperCase()",
      seoExample: "Transforma \"olá mundo\" em \"OLÁ MUNDO\" ou \"Olá Mundo\".",
      faqs: [
        { q: "Quais tipos de caixa de texto a ferramenta disponibiliza?", a: "MAIÚSCULAS, minúsculas, Primeira Letra Em Maiúscula (Title Case), Início de frase (Sentence case), camelCase, snake_case e kebab-case." },
        { q: "Como a formatação em Modo Título (Title Case) opera?", a: "Capitaliza a primeira letra de todas as palavras principais do texto de acordo com as diretrizes gramaticais." },
        { q: "Onde são empregados os formatos camelCase, snake_case e kebab-case?", a: "São padrões de escrita em desenvolvimento de software: camelCase em JavaScript/C#, snake_case em Python/SQL e kebab-case em links de URLs e CSS." },
        { q: "A ferramenta trata acentos e o caractere cedilha (ç) corretamente?", a: "Sim. A conversão respeita o padrão internacional Unicode, aplicando caixas altas e baixas sem distorcer palavras acentuadas." },
        { q: "Existe restrição no tamanho do texto colado?", a: "Não. Você pode processar textos longos, artigos e scripts de programação instantaneamente." }
      ]
    },
    ja: {
      name: "大文字・小文字変換ツール",
      seoTitle: "大文字・小文字・全角半角変換ツール | HelloTools",
      seoDescription: "アルファベットの大文字・小文字変換、キャピタライズ（単語の先頭のみ大文字）、全角・半角変換を行います。",
      description: "英字の大文字・小文字や全角・半角を瞬時に変換します。",
      quickAnswer: "英字の大文字・小文字変換や全角・半角文字の相互変換を行うツールです。",
      seoHowToUse: "1. テキストを入力します。\n2. 「すべて大文字」「すべて小文字」「全角/半角」などをクリックします。\n3. 変換後のテキストをコピーします。",
      seoHowItWorks: "文字列の toUpperCase / toLowerCase や正規表現コードポイント変換を行います。",
      formula: "変換 = String.toUpperCase() / String.toLowerCase()",
      seoExample: "「hello world」を「HELLO WORLD」や「Hello World」に変換します。",
      faqs: [
        { q: "この大文字小文字変換ツールで変換できるフォーマットは？", a: "全て大文字（UPPERCASE）、全て小文字（lowercase）、単語の先頭を大文字（Title Case）、文頭のみ大文字（Sentence case）、camelCase、snake_case、kebab-caseに対応しています。" },
        { q: "プログラミング用の命名規則（camelCaseやsnake_case）への変換は可能ですか？", a: "はい。スペース区切りの単語列から、変数名で多用されるcamelCase（単語の境界を大文字に）やsnake_case（アンダースコア区切り）、kebab-case（ハイフン区切り）へ即座に一括変換できます。" },
        { q: "全角英数と半角英数の相互変換にも対応していますか？", a: "はい。全角アルファベットから半角への変換や、大文字・小文字の反転処理をワンクリックで実行できます。" },
        { q: "英単語タイトルの大文字化（Title Case）の仕様はどうなっていますか？", a: "英語圏の出版・記事執筆ルールに基づき、主要単語の頭文字を大文字に揃えるフォーマットを自動生成します。" },
        { q: "変換処理は安全に行われますか？", a: "ブラウザ上で直接JavaScriptにより文字列置換されるため、ソースコードや社外秘テキストを貼り付けても安全に変換できます。" }
      ]
    }
  },

  'remove-duplicate-lines': {
    es: {
      name: "Eliminar Líneas Duplicadas",
      seoTitle: "Eliminar Líneas Duplicadas de Texto Online | HelloTools",
      seoDescription: "Elimina líneas repetidas o duplicadas de listados de texto al instante.",
      description: "Limpia listados de texto quitando todas las líneas duplicadas.",
      quickAnswer: "Detecta y elimina entradas o líneas repetidas en una lista.",
      seoHowToUse: "1. Pega tu lista de texto.\n2. Haz clic en Eliminar Duplicados.\n3. Copia la lista limpia.",
      seoHowItWorks: "Filtra las líneas utilizando una estructura de datos de conjunto único (Set).",
      formula: "Líneas Únicas = Array.from(new Set(lineas))",
      seoExample: "Limpia una lista con \"manzana, manzana, pera\" a \"manzana, pera\".",
      faqs: [
        { q: "¿Cómo elimina este limpiador las líneas duplicadas de un texto?", a: "Examina cada línea del texto, conserva la primera aparición e indexa las demás para eliminar cualquier copia idéntica repetida." },
        { q: "¿Distingue entre mayúsculas y minúsculas al buscar duplicados?", a: "Dispone de una opción configurable para comparar de forma estricta (distinguiendo mayúsculas) o insensible a mayúsculas (tratando \"Ejemplo\" e \"ejemplo\" como duplicados)." },
        { q: "¿Puede ordenar la lista de resultados alfabéticamente?", a: "Sí. Puedes elegir conservar el orden original de aparición o clasificar automáticamente las líneas resultantes de forma alfabética (A-Z o Z-A)." },
        { q: "¿Permite ignorar espacios en blanco o líneas vacías?", a: "Sí. Puedes activar la opción de descartar líneas en blanco o recortar espacios iniciales y finales para una limpieza exhaustiva." },
        { q: "¿Sirve para depurar listas de correos, URLs o palabras clave?", a: "Es ideal para desduplicar bases de datos de emails, listas de palabras clave SEO, inventarios y registros de servidores." }
      ]
    },
    de: {
      name: "Doppelte Zeilen Entfernen",
      seoTitle: "Doppelte Zeilen Entfernen Online | HelloTools",
      seoDescription: "Bereinigen Sie Textlisten sofort von doppelten Zeilen und Einträgen.",
      description: "Doppelte Zeilen aus Textlisten automatisch entfernen.",
      quickAnswer: "Filtert mehrfach vorkommende Zeilen aus einem Text heraus.",
      seoHowToUse: "1. Liste einfügen.\n2. Auf Duplikate entfernen klicken.\n3. Bereinigte Liste kopieren.",
      seoHowItWorks: "Nutzt ein Set zur Extraktion eindeutiger Elemente.",
      formula: "Eindeutig = Array.from(new Set(zeilen))",
      seoExample: "Macht aus einer Liste mit doppelten E-Mails eine saubere eindeutige Liste.",
      faqs: [
        { q: "Wie filtert das Tool doppelte Textzeilen heraus?", a: "Es prüft den Text Zeile für Zeile, speichert das erste Vorkommen jeder Zeile und löscht alle redundanten Wiederholungen zuverlässig." },
        { q: "Wird die Groß- und Kleinschreibung beim Zeilenvergleich beachtet?", a: "Sie können frei wählen, ob der Vergleich strikt (Groß-/Kleinschreibung beachtend) oder tolerant (case-insensitiv) erfolgen soll." },
        { q: "Können die bereinigten Zeilen automatisch alphabetisch sortiert werden?", a: "Ja, Sie können das Ergebnis entweder in der ursprünglichen Reihenfolge belassen oder direkt von A bis Z sortieren lassen." },
        { q: "Werden Leerzeilen und überflüssige Leerzeichen entfernt?", a: "Ja, optionale Filter entfernen Leerzeilen und schneiden voran- und nachgestellte Leerzeichen (Trim) automatisch ab." },
        { q: "Eignet sich das Tool zur Bereinigung großer E-Mail- oder Keyword-Listen?", a: "Optimal geeignet für das Bereinigen von Kontaktlisten, Keyword-Sammlungen für SEO und Server-Logdateien." }
      ]
    },
    fr: {
      name: "Supprimer les Lignes En Double",
      seoTitle: "Supprimer les Lignes En Double | HelloTools",
      seoDescription: "Nettoyez vos listes de texte en supprimant les lignes répétées.",
      description: "Supprimez automatiquement les doublons dans vos listes.",
      quickAnswer: "Élimine les lignes identiques répétées dans un texte.",
      seoHowToUse: "1. Collez votre liste.\n2. Cliquez sur Supprimer les doublons.\n3. Copiez le résultat propre.",
      seoHowItWorks: "Utilise un ensemble (Set) pour éliminer les récurrences.",
      formula: "Résultat = Array.from(new Set(lignes))",
      seoExample: "Réduit une liste contenant des doublons à ses éléments uniques.",
      faqs: [
        { q: "Comment cet outil supprime-t-il les lignes en double ?", a: "Il parcourt chaque ligne du texte, conserve la première occurrence et élimine instantanément toutes les répétitions superflues." },
        { q: "La détection des doublons est-elle sensible à la casse ?", a: "Une option permet d'activer ou désactiver la sensibilité aux majuscules/minuscules selon vos besoins de tri." },
        { q: "Peut-on ordonner la liste nettoyée par ordre alphabétique ?", a: "Oui. Vous pouvez maintenir l'ordonnancement initial ou appliquer un tri alphabétique croissant ou décroissant." },
        { q: "L'outil permet-il de purger les lignes vides ?", a: "Oui, une case à cocher permet de supprimer automatiquement les sauts de ligne vides et les espaces inutiles." },
        { q: "Est-il performant pour nettoyer de volumineuses listes d'emails ou d'URLs ?", a: "Parfaitement adapté à la déduplication de bases d'adresses électroniques, listes d'URLs et mots-clés de campagnes marketing." }
      ]
    },
    pt: {
      name: "Remover Linhas Duplicadas",
      seoTitle: "Remover Linhas Duplicadas de Texto | HelloTools",
      seoDescription: "Limpe listas de texto eliminando linhas repetidas instantaneamente.",
      description: "Remova linhas duplicadas de arquivos de texto e listas.",
      quickAnswer: "Remove entradas idênticas de uma lista de texto.",
      seoHowToUse: "1. Cole sua lista de texto.\n2. Clique em Remover Duplicadas.\n3. Copie a lista limpa.",
      seoHowItWorks: "Filtra linhas usando conjuntos de elementos únicos.",
      formula: "Resultado = Array.from(new Set(linhas))",
      seoExample: "Converte uma lista com emails repetidos em uma lista única.",
      faqs: [
        { q: "Como a ferramenta identifica e remove linhas duplicadas?", a: "Ela analisa o texto linha a linha, preservando o primeiro registro único e excluindo qualquer repetição subsequente com precisão." },
        { q: "É possível diferenciar maiúsculas de minúsculas na busca de duplicatas?", a: "Sim. Você pode escolher entre uma checagem sensível a maiúsculas (case-sensitive) ou ignorar diferenças de caixa de texto." },
        { q: "As linhas únicas podem ser ordenadas em ordem alfabética?", a: "Sim. A ferramenta permite manter a ordem de inserção original ou ordenar os itens alfabeticamente de A a Z." },
        { q: "A ferramenta remove linhas em branco vazias?", a: "Sim. Inclui a opção de excluir linhas em branco e eliminar espaços excedentes nas extremidades de cada linha." },
        { q: "Serve para higienizar cadastros de emails e listas de produtos?", a: "É indispensável para higienizar mailings de newsletter, listas de palavras-chave para SEO e inventários de produtos." }
      ]
    },
    ja: {
      name: "重複行削除ツール",
      seoTitle: "重複行削除・テキスト重複除去ツール | HelloTools",
      seoDescription: "テキストやリストデータから重複している行を自動的に検出し、一括で削除して固有行のみにします。",
      description: "テキストリストから重複する行を一括除去します。",
      quickAnswer: "同じ内容の行を検出し、最初に出てきた1行だけを残して重複行を削除します。",
      seoHowToUse: "1. テキスト（リスト）を貼り付けます。\n2. 「重複行を削除」をクリックします。\n3. 重複が除去されたテキストをコピーします。",
      seoHowItWorks: "配列を Set オブジェクトに変換して一意な行のみを抽出します。",
      formula: "固有行 = Array.from(new Set(lines))",
      seoExample: "「りんご\nみかん\nりんご」というリストを「りんご\nみかん」に整理します。",
      faqs: [
        { q: "重複行の削除（ユニーク行の抽出）はどのように行われますか？", a: "テキストを1行ずつスキャンし、最初に出現した行のみを残して2回目以降の同一行をすべて自動的に除外します。" },
        { q: "大文字と小文字を区別して重複判定できますか？", a: "はい。大文字・小文字を区別する厳密一致モードと、区別せずに重複とみなすモードを選択可能です。" },
        { q: "重複削除と同時にアルファベット順・五十音順に並べ替えできますか？", a: "はい。元の入力順序を維持するモードと、昇順・降順にソートして整理するモードの双方が利用可能です。" },
        { q: "余分な空行や行頭・行末の不要なスペースも一括削除できますか？", a: "「空行を削除」「前後の余白をトリム」のオプションにチェックを入れることで、空白行をきれいに除去できます。" },
        { q: "メールアドレスリストやURLリストのクリーニングに使えますか？", a: "はい。重複したアドレスやキーワードリスト、CSVデータのエラー行の除外などに大変重宝します。" }
      ]
    }
  },

  'text-sorter': {
    es: {
      name: "Ordenador de Texto",
      seoTitle: "Ordenador de Texto — Orden Alfabético y Numérico | HelloTools",
      seoDescription: "Ordena líneas de texto alfabéticamente (A-Z, Z-A), por longitud o numéricamente.",
      description: "Ordena listas de texto en orden alfabético o numérico.",
      quickAnswer: "Reorganiza las líneas de un texto según el criterio de ordenación elegido.",
      seoHowToUse: "1. Pega tu lista de texto.\n2. Elige el tipo de orden (A-Z, Z-A, Numérico).\n3. Copia el texto ordenado.",
      seoHowItWorks: "Aplica algoritmos de ordenación de cadenas.",
      formula: "Orden = lineas.sort((a, b) => a.localeCompare(b))",
      seoExample: "Ordena \"zorro, árbol, barco\" a \"árbol, barco, zorro\".",
      faqs: [
        { q: "¿Qué opciones de ordenación de texto ofrece esta herramienta?", a: "Permite ordenar líneas de texto alfabéticamente (A-Z o Z-A), numéricamente (por valor del número), por longitud de línea (de más corta a más larga o viceversa) e invertir el orden." },
        { q: "¿Distingue entre ordenación alfabética y ordenación numérica natural?", a: "Sí. El orden natural comprende que \"10\" es mayor que \"2\" (orden 1, 2, 10), mientras que el orden alfabético puro situaría el \"10\" antes que el \"2\"." },
        { q: "¿Puede ordenar listas respetando los acentos de la lengua española?", a: "Sí. Utiliza las reglas de intercalación estándar de Unicode para ordenar correctamente palabras con tildes, diéresis y la letra eñe." },
        { q: "¿Es posible mezclar las líneas en orden aleatorio (desordenar)?", a: "Sí. Incluye una función de barajado aleatorio para mezclar listas de nombres, participantes en concursos o tareas de forma imparcial." },
        { q: "¿Se almacenan los textos que ordeno en la página?", a: "No. Todo el algoritmo de ordenación opera en la memoria de tu navegador de manera estrictamente local y privada." }
      ]
    },
    de: {
      name: "Text Sortieren",
      seoTitle: "Text Sortieren — Alphabetisch & Nummerisch | HelloTools",
      seoDescription: "Sortieren Sie Zeilen alphabetisch (A-Z, Z-A) oder nach Länge.",
      description: "Textlisten alphabetisch oder nummerisch sortieren.",
      quickAnswer: "Ordnet die Zeilen eines Textes alphabetisch oder nach Zahlenwert.",
      seoHowToUse: "1. Liste eingeben.\n2. Sortierung wählen (A-Z oder Z-A).\n3. Sortierte Liste kopieren.",
      seoHowItWorks: "Sortiert Zeilen mittels localeCompare().",
      formula: "Sortiert = zeilen.sort()",
      seoExample: "Sortiert Begriffe alphabetisch von A bis Z.",
      faqs: [
        { q: "Welche Sortieroptionen bietet dieser Text-Sortierer?", a: "Er sortiert Textzeilen alphabetisch (A-Z oder Z-A), natürlich numerisch, nach Zeilenlänge sowie in zufälliger Reihenfolge (Mischen/Shuffle)." },
        { q: "Was ist der Unterschied zwischen lexikografischer und numerischer Sortierung?", a: "Die numerische Sortierung erkennt, dass 2 vor 10 kommt, während die rein zeichenbasierte Sortierung die 10 vor die 2 stellen würde." },
        { q: "Werden deutsche Umlaute (ä, ö, ü) korrekt im Alphabet einsortiert?", a: "Ja, die Sortierung folgt den Duden- und DIN-Standards für deutschsprachige Texte, sodass ä, ö und ü sinnvoll eingeordnet werden." },
        { q: "Kann man Listen zufällig durchmischen?", a: "Ja, eine Zufallssortierung erlaubt das faire Mischen von Teilnehmerlisten, Gruppen oder Aufgaben." },
        { q: "Gibt es eine Beschränkung bei der Anzahl der zu sortierenden Zeilen?", a: "Nein, das Skript sortiert auch Listen mit tausenden Zeilen in Sekundenschnelle." }
      ]
    },
    fr: {
      name: "Trieur de Texte",
      seoTitle: "Trieur de Texte — Ordre Alphabétique et Numérique | HelloTools",
      seoDescription: "Triez les lignes d'un texte par ordre alphabétique (A-Z) ou numérique.",
      description: "Mettez vos listes en ordre alphabétique en un instant.",
      quickAnswer: "Réordonne les lignes selon un ordre alfabétique ou croissant/décroissant.",
      seoHowToUse: "1. Collez votre liste.\n2. Choisissez l'ordre de tri.\n3. Copiez le résultat trié.",
      seoHowItWorks: "Utilise le tri natif de tableau avec comparaison linguistique.",
      formula: "Tri = lignes.sort()",
      seoExample: "Trie une liste de noms par ordre alphabétique.",
      faqs: [
        { q: "Quels critères de tri de texte sont disponibles ?", a: "Tri alphabétique (A-Z ou Z-A), tri numérique naturel, tri par longueur de texte (croissant/décroissant) et mélange aléatoire." },
        { q: "Comment fonctionne le tri numérique naturel ?", a: "Le tri naturel prend en compte la valeur mathématique des chiffres au lieu de l'ordre des caractères (1, 2, 10 au lieu de 1, 10, 2)." },
        { q: "Le tri gère-t-il les caractères accentués français ?", a: "Oui, la collation locale assure un classement conforme aux règles lexicographiques de la langue française." },
        { q: "Peut-on mélanger les lignes au hasard ?", a: "Oui, la fonction de tirage aléatoire permet de brasser des listes d'élèves, d'équipes ou d'articles en toute neutralité." },
        { q: "Le traitement du texte nécessite-t-il un transfert vers un serveur ?", a: "Non, le tri opère de façon instantanée et sécurisée au sein même de votre navigateur." }
      ]
    },
    pt: {
      name: "Ordenador de Texto",
      seoTitle: "Ordenador de Texto — Ordem Alfabética e Numérica | HelloTools",
      seoDescription: "Ordene linhas de texto em ordem alfabética (A-Z, Z-A) ou numérica.",
      description: "Organize suas listas em ordem alfabética.",
      quickAnswer: "Reorganiza as linhas de uma lista em ordem alfabética ou numérica.",
      seoHowToUse: "1. Cole sua lista.\n2. Escolha o tipo de ordenação (A-Z ou Z-A).\n3. Copie o resultado.",
      seoHowItWorks: "Aplica a ordenação nativa considerando o idioma.",
      formula: "Ordenado = linhas.sort()",
      seoExample: "Organiza nomes em ordem alfabética perfeita.",
      faqs: [
        { q: "Quais modalidades de ordenação de texto estão disponíveis?", a: "Ordenação alfabética (A-Z e Z-A), ordenação numérica natural, ordenação pelo comprimento de caracteres e embaralhamento aleatório." },
        { q: "Qual a vantagem da ordenação numérica natural?", a: "Ela garante que números como 2 fiquem antes de 10 na lista, corrigindo a falha tradicional da ordenação textual pura." },
        { q: "O alfabeto com acentuação gráfica é classificado corretamente?", a: "Sim. Utiliza o padrão lexicográfico da língua portuguesa, tratando palavras com acento e cedilha de forma harmônica." },
        { q: "É possível desordenar ou embaralhar uma lista de nomes?", a: "Sim, conta com a funcionalidade de embaralhar (shuffle) para sorteios e dinâmica de grupos." },
        { q: "Os conteúdos digitados ficam salvos na internet?", a: "Não. Os dados são ordenados na memória volátil do navegador sem retenção externa." }
      ]
    },
    ja: {
      name: "テキスト並び替えツール",
      seoTitle: "テキスト並び替え（ソート）ツール — 昇順・降順 | HelloTools",
      seoDescription: "テキストの各行を五十音順、アルファベット順（A-Z / Z-A）、数値順、文字数順に並び替えます。",
      description: "行単位のテキストを五十音順やアルファベット順にソートします。",
      quickAnswer: "テキストの行を指定された順序（あいうえお順・A-Z順・数値順）にソートします。",
      seoHowToUse: "1. ソートしたいテキストを貼り付けます。\n2. 並び替え順（昇順 A-Z / 降順 Z-A / 数値順）を選択します。\n3. 並び替えられたテキストをコピーします。",
      seoHowItWorks: "文字列の localeCompare() ソートアルゴリズムを用いて整列します。",
      formula: "ソート = lines.sort((a, b) => a.localeCompare(b, \"ja\"))",
      seoExample: "「みかん\nりんご\nいちご」を「いちご\nみかん\nりんご」に五十音順ソートします。",
      faqs: [
        { q: "テキスト並べ替えツールで利用できるソート順は何ですか？", a: "昇順（五十音順・アルファベットA-Z）、降順（Z-A）、自然順（数値の大きさ順）、文字数の長さ順、ランダムシャッフルに対応しています。" },
        { q: "「自然な数値ソート（Natural Sort）」とはどのようなものですか？", a: "通常の文字コード順では「1, 10, 2」となってしまう並びを、数値の大小を正しく認識して「1, 2, 10」と正しく並べ替える機能です。" },
        { q: "日本語のひらがな・カタカナ・漢字のソートにも対応していますか？", a: "はい。Unicodeの文字コード順に則り、日本語テキストや漢字リストの並べ替えを正確に実行します。" },
        { q: "リストの行をランダムにシャッフル（くじ引き用）することは可能ですか？", a: "はい。行の並び順をランダムに並べ替えるシャッフル機能を備えており、発表順の決定やチーム分けに便利です。" },
        { q: "大量の顧客リストや商品コードの並べ替えも安全ですか？", a: "ブラウザローカルで高速ソートされるため、個人情報や社内データを外部送信せずに安全に処理できます。" }
      ]
    }
  },

  'whitespace-remover': {
    es: {
      name: "Eliminador de Espacios en Blanco",
      seoTitle: "Eliminador de Espacios en Blanco y Tabulaciones | HelloTools",
      seoDescription: "Elimina espacios dobles, tabulaciones y saltos de línea innecesarios de tu texto.",
      description: "Limpia espacios sobrantes y tabulaciones de tu texto.",
      quickAnswer: "Limpia un texto removiendo espacios extra al inicio, final o entre palabras.",
      seoHowToUse: "1. Pega tu texto.\n2. Elige eliminar espacios extra o todas las líneas vacías.\n3. Copia el texto limpio.",
      seoHowItWorks: "Aplica expresiones regulares de reemplazo de espacios.",
      formula: "Limpio = texto.replace(/\\s+/g, \" \")",
      seoExample: "Transforma \"Hola   Mundo  \" en \"Hola Mundo\".",
      faqs: [
        { q: "¿Qué tipo de espacios no deseados limpia esta herramienta?", a: "Elimina espacios iniciales y finales (trim), reduce espacios dobles o múltiples consecutivos a un único espacio y suprime saltos de línea superfluos." },
        { q: "¿Puede comprimir todo el texto en una sola línea continua?", a: "Sí. Permite sustituir todos los saltos de línea por espacios para compactar párrafos o código en una única línea." },
        { q: "¿Sirve para limpiar textos copiados de documentos PDF?", a: "Es la solución perfecta para corregir los molestos saltos de línea y dobles espacios que se generan al copiar texto de archivos PDF o escaneados." },
        { q: "¿Permite eliminar tabulaciones y caracteres invisibles?", a: "Sí. Detecta tabuladores, espacios duros no separables (NBSP) y espacios en blanco invisibles reemplazándolos por caracteres estándar." },
        { q: "¿Afecta al texto original de manera irreversible?", a: "La herramienta no modifica tu texto fuente; genera un resultado limpio en un área independiente que puedes copiar libremente." }
      ]
    },
    de: {
      name: "Leerzeichen Entfernen",
      seoTitle: "Leerzeichen Entfernen Online | HelloTools",
      seoDescription: "Entfernen Sie doppelte Leerzeichen, Tabulatoren und Leerzeilen aus Texten.",
      description: "Überflüssige Leerzeichen und Tabs aus Texten entfernen.",
      quickAnswer: "Reinigt Texte von doppelten oder überflüssigen Leerzeichen.",
      seoHowToUse: "1. Text einfügen.\n2. Bereinigungsoption wählen.\n3. Text kopieren.",
      seoHowItWorks: "Ersetzt mehrfache Leerzeichen durch ein einfaches Leerzeichen via Regex.",
      formula: "Bereinigt = text.replace(/\\s+/g, \" \")",
      seoExample: "Macht aus \"Hallo   Welt\" sauber \"Hallo Welt\".",
      faqs: [
        { q: "Welche überflüssigen Leerzeichen entfernt das Bereinigungstool?", a: "Es entfernt führende und nachgestellte Leerzeichen (Trim), fasst mehrfache Leerzeichen zu einem einzigen zusammen und tilgt doppelte Absätze." },
        { q: "Kann man den gesamten Text in eine einzige Zeile zusammenfassen?", a: "Ja, die Option \"Alles in eine Zeile\" ersetzt alle Zeilenumbrüche durch einfache Leerzeichen." },
        { q: "Hilft das Tool bei unschönen Zeilenumbrüchen aus PDF-Dateien?", a: "Ja, es ist die ideale Lösung, um hart umbrochene Zeilen aus PDF-Kopien wieder in flüssige, lesbare Fließtexte zu verwandeln." },
        { q: "Werden auch Tabulatoren und geschützte Leerzeichen (NBSP) bereinigt?", a: "Ja, Tab-Stopps und geschützte Sonderleerzeichen werden zuverlässig in reguläre Leerzeichen umgewandelt." },
        { q: "Bleibt der Originaltext erhalten?", a: "Ja, der Text wird nur im Ausgabefenster bereinigt dargestellt und kann dort mit einem Klick in die Zwischenablage kopiert werden." }
      ]
    },
    fr: {
      name: "Suppresseur d'Espaces Inutiles",
      seoTitle: "Suppresseur d'Espaces Inutiles en Ligne | HelloTools",
      seoDescription: "Supprimez les espaces multiples, tabulations et lignes vides de vos textes.",
      description: "Nettoyez votre texte en supprimant les espaces en trop.",
      quickAnswer: "Enlève les espaces superflus et réorganise la mise en forme du texte.",
      seoHowToUse: "1. Collez votre texte.\n2. Choisissez l'option de nettoyage.\n3. Copiez le résultat propre.",
      seoHowItWorks: "Utilise des expressions régulières de nettoyage.",
      formula: "Texte = text.replace(/\\s+/g, \" \")",
      seoExample: "Transforme \"Bonjour   le   monde\" en \"Bonjour le monde\".",
      faqs: [
        { q: "Quels espaces superflus cet outil nettoie-t-il ?", a: "Il supprime les espaces de début et de fin de ligne (trim), réduit les espaces multiples consécutifs en un espace unique et supprime les sauts de paragraphe vides." },
        { q: "Peut-on concaténer l'ensemble du texte sur une ligne unique ?", a: "Oui, une fonction dédiée permet de supprimer tous les retours à la ligne pour former un paragraphe continu." },
        { q: "Est-il utile pour corriger les copier-coller depuis un document PDF ?", a: "Oui, il supprime immédiatement les retours à la ligne intempestifs fréquents lors de l'extraction de texte depuis des fichiers PDF." },
        { q: "Nettoie-t-il les tabulations et les espaces insécables ?", a: "Oui, il normalise les tabulations et les espaces insécables (NBSP) en espaces ordinaires." },
        { q: "Y a-t-il un risque d'altérer le texte source ?", a: "Aucun risque : le texte nettoyé est produit dans un champ séparé prêt à être copié." }
      ]
    },
    pt: {
      name: "Remover Espaços em Branco",
      seoTitle: "Remover Espaços em Branco e Linhas Vazias | HelloTools",
      seoDescription: "Elimine espaços duplos, tabulações e linhas vazias do seu texto.",
      description: "Remova espaços extras do seu texto instantaneamente.",
      quickAnswer: "Elimina espaços em excesso no início, meio e fim do texto.",
      seoHowToUse: "1. Cole seu texto.\n2. Escolha as opções de remoção.\n3. Copie o texto limpo.",
      seoHowItWorks: "Substitui espaços múltiplos usando expressão regular.",
      formula: "Texto Limpo = texto.replace(/\\s+/g, \" \")",
      seoExample: "Converte \"Olá   Mundo\" em \"Olá Mundo\".",
      faqs: [
        { q: "Quais tipos de espaçamentos extras esta ferramenta corrige?", a: "Remove espaços no início e final de linhas (trim), substitui múltiplos espaços seguidos por um único espaço e exclui quebras de linha em excesso." },
        { q: "É possível juntar todo o texto em uma linha contínua?", a: "Sim. A ferramenta conta com opção para transformar múltiplos parágrafos em um texto corrido de linha única." },
        { q: "Ajuda a consertar textos copiados de PDFs desformatados?", a: "É perfeita para eliminar quebras de linha quebradas e espaços duplos resultantes de cópias de arquivos PDF ou páginas da web." },
        { q: "A ferramenta remove tabulações e espaços invisíveis?", a: "Sim. Converte tabs e espaços não separáveis (NBSP) em espaços comuns padronizados." },
        { q: "O processamento do texto é seguro e confidencial?", a: "Sim, a higienização do texto ocorre diretamente no seu navegador, sem trafegar pela web." }
      ]
    },
    ja: {
      name: "余白・空白削除ツール",
      seoTitle: "余白・空白削除（スペース除去・空行削除） | HelloTools",
      seoDescription: "テキスト内の連続するスペース（全角・半角）、タブ、不要な改行、空行を一括で除去・整形します。",
      description: "不要なスペースや改行、空行を一括削除します。",
      quickAnswer: "文章中の連続するスペースや行頭・行末の空白、空行を削除して整理します。",
      seoHowToUse: "1. テキストを貼り付けます。\n2. 「連続スペース除去」「空行削除」などの処理を選択します。\n3. 整形されたテキストをコピーします。",
      seoHowItWorks: "正規表現 (replace(/\\s+/g, \" \")) を用いて空白文字を置換・除去します。",
      formula: "除去テキスト = text.replace(/\\s+/g, \" \")",
      seoExample: "「こんにちは   世界  」を「こんにちは 世界」に整形します。",
      faqs: [
        { q: "この空白削除ツールで除去できる不要なスペースの種類は？", a: "行頭・行末の不要な余白（トリム）、連続する複数の半角・全角スペースの1個への統合、不要な連続改行の削除に対応しています。" },
        { q: "文章全体の改行を取り除いて1行にまとめることはできますか？", a: "はい。「改行を削除して1行にする」機能により、段落ごとの改行を半角スペースなどに置換してコンパクトな1行に圧縮できます。" },
        { q: "PDFからコピーした文章の不自然な改行を直すのに使えますか？", a: "はい。PDFファイルからテキストを貼り付けた際に発生する、行末のブツ切れ改行をきれいに繋げて読みやすい自然な文章に修復できます。" },
        { q: "全角スペースやタブ文字の半角スペース化にも対応していますか？", a: "はい。全角スペースやタブ文字を標準の半角スペースに統一・正規化するオプションを備えています。" },
        { q: "元の文章が書き換えられて消えてしまうリスクはありませんか？", a: "入力欄とは別の出力結果エリアに整形後の文章が生成されるため、元の文章を保持したまま安全にコピーできます。" }
      ]
    }
  },

  'ideal-weight-calculator': {
    es: {
      name: "Calculadora de Peso Ideal",
      seoTitle: "Calculadora de Peso Ideal (Fórmulas Médicas) | HelloTools",
      seoDescription: "Calcula tu rango de peso ideal según tu estatura y género mediante fórmulas médicas.",
      description: "Descubre tu peso saludable ideal según tu altura y género.",
      quickAnswer: "Estima el rango de peso corporal idóneo para una determinada estatura.",
      seoHowToUse: "1. Selecciona tu género.\n2. Introduce tu estatura en cm.\n3. Obtén tu rango de peso ideal.",
      seoHowItWorks: "Combina las fórmulas médicas de Devine, Robinson, Miller y Hamwi.",
      formula: "Peso Ideal (Devine Hombres) = 50 + 2,3 * ((Altura cm / 2.54) - 60)",
      seoExample: "Un hombre de 175 cm tiene un peso ideal de aprox. 68 a 72 kg.",
      faqs: [
        { q: "¿Qué fórmulas utiliza esta calculadora de peso ideal?", a: "Utiliza las fórmulas clásicas validadas en medicina: Devine (1974), Robinson (1983), Miller (1983) y Hamwi (1964), además del rango de peso normal según el IMC de la OMS." },
        { q: "¿Existe un único peso ideal absoluto para cada estatura?", a: "No. El peso corporal saludable es un rango que depende de la complexión ósea, la proporción de masa muscular y la edad de la persona, no un único número invariable." },
        { q: "¿Qué fórmula es la más empleada en farmacología clínica?", a: "La fórmula de Devine es la más utilizada en medicina para la dosificación de medicamentos que requieren ajuste por peso magro." },
        { q: "¿Cómo influye la estructura ósea (fina, mediana o ancha) en el peso ideal?", a: "Una contextura ósea ancha puede situar el peso saludable entre un 5% y un 10% por encima de la media de las fórmulas sin representar exceso de grasa." },
        { q: "¿Es el peso ideal el mismo indicador que el porcentaje de grasa corporal?", a: "No. El peso en báscula no desglosa composición corporal. Evaluar el porcentaje de grasa y masa magra es más relevante para la salud global que el peso aislado." }
      ]
    },
    de: {
      name: "Idealgewicht-Rechner",
      seoTitle: "Idealgewicht-Rechner — Welches Gewicht Passt Zu Mir? | HelloTools",
      seoDescription: "Berechnen Sie Ihr persönliches Idealgewicht nach Körpergröße und Geschlecht.",
      description: "Ermitteln Sie Ihr optimales gesundes Gewicht.",
      quickAnswer: "Berechnet den medizinischen Idealgewichtsbereich für Ihre Körpergröße.",
      seoHowToUse: "1. Geschlecht wählen.\n2. Körpergröße in cm eingeben.\n3. Idealgewicht ablesen.",
      seoHowItWorks: "Nützt etablierte medizinische Formeln (Devine, Hamwi).",
      formula: "Idealgewicht = 50 + 2.3 * ((Größe cm / 2.54) - 60)",
      seoExample: "Ein 175 cm großer Mann hat ein Idealgewicht von ca. 68-72 kg.",
      faqs: [
        { q: "Welche Formeln nutzt dieser Idealgewichts-Rechner?", a: "Er berechnet das Idealgewicht nach den vier anerkannten medizinischen Formeln von Devine, Robinson, Miller und Hamwi sowie den BMI-Normalbereich der WHO." },
        { q: "Gibt es ein einziges absolutes Idealgewicht für jede Körpergröße?", a: "Nein, ein gesundes Körpergewicht bewegt sich stets in einem gesunden Korridor, der von Knochenbau, Muskelanteil und Alter beeinflusst wird." },
        { q: "Welche Formel ist der historische Standard in der Medizin?", a: "Die Devine-Formel (1974) gilt in der Pharmazie und Intensivmedizin weltweit als Referenzstandard für gewichtsbezogene Medikamentendosierungen." },
        { q: "Welchen Einfluss hat der Körperbau auf das reale Idealgewicht?", a: "Ein breiter Knochenbau oder ausgeprägte Muskulatur verschiebt das gesunde Gewicht legitim um bis zu 10 % nach oben." },
        { q: "Warum ist der Körperfettanteil aussagekräftiger als die Waage?", a: "Weil die Waage nicht zwischen stoffwechselaktiven Muskeln und viszeralem Fettgewebe unterscheidet." }
      ]
    },
    fr: {
      name: "Calculateur de Poids Idéal",
      seoTitle: "Calculateur de Poids Idéal Gratuit | HelloTools",
      seoDescription: "Calculez votre poids idéal de santé selon votre taille et votre genre.",
      description: "Déterminez votre poids de forme idéal.",
      quickAnswer: "Estime le poids corporel le plus adapté à votre taille.",
      seoHowToUse: "1. Sélectionnez votre genre.\n2. Indiquez votre taille en cm.\n3. Consultez votre poids idéal.",
      seoHowItWorks: "Repose sur les formules de référence de Devine et Lorenz.",
      formula: "Poids Idéal = 50 + 2.3 * ((Taille cm / 2.54) - 60)",
      seoExample: "Pour un homme de 175 cm, le poids idéal se situe vers 68 à 72 kg.",
      faqs: [
        { q: "Quelles formules médicales sont utilisées pour estimer le poids idéal ?", a: "Le calculateur présente les résultats des formules de référence de Devine, Robinson, Miller et Hamwi, complétées par la plage de poids santé de l'OMS." },
        { q: "Existe-t-il un poids idéal absolu et universel ?", a: "Non. Le poids idéal correspond à une fourchette personnalisée tenant compte de la masse musculaire, de la largeur d'ossature et de l'âge." },
        { q: "Quelle est la formule la plus utilisée par le corps médical ?", a: "La formule de Devine (1974) est la plus couramment utilisée dans les protocoles hospitaliers pour le calcul de doses thérapeutiques." },
        { q: "Comment la morphologie influence-t-elle le poids de forme ?", a: "Une ossature robuste ou une musculature dense autorise un poids santé supérieur de 5 à 10 % par rapport aux formules standard." },
        { q: "Le poids sur la balance est-il le critère ultime de santé ?", a: "Non, la composition corporelle (taux de graisse viscérale et masse maigre) est un indicateur cardiovasculaire et métabolique bien plus fiable." }
      ]
    },
    pt: {
      name: "Calculadora de Peso Ideal",
      seoTitle: "Calculadora de Peso Ideal por Altura e Sexo | HelloTools",
      seoDescription: "Calcule sua faixa de peso ideal e saudável com base na sua altura.",
      description: "Descubra qual é o peso ideal recomendado para sua altura.",
      quickAnswer: "Calcula o peso corporal considerado saudável para a sua altura.",
      seoHowToUse: "1. Selecione seu sexo.\n2. Digite sua altura em cm.\n3. Veja a faixa de peso ideal.",
      seoHowItWorks: "Aplica as fórmulas médicas de Devine e Robinson.",
      formula: "Peso Ideal = 50 + 2,3 * ((Altura cm / 2.54) - 60)",
      seoExample: "Um homem de 175 cm de altura tem peso ideal estimado entre 68 kg e 72 kg.",
      faqs: [
        { q: "Quais fórmulas compõem o cálculo do peso ideal?", a: "A ferramenta aplica as equações consagradas de Devine, Robinson, Miller e Hamwi, além de exibir a faixa de peso saudável recomendada pela OMS." },
        { q: "Existe um peso ideal exato e idêntico para todas as pessoas de mesma altura?", a: "Não. O peso adequado é um intervalo saudável que varia conforme compleição óssea, biotipo físico e percentual de massa muscular." },
        { q: "Qual das fórmulas de peso ideal é a mais adotada clinicamente?", a: "A fórmula de Devine é a referência global mais utilizada em hospitais para cálculo posológico e parâmetros farmacocinéticos." },
        { q: "Como a estrutura óssea afeta o peso adequado na balança?", a: "Estruturas ósseas largas ou pessoas atléticas podem pesar até 10% a mais do que a média das equações sem apresentar excesso de gordura." },
        { q: "Por que o percentual de gordura importa mais que o peso na balança?", a: "Porque o peso isolado não distingue gordura de massa magra e água corporal, sendo a composição física o verdadeiro termômetro de saúde." }
      ]
    },
    ja: {
      name: "理想体重（標準体重）計算ツール",
      seoTitle: "理想体重・標準体重計算ツール — BMI 22基準 | HelloTools",
      seoDescription: "身長と性別から、最も病気になりにくい適正体重（BMI 22標準体重）や美容体重・シンデレラ体重を算出します。",
      description: "身長に応じた標準体重（適正体重）や美容体重を計算します。",
      quickAnswer: "最も健康的なBMI 22を基準とした標準体重および美容体重を算出します。",
      seoHowToUse: "1. 性別を選択します。\n2. 身長（cm）を入力します。\n3. 標準体重（kg）と理想範囲を確認します。",
      seoHowItWorks: "日本肥満学会基準の BMI = 22 （標準体重 = 身長(m)^2 * 22）で算出します。",
      formula: "標準体重(kg) = (身長m)^2 * 22",
      seoExample: "身長170cmの場合、標準体重（BMI 22）は 63.6kg です。",
      faqs: [
        { q: "このツールはどの適正体重（標準体重）計算式を採用していますか？", a: "世界的に標準のBMI＝22に基づく適正体重計算に加え、医学界で用いられるDevine式、Robinson式、Miller式、Hamwi式の算出に対応しています。" },
        { q: "同じ身長であれば誰でも同一の適正体重を目指すべきですか？", a: "いいえ。骨格の太さ（骨太・華奢）、筋肉量、年齢によって個人の健康体重には幅（レンジ）があります。" },
        { q: "日本で最も一般的に使われている標準体重の基準は？", a: "日本肥満学会が提唱する「身長(m) × 身長(m) × 22」が最も統計的に生活習慣病などの罹患リスクが低い標準体重とされています。" },
        { q: "筋肉質な人は適正体重をオーバーしても問題ありませんか？", a: "問題ありません。骨格筋量が多く体脂肪率が適正範囲（男性10〜20%、女性20〜30%）であれば、体重が標準値を超えていても健康的です。" },
        { q: "体重だけでなく体脂肪率も合わせて測定すべき理由は何ですか？", a: "体重計の数値だけでは体脂肪と筋肉の割合が判別できないため、隠れ肥満や筋肉量不足を見極めるには体脂肪率の併用が不可欠です。" }
      ]
    }
  },

  'body-fat-calculator': {
    es: {
      name: "Calculadora de Porcentaje de Grasa Corporal",
      seoTitle: "Calculadora de Grasa Corporal (Método Marina EE.UU.) | HelloTools",
      seoDescription: "Estima tu porcentaje de grasa corporal mediante las medidas de cintura, cuello y cadera.",
      description: "Calcula tu porcentaje de masa grasa y masa magra.",
      quickAnswer: "Estima la proporción de tejido adiposo en comparación con la masa corporal total.",
      seoHowToUse: "1. Introduce género, altura y peso.\n2. Mide la circunferencia de tu cuello, cintura (y cadera en mujeres).\n3. Lee tu % de grasa.",
      seoHowItWorks: "Utiliza el algoritmo de cálculo antropométrico de la Marina de EE.UU.",
      formula: "% Grasa (Hombres) = 86.010*log10(cintura-cuello) - 70.041*log10(altura) + 36.76",
      seoExample: "Un hombre con 85 cm de cintura y 38 cm de cuello tiene aprox. un 15% de grasa corporal.",
      faqs: [
        { q: "¿Qué método utiliza esta calculadora para estimar el porcentaje de grasa corporal?", a: "Utiliza el método de la Marina de EE.UU. (U.S. Navy Method), que estima la grasa corporal a partir del perímetro del cuello, cintura, caderas (en mujeres) y altura." },
        { q: "¿Cuáles son los porcentajes de grasa corporal saludables para hombres y mujeres?", a: "Para hombres, un rango saludable se sitúa entre el 10% y el 20% (atletas entre 6% y 13%). Para mujeres, el rango saludable está entre el 18% y el 28% (atletas entre 14% y 20%)." },
        { q: "¿Qué precisión tiene la estimación por medidas de cinta frente a un DEXA scan?", a: "El método U.S. Navy presenta un margen de error típico de entre ±3% y ±4% respecto a una densitometría DEXA o pesaje hidrostático, siendo excelente para monitorizar progresos en casa." },
        { q: "¿Dónde se debe medir exactamente la cintura y la cadera?", a: "La cintura se mide en el punto más estrecho del torso (o a la altura del ombligo en hombres) tras una espiración normal. La cadera se mide en la circunferencia máxima de los glúteos." },
        { q: "¿Por qué las mujeres tienen un porcentaje esencial de grasa más elevado?", a: "Las mujeres requieren entre un 10% y un 13% de grasa esencial obligatoria para funciones reproductivas y equilibrio hormonal, frente al 2% a 5% de los hombres." }
      ]
    },
    de: {
      name: "Körperfettrechner",
      seoTitle: "Körperfettrechner — Körperfettanteil (KFA) Berechnen | HelloTools",
      seoDescription: "Berechnen Sie Ihren Körperfettanteil (KFA) nach der US-Navy-Methode.",
      description: "Ermitteln Sie Ihren Körperfettanteil in Prozent.",
      quickAnswer: "Schätzt den prozentualen Fettanteil Ihres Körpers.",
      seoHowToUse: "1. Geschlecht, Größe und Gewicht eingeben.\n2. Hals- und Taillenumfang messen und eintragen.\n3. KFA in % ablesen.",
      seoHowItWorks: "Nützt die Formel der US Navy zur Körperfettberechnung.",
      formula: "KFA = Anthropometrische Navy-Formel",
      seoExample: "Ein Mann mit 85 cm Taille und 38 cm Halsumfang hat ca. 15 % KFA.",
      faqs: [
        { q: "Welche Methode liegt dieser Körperfettberechnung zugrunde?", a: "Das Tool verwendet die anerkannte U.S. Navy Methode, die den Körperfettanteil anhand von Nacken-, Taillen- und Hüftumfang (bei Frauen) sowie Körpergröße bestimmt." },
        { q: "Welche Körperfettwerte gelten als gesund und erstrebenswert?", a: "Für Männer gelten 10 % bis 20 % als gesund (Sportler: 6 % bis 13 %). Bei Frauen gilt ein Bereich von 18 % bis 28 % als ideal (Sportlerinnen: 14 % bis 20 %)." },
        { q: "Wie genau ist die Maßband-Methode im Vergleich zu einem DEXA-Scan?", a: "Die Navy-Methode weicht in der Regel nur um ±3 % bis 4 % von klinischen DEXA-Scans ab und eignet sich optimal für die Heimmessung." },
        { q: "Wo müssen Taille und Hüfte exakt gemessen werden?", a: "Die Taille wird an der schmalsten Stelle des Bauches gemessen. Die Hüfte wird an der breitesten Stelle des Gesäßes bei lockerer Atmung waagerecht gemessen." },
        { q: "Warum benötigen Frauen physiologisch mehr essenzielles Körperfett?", a: "Frauen benötigen 10 % bis 13 % essenzielles Fett für den Hormonhaushalt und die Fortpflanzungsfunktionen, während Männer nur 2 % bis 5 % benötigen." }
      ]
    },
    fr: {
      name: "Calculateur de Taux de Masse Grasse",
      seoTitle: "Calculateur de Taux de Masse Grasse (IMG) | HelloTools",
      seoDescription: "Estimez votre pourcentage de graisse corporelle avec la méthode de l'US Navy.",
      description: "Calculez votre taux de masse grasse en pourcentage.",
      quickAnswer: "Évalue le pourcentage de masse grasse par rapport à votre poids total.",
      seoHowToUse: "1. Saisissez taille, poids et genre.\n2. Indiquez la mesure de votre tour de cou et taille.\n3. Obtenez votre taux d'IMG.",
      seoHowItWorks: "Applique la méthode anthropométrique de la marine américaine.",
      formula: "% Masse Grasse = Formule US Navy",
      seoExample: "Un homme avec 85 cm de tour de taille a un taux de masse grasse d'environ 15 %.",
      faqs: [
        { q: "Quelle méthode de mesure est appliquée pour calculer le taux de masse grasse ?", a: "Il utilise la formule éprouvée de l'U.S. Navy, basée sur les circonférences corporelles du cou, de la taille, des hanches (pour les femmes) et de la stature." },
        { q: "Quels sont les taux de masse grasse recommandés pour les hommes et les femmes ?", a: "Chez l'homme, la fourchette saine se situe entre 10 % et 20 % (6 % à 13 % chez les sportifs). Chez la femme, la plage optimale est de 18 % à 28 % (14 % à 20 % pour les athlètes)." },
        { q: "Quelle est la fiabilité de cette formule par rapport à un scanner DEXA ?", a: "La méthode présente une marge d'erreur moyenne de ±3 % à 4 % par rapport à l'imagerie médicale DEXA, offrant un excellent suivi à domicile." },
        { q: "Comment mesurer précisément son tour de taille et de hanches ?", a: "Mesurez la taille au niveau le plus étroit du torse (ou au nombril) après expiration normale. Mesurez les hanches à la circonférence maximale des fessiers." },
        { q: "Pourquoi les femmes possèdent-elles un pourcentage de graisse essentielle supérieur ?", a: "Les femmes ont besoin d'au moins 10 % à 13 % de graisse essentielle pour préserver leur cycle hormonal et leur fertilité, contre 2 % à 5 % chez l'homme." }
      ]
    },
    pt: {
      name: "Calculadora de Gordura Corporal",
      seoTitle: "Calculadora de Gordura Corporal (% BF) | HelloTools",
      seoDescription: "Estime seu percentual de gordura corporal (% BF) pelo método da Marinha Americana.",
      description: "Descubra seu percentual de gordura e massa magra.",
      quickAnswer: "Estima a porcentagem de gordura em relação ao seu peso total.",
      seoHowToUse: "1. Insira sexo, altura e peso.\n2. Informe a medida do pescoço, cintura (e quadril para mulheres).\n3. Veja seu % de gordura.",
      seoHowItWorks: "Utiliza o método matemático da Marinha dos EUA.",
      formula: "% Gordura = Algoritmo US Navy",
      seoExample: "Um homem com 85 cm de cintura tem cerca de 15% de gordura corporal.",
      faqs: [
        { q: "Qual metodologia é utilizada para calcular o percentual de gordura (BF%)?", a: "Aplica o Método da Marinha Americana (U.S. Navy), que correlaciona a altura com circunferências do pescoço, cintura e quadril (para mulheres)." },
        { q: "Quais faixas de percentual de gordura são consideradas ideais?", a: "Para homens, 10% a 20% é saudável (atletas: 6% a 13%). Para mulheres, 18% a 28% é a faixa saudável (atletas: 14% a 20%)." },
        { q: "Qual a precisão da medição por fita métrica em relação à bioimpedância?", a: "Apresenta margem de erro aproximada de ±3% a 4% em relação a exames clínicos (DEXA), sendo muito mais consistente que balanças de bioimpedância comuns." },
        { q: "Qual a posição correta da fita métrica para tirar as medidas?", a: "A cintura deve ser medida no ponto mais estreito do abdômen (ou na linha do umbigo). O quadril deve ser medido na projeção máxima dos glúteos." },
        { q: "Por que o percentual de gordura mínimo feminino é maior que o masculino?", a: "A biologia feminina requer de 10% a 13% de gordura essencial para a produção de estrogênio e ovulação, enquanto homens necessitam de 2% a 5%." }
      ]
    },
    ja: {
      name: "体脂肪率計算ツール",
      seoTitle: "体脂肪率計算ツール — 米海軍（Navy）式計測 | HelloTools",
      seoDescription: "身長、体重、ウエストサイズ、首回りの測定値から、体脂肪率（%）と除脂肪体重を計算します。",
      description: "ウエストサイズ等の測定値から体脂肪率を推計します。",
      quickAnswer: "身体の周囲長測定値から体脂肪の割合（体脂肪率%）を算出します。",
      seoHowToUse: "1. 性別・身長・体重を入力します。\n2. ウエスト周りと首周り（女性はヒップも）のサイズを入力します。\n3. 体脂肪率（%）を確認します。",
      seoHowItWorks: "高精度な米海軍（US Navy）方式の対数公式で算出します。",
      formula: "体脂肪率(%) = 86.010*log10(ウエスト-首) - 70.041*log10(身長) + 36.76",
      seoExample: "男性でウエスト85cm・首回り38cm・身長175cmの場合、体脂肪率は約15%と推計されます。",
      faqs: [
        { q: "この体脂肪率計算ツールはどのような測定方式を採用していますか？", a: "米海軍方式（U.S. Navy法）を採用しており、身長、首回り、腹囲（女性はヒップ囲）の周囲長から体脂肪率を統計的に高精度推計します。" },
        { q: "健康的な体脂肪率の目安（標準値）は何パーセントですか？", a: "男性は10〜20%（アスリートは6〜13%）、女性は18〜28%（アスリートは14〜20%）が標準的な適正範囲とされています。" },
        { q: "メジャー測定方式の精度はDEXAスキャンや体組成計と比べてどうですか？", a: "医療用のDEXAスキャンとの誤差はおよそ±3〜4%以内であり、体水分量に大きく左右される市販の生体インピーダンス体組成計よりも安定した追跡が可能です。" },
        { q: "ウエストや首回りの正しい測り方を教えてください。", a: "ウエストは自然に息を吐いた状態で一番細い位置（またはへそ位置）を測ります。ヒップはお尻の最も膨らんでいる部分を水平に測定します。" },
        { q: "女性の必須体脂肪率が男性より高い理由は何ですか？", a: "女性の身体は女性ホルモン分泌や妊娠・出産に関わる生殖機能のため、最低限10〜13%の必須体脂肪が必要とされるためです（男性は2〜5%）。" }
      ]
    }
  },

  'macro-calculator': {
    es: {
      name: "Calculadora de Macronutrientes",
      seoTitle: "Calculadora de Macronutrientes (Proteínas, Carbos, Grasas) | HelloTools",
      seoDescription: "Calcula tus gramos diarios necesarios de proteínas, carbohidratos y grasas según tu objetivo.",
      description: "Calcula el reparto ideal de macronutrientes para tu dieta.",
      quickAnswer: "Distribuye las calorías diarias en gramos exactos de proteínas, carbohidratos y lípidos.",
      seoHowToUse: "1. Introduce tus calorías diarias (TDEE).\n2. Elige tu objetivo (definición, mantenimiento o volumen).\n3. Revisa la distribución de macros.",
      seoHowItWorks: "Asigna calorías por gramo: Proteína (4 kcal/g), Carbohidratos (4 kcal/g), Grasa (9 kcal/g).",
      formula: "Proteína (g) = Calorías * %Proteína / 4 | Grasa (g) = Calorías * %Grasa / 9",
      seoExample: "En una dieta de 2.000 kcal al 40/30/30, consumes 200g de proteína, 150g de carbos y 67g de grasa.",
      faqs: [
        { q: "¿Cuántas calorías aporta cada gramo de macronutriente?", a: "Las proteínas y los carbohidratos aportan 4 calorías por gramo cada uno, mientras que las grasas aportan 9 calorías por gramo y el alcohol aporta 7 calorías por gramo." },
        { q: "¿Qué cantidad de proteína diaria se recomienda según el objetivo?", a: "Para personas sedentarias basta con 0,8 g/kg. Para mantener o ganar masa muscular con entrenamiento de fuerza se aconseja entre 1,6 y 2,2 gramos de proteína por kilo de peso corporal al día." },
        { q: "¿Qué proporción de macronutrientes es óptima para perder grasa?", a: "Una distribución frecuente y saciante es 40% proteínas, 30% carbohidratos y 30% grasas saludables, priorizando la proteína para proteger la masa muscular en déficit." },
        { q: "¿Son indispensables las grasas dietéticas para la salud?", a: "Sí. Las grasas son esenciales para la síntesis de hormonas esteroides (como testosterona y estrógeno), la salud cerebral y la absorción de vitaminas liposolubles (A, D, E, K)." },
        { q: "¿Cómo adapto los macros a una dieta cetogénica (Keto)?", a: "En una pauta cetogénica estándar los carbohidratos se restringen a menos del 5% al 10% del total calórico (20 a 50 g al día), las grasas suben al 70-75% y la proteína ronda el 20-25%." }
      ]
    },
    de: {
      name: "Makronährstoff-Rechner",
      seoTitle: "Makronährstoff-Rechner — Eiweiß, Kohlenhydrate, Fett | HelloTools",
      seoDescription: "Berechnen Sie die optimale Verteilung von Proteinen, Kohlenhydraten und Fetten.",
      description: "Verteilung der täglichen Nährstoffe für Ihr Fitnessziel berechnen.",
      quickAnswer: "Teilt Ihren täglichen Kalorienbedarf in Gramm für Eiweiß, Kohlenhydrate und Fett auf.",
      seoHowToUse: "1. Kalorienbedarf (TDEE) eingeben.\n2. Ziel wählen (Abnehmen, Muskelaufbau).\n3. Makros in Gramm ablesen.",
      seoHowItWorks: "Rechnet nach Brennwerten: Eiweiß/Carbs = 4 kcal/g, Fett = 9 kcal/g.",
      formula: "Protein (g) = Kalorien * %Protein / 4",
      seoExample: "Bei 2.000 kcal (40/30/30) essen Sie 200g Protein, 150g Carbs und 67g Fett.",
      faqs: [
        { q: "Wie viele Kalorien liefert jedes Gramm der Hauptnährstoffe?", a: "Proteine und Kohlenhydrate liefern jeweils 4 kcal pro Gramm, Fette liefern 9 kcal pro Gramm und Alkohol liefert 7 kcal pro Gramm." },
        { q: "Wie viel Protein sollte man pro Kilogramm Körpergewicht täglich zuführen?", a: "Für Kraftsportler und Muskelschutz im Kaloriendefizit gelten 1,6 bis 2,2 g Protein pro kg Körpergewicht als wissenschaftlicher Goldstandard (Nicht-Sportler: mind. 0,8 g/kg)." },
        { q: "Welche Makronährstoff-Verteilung eignet sich optimal zum Fettabbau?", a: "Häufig bewährt hat sich ein Split von 35-40 % Protein, 30-35 % Kohlenhydrate und 25-30 % Fett, da Protein besonders gut sättigt und Muskeln schützt." },
        { q: "Warum darf die Fettzufuhr in einer Diät nicht zu stark gedrosselt werden?", a: "Nahrungsfette sind unverzichtbar für den Hormonhaushalt (insbesondere Testosteron und Schilddrüsenhormone) und die Aufnahme fettlöslicher Vitamine." },
        { q: "Wie sieht die Makro-Verteilung bei einer Low-Carb- oder Keto-Diät aus?", a: "Bei striktem Keto werden Kohlenhydrate auf unter 5-10 % reduziert, während gesunde Fette 70-75 % und Proteine 20-25 % der Kalorienmenge ausmachen." }
      ]
    },
    fr: {
      name: "Calculateur de Macronutriments",
      seoTitle: "Calculateur de Macronutriments (Protéines, Glucides, Lipides) | HelloTools",
      seoDescription: "Calculez votre répartition idéale en protéines, glucides et lipides selon vos objectifs.",
      description: "Répartissez vos calories quotidiennes en grammes de nutriments.",
      quickAnswer: "Convertit votre apport calorique en grammes de protéines, glucides et lipides.",
      seoHowToUse: "1. Entrez votre apport calorique quotidien.\n2. Choisissez votre objectif sportif.\n3. Obtenez votre bilan de macros.",
      seoHowItWorks: "Utilise la valeur énergétique par gramme de chaque nutriment.",
      formula: "Protéines (g) = Calories * %Protéines / 4",
      seoExample: "Pour 2 000 kcal (40/30/30), consommez 200g de protéines, 150g de glucides et 67g de lipides.",
      faqs: [
        { q: "Quel est l'apport calorique par gramme pour chaque macronutriment ?", a: "Les protéines et les glucides apportent chacun 4 calories par gramme, tandis que les lipides fournissent 9 calories par gramme." },
        { q: "Combien de protéines consommer par jour pour les sportifs ?", a: "Pour stimuler la synthèse musculaire et préserver les fibres à l'effort, les recommandations sportives préconisent entre 1,6 et 2,2 g de protéines par kg de poids de corps." },
        { q: "Quelle répartition de macros est la plus efficace pour sécher ?", a: "Un équilibre classique comprend 35 à 40 % de protéines, 30 à 35 % de glucides et 25 à 30 % de lipides afin de préserver l'énergie et la satiété." },
        { q: "Pourquoi ne faut-il jamais supprimer les lipides de son alimentation ?", a: "Les lipides sont indispensables à la production hormonale, au système nerveux et à l'assimilation des vitamines A, D, E et K." },
        { q: "Comment configurer ses macros pour une alimentation cétogène ?", a: "Dans le régime cétogène, les glucides sont limités à moins de 30-50 g par jour (5 à 10 %), les lipides représentent 70 à 75 % et les protéines 20 à 25 % de l'apport énergétique." }
      ]
    },
    pt: {
      name: "Calculadora de Macronutrientes",
      seoTitle: "Calculadora de Macronutrientes (Proteínas, Carbos, Gorduras) | HelloTools",
      seoDescription: "Calcule as gramas diárias de proteínas, carboidratos e gorduras para seu objetivo.",
      description: "Descubra a divisão perfeita de macros para a sua dieta.",
      quickAnswer: "Divide as calorias diárias em gramas exatas de proteína, carboidrato e gordura.",
      seoHowToUse: "1. Insira seu consumo calórico diário.\n2. Escolha seu objetivo (emagrecer, manter ou ganhar massa).\n3. Veja as gramas de cada macro.",
      seoHowItWorks: "Calcula a gramatura baseada nas calorias de cada macronutriente.",
      formula: "Proteínas (g) = Calorias * %Proteína / 4",
      seoExample: "Em uma dieta de 2.000 kcal (40/30/30), consuma 200g de proteína, 150g de carbos e 67g de gordura.",
      faqs: [
        { q: "Quantas calorias contém cada grama de macronutriente?", a: "Proteínas e carboidratos contêm 4 calorias por grama cada, enquanto as gorduras (lipídios) fornecem 9 calorias por grama." },
        { q: "Qual a meta diária de proteína recomendada para quem treina?", a: "Recomenda-se entre 1,6 e 2,2 g de proteína por quilo de peso corporal para praticantes de musculação que buscam hipertrofia ou preservação de massa magra." },
        { q: "Qual proporção de macros funciona melhor para emagrecimento?", a: "Uma distribuição muito eficiente é 40% de proteínas, 35% de carboidratos complexos e 25% de gorduras saudáveis, garantindo saciedade duradoura." },
        { q: "Por que é prejudicial zerar o consumo de gorduras na dieta?", a: "As gorduras são matéria-prima para a síntese hormonal de testosterona e estrogênio e para a integridade das membranas celulares." },
        { q: "Como estruturar os macronutrientes para a dieta cetogênica?", a: "Na dieta cetogênica clássica os carboidratos são restritos a 5-10% (menos de 30 g líquidos), com 70-75% de gorduras boas e 20-25% de proteínas." }
      ]
    },
    ja: {
      name: "PFCバランス（マクロ栄養素）計算ツール",
      seoTitle: "PFCバランス計算ツール — タンパク質・脂質・炭水化物 | HelloTools",
      seoDescription: "1日の目標摂取カロリーから、タンパク質（P）、脂質（F）、炭水化物（C）の最適な目標グラム数を算出します。",
      description: "目標カロリーに対するPFC（タンパク質・脂質・炭水化物）の割合を計算します。",
      quickAnswer: "1日の摂取カロリーをタンパク質、脂質、炭水化物の最適なグラム数に分解算出します。",
      seoHowToUse: "1. 1日の目標摂取カロリーを入力します。\n2. ダイエット目的（減量・維持・増量）を選択します。\n3. PFCそれぞれの目標グラム数（g）を確認します。",
      seoHowItWorks: "タンパク質=4kcal/g、炭水化物=4kcal/g、脂質=9kcal/gの熱量比換算を行います。",
      formula: "タンパク質(g) = カロリー * %P / 4",
      seoExample: "2,000kcal（P40%/F30%/C30%）の場合、P:200g、F:67g、C:150gとなります。",
      faqs: [
        { q: "各栄養素（タンパク質・脂質・炭水化物）の1gあたりカロリーは？", a: "タンパク質と炭水化物は1gあたり約4kcal、脂質は1gあたり約9kcalの熱量を体に供給します。" },
        { q: "筋力トレーニングを行う人の1日の推奨タンパク質量は？", a: "筋肉の合成と維持のため、体重1kgあたり1.6〜2.2g（体重70kgなら112〜154g）の摂取が国際的なスポーツ栄養学会で推奨されています。" },
        { q: "体脂肪を減らす減量期（PFCバランス）のおすすめ比率は？", a: "タンパク質30〜40%、脂質20〜25%、炭水化物40〜45%のPFCバランスが、満腹感を保ちながら筋肉を維持して減量する王道の構成です。" },
        { q: "脂質を極端に制限しすぎるとどのような悪影響がありますか？", a: "ホルモン（テストステロンやエストロゲン）の生成障害、肌の乾燥、脂溶性ビタミン（A・D・E・K）の吸収不全を引き起こすリスクがあります。" },
        { q: "ケトジェニックダイエット（糖質制限）のPFC比率はどう設定しますか？", a: "糖質（炭水化物）を全体の5〜10%以下（1日20〜50g）に抑え、良質な脂質を65〜75%、タンパク質を20〜25%程度に設定します。" }
      ]
    }
  },

  'pregnancy-calculator': {
    es: {
      name: "Calculadora de Fecha de Parto y Embarazo",
      seoTitle: "Calculadora de Fecha Probable de Parto (FPP) | HelloTools",
      seoDescription: "Calcula tu fecha probable de parto y semanas de gestación según tu última regla.",
      description: "Calcula tu fecha de parto y el seguimiento semana a semana de tu embarazo.",
      quickAnswer: "Estima la fecha de nacimiento del bebé basándose en el primer día de la última menstruación.",
      seoHowToUse: "1. Introduce la fecha del primer día de tu última regla (FUM).\n2. Obtén la fecha estimada de parto.\n3. Revisa la semana actual de gestación.",
      seoHowItWorks: "Aplica la Regla de Naegele sumando 280 días a la FUM.",
      formula: "Fecha de Parto = FUM + 280 días (40 semanas)",
      seoExample: "Con una FUM del 1 de enero, la fecha probable de parto es el 8 de octubre.",
      faqs: [
        { q: "¿Cómo se calcula la fecha probable de parto (FPP)?", a: "Se calcula aplicando la Regla de Naegele: sumando 280 días (40 semanas) al primer día de la última regla (FUR/FUM), asumiendo un ciclo ovulatorio estándar de 28 días." },
        { q: "¿Qué porcentaje de bebés nacen exactamente en la fecha prevista de parto?", a: "Solo alrededor del 4% al 5% de los bebés nacen en la fecha estimada exacta; la gran mayoría nace en el intervalo comprendido entre las semanas 37 y 42." },
        { q: "¿Cómo se adapta el cálculo si mi ciclo menstrual es más largo o más corto?", a: "Si tu ciclo es de 32 días (4 días más largo de lo habitual), la ovulación ocurre 4 días más tarde y la fecha de parto se pospone 4 días." },
        { q: "¿Cuándo se determinan con mayor precisión las semanas de gestación?", a: "La ecografía del primer trimestre (semanas 11 a 13) midiendo la longitud cráneo-rabadilla (CRL) es el método médico más exacto para fechar el embarazo." },
        { q: "¿Cuáles son las semanas que definen cada uno de los tres trimestres?", a: "El primer trimestre abarca de la semana 1 a la 13; el segundo trimestre va de la semana 14 a la 27; y el tercer trimestre abarca desde la semana 28 hasta el parto." }
      ]
    },
    de: {
      name: "Schwangerschaftsrechner",
      seoTitle: "Schwangerschaftsrechner — Geburtstermin Berechnen | HelloTools",
      seoDescription: "Berechnen Sie Ihren voraussichtlichen Geburtstermin und die Schwangerschaftswoche.",
      description: "Entbindungstermin und Schwangerschaftswoche einfach ermitteln.",
      quickAnswer: "Berechnet den voraussichtlichen Geburtstermin ab dem ersten Tag der letzten Periode.",
      seoHowToUse: "1. Ersten Tag der letzten Periode eingeben.\n2. Geburtstermin ablesen.\n3. Aktuelle SSW erfahren.",
      seoHowItWorks: "Nützt die Naegele-Regel (280 Tage Additionsregel).",
      formula: "Geburtstermin = Letzte Periode + 280 Tage",
      seoExample: "Bei letzter Periode am 1. Januar ist der Entbindungstermin der 8. Oktober.",
      faqs: [
        { q: "Wie wird der voraussichtliche Geburtstermin (ET) berechnet?", a: "Nach der Naegele-Regel: Erster Tag der letzten Periode + 7 Tage - 3 Monate + 1 Jahr (bzw. 280 Tage / 40 Schwangerschaftswochen ab Periodenbeginn)." },
        { q: "Wie viele Kinder kommen exakt am errechneten Geburtstermin zur Welt?", a: "Nur etwa 4 % der Babys werden punktgenau am Stichtag geboren; die Normalspanne für eine reife Geburt reicht von der 37. bis zur 42. Schwangerschaftswoche." },
        { q: "Wie verändert eine abweichende Zykluslänge den Geburtstermin?", a: "Bei längeren Zyklen (z. B. 35 Tage) verschiebt sich der Eisprung und somit auch der Geburtstermin um die entsprechende Tagesdifferenz nach hinten." },
        { q: "Welche medizinische Untersuchung liefert die genaueste Datierung?", a: "Der Ultraschall im ersten Trimester (11. bis 14. SSW) anhand der Scheitel-Steiß-Länge (SSL) gilt als klinischer Goldstandard für die Schwangerschaftsdauer." },
        { q: "Wie teilen sich die drei Trimester der Schwangerschaft auf?", a: "Das 1. Trimester reicht bis zur 13. Woche, das 2. Trimester umfasst die 14. bis 27. Woche und das 3. Trimester reicht von der 28. Woche bis zur Geburt." }
      ]
    },
    fr: {
      name: "Calculateur de Date d'Accouchement",
      seoTitle: "Calculateur de Date d'Accouchement et Grossesse | HelloTools",
      seoDescription: "Calculez votre date probable d'accouchement (DPA) et suivez vos semaines de grossesse.",
      description: "Déterminez la date présumée de la naissance de votre bébé.",
      quickAnswer: "Estime la date d'accouchement à partir du premier jour des dernières règles.",
      seoHowToUse: "1. Saisissez la date du premier jour des dernières règles.\n2. Obtenez votre date présumée d'accouchement.\n3. Suivez le calendrier de grossesse.",
      seoHowItWorks: "Utilise la règle médicale de Naegele (280 jours).",
      formula: "DPA = Date des dernières règles + 280 jours",
      seoExample: "Pour des règles le 1er janvier, la date d'accouchement estimée est le 8 octobre.",
      faqs: [
        { q: "Comment calcule-t-on la date présumée d'accouchement (DPA) ?", a: "Selon la règle de Naegele, la DPA est fixée à 280 jours (40 semaines d'aménorrhée ou 39 semaines de grossesse) à compter du premier jour des dernières règles." },
        { q: "Quel pourcentage de naissances survient exactement le jour du terme ?", a: "Seulement 4 à 5 % des enfants naissent le jour J ; un accouchement à terme se situe physiologiquement entre 37 et 41 semaines et demie d'aménorrhée." },
        { q: "Comment ajuster le terme si les cycles menstruels sont irréguliers ?", a: "Un décalage de la durée du cycle par rapport aux 28 jours moyens reporte la date d'ovulation et recule ou avance d'autant la date prévisionnelle de terme." },
        { q: "Quel examen médical permet de dater la grossesse avec le plus de précision ?", a: "L'échographie de datation du premier trimestre (mesure de la longueur cranio-caudale - LCC) vers 12 SA permet de dater le début de grossesse à 3 ou 4 jours près." },
        { q: "Quelle est la durée des trois trimestres de la grossesse ?", a: "Le premier trimestre s'achève à la 13e semaine d'aménorrhée, le second s'étend de la 14e à la 27e SA, et le troisième de la 28e SA jusqu'à l'accouchement." }
      ]
    },
    pt: {
      name: "Calculadora de Gravidez e Parto",
      seoTitle: "Calculadora de Data Provável do Parto (DPP) | HelloTools",
      seoDescription: "Calcule a data provável do parto (DPP) e descubra sua semana de gestação.",
      description: "Descubra a data estimada do nascimento do seu bebê.",
      quickAnswer: "Calcula a data provável do parto a partir da Data da Última Menstruação (DUM).",
      seoHowToUse: "1. Informe o primeiro dia da sua última menstruação (DUM).\n2. Veja a Data Provável do Parto (DPP).\n3. Confira em qual semana de gestação você está.",
      seoHowItWorks: "Aplica a Regra de Naegele (adiciona 280 dias ou 40 semanas à DUM).",
      formula: "DPP = DUM + 280 dias",
      seoExample: "Com DUM em 1 de janeiro, a data provável do parto é 8 de outubro.",
      faqs: [
        { q: "Como é calculada a Data Provável do Parto (DPP)?", a: "Aplica-se a Regra de Naegele: somam-se 280 dias (40 semanas gestacionais) ao primeiro dia da última menstruação (DUM), considerando um ciclo de 28 dias." },
        { q: "Qual percentual de partos acontece exatamente na data prevista?", a: "Apenas cerca de 4% a 5% dos bebês nascem no dia exato da DPP; considera-se nascimento a termo qualquer parto entre a 37ª e a 42ª semana." },
        { q: "Como ciclos menstruais mais longos ou curtos alteram o cálculo?", a: "Ciclos mais longos indicam ovulação tardia, postergando a DPP pelo número de dias excedentes aos 28 dias de referência." },
        { q: "Qual exame médico oferece a confirmação mais precisa da idade gestacional?", a: "O ultrassom obstétrico de primeiro trimestre (entre 11 e 13 semanas), mensurando o Comprimento Cabeça-Nádega (CCN), possui precisão de dias." },
        { q: "Como se dividem os três trimestres da gestação?", a: "O primeiro trimestre vai até a 13ª semana; o segundo compreende da 14ª à 27ª semana; e o terceiro estende-se da 28ª semana até o nascimento." }
      ]
    },
    ja: {
      name: "出産予定日・妊娠週数計算ツール",
      seoTitle: "出産予定日計算ツール — 最終生理開始日基準 | HelloTools",
      seoDescription: "最終生理開始日を入力するだけで、出産予定日（ネーゲレ概算法）や現在の妊娠週数・日数を計算します。",
      description: "最終生理開始日から出産予定日や現在の妊娠週数を計算します。",
      quickAnswer: "最終生理開始日から280日（40週0日）後を出産予定日として算出します。",
      seoHowToUse: "1. 最終生理開始日を選択します。\n2. 「計算」ボタンを押します。\n3. 出産予定日および現在の妊娠週数（〇週〇日）を確認します。",
      seoHowItWorks: "産婦人科で標準的なネーゲレ概算法（最終生理日 + 280日）で算出します。",
      formula: "出産予定日 = 最終生理開始日 + 280日（40週0日）",
      seoExample: "最終生理開始日が1月1日の場合、出産予定日は10月8日頃となります。",
      faqs: [
        { q: "出産予定日（分べん予定日）の算出方法を教えてください。", a: "世界標準のネーゲレ概算法に基づき、最終月経の開始日に280日（40週0日）を加算して算出します（標準の28日周期を想定）。" },
        { q: "予定日当日に赤ちゃんが生まれる確率はどのくらいですか？", a: "予定日当日に生まれる赤ちゃんは約5%程度にすぎません。妊娠37週0日から41週6日までの「正期産」の期間内に約8割以上の出産が発生します。" },
        { q: "生理周期が28日より長い・短い場合はどう補正しますか？", a: "生理周期が35日の場合は排卵日が約7日遅れるため、予定日も7日後ろ倒しに補正して計算します。" },
        { q: "医学的に最も正確な妊娠週数の確定方法は？", a: "妊娠8〜11週頃に行われる産婦人科の初期超音波検査で胎児の頭臀長（CRL）を計測し、その発育度合いから予定日を確定するのが最も確実です。" },
        { q: "妊娠初期・中期・後期の期間区分はどうなっていますか？", a: "妊娠初期は妊娠13週まで（1〜4ヶ月）、妊娠中期は妊娠14週から27週（5〜7ヶ月・安定期）、妊娠後期は妊娠28週以降（8ヶ月〜出産）と区分されます。" }
      ]
    }
  },

  'ovulation-calculator': {
    es: {
      name: "Calculadora de Ovulación y Días Fértiles",
      seoTitle: "Calculadora de Ovulación y Días Fértiles | HelloTools",
      seoDescription: "Calcula tu día de ovulación y tu ventana fértil para planificar o evitar un embarazo.",
      description: "Calcula tus días más fértiles del ciclo menstrual.",
      quickAnswer: "Identifica los días de mayor fertilidad estimando el día exacto de la ovulación.",
      seoHowToUse: "1. Introduce la fecha de tu última regla.\n2. Indica la duración habitual de tu ciclo (ej. 28 días).\n3. Descubre tus días fértiles.",
      seoHowItWorks: "Resta 14 días a la duración media del ciclo menstrual.",
      formula: "Día de Ovulación = Fecha Última Regla + Duración Ciclo - 14 días",
      seoExample: "En un ciclo de 28 días, la ovulación ocurre aproximadamente en el día 14.",
      faqs: [
        { q: "¿En qué día del ciclo menstrual ocurre habitualmente la ovulación?", a: "La ovulación suele ocurrir unos 14 días antes del inicio del siguiente periodo menstrual (alrededor del día 14 en un ciclo regular de 28 días)." },
        { q: "¿Qué es la ventana fértil y cuántos días dura?", a: "La ventana fértil abarca los 5 días previos a la ovulación más el propio día en que se libera el óvulo, sumando un total de 6 días en los que el embarazo es biológicamente viable." },
        { q: "¿Cuánto tiempo sobreviven los espermatozoides y el óvulo?", a: "Los espermatozoides pueden sobrevivir hasta 5 días en el tracto reproductor femenino, mientras que el óvulo desovado solo sobrevive entre 12 y 24 horas si no es fecundado." },
        { q: "¿Qué síntomas corporales indican que se acerca la ovulación?", a: "Flujo cervical transparente y elástico (con aspecto de clara de huevo), leve aumento de la temperatura basal al despertar y leve dolor o tensión pélvica lateral." },
        { q: "¿Es fiable esta calculadora para mujeres con ciclos irregulares?", a: "Es una estimación estadística basada en promedios. Para ciclos irregulares se recomienda complementar con tests de ovulación urinarios en tira (LH) o seguimiento médico." }
      ]
    },
    de: {
      name: "Eisprungrechner",
      seoTitle: "Eisprungrechner — Fruchtbare Tage Berechnen | HelloTools",
      seoDescription: "Berechnen Sie Ihren Eisprung und Ihre fruchtbaren Tage für die Familienplanung.",
      description: "Fruchtbare Tage und Eisprung genau berechnen.",
      quickAnswer: "Bestimmt das Zeitfenster der höchsten Fruchtbarkeit im Menstruationszyklus.",
      seoHowToUse: "1. Ersten Tag der letzten Periode angeben.\n2. Zykluslänge (z.B. 28 Tage) wählen.\n3. Fruchtbare Tage ablesen.",
      seoHowItWorks: "Zieht 14 Tage von der gewählten Zykluslänge ab.",
      formula: "Eisprung = Letzte Periode + Zykluslänge - 14 Tage",
      seoExample: "Bei einem 28-Tage-Zyklus findet der Eisprung am 14. Tag statt.",
      faqs: [
        { q: "An welchem Zyklustag findet der Eisprung typischerweise statt?", a: "Der Eisprung (Ovulation) erfolgt in der Regel 14 Tage vor Beginn der nächsten Monatsblutung (bei einem 28-Tage-Zyklus etwa am 14. Tag)." },
        { q: "Wie lange dauert das fruchtbare Zeitfenster im Zyklus?", a: "Die fruchtbaren Tage umfassen 6 Tage: die 5 Tage vor dem Eisprung sowie den Tag des Eisprungs selbst." },
        { q: "Wie lange sind Samenzellen und Eizelle befruchtungsfähig?", a: "Spermien können im Gebärmutterhals bis zu 5 Tage überleben. Die Eizelle ist nach dem Eisprung nur für etwa 12 bis maximal 24 Stunden befruchtungsfähig." },
        { q: "Welche körperlichen Anzeichen weisen auf die Ovulation hin?", a: "Spinnbarer, glasiger Zervixschleim, ein messbarer Anstieg der Basaltemperatur nach dem Eisprung und gelegentlicher leichter Mittelschmerz." },
        { q: "Eignet sich der Rechner als Verhütungsmethode?", a: "Nein. Kalenderrechner sind für die Empfängnisverhütung zu ungenau, da der Eisprung durch Stress oder Krankheiten natürlichen Schwankungen unterliegt." }
      ]
    },
    fr: {
      name: "Calculateur d'Ovulation",
      seoTitle: "Calculateur d'Ovulation et Jours Fertiles | HelloTools",
      seoDescription: "Calculez votre jour d'ovulation et votre période de fertilité maximale.",
      description: "Déterminez vos jours les plus fertiles.",
      quickAnswer: "Estime le jour de l'ovulation et la fenêtre de fertilité optimale.",
      seoHowToUse: "1. Entrez la date de vos dernières règles.\n2. Indiquez la durée moyenne de votre cycle.\n3. Consultez vos jours fertiles.",
      seoHowItWorks: "Retranche 14 jours de la durée totale du cycle.",
      formula: "Ovulation = Date règles + Durée cycle - 14 jours",
      seoExample: "Pour un cycle de 28 jours, l'ovulation a lieu au 14ème jour.",
      faqs: [
        { q: "À quel jour du cycle menstruel l'ovulation a-t-elle lieu ?", a: "L'ovulation survient environ 14 jours avant le premier jour des règles suivantes (soit au 14e jour d'un cycle moyen régulier de 28 jours)." },
        { q: "Combien de temps dure la période de fertilité maximale ?", a: "La fenêtre de fertilité s'étend sur 6 jours : les 5 jours précédant l'ovulation et le jour même de la ponte ovulaire." },
        { q: "Quelle est la durée de survie des spermatozoïdes et de l'ovocyte ?", a: "Les spermatozoïdes peuvent survivre jusqu'à 5 jours dans la glaire cervicale, tandis que l'ovocyte ne survit qu'entre 12 et 24 heures sans fécondation." },
        { q: "Quels sont les signes biologiques annonciateurs de l'ovulation ?", a: "Une glaire cervicale fluide et filante comme du blanc d'œuf, une hausse de la température basale au réveil et de légers tiraillements pelviens." },
        { q: "Ce calendrier d'ovulation peut-il servir de méthode contraceptive ?", a: "Absolument pas. Les méthodes calendaires sont insuffisantes pour la contraception en raison de la variabilité naturelle des cycles." }
      ]
    },
    pt: {
      name: "Calculadora de Ovulação e Dias Férteis",
      seoTitle: "Calculadora de Ovulação e Período Fértil | HelloTools",
      seoDescription: "Calcule seu dia de ovulação e seu período fértil para engravidar.",
      description: "Descubra seus dias mais férteis do mês.",
      quickAnswer: "Estima os dias com maior probabilidade de concepção no seu ciclo.",
      seoHowToUse: "1. Digite a data da sua última menstruação.\n2. Informe a duração média do seu ciclo.\n3. Veja os dias férteis no calendário.",
      seoHowItWorks: "Subtrai 14 dias da duração total do ciclo menstrual.",
      formula: "Ovulação = Data Menstruação + Duração Ciclo - 14 dias",
      seoExample: "Em um ciclo de 28 dias, a ovulação ocorre por volta do 14º dia.",
      faqs: [
        { q: "Em qual dia do ciclo menstrual costuma ocorrer a ovulação?", a: "A ovulação ocorre cerca de 14 dias antes do primeiro dia do ciclo seguinte (por volta do 14º dia em ciclos regulares de 28 dias)." },
        { q: "O que é e quanto tempo dura o período fértil da mulher?", a: "A janela fértil dura cerca de 6 dias: os 5 dias anteriores à ovulação somados ao dia exato em que o óvulo é liberado." },
        { q: "Quanto tempo os espermatozoides e o óvulo sobrevivem no organismo?", a: "Espermatozoides sobrevivem até 5 dias nas trompas uterinas, ao passo que o óvulo permanece fértil por apenas 12 a 24 horas." },
        { q: "Quais sintomas corporais confirmam o período de ovulação?", a: "Aumento do muco cervical (com aspecto translúcido e elástico de clara de ovo), elevação da temperatura basal matinal e leve dor pélvica lateral." },
        { q: "A calculadora de ovulação é recomendada para ciclos irregulares?", a: "Ela oferece uma estimativa média teórica. Para ciclos com variação frequente, recomenda-se associar testes de ovulação de farmácia (hormônio LH)." }
      ]
    },
    ja: {
      name: "排卵日・危険日（妊活）計算ツール",
      seoTitle: "排卵日計算ツール — 妊娠しやすい危険日 | HelloTools",
      seoDescription: "最終生理開始日と生理周期日数から、次回の排卵日および妊娠可能性の高い時期（妊娠中・妊活向け）を計算します。",
      description: "生理周期から排卵日と最も妊娠しやすい危険時期を計算します。",
      quickAnswer: "次回生理予定日の14日前を排卵推定日として妊娠しやすい期間を計算します。",
      seoHowToUse: "1. 最終生理開始日を入力します。\n2. 平均的な生理周期（例：28日）を指定します。\n3. 排卵推定日と最も妊娠しやすい期間を確認します。",
      seoHowItWorks: "オギノ式・医学的基準の「次回生理予定日の14日前」公式で算定します。",
      formula: "排卵推定日 = 最終生理日 + 周期日数 - 14日",
      seoExample: "28日周期の場合、生理開始から約14日目が排卵日となります。",
      faqs: [
        { q: "排卵日は生理開始日から数えて何日目に起こりますか？", a: "排卵は「次の生理が始まる日の約14日前」に起こります。標準的な28日周期の方であれば、前回の生理開始日から数えて約14日目前後が目安です。" },
        { q: "妊娠の可能性が最も高い「危険日（受胎可能期間）」は何日間ですか？", a: "排卵日の5日前から排卵日当日までの「計6日間」が妊娠可能期間（受胎ウィンドウ）となります。" },
        { q: "精子と卵子の体内での寿命（受精可能期間）はどれくらいですか？", a: "女性の体内での精子の寿命は約3〜5日間、排卵された卵子の受精寿命はわずか12〜24時間程度です。" },
        { q: "排卵が近づいていることを示す身体のサイン（兆候）は？", a: "透明でよく伸びる頸管粘液（おりもの）、排卵直後の基礎体温の上昇（高温期への移行）、下腹部の軽い排卵痛などが見られます。" },
        { q: "この排卵計算ツールは避妊目的で利用できますか？", a: "避妊目的での利用は推奨されません。ストレスや体調により排卵日は数日ずれることがあるため、妊娠を望む妊活の目安としてご活用ください。" }
      ]
    }
  },

  'running-pace-calculator': {
    es: {
      name: "Calculadora de Ritmo de Carrera",
      seoTitle: "Calculadora de Ritmo de Carrera (Pace min/km) | HelloTools",
      seoDescription: "Calcula tu ritmo por kilómetro (min/km), tiempo total de carrera y velocidad media.",
      description: "Calcula tu ritmo por kilómetro y velocidad media en carrera.",
      quickAnswer: "Calcula el tiempo promedio necesario para recorrer un kilómetro o milla.",
      seoHowToUse: "1. Introduce la distancia recorrida (ej. 10 km o 42.195 km).\n2. Indica el tiempo total de carrera.\n3. Lee tu ritmo (min/km) y velocidad (km/h).",
      seoHowItWorks: "Divide el tiempo total entre la distancia recorrida.",
      formula: "Ritmo = Tiempo Total / Distancia",
      seoExample: "Correr 10 km en 50 minutos equivale a un ritmo de 5:00 min/km (12 km/h).",
      faqs: [
        { q: "¿Cómo se calcula el ritmo de carrera (pace) por kilómetro o milla?", a: "El ritmo se calcula dividiendo el tiempo total transcurrido entre la distancia recorrida: Ritmo = Tiempo / Distancia. Por ejemplo, 10 km en 50 minutos equivale a un ritmo de 5:00 min/km." },
        { q: "¿A qué ritmo debo correr para terminar un maratón en menos de 4 horas?", a: "Para lograr el hito de las 4 horas en maratón (42,195 km) se requiere un ritmo constante medio de 5:41 minutos por kilómetro (9:09 min/milla)." },
        { q: "¿Qué ritmo se necesita para bajar de 25 minutos en 5K?", a: "Se requiere mantener un ritmo constante de 5:00 minutos por kilómetro (8:03 min/milla) para cruzar la meta de los 5.000 metros en 25 minutos exactos." },
        { q: "¿Cómo influye la pendiente o el calor en el ritmo de carrera?", a: "Desniveles positivos, viento en contra y temperaturas superiores a 20 °C aumentan el coste fisiológico, reduciendo la velocidad equivalente en torno a 10-30 segundos por km para una misma frecuencia cardíaca." },
        { q: "¿Permite esta calculadora proyectar tiempos parciales (splits)?", a: "Sí. Puedes calcular el ritmo por km, por milla y proyectar tiempos de paso parciales uniformes para cualquier distancia oficial o personalizada." }
      ]
    },
    de: {
      name: "Laufzeit- & Pace-Rechner",
      seoTitle: "Pace-Rechner — Laufzeit & Geschwindigkeit (min/km) | HelloTools",
      seoDescription: "Berechnen Sie Ihre Pace pro Kilometer, Laufzeit und Durchschnittsgeschwindigkeit.",
      description: "Ermitteln Sie Ihre Pace pro km und Geschwindigkeit beim Laufen.",
      quickAnswer: "Errechnet die benötigte Zeit pro Kilometer oder Meile.",
      seoHowToUse: "1. Gelaufene Distanz eingeben.\n2. Gesamtzeit eintragen.\n3. Pace (min/km) und Geschwindigkeit (km/h) ablesen.",
      seoHowItWorks: "Teilt die Gesamtzeit durch die Kilometerdistanz.",
      formula: "Pace = Gesamtzeit / Distanz",
      seoExample: "10 km in 50 Minuten entsprechen einer Pace von 5:00 min/km (12 km/h).",
      faqs: [
        { q: "Wie berechnet man die Lauf-Pace in Minuten pro Kilometer?", a: "Die Pace ergibt sich aus der Division von Gesamtlaufzeit durch Distanz: Pace = Zeit / Strecke. 10 km in 50 Minuten entsprechen einer Pace von 5:00 min/km." },
        { q: "Welche Pace benötigt man für einen Marathon unter 4 Stunden?", a: "Für einen Sub-4-Stunden-Marathon (42,195 km) ist eine Durchschnitts-Pace von 5:41 min/km (bzw. 9:09 min/Meile) erforderlich." },
        { q: "Welche Pace braucht man für 5 km unter 25 Minuten?", a: "Eine konstante Pace von 5:00 min/km (oder 8:03 min/Meile) bringt Sie nach exakt 25:00 Minuten ins Ziel." },
        { q: "Wie wirken sich Steigungen und Hitze auf die Soll-Pace aus?", a: "Höhenmeter und Hitze erhöhen den Puls; erfahrene Läufer steuern ihr Tempo am Berg über das Belastungsempfinden statt starr über die GPS-Pace." },
        { q: "Unterstützt der Rechner auch englische Meilen (min/mi)?", a: "Ja, Sie können flexibel zwischen metrischem System (min/km) und Meilen-Standard (min/mile) sowie vordefinierten Wettkampfdistanzen umschalten." }
      ]
    },
    fr: {
      name: "Calculateur de Allure de Course",
      seoTitle: "Calculateur d'Allure de Course (min/km) | HelloTools",
      seoDescription: "Calculez votre allure par kilomètre, temps de course et vitesse moyenne.",
      description: "Calculez votre allure au km et votre vitesse moyenne en course à pied.",
      quickAnswer: "Calcule le temps moyen mis pour parcourir un kilomètre.",
      seoHowToUse: "1. Indiquez la distance (ex: 10 km ou semi-marathon).\n2. Saisissez le temps total.\n3. Consultez votre allure.",
      seoHowItWorks: "Divise la durée totale par la distance parcourue.",
      formula: "Allure = Temps / Distance",
      seoExample: "Courir 10 km en 50 minutes donne une allure de 5:00 min/km (12 km/h).",
      faqs: [
        { q: "Comment calculer son allure de course (pace) au kilomètre ?", a: "L'allure se calcule en divisant le temps total par la distance parcourue : Allure = Temps / Distance. Courir 10 km en 50 minutes correspond à une allure de 5:00 min/km (12 km/h)." },
        { q: "Quelle allure adopter pour réussir un marathon en moins de 4 heures ?", a: "Il est impératif de maintenir une allure moyenne de 5:41 min/km (soit 10,55 km/h) sur les 42,195 km de l'épreuve." },
        { q: "Quelle allure viser pour boucler un 5 km en moins de 25 minutes ?", a: "Une allure régulière de 5:00 min/km (12,0 km/h) permet de franchir la ligne des 5 km en 25 minutes pile." },
        { q: "Comment convertir une allure en min/km vers une vitesse en km/h ?", a: "Divisez 60 par l'allure en minutes décimales : Vitesse (km/h) = 60 / Allure. Par exemple, 5:00 min/km donne 60 / 5 = 12 km/h." },
        { q: "Le calculateur permet-il de planifier ses temps de passage ?", a: "Oui. Il projette les temps intermédiaires sur semi-marathon, 10 km, 5 km et marathon complet." }
      ]
    },
    pt: {
      name: "Calculadora de Pace de Corrida",
      seoTitle: "Calculadora de Pace de Corrida (min/km) | HelloTools",
      seoDescription: "Calcule seu ritmo por quilômetro (pace), tempo total e velocidade média.",
      description: "Descubra seu ritmo de corrida por quilômetro.",
      quickAnswer: "Calcula o tempo médio gasto para correr um quilômetro (pace).",
      seoHowToUse: "1. Digite a distância corrida em km.\n2. Informe o tempo total (horas, minutos, segundos).\n3. Veja seu pace (min/km).",
      seoHowItWorks: "Divide o tempo total pela distância percorrida.",
      formula: "Pace = Tempo Total / Distância",
      seoExample: "Correr 10 km em 50 minutos dá um pace de 5:00 min/km (12 km/h).",
      faqs: [
        { q: "Como se calcula o ritmo de corrida (pace) por quilômetro?", a: "O pace é o tempo necessário para percorrer 1 km: Pace = Tempo Total / Quilômetros. Completar 10 km em 50 minutos resulta em um pace de 5:00 min/km." },
        { q: "Qual pace é necessário para correr uma maratona abaixo de 4 horas?", a: "Para completar a maratona (42,195 km) abaixo de 4 horas, o atleta deve manter um pace médio constante de 5:41 min/km (ou 9:09 min/milha)." },
        { q: "Qual o pace para fazer 5 km em menos de 25 minutos?", a: "É necessário cravar um pace uniforme de 5:00 min/km (velocidade de 12 km/h) ao longo dos 5.000 metros." },
        { q: "Como converter o pace de min/km para velocidade média em km/h?", a: "Basta dividir 60 pelo pace em minutos decimais: Velocidade = 60 / Pace. Um pace de 6:00 min/km corresponde a 60 / 6 = 10 km/h." },
        { q: "O simulador permite calcular distâncias de meia-maratona?", a: "Sim. Inclui atalhos para distâncias oficiais como 5 km, 10 km, Meia Maratona (21,097 km) e Maratona (42,195 km)." }
      ]
    },
    ja: {
      name: "ランニングペース計算ツール",
      seoTitle: "ランニングペース計算ツール — 1kmあたりペース | HelloTools",
      seoDescription: "走行距離と所要時間から、1kmあたりのペース（分/km）や平均時速（km/h）、マラソン予測タイムを計算します。",
      description: "走行距離とタイムから1kmあたりのペースや平均速度を計算します。",
      quickAnswer: "走行距離と所要時間から1kmを走るのにかかる平均時間（ペース）を算出します。",
      seoHowToUse: "1. 走行距離（km）またはマラソン種目（フル・ハーフ等）を選択します。\n2. 所要時間を入力します。\n3. 1kmあたりのペース（分/km）と時速（km/h）を確認します。",
      seoHowItWorks: "総所要時間を走行距離で除算して 1km あたりの秒数を求め表示します。",
      formula: "ペース = 総時間 / 距離(km)",
      seoExample: "10kmを50分で走った場合、ペースは 5分00秒/km（時速12km/h）です。",
      faqs: [
        { q: "ランニングのペース（1kmあたりの走破タイム）はどう計算しますか？", a: "「走行時間 ÷ 走行距離」で算出します。例えば10kmを50分00秒で走った場合、50分 ÷ 10km ＝ 5分00秒/km（時速12.0km）となります。" },
        { q: "フルマラソンでサブ4（4時間切り）を達成するためのペースは？", a: "42.195kmを3時間59分59秒以内で走るためには、平均ペース「5分41秒/km（時速10.55km）」の巡航速度を維持する必要があります。" },
        { q: "5kmを25分以内で走るための目標ペースは？", a: "キロあたりちょうど「5分00秒/km（時速12.0km）」のイーブンペースを保つことで、25分00秒でゴールできます。" },
        { q: "ペース（分/km）から時速（km/h）への換算方法は？", a: "「60 ÷ ペース（分）」で計算できます。例えば1kmを6分00秒で走るペースなら、60 ÷ 6 ＝ 時速10kmとなります。" },
        { q: "ハーフマラソンや駅伝の区間予想タイム計算にも使えますか？", a: "はい。5km、10km、ハーフマラソン（21.0975km）、フルマラソンや任意の距離のラップタイム・目標タイムを瞬時に逆算できます。" }
      ]
    }
  },

  'retirement-calculator': {
    es: {
      name: "Calculadora de Jubilación",
      seoTitle: "Calculadora de Jubilación y Ahorro para el Retiro | HelloTools",
      seoDescription: "Calcula cuánto dinero necesitas acumular para jubilarte y tu pensión estimada.",
      description: "Estima el capital necesario para mantener tu nivel de vida tras la jubilación.",
      quickAnswer: "Calcula el fondo acumulado al jubilarte y la renta mensual estimada.",
      seoHowToUse: "1. Introduce tu edad actual y edad deseada de jubilación.\n2. Indica tus ahorros actuales y aportación mensual.\n3. Añade la rentabilidad esperada.",
      seoHowItWorks: "Calcula el interés compuesto acumulado hasta la edad de retiro.",
      formula: "Capital Final = Ahorro Inicial*(1+r)^n + Aporte Mensual*[((1+r)^n-1)/r]",
      seoExample: "Ahorrando $300/mes desde los 30 hasta los 65 años al 7% anual acumulas aprox. $540.000.",
      faqs: [
        { q: "¿Qué tasa de retirada asume esta calculadora de jubilación?", a: "Proyecta el patrimonio acumulado según tus aportaciones y rendimiento. Como regla general de referencia, se suele considerar la Regla del 4% para estimar una renta de retiro anual sostenible." },
        { q: "¿Cómo se tiene en cuenta la inflación en la planificación del retiro?", a: "Se aconseja utilizar una tasa de rentabilidad neta de inflación (rentabilidad real, aprox. 4%-6%) para que las cifras resultantes reflejen el poder adquisitivo actual." },
        { q: "¿Incluye la pensión pública de la seguridad social en el cálculo?", a: "Se centra en el fondo de ahorro privado e inversiones personales. Puedes sumar la pensión pública esperada a los rendimientos del capital para conocer tu ingreso total." },
        { q: "¿Qué fiabilidad tienen las proyecciones de jubilación a largo plazo?", a: "Ofrecen una guía matemática orientativa bajo supuestos constantes. Los mercados reales presentan volatilidad, por lo que conviene revisar el plan anualmente." },
        { q: "¿Cómo impacta jubilarse 5 años antes o después de la edad prevista?", a: "Jubilarse antes reduce los años de acumulación y amplía los años de consumo del fondo, exigiendo un ahorro sustancialmente superior." }
      ]
    },
    de: {
      name: "Rentenrechner",
      seoTitle: "Rentenrechner — Altersvorsorge & Sparrate Berechnen | HelloTools",
      seoDescription: "Berechnen Sie Ihr benötigtes Altersvorsorgekapital und die monatliche Rente.",
      description: "Ermitteln Sie Ihren Kapitalbedarf für den Ruhestand.",
      quickAnswer: "Schätzt das angesparte Vermögen zum Renteneintritt und die monatliche Auszahlung.",
      seoHowToUse: "1. Aktuelles Alter und Rentenalter eingeben.\n2. Ersparnisse und Sparrate angeben.\n3. Rendite eintragen.",
      seoHowItWorks: "Verwendet Zinseszinsrechnung für die Ansparphase.",
      formula: "Endkapital = Ansparformel mit Zinseszins",
      seoExample: "300 € monatlich von 30 bis 65 Jahre bei 7 % bringen ca. 540.000 € Alterskapital.",
      faqs: [
        { q: "Welche Entnahmerate wird für den Ruhestand zugrunde gelegt?", a: "Der Rechner ermittelt das angesparte Endvermögen. Als Richtwert für die nachhaltige jährliche Entnahme gilt in der Finanzplanung häufig die 4-%-Regel." },
        { q: "Wie sollte die Inflation bei der Altersvorsorge berücksichtigt werden?", a: "Es empfiehlt sich, mit einer inflationsbereinigten realen Jahresrendite (z. B. 4 % bis 5 %) zu rechnen, damit der Zielbetrag die heutige Kaufkraft abbildet." },
        { q: "Fließt die gesetzliche Rentenversicherung in die Berechnung ein?", a: "Nein, das Tool berechnet die private Vermögensbildung. Die gesetzliche Rente aus dem Rentenbescheid kann als zusätzlicher Baustein addiert werden." },
        { q: "Wie verlässlich sind Ruhestandsprojektionen über 20 bis 30 Jahre?", a: "Sie liefern eine mathematisch exakte Zielgröße unter den gewählten Annahmen, sollten aber regelmäßig an veränderte Marktbedingungen angepasst werden." },
        { q: "Welche Auswirkungen hat ein vorzeitiger Renteneintritt?", a: "Ein früherer Rentenbeginn verkürzt die Einzahlungs- und Zinseszinsphase und verlängert die Entnahmephase, was deutlich höhere monatliche Sparraten erfordert." }
      ]
    },
    fr: {
      name: "Calculateur de Retraite",
      seoTitle: "Calculateur de Retraite et Épargne | HelloTools",
      seoDescription: "Estimez le capital nécessaire pour votre retraite et vos versements mensuels.",
      description: "Calculez votre montant d'épargne nécessaire pour la retraite.",
      quickAnswer: "Estime le capital accumulé à la retraite et la rente mensuelle issue de vos placements.",
      seoHowToUse: "1. Saisissez votre âge actuel et l'âge de départ souhaité.\n2. Indiquez votre épargne mensuelle.\n3. Obtenez l'estimation du capital.",
      seoHowItWorks: "Applique le calcul de capitalisation d'intérêts composés.",
      formula: "Capital Retraite = Formule d'intérêts composés",
      seoExample: "300 €/mois de 30 à 65 ans à 7 % représentent environ 540 000 € à la retraite.",
      faqs: [
        { q: "Quel taux de retrait durable ce calculateur prend-il en compte ?", a: "Il projette le capital total constitué à l'âge de départ. Pour estimer la rente annuelle envisageable, la règle des 4 % est communément retenue comme repère empirique." },
        { q: "Comment neutraliser l'effet de l'inflation sur le capital retraite ?", a: "Il est conseillé d'utiliser un taux de rendement net d'inflation (environ 4 % à 5 %) pour que le capital cible corresponde à des euros constants actuels." },
        { q: "La pension de retraite de base de la Sécurité sociale est-elle incluse ?", a: "Le calculateur modélise l'effort d'épargne individuelle (PER, assurance-vie). La pension publique de retraite doit être ajoutée comme revenu complémentaire." },
        { q: "Quelle est la valeur prédictive d'un simulateur de retraite ?", a: "Il constitue un cadre de référence financier rigoureux basé sur les lois de l'intérêt composé, à réajuster périodiquement selon l'évolution de vos revenus." },
        { q: "Quel est l'impact de partir à la retraite plus tôt que prévu ?", a: "Avancer son départ de quelques années ampute la phase de capitalisation tout en augmentant la durée des décaissements, ce qui exige un capital de départ plus important." }
      ]
    },
    pt: {
      name: "Calculadora de Aposentadoria",
      seoTitle: "Calculadora de Aposentadoria e Independência Financeira | HelloTools",
      seoDescription: "Calcule o valor necessário para se aposentar com tranquilidade financeira.",
      description: "Descubra quanto precisa acumular para a sua aposentadoria.",
      quickAnswer: "Calcula o montante total acumulado para a aposentadoria e a renda mensal estimada.",
      seoHowToUse: "1. Digite sua idade atual e a idade em que deseja se aposentar.\n2. Informe seus aportes mensais.\n3. Veja a renda estimada.",
      seoHowItWorks: "Aplica a fórmula de rendimento composto acumulado no tempo.",
      formula: "Montante Final = Aporte Mensual acumulado com juros compostos",
      seoExample: "Poupar R$ 500/mês dos 30 aos 65 anos a 8% a.a. gera um patrimônio de aprox. R$ 1,1 milhão.",
      faqs: [
        { q: "Qual taxa segura de retirada (SWR) deve ser aplicada na aposentadoria?", a: "O simulador projeta o patrimônio acumulado total. Como referência consagrada de independência financeira, a Regra dos 4% ao ano é utilizada como taxa de retirada sustentável." },
        { q: "Como a inflação afeta a reserva para a aposentadoria?", a: "Recomenda-se adotar uma taxa de rentabilidade real (descontada a inflação, cerca de 4% a 6% a.a.) para que o montante final reflita o poder de compra atual." },
        { q: "O cálculo inclui o benefício da Previdência Social (INSS)?", a: "Calcula exclusivamente a formação de patrimônio privado. A aposentadoria do INSS pode ser somada aos rendimentos para compor sua renda mensal total." },
        { q: "As estimativas financeiras para a aposentadoria são garantidas?", a: "São modelos matemáticos determinísticos baseados em disciplina de aportes constantes e rentabilidade uniforme ao longo do tempo." },
        { q: "O que acontece ao antecipar ou adiar a aposentadoria em alguns anos?", a: "Aposentar-se mais cedo reduz o tempo de juros sobre juros e estende o período de usufruto, exigindo aportes consideravelmente maiores." }
      ]
    },
    ja: {
      name: "老後資金・退職金計算ツール",
      seoTitle: "老後資金計算ツール — 資産運用・必要貯蓄額 | HelloTools",
      seoDescription: "現在の年齢、引退希望年齢、毎月の積立額、想定利回りから、老後に備えて手元に残る総資産額を計算します。",
      description: "老後の生活に必要な累積資金と毎月の取り崩し可能額をシミュレーションします。",
      quickAnswer: "退職時までの積立投資による累積総資産と取り崩し可能額を算定します。",
      seoHowToUse: "1. 現在の年齢と定年退職年齢を入力します。\n2. 現在の貯蓄額と毎月の積立額を入力します。\n3. 想定年利（%）を指定します。",
      seoHowItWorks: "積立複利計算公式を用いて退職時点の総資産額を推計します。",
      formula: "退職時資産 = 初期資金*(1+r)^n + 毎月積立積算",
      seoExample: "30歳から65歳まで毎月3万円（年利5%）積立運用すると、約2,500万円の老後資金が形成されます。",
      faqs: [
        { q: "老後資金の取り崩し率はどの程度を想定すべきですか？", a: "資産形成期の到達金額を算定します。老後生活費の持続可能な年間取り崩し率としては、米国のトリニティ・スタディに基づく「4%ルール」が世界的な目安とされています。" },
        { q: "インフレ（物価上昇）の影響はどのように考慮すればよいですか？", a: "想定利回りから予想インフレ率を差し引いた「実質利回り（年2〜4%前後）」を入力することで、将来の受取資産を現在の購買力に換算して計画できます。" },
        { q: "公的年金（国民年金・厚生年金）の受給見込額は含まれていますか？", a: "個人で行うiDeCoやNISA、個人年金保険などの資産形成を計算対象としています。公的年金の受給額は「ねんきん定期便」で別途合算して収支計画を立ててください。" },
        { q: "何十年も先の老後資金シミュレーションの信頼性はどの程度ですか？", a: "設定した前提条件に基づく数理計算として正確です。実際の経済環境や個人のライフイベントに応じて、年に1回程度の見直しと軌道修正を行うことが推奨されます。" },
        { q: "リタイア時期を5年早めると資産計画はどう変わりますか？", a: "積立期間が5年短縮されると同時に取り崩し期間が5年延びるため、退職時に必要な準備資金規模が大幅に増加します。" }
      ]
    }
  },

  'text-reverser': {
    es: {
      name: "Inversor de Texto",
      seoTitle: "Inversor de Texto — Invertir Palabras y Letras Online | HelloTools",
      seoDescription: "Invierte texto completo, palabras o letras al revés al instante.",
      description: "Invierte el orden de los caracteres o palabras de cualquier texto.",
      quickAnswer: "Gira un texto en sentido inverso caracter por caracter o palabra por palabra.",
      seoHowToUse: "1. Introduce o pega el texto.\n2. Selecciona invertir caracteres o palabras.\n3. Copia el resultado invertido.",
      seoHowItWorks: "Divide la cadena en un array, la invierte con .reverse() y la une.",
      formula: "Inverso = texto.split(\"\").reverse().join(\"\")",
      seoExample: "Invertir \"Hello World\" da como resultado \"dlroW olleH\".",
      faqs: [
        { q: "¿Qué modos de inversión de texto ofrece esta herramienta?", a: "Permite invertir caracteres completos (espejo total), invertir únicamente el orden de las palabras conservando las letras intactas e invertir el orden de las líneas de arriba hacia abajo." },
        { q: "¿Para qué se utiliza la inversión de texto o palabras?", a: "Se utiliza en criptografía básica, análisis de palíndromos, codificación de contraseñas, entretenimiento y depuración de secuencias de ADN en bioinformática." },
        { q: "¿Conserva las tildes y caracteres especiales al invertir?", a: "Sí. Utiliza algoritmos compatibles con grafemas Unicode para no separar letras acentuadas ni distorsionar símbolos combinados." },
        { q: "¿Cómo funciona la inversión de orden de palabras?", a: "Mantiene cada palabra escrita en su orden natural pero lee la frase de derecha a izquierda (ej. \"Hola Mundo\" se convierte en \"Mundo Hola\")." },
        { q: "¿Se transmiten mis frases o códigos a algún servidor?", a: "No. La inversión se ejecuta al instante mediante JavaScript en la memoria local de tu navegador." }
      ]
    },
    de: {
      name: "Text Rückwärts Drehen",
      seoTitle: "Text Rückwärts Drehen — Wörter & Buchstaben Umkehren | HelloTools",
      seoDescription: "Kehren Sie Text, Wörter oder Buchstaben sofort spiegelverkehrt um.",
      description: "Textzeichen oder Wörter rückwärts anordnen.",
      quickAnswer: "Dreht den eingegebenen Text Buchstabe für Buchstabe um.",
      seoHowToUse: "1. Text eingeben.\n2. Umkehrmodus wählen.\n3. Rückwärtstext kopieren.",
      seoHowItWorks: "Verwendet split(\"\").reverse().join(\"\").",
      formula: "Rückwärts = text.split(\"\").reverse().join(\"\")",
      seoExample: "Aus \"Hallo Welt\" wird \"tleW ollaH\".",
      faqs: [
        { q: "Welche Textumkehr-Modi stehen zur Verfügung?", a: "Das Tool invertiert die gesamte Zeichenfolge (Buchstabe für Buchstabe), kehrt die Wortreihenfolge um oder dreht die Reihenfolge ganzer Zeilen um." },
        { q: "Wofür wird das Umkehren von Texten genutzt?", a: "Häufige Anwendungsbereiche sind Palindrom-Prüfungen, Rätsel, einfache Chiffrierungen sowie genetische Sequenzanalysen in der Bioinformatik." },
        { q: "Bleiben Emojis und Umlaute beim Umkehren intakt?", a: "Ja, moderne Unicode-Segmentierer sorgen dafür, dass kombinierte Schriftzeichen und Emojis nicht fehlerhaft getrennt werden." },
        { q: "Wie funktioniert das Umkehren der Wortreihenfolge?", a: "Es lässt die einzelnen Wörter unverändert, stellt jedoch das letzte Wort an die erste Stelle (z. B. \"Hallo Welt\" wird zu \"Welt Hallo\")." },
        { q: "Ist die Nutzung des Textumkehrers sicher und anonym?", a: "Ja, die Textverarbeitung findet ohne jeglichen Netzwerktransfer lokal in Ihrem Browser statt." }
      ]
    },
    fr: {
      name: "Inverseur de Texte",
      seoTitle: "Inverseur de Texte en Ligne | HelloTools",
      seoDescription: "Inversez le sens de votre texte, mots ou lettres immédiatement.",
      description: "Inversez l'ordre des lettres ou des mots d'un texte.",
      quickAnswer: "Récrit un texte à l'envers lettre par lettre.",
      seoHowToUse: "1. Collez votre texte.\n2. Choisissez le mode d'inversion.\n3. Copiez le résultat.",
      seoHowItWorks: "Repose sur split(\"\").reverse().join(\"\").",
      formula: "Inverse = text.split(\"\").reverse().join(\"\")",
      seoExample: "Transforme \"Bonjour\" en \"ruojnoB\".",
      faqs: [
        { q: "Quels modes d'inversion de texte sont proposés ?", a: "Il permet d'inverser l'intégralité des lettres (effet miroir), d'inverser uniquement l'ordre des mots dans la phrase, ou d'inverser l'ordre des lignes de bas en haut." },
        { q: "Quels sont les usages courants de l'inversion textuelle ?", a: "Utile pour la cryptographie d'initiation, la vérification de palindromes, la résolution d'énigmes et l'analyse de séquences biologiques." },
        { q: "Gère-t-il correctement les caractères accentués et émojis ?", a: "Oui. Le traitement gère les blocs de graphèmes Unicode sans altérer les lettres avec accents ni les pictogrammes." },
        { q: "Quelle est la différence entre inverser les lettres et inverser les mots ?", a: "L'inversion de lettres épèle le mot à l'envers, tandis que l'inversion de mots préserve l'orthographe et inverse la structure de la phrase." },
        { q: "Mes saisies sont-elles enregistrées ?", a: "Non, aucune donnée n'est conservée ni envoyée vers l'extérieur." }
      ]
    },
    pt: {
      name: "Inversor de Texto",
      seoTitle: "Inversor de Texto — Inverter Letras e Palavras | HelloTools",
      seoDescription: "Inverta textos, frases ou palavras de trás para frente instantaneamente.",
      description: "Inverta a ordem dos caracteres ou palavras do seu texto.",
      quickAnswer: "Gira o texto ao contrário letra por letra.",
      seoHowToUse: "1. Cole seu texto.\n2. Escolha o modo de inversão.\n3. Copie o texto invertido.",
      seoHowItWorks: "Aplica a função split(\"\").reverse().join(\"\").",
      formula: "Texto Invertido = texto.split(\"\").reverse().join(\"\")",
      seoExample: "Converte \"Hello\" em \"olleH\".",
      faqs: [
        { q: "Quais opções de inversão textual a ferramenta executa?", a: "Inverte todos os caracteres (letra por letra), inverte apenas a sequência das palavras da frase ou inverte a ordem das linhas de baixo para cima." },
        { q: "Para quais finalidades costuma-se inverter textos?", a: "Aplica-se em validação de palíndromos, quebra-cabeças, criptografia lúdica e conferência de sequências de dados." },
        { q: "Palavras com acentuação mantêm a integridade gráfica ao inverter?", a: "Sim. A manipulação de strings é compatível com caracteres compostos Unicode, preservando acentos e cedilhas." },
        { q: "Como opera a inversão de palavras?", a: "Mantém a grafia de cada palavra inalterada, invertendo apenas o posicionamento na oração (ex.: \"Bom Dia\" vira \"Dia Bom\")." },
        { q: "O conteúdo processado é mantido em sigilo?", a: "Sim. O processamento ocorre exclusivamente no dispositivo do usuário de forma 100% confidencial." }
      ]
    },
    ja: {
      name: "テキスト逆転（逆さ文字）ツール",
      seoTitle: "テキスト反転・逆さ文字変換ツール | HelloTools",
      seoDescription: "入力された文章の文字順（あいうえお→おえういあ）や単語順を反対向きに逆転変換します。",
      description: "文字列を末尾から逆順（反転）に並び替えます。",
      quickAnswer: "文字列を1文字ずつ末尾から逆順に変換して逆さ文字を作成します。",
      seoHowToUse: "1. テキストを入力します。\n2. 「文字単位で逆転」または「行単位で逆転」を押します。\n3. 反転したテキストをコピーします。",
      seoHowItWorks: "JavaScriptの split(\"\").reverse().join(\"\") アルゴリズムで処理します。",
      formula: "反転テキスト = Array.from(text).reverse().join(\"\")",
      seoExample: "「こんにちは」を「はちにんこ」に変換します。",
      faqs: [
        { q: "このテキスト反転ツールでできる反転の種類は何ですか？", a: "「文字単位での完全逆順（文字の鏡像反転）」「単語単位での並び順反転」「行単位での上下逆順（上から下へ反転）」の3種類のモードを搭載しています。" },
        { q: "どのような用途でテキスト反転が活用されますか？", a: "回文の検証、暗号作成、SNSでのユニークな投稿作成、遺伝子配列（DNA/RNA）の逆相補鎖の確認などに活用されます。" },
        { q: "日本語の漢字やひらがな、絵文字も正しく反転できますか？", a: "はい。サロゲートペアや結合文字を含むUnicode文字を壊すことなく、1文字1文字を正確に逆順へと並べ替えます。" },
        { q: "「単語ごとの反転」と「文字ごとの反転」の違いは？", a: "文字ごとの反転は「あいうえお」が「おえういあ」になります。単語ごとの反転は英単語などの綴りを維持したまま文章の順序を逆転させます。" },
        { q: "反転した文章がサーバーに記録されることはありますか？", a: "いいえ。すべての反転処理はお使いのブラウザ上で即座に実行され、外部サーバーに通信・保存されることはありません。" }
      ]
    }
  },

  'word-frequency-counter': {
    es: {
      name: "Contador de Frecuencia de Palabras",
      seoTitle: "Contador de Frecuencia de Palabras y Densidad de Palabras | HelloTools",
      seoDescription: "Analiza tu texto para contar la frecuencia y densidad de aparición de cada palabra.",
      description: "Analiza la densidad y repetición de palabras en tu texto.",
      quickAnswer: "Cuenta la cantidad de veces que aparece cada palabra individual en un texto.",
      seoHowToUse: "1. Pega tu texto.\n2. Haz clic en Analizar Frecuencia.\n3. Revisa la tabla de palabras más usadas.",
      seoHowItWorks: "Tokeniza el texto, elimina puntuación y contabiliza las repeticiones en un mapa.",
      formula: "Frecuencia % = (Apariciones / Total Palabras) * 100",
      seoExample: "En un texto de 100 palabras, si \"SEO\" aparece 5 veces, su densidad es del 5%.",
      faqs: [
        { q: "¿Qué información analiza este contador de frecuencia de palabras?", a: "Calcula la densidad léxica del texto, desglosando cuántas veces aparece cada palabra, su porcentaje de frecuencia relativa y la lista ordenada de términos más utilizados." },
        { q: "¿Cómo ayuda al SEO y a evitar la sobreoptimización (keyword stuffing)?", a: "Permite verificar que la densidad de tu palabra clave principal se mantenga en un rango natural y saludable (habitualmente entre el 1% y el 2,5%), evitando penalizaciones en buscadores." },
        { q: "¿Permite excluir palabras comunes o de enlace (stop words)?", a: "Sí. Puedes activar el filtro de stop words para omitir artículos, preposiciones y conjunciones (\"de\", \"la\", \"en\", \"el\") y concentrarte en los términos con valor temático." },
        { q: "¿Distingue entre mayúsculas y minúsculas al tabular palabras?", a: "Por defecto unifica las palabras a minúsculas para que \"SEO\" y \"seo\" computen como el mismo término léxico." },
        { q: "¿Sirve para analizar textos largos o libros completos?", a: "Sí. Puede procesar miles de palabras y miles de párrafos de una sola vez con tabulación instantánea." }
      ]
    },
    de: {
      name: "Wortfrequenz-Analysator",
      seoTitle: "Wortfrequenz-Analysator & Keyword-Dichte | HelloTools",
      seoDescription: "Analysieren Sie Texte auf Worthäufigkeit und Keyword-Dichte.",
      description: "Zählt die Häufigkeit aller vorkommenden Wörter in einem Text.",
      quickAnswer: "Ermittelt wie oft jedes Wort in einem Text vorkommt.",
      seoHowToUse: "1. Text einfügen.\n2. Analyse starten.\n3. Wortliste nach Häufigkeit ablesen.",
      seoHowItWorks: "Zählt Wort-Vorkommen in einer Häufigkeitstabelle.",
      formula: "Dichte % = (Wortanzahl / Gesamtanzahl) * 100",
      seoExample: "In einem 100-Wörter-Text bedeutet 5-mal \"Rechner\" eine Dichte von 5 %.",
      faqs: [
        { q: "Welche Analyse liefert der Texthäufigkeits-Zähler?", a: "Er ermittelt die Worthäufigkeit und Keyword-Dichte Ihres Textes, sortiert Begriffe nach Häufigkeit und berechnet deren relativen Prozentanteil." },
        { q: "Wie unterstützt das Tool bei der SEO-Optimierung?", a: "Es schützt vor Keyword-Stuffing, indem es anzeigt, ob zentrale Suchbegriffe in einer natürlichen Dichte (üblicherweise 1 % bis 2,5 %) vorkommen." },
        { q: "Können Füllwörter (Stoppwörter) herausgefiltert werden?", a: "Ja, durch den Stoppwort-Filter werden Artikel und Bindewörter (\"der\", \"die\", \"und\") ausgeblendet, um die relevanten Inhaltswörter hervorzuheben." },
        { q: "Werden Wörter unabhängig von Groß- und Kleinschreibung gezählt?", a: "Standardmäßig werden Begriffe normalisiert gezählt, sodass Groß- und Kleinschreibung nicht zu getrennten Zählungen führt." },
        { q: "Ist das Tool für umfangreiche Dokumente geeignet?", a: "Ja, der Algorithmus verarbeitet auch ganze E-Books oder Aufsätze in Sekundenschnelle direkt im Browser." }
      ]
    },
    fr: {
      name: "Compteur de Fréquence des Mots",
      seoTitle: "Compteur de Fréquence des Mots et Densité SEO | HelloTools",
      seoDescription: "Analysez la fréquence d'apparition et la densité de vos mots-clés.",
      description: "Mesurez la répétition et la densité des mots dans un texte.",
      quickAnswer: "Dénombre la fréquence d'occurrence de chaque mot dans un texte.",
      seoHowToUse: "1. Collez votre texte.\n2. Lancez l'analyse.\n3. Consultez le classement des mots les plus fréquents.",
      seoHowItWorks: "Découpe le texte et comptabilise chaque mot.",
      formula: "Densité = (Occurrences / Total Mots) * 100",
      seoExample: "Un mot présent 5 fois dans un texte de 100 mots a une densité de 5 %.",
      faqs: [
        { q: "Quels résultats fournit cet analyseur de fréquence lexicale ?", a: "Il dresse le palmarès des mots les plus fréquents de votre texte avec le nombre d'occurrences exact et la densité en pourcentage." },
        { q: "En quoi est-il utile pour le référencement naturel (SEO) ?", a: "Il permet de contrôler la densité des mots-clés stratégiques pour maintenir un taux optimal (entre 1 % et 2 %) et prévenir le sur-optimisation." },
        { q: "Peut-on masquer les mots vides (stop words) ?", a: "Oui. Le filtre de mots vides écarte automatiquement les articles et pronoms (\"le\", \"la\", \"de\", \"et\") pour faire émerger les termes porteurs de sens." },
        { q: "Comment sont traitées les majuscules et la ponctuation ?", a: "Le texte est nettoyé de sa ponctuation et normalisé en minuscules pour regrouper toutes les variantes d'un même mot." },
        { q: "Mes documents sont-ils protégés pendant l'analyse ?", a: "Oui, l'analyseur s'exécute entièrement dans la mémoire locale de votre navigateur sans enregistrement externe." }
      ]
    },
    pt: {
      name: "Contador de Frequência de Palavras",
      seoTitle: "Contador de Frequência de Palavras e Densidade SEO | HelloTools",
      seoDescription: "Analise seu texto e descubra a frequência e densidade das palavras mais usadas.",
      description: "Analise quais palavras mais se repetem no seu texto.",
      quickAnswer: "Conta o número de repetições e a porcentagem de cada palavra no texto.",
      seoHowToUse: "1. Cole seu texto.\n2. Clique em Analisar.\n3. Veja o ranking das palavras mais frequentes.",
      seoHowItWorks: "Divide o texto e conta o número de ocorrências de cada termo.",
      formula: "Densidade % = (Contagem / Total) * 100",
      seoExample: "Se uma palavra aparece 5 vezes em 100 palavras, sua densidade é de 5%.",
      faqs: [
        { q: "Quais dados este analisador de frequência de palavras apresenta?", a: "Gera a contagem e porcentagem de ocorrência de cada vocábulo do texto, ordenando as palavras por ordem de recorrência decrescente." },
        { q: "Como a ferramenta auxilia na redação de artigos para SEO?", a: "Permite monitorar a densidade de palavras-chave principais, assegurando que o termo estratégico permaneça entre 1% e 2,5% do conteúdo total." },
        { q: "A ferramenta permite filtrar artigos e preposições (stop words)?", a: "Sim. Você pode desconsiderar conectivos comuns (\"de\", \"para\", \"com\", \"o\", \"a\") e visualizar somente os termos temáticos de relevância." },
        { q: "Palavras em maiúsculas são contabilizadas junto com minúsculas?", a: "Sim. O sistema padroniza as palavras em caixa baixa para somar todas as aparições do mesmo termo." },
        { q: "É possível analisar redações ou relatórios longos?", a: "Sim, o mecanismo processa relatórios de milhares de palavras de forma veloz e totalmente confidencial." }
      ]
    },
    ja: {
      name: "単語出現頻度・キーワード出現率解析ツール",
      seoTitle: "単語出現頻度・キーワード比率（SEO密度）解析 | HelloTools",
      seoDescription: "テキスト内に含まれる各単語の出現回数および全体に対する出現率（%）を形態素解析的にカウント・ランキング表示します。",
      description: "文章中の単語の出現回数と出現比率（キーワード密度）を解析します。",
      quickAnswer: "テキスト内の各単語の出現頻度と出現割合（キーワード密度%）を分析表示します。",
      seoHowToUse: "1. 解析したいテキストを貼り付けます。\n2. 「解析実行」をクリックします。\n3. 単語ごとの出現回数と比率（%）ランキングを確認します。",
      seoHowItWorks: "テキストを単語（トークン）単位に分割しハッシュマップでカウントします。",
      formula: "出現率(%) = (単語出現数 / 総単語数) * 100",
      seoExample: "1,000文字中に「電卓」が10回出現する場合、比率は1%です。",
      faqs: [
        { q: "単語出現頻度カウンターはどのような分析結果を出力しますか？", a: "文章中に登場する各単語の出現回数、総単語数に対する出現比率（%）、および高頻度キーワードのランキング一覧を作成します。" },
        { q: "SEO対策（キーワード出現比率の最適化）にどう役立ちますか？", a: "狙っている主要キーワードの出現比率が適切な範囲（一般的に1〜3%程度）に収まっているかを確認し、過剰な詰め込み（ペナルティ）を防止できます。" },
        { q: "助詞や接続詞などの不要な語（ストップワード）を除外できますか？", a: "はい。「てにをは」などの一般的な助詞やストップワードを除外して、真にテーマ性のある名詞・重要語句のみに絞り込んで分析できます。" },
        { q: "大文字・小文字や全角・半角の統一処理は行われますか？", a: "同一の単語として正確にカウントするため、アルファベットの大文字・小文字を正規化して同一集計します。" },
        { q: "長文のコラム記事や論文のテキスト分析にも使えますか？", a: "はい。数万字規模の長文テキストであっても、ブラウザの高速な文字列処理エンジンにより瞬時に出現傾向をレポートします。" }
      ]
    }
  },

  'palindrome-checker': {
    es: {
      name: "Comprobador de Palíndromos",
      seoTitle: "Comprobador de Palíndromos Online | HelloTools",
      seoDescription: "Comprueba si una palabra, frase o número se lee igual de izquierda a derecha que al revés.",
      description: "Verifica si una palabra o frase es un palíndromo.",
      quickAnswer: "Determina si un texto se lee exactamente igual al derecho y al revés.",
      seoHowToUse: "1. Introduce la palabra o frase.\n2. La herramienta ignora espacios y acentos.\n3. Lee el resultado (Es Palíndromo / No es Palíndromo).",
      seoHowItWorks: "Limpia signos de puntuación y compara la cadena con su versión invertida.",
      formula: "Limpio === Limpio.reverse()",
      seoExample: "\"Anita lava la tina\" o \"Reconocer\" son palíndromos perfectos.",
      faqs: [
        { q: "¿Qué es exactamente un palíndromo?", a: "Un palíndromo es una palabra, frase, número u otra secuencia que se lee igual de izquierda a derecha que de derecha a izquierda, ignorando espacios, puntuación y tildes (ej. \"Reconocer\", \"Anita lava la tina\")." },
        { q: "¿Cómo evalúa esta herramienta si una frase es palíndroma?", a: "Limpia el texto convirtiéndolo a minúsculas, eliminando espacios, signos de puntuación y normalizando letras con tilde antes de comparar la secuencia invertida con la original." },
        { q: "¿Distingue entre palíndromos de palabras y palíndromos numéricos (capicúas)?", a: "Admite ambos. Verifica tanto frases literarias como combinaciones numéricas capicúas (ej. 12321 o fechas como 22/02/2022)." },
        { q: "¿Qué ocurre con letras especiales como la \"ñ\" o dígrafos como \"ll\"?", a: "La herramienta trata cada letra por separado siguiendo el estándar alfabético moderno para verificar la correspondencia simétrica de caracteres." },
        { q: "¿Se almacenan las frases que pongo a prueba?", a: "No. Toda la comprobación se ejecuta al instante de forma local en tu navegador sin guardar registro alguno." }
      ]
    },
    de: {
      name: "Palindrom-Prüfer",
      seoTitle: "Palindrom Prüfer — Ist Das Wort Ein Palindrom? | HelloTools",
      seoDescription: "Prüfen Sie ob ein Wort oder Satz vorwärts und rückwärts gleich gelesen wird.",
      description: "Wörter und Sätze auf Palindrom-Eigenschaft prüfen.",
      quickAnswer: "Prüft ob ein Text vorwärts und rückwärts identisch ist.",
      seoHowToUse: "1. Wort oder Satz eingeben.\n2. Prüfergebnis sofort ablesen.",
      seoHowItWorks: "Bereinigt Satzzeichen und vergleicht mit der Umkehrung.",
      formula: "Text === Text.reverse()",
      seoExample: "\"Rentner\" und \"Otto\" sind klassische Palindrome.",
      faqs: [
        { q: "Was versteht man unter einem Palindrom?", a: "Ein Palindrom ist ein Wort, Satz oder eine Zahlenfolge, die vorwärts und rückwärts gelesen genau dasselbe ergibt (z. B. \"Lagerregal\", \"Reliefpfeiler\", \"12321\"), ohne Beachtung von Leerzeichen und Satzzeichen." },
        { q: "Wie prüft der Rechner Sätze auf Palindrom-Eigenschaften?", a: "Er entfernt alle Leerzeichen und Satzzeichen, wandelt alle Buchstaben in Kleinbuchstaben um und vergleicht den Text mit seiner exakten Umkehrung." },
        { q: "Funktioniert die Prüfung auch für Zahlen und Datumsangaben (Palindrom-Tage)?", a: "Ja, das Tool prüft Zahlensequenzen und historische Palindrom-Daten (wie 22.02.2022) gleichermaßen fehlerfrei." },
        { q: "Werden Umlaute bei der Symmetrieprüfung berücksichtigt?", a: "Ja, Umlaute werden präzise als eigenständige Buchstaben oder nach Wunsch normalisiert in den Zeichenvergleich einbezogen." },
        { q: "Erfolgt die Überprüfung sicher im Browser?", a: "Ja, der Abgleich läuft zu 100 % lokal in Ihrem Browser ohne Übertragung an externe Server ab." }
      ]
    },
    fr: {
      name: "Testeur de Palindrome",
      seoTitle: "Testeur de Palindrome en Ligne | HelloTools",
      seoDescription: "Vérifiez si un mot ou une phrase est un palindrome (se lit de la même façon dans les deux sens).",
      description: "Vérifiez si votre texte est un palindrome.",
      quickAnswer: "Vérifie si un texte se lit de la même façon de gauche à droite et de droite à gauche.",
      seoHowToUse: "1. Entrez votre mot ou phrase.\n2. Obtenez le verdict immédiat.",
      seoHowItWorks: "Nettoie la chaîne et compare le texte avec son inverse.",
      formula: "Texte === Texte.reverse()",
      seoExample: "\"Élu par cette crapule\" ou \"Radar\" sont des palindromes.",
      faqs: [
        { q: "Qu'est-ce qu'un palindrome en langue française ?", a: "Un palindrome est un mot ou une phrase qui se lit de manière identique de gauche à droite et de droite à gauche, sans tenir compte des espaces ni des accents (ex. \"Radar\", \"Kayak\", \"Engage le jeu que je le gagne\")." },
        { q: "Comment le vérificateur analyse-t-il la symétrie d'une phrase ?", a: "Il commence par supprimer tous les espaces, apostrophes et signes de ponctuation, normalise les accents et compare la chaîne retournée à l'originale." },
        { q: "Reconnaît-il les palindromes numériques (nombres capicua) ?", a: "Oui. Il analyse avec la même précision les suites de chiffres et dates palindromes (comme le 22/02/2022)." },
        { q: "Les lettres accentuées (é, è, ê) empêchent-elles la détection ?", a: "Non, le logiciel neutralise automatiquement les diacritiques (les transformant en lettres simples) pour respecter la tradition des palindromes poétiques." },
        { q: "Les textes soumis sont-ils mémorisés ?", a: "Non, le test est exécuté instantanément sur votre écran de manière confidentielle." }
      ]
    },
    pt: {
      name: "Verificador de Palíndromos",
      seoTitle: "Verificador de Palíndromos Online | HelloTools",
      seoDescription: "Verifique se uma palavra ou frase é um palíndromo (lida igual de trás para frente).",
      description: "Verifique se frases ou palavras são palíndromos.",
      quickAnswer: "Confere se o texto lido ao contrário permanece idêntico.",
      seoHowToUse: "1. Digite a palavra ou frase.\n2. Veja o resultado de verificação.",
      seoHowItWorks: "Remove pontuações e compara a string com seu reverso.",
      formula: "Texto === TextoInvertido",
      seoExample: "\"Socorram-me subi no ônibus em Marrocos\" é um palíndromo.",
      faqs: [
        { q: "O que caracteriza uma palavra ou frase palíndroma?", a: "Palíndromo é qualquer texto que pode ser lido da mesma forma de trás para frente quanto da frente para trás, desconsiderando espaços e pontuação (ex.: \"Ovo\", \"Arara\", \"Socorram-me, subi no ônibus em Marrocos\")." },
        { q: "Como a ferramenta avalia frases palíndromas longas?", a: "O algoritmo expurga acentuação, espaços e pontuações, convertendo tudo para letras minúsculas antes de checar a correspondência reversa." },
        { q: "A ferramenta detecta números palíndromos (capicuas)?", a: "Sim. Identifica perfeitamente sequências numéricas capicuas (como 12321 ou datas comemorativas)." },
        { q: "O caractere cedilha (ç) ou til (~) invalidam a checagem?", a: "Não. O sistema normaliza os caracteres fonéticos para garantir a verificação estrutural da simetria." },
        { q: "As frases pesquisadas ficam gravadas em algum banco de dados?", a: "Não. O teste é 100% privado e temporário no próprio navegador do usuário." }
      ]
    },
    ja: {
      name: "回文（パレンドローム）判定ツール",
      seoTitle: "回文判定ツール — 上から読んでも下から読んでも | HelloTools",
      seoDescription: "入力された単語や文章が、上から読んでも下から読んでも同じ回文（Palindrome）であるかを自動判定します。",
      description: "文章が回文（上から読んでも下から読んでも同じ）かを判定します。",
      quickAnswer: "文字列からスペースや記号を除去し、前後どちらから読んでも同じ回文かを判定します。",
      seoHowToUse: "1. 判定したい文章を入力します。\n2. 判定結果（「回文です」/「回文ではありません」）を確認します。",
      seoHowItWorks: "濁点・スペース・記号を正規化し反転文字列と比較判定します。",
      formula: "判定 = 清書テキスト === 清書テキスト.reverse()",
      seoExample: "「たけやぶやけた」（竹屋焼けた）や「しんぶんし」（新聞紙）は有名な回文です。",
      faqs: [
        { q: "回文（かいぶん・パリンドローム）の定義とは何ですか？", a: "上から読んでも下から読んでも（始めから読んでも終わりから読んでも）同じになる言葉や文章のことです（例：「しんぶんし」「たけやぶやけた」「12321」）。" },
        { q: "このツールはどのように回文判定を行いますか？", a: "入力されたテキストから空白スペース、句読点、カッコなどを自動で除去し、ひらがな・アルファベットの並びが逆順と完全一致するかを瞬時に判定します。" },
        { q: "数字の回文（回文数・日付の回文）の判定にも対応していますか？", a: "はい。「20220222」のような回文日付や、任意の数列が回文数になっているかを性格にチェックできます。" },
        { q: "ひらがな・カタカナ・漢字が混ざった文章はどう判定されますか？", a: "文字の表記そのものを比較するため、ひらがな表記（読み仮名）で入力すると正確に回文判定が可能です。" },
        { q: "入力した文章データが外部に送信されることはありますか？", a: "いいえ。すべての判定ロジックはお使いのブラウザ上で即座に実行され、外部に保存されることはありません。" }
      ]
    }
  },

  'sleep-cycle-calculator': {
    es: {
      name: "Calculadora de Ciclos de Sueño",
      seoTitle: "Calculadora de Ciclos de Sueño (Hora de Dormir y Despertar) | HelloTools",
      seoDescription: "Calcula la hora ideal para irte a dormir o despertarte respetando los ciclos de sueño de 90 minutos.",
      description: "Calcula a qué hora dormir o despertar para no levantarte cansado.",
      quickAnswer: "Determina las horas óptimas para despertar sin interrumpir un ciclo de sueño profundo.",
      seoHowToUse: "1. Elige si quieres calcular la hora de despertar o la de acostarte.\n2. Indica la hora actual o deseada.\n3. Elige entre los horarios sugeridos.",
      seoHowItWorks: "Suma o resta ciclos de 90 minutos considerando 14 minutos para conciliar el sueño.",
      formula: "Hora = Hora Inicial + (n * 90 min) + 14 min para dormir",
      seoExample: "Si te acuestas a las 23:00, las mejores horas para despertar son 6:14, 7:44 u 9:14.",
      faqs: [
        { q: "¿Cuánto dura un ciclo de sueño natural en adultos?", a: "Un ciclo completo de sueño dura aproximadamente 90 minutos (entre 80 y 110 minutos), alternando fases de sueño ligero, sueño profundo NREM y fase REM." },
        { q: "¿Por qué despertarse a mitad de un ciclo causa sensación de cansancio?", a: "Despertar durante el sueño profundo NREM provoca inercia del sueño (aturdimiento y fatiga). Despertar al final de un ciclo de 90 minutos te hace sentir más despejado y alerta." },
        { q: "¿Cuántos ciclos de sueño se recomiendan por noche?", a: "Para la mayoría de los adultos se recomiendan 5 o 6 ciclos de sueño completos por noche, lo que equivale a 7,5 o 9 horas de descanso reparador." },
        { q: "¿Cuánto tiempo tarda una persona sana en conciliar el sueño?", a: "El promedio fisiológico habitual de latencia del sueño oscila entre 14 y 20 minutos; la calculadora contempla este margen para fijar la hora de acostarse." },
        { q: "¿Cómo utilizo esta calculadora para programar mi alarma?", a: "Introduce la hora a la que necesitas levantarte o la hora a la que te vas a dormir, y la calculadora te sugerirá las horas óptimas para sincronizar tus ciclos con el despertador." }
      ]
    },
    de: {
      name: "Schlafzyklusrechner",
      seoTitle: "Schlafzyklusrechner — Optimale Schlafzeit Berechnen | HelloTools",
      seoDescription: "Berechnen Sie die beste Einschlaf- und Aufwachzeit basierend auf 90-Minuten-Zyklen.",
      description: "Ermitteln Sie Aufwachzeiten für ein ausgeruhtes Aufstehen.",
      quickAnswer: "Empfiehlt Aufwachzeiten nach vollen 90-Minuten-Schlafphasen.",
      seoHowToUse: "1. Gewünschte Aufwachzeit oder Schlafenszeit eingeben.\n2. Optimale Uhreiten ablesen.",
      seoHowItWorks: "Rechnet in 90-Minuten-Einheiten plus 14 Minuten Einschlafzeit.",
      formula: "Zeit = Startzeit + (n * 90 Min) + 14 Min Einschlafen",
      seoExample: "Wer um 23:00 Uhr schläft, wacht um 6:14 Uhr oder 7:44 Uhr erholt auf.",
      faqs: [
        { q: "Wie lange dauert ein menschlicher Schlafzyklus im Durchschnitt?", a: "Ein kompletter Schlafzyklus dauert rund 90 Minuten (80 bis 110 Minuten) und durchläuft Leichtschlaf, Tiefschlaf und REM-Schlaf." },
        { q: "Warum fühlt man sich wie gerädert, wenn man mitten im Zyklus aufwacht?", a: "Das Aufwachen aus einer Tiefschlafphase führt zu Schlafträgheit (Sleep Inertia). Ein Erwachen am Ende eines 90-Minuten-Zyklus fühlt sich natürlich und frisch an." },
        { q: "Wie viele Schlafzyklen pro Nacht sind optimal für Erwachsene?", a: "Optimal sind in der Regel 5 bis 6 vollständige Zyklen, was einer reinen Schlafzeit von 7,5 bis 9 Stunden entspricht." },
        { q: "Wie viel Einschlafzeit berücksichtigt der Schlafrechner?", a: "Ein gesunder Mensch benötigt im Schnitt 14 bis 15 Minuten zum Einschlafen. Dieser Puffer wird in den berechneten Aufsteh- und Zubettgehzeiten berücksichtigt." },
        { q: "Wie berechnet das Tool die besten Aufsteh- und Schlafenszeiten?", a: "Ausgehend von Ihrer Wunschzeit rechnet das Tool in 90-Minuten-Intervallen vorwärts oder rückwärts, um Alarmzeiten auf die Übergänge zwischen den Zyklen zu legen." }
      ]
    },
    fr: {
      name: "Calculateur de Cycles de Sommeil",
      seoTitle: "Calculateur de Cycles de Sommeil | HelloTools",
      seoDescription: "Calculez l'heure idéale pour vous coucher ou vous réveiller en pleine forme.",
      description: "Déterminez vos heures de réveil optimales.",
      quickAnswer: "Calcule l'heure de réveil optimale selon des cycles de sommeil de 90 minutes.",
      seoHowToUse: "1. Indiquez l'heure à laquelle vous devez vous réveiller (ou vous coucher).\n2. Choisissez parmi les horaires proposés.",
      seoHowItWorks: "Additionne des blocs de 90 minutes plus 14 minutes d'endormissement.",
      formula: "Heure = Heure de départ + (n * 90 min) + 14 min",
      seoExample: "En vous couchant à 23h00, vos réveils optimaux sont à 6h14 et 7h44.",
      faqs: [
        { q: "Quelle est la durée moyenne d'un cycle de sommeil complet ?", a: "Un cycle de sommeil dure en moyenne 90 minutes (entre 80 et 100 minutes) et se compose de sommeil léger, sommeil profond et sommeil paradoxal (REM)." },
        { q: "Pourquoi se réveiller au milieu d'un cycle rend-il fatigué ?", a: "Être arraché au sommeil profond engendre une inertie du sommeil marquée par la confusion et la somnolence. Se réveiller en phase de sommeil léger permet un réveil tonique." },
        { q: "Combien de cycles de sommeil effectuer chaque nuit ?", a: "Un adulte a généralement besoin de 5 à 6 cycles de sommeil réparateur par nuit, ce qui correspond à 7 h 30 ou 9 h 00 de repos." },
        { q: "Combien de temps faut-il pour s'endormir en moyenne ?", a: "Le temps d'endormissement moyen chez l'adulte sain est de 14 minutes, un délai automatiquement intégré dans les calculs de l'outil." },
        { q: "Comment programmer au mieux son réveil grâce au calculateur ?", a: "Indiquez l'heure souhaitée de lever ou de coucher pour obtenir les créneaux horaires idéaux calés sur la fin naturelle de vos cycles de sommeil." }
      ]
    },
    pt: {
      name: "Calculadora de Ciclos do Sono",
      seoTitle: "Calculadora de Ciclos do Sono — Hora de Acordar | HelloTools",
      seoDescription: "Descubra a melhor hora para dormir ou acordar e evite acordar cansado.",
      description: "Calcule os horários ideais de sono baseados em ciclos de 90 minutos.",
      quickAnswer: "Indica os melhores horários para acordar sem interromper o sono profundo.",
      seoHowToUse: "1. Selecione se deseja calcular a hora de dormir ou acordar.\n2. Insira o horário desejado.\n3. Escolha uma das opções de horários.",
      seoHowItWorks: "Baseia-se em ciclos de 90 minutos mais 14 minutos para adormecer.",
      formula: "Horário = Hora Inicial + (n * 90 min) + 14 min",
      seoExample: "Se dormir às 23:00, os melhores horários para acordar são 6:14, 7:44 e 9:14.",
      faqs: [
        { q: "Qual a duração de um ciclo de sono normal no adulto?", a: "Um ciclo de sono dura em média 90 minutos (de 80 a 110 minutos), alternando sono leve, sono profundo delta e sono REM (dos sonhos)." },
        { q: "Por que acordar no meio do sono profundo causa indisposição?", a: "Despertar durante o sono profundo provoca inércia do sono (sensação de cansaço e peso na cabeça). Acordar ao término de um ciclo de 90 minutos propicia um despertar revigorado." },
        { q: "Quantos ciclos completos de sono são ideais por noite?", a: "A maioria dos adultos necessita de 5 a 6 ciclos completos por noite, totalizando entre 7,5 e 9 horas de descanso restaurador." },
        { q: "A calculadora inclui o tempo médio para adormecer?", a: "Sim. Adiciona-se uma média fisiológica de 14 minutos para pegar no sono antes do primeiro ciclo iniciar." },
        { q: "Como definir o melhor horário para dormir com este simulador?", a: "Informe a hora exata em que precisa levantar e escolha um dos horários sugeridos para ir para a cama e completar múltiplos exatos de 90 minutos." }
      ]
    },
    ja: {
      name: "睡眠サイクル（ノンレム睡眠）計算ツール",
      seoTitle: "睡眠サイクル計算ツール — 就寝・起床最適時間 | HelloTools",
      seoDescription: "90分周期の睡眠サイクル（レム睡眠・ノンレム睡眠）に基づき、スッキリ起きられる最適な就寝時間・起床時間を計算します。",
      description: "90分周期の睡眠サイクルから最適なお休み時間・起床時間を計算します。",
      quickAnswer: "90分周期の睡眠サイクルに基づき、目覚めの良い就寝・起床時間を提案します。",
      seoHowToUse: "1. 起床希望時間（または今すぐ寝る）を選択します。\n2. 「計算」ボタンを押します。\n3. 推奨される就寝時間（または起床時間）一覧から選択します。",
      seoHowItWorks: "1サイクル90分＋入眠所要時間（平均15分）を加算して算出します。",
      formula: "起床時間 = 就寝時間 + (90分 * サイクル数) + 15分",
      seoExample: "夜23:00に寝る場合、翌朝6:15（4.5時間＝3サイクル）や7:45（6時間＝4サイクル）が快適な起床時間です。",
      faqs: [
        { q: "人間の睡眠サイクル（レム睡眠・ノンレム睡眠）の周期は何分ですか？", a: "1回の睡眠サイクルは約90分間（80〜110分）です。浅い眠り、深いノンレム睡眠、夢を見るレム睡眠がワンセットとなって繰り返されます。" },
        { q: "目覚まし時計で起きても強い眠気やだるさが残るのはなぜですか？", a: "深いノンレム睡眠の途中で強制的に起こされると「睡眠慣性（脳の覚醒遅延）」が発生するためです。90分サイクルの切れ目の浅い眠りで起きるとスッキリ起床できます。" },
        { q: "大人は一晩に何サイクルの睡眠をとるのが理想ですか？", a: "一晩に5サイクル（7.5時間）または6サイクル（9時間）の睡眠をとることで、心身の疲労回復と記憶の定着が最も効率的に行われます。" },
        { q: "入眠までにかかる時間（入眠潜時）は考慮されていますか？", a: "はい。一般的な成人が布団に入ってから眠りに落ちるまでの平均所要時間である「約14分間」をあらかじめ計算に含めてアラーム時刻を提案します。" },
        { q: "起床時間から逆算して就寝時間を決めるにはどう使いますか？", a: "「起きたい時刻」を入力するだけで、90分の倍数＋入眠14分を逆算し、目覚めが良くなる最適な就寝時刻候補を複数リストアップします。" }
      ]
    }
  },

  'color-picker': {
    es: {
      name: "Selector de Color y Conversor HEX RGB HSL",
      seoTitle: "Selector de Color y Conversor HEX, RGB, HSL | HelloTools",
      seoDescription: "Selecciona colores e intercambia códigos entre HEX, RGB, HSL y CMYK.",
      description: "Elige colores y convierte entre formatos HEX, RGB y HSL.",
      quickAnswer: "Herramienta gráfica para seleccionar colores y convertir sus códigos de formato.",
      seoHowToUse: "1. Haz clic en el paleta para elegir un color.\n2. Copia el código en formato HEX, RGB o HSL.\n3. Ajusta la opacidad si lo deseas.",
      seoHowItWorks: "Realiza conversiones matemáticas de espacio de color.",
      formula: "RGB = (r, g, b) | HEX = #RRGGBB | HSL = (h%, s%, l%)",
      seoExample: "El color azul puro es #0000FF en HEX, rgb(0, 0, 255) y hsl(240, 100%, 50%).",
      faqs: [
        { q: "¿Qué modelos y formatos de color convierte esta herramienta?", a: "Permite seleccionar colores visualmente y convertirlos en tiempo real entre HEX, RGB, HSL, HSV y CMYK con valores numéricos y código CSS listo para usar." },
        { q: "¿Cómo se compone un código de color hexadecimal (HEX)?", a: "Se compone de un signo # seguido de 6 caracteres hexadecimales (0-9, A-F) donde los dos primeros indican rojo, los dos siguientes verde y los dos últimos azul (ej. #FF5733)." },
        { q: "¿Qué diferencia hay entre los modelos de color RGB y CMYK?", a: "RGB es un modelo aditivo de luz para pantallas digitales (rojo, verde y azul). CMYK es un modelo sustractivo para tintas de imprenta (cian, magenta, amarillo y negro)." },
        { q: "¿Incluye soporte para canal alfa de transparencia (RGBA / HSLA)?", a: "Sí. Permite ajustar el valor de opacidad o canal alfa de 0 (completamente transparente) a 1 (completamente opaco)." },
        { q: "¿Puedo copiar el código CSS directamente al portapapeles?", a: "Sí. Cuenta con botones de copia rápida para copiar el código CSS en formato HEX, rgb(...) o hsl(...) con un solo clic." }
      ]
    },
    de: {
      name: "Farbwähler (Color Picker)",
      seoTitle: "Farbwähler & Farbcodes Umrechnen (HEX, RGB, HSL) | HelloTools",
      seoDescription: "Wählen Sie Farben aus und konvertieren Sie HEX, RGB und HSL Codes.",
      description: "Farbcodes wählen und zwischen HEX, RGB und HSL umrechnen.",
      quickAnswer: "Visueller Farbwähler mit automatischer Konvertierung von Farbcodes.",
      seoHowToUse: "1. Farbe in der Palette anklicken.\n2. Farbcode (HEX, RGB, HSL) kopieren.",
      seoHowItWorks: "Konvertiert Farbräume mathematisch.",
      formula: "HEX = #RRGGBB | RGB = rgb(r, g, b)",
      seoExample: "Reines Rot ist #FF0000 bzw. rgb(255, 0, 0).",
      faqs: [
        { q: "Welche Farbräume und Notationen unterstützt der Farbwähler?", a: "Er konvertiert Farben in Echtzeit zwischen HEX, RGB, HSL, HSV und CMYK und generiert sofort einsatzbereiten CSS-Code." },
        { q: "Wie ist ein Hexadezimal-Farbcode (HEX) aufgebaut?", a: "Ein HEX-Code besteht aus dem Doppelkreuz # und sechs Stellen (0-9, A-F), die jeweils paarweise die Anteile für Rot, Grün und Blau beschreiben (z. B. #3B82F6)." },
        { q: "Was ist der Unterschied zwischen RGB und CMYK?", a: "RGB ist das additive Farbmodell für digitale Bildschirme. CMYK ist das subtraktive Vierfarbmodell für den professionellen Papierdruck." },
        { q: "Wird Transparenz (Alpha-Kanal / RGBA) unterstützt?", a: "Ja, Sie können die Deckkraft stufenlos regeln und die resultierenden RGBA- und HSLA-Farbwerte abgreifen." },
        { q: "Lässt sich der CSS-Code für Webdesign-Projekte kopieren?", a: "Ja, mit einem Klick kopieren Sie die fertigen Farbdefinitionen direkt in Ihre Zwischenablage für CSS und Tailwind." }
      ]
    },
    fr: {
      name: "Sélecteur de Couleur",
      seoTitle: "Sélecteur de Couleur et Convertisseur HEX, RGB, HSL | HelloTools",
      seoDescription: "Sélectionnez des couleurs et convertissez leurs codes HEX, RGB et HSL.",
      description: "Choisissez vos couleurs et obtenez les codes HEX, RGB et HSL.",
      quickAnswer: "Outil graphique pour capturer et convertir les codes de couleurs web.",
      seoHowToUse: "1. Sélectionnez une couleur dans la palette.\n2. Copiez le code au format désiré (HEX, RGB, HSL).",
      seoHowItWorks: "Effectue la conversion d'espaces colorimétriques en temps réel.",
      formula: "HEX = #RRGGBB | RGB = rgb(r, g, b)",
      seoExample: "Le vert pur s'écrit #00FF00 en HEX et rgb(0, 255, 0).",
      faqs: [
        { q: "Quels formats et espaces de couleur cet outil prend-il en charge ?", a: "Il convertit simultanément les couleurs entre les formats HEX, RGB, HSL, HSV et CMJN (CMYK) avec génération du code CSS associé." },
        { q: "Comment décoder une couleur hexadécimale (HEX) ?", a: "Le code débute par un dièse # suivi de trois paires de caractères hexadécimaux quantifiant l'intensité du Rouge, du Vert et du Bleu (ex. #10B981)." },
        { q: "Quelle est la distinction clé entre RGB et CMJN ?", a: "Le modèle RVB (lumière) est dédié aux écrans web, tandis que le CMJN (pigments d'encre) est calibré pour l'impression papetière." },
        { q: "Gère-t-il la transparence (canal alpha RGBA / HSLA) ?", a: "Oui. Le curseur d'opacité permet de définir des transparences précises pour vos feuilles de style CSS." },
        { q: "Peut-on exporter directement les valeurs pour le développement web ?", a: "Oui, des raccourcis de copie permettent d'exporter immédiatement les syntaxes CSS valides." }
      ]
    },
    pt: {
      name: "Seletor de Cores (Color Picker)",
      seoTitle: "Seletor de Cores e Conversor HEX, RGB, HSL | HelloTools",
      seoDescription: "Selecione cores e converta códigos entre HEX, RGB e HSL instantaneamente.",
      description: "Escolha cores e converta os códigos entre formatos HEX, RGB e HSL.",
      quickAnswer: "Ferramenta gráfica para selecionar cores e obter seus valores HEX, RGB e HSL.",
      seoHowToUse: "1. Escolha a cor no paleta visual.\n2. Copie o código em HEX, RGB ou HSL.",
      seoHowItWorks: "Converte matematicamente entre os modelos de cor.",
      formula: "HEX = #RRGGBB | RGB = (r, g, b)",
      seoExample: "A cor branca é #FFFFFF em HEX e rgb(255, 255, 255).",
      faqs: [
        { q: "Quais padrões de cores este seletor e conversor calcula?", a: "Converte cores em tempo real entre os padrões HEX, RGB, HSL, HSV e CMYK, fornecendo o código CSS pronto para designers e desenvolvedores." },
        { q: "Como é estruturado um código de cor hexadecimal (HEX)?", a: "Inicia com a cerquilha # seguida por três pares de dígitos de base 16 (0-F) correspondentes às intensidades de Vermelho, Verde e Azul." },
        { q: "Qual a diferença essencial entre as escalas RGB e CMYK?", a: "RGB é o modelo aditivo luminoso próprio para telas e monitores digitais. CMYK é o sistema de pigmentos subtrativos para artes gráficas e impressão." },
        { q: "A ferramenta oferece controle de opacidade (canal alfa)?", a: "Sim. Permite modular o canal alfa para obter códigos compatíveis com RGBA e HSLA com transparência calibrada." },
        { q: "É possível copiar o código CSS pronto com um clique?", a: "Sim. Inclui botões para copiar as propriedades prontas nos formatos HEX, rgb() e hsl() direto para o código do seu site." }
      ]
    },
    ja: {
      name: "カラーピッカー・カラーコード変換ツール",
      seoTitle: "カラーピッカー — HEX・RGB・HSL 相互変換 | HelloTools",
      seoDescription: "画面上で直感的に色を選択し、HEX（#ffffff）、RGB（255,255,255）、HSLコードを相互変換・コピーできます。",
      description: "カラーパレットから色を選びHEX、RGB、HSLコードを取得・換算します。",
      quickAnswer: "カラーパレットで選択した色のカラーコード（HEX・RGB・HSL）を表示・変換します。",
      seoHowToUse: "1. カラーパレット上をクリックして色を選択します。\n2. HEX / RGB / HSL / CMYK の各表示コードを「コピー」します。",
      seoHowItWorks: "色空間変換アルゴリズムを用いてリアルタイムで数値を相互変換します。",
      formula: "HEX = #RRGGBB | RGB = rgb(r,g,b) | HSL = hsl(h,s%,l%)",
      seoExample: "真っ赤な色は HEX: #FF0000 、 RGB: rgb(255, 0, 0) と表現されます。",
      faqs: [
        { q: "このカラーピッカー＆変換ツールが対応する色空間フォーマットは？", a: "WEB制作で標準のHEX（16進数）、RGB、HSL、HSV、および印刷用のCMYKの相互変換に対応し、CSSコードを即座に生成します。" },
        { q: "カラーコード（HEXコード）の構造はどうなっていますか？", a: "「#」に続く6桁の16進数（0〜9、A〜F）で構成され、2桁ずつ順に赤（R）、緑（G）、青（B）の光の強さを表します（例：#3B82F6）。" },
        { q: "「RGB」と「CMYK」の最大の違いは何ですか？", a: "RGBはPCやスマホのディスプレイ用の光の三原色（加法混色）です。CMYKは印刷機のインク（シアン・マゼンタ・イエロー・黒）による減法混色です。" },
        { q: "透明度（アルファチャンネル・RGBA）の指定は可能ですか？", a: "はい。透明度スライダーで0（完全透明）から1（不透明）まで調整し、RGBAやHSLAのCSS指定コードを直接取得できます。" },
        { q: "Webデザイン制作ですぐに使えるコードをコピーできますか？", a: "ワンクリックでクリップボードにコピーできるボタンを備えており、CSSスタイルシートやTailwind CSSにそのまま貼り付け可能です。" }
      ]
    }
  },

  'aspect-ratio-calculator': {
    es: {
      name: "Calculadora de Relación de Aspecto",
      seoTitle: "Calculadora de Relación de Aspecto (16:9, 4:3, 1:1) | HelloTools",
      seoDescription: "Calcula dimensiones de imágenes y vídeos manteniendo la proporción de aspecto.",
      description: "Calcula el ancho o alto de imágenes manteniendo la proporción.",
      quickAnswer: "Reacondiciona dimensiones de ancho y alto conservando la proporción de aspecto original.",
      seoHowToUse: "1. Introduce las dimensiones originales (ej. 1920x1080).\n2. Modifica el nuevo ancho o alto.\n3. Obtén la dimensión correspondiente ajustada.",
      seoHowItWorks: "Aplica la regla de tres simple sobre la proporción base.",
      formula: "Nuevo Alto = (Nuevo Ancho * Alto Original) / Ancho Original",
      seoExample: "Un vídeo de 16:9 con un ancho de 800px tiene un alto proporcional de 450px.",
      faqs: [
        { q: "¿Qué es una relación de aspecto (aspect ratio) y por qué es importante?", a: "La relación de aspecto es la proporción entre la anchura y la altura de una imagen o pantalla (ancho:alto). Es crucial para maquetación web, fotografía y edición de vídeo para evitar deformaciones o barras negras." },
        { q: "¿Cómo se calcula una nueva dimensión conservando la proporción?", a: "Introduce el ancho y alto originales, e indica la nueva anchura o altura deseada. El calculador despeja la dimensión faltante mediante una regla de tres proporcional." },
        { q: "¿Cuáles son las relaciones de aspecto estándar en vídeo y monitores?", a: "16:9 es el estándar internacional de vídeo HD/4K y YouTube, 9:16 es el formato vertical para TikTok y Reels, 4:3 es el clásico de televisión analógica y 21:9 para cine panorámico." },
        { q: "¿Sirve para calcular breakpoints y dimensiones de diseño web CSS?", a: "Sí. Permite proyectar tamaños de imágenes y contenedores responsivos que conserven la proporción idónea en cualquier dispositivo móvil o de escritorio." },
        { q: "¿Almacena esta calculadora las medidas introducidas?", a: "No. Todos los cálculos se efectúan al instante en el navegador sin guardar datos." }
      ]
    },
    de: {
      name: "Seitenverhältnisrechner",
      seoTitle: "Seitenverhältnisrechner (16:9, 4:3) | HelloTools",
      seoDescription: "Berechnen Sie Bild- und Videogrößen unter Beibehaltung des Seitenverhältnisses.",
      description: "Breite und Höhe von Bildern proportional berechnen.",
      quickAnswer: "Berechnet fehlende Bildmaße unter Beibehaltung des Aspektverhältnisses.",
      seoHowToUse: "1. Ursprungsbreite und -höhe eingeben.\n2. Neue Breite oder Höhe angeben.\n3. Proportionalen Wert ablesen.",
      seoHowItWorks: "Nutzt Dreisatz-Rechnung.",
      formula: "Neue Höhe = (Neue Breite * Höhe) / Breite",
      seoExample: "Ein 16:9 Bild mit 800px Breite ist 450px hoch.",
      faqs: [
        { q: "Was versteht man unter dem Seitenverhältnis (Aspect Ratio)?", a: "Das Seitenverhältnis beschreibt das proportionale Verhältnis von Bildbreite zu Bildhöhe (Breite:Höhe), um Verzerrungen bei der Skalierung von Fotos und Videos zu verhindern." },
        { q: "Wie berechnet man neue Pixelmaße bei festem Seitenverhältnis?", a: "Geben Sie Originalbreite und -höhe ein und tragen Sie die gewünschte neue Breite oder Höhe ein. Der Rechner ermittelt den fehlenden Wert proportional." },
        { q: "Welche Seitenverhältnisse sind heute der weltweite Standard?", a: "16:9 ist der weltweite Standard für Monitore und YouTube, 9:16 für vertikale Smartphone-Videos (TikTok, Reels, Shorts) und 4:3 für klassische Formate." },
        { q: "Kann der Rechner für CSS-Bilder und responsive Layouts genutzt werden?", a: "Ja, ideal zum Berechnen von Pixelwerten für Bildcontainer mit CSS-Attributen wie aspect-ratio." },
        { q: "Werden Maße oder Bilddaten auf dem Server gespeichert?", a: "Nein, alle Berechnungen finden rein lokal im Browser statt." }
      ]
    },
    fr: {
      name: "Calculateur de Ratio d'Aspect",
      seoTitle: "Calculateur de Ratio d'Aspect (16:9, 4:3) | HelloTools",
      seoDescription: "Calculez les dimensions d'images et vidéos en maintenant les proportions.",
      description: "Ajustez la largeur ou hauteur d'une image en gardant le ratio.",
      quickAnswer: "Redimensionne des valeurs de largeur/hauteur en conservant le ratio d'aspect.",
      seoHowToUse: "1. Indiquez le ratio ou dimensions initiales.\n2. Changez la nouvelle largeur (ou hauteur).\n3. Obtenez la dimension calculée.",
      seoHowItWorks: "Applique le produit en croix pour préserver les proportions.",
      formula: "Nouvelle Hauteur = (Nouvelle Largeur * Hauteur) / Largeur",
      seoExample: "Une vidéo 16:9 de 800px de large aura 450px de hauteur.",
      faqs: [
        { q: "Qu'est-ce que le ratio d'aspect et pourquoi est-il essentiel ?", a: "Le ratio d'aspect est le rapport proportionnel entre la largeur et la hauteur d'un écran ou d'une image (Largeur:Hauteur), évitant les déformations visuelles." },
        { q: "Comment redimensionner une image en conservant ses proportions ?", a: "Indiquez les dimensions d'origine puis la nouvelle largeur ou hauteur voulue. Le calculateur calcule automatiquement la cote manquante." },
        { q: "Quels sont les formats d'image et de vidéo les plus courants ?", a: "16:9 pour les vidéos Full HD/4K et YouTube, 9:16 pour les stories et vidéos mobiles (TikTok, Reels), 1:1 pour les publications carrées et 4:3 pour l'ancien format TV." },
        { q: "Peut-on l'utiliser pour le design web adaptatif (responsive CSS) ?", a: "Oui, indispensable pour caler les dimensions de bannières et de conteneurs vidéo sans risquer d'étirement d'image." },
        { q: "Mes données dimensionnelles sont-elles enregistrées ?", a: "Non, le calcul s'exécute localement dans votre navigateur sans conservation de données." }
      ]
    },
    pt: {
      name: "Calculadora de Proporção de Tela (Aspect Ratio)",
      seoTitle: "Calculadora de Aspect Ratio (16:9, 4:3, 1:1) | HelloTools",
      seoDescription: "Calcule dimensões de imagens e vídeos mantendo a proporção de tela original.",
      description: "Redimensione largura e altura sem distorcer a imagem.",
      quickAnswer: "Calcula a dimensão proporcional de altura ou largura para evitar distorção visual.",
      seoHowToUse: "1. Informe a proporção original (ex: 1920x1080 ou 16:9).\n2. Altere a nova largura.\n3. Veja a nova altura proporcional.",
      seoHowItWorks: "Aplica a regra de três para manter a proporção constante.",
      formula: "Nova Altura = (Nova Largura * Altura Original) / Largura Original",
      seoExample: "Uma imagem 16:9 com largura de 800px terá altura de 450px.",
      faqs: [
        { q: "O que é proporção de aspecto (aspect ratio) e qual sua relevância?", a: "É a proporção matemática entre a largura e a altura de uma tela ou imagem (largura:altura), indispensável para evitar distorções visuais e cortes indesejados." },
        { q: "Como redimensionar mantendo a proporção original da imagem?", a: "Preencha as medidas originais e defina a nova largura ou altura. O simulador aplica regra de três simples para manter a escala geométrica exata." },
        { q: "Quais são as proporções de tela mais utilizadas no mercado?", a: "16:9 é o padrão de monitores, TVs e YouTube; 9:16 é o padrão vertical para Stories, Reels e TikTok; 1:1 é o clássico quadrado de redes sociais." },
        { q: "Serve para calcular dimensões em web design responsivo (CSS)?", a: "Sim. É ideal para calcular valores de pixels para layouts com a propriedade CSS aspect-ratio." },
        { q: "A calculadora salva as medidas que eu digito?", a: "Não. Os cálculos ocorrem em tempo real e de maneira restrita à aba do seu navegador." }
      ]
    },
    ja: {
      name: "アスペクト比（縦横比）計算ツール",
      seoTitle: "アスペクト比計算ツール — 16:9 / 4:3 画面比率 | HelloTools",
      seoDescription: "画像や動画の幅（Width）と高さ（Height）からアスペクト比を計算し、比率を維持したままリサイズ寸法を算出します。",
      description: "縦横比（アスペクト比）を維持したまま画像寸法を計算します。",
      quickAnswer: "元画像・動画の縦横比（16:9や4:3など）を保ったままリサイズ後の幅・高さを算出します。",
      seoHowToUse: "1. 元の幅と高さを入力します（または16:9等のプリセットを選択）。\n2. 変更後の幅（または高さ）を入力します。\n3. 比率を維持した計算後の寸法を確認します。",
      seoHowItWorks: "比例式（新しい高さ = 新しい幅 * 元の高さ / 元の幅）で即時計算します。",
      formula: "高さ = (幅 * 元の高さ) / 元の幅",
      seoExample: "16:9の比率で幅を800pxに設定すると、高さは450pxとなります。",
      faqs: [
        { q: "アスペクト比（画面比率・縦横比）とは何ですか？なぜ重要ですか？", a: "画像や動画、ディスプレイの「横幅と高さの比率（横:縦）」を表す数値です。画像の引き伸ばしや歪み、黒帯の発生を防ぐために不可欠な概念です。" },
        { q: "縦横比を固定したまま新しいサイズ（ピクセル数）を計算するには？", a: "元の幅と高さを入力し、変更後の横幅または高さを入力するだけで、比率を保ったまま欠けているもう一方のサイズを自動計算します。" },
        { q: "動画やディスプレイの代表的なアスペクト比規格は？", a: "16:9（フルHD・4K動画・YouTube標準）、9:16（TikTokやInstagramリール用の縦型動画）、1:1（正方形）、4:3（昔のアナログテレビやiPad標準）が主流です。" },
        { q: "Webデザインのレスポンシブ対応（CSS aspect-ratio）に使えますか？", a: "はい。Webサイト制作において、画面サイズが変化しても画像の比率を維持するCSS指定の数値計算に役立ちます。" },
        { q: "入力した画像サイズが外部に送信・保存されることはありますか？", a: "いいえ。すべての比率計算はお使いのブラウザ上でローカルに行われ、外部送信されることはありません。" }
      ]
    }
  },

  'binary-converter': {
    es: {
      name: "Conversor de Binario a Texto",
      seoTitle: "Conversor de Binario a Texto y Texto a Binario | HelloTools",
      seoDescription: "Convierte código binario (01) a texto legible y texto a binario al instante.",
      description: "Convierte texto a código binario (0 y 1) y viceversa.",
      quickAnswer: "Traduce cadenas de texto ASCII a secuencias binarias de ceros y unos.",
      seoHowToUse: "1. Introduce el texto o el código binario.\n2. Selecciona la dirección de conversión.\n3. Copia el resultado.",
      seoHowItWorks: "Convierte caracteres a sus códigos ASCII/Unicode de 8 bits.",
      formula: "Binario = char.charCodeAt(0).toString(2).padStart(8, \"0\")",
      seoExample: "La letra \"A\" en binario es 01000001.",
      faqs: [
        { q: "¿Qué conversiones realiza este convertidor de código binario?", a: "Convierte texto ASCII/Unicode a código binario (0s y 1s) y decodifica secuencias binarias de vuelta a texto legible, además de convertir entre binario, decimal y hexadecimal." },
        { q: "¿Cuántos dígitos binarios (bits) representan un carácter estándar?", a: "En el estándar ASCII cada carácter alfanumérico se representa con 8 bits (1 byte) de ceros y unos (ej. la letra \"A\" es 01000001)." },
        { q: "¿Cómo funciona la conversión de números decimales a binario?", a: "Se divide sucesivamente el número decimal entre 2 y se recogen los restos en orden inverso de abajo hacia arriba hasta llegar a cero." },
        { q: "¿Soporta caracteres especiales del español y emojis en binario?", a: "Sí. Utiliza codificación en bytes UTF-8 para descomponer de forma fidedigna caracteres no ingleses en grupos de 8 bits." },
        { q: "¿Se transmiten los textos o números binarios a un servidor?", a: "No. Toda la traducción binaria opera en tu navegador mediante scripts del lado cliente." }
      ]
    },
    de: {
      name: "Binär-Text-Umwandler",
      seoTitle: "Binär in Text Umwandeln & Text in Binär | HelloTools",
      seoDescription: "Konvertieren Sie Binärcode (01) in lesbaren Text und umgekehrt.",
      description: "Text in Binärcode (0 und 1) und zurück umwandeln.",
      quickAnswer: "Ubersetzt Text in Nullen und Einsen (Binärcode).",
      seoHowToUse: "1. Text oder Binärcode eingeben.\n2. Konvertierung wählen.\n3. Ergebnis ablesen.",
      seoHowItWorks: "Wandelt Zeichen in 8-Bit-ASCII-Binärwerte um.",
      formula: "Binär = charCode.toString(2)",
      seoExample: "Der Buchstabe \"A\" lautet binär 01000001.",
      faqs: [
        { q: "Welche Zahlensysteme und Formate wandelt der Binär-Konverter um?", a: "Er konvertiert Text in Binärcode (Nullen und Einsen) und umgekehrt sowie Zahlen zwischen Binär-, Dezimal-, Hexadezimal- und Oktalsystem." },
        { q: "Wie viele Bits stehen für ein einzelnes Schriftzeichen?", a: "Im Standard-ASCII-Satz wird jedes Zeichen durch eine 8-Bit-Folge (1 Byte) dargestellt (z. B. entspricht der Buchstabe \"A\" der Folge 01000001)." },
        { q: "Wie funktioniert die manuelle Umrechnung von Dezimal zu Binär?", a: "Durch wiederholte Division durch 2 und Notieren der Reste (0 oder 1) von unten nach oben lässt sich jede Zahl ins Binärsystem überführen." },
        { q: "Werden Sonderzeichen und Emojis unterstützt?", a: "Ja, dank vollständiger UTF-8-Unterstützung werden auch Umlaute und Emojis sauber in ihre Byte-Muster zerlegt." },
        { q: "Arbeitet der Konverter lokal und sicher?", a: "Ja, die Binärtransformation findet ausnahmslos im lokalen Speicher Ihres Browsers statt." }
      ]
    },
    fr: {
      name: "Convertisseur Binaire - Texte",
      seoTitle: "Convertisseur Binaire en Texte et Texte en Binaire | HelloTools",
      seoDescription: "Convertissez du code binaire (0 et 1) en texte et inversement.",
      description: "Convertissez vos textes en binaire et décodez le binaire.",
      quickAnswer: "Traduit des chaînes de caractères en langage binaire informatique.",
      seoHowToUse: "1. Entrez le texte ou les chiffres binaires.\n2. Cliquez sur Convertir.\n3. Copiez le résultat.",
      seoHowItWorks: "Convertit les caractères en valeurs binationale 8 bits.",
      formula: "Binaire = charCode.toString(2)",
      seoExample: "Le caractère \"A\" se traduit par 01000001 en binaire.",
      faqs: [
        { q: "Quelles conversions ce traducteur binaire prend-il en charge ?", a: "Il encode du texte clair en binaire (0 et 1), décode des séquences binaires en texte et convertit les nombres entre bases 2 (binaire), 10 (décimal) et 16 (hexadécimal)." },
        { q: "Combien de bits constituent un caractère alphabétique ?", a: "Dans la table ASCII, chaque caractère élémentaire est composé d'un octet, soit 8 bits (par exemple \"B\" s'écrit 01000010)." },
        { q: "Comment convertir un nombre décimal en binaire ?", a: "On effectue des divisions successives par 2 en relevant les restes successifs du dernier au premier quotient." },
        { q: "Prend-il en charge les lettres accentuées en binaire ?", a: "Oui, le protocole UTF-8 est appliqué pour coder les caractères accentués sur 2 octets (16 bits) sans erreur." },
        { q: "Les messages codés sont-ils envoyés sur un serveur ?", a: "Non, la conversion s'exécute localement dans le navigateur sans transmission de données." }
      ]
    },
    pt: {
      name: "Conversor de Binário para Texto",
      seoTitle: "Conversor de Binário para Texto e Texto para Binário | HelloTools",
      seoDescription: "Converta código binário (01) em texto e texto em código binário.",
      description: "Converta texto para binário (zeros e uns) e vice-versa.",
      quickAnswer: "Traduz textos em código binário de 8 bits e vice-versa.",
      seoHowToUse: "1. Cole o texto ou o código binário.\n2. Escolha o sentido da conversão.\n3. Copie o resultado.",
      seoHowItWorks: "Converte cada caractere em sua representação binária ASCII.",
      formula: "Binário = charCode.toString(2).padStart(8, \"0\")",
      seoExample: "A letra \"A\" em binário é 01000001.",
      faqs: [
        { q: "Quais conversões o conversor binário realiza?", a: "Transforma texto comum em código binário (zeros e uns) e vice-versa, além de efetuar conversões entre os sistemas binário, decimal e hexadecimal." },
        { q: "Quantos bits representam uma letra no computador?", a: "Pelo padrão ASCII, cada caractere alfanumérico corresponde a 1 byte (sequência de 8 bits). A letra \"A\", por exemplo, é codificada como 01000001." },
        { q: "Qual a lógica matemática para converter decimal em binário?", a: "Divide-se o número por 2 sucessivamente, anotando-se os restos das divisões da última para a primeira para formar a sequência binária." },
        { q: "A ferramenta decodifica textos em português com acentos?", a: "Sim. A codificação utiliza o padrão universal UTF-8 para converter acentuações e caracteres latinos com fidelidade." },
        { q: "Os dados convertidos permanecem em sigilo?", a: "Sim. O processamento acontece localmente no seu computador sem trafegar pela web." }
      ]
    },
    ja: {
      name: "バイナリ（2進数）・テキスト相互変換ツール",
      seoTitle: "2進数（バイナリ）テキスト変換ツール | HelloTools",
      seoDescription: "テキスト文字列を8ビットの2進数（0と1のバイナリコード）へ変換、またはバイナリを元のテキストへと復号します。",
      description: "テキストを2進数（0と1）に変換、または2進数をテキストに戻します。",
      quickAnswer: "テキストとコンピュータの基本コードである2進数（01バイナリ）を相互変換します。",
      seoHowToUse: "1. 文字列または2進数（0と1）を入力します。\n2. 「テキスト→2進数」または「2進数→テキスト」を選択します。\n3. 変換結果をコピーします。",
      seoHowItWorks: "文字コード（UTF-8/ASCII）のコードポイントを8ビット2進数文字列へ変換します。",
      formula: "2進数 = char.charCodeAt(0).toString(2).padStart(8, \"0\")",
      seoExample: "英字の「A」を2進数変換すると「01000001」になります。",
      faqs: [
        { q: "この2進数（バイナリ）変換ツールでできる変換の種類は？", a: "テキスト文字列と2進数（0と1の並び）の相互変換、および2進数・10進数・16進数・8進数の基数変換に対応しています。" },
        { q: "コンピュータ上で英数字1文字は何ビットで表されますか？", a: "標準的なASCIIコードでは、英数字1文字は「8ビット（1バイト）」の0と1の組み合わせで表現されます（例：文字「A」は「01000001」）。" },
        { q: "10進数の数値を2進数に変換する計算方法は？", a: "10進数の数値を商が0になるまで2で割り続け、その余り（0または1）を下から逆順に並べることで2進数を求めます。" },
        { q: "日本語のひらがな・漢字や絵文字のバイナリ変換にも対応していますか？", a: "はい。UTF-8エンコーディングに基づき、多言語文字や絵文字もバイト列に正確に分解・復元できます。" },
        { q: "変換したコードが外部に流出するリスクはありませんか？", a: "ありません。すべての変換アルゴリズムはブラウザ上でローカル処理されるため、プライベートなデータも安全に変換できます。" }
      ]
    }
  },

  'word-to-pdf': {
    es: {
      name: "Convertidor de Texto a PDF",
      seoTitle: "Convertidor de Texto a PDF Online | HelloTools",
      seoDescription: "Convierte texto o notas en un archivo documento PDF listo para descargar.",
      description: "Genera un archivo PDF a partir de texto o notas simples.",
      quickAnswer: "Crea instantáneamente un documento PDF descargable a partir de texto.",
      seoHowToUse: "1. Escribe o pega tu texto.\n2. Personaliza el título del documento.\n3. Haz clic en Descargar PDF.",
      seoHowItWorks: "Genera la estructura de documento PDF usando el motor del navegador.",
      formula: "PDF Document Generator",
      seoExample: "Convierte tus notas de texto plano en un PDF imprimible.",
      faqs: [
        { q: "¿Cómo convierte este conversor documentos Word a formato PDF?", a: "Procesa el documento de texto directamente en tu navegador web y genera un archivo PDF vectorizado estándar manteniendo el formato, tipografías y márgenes de página." },
        { q: "¿Se suben mis archivos o documentos confidenciales a servidores externos?", a: "No. La conversión se efectúa en el entorno de ejecución de tu propio navegador web, garantizando que contratos o datos privados permanezcan confidenciales." },
        { q: "¿Mantiene la fidelidad de las fuentes, tablas e imágenes?", a: "Sí. El motor de renderizado preserva las estructuras de párrafos, encabezados, tablas y fotografías incrustadas tal como fueron concebidas." },
        { q: "¿Qué formatos de documento de texto admite como entrada?", a: "Admite documentos en formato Word (.docx), documentos de texto enriquecido (.rtf) y archivos de texto plano (.txt)." },
        { q: "¿Existe límite en el número de documentos que puedo convertir gratis?", a: "No hay límite. Puedes transformar todos los archivos que necesites sin necesidad de registro ni marcas de agua." }
      ]
    },
    de: {
      name: "Text-in-PDF-Umwandler",
      seoTitle: "Text in PDF Umwandeln Online | HelloTools",
      seoDescription: "Erstellen Sie aus Texten und Notizen eine herunterladbare PDF-Datei.",
      description: "Erzeugen Sie einfache PDF-Dokumente aus Text.",
      quickAnswer: "Generiert eine fertige PDF-Datei direkt aus Ihren Texteingaben.",
      seoHowToUse: "1. Text eingeben.\n2. Dokumenttitel festlegen.\n3. PDF herunterladen.",
      seoHowItWorks: "Erzeugt die PDF-Struktur direkt im Browser.",
      formula: "PDF Client Generator",
      seoExample: "Macht aus Notizen ein sauberes PDF-Dokument.",
      faqs: [
        { q: "Wie funktioniert die Word-zu-PDF-Konvertierung ohne Upload?", a: "Das Dokument wird direkt in der sicheren JavaScript-Laufzeitumgebung Ihres Browsers gerendert und als standardkonformes PDF kompiliert." },
        { q: "Bleiben vertrauliche Geschäfts- und Vertragsdokumente geschützt?", a: "Ja, da keine Datei auf externe Server hochgeladen wird, erfüllt die lokale Konvertierung höchste Ansprüche an Datenschutz und Vertraulichkeit." },
        { q: "Werden Schriftarten, Absätze und Tabellen originalgetreu übernommen?", a: "Ja, das Konvertierungsmodul bildet Überschriften, Tabellengitter, Textabstände und eingebettete Bilder zuverlässig im PDF ab." },
        { q: "Welche Dateiformate werden als Eingabe unterstützt?", a: "Unterstützt werden moderne Word-Dokumente (.docx), Rich Text (.rtf) sowie reine Textdateien (.txt)." },
        { q: "Werden Wasserzeichen oder Beschränkungen hinzugefügt?", a: "Nein, die PDF-Erstellung erfolgt ohne Wasserzeichen, ohne Seitenbeschränkung und ohne Werbebanner." }
      ]
    },
    fr: {
      name: "Convertisseur Texte en PDF",
      seoTitle: "Convertisseur Texte en PDF Gratuit | HelloTools",
      seoDescription: "Convertissez facilement vos textes et notes en document PDF téléchargeable.",
      description: "Générez un fichier PDF à partir de votre texte.",
      quickAnswer: "Convertit un texte brut en document PDF professionnel prêt à imprimer.",
      seoHowToUse: "1. Tapez ou collez votre texte.\n2. Définissez le titre.\n3. Téléchargez votre PDF.",
      seoHowItWorks: "Génère le fichier PDF côté client.",
      formula: "Générateur PDF Navigateur",
      seoExample: "Transforme vos notes en un fichier .pdf téléchargeable.",
      faqs: [
        { q: "Comment s'effectue la conversion de Word en PDF sans serveur ?", a: "Le document est analysé et mis en page directement par le moteur de votre navigateur pour générer un fichier PDF vectoriel normé." },
        { q: "Mes documents juridiques et confidentiels restent-ils sécurisés ?", a: "Absolument. Aucune pièce n'est transférée sur un serveur cloud : la création du PDF s'exécute localement sur votre poste." },
        { q: "La mise en page des tableaux et des images est-elle conservée ?", a: "Oui. Le convertisseur préserve les marges, les polices de caractères, les styles de paragraphe et les éléments graphiques." },
        { q: "Quels formats textuels sources sont acceptés ?", a: "Il accepte les fichiers Word récents (.docx), le format RTF (.rtf) ainsi que les documents texte (.txt)." },
        { q: "Le fichier PDF obtenu comporte-t-il des filigranes ou des limites ?", a: "Non, les PDF générés sont totalement neutres, sans tatouage numérique ni restriction de page." }
      ]
    },
    pt: {
      name: "Conversor de Texto para PDF",
      seoTitle: "Conversor de Texto para PDF Online | HelloTools",
      seoDescription: "Transforme seus textos e anotações em um arquivo PDF para download.",
      description: "Gere arquivos PDF a partir de textos simples.",
      quickAnswer: "Cria um documento PDF pronto para baixar a partir de texto digitado.",
      seoHowToUse: "1. Digite ou cole seu texto.\n2. Defina o título do documento.\n3. Clique em Baixar PDF.",
      seoHowItWorks: "Processa a criação do arquivo PDF localmente.",
      formula: "Gerador PDF Client-side",
      seoExample: "Converte notas de texto em um PDF para impressão.",
      faqs: [
        { q: "Como a conversão de Word para PDF ocorre de forma local?", a: "O arquivo é renderizado diretamente pelo motor do seu navegador web, gerando um documento PDF de alta fidelidade sem necessidade de envio a servidores." },
        { q: "Contratos e documentos sigilosos correm risco de vazamento?", a: "Não. Como a ferramenta opera inteiramente no lado do cliente (client-side), nenhum arquivo é transmitido pela internet." },
        { q: "A formatação original de tabelas, imagens e fontes é preservada?", a: "Sim. A conversão respeita o layout de páginas, margens de impressão, cabeçalhos e elementos visuais do documento original." },
        { q: "Quais formatos de arquivo são suportados para conversão?", a: "Suporta documentos do Microsoft Word (.docx), documentos de texto formatado (.rtf) e arquivos de texto puro (.txt)." },
        { q: "O PDF final recebe alguma marca d'água?", a: "Não. O arquivo gerado é 100% limpo, sem marcas d'água, sem limite de páginas e totalmente gratuito." }
      ]
    },
    ja: {
      name: "テキストPDF変換ツール",
      seoTitle: "テキストPDF変換ツール — Web文書作成 | HelloTools",
      seoDescription: "入力されたテキストやメモ文章から、ダウンロード可能なPDFドキュメントファイルをブラウザ上で生成します。",
      description: "入力したテキストからPDFファイルを生成・ダウンロードします。",
      quickAnswer: "プレーンテキストから印刷・保存可能なPDFファイルを即座に作成します。",
      seoHowToUse: "1. PDF化したい文章を入力・ペーストします。\n2. ドキュメントタイトルを指定します。\n3. 「PDFをダウンロード」ボタンを押します。",
      seoHowItWorks: "ブラウザの描画ライブラリを用いてPDFフォーマット化します。",
      formula: "PDF生成 = Client-side Canvas/PDF Document Stream",
      seoExample: "作成したメモ文章をレイアウト調整されたPDFファイルとして保存できます。",
      faqs: [
        { q: "WordからPDFへの変換はどのような仕組みで行われますか？", a: "ブラウザのネイティブレンダリング機能を利用し、お使いの端末内で直接Word文書を解析して高精度なPDFファイルを生成します。" },
        { q: "機密文書や個人情報が外部サーバーに流出するリスクはありませんか？", a: "ありません。完全なクライアントサイド（端末側ブラウザ）処理のため、ファイルが外部サーバーにアップロードされることは一切ありません。" },
        { q: "レイアウトやフォント、表組みの崩れは発生しませんか？", a: "見出しスタイル、表組み（テーブル）、埋め込み画像、改ページ位置を正確に認識してPDFレイアウトを維持します。" },
        { q: "対応している文書ファイル形式は何ですか？", a: "最新のWord文書形式（.docx）をはじめ、リッチテキスト形式（.rtf）、プレーンテキスト（.txt）の変換に対応しています。" },
        { q: "透かし（ウォーターマーク）やページ数の制限はありますか？", a: "透かしロゴの自動挿入やページ数制限はなく、完全にクリーンな正規PDFを作成できます。" }
      ]
    }
  },

  'uuid-generator': {
    es: {
      name: "Generador de UUID / GUID",
      seoTitle: "Generador de UUID v4 (Identificadores Únicos) | HelloTools",
      seoDescription: "Genera identificadores únicos universales (UUID v4 / GUID) de forma aleatoria.",
      description: "Genera UUIDs v4 aleatorios e identificadores únicos.",
      quickAnswer: "Genera identificadores alfanuméricos de 128 bits criptográficamente seguros.",
      seoHowToUse: "1. Elige la cantidad de UUIDs a generar.\n2. Selecciona si deseas mayúsculas o guiones.\n3. Haz clic en Copiar.",
      seoHowItWorks: "Utiliza crypto.randomUUID() para máxima aleatoriedad.",
      formula: "UUID v4 = xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx",
      seoExample: "Genera un código como 123e4567-e89b-12d3-a456-426614174000.",
      faqs: [
        { q: "¿Qué versión de UUID genera esta herramienta?", a: "Genera UUIDs versión 4 (UUID v4) basados en números pseudoaleatorios criptográficamente seguros mediante crypto.getRandomValues." },
        { q: "¿Cuál es la probabilidad de colisión o duplicado de dos UUID v4?", a: "La probabilidad matemática de colisión es prácticamente cero (1 entre 2^122, o 1 entre 5,3 × 10^36 combinaciones posibles)." },
        { q: "¿Cuál es la estructura estándar de un UUID v4?", a: "Consta de 32 dígitos hexadecimales mostrados en 5 grupos separados por guiones: 8-4-4-4-12 (36 caracteres en total, ej. 123e4567-e89b-42d3-a456-426614174000)." },
        { q: "¿Puedo generar listas masivas de UUIDs en mayúsculas o sin guiones?", a: "Sí. Puedes generar múltiples UUIDs de una sola vez y personalizar las opciones (mayúsculas/minúsculas y formato con o sin guiones)." },
        { q: "¿Para qué se utilizan los UUID en programación y bases de datos?", a: "Se usan como claves primarias únicas en bases de datos distribuidas, identificadores de sesiones de usuario, tokens de transacción y trazabilidad en microservicios." }
      ]
    },
    de: {
      name: "UUID / GUID Generator",
      seoTitle: "UUID v4 Generator — Eindeutige IDs Erzeugen | HelloTools",
      seoDescription: "Generieren Sie zufällige UUID v4 / GUID Identifikatoren online.",
      description: "Erzeugen Sie eindeutige Identifikatoren (UUIDs).",
      quickAnswer: "Erzeugt kryptografisch sichere 128-Bit UUID v4 Strings.",
      seoHowToUse: "1. Anzahl der IDs wählen.\n2. Auf Generieren klicken.\n3. UUIDs in die Zwischenablage kopieren.",
      seoHowItWorks: "Verwendet crypto.randomUUID() des Browsers.",
      formula: "Format = xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx",
      seoExample: "Erzeugt beispielsweise: f47ac10b-58cc-4372-a567-0e02b2c3d479.",
      faqs: [
        { q: "Welche UUID-Version wird von diesem Generator erzeugt?", a: "Er generiert standardkonforme UUIDs der Version 4 (UUID v4) basierend auf kryptografisch sicheren Zufallswerten der Web Crypto API." },
        { q: "Wie hoch ist das Risiko von Kollisionen (doppelten IDs) bei UUID v4?", a: "Praktisch ausgeschlossen: Bei 2^122 möglichen Zufallskombinationen müsste man über Milliarden Jahre hinweg jede Sekunde Milliarden IDs erzeugen, um eine Dublette zu provozieren." },
        { q: "Wie ist ein UUID v4 standardmäßig formatiert?", a: "Er besteht aus 32 Hexadezimalzeichen, aufgeteilt in fünf Blöcke im Format 8-4-4-4-12 (insgesamt 36 Zeichen mit Bindestrichen)." },
        { q: "Können mehrere UUIDs auf einmal und ohne Bindestriche generiert werden?", a: "Ja, Sie können beliebig viele IDs in einem Durchgang erzeugen und Formatoptionen wie Groß-/Kleinschreibung oder Weglassen von Bindestrichen wählen." },
        { q: "Wofür werden UUIDs in der Softwareentwicklung eingesetzt?", a: "Als verteilte Primärschlüssel in Datenbanken, für API-Transaktions-IDs, Session-Identifier und in Microservices-Architekturen." }
      ]
    },
    fr: {
      name: "Générateur de UUID / GUID",
      seoTitle: "Générateur de UUID v4 Gratuit | HelloTools",
      seoDescription: "Générez des identifiants uniques universels (UUID v4 / GUID) aléatoires.",
      description: "Générez des identifiants uniques sécurisés.",
      quickAnswer: "Génère des chaînes d'identifiant UUID v4 conformes aux normes RFC 4122.",
      seoHowToUse: "1. Choisissez la quantité.\n2. Cliquez sur Générer.\n3. Copiez les UUID.",
      seoHowItWorks: "Utilise l'API cryptographique sécurisée crypto.randomUUID().",
      formula: "Format UUID v4 = xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx",
      seoExample: "Exemple généré : c9bf9e57-1685-4c89-bafb-ff5af830be8a.",
      faqs: [
        { q: "Quelle version d'identifiant UUID est générée par cet outil ?", a: "Il génère des identifiants uniques universels UUID version 4 (v4) générés via l'entropie cryptographique du navigateur." },
        { q: "Quelle est la probabilité d'obtenir une collision entre deux UUID v4 ?", a: "Mathématiquement nulle au regard des applications réelles : l'espace d'adressage compte plus de 5,3 × 10^36 combinaisons uniques." },
        { q: "Quelle est la structure canonique d'un UUID v4 ?", a: "Il est composé de 32 chiffres hexadécimaux répartis en 5 sections séparées par des tirets au format standard 8-4-4-4-12 (36 caractères)." },
        { q: "Peut-on générer des lots d'identifiants avec options de casse ?", a: "Oui, vous pouvez exporter des séries de clés en majuscules ou minuscules, avec ou sans tirets de séparation." },
        { q: "Quels sont les cas d'usage courants des UUID ?", a: "Clés primaires dans les bases de données réparties (PostgreSQL, MongoDB), identifiants d'événements et jetons de corrélation d'API." }
      ]
    },
    pt: {
      name: "Gerador de UUID / GUID",
      seoTitle: "Gerador de UUID v4 (IDs Únicos Aleatórios) | HelloTools",
      seoDescription: "Gere identificadores únicos universais (UUID v4 / GUID) aleatórios.",
      description: "Gere IDs aleatórios seguros para seus projetos.",
      quickAnswer: "Gera identificadores alfanuméricos de 128 bits criptograficamente seguros.",
      seoHowToUse: "1. Escolha a quantidade de UUIDs desejada.\n2. Clique em Gerar.\n3. Copie para a área de transferência.",
      seoHowItWorks: "Processa a geração usando a API nativa crypto.randomUUID().",
      formula: "UUID v4 = xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx",
      seoExample: "Exemplo: 550e8400-e29b-41d4-a716-446655440000.",
      faqs: [
        { q: "Qual versão de identificador UUID esta ferramenta produz?", a: "Gera identificadores globais exclusivos UUID versão 4 (UUID v4) baseados na API de números pseudoaleatórios criptográficos do navegador." },
        { q: "Existe perigo de dois UUIDs v4 gerados coincidirem (colisão)?", a: "A probabilidade é virtualmente nula (1 em mais de 5 sextilhões de combinações possíveis), assegurando unicidade universal." },
        { q: "Qual o formato padrão oficial de um UUID v4?", a: "Apresenta 32 caracteres hexadecimais distribuídos no esquema canônico 8-4-4-4-12 com hífens delimitadores (total de 36 caracteres)." },
        { q: "A ferramenta permite gerar dezenas de UUIDs em lote?", a: "Sim. É possível gerar centenas de chaves simultâneas com formatação em letras maiúsculas ou minúsculas e remoção opcional de hífens." },
        { q: "Para que servem UUIDs no desenvolvimento de sistemas?", a: "São empregados como chaves primárias em bancos de dados relacionais e NoSQL, rastreamento de requisições em microsserviços e tokens de transação." }
      ]
    },
    ja: {
      name: "UUID / GUID 自動生成ツール",
      seoTitle: "UUID v4 生成ツール — ランダム一意ID作成 | HelloTools",
      seoDescription: "重複しないユニークIDである UUID v4（GUID）をブラウザの暗号学的乱数を用いて一括生成します。",
      description: "128ビットのユニーク識別子（UUID v4）を生成します。",
      quickAnswer: "暗号学的に安全なランダム一意識別子（UUID v4）を一括生成します。",
      seoHowToUse: "1. 生成個数（1個〜100個）を指定します。\n2. 大文字/小文字やハイフン有無を選択します。\n3. 「生成」を押してコピーします。",
      seoHowItWorks: "ブラウザ標準の Web Crypto API (crypto.randomUUID()) で処理します。",
      formula: "UUID v4 = xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx",
      seoExample: "「b8d8108c-69e1-4c6e-a204-6330416e885c」のようなIDが生成されます。",
      faqs: [
        { q: "このツールが生成するUUIDのバージョンと仕組みは？", a: "暗号学的に安全な乱数（Web Crypto API）に基づいて生成される標準的な「UUIDバージョン4（UUID v4）」を出力します。" },
        { q: "UUID v4でIDが偶然重複（衝突）する確率はどれくらいですか？", a: "重複の確率は天文学的にゼロに近く、2の122乗通り（約5.3×10^36通り）の組み合わせが存在するため実用上の重複リスクはありません。" },
        { q: "UUID v4の標準的なフォーマット構造はどうなっていますか？", a: "32桁の16進数をハイフンで区切った「8-4-4-4-12」の形式（全36文字、例：123e4567-e89b-42d3-a456-426614174000）で表現されます。" },
        { q: "ハイフンなしや大文字での一括生成に対応していますか？", a: "対応しています。複数個のUUIDの一括生成や、大文字表記・ハイフン除去などシステム仕様に合わせた出力切り替えが可能です。" },
        { q: "どのようなシステム開発用途でUUIDが活用されますか？", a: "データベースの主キー（Primary Key）、分散システムのトランザクションID、セッション識別子、ファイル命名などで広く利用されます。" }
      ]
    }
  },

  'dice-roller': {
    es: {
      name: "Generador de Dados y Tirada Virtual",
      seoTitle: "Generador de Dados Online (d6, d20, d100) | HelloTools",
      seoDescription: "Lanza dados virtuales al azar para juegos de mesa, rol (D&D) y sorteos.",
      description: "Lanza dados virtuales (d6, d10, d20) para tus juegos.",
      quickAnswer: "Genera resultados aleatorios simulando el lanzamiento de dados de 6, 20 o 100 caras.",
      seoHowToUse: "1. Selecciona el tipo de dado (d4, d6, d10, d20, d100).\n2. Elige la cantidad de dados.\n3. Pulsa Lanzar Dados.",
      seoHowItWorks: "Utiliza aleatoriedad segura Math.random().",
      formula: "Dado = Math.floor(Math.random() * Lados) + 1",
      seoExample: "Lanzar un dado d20 genera un resultado aleatorio entre 1 y 20.",
      faqs: [
        { q: "¿Qué tipos de dados se pueden lanzar con este simulador?", a: "Admite dados poliédricos clásicos de rol: d4, d6, d8, d10, d12, d20 y d100 (dado porcentual), además de dados estándar de seis caras para juegos de mesa." },
        { q: "¿Es la tirada verdaderamente aleatoria y sin sesgo?", a: "Sí. Utiliza la entropía criptográfica del navegador (crypto.getRandomValues), asegurando que cada cara del dado tenga exactamente la misma probabilidad matemática de salir." },
        { q: "¿Sirve para juegos de rol de mesa como Dungeons & Dragons (D&D) o Pathfinder?", a: "Es perfecto para D&D y juegos de rol, permitiendo tirar tiradas de ataque con d20, pruebas de salvación, daño de armas y tiradas porcentuales d100." },
        { q: "¿Puedo lanzar varios dados a la vez y sumar modificadores?", a: "Sí. Puedes seleccionar la cantidad de dados (ej. 3d6 o 2d20) y visualizar tanto el resultado individual de cada dado como la suma total acumulada." },
        { q: "¿Se guarda el historial de tiradas en algún servidor?", a: "No. Las tiradas se muestran en tu pantalla de forma inmediata sin que ningún resultado se guarde en bases de datos externas." }
      ]
    },
    de: {
      name: "Würfel-Simulatur (Dice Roller)",
      seoTitle: "Online Würfel Simulatur (W6, W20, W100) | HelloTools",
      seoDescription: "Würfeln Sie online virtuelle Würfel für Brettspiele und Rollenspiele (D&D).",
      description: "Virtuelle Würfel (W6, W20) für Spiele online werfen.",
      quickAnswer: "Simuliert das Werfen von Würfeln mit frei wählbarer Seitenanzahl.",
      seoHowToUse: "1. Würfeltyp (W6, W20 etc.) wählen.\n2. Anzahl angeben.\n3. Auf Würfeln klicken.",
      seoHowItWorks: "Generiert Zufallswerte zwischen 1 und den Würfelseiten.",
      formula: "Würfel = Math.floor(Math.random() * Seiten) + 1",
      seoExample: "Ein W6-Wurf ergibt eine Zufallszahl von 1 bis 6.",
      faqs: [
        { q: "Welche Würfeltypen können gewürfelt werden?", a: "Der Simulator unterstützt alle klassischen Rollenspiel-Würfel: W4, W6, W8, W10, W12, W20 und W100 sowie mehrfache Standardwürfel." },
        { q: "Sind die Würfelergebnisse mathematisch fair und unparteiisch?", a: "Ja, dank der kryptografisch sicheren Zufallsquelle des Browsers entspricht die Wahrscheinlichkeit jeder Augenzahl exakt der eines perfekten physischen Würfels." },
        { q: "Eignet sich das Tool für Pen & Paper Rollenspiele wie D&D oder Das Schwarze Auge?", a: "Optimal geeignet für Angriffs-, Rettungs- und Fertigkeitswürfe in D&D, DSA, Shadowrun und Pathfinder." },
        { q: "Kann man mehrere Würfel gleichzeitig werfen?", a: "Ja, Sie können beliebige Würfelkombinationen (z. B. 4W6) werfen und Einzelergebnisse sowie Gesamtsummen auf einen Blick erfassen." },
        { q: "Werden Würfelergebnisse protokolliert?", a: "Nein, alle Würfe erfolgen rein temporär auf Ihrem Bildschirm ohne Datenspeicherung." }
      ]
    },
    fr: {
      name: "Lanceur de Dés Virtuels",
      seoTitle: "Lanceur de Dés Virtuels en Ligne (d6, d20) | HelloTools",
      seoDescription: "Lancez des dés virtuels aléatoires pour vos jeux de société et jeux de rôle.",
      description: "Lancez des dés virtuels (d6, d20) en ligne.",
      quickAnswer: "Simule le tirage de dés à 6, 10, 20 ou 100 faces.",
      seoHowToUse: "1. Sélectionnez le dé (d4, d6, d20).\n2. Indiquez le nombre de dés.\n3. Cliquez sur Lancer.",
      seoHowItWorks: "Utilise le générateur aléatoire équitable du navigateur.",
      formula: "Dé = Math.floor(Math.random() * Faces) + 1",
      seoExample: "Un lancer de d6 donne un chiffre au hasard entre 1 et 6.",
      faqs: [
        { q: "Quels types de dés ce simulateur virtuel permet-il de lancer ?", a: "Il prend en charge tous les dés polyédriques de jeux de rôle : d4, d6, d8, d10, d12, d20 et d100 (dé de pourcentage)." },
        { q: "Les lancers sont-ils véritablement aléatoires et équitables ?", a: "Oui. Le générateur repose sur l'API cryptographique locale du navigateur, garantissant une équiprobabilité parfaite pour chaque face." },
        { q: "Est-il adapté aux parties de jeux de rôle comme Donjons & Dragons ?", a: "Idéal pour les tests de caractéristiques sur d20, jets de dégâts d'armes et tirages de compétences sous D&D ou Call of Cthulhu." },
        { q: "Peut-on jeter plusieurs dés en même temps ?", a: "Oui, vous pouvez lancer simultanément une poignée de dés (ex. 3d6 ou 2d10) et consulter les tirages individuels ainsi que la somme globale." },
        { q: "L'historique des lancers de dés est-il stocké ?", a: "Non, les résultats sont générés à la volée dans votre navigateur sans aucune persistance serveur." }
      ]
    },
    pt: {
      name: "Rolar Dados Virtual",
      seoTitle: "Rolar Dados Virtual Online (d6, d20, d100) | HelloTools",
      seoDescription: "Role dados virtuais aleatórios para jogos de tabuleiro, RPG e sorteios.",
      description: "Role dados virtuais (d6, d20) online para seus jogos.",
      quickAnswer: "Simula o arremesso de dados com múltiplos lados.",
      seoHowToUse: "1. Escolha o tipo de dado (d6, d20, d100).\n2. Selecione a quantidade.\n3. Clique em Rolar Dados.",
      seoHowItWorks: "Gera números aleatórios com probabilidade uniforme.",
      formula: "Dado = Math.floor(Math.random() * Lados) + 1",
      seoExample: "Rolar um dado d6 resulta em um número de 1 a 6.",
      faqs: [
        { q: "Quais dados poliédricos estão disponíveis no simulador?", a: "Oferece suporte aos dados clássicos de RPG: d4, d6, d8, d10, d12, d20 e d100, além de dados comuns de 6 faces para jogos de tabuleiro." },
        { q: "A rolagem dos dados é estritamente aleatória e imparcial?", a: "Sim. Utiliza a API de criptografia do sistema operacional para gerar resultados com probabilidade geométrica rigorosamente uniforme." },
        { q: "A ferramenta é adequada para mesas de RPG como D&D e Tormenta?", a: "Perfeita para jogadas de ataque no d20, testes de perícia, rolagens de dano e tabelas percentuais." },
        { q: "É possível rolar múltiplos dados simultaneamente?", a: "Sim. Você pode definir a quantidade de dados desejada (ex.: 4d6 para atributos) e conferir o resultado de cada dado e o somatório final." },
        { q: "Os resultados das rolagens ficam registrados no site?", a: "Não. Todas as rolagens acontecem de forma efêmera no seu próprio navegador." }
      ]
    },
    ja: {
      name: "サイコロ（サイコロ振り）ツール",
      seoTitle: "Webサイコロ（ダイスローラー） — 6面・20面・100面 | HelloTools",
      seoDescription: "ボードゲームやTRPG（D&D等）で使えるWebサイコロツールです。6面体、20面体、100面体ダイスなどを複数同時振り可能です。",
      description: "Web上でサイコロ（6面・20面等）を投げて乱数を出力します。",
      quickAnswer: "画面上でサイコロ（D6, D20, D100など）を振ってランダムな出目を表示します。",
      seoHowToUse: "1. サイコロの種類（6面、20面、100面等）を選択します。\n2. 個数を指定します。\n3. 「サイコロを振る」を押します。",
      seoHowItWorks: "面数に応じた均等確率の乱数生成ロジックで計算します。",
      formula: "出目 = Math.floor(Math.random() * 面数) + 1",
      seoExample: "6面サイコロを1個振ると、1から6までの出目がランダムに決定されます。",
      faqs: [
        { q: "このサイコロツールで振ることができるダイスの種類は？", a: "TRPGで定番の多面体ダイス（4面ダイスd4、6面d6、8面d8、10面d10、12面d12、20面d20、100面d100）およびボードゲーム用サイコロに対応しています。" },
        { q: "ダイスの出目のランダム性（公平性）は保証されていますか？", a: "はい。ブラウザの暗号論的乱数生成APIを使用しており、物理的なサイコロの重心の偏りすらない数学的に完全公平な確率で出目を決定します。" },
        { q: "ダンジョンズ＆ドラゴンズ（D&D）やクトゥルフ神話TRPGで使えますか？", a: "はい。D&Dのd20判定やクトゥルフのd100技能ロール、戦闘のダメージダイスロールにそのままご利用いただけます。" },
        { q: "複数のサイコロを同時に振って合計値を出すことはできますか？", a: "可能です。「3d6（6面ダイス3個）」のように複数個のダイスを一度に振り、個別の出目と合計値を瞬時に算出します。" },
        { q: "サイコロの出目履歴が外部に送信されることはありますか？", a: "いいえ。すべてのダイスロール処理はお使いのブラウザ内部で完結し、外部送信は一切ありません。" }
      ]
    }
  },

  'hash-generator': {
    es: {
      name: "Generador de Hash (MD5, SHA-256)",
      seoTitle: "Generador de Hash Online (MD5, SHA-1, SHA-256, SHA-512) | HelloTools",
      seoDescription: "Genera firmas digitales Hash en algoritmos SHA-256, SHA-512, SHA-1 y MD5.",
      description: "Genera hashes de texto en SHA-256, SHA-512 y MD5.",
      quickAnswer: "Calcula huellas digitales criptográficas unidireccionales (Hashes) para textos.",
      seoHowToUse: "1. Escribe o pega tu texto.\n2. Selecciona el algoritmo criptográfico (SHA-256, SHA-512).\n3. Copia el Hash resultante.",
      seoHowItWorks: "Utiliza Web Crypto API para SHA y algoritmos de resumen de datos.",
      formula: "Hash = WebCrypto.subtle.digest(\"SHA-256\", data)",
      seoExample: "El hash SHA-256 de \"hello\" es 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824.",
      faqs: [
        { q: "¿Qué algoritmos criptográficos calcula este generador de hash?", a: "Calcula resúmenes hash de las familias MD5, SHA-1, SHA-256, SHA-384 y SHA-512 directamente en tu navegador web." },
        { q: "¿Para qué se utiliza la verificación de hash en informática?", a: "Se utiliza para comprobar la integridad de archivos descargados (verificando que no han sido alterados ni corrompidos) y en firmas digitales." },
        { q: "¿Es seguro utilizar MD5 o SHA-1 para almacenar contraseñas?", a: "No. MD5 y SHA-1 están computacionalmente vulnerados para contraseñas. Para almacenar claves se deben usar algoritmos con coste adaptativo como bcrypt, Argon2 o scrypt." },
        { q: "¿Se transmiten mis datos o textos a servidores al generar el hash?", a: "No. Toda la computación de hash se efectúa localmente en tu navegador web utilizando la Web Crypto API nativa." },
        { q: "¿Cuál es la diferencia entre MD5 y SHA-256?", a: "MD5 genera un hash de 128 bits (32 caracteres hexadecimales) y es vulnerable a colisiones. SHA-256 genera 256 bits (64 caracteres) y es el estándar de seguridad industrial actual." }
      ]
    },
    de: {
      name: "Hash-Generator (SHA-256, MD5)",
      seoTitle: "Hash Generator — SHA-256, SHA-512 & MD5 Erzeugen | HelloTools",
      seoDescription: "Generieren Sie kryptografische Hashes (SHA-256, SHA-512, MD5) im Browser.",
      description: "Kryptografische Hashes aus Texten erzeugen.",
      quickAnswer: "Berechnet eindeutige kryptografische Prüfsummen (Hashes) für Text.",
      seoHowToUse: "1. Text eingeben.\n2. Hash-Algorithmus wählen.\n3. Hash-String kopieren.",
      seoHowItWorks: "Nützt die Web Crypto API des Browsers.",
      formula: "Hash = Crypto.subtle.digest(\"SHA-256\")",
      seoExample: "SHA-256 von \"hello\" ergibt eine 64-stellige Hex-Prüfsumme.",
      faqs: [
        { q: "Welche kryptografischen Hash-Funktionen werden unterstützt?", a: "Er generiert Prüfsummen nach MD5, SHA-1, SHA-256, SHA-384 und SHA-512 verzögerungsfrei im Browser." },
        { q: "Wozu dienen kryptografische Hashwerte in der Praxis?", a: "Zur Verifizierung der Datei-Integrität nach Downloads, zur Erkennung von Datenveränderungen und in digitalen Zertifikaten." },
        { q: "Eignen sich MD5 oder SHA-1 zum Speichern von Benutzerpasswörtern?", a: "Auf keinen Fall. MD5 und SHA-1 sind anfällig für Kollisionsangriffe. Für Passwörter sind moderne KDFs wie bcrypt, scrypt oder Argon2 zwingend erforderlich." },
        { q: "Werden eingegebene Texte oder Passwörter über das Internet versendet?", a: "Nein, die Hash-Berechnung läuft vollständig lokal über die hardwarebeschleunigte Web Crypto API Ihres Browsers." },
        { q: "Was unterscheidet SHA-1 von SHA-256?", a: "SHA-1 erzeugt einen 160-Bit-Hash und gilt als unsicher. SHA-256 erzeugt einen 256-Bit-Hash und ist der globale Industriestandard für sichere Prüfsummen." }
      ]
    },
    fr: {
      name: "Générateur de Hash (SHA-256, MD5)",
      seoTitle: "Générateur de Hash en Ligne (SHA-256, SHA-512) | HelloTools",
      seoDescription: "Générez des empreintes numériques Hash (SHA-256, SHA-512, MD5).",
      description: "Générez des empreintes cryptographiques pour vos textes.",
      quickAnswer: "Calcule l'empreinte numérique cryptographique d'une chaîne de caractères.",
      seoHowToUse: "1. Tapez votre texte.\n2. Choisissez l'algorithme SHA.\n3. Copiez le résultat.",
      seoHowItWorks: "S'appuie sur la bibliothèque Web Crypto sécurisée.",
      formula: "Hash = crypto.subtle.digest(\"SHA-256\")",
      seoExample: "Le SHA-256 du mot \"hello\" produit une chaîne hexadécimale unique.",
      faqs: [
        { q: "Quels algorithmes de hachage ce générateur prend-il en charge ?", a: "Il calcule les empreintes cryptographiques selon les standards MD5, SHA-1, SHA-256, SHA-384 et SHA-512." },
        { q: "À quoi servent les sommes de contrôle (hashs) en sécurité informatique ?", a: "Elles permettent de vérifier l'intégrité des logiciels téléchargés en garantissant qu'ils n'ont pas été corrompus ou modifiés par un tiers." },
        { q: "Les algorithmes MD5 et SHA-1 sont-ils sûrs pour les mots de passe ?", a: "Non, ils sont obsolètes face aux attaques modernes. La sécurisation des mots de passe exige des fonctions de dérivation lentes comme bcrypt ou Argon2." },
        { q: "Le texte haché est-il envoyé vers un serveur distant ?", a: "Non. Tout le calcul cryptographique s'exécute localement sur votre poste grâce à l'API Web Crypto standard." },
        { q: "Quelle est la différence entre une empreinte SHA-256 et SHA-512 ?", a: "SHA-256 produit une empreinte de 64 caractères hexadécimaux (256 bits), tandis que SHA-512 offre 128 caractères (512 bits) pour une sécurité renforcée." }
      ]
    },
    pt: {
      name: "Gerador de Hash (SHA-256, MD5)",
      seoTitle: "Gerador de Hash Online — SHA-256, SHA-512, MD5 | HelloTools",
      seoDescription: "Gere hashes criptográficos (SHA-256, SHA-512, MD5) para textos instantaneamente.",
      description: "Gere hashes de texto em SHA-256 e MD5.",
      quickAnswer: "Gera resumos criptográficos unidirecionais a partir de um texto.",
      seoHowToUse: "1. Digite seu texto.\n2. Selecione o algoritmo criptográfico.\n3. Copie o Hash gerado.",
      seoHowItWorks: "Calcula o hash usando a Web Crypto API.",
      formula: "Hash = crypto.subtle.digest(\"SHA-256\")",
      seoExample: "O hash SHA-256 de \"hello\" gera uma chave fixa de 64 caracteres.",
      faqs: [
        { q: "Quais funções de hash criptográfico a ferramenta disponibiliza?", a: "Calcula hashes das famílias MD5, SHA-1, SHA-256, SHA-384 e SHA-512 em tempo real." },
        { q: "Para que servem os códigos de hash no dia a dia?", a: "Servem para checagem de integridade de arquivos baixados da internet, verificação de dados e assinaturas digitais de segurança." },
        { q: "É seguro utilizar MD5 ou SHA-1 para gravar senhas de usuários?", a: "Não. Ambos são algoritmos obsoletos para senhas devido à vulnerabilidade a colisões. Recomenda-se o uso de bcrypt ou Argon2." },
        { q: "Os textos informados para gerar o hash são enviados para algum servidor?", a: "Não. Toda a geração de hash ocorre estritamente no navegador do usuário por meio da Web Crypto API." },
        { q: "Qual a diferença entre MD5 e SHA-256?", a: "O MD5 gera 128 bits (32 caracteres hexadecimais), enquanto o SHA-256 produz 256 bits (64 caracteres) com segurança militar de padrão internacional." }
      ]
    },
    ja: {
      name: "ハッシュ関数生成ツール（SHA-256 / MD5）",
      seoTitle: "ハッシュ値生成ツール — SHA-256・SHA-512・MD5 | HelloTools",
      seoDescription: "テキストから暗号学的ハッシュ値（SHA-256, SHA-512, SHA-1, MD5）をブラウザ上で高速計算生成します。",
      description: "テキストから暗号ハッシュ値（SHA-256、MD5等）を生成します。",
      quickAnswer: "入力テキストから暗号学的ハッシュ値（SHA-256やMD5など）を算出します。",
      seoHowToUse: "1. テキストを入力します。\n2. 暗号アルゴリズム（SHA-256 / SHA-512 / MD5）を選択します。\n3. 生成されたハッシュ文字列をコピーします。",
      seoHowItWorks: "Web Crypto API (crypto.subtle.digest) を使用して安全に計算します。",
      formula: "Hash = crypto.subtle.digest(\"SHA-256\", text)",
      seoExample: "「hello」のSHA-256ハッシュ値は 64文字の固定長16進数文字列となります。",
      faqs: [
        { q: "このハッシュ生成ツールが対応しているアルゴリズムは？", a: "MD5、SHA-1、SHA-256、SHA-384、SHA-512の主要な暗号学的ハッシュ関数のリアルタイム生成に対応しています。" },
        { q: "ハッシュ値（チェックサム）はどのような場面で利用されますか？", a: "ダウンロードしたファイルが破損や改ざんされていないかの完全性確認、デジタル署名、Gitなどのバージョン管理で利用されます。" },
        { q: "MD5やSHA-1をパスワード保存のハッシュ化に使っても安全ですか？", a: "安全ではありません。MD5やSHA-1は衝突攻撃への脆弱性が実証されているため、パスワード保護にはbcryptやArgon2などの安全な専用方式が必須です。" },
        { q: "入力した平文テキストが外部サーバーに送信されることはありますか？", a: "ありません。ブラウザ標準のWeb Crypto APIを用いてお使いの端末ローカルでハッシュ値を算出するため、機密情報も安全です。" },
        { q: "SHA-256とMD5の違いは何ですか？", a: "MD5は128ビット（32文字の16進数）、SHA-256は256ビット（64文字の16進数）を出力し、現在最も安全な標準規格としてSHA-256が広く利用されています。" }
      ]
    }
  },

  'regex-tester': {
    es: {
      name: "Probador de Expresiones Regulares (Regex)",
      seoTitle: "Probador de Expresiones Regulares (Regex Tester) | HelloTools",
      seoDescription: "Prueba y valida tus expresiones regulares (Regex) con resaltado en tiempo real.",
      description: "Prueba y valida tus patrones Regex en tiempo real.",
      quickAnswer: "Evalúa patrones de expresiones regulares sobre textos e identifica coincidencias.",
      seoHowToUse: "1. Introduce tu patrón Regex y banderas (g, i, m).\n2. Pega el texto de prueba.\n3. Observa las coincidencias resaltadas.",
      seoHowItWorks: "Aplica el motor RegExp nativo de JavaScript.",
      formula: "RegExp.exec() | String.matchAll()",
      seoExample: "El patrón [a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,} valida correos electrónicos.",
      faqs: [
        { q: "¿Qué dialecto de expresiones regulares utiliza este probador de regex?", a: "Utiliza el motor de expresiones regulares estándar ECMAScript (JavaScript), compatible con la gran mayoría de lenguajes de programación modernos." },
        { q: "¿Cómo compruebo si una cadena coincide con mi expresión regular?", a: "Introduce tu patrón de búsqueda en el campo de expresión regular y el texto en el panel inferior; las coincidencias y grupos de captura se resaltan en tiempo real mientras escribes." },
        { q: "¿Qué modificadores o banderas (flags) son compatibles?", a: "Soporta las banderas estándar: g (búsqueda global), i (insensible a mayúsculas), m (multilínea), s (dotAll para que el punto incluya saltos de línea) y u (Unicode)." },
        { q: "¿Es compatible la sintaxis con Python, PHP o Java?", a: "La mayoría de patrones comunes (clases de caracteres, cuantificadores, grupos) son directamente compatibles con re de Python, preg de PHP y java.util.regex." },
        { q: "¿Se envía mi patrón o el texto de prueba a algún servidor?", a: "No. Todo el motor de comprobación corre en JavaScript en tu propio navegador de forma 100% privada." }
      ]
    },
    de: {
      name: "Regex-Prüfer (Regex Tester)",
      seoTitle: "Regex Tester — Reguläre Ausdrücke Online Prüfen | HelloTools",
      seoDescription: "Testen und validieren Sie reguläre Ausdrücke (Regex) mit Live-Hervorhebung.",
      description: "Reguläre Ausdrücke (Regex) direkt im Browser testen.",
      quickAnswer: "Validiert Regex-Muster gegen Testtexte mit visueller Vorschau.",
      seoHowToUse: "1. Regex-Muster und Flags (g, i) eingeben.\n2. Testtext einfügen.\n3. Treffer in Echtzeit sehen.",
      seoHowItWorks: "Führt die JavaScript RegExp Engine aus.",
      formula: "Match = text.match(new RegExp(pattern, flags))",
      seoExample: "\\d+ findet alle Zahlen in einem Text.",
      faqs: [
        { q: "Welche Regex-Syntax verwendet dieser Tester?", a: "Er nutzt die standardmäßige ECMAScript-RegExp-Engine von JavaScript, die zu den meisten modernen Web-Programmiersprachen kompatibel ist." },
        { q: "Wie teste ich, ob mein regulärer Ausdruck auf den Zieltext zutrifft?", a: "Geben Sie das Regex-Muster und Ihren Testtext ein; Übereinstimmungen (Matches) und Erfassungsgruppen werden in Echtzeit farbig hervorgehoben." },
        { q: "Welche Regex-Flags (Modifikatoren) werden unterstützt?", a: "Unterstützt werden alle Standard-Flags: g (global), i (Groß-/Kleinschreibung ignorieren), m (mehrzeilig), s (Punkt schließt Zeilenumbrüche ein) und u (Unicode)." },
        { q: "Sind die erstellten Ausdrücke in Python oder PHP lauffähig?", a: "Ja, gängige Regex-Konstrukte (Zeichenklassen, Quantifizierer, Lookaheads) funktionieren identisch in Pythons re-Modul und PHPs preg-Funktionen." },
        { q: "Bleiben meine Regex-Muster und Testdaten vertraulich?", a: "Ja, die Evaluierung geschieht ohne jeden Netzwerktransfer ausschließlich in Ihrem lokalen Browser." }
      ]
    },
    fr: {
      name: "Testeur de Regex",
      seoTitle: "Testeur de Expressions Régulières (Regex Tester) | HelloTools",
      seoDescription: "Testez et validez vos expressions régulières (Regex) en temps réel.",
      description: "Testez vos motifs Regex en direct.",
      quickAnswer: "Évalue des motifs d'expressions régulières et surligne les correspondances.",
      seoHowToUse: "1. Saisissez votre expression régulière.\n2. Collez le texte de test.\n3. Obtenez les correspondances.",
      seoHowItWorks: "Utilise l'analyseur JavaScript RegExp.",
      formula: "Matches = text.matchAll(regex)",
      seoExample: "Le motif \\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}\\b trouve les emails.",
      faqs: [
        { q: "Quel moteur d'expressions régulières est utilisé ?", a: "Il s'appuie sur le moteur d'expressions régulières standard ECMAScript de JavaScript, garantissant une compatibilité transversale." },
        { q: "Comment vérifier la concordance d'un motif regex ?", a: "Saisissez votre expression régulière et collez votre texte de test : les correspondances et groupes capturants sont surlignés en direct." },
        { q: "Quels drapeaux (flags) de modification sont disponibles ?", a: "Il prend en charge les options g (recherche globale), i (insensible à la casse), m (mode multiligne), s (le point inclut les retours à la ligne) et u (support Unicode)." },
        { q: "Ce testeur est-il utilisable pour valider du code Python ou Java ?", a: "Oui, les structures usuelles (classes, quantificateurs, assertions) sont interchangeables avec les bibliothèques d'expressions régulières de ces langages." },
        { q: "Mes données de test sont-elles transmises sur le réseau ?", a: "Non, le test syntaxique est entièrement exécuté en local dans la mémoire de votre navigateur." }
      ]
    },
    pt: {
      name: "Testador de Regex",
      seoTitle: "Testador de Expressões Regulares (Regex Tester) | HelloTools",
      seoDescription: "Teste e valide suas expressões regulares (Regex) com destaque em tempo real.",
      description: "Valide padrões Regex em tempo real.",
      quickAnswer: "Testa expressões regulares em textos destacando os resultados encontrados.",
      seoHowToUse: "1. Insira seu padrão Regex e flags.\n2. Cole o texto de teste.\n3. Veja os resultados destacados.",
      seoHowItWorks: "Processa via motor RegExp do navegador.",
      formula: "Match = texto.matchAll(new RegExp(pattern, flags))",
      seoExample: "\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2} valida o formato de CPF.",
      faqs: [
        { q: "Qual padrão de expressões regulares este testador adota?", a: "Utiliza o mecanismo padrão ECMAScript do JavaScript, amplamente compatível com os principais ambientes de programação web." },
        { q: "Como testar se uma regex localiza os trechos desejados?", a: "Digite a expressão regular e insira seu texto de teste; as correspondências encontradas e grupos de captura são destacados na tela em tempo real." },
        { q: "Quais modificadores (flags) de regex são suportados?", a: "Suporta os modificadores g (busca global), i (insensível a maiúsculas), m (multilinha), s (ponto casa quebras de linha) e u (suporte Unicode completo)." },
        { q: "Os padrões testados funcionam em Python, PHP ou C#?", a: "Sim, a sintaxe básica de quantificadores, âncoras e classes de caracteres funciona de forma idêntica nessas linguagens." },
        { q: "Os textos ou códigos testados são enviados para terceiros?", a: "Não. A execução da regex ocorre estritamente dentro do seu navegador, com total proteção de dados." }
      ]
    },
    ja: {
      name: "正規表現（Regex）検証・テストツール",
      seoTitle: "正規表現（Regex）オンラインテスト・検証 | HelloTools",
      seoDescription: "正規表現パターン（Regex）を入力し、対象テキストに対するマッチング結果（一致箇所・グループ抽出）をリアルタイム表示・検証します。",
      description: "正規表現（Regex）のマッチングをリアルタイム検証します。",
      quickAnswer: "正規表現パターンとフラグ（g/i/m）を指定しテキストのマッチング箇所をリアルタイム強調表示します。",
      seoHowToUse: "1. 正規表現パターンとフラグ（g, i, m）を入力します。\n2. テスト対象のテキストを入力します。\n3. マッチした箇所とキャプチャグループを確認します。",
      seoHowItWorks: "JavaScript標準の RegExp エンジンでパターン評価します。",
      formula: "Matches = text.matchAll(new RegExp(pattern, flags))",
      seoExample: "メールアドレス検出パターン `[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}` をテストできます。",
      faqs: [
        { q: "この正規表現テスターはどの正規表現エンジン（方言）に対応していますか？", a: "JavaScript標準のECMAScript正規表現エンジンを使用しており、Web開発をはじめPythonやPHP、Javaなど主要言語と高い互換性を持ちます。" },
        { q: "正規表現が意図通りマッチしているかどう確認できますか？", a: "正規表現パターンとテスト文字列を入力すると、マッチした箇所やキャプチャグループがリアルタイムに色分けハイライト表示されます。" },
        { q: "利用可能な正規表現フラグ（修飾子）には何がありますか？", a: "g（全域一致・グローバルマッチ）、i（大文字・小文字を無視）、m（複数行モード）、s（ドットが改行にも一致）、u（Unicodeモード）に対応しています。" },
        { q: "PythonやPHP、Javaの正規表現テストにも使えますか？", a: "文字クラス、量指定子、肯定先読みなど一般的な正規表現文法はそのまま活用可能です。" },
        { q: "入力したテストデータが外部に送信・収集されることはありますか？", a: "いいえ。すべての正規表現マッチング処理はお使いのブラウザ上でローカル動作し、機密テストデータも安心してお試しいただけます。" }
      ]
    }
  },

  'student-loan-calculator': {
    es: {
      name: "Calculadora de Préstamos Estudiantiles",
      seoTitle: "Calculadora de Préstamos Estudiantiles | HelloTools",
      seoDescription: "Calcula la cuota mensual y el costo total de amortización de tu crédito educativo.",
      description: "Calcula los pagos mensuales de tu crédito para estudios.",
      quickAnswer: "Estima la cuota mensual de amortización de un préstamo para estudios universitarios.",
      seoHowToUse: "1. Introduce el saldo total del préstamo.\n2. Indica la tasa de interés anual.\n3. Selecciona el plazo de reembolso (ej. 10 años).",
      seoHowItWorks: "Aplica el sistema de amortización francesa de saldo constante.",
      formula: "Cuota = Monto * [r(1+r)^n] / [(1+r)^n - 1]",
      seoExample: "Un préstamo estudiantil de $30.000 al 5% a 10 años requiere $318/mes.",
      faqs: [
        { q: "¿Qué modalidades de préstamos estudiantiles se pueden simular?", a: "Permite simular préstamos universitarios a tipo fijo, créditos gubernamentales de estudios y préstamos educativos privados." },
        { q: "¿Incluye planes de amortización vinculados a ingresos futuros?", a: "Calcula la amortización tradicional a cuota fija. Los programas gubernamentales condicionados a ingresos siguen baremos normativos propios." },
        { q: "¿Cómo reducen los pagos adicionales el plazo de pago del crédito de estudios?", a: "Las aportaciones extraordinarias reducen directamente el saldo del capital, lo que disminuye los intereses devengados y acorta sustancialmente el plazo de liquidación." },
        { q: "¿Es válido el cálculo tanto para préstamos públicos como privados?", a: "Sí, siempre que se trate de préstamos con cuotas amortizables regulares y tasa de interés pactada." },
        { q: "¿Se contemplan los periodos de carencia o capitalización de intereses?", a: "Calcula la fase de amortización activa. Si durante los estudios se acumularon intereses sin pagar, introdúcelos sumados al capital inicial." }
      ]
    },
    de: {
      name: "Studienkreditrechner",
      seoTitle: "Studienkreditrechner — Raten & Zinsen Berechnen | HelloTools",
      seoDescription: "Berechnen Sie die monatliche Rückzahlungsrate für Ihren Studienkredit.",
      description: "Ermitteln Sie die Monatsrate für die Rückzahlung von Studienkrediten.",
      quickAnswer: "Errechnet die Rückzahlungsrate für Ausbildungs- und Studienkredite.",
      seoHowToUse: "1. Darlehensbetrag eingeben.\n2. Zinssatz eintragen.\n3. Rückzahlungsdauer wählen.",
      seoHowItWorks: "Berechnet die Annuitätenrate auf die Kreditsumme.",
      formula: "Monatsrate = Kredit * [i*(1+i)^n] / [(1+i)^n - 1]",
      seoExample: " Bei 30.000 € Darlehen (5 % Zins, 10 Jahre) beträgt die Rate ca. 318 €/Monat.",
      faqs: [
        { q: "Welche Studienkredite können mit dem Rechner modelliert werden?", a: "Der Rechner eignet sich für KfW-Studienkredite, Bildungskredite und private Studienfinanzierungen mit festem Tilgungsplan." },
        { q: "Werden einkommensabhängige Rückzahlungsmodelle unterstützt?", a: "Er bildet die standardmäßige Festbetragsannuität ab. Einkommensabhängige Rückzahlungen wie beim BAföG folgen abweichenden gesetzlichen Sonderregelungen." },
        { q: "Welchen Vorteil bringen Sondertilgungen beim Studienkredit?", a: "Jede außerplanmäßige Tilgung senkt sofort die Restschuld und mindert die künftige Zinslast spürbar." },
        { q: "Stimmt die Berechnung für staatliche und private Bildungsdarlehen?", a: "Ja, die mathematische Formel für die Tilgungsphase ist bei allen ratenbasierten Bildungskrediten identisch." },
        { q: "Wie werden aufgelaufene Zinsen aus der Karenzzeit behandelt?", a: "Aufgelaufene Zinsen aus der Studienphase, die dem Darlehen zugeschlagen wurden, sollten vorab zur Kreditsumme addiert werden." }
      ]
    },
    fr: {
      name: "Calculateur de Prêt Étudiant",
      seoTitle: "Calculateur de Prêt Étudiant et Remboursement | HelloTools",
      seoDescription: "Calculez les mensualités et le coût total de votre prêt étudiant.",
      description: "Calculez les mensualités de remboursement de votre crédit étudiant.",
      quickAnswer: "Calcule la mensualité et le coût global de financement d'un prêt études.",
      seoHowToUse: "1. Entrez le montant emprunté.\n2. Indiquez le taux d'intérêt.\n3. Choisissez la durée de remboursement.",
      seoHowItWorks: "Applique le calcul d'amortissement classique.",
      formula: "Mensualité = Emprunt * [r(1+r)^n] / [(1+r)^n - 1]",
      seoExample: "Pour 30 000 € empruntés à 5 % sur 10 ans, la mensualité est de 318 €/mois.",
      faqs: [
        { q: "Quels types de prêts étudiants peuvent être simulés ?", a: "Il prend en charge les prêts étudiants garantis par l'État et les crédits bancaires étudiants classiques en phase de remboursement." },
        { q: "Gère-t-il les remboursements proportionnels aux revenus futurs ?", a: "Il calcule l'échéancier standard à mensualité fixe. Les dispositifs indexés sur les revenus relèvent de règles administratives spécifiques." },
        { q: "Quel est le bénéfice d'un remboursement partiel anticipé ?", a: "Tout versement complémentaire vient directement amortir le capital restant dû, réduisant la durée du prêt et le coût total des intérêts." },
        { q: "Le calcul est-il identique pour les banques publiques et privées ?", a: "Oui, dès lors qu'il s'agit d'un crédit amortissable à mensualités constantes." },
        { q: "Comment intégrer la période de franchise totale ou partielle ?", a: "Le calcul s'applique à la phase d'amortissement. Si des intérêts ont été capitalisés durant la franchise, ajoutez-les au capital initial." }
      ]
    },
    pt: {
      name: "Calculadora de Financiamento Estudantil",
      seoTitle: "Calculadora de Financiamento Estudantil e FIES | HelloTools",
      seoDescription: "Calcule o valor das parcelas e o custo total do seu financiamento universitário.",
      description: "Simule as parcelas de reembolso do seu crédito universitário.",
      quickAnswer: "Calcula a parcela mensal para amortização de dívidas de financiamento estudantil.",
      seoHowToUse: "1. Digite o valor financiado.\n2. Insira a taxa de juros anual.\n3. Escolha o prazo em anos.",
      seoHowItWorks: "Utiliza o cálculo de amortização de parcelas fixas.",
      formula: "Parcela = Valor * [r(1+r)^n] / [(1+r)^n - 1]",
      seoExample: "Um saldo de R$ 30.000 a 5% a.a. em 10 anos fica em parcelas de R$ 318/mês.",
      faqs: [
        { q: "Quais tipos de financiamento estudantil podem ser simulados?", a: "Modela financiamentos estudantis bancários privados e contratos de crédito universitário com taxa fixa e parcelas regulares." },
        { q: "Considera regras de abatimento ou subsídio do FIES governamental?", a: "Apresenta a amortização financeira regular. Programas públicos com carência subsidiada ou retenção em folha seguem cronogramas legais próprios." },
        { q: "Como pagamentos extras abatem o tempo de quitação do empréstimo?", a: "Amortizações extraordinárias incidem diretamente sobre o saldo principal devedor, reduzindo o número de prestações e os juros futuros." },
        { q: "A precisão do cálculo atende a contratos universitários privados?", a: "Sim, segue os parâmetros de amortização bancária padrão adotados pelas instituições financeiras credenciadas." },
        { q: "Onde lançar os juros acumulados durante o período de faculdade?", a: "Se houve carência com capitalização de juros durante a graduação, lance o saldo total consolidado ao término do curso como capital inicial." }
      ]
    },
    ja: {
      name: "奨学金・教育ローン返済計算ツール",
      seoTitle: "奨学金返済シミュレーション — 月々返済額・利息 | HelloTools",
      seoDescription: "貸与型奨学金（第一種無利利・第二種有利子）や教育ローンの借入総額から、卒業後の毎月返済額と総利息額を計算します。",
      description: "奨学金や教育ローンの卒業後月々返済額をシミュレーションします。",
      quickAnswer: "奨学金や教育ローンの借入総額・金利から、卒業後の月々返済額を計算します。",
      seoHowToUse: "1. 借入総額（万円）を入力します。\n2. 年利（無利子の場合は0%）を指定します。\n3. 返済期間（年数/回数）を選択します。",
      seoHowItWorks: "元利均等返済方式（定額返済）で卒業後の返済額を求めます。",
      formula: "毎月返済額 = 借入金 * [r(1+r)^n] / [(1+r)^n - 1]",
      seoExample: "300万円を金利1%・20年返済（240回）で借りた場合、毎月の返済額は約13,800円です。",
      faqs: [
        { q: "どのような教育ローンや奨学金の返済計算に対応していますか？", a: "日本政策金融公庫の国の教育ローンや銀行の民間教育ローン、有利子の奨学金（日本学生支援機構JASSO第二種など）の返済試算に対応しています。" },
        { q: "所得連動返済方式の試算にも対応していますか？", a: "一定の月額を返済する元利均等返済方式を計算します。所得連動型返済は年収や家族構成によって毎年返済額が変わるため専用の試算が必要です。" },
        { q: "繰り上げ返済を行うとどのくらい返済期間が短縮されますか？", a: "繰り上げ返済した金額は全額が元金の返済に充てられるため、返済期間が短縮されるとともに将来支払うはずだった利息負担が消滅します。" },
        { q: "公的奨学金と民間銀行教育ローンの両方に使えますか？", a: "はい。元利均等返済の契約であれば、貸付主体を問わず月々の返済額と利息負担額を正確に算出できます。" },
        { q: "在学中の据置期間（利息のみ支払い期間）はどう扱いますか？", a: "元金の返済が始まる「卒業後の返済開始時点」における借入残高および返済期間を入力してシミュレーションを行ってください。" }
      ]
    }
  },

  'markdown-editor': {
    es: {
      name: "Editor y Vista Previa de Markdown",
      seoTitle: "Editor y Vista Previa de Markdown Online | HelloTools",
      seoDescription: "Escribe y visualiza formato Markdown en tiempo real con exportación a HTML.",
      description: "Escribe y previsualiza texto en formato Markdown al instante.",
      quickAnswer: "Edita texto con sintaxis Markdown y genera su vista previa HTML en tiempo real.",
      seoHowToUse: "1. Escribe tu texto en Markdown en el panel izquierdo.\n2. Visualiza el resultado renderizado en el panel derecho.\n3. Copia el HTML o el texto.",
      seoHowItWorks: "Renderiza la sintaxis Markdown a etiquetas HTML en tiempo real.",
      formula: "Markdown Parser -> HTML Render",
      seoExample: "Escribir # Titulo convierte la línea en un encabezado <h1>.",
      faqs: [
        { q: "¿Qué es Markdown y para qué sirve este editor en línea?", a: "Markdown es un lenguaje de marcado ligero que permite dar formato a texto plano mediante símbolos sencillos (como # para títulos o ** para negrita). Este editor permite redactar y previsualizar en tiempo real el resultado en HTML." },
        { q: "¿Es compatible con tablas, listas de tareas y bloques de código (GFM)?", a: "Sí. Admite GitHub Flavored Markdown (GFM), incluyendo tablas con alineación, listas de verificación (- [x]), tachado (~~texto~~) y bloques de código con resaltado sintáctico." },
        { q: "¿Puedo exportar o copiar el código HTML generado?", a: "Sí. Puedes copiar directamente el código HTML compilado listo para insertar en tu gestor de contenidos (WordPress, Ghost), o copiar el texto Markdown original." },
        { q: "¿Se guarda automáticamente el contenido redactado en el navegador?", a: "El editor mantiene el borrador en la memoria de la sesión local para evitar pérdidas accidentales, pero se aconseja guardar copias en archivos locales (.md)." },
        { q: "¿Se envía mi texto o documentación a servidores externos?", a: "No. El renderizado de Markdown a HTML se ejecuta en el motor JavaScript de tu propio navegador sin transferir ningún dato." }
      ]
    },
    de: {
      name: "Markdown-Editor",
      seoTitle: "Markdown Editor & Live Vorschau Online | HelloTools",
      seoDescription: "Schreiben und betrachten Sie Markdown-Texte in Echtzeit mit HTML-Export.",
      description: "Markdown-Texte schreiben und live im Browser ansehen.",
      quickAnswer: "Bietet Live-Vorschau und HTML-Umwandlung für Markdown-Syntax.",
      seoHowToUse: "1. Markdown im linken Fenster eingeben.\n2. Live-Vorschau rechts betrachten.\n3. HTML kopieren.",
      seoHowItWorks: "Wandelt Markdown-Syntax in HTML um.",
      formula: "Markdown -> HTML",
      seoExample: "**fett** wird zu <strong>fett</strong>.",
      faqs: [
        { q: "Was ist Markdown und wofür nutzt man diesen Online-Editor?", a: "Markdown ist eine einfache Auszeichnungssprache für formatierte Texte mittels Zeichen wie # für Überschriften oder ** für Fettdruck. Dieser Editor bietet eine Live-Vorschau in HTML." },
        { q: "Werden Tabellen, Aufgabenlisten und Code-Blöcke (GFM) unterstützt?", a: "Ja, der Editor unterstützt GitHub Flavored Markdown (GFM) inklusive Tabellen, Task-Listen (- [ ]), Durchstreichungen und Code-Blöcken mit Syntax-Hervorhebung." },
        { q: "Kann man den generierten HTML-Code direkt kopieren?", a: "Ja, Sie können sowohl den fertigen HTML-Code zur Einbindung in Blogs und Webseiten als auch den reinen Markdown-Quelltext mit einem Klick kopieren." },
        { q: "Speichert der Editor das Dokument bei Unterbrechungen automatisch?", a: "Ihre Eingaben bleiben für die Dauer der Browser-Sitzung lokal erhalten. Für dauerhafte Sicherungen empfiehlt sich das Speichern als lokale .md-Datei." },
        { q: "Werden Inhalte oder Notizen auf einem Webserver gespeichert?", a: "Nein, das Rendern von Markdown zu HTML geschieht ausnahmslos lokal im Browser unter vollem Schutz Ihrer Daten." }
      ]
    },
    fr: {
      name: "Éditeur Markdown",
      seoTitle: "Éditeur et Aperçu Markdown en Ligne | HelloTools",
      seoDescription: "Rédigez et prévisualisez du texte Markdown en direct avec export HTML.",
      description: "Rédigez et prévisualisez vos fichiers Markdown.",
      quickAnswer: "Permet de rédiger du texte structuré en Markdown avec rendu HTML instantané.",
      seoHowToUse: "1. Tapez du code Markdown.\n2. Obtenez le rendu visuel à droite.\n3. Obtenez le code HTML.",
      seoHowItWorks: "Convertit la syntaxe Markdown en balises HTML.",
      formula: "Markdown -> HTML Output",
      seoExample: "Un texte précédé de # devient un titre H1.",
      faqs: [
        { q: "Qu'est-ce que le Markdown et à quoi sert cet éditeur ?", a: "Markdown est une syntaxe simple permettant de structurer du texte brut à l'aide de balises discrètes (# pour les titres, ** pour le gras). Cet éditeur affiche le rendu HTML en direct." },
        { q: "Supporte-t-il les tableaux, listes de tâches et blocs de code (GFM) ?", a: "Oui. Il intègre le standard GitHub Flavored Markdown (GFM) avec tableaux, cases à cocher interactives, texte barré et coloration de code." },
        { q: "Peut-on exporter le résultat au format HTML ?", a: "Oui, vous pouvez copier le code HTML compilé pour l'intégrer dans un CMS (WordPress, Notion) ou copier le code source Markdown brut." },
        { q: "Le document rédigé est-il sauvegardé pendant la session ?", a: "Le texte est conservé dans le cache local de votre navigateur tant que l'onglet reste ouvert, évitant les pertes accidentelles." },
        { q: "Mes documents sont-ils stockés en ligne ?", a: "Non. Aucune ligne de votre texte n'est transmise à nos serveurs : la compilation s'opère en local." }
      ]
    },
    pt: {
      name: "Editor de Markdown",
      seoTitle: "Editor de Markdown com Pré-visualização Online | HelloTools",
      seoDescription: "Escreva e visualize código Markdown em tempo real com conversão para HTML.",
      description: "Escreva e pré-visualize textos em sintaxe Markdown.",
      quickAnswer: "Editor de texto com renderização em tempo real da linguagem Markdown.",
      seoHowToUse: "1. Escreva em Markdown no painel de edição.\n2. Veja o resultado formatado no painel visual.\n3. Copie o HTML.",
      seoHowItWorks: "Converte os marcadores Markdown em elementos HTML.",
      formula: "Markdown Parser -> HTML Engine",
      seoExample: "Escrever *itálico* gera o texto formatado em itálico.",
      faqs: [
        { q: "O que é Markdown e qual a finalidade deste editor?", a: "Markdown é uma linguagem simples de formatação que utiliza caracteres intuitivos para gerar textos estruturados. O editor oferece visualização simultânea em HTML em tempo real." },
        { q: "O editor aceita tabelas, caixas de seleção e blocos de código (GFM)?", a: "Sim. Suporta GitHub Flavored Markdown (GFM), permitindo criar tabelas estilizadas, checklists (- [x]), texto tachado e blocos de programação." },
        { q: "É possível copiar o código HTML já compilado?", a: "Sim. Você pode copiar tanto o HTML final renderizado para colar no seu blog ou site quanto o código Markdown original (.md)." },
        { q: "Os textos escritos ficam salvos na sessão do navegador?", a: "O conteúdo permanece salvo temporariamente na memória local da aba para prevenir perdas por recarregamento acidental." },
        { q: "O editor envia minhas anotações para algum servidor na internet?", a: "Não. Todo o processamento de compilação acontece internamente no seu computador com total sigilo." }
      ]
    },
    ja: {
      name: "Markdown（マークダウン）エディタ・リアルタイムプレビュー",
      seoTitle: "Markdownエディタ — リアルタイムプレビュー＆HTML変換 | HelloTools",
      seoDescription: "Markdown構文（見出し、太字、リスト、表、コードブロック）を入力し、レンダリング結果をリアルタイム表示・HTML出力します。",
      description: "Markdown記法のテキストをリアルタイムでプレビュー・HTML化します。",
      quickAnswer: "Markdown記法で入力された文章をリアルタイムで装飾プレビュー・HTML化します。",
      seoHowToUse: "1. 左側エディタにMarkdown文章を入力します。\n2. 右側のリアルタイムプレビューを確認します。\n3. 「HTMLをコピー」または「.mdを保存」を押します。",
      seoHowItWorks: "Markdownパーサーを用いてHTMLタグへ即時変換描画します。",
      formula: "Markdown -> HTML Parser Render",
      seoExample: "`# タイトル` と入力すると大見出し（<h1>）としてレンダリングされます。",
      faqs: [
        { q: "Markdown（マークダウン）とは何ですか？このエディタで何ができますか？", a: "Markdownは「#（見出し）」や「**（太字）」などの記号でプレーンテキストを素早く装飾できる軽量マークアップ言語です。本エディタではリアルタイムにHTMLプレビューを確認しながら執筆できます。" },
        { q: "表（テーブル）やチェックボックス、コードブロック（GFM）に対応していますか？", a: "はい。GitHub標準のGFM仕様に完全対応しており、テーブル記法、タスクリスト（- [ ]）、打ち消し線、プログラムのコードブロックを綺麗にレンダリングします。" },
        { q: "生成されたHTMLコードをコピーしてブログ等に貼り付けられますか？", a: "はい。変換されたHTMLソースコードをワンクリックでコピーでき、WordPressやはてなブログ、Webサイト制作に即座に活用できます。" },
        { q: "編集中のテキストはブラウザに自動保存されますか？", a: "ブラウザのセッションメモリ上で保持されるため、誤って別タブを開いても作業内容が維持されますが、大切な原稿は適宜ローカルファイルに保存してください。" },
        { q: "執筆した原稿やコードが外部サーバーに送信されることはありますか？", a: "いいえ。すべてのMarkdown変換処理はお使いのブラウザ内部のJavaScriptで完結し、一切データ送信されません。" }
      ]
    }
  },

  'lorem-ipsum-generator': {
    es: {
      name: "Generador de Lorem Ipsum",
      seoTitle: "Generador de Texto Lorem Ipsum (Párrafos y Palabras) | HelloTools",
      seoDescription: "Genera texto de relleno Lorem Ipsum por párrafos, frases o palabras.",
      description: "Genera texto simulado para maquetación y diseño.",
      quickAnswer: "Crea texto aleatorio en latín simulado para bocetos de diseño y maquetación.",
      seoHowToUse: "1. Selecciona la cantidad de párrafos o palabras.\n2. Elige si comenzar con \"Lorem ipsum dolor sit amet...\".\n3. Haz clic en Copiar.",
      seoHowItWorks: "Ensambla oraciones y párrafos a partir del texto clásico de Cicerón.",
      formula: "Lorem Generator",
      seoExample: "Generar 1 párrafo produce \"Lorem ipsum dolor sit amet, consectetur...\"",
      faqs: [
        { q: "¿Qué es el texto Lorem Ipsum y cuál es su función en diseño gráfico y maquetación?", a: "Lorem Ipsum es un texto de relleno estándar derivado de un texto en latín de Cicerón (45 a.C.) que se utiliza en diseño gráfico y desarrollo web para rellenar espacios y evaluar tipografías y maquetaciones sin distraerse con el contenido." },
        { q: "¿Puedo generar texto por párrafos, oraciones o número exacto de palabras?", a: "Sí. Puedes seleccionar la cantidad deseada de párrafos, frases o palabras exactas, con opción de iniciar o no con la clásica frase \"Lorem ipsum dolor sit amet...\"." },
        { q: "¿Tiene derechos de autor el texto Lorem Ipsum?", a: "No. El texto está en el dominio público y se puede utilizar libremente en proyectos comerciales, personales, impresos o digitales sin necesidad de atribución ni pago de licencias." },
        { q: "¿Se puede emplear para mockups de Figma, maquetas HTML y plantillas web?", a: "Es el estándar universal de la industria para wireframes en Figma, prototipos en Sketch, temas de WordPress y pruebas de maquetación CSS." },
        { q: "¿Se almacenan los textos generados en algún servidor?", a: "No. La generación del texto ficticio se efectúa al vuelo en tu propio navegador de forma instantánea." }
      ]
    },
    de: {
      name: "Lorem Ipsum Generator",
      seoTitle: "Lorem Ipsum Generator — Blindtext Erzeugen | HelloTools",
      seoDescription: "Generieren Sie Lorem Ipsum Blindtext nach Absätzen oder Wörteranzahl.",
      description: "Erzeugen Sie Platzhaltertext für Webdesign und Layouts.",
      quickAnswer: "Generiert klassischen lateinischen Blindtext für Design-Layouts.",
      seoHowToUse: "1. Anzahl der Absätze wählen.\n2. Auf Generieren klicken.\n3. Blindtext kopieren.",
      seoHowItWorks: "Stellt Absätze aus dem klassischen Lorem-Ipsum-Text zusammen.",
      formula: "Blindtext Generator",
      seoExample: "Generiert z.B. 3 Absätze druckfertigen Platzhaltertext.",
      faqs: [
        { q: "Was ist Lorem Ipsum und warum wird es im Design verwendet?", a: "Lorem Ipsum ist der klassische Blindtext der Druck- und Webbranche, basierend auf einem Text von Cicero (45 v. Chr.), um Schriftarten und Layouts neutral ohne inhaltliche Ablenkung zu testen." },
        { q: "Kann man Absätze, Sätze oder exakte Wortzahlen generieren?", a: "Ja, Sie können die gewünschte Textmenge flexibel nach Absätzen, Sätzen oder Wortanzahl festlegen und den typischen Eröffnungssatz optional wählen." },
        { q: "Ist Lorem Ipsum urheberrechtsfrei für kommerzielle Projekte nutzbar?", a: "Ja, der Text ist gemeinfrei (Public Domain) und darf ohne Einschränkungen oder Lizenzgebühren in kommerziellen Webseiten und Printdesigns verwendet werden." },
        { q: "Eignet sich der Blindtext für Figma-Mockups und Web-Templates?", a: "Ja, er ist das weltweit bevorzugte Platzhalter-Werkzeug für Designer in Figma, Sketch, Adobe XD und Webentwickler im Frontend-Bau." },
        { q: "Werden generierte Blindtexte gespeichert?", a: "Nein, die Textausgabe erfolgt rein lokal und verzögerungsfrei im Browser." }
      ]
    },
    fr: {
      name: "Générateur de Lorem Ipsum",
      seoTitle: "Générateur de Faux Texte Lorem Ipsum | HelloTools",
      seoDescription: "Générez du faux texte d'imprimerie Lorem Ipsum par paragraphes ou mots.",
      description: "Générez du texte de remplissage pour vos maquettes.",
      quickAnswer: "Génère du faux texte d'imprimerie pour tester la mise en page de vos sites.",
      seoHowToUse: "1. Choisissez le nombre de paragraphes.\n2. Générez le texte.\n3. Copiez le résultat.",
      seoHowItWorks: "Assemble des phrases issues du texte classique en latin.",
      formula: "Générateur Faux Texte",
      seoExample: "Produit du texte de démonstration pour maquettes.",
      faqs: [
        { q: "Qu'est-ce que le Lorem Ipsum et pourquoi est-il utilisé en mise en page ?", a: "Le Lorem Ipsum est le faux-texte standard de l'imprimerie et du web, adapté d'un traité de Cicéron, permettant de calibrer la typographie et la mise en page sans être influencé par le sens des mots." },
        { q: "Peut-on générer le texte par paragraphes, phrases ou nombre de mots ?", a: "Oui. Vous pouvez calibrer la longueur exacte en choisissant le nombre de paragraphes, de phrases ou de mots avec ou sans la formule d'ouverture traditionnelle." },
        { q: "Le texte Lorem Ipsum est-il libre de droits pour un usage commercial ?", a: "Oui. Il relève du domaine public et s'utilise librement dans toutes vos créations publicitaires, sites internet et maquettes sans redevance." },
        { q: "Est-il compatible avec les maquettes Figma et gabarits web ?", a: "Oui, c'est le texte de substitution incontournable pour les intégrateurs web, graphistes sous Figma et concepteurs de thèmes CMS." },
        { q: "La génération de faux-texte conserve-t-elle des données sur le serveur ?", a: "Non, le générateur fonctionne instantanément en local dans votre navigateur." }
      ]
    },
    pt: {
      name: "Gerador de Lorem Ipsum",
      seoTitle: "Gerador de Texto Lorem Ipsum (Falso Texto) | HelloTools",
      seoDescription: "Gere texto fictício Lorem Ipsum por parágrafos ou palavras para layouts.",
      description: "Gere texto fictício para testes de design e diagramação.",
      quickAnswer: "Gera texto de preenchimento para testes visuais de design e sites.",
      seoHowToUse: "1. Escolha o número de parágrafos desejado.\n2. Clique em Gerar.\n3. Copie o texto de exemplo.",
      seoHowItWorks: "Monta parágrafos do texto padrão de preenchimento.",
      formula: "Gerador de Texto Fictício",
      seoExample: "Gera parágrafos iniciando com \"Lorem ipsum dolor sit amet...\"",
      faqs: [
        { q: "O que é o texto Lorem Ipsum e por que ele é utilizado em design?", a: "Lorem Ipsum é o texto padrão de preenchimento tipográfico da indústria gráfica, baseado em Cícero (45 a.C.), usado para diagramar layouts focando na estética visual sem a distração do conteúdo real." },
        { q: "Posso gerar o texto por parágrafos, frases ou quantidade de palavras?", a: "Sim. Você pode escolher a quantidade exata de parágrafos, sentenças ou contagem de palavras, incluindo ou não a abertura clássica \"Lorem ipsum dolor sit amet...\"." },
        { q: "O texto Lorem Ipsum é livre de direitos autorais para projetos comerciais?", a: "Sim. Encontra-se em domínio público universal, podendo ser livremente aplicado em impressos, landing pages e aplicativos comerciais sem necessidade de créditos." },
        { q: "A ferramenta é útil para prototipagem no Figma e desenvolvimento web?", a: "Sim, é a ferramenta essencial de wireframing para designers no Figma, maquetes em HTML e protótipos de interfaces." },
        { q: "Os textos gerados são armazenados em servidores?", a: "Não. O texto é composto diretamente no navegador do usuário de forma imediata." }
      ]
    },
    ja: {
      name: "ダミーテキスト（Lorem Ipsum）生成ツール",
      seoTitle: "ダミーテキスト（Lorem Ipsum・日本語ダミー）生成 | HelloTools",
      seoDescription: "WEBデザインやレイアウト調整で使えるダミーテキスト（Lorem Ipsum文 / 日本語夏目漱石風ダミー文）を段落数指定で自動生成します。",
      description: "デザインやレイアウト確認用のダミーテキスト（ダミー文章）を生成します。",
      quickAnswer: "WEB制作やデザイン用のラテン語（Lorem Ipsum）および日本語ダミーテキストを生成します。",
      seoHowToUse: "1. 段落数または文字数を指定します。\n2. 形式（Lorem Ipsum / 日本語ダミー文章）を選択します。\n3. 生成されたテキストを「コピー」します。",
      seoHowItWorks: "古典ラテン語テキストおよび日本語サンプル段落を構成出力します。",
      formula: "Dummy Text Generator Stream",
      seoExample: "「Lorem ipsum dolor sit amet...」や「吾輩は猫である。名前はまだ無い。」風テキストを即時生成します。",
      faqs: [
        { q: "Lorem Ipsum（ロレム・イプサム）とは何ですか？デザインで使われる理由は？", a: "紀元前のキケロのラテン語著作をベースにしたデザイン業界標準のダミーテキスト（ダミー文章）です。意味のある文章に気を取られず、フォントの書体やレイアウト、余白のバランスに集中するために使用されます。" },
        { q: "段落数や単語数、文章数を指定して生成できますか？", a: "はい。必要な分量に応じて段落数、センテンス数、または指定の単語数を選んで瞬時にダミーテキストを生成できます。定番の「Lorem ipsum dolor sit amet...」で始めるかどうかも選択可能です。" },
        { q: "商用サイトやクライアントワークのデザイン制作に無料で使えますか？", a: "はい。パブリックドメイン（著作権フリー）のテキストであるため、商用・非商用を問わずWebサイトや印刷物のモックアップ制作に自由に使用できます。" },
        { q: "FigmaやWebサイトのワイヤーフレーム制作に適していますか？", a: "はい。Figma、Adobe XD、HTML/CSSコーディング時のレイアウト確認用プレースホルダーとして世界中のデザイナーに愛用されています。" },
        { q: "生成されたダミーテキストが外部に保存されることはありますか？", a: "いいえ。ダミーテキストの組み立て生成はお使いのブラウザ上で即座に行われ、一切データ送信されません。" }
      ]
    }
  },

  'standard-deviation-calculator': {
    es: {
      name: "Calculadora de Desviación Estándar",
      seoTitle: "Calculadora de Desviación Estándar y Varianza | HelloTools",
      seoDescription: "Calcula la desviación estándar poblacional y muestral, varianza y media.",
      description: "Calcula la desviación estándar, varianza y media de un conjunto de datos.",
      quickAnswer: "Mide la dispersión o variabilidad de un conjunto de datos numéricos.",
      seoHowToUse: "1. Introduce los números separados por comas o espacios.\n2. Elige si es una muestra (s) o población (σ).\n3. Obtén la desviación estándar y varianza.",
      seoHowItWorks: "Calcula la media, resta las desviaciones al cuadrado y divide por N o N-1.",
      formula: "s = √[ Σ(x - x̅)² / (n - 1) ]",
      seoExample: "Para los datos [2, 4, 4, 4, 5, 5, 7, 9], la media es 5 y la desviación estándar muestral es 2.138.",
      faqs: [
        { q: "¿Cuál es la diferencia entre desviación típica poblacional y muestral?", a: "La desviación típica poblacional (σ) se aplica cuando analizas el conjunto completo de datos (divide por N). La muestral (s) se utiliza cuando trabajas con una muestra representativa (divide por N-1 con corrección de Bessel)." },
        { q: "¿Cómo se introducen los datos numéricos en este calculador estadístico?", a: "Introduce tus números separados por comas, espacios o saltos de línea (ej. 10, 20, 30, 40). La herramienta calcula al instante la media, varianza y desviación típica." },
        { q: "¿Qué significado tiene una desviación estándar alta o baja?", a: "Una desviación estándar baja indica que los datos están muy agrupados en torno a la media (baja dispersión). Un valor alto refleja amplia variabilidad y dispersión en la muestra." },
        { q: "¿Es precisa esta calculadora de desviación estándar frente a Excel?", a: "Sí. Utiliza algoritmos estadísticos con doble precisión numérica, coincidiendo con las funciones DESVEST.M / DESVEST.P de Microsoft Excel y entornos como R o Python." },
        { q: "¿Admite conjuntos de datos grandes de investigación?", a: "Sí. Puedes pegar cientos o miles de valores de laboratorio o encuestas para obtener la varianza y desviación típica al instante sin enviar datos a servidores." }
      ]
    },
    de: {
      name: "Standardabweichung-Rechner",
      seoTitle: "Standardabweichung Rechner — Varianz & Mittelwert | HelloTools",
      seoDescription: "Berechnen Sie Stichproben- und Populations-Standardabweichung, Varianz und Mittelwert.",
      description: "Standardabweichung, Varianz und Mittelwert berechnen.",
      quickAnswer: "Errechnet die statistische Streuung einer Zahlenreihe.",
      seoHowToUse: "1. Zahlen kommagetrennt eingeben.\n2. Stichprobe oder Population wählen.\n3. Werte ablesen.",
      seoHowItWorks: "Berechnet quadratische Abweichungen vom Mittelwert.",
      formula: "s = √[ Σ(x - x̅)² / (n - 1) ]",
      seoExample: "Für 2, 4, 4, 5, 7 ist der Mittelwert 4,4 und die Standardabweichung ca. 1,82.",
      faqs: [
        { q: "Was unterscheidet die Populations- von der Stichproben-Standardabweichung?", a: "Die Populations-Standardabweichung (σ) teilt durch N (Gesamtheit). Die Stichproben-Standardabweichung (s) teilt durch N-1 (Besselsche Korrektur) für eine unverzerrte Schätzung." },
        { q: "Wie werden die Messwerte in den Rechner eingegeben?", a: "Geben Sie Zahlen getrennt durch Kommas oder Leerzeichen ein. Das Tool weist Mittelwert, Varianz und Standardabweichung unmittelbar aus." },
        { q: "Was bedeutet eine hohe bzw. niedrige Standardabweichung?", a: "Eine niedrige Standardabweichung bedeutet enge Streuung um den Mittelwert (hohe Homogenität). Eine hohe Standardabweichung zeigt starke Streuung der Messdaten." },
        { q: "Stimmen die Werte mit Programmen wie Excel oder R überein?", a: "Ja, die Ergebnisse entsprechen exakt den Berechnungen der Standardfunktionen STABW.S bzw. STABW.P in Excel." },
        { q: "Können auch sehr große Datenreihen analysiert werden?", a: "Ja, das Skript verarbeitet auch Tausende von Datenpunkten verzögerungsfrei direkt im Browser." }
      ]
    },
    fr: {
      name: "Calculateur d'Écart-Type",
      seoTitle: "Calculateur d'Écart-Type et Variance | HelloTools",
      seoDescription: "Calculez l'écart-type d'un échantillon ou d'une population, la variance et la moyenne.",
      description: "Calculez l'écart-type, la variance et la moyenne.",
      quickAnswer: "Mesure la dispersion des données autour de la moyenne statistique.",
      seoHowToUse: "1. Entrez la série de nombres.\n2. Choisissez échantillon ou population.\n3. Consultez la variance et l'écart-type.",
      seoHowItWorks: "Prend la racine carrée de la variance.",
      formula: "σ = √[ Σ(x - μ)² / N ]",
      seoExample: "Pour [10, 12, 23, 23, 16, 23, 21, 16], la moyenne est 18 et l'écart-type est environ 5,23.",
      faqs: [
        { q: "Quelle est la différence entre écart-type de population et d'échantillon ?", a: "L'écart-type de population (σ) divise par N (population totale). L'écart-type d'échantillon (s) divise par N-1 (correction de Bessel) pour éviter un biais statistique." },
        { q: "Comment formater la série de valeurs numériques ?", a: "Séparez vos valeurs par des virgules ou des espaces. La moyenne, la variance et l'écart-type s'affichent instantanément." },
        { q: "Comment interpréter un écart-type faible ou élevé ?", a: "Un écart-type faible indique que les observations sont très proches de la moyenne. Un écart-type élevé signale une forte hétérogénéité des mesures." },
        { q: "Les résultats sont-ils conformes à Microsoft Excel ?", a: "Oui, ils concordent avec les fonctions ECARTYPE.STANDARD et ECARTYPE.PE de logiciels scientifiques." },
        { q: "Le calculateur accepte-t-il les grands jeux de données ?", a: "Oui, vous pouvez soumettre de volumineuses séries de mesures sans latence grâce au traitement local." }
      ]
    },
    pt: {
      name: "Calculadora de Desvio Padrão",
      seoTitle: "Calculadora de Desvio Padrão e Variância | HelloTools",
      seoDescription: "Calcule o desvio padrão amostral e populacional, a variância e a média estatística.",
      description: "Calcule o desvio padrão e variância de um conjunto de números.",
      quickAnswer: "Mede a dispersão estatística de um grupo de dados numéricos.",
      seoHowToUse: "1. Digite a lista de números.\n2. Selecione se é amostra ou população.\n3. Veja a média, variância e desvio padrão.",
      seoHowItWorks: "Calcula a média e a soma das diferenças ao quadrado.",
      formula: "s = √[ Σ(x - x̅)² / (n - 1) ]",
      seoExample: "Para a lista 10, 20, 30, a média é 20 e o desvio padrão amostral é 10.",
      faqs: [
        { q: "Qual a diferença entre desvio padrão populacional e amostral?", a: "O desvio padrão populacional (σ) divide por N e analisa toda a população. O amostral (s) divide por N-1 (correção de Bessel) para estimar a população a partir de uma amostra." },
        { q: "Como inserir a sequência de dados na calculadora?", a: "Digite ou cole os números separados por vírgulas ou espaços. O sistema gera a média, a variância e o desvio padrão instantaneamente." },
        { q: "O que indica um desvio padrão baixo ou elevado?", a: "Um desvio padrão baixo aponta dados homogêneos próximos da média. Um desvio alto indica grande dispersão e variabilidade estatística." },
        { q: "O cálculo é equivalente ao das funções estatísticas do Excel?", a: "Sim. Os resultados coincidem exatamente com as fórmulas DESVPAD.A e DESVPAD.P utilizadas em softwares de análise." },
        { q: "A ferramenta suporta grandes amostras de dados?", a: "Sim. O motor de cálculo processa centenas de registros em frações de segundo diretamente no navegador." }
      ]
    },
    ja: {
      name: "標準偏差・分散計算ツール",
      seoTitle: "標準偏差計算ツール — 標本偏差・母集団分散・平均値 | HelloTools",
      seoDescription: "数値データを入力するだけで、平均値、標本標準偏差（s）、母集団標準偏差（σ）、分散を自動計算します。",
      description: "数値群の平均値、分散、標準偏差を計算します。",
      quickAnswer: "データ群のばらつき具合を示す統計指標（平均値・標準偏差・分散）を算出します。",
      seoHowToUse: "1. 数値をカンマまたはスペース区切りで入力します。\n2. 標本（Sample）または母集団（Population）を選択します。\n3. 平均値、分散、標準偏差（s / σ）を確認します。",
      seoHowItWorks: "平均値からの偏差平方和を自由度（nまたはn-1）で割った平方根を求めます。",
      formula: "s = √[ Σ(x - x̅)² / (n - 1) ]",
      seoExample: "数値 [60, 70, 80] の場合、平均値は70、標準偏差は約10となります。",
      faqs: [
        { q: "母標準偏差と標本標準偏差の違いは何ですか？", a: "母標準偏差（σ）は母集団全体のデータからNで除算して求めます。標本標準偏差（s）は一部の標本から母集団を推測するため、不偏推定量として(N-1)で除算（ベッセルの補正）します。" },
        { q: "データの入力方法と区切り文字はどう指定しますか？", a: "カンマ、スペース、改行で区切って数値を入力できます。平均値、分散、標準偏差がリアルタイムに算出されます。" },
        { q: "標準偏差が大きい・小さいことは何を意味しますか？", a: "標準偏差が小さい場合はデータが平均値付近に密集している（ばらつきが小さい）ことを示し、大きい場合はデータが広範囲に散らばっている（ばらつきが大きい）ことを表します。" },
        { q: "ExcelのSTDEV.SやSTDEV.P関数と一致しますか？", a: "はい。倍精度の統計アルゴリズムを用いており、ExcelやPythonのnumpy/scipyの標準関数と同一の正確な数値を返します。" },
        { q: "実験データなどの大量データの集計にも利用できますか？", a: "はい。数千件におよぶデータセットでもブラウザのローカル処理により瞬時に標準偏差を算出できます。" }
      ]
    }
  },

  'ev-cost-calculator': {
    es: {
      name: "Calculadora de Costo de Carga de Coche Eléctrico (EV vs Gasolina)",
      seoTitle: "Calculadora de Costo de Carga Eléctrica vs Gasolina | HelloTools",
      seoDescription: "Compara el costo por kilómetro y el ahorro anual entre un coche eléctrico (EV) y uno de gasolina.",
      description: "Compara el costo de recarga de un vehículo eléctrico frente al combustible.",
      quickAnswer: "Compara el gasto monetario por distancia entre un vehículo eléctrico y uno térmico.",
      seoHowToUse: "1. Introduce la distancia anual recorrida.\n2. Indica el precio de la gasolina y el precio del kWh eléctrico.\n3. Consulta el ahorro anual estimado.",
      seoHowItWorks: "Calcula el consumo total en kWh y litros y los multiplica por las tarifas.",
      formula: "Costo EV = (Distancia / 100) * Consumo kWh/100km * Precio kWh",
      seoExample: "Recorrer 15.000 km/año con un EV (18 kWh/100km a $0,15/kWh) cuesta $405 vs $1.800 de gasolina.",
      faqs: [
        { q: "¿Qué costes compara esta calculadora de vehículos eléctricos?", a: "Compara el coste total de propiedad entre un coche eléctrico y uno de gasolina, incluyendo precio de compra, recargas de electricidad, combustible, mantenimiento y ayudas fiscales." },
        { q: "¿Cómo calcula el coste de recarga eléctrica de un vehículo?", a: "Multiplica el consumo del vehículo en kWh por cada 100 km por el precio de la electricidad de tu tarifa doméstica (o de estaciones de carga rápida) y por los kilómetros anuales recorridos." },
        { q: "¿Cuánto se ahorra habitualmente en mantenimiento con un coche eléctrico?", a: "Los vehículos eléctricos ahorran habitualmente entre un 30% y un 50% en mantenimiento respecto a los de combustión al no requerir cambios de aceite, embrague, correas de distribución ni bujías." },
        { q: "¿Incluye subvenciones gubernamentales para compra de vehículos limpios?", a: "Sí. Puedes introducir las ayudas oficiales aplicables (como el Plan MOVES en España o incentivos equivalentes) para calcular el coste neto de adquisición." },
        { q: "¿Es fiable la proyección económica a lo largo de los años?", a: "Ofrece una comparativa económica rigurosa basada en el kilometraje anual y los costes energéticos reales que introduzcas." }
      ]
    },
    de: {
      name: "Elektroauto-Ladekostenrechner (EV vs. Benzin)",
      seoTitle: "E-Auto Ladekostenrechner — EV vs. Benziner Vergleich | HelloTools",
      seoDescription: "Vergleichen Sie die Fahrtkosten und Ersparnis zwischen E-Auto und Verbrenner.",
      description: "Ladekosten für Elektrofahrzeuge mit Benzinkosten vergleichen.",
      quickAnswer: "Berechnet die Ersparnis beim Umstieg von Benzin/Diesel auf Elektroantrieb.",
      seoHowToUse: "1. Jährliche Kilometerleistung eingeben.\n2. Strompreis (€/kWh) und Benzinpreis (€/l) eintragen.\n3. Jährliche Ersparnis ablesen.",
      seoHowItWorks: "Vergleicht die Verbrauchskosten auf 100 km.",
      formula: "Kosten EV = (km / 100) * kWh/100km * Strompreis",
      seoExample: "15.000 km im E-Auto kosten ca. 800 € Strom statt 2.100 € Benzin.",
      faqs: [
        { q: "Welche Gesamtkosten vergleicht dieser Elektroauto-Kostenrechner?", a: "Er stellt die Gesamtbetriebskosten (Total Cost of Ownership) von E-Auto und Verbrenner gegenüber: Anschaffung, Strom- und Spritkosten, Wartung und steuerliche Förderungen." },
        { q: "Wie werden die Stromkosten für das Laden berechnet?", a: "Der Stromverbrauch in kWh pro 100 km wird mit Ihrem Haushaltsstrompreis (oder Ladesäulenpreis) und der jährlichen Fahrleistung multipliziert." },
        { q: "Wie hoch ist die typische Wartungserparnis bei einem Elektrofahrzeug?", a: "Durch den Verzicht auf Ölwechsel, Zündkerzen, Zahnriemen und Auspuffanlagen liegen die Wartungskosten bei Elektroautos rund 30 % bis 40 % niedriger als bei Benzinern." },
        { q: "Können staatliche Förderprämien und Steuerbefreiungen einberechnet werden?", a: "Ja, Sie können Umweltboni sowie die Befreiung von der Kfz-Steuer in die Gesamtkalkulation einfließen lassen." },
        { q: "Wie realistisch ist der langfristige Kostenvergleich?", a: "Der Rechner bietet einen verlässlichen Orientierungsrahmen auf Basis Ihrer realen Jahreskilometer und aktuellen Strom- und Benzinpreise." }
      ]
    },
    fr: {
      name: "Calculateur de Coût de Recharge Voiture Électrique",
      seoTitle: "Calculateur Coût Électrique vs Essence Voiture | HelloTools",
      seoDescription: "Comparez le coût au kilomètre et l'économie annuelle entre véhicule électrique et essence.",
      description: "Comparez le budget carburant essence vs recharge électrique.",
      quickAnswer: "Évalue l'économie financière annuelle réalisée en roulant en véhicule électrique.",
      seoHowToUse: "1. Entrez votre kilométrage annuel.\n2. Saisissez le prix du kWh et du carburant.\n3. Obtenez l'économie annuelle.",
      seoHowItWorks: "Calcule les coûts d'énergie totaux pour la même distance.",
      formula: "Coût VE = (km / 100) * kWh/100km * Prix kWh",
      seoExample: "Pour 15 000 km/an, l'électricité coûte environ 450 € contre 1 800 € d'essence.",
      faqs: [
        { q: "Quels coûts ce comparateur de véhicule électrique évalue-t-il ?", a: "Il compare le coût global de possession (TCO) entre voiture électrique et thermique : achat, électricité, carburant, entretien et bonus écologiques." },
        { q: "Comment est calculé le coût des recharges électriques ?", a: "La consommation en kWh aux 100 km est multipliée par le prix de votre kWh d'électricité domestique et par votre kilométrage annuel." },
        { q: "Quelle est l'économie moyenne réalisée sur l'entretien d'une voiture électrique ?", a: "L'absence de vidange, de courroie de distribution et de filtres permet une réduction moyenne de 30 % à 45 % sur les factures d'entretien." },
        { q: "Prend-il en compte le bonus écologique et la prime à la conversion ?", a: "Oui. Vous pouvez déduire le montant des aides publiques d'État pour déterminer le coût d'achat net." },
        { q: "La projection d'amortissement est-elle fiable ?", a: "Elle fournit un calcul mathématique rigoureux pour déterminer à partir de quel kilométrage le surcoût d'achat du véhicule électrique est amorti." }
      ]
    },
    pt: {
      name: "Calculadora de Custo de Carro Elétrico (EV vs Gasolina)",
      seoTitle: "Calculadora de Custo de Carro Elétrico vs Gasolina | HelloTools",
      seoDescription: "Compare o custo por quilômetro e a economia anual entre carro elétrico e a combustão.",
      description: "Compare os custos de recarga elétrica com o gasto de gasolina.",
      quickAnswer: "Calcula a economia financeira anual ao optar por um veículo elétrico.",
      seoHowToUse: "1. Digite a quilometragem anual.\n2. Informe a tarifa da energia (R$/kWh) e o preço do combustível.\n3. Veja a economia anual.",
      seoHowItWorks: "Compara os custos de rodagem por 100 km.",
      formula: "Custo EV = (km / 100) * kWh/100km * Tarifa kWh",
      seoExample: "Rodar 15.000 km/ano em um EV custa cerca de R$ 2.000 contra R$ 8.000 em gasolina.",
      faqs: [
        { q: "Quais custos a calculadora de carro elétrico compara?", a: "Compara o Custo Total de Propriedade (TCO) entre um veículo 100% elétrico e um a combustão, integrando compra, energia elétrica, combustível, manutenção e IPVA." },
        { q: "Como é calculado o custo de recarga de um veículo elétrico?", a: "Multiplica-se o consumo do carro em kWh por 100 km pela tarifa de energia elétrica da sua distribuidora e pela quilometragem anual estimada." },
        { q: "Qual a economia real em manutenção que um carro elétrico proporciona?", a: "Por não ter óleo, velas, correias e filtros de combustível, a manutenção preventiva de um carro elétrico é de 30% a 50% mais econômica." },
        { q: "A ferramenta permite considerar isenções de IPVA para elétricos?", a: "Sim. Em estados que oferecem isenção ou desconto no IPVA para veículos eletrificados, você pode ajustar as despesas anuais." },
        { q: "Como saber o ponto de equilíbrio financeiro (payback) do carro elétrico?", a: "A ferramenta indica após quantos quilômetros e anos a economia em combustível e manutenção compensa o valor de aquisição do carro." }
      ]
    },
    ja: {
      name: "EV（電気自動車）電気代・ガソリン代比較計算ツール",
      seoTitle: "EV電気代 vs ガソリン代比較計算ツール | HelloTools",
      seoDescription: "年間走行距離、電気料金単価（円/kWh）、ガソリン価格から、電気自動車（EV）とガソリン車の年間燃料コストと節約額を算定します。",
      description: "電気自動車（EV）の充電電気代とガソリン車の燃料費を比較計算します。",
      quickAnswer: "年間走行距離に対するEV（電気代）とガソリン車の燃料コストおよび差額節約額を計算します。",
      seoHowToUse: "1. 年間走行距離（km）を入力します。\n2. 電気代単価（円/kWh）とガソリン価格（円/L）を入力します。\n3. 年間コスト比較と節約可能額を確認します。",
      seoHowItWorks: "100kmあたりの電力量（kWh）とガソリン消費量（L）から総費用を算定します。",
      formula: "EV年間コスト = (年間走行距離 / 100) * 100km電費 * 電気代単価",
      seoExample: "年間10,000km走行時、EV電気代は約4万円（ガソリン代は約12万円）となり年間約8万円節約できます。",
      faqs: [
        { q: "電気自動車（EV）コスト計算ツールはどのような費用を比較しますか？", a: "EVとガソリン車の「総所有コスト（TCO）」を比較し、車両購入価格、電気代、ガソリン代、定期点検整備費用、購入補助金を総合的に試算します。" },
        { q: "電気自動車の充電コスト（電費）はどのように計算されますか？", a: "100kmあたりの電費（kWh）に契約している家庭用電気料金単価（円/kWh）と年間走行距離を掛け合わせて年間充電費用を算出します。" },
        { q: "EVはガソリン車と比べてどのくらいメンテナンス費用が安くなりますか？", a: "エンジンオイル交換や点火プラグ、タイミングベルト等の消耗部品が存在しないため、定期メンテナンス費用は約30〜50%安価になると言われています。" },
        { q: "国のCEV補助金やエコカー減税も考慮できますか？", a: "はい。国の購入補助金や自治体の上乗せ補助金、自動車重量税・環境性能割の減税額を差し引いて実質購入額を比較できます。" },
        { q: "ガソリン車との価格差を走行コストで回収できる期間（損益分岐点）は分かりますか？", a: "はい。年間走行距離が多いほど燃料代（充電代）の差額が大きくなり、何年間の保有で初期費用の差額を回収できるかを算出できます。" }
      ]
    }
  },

  'macronutrient-splitter': {
    es: {
      name: "Distribuidor de Macronutrientes por Comida",
      seoTitle: "Distribuidor de Macronutrientes por Comida | HelloTools",
      seoDescription: "Divide tus gramos diarios de proteínas, carbohidratos y grasas entre tus comidas del día.",
      description: "Reparte tus macronutrientes diarios en cada comida del día.",
      quickAnswer: "Reparte la meta total de proteínas, carbohidratos y grasas en porciones por comida.",
      seoHowToUse: "1. Introduce tus objetivos diarios totales de proteínas, carbos y grasas.\n2. Indica el número de comidas al día (ej. 4 comidas).\n3. Lee las porciones por plato.",
      seoHowItWorks: "Divide los gramos totales por el número de ingestas.",
      formula: "Macro por Comida = Gramos Totales / Número de Comidas",
      seoExample: "Con 160g de proteína en 4 comidas, debes consumir 40g de proteína por comida.",
      faqs: [
        { q: "¿Qué calcula exactamente este divisor de macronutrientes?", a: "Divide tu objetivo calórico diario en gramos exactos de proteínas, carbohidratos y grasas según los porcentajes que elijas, aplicando las equivalencias 4 kcal/g para proteína y carbohidrato y 9 kcal/g para grasas." },
        { q: "¿Qué reparto de macros es más recomendable para perder peso?", a: "Para definición o pérdida de grasa se suele usar 40% de proteína, 30% de carbohidratos y 30% de grasas, garantizando un aporte proteico alto que frene el catabolismo muscular." },
        { q: "¿Cómo obtengo el objetivo calórico que debo introducir aquí?", a: "Utiliza la Calculadora de Calorías (TDEE) para conocer tu gasto energético diario, y resta de 300 a 500 kcal para adelgazar o suma de 250 a 400 kcal para ganar volumen." },
        { q: "¿Contempla la calculadora los carbohidratos netos o la fibra?", a: "Muestra los gramos totales de carbohidratos. Si sigues una pauta baja en hidratos (Low Carb), puedes restar tu fibra diaria consumida para obtener los carbohidratos netos." },
        { q: "¿Se almacenan mis macronutrientes o registros dietéticos en el sistema?", a: "No. Toda la distribución se ejecuta en el navegador web del usuario y no se almacena en ninguna base de datos." }
      ]
    },
    de: {
      name: "Makronährstoff-Aufteiler nach Mahlzeiten",
      seoTitle: "Makronährstoff Aufteiler pro Mahlzeit | HelloTools",
      seoDescription: "Teilen Sie Ihre täglichen Proteine, Carbs und Fette auf Ihre Mahlzeiten auf.",
      description: "Tägliche Makronährstoffe auf einzelne Mahlzeiten aufteilen.",
      quickAnswer: "Berechnet die Grammzahl an Proteinen, Carbs und Fett pro Mahlzeit.",
      seoHowToUse: "1. Tages-Makros (Gramm) eingeben.\n2. Anzahl der Mahlzeiten (z.B. 4) wählen.\n3. Portionen pro Teller ablesen.",
      seoHowItWorks: "Teilt die Gesamtgrammzahl durch die Mahlzeitenanzahl.",
      formula: "Pro Mahlzeit = Gesamtgramm / Mahlzeiten",
      seoExample: "160g Eiweiß auf 4 Mahlzeiten ergibt 40g Eiweiß pro Mahlzeit.",
      faqs: [
        { q: "Was berechnet der Makronährstoff-Splitter genau?", a: "Er teilt Ihr tägliches Kalorienbudget in exakte Gramm-Werte für Eiweiß (4 kcal/g), Kohlenhydrate (4 kcal/g) und Fett (9 kcal/g) gemäß den gewählten Prozentanteilen auf." },
        { q: "Welche Makro-Verteilung wird zur Körperfettreduktion empfohlen?", a: "Für die Fettverbrennung hat sich ein Verhältnis von 40 % Protein, 30 % Kohlenhydraten und 30 % Fetten bewährt, um Muskelabbau im Kaloriendefizit zu verhindern." },
        { q: "Wie ermittle ich den Kalorienwert, den ich hier eingeben muss?", a: "Berechnen Sie zuerst Ihren TDEE mit unserem Kalorienrechner und ziehen Sie für eine Diät 300-500 kcal ab (oder addieren Sie 300 kcal für den Muskelaufbau)." },
        { q: "Werden Ballaststoffe und Netto-Kohlenhydrate unterschieden?", a: "Das Tool berechnet die Gesamt-Kohlenhydrate. Für die Berechnung von Net-Carbs ziehen Sie einfach die Ballaststoffmenge von der Kohlenhydratmenge ab." },
        { q: "Werden meine Nährwertziele irgendwo online gespeichert?", a: "Nein. Sämtliche Nährwertaufteilungen werden rein lokal in Ihrem Webbrowser berechnet und nicht übertragen." }
      ]
    },
    fr: {
      name: "Répartiteur de Macronutriments par Repas",
      seoTitle: "Répartiteur de Macronutriments par Repas | HelloTools",
      seoDescription: "Répartissez vos grammes quotidiens de protéines, glucides et lipides par repas.",
      description: "Répartissez vos macros quotidiennes dans chaque repas de la journée.",
      quickAnswer: "Divise l'objectif quotidien en grammes de nutriments par assiette.",
      seoHowToUse: "1. Saisissez vos objectifs globaux de macros.\n2. Choisissez le nombre de repas par jour.\n3. Obtenez la répartition par repas.",
      seoHowItWorks: "Divise la valeur totale par le nombre de repas.",
      formula: "Macro par Repas = Total Grammes / Nombre de Repas",
      seoExample: "160g de protéines répartis sur 4 repas donnent 40g par repas.",
      faqs: [
        { q: "Que calcule ce répartiteur de macronutriments ?", a: "Il convertit votre quota calorique journalier en grammes précis de protéines (4 kcal/g), glucides (4 kcal/g) et lipides (9 kcal/g) selon les proportions choisies." },
        { q: "Quelle est la répartition idéale pour une perte de masse grasse ?", a: "Un profil de sèche efficace associe généralement 40 % de protéines, 30 % de glucides et 30 % de lipides pour protéger les muscles et maximiser la satiété." },
        { q: "Comment définir mon apport calorique total de départ ?", a: "Calculez votre dépense quotidienne (DET) avec notre calculateur de calories, puis soustrayez 300 à 500 kcal pour sécher ou ajoutez 250 à 400 kcal pour prendre du muscle." },
        { q: "Le calcul prend-il en compte les glucides nets et les fibres ?", a: "Il calcule les glucides totaux. Pour connaître les glucides nets (utiles en cétose), déduisez votre quantité de fibres de l'apport glucidique global." },
        { q: "Mes objectifs de macros restent-ils confidentiels ?", a: "Oui. Le calcul est strictement exécuté en local sans aucun enregistrement sur nos serveurs." }
      ]
    },
    pt: {
      name: "Divisor de Macronutrientes por Refeição",
      seoTitle: "Divisor de Macronutrientes por Refeição | HelloTools",
      seoDescription: "Divida suas gramas diárias de proteínas, carboidratos e gorduras entre suas refeições.",
      description: "Divida seus macros diários entre o número de refeições que você faz.",
      quickAnswer: "Distribui as metas de macros diárias em porções exatas para cada refeição.",
      seoHowToUse: "1. Informe o total de gramas de proteínas, carbos e gorduras do dia.\n2. Digite o número de refeições (ex: 4).\n3. Veja as gramas por prato.",
      seoHowItWorks: "Divide o total de cada macronutriente pelo número de refeições.",
      formula: "Macro por Refeição = Gramas Totais / Número de Refeições",
      seoExample: "160g de proteína em 4 refeições exige 40g de proteína por refeição.",
      faqs: [
        { q: "O que calcula esta ferramenta de divisão de macronutrientes?", a: "Ela converte sua meta calórica diária em gramas exatos de proteínas (4 kcal/g), carboidratos (4 kcal/g) e gorduras (9 kcal/g) com base na porcentagem que você estipular." },
        { q: "Qual divisão de macros é mais eficiente para queimar gordura?", a: "Para emagrecimento, recomenda-se 40% de proteínas, 30% de carboidratos e 30% de gorduras saudáveis para garantir saciedade e preservar a massa muscular." },
        { q: "Como saber qual valor de calorias diárias devo inserir na ferramenta?", a: "Calcule seu TDEE na Calculadora de Calorias e subtraia 300 a 500 kcal para perder gordura ou adicione 300 a 400 kcal para ganho de massa magra." },
        { q: "A ferramenta faz a dedução das fibras para carboidratos líquidos?", a: "O cálculo exibe os carboidratos totais. Em dietas low-carb, deduza as fibras da dieta para obter o total de carboidratos líquidos." },
        { q: "As minhas metas de calorias e macros são gravadas?", a: "Não. Todos os cálculos rodam de forma privada e instantânea no seu navegador." }
      ]
    },
    ja: {
      name: "PFCマクロ分割（食数別）計算ツール",
      seoTitle: "PFCバランス食事回数別分割計算ツール | HelloTools",
      seoDescription: "1日の目標PFC（タンパク質・脂質・炭水化物）の総グラム数を、1日の食事回数（3食・4食・5食等）に等分割分配します。",
      description: "1日のPFC目標グラム数を食事回数ごとに均等分割計算します。",
      quickAnswer: "1日の総PFC（タンパク質・脂質・炭水化物）グラム数を食事回数（3〜6食）ごとに均等割り計算します。",
      seoHowToUse: "1. 1日の目標タンパク質・脂質・炭水化物（g）を入力します。\n2. 1日の食事回数（例：4食）を選択します。\n3. 1食あたりの目標PFC（g）を確認します。",
      seoHowItWorks: "総グラム数を食事回数で除算して1食分の目安を算出します。",
      formula: "1食あたりのg = 1日の総g / 食事回数",
      seoExample: "1日タンパク質160gを4食に分割する場合、1食あたり40gが目安となります。",
      faqs: [
        { q: "マクロ栄養素スプリッターは具体的に何を算出しますか？", a: "1日の総摂取目標カロリーを、指定した割合（%）に基づいてタンパク質（4kcal/g）、炭水化物（4kcal/g）、脂質（9kcal/g）の具体的なグラム数へと換算します。" },
        { q: "ダイエット（体脂肪減少）に最適なPFC比率はどれくらいですか？", a: "筋肉の分解を防ぐため、タンパク質40%、炭水化物30%、脂質30%の高タンパク質設定が広く推奨されています。" },
        { q: "入力すべき「1日の目標カロリー」はどう調べればよいですか？", a: "当サイトの「カロリー計算ツール」でTDEE（総消費カロリー）を計算し、減量ならそこから300〜500kcal引き、増量なら300kcal前後を上乗せした数値を入力してください。" },
        { q: "炭水化物の数値から食物繊維（糖質・食物繊維）は引かれていますか？", a: "総炭水化物（糖質＋食物繊維）のグラム数を表示しています。ロカボやケトジェニックの方は日々の食物繊維量を差し引いて正味の糖質量を管理してください。" },
        { q: "入力した食事目標やPFCデータが外部に保存されることはありますか？", a: "いいえ。すべての計算はお使いの端末のブラウザ上でリアルタイムに処理され、一切データ送信されません。" }
      ]
    }
  },

  'apr-calculator': {
    es: {
      name: "Calculadora de APR (Tasa Anual Equivalente)",
      seoTitle: "Calculadora de APR — Tasa Anual Equivalente y Costo Crédito | HelloTools",
      seoDescription: "Calcula la Tasa Anual Equivalente (APR) de un préstamo incluyendo comisiones e intereses.",
      description: "Calcula el costo real (APR) de tu préstamo incluyendo comisiones.",
      quickAnswer: "Calcula el costo efectivo anual real de un financiamiento sumando comisiones al tipo nominal.",
      seoHowToUse: "1. Introduce el importe del préstamo.\n2. Indica la tasa de interés nominal y las comisiones iniciales.\n3. Lee el APR financiero real.",
      seoHowItWorks: "Resuelve la tasa interna de retorno (TIR) que iguala el préstamo neto con los flujos de pago.",
      formula: "APR = Tasa Efectiva Anual considerando comisiones iniciales",
      seoExample: "Un préstamo de $10.000 al 5% con $300 de comisión inicial tiene un APR real del 5.65%.",
      faqs: [
        { q: "¿Cuál es la diferencia entre el tipo de interés nominal (TIN) y la TAE/APR?", a: "El TIN es el porcentaje que cobra el banco exclusivamente por prestar el dinero. La TAE/APR incluye el TIN más todos los costes obligatorios (comisiones de apertura, corretaje y gastos de estudio) en un porcentaje anual." },
        { q: "¿Por qué la TAE o APR es casi siempre superior al tipo de interés nominal?", a: "Porque prorratea los gastos iniciales y comisiones sobre la vida del préstamo y los suma al coste de los intereses puros, reflejando el verdadero coste financiero." },
        { q: "¿Es más conveniente comparar préstamos bancarios por TIN o por TAE?", a: "Siempre se debe comparar por TAE/APR. Dos préstamos con el mismo interés nominal pueden tener costes reales muy dispares si uno de ellos cobra comisiones adicionales elevadas." },
        { q: "¿Qué costes están incluidos en el cálculo de la TAE/APR?", a: "Incluye comisiones de apertura, tarifas de estudio, corretaje y seguros obligatorios exigidos para acceder al tipo de interés pactado." },
        { q: "¿Sigue siendo precisa la TAE si cancelo el préstamo antes de tiempo?", a: "No exactamente. La TAE asume que mantienes el préstamo hasta el vencimiento pactado. Si lo amortizas antes, los costes iniciales se habrán repartido en menos tiempo, elevando el coste efectivo real." }
      ]
    },
    de: {
      name: "Effektivzinsrechner (APR)",
      seoTitle: "Effektivzinsrechner (APR) — Echte Kreditkosten Berechnen | HelloTools",
      seoDescription: "Berechnen Sie den effektiven Jahreszins (APR) unter Berücksichtigung aller Gebühren.",
      description: "Ermitteln Sie den effektiven Jahreszins Ihres Kredits inklusive Gebühren.",
      quickAnswer: "Berechnet die tatsächlichen jährlichen Gesamtpreis eines Kredits inkl. Bearbeitungsgebühren.",
      seoHowToUse: "1. Kreditbetrag und Zins eingeben.\n2. Einmalige Gebühren eintragen.\n3. Effektiven Jahreszins (APR) ablesen.",
      seoHowItWorks: "Ermittelt den internen Zinsfuß auf den Auszahlungsbetrag.",
      formula: "Effektivzins = Effektiver Jahreszins inklusive Nebenkosten",
      seoExample: "10.000 € Kredit zu 5 % mit 300 € Gebühr hat einen Effektivzins von ca. 5,65 %.",
      faqs: [
        { q: "Was ist der Unterschied zwischen Sollzins und effektivem Jahreszins (APR)?", a: "Der Sollzins bezeichnet den reinen Zinssatz für das geliehene Kapital. Der effektive Jahreszins beziffert die tatsächlichen Gesamtkosten pro Jahr einschließlich aller Nebenkosten und Bearbeitungsgebühren." },
        { q: "Warum ist der Effektivzins fast immer höher als der gebundene Sollzins?", a: "Weil einmalige Gebühren, Bearbeitungskosten und Auszahlungsabschläge auf die Gesamtlaufzeit umgelegt und dem Zinssatz hinzugerechnet werden." },
        { q: "Sollte man Kreditangebote anhand des Sollzinses oder Effektivzinses vergleichen?", a: "Immer anhand des effektiven Jahreszinses. Nur er ermöglicht den objektiven Vergleich von Finanzierungen mit unterschiedlichen Gebührenstrukturen." },
        { q: "Welche Gebühren fließen in die Effektivzinsberechnung ein?", a: "Einberechnet werden Abschlussgebühren, Bearbeitungsentgelte und verpflichtende Restschuldversicherungen. Notarkosten bei Immobilien werden gesondert ausgewiesen." },
        { q: "Gilt der Effektivzins auch bei vorzeitiger Darlehensrückzahlung?", a: "Er gilt exakt für die vertragliche Voll-Laufzeit. Bei vorzeitiger Ablösung verteilen sich die Fixkosten auf weniger Monate, wodurch die tatsächliche Belastung anteilig steigt." }
      ]
    },
    fr: {
      name: "Calculateur de TAEG / APR",
      seoTitle: "Calculateur de TAEG (Taux Annuel Effectif Global) | HelloTools",
      seoDescription: "Calculez le TAEG (Taux Annuel Effectif Global) d'un prêt en incluant les frais.",
      description: "Calculez le coût réel (TAEG) de votre crédit avec les frais dossier.",
      quickAnswer: "Calcule le taux annuel effectif global d'un crédit incluant tous les frais annexes.",
      seoHowToUse: "1. Saisissez le montant emprunté.\n2. Indiquez le taux nominal et les frais de dossier.\n3. Obtenez le TAEG exact.",
      seoHowItWorks: "Calcule le taux d'actualisation lissant le coût total du crédit.",
      formula: "TAEG = Taux Actuariel Effectif",
      seoExample: "Un prêt de 10 000 € à 5 % avec 300 € de frais a un TAEG de 5,65 %.",
      faqs: [
        { q: "Quelle est la différence entre le taux nominal et le TAEG (APR) ?", a: "Le taux débiteur nominal rémunère uniquement le prêt du capital. Le TAEG (Taux Annuel Effectif Global) intègre le taux nominal plus l'ensemble des frais de dossier, garanties et assurances obligatoires." },
        { q: "Pourquoi le TAEG est-il systématiquement plus élevé que le taux nominal ?", a: "Parce qu'il agrège l'ensemble des charges et commissions obligatoires pour traduire le coût de revient réel de l'emprunt en pourcentage annuel unique." },
        { q: "Faut-il comparer les offres de crédit selon le taux nominal ou le TAEG ?", a: "Le TAEG est l'indicateur légal de référence obligatoire pour comparer fidèlement deux offres de prêt aux structures de frais différentes." },
        { q: "Quels frais sont obligatoirement compris dans l'assiette du TAEG ?", a: "Sont inclus les frais de dossier bancaires, les frais de courtage, les coûts de caution ou d'hypothèque et les primes d'assurance emprunteur exigées." },
        { q: "Le TAEG reste-t-il représentatif en cas de remboursement anticipé ?", a: "Le TAEG contractuel suppose le maintien du crédit jusqu'à son terme. En cas de solde anticipé, les frais initiaux non remboursables se trouvent amortis sur une durée plus courte." }
      ]
    },
    pt: {
      name: "Calculadora de CET / APR (Custo Efetivo Total)",
      seoTitle: "Calculadora de CET (Custo Efetivo Total / APR) | HelloTools",
      seoDescription: "Calcule o Custo Efetivo Total (CET / APR) do seu empréstimo incluindo taxas e tarifas.",
      description: "Descubra a taxa real anual (CET) do seu empréstimo com todas as tarifas.",
      quickAnswer: "Calcula a porcentagem real cobrada ao ano considerando juros e tarifas administrativas.",
      seoHowToUse: "1. Informe o valor do empréstimo.\n2. Insira a taxa de juros nominal e as tarifas iniciais.\n3. Veja a taxa CET/APR anual.",
      seoHowItWorks: "Calcula a taxa interna de retorno sobre os valores líquidos desembolsados.",
      formula: "CET Anual = Taxa Efetiva Global com Tarifas",
      seoExample: "Um empréstimo de R$ 10.000 a 5% com R$ 300 de tarifa tem CET anual de 5,65%.",
      faqs: [
        { q: "Qual a diferença entre a taxa de juros nominal e o Custo Efetivo Total (CET/APR)?", a: "A taxa nominal expressa apenas os juros da dívida. O CET engloba a taxa de juros mais todas as tarifas bancárias, IOF, seguros e despesas de cadastro em uma única taxa percentual anual." },
        { q: "Por que o CET é invariavelmente maior que a taxa de juros divulgada?", a: "Porque o CET incorpora todos os encargos operacionais e tributos cobrados no ato da contratação, revelando o custo financeiro verdadeiro da operação." },
        { q: "Na contratação de crédito, devo comparar pela taxa de juros ou pelo CET?", a: "Sempre pelo Custo Efetivo Total (CET). Instituições com juros aparentemente menores podem cobrar tarifas embutidas que tornam o contrato mais oneroso." },
        { q: "Quais cobranças entram no cômputo obrigatório do CET?", a: "Taxa de abertura de crédito (TAC), tarifas de avaliação de bens, IOF compulsório e prêmios de seguro habitacional ou prestamista exigidos." },
        { q: "O CET permanece exato se eu liquidar a dívida antecipadamente?", a: "O CET é dimensionado para o prazo integral. Na quitação precoce, as despesas administrativas fixas foram incorridas em um intervalo de tempo menor." }
      ]
    },
    ja: {
      name: "実質年率（APR・実質金利）計算ツール",
      seoTitle: "実質年率（APR）計算ツール — 手数料込みの総コスト | HelloTools",
      seoDescription: "借入額、表面金利（名目金利）、事務手数料、保証料から、ローンやクレジットカードの真の実質年率（APR）を算定します。",
      description: "手数料を含むローンの実質年率（APR・実質金利）を計算します。",
      quickAnswer: "表面金利に初期手数料・保証料等を加味した実質的な年間総コスト率（実質年率APR）を算定します。",
      seoHowToUse: "1. 借入金額（元金）を入力します。\n2. 表面金利（年利%）と借入期間を入力します。\n3. 初期手数料や保証料を入力し、実質年率（%）を確認します。",
      seoHowItWorks: "内部利益率（IRR）手法で手数料込みの毎月キャッシュフローに対する実質年率を求めます。",
      formula: "実質年率(APR) = 手数料込みの内部利益率 (Internal Rate of Return)",
      seoExample: "100万円を表面年利5.0%で借り、初期手数料3万円が発生した場合、実質年率は約5.65%に上昇します。",
      faqs: [
        { q: "表面金利（名目金利）と実質年率（APR）の違いは何ですか？", a: "表面金利は元金に対して発生する利息のみの割合です。実質年率（APR）は、融資手数料や保証料などの諸費用をすべて金利換算して組み込んだ真の年間借入総コスト率です。" },
        { q: "なぜ実質年率は表面金利よりも高くなるのですか？", a: "初期事務手数料や保証料が借入期間全体に按分され、利息負担に上乗せして年間利回り換算されるためです。" },
        { q: "ローンを比較する際は表面金利と実質年率のどちらを見るべきですか？", a: "必ず実質年率（APR）で比較してください。表面金利が低く見えても手数料が高額な場合、実質年率で比較すると総支払額が逆転することがあります。" },
        { q: "実質年率の計算に含まれる費用には何がありますか？", a: "融資取扱事務手数料、保証会社への保証料、印紙代など、ローン借入にあたって必須となる契約関連諸費用が含まれます。" },
        { q: "早期完済した場合でも当初の実質年率は維持されますか？", a: "いいえ。前払いした固定手数料がより短い期間で回収される形となるため、実質的な年間コスト率は当初試算よりも実質的に上昇します。" }
      ]
    }
  }

};

export function getToolTranslation(slug: string, locale: Locale): LocalizedToolContent {
  const localizedEntry = PILOT_TRANSLATIONS[slug]?.[locale];

  // Find English fallback from toolsMaster
  const enTool = toolsMaster.find((t) => t.slug === slug);
  const defaultName = enTool?.name || slug;
  const defaultDesc = enTool?.description || '';
  const defaultSeoTitle = enTool?.seoTitle || enTool?.title || defaultName;
  const defaultSeoDesc = enTool?.seoDescription || defaultDesc;
  const defaultQuickAnswer = enTool?.quickAnswer || '';
  const defaultHowToUse = enTool?.seoHowToUse || enTool?.howToUse || '';
  const defaultHowItWorks = enTool?.seoHowItWorks || '';
  const defaultFormula = enTool?.formula || '';
  const defaultExample = enTool?.seoExample || '';
  const defaultFaqs = enTool?.seoFaqs || enTool?.faqs || [];

  if (!localizedEntry) {
    return {
      name: defaultName,
      seoTitle: defaultSeoTitle,
      seoDescription: defaultSeoDesc,
      description: defaultDesc,
      quickAnswer: defaultQuickAnswer,
      seoHowToUse: defaultHowToUse,
      seoHowItWorks: defaultHowItWorks,
      formula: defaultFormula,
      seoExample: defaultExample,
      faqs: defaultFaqs,
    };
  }

  return {
    name: localizedEntry.name || defaultName,
    seoTitle: localizedEntry.seoTitle || defaultSeoTitle,
    seoDescription: localizedEntry.seoDescription || defaultSeoDesc,
    description: localizedEntry.description || defaultDesc,
    quickAnswer: localizedEntry.quickAnswer || defaultQuickAnswer,
    seoHowToUse: localizedEntry.seoHowToUse || defaultHowToUse,
    seoHowItWorks: localizedEntry.seoHowItWorks || defaultHowItWorks,
    formula: localizedEntry.formula || defaultFormula,
    seoExample: localizedEntry.seoExample || defaultExample,
    faqs: localizedEntry.faqs && localizedEntry.faqs.length > 0 ? localizedEntry.faqs : defaultFaqs,
    ui: localizedEntry.ui,
  };
}
