import { Locale } from '@/lib/i18n';

/* ── Pure EV vs Gas Calculation Types & Functions ────────────────────────── */

export interface EvCostScenarioInputs {
  annualMiles: number;
  evKwhPer100: number; // e.g. 30 kWh per 100 miles
  elecRate: number; // e.g. $0.16 / kWh
  gasMpg: number; // e.g. 28 MPG
  gasPrice: number; // e.g. $3.60 / gallon
}

export interface EvCostScenarioResult {
  annualMiles: number;
  evKwhPer100: number;
  elecRate: number;
  gasMpg: number;
  gasPrice: number;
  totalKwh: number;
  evAnnualCost: number;
  evCostPerMile: number;
  totalGallons: number;
  gasAnnualCost: number;
  gasCostPerMile: number;
  annualSavings: number;
  fiveYearSavings: number;
  tenYearSavings: number;
  savingsPercent: number;
}

/**
 * Pure EV vs gas calculation function.
 * Strictly identical to components/tools/EVCostCalculator.tsx.
 *
 * Formulas:
 *   totalKwh = (annualMiles / 100) * evKwhPer100
 *   evAnnualCost = totalKwh * elecRate
 *   evCostPerMile = annualMiles > 0 ? evAnnualCost / annualMiles : 0
 *   totalGallons = annualMiles / gasMpg
 *   gasAnnualCost = totalGallons * gasPrice
 *   gasCostPerMile = annualMiles > 0 ? gasAnnualCost / annualMiles : 0
 *   annualSavings = gasAnnualCost - evAnnualCost
 *   fiveYearSavings = annualSavings * 5
 *   tenYearSavings = annualSavings * 10
 *   savingsPercent = gasAnnualCost > 0 ? (annualSavings / gasAnnualCost) * 100 : 0
 */
export function calcEvCostComparison({
  annualMiles,
  evKwhPer100,
  elecRate,
  gasMpg,
  gasPrice,
}: EvCostScenarioInputs): EvCostScenarioResult {
  const miles = Math.max(0, annualMiles);
  const kwhPer100 = Math.max(0.1, evKwhPer100);
  const rateElec = Math.max(0, elecRate);
  const mpg = Math.max(0.1, gasMpg);
  const gPrice = Math.max(0, gasPrice);

  const totalKwh = (miles / 100) * kwhPer100;
  const evCost = totalKwh * rateElec;
  const evPerMile = miles > 0 ? evCost / miles : 0;

  const totalGallons = miles / mpg;
  const gasCost = totalGallons * gPrice;
  const gasPerMile = miles > 0 ? gasCost / miles : 0;

  const yearlySavings = gasCost - evCost;
  const pct = gasCost > 0 ? (yearlySavings / gasCost) * 100 : 0;

  return {
    annualMiles: miles,
    evKwhPer100: kwhPer100,
    elecRate: rateElec,
    gasMpg: mpg,
    gasPrice: gPrice,
    totalKwh,
    evAnnualCost: evCost,
    evCostPerMile: evPerMile,
    totalGallons,
    gasAnnualCost: gasCost,
    gasCostPerMile: gasPerMile,
    annualSavings: yearlySavings,
    fiveYearSavings: yearlySavings * 5,
    tenYearSavings: yearlySavings * 10,
    savingsPercent: pct,
  };
}

/* ── Formatters ──────────────────────────────────────────────────────────── */

export function formatCurrency(amount: number, decimals = 2): string {
  const isNegative = amount < 0;
  const absFormatted = Math.abs(amount).toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${isNegative ? '-' : ''}$${absFormatted}`;
}

export function formatNumber(amount: number): string {
  return new Intl.NumberFormat('en-US').format(Math.round(amount));
}

export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/* ── Section i18n Types ───────────────────────────────────────────────────── */

export interface EvCostScenarioSectionI18n {
  heading: string;
  intro: string;
  viewAll: string;
  cards: {
    tenThousandMiles: { title: string; description: string; badge: string };
    electricityPrice: { title: string; description: string; badge: string };
    gasPrice: { title: string; description: string; badge: string };
  };
}

/* ── Localized Section Content ────────────────────────────────────────────── */

export const EV_COST_SCENARIOS_SECTION_I18N: Record<Locale, EvCostScenarioSectionI18n> = {
  en: {
    heading: 'EV Charging vs Gas Cost Calculator Scenarios and Examples',
    intro:
      'These practical scenarios demonstrate how annual mileage, electricity price, gasoline price, vehicle efficiency, and comparison period affect annual fuel costs and potential savings. All calculations use the exact formulas and supported inputs of our EV Charging vs Gas Cost Calculator.',
    viewAll: 'View All EV Charging vs Gas Cost Scenarios',
    cards: {
      tenThousandMiles: {
        title: 'EV vs Gas Cost for 10,000 Miles Per Year',
        description:
          'Compare annual electricity charging costs and gasoline expenses for a common 10,000-mile annual driving distance across multiple mileage tiers.',
        badge: 'Mileage Tiers',
      },
      electricityPrice: {
        title: 'How Electricity Price Affects EV Charging Savings',
        description:
          'Analyze how home and regional electricity utility rates from 8¢ to 32¢ per kWh impact annual charging expenses and net savings versus gas.',
        badge: 'Electricity Rates',
      },
      gasPrice: {
        title: 'How Gas Price Changes the EV Savings Gap',
        description:
          'See how fluctuations in gasoline prices from $2.75 to $5.00 per gallon expand or compress the annual savings advantage of driving electric.',
        badge: 'Fuel Price Impact',
      },
    },
  },
  es: {
    heading: 'Escenarios y Ejemplos de la Calculadora de Costo EV vs Gasolina',
    intro:
      'Estos escenarios prácticos demuestran cómo el kilometraje anual, el precio de la electricidad, el precio de la gasolina y la eficiencia del vehículo influyen en el gasto de combustible y el ahorro potencial.',
    viewAll: 'Ver Todos los Escenarios de EV vs Gasolina',
    cards: {
      tenThousandMiles: {
        title: 'Costo de EV vs Gasolina para 10,000 Millas al Año',
        description:
          'Compare el costo anual de recarga eléctrica y combustible fósil para un promedio de 10,000 millas recorridas al año.',
        badge: 'Kilometraje Anual',
      },
      electricityPrice: {
        title: 'Cómo Influye la Tarifa Eléctrica en el Ahorro de un EV',
        description:
          'Analice cómo las distintas tarifas eléctricas residenciales afectan el gasto de recarga anual y la diferencia frente a la gasolina.',
        badge: 'Tarifas Eléctricas',
      },
      gasPrice: {
        title: 'Cómo Afecta el Precio de la Gasolina al Margen de Ahorro',
        description:
          'Compruebe cómo las variaciones en el precio del galón de gasolina amplían o reducen el beneficio económico de recargar un auto eléctrico.',
        badge: 'Precio de Combustible',
      },
    },
  },
  de: {
    heading: 'E-Auto Laden vs. Benzinkosten Rechner-Szenarien und Praxisbeispiele',
    intro:
      'Diese Szenarien veranschaulichen, wie sich Jahresfahrleistung, Strompreis, Benzinpreis und Fahrzeug-Effizienz auf die jährlichen Energiekosten und das Sparpotenzial auswirken.',
    viewAll: 'Alle E-Auto vs. Benzinkosten Szenarien ansehen',
    cards: {
      tenThousandMiles: {
        title: 'E-Auto vs. Benzinkosten bei 10.000 Meilen pro Jahr',
        description:
          'Vergleichen Sie jährliche Ladekosten und Kraftstoffausgaben für eine typische Fahrleistung von 10.000 Meilen pro Jahr.',
        badge: 'Fahrleistung',
      },
      electricityPrice: {
        title: 'Wie der Strompreis die Ladekosten-Ersparnis beeinflusst',
        description:
          'Untersuchen Sie, wie unterschiedliche Stromtarife pro Kilowattstunde die jährlichen Ausgaben und den Sparvorteil gegenüber Benzin verändern.',
        badge: 'Stromtarife',
      },
      gasPrice: {
        title: 'Wie sich der Benzinpreis auf die Ersparnis auswirkt',
        description:
          'Sehen Sie, wie schwankende Kraftstoffpreise den finanziellen Vorteil des elektrischen Fahrens vergrößern oder verringern.',
        badge: 'Benzinpreis-Auswirkung',
      },
    },
  },
  fr: {
    heading: 'Scénarios et Exemples du Simulateur Recharge Électrique vs Essence',
    intro:
      'Ces scénarios pratiques illustrent l’impact du kilométrage annuel, du prix du kWh, du coût des carburants et de l’efficacité des véhicules sur vos dépenses annuelles et économies nettes.',
    viewAll: 'Voir Tous les Scénarios Électrique vs Essence',
    cards: {
      tenThousandMiles: {
        title: 'Coût Électrique vs Essence pour 10 000 Miles par An',
        description:
          'Comparez les frais de recharge annuelle et les coûts de carburant pour une distance usuelle de 10 000 miles par an.',
        badge: 'Distance Annuelle',
      },
      electricityPrice: {
        title: 'Comment le Tarif de l’Électricité Impacte les Économies',
        description:
          'Analysez comment le coût du kWh domestique ou public modifie la rentabilité de la recharge face à l’essence.',
        badge: 'Tarifs Électriques',
      },
      gasPrice: {
        title: 'Comment le Prix du Carburant Fait Varier l’Écart d’Économie',
        description:
          'Découvrez comment la hausse ou baisse des prix du carburant augmente ou resserre l’avantage économique du véhicule électrique.',
        badge: 'Prix du Carburant',
      },
    },
  },
  pt: {
    heading: 'Cenários e Exemplos da Calculadora Recarga EV vs Custo de Gasolina',
    intro:
      'Estes cenários práticos demonstram como a quilometragem anual, tarifa de energia, preço do combustível e consumo afetam seus custos anuais e economia potencial.',
    viewAll: 'Ver Todos os Cenários de Recarga EV vs Gasolina',
    cards: {
      tenThousandMiles: {
        title: 'Custo EV vs Gasolina para 10.000 Milhas por Ano',
        description:
          'Compare os gastos anuais com recarga residencial e combustível fóssil para uma rodagem típica de 10.000 milhas por ano.',
        badge: 'Quilometragem Anual',
      },
      electricityPrice: {
        title: 'Como a Tarifa de Energia Afeta a Economia da Recarga',
        description:
          'Veja como diferentes preços por kWh impactam o gasto anual de carregamento e a vantagem frente ao carro a combustão.',
        badge: 'Tarifas de Energia',
      },
      gasPrice: {
        title: 'Como o Preço da Gasolina Altera a Vantagem Financeira',
        description:
          'Entenda como as variações nos preços da gasolina expandem ou diminuem a economia gerada ao rodar no modo elétrico.',
        badge: 'Preço do Combustível',
      },
    },
  },
  ja: {
    heading: 'EV充電費用 vs ガソリン代計算機のシナリオと試算事例',
    intro:
      '年間走行距離、電気料金単価、ガソリン価格、車両電費・燃費が年間の燃料費と節約効果に与える影響を、計算機の入力項目に基づき検証します。',
    viewAll: 'EV充電 vs ガソリン代の全シナリオを見る',
    cards: {
      tenThousandMiles: {
        title: '年間10,000マイル走行時のEV充電費用 vs ガソリン代比較',
        description:
          '一般的な年間10,000マイルの走行距離を基準に、電力充電コストとガソリン給油費用の年間総額を比較します。',
        badge: '走行距離別試算',
      },
      electricityPrice: {
        title: '電気料金単価がEVの燃料費節約額に与える影響',
        description:
          'kWhあたりの電気代単価の違いが年間充電コストおよびガソリン車に対するコスト削減幅にどう影響するかを分析します。',
        badge: '電気料金単価',
      },
      gasPrice: {
        title: 'ガソリン価格の変動がEVのコスト優位性をどう変えるか',
        description:
          'ガソリン価格の上下動が、EVを走行させた場合の年間および複数年累計の節約メリットをどう拡大・縮小させるかを検証します。',
        badge: 'ガソリン価格変動',
      },
    },
  },
};
