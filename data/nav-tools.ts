export interface NavToolItem {
  slug: string;
  name: string;
  category: 'finance' | 'math' | 'text' | 'health' | 'utility';
}

export const navTools: NavToolItem[] = [
  {
    "slug": "emi-calculator",
    "name": "EMI / Loan Calculator",
    "category": "finance"
  },
  {
    "slug": "compound-interest-calculator",
    "name": "Compound Interest Calculator",
    "category": "finance"
  },
  {
    "slug": "simple-interest-calculator",
    "name": "Simple Interest Calculator",
    "category": "finance"
  },
  {
    "slug": "mortgage-calculator",
    "name": "Mortgage Calculator",
    "category": "finance"
  },
  {
    "slug": "salary-calculator",
    "name": "Salary Calculator",
    "category": "finance"
  },
  {
    "slug": "tax-calculator",
    "name": "Tax Calculator",
    "category": "finance"
  },
  {
    "slug": "discount-calculator",
    "name": "Discount / Sale Price Calculator",
    "category": "finance"
  },
  {
    "slug": "tip-calculator",
    "name": "Tip Calculator",
    "category": "finance"
  },
  {
    "slug": "retirement-calculator",
    "name": "Retirement Savings Calculator",
    "category": "finance"
  },
  {
    "slug": "currency-converter",
    "name": "Currency Converter",
    "category": "finance"
  },
  {
    "slug": "percentage-calculator",
    "name": "Percentage Calculator",
    "category": "math"
  },
  {
    "slug": "age-calculator",
    "name": "Age Calculator",
    "category": "math"
  },
  {
    "slug": "date-difference-calculator",
    "name": "Date Difference Calculator",
    "category": "math"
  },
  {
    "slug": "time-calculator",
    "name": "Time Calculator",
    "category": "math"
  },
  {
    "slug": "scientific-calculator",
    "name": "Scientific Calculator",
    "category": "math"
  },
  {
    "slug": "fraction-calculator",
    "name": "Fraction Calculator",
    "category": "math"
  },
  {
    "slug": "average-calculator",
    "name": "Average / Mean Calculator",
    "category": "math"
  },
  {
    "slug": "square-root-calculator",
    "name": "Square Root Calculator",
    "category": "math"
  },
  {
    "slug": "random-number-generator",
    "name": "Random Number Generator",
    "category": "math"
  },
  {
    "slug": "number-to-words-converter",
    "name": "Number to Words Converter",
    "category": "math"
  },
  {
    "slug": "word-counter",
    "name": "Word Counter",
    "category": "text"
  },
  {
    "slug": "character-counter",
    "name": "Character Counter",
    "category": "text"
  },
  {
    "slug": "case-converter",
    "name": "Case Converter",
    "category": "text"
  },
  {
    "slug": "text-reverser",
    "name": "Text Reverser",
    "category": "text"
  },
  {
    "slug": "remove-duplicate-lines",
    "name": "Remove Duplicate Lines",
    "category": "text"
  },
  {
    "slug": "text-sorter",
    "name": "Text Sorter",
    "category": "text"
  },
  {
    "slug": "whitespace-remover",
    "name": "Whitespace Remover",
    "category": "text"
  },
  {
    "slug": "word-frequency-counter",
    "name": "Word Frequency Counter",
    "category": "text"
  },
  {
    "slug": "palindrome-checker",
    "name": "Palindrome Checker",
    "category": "text"
  },
  {
    "slug": "readability-checker",
    "name": "Readability Score Checker",
    "category": "text"
  },
  {
    "slug": "bmi-calculator",
    "name": "BMI Calculator",
    "category": "health"
  },
  {
    "slug": "calorie-calculator",
    "name": "Calorie Calculator (TDEE)",
    "category": "health"
  },
  {
    "slug": "body-fat-calculator",
    "name": "Body Fat Percentage Calculator",
    "category": "health"
  },
  {
    "slug": "pregnancy-calculator",
    "name": "Pregnancy Due Date Calculator",
    "category": "health"
  },
  {
    "slug": "ovulation-calculator",
    "name": "Ovulation Calculator",
    "category": "health"
  },
  {
    "slug": "water-intake-calculator",
    "name": "Water Intake Calculator",
    "category": "health"
  },
  {
    "slug": "ideal-weight-calculator",
    "name": "Ideal Weight Calculator",
    "category": "health"
  },
  {
    "slug": "macro-calculator",
    "name": "Macronutrient Calculator",
    "category": "health"
  },
  {
    "slug": "running-pace-calculator",
    "name": "Running Pace Calculator",
    "category": "health"
  },
  {
    "slug": "sleep-cycle-calculator",
    "name": "Sleep Cycle Calculator",
    "category": "health"
  },
  {
    "slug": "password-generator",
    "name": "Password Generator",
    "category": "utility"
  },
  {
    "slug": "password-strength-checker",
    "name": "Password Strength Checker",
    "category": "utility"
  },
  {
    "slug": "unit-converter",
    "name": "Unit Converter",
    "category": "utility"
  },
  {
    "slug": "color-picker",
    "name": "Color Picker + HEX/RGB/HSL Converter",
    "category": "utility"
  },
  {
    "slug": "aspect-ratio-calculator",
    "name": "Aspect Ratio Calculator",
    "category": "utility"
  },
  {
    "slug": "binary-converter",
    "name": "Binary to Text Converter",
    "category": "utility"
  },
  {
    "slug": "base64-converter",
    "name": "Base64 Encoder / Decoder",
    "category": "utility"
  },
  {
    "slug": "word-to-pdf",
    "name": "Word to PDF (basic)",
    "category": "utility"
  },
  {
    "slug": "qr-code-generator",
    "name": "QR Code Generator",
    "category": "utility"
  },
  {
    "slug": "uuid-generator",
    "name": "UUID / Random ID Generator",
    "category": "utility"
  },
  {
    "slug": "grade-calculator",
    "name": "Grade Calculator",
    "category": "math"
  },
  {
    "slug": "gpa-calculator",
    "name": "GPA Calculator",
    "category": "math"
  },
  {
    "slug": "dice-roller",
    "name": "Dice Roller",
    "category": "utility"
  },
  {
    "slug": "auto-loan-calculator",
    "name": "Auto Loan Calculator",
    "category": "finance"
  },
  {
    "slug": "json-formatter",
    "name": "JSON Formatter",
    "category": "utility"
  },
  {
    "slug": "hash-generator",
    "name": "Hash Generator",
    "category": "utility"
  },
  {
    "slug": "regex-tester",
    "name": "Regex Tester",
    "category": "utility"
  },
  {
    "slug": "student-loan-calculator",
    "name": "Student Loan Calculator",
    "category": "finance"
  },
  {
    "slug": "savings-goal-calculator",
    "name": "Savings Goal Calculator",
    "category": "finance"
  },
  {
    "slug": "net-worth-calculator",
    "name": "Net Worth Calculator",
    "category": "finance"
  },
  {
    "slug": "markdown-editor",
    "name": "Markdown Editor",
    "category": "text"
  },
  {
    "slug": "lorem-ipsum-generator",
    "name": "Lorem Ipsum Generator",
    "category": "text"
  },
  {
    "slug": "bmr-calculator",
    "name": "BMR Calculator",
    "category": "health"
  },
  {
    "slug": "standard-deviation-calculator",
    "name": "Standard Deviation Calculator",
    "category": "math"
  },
  {
    "slug": "freelancer-tax-calculator",
    "name": "Freelancer Quarterly Tax Calculator",
    "category": "finance"
  },
  {
    "slug": "ev-cost-calculator",
    "name": "EV Charging vs Gas Cost Calculator",
    "category": "utility"
  },
  {
    "slug": "macronutrient-splitter",
    "name": "Macronutrient Splitter Calculator",
    "category": "health"
  },
  {
    "slug": "amortization-calculator",
    "name": "Amortization Calculator",
    "category": "finance"
  },
  {
    "slug": "inflation-calculator",
    "name": "Inflation Calculator",
    "category": "finance"
  },
  {
    "slug": "apr-calculator",
    "name": "APR Calculator",
    "category": "finance"
  },
  {
    "slug": "401k-calculator",
    "name": "401(k) Calculator",
    "category": "finance"
  }
];
