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
      name: 'Calculadora de Amortización',
      seoTitle: 'Calculadora de Amortización de Préstamos | HelloTools',
      seoDescription: 'Calcula el calendario de amortización mensual de tu préstamo, cuotas e intereses totales.',
      description: 'Genera un calendario de amortización detallado mes a mes para visualizar pagos de principal e intereses.',
      quickAnswer: 'Una tabla de amortización desglosa cada cuota mensual en pago de capital e intereses durante la vida del préstamo.',
      seoHowToUse: '1. Introduce el importe del préstamo.\n2. Indica la tasa de interés anual (% p.a.).\n3. Selecciona el plazo del préstamo en años o meses.\n4. Revisa la cuota mensual y la tabla detallada.',
      seoHowItWorks: 'La amortización utiliza la fórmula de cuota fija donde el interés se calcula sobre el saldo pendiente residual.',
      formula: 'Cuota Mensual = P * [r(1+r)^n] / [(1+r)^n - 1]',
      seoExample: 'Para un préstamo de $100.000 al 5% anual a 30 años, la cuota fija mensual es de $536,82.',
      faqs: [
        { q: '¿Qué es una tabla de amortización?', a: 'Es un cuadro detallado que muestra cómo se divide cada pago en amortización de capital e intereses.' },
        { q: '¿Cómo afecta un pago adicional?', a: 'Los pagos adicionales reducen directamente el saldo principal, disminuyendo el costo total de intereses.' }
      ]
    },
    de: {
      name: 'Tilgungsrechner',
      seoTitle: 'Tilgungsrechner & Kredit-Tilgungsplan | HelloTools',
      seoDescription: 'Berechnen Sie Ihren detaillierten Tilgungsplan, Monatstilgungen und Gesamtzinsen.',
      description: 'Erstellen Sie einen vollständigen Tilgungsplan zur Visualisierung von Tilgungs- und Zinsanteilen.',
      quickAnswer: 'Ein Tilgungsplan schlüsselt jede monatliche Rate in Zins- und Tilgungsanteile über die gesamte Laufzeit auf.',
      seoHowToUse: '1. Geben Sie den Kreditbetrag ein.\n2. Tragen Sie den Jahreszinssatz ein.\n3. Wählen Sie die Laufzeit in Jahren oder Monaten.\n4. Lesen Sie die Monatsrate und den Tilgungsplan ab.',
      seoHowItWorks: 'Die Annuitätentilgung berechnet eine gleichbleibende Monatsrate, wobei der Zinsanteil mit sinkender Restschuld abnimmt.',
      formula: 'Rate = K * [i*(1+i)^n] / [(1+i)^n - 1]',
      seoExample: 'Bei einem Kredit von 100.000 € zu 5 % Zinsen über 30 Jahre beträgt die Monatsrate 536,82 €.',
      faqs: [
        { q: 'Was ist ein Tilgungsplan?', a: 'Eine Tabelle, die für jede Periode Zinsaufwand, Tilgung und Restschuld ausweist.' },
        { q: 'Warum sinkt der Zinsanteil im Laufe der Zeit?', a: 'Weil Zinsen stets auf die verbleibende Restschuld berechnet werden.' }
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
        { q: "Qu'est-ce qu'un tableau d'amortissement ?", a: "Un échéancier détaillant la répartition de chaque mensualité entre capital et intérêts." },
        { q: "Comment réduire le coût total du crédit ?", a: "En effectuant des remboursements anticipés ou en réduisant la durée du prêt." }
      ]
    },
    pt: {
      name: 'Calculadora de Amortização',
      seoTitle: 'Calculadora de Amortização de Empréstimos | HelloTools',
      seoDescription: 'Calcule a tabela de amortização do seu empréstimo, parcelas mensais e juros totais.',
      description: 'Gere um cronograma de amortização detalhado mês a mês para acompanhar pagamentos de principal e juros.',
      quickAnswer: 'Uma tabela de amortização detalha a divisão de cada parcela entre amortização do saldo devedor e juros.',
      seoHowToUse: '1. Digite o valor do empréstimo.\n2. Informe a taxa de juros anual.\n3. Selecione o prazo em anos ou meses.\n4. Visualize o valor da parcela e a tabela completa.',
      seoHowItWorks: 'A amortização utiliza cálculo de parcelas fixas onde a proporção de juros diminui conforme o saldo devedor cai.',
      formula: 'Parcela = P * [i*(1+i)^n] / [(1+i)^n - 1]',
      seoExample: 'Para um empréstimo de R$ 100.000 a 5% ao ano por 30 anos, a parcela mensal é de R$ 536,82.',
      faqs: [
        { q: 'O que é uma tabela de amortização?', a: 'É um relatório que discrimina o pagamento de principal, juros e saldo devedor restante.' },
        { q: 'O que acontece ao fazer amortização extraordinária?', a: 'Reduz o saldo devedor principal, diminuindo os juros futuros ou o prazo do financiamento.' }
      ]
    },
    ja: {
      name: 'ローン返済シミュレーション',
      seoTitle: 'ローン返済・返済スケジュール計算機 | HelloTools',
      seoDescription: '毎月の返済額、元金・利息の内訳、総返済額および返済表を元利均等方式で瞬時に計算します。',
      description: '毎月のローン返済額と詳細な返済スケジュール（元金・利息内訳）をシミュレーションします。',
      quickAnswer: '返済シミュレーションは毎月の返済額に含まれる元金充当分と利息分を期間ごとに明示します。',
      seoHowToUse: '1. 借入金額を入力します。\n2. 年利（金利 %）を入力します。\n3. 返済期間（年または月）を選択します。\n4. 毎月の返済額と返済スケジュールを確認します。',
      seoHowItWorks: '元利均等返済方式では毎月の支払額を一定に保ち、残高の減少に伴い利息割合が減少し元金割合が増加します。',
      formula: '毎月返済額 = P * [r(1+r)^n] / [(1+r)^n - 1]',
      seoExample: '1000万円を年利5%、30年返済（360回）で借り入れた場合、毎月の返済額は53,682円です。',
      faqs: [
        { q: '元利均等返済とは何ですか？', a: '毎月の返済額（元金＋利息）が一定となる返済方式です。' },
        { q: '繰り上げ返済の効果は何ですか？', a: '元金を直接減らすことで、将来発生する利息を大幅に削減できます。' }
      ]
    }
  },

  'bmi-calculator': {
    es: {
      name: 'Calculadora de IMC',
      seoTitle: 'Calculadora de IMC (Índice de Masa Corporal) | HelloTools',
      seoDescription: 'Calcula tu Índice de Masa Corporal (IMC) según tu altura y peso de forma instantánea.',
      description: 'Calcula tu IMC exacto y descubre tu categoría de peso corporal según los estándares de la OMS.',
      quickAnswer: 'El IMC es una medida basada en el peso y la estatura que clasifica el peso en bajo peso, normal, sobrepeso u obesidad.',
      seoHowToUse: '1. Selecciona el sistema de unidades (Métrico o Imperial).\n2. Introduce tu altura y peso.\n3. Haz clic en Calcular para ver tu resultado de IMC y categoría.',
      seoHowItWorks: 'El IMC se calcula dividiendo el peso en kilogramos por el cuadrado de la estatura en metros.',
      formula: 'IMC = Peso (kg) / [Altura (m)]²',
      seoExample: 'Una persona con un peso de 70 kg y una altura de 1,75 m tiene un IMC de 22,86 (Peso Normal).',
      faqs: [
        { q: '¿Qué es un IMC normal?', a: 'Según la OMS, un IMC entre 18,5 y 24,9 se considera peso normal para adultos.' },
        { q: '¿El IMC distingue masa muscular de grasa?', a: 'No, el IMC es un indicador general y no distingue entre masa muscular y grasa corporal.' }
      ]
    },
    de: {
      name: 'BMI Rechner',
      seoTitle: 'BMI Rechner — Body Mass Index Berechnen | HelloTools',
      seoDescription: 'Berechnen Sie Ihren Body-Mass-Index (BMI) schnell und präzise nach WHO-Standard.',
      description: 'Ermitteln Sie Ihren genauen BMI und Ihre Gewichtskategorie basierend auf Größe und Gewicht.',
      quickAnswer: 'Der BMI bewertet das Körpergewicht im Verhältnis zur Körpergröße und teilt es in Untergewicht, Normalgewicht und Übergewicht ein.',
      seoHowToUse: '1. Wählen Sie das Einheitensystem (Metrisch oder Imperial).\n2. Geben Sie Körpergröße und Gewicht ein.\n3. Klicken Sie auf Berechnen, um Ihren BMI zu sehen.',
      seoHowItWorks: 'Der BMI ergibt sich aus dem Körpergewicht in Kilogramm geteilt durch das Quadrat der Körpergröße in Metern.',
      formula: 'BMI = Gewicht (kg) / [Größe (m)]²',
      seoExample: 'Eine Person mit 70 kg Gewicht und 1,75 m Körpergröße hat einen BMI von 22,86 (Normalgewicht).',
      faqs: [
        { q: 'Was ist ein normaler BMI?', a: 'Ein BMI zwischen 18,5 und 24,9 gilt für Erwachsene als Normalgewicht.' },
        { q: 'Gilt der BMI auch für Sportler?', a: 'Bei sehr muskulösen Menschen kann der BMI zu hoch ausfallen, da Muskelmasse schwerer als Fett ist.' }
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
        { q: "Quel est l'IMC idéal ?", a: "Un IMC compris entre 18,5 et 24,9 correspond à une corpulence normale chez l'adulte." },
        { q: "L'IMC est-il fiable pour tous ?", a: "Il donne un repère global mais ne distingue pas la masse musculaire de la masse grasse." }
      ]
    },
    pt: {
      name: 'Calculadora de IMC',
      seoTitle: 'Calculadora de IMC (Índice de Massa Corporal) | HelloTools',
      seoDescription: 'Calcule seu IMC em segundos e confira sua classificação de peso segundo a OMS.',
      description: 'Descubra seu IMC exato e saiba se você está no peso ideal.',
      quickAnswer: 'O IMC é uma métrica universal que relaciona peso e altura para indicar faixas de peso corporal.',
      seoHowToUse: '1. Escolha o sistema métrico ou imperial.\n2. Insira sua altura e seu peso.\n3. Clique em Calcular para ver o IMC e a classificação.',
      seoHowItWorks: 'O IMC é calculado dividindo o peso em quilos pela altura em metros ao quadrado.',
      formula: 'IMC = Peso (kg) / [Altura (m)]²',
      seoExample: 'Uma pessoa com 70 kg e 1,75 m de altura possui IMC de 22,86 (Peso normal).',
      faqs: [
        { q: 'Qual é o IMC considerado saudável?', a: 'Para adultos, um IMC entre 18,5 e 24,9 é considerado saudável.' },
        { q: 'O IMC vale para atletas?', a: 'Atletas com muita massa muscular podem apresentar IMC elevado sem excesso de gordura.' }
      ]
    },
    ja: {
      name: 'BMI計算ツール',
      seoTitle: 'BMI（体格指数）計算ツール | HelloTools',
      seoDescription: '身長と体重を入力するだけで、あなたのBMIと肥満度判定を瞬時に計算します。',
      description: 'WHO（世界保健機関）および日本肥満学会の基準に基づき、正確なBMIを計算します。',
      quickAnswer: 'BMI（Body Mass Index）は体重と身長から肥満度を判定する国際的な指標です。',
      seoHowToUse: '1. 単位系（メートル法）を選択します。\n2. 身長（cmまたはm）と体重（kg）を入力します。\n3. 「計算」ボタンを押してBMIと判定結果を確認します。',
      seoHowItWorks: '体重（kg）を身長（m）の2乗で割ることでBMI値を算出します。',
      formula: 'BMI = 体重 (kg) / [身長 (m)]²',
      seoExample: '身長175cm、体重70kgの人のBMIは 22.86（普通体重）となります。',
      faqs: [
        { q: '適正体重のBMI基準値は？', a: '日本ではBMI 18.5以上 25未満が「普通体重」とされています。' },
        { q: 'BMI 22の意味は何ですか？', a: '統計的に最も病気になりにくいとされる「標準体重」の基準値です。' }
      ]
    }
  },

  'age-calculator': {
    es: {
      name: 'Calculadora de Edad',
      seoTitle: 'Calculadora de Edad Precisa — Años, Meses, Días | HelloTools',
      seoDescription: 'Calcula tu edad exacta en años, meses, días, horas y minutos con tu fecha de nacimiento.',
      description: 'Descubre tu edad exacta transcurrida en años, meses, días e incluso el día de la semana en que naciste.',
      quickAnswer: 'La calculadora de edad determina el tiempo transcurrido exacto entre tu fecha de nacimiento y el día de hoy.',
      seoHowToUse: '1. Selecciona tu fecha de nacimiento.\n2. Elige la fecha de cálculo (por defecto es hoy).\n3. Revisa tu edad en años, meses, días y minutos.',
      seoHowItWorks: 'Calcula la diferencia exacta de días bisiestos y meses de diferente duración entre dos fechas.',
      formula: 'Edad = Fecha de Referencia - Fecha de Nacimiento',
      seoExample: 'Si naciste el 15 de enero de 1990 y hoy es 15 de enero de 2025, tienes exactamente 35 años.',
      faqs: [
        { q: '¿Toma en cuenta los años bisiestos?', a: 'Sí, la calculadora cuenta con precisión cada año bisiesto transcurrido.' }
      ]
    },
    de: {
      name: 'Altersrechner',
      seoTitle: 'Altersrechner — Genaues Alter in Jahren, Monaten, Tagen | HelloTools',
      seoDescription: 'Berechnen Sie Ihr exaktes Alter in Jahren, Monaten, Tagen, Stunden und Minuten.',
      description: 'Ermitteln Sie die exakte verstrichene Zeit seit Ihrem Geburtsdatum auf den Tag genau.',
      quickAnswer: 'Der Altersrechner ermittelt die genaue Zeitspanne zwischen Ihrem Geburtsdatum und dem heutigen Tag.',
      seoHowToUse: '1. Geben Sie Ihr Geburtsdatum ein.\n2. Wählen Sie das Vergleichsdatum (Standard: Heute).\n3. Lesen Sie Ihr exaktes Alter ab.',
      seoHowItWorks: 'Berücksichtigt Schaltjahre und unterschiedliche Monatslängen bei der Differenzberechnung.',
      formula: 'Alter = Zieldatum - Geburtsdatum',
      seoExample: 'Geboren am 15. Januar 1990 ergibt am 15. Januar 2025 exakt 35 Jahre.',
      faqs: [
        { q: 'Werden Schaltjahre berücksichtigt?', a: 'Ja, Schaltjahre werden präzise in die Berechnungen einbezogen.' }
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
        { q: "Prend-il en compte les années bissextiles ?", a: "Oui, le calcul inclut le nombre exact de jours bissextiles." }
      ]
    },
    pt: {
      name: 'Calculadora de Idade',
      seoTitle: 'Calculadora de Idade Exata — Anos, Meses e Dias | HelloTools',
      seoDescription: 'Descubra sua idade exata em anos, meses, dias, horas e minutos a partir da data de nascimento.',
      description: 'Calcule o tempo exato decorrido desde o seu nascimento em múltiplos formatos.',
      quickAnswer: 'A calculadora determina o tempo preciso decorrido entre sua data de nascimento e o momento atual.',
      seoHowToUse: '1. Selecione sua data de nascimento.\n2. Escolha a data de comparação (hoje por padrão).\n3. Veja sua idade detalhada.',
      seoHowItWorks: 'Calcula a diferença calendário considerando anos bissextos e duração exata de cada mês.',
      formula: 'Idade = Data Atual - Data de Nascimento',
      seoExample: 'Quem nasceu em 15/01/1990 completa exatamente 35 anos em 15/01/2025.',
      faqs: [
        { q: 'Considera anos bissextos?', a: 'Sim, todos os dias bissextos são contabilizados no resultado.' }
      ]
    },
    ja: {
      name: '年齢計算ツール',
      seoTitle: '年齢計算機 — 生年月日から正確な年齢・経過日数 | HelloTools',
      seoDescription: '生年月日を入力するだけで、現在の満年齢、誕生してからの経過日数、月数、時間を正確に計算します。',
      description: '生年月日から満年齢、経過月数、総経過日数、生まれた曜日を正確に算出します。',
      quickAnswer: '生年月日と基準日の間の正確な年・月・日・時間を計算するツールです。',
      seoHowToUse: '1. 生年月日を入力します。\n2. 計算基準日（デフォルトは本日）を設定します。\n3. 「計算」をクリックして満年齢と経過日数を確認します。',
      seoHowItWorks: '閏年（うるう年）や月ごとの日数の違いを考慮して日付の差分を正確に計算します。',
      formula: '経過期間 = 計算基準日 - 生年月日',
      seoExample: '1990年1月15日生まれの場合、2025年1月15日で満35歳となります。',
      faqs: [
        { q: 'うるう年は考慮されますか？', a: 'はい、うるう年の挿入日（2月29日）を含めて正確に日数計算を行います。' }
      ]
    }
  },

  'compound-interest-calculator': {
    es: {
      name: 'Calculadora de Interés Compuesto',
      seoTitle: 'Calculadora de Interés Compuesto | HelloTools',
      seoDescription: 'Calcula el crecimiento de tu inversión con interés compuesto a lo largo del tiempo.',
      description: 'Visualiza la fuerza del interés compuesto en tus ahorros e inversiones con aportaciones periódicas.',
      quickAnswer: 'El interés compuesto suma los intereses generados al capital inicial, haciendo que los intereses futuros generen aún más intereses.',
      seoHowToUse: '1. Introduce el capital inicial.\n2. Indica la tasa de interés anual.\n3. Selecciona el plazo y la frecuencia de capitalización.\n4. Revisa el balance final acumulado.',
      seoHowItWorks: 'Aplica la fórmula exponencial de capitalización continua o periódica sobre el capital acumulado.',
      formula: 'A = P * (1 + r/n)^(n*t)',
      seoExample: 'Un depósito de $10.000 al 6% anual durante 10 años capitalizable anualmente crece hasta $17.908,48.',
      faqs: [
        { q: '¿Cuál es la diferencia entre interés simple y compuesto?', a: 'El interés simple solo calcula sobre el capital inicial; el compuesto calcula sobre el capital más los intereses acumulados.' }
      ]
    },
    de: {
      name: 'Zinseszinsrechner',
      seoTitle: 'Zinseszinsrechner — Zinseszins Online Berechnen | HelloTools',
      seoDescription: 'Berechnen Sie das Wachstum Ihrer Geldanlage durch den Zinseszinseffekt.',
      description: 'Simulieren Sie Vermögensaufbau und Zinseszinswachstum mit monatlichen Sparraten.',
      quickAnswer: 'Beim Zinseszins werden erwirtschaftete Zinsen dem Kapital zugeschlagen und in Folgeperioden mitverzinst.',
      seoHowToUse: '1. Geben Sie das Startkapital ein.\n2. Tragen Sie den Zinssatz pro Jahr ein.\n3. Wählen Sie Anlagedauer und Zinsintervall.\n4. Lesen Sie das Endkapital ab.',
      seoHowItWorks: 'Berechnet den exponentiellen Vermögenszuwachs durch die Wiederanlage von Zinserträgen.',
      formula: 'Endkapital = K * (1 + p/100)^n',
      seoExample: '10.000 € Anlagesumme bei 6 % Zinsen über 10 Jahre wachsen auf 17.908,48 € an.',
      faqs: [
        { q: 'Was bedeutet Zinseszins?', a: 'Dass Zinsen reinvestiert werden und selbst wieder Zinsen bringen.' }
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
        { q: "Quelle est la différence avec les intérêts simples ?", a: "Les intérêts simples ne rapportent des intérêts que sur la mise initiale." }
      ]
    },
    pt: {
      name: 'Calculadora de Juros Compostos',
      seoTitle: 'Calculadora de Juros Compostos | HelloTools',
      seoDescription: 'Calcule a evolução dos seus investimentos com a força dos juros compostos.',
      description: 'Simule o crescimento do seu patrimônio com depósitos iniciais e aportes mensais.',
      quickAnswer: 'Juros compostos são juros sobre juros: os rendimentos de cada período são incorporados ao principal.',
      seoHowToUse: '1. Insira o valor inicial investido.\n2. Digite a taxa de juros anual ou mensal.\n3. Defina o período do investimento.\n4. Veja o montante final acumulado.',
      seoHowItWorks: 'Calcula o rendimento exponencial somando os juros ao montante a cada período de capitalização.',
      formula: 'M = C * (1 + i)^t',
      seoExample: 'Um aporte de R$ 10.000 a 6% ao ano durante 10 anos rende um total final de R$ 17.908,48.',
      faqs: [
        { q: 'Qual a vantagem dos juros compostos no longo prazo?', a: 'No longo prazo, a curva de crescimento fica exponencial, multiplicando o rendimento acumulado.' }
      ]
    },
    ja: {
      name: '複利計算シミュレーター',
      seoTitle: '複利計算シミュレーター — 資産運用・積立計算 | HelloTools',
      seoDescription: '元本・金利・期間・積立額を入力して資産が複利効果でどのように増えるかをシミュレーションします。',
      description: '長期投資や資産形成における複利効果（元本＋利息への利息発生）を正確に計算します。',
      quickAnswer: '複利計算とは、得られた利息を元本に組み入れて再び利息を発生させる計算方式です。',
      seoHowToUse: '1. 初期投資額（元本）を入力します。\n2. 年利（金利 %）を入力します。\n3. 運用期間（年）を選択します。\n4. 将来の運用成果（元利合計）を確認します。',
      seoHowItWorks: '期間ごとに生じる利息を次期の元本に加算して指数関数的な運用成長を算出します。',
      formula: '元利合計 = 元本 * (1 + 年利)^運用年数',
      seoExample: '元本100万円を年利6%で10年間複利運用すると、元利合計は約179万848円になります。',
      faqs: [
        { q: '単利と複利の違いは何ですか？', a: '単利は当初の元本のみに利息がつきますが、複利は利息にも利息がつきます。' }
      ]
    }
  },

  'percentage-calculator': {
    es: {
      name: 'Calculadora de Porcentajes',
      seoTitle: 'Calculadora de Porcentajes Rápida | HelloTools',
      seoDescription: 'Calcula porcentajes, aumentos, descuentos y variaciones porcentuales al instante.',
      description: 'Resuelve cualquier cálculo de porcentaje: qué porcentaje es X de Y, aumento o descuento.',
      quickAnswer: 'Un porcentaje representa una fracción de 100 partes iguales.',
      seoHowToUse: '1. Elige el tipo de cálculo de porcentaje.\n2. Introduce los números.\n3. Obtén el resultado inmediato.',
      seoHowItWorks: 'Utiliza reglas de proporción directa sobre una base cien.',
      formula: 'Porcentaje = (Parte / Total) * 100',
      seoExample: 'El 20% de 150 es 30.',
      faqs: [{ q: '¿Cómo calcular el porcentaje de un número?', a: 'Multiplica el número por el porcentaje y divídelo entre 100.' }]
    },
    de: {
      name: 'Prozentrechner',
      seoTitle: 'Prozentrechner — Prozentwert, Prozentsatz Berechnen | HelloTools',
      seoDescription: 'Berechnen Sie Prozentwerte, prozentuale Veränderungen und Rabatte sofort.',
      description: 'Einfacher Prozentrechner für alle mathematischen Prozentfragen des Alltags.',
      quickAnswer: 'Ein Prozent ist ein Hundertstel eines Gesamtwertes.',
      seoHowToUse: '1. Wählen Sie die Rechenart.\n2. Geben Sie die Werte ein.\n3. Lesen Sie das Ergebnis ab.',
      seoHowItWorks: 'Berechnet Werte auf Basis des Verhältnisses zu 100.',
      formula: 'Prozentwert = (Grundwert * Prozentsatz) / 100',
      seoExample: '20 % von 150 ist 30.',
      faqs: [{ q: 'Wie berechnet man Prozent?', a: 'Grundwert mit Prozentsatz multiplizieren und durch 100 teilen.' }]
    },
    fr: {
      name: 'Calculateur de Pourcentage',
      seoTitle: 'Calculateur de Pourcentage Gratuit | HelloTools',
      seoDescription: 'Calculez des pourcentages, augmentations, réductions et variations facilement.',
      description: 'Outil polyvalent pour tous vos calculs de pourcentage au quotidien.',
      quickAnswer: 'Un pourcentage exprime une proportion sur une base de 100.',
      seoHowToUse: '1. Choisissez le type de calcul.\n2. Entrez vos valeurs.\n3. Obtenez le résultat instantanément.',
      seoHowItWorks: 'Applique la règle de trois basée sur 100.',
      formula: 'Valeur = (Total * Pourcentage) / 100',
      seoExample: '20% de 150 égale 30.',
      faqs: [{ q: 'Comment calculer un pourcentage ?', a: 'Multipliez le nombre par le pourcentage puis divisez par 100.' }]
    },
    pt: {
      name: 'Calculadora de Porcentagem',
      seoTitle: 'Calculadora de Porcentagem Online | HelloTools',
      seoDescription: 'Calcule porcentagens, aumentos, descontos e variações percentuais em segundos.',
      description: 'Ferramenta rápida para resolver qualquer conta de porcentagem.',
      quickAnswer: 'Porcentagem é uma razão que representa uma fração de 100.',
      seoHowToUse: '1. Escolha o tipo de cálculo.\n2. Digite os valores.\n3. Veja o resultado imediatamente.',
      seoHowItWorks: 'Aplica a regra de três direta proporcional a 100.',
      formula: 'Resultado = (Valor * Porcentagem) / 100',
      seoExample: '20% de 150 é igual a 30.',
      faqs: [{ q: 'Como calcular porcentagem?', a: 'Multiplique o valor pela taxa de porcentagem e divida por 100.' }]
    },
    ja: {
      name: 'パーセント計算ツール',
      seoTitle: 'パーセント計算ツール — 割合・割引・変化率 | HelloTools',
      seoDescription: '「〇〇の数値のXX%は？」「〇〇からXX%引きの価格は？」などの計算を瞬時に行います。',
      description: '日常や仕事で使うあらゆるパーセント（割合・値引き・増加率）を簡単に計算します。',
      quickAnswer: 'パーセント（百分率）は全体を100としたときの割合を表す単位です。',
      seoHowToUse: '1. 計算したい項目を選択します。\n2. 数値を入力します。\n3. 計算結果が瞬時に表示されます。',
      seoHowItWorks: '全体を100基準とした比例計算を行います。',
      formula: '割合結果 = (全体 * パーセント) / 100',
      seoExample: '150の20%は 30 です。',
      faqs: [{ q: 'パーセントの計算方法は？', a: '元になる数値にパーセントを掛け、100で割ることで算出できます。' }]
    }
  },

  'emi-calculator': {
    es: {
      name: 'Calculadora de Cuota Mensual (EMI)',
      seoTitle: 'Calculadora de Cuotas de Préstamo (EMI) | HelloTools',
      seoDescription: 'Calcula tu cuota mensual estimada para préstamos personales, de auto o hipotecarios.',
      description: 'Estima la cuota fija mensual (EMI) de tu crédito e intereses totales.',
      quickAnswer: 'EMI (Equated Monthly Installment) es la cantidad fija que pagas cada mes a la entidad financiera.',
      seoHowToUse: '1. Ingrese el monto del crédito.\n2. Ajuste la tasa de interés.\n3. Indique el plazo.',
      seoHowItWorks: 'Utiliza el método de amortización francés de cuota constante.',
      formula: 'EMI = P * r * (1+r)^n / [(1+r)^n - 1]',
      seoExample: 'Para $50.000 al 8% a 5 años, la cuota es $1.013,82.',
      faqs: [{ q: '¿Qué incluye la cuota EMI?', a: 'Incluye una parte de devolución del capital principal y los intereses del periodo.' }]
    },
    de: {
      name: 'Kreditratenrechner (EMI)',
      seoTitle: 'Kreditratenrechner — Monatsrate Berechnen | HelloTools',
      seoDescription: 'Berechnen Sie Ihre monatliche Kreditrate für Ratenkredite und Autokredite.',
      description: 'Ermitteln Sie die genaue Monatsrate und die Gesamtkosten Ihres Kredits.',
      quickAnswer: 'Die EMI (Equal Monthly Installment) ist die gleichbleibende monatliche Rückzahlungsrate.',
      seoHowToUse: '1. Kreditbetrag eingeben.\n2. Zinssatz anpassen.\n3. Laufzeit wählen.',
      seoHowItWorks: 'Berechnung nach der Standard-Annuitätenformel.',
      formula: 'Rate = K * i * (1+i)^n / [(1+i)^n - 1]',
      seoExample: 'Bei 50.000 € zu 8 % über 5 Jahre beträgt die Monatsrate 1.013,82 €.',
      faqs: [{ q: 'Was ist eine Kreditrate?', a: 'Der monatliche Festbetrag aus Zins- und Tilgungsanteil.' }]
    },
    fr: {
      name: 'Calculateur de Mensualité de Prêt (EMI)',
      seoTitle: 'Calculateur de Mensualité de Prêt (EMI) | HelloTools',
      seoDescription: 'Estimez la mensualité constante de votre crédit personnel ou auto.',
      description: 'Calculez votre échéance mensuelle et le coût total de votre prêt.',
      quickAnswer: "L'EMI est la mensualité constante versée à la banque chaque mois.",
      seoHowToUse: '1. Entrez le capital emprunté.\n2. Indiquez le taux d\'intérêt.\n3. Choisissez la durée.',
      seoHowItWorks: 'Basé sur la formule mathématique des mensualités constantes.',
      formula: 'Mensualité = P * r * (1+r)^n / [(1+r)^n - 1]',
      seoExample: 'Pour 50 000 € à 8 % sur 5 ans, la mensualité est de 1 013,82 €.',
      faqs: [{ q: "Que comprend la mensualité ?", a: "Elle comprend une part d'amortissement du capital et une part d'intérêts." }]
    },
    pt: {
      name: 'Calculadora de Parcelas (EMI)',
      seoTitle: 'Calculadora de Parcelas de Empréstimo (EMI) | HelloTools',
      seoDescription: 'Calcule o valor da parcela mensal estimada para seu empréstimo ou financiamento.',
      description: 'Simule o valor da prestação mensal fixa e os juros totais contratados.',
      quickAnswer: 'EMI é a parcela mensal constante paga ao banco durante a vigência do empréstimo.',
      seoHowToUse: '1. Digite o valor financiado.\n2. Insira a taxa de juros.\n3. Selecione o prazo.',
      seoHowItWorks: 'Utiliza a fórmula da Tabela Price de prestações iguais.',
      formula: 'Parcela = P * i * (1+i)^n / [(1+i)^n - 1]',
      seoExample: 'Para R$ 50.000 a 8% ao ano por 5 anos, a parcela mensal é de R$ 1.013,82.',
      faqs: [{ q: 'O que compõe a parcela?', a: 'Uma fração para amortizar a dívida original e outra fração de juros.' }]
    },
    ja: {
      name: 'EMIローン月額計算ツール',
      seoTitle: 'EMIローン毎月返済額計算機 | HelloTools',
      seoDescription: '自動車ローンや個人ローンの毎月の返済額（EMI）と利息総額を簡単に試算できます。',
      description: '借入金、金利、返済期間から毎月の定額返済額（EMI）を算出します。',
      quickAnswer: 'EMI（Equated Monthly Installment）とは、毎月均等に返済する定額返済額のことです。',
      seoHowToUse: '1. 借入希望額を入力します。\n2. 年利（%）を設定します。\n3. 返済期間を指定します。',
      seoHowItWorks: '元利均等返済の計算式に基づき算出します。',
      formula: '毎月返済額 = P * r * (1+r)^n / [(1+r)^n - 1]',
      seoExample: '500万円を年利8%、5年（60回）返済で借りた場合、毎月の返済額は101,382円です。',
      faqs: [{ q: '毎月の返済額は途中で変わりますか？', a: '固定金利であれば全期間にわたって返済額は一定です。' }]
    }
  },

  'calorie-calculator': {
    es: {
      name: 'Calculadora de Calorías',
      seoTitle: 'Calculadora de Calorías Diarias (TDEE & BMR) | HelloTools',
      seoDescription: 'Calcula tus necesidades calóricas diarias para mantener, perder o ganar peso.',
      description: 'Descubre tu Gasto Energético Total Diario (TDEE) y Tasa de Metabolismo Basal (BMR).',
      quickAnswer: 'Tu TDEE son las calorías totales que quemas al día según tu actividad física.',
      seoHowToUse: '1. Introduce edad, género, peso y altura.\n2. Selecciona tu nivel de actividad física.\n3. Obtén tus calorías objetivo.',
      seoHowItWorks: 'Utiliza la ecuación de Mifflin-St Jeor ajustada por factor de actividad.',
      formula: 'TDEE = BMR * Factor de Actividad',
      seoExample: 'Una persona con BMR de 1.600 kcal moderadamente activa necesita unas 2.480 kcal/día.',
      faqs: [{ q: '¿Cuántas calorías debo consumir para perder peso?', a: 'Un déficit razonable es consumir entre 300 y 500 kcal por debajo de tu TDEE.' }]
    },
    de: {
      name: 'Kalorienrechner',
      seoTitle: 'Kalorienrechner — Täglicher Kalorienbedarf (TDEE) | HelloTools',
      seoDescription: 'Berechnen Sie Ihren täglichen Kalorienbedarf zum Abnehmen, Halten oder Zunehmen.',
      description: 'Ermitteln Sie Ihren Grundumsatz (BMR) und Gesamtumsatz (TDEE) präzise.',
      quickAnswer: 'Der Gesamtumsatz gibt an, wie viele Kalorien Sie am Tag insgesamt verbrennen.',
      seoHowToUse: '1. Alter, Geschlecht, Gewicht und Größe eingeben.\n2. Aktivitätslevel wählen.\n3. Zielkalorien ablesen.',
      seoHowItWorks: 'Berechnung nach der Mifflin-St Jeor-Formel multipliziert mit dem Aktivitätsfaktor.',
      formula: 'Gesamtumsatz = Grundumsatz * Aktivitätsfaktor',
      seoExample: 'Bei einem Grundumsatz von 1.600 kcal und moderater Aktivität liegt der Bedarf bei 2.480 kcal/Tag.',
      faqs: [{ q: 'Wie viel Kaloriendefizit ist gesund?', a: 'Ein tägliches Defizit von 300 bis 500 kcal ist nachhaltig und gesund.' }]
    },
    fr: {
      name: 'Calculateur de Calories',
      seoTitle: 'Calculateur de Calories Quotidiennes (TDEE) | HelloTools',
      seoDescription: 'Calculez votre besoin calorique quotidien pour perdre, maintenir ou prendre du poids.',
      description: 'Déterminez votre métabolisme de base (MB) et votre dépense énergétique totale (TDEE).',
      quickAnswer: 'Le TDEE représente le nombre total de calories brûlées chaque jour.',
      seoHowToUse: '1. Entrez âge, sexe, poids et taille.\n2. Choisissez votre niveau d\'activité.\n3. Obtenez vos apports conseillés.',
      seoHowItWorks: 'Utilise la formule de Mifflin-St Jeor pondérée par le coefficient d\'activité.',
      formula: 'TDEE = BMR * Facteur d\'activité',
      seoExample: 'Avec un MB de 1 600 kcal et une activité modérée, votre besoin est de 2 480 kcal/jour.',
      faqs: [{ q: 'Combien de calories enlever pour maigrir ?', a: 'Un déficit de 300 à 500 kcal par jour est recommandé.' }]
    },
    pt: {
      name: 'Calculadora de Calorias',
      seoTitle: 'Calculadora de Calorias Diárias (TDEE) | HelloTools',
      seoDescription: 'Calcule o gasto calórico diário recomendado para emagrecer, manter ou ganhar peso.',
      description: 'Descubra sua Taxa Metabólica Basal (BMR) e seu Gasto Energético Total (TDEE).',
      quickAnswer: 'O TDEE é a quantidade total de calorias que seu corpo queima por dia.',
      seoHowToUse: '1. Insira idade, sexo, peso e altura.\n2. Escolha o nível de atividade física.\n3. Veja suas calorias meta.',
      seoHowItWorks: 'Aplica a equação Mifflin-St Jeor multiplicada pelo fator de atividade.',
      formula: 'TDEE = BMR * Fator de Atividade',
      seoExample: 'Com BMR de 1.600 kcal e atividade moderada, a meta é de 2.480 kcal/dia.',
      faqs: [{ q: 'Quantas calorias cortar para emagrecer?', a: 'Recomenda-se um déficit diário de 300 a 500 kcal.' }]
    },
    ja: {
      name: 'カロリー計算ツール',
      seoTitle: '1日の必要カロリー計算ツール（TDEE・基礎代謝） | HelloTools',
      seoDescription: '年齢・性別・身長・体重・活動量から、1日の消費カロリー（TDEE）と基礎代謝（BMR）を計算します。',
      description: 'ダイエット、現状維持、増量に必要な1日の推定摂取カロリーを計算します。',
      quickAnswer: 'TDEE（総消費カロリー）は日常生活や運動で1日に消費する総エネルギー量です。',
      seoHowToUse: '1. 年齢・性別・身長・体重を入力します。\n2. 普段の運動レベルを選択します。\n3. 目標に応じた必要カロリーを確認します。',
      seoHowItWorks: 'Mifflin-St Jeor式で基礎代謝を計算し、活動度係数を掛け合わせて算出します。',
      formula: 'TDEE = 基礎代謝(BMR) * 活動度係数',
      seoExample: '基礎代謝1,600kcalで適度な運動をする人の1日の消費カロリーは約2,480kcalです。',
      faqs: [{ q: '健康的なカロリー制限の目安は？', a: 'TDEEより300〜500kcalほど少ない摂取カロリーが健康的です。' }]
    }
  },

  'tip-calculator': {
    es: {
      name: 'Calculadora de Propina',
      seoTitle: 'Calculadora de Propina y División de Cuenta | HelloTools',
      seoDescription: 'Calcula rápidamente la propina adecuada y divide la cuenta por persona.',
      description: 'Calcula el monto de propina y divide el total entre el grupo fácilmente.',
      quickAnswer: 'Permite calcular el porcentaje de propina e igualar la cuenta por comensal.',
      seoHowToUse: '1. Introduce la cuenta total.\n2. Selecciona el % de propina.\n3. Indica el número de personas.',
      seoHowItWorks: 'Multiplica la cuenta por el porcentaje de propina y divide el total entre los comensales.',
      formula: 'Total por Persona = (Cuenta + Propina) / Personas',
      seoExample: 'Para una cuenta de $100 con 15% de propina entre 4 personas, cada una paga $28,75.',
      faqs: [{ q: '¿Cuál es el porcentaje normal de propina?', a: 'Varía según el país: en América suele ser del 10% al 20%.' }]
    },
    de: {
      name: 'Trinkgeldrechner',
      seoTitle: 'Trinkgeldrechner & Rechnung Teilen | HelloTools',
      seoDescription: 'Berechnen Sie Trinkgeld und teilen Sie die Restaurantrechnung pro Person.',
      description: 'Schneller Trinkgeldrechner für Restaurantbesuche und Gruppenrechnungen.',
      quickAnswer: 'Berechnet den Trinkgeldbetrag und den Anteil pro Person.',
      seoHowToUse: '1. Rechnungsbetrag eingeben.\n2. Trinkgeld-Prozentsatz wählen.\n3. Personenanzahl angeben.',
      seoHowItWorks: 'Addiert das Trinkgeld zur Rechnung und teilt durch die Personenanzahl.',
      formula: 'Betrag pro Person = (Rechnung + Trinkgeld) / Personen',
      seoExample: '100 € Rechnung mit 15 % Trinkgeld auf 4 Personen aufgeteilt ergibt 28,75 € pro Person.',
      faqs: [{ q: 'Wie viel Trinkgeld ist üblich?', a: 'In Europa sind 5 % bis 10 % üblich.' }]
    },
    fr: {
      name: 'Calculateur de Pourboire',
      seoTitle: 'Calculateur de Pourboire et Partage d\'Addition | HelloTools',
      seoDescription: 'Calculez le pourboire et divisez l\'addition par personne facilement.',
      description: 'Outil pratique pour partager la note au restaurant.',
      quickAnswer: 'Calcule le montant du pourboire et le montant dû par convive.',
      seoHowToUse: '1. Entrez le montant total de l\'addition.\n2. Choisissez le % de pourboire.\n3. Indiquez le nombre de personnes.',
      seoHowItWorks: 'Ajoute le pourboire au total et divise par le nombre de personnes.',
      formula: 'Part = (Addition + Pourboire) / Convives',
      seoExample: 'Une note de 100 € avec 15 % de pourboire divisée par 4 donne 28,75 € par personne.',
      faqs: [{ q: 'Le pourboire es-t-il obligatoire ?', a: 'Selon les pays, le service peut être inclus ou laissé à la discrétion du client.' }]
    },
    pt: {
      name: 'Calculadora de Gorjeta',
      seoTitle: 'Calculadora de Gorjeta e Divisão de Conta | HelloTools',
      seoDescription: 'Calcule a gorjeta do restaurante e divida a conta por pessoa rapidamente.',
      description: 'Facilite a divisão da conta e o cálculo da gorjeta entre amigos.',
      quickAnswer: 'Calcula o valor da gorjeta e a parte correspondente a cada pessoa.',
      seoHowToUse: '1. Insira o valor total da conta.\n2. Escolha a porcentagem de gorjeta.\n3. Digite o número de pessoas.',
      seoHowItWorks: 'Soma a gorjeta ao valor total e divide igualmente entre os participantes.',
      formula: 'Valor por Pessoa = (Conta + Gorjeta) / Pessoas',
      seoExample: 'Uma conta de R$ 100 com 15% de gorjeta dividida para 4 pessoas resulta em R$ 28,75 por pessoa.',
      faqs: [{ q: 'Qual a gorjeta padrão?', a: 'No Brasil, a taxa de serviço padrão sugerida nos restaurantes é de 10% a 15%.' }]
    },
    ja: {
      name: 'チップ計算ツール',
      seoTitle: 'チップ計算＆会計割り勘ツール | HelloTools',
      seoDescription: '海外旅行でのチップ額の計算や、大人数での会計割り勘（割り勘計算）を正確に行います。',
      description: 'お会計金額、チップ率、人数を入力して1人あたりの支払額を計算します。',
      quickAnswer: 'チップ額およびグループでの1人あたりのお会計支払額を算出します。',
      seoHowToUse: '1. お会計の合計金額を入力します。\n2. チップ率（%）を選択します。\n3. 人数を入力します。',
      seoHowItWorks: '合計額にチップ額を加え、人数で等分します。',
      formula: '1人あたりの支払額 = (会計額 + チップ額) / 人数',
      seoExample: '100ドルの会計でチップ15%の場合、合計115ドルとなり、4人で割ると1人28.75ドルです。',
      faqs: [{ q: 'チップ率の相場は？', a: 'アメリカやカナダのレストランでは15%〜20%が一般的です。' }]
    }
  },

  'mortgage-calculator': {
    es: {
      name: 'Calculadora de Hipoteca',
      seoTitle: 'Calculadora de Hipoteca | HelloTools',
      seoDescription: 'Calcula las cuotas mensuales de tu hipoteca, costo total e intereses.',
      description: 'Estima la cuota mensual de tu préstamo hipotecario para la compra de vivienda.',
      quickAnswer: 'Calcula el pago periódico mensual para amortizar una hipoteca inmobiliaria.',
      seoHowToUse: '1. Ingrese el precio de la vivienda y entrada inicial.\n2. Indique tasa de interés y plazo.',
      seoHowItWorks: 'Aplica el sistema de amortización de préstamos hipotecarios a tasa fija.',
      formula: 'Cuota = Principal * r * (1+r)^n / [(1+r)^n - 1]',
      seoExample: 'Para una hipoteca de $200.000 al 4% a 30 años, la cuota es $954,83/mes.',
      faqs: [{ q: '¿Qué es el enganche o entrada inicial?', a: 'Es la cantidad de dinero propio prestada por el comprador al inicio.' }]
    },
    de: {
      name: 'Hypothekenrechner',
      seoTitle: 'Hypothekenrechner — Baufinanzierung Berechnen | HelloTools',
      seoDescription: 'Berechnen Sie Ihre monatliche Baufinanzierungsrate und Zinskosten.',
      description: 'Ermitteln Sie die Monatsrate für Ihre Immobilienfinanzierung.',
      quickAnswer: 'Berechnet die monatliche Immobilienrate bei fester Verzinsung.',
      seoHowToUse: '1. Kaufpreis und Eigenkapital eingeben.\n2. Zinssatz und Tilgung festlegen.',
      seoHowItWorks: 'Berechnung basierend auf Annuitätendarlehen.',
      formula: 'Rate = K * i * (1+i)^n / [(1+i)^n - 1]',
      seoExample: '200.000 € Darlehen zu 4 % über 30 Jahre ergibt 954,83 € Monatsrate.',
      faqs: [{ q: 'Was ist Eigenkapital?', a: 'Das aus eigenen Mitteln eingebrachte Geld beim Immobilienkauf.' }]
    },
    fr: {
      name: 'Calculateur Hypothécaire',
      seoTitle: 'Calculateur d\'Emprunt Immobilier et Hypothèque | HelloTools',
      seoDescription: 'Calculez la mensualité de votre prêt immobilier et le coût total.',
      description: 'Estimez vos mensualités pour votre projet d\'achat immobilier.',
      quickAnswer: 'Calcule l\'échéance mensuelle d\'un crédit immobilier.',
      seoHowToUse: '1. Entrez le prix du bien et votre apport.\n2. Indiquez le taux et la durée.',
      seoHowItWorks: 'Formule des prêts amortissables à taux fixe.',
      formula: 'Mensualité = P * r * (1+r)^n / [(1+r)^n - 1]',
      seoExample: 'Pour un emprunt de 200 000 € à 4 % sur 30 ans, la mensualité est de 954,83 €.',
      faqs: [{ q: 'Qu\'est-ce que l\'apport personnel ?', a: 'La somme que l\'emprunteur injecte lui-même dans son projet.' }]
    },
    pt: {
      name: 'Calculadora de Hipoteca',
      seoTitle: 'Calculadora de Financiamento Imobiliário | HelloTools',
      seoDescription: 'Calcule o valor das parcelas do seu financiamento imobiliário.',
      description: 'Simule as parcelas mensais e o custo total da compra da casa própria.',
      quickAnswer: 'Estima as prestações periódicas de um empréstimo imobiliário.',
      seoHowToUse: '1. Digite o valor do imóvel e a entrada.\n2. Informe a taxa de juros e o prazo.',
      seoHowItWorks: 'Calcula o parcelamento com base em parcelas fixas ou amortização.',
      formula: 'Parcela = P * i * (1+i)^n / [(1+i)^n - 1]',
      seoExample: 'Um financiamento de R$ 200.000 a 4% ao ano por 30 anos gera parcelas de R$ 954,83.',
      faqs: [{ q: 'O que é a entrada no financiamento?', a: 'O valor pago à vista pelo comprador no momento da contratação.' }]
    },
    ja: {
      name: '住宅ローン計算ツール',
      seoTitle: '住宅ローン計算シミュレーター | HelloTools',
      seoDescription: '物件価格、頭金、金利、返済期間から毎月の住宅ローン返済額を試算します。',
      description: 'マイホーム購入のための住宅ローン毎月返済額と総支払額をシミュレーションします。',
      quickAnswer: '住宅購入時の借入金に対する毎月の返済額を算出します。',
      seoHowToUse: '1. 物件価格と頭金を入力します。\n2. 借入金利（%）と返済期間（年）を設定します。',
      seoHowItWorks: '元利均等返済方式で毎月の支払額を計算します。',
      formula: '毎月返済額 = P * r * (1+r)^n / [(1+r)^n - 1]',
      seoExample: '2000万円を金利4%、30年返済で借りた場合、毎月の返済額は95,483円です。',
      faqs: [{ q: '頭金を入れるメリットは？', a: '借入額が減るため、総利息負担と毎月の返済額を軽減できます。' }]
    }
  },

  'unit-converter': {
    es: {
      name: 'Conversor de Unidades',
      seoTitle: 'Conversor de Unidades Universal | HelloTools',
      seoDescription: 'Convierte longitud, peso, temperatura, área y volumen al instante.',
      description: 'Convierte fácilmente entre unidades métricas e imperiales de forma precisa.',
      quickAnswer: 'Permite transformar magnitudes de una unidad de medida a otra.',
      seoHowToUse: '1. Selecciona la categoría de unidad.\n2. Ingrese el valor y elige las unidades.',
      seoHowItWorks: 'Utiliza factores de conversión internacionales estandarizados.',
      formula: 'Valor Convertido = Valor Original * Factor',
      seoExample: '1 pulgada equivale a 2,54 centímetros.',
      faqs: [{ q: '¿Es compatible con unidades métricas e imperiales?', a: 'Sí, cubre ambos sistemas de medidas.' }]
    },
    de: {
      name: 'Einheitenumrechner',
      seoTitle: 'Einheitenumrechner — Länge, Gewicht, Temperatur | HelloTools',
      seoDescription: 'Rechnen Sie Maßeinheiten für Länge, Gewicht, Temperatur und Fläche um.',
      description: 'Universeller Umrechner für das metrische und imperiale System.',
      quickAnswer: 'Wandelt Messwerte von einer Einheit in eine andere um.',
      seoHowToUse: '1. Kategorie wählen.\n2. Wert eingeben und Einheiten festlegen.',
      seoHowItWorks: 'Verwendet exakte internationale Umrechnungsfaktoren.',
      formula: 'Zielwert = Ausgangswert * Faktor',
      seoExample: '1 Zoll entspricht 2,54 Zentimetern.',
      faqs: [{ q: 'Werden metrische Einheiten unterstützt?', a: 'Ja, alle gängigen metrischen und imperialen Einheiten.' }]
    },
    fr: {
      name: 'Convertisseur d\'Unités',
      seoTitle: 'Convertisseur d\'Unités Universal | HelloTools',
      seoDescription: 'Convertissez longueur, masse, température, surface et volume facilement.',
      description: 'Convertissez rapidement entre le système métrique et impérial.',
      quickAnswer: 'Permet de convertir des valeurs entre différentes unités de mesure.',
      seoHowToUse: '1. Sélectionnez la catégorie.\n2. Saisissez la valeur et choisissez les unités.',
      seoHowItWorks: 'Applique des facteurs de conversion normalisés.',
      formula: 'Valeur Convertie = Valeur de Départ * Facteur',
      seoExample: '1 pouce équivaut à 2,54 centimètres.',
      faqs: [{ q: 'Prend-il en charge le système métrique ?', a: 'Oui, métrique et impérial sont intégrés.' }]
    },
    pt: {
      name: 'Conversor de Unidades',
      seoTitle: 'Conversor de Unidades Online | HelloTools',
      seoDescription: 'Converta comprimento, peso, temperatura, área e volume em segundos.',
      description: 'Conversão rápida entre o sistema métrico e o sistema imperial.',
      quickAnswer: 'Transforma medidas de uma unidade para outra com precisão.',
      seoHowToUse: '1. Escolha a categoria de medida.\n2. Digite o valor e selecione as unidades.',
      seoHowItWorks: 'Utiliza fatores de conversão internacionais padrão.',
      formula: 'Valor Convertido = Valor * Fator',
      seoExample: '1 polegada equivale a 2,54 centímetros.',
      faqs: [{ q: 'Suporta o sistema métrico?', a: 'Sim, oferece suporte completo ao sistema métrico e imperial.' }]
    },
    ja: {
      name: '単位換算ツール',
      seoTitle: '単位換算ツール — 長さ・重さ・温度・面積 | HelloTools',
      seoDescription: '長さ、重量、温度、面積、体積などの単位を即座に相互換算します。',
      description: 'メートル法とヤード・ポンド法（インチ、ポンド等）を簡単かつ正確に相互変換します。',
      quickAnswer: '異なる単位間の度量衡を計算・変換するツールです。',
      seoHowToUse: '1. 換算したい測定カテゴリを選択します。\n2. 数値を入力し、変換前後の単位を指定します。',
      seoHowItWorks: '国際標準の単位換算係数に基づいて算定します。',
      formula: '変換後数値 = 変換前数値 * 換算係数',
      seoExample: '1インチは 2.54センチメートルです。',
      faqs: [{ q: 'ヤード・ポンド法に対応していますか？', a: 'はい、インチ、フィート、マイル、ポンド等の主要単位に対応しています。' }]
    }
  },

  'discount-calculator': {
    es: {
      name: 'Calculadora de Descuentos',
      seoTitle: 'Calculadora de Descuentos y Rebajas | HelloTools',
      seoDescription: 'Calcula el precio final con descuento, el ahorro total y el importe antes y después de rebajas.',
      description: 'Calcula cuánto ahorras y el precio final de cualquier producto con descuento.',
      quickAnswer: 'Permite calcular el precio final reducido restando el porcentaje de descuento al precio original.',
      seoHowToUse: '1. Introduce el precio original del producto.\n2. Indica el porcentaje de descuento.\n3. Revisa el precio final rebajado y el dinero ahorrado.',
      seoHowItWorks: 'Resta el porcentaje de descuento del precio base: Precio Final = Precio Original * (1 - Descuento/100).',
      formula: 'Precio Final = Precio Original * (1 - % Descuento / 100)',
      seoExample: 'Un producto de $100 con un 20% de descuento cuesta $80, ahorrando $20.',
      faqs: [{ q: '¿Cómo se calcula el descuento?', a: 'Multiplica el precio original por el porcentaje de descuento y divídelo entre 100.' }]
    },
    de: {
      name: 'Rabattrechner',
      seoTitle: 'Rabattrechner — Endpreis & Ersparnis Berechnen | HelloTools',
      seoDescription: 'Berechnen Sie den reduzierten Endpreis und Ihre Ersparnis bei Rabatten und Sonderangeboten.',
      description: 'Ermitteln Sie schnell den Endpreis und Ihren Preisvorteil bei Rabattaktionen.',
      quickAnswer: 'Der Rabattrechner zieht den Prozentsatz vom ursprünglichen Preis ab und zeigt den Sparbetrag.',
      seoHowToUse: '1. Geben Sie den ursprünglichen Preis ein.\n2. Tragen Sie den Rabatt in Prozent ein.\n3. Lesen Sie den Endpreis ab.',
      seoHowItWorks: 'Berechnet den Abzug: Endpreis = Ursprungspreis * (1 - Rabatt/100).',
      formula: 'Endpreis = Ursprungspreis * (1 - Rabatt% / 100)',
      seoExample: 'Bei 100 € Ursprungspreis und 20 % Rabatt beträgt der Endpreis 80 € (Ersparnis 20 €).',
      faqs: [{ q: 'Wie berechnet man den Rabattbetrag?', a: 'Ursprungspreis mit dem Rabattsatz multiplizieren und durch 100 teilen.' }]
    },
    fr: {
      name: 'Calculateur de Solde et Réduction',
      seoTitle: 'Calculateur de Solde et Réduction | HelloTools',
      seoDescription: 'Calculez le prix soldé et l\'économie réalisée lors de vos achats.',
      description: 'Déterminez facilement le prix final après remise et le montant de l\'économie.',
      quickAnswer: 'Calcule le montant de la remise et le prix net à payer après réduction.',
      seoHowToUse: '1. Entrez le prix initial.\n2. Indiquez le pourcentage de remise.\n3. Obtenez le prix final soldé.',
      seoHowItWorks: 'Soustrait le pourcentage du prix initial.',
      formula: 'Prix Final = Prix Initial * (1 - % Remise / 100)',
      seoExample: 'Un article à 100 € avec 20 % de remise coûte 80 € (économie de 20 €).',
      faqs: [{ q: 'Comment calculer une réduction ?', a: 'Multipliez le prix d\'origine par le pourcentage de remise puis divisez par 100.' }]
    },
    pt: {
      name: 'Calculadora de Desconto',
      seoTitle: 'Calculadora de Desconto e Preço Final | HelloTools',
      seoDescription: 'Calcule o preço final com desconto e veja quanto você economiza em suas compras.',
      description: 'Descubra o valor economizado e o preço final após aplicar a porcentagem de desconto.',
      quickAnswer: 'Subtrai o percentual de desconto do preço original para mostrar o valor final a pagar.',
      seoHowToUse: '1. Digite o preço original do produto.\n2. Insira a porcentagem de desconto.\n3. Veja o preço final e a economia.',
      seoHowItWorks: 'Calcula o desconto direto sobre o valor do produto.',
      formula: 'Preço Final = Preço Original * (1 - % Desconto / 100)',
      seoExample: 'Um produto de R$ 100 com 20% de desconto sai por R$ 80, economizando R$ 20.',
      faqs: [{ q: 'Como calcular o valor do desconto?', a: 'Multiplique o preço original pela taxa de desconto e divida por 100.' }]
    },
    ja: {
      name: '割引計算ツール',
      seoTitle: '割引計算ツール — 〇〇%引き・割引き価格 | HelloTools',
      seoDescription: '元の価格と割引率（%引き・〇割引き）を入力して、割引後の価格と節約額を計算します。',
      description: 'ショッピングやセールの割引価格と割引額を瞬時に計算します。',
      quickAnswer: '元の価格から指定された割引率を引いた最終価格を算出します。',
      seoHowToUse: '1. 元の価格を入力します。\n2. 割引率（%引き）を指定します。\n3. 割引後の支払価格を確認します。',
      seoHowItWorks: '元の金額に (1 - 割引率) を掛けて算出します。',
      formula: '割引後価格 = 元の価格 * (1 - 割引率 / 100)',
      seoExample: '10,000円の20%引きは 8,000円（2,000円お得）になります。',
      faqs: [{ q: '〇割引きの計算方法は？', a: '1割は10%引き、2割引きは20%引きとして計算できます。' }]
    }
  },

  'simple-interest-calculator': {
    es: {
      name: 'Calculadora de Interés Simple',
      seoTitle: 'Calculadora de Interés Simple | HelloTools',
      seoDescription: 'Calcula los intereses devengados y el saldo final de un capital sin interés compuesto.',
      description: 'Calcula los intereses lineales generados sobre un capital inicial.',
      quickAnswer: 'El interés simple se calcula únicamente sobre el capital original prestado o invertido.',
      seoHowToUse: '1. Introduce el capital inicial.\n2. Indica la tasa de interés anual (%).\n3. Selecciona el plazo en años o meses.',
      seoHowItWorks: 'Multiplica el capital por la tasa de interés y por el tiempo.',
      formula: 'Interés = Capital * Tasa * Tiempo',
      seoExample: 'Un capital de $1.000 al 5% anual durante 3 años genera $150 de interés.',
      faqs: [{ q: '¿Qué diferencia hay con el interés compuesto?', a: 'El interés simple no acumula intereses sobre los intereses generados.' }]
    },
    de: {
      name: 'Einfacher Zinsrechner',
      seoTitle: 'Einfacher Zinsrechner — Zinsen ohne Zinseszins | HelloTools',
      seoDescription: 'Berechnen Sie Zinsertrag und Endkapital bei linearer Verzinsung.',
      description: 'Ermitteln Sie die Zinsen auf das ursprüngliche Startkapital.',
      quickAnswer: 'Der einfache Zins berechnet Zinsen ausschließlich auf das Anfangskapital.',
      seoHowToUse: '1. Startkapital eingeben.\n2. Zinssatz angeben.\n3. Laufzeit wählen.',
      seoHowItWorks: 'Multipliziert Kapital, Zinssatz und Laufzeit.',
      formula: 'Zinsen = Kapital * Zinssatz * Zeit',
      seoExample: '1.000 € zu 5 % über 3 Jahre ergeben 150 € Zinsen.',
      faqs: [{ q: 'Wann wird einfacher Zins genutzt?', a: 'Bei kurzfristigen Krediten und einfachen Festgeldern.' }]
    },
    fr: {
      name: 'Calculateur d\'Intérêts Simples',
      seoTitle: 'Calculateur d\'Intérêts Simples | HelloTools',
      seoDescription: 'Calculez les intérêts linéaires et le montant final de votre placement.',
      description: 'Calculez le rendement d\'un capital sans capitalisation des intérêts.',
      quickAnswer: 'Les intérêts simples sont calculés uniquement sur le capital initial.',
      seoHowToUse: '1. Entrez le capital initial.\n2. Indiquez le taux d\'intérêt annuel.\n3. Choisissez la durée.',
      seoHowItWorks: 'Multiplie le capital par le taux et la durée.',
      formula: 'Intérêts = Capital * Taux * Durée',
      seoExample: '1 000 € à 5 % sur 3 ans produisent 150 € d\'intérêts.',
      faqs: [{ q: 'Quelle est la différence avec l\'intérêt composé ?', a: 'L\'intérêt simple n\'ajoute pas les intérêts au capital d\'une année sur l\'autre.' }]
    },
    pt: {
      name: 'Calculadora de Juros Simples',
      seoTitle: 'Calculadora de Juros Simples | HelloTools',
      seoDescription: 'Calcule os juros simples e o montante final acumulado sobre o valor inicial.',
      description: 'Simule o rendimento de juros diretos sem capitalização composta.',
      quickAnswer: 'Juros simples incidem exclusivamente sobre o valor do principal investido.',
      seoHowToUse: '1. Digite o valor principal.\n2. Insira a taxa de juros ao ano.\n3. Informe o tempo.',
      seoHowItWorks: 'Multiplica o valor investido pela taxa e pelo período.',
      formula: 'Juros = Principal * Taxa * Tempo',
      seoExample: 'R$ 1.000 a 5% ao ano por 3 anos gera R$ 150 de juros (Montante R$ 1.150).',
      faqs: [{ q: 'O que são juros simples?', a: 'São juros calculados sempre sobre o valor inicial do empréstimo ou aplicação.' }]
    },
    ja: {
      name: '単利計算ツール',
      seoTitle: '単利計算ツール — 元本・金利・利息額 | HelloTools',
      seoDescription: '元本、年利（%）、運用期間から、単利方式による利息額と元利合計を瞬時に計算します。',
      description: '元本のみに金利がかかる単利の運用結果を計算します。',
      quickAnswer: '単利計算は当初の元本に対してのみ利息を計算する方式です。',
      seoHowToUse: '1. 元本金額を入力します。\n2. 年利（%）を指定します。\n3. 運用期間を入力します。',
      seoHowItWorks: '元本 * 金利 * 期間 で利息を算出します。',
      formula: '利息 = 元本 * (年利 / 100) * 期間',
      seoExample: '100万円を年利5%で3年間単利運用した場合、利息は15万円（合計115万円）です。',
      faqs: [{ q: '単利と複利の違いは？', a: '単利は当初の元本だけに利息がつきますが、複利は発生した利息にも利息がつきます。' }]
    }
  },

  'bmr-calculator': {
    es: {
      name: 'Calculadora de BMR (Tasa Metabólica Basal)',
      seoTitle: 'Calculadora de BMR (Metabolismo Basal) | HelloTools',
      seoDescription: 'Calcula tu Tasa Metabólica Basal (BMR) e indica las calorías que quemas en reposo.',
      description: 'Descubre las calorías mínimas que tu cuerpo necesita para mantenerse vivo en reposo.',
      quickAnswer: 'El BMR es la cantidad de energía que el cuerpo quema en reposo absoluto durante 24 horas.',
      seoHowToUse: '1. Introduce edad, género, peso y altura.\n2. Revisa tu BMR en kilocalorías diarias.',
      seoHowItWorks: 'Utiliza la ecuación científica de Mifflin-St Jeor.',
      formula: 'BMR (Hombres) = 10w + 6,25h - 5a + 5 | BMR (Mujeres) = 10w + 6,25h - 5a - 161',
      seoExample: 'Un hombre de 30 años, 70 kg y 175 cm tiene un BMR de aprox. 1.650 kcal/día.',
      faqs: [{ q: '¿Cuál es la diferencia entre BMR y TDEE?', a: 'El BMR son las calorías quemadas en reposo; el TDEE incluye la actividad física diaria.' }]
    },
    de: {
      name: 'Grundumsatzrechner (BMR)',
      seoTitle: 'Grundumsatzrechner (BMR) Berechnen | HelloTools',
      seoDescription: 'Berechnen Sie Ihren Grundumsatz (BMR) in Kalorien pro Tag.',
      description: 'Ermitteln Sie den minimalen Kalorienbedarf Ihres Körpers im Ruhezustand.',
      quickAnswer: 'Der Grundumsatz (BMR) ist die Energiemenge, die der Körper bei absoluter Ruhe benötigt.',
      seoHowToUse: '1. Alter, Geschlecht, Gewicht und Größe eingeben.\n2. Grundumsatz ablesen.',
      seoHowItWorks: 'Berechnet nach der modernen Mifflin-St Jeor-Formel.',
      formula: 'BMR (Männer) = 10w + 6.25h - 5a + 5 | BMR (Frauen) = 10w + 6.25h - 5a - 161',
      seoExample: 'Ein 30-jähriger Mann mit 70 kg und 175 cm hat einen Grundumsatz von ca. 1.650 kcal/Tag.',
      faqs: [{ q: 'Was bedeutet BMR?', a: 'Basal Metabolic Rate — die Energie für lebensnotwendige Körperfunktionen im Ruhestand.' }]
    },
    fr: {
      name: 'Calculateur de Métabolisme de Base (MB)',
      seoTitle: 'Calculateur de Métabolisme de Base (MB / BMR) | HelloTools',
      seoDescription: 'Calculez votre métabolisme de base (MB) et découvrez vos calories au repos.',
      description: 'Déterminez l\'énergie minimale consommée par votre organisme au repos.',
      quickAnswer: 'Le MB représente la quantité de calories brûlées par le corps au repos complet.',
      seoHowToUse: '1. Entrez âge, sexe, poids et taille.\n2. Obtenez votre métabolisme de base.',
      seoHowItWorks: 'Applique la formule reconnue de Mifflin-St Jeor.',
      formula: 'MB (Hommes) = 10p + 6.25t - 5a + 5 | MB (Femmes) = 10p + 6.25t - 5a - 161',
      seoExample: 'Un homme de 30 ans, 70 kg et 175 cm a un MB d\'environ 1 650 kcal/jour.',
      faqs: [{ q: 'Quelle est la différence entre MB et TDEE ?', a: 'Le MB correspond au repos total, le TDEE inclut les activités et l\'exercice physique.' }]
    },
    pt: {
      name: 'Calculadora de Taxa Metabólica Basal (TMB)',
      seoTitle: 'Calculadora de TMB (Taxa Metabólica Basal) | HelloTools',
      seoDescription: 'Calcule sua Taxa Metabólica Basal (TMB) e descubra seu gasto calórico em repouso.',
      description: 'Descubra a quantidade mínima de calorias que seu corpo queima para se manter vivo.',
      quickAnswer: 'A TMB é a quantidade de energia necessária para manter as funções vitais em repouso.',
      seoHowToUse: '1. Digite idade, sexo, peso e altura.\n2. Veja seu resultado em calorias/dia.',
      seoHowItWorks: 'Utiliza a equação validada de Mifflin-St Jeor.',
      formula: 'TMB (Homens) = 10w + 6,25h - 5a + 5 | TMB (Mulheres) = 10w + 6,25h - 5a - 161',
      seoExample: 'Um homem de 30 anos, 70 kg e 175 cm tem TMB de aprox. 1.650 kcal/dia.',
      faqs: [{ q: 'Para que serve a TMB?', a: 'Serve como base essencial para estruturar dietas de emagrecimento ou ganho muscular.' }]
    },
    ja: {
      name: '基礎代謝量（BMR）計算ツール',
      seoTitle: '基礎代謝量（BMR）計算ツール — 安静時カロリー | HelloTools',
      seoDescription: '年齢、性別、身長、体重から、1日あたり呼吸や体温維持等で消費する基礎代謝量（BMR）を計算します。',
      description: '呼吸や心拍など生命維持に最低限必要な1日の消費エネルギー量を計算します。',
      quickAnswer: 'BMR（基礎代謝量）は体が24時間完全な安静状態で消費する最小エネルギーです。',
      seoHowToUse: '1. 年齢・性別・身長・体重を入力します。\n2. 基礎代謝量（kcal/日）を確認します。',
      seoHowItWorks: '国際的に標準的なMifflin-St Jeor式を用いて算出します。',
      formula: 'BMR = 10*体重(kg) + 6.25*身長(cm) - 5*年齢 + 調整値',
      seoExample: '30歳・男性・体重70kg・身長175cmの場合、基礎代謝量は約1,650kcal/日です。',
      faqs: [{ q: '基礎代謝を上げるには？', a: '筋肉量を増やし、規則正しい生活や十分な睡眠をとることが効果的です。' }]
    }
  },

  'water-intake-calculator': {
    es: {
      name: 'Calculadora de Consumo de Agua',
      seoTitle: 'Calculadora de Consumo Diario de Agua | HelloTools',
      seoDescription: 'Calcula cuánta agua debes beber al día según tu peso corporal y actividad física.',
      description: 'Calcula tu meta diaria recomendada de hidratación en litros y vasos de agua.',
      quickAnswer: 'Estima el agua necesaria cada día para mantener una hidratación óptima.',
      seoHowToUse: '1. Introduce tu peso en kg.\n2. Selecciona tu nivel de actividad diaria.\n3. Obtén los litros recomendados al día.',
      seoHowItWorks: 'Calcula aproximadamente 35 ml de agua por kg de peso corporal más compensación por ejercicio.',
      formula: 'Agua (L) = (Peso kg * 0.033) + Ajuste por Ejercicio',
      seoExample: 'Una persona de 70 kg necesita aproximadamente 2,4 a 2,8 litros de agua al día.',
      faqs: [{ q: '¿Cuenta el café o té como agua?', a: 'Sí, pero el agua pura sigue siendo la fuente principal de hidratación saludable.' }]
    },
    de: {
      name: 'Wasserbedarfsrechner',
      seoTitle: 'Wasserbedarfsrechner — Wie viel Wasser trinken? | HelloTools',
      seoDescription: 'Berechnen Sie Ihren täglichen Wasserbedarf basierend auf Körpergewicht und Sport.',
      description: 'Ermitteln Sie Ihre optimale tägliche Flüssigkeitsmenge in Litern.',
      quickAnswer: 'Der Wasserbedarfsrechner zeigt die empfohlene Trinkmenge für Ihren Körper.',
      seoHowToUse: '1. Körpergewicht eingeben.\n2. Aktivitätslevel wählen.\n3. Tagesbedarf in Litern ablesen.',
      seoHowItWorks: 'Basiert auf der Richtlinie von ca. 30-35 ml Wasser pro kg Körpergewicht.',
      formula: 'Wasser (L) = (Gewicht kg * 0,033) + Sportzuschlag',
      seoExample: 'Bei 70 kg Körpergewicht liegt der empfohlene Richtwert bei ca. 2,4 Litern täglich.',
      faqs: [{ q: 'Wie viel Wasser sollte man am Tag trinken?', a: 'Etwa 30 bis 35 ml pro Kilogramm Körpergewicht.' }]
    },
    fr: {
      name: 'Calculateur d\'Apport en Eau',
      seoTitle: 'Calculateur d\'Apport en Eau Quotidien | HelloTools',
      seoDescription: 'Calculez combien de litres d\'eau vous devez boire par jour selon votre poids.',
      description: 'Déterminez votre objectif quotidien d\'hydratation en litres et verres d\'eau.',
      quickAnswer: 'Estime la quantité d\'eau idéale pour maintenir une bonne hydratation.',
      seoHowToUse: '1. Entrez votre poids en kg.\n2. Choisissez votre temps d\'exercice.\n3. Consultez votre recommandation.',
      seoHowItWorks: 'Repose sur le calcul de 35 ml d\'eau par kilo de poids corporel.',
      formula: 'Eau (L) = (Poids kg * 0.035) + Supplément Sport',
      seoExample: 'Une personne de 70 kg a besoin d\'environ 2,45 litres d\'eau par jour.',
      faqs: [{ q: 'Pourquoi est-il important de bien s\'hydrater ?', a: 'L\'eau régule la température corporelle, élimine les toxines et maintient l\'énergie.' }]
    },
    pt: {
      name: 'Calculadora de Consumo de Água',
      seoTitle: 'Calculadora de Consumo Diário de Água | HelloTools',
      seoDescription: 'Descubra quantos litros de água você deve beber por dia conforme seu peso.',
      description: 'Calcule sua meta diária de hidratação em litros e copos de água.',
      quickAnswer: 'Calcula a quantidade recomendada de água com base no peso e exercícios.',
      seoHowToUse: '1. Insira seu peso corporal em kg.\n2. Informe seu nível de atividade física.\n3. Veja a meta recomendada em litros.',
      seoHowItWorks: 'Aplica a fórmula médica de 35 ml de água para cada kg de peso corporal.',
      formula: 'Água (L) = (Peso kg * 0,035) + Adicional por Exercício',
      seoExample: 'Uma pessoa de 70 kg precisa beber cerca de 2,45 litros de água por dia.',
      faqs: [{ q: 'Quantos copos de água dá 2 litros?', a: 'Aproximadamente 8 copos de 250 ml.' }]
    },
    ja: {
      name: '水分摂取量計算ツール',
      seoTitle: '1日の推奨水分摂取量計算ツール | HelloTools',
      seoDescription: '体重と運動時間から、健康維持に必要な1日の推奨水分摂取量（リットル）を計算します。',
      description: '体重と運動量に応じた最適な1日の水分補給量を算出します。',
      quickAnswer: '体重1kgあたり約30〜35mlを基準に1日の必要水分量を計算します。',
      seoHowToUse: '1. 体重（kg）を入力します。\n2. 1日の運動時間を指定します。\n3. 推奨される水分摂取量（L）を確認します。',
      seoHowItWorks: '体重に応じた基本必要量に運動による発汗補正を加えて算出します。',
      formula: '必要水分量(L) = 体重(kg) * 0.033 + 運動加算',
      seoExample: '体重70kgの人の目安は1日あたり約2.3〜2.5リットルです。',
      faqs: [{ q: '水以外の飲み物も水分に含まれますか？', a: 'カフェインや砂糖を含まない水や麦茶が最も理想的な水分補給です。' }]
    }
  },

  'date-difference-calculator': {
    es: {
      name: 'Calculadora de Diferencia de Fechas',
      seoTitle: 'Calculadora de Diferencia de Fechas (Días y Meses) | HelloTools',
      seoDescription: 'Calcula el número exacto de días, semanas y meses transcurridos entre dos fechas.',
      description: 'Descubre cuántos días hay entre dos fechas cualesquiera.',
      quickAnswer: 'Mide el intervalo de tiempo preciso que separa dos fechas del calendario.',
      seoHowToUse: '1. Selecciona la fecha de inicio y la fecha final.\n2. Revisa la diferencia en días totales, semanas y meses.',
      seoHowItWorks: 'Calcula la diferencia calendárica teniendo en cuenta años bisiestos.',
      formula: 'Diferencia = Fecha Final - Fecha Inicial',
      seoExample: 'Entre el 1 de enero y el 31 de diciembre hay exactamente 364 días (o 365 en bisiesto).',
      faqs: [{ q: '¿Incluye el día final en el cómputo?', a: 'Puedes elegir si contar el día final o únicamente los días entre medias.' }]
    },
    de: {
      name: 'Datumsdifferenz-Rechner',
      seoTitle: 'Datumsdifferenz-Rechner — Tage Zwischen Zwei Daten | HelloTools',
      seoDescription: 'Berechnen Sie die exakte Anzahl an Tagen, Wochen und Monaten zwischen zwei Datumsangaben.',
      description: 'Ermitteln Sie den genauen Zeitabstand zwischen zwei Daten.',
      quickAnswer: 'Zählt die exakten Kalendertage zwischen einem Start- und Enddatum.',
      seoHowToUse: '1. Startdatum und Enddatum auswählen.\n2. Differenz in Tagen und Wochen ablesen.',
      seoHowItWorks: 'Berücksichtigt Schaltjahre und unterschiedliche Monatslängen.',
      formula: 'Differenz = Enddatum - Startdatum',
      seoExample: 'Vom 1. Januar bis 31. Dezember vergehen genau 364 Tage.',
      faqs: [{ q: 'Werden Schaltjahre mitgezählt?', a: 'Ja, Schaltjahre werden präzise eingerechnet.' }]
    },
    fr: {
      name: 'Calculateur de Différence entre Dates',
      seoTitle: 'Calculateur de Différence entre Deux Dates | HelloTools',
      seoDescription: 'Calculez le nombre de jours, semaines et mois exacts entre deux dates.',
      description: 'Calculez l\'écart calendaire précis entre deux dates.',
      quickAnswer: 'Mesure la durée exacte écoulée entre une date de début et une date de fin.',
      seoHowToUse: '1. Choisissez la date de début et la date de fin.\n2. Obtenez la différence exacte.',
      seoHowItWorks: 'Calcule l\'intervalle en jours ouvrés ou calendaires.',
      formula: 'Écart = Date de fin - Date de début',
      seoExample: 'Du 1er janvier au 31 décembre, il y a 364 jours écoulés.',
      faqs: [{ q: 'Prend-il en compte les années bissextiles ?', a: 'Oui, les jours bissextiles sont inclus.' }]
    },
    pt: {
      name: 'Calculadora de Diferença de Datas',
      seoTitle: 'Calculadora de Diferença entre Datas | HelloTools',
      seoDescription: 'Calcule o número exato de dias, semanas e meses entre duas datas no calendário.',
      description: 'Calcule a quantidade de dias transcorridos entre duas datas.',
      quickAnswer: 'Mede o intervalo preciso em dias e meses entre duas datas.',
      seoHowToUse: '1. Selecione a data inicial e a data final.\n2. Veja o total de dias transcorridos.',
      seoHowItWorks: 'Calcula a diferença exata considerando os anos bissextos.',
      formula: 'Diferença = Data Final - Data Inicial',
      seoExample: 'Entre 01/01 e 31/12 existem 364 dias decorridos.',
      faqs: [{ q: 'Como contar dias entre datas?', a: 'Selecione as duas datas na ferramenta para ver o resultado imediato.' }]
    },
    ja: {
      name: '日付差分計算ツール',
      seoTitle: '日付差分計算ツール — 2つの日付間の日数計算 | HelloTools',
      seoDescription: '開始日と終了日を指定して、2つの日付の間の正確な日数、週数、月数、年数を計算します。',
      description: '2つの日付の間の経過日数や指定日までのカウントダウン日数を計算します。',
      quickAnswer: '開始日と終了日の間の正確な日数差を計算します。',
      seoHowToUse: '1. 開始日と終了日を選択します。\n2. 総経過日数、週数、月数を確認します。',
      seoHowItWorks: 'うるう年や各月の日数を考慮して差分を求めます。',
      formula: '経過日数 = 終了日 - 開始日',
      seoExample: '1月1日から12月31日までの間は364日（うるう年は365日）です。',
      faqs: [{ q: '初日や最終日は日数に含まれますか？', a: '両端を含むか含まないかの計算設定が可能です。' }]
    }
  },

  'time-calculator': {
    es: {
      name: 'Calculadora de Tiempo',
      seoTitle: 'Calculadora de Tiempo — Sumar y Restar Horas | HelloTools',
      seoDescription: 'Suma, resta y calcula intervalos de horas, minutos y segundos fácilmente.',
      description: 'Operaciones rápidas con horas, minutos y segundos.',
      quickAnswer: 'Permite sumar o restar duraciones de tiempo de forma exacta.',
      seoHowToUse: '1. Introduce las horas, minutos y segundos.\n2. Elige sumar o restar.\n3. Obtén el total formateado.',
      seoHowItWorks: 'Convierte tiempos a segundos totales, opera y reformatea.',
      formula: 'Total Segundos = Horas*3600 + Minutos*60 + Segundos',
      seoExample: '2 horas 30 min + 1 hora 45 min = 4 horas 15 min.',
      faqs: [{ q: '¿Cómo sumar horas y minutos?', a: 'Suma los minutos; si superan 60, añade 1 a las horas.' }]
    },
    de: {
      name: 'Zeitrechner',
      seoTitle: 'Zeitrechner — Stunden und Minuten Rechnen | HelloTools',
      seoDescription: 'Addieren und subtrahieren Sie Stunden, Minuten und Sekunden präzise.',
      description: 'Zeiten und Zeitspannen einfach berechnen.',
      quickAnswer: 'Addiert oder subtrahiert Zeitangaben in Stunden und Minuten.',
      seoHowToUse: '1. Zeiten eingeben.\n2. Plus oder Minus wählen.\n3. Ergebnis ablesen.',
      seoHowItWorks: 'Rechnet Zeiten in Sekunden um und formatiert das Ergebnis.',
      formula: 'Gesamt = Zeit 1 +/- Zeit 2',
      seoExample: '2 Std 30 Min + 1 Std 45 Min = 4 Std 15 Min.',
      faqs: [{ q: 'Wie rechnet man Minuten in Stunden um?', a: 'Minuten durch 60 teilen.' }]
    },
    fr: {
      name: 'Calculateur de Temps',
      seoTitle: 'Calculateur de Temps — Heures et Minutes | HelloTools',
      seoDescription: 'Additionnez et soustrayez des heures, minutes et secondes facilement.',
      description: 'Calculs simples sur les durées et horaires.',
      quickAnswer: 'Permet de faire la somme ou la différence de durées temporelles.',
      seoHowToUse: '1. Saisissez les heures et minutes.\n2. Choisissez l\'opération.\n3. Obtenez le résultat.',
      seoHowItWorks: 'Convertit en secondes puis re-formate en HH:MM:SS.',
      formula: 'Durée Totale = Durée 1 +/- Durée 2',
      seoExample: '2h 30m + 1h 45m = 4h 15m.',
      faqs: [{ q: 'Comment additionner des heures ?', a: 'Additionnez les minutes, puis convertissez chaque tranche de 60 min en 1 heure.' }]
    },
    pt: {
      name: 'Calculadora de Tempo',
      seoTitle: 'Calculadora de Tempo — Somar e Subtrair Horas | HelloTools',
      seoDescription: 'Somar e subtrair horas, minutos e segundos de forma rápida e exata.',
      description: 'Faça cálculos com horários e durações de tempo.',
      quickAnswer: 'Calcula a soma ou a diferença entre intervalos de tempo.',
      seoHowToUse: '1. Digite as horas, minutos e segundos.\n2. Selecione a operação (+ ou -).\n3. Veja o total.',
      seoHowItWorks: 'Converte os intervalos para segundos e aplica a operação.',
      formula: 'Total = Tempo 1 +/- Tempo 2',
      seoExample: '2h 30m + 1h 45m = 4h 15m.',
      faqs: [{ q: 'Como somar horas trabalhadas?', a: 'Insira os horários de cada turno na calculadora para obter o total.' }]
    },
    ja: {
      name: '時間計算ツール',
      seoTitle: '時間計算ツール — 時間・分・秒の加算・減算 | HelloTools',
      seoDescription: '時間、分、秒の足し算・引き算や、タイムカードの勤務時間合計を正確に計算します。',
      description: '時間・分・秒の計算や時間差を簡単に求められます。',
      quickAnswer: '時間、分、秒の単位で時間の足し算や引き算を行うツールです。',
      seoHowToUse: '1. 時間・分・秒を入力します。\n2. 加算（+）または減算（-）を選択します。\n3. 計算結果の時間を確認します。',
      seoHowItWorks: 'すべての時間を秒単位に換算して計算し、再度「時:分:秒」に変換します。',
      formula: '合計時間 = 時間1 +/- 時間2',
      seoExample: '2時間30分 + 1時間45分 = 4時間15分 です。',
      faqs: [{ q: '分の繰り上げ計算は自動ですか？', a: 'はい、60分ごとに自動で1時間に繰り上げられます。' }]
    }
  },

  'fraction-calculator': {
    es: {
      name: 'Calculadora de Fracciones',
      seoTitle: 'Calculadora de Fracciones — Suma, Resta, Multiplicación | HelloTools',
      seoDescription: 'Realiza operaciones con fracciones (sumar, restar, multiplicar, dividir) y simplifica el resultado.',
      description: 'Resuelve problemas matemáticos con fracciones paso a paso.',
      quickAnswer: 'Calcula operaciones entre fracciones e identifica la fracción simplificada resultante.',
      seoHowToUse: '1. Introduce el numerador y denominador de cada fracción.\n2. Selecciona la operación (+, -, *, /).\n3. Obtén la fracción reducida.',
      seoHowItWorks: 'Utiliza el mínimo común múltiplo para sumas y simplifica mediante el MCD.',
      formula: 'a/b + c/d = (ad + bc) / bd',
      seoExample: '1/2 + 1/4 = 3/4.',
      faqs: [{ q: '¿Qué es una fracción irreducible?', a: 'Es una fracción simplificada al máximo donde el numerador y denominador no comparten divisores.' }]
    },
    de: {
      name: 'Bruchrechner',
      seoTitle: 'Bruchrechner — Brüche Addieren, Subtrahieren, Multiplizieren | HelloTools',
      seoDescription: 'Führen Sie Bruchrechnungen durch und kürzen Sie das Ergebnis automatisch.',
      description: 'Brüche einfach berechnen und vereinfachen.',
      quickAnswer: 'Berechnet Grundrechenarten für Brüche und gibt den gekürzten Bruch aus.',
      seoHowToUse: '1. Zähler und Nenner eingeben.\n2. Rechenzeichen wählen.\n3. Ergebnis ablesen.',
      seoHowItWorks: 'Nutzt den Hauptnenner zum Addieren und kürzt mit dem ggT.',
      formula: 'a/b + c/d = (ad + bc) / bd',
      seoExample: '1/2 + 1/4 = 3/4.',
      faqs: [{ q: 'Wie kürzt man einen Bruch?', a: 'Zähler und Nenner durch ihren größten gemeinsamen Teiler teilen.' }]
    },
    fr: {
      name: 'Calculateur de Fractions',
      seoTitle: 'Calculateur de Fractions — Addition, Multiplication | HelloTools',
      seoDescription: 'Effectuez des calculs de fractions avec simplification automatique du résultat.',
      description: 'Calculez et simplifiez vos fractions facilement.',
      quickAnswer: 'Réalise les opérations arithmétiques sur les fractions et simplifie le résultat.',
      seoHowToUse: '1. Entrez les numérateurs et dénominateurs.\n2. Choisissez l\'opération.\n3. Lisez la fraction simplifiée.',
      seoHowItWorks: 'Trouve le dénominateur commun et simplifie par le PGCD.',
      formula: 'a/b + c/d = (ad + bc) / bd',
      seoExample: '1/2 + 1/4 = 3/4.',
      faqs: [{ q: 'Comment multiplier deux fractions ?', a: 'Multipliez les numérateurs entre eux et les dénominateurs entre eux.' }]
    },
    pt: {
      name: 'Calculadora de Frações',
      seoTitle: 'Calculadora de Frações — Somar, Subtrair e Multiplicar | HelloTools',
      seoDescription: 'Faça contas com frações e obtenha o resultado simplificado automaticamente.',
      description: 'Resolva operações de frações de forma simples e rápida.',
      quickAnswer: 'Executa as 4 operações básicas com frações e simplifica a resposta.',
      seoHowToUse: '1. Digite o numerador e denominador das frações.\n2. Escolha a operação.\n3. Veja a fração simplificada.',
      seoHowItWorks: 'Aplica o Mínimo Múltiplo Comum (MMC) e simplifica pelo MDC.',
      formula: 'a/b + c/d = (ad + bc) / bd',
      seoExample: '1/2 + 1/4 = 3/4.',
      faqs: [{ q: 'Como simplificar uma fração?', a: 'Divida o numerador e o denominador pelo maior divisor comum entre eles.' }]
    },
    ja: {
      name: '分数計算ツール',
      seoTitle: '分数計算ツール — 分数の足し算・引き算・掛け算・割り算 | HelloTools',
      seoDescription: '分子と分母を入力して、分数の四則演算と自動約分（通分・帯分数表示）を行います。',
      description: '分数の足し算・引き算・掛け算・割り算を簡単に行い、約分した結果を表示します。',
      quickAnswer: '分数の四則演算を行い、最大公約数で約分した結果を算出します。',
      seoHowToUse: '1. 分数1と分数2の分子・分母を入力します。\n2. 演算子（＋, −, ×, ÷）を選択します。\n3. 約分された計算結果を確認します。',
      seoHowItWorks: '通分して計算後、最大公約数（GCD）で約分します。',
      formula: 'a/b + c/d = (ad + bc) / bd',
      seoExample: '1/2 + 1/4 = 3/4 です。',
      faqs: [{ q: '約分とは何ですか？', a: '分子と分母を共通の約数で割り、最も簡単な分数の形にすることです。' }]
    }
  },

  'average-calculator': {
    es: {
      name: 'Calculadora de Promedio y Media',
      seoTitle: 'Calculadora de Promedio, Media, Mediana y Moda | HelloTools',
      seoDescription: 'Calcula la media aritmética, mediana, moda y rango de una serie de números.',
      description: 'Obtén el promedio exacto y estadísticas básicas de tus datos.',
      quickAnswer: 'Suma todos los números de un conjunto y divide el resultado entre la cantidad total de valores.',
      seoHowToUse: '1. Introduce una lista de números separados por comas o espacios.\n2. Revisa la media, mediana, moda y suma total.',
      seoHowItWorks: 'Divide la suma de los valores entre la cantidad de elementos.',
      formula: 'Media = Suma(X) / N',
      seoExample: 'El promedio de 10, 20 y 30 es (10+20+30)/3 = 20.',
      faqs: [{ q: '¿Qué es la mediana?', a: 'Es el valor central que divide un conjunto de datos ordenados en dos partes iguales.' }]
    },
    de: {
      name: 'Mittelwertsrechner',
      seoTitle: 'Mittelwertsrechner — Durchschnitt, Median, Modus | HelloTools',
      seoDescription: 'Berechnen Sie den arithmetischen Durchschnitt, Median und Modus einer Zahlenreihe.',
      description: 'Statistische Kennzahlen einfach ermitteln.',
      quickAnswer: 'Berechnet den Durchschnitt (Mittelwert) einer Reihe von Zahlen.',
      seoHowToUse: '1. Zahlen kommagetrennt eingeben.\n2. Durchschnitt, Median und Summe ablesen.',
      seoHowItWorks: 'Teilt die Gesamtsumme durch die Anzahl der Zahlen.',
      formula: 'Durchschnitt = Summe / Anzahl',
      seoExample: 'Der Durchschnitt von 10, 20 und 30 ist 20.',
      faqs: [{ q: 'Was ist der Unterschied zwischen Mittelwert und Median?', a: 'Der Mittelwert ist der rechnerische Durchschnitt; der Median ist der exakt mittlere Wert.' }]
    },
    fr: {
      name: 'Calculateur de Moyenne',
      seoTitle: 'Calculateur de Moyenne, Médiane et Mode | HelloTools',
      seoDescription: 'Calculez la moyenne arithmétique, la médiane et le mode d\'une série de nombres.',
      description: 'Obtenez la moyenne statistique de vos données.',
      quickAnswer: 'Calcule la somme d\'un ensemble de valeurs divisée par leur nombre total.',
      seoHowToUse: '1. Entrez vos nombres séparés par des virgules.\n2. Obtenez la moyenne et la médiane.',
      seoHowItWorks: 'Divise la somme totale par l\'effectif.',
      formula: 'Moyenne = Somme / Effectif',
      seoExample: 'La moyenne de 10, 20 et 30 est 20.',
      faqs: [{ q: 'Comment calculer une moyenne ?', a: 'Additionnez tous les nombres puis divisez par le nombre de valeurs.' }]
    },
    pt: {
      name: 'Calculadora de Média',
      seoTitle: 'Calculadora de Média, Mediana e Moda | HelloTools',
      seoDescription: 'Calcule a média aritmética, mediana, moda e soma de um conjunto de números.',
      description: 'Descubra a média exata e métricas estatísticas dos seus dados.',
      quickAnswer: 'Soma todos os valores e divide pela quantidade total de elementos.',
      seoHowToUse: '1. Insira os números separados por vírgula.\n2. Veja a média, mediana e total.',
      seoHowItWorks: 'Divide a soma dos números pelo total de elementos.',
      formula: 'Média = Soma / Quantidade',
      seoExample: 'A média de 10, 20 e 30 é (10+20+30)/3 = 20.',
      faqs: [{ q: 'Como calcular a média de notas?', a: 'Some todas as notas e divida pela quantidade de disciplinas.' }]
    },
    ja: {
      name: '平均値・中央値計算ツール',
      seoTitle: '平均値・中央値・最頻値計算ツール | HelloTools',
      seoDescription: '数値データを入力するだけで、算術平均値、中央値（メディアン）、最頻値（モード）、合計値を計算します。',
      description: '複数の数値から平均値や統計指標を簡単に算出します。',
      quickAnswer: 'すべての数値の合計をデータの個数で割った平均値を計算します。',
      seoHowToUse: '1. 数値をカンマやスペース区切りで入力します。\n2. 平均値、中央値、合計値を確認します。',
      seoHowItWorks: '合計値を要素数で除算して平均値を求めて表示します。',
      formula: '平均値 = 数値の合計 / データの個数',
      seoExample: '10, 20, 30 の平均値は (10+20+30)/3 = 20 です。',
      faqs: [{ q: '平均値と中央値の違いは？', a: '平均値は全体の合計を個数で割った値、中央値はデータを順番に並べた中央の値です。' }]
    }
  },

  'word-counter': {
    es: {
      name: 'Contador de Palabras y Caracteres',
      seoTitle: 'Contador de Palabras y Caracteres Online | HelloTools',
      seoDescription: 'Cuenta palabras, caracteres con y sin espacios, frases, párrafos y tiempo de lectura.',
      description: 'Analiza la extensión de tu texto en tiempo real.',
      quickAnswer: 'Cuenta instantáneamente el número de palabras y caracteres de cualquier texto.',
      seoHowToUse: '1. Pega tu texto en el recuadro.\n2. Revisa el conteo de palabras, caracteres y párrafos.',
      seoHowItWorks: 'Procesa la cadena de texto separando por espacios y signos de puntuación.',
      formula: 'Palabras = Conteo de bloques de texto no vacíos',
      seoExample: 'El texto "Hola mundo" contiene 2 palabras y 10 caracteres.',
      faqs: [{ q: '¿Cómo se calcula el tiempo de lectura?', a: 'Se basa en una velocidad promedio de lectura de 200 palabras por minuto.' }]
    },
    de: {
      name: 'Wortzähler & Zeichenzähler',
      seoTitle: 'Wortzähler Online — Wörter und Zeichen Zählen | HelloTools',
      seoDescription: 'Zählen Sie Wörter, Zeichen mit/ohne Leerzeichen, Sätze und Lesezeit in Echtzeit.',
      description: 'Textlänge und Zeichenanzahl sofort analysieren.',
      quickAnswer: 'Zählt Wörter und Zeichen eines eingegebenen Textes in Echtzeit.',
      seoHowToUse: '1. Text in das Feld einfügen.\n2. Anzahl der Wörter und Zeichen ablesen.',
      seoHowItWorks: 'Zerlegt den Text anhand von Leerzeichen in Wörter.',
      formula: 'Wörter = Anzahl wortgetrennter Abschnitte',
      seoExample: 'Der Satz "Hallo Welt" besteht aus 2 Wörtern und 10 Zeichen.',
      faqs: [{ q: 'Werden Leerzeichen mitgezählt?', a: 'Es wird sowohl die Anzahl mit als auch ohne Leerzeichen ausgewiesen.' }]
    },
    fr: {
      name: 'Compteur de Mots et Caractères',
      seoTitle: 'Compteur de Mots et Caractères en Ligne | HelloTools',
      seoDescription: 'Comptez les mots, caractères, phrases, paragraphes et temps de lecture de vos textes.',
      description: 'Analyse la longueur de vos textes en temps réel.',
      quickAnswer: 'Compte instantanément le nombre de mots et de caractères d\'un texte.',
      seoHowToUse: '1. Collez votre texte dans la zone dédiée.\n2. Lisez le nombre de mots et de caractères.',
      seoHowItWorks: 'Découpe la chaîne de caractères selon les espaces.',
      formula: 'Mots = Nombre de mots séparés par des espaces',
      seoExample: 'La phrase "Bonjour le monde" contient 3 mots et 16 caractères.',
      faqs: [{ q: 'Comment est évalué le temps de lecture ?', a: 'Basé sur une vitesse moyenne de 200 mots par minute.' }]
    },
    pt: {
      name: 'Contador de Palavras e Caracteres',
      seoTitle: 'Contador de Palavras e Caracteres Online | HelloTools',
      seoDescription: 'Conte palavras, caracteres com e sem espaços, frases e tempo estimado de leitura.',
      description: 'Analise o tamanho do seu texto em tempo real.',
      quickAnswer: 'Conta o número de palavras e caracteres de qualquer texto instantaneamente.',
      seoHowToUse: '1. Cole ou digite seu texto no campo.\n2. Veja a contagem de palavras e caracteres.',
      seoHowItWorks: 'Analisa a string de texto identificando separadores de palavras.',
      formula: 'Palabras = Total de blocos de texto delimitados',
      seoExample: 'A frase "Olá mundo" tem 2 palavras e 9 caracteres.',
      faqs: [{ q: 'O contador inclui pontuação?', a: 'Sim, a contagem de caracteres inclui todos os símbolos e pontuações.' }]
    },
    ja: {
      name: '文字数・単語数カウントツール',
      seoTitle: '文字数カウント・単語数カウントツール | HelloTools',
      seoDescription: '文章を入力するだけで、文字数（スペースあり/なし）、単語数、原稿用紙枚数、読了時間をカウントします。',
      description: 'リアルタイムで文字数、単語数、行数、読了時間をカウントします。',
      quickAnswer: '入力された文章の文字数や単語数をリアルタイムで計測・表示します。',
      seoHowToUse: '1. テキストボックスに文章を貼り付けます。\n2. 文字数、単語数、行数を確認します。',
      seoHowItWorks: '文字列の長さおよび単語区切り文字を解析します。',
      formula: '文字数 = 全文字数の長さを取得',
      seoExample: '「こんにちは世界」は7文字です。',
      faqs: [{ q: '原稿用紙換算は何文字基準ですか？', a: '400字詰めの一般的な原稿用紙換算で表示します。' }]
    }
  },

  'character-counter': {
    es: {
      name: 'Contador de Caracteres',
      seoTitle: 'Contador de Caracteres Online (Con y Sin Espacios) | HelloTools',
      seoDescription: 'Cuenta caracteres totales con y sin espacios para redes sociales y textos.',
      description: 'Cuenta el número exacto de caracteres de tu texto.',
      quickAnswer: 'Mide la cantidad exacta de caracteres impresos y espacios.',
      seoHowToUse: '1. Escribe o pega tu texto.\n2. Lee los caracteres totales al instante.',
      seoHowItWorks: 'Mide la longitud de la cadena de texto.',
      formula: 'Caracteres = Longitud de texto',
      seoExample: 'El texto "Hola" tiene 4 caracteres.',
      faqs: [{ q: '¿Para qué sirve contar caracteres?', a: 'Es útil para límites de publicaciones en redes sociales como X (Twitter).' }]
    },
    de: {
      name: 'Zeichenzähler',
      seoTitle: 'Zeichenzähler — Zeichen Mit und Ohne Leerzeichen | HelloTools',
      seoDescription: 'Zählen Sie die genaue Zeichenanzahl für Social Media und Texte.',
      description: 'Zeichenanzahl Ihres Textes genau bestimmen.',
      quickAnswer: 'Gibt die exakte Anzahl der Zeichen eines Textes an.',
      seoHowToUse: '1. Text eingeben.\n2. Zeichenzahl ablesen.',
      seoHowItWorks: 'Misst die Länge des String-Objekts.',
      formula: 'Zeichen = String.length',
      seoExample: 'Das Wort "Hallo" hat 5 Zeichen.',
      faqs: [{ q: 'Gibt es ein Zeichenlimit für Posts?', a: 'Ja, soziale Netzwerke haben unterschiedliche Zeichenlimits.' }]
    },
    fr: {
      name: 'Compteur de Caractères',
      seoTitle: 'Compteur de Caractères Gratuit en Ligne | HelloTools',
      seoDescription: 'Comptez la quantité exacte de caractères avec et sans espaces.',
      description: 'Mesurez le nombre exact de caractères de vos messages.',
      quickAnswer: 'Compte le nombre total de lettres, chiffres, symboles et espaces.',
      seoHowToUse: '1. Collez votre texte.\n2. Consultez le nombre de caractères.',
      seoHowItWorks: 'Calcule la longueur de la chaîne.',
      formula: 'Caractères = Longueur de chaîne',
      seoExample: 'Le mot "Bonjour" contient 7 caractères.',
      faqs: [{ q: 'Les espaces sont-ils comptés ?', a: 'Laツール donne à la fois le total avec et sans espaces.' }]
    },
    pt: {
      name: 'Contador de Caracteres',
      seoTitle: 'Contador de Caracteres Online | HelloTools',
      seoDescription: 'Contagem exata de caracteres com e sem espaços para redes sociais.',
      description: 'Descubra a quantidade de caracteres do seu texto.',
      quickAnswer: 'Conta todos os caracteres digitados no texto.',
      seoHowToUse: '1. Digite seu texto.\n2. Veja o total de caracteres.',
      seoHowItWorks: 'Mede o comprimento total da string.',
      formula: 'Caracteres = Comprimento do texto',
      seoExample: 'A palavra "Brasil" tem 6 caracteres.',
      faqs: [{ q: 'Qual o limite do Twitter/X?', a: 'O limite padrão para contas normais é de 280 caracteres.' }]
    },
    ja: {
      name: '文字数カウントツール',
      seoTitle: '文字数カウントツール — 単純文字数計測 | HelloTools',
      seoDescription: 'SNSの投稿文やSEO文章の文字数（スペースあり・なし）を瞬時に測定します。',
      description: '入力した文章の文字数を正確に計測します。',
      quickAnswer: '文字列の長さ（文字数）を正確に計算します。',
      seoHowToUse: '1. 文章を入力します。\n2. 総文字数を確認します。',
      seoHowItWorks: 'JavaScriptの文字列長（length）を取得してカウントします。',
      formula: '文字数 = String.length',
      seoExample: '「テスト」は 3文字です。',
      faqs: [{ q: '改行やスペースもカウントされますか？', a: 'スペースあり・なし両方の文字数が表示されます。' }]
    }
  },

  'password-generator': {
    es: {
      name: 'Generador de Contraseñas Seguras',
      seoTitle: 'Generador de Contraseñas Seguras y Aleatorias | HelloTools',
      seoDescription: 'Crea contraseñas ultra seguras e indescifrables con longitud y símbolos personalizables.',
      description: 'Genera claves al azar fuertes y seguras directamente en tu navegador.',
      quickAnswer: 'Crea contraseñas criptográficamente seguras combinando mayúsculas, minúsculas, números y símbolos.',
      seoHowToUse: '1. Selecciona la longitud deseada (ej. 16 caracteres).\n2. Elige si incluir símbolos o números.\n3. Haz clic en Copiar.',
      seoHowItWorks: 'Utiliza el motor criptográfico aleatorio del navegador (crypto.getRandomValues).',
      formula: 'Entropía = Log2(Conjunto^Longitud)',
      seoExample: 'Una clave de 16 caracteres con símbolos ofrece más de 95 bits de entropía.',
      faqs: [{ q: '¿Se guardan mis contraseñas generadas?', a: 'No, todas las claves se generan localmente en tu navegador y nunca se envían a ningún servidor.' }]
    },
    de: {
      name: 'Passwörter-Generator',
      seoTitle: 'Passwort Generator — Sichere Passwörter Erstellen | HelloTools',
      seoDescription: 'Erstellen Sie hochsichere, zufällige Passwörter direkt im Browser.',
      description: 'Erzeugen Sie zufällige und starke Passwörter.',
      quickAnswer: 'Generiert kryptografisch sichere Zufallspasswörter im Browser.',
      seoHowToUse: '1. Länge wählen (z.B. 16 Zeichen).\n2. Zeichenarten festlegen.\n3. Passwort kopieren.',
      seoHowItWorks: 'Nutzt den sicheren Zufallsgenerator des Browsers.',
      formula: 'Entropie = Log2(Zeichenvorrat^Länge)',
      seoExample: 'Ein 16-stelliges Passwort mit Sonderzeichen bietet höchste Sicherheit.',
      faqs: [{ q: 'Werden Passwörter gespeichert?', a: 'Nein, die Generierung erfolgt zu 100 % lokal auf Ihrem Gerät.' }]
    },
    fr: {
      name: 'Générateur de Mots de Passe Sécurisés',
      seoTitle: 'Générateur de Mots de Passe Sécurisés en Ligne | HelloTools',
      seoDescription: 'Générez des mots de passe forts et aléatoires pour sécuriser vos comptes.',
      description: 'Créez des mots de passe complexes et uniques.',
      quickAnswer: 'Génère des mots de passe aléatoires hautement sécurisés.',
      seoHowToUse: '1. Définissez la longueur désirée.\n2. Cochez les options de caractères.\n3. Copiez votre mot de passe.',
      seoHowItWorks: 'Utilise l\'API de cryptographie du navigateur.',
      formula: 'Entropie = Log2(Taille ensemble^Longueur)',
      seoExample: 'Un mot de passe de 16 caractères avec symboles offre une sécurité maximale.',
      faqs: [{ q: 'Les mots de passe sont-ils enregistrés ?', a: 'Non, les mots de passe sont créés localement et ne quittent jamais votre navigateur.' }]
    },
    pt: {
      name: 'Gerador de Senhas Seguras',
      seoTitle: 'Gerador de Senhas Seguras e Fortes | HelloTools',
      seoDescription: 'Crie senhas aleatórias e fortes com maiúsculas, números e símbolos.',
      description: 'Gere senhas seguras e aleatórias no seu navegador.',
      quickAnswer: 'Gera senhas criptograficamente seguras para proteger suas contas.',
      seoHowToUse: '1. Escolha o tamanho da senha (ex: 16 caracteres).\n2. Marque incluir símbolos e números.\n3. Copie a senha.',
      seoHowItWorks: 'Utiliza o gerador aleatório seguro do próprio navegador.',
      formula: 'Entropia = Log2(Conjunto^Tamanho)',
      seoExample: 'Uma senha de 16 caracteres com símbolos garante alta proteção.',
      faqs: [{ q: 'Minhas senhas ficam salvas?', a: 'Não, todo o processo é feito localmente no seu dispositivo.' }]
    },
    ja: {
      name: 'パスワード自動生成ツール',
      seoTitle: '安全なパスワード自動生成ツール | HelloTools',
      seoDescription: '文字数や使用文字（英大文字・小文字・数字・記号）を指定して強力なパスワードを自動生成します。',
      description: 'セキュリティの高いランダムパスワードを即座に生成します。',
      quickAnswer: '暗号学的に安全な乱数を用いて強力なランダムパスワードを生成します。',
      seoHowToUse: '1. パスワードの文字数（桁数）を指定します。\n2. 記号や数字の有無を選択します。\n3. 「コピー」をクリックして利用します。',
      seoHowItWorks: 'ブラウザの安全な乱数API (crypto.getRandomValues) を使用します。',
      formula: 'エントロピー = Log2(文字種数^桁数)',
      seoExample: '16桁（記号あり）のパスワードは極めて高い安全性を誇ります。',
      faqs: [{ q: '生成したパスワードはサーバーに送信されますか？', a: 'いいえ、すべての処理は端末のブラウザ内で完結するため安全です。' }]
    }
  },

  'password-strength-checker': {
    es: {
      name: 'Medidor de Fuerza de Contraseña',
      seoTitle: 'Medidor de Fuerza y Seguridad de Contraseñas | HelloTools',
      seoDescription: 'Comprueba la fuerza, entropía en bits y tiempo estimado para descifrar tu clave.',
      description: 'Evalúa la seguridad de tus contraseñas antes de usarlas.',
      quickAnswer: 'Mide la robustez de una contraseña calculando su entropía matemática.',
      seoHowToUse: '1. Escribe la contraseña a evaluar.\n2. Revisa el nivel de seguridad y tiempo de descifrado.',
      seoHowItWorks: 'Calcula el espacio de búsqueda y combinaciones posibles.',
      formula: 'Entropía (bits) = Longitud * Log2(Variedad de Caracteres)',
      seoExample: 'Una clave con 12 letras y números requiere años para ser descifrada por fuerza bruta.',
      faqs: [{ q: '¿Es seguro probar mi clave aquí?', a: 'Sí, la verificación ocurre 100% en tu navegador sin enviar nada a internet.' }]
    },
    de: {
      name: 'Passwort-Stärke-Prüfer',
      seoTitle: 'Passwort-Stärke Prüfen — Wie Sicher Ist Mein Passwort? | HelloTools',
      seoDescription: 'Testen Sie die Sicherheit, Entropie und Knackzeit Ihres Passworts.',
      description: 'Bewerten Sie die Stärke Ihres Passworts in Echtzeit.',
      quickAnswer: 'Misst die mathematische Sicherheit und Knackdauer eines Passworts.',
      seoHowToUse: '1. Passwort eingeben.\n2. Sicherheitsstufe und Knackzeit prüfen.',
      seoHowItWorks: 'Berechnet Entropie basierend auf Zeichenvielfalt.',
      formula: 'Entropie = Länge * Log2(Zeichenumfang)',
      seoExample: 'Ein 12-stelliges komplexes Passwort benötigt Jahre zum Knacken.',
      faqs: [{ q: 'Ist die Passwortprüfung sicher?', a: 'Ja, es werden keine Daten an Server übertragen.' }]
    },
    fr: {
      name: 'Testeur de Force de Mot de Passe',
      seoTitle: 'Testeur de Force de Mot de Passe en Ligne | HelloTools',
      seoDescription: 'Testez la robustesse, l\'entropie et le temps de piratage de votre mot de passe.',
      description: 'Évaluez la résistance de vos mots de passe aux attaques.',
      quickAnswer: 'Mesure la sécurité d\'un mot de passe en analysant sa complexité.',
      seoHowToUse: '1. Saisissez votre mot de passe.\n2. Consultez le temps de piratage estimé.',
      seoHowItWorks: 'Calcule l\'entropie en bits selon la variété de caractères.',
      formula: 'Entropie = Longueur * Log2(Jeu de caractères)',
      seoExample: 'Un mot de passe de 12 caractères complexes demande des années à être percé.',
      faqs: [{ q: 'Mon mot de passe est-il envoyé sur un serveur ?', a: 'Non, le test est exécuté localement dans votre navigateur.' }]
    },
    pt: {
      name: 'Verificador de Força de Senha',
      seoTitle: 'Verificador de Força de Senha | HelloTools',
      seoDescription: 'Verifique a segurança, entropia e tempo necessário para quebrar sua senha.',
      description: 'Avalie o nível de segurança da sua senha instantaneamente.',
      quickAnswer: 'Avalia a força de uma senha calculando sua entropia em bits.',
      seoHowToUse: '1. Digite a senha que deseja testar.\n2. Confira o tempo estimado de quebra por força bruta.',
      seoHowItWorks: 'Calcula as combinações possíveis baseadas no tamanho e tipos de caracteres.',
      formula: 'Entropia = Tamanho * Log2(Variedade)',
      seoExample: 'Senhas longas com mistura de caracteres levariam anos para serem descobertas.',
      faqs: [{ q: 'É seguro digitar minha senha aqui?', a: 'Sim, a verificação é 100% feita no seu navegador.' }]
    },
    ja: {
      name: 'パスワード強度判定ツール',
      seoTitle: 'パスワード強度判定・安全性チェッカー | HelloTools',
      seoDescription: 'パスワードの安全度、エントロピー（bits）、解読に必要な推定時間をリアルタイムで判定します。',
      description: 'パスワードのセキュリティ強度や推定解読時間を診断します。',
      quickAnswer: '文字種と桁数から計算される数学的エントロピーに基づき安全度を試算します。',
      seoHowToUse: '1. テストしたいパスワードを入力します。\n2. 強度ランクと推定解読時間を確認します。',
      seoHowItWorks: '組み合わせの総数を計算してエントロピー値を出力します。',
      formula: 'エントロピー = 桁数 * Log2(使用文字種数)',
      seoExample: '英数記号を含む12桁以上のパスワードは解析に数年以上かかります。',
      faqs: [{ q: '入力したパスワードは安全ですか？', a: '外部サーバーへの送信は一切行われず、お使いの端末内で完結します。' }]
    }
  },

  'json-formatter': {
    es: {
      name: 'Formateador y Validador JSON',
      seoTitle: 'Formateador y Validador JSON Online | HelloTools',
      seoDescription: 'Formatea, embellece, valida y minifica código JSON con resaltado de sintaxis.',
      description: 'Embellece y valida estructuras de código JSON fácilmente.',
      quickAnswer: 'Valida la sintaxis de archivos JSON y les aplica sangría limpia para facilitar su lectura.',
      seoHowToUse: '1. Pega tu código JSON.\n2. Haz clic en Formatear o Minificar.\n3. Copia el resultado validado.',
      seoHowItWorks: 'Utiliza el analizador sintáctico JSON nativo (JSON.parse / JSON.stringify).',
      formula: 'Formato = JSON.stringify(JSON.parse(input), null, 2)',
      seoExample: 'Transforma {"a":1} en una estructura jerárquica con sangría legible.',
      faqs: [{ q: '¿Qué ocurre si mi JSON tiene errores?', a: 'La herramienta señalará la posición del error de sintaxis.' }]
    },
    de: {
      name: 'JSON Formatter & Validator',
      seoTitle: 'JSON Formatter & Validator — JSON Verschönern | HelloTools',
      seoDescription: 'Formatieren, validieren und minimieren Sie JSON-Code direkt im Browser.',
      description: 'JSON-Code schnell formatieren und auf Fehler prüfen.',
      quickAnswer: 'Prüft JSON auf Syntaxfehler und bringt es in eine lesbare Form.',
      seoHowToUse: '1. JSON-Code einfügen.\n2. Auf Formatieren klicken.\n3. Formatiertes JSON kopieren.',
      seoHowItWorks: 'Nutzt den nativen Parser JSON.parse & JSON.stringify.',
      formula: 'Output = JSON.stringify(data, null, 2)',
      seoExample: 'Macht unübersichtlichen JSON-Text sofort sauber lesbar.',
      faqs: [{ q: 'Ist meine JSON-Datei hier sicher?', a: 'Ja, die Verarbeitung erfolgt komplett lokal im Browser.' }]
    },
    fr: {
      name: 'Formateur et Validateur JSON',
      seoTitle: 'Formateur et Validateur JSON en Ligne | HelloTools',
      seoDescription: 'Formatez, embellissez, validez et minifiez votre code JSON instantanément.',
      description: 'Rendez votre code JSON lisible et valide.',
      quickAnswer: 'Vérifie la syntaxe JSON et applique l\'indentation.',
      seoHowToUse: '1. Collez votre code JSON.\n2. Cliquez sur Formater.\n3. Copiez le résultat.',
      seoHowItWorks: 'Analyse la structure via l\'API JSON native du navigateur.',
      formula: 'Sortie = JSON.stringify(JSON.parse(code), null, 2)',
      seoExample: 'Transforme du JSON brut en code propre et indenté.',
      faqs: [{ q: 'Puis-je minifier mon JSON ?', a: 'Oui, l\'outil propose l\'option de minification en un clic.' }]
    },
    pt: {
      name: 'Formatador e Validador JSON',
      seoTitle: 'Formatador e Validador JSON Online | HelloTools',
      seoDescription: 'Formate, idente, valide e minifique códigos JSON no seu navegador.',
      description: 'Embora e valide estruturas de código JSON facilmente.',
      quickAnswer: 'Valida a sintaxe JSON e aplica a identação adequada.',
      seoHowToUse: '1. Cole seu código JSON.\n2. Clique em Formatar ou Minificar.\n3. Copie o resultado.',
      seoHowItWorks: 'Processa a estrutura usando JSON.parse nativo.',
      formula: 'JSON Formatado = JSON.stringify(data, null, 2)',
      seoExample: 'Converte JSON compacto em um texto organizado e legível.',
      faqs: [{ q: 'Se houver erro de sintaxe, o que acontece?', a: 'A ferramenta indica a linha onde o erro foi encontrado.' }]
    },
    ja: {
      name: 'JSON整形・バリデーター',
      seoTitle: 'JSON整形・バリデーター（インデント・軽量化） | HelloTools',
      seoDescription: 'JSONコードの整形（インデント付与）、構文エラーチェック（バリデーション）、圧縮（ミニファイ）を行います。',
      description: 'JSONコードの整形、構文エラーチェック、軽量化を瞬時に行います。',
      quickAnswer: 'JSONコードの構文チェックを行い、読みやすいインデント形式に整形します。',
      seoHowToUse: '1. JSONコードを貼り付けます。\n2. 「整形」または「圧縮」をクリックします。\n3. 整形されたコードをコピーします。',
      seoHowItWorks: 'ブラウザの標準機能 (JSON.parse / JSON.stringify) を用いて処理します。',
      formula: 'JSON整形 = JSON.stringify(JSON.parse(text), null, 2)',
      seoExample: '1行のつぶれたJSONコードを見やすいツリー状に成形します。',
      faqs: [{ q: '大きなサイズのJSONも処理できますか？', a: 'ブラウザ上で直接処理するため、高速に動作します。' }]
    }
  },

  'qr-code-generator': {
    es: {
      name: 'Generador de Códigos QR',
      seoTitle: 'Generador de Códigos QR Gratuito | HelloTools',
      seoDescription: 'Crea códigos QR personalizados para páginas web, texto y Wi-Fi en formato imagen.',
      description: 'Genera códigos QR de alta resolución para descargar gratis.',
      quickAnswer: 'Convierte enlaces o textos en códigos QR escaneables por móviles.',
      seoHowToUse: '1. Escribe la URL o texto a convertir.\n2. Ajusta el tamaño deseado.\n3. Descarga la imagen en PNG.',
      seoHowItWorks: 'Codifica los caracteres en una matriz gráfica bidimensional de datos.',
      formula: 'Matriz QR = Codificación de texto a imagen vectorizada',
      seoExample: 'Convierte https://hellotools.net en un código QR listo para imprimir.',
      faqs: [{ q: '¿Tienen fecha de caducidad los códigos QR?', a: 'No, los códigos QR estáticos generados nunca caducan.' }]
    },
    de: {
      name: 'QR-Code Generator',
      seoTitle: 'Kostenloser QR-Code Generator | HelloTools',
      seoDescription: 'Erstellen Sie hochauflösende QR-Codes für URLs, Texte und Kontaktdaten.',
      description: 'QR-Codes einfach erstellen und als Bild herunterladen.',
      quickAnswer: 'Wandelt Links oder Texte in scannbare QR-Codes um.',
      seoHowToUse: '1. URL oder Text eingeben.\n2. Größe anpassen.\n3. QR-Code herunterladen.',
      seoHowItWorks: 'Kodiert Daten in eine zweidimensionale Matrix.',
      formula: 'QR-Matrix = Datenmatrix-Generierung',
      seoExample: 'Erzeugt aus einer Web-Adresse einen sofort scanbaren QR-Code.',
      faqs: [{ q: 'Gibt es ein Auslaufdatum?', a: 'Nein, statische QR-Codes bleiben dauerhaft gültig.' }]
    },
    fr: {
      name: 'Générateur de Code QR',
      seoTitle: 'Générateur de Code QR Gratuit en Ligne | HelloTools',
      seoDescription: 'Créez des codes QR personnalisés pour sites web et textes à télécharger.',
      description: 'Créez des codes QR haute résolution gratuitement.',
      quickAnswer: 'Transforme une URL ou un texte en image QR scannable.',
      seoHowToUse: '1. Saisissez votre texte ou lien.\n2. Personnalisez l\'affichage.\n3. Téléchargez l\'image.',
      seoHowItWorks: 'Encode l\'information dans une matrice de points bidimensionnelle.',
      formula: 'Image QR = Encodage matriciel 2D',
      seoExample: 'Génère un code QR pour partager votre site internet facilement.',
      faqs: [{ q: 'Les codes QR sont-ils gratuits ?', a: 'Oui, la génération et le téléchargement sont 100% gratuits.' }]
    },
    pt: {
      name: 'Gerador de Código QR',
      seoTitle: 'Gerador de Código QR Gratuito | HelloTools',
      seoDescription: 'Crie códigos QR para links, textos e contatos prontos para baixar em PNG.',
      description: 'Gere códigos QR de alta resolução gratuitamente.',
      quickAnswer: 'Converte URLs ou textos em imagens de código QR escaneáveis.',
      seoHowToUse: '1. Digite a URL ou o texto desejado.\n2. Escolha o tamanho.\n3. Baixe a imagem gerada.',
      seoHowItWorks: 'Codifica a informação em uma matriz de pontos bidimensional.',
      formula: 'Código QR = Matriz bidimensional de dados',
      seoExample: 'Crie um código QR para acessar seu site diretamente pela câmera do celular.',
      faqs: [{ q: 'O código QR expira?', a: 'Não, códigos QR estáticos não possuem data de expiração.' }]
    },
    ja: {
      name: 'QRコード作成ツール',
      seoTitle: '無料QRコード作成・自動生成ツール | HelloTools',
      seoDescription: 'ウェブサイトのURLやテキストから、高画質なQRコード画像を即座に作成・ダウンロードできます。',
      description: 'URLやテキストを埋め込んだQRコード画像を瞬時に生成します。',
      quickAnswer: 'テキストやURLをスマートフォンで読み取り可能な2次元バーコード（QRコード）に変換します。',
      seoHowToUse: '1. QRコードにしたいURLやテキストを入力します。\n2. サイズを指定します。\n3. 「ダウンロード」をクリックして保存します。',
      seoHowItWorks: '入力データを2次元シンボルのドットパターンにエンコードします。',
      formula: 'QRコード = 2次元コードマトリックス生成',
      seoExample: 'https://hellotools.net のリンクを印刷用QR画像に変換できます。',
      faqs: [{ q: '作成したQRコードに期限はありますか？', a: 'いいえ、生成された静的QRコードは無期限で利用可能です。' }]
    }
  },

  'base64-converter': {
    es: {
      name: 'Codificador y Decodificador Base64',
      seoTitle: 'Codificador y Decodificador Base64 Online | HelloTools',
      seoDescription: 'Convierte texto normal a codificación Base64 y decodifica cadenas Base64 al instante.',
      description: 'Codifica y decodifica texto en formato Base64.',
      quickAnswer: 'Transforma texto en formato de codificación Base64 y viceversa.',
      seoHowToUse: '1. Pega tu texto o cadena Base64.\n2. Selecciona Codificar o Decodificar.\n3. Copia el resultado.',
      seoHowItWorks: 'Agrupa datos binarios en bloques de 6 bits representados en caracteres ASCII.',
      formula: 'Base64 = btoa(texto) | Texto = atob(base64)',
      seoExample: '"Hola" en Base64 se convierte en "SG9sYQ==".',
      faqs: [{ q: '¿Qué es Base64?', a: 'Es un sistema de codificación que representa datos binarios mediante 64 caracteres ASCII.' }]
    },
    de: {
      name: 'Base64 Kodierer & Dekodierer',
      seoTitle: 'Base64 Kodieren & Dekodieren Online | HelloTools',
      seoDescription: 'Konvertieren Sie Text in Base64 und dekodieren Sie Base64-Strings.',
      description: 'Text in Base64 umwandeln und wieder entschlüsseln.',
      quickAnswer: 'Wandelt Zeichenketten in das Base64-Format um und umgekehrt.',
      seoHowToUse: '1. Text eingeben.\n2. Kodieren oder Dekodieren wählen.\n3. Ergebnis kopieren.',
      seoHowItWorks: 'Kodiert Binärdaten in 64 druckbare ASCII-Zeichen.',
      formula: 'Base64 = btoa(text) | Text = atob(base64)',
      seoExample: 'Der Text "Hallo" wird zu "SGFsbG8=".',
      faqs: [{ q: 'Ist Base64 eine Verschlüsselung?', a: 'Nein, Base64 ist eine reine Kodierung, keine Sicherheitsverschlüsselung.' }]
    },
    fr: {
      name: 'Convertisseur Base64 (Encoder/Decoder)',
      seoTitle: 'Convertisseur Base64 en Ligne | HelloTools',
      seoDescription: 'Encodez et décodez des chaînes de texte au format Base64 facilement.',
      description: 'Encodez et décodez du texte en Base64.',
      quickAnswer: 'Convertit du texte brut en code Base64 et inversement.',
      seoHowToUse: '1. Entrez votre texte.\n2. Choisissez Encoder ou Décoder.\n3. Copiez le résultat.',
      seoHowItWorks: 'Représente les données binaires en caractères ASCII.',
      formula: 'Base64 = btoa(texte) | Texte = atob(base64)',
      seoExample: '"Bonjour" devient "Qm9uam91cg==" en Base64.',
      faqs: [{ q: 'Pourquoi utiliser le Base64 ?', a: 'Il permet de transmettre des données binaires de manière fiable sur des canaux texte.' }]
    },
    pt: {
      name: 'Codificador e Decodificador Base64',
      seoTitle: 'Codificador e Decodificador Base64 Online | HelloTools',
      seoDescription: 'Converta texto para Base64 e decodifique strings Base64 no navegador.',
      description: 'Codifique e decodifique textos no formato Base64.',
      quickAnswer: 'Converte texto comum para a representação em Base64 e vice-versa.',
      seoHowToUse: '1. Cole seu texto.\n2. Escolha Codificar ou Decodificar.\n3. Copie a saída.',
      seoHowItWorks: 'Converte dados binários em 64 caracteres ASCII legíveis.',
      formula: 'Base64 = btoa(texto) | Texto = atob(base64)',
      seoExample: '"Brasil" em Base64 fica "QnJhc2ls".',
      faqs: [{ q: 'Base64 é uma criptografia?', a: 'Não, é apenas uma codificação de dados, não oferece segurança por si só.' }]
    },
    ja: {
      name: 'Base64エンコード・デコードツール',
      seoTitle: 'Base64エンコード・デコード変換ツール | HelloTools',
      seoDescription: '文字列をBase64形式に符号化（エンコード）、またはBase64文字列を元のテキストへ復号（デコード）します。',
      description: 'テキストのBase64エンコードおよびデコードを即座に行います。',
      quickAnswer: 'テキストデータをASCII文字セットによるBase64エンコード形式に変換します。',
      seoHowToUse: '1. 変換したい文字列を入力します。\n2. 「エンコード」または「デコード」を選択します。\n3. 変換後の文字列をコピーします。',
      seoHowItWorks: 'ブラウザ標準の btoa / atob 関数を用いて高速変換します。',
      formula: 'Base64 = btoa(text) | テキスト = atob(base64)',
      seoExample: '「Hello」をBase64変換すると「SGVsbG8=」になります。',
      faqs: [{ q: 'Base64は暗号化ですか？', a: 'いいえ、Base64はデータのエンコード（符号化）であり、暗号化ではありません。' }]
    }
  },

  'savings-goal-calculator': {
    es: {
      name: 'Calculadora de Metas de Ahorro',
      seoTitle: 'Calculadora de Metas de Ahorro | HelloTools',
      seoDescription: 'Calcula el ahorro mensual necesario para alcanzar tu objetivo financiero.',
      description: 'Descubre cuánto debes ahorrar cada mes para lograr tu meta de ahorro.',
      quickAnswer: 'Calcula la cuota de ahorro mensual requerida para alcanzar una cantidad objetivo.',
      seoHowToUse: '1. Introduce la cantidad objetivo a ahorrar.\n2. Indica el plazo en meses o años.\n3. Añade la tasa de interés anual estimada.',
      seoHowItWorks: 'Utiliza la fórmula de valor futuro de una anualidad ordinaria.',
      formula: 'Ahorro Mensual = Meta / [((1 + r)^n - 1) / r]',
      seoExample: 'Para ahorrar $10.000 en 2 años al 5% anual, necesitas ahorrar aprox. $397 al mes.',
      faqs: [{ q: '¿Cómo influye el interés en mi meta?', a: 'El interés compuesto acelera el crecimiento de tus ahorros, reduciendo la aportación mensual necesaria.' }]
    },
    de: {
      name: 'Sparzielrechner',
      seoTitle: 'Sparzielrechner — Monatliche Sparrate Berechnen | HelloTools',
      seoDescription: 'Berechnen Sie die erforderliche monatliche Sparrate für Ihr Sparziel.',
      description: 'Ermitteln Sie, wie viel Sie monatlich sparen müssen, um Ihr Ziel zu erreichen.',
      quickAnswer: 'Errechnet die monatliche Sparrate zur Erreichung eines Vermögensziels.',
      seoHowToUse: '1. Zielbetrag eingeben.\n2. Laufzeit in Jahren oder Monaten angeben.\n3. Zinssatz eintragen.',
      seoHowItWorks: 'Berechnet die Sparrate mittels Rentenendwertformel.',
      formula: 'Monatsrate = Ziel / [((1 + r)^n - 1) / r]',
      seoExample: 'Für 10.000 € in 2 Jahren bei 5 % Zinsen sparen Sie ca. 397 € monatlich.',
      faqs: [{ q: 'Welche Rolle spielen Zinsen?', a: 'Zinsen verkürzen die Zeit bis zum Ziel oder verringern die nötige Sparrate.' }]
    },
    fr: {
      name: 'Calculateur d\'Objectif d\'Épargne',
      seoTitle: 'Calculateur d\'Objectif d\'Épargne | HelloTools',
      seoDescription: 'Calculez l\'épargne mensuelle nécessaire pour atteindre votre objectif financier.',
      description: 'Déterminez combien mettre de côté chaque mois pour réaliser vos projets.',
      quickAnswer: 'Calcule le versement mensuel requis pour atteindre un capital cible.',
      seoHowToUse: '1. Entrez le montant cible d\'épargne.\n2. Indiquez la durée.\n3. Ajoutez le taux d\'intérêt estimé.',
      seoHowItWorks: 'Utilise la formule d\'annuité de valeur future.',
      formula: 'Épargne Mensuelle = Objectif / [((1 + r)^n - 1) / r]',
      seoExample: 'Pour épargner 10 000 € en 2 ans à 5 %, mettez de côté environ 397 € par mois.',
      faqs: [{ q: 'Pourquoi fixer un objectif d\'épargne ?', a: 'Fixer un objectif permet d\'établir une discipline financière et de mesurer ses progrès.' }]
    },
    pt: {
      name: 'Calculadora de Meta de Economia',
      seoTitle: 'Calculadora de Meta de Economia | HelloTools',
      seoDescription: 'Calcule o valor mensal que você precisa economizar para atingir seu objetivo.',
      description: 'Descubra quanto poupar por mês para realizar seus objetivos financeiros.',
      quickAnswer: 'Calcula a parcela mensal necessária para atingir um valor acumulado desejado.',
      seoHowToUse: '1. Digite o valor que deseja acumular.\n2. Informe o tempo em meses ou anos.\n3. Digite a taxa de rendimento estimada.',
      seoHowItWorks: 'Calcula a contribuição periódica considerando os juros compostos.',
      formula: 'Economia Mensal = Meta / [((1 + r)^n - 1) / r]',
      seoExample: 'Para poupar R$ 10.000 em 2 anos com rendimento de 5% a.a., economize cerca de R$ 397/mês.',
      faqs: [{ q: 'Como acelerar a meta de economia?', a: 'Aumente o valor aportado mensalmente ou busque investimentos com maior rentabilidade.' }]
    },
    ja: {
      name: '貯蓄目標計算ツール',
      seoTitle: '貯蓄目標計算ツール — 毎月の目標貯蓄額 | HelloTools',
      seoDescription: '目標貯蓄金額、達成期間、想定利回り（%）から、毎月必要な貯蓄額を計算します。',
      description: '目標金額を達成するために必要な毎月の積立額を計算します。',
      quickAnswer: '目標金額と達成年数・想定利回りから、毎月の必要積立額を算定します。',
      seoHowToUse: '1. 目標貯蓄金額を入力します。\n2. 達成までの年数または月数を指定します。\n3. 想定年利（%）を入力します。',
      seoHowItWorks: '積立年金の将来価値公式を用いて毎月の積立金額を計算します。',
      formula: '毎月積立額 = 目標額 / [((1 + r)^n - 1) / r]',
      seoExample: '100万円を2年後（年利5%）までに貯めるには、毎月約39,700円の積立が必要です。',
      faqs: [{ q: '利回りを考慮するメリットは？', a: '複利効果により、毎月の実際の積立負担額を減らすことができます。' }]
    }
  },

  'auto-loan-calculator': {
    es: {
      name: 'Calculadora de Préstamo Automotriz',
      seoTitle: 'Calculadora de Préstamo Automotriz y Crédito Coche | HelloTools',
      seoDescription: 'Calcula la cuota mensual de tu financiamiento automotriz, enganche e intereses.',
      description: 'Calcula el pago mensual de tu crédito vehicular o préstamo para coche.',
      quickAnswer: 'Estima la cuota mensual de un préstamo para automóvil basándose en precio, pago inicial e interés.',
      seoHowToUse: '1. Introduce el precio del vehículo.\n2. Indica el pago inicial (enganche).\n3. Selecciona la tasa de interés y el plazo.',
      seoHowItWorks: 'Utiliza el método de amortización constante sobre el saldo financiado.',
      formula: 'Cuota = Monto Financiado * [r(1+r)^n] / [(1+r)^n - 1]',
      seoExample: 'Para un auto de $25.000 con $5.000 de enganche al 6% a 5 años, la cuota es de $386/mes.',
      faqs: [{ q: '¿Qué es el enganche o pago inicial?', a: 'Es la cantidad abonada al contado al momento de la compra para reducir el importe financiado.' }]
    },
    de: {
      name: 'Autokreditrechner',
      seoTitle: 'Autokreditrechner — Monatliche Rate Berechnen | HelloTools',
      seoDescription: 'Berechnen Sie die monatliche Kreditrate für Ihren Autokauf.',
      description: 'Ermitteln Sie die Monatsrate für Ihre Autofinanzierung.',
      quickAnswer: 'Berechnet die Kreditrate für ein Fahrzeug unter Berücksichtigung von Anzahlung und Zins.',
      seoHowToUse: '1. Fahrzeugpreis eingeben.\n2. Anzahlung angeben.\n3. Laufzeit und Zinssatz wählen.',
      seoHowItWorks: 'Berechnet die Annuitätsrate auf den Nettodarlehensbetrag.',
      formula: 'Monatsrate = Kreditbetrag * [i*(1+i)^n] / [(1+i)^n - 1]',
      seoExample: 'Bei 25.000 € Kaufpreis und 5.000 € Anzahlung (6 % Zins, 5 Jahre) beträgt die Rate ca. 386 €/Monat.',
      faqs: [{ q: 'Wie wirkt sich eine Anzahlung aus?', a: 'Eine höhere Anzahlung senkt die monatliche Rate und die Gesamtzinsen.' }]
    },
    fr: {
      name: 'Calculateur de Crédit Auto',
      seoTitle: 'Calculateur de Crédit Auto et Prêt Véhicule | HelloTools',
      seoDescription: 'Calculez les mensualités de votre prêt automobile et le coût total de financement.',
      description: 'Calculez la mensualité exacte de votre crédit voiture.',
      quickAnswer: 'Estime les mensualités d\'un crédit automobile selon l\'apport et le taux d\'intérêt.',
      seoHowToUse: '1. Entrez le prix du véhicule.\n2. Indiquez votre apport personnel.\n3. Choisissez la durée et le taux.',
      seoHowItWorks: 'Applique le calcul d\'amortissement à mensualité constante.',
      formula: 'Mensualité = Montant Emprunté * [r(1+r)^n] / [(1+r)^n - 1]',
      seoExample: 'Pour une voiture de 25 000 € avec 5 000 € d\'apport à 6 % sur 5 ans, la mensualité est de 386 €/mois.',
      faqs: [{ q: 'Faut-il prévoir un apport personnel ?', a: 'Un apport réduit le montant emprunté et diminue vos coûts d\'intérêts.' }]
    },
    pt: {
      name: 'Calculadora de Financiamento de Veículos',
      seoTitle: 'Calculadora de Financiamento de Veículos y Carros | HelloTools',
      seoDescription: 'Calcule o valor das parcelas do financiamento do seu carro ou moto.',
      description: 'Simule as parcelas mensais do seu financiamento automotivo.',
      quickAnswer: 'Estima o valor da parcela mensal do financiamento do veículo.',
      seoHowToUse: '1. Digite o valor do veículo.\n2. Insira o valor da entrada.\n3. Selecione a taxa de juros e o prazo em meses.',
      seoHowItWorks: 'Aplica a tabela Price sobre o saldo devedor financiado.',
      formula: 'Parcela = Saldo Financiado * [r(1+r)^n] / [(1+r)^n - 1]',
      seoExample: 'Um carro de R$ 50.000 com R$ 10.000 de entrada a 1,2% a.m. em 48x fica em parcelas de R$ 1.100/mês.',
      faqs: [{ q: 'O que é a taxa de juros mensal?', a: 'É a porcentagem cobrada pelo banco a cada mês sobre o saldo restante do financiamento.' }]
    },
    ja: {
      name: '自動車ローン計算ツール',
      seoTitle: '自動車ローン計算ツール — 月々返済額シミュレーション | HelloTools',
      seoDescription: '車両本体価格、頭金、金利（年利）、ローン期間から毎月の返済額と総支払額を計算します。',
      description: 'マイカーローンの月々返済額やボーナス加算額をシミュレーションします。',
      quickAnswer: '購入車両価格から頭金を引いた借入額に対する毎月のローン返済額を算出します。',
      seoHowToUse: '1. 車両価格を入力します。\n2. 頭金金額を指定します。\n3. 年利（%）と返済期間（年/月）を選択します。',
      seoHowItWorks: '元利均等返済方式を用いて毎月の返済金額を求めます。',
      formula: '返済額 = 借入金 * [r(1+r)^n] / [(1+r)^n - 1]',
      seoExample: '300万円の車で頭金50万円、金利3%・5年ローンの場合、毎月の返済額は約44,900円です。',
      faqs: [{ q: '頭金を入れるメリットは？', a: '総借入額が減るため、毎月の返済額と支払利息総額を抑えられます。' }]
    }
  },

  'net-worth-calculator': {
    es: {
      name: 'Calculadora de Patrimonio Neto',
      seoTitle: 'Calculadora de Patrimonio Neto (Activos y Pasivos) | HelloTools',
      seoDescription: 'Calcula tu valor neto personal sumando tus activos y restando tus pasivos.',
      description: 'Calcula tu patrimonio neto total para evaluar tu salud financiera.',
      quickAnswer: 'Mide la diferencia entre todo lo que posees (activos) y todo lo que debes (pasivos).',
      seoHowToUse: '1. Suma tus activos (propiedades, ahorros, inversiones).\n2. Suma tus pasivos (hipotecas, deudas, tarjetas).\n3. Obtén tu patrimonio neto.',
      seoHowItWorks: 'Resta el total de pasivos del total de activos.',
      formula: 'Patrimonio Neto = Total Activos - Total Pasivos',
      seoExample: 'Si tienes $200.000 en activos y $50.000 en deudas, tu patrimonio neto es de $150.000.',
      faqs: [{ q: '¿Por qué es importante el patrimonio neto?', a: 'Es el indicador financiero más claro de tu salud económica y riqueza acumulada.' }]
    },
    de: {
      name: 'Vermögensrechner (Net Worth)',
      seoTitle: 'Nettovermögen Rechner — Aktiva minus Passiva | HelloTools',
      seoDescription: 'Berechnen Sie Ihr persönliches Nettovermögen aus Vermögenswerten und Schulden.',
      description: 'Ermitteln Sie Ihren finanziellen Status durch Berechnung Ihres Nettovermögens.',
      quickAnswer: 'Zieht alle Verbindlichkeiten von Ihren Gesamtwerten ab.',
      seoHowToUse: '1. Vermögenswerte (Immobilien, Ersparnisse) eingeben.\n2. Verbindlichkeiten (Kredite, Schulden) angeben.\n3. Nettovermögen ablesen.',
      seoHowItWorks: 'Subtrahiert die Passiva von den Aktiva.',
      formula: 'Nettovermögen = Aktiva - Passiva',
      seoExample: '200.000 € Vermögen minus 50.000 € Schulden ergibt 150.000 € Nettovermögen.',
      faqs: [{ q: 'Was zählt zu den Aktiva?', a: 'Guthaben, Immobilien, Aktien, Fahrzeuge und sonstige Wertsachen.' }]
    },
    fr: {
      name: 'Calculateur de Valeur Nette',
      seoTitle: 'Calculateur de Valeur Nette et Patrimoine | HelloTools',
      seoDescription: 'Calculez votre patrimoine net en faisant le bilan de vos actifs et dettes.',
      description: 'Évaluez votre santé financière globale en calculant votre valeur nette.',
      quickAnswer: 'Évalue la différence entre la valeur de vos possessions et le montant de vos dettes.',
      seoHowToUse: '1. Listez vos actifs (épargne, immobilier).\n2. Indiquez vos passifs (emprunts, dettes).\n3. Lisez votre valeur nette.',
      seoHowItWorks: 'Soustrait les passifs du montant total des actifs.',
      formula: 'Valeur Nette = Total Actifs - Total Passifs',
      seoExample: 'Avec 200 000 € d\'actifs et 50 000 € de dettes, votre valeur nette est de 150 000 €.',
      faqs: [{ q: 'À quelle fréquence calculer sa valeur nette ?', a: 'Une évaluation une a deux fois par an permet de suivre l\'évolution de votre patrimoine.' }]
    },
    pt: {
      name: 'Calculadora de Patrimônio Líquido',
      seoTitle: 'Calculadora de Patrimônio Líquido | HelloTools',
      seoDescription: 'Calcule seu patrimônio líquido somando seus bens e subtraindo suas dívidas.',
      description: 'Descubra seu valor financeiro líquido real.',
      quickAnswer: 'Mede a diferença entre todos os seus bens e todas as suas dívidas.',
      seoHowToUse: '1. Digite o valor dos seus ativos (imóveis, investimentos, dinheiro).\n2. Informe seus passivos (financiamentos, dívidas).\n3. Veja seu patrimônio líquido.',
      seoHowItWorks: 'Subtrai o total de dívidas do total de bens.',
      formula: 'Patrimônio Líquido = Total de Ativos - Total de Passivos',
      seoExample: 'Com R$ 200.000 em bens e R$ 50.000 em dívidas, seu patrimônio líquido é de R$ 150.000.',
      faqs: [{ q: 'O que é patrimônio líquido negativo?', a: 'Ocorre quando o valor das dívidas supera o valor total dos seus bens.' }]
    },
    ja: {
      name: '純資産計算ツール',
      seoTitle: '純資産計算ツール — 資産・負債・自己資本 | HelloTools',
      seoDescription: '預貯金、不動産、株式などの資産と、住宅ローンや借入金などの負債から、あなたの純資産総額を算出します。',
      description: '資産と負債のバランスから個人の純資産総額を計算します。',
      quickAnswer: '所有する総資産からすべての負債を差し引いた実質的な純資産額を算出します。',
      seoHowToUse: '1. 資産項目（現金、不動産、株式等）の合計を入力します。\n2. 負債項目（ローン、借入金等）の合計を入力します。\n3. 純資産額を確認します。',
      seoHowItWorks: '総資産から総負債を控除して算定します。',
      formula: '純資産 = 総資産 - 総負債',
      seoExample: '資産2,000万円・負債500万円の場合、純資産は1,500万円となります。',
      faqs: [{ q: '純資産を増やすには？', a: '貯蓄や投資で資産を増やすか、ローンの繰り上げ返済で負債を減らすことが基本です。' }]
    }
  },

  'salary-calculator': {
    es: {
      name: 'Calculadora de Salario',
      seoTitle: 'Calculadora de Salario (Hora, Mes, Año) | HelloTools',
      seoDescription: 'Convierte tu salario entre tarifas por hora, semanales, mensuales y anuales.',
      description: 'Convierte tu sueldo a cualquier frecuencia de pago.',
      quickAnswer: 'Convierte equivalencias salariales entre pago por hora, mensual y anual.',
      seoHowToUse: '1. Introduce la tarifa salarial.\n2. Selecciona la frecuencia actual (hora, mes, año).\n3. Revisa la tabla de equivalencias.',
      seoHowItWorks: 'Asume un año laboral estándar de 2.080 horas (40h/semana).',
      formula: 'Salario Anual = Tarifa Hora * 2080 | Salario Mensual = Salario Anual / 12',
      seoExample: 'Un pago de $25/hora equivale a $4.333/mes o $52.000/año brutos.',
      faqs: [{ q: '¿Incluye impuestos esta calculadora?', a: 'Esta herramienta realiza conversiones brutas antes de deducciones fiscales.' }]
    },
    de: {
      name: 'Gehaltsrechner',
      seoTitle: 'Gehaltsrechner — Stundenlohn in Monatsgehalt Umrechnen | HelloTools',
      seoDescription: 'Rechnen Sie Stundenlohn, Monatsgehalt und Jahresgehalt einfach um.',
      description: 'Gehaltsangaben in verschiedene Zahlungsintervalle umrechnen.',
      quickAnswer: 'Rechnet Löhne zwischen Stunden-, Monats- und Jahreswerten um.',
      seoHowToUse: '1. Gehaltsbetrag eingeben.\n2. Zahlungsintervall wählen.\n3. Tabelle der Lohnstufen ablesen.',
      seoHowItWorks: 'Geht von einer Standardarbeitszeit von 40 Stunden/Woche aus.',
      formula: 'Jahresgehalt = Stundenlohn * 2080',
      seoExample: '25 €/Stunde entsprechen ca. 4.333 €/Monat bzw. 52.000 €/Jahr brutto.',
      faqs: [{ q: 'Wie viele Arbeitsstunden hat ein Monat?', a: 'Bei 40 Std/Woche hat ein durchschnittlicher Monat 173,33 Arbeitsstunden.' }]
    },
    fr: {
      name: 'Calculateur de Salaire',
      seoTitle: 'Calculateur de Salaire — Taux Horaire, Mensuel, Annuel | HelloTools',
      seoDescription: 'Convertissez votre salaire entre taux horaire, mensuel et annuel brut.',
      description: 'Convertissez votre rémunération à n\'importe quelle périodicité.',
      quickAnswer: 'Calcule les équivalences entre salaire horaire, mensuel et annuel.',
      seoHowToUse: '1. Saisissez votre montant de rémunération.\n2. Sélectionnez la fréquence.\n3. Consultez la grille de conversion.',
      seoHowItWorks: 'Basé sur une base annuelle de travail standard.',
      formula: 'Salaire Annuel = Taux Horaire * 2080',
      seoExample: '25 €/heure équivalent à environ 4 333 €/mois ou 52 000 €/an brut.',
      faqs: [{ q: 'S\'agit-il du salaire net ou brut ?', a: 'Les calculs effectuent une conversion brute avant impôts et cotisations.' }]
    },
    pt: {
      name: 'Calculadora de Salário',
      seoTitle: 'Calculadora de Salário — Hora, Mês e Ano | HelloTools',
      seoDescription: 'Converta seu salário entre valor por hora, dia, mês e ano.',
      description: 'Converta sua remuneração para qualquer período de pagamento.',
      quickAnswer: 'Converte equivalências salariais entre ganho por hora, mês e ano.',
      seoHowToUse: '1. Digite o valor do salário.\n2. Selecione o período de pagamento.\n3. Veja a equivalência para todos os períodos.',
      seoHowItWorks: 'Baseado na jornada padrão de 44 horas semanais ou 220 horas mensais.',
      formula: 'Salário Anual = Valor Hora * Horas Anuais',
      seoExample: 'Um salário de R$ 25/hora equivale a aprox. R$ 4.400/mês brutos.',
      faqs: [{ q: 'Quantas horas trabalhadas tem um mês?', a: 'No padrão CLT do Brasil, considera-se a jornada de 220 horas mensais.' }]
    },
    ja: {
      name: '給与換算計算ツール',
      seoTitle: '給与換算計算ツール — 時給・月給・年収相互換算 | HelloTools',
      seoDescription: '時給、日給、月給、年収を入力するだけで、それぞれの相互換算額を瞬時に算出します。',
      description: '時給・日給・月給・年収の給与額を互いに簡単換算します。',
      quickAnswer: '勤務時間や出勤日数に基づき、時給から年収、月給から時給などを換算します。',
      seoHowToUse: '1. 金額を入力します。\n2. 給与形態（時給・月給・年収など）を選択します。\n3. 換算結果一覧を確認します。',
      seoHowItWorks: '年間標準労働時間（週40時間＝年間2,080時間換算等）をベースに算出します。',
      formula: '想定年収 = 時給 * 年間労働時間',
      seoExample: '時給1,500円でフルタイム（月160時間）勤務の場合、月給は約24万円、年収は約288万円です。',
      faqs: [{ q: '額面金額ですか、手取り額ですか？', a: '税金や社会保険料を引く前の総支給額（額面）での換算になります。' }]
    }
  },

  'currency-converter': {
    es: {
      name: 'Conversor de Divisas',
      seoTitle: 'Conversor de Divisas y Cambio de Moneda | HelloTools',
      seoDescription: 'Convierte montos entre las principales divisas del mundo (USD, EUR, GBP, JPY, MXN).',
      description: 'Calcula tipos de cambio entre diferentes monedas del mundo.',
      quickAnswer: 'Permite convertir rápidamente importes entre diferentes monedas internacionales.',
      seoHowToUse: '1. Introduce la cantidad a convertir.\n2. Selecciona la moneda de origen y destino.\n3. Consulta el resultado del cambio.',
      seoHowItWorks: 'Multiplica la cantidad por la tasa de cambio entre las monedas.',
      formula: 'Resultado = Importe * Tasa de Cambio',
      seoExample: '100 USD equivalen a aproximadamente 92 EUR según los tipos de cambio de mercado.',
      faqs: [{ q: '¿Son exactos los tipos de cambio?', a: 'Los tipos de cambio se actualizan de forma continua con datos de mercado de referencia.' }]
    },
    de: {
      name: 'Währungsrechner',
      seoTitle: 'Währungsrechner — Umrechnung Weltweiter Währungen | HelloTools',
      seoDescription: 'Rechnen Sie Beträge zwischen Euro, US-Dollar, Yen und anderen Währungen um.',
      description: 'Währungsbeträge schnell und einfach umrechnen.',
      quickAnswer: 'Rechnet Beträge basierend auf aktuellen Wechselkursen um.',
      seoHowToUse: '1. Betrag eingeben.\n2. Ausgangs- und Zielwährung wählen.\n3. Umgerechneten Betrag ablesen.',
      seoHowItWorks: 'Multipliziert den Betrag mit dem aktuellen Wechselkursverhältnis.',
      formula: 'Ergebnis = Betrag * Wechselkurs',
      seoExample: '100 USD entsprechen ca. 92 EUR zum aktuellen Richtkurs.',
      faqs: [{ q: 'Wie oft werden die Kurse aktualisiert?', a: 'Die Kursdaten basieren auf aktuellen internationalen Finanzdaten.' }]
    },
    fr: {
      name: 'Convertisseur de Devises',
      seoTitle: 'Convertisseur de Devises en Ligne | HelloTools',
      seoDescription: 'Convertissez des montants entre les principales monnaies internationales.',
      description: 'Calculez la conversion entre différentes monnaies du monde.',
      quickAnswer: 'Convertit un montant d\'une devises vers une autre au taux de change du marché.',
      seoHowToUse: '1. Saisissez le montant.\n2. Choisissez la devise de départ et d\'arrivée.\n3. Obtenez la valeur convertie.',
      seoHowItWorks: 'Applique le taux de conversion en vigueur entre les deux monnaies.',
      formula: 'Montant Converti = Montant * Taux de Change',
      seoExample: '100 USD équivalent à environ 92 EUR.',
      faqs: [{ q: 'Y a-t-il des frais de change inclus ?', a: 'Il s\'agit du taux de change interbancaire pur, sans commissions de change.' }]
    },
    pt: {
      name: 'Conversor de Moedas',
      seoTitle: 'Conversor de Moedas e Cotação de Câmbio | HelloTools',
      seoDescription: 'Converta valores entre Dólar, Euro, Real, Iene e outras moedas mundiais.',
      description: 'Calcule a conversão entre diferentes moedas globais.',
      quickAnswer: 'Converte valores monetários com base nas taxas de câmbio internacionais.',
      seoHowToUse: '1. Digite a quantia a ser convertida.\n2. Escolha a moeda de origem e a de destino.\n3. Veja o valor convertido.',
      seoHowItWorks: 'Multiplica o valor pela taxa de câmbio vigente entre os pares.',
      formula: 'Valor Convertido = Quantia * Taxa de Câmbio',
      seoExample: '100 USD equivalem a aproximadamente R$ 500 no câmbio atual.',
      faqs: [{ q: 'O que é a taxa de câmbio comercial?', a: 'É a taxa utilizada no mercado financeiro internacional para grandes operações.' }]
    },
    ja: {
      name: '通貨換算ツール',
      seoTitle: '通貨換算ツール — 為替レート計算 | HelloTools',
      seoDescription: '日本円（JPY）、米ドル（USD）、ユーロ（EUR）など、世界の主要通貨を為替レートで瞬時に換算します。',
      description: '世界の主要通貨間の最新為替換算を計算します。',
      quickAnswer: '指定された通貨間の為替レートに基づき金額を相互換算します。',
      seoHowToUse: '1. 換算したい金額を入力します。\n2. 変換元の通貨と変換先の通貨を選択します。\n3. 換算後の金額を確認します。',
      seoHowItWorks: '基軸レートに基づき通貨ペアごとの対比計算を行います。',
      formula: '換算金額 = 元の金額 * 為替レート',
      seoExample: '100米ドルは現在のレートで約15,000円に換算されます。',
      faqs: [{ q: '為替手数料は含まれていますか？', a: '本ツールで表示されるのは中値（TTS/TTBの中間レート）であり、銀行手数料は含まれません。' }]
    }
  },

  'scientific-calculator': {
    es: {
      name: 'Calculadora Científica',
      seoTitle: 'Calculadora Científica Online | HelloTools',
      seoDescription: 'Calculadora científica completa con funciones trigonométricas, logaritmos y potencias.',
      description: 'Resuelve operaciones matemáticas complejas directamente en tu navegador.',
      quickAnswer: 'Ejecuta operaciones matemáticas avanzadas como sin, cos, tan, log y potencias.',
      seoHowToUse: '1. Utiliza el teclado numérico y los botones de funciones.\n2. Pulsa = para obtener el resultado.',
      seoHowItWorks: 'Utiliza las funciones matemáticas integradas en el motor JavaScript de tu navegador.',
      formula: 'Funciones = Math.sin(), Math.cos(), Math.log(), Math.pow()',
      seoExample: 'sin(30°) = 0,5 | log10(100) = 2.',
      faqs: [{ q: '¿Soporta radianes y grados?', a: 'Sí, puedes alternar fácilmente entre el modo de Grados (DEG) y Radianes (RAD).' }]
    },
    de: {
      name: 'Wissenschaftlicher Taschenrechner',
      seoTitle: 'Wissenschaftlicher Taschenrechner Online | HelloTools',
      seoDescription: 'Vollwertiger wissenschaftlicher Rechner mit Trigonometrie, Logarithmen und Potenzen.',
      description: 'Komplexe mathematische Funktionen direkt im Browser berechnen.',
      quickAnswer: 'Führt fortgeschrittene Mathe-Funktionen wie Sinus, Kosinus, Logarithmus und Potenzen aus.',
      seoHowToUse: '1. Formel über die Funktionstasten eingeben.\n2. Auf = drücken.',
      seoHowItWorks: 'Nutzt die mathematischen Funktionen des Browsers.',
      formula: 'Funktionen = Math.sin(), Math.cos(), Math.log(), Math.pow()',
      seoExample: 'sin(30°) = 0.5 | log10(100) = 2.',
      faqs: [{ q: 'Kann zwischen DEG und RAD umgeschaltet werden?', a: 'Ja, Sie können zwischen Grad- und Bogenmaß wählen.' }]
    },
    fr: {
      name: 'Calculatrice Scientifique',
      seoTitle: 'Calculatrice Scientifique en Ligne | HelloTools',
      seoDescription: 'Calculatrice scientifique complète avec trigonométrie, logarithmes et puissances.',
      description: 'Résolvez des opérations mathématiques complexes en ligne.',
      quickAnswer: 'Exécute des calculs scientifiques avancés comme sin, cos, tan, log et exponentielles.',
      seoHowToUse: '1. Utilisez les touches de fonctions scientifiques.\n2. Obtenez le résultat instantané.',
      seoHowItWorks: 'Repose sur la bibliothèque mathématique JavaScript native.',
      formula: 'Fonctions = Math.sin(), Math.cos(), Math.log()',
      seoExample: 'sin(30°) = 0,5 | log10(100) = 2.',
      faqs: [{ q: 'La calculatrice gère-t-elle les parenthèses ?', a: 'Oui, vous pouvez imbriquer des parenthèses pour respecter les priorités opératoires.' }]
    },
    pt: {
      name: 'Calculadora Científica',
      seoTitle: 'Calculadora Científica Online Gratuita | HelloTools',
      seoDescription: 'Calculadora científica com seno, cosseno, tangente, logaritmos e potências.',
      description: 'Execute contas matemáticas complexas diretamente no seu navegador.',
      quickAnswer: 'Calcula funções avançadas como trigonometria, logaritmos e potências.',
      seoHowToUse: '1. Insira os números e selecione as funções desejadas.\n2. Pressione = para calcular.',
      seoHowItWorks: 'Processa cálculos avançados usando funções matemáticas nativas do navegador.',
      formula: 'Funções = Math.sin(), Math.cos(), Math.log()',
      seoExample: 'sen(30°) = 0,5 | log10(100) = 2.',
      faqs: [{ q: 'Funciona em celulares?', a: 'Sim, a interface é totalmente responsiva para telas sensíveis ao toque.' }]
    },
    ja: {
      name: '科学計算電卓ツール',
      seoTitle: 'Web科学計算電卓 — 三角関数・対数・指数 | HelloTools',
      seoDescription: '三角関数（sin, cos, tan）、対数（log, ln）、乗根、階乗などを計算できる高機能Web関数電卓です。',
      description: '高度な数学・科学計算をブラウザ上で実行します。',
      quickAnswer: '三角関数や対数、指数関数などの高度な科学計算を瞬時に行う電卓です。',
      seoHowToUse: '1. 画面上の関数キーや数字ボタンをクリック（入力）します。\n2. ＝を押して計算結果を表示します。',
      seoHowItWorks: 'JavaScriptの高精度数学オブジェクト (Math) を用いて計算処理します。',
      formula: '関数 = Math.sin(), Math.cos(), Math.log(), Math.pow()',
      seoExample: 'sin(30°) = 0.5 、 log10(100) = 2 となります。',
      faqs: [{ q: '度数法（DEG）とラジアン（RAD）の切替は可能ですか？', a: 'はい、DEG/RADボタンで簡単に表示切り替えが可能です。' }]
    }
  },

  'square-root-calculator': {
    es: {
      name: 'Calculadora de Raíz Cuadrada',
      seoTitle: 'Calculadora de Raíz Cuadrada y Raíces N-ésimas | HelloTools',
      seoDescription: 'Calcula la raíz cuadrada (√x) y la raíz n-ésima de cualquier número positivo o decimal.',
      description: 'Calcula la raíz cuadrada y cúbica de cualquier número.',
      quickAnswer: 'Determina el número que multiplicado por sí mismo da como resultado el valor original.',
      seoHowToUse: '1. Introduce el número deseado.\n2. Selecciona si deseas la raíz cuadrada (√) o n-ésima.\n3. Obtén el resultado exacto.',
      seoHowItWorks: 'Aplica la función Math.sqrt() o la potencia fraccionaria Math.pow(x, 1/n).',
      formula: '√x = x^(1/2)',
      seoExample: 'La raíz cuadrada de 144 es 12.',
      faqs: [{ q: '¿Qué es una raíz cuadrada perfecta?', a: 'Es aquella cuyo resultado es un número entero exacto, como √9 = 3.' }]
    },
    de: {
      name: 'Quadratwurzelrechner',
      seoTitle: 'Quadratwurzelrechner — Wurzel Ziehen (√x) | HelloTools',
      seoDescription: 'Berechnen Sie Quadratwurzeln und n-te Wurzeln präzise online.',
      description: 'Quadratwurzeln und Kubikwurzeln schnell berechnen.',
      quickAnswer: 'Berechnet die Zahl, die mit sich selbst multipliziert den Eingabewert ergibt.',
      seoHowToUse: '1. Zahl eingeben.\n2. Wurzeltyp wählen.\n3. Ergebnis ablesen.',
      seoHowItWorks: 'Verwendet Math.sqrt() oder Exponentialrechnung.',
      formula: '√x = x^(1/2)',
      seoExample: 'Die Quadratwurzel aus 144 ist 12.',
      faqs: [{ q: 'Kann man aus negativen Zahlen die Wurzel ziehen?', a: 'Reelle Quadratwurzeln negativer Zahlen existieren nicht (komplexe Zahlen).' }]
    },
    fr: {
      name: 'Calculateur de Racine Carrée',
      seoTitle: 'Calculateur de Racine Carrée (√x) | HelloTools',
      seoDescription: 'Calculez la racine carrée et la racine n-ième de n\'importe quel nombre.',
      description: 'Trouvez la racine carrée exacte de vos nombres.',
      quickAnswer: 'Détermine la valeur qui, multipliée par elle-même, donne le nombre initial.',
      seoHowToUse: '1. Saisissez le nombre.\n2. Choisissez le degré de racine.\n3. Lisez le résultat.',
      seoHowItWorks: 'Utilise la fonction Math.sqrt().',
      formula: '√x = x^(1/2)',
      seoExample: 'La racine carrée de 144 est 12.',
      faqs: [{ q: 'Qu\'est-on qu\'un carré parfait ?', a: 'C\'est un nombre dont la racine carrée est un entier positif exact.' }]
    },
    pt: {
      name: 'Calculadora de Raiz Quadrada',
      seoTitle: 'Calculadora de Raiz Quadrada (√x) | HelloTools',
      seoDescription: 'Calcule a raiz quadrada e a raiz n-ésima de números inteiros e decimais.',
      description: 'Descubra a raiz quadrada exata de qualquer número.',
      quickAnswer: 'Calcula o valor que multiplicado por ele mesmo resulta no número digitado.',
      seoHowToUse: '1. Digite o número.\n2. Escolha o tipo de raiz (quadrada ou n-ésima).\n3. Veja a resposta.',
      seoHowItWorks: 'Aplica a função de potenciação fracionária.',
      formula: '√x = x^(1/2)',
      seoExample: 'A raiz quadrada de 144 é 12.',
      faqs: [{ q: 'Como calcular raiz quadrada sem calculadora?', a: 'Pode-se usar métodos de fatoração em fatores primos ou aproximações sucessivas.' }]
    },
    ja: {
      name: '平方根（ルート）計算ツール',
      seoTitle: '平方根（ルート √）計算ツール | HelloTools',
      seoDescription: '数値の平方根（√x）や立方根、指定したn乗根を小数点以下の精度で計算します。',
      description: '数値の平方根（ルート）やn乗根を計算します。',
      quickAnswer: '二乗（二乗して元の数になる）するとその数になる値を計算します。',
      seoHowToUse: '1. 数値を入力します。\n2. 平方根（√）または任意のn乗根を選択します。\n3. 計算結果を確認します。',
      seoHowItWorks: 'JavaScriptの Math.sqrt() または Math.pow(x, 1/n) を用いて処理します。',
      formula: '√x = x^(1/2)',
      seoExample: '144の平方根（√144）は 12 です。',
      faqs: [{ q: 'ルートの計算は小数点以下何桁まで表示されますか？', a: '高精度なダブル精度浮動小数点（通常10〜15桁）で計算・表示します。' }]
    }
  },

  'random-number-generator': {
    es: {
      name: 'Generador de Números Aleatorios',
      seoTitle: 'Generador de Números Aleatorios Online | HelloTools',
      seoDescription: 'Genera números enteros o decimales al azar entre un rango mínimo y máximo.',
      description: 'Obtén números aleatorios dentro del rango que tú elijas.',
      quickAnswer: 'Genera valores numéricos al azar dentro de un rango especificado.',
      seoHowToUse: '1. Introduce el valor mínimo y máximo.\n2. Elige la cantidad de números deseada.\n3. Haz clic en Generar.',
      seoHowItWorks: 'Utiliza el algoritmo de generación pseudoaleatoria de alta velocidad del navegador.',
      formula: 'Resultado = Math.floor(Math.random() * (Max - Min + 1)) + Min',
      seoExample: 'Generar un número entre 1 y 100 devuelve un valor al azar como 42.',
      faqs: [{ q: '¿Se pueden repetir los números?', a: 'Puedes activar o desactivar la opción de permitir números repetidos.' }]
    },
    de: {
      name: 'Zufallszahlen-Generator',
      seoTitle: 'Zufallszahlen Generator — Zahlen Zufällig Generieren | HelloTools',
      seoDescription: 'Generieren Sie Zufallszahlen zwischen frei wählbaren Min- und Max-Werten.',
      description: 'Zufällige Zahlen schnell und einfach erzeugen.',
      quickAnswer: 'Erzeugt echte Pseudozufallszahlen in einem festgelegten Bereich.',
      seoHowToUse: '1. Minimum und Maximum festlegen.\n2. Anzahl der Zahlen wählen.\n3. Auf Generieren klicken.',
      seoHowItWorks: 'Verwendet Math.random() zur Berechnung.',
      formula: 'Zahl = Math.floor(Math.random() * (Max - Min + 1)) + Min',
      seoExample: 'Eine Zufallszahl zwischen 1 und 100 könnte z.B. 42 sein.',
      faqs: [{ q: 'Sind Duplikate erlaubt?', a: 'Sie können einstellen, ob Zahlen doppelt vorkommen dürfen.' }]
    },
    fr: {
      name: 'Générateur de Nombres Aléatoires',
      seoTitle: 'Générateur de Nombres Aléatoires en Ligne | HelloTools',
      seoDescription: 'Générez des nombres au hasard entre une valeur minimale et maximale.',
      description: 'Tirez des nombres au sort facilement.',
      quickAnswer: 'Génère un ou plusieurs nombres au hasard dans une plage donnée.',
      seoHowToUse: '1. Définissez la borne min et max.\n2. Indiquez le nombre de tirages.\n3. Cliquez sur Générer.',
      seoHowItWorks: 'Repose sur l\'algorithme aléatoire du moteur JS.',
      formula: 'Nombre = Math.floor(Math.random() * (Max - Min + 1)) + Min',
      seoExample: 'Un tirage entre 1 et 100 peut donner par exemple 42.',
      faqs: [{ q: 'Puis-je l\'utiliser pour des tirages au sort ?', a: 'Oui, c\'est idéal pour les tombolas, jeux et tirages au sort.' }]
    },
    pt: {
      name: 'Gerador de Números Aleatórios',
      seoTitle: 'Gerador de Números Aleatórios | HelloTools',
      seoDescription: 'Gere números inteiros ou decimais aleatórios em um intervalo escolhido.',
      description: 'Gere números ao acaso de forma simples e rápida.',
      quickAnswer: 'Sortia números aleatórios entre um limite mínimo e máximo.',
      seoHowToUse: '1. Insira o valor mínimo e o máximo.\n2. Escolha a quantidade de números.\n3. Clique em Gerar.',
      seoHowItWorks: 'Processa o sorteio via Math.random().',
      formula: 'Número = Math.floor(Math.random() * (Max - Min + 1)) + Min',
      seoExample: 'Gerar um número de 1 a 100 pode resultar em 42.',
      faqs: [{ q: 'É útil para sorteios?', a: 'Sim, é perfeito para escolher vencedores de rifas e brincadeiras.' }]
    },
    ja: {
      name: '乱数生成ツール',
      seoTitle: '乱数生成ツール — ランダム数字作成 | HelloTools',
      seoDescription: '最小値と最大値を指定して、ランダムな数値（整数・小数）を自動生成します（重複排除機能付き）。',
      description: '指定した範囲からランダムな数字を生成します。',
      quickAnswer: '指定された範囲内で条件に合うランダムな数字を作成します。',
      seoHowToUse: '1. 最小値と最大値を入力します。\n2. 生成したい個数を指定します。\n3. 「生成」ボタンを押します。',
      seoHowItWorks: 'JavaScriptの Math.random() 乱数処理アルゴリズムを用いて生成します。',
      formula: '乱数 = Math.floor(Math.random() * (Max - Min + 1)) + Min',
      seoExample: '1から100の範囲で乱数を1個生成すると、42のような数字がランダムに出力されます。',
      faqs: [{ q: '重複なしの数字を生成できますか？', a: 'はい、重複の許可・不許可を設定可能です。' }]
    }
  },

  'grade-calculator': {
    es: {
      name: 'Calculadora de Calificaciones',
      seoTitle: 'Calculadora de Calificaciones y Notas Ponderadas | HelloTools',
      seoDescription: 'Calcula tu nota final ponderada introduciendo tus exámenes, tareas y sus porcentajes.',
      description: 'Calcula tu nota media final basada en el peso de cada evaluación.',
      quickAnswer: 'Obtiene la nota media ponderada multiplicando cada calificación por su porcentaje de peso.',
      seoHowToUse: '1. Introduce la nota obtenida en cada examen o tarea.\n2. Indica el porcentaje de peso de cada una.\n3. Lee tu calificación final.',
      seoHowItWorks: 'Suma las notas ponderadas y las divide entre la suma de pesos.',
      formula: 'Nota Final = Σ (Nota * Peso) / Σ (Peso)',
      seoExample: 'Si sacas un 8 (peso 40%) y un 9 (peso 60%), tu nota final ponderada es 8,6.',
      faqs: [{ q: '¿Qué hacer si los pesos no suman 100%?', a: 'La calculadora normaliza automáticamente la suma de pesos al 100%.' }]
    },
    de: {
      name: 'Notenrechner',
      seoTitle: 'Notenrechner — Gewichtigten Notendurchschnitt Berechnen | HelloTools',
      seoDescription: 'Berechnen Sie Ihren gewichteten Notendurchschnitt für Schule, Ausbildung und Studium.',
      description: 'Ermitteln Sie Ihre Endnote basierend auf der Gewichtung von Arbeiten.',
      quickAnswer: 'Berechnet den Notendurchschnitt unter Berücksichtigung der prozentualen Gewichtung.',
      seoHowToUse: '1. Noten der Prüfungen eingeben.\n2. Die jeweilige Gewichtung (in %) angeben.\n3. Gesamtnote ablesen.',
      seoHowItWorks: 'Multipliziert jede Note mit ihrem Gewicht und summiert die Werte.',
      formula: 'Endnote = Σ (Note * Gewicht) / Σ (Gewicht)',
      seoExample: 'Eine 2,0 (Gewicht 40 %) und eine 1,0 (Gewicht 60 %) ergeben den Durchschnitt 1,4.',
      faqs: [{ q: 'Werden alle Notensysteme unterstützt?', a: 'Ja, Sie können sowohl Punkte als auch klassische Schulnoten eingeben.' }]
    },
    fr: {
      name: 'Calculateur de Notes',
      seoTitle: 'Calculateur de Notes et Moyenne Pondérée | HelloTools',
      seoDescription: 'Calculez votre moyenne générale pondérée avec les coefficients de chaque matière.',
      description: 'Calculez votre note finale en fonction des coefficients.',
      quickAnswer: 'Multiplie chaque note par son coefficient pour calculer la moyenne pondérée.',
      seoHowToUse: '1. Entrez les notes obtenues.\n2. Indiquez le coefficient de chaque devoir.\n3. Obtenez votre moyenne finale.',
      seoHowItWorks: 'Fait la somme des produits (note x coeff) divisée par la somme des coefficients.',
      formula: 'Moyenne = Σ (Note * Coefficient) / Σ (Coefficient)',
      seoExample: 'Un 15 (coeff 2) et un 18 (coeff 3) donnent une moyenne de 16,8 / 20.',
      faqs: [{ q: 'Comment connaître la note minimale nécessaire au dernier examen ?', a: 'L\'outil permet d\'estimer la note manquante pour valider votre semestre.' }]
    },
    pt: {
      name: 'Calculadora de Notas e Médias',
      seoTitle: 'Calculadora de Notas e Média Ponderada | HelloTools',
      seoDescription: 'Calcule sua nota final ponderada de provas, trabalhos e atividades acadêmicas.',
      description: 'Descubra sua média final escolar ou universitária.',
      quickAnswer: 'Calcula a média escolar multiplicando as notas pelos respectivos pesos.',
      seoHowToUse: '1. Digite as notas obtidas nas provas.\n2. Insira o peso de cada avaliação.\n3. Veja sua nota média final.',
      seoHowItWorks: 'Divide a soma das notas ponderadas pela soma total dos pesos.',
      formula: 'Média Ponderada = Σ (Nota * Peso) / Σ (Peso)',
      seoExample: 'Nota 7 (peso 4) e Nota 9 (peso 6) resultam em média ponderada 8,2.',
      faqs: [{ q: 'Como calcular quanto preciso tirar na prova final?', a: 'Insira as notas anteriores e defina a nota desejada para ver o valor necessário.' }]
    },
    ja: {
      name: '成績・点数計算ツール',
      seoTitle: '成績計算ツール — 加重平均点数・単位 | HelloTools',
      seoDescription: '各テストやレポートの得点と、その配分比率（ウェイト・単位数）から最終的な加重平均点を計算します。',
      description: '配分比率（重み）に応じた成績の加重平均点を算出します。',
      quickAnswer: '試験や課題の点数と配分率から加重平均点数を計算します。',
      seoHowToUse: '1. 得点を入力します。\n2. 各評価項目の配分率（%や単位数）を指定します。\n3. 加重平均点数を確認します。',
      seoHowItWorks: '（得点 * 配分率）の合計を総配分率で割って算出します。',
      formula: '最終点数 = Σ (点数 * 重み) / Σ (重み)',
      seoExample: '中間テスト80点（配分40%）、期末テスト90点（配分60%）の場合、最終成績は86点です。',
      faqs: [{ q: '配分率の合計が100%にならなくても計算できますか？', a: 'はい、配分率の合計値で自動補正して計算します。' }]
    }
  },

  'case-converter': {
    es: {
      name: 'Convertidor de Mayúsculas y Minúsculas',
      seoTitle: 'Convertidor de Mayúsculas y Minúsculas Online | HelloTools',
      seoDescription: 'Convierte textos a MAYÚSCULAS, minúsculas, Tipo Título y Tipo Oración.',
      description: 'Cambia el formato de mayúsculas y minúsculas de cualquier texto.',
      quickAnswer: 'Transforma instantáneamente el formato de letras de un texto.',
      seoHowToUse: '1. Pega tu texto en la herramienta.\n2. Elige el botón del formato deseado (MAYÚSCULAS, minúsculas, etc.).\n3. Copia el texto resultante.',
      seoHowItWorks: 'Aplica los métodos toUpperCase() y toLowerCase() de cadena.',
      formula: 'Formato = String.toUpperCase() | String.toLowerCase()',
      seoExample: 'Transforma "hola mundo" en "HOLA MUNDO" o "Hola Mundo".',
      faqs: [{ q: '¿Qué es el estilo Tipo Título?', a: 'Pone en mayúscula la primera letra de cada palabra principal.' }]
    },
    de: {
      name: 'Groß-/Kleinschreibung-Umwandler',
      seoTitle: 'Groß-/Kleinschreibung Umwandeln Online | HelloTools',
      seoDescription: 'Text in GROSSBUCHSTABEN, kleinbuchstaben oder Titelformat umwandeln.',
      description: 'Formatierung von Texten schnell anpassen.',
      quickAnswer: 'Wandelt die Groß- und Kleinschreibung von Texten per Klick um.',
      seoHowToUse: '1. Text einfügen.\n2. Format wählen (GROSS, klein, Titel).\n3. Text kopieren.',
      seoHowItWorks: 'Nutzt String-Transformationen wie toUpperCase().',
      formula: 'Text = String.toUpperCase()',
      seoExample: 'Wandelt "hallo welt" in "HALLO WELT" um.',
      faqs: [{ q: 'Bleiben Sonderzeichen erhalten?', a: 'Ja, Umlaut- und Sonderzeichen bleiben unverändert erhalten.' }]
    },
    fr: {
      name: 'Convertisseur de Casse',
      seoTitle: 'Convertisseur de Casse (Majuscules / Minuscules) | HelloTools',
      seoDescription: 'Convertissez du texte en MAJUSCULES, minuscules, ou Première Lettre Majuscule.',
      description: 'Modifiez la casse de vos textes en un clic.',
      quickAnswer: 'Change la casse des lettres d\'un texte selon le style sélectionné.',
      seoHowToUse: '1. Collez votre texte.\n2. Cliquez sur le style désiré.\n3. Copiez le résultat.',
      seoHowItWorks: 'Applique les méthodes d\'analyse de chaîne JavaScript.',
      formula: 'Casse = String.toUpperCase()',
      seoExample: 'Transforme "bonjour tout le monde" en "BONJOUR TOUT LE MONDE".',
      faqs: [{ q: 'Qu\'est-ce que le mode majuscule en début de phrase ?', a: 'Il met une majuscule après chaque point de ponctuation finale.' }]
    },
    pt: {
      name: 'Conversor de Maiúsculas e Minúsculas',
      seoTitle: 'Conversor de Maiúsculas e Minúsculas | HelloTools',
      seoDescription: 'Converta textos para MAIÚSCULAS, minúsculas, Formato Título e Primeira Letra.',
      description: 'Altere a formatação de maiúsculas e minúsculas do seu texto.',
      quickAnswer: 'Transforma o formato das letras do texto selecionado.',
      seoHowToUse: '1. Cole seu texto.\n2. Selecione a conversão desejada.\n3. Copie o texto convertido.',
      seoHowItWorks: 'Utiliza funções de conversão de texto.',
      formula: 'Texto = String.toUpperCase()',
      seoExample: 'Transforma "olá mundo" em "OLÁ MUNDO" ou "Olá Mundo".',
      faqs: [{ q: 'O que faz a opção Primeira Letra?', a: 'Deixa apenas a primeira letra da frase em maiúscula.' }]
    },
    ja: {
      name: '大文字・小文字変換ツール',
      seoTitle: '大文字・小文字・全角半角変換ツール | HelloTools',
      seoDescription: 'アルファベットの大文字・小文字変換、キャピタライズ（単語の先頭のみ大文字）、全角・半角変換を行います。',
      description: '英字の大文字・小文字や全角・半角を瞬時に変換します。',
      quickAnswer: '英字の大文字・小文字変換や全角・半角文字の相互変換を行うツールです。',
      seoHowToUse: '1. テキストを入力します。\n2. 「すべて大文字」「すべて小文字」「全角/半角」などをクリックします。\n3. 変換後のテキストをコピーします。',
      seoHowItWorks: '文字列の toUpperCase / toLowerCase や正規表現コードポイント変換を行います。',
      formula: '変換 = String.toUpperCase() / String.toLowerCase()',
      seoExample: '「hello world」を「HELLO WORLD」や「Hello World」に変換します。',
      faqs: [{ q: '全角英数を半角英数に変換できますか？', a: 'はい、「半角化」機能で全角英数を半角へ一括変換できます。' }]
    }
  },

  'remove-duplicate-lines': {
    es: {
      name: 'Eliminar Líneas Duplicadas',
      seoTitle: 'Eliminar Líneas Duplicadas de Texto Online | HelloTools',
      seoDescription: 'Elimina líneas repetidas o duplicadas de listados de texto al instante.',
      description: 'Limpia listados de texto quitando todas las líneas duplicadas.',
      quickAnswer: 'Detecta y elimina entradas o líneas repetidas en una lista.',
      seoHowToUse: '1. Pega tu lista de texto.\n2. Haz clic en Eliminar Duplicados.\n3. Copia la lista limpia.',
      seoHowItWorks: 'Filtra las líneas utilizando una estructura de datos de conjunto único (Set).',
      formula: 'Líneas Únicas = Array.from(new Set(lineas))',
      seoExample: 'Limpia una lista con "manzana, manzana, pera" a "manzana, pera".',
      faqs: [{ q: '¿Distingue entre mayúsculas y minúsculas?', a: 'Puedes elegir si la comparación debe ignorar o no las mayúsculas.' }]
    },
    de: {
      name: 'Doppelte Zeilen Entfernen',
      seoTitle: 'Doppelte Zeilen Entfernen Online | HelloTools',
      seoDescription: 'Bereinigen Sie Textlisten sofort von doppelten Zeilen und Einträgen.',
      description: 'Doppelte Zeilen aus Textlisten automatisch entfernen.',
      quickAnswer: 'Filtert mehrfach vorkommende Zeilen aus einem Text heraus.',
      seoHowToUse: '1. Liste einfügen.\n2. Auf Duplikate entfernen klicken.\n3. Bereinigte Liste kopieren.',
      seoHowItWorks: 'Nutzt ein Set zur Extraktion eindeutiger Elemente.',
      formula: 'Eindeutig = Array.from(new Set(zeilen))',
      seoExample: 'Macht aus einer Liste mit doppelten E-Mails eine saubere eindeutige Liste.',
      faqs: [{ q: 'Werden Leerzeilen gelöscht?', a: 'Sie können wählen, ob auch leere Zeilen entfernt werden sollen.' }]
    },
    fr: {
      name: 'Supprimer les Lignes En Double',
      seoTitle: 'Supprimer les Lignes En Double | HelloTools',
      seoDescription: 'Nettoyez vos listes de texte en supprimant les lignes répétées.',
      description: 'Supprimez automatiquement les doublons dans vos listes.',
      quickAnswer: 'Élimine les lignes identiques répétées dans un texte.',
      seoHowToUse: '1. Collez votre liste.\n2. Cliquez sur Supprimer les doublons.\n3. Copiez le résultat propre.',
      seoHowItWorks: 'Utilise un ensemble (Set) pour éliminer les récurrences.',
      formula: 'Résultat = Array.from(new Set(lignes))',
      seoExample: 'Réduit une liste contenant des doublons à ses éléments uniques.',
      faqs: [{ q: 'Le tri est-il conservé ?', a: 'Oui, l\'ordre d\'apparition des premières occurrences est conservé.' }]
    },
    pt: {
      name: 'Remover Linhas Duplicadas',
      seoTitle: 'Remover Linhas Duplicadas de Texto | HelloTools',
      seoDescription: 'Limpe listas de texto eliminando linhas repetidas instantaneamente.',
      description: 'Remova linhas duplicadas de arquivos de texto e listas.',
      quickAnswer: 'Remove entradas idênticas de uma lista de texto.',
      seoHowToUse: '1. Cole sua lista de texto.\n2. Clique em Remover Duplicadas.\n3. Copie a lista limpa.',
      seoHowItWorks: 'Filtra linhas usando conjuntos de elementos únicos.',
      formula: 'Resultado = Array.from(new Set(linhas))',
      seoExample: 'Converte uma lista com emails repetidos em uma lista única.',
      faqs: [{ q: 'Funciona com arquivos grandes?', a: 'Sim, o processamento local lida com milhares de linhas em milissegundos.' }]
    },
    ja: {
      name: '重複行削除ツール',
      seoTitle: '重複行削除・テキスト重複除去ツール | HelloTools',
      seoDescription: 'テキストやリストデータから重複している行を自動的に検出し、一括で削除して固有行のみにします。',
      description: 'テキストリストから重複する行を一括除去します。',
      quickAnswer: '同じ内容の行を検出し、最初に出てきた1行だけを残して重複行を削除します。',
      seoHowToUse: '1. テキスト（リスト）を貼り付けます。\n2. 「重複行を削除」をクリックします。\n3. 重複が除去されたテキストをコピーします。',
      seoHowItWorks: '配列を Set オブジェクトに変換して一意な行のみを抽出します。',
      formula: '固有行 = Array.from(new Set(lines))',
      seoExample: '「りんご\nみかん\nりんご」というリストを「りんご\nみかん」に整理します。',
      faqs: [{ q: '大文字と小文字は区別されますか？', a: '区別する・区別しないの設定を選択できます。' }]
    }
  },

  'text-sorter': {
    es: {
      name: 'Ordenador de Texto',
      seoTitle: 'Ordenador de Texto — Orden Alfabético y Numérico | HelloTools',
      seoDescription: 'Ordena líneas de texto alfabéticamente (A-Z, Z-A), por longitud o numéricamente.',
      description: 'Ordena listas de texto en orden alfabético o numérico.',
      quickAnswer: 'Reorganiza las líneas de un texto según el criterio de ordenación elegido.',
      seoHowToUse: '1. Pega tu lista de texto.\n2. Elige el tipo de orden (A-Z, Z-A, Numérico).\n3. Copia el texto ordenado.',
      seoHowItWorks: 'Aplica algoritmos de ordenación de cadenas.',
      formula: 'Orden = lineas.sort((a, b) => a.localeCompare(b))',
      seoExample: 'Ordena "zorro, árbol, barco" a "árbol, barco, zorro".',
      faqs: [{ q: '¿Soporta caracteres con tildes?', a: 'Sí, utiliza comparación local respetando acentos e idoma.' }]
    },
    de: {
      name: 'Text Sortieren',
      seoTitle: 'Text Sortieren — Alphabetisch & Nummerisch | HelloTools',
      seoDescription: 'Sortieren Sie Zeilen alphabetisch (A-Z, Z-A) oder nach Länge.',
      description: 'Textlisten alphabetisch oder nummerisch sortieren.',
      quickAnswer: 'Ordnet die Zeilen eines Textes alphabetisch oder nach Zahlenwert.',
      seoHowToUse: '1. Liste eingeben.\n2. Sortierung wählen (A-Z oder Z-A).\n3. Sortierte Liste kopieren.',
      seoHowItWorks: 'Sortiert Zeilen mittels localeCompare().',
      formula: 'Sortiert = zeilen.sort()',
      seoExample: 'Sortiert Begriffe alphabetisch von A bis Z.',
      faqs: [{ q: 'Werden Umlaute korrekt sortiert?', a: 'Ja, Ä, Ö, Ü werden korrekt im Alphabet eingeordnet.' }]
    },
    fr: {
      name: 'Trieur de Texte',
      seoTitle: 'Trieur de Texte — Ordre Alphabétique et Numérique | HelloTools',
      seoDescription: 'Triez les lignes d\'un texte par ordre alphabétique (A-Z) ou numérique.',
      description: 'Mettez vos listes en ordre alphabétique en un instant.',
      quickAnswer: 'Réordonne les lignes selon un ordre alfabétique ou croissant/décroissant.',
      seoHowToUse: '1. Collez votre liste.\n2. Choisissez l\'ordre de tri.\n3. Copiez le résultat trié.',
      seoHowItWorks: 'Utilise le tri natif de tableau avec comparaison linguistique.',
      formula: 'Tri = lignes.sort()',
      seoExample: 'Trie une liste de noms par ordre alphabétique.',
      faqs: [{ q: 'Peut-on trier par longueur de ligne ?', a: 'Oui, l\'option de tri par nombre de caractères est disponible.' }]
    },
    pt: {
      name: 'Ordenador de Texto',
      seoTitle: 'Ordenador de Texto — Ordem Alfabética e Numérica | HelloTools',
      seoDescription: 'Ordene linhas de texto em ordem alfabética (A-Z, Z-A) ou numérica.',
      description: 'Organize suas listas em ordem alfabética.',
      quickAnswer: 'Reorganiza as linhas de uma lista em ordem alfabética ou numérica.',
      seoHowToUse: '1. Cole sua lista.\n2. Escolha o tipo de ordenação (A-Z ou Z-A).\n3. Copie o resultado.',
      seoHowItWorks: 'Aplica a ordenação nativa considerando o idioma.',
      formula: 'Ordenado = linhas.sort()',
      seoExample: 'Organiza nomes em ordem alfabética perfeita.',
      faqs: [{ q: 'Ordena números corretamente?', a: 'Sim, o modo numérico ordena 2 antes de 10 corretamente.' }]
    },
    ja: {
      name: 'テキスト並び替えツール',
      seoTitle: 'テキスト並び替え（ソート）ツール — 昇順・降順 | HelloTools',
      seoDescription: 'テキストの各行を五十音順、アルファベット順（A-Z / Z-A）、数値順、文字数順に並び替えます。',
      description: '行単位のテキストを五十音順やアルファベット順にソートします。',
      quickAnswer: 'テキストの行を指定された順序（あいうえお順・A-Z順・数値順）にソートします。',
      seoHowToUse: '1. ソートしたいテキストを貼り付けます。\n2. 並び替え順（昇順 A-Z / 降順 Z-A / 数値順）を選択します。\n3. 並び替えられたテキストをコピーします。',
      seoHowItWorks: '文字列の localeCompare() ソートアルゴリズムを用いて整列します。',
      formula: 'ソート = lines.sort((a, b) => a.localeCompare(b, "ja"))',
      seoExample: '「みかん\nりんご\nいちご」を「いちご\nみかん\nりんご」に五十音順ソートします。',
      faqs: [{ q: '漢字の五十音順ソートに対応していますか？', a: 'ブラウザの日本語ロケール設定に基づき並び替えを行います。' }]
    }
  },

  'whitespace-remover': {
    es: {
      name: 'Eliminador de Espacios en Blanco',
      seoTitle: 'Eliminador de Espacios en Blanco y Tabulaciones | HelloTools',
      seoDescription: 'Elimina espacios dobles, tabulaciones y saltos de línea innecesarios de tu texto.',
      description: 'Limpia espacios sobrantes y tabulaciones de tu texto.',
      quickAnswer: 'Limpia un texto removiendo espacios extra al inicio, final o entre palabras.',
      seoHowToUse: '1. Pega tu texto.\n2. Elige eliminar espacios extra o todas las líneas vacías.\n3. Copia el texto limpio.',
      seoHowItWorks: 'Aplica expresiones regulares de reemplazo de espacios.',
      formula: 'Limpio = texto.replace(/\\s+/g, " ")',
      seoExample: 'Transforma "Hola   Mundo  " en "Hola Mundo".',
      faqs: [{ q: '¿Elimina todas las líneas en blanco?', a: 'Puedes seleccionar la opción para eliminar únicamente las líneas vacías.' }]
    },
    de: {
      name: 'Leerzeichen Entfernen',
      seoTitle: 'Leerzeichen Entfernen Online | HelloTools',
      seoDescription: 'Entfernen Sie doppelte Leerzeichen, Tabulatoren und Leerzeilen aus Texten.',
      description: 'Überflüssige Leerzeichen und Tabs aus Texten entfernen.',
      quickAnswer: 'Reinigt Texte von doppelten oder überflüssigen Leerzeichen.',
      seoHowToUse: '1. Text einfügen.\n2. Bereinigungsoption wählen.\n3. Text kopieren.',
      seoHowItWorks: 'Ersetzt mehrfache Leerzeichen durch ein einfaches Leerzeichen via Regex.',
      formula: 'Bereinigt = text.replace(/\\s+/g, " ")',
      seoExample: 'Macht aus "Hallo   Welt" sauber "Hallo Welt".',
      faqs: [{ q: 'Werden Tabs auch entfernt?', a: 'Ja, Tabulatoren werden durch einfache Leerzeichen oder nichts ersetzt.' }]
    },
    fr: {
      name: 'Suppresseur d\'Espaces Inutiles',
      seoTitle: 'Suppresseur d\'Espaces Inutiles en Ligne | HelloTools',
      seoDescription: 'Supprimez les espaces multiples, tabulations et lignes vides de vos textes.',
      description: 'Nettoyez votre texte en supprimant les espaces en trop.',
      quickAnswer: 'Enlève les espaces superflus et réorganise la mise en forme du texte.',
      seoHowToUse: '1. Collez votre texte.\n2. Choisissez l\'option de nettoyage.\n3. Copiez le résultat propre.',
      seoHowItWorks: 'Utilise des expressions régulières de nettoyage.',
      formula: 'Texte = text.replace(/\\s+/g, " ")',
      seoExample: 'Transforme "Bonjour   le   monde" en "Bonjour le monde".',
      faqs: [{ q: 'Puis-je supprimer toutes les lignes vides ?', a: 'Oui, une option spécifique permet de compacter le texte sans lignes vides.' }]
    },
    pt: {
      name: 'Remover Espaços em Branco',
      seoTitle: 'Remover Espaços em Branco e Linhas Vazias | HelloTools',
      seoDescription: 'Elimine espaços duplos, tabulações e linhas vazias do seu texto.',
      description: 'Remova espaços extras do seu texto instantaneamente.',
      quickAnswer: 'Elimina espaços em excesso no início, meio e fim do texto.',
      seoHowToUse: '1. Cole seu texto.\n2. Escolha as opções de remoção.\n3. Copie o texto limpo.',
      seoHowItWorks: 'Substitui espaços múltiplos usando expressão regular.',
      formula: 'Texto Limpo = texto.replace(/\\s+/g, " ")',
      seoExample: 'Converte "Olá   Mundo" em "Olá Mundo".',
      faqs: [{ q: 'Remove espaços no início das linhas?', a: 'Sim, remove recuos e tabulações iniciais.' }]
    },
    ja: {
      name: '余白・空白削除ツール',
      seoTitle: '余白・空白削除（スペース除去・空行削除） | HelloTools',
      seoDescription: 'テキスト内の連続するスペース（全角・半角）、タブ、不要な改行、空行を一括で除去・整形します。',
      description: '不要なスペースや改行、空行を一括削除します。',
      quickAnswer: '文章中の連続するスペースや行頭・行末の空白、空行を削除して整理します。',
      seoHowToUse: '1. テキストを貼り付けます。\n2. 「連続スペース除去」「空行削除」などの処理を選択します。\n3. 整形されたテキストをコピーします。',
      seoHowItWorks: '正規表現 (replace(/\\s+/g, " ")) を用いて空白文字を置換・除去します。',
      formula: '除去テキスト = text.replace(/\\s+/g, " ")',
      seoExample: '「こんにちは   世界  」を「こんにちは 世界」に整形します。',
      faqs: [{ q: '全角スペースも除去されますか？', a: 'はい、全角スペースと半角スペースの両方に対応しています。' }]
    }
  },

  'ideal-weight-calculator': {
    es: {
      name: 'Calculadora de Peso Ideal',
      seoTitle: 'Calculadora de Peso Ideal (Fórmulas Médicas) | HelloTools',
      seoDescription: 'Calcula tu rango de peso ideal según tu estatura y género mediante fórmulas médicas.',
      description: 'Descubre tu peso saludable ideal según tu altura y género.',
      quickAnswer: 'Estima el rango de peso corporal idóneo para una determinada estatura.',
      seoHowToUse: '1. Selecciona tu género.\n2. Introduce tu estatura en cm.\n3. Obtén tu rango de peso ideal.',
      seoHowItWorks: 'Combina las fórmulas médicas de Devine, Robinson, Miller y Hamwi.',
      formula: 'Peso Ideal (Devine Hombres) = 50 + 2,3 * ((Altura cm / 2.54) - 60)',
      seoExample: 'Un hombre de 175 cm tiene un peso ideal de aprox. 68 a 72 kg.',
      faqs: [{ q: '¿Es el peso ideal exacto para todo el mundo?', a: 'Es una estimación estadística de referencia; la masa muscular también influye.' }]
    },
    de: {
      name: 'Idealgewicht-Rechner',
      seoTitle: 'Idealgewicht-Rechner — Welches Gewicht Passt Zu Mir? | HelloTools',
      seoDescription: 'Berechnen Sie Ihr persönliches Idealgewicht nach Körpergröße und Geschlecht.',
      description: 'Ermitteln Sie Ihr optimales gesundes Gewicht.',
      quickAnswer: 'Berechnet den medizinischen Idealgewichtsbereich für Ihre Körpergröße.',
      seoHowToUse: '1. Geschlecht wählen.\n2. Körpergröße in cm eingeben.\n3. Idealgewicht ablesen.',
      seoHowItWorks: 'Nützt etablierte medizinische Formeln (Devine, Hamwi).',
      formula: 'Idealgewicht = 50 + 2.3 * ((Größe cm / 2.54) - 60)',
      seoExample: 'Ein 175 cm großer Mann hat ein Idealgewicht von ca. 68-72 kg.',
      faqs: [{ q: 'Wie unterscheidet sich Idealgewicht vom BMI?', a: 'Das Idealgewicht nennt eine konkrete Ziel-Kilogrammzahl; der BMI ist ein Verhältnissindex.' }]
    },
    fr: {
      name: 'Calculateur de Poids Idéal',
      seoTitle: 'Calculateur de Poids Idéal Gratuit | HelloTools',
      seoDescription: 'Calculez votre poids idéal de santé selon votre taille et votre genre.',
      description: 'Déterminez votre poids de forme idéal.',
      quickAnswer: 'Estime le poids corporel le plus adapté à votre taille.',
      seoHowToUse: '1. Sélectionnez votre genre.\n2. Indiquez votre taille en cm.\n3. Consultez votre poids idéal.',
      seoHowItWorks: 'Repose sur les formules de référence de Devine et Lorenz.',
      formula: 'Poids Idéal = 50 + 2.3 * ((Taille cm / 2.54) - 60)',
      seoExample: 'Pour un homme de 175 cm, le poids idéal se situe vers 68 à 72 kg.',
      faqs: [{ q: 'Ces formules conviennent-elles aux sportifs ?', a: 'Les sportifs développant une forte masse musculaire peuvent peser plus sans risque.' }]
    },
    pt: {
      name: 'Calculadora de Peso Ideal',
      seoTitle: 'Calculadora de Peso Ideal por Altura e Sexo | HelloTools',
      seoDescription: 'Calcule sua faixa de peso ideal e saudável com base na sua altura.',
      description: 'Descubra qual é o peso ideal recomendado para sua altura.',
      quickAnswer: 'Calcula o peso corporal considerado saudável para a sua altura.',
      seoHowToUse: '1. Selecione seu sexo.\n2. Digite sua altura em cm.\n3. Veja a faixa de peso ideal.',
      seoHowItWorks: 'Aplica as fórmulas médicas de Devine e Robinson.',
      formula: 'Peso Ideal = 50 + 2,3 * ((Altura cm / 2.54) - 60)',
      seoExample: 'Um homem de 175 cm de altura tem peso ideal estimado entre 68 kg e 72 kg.',
      faqs: [{ q: 'O que é a fórmula de Devine?', a: 'É a fórmula médica mais utilizada no mundo para estimar dosagens de medicamentos e peso ideal.' }]
    },
    ja: {
      name: '理想体重（標準体重）計算ツール',
      seoTitle: '理想体重・標準体重計算ツール — BMI 22基準 | HelloTools',
      seoDescription: '身長と性別から、最も病気になりにくい適正体重（BMI 22標準体重）や美容体重・シンデレラ体重を算出します。',
      description: '身長に応じた標準体重（適正体重）や美容体重を計算します。',
      quickAnswer: '最も健康的なBMI 22を基準とした標準体重および美容体重を算出します。',
      seoHowToUse: '1. 性別を選択します。\n2. 身長（cm）を入力します。\n3. 標準体重（kg）と理想範囲を確認します。',
      seoHowItWorks: '日本肥満学会基準の BMI = 22 （標準体重 = 身長(m)^2 * 22）で算出します。',
      formula: '標準体重(kg) = (身長m)^2 * 22',
      seoExample: '身長170cmの場合、標準体重（BMI 22）は 63.6kg です。',
      faqs: [{ q: '美容体重とは何ですか？', a: 'BMI 20を基準とした、見た目がスリムにみえる体重の目安です。' }]
    }
  },

  'body-fat-calculator': {
    es: {
      name: 'Calculadora de Porcentaje de Grasa Corporal',
      seoTitle: 'Calculadora de Grasa Corporal (Método Marina EE.UU.) | HelloTools',
      seoDescription: 'Estima tu porcentaje de grasa corporal mediante las medidas de cintura, cuello y cadera.',
      description: 'Calcula tu porcentaje de masa grasa y masa magra.',
      quickAnswer: 'Estima la proporción de tejido adiposo en comparación con la masa corporal total.',
      seoHowToUse: '1. Introduce género, altura y peso.\n2. Mide la circunferencia de tu cuello, cintura (y cadera en mujeres).\n3. Lee tu % de grasa.',
      seoHowItWorks: 'Utiliza el algoritmo de cálculo antropométrico de la Marina de EE.UU.',
      formula: '% Grasa (Hombres) = 86.010*log10(cintura-cuello) - 70.041*log10(altura) + 36.76',
      seoExample: 'Un hombre con 85 cm de cintura y 38 cm de cuello tiene aprox. un 15% de grasa corporal.',
      faqs: [{ q: '¿Qué tan preciso es el método de la Marina?', a: 'Tiene un margen de error de solo 1 a 3% comparado con escáneres DEXA.' }]
    },
    de: {
      name: 'Körperfettrechner',
      seoTitle: 'Körperfettrechner — Körperfettanteil (KFA) Berechnen | HelloTools',
      seoDescription: 'Berechnen Sie Ihren Körperfettanteil (KFA) nach der US-Navy-Methode.',
      description: 'Ermitteln Sie Ihren Körperfettanteil in Prozent.',
      quickAnswer: 'Schätzt den prozentualen Fettanteil Ihres Körpers.',
      seoHowToUse: '1. Geschlecht, Größe und Gewicht eingeben.\n2. Hals- und Taillenumfang messen und eintragen.\n3. KFA in % ablesen.',
      seoHowItWorks: 'Nützt die Formel der US Navy zur Körperfettberechnung.',
      formula: 'KFA = Anthropometrische Navy-Formel',
      seoExample: 'Ein Mann mit 85 cm Taille und 38 cm Halsumfang hat ca. 15 % KFA.',
      faqs: [{ q: 'Was ist ein gesunder Körperfettanteil?', a: 'Bei Männern liegen 10-20 % im gesunden Bereich, bei Frauen 18-28 %.' }]
    },
    fr: {
      name: 'Calculateur de Taux de Masse Grasse',
      seoTitle: 'Calculateur de Taux de Masse Grasse (IMG) | HelloTools',
      seoDescription: 'Estimez votre pourcentage de graisse corporelle avec la méthode de l\'US Navy.',
      description: 'Calculez votre taux de masse grasse en pourcentage.',
      quickAnswer: 'Évalue le pourcentage de masse grasse par rapport à votre poids total.',
      seoHowToUse: '1. Saisissez taille, poids et genre.\n2. Indiquez la mesure de votre tour de cou et taille.\n3. Obtenez votre taux d\'IMG.',
      seoHowItWorks: 'Applique la méthode anthropométrique de la marine américaine.',
      formula: '% Masse Grasse = Formule US Navy',
      seoExample: 'Un homme avec 85 cm de tour de taille a un taux de masse grasse d\'environ 15 %.',
      faqs: [{ q: 'Comment bien prendre ses mensurations ?', a: 'Mesurez au ruban métrique sans serrer la peau à l\'horizontale.' }]
    },
    pt: {
      name: 'Calculadora de Gordura Corporal',
      seoTitle: 'Calculadora de Gordura Corporal (% BF) | HelloTools',
      seoDescription: 'Estime seu percentual de gordura corporal (% BF) pelo método da Marinha Americana.',
      description: 'Descubra seu percentual de gordura e massa magra.',
      quickAnswer: 'Estima a porcentagem de gordura em relação ao seu peso total.',
      seoHowToUse: '1. Insira sexo, altura e peso.\n2. Informe a medida do pescoço, cintura (e quadril para mulheres).\n3. Veja seu % de gordura.',
      seoHowItWorks: 'Utiliza o método matemático da Marinha dos EUA.',
      formula: '% Gordura = Algoritmo US Navy',
      seoExample: 'Um homem com 85 cm de cintura tem cerca de 15% de gordura corporal.',
      faqs: [{ q: 'Qual a diferença entre massa gorda e massa magra?', a: 'Massa gorda é o tecido adiposo; massa magra inclui músculos, ossos e órgãos.' }]
    },
    ja: {
      name: '体脂肪率計算ツール',
      seoTitle: '体脂肪率計算ツール — 米海軍（Navy）式計測 | HelloTools',
      seoDescription: '身長、体重、ウエストサイズ、首回りの測定値から、体脂肪率（%）と除脂肪体重を計算します。',
      description: 'ウエストサイズ等の測定値から体脂肪率を推計します。',
      quickAnswer: '身体の周囲長測定値から体脂肪の割合（体脂肪率%）を算出します。',
      seoHowToUse: '1. 性別・身長・体重を入力します。\n2. ウエスト周りと首周り（女性はヒップも）のサイズを入力します。\n3. 体脂肪率（%）を確認します。',
      seoHowItWorks: '高精度な米海軍（US Navy）方式の対数公式で算出します。',
      formula: '体脂肪率(%) = 86.010*log10(ウエスト-首) - 70.041*log10(身長) + 36.76',
      seoExample: '男性でウエスト85cm・首回り38cm・身長175cmの場合、体脂肪率は約15%と推計されます。',
      faqs: [{ q: '測るタイミングはいつが良いですか？', a: '毎朝起きてすぐ空腹時に測定すると正確な推移を把握できます。' }]
    }
  },

  'macro-calculator': {
    es: {
      name: 'Calculadora de Macronutrientes',
      seoTitle: 'Calculadora de Macronutrientes (Proteínas, Carbos, Grasas) | HelloTools',
      seoDescription: 'Calcula tus gramos diarios necesarios de proteínas, carbohidratos y grasas según tu objetivo.',
      description: 'Calcula el reparto ideal de macronutrientes para tu dieta.',
      quickAnswer: 'Distribuye las calorías diarias en gramos exactos de proteínas, carbohidratos y lípidos.',
      seoHowToUse: '1. Introduce tus calorías diarias (TDEE).\n2. Elige tu objetivo (definición, mantenimiento o volumen).\n3. Revisa la distribución de macros.',
      seoHowItWorks: 'Asigna calorías por gramo: Proteína (4 kcal/g), Carbohidratos (4 kcal/g), Grasa (9 kcal/g).',
      formula: 'Proteína (g) = Calorías * %Proteína / 4 | Grasa (g) = Calorías * %Grasa / 9',
      seoExample: 'En una dieta de 2.000 kcal al 40/30/30, consumes 200g de proteína, 150g de carbos y 67g de grasa.',
      faqs: [{ q: '¿Cuántos gramos de proteína necesito al día?', a: 'Se recomienda entre 1,6 y 2,2 gramos por kilo de peso para mantener masa muscular.' }]
    },
    de: {
      name: 'Makronährstoff-Rechner',
      seoTitle: 'Makronährstoff-Rechner — Eiweiß, Kohlenhydrate, Fett | HelloTools',
      seoDescription: 'Berechnen Sie die optimale Verteilung von Proteinen, Kohlenhydraten und Fetten.',
      description: 'Verteilung der täglichen Nährstoffe für Ihr Fitnessziel berechnen.',
      quickAnswer: 'Teilt Ihren täglichen Kalorienbedarf in Gramm für Eiweiß, Kohlenhydrate und Fett auf.',
      seoHowToUse: '1. Kalorienbedarf (TDEE) eingeben.\n2. Ziel wählen (Abnehmen, Muskelaufbau).\n3. Makros in Gramm ablesen.',
      seoHowItWorks: 'Rechnet nach Brennwerten: Eiweiß/Carbs = 4 kcal/g, Fett = 9 kcal/g.',
      formula: 'Protein (g) = Kalorien * %Protein / 4',
      seoExample: 'Bei 2.000 kcal (40/30/30) essen Sie 200g Protein, 150g Carbs und 67g Fett.',
      faqs: [{ q: 'Warum sind Makronährstoffe wichtig?', a: 'Sie steuern den Muskelerhalt, die Energieversorgung und den Hormonhaushalt.' }]
    },
    fr: {
      name: 'Calculateur de Macronutriments',
      seoTitle: 'Calculateur de Macronutriments (Protéines, Glucides, Lipides) | HelloTools',
      seoDescription: 'Calculez votre répartition idéale en protéines, glucides et lipides selon vos objectifs.',
      description: 'Répartissez vos calories quotidiennes en grammes de nutriments.',
      quickAnswer: 'Convertit votre apport calorique en grammes de protéines, glucides et lipides.',
      seoHowToUse: '1. Entrez votre apport calorique quotidien.\n2. Choisissez votre objectif sportif.\n3. Obtenez votre bilan de macros.',
      seoHowItWorks: 'Utilise la valeur énergétique par gramme de chaque nutriment.',
      formula: 'Protéines (g) = Calories * %Protéines / 4',
      seoExample: 'Pour 2 000 kcal (40/30/30), consommez 200g de protéines, 150g de glucides et 67g de lipides.',
      faqs: [{ q: 'Combien de lipides consommer au minimum ?', a: 'Il est conseillé de conserver au moins 0,8g à 1g de lipides par kilo de poids corporel.' }]
    },
    pt: {
      name: 'Calculadora de Macronutrientes',
      seoTitle: 'Calculadora de Macronutrientes (Proteínas, Carbos, Gorduras) | HelloTools',
      seoDescription: 'Calcule as gramas diárias de proteínas, carboidratos e gorduras para seu objetivo.',
      description: 'Descubra a divisão perfeita de macros para a sua dieta.',
      quickAnswer: 'Divide as calorias diárias em gramas exatas de proteína, carboidrato e gordura.',
      seoHowToUse: '1. Insira seu consumo calórico diário.\n2. Escolha seu objetivo (emagrecer, manter ou ganhar massa).\n3. Veja as gramas de cada macro.',
      seoHowItWorks: 'Calcula a gramatura baseada nas calorias de cada macronutriente.',
      formula: 'Proteínas (g) = Calorias * %Proteína / 4',
      seoExample: 'Em uma dieta de 2.000 kcal (40/30/30), consuma 200g de proteína, 150g de carbos e 67g de gordura.',
      faqs: [{ q: 'Qual a proporção de macros para perda de gordura?', a: 'Uma proporção comum é 40% proteína, 30% carboidrato e 30% gordura.' }]
    },
    ja: {
      name: 'PFCバランス（マクロ栄養素）計算ツール',
      seoTitle: 'PFCバランス計算ツール — タンパク質・脂質・炭水化物 | HelloTools',
      seoDescription: '1日の目標摂取カロリーから、タンパク質（P）、脂質（F）、炭水化物（C）の最適な目標グラム数を算出します。',
      description: '目標カロリーに対するPFC（タンパク質・脂質・炭水化物）の割合を計算します。',
      quickAnswer: '1日の摂取カロリーをタンパク質、脂質、炭水化物の最適なグラム数に分解算出します。',
      seoHowToUse: '1. 1日の目標摂取カロリーを入力します。\n2. ダイエット目的（減量・維持・増量）を選択します。\n3. PFCそれぞれの目標グラム数（g）を確認します。',
      seoHowItWorks: 'タンパク質=4kcal/g、炭水化物=4kcal/g、脂質=9kcal/gの熱量比換算を行います。',
      formula: 'タンパク質(g) = カロリー * %P / 4',
      seoExample: '2,000kcal（P40%/F30%/C30%）の場合、P:200g、F:67g、C:150gとなります。',
      faqs: [{ q: '筋トレ中のタンパク質摂取量の目安は？', a: '体重1kgあたり1.6g〜2.2gが推奨される一般的な目安です。' }]
    }
  },

  'pregnancy-calculator': {
    es: {
      name: 'Calculadora de Fecha de Parto y Embarazo',
      seoTitle: 'Calculadora de Fecha Probable de Parto (FPP) | HelloTools',
      seoDescription: 'Calcula tu fecha probable de parto y semanas de gestación según tu última regla.',
      description: 'Calcula tu fecha de parto y el seguimiento semana a semana de tu embarazo.',
      quickAnswer: 'Estima la fecha de nacimiento del bebé basándose en el primer día de la última menstruación.',
      seoHowToUse: '1. Introduce la fecha del primer día de tu última regla (FUM).\n2. Obtén la fecha estimada de parto.\n3. Revisa la semana actual de gestación.',
      seoHowItWorks: 'Aplica la Regla de Naegele sumando 280 días a la FUM.',
      formula: 'Fecha de Parto = FUM + 280 días (40 semanas)',
      seoExample: 'Con una FUM del 1 de enero, la fecha probable de parto es el 8 de octubre.',
      faqs: [{ q: '¿Qué tan precisa es la regla de Naegele?', a: 'Aproximadamente el 5% de los bebés nacen en la fecha exacta; la mayoría nace dentro de las dos semanas anteriores o posteriores.' }]
    },
    de: {
      name: 'Schwangerschaftsrechner',
      seoTitle: 'Schwangerschaftsrechner — Geburtstermin Berechnen | HelloTools',
      seoDescription: 'Berechnen Sie Ihren voraussichtlichen Geburtstermin und die Schwangerschaftswoche.',
      description: 'Entbindungstermin und Schwangerschaftswoche einfach ermitteln.',
      quickAnswer: 'Berechnet den voraussichtlichen Geburtstermin ab dem ersten Tag der letzten Periode.',
      seoHowToUse: '1. Ersten Tag der letzten Periode eingeben.\n2. Geburtstermin ablesen.\n3. Aktuelle SSW erfahren.',
      seoHowItWorks: 'Nützt die Naegele-Regel (280 Tage Additionsregel).',
      formula: 'Geburtstermin = Letzte Periode + 280 Tage',
      seoExample: 'Bei letzter Periode am 1. Januar ist der Entbindungstermin der 8. Oktober.',
      faqs: [{ q: 'Wie lang dauert eine Schwangerschaft?', a: 'Durchschnittlich 40 Wochen bzw. 280 Tage ab der letzten Regelblutung.' }]
    },
    fr: {
      name: 'Calculateur de Date d\'Accouchement',
      seoTitle: 'Calculateur de Date d\'Accouchement et Grossesse | HelloTools',
      seoDescription: 'Calculez votre date probable d\'accouchement (DPA) et suivez vos semaines de grossesse.',
      description: 'Déterminez la date présumée de la naissance de votre bébé.',
      quickAnswer: 'Estime la date d\'accouchement à partir du premier jour des dernières règles.',
      seoHowToUse: '1. Saisissez la date du premier jour des dernières règles.\n2. Obtenez votre date présumée d\'accouchement.\n3. Suivez le calendrier de grossesse.',
      seoHowItWorks: 'Utilise la règle médicale de Naegele (280 jours).',
      formula: 'DPA = Date des dernières règles + 280 jours',
      seoExample: 'Pour des règles le 1er janvier, la date d\'accouchement estimée est le 8 octobre.',
      faqs: [{ q: 'Qu\'est-ce que la SA et la SG ?', a: 'La SA est la semaine d\'aménorrhée (depuis les règles), la SG est la semaine de grossesse (depuis la fécondation).' }]
    },
    pt: {
      name: 'Calculadora de Gravidez e Parto',
      seoTitle: 'Calculadora de Data Provável do Parto (DPP) | HelloTools',
      seoDescription: 'Calcule a data provável do parto (DPP) e descubra sua semana de gestação.',
      description: 'Descubra a data estimada do nascimento do seu bebê.',
      quickAnswer: 'Calcula a data provável do parto a partir da Data da Última Menstruação (DUM).',
      seoHowToUse: '1. Informe o primeiro dia da sua última menstruação (DUM).\n2. Veja a Data Provável do Parto (DPP).\n3. Confira em qual semana de gestação você está.',
      seoHowItWorks: 'Aplica a Regra de Naegele (adiciona 280 dias ou 40 semanas à DUM).',
      formula: 'DPP = DUM + 280 dias',
      seoExample: 'Com DUM em 1 de janeiro, a data provável do parto é 8 de outubro.',
      faqs: [{ q: 'Quantas semanas dura uma gestação completa?', a: 'Uma gestação a termo dura entre 37 e 42 semanas.' }]
    },
    ja: {
      name: '出産予定日・妊娠週数計算ツール',
      seoTitle: '出産予定日計算ツール — 最終生理開始日基準 | HelloTools',
      seoDescription: '最終生理開始日を入力するだけで、出産予定日（ネーゲレ概算法）や現在の妊娠週数・日数を計算します。',
      description: '最終生理開始日から出産予定日や現在の妊娠週数を計算します。',
      quickAnswer: '最終生理開始日から280日（40週0日）後を出産予定日として算出します。',
      seoHowToUse: '1. 最終生理開始日を選択します。\n2. 「計算」ボタンを押します。\n3. 出産予定日および現在の妊娠週数（〇週〇日）を確認します。',
      seoHowItWorks: '産婦人科で標準的なネーゲレ概算法（最終生理日 + 280日）で算出します。',
      formula: '出産予定日 = 最終生理開始日 + 280日（40週0日）',
      seoExample: '最終生理開始日が1月1日の場合、出産予定日は10月8日頃となります。',
      faqs: [{ q: '予定日通りに出産する確率はどのくらいですか？', a: '予定日当日に出産する確率は約5%前後で、予定日前後の2週間以内に多くが出産します。' }]
    }
  },

  'ovulation-calculator': {
    es: {
      name: 'Calculadora de Ovulación y Días Fértiles',
      seoTitle: 'Calculadora de Ovulación y Días Fértiles | HelloTools',
      seoDescription: 'Calcula tu día de ovulación y tu ventana fértil para planificar o evitar un embarazo.',
      description: 'Calcula tus días más fértiles del ciclo menstrual.',
      quickAnswer: 'Identifica los días de mayor fertilidad estimando el día exacto de la ovulación.',
      seoHowToUse: '1. Introduce la fecha de tu última regla.\n2. Indica la duración habitual de tu ciclo (ej. 28 días).\n3. Descubre tus días fértiles.',
      seoHowItWorks: 'Resta 14 días a la duración media del ciclo menstrual.',
      formula: 'Día de Ovulación = Fecha Última Regla + Duración Ciclo - 14 días',
      seoExample: 'En un ciclo de 28 días, la ovulación ocurre aproximadamente en el día 14.',
      faqs: [{ q: '¿Cuántos días dura la ventana fértil?', a: 'Aproximadamente 6 días: los 5 días previos a la ovulación y el mismo día de la ovulación.' }]
    },
    de: {
      name: 'Eisprungrechner',
      seoTitle: 'Eisprungrechner — Fruchtbare Tage Berechnen | HelloTools',
      seoDescription: 'Berechnen Sie Ihren Eisprung und Ihre fruchtbaren Tage für die Familienplanung.',
      description: 'Fruchtbare Tage und Eisprung genau berechnen.',
      quickAnswer: 'Bestimmt das Zeitfenster der höchsten Fruchtbarkeit im Menstruationszyklus.',
      seoHowToUse: '1. Ersten Tag der letzten Periode angeben.\n2. Zykluslänge (z.B. 28 Tage) wählen.\n3. Fruchtbare Tage ablesen.',
      seoHowItWorks: 'Zieht 14 Tage von der gewählten Zykluslänge ab.',
      formula: 'Eisprung = Letzte Periode + Zykluslänge - 14 Tage',
      seoExample: 'Bei einem 28-Tage-Zyklus findet der Eisprung am 14. Tag statt.',
      faqs: [{ q: 'Wie lange ist eine Eizelle befruchtungsfähig?', a: 'Etwa 12 bis 24 Stunden nach dem Eisprung.' }]
    },
    fr: {
      name: 'Calculateur d\'Ovulation',
      seoTitle: 'Calculateur d\'Ovulation et Jours Fertiles | HelloTools',
      seoDescription: 'Calculez votre jour d\'ovulation et votre période de fertilité maximale.',
      description: 'Déterminez vos jours les plus fertiles.',
      quickAnswer: 'Estime le jour de l\'ovulation et la fenêtre de fertilité optimale.',
      seoHowToUse: '1. Entrez la date de vos dernières règles.\n2. Indiquez la durée moyenne de votre cycle.\n3. Consultez vos jours fertiles.',
      seoHowItWorks: 'Retranche 14 jours de la durée totale du cycle.',
      formula: 'Ovulation = Date règles + Durée cycle - 14 jours',
      seoExample: 'Pour un cycle de 28 jours, l\'ovulation a lieu au 14ème jour.',
      faqs: [{ q: 'Combien de temps vivent les spermatozoïdes ?', a: 'Ils peuvent survivre jusqu\'à 5 jours dans les voies génitales féminines.' }]
    },
    pt: {
      name: 'Calculadora de Ovulação e Dias Férteis',
      seoTitle: 'Calculadora de Ovulação e Período Fértil | HelloTools',
      seoDescription: 'Calcule seu dia de ovulação e seu período fértil para engravidar.',
      description: 'Descubra seus dias mais férteis do mês.',
      quickAnswer: 'Estima os dias com maior probabilidade de concepção no seu ciclo.',
      seoHowToUse: '1. Digite a data da sua última menstruação.\n2. Informe a duração média do seu ciclo.\n3. Veja os dias férteis no calendário.',
      seoHowItWorks: 'Subtrai 14 dias da duração total do ciclo menstrual.',
      formula: 'Ovulação = Data Menstruação + Duração Ciclo - 14 dias',
      seoExample: 'Em um ciclo de 28 dias, a ovulação ocorre por volta do 14º dia.',
      faqs: [{ q: 'Quais os sintomas da ovulação?', a: 'Aumento do muco cervical transparente, leve dor pélvica e aumento da libido.' }]
    },
    ja: {
      name: '排卵日・危険日（妊活）計算ツール',
      seoTitle: '排卵日計算ツール — 妊娠しやすい危険日 | HelloTools',
      seoDescription: '最終生理開始日と生理周期日数から、次回の排卵日および妊娠可能性の高い時期（妊娠中・妊活向け）を計算します。',
      description: '生理周期から排卵日と最も妊娠しやすい危険時期を計算します。',
      quickAnswer: '次回生理予定日の14日前を排卵推定日として妊娠しやすい期間を計算します。',
      seoHowToUse: '1. 最終生理開始日を入力します。\n2. 平均的な生理周期（例：28日）を指定します。\n3. 排卵推定日と最も妊娠しやすい期間を確認します。',
      seoHowItWorks: 'オギノ式・医学的基準の「次回生理予定日の14日前」公式で算定します。',
      formula: '排卵推定日 = 最終生理日 + 周期日数 - 14日',
      seoExample: '28日周期の場合、生理開始から約14日目が排卵日となります。',
      faqs: [{ q: '妊娠可能性が最も高いのはいつですか？', a: '排卵日の2日前から排卵日当日にかけてが最も妊娠しやすい時期です。' }]
    }
  },

  'running-pace-calculator': {
    es: {
      name: 'Calculadora de Ritmo de Carrera',
      seoTitle: 'Calculadora de Ritmo de Carrera (Pace min/km) | HelloTools',
      seoDescription: 'Calcula tu ritmo por kilómetro (min/km), tiempo total de carrera y velocidad media.',
      description: 'Calcula tu ritmo por kilómetro y velocidad media en carrera.',
      quickAnswer: 'Calcula el tiempo promedio necesario para recorrer un kilómetro o milla.',
      seoHowToUse: '1. Introduce la distancia recorrida (ej. 10 km o 42.195 km).\n2. Indica el tiempo total de carrera.\n3. Lee tu ritmo (min/km) y velocidad (km/h).',
      seoHowItWorks: 'Divide el tiempo total entre la distancia recorrida.',
      formula: 'Ritmo = Tiempo Total / Distancia',
      seoExample: 'Correr 10 km en 50 minutos equivale a un ritmo de 5:00 min/km (12 km/h).',
      faqs: [{ q: '¿Qué es el "pace" en running?', a: 'Es el ritmo expresado en minutos y segundos que tardas en completar 1 kilómetro o 1 milla.' }]
    },
    de: {
      name: 'Laufzeit- & Pace-Rechner',
      seoTitle: 'Pace-Rechner — Laufzeit & Geschwindigkeit (min/km) | HelloTools',
      seoDescription: 'Berechnen Sie Ihre Pace pro Kilometer, Laufzeit und Durchschnittsgeschwindigkeit.',
      description: 'Ermitteln Sie Ihre Pace pro km und Geschwindigkeit beim Laufen.',
      quickAnswer: 'Errechnet die benötigte Zeit pro Kilometer oder Meile.',
      seoHowToUse: '1. Gelaufene Distanz eingeben.\n2. Gesamtzeit eintragen.\n3. Pace (min/km) und Geschwindigkeit (km/h) ablesen.',
      seoHowItWorks: 'Teilt die Gesamtzeit durch die Kilometerdistanz.',
      formula: 'Pace = Gesamtzeit / Distanz',
      seoExample: '10 km in 50 Minuten entsprechen einer Pace von 5:00 min/km (12 km/h).',
      faqs: [{ q: 'Was bedeutet Pace 5:00?', a: 'Sie benötigen exakt 5 Minuten für jeden gelaufenen Kilometer.' }]
    },
    fr: {
      name: 'Calculateur de Allure de Course',
      seoTitle: 'Calculateur d\'Allure de Course (min/km) | HelloTools',
      seoDescription: 'Calculez votre allure par kilomètre, temps de course et vitesse moyenne.',
      description: 'Calculez votre allure au km et votre vitesse moyenne en course à pied.',
      quickAnswer: 'Calcule le temps moyen mis pour parcourir un kilomètre.',
      seoHowToUse: '1. Indiquez la distance (ex: 10 km ou semi-marathon).\n2. Saisissez le temps total.\n3. Consultez votre allure.',
      seoHowItWorks: 'Divise la durée totale par la distance parcourue.',
      formula: 'Allure = Temps / Distance',
      seoExample: 'Courir 10 km en 50 minutes donne une allure de 5:00 min/km (12 km/h).',
      faqs: [{ q: 'Comment passer de l\'allure min/km à la vitesse km/h ?', a: 'Divisez 60 par votre allure en minutes pour obtenir la vitesse en km/h.' }]
    },
    pt: {
      name: 'Calculadora de Pace de Corrida',
      seoTitle: 'Calculadora de Pace de Corrida (min/km) | HelloTools',
      seoDescription: 'Calcule seu ritmo por quilômetro (pace), tempo total e velocidade média.',
      description: 'Descubra seu ritmo de corrida por quilômetro.',
      quickAnswer: 'Calcula o tempo médio gasto para correr um quilômetro (pace).',
      seoHowToUse: '1. Digite a distância corrida em km.\n2. Informe o tempo total (horas, minutos, segundos).\n3. Veja seu pace (min/km).',
      seoHowItWorks: 'Divide o tempo total pela distância percorrida.',
      formula: 'Pace = Tempo Total / Distância',
      seoExample: 'Correr 10 km em 50 minutos dá um pace de 5:00 min/km (12 km/h).',
      faqs: [{ q: 'Qual a diferença entre pace e velocidade?', a: 'Pace é o tempo por km (ex: 5:00/km); velocidade é os km por hora (ex: 12 km/h).' }]
    },
    ja: {
      name: 'ランニングペース計算ツール',
      seoTitle: 'ランニングペース計算ツール — 1kmあたりペース | HelloTools',
      seoDescription: '走行距離と所要時間から、1kmあたりのペース（分/km）や平均時速（km/h）、マラソン予測タイムを計算します。',
      description: '走行距離とタイムから1kmあたりのペースや平均速度を計算します。',
      quickAnswer: '走行距離と所要時間から1kmを走るのにかかる平均時間（ペース）を算出します。',
      seoHowToUse: '1. 走行距離（km）またはマラソン種目（フル・ハーフ等）を選択します。\n2. 所要時間を入力します。\n3. 1kmあたりのペース（分/km）と時速（km/h）を確認します。',
      seoHowItWorks: '総所要時間を走行距離で除算して 1km あたりの秒数を求め表示します。',
      formula: 'ペース = 総時間 / 距離(km)',
      seoExample: '10kmを50分で走った場合、ペースは 5分00秒/km（時速12km/h）です。',
      faqs: [{ q: 'サブ4（フルマラソン4時間切り）に必要なペースは？', a: '1kmあたり約5分40秒以内のペースを維持する必要があります。' }]
    }
  },

  'retirement-calculator': {
    es: {
      name: 'Calculadora de Jubilación',
      seoTitle: 'Calculadora de Jubilación y Ahorro para el Retiro | HelloTools',
      seoDescription: 'Calcula cuánto dinero necesitas acumular para jubilarte y tu pensión estimada.',
      description: 'Estima el capital necesario para mantener tu nivel de vida tras la jubilación.',
      quickAnswer: 'Calcula el fondo acumulado al jubilarte y la renta mensual estimada.',
      seoHowToUse: '1. Introduce tu edad actual y edad deseada de jubilación.\n2. Indica tus ahorros actuales y aportación mensual.\n3. Añade la rentabilidad esperada.',
      seoHowItWorks: 'Calcula el interés compuesto acumulado hasta la edad de retiro.',
      formula: 'Capital Final = Ahorro Inicial*(1+r)^n + Aporte Mensual*[((1+r)^n-1)/r]',
      seoExample: 'Ahorrando $300/mes desde los 30 hasta los 65 años al 7% anual acumulas aprox. $540.000.',
      faqs: [{ q: '¿Qué es la regla del 4%?', a: 'Es una regla que sugiere retirar el 4% del capital acumulado el primer año de jubilación para mantener el fondo durante 30 años.' }]
    },
    de: {
      name: 'Rentenrechner',
      seoTitle: 'Rentenrechner — Altersvorsorge & Sparrate Berechnen | HelloTools',
      seoDescription: 'Berechnen Sie Ihr benötigtes Altersvorsorgekapital und die monatliche Rente.',
      description: 'Ermitteln Sie Ihren Kapitalbedarf für den Ruhestand.',
      quickAnswer: 'Schätzt das angesparte Vermögen zum Renteneintritt und die monatliche Auszahlung.',
      seoHowToUse: '1. Aktuelles Alter und Rentenalter eingeben.\n2. Ersparnisse und Sparrate angeben.\n3. Rendite eintragen.',
      seoHowItWorks: 'Verwendet Zinseszinsrechnung für die Ansparphase.',
      formula: 'Endkapital = Ansparformel mit Zinseszins',
      seoExample: '300 € monatlich von 30 bis 65 Jahre bei 7 % bringen ca. 540.000 € Alterskapital.',
      faqs: [{ q: 'Was ist die Rentenlücke?', a: 'Die Differenz zwischen Ihrem letzten Nettoeinkommen und der gesetzlichen Rente.' }]
    },
    fr: {
      name: 'Calculateur de Retraite',
      seoTitle: 'Calculateur de Retraite et Épargne | HelloTools',
      seoDescription: 'Estimez le capital nécessaire pour votre retraite et vos versements mensuels.',
      description: 'Calculez votre montant d\'épargne nécessaire pour la retraite.',
      quickAnswer: 'Estime le capital accumulé à la retraite et la rente mensuelle issue de vos placements.',
      seoHowToUse: '1. Saisissez votre âge actuel et l\'âge de départ souhaité.\n2. Indiquez votre épargne mensuelle.\n3. Obtenez l\'estimation du capital.',
      seoHowItWorks: 'Applique le calcul de capitalisation d\'intérêts composés.',
      formula: 'Capital Retraite = Formule d\'intérêts composés',
      seoExample: '300 €/mois de 30 à 65 ans à 7 % représentent environ 540 000 € à la retraite.',
      faqs: [{ q: 'Quand commencer à épargner pour la retraite ?', a: 'Le plus tôt possible pour maximiser l\'effet des intérêts composés.' }]
    },
    pt: {
      name: 'Calculadora de Aposentadoria',
      seoTitle: 'Calculadora de Aposentadoria e Independência Financeira | HelloTools',
      seoDescription: 'Calcule o valor necessário para se aposentar com tranquilidade financeira.',
      description: 'Descubra quanto precisa acumular para a sua aposentadoria.',
      quickAnswer: 'Calcula o montante total acumulado para a aposentadoria e a renda mensal estimada.',
      seoHowToUse: '1. Digite sua idade atual e a idade em que deseja se aposentar.\n2. Informe seus aportes mensais.\n3. Veja a renda estimada.',
      seoHowItWorks: 'Aplica a fórmula de rendimento composto acumulado no tempo.',
      formula: 'Montante Final = Aporte Mensual acumulado com juros compostos',
      seoExample: 'Poupar R$ 500/mês dos 30 aos 65 anos a 8% a.a. gera um patrimônio de aprox. R$ 1,1 milhão.',
      faqs: [{ q: 'O que é a regra dos 300 suposta pelo movimento FIRE?', a: 'Multiplica seus gastos mensais por 300 para encontrar o patrimônio necessário para viver de renda.' }]
    },
    ja: {
      name: '老後資金・退職金計算ツール',
      seoTitle: '老後資金計算ツール — 資産運用・必要貯蓄額 | HelloTools',
      seoDescription: '現在の年齢、引退希望年齢、毎月の積立額、想定利回りから、老後に備えて手元に残る総資産額を計算します。',
      description: '老後の生活に必要な累積資金と毎月の取り崩し可能額をシミュレーションします。',
      quickAnswer: '退職時までの積立投資による累積総資産と取り崩し可能額を算定します。',
      seoHowToUse: '1. 現在の年齢と定年退職年齢を入力します。\n2. 現在の貯蓄額と毎月の積立額を入力します。\n3. 想定年利（%）を指定します。',
      seoHowItWorks: '積立複利計算公式を用いて退職時点の総資産額を推計します。',
      formula: '退職時資産 = 初期資金*(1+r)^n + 毎月積立積算',
      seoExample: '30歳から65歳まで毎月3万円（年利5%）積立運用すると、約2,500万円の老後資金が形成されます。',
      faqs: [{ q: '老後2,000万円問題とは何ですか？', a: '公的年金以外に老後30年間で約2,000万円の取り崩し資金が必要とされる推計です。' }]
    }
  },

  'text-reverser': {
    es: {
      name: 'Inversor de Texto',
      seoTitle: 'Inversor de Texto — Invertir Palabras y Letras Online | HelloTools',
      seoDescription: 'Invierte texto completo, palabras o letras al revés al instante.',
      description: 'Invierte el orden de los caracteres o palabras de cualquier texto.',
      quickAnswer: 'Gira un texto en sentido inverso caracter por caracter o palabra por palabra.',
      seoHowToUse: '1. Introduce o pega el texto.\n2. Selecciona invertir caracteres o palabras.\n3. Copia el resultado invertido.',
      seoHowItWorks: 'Divide la cadena en un array, la invierte con .reverse() y la une.',
      formula: 'Inverso = texto.split("").reverse().join("")',
      seoExample: 'Invertir "Hello World" da como resultado "dlroW olleH".',
      faqs: [{ q: '¿Mantiene los saltos de línea?', a: 'Sí, la herramienta conserva los saltos de línea originales.' }]
    },
    de: {
      name: 'Text Rückwärts Drehen',
      seoTitle: 'Text Rückwärts Drehen — Wörter & Buchstaben Umkehren | HelloTools',
      seoDescription: 'Kehren Sie Text, Wörter oder Buchstaben sofort spiegelverkehrt um.',
      description: 'Textzeichen oder Wörter rückwärts anordnen.',
      quickAnswer: 'Dreht den eingegebenen Text Buchstabe für Buchstabe um.',
      seoHowToUse: '1. Text eingeben.\n2. Umkehrmodus wählen.\n3. Rückwärtstext kopieren.',
      seoHowItWorks: 'Verwendet split("").reverse().join("").',
      formula: 'Rückwärts = text.split("").reverse().join("")',
      seoExample: 'Aus "Hallo Welt" wird "tleW ollaH".',
      faqs: [{ q: 'Werden Umlautzeichen unterstützt?', a: 'Ja, Umlaut- und Unicode-Zeichen werden ordnungsgemäß umgekehrt.' }]
    },
    fr: {
      name: 'Inverseur de Texte',
      seoTitle: 'Inverseur de Texte en Ligne | HelloTools',
      seoDescription: 'Inversez le sens de votre texte, mots ou lettres immédiatement.',
      description: 'Inversez l\'ordre des lettres ou des mots d\'un texte.',
      quickAnswer: 'Récrit un texte à l\'envers lettre par lettre.',
      seoHowToUse: '1. Collez votre texte.\n2. Choisissez le mode d\'inversion.\n3. Copiez le résultat.',
      seoHowItWorks: 'Repose sur split("").reverse().join("").',
      formula: 'Inverse = text.split("").reverse().join("")',
      seoExample: 'Transforme "Bonjour" en "ruojnoB".',
      faqs: [{ q: 'Est-ce compatible avec les émoticônes ?', a: 'Oui, les symboles Unicode et émojis sont gérés.' }]
    },
    pt: {
      name: 'Inversor de Texto',
      seoTitle: 'Inversor de Texto — Inverter Letras e Palavras | HelloTools',
      seoDescription: 'Inverta textos, frases ou palavras de trás para frente instantaneamente.',
      description: 'Inverta a ordem dos caracteres ou palavras do seu texto.',
      quickAnswer: 'Gira o texto ao contrário letra por letra.',
      seoHowToUse: '1. Cole seu texto.\n2. Escolha o modo de inversão.\n3. Copie o texto invertido.',
      seoHowItWorks: 'Aplica a função split("").reverse().join("").',
      formula: 'Texto Invertido = texto.split("").reverse().join("")',
      seoExample: 'Converte "Hello" em "olleH".',
      faqs: [{ q: 'Inverte palavra por palavra?', a: 'Sim, há uma opção para inverter apenas a ordem das palavras.' }]
    },
    ja: {
      name: 'テキスト逆転（逆さ文字）ツール',
      seoTitle: 'テキスト反転・逆さ文字変換ツール | HelloTools',
      seoDescription: '入力された文章の文字順（あいうえお→おえういあ）や単語順を反対向きに逆転変換します。',
      description: '文字列を末尾から逆順（反転）に並び替えます。',
      quickAnswer: '文字列を1文字ずつ末尾から逆順に変換して逆さ文字を作成します。',
      seoHowToUse: '1. テキストを入力します。\n2. 「文字単位で逆転」または「行単位で逆転」を押します。\n3. 反転したテキストをコピーします。',
      seoHowItWorks: 'JavaScriptの split("").reverse().join("") アルゴリズムで処理します。',
      formula: '反転テキスト = Array.from(text).reverse().join("")',
      seoExample: '「こんにちは」を「はちにんこ」に変換します。',
      faqs: [{ q: '絵文字や特殊文字も正常に反転できますか？', a: 'Array.from() を利用しているためサロゲートペア（絵文字）も壊れずに反転します。' }]
    }
  },

  'word-frequency-counter': {
    es: {
      name: 'Contador de Frecuencia de Palabras',
      seoTitle: 'Contador de Frecuencia de Palabras y Densidad de Palabras | HelloTools',
      seoDescription: 'Analiza tu texto para contar la frecuencia y densidad de aparición de cada palabra.',
      description: 'Analiza la densidad y repetición de palabras en tu texto.',
      quickAnswer: 'Cuenta la cantidad de veces que aparece cada palabra individual en un texto.',
      seoHowToUse: '1. Pega tu texto.\n2. Haz clic en Analizar Frecuencia.\n3. Revisa la tabla de palabras más usadas.',
      seoHowItWorks: 'Tokeniza el texto, elimina puntuación y contabiliza las repeticiones en un mapa.',
      formula: 'Frecuencia % = (Apariciones / Total Palabras) * 100',
      seoExample: 'En un texto de 100 palabras, si "SEO" aparece 5 veces, su densidad es del 5%.',
      faqs: [{ q: '¿Excluye palabras vacías (stop words)?', a: 'Puedes filtrar palabras comunes como "el", "de", "y".' }]
    },
    de: {
      name: 'Wortfrequenz-Analysator',
      seoTitle: 'Wortfrequenz-Analysator & Keyword-Dichte | HelloTools',
      seoDescription: 'Analysieren Sie Texte auf Worthäufigkeit und Keyword-Dichte.',
      description: 'Zählt die Häufigkeit aller vorkommenden Wörter in einem Text.',
      quickAnswer: 'Ermittelt wie oft jedes Wort in einem Text vorkommt.',
      seoHowToUse: '1. Text einfügen.\n2. Analyse starten.\n3. Wortliste nach Häufigkeit ablesen.',
      seoHowItWorks: 'Zählt Wort-Vorkommen in einer Häufigkeitstabelle.',
      formula: 'Dichte % = (Wortanzahl / Gesamtanzahl) * 100',
      seoExample: 'In einem 100-Wörter-Text bedeutet 5-mal "Rechner" eine Dichte von 5 %.',
      faqs: [{ q: 'Werden Stoppwörter ignoriert?', a: 'Optionale Filterung für häufige Füllwörter ist vorhanden.' }]
    },
    fr: {
      name: 'Compteur de Fréquence des Mots',
      seoTitle: 'Compteur de Fréquence des Mots et Densité SEO | HelloTools',
      seoDescription: 'Analysez la fréquence d\'apparition et la densité de vos mots-clés.',
      description: 'Mesurez la répétition et la densité des mots dans un texte.',
      quickAnswer: 'Dénombre la fréquence d\'occurrence de chaque mot dans un texte.',
      seoHowToUse: '1. Collez votre texte.\n2. Lancez l\'analyse.\n3. Consultez le classement des mots les plus fréquents.',
      seoHowItWorks: 'Découpe le texte et comptabilise chaque mot.',
      formula: 'Densité = (Occurrences / Total Mots) * 100',
      seoExample: 'Un mot présent 5 fois dans un texte de 100 mots a une densité de 5 %.',
      faqs: [{ q: 'À quoi sert le compteur de densité ?', a: 'Il aide à optimiser les textes pour le SEO sans sur-optimisation.' }]
    },
    pt: {
      name: 'Contador de Frequência de Palavras',
      seoTitle: 'Contador de Frequência de Palavras e Densidade SEO | HelloTools',
      seoDescription: 'Analise seu texto e descubra a frequência e densidade das palavras mais usadas.',
      description: 'Analise quais palavras mais se repetem no seu texto.',
      quickAnswer: 'Conta o número de repetições e a porcentagem de cada palavra no texto.',
      seoHowToUse: '1. Cole seu texto.\n2. Clique em Analisar.\n3. Veja o ranking das palavras mais frequentes.',
      seoHowItWorks: 'Divide o texto e conta o número de ocorrências de cada termo.',
      formula: 'Densidade % = (Contagem / Total) * 100',
      seoExample: 'Se uma palavra aparece 5 vezes em 100 palavras, sua densidade é de 5%.',
      faqs: [{ q: 'Ignora maiúsculas e minúsculas?', a: 'Sim, a contagem agrupa termos em minúsculas para precisão.' }]
    },
    ja: {
      name: '単語出現頻度・キーワード出現率解析ツール',
      seoTitle: '単語出現頻度・キーワード比率（SEO密度）解析 | HelloTools',
      seoDescription: 'テキスト内に含まれる各単語の出現回数および全体に対する出現率（%）を形態素解析的にカウント・ランキング表示します。',
      description: '文章中の単語の出現回数と出現比率（キーワード密度）を解析します。',
      quickAnswer: 'テキスト内の各単語の出現頻度と出現割合（キーワード密度%）を分析表示します。',
      seoHowToUse: '1. 解析したいテキストを貼り付けます。\n2. 「解析実行」をクリックします。\n3. 単語ごとの出現回数と比率（%）ランキングを確認します。',
      seoHowItWorks: 'テキストを単語（トークン）単位に分割しハッシュマップでカウントします。',
      formula: '出現率(%) = (単語出現数 / 総単語数) * 100',
      seoExample: '1,000文字中に「電卓」が10回出現する場合、比率は1%です。',
      faqs: [{ q: 'SEOライティングで適切なキーワード出現率は？', a: '一般的に主要キーワードで1%〜3%程度が自然な比率とされています。' }]
    }
  },

  'palindrome-checker': {
    es: {
      name: 'Comprobador de Palíndromos',
      seoTitle: 'Comprobador de Palíndromos Online | HelloTools',
      seoDescription: 'Comprueba si una palabra, frase o número se lee igual de izquierda a derecha que al revés.',
      description: 'Verifica si una palabra o frase es un palíndromo.',
      quickAnswer: 'Determina si un texto se lee exactamente igual al derecho y al revés.',
      seoHowToUse: '1. Introduce la palabra o frase.\n2. La herramienta ignora espacios y acentos.\n3. Lee el resultado (Es Palíndromo / No es Palíndromo).',
      seoHowItWorks: 'Limpia signos de puntuación y compara la cadena con su versión invertida.',
      formula: 'Limpio === Limpio.reverse()',
      seoExample: '"Anita lava la tina" o "Reconocer" son palíndromos perfectos.',
      faqs: [{ q: '¿Qué es un palíndromo?', a: 'Es una palabra o frase que se lee igual en ambas direcciones.' }]
    },
    de: {
      name: 'Palindrom-Prüfer',
      seoTitle: 'Palindrom Prüfer — Ist Das Wort Ein Palindrom? | HelloTools',
      seoDescription: 'Prüfen Sie ob ein Wort oder Satz vorwärts und rückwärts gleich gelesen wird.',
      description: 'Wörter und Sätze auf Palindrom-Eigenschaft prüfen.',
      quickAnswer: 'Prüft ob ein Text vorwärts und rückwärts identisch ist.',
      seoHowToUse: '1. Wort oder Satz eingeben.\n2. Prüfergebnis sofort ablesen.',
      seoHowItWorks: 'Bereinigt Satzzeichen und vergleicht mit der Umkehrung.',
      formula: 'Text === Text.reverse()',
      seoExample: '"Rentner" und "Otto" sind klassische Palindrome.',
      faqs: [{ q: 'Werden Leerzeichen ignoriert?', a: 'Ja, Leerzeichen und Großbuchstaben werden beim Test ignoriert.' }]
    },
    fr: {
      name: 'Testeur de Palindrome',
      seoTitle: 'Testeur de Palindrome en Ligne | HelloTools',
      seoDescription: 'Vérifiez si un mot ou une phrase est un palindrome (se lit de la même façon dans les deux sens).',
      description: 'Vérifiez si votre texte est un palindrome.',
      quickAnswer: 'Vérifie si un texte se lit de la même façon de gauche à droite et de droite à gauche.',
      seoHowToUse: '1. Entrez votre mot ou phrase.\n2. Obtenez le verdict immédiat.',
      seoHowItWorks: 'Nettoie la chaîne et compare le texte avec son inverse.',
      formula: 'Texte === Texte.reverse()',
      seoExample: '"Élu par cette crapule" ou "Radar" sont des palindromes.',
      faqs: [{ q: 'Les accents sont-ils pris en compte ?', a: 'L\'outil supprime automatiquement les accents pour le test.' }]
    },
    pt: {
      name: 'Verificador de Palíndromos',
      seoTitle: 'Verificador de Palíndromos Online | HelloTools',
      seoDescription: 'Verifique se uma palavra ou frase é um palíndromo (lida igual de trás para frente).',
      description: 'Verifique se frases ou palavras são palíndromos.',
      quickAnswer: 'Confere se o texto lido ao contrário permanece idêntico.',
      seoHowToUse: '1. Digite a palavra ou frase.\n2. Veja o resultado de verificação.',
      seoHowItWorks: 'Remove pontuações e compara a string com seu reverso.',
      formula: 'Texto === TextoInvertido',
      seoExample: '"Socorram-me subi no ônibus em Marrocos" é um palíndromo.',
      faqs: [{ q: 'O que é um palíndromo numérico?', a: 'Um número que lido ao contrário é igual, como 12321 (capicua).' }]
    },
    ja: {
      name: '回文（パレンドローム）判定ツール',
      seoTitle: '回文判定ツール — 上から読んでも下から読んでも | HelloTools',
      seoDescription: '入力された単語や文章が、上から読んでも下から読んでも同じ回文（Palindrome）であるかを自動判定します。',
      description: '文章が回文（上から読んでも下から読んでも同じ）かを判定します。',
      quickAnswer: '文字列からスペースや記号を除去し、前後どちらから読んでも同じ回文かを判定します。',
      seoHowToUse: '1. 判定したい文章を入力します。\n2. 判定結果（「回文です」/「回文ではありません」）を確認します。',
      seoHowItWorks: '濁点・スペース・記号を正規化し反転文字列と比較判定します。',
      formula: '判定 = 清書テキスト === 清書テキスト.reverse()',
      seoExample: '「たけやぶやけた」（竹屋焼けた）や「しんぶんし」（新聞紙）は有名な回文です。',
      faqs: [{ q: 'スペースや濁点は無視されますか？', a: 'はい、句読点やスペースは除去した上で判定を行います。' }]
    }
  },

  'sleep-cycle-calculator': {
    es: {
      name: 'Calculadora de Ciclos de Sueño',
      seoTitle: 'Calculadora de Ciclos de Sueño (Hora de Dormir y Despertar) | HelloTools',
      seoDescription: 'Calcula la hora ideal para irte a dormir o despertarte respetando los ciclos de sueño de 90 minutos.',
      description: 'Calcula a qué hora dormir o despertar para no levantarte cansado.',
      quickAnswer: 'Determina las horas óptimas para despertar sin interrumpir un ciclo de sueño profundo.',
      seoHowToUse: '1. Elige si quieres calcular la hora de despertar o la de acostarte.\n2. Indica la hora actual o deseada.\n3. Elige entre los horarios sugeridos.',
      seoHowItWorks: 'Suma o resta ciclos de 90 minutos considerando 14 minutos para conciliar el sueño.',
      formula: 'Hora = Hora Inicial + (n * 90 min) + 14 min para dormir',
      seoExample: 'Si te acuestas a las 23:00, las mejores horas para despertar son 6:14, 7:44 u 9:14.',
      faqs: [{ q: '¿Cuánto dura un ciclo de sueño humano?', a: 'Un ciclo medio de sueño dura unos 90 minutos y se recomiendan entre 5 y 6 ciclos por noche.' }]
    },
    de: {
      name: 'Schlafzyklusrechner',
      seoTitle: 'Schlafzyklusrechner — Optimale Schlafzeit Berechnen | HelloTools',
      seoDescription: 'Berechnen Sie die beste Einschlaf- und Aufwachzeit basierend auf 90-Minuten-Zyklen.',
      description: 'Ermitteln Sie Aufwachzeiten für ein ausgeruhtes Aufstehen.',
      quickAnswer: 'Empfiehlt Aufwachzeiten nach vollen 90-Minuten-Schlafphasen.',
      seoHowToUse: '1. Gewünschte Aufwachzeit oder Schlafenszeit eingeben.\n2. Optimale Uhreiten ablesen.',
      seoHowItWorks: 'Rechnet in 90-Minuten-Einheiten plus 14 Minuten Einschlafzeit.',
      formula: 'Zeit = Startzeit + (n * 90 Min) + 14 Min Einschlafen',
      seoExample: 'Wer um 23:00 Uhr schläft, wacht um 6:14 Uhr oder 7:44 Uhr erholt auf.',
      faqs: [{ q: 'Warum fühle ich mich trotz viel Schlaf müde?', a: 'Das Aufwachen inmitten einer Tiefschlafphase führt zu Schlaftrunkenheit.' }]
    },
    fr: {
      name: 'Calculateur de Cycles de Sommeil',
      seoTitle: 'Calculateur de Cycles de Sommeil | HelloTools',
      seoDescription: 'Calculez l\'heure idéale pour vous coucher ou vous réveiller en pleine forme.',
      description: 'Déterminez vos heures de réveil optimales.',
      quickAnswer: 'Calcule l\'heure de réveil optimale selon des cycles de sommeil de 90 minutes.',
      seoHowToUse: '1. Indiquez l\'heure à laquelle vous devez vous réveiller (ou vous coucher).\n2. Choisissez parmi les horaires proposés.',
      seoHowItWorks: 'Additionne des blocs de 90 minutes plus 14 minutes d\'endormissement.',
      formula: 'Heure = Heure de départ + (n * 90 min) + 14 min',
      seoExample: 'En vous couchant à 23h00, vos réveils optimaux sont à 6h14 et 7h44.',
      faqs: [{ q: 'Combien de cycles de sommeil faut-il par nuit ?', a: 'Il est généralement recommandé de compléter 5 à 6 cycles (7h30 à 9h).' }]
    },
    pt: {
      name: 'Calculadora de Ciclos do Sono',
      seoTitle: 'Calculadora de Ciclos do Sono — Hora de Acordar | HelloTools',
      seoDescription: 'Descubra a melhor hora para dormir ou acordar e evite acordar cansado.',
      description: 'Calcule os horários ideais de sono baseados em ciclos de 90 minutos.',
      quickAnswer: 'Indica os melhores horários para acordar sem interromper o sono profundo.',
      seoHowToUse: '1. Selecione se deseja calcular a hora de dormir ou acordar.\n2. Insira o horário desejado.\n3. Escolha uma das opções de horários.',
      seoHowItWorks: 'Baseia-se em ciclos de 90 minutos mais 14 minutos para adormecer.',
      formula: 'Horário = Hora Inicial + (n * 90 min) + 14 min',
      seoExample: 'Se dormir às 23:00, os melhores horários para acordar são 6:14, 7:44 e 9:14.',
      faqs: [{ q: 'Por que acordo cansado mesmo dormindo 8 horas?', a: 'Acordar no meio de um ciclo de sono profundo gera sensação de cansaço.' }]
    },
    ja: {
      name: '睡眠サイクル（ノンレム睡眠）計算ツール',
      seoTitle: '睡眠サイクル計算ツール — 就寝・起床最適時間 | HelloTools',
      seoDescription: '90分周期の睡眠サイクル（レム睡眠・ノンレム睡眠）に基づき、スッキリ起きられる最適な就寝時間・起床時間を計算します。',
      description: '90分周期の睡眠サイクルから最適なお休み時間・起床時間を計算します。',
      quickAnswer: '90分周期の睡眠サイクルに基づき、目覚めの良い就寝・起床時間を提案します。',
      seoHowToUse: '1. 起床希望時間（または今すぐ寝る）を選択します。\n2. 「計算」ボタンを押します。\n3. 推奨される就寝時間（または起床時間）一覧から選択します。',
      seoHowItWorks: '1サイクル90分＋入眠所要時間（平均15分）を加算して算出します。',
      formula: '起床時間 = 就寝時間 + (90分 * サイクル数) + 15分',
      seoExample: '夜23:00に寝る場合、翌朝6:15（4.5時間＝3サイクル）や7:45（6時間＝4サイクル）が快適な起床時間です。',
      faqs: [{ q: '理想の睡眠時間は何時間ですか？', a: '個人差がありますが、一般成人は1日4〜5サイクル（約6時間〜7.5時間）が推奨されます。' }]
    }
  },

  'color-picker': {
    es: {
      name: 'Selector de Color y Conversor HEX RGB HSL',
      seoTitle: 'Selector de Color y Conversor HEX, RGB, HSL | HelloTools',
      seoDescription: 'Selecciona colores e intercambia códigos entre HEX, RGB, HSL y CMYK.',
      description: 'Elige colores y convierte entre formatos HEX, RGB y HSL.',
      quickAnswer: 'Herramienta gráfica para seleccionar colores y convertir sus códigos de formato.',
      seoHowToUse: '1. Haz clic en el paleta para elegir un color.\n2. Copia el código en formato HEX, RGB o HSL.\n3. Ajusta la opacidad si lo deseas.',
      seoHowItWorks: 'Realiza conversiones matemáticas de espacio de color.',
      formula: 'RGB = (r, g, b) | HEX = #RRGGBB | HSL = (h%, s%, l%)',
      seoExample: 'El color azul puro es #0000FF en HEX, rgb(0, 0, 255) y hsl(240, 100%, 50%).',
      faqs: [{ q: '¿Qué es el código HEX?', a: 'Es una representación hexadecimal de 6 dígitos de los canales de color Rojo, Verde y Azul.' }]
    },
    de: {
      name: 'Farbwähler (Color Picker)',
      seoTitle: 'Farbwähler & Farbcodes Umrechnen (HEX, RGB, HSL) | HelloTools',
      seoDescription: 'Wählen Sie Farben aus und konvertieren Sie HEX, RGB und HSL Codes.',
      description: 'Farbcodes wählen und zwischen HEX, RGB und HSL umrechnen.',
      quickAnswer: 'Visueller Farbwähler mit automatischer Konvertierung von Farbcodes.',
      seoHowToUse: '1. Farbe in der Palette anklicken.\n2. Farbcode (HEX, RGB, HSL) kopieren.',
      seoHowItWorks: 'Konvertiert Farbräume mathematisch.',
      formula: 'HEX = #RRGGBB | RGB = rgb(r, g, b)',
      seoExample: 'Reines Rot ist #FF0000 bzw. rgb(255, 0, 0).',
      faqs: [{ q: 'Was bedeutet HSL?', a: 'Hue (Farbwert), Saturation (Sättigung), Lightness (Helligkeit).' }]
    },
    fr: {
      name: 'Sélecteur de Couleur',
      seoTitle: 'Sélecteur de Couleur et Convertisseur HEX, RGB, HSL | HelloTools',
      seoDescription: 'Sélectionnez des couleurs et convertissez leurs codes HEX, RGB et HSL.',
      description: 'Choisissez vos couleurs et obtenez les codes HEX, RGB et HSL.',
      quickAnswer: 'Outil graphique pour capturer et convertir les codes de couleurs web.',
      seoHowToUse: '1. Sélectionnez une couleur dans la palette.\n2. Copiez le code au format désiré (HEX, RGB, HSL).',
      seoHowItWorks: 'Effectue la conversion d\'espaces colorimétriques en temps réel.',
      formula: 'HEX = #RRGGBB | RGB = rgb(r, g, b)',
      seoExample: 'Le vert pur s\'écrit #00FF00 en HEX et rgb(0, 255, 0).',
      faqs: [{ q: 'Comment copier facilement le code ?', a: 'Un bouton de copie en un clic est disponible pour chaque format.' }]
    },
    pt: {
      name: 'Seletor de Cores (Color Picker)',
      seoTitle: 'Seletor de Cores e Conversor HEX, RGB, HSL | HelloTools',
      seoDescription: 'Selecione cores e converta códigos entre HEX, RGB e HSL instantaneamente.',
      description: 'Escolha cores e converta os códigos entre formatos HEX, RGB e HSL.',
      quickAnswer: 'Ferramenta gráfica para selecionar cores e obter seus valores HEX, RGB e HSL.',
      seoHowToUse: '1. Escolha a cor no paleta visual.\n2. Copie o código em HEX, RGB ou HSL.',
      seoHowItWorks: 'Converte matematicamente entre os modelos de cor.',
      formula: 'HEX = #RRGGBB | RGB = (r, g, b)',
      seoExample: 'A cor branca é #FFFFFF em HEX e rgb(255, 255, 255).',
      faqs: [{ q: 'Qual a diferença entre RGB e HSL?', a: 'RGB se baseia na mistura de luzes primárias; HSL se baseia na percepção humana de matiz e brilho.' }]
    },
    ja: {
      name: 'カラーピッカー・カラーコード変換ツール',
      seoTitle: 'カラーピッカー — HEX・RGB・HSL 相互変換 | HelloTools',
      seoDescription: '画面上で直感的に色を選択し、HEX（#ffffff）、RGB（255,255,255）、HSLコードを相互変換・コピーできます。',
      description: 'カラーパレットから色を選びHEX、RGB、HSLコードを取得・換算します。',
      quickAnswer: 'カラーパレットで選択した色のカラーコード（HEX・RGB・HSL）を表示・変換します。',
      seoHowToUse: '1. カラーパレット上をクリックして色を選択します。\n2. HEX / RGB / HSL / CMYK の各表示コードを「コピー」します。',
      seoHowItWorks: '色空間変換アルゴリズムを用いてリアルタイムで数値を相互変換します。',
      formula: 'HEX = #RRGGBB | RGB = rgb(r,g,b) | HSL = hsl(h,s%,l%)',
      seoExample: '真っ赤な色は HEX: #FF0000 、 RGB: rgb(255, 0, 0) と表現されます。',
      faqs: [{ q: 'WEBデザインで一番よく使われるカラーコードは？', a: '16進数表記のHEXコード（例：#3b82f6）が最も広く利用されます。' }]
    }
  },

  'aspect-ratio-calculator': {
    es: {
      name: 'Calculadora de Relación de Aspecto',
      seoTitle: 'Calculadora de Relación de Aspecto (16:9, 4:3, 1:1) | HelloTools',
      seoDescription: 'Calcula dimensiones de imágenes y vídeos manteniendo la proporción de aspecto.',
      description: 'Calcula el ancho o alto de imágenes manteniendo la proporción.',
      quickAnswer: 'Reacondiciona dimensiones de ancho y alto conservando la proporción de aspecto original.',
      seoHowToUse: '1. Introduce las dimensiones originales (ej. 1920x1080).\n2. Modifica el nuevo ancho o alto.\n3. Obtén la dimensión correspondiente ajustada.',
      seoHowItWorks: 'Aplica la regla de tres simple sobre la proporción base.',
      formula: 'Nuevo Alto = (Nuevo Ancho * Alto Original) / Ancho Original',
      seoExample: 'Un vídeo de 16:9 con un ancho de 800px tiene un alto proporcional de 450px.',
      faqs: [{ q: '¿Cuáles son las relaciones de aspecto más comunes?', a: '16:9 (vídeo HD/TV), 4:3 (monitores antiguos), 1:1 (cuadrado Instagram), 9:16 (Stories/Reels).' }]
    },
    de: {
      name: 'Seitenverhältnisrechner',
      seoTitle: 'Seitenverhältnisrechner (16:9, 4:3) | HelloTools',
      seoDescription: 'Berechnen Sie Bild- und Videogrößen unter Beibehaltung des Seitenverhältnisses.',
      description: 'Breite und Höhe von Bildern proportional berechnen.',
      quickAnswer: 'Berechnet fehlende Bildmaße unter Beibehaltung des Aspektverhältnisses.',
      seoHowToUse: '1. Ursprungsbreite und -höhe eingeben.\n2. Neue Breite oder Höhe angeben.\n3. Proportionalen Wert ablesen.',
      seoHowItWorks: 'Nutzt Dreisatz-Rechnung.',
      formula: 'Neue Höhe = (Neue Breite * Höhe) / Breite',
      seoExample: 'Ein 16:9 Bild mit 800px Breite ist 450px hoch.',
      faqs: [{ q: 'Was ist 16:9?', a: 'Das Standard-Breitbildformat für Monitore, Fernseher und YouTube-Videos.' }]
    },
    fr: {
      name: 'Calculateur de Ratio d\'Aspect',
      seoTitle: 'Calculateur de Ratio d\'Aspect (16:9, 4:3) | HelloTools',
      seoDescription: 'Calculez les dimensions d\'images et vidéos en maintenant les proportions.',
      description: 'Ajustez la largeur ou hauteur d\'une image en gardant le ratio.',
      quickAnswer: 'Redimensionne des valeurs de largeur/hauteur en conservant le ratio d\'aspect.',
      seoHowToUse: '1. Indiquez le ratio ou dimensions initiales.\n2. Changez la nouvelle largeur (ou hauteur).\n3. Obtenez la dimension calculée.',
      seoHowItWorks: 'Applique le produit en croix pour préserver les proportions.',
      formula: 'Nouvelle Hauteur = (Nouvelle Largeur * Hauteur) / Largeur',
      seoExample: 'Une vidéo 16:9 de 800px de large aura 450px de hauteur.',
      faqs: [{ q: 'Quel est le ratio pour les vidéos TikTok / Reels ?', a: 'Le format vertical standard est le ratio 9:16 (ex: 1080x1920).' }]
    },
    pt: {
      name: 'Calculadora de Proporção de Tela (Aspect Ratio)',
      seoTitle: 'Calculadora de Aspect Ratio (16:9, 4:3, 1:1) | HelloTools',
      seoDescription: 'Calcule dimensões de imagens e vídeos mantendo a proporção de tela original.',
      description: 'Redimensione largura e altura sem distorcer a imagem.',
      quickAnswer: 'Calcula a dimensão proporcional de altura ou largura para evitar distorção visual.',
      seoHowToUse: '1. Informe a proporção original (ex: 1920x1080 ou 16:9).\n2. Altere a nova largura.\n3. Veja a nova altura proporcional.',
      seoHowItWorks: 'Aplica a regra de três para manter a proporção constante.',
      formula: 'Nova Altura = (Nova Largura * Altura Original) / Largura Original',
      seoExample: 'Uma imagem 16:9 com largura de 800px terá altura de 450px.',
      faqs: [{ q: 'Como evitar esticar imagens?', a: 'Mantendo sempre o mesmo Aspect Ratio ao redimensionar.' }]
    },
    ja: {
      name: 'アスペクト比（縦横比）計算ツール',
      seoTitle: 'アスペクト比計算ツール — 16:9 / 4:3 画面比率 | HelloTools',
      seoDescription: '画像や動画の幅（Width）と高さ（Height）からアスペクト比を計算し、比率を維持したままリサイズ寸法を算出します。',
      description: '縦横比（アスペクト比）を維持したまま画像寸法を計算します。',
      quickAnswer: '元画像・動画の縦横比（16:9や4:3など）を保ったままリサイズ後の幅・高さを算出します。',
      seoHowToUse: '1. 元の幅と高さを入力します（または16:9等のプリセットを選択）。\n2. 変更後の幅（または高さ）を入力します。\n3. 比率を維持した計算後の寸法を確認します。',
      seoHowItWorks: '比例式（新しい高さ = 新しい幅 * 元の高さ / 元の幅）で即時計算します。',
      formula: '高さ = (幅 * 元の高さ) / 元の幅',
      seoExample: '16:9の比率で幅を800pxに設定すると、高さは450pxとなります。',
      faqs: [{ q: 'YouTube動画の標準アスペクト比は？', a: '16:9（1920x1080や1280x720）が標準です。' }]
    }
  },

  'binary-converter': {
    es: {
      name: 'Conversor de Binario a Texto',
      seoTitle: 'Conversor de Binario a Texto y Texto a Binario | HelloTools',
      seoDescription: 'Convierte código binario (01) a texto legible y texto a binario al instante.',
      description: 'Convierte texto a código binario (0 y 1) y viceversa.',
      quickAnswer: 'Traduce cadenas de texto ASCII a secuencias binarias de ceros y unos.',
      seoHowToUse: '1. Introduce el texto o el código binario.\n2. Selecciona la dirección de conversión.\n3. Copia el resultado.',
      seoHowItWorks: 'Convierte caracteres a sus códigos ASCII/Unicode de 8 bits.',
      formula: 'Binario = char.charCodeAt(0).toString(2).padStart(8, "0")',
      seoExample: 'La letra "A" en binario es 01000001.',
      faqs: [{ q: '¿Qué es el código binario?', a: 'Es el sistema numérico base 2 utilizado por los ordenadores para procesar información.' }]
    },
    de: {
      name: 'Binär-Text-Umwandler',
      seoTitle: 'Binär in Text Umwandeln & Text in Binär | HelloTools',
      seoDescription: 'Konvertieren Sie Binärcode (01) in lesbaren Text und umgekehrt.',
      description: 'Text in Binärcode (0 und 1) und zurück umwandeln.',
      quickAnswer: 'Ubersetzt Text in Nullen und Einsen (Binärcode).',
      seoHowToUse: '1. Text oder Binärcode eingeben.\n2. Konvertierung wählen.\n3. Ergebnis ablesen.',
      seoHowItWorks: 'Wandelt Zeichen in 8-Bit-ASCII-Binärwerte um.',
      formula: 'Binär = charCode.toString(2)',
      seoExample: 'Der Buchstabe "A" lautet binär 01000001.',
      faqs: [{ q: 'Was bedeutet 8-Bit?', a: 'Jedes Zeichen wird durch genau 8 Binärstellen (Bits) dargestellt.' }]
    },
    fr: {
      name: 'Convertisseur Binaire - Texte',
      seoTitle: 'Convertisseur Binaire en Texte et Texte en Binaire | HelloTools',
      seoDescription: 'Convertissez du code binaire (0 et 1) en texte et inversement.',
      description: 'Convertissez vos textes en binaire et décodez le binaire.',
      quickAnswer: 'Traduit des chaînes de caractères en langage binaire informatique.',
      seoHowToUse: '1. Entrez le texte ou les chiffres binaires.\n2. Cliquez sur Convertir.\n3. Copiez le résultat.',
      seoHowItWorks: 'Convertit les caractères en valeurs binationale 8 bits.',
      formula: 'Binaire = charCode.toString(2)',
      seoExample: 'Le caractère "A" se traduit par 01000001 en binaire.',
      faqs: [{ q: 'Qu\'est-ce que le système binaire ?', a: 'Un système de numération en base 2 n\'utilisant que les chiffres 0 et 1.' }]
    },
    pt: {
      name: 'Conversor de Binário para Texto',
      seoTitle: 'Conversor de Binário para Texto e Texto para Binário | HelloTools',
      seoDescription: 'Converta código binário (01) em texto e texto em código binário.',
      description: 'Converta texto para binário (zeros e uns) e vice-versa.',
      quickAnswer: 'Traduz textos em código binário de 8 bits e vice-versa.',
      seoHowToUse: '1. Cole o texto ou o código binário.\n2. Escolha o sentido da conversão.\n3. Copie o resultado.',
      seoHowItWorks: 'Converte cada caractere em sua representação binária ASCII.',
      formula: 'Binário = charCode.toString(2).padStart(8, "0")',
      seoExample: 'A letra "A" em binário é 01000001.',
      faqs: [{ q: 'Para que serve o código binário?', a: 'É a linguagem fundamental processada pelos circuitos digitais dos computadores.' }]
    },
    ja: {
      name: 'バイナリ（2進数）・テキスト相互変換ツール',
      seoTitle: '2進数（バイナリ）テキスト変換ツール | HelloTools',
      seoDescription: 'テキスト文字列を8ビットの2進数（0と1のバイナリコード）へ変換、またはバイナリを元のテキストへと復号します。',
      description: 'テキストを2進数（0と1）に変換、または2進数をテキストに戻します。',
      quickAnswer: 'テキストとコンピュータの基本コードである2進数（01バイナリ）を相互変換します。',
      seoHowToUse: '1. 文字列または2進数（0と1）を入力します。\n2. 「テキスト→2進数」または「2進数→テキスト」を選択します。\n3. 変換結果をコピーします。',
      seoHowItWorks: '文字コード（UTF-8/ASCII）のコードポイントを8ビット2進数文字列へ変換します。',
      formula: '2進数 = char.charCodeAt(0).toString(2).padStart(8, "0")',
      seoExample: '英字の「A」を2進数変換すると「01000001」になります。',
      faqs: [{ q: '日本語（全角文字）の2進数変換にも対応していますか？', a: 'はい、UTF-8エンコーディングにより日本語文字も正常に2進数化できます。' }]
    }
  },

  'word-to-pdf': {
    es: {
      name: 'Convertidor de Texto a PDF',
      seoTitle: 'Convertidor de Texto a PDF Online | HelloTools',
      seoDescription: 'Convierte texto o notas en un archivo documento PDF listo para descargar.',
      description: 'Genera un archivo PDF a partir de texto o notas simples.',
      quickAnswer: 'Crea instantáneamente un documento PDF descargable a partir de texto.',
      seoHowToUse: '1. Escribe o pega tu texto.\n2. Personaliza el título del documento.\n3. Haz clic en Descargar PDF.',
      seoHowItWorks: 'Genera la estructura de documento PDF usando el motor del navegador.',
      formula: 'PDF Document Generator',
      seoExample: 'Convierte tus notas de texto plano en un PDF imprimible.',
      faqs: [{ q: '¿Es seguro convertir mis textos?', a: 'Sí, la conversión se realiza 100% en tu navegador sin enviar datos a servidores.' }]
    },
    de: {
      name: 'Text-in-PDF-Umwandler',
      seoTitle: 'Text in PDF Umwandeln Online | HelloTools',
      seoDescription: 'Erstellen Sie aus Texten und Notizen eine herunterladbare PDF-Datei.',
      description: 'Erzeugen Sie einfache PDF-Dokumente aus Text.',
      quickAnswer: 'Generiert eine fertige PDF-Datei direkt aus Ihren Texteingaben.',
      seoHowToUse: '1. Text eingeben.\n2. Dokumenttitel festlegen.\n3. PDF herunterladen.',
      seoHowItWorks: 'Erzeugt die PDF-Struktur direkt im Browser.',
      formula: 'PDF Client Generator',
      seoExample: 'Macht aus Notizen ein sauberes PDF-Dokument.',
      faqs: [{ q: 'Werden meine Daten gespeichert?', a: 'Nein, die Verarbeitung findet ausschließlich lokal in Ihrem Browser statt.' }]
    },
    fr: {
      name: 'Convertisseur Texte en PDF',
      seoTitle: 'Convertisseur Texte en PDF Gratuit | HelloTools',
      seoDescription: 'Convertissez facilement vos textes et notes en document PDF téléchargeable.',
      description: 'Générez un fichier PDF à partir de votre texte.',
      quickAnswer: 'Convertit un texte brut en document PDF professionnel prêt à imprimer.',
      seoHowToUse: '1. Tapez ou collez votre texte.\n2. Définissez le titre.\n3. Téléchargez votre PDF.',
      seoHowItWorks: 'Génère le fichier PDF côté client.',
      formula: 'Générateur PDF Navigateur',
      seoExample: 'Transforme vos notes en un fichier .pdf téléchargeable.',
      faqs: [{ q: 'Faut-il installer un logiciel ?', a: 'Non, le téléchargement PDF fonctionne directement depuis votre navigateur.' }]
    },
    pt: {
      name: 'Conversor de Texto para PDF',
      seoTitle: 'Conversor de Texto para PDF Online | HelloTools',
      seoDescription: 'Transforme seus textos e anotações em um arquivo PDF para download.',
      description: 'Gere arquivos PDF a partir de textos simples.',
      quickAnswer: 'Cria um documento PDF pronto para baixar a partir de texto digitado.',
      seoHowToUse: '1. Digite ou cole seu texto.\n2. Defina o título do documento.\n3. Clique em Baixar PDF.',
      seoHowItWorks: 'Processa a criação do arquivo PDF localmente.',
      formula: 'Gerador PDF Client-side',
      seoExample: 'Converte notas de texto em um PDF para impressão.',
      faqs: [{ q: 'O serviço é gratuito?', a: 'Sim, 100% gratuito e sem marcas d\'água.' }]
    },
    ja: {
      name: 'テキストPDF変換ツール',
      seoTitle: 'テキストPDF変換ツール — Web文書作成 | HelloTools',
      seoDescription: '入力されたテキストやメモ文章から、ダウンロード可能なPDFドキュメントファイルをブラウザ上で生成します。',
      description: '入力したテキストからPDFファイルを生成・ダウンロードします。',
      quickAnswer: 'プレーンテキストから印刷・保存可能なPDFファイルを即座に作成します。',
      seoHowToUse: '1. PDF化したい文章を入力・ペーストします。\n2. ドキュメントタイトルを指定します。\n3. 「PDFをダウンロード」ボタンを押します。',
      seoHowItWorks: 'ブラウザの描画ライブラリを用いてPDFフォーマット化します。',
      formula: 'PDF生成 = Client-side Canvas/PDF Document Stream',
      seoExample: '作成したメモ文章をレイアウト調整されたPDFファイルとして保存できます。',
      faqs: [{ q: '作成したデータがサーバーに送信されることはありますか？', a: 'いいえ、すべての処理はブラウザ内で完了するためプライバシーが保護されます。' }]
    }
  },

  'uuid-generator': {
    es: {
      name: 'Generador de UUID / GUID',
      seoTitle: 'Generador de UUID v4 (Identificadores Únicos) | HelloTools',
      seoDescription: 'Genera identificadores únicos universales (UUID v4 / GUID) de forma aleatoria.',
      description: 'Genera UUIDs v4 aleatorios e identificadores únicos.',
      quickAnswer: 'Genera identificadores alfanuméricos de 128 bits criptográficamente seguros.',
      seoHowToUse: '1. Elige la cantidad de UUIDs a generar.\n2. Selecciona si deseas mayúsculas o guiones.\n3. Haz clic en Copiar.',
      seoHowItWorks: 'Utiliza crypto.randomUUID() para máxima aleatoriedad.',
      formula: 'UUID v4 = xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx',
      seoExample: 'Genera un código como 123e4567-e89b-12d3-a456-426614174000.',
      faqs: [{ q: '¿Es posible que dos UUIDs sean iguales?', a: 'La probabilidad de duplicado en UUID v4 es prácticamente nula en el universo.' }]
    },
    de: {
      name: 'UUID / GUID Generator',
      seoTitle: 'UUID v4 Generator — Eindeutige IDs Erzeugen | HelloTools',
      seoDescription: 'Generieren Sie zufällige UUID v4 / GUID Identifikatoren online.',
      description: 'Erzeugen Sie eindeutige Identifikatoren (UUIDs).',
      quickAnswer: 'Erzeugt kryptografisch sichere 128-Bit UUID v4 Strings.',
      seoHowToUse: '1. Anzahl der IDs wählen.\n2. Auf Generieren klicken.\n3. UUIDs in die Zwischenablage kopieren.',
      seoHowItWorks: 'Verwendet crypto.randomUUID() des Browsers.',
      formula: 'Format = xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx',
      seoExample: 'Erzeugt beispielsweise: f47ac10b-58cc-4372-a567-0e02b2c3d479.',
      faqs: [{ q: 'Was unterscheidet UUID v4 von v1?', a: 'Version 4 basiert rein auf Zufallszahlen; Version 1 nutzte Zeitstempel und MAC-Adresse.' }]
    },
    fr: {
      name: 'Générateur de UUID / GUID',
      seoTitle: 'Générateur de UUID v4 Gratuit | HelloTools',
      seoDescription: 'Générez des identifiants uniques universels (UUID v4 / GUID) aléatoires.',
      description: 'Générez des identifiants uniques sécurisés.',
      quickAnswer: 'Génère des chaînes d\'identifiant UUID v4 conformes aux normes RFC 4122.',
      seoHowToUse: '1. Choisissez la quantité.\n2. Cliquez sur Générer.\n3. Copiez les UUID.',
      seoHowItWorks: 'Utilise l\'API cryptographique sécurisée crypto.randomUUID().',
      formula: 'Format UUID v4 = xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx',
      seoExample: 'Exemple généré : c9bf9e57-1685-4c89-bafb-ff5af830be8a.',
      faqs: [{ q: 'Quelle est la longueur d\'un UUID ?', a: 'Un UUID est composé de 36 caractères (32 hexadécimaux et 4 tirets).' }]
    },
    pt: {
      name: 'Gerador de UUID / GUID',
      seoTitle: 'Gerador de UUID v4 (IDs Únicos Aleatórios) | HelloTools',
      seoDescription: 'Gere identificadores únicos universais (UUID v4 / GUID) aleatórios.',
      description: 'Gere IDs aleatórios seguros para seus projetos.',
      quickAnswer: 'Gera identificadores alfanuméricos de 128 bits criptograficamente seguros.',
      seoHowToUse: '1. Escolha a quantidade de UUIDs desejada.\n2. Clique em Gerar.\n3. Copie para a área de transferência.',
      seoHowItWorks: 'Processa a geração usando a API nativa crypto.randomUUID().',
      formula: 'UUID v4 = xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx',
      seoExample: 'Exemplo: 550e8400-e29b-41d4-a716-446655440000.',
      faqs: [{ q: 'É indicado para chaves primárias de banco de dados?', a: 'Sim, UUID v4 é amplamente utilizado como ID em bancos de dados distribuídos.' }]
    },
    ja: {
      name: 'UUID / GUID 自動生成ツール',
      seoTitle: 'UUID v4 生成ツール — ランダム一意ID作成 | HelloTools',
      seoDescription: '重複しないユニークIDである UUID v4（GUID）をブラウザの暗号学的乱数を用いて一括生成します。',
      description: '128ビットのユニーク識別子（UUID v4）を生成します。',
      quickAnswer: '暗号学的に安全なランダム一意識別子（UUID v4）を一括生成します。',
      seoHowToUse: '1. 生成個数（1個〜100個）を指定します。\n2. 大文字/小文字やハイフン有無を選択します。\n3. 「生成」を押してコピーします。',
      seoHowItWorks: 'ブラウザ標準の Web Crypto API (crypto.randomUUID()) で処理します。',
      formula: 'UUID v4 = xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx',
      seoExample: '「b8d8108c-69e1-4c6e-a204-6330416e885c」のようなIDが生成されます。',
      faqs: [{ q: '生成されたUUIDが他者と重複する可能性は？', a: 'UUID v4の組み合わせ数は約3.4×10^38通りあり、実質的に世界で重複しません。' }]
    }
  },

  'dice-roller': {
    es: {
      name: 'Generador de Dados y Tirada Virtual',
      seoTitle: 'Generador de Dados Online (d6, d20, d100) | HelloTools',
      seoDescription: 'Lanza dados virtuales al azar para juegos de mesa, rol (D&D) y sorteos.',
      description: 'Lanza dados virtuales (d6, d10, d20) para tus juegos.',
      quickAnswer: 'Genera resultados aleatorios simulando el lanzamiento de dados de 6, 20 o 100 caras.',
      seoHowToUse: '1. Selecciona el tipo de dado (d4, d6, d10, d20, d100).\n2. Elige la cantidad de dados.\n3. Pulsa Lanzar Dados.',
      seoHowItWorks: 'Utiliza aleatoriedad segura Math.random().',
      formula: 'Dado = Math.floor(Math.random() * Lados) + 1',
      seoExample: 'Lanzar un dado d20 genera un resultado aleatorio entre 1 y 20.',
      faqs: [{ q: '¿Es apto para partidas de Dungeons & Dragons?', a: 'Sí, incluye todos los dados de rol estándar (d4, d6, d8, d10, d12, d20, d100).' }]
    },
    de: {
      name: 'Würfel-Simulatur (Dice Roller)',
      seoTitle: 'Online Würfel Simulatur (W6, W20, W100) | HelloTools',
      seoDescription: 'Würfeln Sie online virtuelle Würfel für Brettspiele und Rollenspiele (D&D).',
      description: 'Virtuelle Würfel (W6, W20) für Spiele online werfen.',
      quickAnswer: 'Simuliert das Werfen von Würfeln mit frei wählbarer Seitenanzahl.',
      seoHowToUse: '1. Würfeltyp (W6, W20 etc.) wählen.\n2. Anzahl angeben.\n3. Auf Würfeln klicken.',
      seoHowItWorks: 'Generiert Zufallswerte zwischen 1 und den Würfelseiten.',
      formula: 'Würfel = Math.floor(Math.random() * Seiten) + 1',
      seoExample: 'Ein W6-Wurf ergibt eine Zufallszahl von 1 bis 6.',
      faqs: [{ q: 'Sind die Ergebnisse fair?', a: 'Ja, die Verteilung aller Augenzahlen ist mathematisch gleichmäßig.' }]
    },
    fr: {
      name: 'Lanceur de Dés Virtuels',
      seoTitle: 'Lanceur de Dés Virtuels en Ligne (d6, d20) | HelloTools',
      seoDescription: 'Lancez des dés virtuels aléatoires pour vos jeux de société et jeux de rôle.',
      description: 'Lancez des dés virtuels (d6, d20) en ligne.',
      quickAnswer: 'Simule le tirage de dés à 6, 10, 20 ou 100 faces.',
      seoHowToUse: '1. Sélectionnez le dé (d4, d6, d20).\n2. Indiquez le nombre de dés.\n3. Cliquez sur Lancer.',
      seoHowItWorks: 'Utilise le générateur aléatoire équitable du navigateur.',
      formula: 'Dé = Math.floor(Math.random() * Faces) + 1',
      seoExample: 'Un lancer de d6 donne un chiffre au hasard entre 1 et 6.',
      faqs: [{ q: 'Puis-je lancer plusieurs dés à la fois ?', a: 'Oui, vous pouvez lancer jusqu\'à 100 dés simultanément avec leur somme totale.' }]
    },
    pt: {
      name: 'Rolar Dados Virtual',
      seoTitle: 'Rolar Dados Virtual Online (d6, d20, d100) | HelloTools',
      seoDescription: 'Role dados virtuais aleatórios para jogos de tabuleiro, RPG e sorteios.',
      description: 'Role dados virtuais (d6, d20) online para seus jogos.',
      quickAnswer: 'Simula o arremesso de dados com múltiplos lados.',
      seoHowToUse: '1. Escolha o tipo de dado (d6, d20, d100).\n2. Selecione a quantidade.\n3. Clique em Rolar Dados.',
      seoHowItWorks: 'Gera números aleatórios com probabilidade uniforme.',
      formula: 'Dado = Math.floor(Math.random() * Lados) + 1',
      seoExample: 'Rolar um dado d6 resulta em um número de 1 a 6.',
      faqs: [{ q: 'Soma o total dos dados rolados?', a: 'Sim, exibe cada dado individual e a soma total dos resultados.' }]
    },
    ja: {
      name: 'サイコロ（サイコロ振り）ツール',
      seoTitle: 'Webサイコロ（ダイスローラー） — 6面・20面・100面 | HelloTools',
      seoDescription: 'ボードゲームやTRPG（D&D等）で使えるWebサイコロツールです。6面体、20面体、100面体ダイスなどを複数同時振り可能です。',
      description: 'Web上でサイコロ（6面・20面等）を投げて乱数を出力します。',
      quickAnswer: '画面上でサイコロ（D6, D20, D100など）を振ってランダムな出目を表示します。',
      seoHowToUse: '1. サイコロの種類（6面、20面、100面等）を選択します。\n2. 個数を指定します。\n3. 「サイコロを振る」を押します。',
      seoHowItWorks: '面数に応じた均等確率の乱数生成ロジックで計算します。',
      formula: '出目 = Math.floor(Math.random() * 面数) + 1',
      seoExample: '6面サイコロを1個振ると、1から6までの出目がランダムに決定されます。',
      faqs: [{ q: 'TRPG用のD100（100面ダイス）にも対応していますか？', a: 'はい、D4からD100までの主要TRPGダイスに完全対応しています。' }]
    }
  },

  'hash-generator': {
    es: {
      name: 'Generador de Hash (MD5, SHA-256)',
      seoTitle: 'Generador de Hash Online (MD5, SHA-1, SHA-256, SHA-512) | HelloTools',
      seoDescription: 'Genera firmas digitales Hash en algoritmos SHA-256, SHA-512, SHA-1 y MD5.',
      description: 'Genera hashes de texto en SHA-256, SHA-512 y MD5.',
      quickAnswer: 'Calcula huellas digitales criptográficas unidireccionales (Hashes) para textos.',
      seoHowToUse: '1. Escribe o pega tu texto.\n2. Selecciona el algoritmo criptográfico (SHA-256, SHA-512).\n3. Copia el Hash resultante.',
      seoHowItWorks: 'Utiliza Web Crypto API para SHA y algoritmos de resumen de datos.',
      formula: 'Hash = WebCrypto.subtle.digest("SHA-256", data)',
      seoExample: 'El hash SHA-256 de "hello" es 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824.',
      faqs: [{ q: '¿Se puede revertir un hash SHA-256?', a: 'No, los algoritmos Hash son unidireccionales por diseño y no se pueden desencriptar.' }]
    },
    de: {
      name: 'Hash-Generator (SHA-256, MD5)',
      seoTitle: 'Hash Generator — SHA-256, SHA-512 & MD5 Erzeugen | HelloTools',
      seoDescription: 'Generieren Sie kryptografische Hashes (SHA-256, SHA-512, MD5) im Browser.',
      description: 'Kryptografische Hashes aus Texten erzeugen.',
      quickAnswer: 'Berechnet eindeutige kryptografische Prüfsummen (Hashes) für Text.',
      seoHowToUse: '1. Text eingeben.\n2. Hash-Algorithmus wählen.\n3. Hash-String kopieren.',
      seoHowItWorks: 'Nützt die Web Crypto API des Browsers.',
      formula: 'Hash = Crypto.subtle.digest("SHA-256")',
      seoExample: 'SHA-256 von "hello" ergibt eine 64-stellige Hex-Prüfsumme.',
      faqs: [{ q: 'Was ist der Unterschied zwischen Hashing und Verschlüsselung?', a: 'Verschlüsselung ist umkehrbar; Hashing ist eine Einweg-Transformation.' }]
    },
    fr: {
      name: 'Générateur de Hash (SHA-256, MD5)',
      seoTitle: 'Générateur de Hash en Ligne (SHA-256, SHA-512) | HelloTools',
      seoDescription: 'Générez des empreintes numériques Hash (SHA-256, SHA-512, MD5).',
      description: 'Générez des empreintes cryptographiques pour vos textes.',
      quickAnswer: 'Calcule l\'empreinte numérique cryptographique d\'une chaîne de caractères.',
      seoHowToUse: '1. Tapez votre texte.\n2. Choisissez l\'algorithme SHA.\n3. Copiez le résultat.',
      seoHowItWorks: 'S\'appuie sur la bibliothèque Web Crypto sécurisée.',
      formula: 'Hash = crypto.subtle.digest("SHA-256")',
      seoExample: 'Le SHA-256 du mot "hello" produit une chaîne hexadécimale unique.',
      faqs: [{ q: 'Est-ce calculé sur mon ordinateur ?', a: 'Oui, aucun texte n\'est transmis sur un serveur distant.' }]
    },
    pt: {
      name: 'Gerador de Hash (SHA-256, MD5)',
      seoTitle: 'Gerador de Hash Online — SHA-256, SHA-512, MD5 | HelloTools',
      seoDescription: 'Gere hashes criptográficos (SHA-256, SHA-512, MD5) para textos instantaneamente.',
      description: 'Gere hashes de texto em SHA-256 e MD5.',
      quickAnswer: 'Gera resumos criptográficos unidirecionais a partir de um texto.',
      seoHowToUse: '1. Digite seu texto.\n2. Selecione o algoritmo criptográfico.\n3. Copie o Hash gerado.',
      seoHowItWorks: 'Calcula o hash usando a Web Crypto API.',
      formula: 'Hash = crypto.subtle.digest("SHA-256")',
      seoExample: 'O hash SHA-256 de "hello" gera uma chave fixa de 64 caracteres.',
      faqs: [{ q: 'Qual a utilidade do SHA-256?', a: 'Verificação de integridade de arquivos, senhas e segurança em blockchain.' }]
    },
    ja: {
      name: 'ハッシュ関数生成ツール（SHA-256 / MD5）',
      seoTitle: 'ハッシュ値生成ツール — SHA-256・SHA-512・MD5 | HelloTools',
      seoDescription: 'テキストから暗号学的ハッシュ値（SHA-256, SHA-512, SHA-1, MD5）をブラウザ上で高速計算生成します。',
      description: 'テキストから暗号ハッシュ値（SHA-256、MD5等）を生成します。',
      quickAnswer: '入力テキストから暗号学的ハッシュ値（SHA-256やMD5など）を算出します。',
      seoHowToUse: '1. テキストを入力します。\n2. 暗号アルゴリズム（SHA-256 / SHA-512 / MD5）を選択します。\n3. 生成されたハッシュ文字列をコピーします。',
      seoHowItWorks: 'Web Crypto API (crypto.subtle.digest) を使用して安全に計算します。',
      formula: 'Hash = crypto.subtle.digest("SHA-256", text)',
      seoExample: '「hello」のSHA-256ハッシュ値は 64文字の固定長16進数文字列となります。',
      faqs: [{ q: 'ハッシュ値から元の文章を復元することはできますか？', a: 'いいえ、ハッシュ関数は不可逆な一方通行の変換です。' }]
    }
  },

  'regex-tester': {
    es: {
      name: 'Probador de Expresiones Regulares (Regex)',
      seoTitle: 'Probador de Expresiones Regulares (Regex Tester) | HelloTools',
      seoDescription: 'Prueba y valida tus expresiones regulares (Regex) con resaltado en tiempo real.',
      description: 'Prueba y valida tus patrones Regex en tiempo real.',
      quickAnswer: 'Evalúa patrones de expresiones regulares sobre textos e identifica coincidencias.',
      seoHowToUse: '1. Introduce tu patrón Regex y banderas (g, i, m).\n2. Pega el texto de prueba.\n3. Observa las coincidencias resaltadas.',
      seoHowItWorks: 'Aplica el motor RegExp nativo de JavaScript.',
      formula: 'RegExp.exec() | String.matchAll()',
      seoExample: 'El patrón [a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,} valida correos electrónicos.',
      faqs: [{ q: '¿Qué significan las banderas g, i, m?', a: 'g = búsqueda global, i = ignorar mayúsculas, m = multilínea.' }]
    },
    de: {
      name: 'Regex-Prüfer (Regex Tester)',
      seoTitle: 'Regex Tester — Reguläre Ausdrücke Online Prüfen | HelloTools',
      seoDescription: 'Testen und validieren Sie reguläre Ausdrücke (Regex) mit Live-Hervorhebung.',
      description: 'Reguläre Ausdrücke (Regex) direkt im Browser testen.',
      quickAnswer: 'Validiert Regex-Muster gegen Testtexte mit visueller Vorschau.',
      seoHowToUse: '1. Regex-Muster und Flags (g, i) eingeben.\n2. Testtext einfügen.\n3. Treffer in Echtzeit sehen.',
      seoHowItWorks: 'Führt die JavaScript RegExp Engine aus.',
      formula: 'Match = text.match(new RegExp(pattern, flags))',
      seoExample: '\\d+ findet alle Zahlen in einem Text.',
      faqs: [{ q: 'Werden alle JS-Regex-Features unterstützt?', a: 'Ja, inklusive Lookaheads und Lookbehinds.' }]
    },
    fr: {
      name: 'Testeur de Regex',
      seoTitle: 'Testeur de Expressions Régulières (Regex Tester) | HelloTools',
      seoDescription: 'Testez et validez vos expressions régulières (Regex) en temps réel.',
      description: 'Testez vos motifs Regex en direct.',
      quickAnswer: 'Évalue des motifs d\'expressions régulières et surligne les correspondances.',
      seoHowToUse: '1. Saisissez votre expression régulière.\n2. Collez le texte de test.\n3. Obtenez les correspondances.',
      seoHowItWorks: 'Utilise l\'analyseur JavaScript RegExp.',
      formula: 'Matches = text.matchAll(regex)',
      seoExample: 'Le motif \\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}\\b trouve les emails.',
      faqs: [{ q: 'Comment tester la casse ?', a: 'Activez ou désactivez la flag i (insensitive).' }]
    },
    pt: {
      name: 'Testador de Regex',
      seoTitle: 'Testador de Expressões Regulares (Regex Tester) | HelloTools',
      seoDescription: 'Teste e valide suas expressões regulares (Regex) com destaque em tempo real.',
      description: 'Valide padrões Regex em tempo real.',
      quickAnswer: 'Testa expressões regulares em textos destacando os resultados encontrados.',
      seoHowToUse: '1. Insira seu padrão Regex e flags.\n2. Cole o texto de teste.\n3. Veja os resultados destacados.',
      seoHowItWorks: 'Processa via motor RegExp do navegador.',
      formula: 'Match = texto.matchAll(new RegExp(pattern, flags))',
      seoExample: '\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2} valida o formato de CPF.',
      faqs: [{ q: 'Destaque em tempo real é rápido?', a: 'Sim, a avaliação ocorre instantaneamente a cada tecla digitada.' }]
    },
    ja: {
      name: '正規表現（Regex）検証・テストツール',
      seoTitle: '正規表現（Regex）オンラインテスト・検証 | HelloTools',
      seoDescription: '正規表現パターン（Regex）を入力し、対象テキストに対するマッチング結果（一致箇所・グループ抽出）をリアルタイム表示・検証します。',
      description: '正規表現（Regex）のマッチングをリアルタイム検証します。',
      quickAnswer: '正規表現パターンとフラグ（g/i/m）を指定しテキストのマッチング箇所をリアルタイム強調表示します。',
      seoHowToUse: '1. 正規表現パターンとフラグ（g, i, m）を入力します。\n2. テスト対象のテキストを入力します。\n3. マッチした箇所とキャプチャグループを確認します。',
      seoHowItWorks: 'JavaScript標準の RegExp エンジンでパターン評価します。',
      formula: 'Matches = text.matchAll(new RegExp(pattern, flags))',
      seoExample: 'メールアドレス検出パターン `[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}` をテストできます。',
      faqs: [{ q: 'キャプチャグループ（$1, $2等）の抽出も表示されますか？', a: 'はい、グループごとのマッチ結果も詳細表示されます。' }]
    }
  },

  'student-loan-calculator': {
    es: {
      name: 'Calculadora de Préstamos Estudiantiles',
      seoTitle: 'Calculadora de Préstamos Estudiantiles | HelloTools',
      seoDescription: 'Calcula la cuota mensual y el costo total de amortización de tu crédito educativo.',
      description: 'Calcula los pagos mensuales de tu crédito para estudios.',
      quickAnswer: 'Estima la cuota mensual de amortización de un préstamo para estudios universitarios.',
      seoHowToUse: '1. Introduce el saldo total del préstamo.\n2. Indica la tasa de interés anual.\n3. Selecciona el plazo de reembolso (ej. 10 años).',
      seoHowItWorks: 'Aplica el sistema de amortización francesa de saldo constante.',
      formula: 'Cuota = Monto * [r(1+r)^n] / [(1+r)^n - 1]',
      seoExample: 'Un préstamo estudiantil de $30.000 al 5% a 10 años requiere $318/mes.',
      faqs: [{ q: '¿Qué es el periodo de gracia?', a: 'Es el plazo tras graduarse durante el cual solo se pagan intereses o se aplaza el cobro.' }]
    },
    de: {
      name: 'Studienkreditrechner',
      seoTitle: 'Studienkreditrechner — Raten & Zinsen Berechnen | HelloTools',
      seoDescription: 'Berechnen Sie die monatliche Rückzahlungsrate für Ihren Studienkredit.',
      description: 'Ermitteln Sie die Monatsrate für die Rückzahlung von Studienkrediten.',
      quickAnswer: 'Errechnet die Rückzahlungsrate für Ausbildungs- und Studienkredite.',
      seoHowToUse: '1. Darlehensbetrag eingeben.\n2. Zinssatz eintragen.\n3. Rückzahlungsdauer wählen.',
      seoHowItWorks: 'Berechnet die Annuitätenrate auf die Kreditsumme.',
      formula: 'Monatsrate = Kredit * [i*(1+i)^n] / [(1+i)^n - 1]',
      seoExample: ' Bei 30.000 € Darlehen (5 % Zins, 10 Jahre) beträgt die Rate ca. 318 €/Monat.',
      faqs: [{ q: 'Kann man Studienkredite vorzeitig abbezahlen?', a: 'Ja, Sondertilgungen verringern die Zinslast erheblich.' }]
    },
    fr: {
      name: 'Calculateur de Prêt Étudiant',
      seoTitle: 'Calculateur de Prêt Étudiant et Remboursement | HelloTools',
      seoDescription: 'Calculez les mensualités et le coût total de votre prêt étudiant.',
      description: 'Calculez les mensualités de remboursement de votre crédit étudiant.',
      quickAnswer: 'Calcule la mensualité et le coût global de financement d\'un prêt études.',
      seoHowToUse: '1. Entrez le montant emprunté.\n2. Indiquez le taux d\'intérêt.\n3. Choisissez la durée de remboursement.',
      seoHowItWorks: 'Applique le calcul d\'amortissement classique.',
      formula: 'Mensualité = Emprunt * [r(1+r)^n] / [(1+r)^n - 1]',
      seoExample: 'Pour 30 000 € empruntés à 5 % sur 10 ans, la mensualité est de 318 €/mois.',
      faqs: [{ q: 'Qu\'est-ce que le différé d\'amortissement ?', a: 'Pendant vos études, vous ne remboursez pas le capital (différé total ou partiel).' }]
    },
    pt: {
      name: 'Calculadora de Financiamento Estudantil',
      seoTitle: 'Calculadora de Financiamento Estudantil e FIES | HelloTools',
      seoDescription: 'Calcule o valor das parcelas e o custo total do seu financiamento universitário.',
      description: 'Simule as parcelas de reembolso do seu crédito universitário.',
      quickAnswer: 'Calcula a parcela mensal para amortização de dívidas de financiamento estudantil.',
      seoHowToUse: '1. Digite o valor financiado.\n2. Insira a taxa de juros anual.\n3. Escolha o prazo em anos.',
      seoHowItWorks: 'Utiliza o cálculo de amortização de parcelas fixas.',
      formula: 'Parcela = Valor * [r(1+r)^n] / [(1+r)^n - 1]',
      seoExample: 'Um saldo de R$ 30.000 a 5% a.a. em 10 anos fica em parcelas de R$ 318/mês.',
      faqs: [{ q: 'Como amortizar mais rápido?', a: 'Realize amortizações extraordinárias diretamente no saldo devedor.' }]
    },
    ja: {
      name: '奨学金・教育ローン返済計算ツール',
      seoTitle: '奨学金返済シミュレーション — 月々返済額・利息 | HelloTools',
      seoDescription: '貸与型奨学金（第一種無利利・第二種有利子）や教育ローンの借入総額から、卒業後の毎月返済額と総利息額を計算します。',
      description: '奨学金や教育ローンの卒業後月々返済額をシミュレーションします。',
      quickAnswer: '奨学金や教育ローンの借入総額・金利から、卒業後の月々返済額を計算します。',
      seoHowToUse: '1. 借入総額（万円）を入力します。\n2. 年利（無利子の場合は0%）を指定します。\n3. 返済期間（年数/回数）を選択します。',
      seoHowItWorks: '元利均等返済方式（定額返済）で卒業後の返済額を求めます。',
      formula: '毎月返済額 = 借入金 * [r(1+r)^n] / [(1+r)^n - 1]',
      seoExample: '300万円を金利1%・20年返済（240回）で借りた場合、毎月の返済額は約13,800円です。',
      faqs: [{ q: '繰り上げ返済（繰上償還）のメリットは？', a: '有利子奨学金の場合、将来支払う予定だった利息総額を減らすことができます。' }]
    }
  },

  'markdown-editor': {
    es: {
      name: 'Editor y Vista Previa de Markdown',
      seoTitle: 'Editor y Vista Previa de Markdown Online | HelloTools',
      seoDescription: 'Escribe y visualiza formato Markdown en tiempo real con exportación a HTML.',
      description: 'Escribe y previsualiza texto en formato Markdown al instante.',
      quickAnswer: 'Edita texto con sintaxis Markdown y genera su vista previa HTML en tiempo real.',
      seoHowToUse: '1. Escribe tu texto en Markdown en el panel izquierdo.\n2. Visualiza el resultado renderizado en el panel derecho.\n3. Copia el HTML o el texto.',
      seoHowItWorks: 'Renderiza la sintaxis Markdown a etiquetas HTML en tiempo real.',
      formula: 'Markdown Parser -> HTML Render',
      seoExample: 'Escribir # Titulo convierte la línea en un encabezado <h1>.',
      faqs: [{ q: '¿Qué elementos de Markdown son compatibles?', a: 'Encabezados, negritas, cursivas, listas, enlaces, imágenes, tablas y bloques de código.' }]
    },
    de: {
      name: 'Markdown-Editor',
      seoTitle: 'Markdown Editor & Live Vorschau Online | HelloTools',
      seoDescription: 'Schreiben und betrachten Sie Markdown-Texte in Echtzeit mit HTML-Export.',
      description: 'Markdown-Texte schreiben und live im Browser ansehen.',
      quickAnswer: 'Bietet Live-Vorschau und HTML-Umwandlung für Markdown-Syntax.',
      seoHowToUse: '1. Markdown im linken Fenster eingeben.\n2. Live-Vorschau rechts betrachten.\n3. HTML kopieren.',
      seoHowItWorks: 'Wandelt Markdown-Syntax in HTML um.',
      formula: 'Markdown -> HTML',
      seoExample: '**fett** wird zu <strong>fett</strong>.',
      faqs: [{ q: 'Unterstützt der Editor Tabellen?', a: 'Ja, GFM (GitHub Flavored Markdown) Tabellen werden unterstützt.' }]
    },
    fr: {
      name: 'Éditeur Markdown',
      seoTitle: 'Éditeur et Aperçu Markdown en Ligne | HelloTools',
      seoDescription: 'Rédigez et prévisualisez du texte Markdown en direct avec export HTML.',
      description: 'Rédigez et prévisualisez vos fichiers Markdown.',
      quickAnswer: 'Permet de rédiger du texte structuré en Markdown avec rendu HTML instantané.',
      seoHowToUse: '1. Tapez du code Markdown.\n2. Obtenez le rendu visuel à droite.\n3. Obtenez le code HTML.',
      seoHowItWorks: 'Convertit la syntaxe Markdown en balises HTML.',
      formula: 'Markdown -> HTML Output',
      seoExample: 'Un texte précédé de # devient un titre H1.',
      faqs: [{ q: 'Peut-on exporter en fichier .md ?', a: 'Oui, vous pouvez télécharger directement le fichier texte Markdown.' }]
    },
    pt: {
      name: 'Editor de Markdown',
      seoTitle: 'Editor de Markdown com Pré-visualização Online | HelloTools',
      seoDescription: 'Escreva e visualize código Markdown em tempo real com conversão para HTML.',
      description: 'Escreva e pré-visualize textos em sintaxe Markdown.',
      quickAnswer: 'Editor de texto com renderização em tempo real da linguagem Markdown.',
      seoHowToUse: '1. Escreva em Markdown no painel de edição.\n2. Veja o resultado formatado no painel visual.\n3. Copie o HTML.',
      seoHowItWorks: 'Converte os marcadores Markdown em elementos HTML.',
      formula: 'Markdown Parser -> HTML Engine',
      seoExample: 'Escrever *itálico* gera o texto formatado em itálico.',
      faqs: [{ q: 'Suporta blocos de código com sintaxe?', a: 'Sim, blocos de código com destaque de linguagem são suportados.' }]
    },
    ja: {
      name: 'Markdown（マークダウン）エディタ・リアルタイムプレビュー',
      seoTitle: 'Markdownエディタ — リアルタイムプレビュー＆HTML変換 | HelloTools',
      seoDescription: 'Markdown構文（見出し、太字、リスト、表、コードブロック）を入力し、レンダリング結果をリアルタイム表示・HTML出力します。',
      description: 'Markdown記法のテキストをリアルタイムでプレビュー・HTML化します。',
      quickAnswer: 'Markdown記法で入力された文章をリアルタイムで装飾プレビュー・HTML化します。',
      seoHowToUse: '1. 左側エディタにMarkdown文章を入力します。\n2. 右側のリアルタイムプレビューを確認します。\n3. 「HTMLをコピー」または「.mdを保存」を押します。',
      seoHowItWorks: 'Markdownパーサーを用いてHTMLタグへ即時変換描画します。',
      formula: 'Markdown -> HTML Parser Render',
      seoExample: '`# タイトル` と入力すると大見出し（<h1>）としてレンダリングされます。',
      faqs: [{ q: 'GFM（GitHub Flavored Markdown）の表やチェックリストに対応していますか？', a: 'はい、GFM仕様のテーブルやタスクリストのプレビューに対応しています。' }]
    }
  },

  'lorem-ipsum-generator': {
    es: {
      name: 'Generador de Lorem Ipsum',
      seoTitle: 'Generador de Texto Lorem Ipsum (Párrafos y Palabras) | HelloTools',
      seoDescription: 'Genera texto de relleno Lorem Ipsum por párrafos, frases o palabras.',
      description: 'Genera texto simulado para maquetación y diseño.',
      quickAnswer: 'Crea texto aleatorio en latín simulado para bocetos de diseño y maquetación.',
      seoHowToUse: '1. Selecciona la cantidad de párrafos o palabras.\n2. Elige si comenzar con "Lorem ipsum dolor sit amet...".\n3. Haz clic en Copiar.',
      seoHowItWorks: 'Ensambla oraciones y párrafos a partir del texto clásico de Cicerón.',
      formula: 'Lorem Generator',
      seoExample: 'Generar 1 párrafo produce "Lorem ipsum dolor sit amet, consectetur..."',
      faqs: [{ q: '¿Qué origen tiene el texto Lorem Ipsum?', a: 'Proviene de una obra filosófica en latín escrita por Cicerón en el año 45 a.C.' }]
    },
    de: {
      name: 'Lorem Ipsum Generator',
      seoTitle: 'Lorem Ipsum Generator — Blindtext Erzeugen | HelloTools',
      seoDescription: 'Generieren Sie Lorem Ipsum Blindtext nach Absätzen oder Wörteranzahl.',
      description: 'Erzeugen Sie Platzhaltertext für Webdesign und Layouts.',
      quickAnswer: 'Generiert klassischen lateinischen Blindtext für Design-Layouts.',
      seoHowToUse: '1. Anzahl der Absätze wählen.\n2. Auf Generieren klicken.\n3. Blindtext kopieren.',
      seoHowItWorks: 'Stellt Absätze aus dem klassischen Lorem-Ipsum-Text zusammen.',
      formula: 'Blindtext Generator',
      seoExample: 'Generiert z.B. 3 Absätze druckfertigen Platzhaltertext.',
      faqs: [{ q: 'Warum verwendet man Blindtext?', a: 'Damit der Betrachter sich auf das Design statt den Inhalt konzentriert.' }]
    },
    fr: {
      name: 'Générateur de Lorem Ipsum',
      seoTitle: 'Générateur de Faux Texte Lorem Ipsum | HelloTools',
      seoDescription: 'Générez du faux texte d\'imprimerie Lorem Ipsum par paragraphes ou mots.',
      description: 'Générez du texte de remplissage pour vos maquettes.',
      quickAnswer: 'Génère du faux texte d\'imprimerie pour tester la mise en page de vos sites.',
      seoHowToUse: '1. Choisissez le nombre de paragraphes.\n2. Générez le texte.\n3. Copiez le résultat.',
      seoHowItWorks: 'Assemble des phrases issues du texte classique en latin.',
      formula: 'Générateur Faux Texte',
      seoExample: 'Produit du texte de démonstration pour maquettes.',
      faqs: [{ q: 'Le texte a-t-il une signification ?', a: 'Non, c\'est du latin altéré sans sens compréhensible pour éviter toute distraction.' }]
    },
    pt: {
      name: 'Gerador de Lorem Ipsum',
      seoTitle: 'Gerador de Texto Lorem Ipsum (Falso Texto) | HelloTools',
      seoDescription: 'Gere texto fictício Lorem Ipsum por parágrafos ou palavras para layouts.',
      description: 'Gere texto fictício para testes de design e diagramação.',
      quickAnswer: 'Gera texto de preenchimento para testes visuais de design e sites.',
      seoHowToUse: '1. Escolha o número de parágrafos desejado.\n2. Clique em Gerar.\n3. Copie o texto de exemplo.',
      seoHowItWorks: 'Monta parágrafos do texto padrão de preenchimento.',
      formula: 'Gerador de Texto Fictício',
      seoExample: 'Gera parágrafos iniciando com "Lorem ipsum dolor sit amet..."',
      faqs: [{ q: 'Por que usar Lorem Ipsum em vez de texto real?', a: 'Evita que a atenção do leitor se desvie do design para a leitura do conteúdo.' }]
    },
    ja: {
      name: 'ダミーテキスト（Lorem Ipsum）生成ツール',
      seoTitle: 'ダミーテキスト（Lorem Ipsum・日本語ダミー）生成 | HelloTools',
      seoDescription: 'WEBデザインやレイアウト調整で使えるダミーテキスト（Lorem Ipsum文 / 日本語夏目漱石風ダミー文）を段落数指定で自動生成します。',
      description: 'デザインやレイアウト確認用のダミーテキスト（ダミー文章）を生成します。',
      quickAnswer: 'WEB制作やデザイン用のラテン語（Lorem Ipsum）および日本語ダミーテキストを生成します。',
      seoHowToUse: '1. 段落数または文字数を指定します。\n2. 形式（Lorem Ipsum / 日本語ダミー文章）を選択します。\n3. 生成されたテキストを「コピー」します。',
      seoHowItWorks: '古典ラテン語テキストおよび日本語サンプル段落を構成出力します。',
      formula: 'Dummy Text Generator Stream',
      seoExample: '「Lorem ipsum dolor sit amet...」や「吾輩は猫である。名前はまだ無い。」風テキストを即時生成します。',
      faqs: [{ q: '日本語のダミーテキストにも対応していますか？', a: 'はい、日本語デザイン確認用の日本語ダミー文章の出力も可能です。' }]
    }
  },

  'standard-deviation-calculator': {
    es: {
      name: 'Calculadora de Desviación Estándar',
      seoTitle: 'Calculadora de Desviación Estándar y Varianza | HelloTools',
      seoDescription: 'Calcula la desviación estándar poblacional y muestral, varianza y media.',
      description: 'Calcula la desviación estándar, varianza y media de un conjunto de datos.',
      quickAnswer: 'Mide la dispersión o variabilidad de un conjunto de datos numéricos.',
      seoHowToUse: '1. Introduce los números separados por comas o espacios.\n2. Elige si es una muestra (s) o población (σ).\n3. Obtén la desviación estándar y varianza.',
      seoHowItWorks: 'Calcula la media, resta las desviaciones al cuadrado y divide por N o N-1.',
      formula: 's = √[ Σ(x - x̅)² / (n - 1) ]',
      seoExample: 'Para los datos [2, 4, 4, 4, 5, 5, 7, 9], la media es 5 y la desviación estándar muestral es 2.138.',
      faqs: [{ q: '¿Cuál es la diferencia entre muestra y población?', a: 'La muestra usa n-1 en el denominador (corrección de Bessel); la población usa N.' }]
    },
    de: {
      name: 'Standardabweichung-Rechner',
      seoTitle: 'Standardabweichung Rechner — Varianz & Mittelwert | HelloTools',
      seoDescription: 'Berechnen Sie Stichproben- und Populations-Standardabweichung, Varianz und Mittelwert.',
      description: 'Standardabweichung, Varianz und Mittelwert berechnen.',
      quickAnswer: 'Errechnet die statistische Streuung einer Zahlenreihe.',
      seoHowToUse: '1. Zahlen kommagetrennt eingeben.\n2. Stichprobe oder Population wählen.\n3. Werte ablesen.',
      seoHowItWorks: 'Berechnet quadratische Abweichungen vom Mittelwert.',
      formula: 's = √[ Σ(x - x̅)² / (n - 1) ]',
      seoExample: 'Für 2, 4, 4, 5, 7 ist der Mittelwert 4,4 und die Standardabweichung ca. 1,82.',
      faqs: [{ q: 'Was sagt eine hohe Standardabweichung aus?', a: 'Dass die Messwerte weit um den Mittelwert gestreut sind.' }]
    },
    fr: {
      name: 'Calculateur d\'Écart-Type',
      seoTitle: 'Calculateur d\'Écart-Type et Variance | HelloTools',
      seoDescription: 'Calculez l\'écart-type d\'un échantillon ou d\'une population, la variance et la moyenne.',
      description: 'Calculez l\'écart-type, la variance et la moyenne.',
      quickAnswer: 'Mesure la dispersion des données autour de la moyenne statistique.',
      seoHowToUse: '1. Entrez la série de nombres.\n2. Choisissez échantillon ou population.\n3. Consultez la variance et l\'écart-type.',
      seoHowItWorks: 'Prend la racine carrée de la variance.',
      formula: 'σ = √[ Σ(x - μ)² / N ]',
      seoExample: 'Pour [10, 12, 23, 23, 16, 23, 21, 16], la moyenne est 18 et l\'écart-type est environ 5,23.',
      faqs: [{ q: 'À quoi sert la variance ?', a: 'C\'est la moyenne de los carrés des écarts à la moyenne (le carré de l\'écart-type).' }]
    },
    pt: {
      name: 'Calculadora de Desvio Padrão',
      seoTitle: 'Calculadora de Desvio Padrão e Variância | HelloTools',
      seoDescription: 'Calcule o desvio padrão amostral e populacional, a variância e a média estatística.',
      description: 'Calcule o desvio padrão e variância de um conjunto de números.',
      quickAnswer: 'Mede a dispersão estatística de um grupo de dados numéricos.',
      seoHowToUse: '1. Digite a lista de números.\n2. Selecione se é amostra ou população.\n3. Veja a média, variância e desvio padrão.',
      seoHowItWorks: 'Calcula a média e a soma das diferenças ao quadrado.',
      formula: 's = √[ Σ(x - x̅)² / (n - 1) ]',
      seoExample: 'Para a lista 10, 20, 30, a média é 20 e o desvio padrão amostral é 10.',
      faqs: [{ q: 'O que é desvio padrão amostral?', a: 'É o cálculo usado quando os dados representam apenas parte de um grupo maior.' }]
    },
    ja: {
      name: '標準偏差・分散計算ツール',
      seoTitle: '標準偏差計算ツール — 標本偏差・母集団分散・平均値 | HelloTools',
      seoDescription: '数値データを入力するだけで、平均値、標本標準偏差（s）、母集団標準偏差（σ）、分散を自動計算します。',
      description: '数値群の平均値、分散、標準偏差を計算します。',
      quickAnswer: 'データ群のばらつき具合を示す統計指標（平均値・標準偏差・分散）を算出します。',
      seoHowToUse: '1. 数値をカンマまたはスペース区切りで入力します。\n2. 標本（Sample）または母集団（Population）を選択します。\n3. 平均値、分散、標準偏差（s / σ）を確認します。',
      seoHowItWorks: '平均値からの偏差平方和を自由度（nまたはn-1）で割った平方根を求めます。',
      formula: 's = √[ Σ(x - x̅)² / (n - 1) ]',
      seoExample: '数値 [60, 70, 80] の場合、平均値は70、標準偏差は約10となります。',
      faqs: [{ q: '標本標準偏差（n-1）と母集団標準偏差（n）の違いは？', a: '全体データの一部（サンプル）から全体を推測する際は標本標準偏差（n-1）を使用します。' }]
    }
  },

  'ev-cost-calculator': {
    es: {
      name: 'Calculadora de Costo de Carga de Coche Eléctrico (EV vs Gasolina)',
      seoTitle: 'Calculadora de Costo de Carga Eléctrica vs Gasolina | HelloTools',
      seoDescription: 'Compara el costo por kilómetro y el ahorro anual entre un coche eléctrico (EV) y uno de gasolina.',
      description: 'Compara el costo de recarga de un vehículo eléctrico frente al combustible.',
      quickAnswer: 'Compara el gasto monetario por distancia entre un vehículo eléctrico y uno térmico.',
      seoHowToUse: '1. Introduce la distancia anual recorrida.\n2. Indica el precio de la gasolina y el precio del kWh eléctrico.\n3. Consulta el ahorro anual estimado.',
      seoHowItWorks: 'Calcula el consumo total en kWh y litros y los multiplica por las tarifas.',
      formula: 'Costo EV = (Distancia / 100) * Consumo kWh/100km * Precio kWh',
      seoExample: 'Recorrer 15.000 km/año con un EV (18 kWh/100km a $0,15/kWh) cuesta $405 vs $1.800 de gasolina.',
      faqs: [{ q: '¿Cuánto se ahorra con un coche eléctrico?', a: 'En promedio, recorrer kilómetros en EV cuesta entre un 60% y un 80% menos que en coche de gasolina.' }]
    },
    de: {
      name: 'Elektroauto-Ladekostenrechner (EV vs. Benzin)',
      seoTitle: 'E-Auto Ladekostenrechner — EV vs. Benziner Vergleich | HelloTools',
      seoDescription: 'Vergleichen Sie die Fahrtkosten und Ersparnis zwischen E-Auto und Verbrenner.',
      description: 'Ladekosten für Elektrofahrzeuge mit Benzinkosten vergleichen.',
      quickAnswer: 'Berechnet die Ersparnis beim Umstieg von Benzin/Diesel auf Elektroantrieb.',
      seoHowToUse: '1. Jährliche Kilometerleistung eingeben.\n2. Strompreis (€/kWh) und Benzinpreis (€/l) eintragen.\n3. Jährliche Ersparnis ablesen.',
      seoHowItWorks: 'Vergleicht die Verbrauchskosten auf 100 km.',
      formula: 'Kosten EV = (km / 100) * kWh/100km * Strompreis',
      seoExample: '15.000 km im E-Auto kosten ca. 800 € Strom statt 2.100 € Benzin.',
      faqs: [{ q: 'Wie viel kWh verbraucht ein E-Auto auf 100 km?', a: 'Ein durchschnittlicher Stromverbrauch liegt bei 15 bis 20 kWh pro 100 km.' }]
    },
    fr: {
      name: 'Calculateur de Coût de Recharge Voiture Électrique',
      seoTitle: 'Calculateur Coût Électrique vs Essence Voiture | HelloTools',
      seoDescription: 'Comparez le coût au kilomètre et l\'économie annuelle entre véhicule électrique et essence.',
      description: 'Comparez le budget carburant essence vs recharge électrique.',
      quickAnswer: 'Évalue l\'économie financière annuelle réalisée en roulant en véhicule électrique.',
      seoHowToUse: '1. Entrez votre kilométrage annuel.\n2. Saisissez le prix du kWh et du carburant.\n3. Obtenez l\'économie annuelle.',
      seoHowItWorks: 'Calcule les coûts d\'énergie totaux pour la même distance.',
      formula: 'Coût VE = (km / 100) * kWh/100km * Prix kWh',
      seoExample: 'Pour 15 000 km/an, l\'électricité coûte environ 450 € contre 1 800 € d\'essence.',
      faqs: [{ q: 'Recharger à la maison est-il plus avantageux ?', a: 'Oui, la recharge à domicile au tarif heures creuses est la solution la plus économique.' }]
    },
    pt: {
      name: 'Calculadora de Custo de Carro Elétrico (EV vs Gasolina)',
      seoTitle: 'Calculadora de Custo de Carro Elétrico vs Gasolina | HelloTools',
      seoDescription: 'Compare o custo por quilômetro e a economia anual entre carro elétrico e a combustão.',
      description: 'Compare os custos de recarga elétrica com o gasto de gasolina.',
      quickAnswer: 'Calcula a economia financeira anual ao optar por um veículo elétrico.',
      seoHowToUse: '1. Digite a quilometragem anual.\n2. Informe a tarifa da energia (R$/kWh) e o preço do combustível.\n3. Veja a economia anual.',
      seoHowItWorks: 'Compara os custos de rodagem por 100 km.',
      formula: 'Custo EV = (km / 100) * kWh/100km * Tarifa kWh',
      seoExample: 'Rodar 15.000 km/ano em um EV custa cerca de R$ 2.000 contra R$ 8.000 em gasolina.',
      faqs: [{ q: 'Quanto um carro elétrico consome por km?', a: 'Média de 15 a 18 kWh a cada 100 km rodados.' }]
    },
    ja: {
      name: 'EV（電気自動車）電気代・ガソリン代比較計算ツール',
      seoTitle: 'EV電気代 vs ガソリン代比較計算ツール | HelloTools',
      seoDescription: '年間走行距離、電気料金単価（円/kWh）、ガソリン価格から、電気自動車（EV）とガソリン車の年間燃料コストと節約額を算定します。',
      description: '電気自動車（EV）の充電電気代とガソリン車の燃料費を比較計算します。',
      quickAnswer: '年間走行距離に対するEV（電気代）とガソリン車の燃料コストおよび差額節約額を計算します。',
      seoHowToUse: '1. 年間走行距離（km）を入力します。\n2. 電気代単価（円/kWh）とガソリン価格（円/L）を入力します。\n3. 年間コスト比較と節約可能額を確認します。',
      seoHowItWorks: '100kmあたりの電力量（kWh）とガソリン消費量（L）から総費用を算定します。',
      formula: 'EV年間コスト = (年間走行距離 / 100) * 100km電費 * 電気代単価',
      seoExample: '年間10,000km走行時、EV電気代は約4万円（ガソリン代は約12万円）となり年間約8万円節約できます。',
      faqs: [{ q: '家庭充電と急速充電（スタンド）でコストは変わりますか？', a: 'はい、自宅の深夜電力等で充電する方が急速充電スタンド利用より割安です。' }]
    }
  },

  'macronutrient-splitter': {
    es: {
      name: 'Distribuidor de Macronutrientes por Comida',
      seoTitle: 'Distribuidor de Macronutrientes por Comida | HelloTools',
      seoDescription: 'Divide tus gramos diarios de proteínas, carbohidratos y grasas entre tus comidas del día.',
      description: 'Reparte tus macronutrientes diarios en cada comida del día.',
      quickAnswer: 'Reparte la meta total de proteínas, carbohidratos y grasas en porciones por comida.',
      seoHowToUse: '1. Introduce tus objetivos diarios totales de proteínas, carbos y grasas.\n2. Indica el número de comidas al día (ej. 4 comidas).\n3. Lee las porciones por plato.',
      seoHowItWorks: 'Divide los gramos totales por el número de ingestas.',
      formula: 'Macro por Comida = Gramos Totales / Número de Comidas',
      seoExample: 'Con 160g de proteína en 4 comidas, debes consumir 40g de proteína por comida.',
      faqs: [{ q: '¿Todas las comidas deben tener los mismos gramos?', a: 'No obligatoriamente, pero repartirlos de forma pareja facilita el cumplimiento del plan.' }]
    },
    de: {
      name: 'Makronährstoff-Aufteiler nach Mahlzeiten',
      seoTitle: 'Makronährstoff Aufteiler pro Mahlzeit | HelloTools',
      seoDescription: 'Teilen Sie Ihre täglichen Proteine, Carbs und Fette auf Ihre Mahlzeiten auf.',
      description: 'Tägliche Makronährstoffe auf einzelne Mahlzeiten aufteilen.',
      quickAnswer: 'Berechnet die Grammzahl an Proteinen, Carbs und Fett pro Mahlzeit.',
      seoHowToUse: '1. Tages-Makros (Gramm) eingeben.\n2. Anzahl der Mahlzeiten (z.B. 4) wählen.\n3. Portionen pro Teller ablesen.',
      seoHowItWorks: 'Teilt die Gesamtgrammzahl durch die Mahlzeitenanzahl.',
      formula: 'Pro Mahlzeit = Gesamtgramm / Mahlzeiten',
      seoExample: '160g Eiweiß auf 4 Mahlzeiten ergibt 40g Eiweiß pro Mahlzeit.',
      faqs: [{ q: 'Ist die Verteilung vor/nach dem Training wichtig?', a: 'Ja, Eiweiß und Carbs rund um das Training unterstützen die Regeneration.' }]
    },
    fr: {
      name: 'Répartiteur de Macronutriments par Repas',
      seoTitle: 'Répartiteur de Macronutriments par Repas | HelloTools',
      seoDescription: 'Répartissez vos grammes quotidiens de protéines, glucides et lipides par repas.',
      description: 'Répartissez vos macros quotidiennes dans chaque repas de la journée.',
      quickAnswer: 'Divise l\'objectif quotidien en grammes de nutriments par assiette.',
      seoHowToUse: '1. Saisissez vos objectifs globaux de macros.\n2. Choisissez le nombre de repas par jour.\n3. Obtenez la répartition par repas.',
      seoHowItWorks: 'Divise la valeur totale par le nombre de repas.',
      formula: 'Macro par Repas = Total Grammes / Nombre de Repas',
      seoExample: '160g de protéines répartis sur 4 repas donnent 40g par repas.',
      faqs: [{ q: 'Combien de repas faire par jour ?', a: 'Généralement entre 3 et 5 repas selon votre emploi du temps et vos préférences.' }]
    },
    pt: {
      name: 'Divisor de Macronutrientes por Refeição',
      seoTitle: 'Divisor de Macronutrientes por Refeição | HelloTools',
      seoDescription: 'Divida suas gramas diárias de proteínas, carboidratos e gorduras entre suas refeições.',
      description: 'Divida seus macros diários entre o número de refeições que você faz.',
      quickAnswer: 'Distribui as metas de macros diárias em porções exatas para cada refeição.',
      seoHowToUse: '1. Informe o total de gramas de proteínas, carbos e gorduras do dia.\n2. Digite o número de refeições (ex: 4).\n3. Veja as gramas por prato.',
      seoHowItWorks: 'Divide o total de cada macronutriente pelo número de refeições.',
      formula: 'Macro por Refeição = Gramas Totais / Número de Refeições',
      seoExample: '160g de proteína em 4 refeições exige 40g de proteína por refeição.',
      faqs: [{ q: 'É preciso comer a cada 3 horas?', a: 'Não é obrigatório; o importe principal é bater a meta total do dia.' }]
    },
    ja: {
      name: 'PFCマクロ分割（食数別）計算ツール',
      seoTitle: 'PFCバランス食事回数別分割計算ツール | HelloTools',
      seoDescription: '1日の目標PFC（タンパク質・脂質・炭水化物）の総グラム数を、1日の食事回数（3食・4食・5食等）に等分割分配します。',
      description: '1日のPFC目標グラム数を食事回数ごとに均等分割計算します。',
      quickAnswer: '1日の総PFC（タンパク質・脂質・炭水化物）グラム数を食事回数（3〜6食）ごとに均等割り計算します。',
      seoHowToUse: '1. 1日の目標タンパク質・脂質・炭水化物（g）を入力します。\n2. 1日の食事回数（例：4食）を選択します。\n3. 1食あたりの目標PFC（g）を確認します。',
      seoHowItWorks: '総グラム数を食事回数で除算して1食分の目安を算出します。',
      formula: '1食あたりのg = 1日の総g / 食事回数',
      seoExample: '1日タンパク質160gを4食に分割する場合、1食あたり40gが目安となります。',
      faqs: [{ q: 'トレーニング直後の食事で多く摂るべきですか？', a: '運動前後の食事で炭水化物とタンパク質を重点的に補給するのが効果的です。' }]
    }
  },

  'apr-calculator': {
    es: {
      name: 'Calculadora de APR (Tasa Anual Equivalente)',
      seoTitle: 'Calculadora de APR — Tasa Anual Equivalente y Costo Crédito | HelloTools',
      seoDescription: 'Calcula la Tasa Anual Equivalente (APR) de un préstamo incluyendo comisiones e intereses.',
      description: 'Calcula el costo real (APR) de tu préstamo incluyendo comisiones.',
      quickAnswer: 'Calcula el costo efectivo anual real de un financiamiento sumando comisiones al tipo nominal.',
      seoHowToUse: '1. Introduce el importe del préstamo.\n2. Indica la tasa de interés nominal y las comisiones iniciales.\n3. Lee el APR financiero real.',
      seoHowItWorks: 'Resuelve la tasa interna de retorno (TIR) que iguala el préstamo neto con los flujos de pago.',
      formula: 'APR = Tasa Efectiva Anual considerando comisiones iniciales',
      seoExample: 'Un préstamo de $10.000 al 5% con $300 de comisión inicial tiene un APR real del 5.65%.',
      faqs: [{ q: '¿Cuál es la diferencia entre interés nominal y APR?', a: 'El interés nominal solo mide la tasa de interés; el APR incluye todas las comisiones obligatorias.' }]
    },
    de: {
      name: 'Effektivzinsrechner (APR)',
      seoTitle: 'Effektivzinsrechner (APR) — Echte Kreditkosten Berechnen | HelloTools',
      seoDescription: 'Berechnen Sie den effektiven Jahreszins (APR) unter Berücksichtigung aller Gebühren.',
      description: 'Ermitteln Sie den effektiven Jahreszins Ihres Kredits inklusive Gebühren.',
      quickAnswer: 'Berechnet die tatsächlichen jährlichen Gesamtpreis eines Kredits inkl. Bearbeitungsgebühren.',
      seoHowToUse: '1. Kreditbetrag und Zins eingeben.\n2. Einmalige Gebühren eintragen.\n3. Effektiven Jahreszins (APR) ablesen.',
      seoHowItWorks: 'Ermittelt den internen Zinsfuß auf den Auszahlungsbetrag.',
      formula: 'Effektivzins = Effektiver Jahreszins inklusive Nebenkosten',
      seoExample: '10.000 € Kredit zu 5 % mit 300 € Gebühr hat einen Effektivzins von ca. 5,65 %.',
      faqs: [{ q: 'Warum ist der Effektivzins höher als der Sollzins?', a: 'Weil Gebühren und Tilgungsverlauf den tatsächlichen Jahrespreis erhöhen.' }]
    },
    fr: {
      name: 'Calculateur de TAEG / APR',
      seoTitle: 'Calculateur de TAEG (Taux Annuel Effectif Global) | HelloTools',
      seoDescription: 'Calculez le TAEG (Taux Annuel Effectif Global) d\'un prêt en incluant les frais.',
      description: 'Calculez le coût réel (TAEG) de votre crédit avec les frais dossier.',
      quickAnswer: 'Calcule le taux annuel effectif global d\'un crédit incluant tous les frais annexes.',
      seoHowToUse: '1. Saisissez le montant emprunté.\n2. Indiquez le taux nominal et les frais de dossier.\n3. Obtenez le TAEG exact.',
      seoHowItWorks: 'Calcule le taux d\'actualisation lissant le coût total du crédit.',
      formula: 'TAEG = Taux Actuariel Effectif',
      seoExample: 'Un prêt de 10 000 € à 5 % avec 300 € de frais a un TAEG de 5,65 %.',
      faqs: [{ q: 'Que comprend le TAEG ?', a: 'Les intérêts, les frais de dossier, les frais de garantie y l\'assurance obligatoire.' }]
    },
    pt: {
      name: 'Calculadora de CET / APR (Custo Efetivo Total)',
      seoTitle: 'Calculadora de CET (Custo Efetivo Total / APR) | HelloTools',
      seoDescription: 'Calcule o Custo Efetivo Total (CET / APR) do seu empréstimo incluindo taxas e tarifas.',
      description: 'Descubra a taxa real anual (CET) do seu empréstimo com todas as tarifas.',
      quickAnswer: 'Calcula a porcentagem real cobrada ao ano considerando juros e tarifas administrativas.',
      seoHowToUse: '1. Informe o valor do empréstimo.\n2. Insira a taxa de juros nominal e as tarifas iniciais.\n3. Veja a taxa CET/APR anual.',
      seoHowItWorks: 'Calcula a taxa interna de retorno sobre os valores líquidos desembolsados.',
      formula: 'CET Anual = Taxa Efetiva Global com Tarifas',
      seoExample: 'Um empréstimo de R$ 10.000 a 5% com R$ 300 de tarifa tem CET anual de 5,65%.',
      faqs: [{ q: 'Por que comparar pelo CET e não pelos juros?', a: 'Porque o CET revela o custo total verdadeiro do empréstimo incluindo todas as taxas cobradas.' }]
    },
    ja: {
      name: '実質年率（APR・実質金利）計算ツール',
      seoTitle: '実質年率（APR）計算ツール — 手数料込みの総コスト | HelloTools',
      seoDescription: '借入額、表面金利（名目金利）、事務手数料、保証料から、ローンやクレジットカードの真の実質年率（APR）を算定します。',
      description: '手数料を含むローンの実質年率（APR・実質金利）を計算します。',
      quickAnswer: '表面金利に初期手数料・保証料等を加味した実質的な年間総コスト率（実質年率APR）を算定します。',
      seoHowToUse: '1. 借入金額（元金）を入力します。\n2. 表面金利（年利%）と借入期間を入力します。\n3. 初期手数料や保証料を入力し、実質年率（%）を確認します。',
      seoHowItWorks: '内部利益率（IRR）手法で手数料込みの毎月キャッシュフローに対する実質年率を求めます。',
      formula: '実質年率(APR) = 手数料込みの内部利益率 (Internal Rate of Return)',
      seoExample: '100万円を表面年利5.0%で借り、初期手数料3万円が発生した場合、実質年率は約5.65%に上昇します。',
      faqs: [{ q: '表面金利と実質年率（APR）の違いは？', a: '表面金利は純粋な利息のみですが、実質年率は手数料や諸費用を含めた実際の年間総負担率です。' }]
    }
  }

};

/**
 * Retrieves localized content for a tool slug and locale.
 * Falls back to English (from toolsMaster) if no translation is available.
 */
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
