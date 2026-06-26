# HelloTools Pro Next.js - Premium Precision Utilities

HelloTools Pro is a modern, high-performance, and visually stunning multi-tool website built with Next.js 14 (App Router) and Tailwind CSS v4. It features 50 fully functional interactive browser-run utility tools, Google AdSense placeholders, dynamic breadcrumbs, a dynamically managed blog, and a secure Admin API.

All configuration metadata, homepage settings, and blog posts are persisted via a local JSON file database, making it 100% serverless and ready for zero-latency deployment on platforms like Vercel.

---

## 🚀 Key Features

1. **50 Interactive Client-Side Tools**:
   - **Finance (10)**: EMI/Loan, Compound Interest, Simple Interest, Mortgage, Salary, Tax, Discount, Tip, Retirement Savings, and Currency Converter.
   - **Math & Time (10)**: Percentage, Age, Date Difference, Time Duration, Scientific Calculator, Fraction, Average/Mean, Square Root, Random Number Generator, and Number-to-Words.
   - **Text Utilities (10)**: Word Counter, Character Counter, Case Converter, Text Reverser, Remove Duplicate Lines, Text Sorter, Whitespace Remover, Word Frequency, Palindrome Checker, and Readability Score.
   - **Health & Fitness (10)**: BMI, TDEE Calorie, Body Fat %, Pregnancy Due Date, Ovulation, Water Intake, Ideal Weight, Macronutrients, Running Pace, and Sleep Cycle.
   - **Developer & Utility (10)**: Password Generator, Password Strength, Unit Converter, Color Picker, Aspect Ratio, Binary to Text, Base64 Encoder/Decoder, Word to PDF, QR Code Generator, and UUID Generator.
2. **Harmonious Visual Theme**: Curated Dark Navy and Orange accents supporting Dark Mode by default, with a sliding switch theme toggle in the header.
3. **Seeded Local JSON Database**: Fully managed via `lib/db.ts` and saved at `data/db.json`. Seeds automatically on first execution.
4. **Dynamic Metadata & SEO**: Optimizes meta tags dynamically via `generateMetadata()` based on database configurations. Custom `sitemap.xml` and `robots.txt` generation.
5. **Secure Admin APIs**: Protected by `x-api-key` validation (via headers) to update SEO configurations, homepage hero content, and manage blog posts.

---

## 🛠️ Tech Stack

- **Core**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4, PostCSS
- **Icons**: Lucide React
- **Database**: Local file-based JSON DB (`data/db.json`)

---

## 💻 Getting Started

### 1. Installation

Install project dependencies:
```bash
npm install
```

### 2. Configure Environment Variables

Copy the environment template:
```bash
cp .env.example .env
```

And configure:
- `ADMIN_API_KEY`: Secret string required for Admin APIs (default: `default_secret_key_123`).
- `NEXT_PUBLIC_SITE_URL`: Domain URL of the deployed application for generating sitemap links.

### 3. Run Development Server

```bash
npm run dev
```
Navigate to `http://localhost:3000` to inspect.

### 4. Build for Production

```bash
npm run build
npm run start
```

---

## 🔒 Admin API Endpoints

All endpoints require the `x-api-key` header matching the environment's `ADMIN_API_KEY`.

| Method | Endpoint | Description | Payload Example |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/admin/update-tool-meta` | Updates a tool's title, description, or keywords. | `{ "slug": "emi-loan-calculator", "title": "New Title", "keywords": "new, key" }` |
| **POST** | `/api/admin/update-tool-content` | Updates a tool's instructions, formula, or FAQs. | `{ "slug": "emi-loan-calculator", "howToUse": "New guide", "faqs": [...] }` |
| **POST** | `/api/admin/add-blog-post` | Publishes a new blog article. | `{ "title": "Guide Title", "content": "<p>Content</p>", "readingTime": "5 min" }` |
| **DELETE** | `/api/admin/delete-blog-post` | Deletes a blog post by slug. | Query param `?slug=slug-to-delete` or JSON body. |
| **POST** | `/api/admin/update-homepage-content` | Edits hero headings and featured tools array. | `{ "heroHeadline": "Welcome", "featuredTools": ["bmi-calculator"] }` |
| **GET** | `/api/admin/seo-report` | Audits meta sizes and outputs health flags. | Returns JSON report of all pages. |
