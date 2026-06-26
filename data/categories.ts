export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const categories: Category[] = [
  { id: 'finance', name: 'Finance', description: 'EMI, mortgage, salary and investment calculators', icon: 'DollarSign' },
  { id: 'math', name: 'Math & Time', description: 'Scientific, age, date, fraction and number converters', icon: 'Hash' },
  { id: 'text', name: 'Text Utilities', description: 'Word counters, sorting, converters and readability checkers', icon: 'FileText' },
  { id: 'health', name: 'Health & Fitness', description: 'BMI, TDEE calorie, body fat and sleep calculators', icon: 'Heart' },
  { id: 'utility', name: 'Developer & Utility', description: 'Password, Base64, QR, UUID and unit converters', icon: 'Cpu' }
];
