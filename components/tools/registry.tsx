import React from 'react';

// Finance Tools
import {
  EMICalculator,
  CompoundInterestCalculator,
  SimpleInterestCalculator,
  MortgageCalculator,
  SalaryCalculator,
  TaxCalculator,
  DiscountCalculator,
  TipCalculator,
  RetirementSavingsCalculator,
  CurrencyConverter
} from './FinanceTools';

// Math Tools
import {
  PercentageCalculator,
  AgeCalculator,
  DateDifferenceCalculator,
  TimeCalculator,
  ScientificCalculator,
  FractionCalculator,
  AverageMeanCalculator,
  SquareRootCalculator,
  RandomNumberGenerator,
  NumberToWordsConverter
} from './MathTools';

// Text Tools
import {
  WordCounter,
  CharacterCounter,
  CaseConverter,
  TextReverser,
  RemoveDuplicateLines,
  TextSorter,
  WhitespaceRemover,
  WordFrequencyCounter,
  PalindromeChecker,
  ReadabilityScoreChecker
} from './TextTools';

// Health Tools
import {
  BMICalculator,
  CalorieCalculatorTDEE,
  BodyFatPercentageCalculator,
  PregnancyDueDateCalculator,
  OvulationCalculator,
  WaterIntakeCalculator,
  IdealWeightCalculator,
  MacronutrientCalculator,
  RunningPaceCalculator,
  SleepCycleCalculator
} from './HealthTools';

// Utility Tools
import {
  PasswordGenerator,
  PasswordStrengthChecker,
  UnitConverter,
  ColorPickerConverter,
  AspectRatioCalculator,
  BinaryToTextConverter,
  Base64EncoderDecoder,
  WordToPDFConverter,
  QRCodeGenerator,
  UUIDGenerator
} from './UtilityTools';

export const toolsRegistry: Record<string, React.ComponentType> = {
  // Finance (10 tools)
  'emi-calculator': EMICalculator,
  'compound-interest-calculator': CompoundInterestCalculator,
  'simple-interest-calculator': SimpleInterestCalculator,
  'mortgage-calculator': MortgageCalculator,
  'salary-calculator': SalaryCalculator,
  'tax-calculator': TaxCalculator,
  'discount-calculator': DiscountCalculator,
  'tip-calculator': TipCalculator,
  'retirement-calculator': RetirementSavingsCalculator,
  'currency-converter': CurrencyConverter,

  // Math (10 tools)
  'percentage-calculator': PercentageCalculator,
  'age-calculator': AgeCalculator,
  'date-difference-calculator': DateDifferenceCalculator,
  'time-calculator': TimeCalculator,
  'scientific-calculator': ScientificCalculator,
  'fraction-calculator': FractionCalculator,
  'average-calculator': AverageMeanCalculator,
  'square-root-calculator': SquareRootCalculator,
  'random-number-generator': RandomNumberGenerator,
  'number-to-words-converter': NumberToWordsConverter,

  // Text (10 tools)
  'word-counter': WordCounter,
  'character-counter': CharacterCounter,
  'case-converter': CaseConverter,
  'text-reverser': TextReverser,
  'remove-duplicate-lines': RemoveDuplicateLines,
  'text-sorter': TextSorter,
  'whitespace-remover': WhitespaceRemover,
  'word-frequency-counter': WordFrequencyCounter,
  'palindrome-checker': PalindromeChecker,
  'readability-checker': ReadabilityScoreChecker,

  // Health (10 tools)
  'bmi-calculator': BMICalculator,
  'calorie-calculator': CalorieCalculatorTDEE,
  'body-fat-calculator': BodyFatPercentageCalculator,
  'pregnancy-calculator': PregnancyDueDateCalculator,
  'ovulation-calculator': OvulationCalculator,
  'water-intake-calculator': WaterIntakeCalculator,
  'ideal-weight-calculator': IdealWeightCalculator,
  'macro-calculator': MacronutrientCalculator,
  'running-pace-calculator': RunningPaceCalculator,
  'sleep-cycle-calculator': SleepCycleCalculator,

  // Utility (10 tools)
  'password-generator': PasswordGenerator,
  'password-strength-checker': PasswordStrengthChecker,
  'unit-converter': UnitConverter,
  'color-picker': ColorPickerConverter,
  'aspect-ratio-calculator': AspectRatioCalculator,
  'binary-converter': BinaryToTextConverter,
  'base64-converter': Base64EncoderDecoder,
  'word-to-pdf': WordToPDFConverter,
  'qr-code-generator': QRCodeGenerator,
  'uuid-generator': UUIDGenerator
};
