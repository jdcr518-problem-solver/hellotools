Here's the complete corrected implementation plan:

---

```markdown
# Implementation Plan - Grade Calculator (Corrected & Complete)
**Project:** HelloTools
**Component:** GradeCalculator
**Slug:** grade-calculator

---

## 🎯 Target Goal
Add a high-performance, client-side Grade Calculator with three modes:
1. Weighted Grade Calculator
2. Simple Point-Based Calculator
3. Final Exam Goal Calculator

---

## 🛠️ Part 1 — Component Specification

### File: components/tools/GradeCalculator.tsx

---

### 1A. Grading Scales

Implement two built-in scales plus a custom editor.

**Standard Scale:**
| Grade | Range |
|-------|-------|
| A | ≥ 90% |
| B | ≥ 80% |
| C | ≥ 70% |
| D | ≥ 60% |
| F | < 60% |

**Plus/Minus Scale:**
| Grade | Range |
|-------|-------|
| A+ | 97–100% |
| A | 93–96.9% |
| A- | 90–92.9% |
| B+ | 87–89.9% |
| B | 83–86.9% |
| B- | 80–82.9% |
| C+ | 77–79.9% |
| C | 73–76.9% |
| C- | 70–72.9% |
| D+ | 67–69.9% |
| D | 63–66.9% |
| D- | 60–62.9% |
| F | < 60% |

**Custom Scale Editor:**
- Collapsible panel below the scale toggle
- User can edit the minimum threshold for each letter grade
- Validation rules (enforce all of these before allowing calculation):
  - No threshold field can be left blank
  - Thresholds must be in strictly descending order
    (A+ min > A min > A- min > B+ min ... and so on)
  - If order is violated, show inline error:
    "Thresholds must decrease from top to bottom"
  - All values must be between 0 and 100
  - F threshold is always fixed at 0 and is not editable

---

### 1B. Tab 1 — Weighted Grade Calculator

**Row fields:** Category Name (text), Grade (number 0–100), Weight (number 0–100)

**Add/Remove rows:**
- Start with 2 empty rows on load
- "Add category" button adds a new row below
- Each row has a remove (×) button
- Minimum 1 row must remain (disable remove button when only 1 row exists)

**Input validation (run before every calculation):**
- At least 1 row must exist
- Every Grade field must be a number between 0 and 100
- Every Weight field must be a number greater than 0
- If any field is empty or invalid, show error:
  "Please fill in all grade and weight fields with valid numbers."
- If total weight sum is 0, show error:
  "Total weight cannot be zero."

**Calculation:**
```
overallGrade = sum(Grade_i × Weight_i) / sum(Weight_i)
```

If weights do not sum to 100%, normalize automatically using
the formula above (dividing by actual sum not by 100).

After calculation, show a notification below the result:
- If weights sum to exactly 100%: show nothing
- If weights do not sum to 100%: show note in muted text:
  "Your weights added up to [X]% — result has been
  normalized automatically."

This notification must be visible and clearly readable,
not hidden or shown only in console.

---

### 1C. Tab 2 — Point-Based Calculator

**Row fields:** Assignment Name (text), Points Earned (number ≥ 0),
Max Points (number > 0)

**Add/Remove rows:**
- Start with 2 empty rows on load
- "Add assignment" button adds a new row
- Minimum 1 row must remain

**Input validation (run before every calculation):**
- At least 1 row must exist
- Points Earned must be a number ≥ 0
- Max Points must be a number > 0 (not zero, not negative)
- Points Earned cannot exceed Max Points — if it does,
  show inline row warning: "Points earned exceeds max points"
  (do not block calculation for this, just warn)
- If any required field is empty or invalid, show error:
  "Please fill in all fields. Max points must be greater than zero."

**Calculation:**
```
overallGrade = (sum(PointsEarned_i) / sum(MaxPoints_i)) × 100
```

---

### 1D. Tab 3 — Final Exam Goal Calculator

**Fields:**
- Current Grade (%) — number input, 0–100
- Target Grade (%) — number input, 0–100
- Final Exam Weight (%) — number input, 1–100

**Input validation (run before every calculation):**
- All three fields must be filled
- Current Grade must be between 0 and 100
- Target Grade must be between 0 and 100
- Final Exam Weight must be between 1 and 100
  (cannot be 0 — this causes division by zero)
- If Final Exam Weight is 0 or empty, show error:
  "Final exam weight must be between 1 and 100."

**Calculation:**
```
requiredScore = (TargetGrade - CurrentGrade × (1 - FinalWeight/100))
                / (FinalWeight/100)
```

**Result rendering — three outcomes, all must be handled:**

Outcome 1 — requiredScore > 100:
- Show result card with label: "Not achievable"
- Show the calculated score (e.g. "110.00% needed")
- Show explanation: "Even a perfect score on the final
  won't reach your target grade. Consider speaking with
  your instructor about extra credit options."
- Use danger/red styling

Outcome 2 — requiredScore < 0:
- Show result card with label: "Already secured!"
- Show message: "You've already locked in your target grade
  even if you score 0% on the final."
- Use success/green styling

Outcome 3 — requiredScore between 0 and 100 (inclusive):
- Show the required score prominently
- Show label: "score needed on your final exam to reach [target]%"
- Color coding:
  - ≥ 80% needed → neutral styling
  - 60–79% needed → warning/amber styling
  - < 60% needed → success/green styling (easy target)

---

### 1E. Result Display (All Tabs)

Show a result card below the Calculate button containing:
- Large letter grade (A, B+, C-, etc.)
- Percentage to 2 decimal places (e.g. 87.43%)
- Color coding:
  - ≥ 80% → accent/blue styling
  - 70–79% → warning/amber styling
  - < 70% → danger/red styling
- Any normalization note (weighted tab only)

Result card must be hidden on initial load and on tab switch.
Re-run calculation does not require page reload.

---

### 1F. Mobile Layout

On screens narrower than 640px:

Weighted tab row layout changes from:
[Name | Grade | Weight | ×] (4 columns)

To:
[Name field full width]
[Grade field | Weight field | ×] (3 columns second row)

Points tab row layout changes from:
[Name | Earned | Max | ×] (4 columns)

To:
[Name field full width]
[Earned field | Max field | ×] (3 columns second row)

Final Exam tab changes from:
[CurrentGrade | TargetGrade | FinalWeight] (3 columns)

To:
[CurrentGrade]
[TargetGrade]
[FinalWeight]
(stacked single column)

Implement using CSS media query at 640px breakpoint or
Tailwind responsive prefixes (sm:).

---

## 🛠️ Part 2 — Registry & Routing

### File: components/tools/registry.tsx

Add the following import and registry entry:

```typescript
import GradeCalculator from './GradeCalculator';

// Inside the registry map:
'grade-calculator': GradeCalculator,
```

---

## 🛠️ Part 3 — db.json Entry

Add the following complete metadata object to db.json:

```json
{
  "slug": "grade-calculator",
  "name": "Grade Calculator",
  "category": "Education",
  "description": "Calculate your overall grade instantly using
    weighted categories, total points, or find out exactly what
    score you need on your final exam to hit your target grade.
    No signup required.",
  "shortDescription": "Free grade calculator for weighted grades,
    points, and final exam goals.",

  "seo": {
    "title": "Free Grade Calculator — Weighted, Points & Final Exam | HelloTools",
    "metaDescription": "Calculate your grade by weighted categories,
      total points earned, or find out what you need on your final exam.
      Free, instant, no signup needed.",
    "h1": "Grade Calculator",
    "focusKeyword": "grade calculator",
    "secondaryKeywords": [
      "weighted grade calculator",
      "final exam grade calculator",
      "point based grade calculator",
      "what do I need on my final exam",
      "how to calculate my grade"
    ]
  },

  "toolIntroduction": "Whether you're tracking your GPA mid-semester
    or figuring out if you can skip the final, this free grade
    calculator does the math instantly. Students use the weighted
    mode to combine homework, quizzes, and exam scores by their
    syllabus weights. The points mode totals up raw scores across
    assignments. And the final exam goal mode tells you exactly
    what score you need — including if it's already out of reach
    — so you can plan realistically. Works for high school, college,
    and university courses using standard or plus/minus grading scales.",

  "howToUse": [
    "Select the tab that matches how your course is graded —
      Weighted, Points, or Final Exam Goal.",
    "Enter your category or assignment names along with the
      corresponding grades or points.",
    "For weighted mode, enter each category's weight percentage
      as listed on your syllabus.",
    "Click Calculate Grade to see your overall percentage and
      letter grade instantly.",
    "Switch the grading scale between Standard and Plus/Minus
      to match your institution's system."
  ],

  "faqs": [
    {
      "question": "How does a weighted grade calculator work?",
      "answer": "A weighted grade calculator multiplies each category's
        grade by its weight, sums those products, then divides by the
        total weight. For example, if Homework is worth 30% and you
        scored 90%, and Exams are worth 70% and you scored 80%, your
        overall grade is (90×30 + 80×70) / 100 = 83%. This reflects
        how your professor actually calculates your final grade."
    },
    {
      "question": "What if my weights don't add up to 100%?",
      "answer": "That's fine — our calculator normalizes your weights
        automatically. If you enter weights that sum to 60%, the tool
        divides by 60 instead of 100, giving you an accurate weighted
        average based on the categories you've entered. A note will
        appear below your result explaining this."
    },
    {
      "question": "How do I calculate what I need on my final exam?",
      "answer": "Enter your current overall grade, the grade you want
        to finish the course with, and what percentage of your final
        grade the exam is worth. The calculator uses the formula:
        Required Score = (Target − Current × (1 − Weight/100)) ÷
        (Weight/100). If the result is above 100%, the target isn't
        mathematically achievable with the current numbers."
    },
    {
      "question": "What is the difference between standard and
        plus/minus grading?",
      "answer": "Standard grading assigns letter grades in whole
        steps: A is 90–100%, B is 80–89%, and so on. Plus/minus
        grading adds finer distinctions — for example a B+ covers
        87–89.9% while a B covers 83–86.9% and a B- covers 80–82.9%.
        Most US colleges and universities use plus/minus grading,
        while many high schools use the standard scale."
    }
  ],

  "formulas": [
    {
      "name": "Weighted Grade",
      "formula": "Overall = Σ(Grade × Weight) / Σ(Weight)",
      "description": "Calculates overall grade from weighted categories.
        Weights are normalized if they do not sum to 100%."
    },
    {
      "name": "Point-Based Grade",
      "formula": "Overall = (Σ Points Earned / Σ Max Points) × 100",
      "description": "Calculates overall percentage from raw points
        across all assignments."
    },
    {
      "name": "Final Exam Requirement",
      "formula": "Required = (Target − Current × (1 − Weight/100))
        / (Weight/100)",
      "description": "Calculates the minimum final exam score needed
        to reach a target course grade."
    }
  ],

  "schema": {
    "webApplication": {
      "@type": "WebApplication",
      "name": "Grade Calculator",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "Free online grade calculator with weighted
        grades, point-based grading, and final exam goal calculation."
    },
    "breadcrumb": [
      { "name": "Home", "url": "/" },
      { "name": "Education Tools", "url": "/category/education" },
      { "name": "Grade Calculator", "url": "/tools/grade-calculator" }
    ]
  }
}
```

---

## 📐 Part 4 — Formulas & Math Logic (Reference)

### A. Weighted Grade
```
Overall = Σ(Grade_i × Weight_i) / Σ(Weight_i)
```
Normalize using actual weight sum, not 100.
Guard: if Σ(Weight_i) = 0, block calculation and show error.

### B. Point-Based Grade
```
Overall (%) = (Σ PointsEarned_i / Σ MaxPoints_i) × 100
```
Guard: if Σ(MaxPoints_i) = 0, block calculation and show error.

### C. Final Exam Requirement
```
Required = (TargetGrade − CurrentGrade × (1 − FinalWeight/100))
           / (FinalWeight/100)
```
Guard: if FinalWeight = 0, block calculation and show error.
Handle result > 100 and result < 0 as separate UI outcomes.

---

## 🧪 Part 5 — Verification Plan

Run ALL of the following tests before marking complete.

### Weighted Tab Tests
| Test | Input | Expected Output |
|------|-------|-----------------|
| Basic weighted | Homework 100%/50w, Midterm 80%/50w | 90.00% (A) |
| Normalized weights | Category A 90%/30w, Category B 70%/30w | 80.00% (B) + normalization note |
| Single row | One category 75%/100w | 75.00% (C) |
| All zeros | Grade 0%, Weight 0% | Error: weight cannot be zero |
| Empty fields | Fields left blank | Error: fill in all fields |

### Points Tab Tests
| Test | Input | Expected Output |
|------|-------|-----------------|
| Basic points | 45/50 + 40/50 | 85.00% (B) |
| Single assignment | 92/100 | 92.00% (A) |
| Max points = 0 | Earned 10, Max 0 | Error: max points > zero |
| Perfect score | 100/100 + 100/100 | 100.00% (A+) on plus/minus scale |
| Zero earned | 0/50 + 0/50 | 0.00% (F) |

### Final Exam Tab Tests
| Test | Input | Expected Output |
|------|-------|-----------------|
| Normal case | Current 85%, Target 90%, Weight 20% | 110.00% — Not achievable |
| Achievable case | Current 80%, Target 85%, Weight 40% | 92.50% needed |
| Already secured | Current 95%, Target 80%, Weight 20% | Already secured — 0% needed |
| Weight = 0 | Any values, Weight 0% | Error: weight must be 1–100 |
| Borderline | Current 79%, Target 80%, Weight 100% | 80.00% needed |

### Scale Tests
| Test | Input | Expected Output |
|------|-------|-----------------|
| Plus/minus A+ | 97.5% | A+ |
| Plus/minus B- | 80.1% | B- |
| Standard A | 91% | A (not A-) |
| Custom scale | Set A = ≥ 85%, calculate 87% | A |
| Custom invalid | Set A min > B min violated | Error shown, calculation blocked |

### Mobile Layout Tests
- Test at 375px width (iPhone SE)
- Weighted rows must stack to 2-line layout
- No horizontal overflow on any tab
- All buttons must be tappable (minimum 44px height)

---

## ✅ Part 6 — Definition of Done

Mark this task complete only when ALL of the following are true:

- [ ] npm run build passes with zero TypeScript errors
- [ ] All verification plan tests pass
- [ ] No NaN or undefined appears in any result output
- [ ] Division by zero is handled in all three tabs
- [ ] Final exam shows correct UI for all three outcomes
- [ ] Normalization note appears when weights ≠ 100%
- [ ] Mobile layout verified at 375px with no overflow
- [ ] Custom scale editor validates threshold order
- [ ] db.json entry is complete with all SEO fields filled
- [ ] Schema markup is present on the tool page
- [ ] Tool is accessible via /tools/grade-calculator route
- [ ] Result card resets on tab switch
```

---

