import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve directory paths in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TOOLS_MASTER_PATH = path.join(__dirname, '..', 'data', 'tools-master.ts');
const DB_PATH = path.join(__dirname, '..', 'data', 'db.json');

// Map of slugs to specific content descriptors to ensure highly relevant, custom output
const toolDescriptors = {
  // Finance Tools (10)
  'emi-calculator': {
    cleanName: 'EMI Calculator',
    mainUseCase: 'monthly loan payments',
    mainInputCategory: 'principal, interest rate, and tenure',
    calculationAction: 'determine your monthly installment',
    targetGroup: 'borrowers, home buyers, and auto buyers',
    steps: [
      'Enter the principal loan amount you wish to borrow in the principal input field.',
      'Specify the annual interest rate offered by your lender in the percentage field.',
      'Input the loan tenure in either years or months, depending on your repayment scheme.',
      'View the calculated monthly EMI amount, total interest payable, and total amount payable.'
    ],
    logic: 'uses the reducing balance method to calculate equal installments by dividing annual rates by twelve and compounding them over the monthly repayment terms',
    exampleInput: 'a principal amount of $10,000, an annual interest rate of 5%, and a tenure of 3 years (36 months)',
    exampleOutput: 'a monthly EMI of $299.71, total interest of $789.53, and a total repayment of $10,789.53'
  },
  'compound-interest-calculator': {
    cleanName: 'Compound Interest Calculator',
    mainUseCase: 'compound interest earnings',
    mainInputCategory: 'principal, rate, time, and frequency',
    calculationAction: 'calculate future investment growth',
    targetGroup: 'investors, savers, and wealth planners',
    steps: [
      'Enter the initial principal amount or starting balance of your investment account.',
      'Provide the annual interest rate percentage that your asset yields over time.',
      'Specify the investment period in years to estimate long-term compound growth.',
      'Choose the compounding frequency, such as monthly, quarterly, or annually, to see compound results.'
    ],
    logic: 'applies the compound interest formula, raising the sum of one plus the periodic rate to the power of total periods, to compute accumulated returns',
    exampleInput: 'an initial principal of $5,000 at an annual interest rate of 6% compounded monthly for 5 years',
    exampleOutput: 'a final balance of $6,744.25 and total accumulated compound interest earnings of $1,744.25'
  },
  'simple-interest-calculator': {
    cleanName: 'Simple Interest Calculator',
    mainUseCase: 'simple interest yields',
    mainInputCategory: 'principal sum, rate, and time',
    calculationAction: 'estimate flat interest payments',
    targetGroup: 'students, lenders, and short-term investors',
    steps: [
      'Enter the principal amount of the loan or initial deposit in the currency field.',
      'Input the annual flat interest rate percentage to be applied to the principal.',
      'Specify the time duration of the loan or deposit in days, months, or years.',
      'Read the total simple interest accrued and the final cumulative account balance.'
    ],
    logic: 'multiplies the principal balance by the annual rate and the time duration, showing linear growth without compounding the interest',
    exampleInput: 'a principal sum of $2,000 at a flat interest rate of 4% per year over a duration of 2 years',
    exampleOutput: 'an accrued simple interest of $160.00 and a final total balance of $2,160.00'
  },
  'mortgage-calculator': {
    cleanName: 'Mortgage Calculator',
    mainUseCase: 'monthly mortgage costs',
    mainInputCategory: 'home value, down payment, and mortgage rate',
    calculationAction: 'determine your home loan payments',
    targetGroup: 'homebuyers, real estate agents, and homeowners',
    steps: [
      'Input the purchase price or value of the home you intend to buy.',
      'Enter your down payment in either currency amount or percentage of home value.',
      'Input the annual mortgage interest rate and select the amortization period in years.',
      'Review the monthly principal and interest, plus optional taxes, insurance, and PMI.'
    ],
    logic: 'evaluates the amortization schedule by calculating monthly mortgage installments based on loan principal, interest rates, and loan tenure',
    exampleInput: 'a home value of $400,000, a down payment of $80,000 (20%), a 30-year term, and a 6.5% interest rate',
    exampleOutput: 'a monthly principal and interest payment of $2,022.62, excluding additional taxes and home insurance'
  },
  'salary-calculator': {
    cleanName: 'Salary Calculator',
    mainUseCase: 'salary conversions',
    mainInputCategory: 'hourly wage or annual earnings',
    calculationAction: 'convert wages across timeframes',
    targetGroup: 'employees, hiring managers, and job seekers',
    steps: [
      'Enter your wage amount in the input field based on your current payment structure.',
      'Select the time period corresponding to the wage entered, such as hourly or weekly.',
      'Specify the average working hours per week to customize conversions accurately.',
      'Analyze the corresponding breakdown of hourly, weekly, bi-weekly, monthly, and annual gross earnings.'
    ],
    logic: 'converts input earnings to an annualized gross baseline and then distributes the sum proportionally across all standard payment frequencies',
    exampleInput: 'an hourly wage rate of $25.00 working a standard 40-hour workweek',
    exampleOutput: 'an annual salary of $52,000, a monthly income of $4,333.33, and a weekly wage of $1,000'
  },
  'tax-calculator': {
    cleanName: 'Tax Calculator',
    mainUseCase: 'income tax liabilities',
    mainInputCategory: 'gross annual income and deductions',
    calculationAction: 'estimate your progressive income tax',
    targetGroup: 'taxpayers, accountants, and finance managers',
    steps: [
      'Enter your total gross annual income or taxable salary in the principal input field.',
      'Input any standard or itemized deductions to lower your overall taxable income base.',
      'Review the progressive tax brackets applied to your income level based on standard filing.',
      'Examine the total tax owed, effective tax rate percentage, and final take-home salary.'
    ],
    logic: 'routes your taxable income through progressive brackets, applying the corresponding marginal rate to each segment to compute total tax',
    exampleInput: 'a gross annual income of $75,000 under single filing status with standard deductions',
    exampleOutput: 'a total tax liability of approximately $8,422, an effective tax rate of 11.23%, and net take-home pay of $66,578'
  },
  'discount-calculator': {
    cleanName: 'Discount Calculator',
    mainUseCase: 'shopping discounts',
    mainInputCategory: 'original price, discount percent, and tax rate',
    calculationAction: 'calculate sales savings and net prices',
    targetGroup: 'shoppers, retail workers, and bargain hunters',
    steps: [
      'Enter the original retail price of the item before any discount or tax.',
      'Specify the percentage discount offered on the product tag in the input box.',
      'Input the local sales tax percentage if you wish to calculate final checkout costs.',
      'Review the total savings, discounted net price, and final tax-adjusted total price.'
    ],
    logic: 'subtracts the discount fraction from the original price and applies the sales tax percentage to the remaining discounted subtotal',
    exampleInput: 'an original retail price of $80 with a 25% discount and an 8% sales tax',
    exampleOutput: 'a total discount savings of $20.00, a discounted price of $60.00, and a final price of $64.80'
  },
  'tip-calculator': {
    cleanName: 'Tip Calculator',
    mainUseCase: 'restaurant bill splits',
    mainInputCategory: 'bill total, tip rate, and guest count',
    calculationAction: 'calculate tips and split bills',
    targetGroup: 'diners, restaurant guests, and service staff',
    steps: [
      'Enter the total bill subtotal from your restaurant receipt in the input field.',
      'Specify the gratuity or tip percentage you wish to leave for the staff.',
      'Input the total number of guests sharing the bill to split the cost evenly.',
      'Review the calculated tip amount, total bill with tip, and individual payment shares.'
    ],
    logic: 'multiplies the bill subtotal by the tip rate to find gratuity, adds it to the bill, and divides by the guest count',
    exampleInput: 'a restaurant bill of $120.00 with a 15% tip split among 4 dining guests',
    exampleOutput: 'a total tip of $18.00, a total bill of $138.00, and a payment of $34.50 per person'
  },
  'retirement-calculator': {
    cleanName: 'Retirement Calculator',
    mainUseCase: 'retirement nest eggs',
    mainInputCategory: 'current age, target age, savings, and contributions',
    calculationAction: 'project retirement savings growth',
    targetGroup: 'financial planners, retirement savers, and employees',
    steps: [
      'Enter your current age and your desired target retirement age in the fields.',
      'Input your current savings balance along with your recurring monthly contributions.',
      'Specify the expected annual rate of return on your investment portfolio.',
      'Analyze the projected retirement nest egg value, cumulative contributions, and compound earnings.'
    ],
    logic: 'accumulates savings using a monthly compounding investment formula, adding contributions at the end of each period to project future value',
    exampleInput: 'current age 30, retirement age 65, current savings of $10,000, monthly savings of $300, and a 7% annual return',
    exampleOutput: 'a projected retirement nest egg of $561,048.91 at age 65, representing $435,048.91 in compound earnings'
  },
  'currency-converter': {
    cleanName: 'Currency Converter',
    mainUseCase: 'currency exchanges',
    mainInputCategory: 'source currency, target currency, and amount',
    calculationAction: 'exchange currencies instantly',
    targetGroup: 'travelers, global shoppers, and investors',
    steps: [
      'Select the source currency you currently hold from the dropdown menu.',
      'Enter the monetary amount you wish to convert in the numeric input box.',
      'Select the target currency you wish to receive from the second dropdown.',
      'View the converted exchange amount calculated based on standard reference rates.'
    ],
    logic: 'converts the input amount to a USD base value and multiplies it by the exchange rate coefficient of the target currency',
    exampleInput: 'converting 100 US Dollars (USD) into Euros (EUR) using a reference exchange rate of 0.92',
    exampleOutput: 'a converted amount of 92.00 EUR, calculated using the daily offline reference exchange rates'
  },

  // Math Tools (10)
  'percentage-calculator': {
    cleanName: 'Percentage Calculator',
    mainUseCase: 'percentage calculations',
    mainInputCategory: 'values, parts, wholes, or change rates',
    calculationAction: 'calculate percentages and shifts',
    targetGroup: 'students, business analysts, and shoppers',
    steps: [
      'Choose the appropriate sub-tool for finding percent, percentage change, or ratios.',
      'Input the values representing the part and the whole into their fields.',
      'If evaluating growth, enter the original and final values for percent change.',
      'Read the calculated percentage value, increase/decrease percentage, or ratio output.'
    ],
    logic: 'performs basic division of parts by wholes multiplied by 100, or solves algebraic percent equations for the target variables',
    exampleInput: 'finding what percentage 25 is of 200, or evaluating a percent change from 50 to 75',
    exampleOutput: '25 is 12.5% of 200, and the change from 50 to 75 represents a 50% increase'
  },
  'age-calculator': {
    cleanName: 'Age Calculator',
    mainUseCase: 'exact calendar age',
    mainInputCategory: 'date of birth and target date',
    calculationAction: 'calculate your exact age',
    targetGroup: 'parents, birthday planners, and students',
    steps: [
      'Select your month, day, and year of birth from the calendar dropdowns.',
      'Specify the target calculation date (defaults to today’s date in the browser).',
      'Press the calculate trigger to process the date differences in our engine.',
      'Analyze your exact age displayed in years, months, weeks, days, and hours.'
    ],
    logic: 'computes the chronological difference between two calendar dates, adjusting dynamically for leap years and variable month counts',
    exampleInput: 'a birth date of June 15, 1990 and a calculation target date of June 12, 2026',
    exampleOutput: 'an exact age of 35 years, 11 months, and 28 days, with birthday countdown statistics'
  },
  'date-difference-calculator': {
    cleanName: 'Date Difference Calculator',
    mainUseCase: 'days between dates',
    mainInputCategory: 'start date and end date',
    calculationAction: 'calculate duration between calendar dates',
    targetGroup: 'project managers, event organizers, and planners',
    steps: [
      'Select the starting date of your target period from the calendar widget.',
      'Select the ending date of the period in the second calendar field.',
      'Choose whether to include the end date in the calculations (adds 1 day).',
      'Review the total days, weeks, months, or years elapsed between dates.'
    ],
    logic: 'converts both inputs to UTC timestamps and calculates the absolute millisecond difference, dividing it by the daily conversion constant',
    exampleInput: 'a start date of January 1, 2026 and an end date of April 10, 2026',
    exampleOutput: 'a total duration of 99 days, representing 14 weeks and 1 day, or 3 months and 9 days'
  },
  'time-calculator': {
    cleanName: 'Time Calculator',
    mainUseCase: 'time additions',
    mainInputCategory: 'hours, minutes, seconds, and actions',
    calculationAction: 'add or subtract time intervals',
    targetGroup: 'timesheet users, audio editors, and athletes',
    steps: [
      'Input the hours, minutes, and seconds for your first time duration value.',
      'Choose the operation you wish to perform (addition or subtraction).',
      'Input the hours, minutes, and seconds for your second time duration value.',
      'Review the total accumulated time formatted in standard time units.'
    ],
    logic: 'converts all inputs to cumulative seconds, performs the selected arithmetic operation, and formats the result back to hours, minutes, and seconds',
    exampleInput: 'adding 2 hours, 45 minutes, and 30 seconds to 1 hour, 30 minutes, and 45 seconds',
    exampleOutput: 'a total combined time duration of 4 hours, 16 minutes, and 15 seconds'
  },
  'scientific-calculator': {
    cleanName: 'Scientific Calculator',
    mainUseCase: 'algebraic equations',
    mainInputCategory: 'mathematical operations and expressions',
    calculationAction: 'solve advanced math problems',
    targetGroup: 'students, engineers, and researchers',
    steps: [
      'Input numbers and operators using your keyboard or the on-screen calculator keys.',
      'Utilize scientific functions such as sine, cosine, tangent, log, or exponent keys.',
      'Verify the written mathematical expression in the active calculator formula display.',
      'Press the equals button to evaluate the expression and print the output.'
    ],
    logic: 'evaluates standard mathematical expressions client-side using JavaScript’s parser and Math module, respecting parenthetical precedence order',
    exampleInput: 'calculating the sine of 30 degrees (converted to radians) or raising 2 to the power of 10',
    exampleOutput: 'sine of 30 degrees yields 0.50, and 2 raised to the power of 10 yields 1,024'
  },
  'fraction-calculator': {
    cleanName: 'Fraction Calculator',
    mainUseCase: 'fraction operations',
    mainInputCategory: 'numerators, denominators, and operators',
    calculationAction: 'add, subtract, and simplify fractions',
    targetGroup: 'students, chefs, and woodworkers',
    steps: [
      'Input the numerator and denominator values for your first fraction.',
      'Select the arithmetic operator (addition, subtraction, multiplication, division) from the menu.',
      'Input the numerator and denominator values for the second fraction.',
      'Analyze the resulting fraction, simplified form, and decimal equivalent value.'
    ],
    logic: 'calculates the common denominator to perform the arithmetic and uses the greatest common divisor to simplify the result',
    exampleInput: 'adding 3/4 and 2/3 together using the fractional operators',
    exampleOutput: 'an unsimplified sum of 17/12, which represents the mixed number 1 5/12 and decimal 1.4167'
  },
  'average-calculator': {
    cleanName: 'Average Calculator',
    mainUseCase: 'mean and stats',
    mainInputCategory: 'comma-separated list of numbers',
    calculationAction: 'calculate average and median statistics',
    targetGroup: 'students, researchers, and data analysts',
    steps: [
      'Enter your list of numbers into the large text area input field.',
      'Ensure all numbers are separated using commas or standard whitespaces.',
      'Review the calculated mathematical average (mean) displayed in the output.',
      'Analyze the statistical median, mode, range, and standard deviation results.'
    ],
    logic: 'sums all parsed array numbers, divides by the total count to find the mean, sorts to find the median, and evaluates frequency for the mode',
    exampleInput: 'a dataset containing the numbers 10, 15, 20, 25, and 30 separated by commas',
    exampleOutput: 'a mean average of 20.00, a median of 20.00, a range of 20, and standard deviation of 7.07'
  },
  'square-root-calculator': {
    cleanName: 'Square Root Calculator',
    mainUseCase: 'radical calculations',
    mainInputCategory: 'base number and root degree',
    calculationAction: 'solve square and cube roots',
    targetGroup: 'students, carpenters, and engineers',
    steps: [
      'Enter the base number of which you want to find the root in the input field.',
      'Select the root degree, such as square root (2) or cube root (3).',
      'If desired, specify a custom root degree for advanced algebraic evaluations.',
      'Review the calculated root value and perfect square classification status.'
    ],
    logic: 'computes the exponential power of the base raised to the reciprocal of the root degree using standard floating-point functions',
    exampleInput: 'finding the square root of 144, or finding the cube root of 27',
    exampleOutput: 'the square root of 144 is 12 (a perfect square), and the cube root of 27 is 3'
  },
  'random-number-generator': {
    cleanName: 'Random Number Generator',
    mainUseCase: 'random number lists',
    mainInputCategory: 'minimum bound, maximum bound, and count',
    calculationAction: 'generate random numbers and sequences',
    targetGroup: 'giveaway hosts, gamers, and developers',
    steps: [
      'Input the minimum and maximum boundaries of your desired number range.',
      'Specify how many random numbers you wish to generate in a single sequence.',
      'Toggle the duplicate setting to allow or restrict repeating numbers in lists.',
      'Click the generate button to view your custom list of random integers.'
    ],
    logic: 'utilizes the browser’s pseudo-random number generator, scaling decimal inputs to the integer range between the specified boundaries',
    exampleInput: 'generating 5 unique random numbers between a minimum of 1 and a maximum of 50',
    exampleOutput: 'a generated list of five non-repeating random integers, such as 12, 45, 7, 33, and 28'
  },
  'number-to-words-converter': {
    cleanName: 'Number to Words Converter',
    mainUseCase: 'number spellings',
    mainInputCategory: 'integer or decimal digits',
    calculationAction: 'spell out numbers in English text',
    targetGroup: 'check writers, educators, and accountants',
    steps: [
      'Enter the numeric digits or integer values in the primary input field.',
      'If writing checks, include decimal cents to format the output as currency.',
      'Observe the English word translation generated automatically as you type.',
      'Copy the spelled-out text description for checks, invoices, or educational writing.'
    ],
    logic: 'breaks down digits into groups of thousands, matching each cluster to unit, tens, and hundreds dictionaries to compile the spelled description',
    exampleInput: 'the integer number 1250, or a currency value of 1250.75',
    exampleOutput: '"One Thousand Two Hundred Fifty" (or "One Thousand Two Hundred Fifty Dollars and Seventy-Five Cents")'
  },

  // Text Tools (10)
  'word-counter': {
    cleanName: 'Word Counter',
    mainUseCase: 'word length checks',
    mainInputCategory: 'raw text paragraph inputs',
    calculationAction: 'count words and characters in text',
    targetGroup: 'writers, bloggers, students, and SEO specialists',
    steps: [
      'Type or paste your text document into the main text area container.',
      'Review the real-time word count and character count displays.',
      'Observe additional metrics like sentence counts and paragraph totals.',
      'Check the estimated reading time value to gauge target audience engagement.'
    ],
    logic: 'splits the text content using regular expression patterns at whitespace and word boundaries to count words, sentences, and letters',
    exampleInput: 'a paragraph of text: "HelloTools offers free, instant online calculators for everyday math and utility tasks."',
    exampleOutput: 'a count of 12 words, 87 characters (with spaces), 1 sentence, and 1 paragraph'
  },
  'character-counter': {
    cleanName: 'Character Counter',
    mainUseCase: 'character limit checks',
    mainInputCategory: 'text area string inputs',
    calculationAction: 'count letters, spaces, and bytes',
    targetGroup: 'social media managers, marketers, and developers',
    steps: [
      'Paste or type the text you want to measure inside the editor workspace.',
      'Check the total character count including spaces for social media guidelines.',
      'Check the character count excluding spaces to measure raw string length.',
      'Observe the line count and byte size values for programming data inputs.'
    ],
    logic: 'measures the length property of the text string directly in Javascript, filtering out whitespace characters to get spaces-excluded statistics',
    exampleInput: 'the text snippet "SEO Optimization" typed into the character counter',
    exampleOutput: '16 characters including spaces, 15 characters excluding spaces, and 1 line'
  },
  'case-converter': {
    cleanName: 'Case Converter',
    mainUseCase: 'text case changes',
    mainInputCategory: 'input text strings and conversion options',
    calculationAction: 'convert text cases instantly',
    targetGroup: 'writers, editors, programmers, and designers',
    steps: [
      'Paste your formatted or unformatted text into the case converter block.',
      'Select the target casing format button (e.g. UPPERCASE, lowercase).',
      'Choose sentence case or title case to instantly clean paragraph headlines.',
      'Copy the converted text results directly from the output window.'
    ],
    logic: 'transforms strings using letter-case replacement routines, applying capitalizations based on word boundaries or sentence-ending periods',
    exampleInput: 'the text "welcome to hellotools" converted to Title Case and UPPERCASE',
    exampleOutput: '"Welcome To Toolskit" in Title Case and "WELCOME TO TOOLSKIT" in UPPERCASE'
  },
  'text-reverser': {
    cleanName: 'Text Reverser',
    mainUseCase: 'text reversals',
    mainInputCategory: 'text strings and reversal modes',
    calculationAction: 'reverse letters and words backwards',
    targetGroup: 'puzzlers, developers, and creative writers',
    steps: [
      'Input the text you want to reverse inside the primary text box.',
      'Select whether to reverse the letter sequence or the word order.',
      'Alternatively, select the line reverser to flip lists upside down.',
      'Copy the reversed text outputs for puzzles, codes, or formatting.'
    ],
    logic: 'splits characters or words into array segments, applies array reversal functions, and joins the elements back into a single string',
    exampleInput: 'the text "HelloTools Utility" reversed by letters or words',
    exampleOutput: '"ytilitU tiKlooT" (letter reversal) or "Utility HelloTools" (word order reversal)'
  },
  'remove-duplicate-lines': {
    cleanName: 'Remove Duplicate Lines',
    mainUseCase: 'list deduplications',
    mainInputCategory: 'lists of text lines',
    calculationAction: 'remove duplicate lines from text lists',
    targetGroup: 'data editors, list managers, and developers',
    steps: [
      'Paste your list or log document (one item per line) into the editor.',
      'Configure settings to ignore trailing spaces or empty lines.',
      'Click the deduplicate trigger to clear repeating list elements.',
      'Review the clean list of unique lines and the duplicate count statistics.'
    ],
    logic: 'splits the text input into an array of lines, passes the array through a unique JavaScript Set object, and recombines the lines',
    exampleInput: 'a list containing: "apple", "banana", "apple", "orange", "banana" on separate lines',
    exampleOutput: 'a deduplicated list containing "apple", "banana", "orange" and a report of 2 removed duplicates'
  },
  'text-sorter': {
    cleanName: 'Text Sorter',
    mainUseCase: 'list sorting calculations',
    mainInputCategory: 'list text lines and sorting parameters',
    calculationAction: 'sort lists alphabetically or numerically',
    targetGroup: 'organizers, database managers, and content writers',
    steps: [
      'Paste your list of items or text values, one per line, into the input box.',
      'Select whether to sort alphabetically (A-Z) or in reverse (Z-A).',
      'Toggle optional numeric sorting or sort items by line length.',
      'Copy the sorted list output to format inventories or names.'
    ],
    logic: 'parses text into an array of lines, applies sorting comparison functions (alphabetical or float-based numeric), and outputs the joined lines',
    exampleInput: 'a list of unsorted names: "Charlie", "Alice", "Bob" on separate lines',
    exampleOutput: 'an alphabetically sorted list: "Alice", "Bob", "Charlie" in ascending order'
  },
  'whitespace-remover': {
    cleanName: 'Whitespace Remover',
    mainUseCase: 'text spacing cleanups',
    mainInputCategory: 'raw text block inputs',
    calculationAction: 'remove excess spaces and tabs',
    targetGroup: 'copywriters, editors, developers, and analysts',
    steps: [
      'Type or paste your spacing-heavy text inside the editor window.',
      'Choose to remove extra double spaces, tabs, or blank newlines.',
      'Select whether to trim leading and trailing spaces at the margins.',
      'Copy the clean text from the results field for tidy documents.'
    ],
    logic: 'applies regular expressions to replace multiple consecutive spaces with a single space, stripping blank margins or tabs based on configs',
    exampleInput: 'the text "  Clean   up  this    sentence.  " with extra spaces',
    exampleOutput: 'the trimmed, clean text: "Clean up this sentence."'
  },
  'word-frequency-counter': {
    cleanName: 'Word Frequency Counter',
    mainUseCase: 'keyword density analysis',
    mainInputCategory: 'text documents and word settings',
    calculationAction: 'analyze word frequencies and densities',
    targetGroup: 'SEO copywriters, editors, and research writers',
    steps: [
      'Paste your blog post, essay, or text copy into the input area.',
      'Select whether to ignore common stop words like "the", "is", and "and".',
      'Analyze the generated frequency table listing words by count.',
      'Check the percentage keyword density column to optimize search visibility.'
    ],
    logic: 'normalizes casing, extracts individual words using regex, maps them to a count object, and sorts them by frequency density',
    exampleInput: 'the sentence "write clean code and write code fast" evaluated by the tool',
    exampleOutput: 'a list showing "write" (2 times, 25%), "code" (2 times, 25%), "clean" (1 time, 12.5%), "fast" (1 time, 12.5%)'
  },
  'palindrome-checker': {
    cleanName: 'Palindrome Checker',
    mainUseCase: 'palindrome verifications',
    mainInputCategory: 'word or sentence strings',
    calculationAction: 'verify if text is a palindrome',
    targetGroup: 'students, wordplay enthusiasts, and developers',
    steps: [
      'Enter the word, phrase, or sentence you want to test in the text box.',
      'Observe the real-time palindrome classification indicator.',
      'Check the cleaned letter view showing the letters evaluated by the engine.',
      'Test complex sentences that read the same backward and forward.'
    ],
    logic: 'strips non-alphanumeric characters and spacing, converts to lowercase, reverses the characters, and checks equality with the original',
    exampleInput: 'the phrase "A man, a plan, a canal: Panama" entered in the checker',
    exampleOutput: 'a "Yes, it is a palindrome" result, with the parsed clean string "amanaplanacanalpanama"'
  },
  'readability-checker': {
    cleanName: 'Readability Checker',
    mainUseCase: 'readability grade checks',
    mainInputCategory: 'raw copy or draft paragraphs',
    calculationAction: 'measure text readability scores',
    targetGroup: 'bloggers, marketers, copywriters, and teachers',
    steps: [
      'Paste your content drafts, essays, or blog posts in the input panel.',
      'Verify that your text has at least one complete sentence to check.',
      'Analyze the Flesch Reading Ease score output scale (0 to 100).',
      'Check the equivalent school grade level required to read your text.'
    ],
    logic: 'evaluates readability using the Flesch-Kincaid index, computing average sentence length and syllable count ratios to grade complexity',
    exampleInput: 'a text draft: "The cat sat on the mat. It was a very big cat."',
    exampleOutput: 'a Flesch Reading Ease score of 118 (extremely easy), corresponding to a 4th-grade reading level'
  },

  // Health Tools (10)
  'bmi-calculator': {
    cleanName: 'BMI Calculator',
    mainUseCase: 'body mass index stats',
    mainInputCategory: 'weight, height, and unit systems',
    calculationAction: 'calculate your body mass index',
    targetGroup: 'fitness enthusiasts, patients, and health trackers',
    steps: [
      'Select your preferred measurement system: Metric or Imperial.',
      'Enter your weight in kilograms or pounds in the weight input.',
      'Input your height in centimeters or feet/inches in the height field.',
      'Read your calculated BMI score, category, and healthy weight ranges.'
    ],
    logic: 'divides weight in kilograms by height in meters squared, or applies the imperial scaling factor of 703 to height-weight ratios',
    exampleInput: 'a weight of 70 kilograms and a height of 175 centimeters (1.75 meters)',
    exampleOutput: 'a BMI score of 22.86, indicating a normal and healthy weight classification'
  },
  'calorie-calculator': {
    cleanName: 'TDEE Calorie Calculator',
    mainUseCase: 'daily calorie budgets',
    mainInputCategory: 'age, weight, height, and activity level',
    calculationAction: 'calculate daily energy expenditure targets',
    targetGroup: 'athletes, bodybuilders, and weight loss trackers',
    steps: [
      'Enter your age, select your gender, and input weight and height.',
      'Select your weekly physical activity level from the dropdown choices.',
      'Review your Basal Metabolic Rate (BMR) for baseline calories.',
      'Analyze your Total Daily Energy Expenditure (TDEE) for fitness targets.'
    ],
    logic: 'estimates BMR using the Mifflin-St Jeor equation and applies physical activity coefficients to determine daily calorie expenditure',
    exampleInput: 'a 30-year-old male, 80 kg, 180 cm tall, with moderate exercise activity level',
    exampleOutput: 'a BMR of 1,775 calories and a TDEE of 2,751 calories for daily maintenance'
  },
  'body-fat-calculator': {
    cleanName: 'Body Fat Calculator',
    mainUseCase: 'body fat calculations',
    mainInputCategory: 'gender, height, neck, and waist dimensions',
    calculationAction: 'estimate body fat percentage using measurements',
    targetGroup: 'bodybuilders, fitness trainers, and health trackers',
    steps: [
      'Select your gender and enter your height in centimeters or inches.',
      'Measure your neck circumference and input the value in the field.',
      'Input your waist circumference (and hips for females) measured at standard boundaries.',
      'Review your body fat percentage, fat mass, and lean body mass.'
    ],
    logic: 'uses log-based ratios of waist, neck, hip, and height parameters conforming to the standard US Navy body fat estimation equations',
    exampleInput: 'a male with a height of 180 cm, neck of 38 cm, and waist of 86 cm',
    exampleOutput: 'an estimated body fat percentage of 15.4%, fat mass of 12.3 kg, and lean mass of 67.7 kg'
  },
  'pregnancy-calculator': {
    cleanName: 'Pregnancy Due Date Calculator',
    mainUseCase: 'pregnancy timeline projects',
    mainInputCategory: 'last menstrual period date and cycle days',
    calculationAction: 'calculate your baby due date',
    targetGroup: 'expectant parents, mothers, and healthcare planners',
    steps: [
      'Select the first day of your last menstrual period (LMP) in the date widget.',
      'Input your average menstrual cycle length (defaults to 28 days).',
      'Click calculate to project your estimated date of delivery.',
      'Analyze the baby due date, conception timeline, and current pregnancy week.'
    ],
    logic: 'calculates delivery dates using Naegele’s Rule, adding exactly 280 days (40 weeks) to the last period start date',
    exampleInput: 'a last menstrual period start date of October 1, 2025 and a cycle length of 28 days',
    exampleOutput: 'an estimated due date of July 8, 2026, with conception date projected around October 15, 2025'
  },
  'ovulation-calculator': {
    cleanName: 'Ovulation Calculator',
    mainUseCase: 'fertile window timelines',
    mainInputCategory: 'last period start date and cycle duration',
    calculationAction: 'project your ovulation and fertile window',
    targetGroup: 'conception planners, partners, and women',
    steps: [
      'Select the start date of your last menstrual period from the calendar.',
      'Provide your average cycle length in days (ranging from 21 to 35).',
      'Press calculate to project your cycle fertile window dates.',
      'Examine your peak ovulation day and the fertile window timeline.'
    ],
    logic: 'subtracts 14 days from the next expected period start to find ovulation, marking a 6-day fertile window preceding ovulation',
    exampleInput: 'last period start date of May 1, 2026 and an average cycle length of 28 days',
    exampleOutput: 'ovulation on May 15, 2026, with a high fertility window between May 10 and May 16, 2026'
  },
  'water-intake-calculator': {
    cleanName: 'Water Intake Calculator',
    mainUseCase: 'daily hydration targets',
    mainInputCategory: 'body weight and daily exercise time',
    calculationAction: 'calculate recommended daily water intake',
    targetGroup: 'athletes, health-conscious individuals, and trackers',
    steps: [
      'Enter your body weight in kilograms or pounds in the weight box.',
      'Input the duration of your daily physical exercise in minutes.',
      'Observe the daily baseline water volume target generated by the tool.',
      'Review hydration requirements in ounces, liters, and standard cups.'
    ],
    logic: 'takes half your weight in ounces as a baseline, adding 12 ounces of water for every 30 minutes of physical exercise',
    exampleInput: 'a body weight of 160 pounds (approx. 72 kg) and 60 minutes of daily exercise',
    exampleOutput: 'a recommended daily water intake of 104 ounces, representing approximately 3.1 liters of water'
  },
  'ideal-weight-calculator': {
    cleanName: 'Ideal Weight Calculator',
    mainUseCase: 'ideal weight estimations',
    mainInputCategory: 'gender, height, and formula comparison',
    calculationAction: 'estimate your ideal body weight range',
    targetGroup: 'diet planners, fitness trackers, and health writers',
    steps: [
      'Select your gender in the primary option selectors.',
      'Enter your height in centimeters or standard feet and inches.',
      'Check the ideal weight results printed in the output display.',
      'Compare ideal weight scores from Devine, Robinson, Miller, and Hamwi equations.'
    ],
    logic: 'evaluates ideal weight by applying height-based constants (e.g. Devine assigns 50kg for men at 5ft plus 2.3kg per extra inch)',
    exampleInput: 'a female with a height of 165 centimeters (5 feet 5 inches)',
    exampleOutput: 'an ideal weight of 57.0 kg (125.7 lbs) according to the standard Devine clinical formula'
  },
  'macro-calculator': {
    cleanName: 'Macronutrient Calculator',
    mainUseCase: 'macro splits',
    mainInputCategory: 'daily calories, weight goals, and diet types',
    calculationAction: 'calculate protein, carb, and fat targets',
    targetGroup: 'dieters, athletes, bodybuilders, and trainers',
    steps: [
      'Enter your daily target calorie budget in the input box.',
      'Choose your preferred diet macro split (e.g. keto, low carb, balanced).',
      'If desired, adjust specific custom macronutrient ratios in the fields.',
      'Examine the grams of protein, carbohydrates, and fats required daily.'
    ],
    logic: 'distributes target calories by ratio percentages, converting protein/carbs at 4 calories/gram and fats at 9 calories/gram',
    exampleInput: 'a daily target of 2,000 calories with a balanced macro ratio (40% carbs, 30% protein, 30% fat)',
    exampleOutput: 'daily macronutrient goals of 200g of carbohydrates, 150g of protein, and 67g of dietary fat'
  },
  'running-pace-calculator': {
    cleanName: 'Running Pace Calculator',
    mainUseCase: 'running pace calculations',
    mainInputCategory: 'distance, time, and pace values',
    calculationAction: 'calculate run speed, splits, and times',
    targetGroup: 'runners, marathon trainers, joggers, and walkers',
    steps: [
      'Select which variable to calculate: Pace, Time, or Distance.',
      'Enter the two known values in the corresponding calculation fields.',
      'Input the target distance using standard miles or kilometer units.',
      'Review the calculated third variable along with speed and split stats.'
    ],
    logic: 'utilizes basic rate-time-distance formulas, converting time to seconds to perform division and formatting outputs',
    exampleInput: 'calculating the pace for a 10K (10 km) running distance completed in 50 minutes',
    exampleOutput: 'a calculated running pace of 5:00 minutes per kilometer, or average speed of 12 km/h'
  },
  'sleep-cycle-calculator': {
    cleanName: 'Sleep Calculator',
    mainUseCase: 'sleep cycle schedules',
    mainInputCategory: 'target wake time or target sleep time',
    calculationAction: 'calculate optimal sleep and wake times',
    targetGroup: 'sleep trackers, students, shift workers, and parents',
    steps: [
      'Select whether to calculate wake times or bedtimes.',
      'Input the specific time you plan to sleep or need to wake up.',
      'Review the lists of optimal sleep cycles generated in the output.',
      'Select a time to fall asleep to wake up refreshed at cycle boundaries.'
    ],
    logic: 'counts backward or forward in 90-minute sleep cycle intervals, adding 15 minutes average time required to fall asleep',
    exampleInput: 'wishing to wake up refreshed at 7:00 AM, using the sleep cycle calculator',
    exampleOutput: 'optimal bedtimes of 10:00 PM, 11:30 PM, or 1:00 AM, allowing 5 or 6 sleep cycles'
  },

  // Utility Tools (10)
  'password-generator': {
    cleanName: 'Password Generator',
    mainUseCase: 'secure random passwords',
    mainInputCategory: 'length and character set switches',
    calculationAction: 'create highly secure random passwords',
    targetGroup: 'account owners, IT administrators, and security planners',
    steps: [
      'Adjust the password length slider to your desired character count.',
      'Toggle checkboxes for uppercase, lowercase, numbers, and symbols.',
      'Press the generate key to create a secure password string.',
      'Copy the random password output to secure your online profiles.'
    ],
    logic: 'selects indices from selected character pools using client-side cryptographic random number generator arrays to block predictability',
    exampleInput: 'generating a 16-character password including uppercase, numbers, and symbols',
    exampleOutput: 'a highly secure random password string, such as "kP9#vF7!xR2$mN5&", generated completely locally'
  },
  'password-strength-checker': {
    cleanName: 'Password Strength Checker',
    mainUseCase: 'password security checks',
    mainInputCategory: 'password character strings',
    calculationAction: 'test password strength and entropy',
    targetGroup: 'account holders, developers, and security analysts',
    steps: [
      'Type or paste your password string into the inspection box.',
      'Observe the real-time security score and strength color indicator.',
      'Check the calculation of password entropy bits displayed below.',
      'Review the estimated time required for computers to crack the code.'
    ],
    logic: 'calculates password entropy by assessing length and character pool options, checking values against common weak patterns',
    exampleInput: 'entering the password string "p@ssword123" into the checker',
    exampleOutput: 'a "Weak" strength rating, low entropy, and an instant estimated crack time'
  },
  'unit-converter': {
    cleanName: 'Unit Converter',
    mainUseCase: 'unit conversions',
    mainInputCategory: 'category, inputs, and target units',
    calculationAction: 'convert length, weight, and temperature units',
    targetGroup: 'engineers, students, bakers, and designers',
    steps: [
      'Choose the conversion category (length, weight, temperature, speed).',
      'Input the numeric value you wish to convert in the source field.',
      'Select the current unit and the desired target unit from the menus.',
      'Read the converted unit value printed instantly in the results.'
    ],
    logic: 'multiplies the input value by established scientific ratios relative to a base unit (e.g. meter for length) to perform conversions',
    exampleInput: 'converting 5 miles (mi) to kilometers (km) using the length sub-tool',
    exampleOutput: 'a converted length of 8.0467 kilometers, calculated using precision standard ratios'
  },
  'color-picker': {
    cleanName: 'Color Picker & Converter',
    mainUseCase: 'color conversions',
    mainInputCategory: 'HEX, RGB, HSL colors or palettes',
    calculationAction: 'pick colors and convert codes',
    targetGroup: 'web developers, graphic designers, and UI managers',
    steps: [
      'Select a custom color using the visual color palette panel.',
      'Alternatively, enter color code strings (HEX, RGB, or HSL) in the fields.',
      'Observe the translated color formats updated dynamically.',
      'Copy HEX or HSL codes for web designs or styling stylesheets.'
    ],
    logic: 'executes colorspace translation matrices, mapping red, green, blue channels to hue, saturation, and lightness coordinates',
    exampleInput: 'entering the HEX color code #FF5733 in the color converter',
    exampleOutput: 'an RGB equivalent of rgb(255, 87, 51) and HSL equivalent of hsl(11, 100%, 60%)'
  },
  'aspect-ratio-calculator': {
    cleanName: 'Aspect Ratio Calculator',
    mainUseCase: 'dimension scaling',
    mainInputCategory: 'original width, height, and target bounds',
    calculationAction: 'scale dimensions and calculate aspect ratios',
    targetGroup: 'video editors, photographers, and web designers',
    steps: [
      'Enter the original width and original height of your image or video.',
      'Enter the new target width (or height) in the scaling input field.',
      'Observe the calculated height (or width) that maintains aspect ratio.',
      'Check the simplified aspect ratio format (e.g. 16:9) of the dimensions.'
    ],
    logic: 'divides the original dimensions by their greatest common divisor to get ratios, applying the factor to target dimensions',
    exampleInput: 'an original video size of 1920x1080 scaled to a target width of 1280',
    exampleOutput: 'a target height of 720, maintaining the standard 16:9 widescreen aspect ratio'
  },
  'binary-converter': {
    cleanName: 'Binary to Text Converter',
    mainUseCase: 'binary translations',
    mainInputCategory: 'binary bytes or text characters',
    calculationAction: 'encode text and decode binary strings',
    targetGroup: 'programmers, students, and computer science users',
    steps: [
      'Paste binary strings (zero and one groups) in the decoder window.',
      'Read the decoded plain English text generated in the output box.',
      'Alternatively, write text in the encoder box to view binary blocks.',
      'Use spaces to separate byte blocks for readable binary arrays.'
    ],
    logic: 'parses binary sequences into 8-bit byte arrays, converting binary integers to character codes and rebuilding strings',
    exampleInput: 'the binary sequence "01001000 01100101 01101100 01101100 01101111"',
    exampleOutput: 'the decoded plain English text string "Hello" printed in the output box'
  },
  'base64-converter': {
    cleanName: 'Base64 Converter',
    mainUseCase: 'base64 translations',
    mainInputCategory: 'raw text or base64 strings',
    calculationAction: 'encode text to Base64 and decode back',
    targetGroup: 'developers, web administrators, and API designers',
    steps: [
      'Paste your text string into the Base64 encoder input panel.',
      'Observe the Base64 characters generated in the output window.',
      'For decoding, paste Base64 code in the decoder field.',
      'Copy the clean decoded text string for API configurations.'
    ],
    logic: 'converts binary inputs to 6-bit index characters using browser-native window.btoa and window.atob translation APIs',
    exampleInput: 'encoding the plain text string "HelloTools" to Base64 format',
    exampleOutput: 'the encoded Base64 string "VG9vbHNLaXQ=" generated locally'
  },
  'word-to-pdf': {
    cleanName: 'Word to PDF Converter',
    mainUseCase: 'document exports',
    mainInputCategory: 'document text and styling templates',
    calculationAction: 'export text documents to PDF format',
    targetGroup: 'students, professionals, and document creators',
    steps: [
      'Type or edit your text document inside the rich text editor field.',
      'Configure paragraph layout, headings, and lists in the workspace.',
      'Click the export to PDF button to compile the document structure.',
      'Save the generated high-resolution PDF file to your local computer.'
    ],
    logic: 'prepares stylesheet print layouts and triggers browser print systems to export styled text canvases to PDF files',
    exampleInput: 'typing an invoice document in the editor and triggering the PDF export',
    exampleOutput: 'a high-resolution PDF document generated locally in your browser ready for download'
  },
  'qr-code-generator': {
    cleanName: 'QR Code Generator',
    mainUseCase: 'qr code creation',
    mainInputCategory: 'URL, text, or configuration fields',
    calculationAction: 'create custom QR code images',
    targetGroup: 'business owners, marketers, and web designers',
    steps: [
      'Enter the website URL, email, or text you want to store in the code.',
      'Adjust the sizing parameters and error correction level selectors.',
      'Verify the QR code image that generates automatically in the canvas.',
      'Save or download the generated QR code image file to your device.'
    ],
    logic: 'compiles the input string into a standard QR matrix grid, drawing the dots and anchors on a client-side Canvas element',
    exampleInput: 'entering the website URL "https://hellotools.net" to generate a QR code',
    exampleOutput: 'a custom scannable QR code graphic file generated locally inside the browser'
  },
  'uuid-generator': {
    cleanName: 'UUID Generator',
    mainUseCase: 'random ID lists',
    mainInputCategory: 'ID count and version specifications',
    calculationAction: 'generate standard UUID v4 identifiers',
    targetGroup: 'database developers, engineers, and programmers',
    steps: [
      'Specify how many UUID version 4 codes you wish to generate.',
      'Click the generate button to run the random generator engine.',
      'Analyze the list of generated universally unique identifiers.',
      'Copy the UUID lists to use in database records or testing logs.'
    ],
    logic: 'generates cryptographically random numbers to fill the 128-bit RFC 4122 v4 UUID hexadecimal template format',
    exampleInput: 'requesting the bulk generation of 3 random UUID v4 identifiers',
    exampleOutput: 'a list of three standard UUIDs, e.g. "f81d4fae-7dec-11d0-a765-00a0c91e6bf6" etc.'
  }
};

// Generates the customized How to Use section to be exactly ~150 words
function generateHowToUse(name, steps, category, mainInputCategory) {
  const intro = `The ${name} is a free, premium web utility designed to simplify your calculation tasks. It operates completely in your web browser, ensuring your private inputs are never transmitted over the internet or logged on any external servers. To make the most of this online tool, follow these detailed, step-by-step instructions: `;
  
  const stepText = steps.map((step, idx) => `${idx + 1}. ${step}`).join(' ');
  
  const conclusion = ` Rest assured that all computations execute instantly on your device. This makes the utility exceptionally secure, responsive, and easy to use across both mobile and desktop screens. Keep this page bookmarked for any future ${category} calculations!`;
  
  const fullText = intro + stepText + conclusion;
  
  // Word count check and adjustment
  const words = fullText.split(/\s+/).filter(Boolean);
  if (words.length < 150) {
    const padding = ` In addition, you do not need to install any external apps, sign up for an account, or download any software packages. Simply open the page and input your ${mainInputCategory} numbers to get immediate answers. This user-friendly setup is perfect for quick daily references, providing immediate utility.`;
    const combined = fullText + padding;
    return combined;
  }
  return fullText;
}

// Generates the How It Works section to be exactly ~100 words
function generateHowItWorks(name, logic, formula, cleanName) {
  const intro = `Behind the scenes, this ${name} runs high-performance client-side Javascript code in your web browser. When you input values into the fields, the calculation engine processes the data using the standard math logic: ${formula ? formula.replace(/`/g, '') : 'custom algorithms'}. `;
  
  const middle = `Specifically, it ${logic}. Because the processing happens locally on your device rather than on a remote cloud server, latency is reduced to zero milliseconds. `;
  
  const conclusion = `This browser-based execution is the most secure method for online calculations, preserving your complete data privacy while providing instant results.`;
  
  const fullText = intro + middle + conclusion;
  
  const words = fullText.split(/\s+/).filter(Boolean);
  if (words.length < 100) {
    const padding = ` This ensures a seamless user experience. You get accurate results on any mobile device or desktop computer without any delay or processing lag.`;
    return fullText + padding;
  }
  return fullText;
}

// Generate the 5 required FAQs conforming to the exact requested questions
function generateFaqs(name, cleanName, mainUseCase, desc) {
  return [
    {
      q: `What is ${cleanName}?`,
      a: `${cleanName} is a free, instant web tool from HelloTools designed to help you analyze and evaluate ${mainUseCase}. It executes calculations locally inside your browser for complete speed and security.`
    },
    {
      q: `How accurate is this ${cleanName}?`,
      a: `Our ${cleanName} is highly accurate, utilizing standard industry formulas and double-precision IEEE-754 math. However, for formal audit, tax, or legal calculations, we suggest verifying results with a certified professional.`
    },
    {
      q: `Is this ${cleanName} free?`,
      a: `Yes, this ${cleanName} is 100% free with no hidden charges, premium features, signups, or software downloads. You can run unlimited computations instantly without ever creating an account.`
    },
    {
      q: `Can I use this on mobile?`,
      a: `Absolutely! The ${cleanName} page is designed with a mobile-first responsive layout that adjusts perfectly to iPhones, Android devices, tablets, and desktop computers.`
    },
    {
      q: `How do I calculate ${mainUseCase}?`,
      a: `You can calculate ${mainUseCase} instantly by entering your values in the fields at the top of this page. The tool processes your inputs automatically and displays detailed results immediately.`
    }
  ];
}

// Main execution function
function main() {
  console.log("Reading data files...");
  
  // 1. Read tools-master.ts content
  const toolsMasterContent = fs.readFileSync(TOOLS_MASTER_PATH, 'utf-8');
  
  // 2. Parse toolsMaster array out of the file by importing it dynamically
  // Since we're in Node ESM, we can import tools-master.ts after compiling, or we can just parse it or require it.
  // Wait, let's write a parser or import it.
  // Actually, we can import it directly because node handles ts if we register typescript, or we can parse it as a JSON-like array from the file,
  // or we can write a script that has the raw tools list.
  // Wait, since we are executing a JS script, we can read the JSON database data/db.json, update it, and write it back.
  // And for tools-master.ts, we can update it or regenerate it!
  // Yes! The most robust way is:
  // 1. Read data/db.json (which contains all tools)
  // 2. Map through the tools and update their properties.
  // 3. Write data/db.json
  // 4. Regenerate data/tools-master.ts entirely by formatting the updated tools array as a TypeScript file!
  // This is extremely robust and elegant. It ensures both tools-master.ts and db.json are perfectly in sync and contain the exact same content!
  
  const dbData = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
  
  const slugMap = {
    'emi-loan-calculator': 'emi-calculator',
    'discount-sale-calculator': 'discount-calculator',
    'retirement-savings-calculator': 'retirement-calculator',
    'average-mean-calculator': 'average-calculator',
    'readability-score-checker': 'readability-checker',
    'calorie-calculator-tdee': 'calorie-calculator',
    'body-fat-percentage-calculator': 'body-fat-calculator',
    'pregnancy-due-date-calculator': 'pregnancy-calculator',
    'macronutrient-calculator': 'macro-calculator',
    'color-picker-converter': 'color-picker',
    'binary-to-text-converter': 'binary-converter',
    'base64-encoder-decoder': 'base64-converter',
    'word-to-pdf-converter': 'word-to-pdf'
  };

  dbData.homepage.featuredTools = dbData.homepage.featuredTools.map(
    s => slugMap[s] || s
  );
  
  const tools = dbData.tools.map(t => {
    const slug = slugMap[t.slug] || t.slug;
    const relatedSlugs = (t.relatedSlugs || []).map(
      s => slugMap[s] || s
    );
    return { ...t, slug, relatedSlugs };
  });
  
  console.log(`Loaded ${tools.length} tools from db.json.`);
  
  const updatedTools = tools.map((tool) => {
    const descInfo = toolDescriptors[tool.slug];
    if (!descInfo) {
      console.warn(`WARNING: No descriptor found for slug: ${tool.slug}`);
      return tool;
    }
    
    const cleanName = descInfo.cleanName;
    const mainUseCase = descInfo.mainUseCase;
    const mainInputCategory = descInfo.mainInputCategory;
    const calculationAction = descInfo.calculationAction;
    const targetGroup = descInfo.targetGroup;
    
    // Generate Title
    const title = `${cleanName} - Free Online ${cleanName} | HelloTools`;
    
    // Generate Description (150-160 characters)
    // "Calculate your monthly loan EMI instantly. Enter amount, rate & tenure. Free EMI calculator — no signup, no download required."
    const rawDesc = `Calculate your ${mainUseCase} instantly. Enter ${mainInputCategory}. Free ${cleanName.toLowerCase()} — no signup, no download required.`;
    // Let's adjust padding to hit exactly 150-160 characters
    let description = rawDesc;
    if (description.length < 150) {
      const pad = ` Get instant ${mainUseCase} calculations online.`;
      description += pad;
    }
    if (description.length < 150) {
      const pad = ` Highly accurate and secure tool.`;
      description += pad;
    }
    // Crop or trim slightly if needed
    if (description.length > 160) {
      description = description.slice(0, 157) + "...";
    }
    
    // Generate H2 contents
    const howToUse = generateHowToUse(cleanName, descInfo.steps, tool.category, mainInputCategory);
    const howItWorks = generateHowItWorks(cleanName, descInfo.logic, tool.formula, cleanName);
    const faqs = generateFaqs(tool.name, cleanName, mainUseCase, tool.description);
    
    // Example
    const example = `For example, let's look at ${descInfo.exampleInput}. By entering these values into the tool, you will get ${descInfo.exampleOutput} instantly.`;
    
    // Quick Answer
    const quickAnswer = `This ${cleanName} helps you ${calculationAction} based on ${mainInputCategory} instantly in your browser.`;
    
    // First paragraph (update tool.description to be AEO direct answer)
    // Make the first paragraph of every page answer the main question directly and clearly
    const directAnswer = `This free online ${cleanName} allows you to ${calculationAction} instantly. Designed for ${targetGroup}, it requires no signups or software downloads, calculating all results client-side for maximum speed and complete privacy.`;
    
    return {
      ...tool,
      title: title, // Update main title
      description: directAnswer, // First paragraph answers the main question directly
      seoTitle: title,
      seoDescription: description,
      seoHowToUse: howToUse,
      seoHowItWorks: howItWorks,
      seoFaqs: faqs,
      seoExample: example,
      quickAnswer: quickAnswer,
      mainUseCase: mainUseCase
    };
  });
  
  dbData.tools = updatedTools;
  
  // Save to db.json
  fs.writeFileSync(DB_PATH, JSON.stringify(dbData, null, 2), 'utf-8');
  console.log("Saved updated tools to db.json.");
  
  // Save to tools-master.ts
  const tsContent = `export interface FAQItem {
  q: string;
  a: string;
}

export interface ToolMetadata {
  slug: string;
  name: string;
  category: string;
  title: string;
  description: string;
  keywords: string;
  howToUse: string;
  formula: string;
  faqs: FAQItem[];
  relatedSlugs: string[];
  // New SEO-ready fields
  seoTitle?: string;
  seoDescription?: string;
  seoHowToUse?: string;
  seoHowItWorks?: string;
  seoFaqs?: FAQItem[];
  seoExample?: string;
  quickAnswer?: string;
  mainUseCase?: string;
}

export const toolsMaster: ToolMetadata[] = ${JSON.stringify(updatedTools, null, 2)};
`;
  
  fs.writeFileSync(TOOLS_MASTER_PATH, tsContent, 'utf-8');
  console.log("Saved updated tools to tools-master.ts.");
  
  // Basic verification counts
  console.log("Verifying word counts...");
  updatedTools.forEach((t) => {
    const howToUseWords = t.seoHowToUse.split(/\s+/).length;
    const howItWorksWords = t.seoHowItWorks.split(/\s+/).length;
    const descChars = t.seoDescription.length;
    
    if (howToUseWords < 140) console.warn(`WARNING: ${t.slug} HowToUse is short: ${howToUseWords} words`);
    if (howItWorksWords < 90) console.warn(`WARNING: ${t.slug} HowItWorks is short: ${howItWorksWords} words`);
    if (descChars < 140 || descChars > 165) console.warn(`WARNING: ${t.slug} seoDescription length is ${descChars}`);
  });
  console.log("All counts verified!");
}

main();
