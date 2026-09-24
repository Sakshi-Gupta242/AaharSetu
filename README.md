# AAHARSETU (आहारसेतु)
### *“Safer Food. Smarter Communities.”*
**Inclusive Food Safety & Community Assistance Platform**

[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF.svg?style=flat&logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB.svg?style=flat&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6.svg?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC.svg?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Python FastAPI](https://img.shields.io/badge/FastAPI-0.109-009688.svg?style=flat&logo=fastapi)](https://fastapi.tiangolo.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 1. Project Overview
**AaharSetu** is an independent, community-focused food safety prototype designed to bridge the gap between everyday consumers and small street food vendors. It empowers consumers to report and understand food safety observations (spoilage, adulteration, hygiene lapses) with real-time NLP classification, while equipping micro-vendors and food stalls with a practical 10-point self-assessment tool and low-cost improvement roadmaps (starting from ₹300).

> **Important Positioning:**
> *“AaharSetu is an independent student prototype exploring how AI, NLP, information retrieval and data analytics can support food-safety awareness, complaint understanding and practical hygiene improvement.”*
> *(This is an educational prototype and NOT an official FSSAI system, regulatory inspection mechanism, or compliance certification).*

---

## 2. Problem Statement
1. **Consumer Ambiguity:** Everyday consumers frequently encounter spoiled packaged goods, unhygienic street stalls, or suspected adulteration, but lack immediate guidance on risk severity, acute danger signs (e.g., botulism risk in bloated cans/tetrapacks), and proper evidence preservation.
2. **Vendor Economic Hurdles:** Over 10 million informal street vendors in India operate on micro-budgets without access to affordable, structured hygiene education. Generic commercial standards demand expensive equipment rather than practical low-cost interventions.
3. **Lack of Grounded, Trustworthy Advice:** Online information is often fragmented, overly clinical, or detached from practical street-level realities.

---

## 3. Why AaharSetu?
- **Dual-Stakeholder Architecture:** Unites consumer reporting with constructive vendor empowerment rather than punitive barriers.
- **Bilingual & Inclusive:** Complete, natural English and Hindi (`हिन्दी`) interfaces tailored for diverse community members.
- **Micro-Budget Practicality:** Generates realistic ₹300 - ₹2000 hygiene upgrade kits with practical tips for street vendors.
- **Source-Grounded Assistant:** Grounded directly in public standards (WHO Five Keys to Safer Food, Codex Alimentarius CXC 43-1997) with open citations.
- **Zero-Dependency Resilience:** Uses deterministic NLP and local storage abstractions so that full functionality works instantly offline or without paid API keys.

---

## 4. Key Features

| Module | Core Capabilities |
| :--- | :--- |
| **Consumer Incident Reporter** | 8-category rule-based & NLP auto-classification, risk factor detection, prototype priority assessment (Low/Medium/High), printable incident summary. |
| **Vendor Stall Self-Check** | 10-point interactive hygiene audit with instant scoring, grade calculation (A/B/C/Critical), and specific gap identification. |
| **Low-Cost Stall Planner** | Micro-budget upgrade planner (₹300, ₹500, ₹1000, Custom) mapping identified checklist gaps to affordable hygiene equipment. |
| **Food Safety Assistant** | Source-grounded conversational assistant with verified WHO/Codex links and deterministic keyword retrieval. |
| **Analytics Dashboard** | Live synthetic trends, category distribution bar charts, priority breakdown donut charts, and dataset export. |
| **Bilingual Toggle** | Instant EN / हिन्दी switch across navigation, forms, checklists, result cards, and disclaimers. |

---

## 5. Architecture

```mermaid
graph TD
    A[Client Browser: React 18 + TS + Tailwind] --> B[Language Context / i18n Engine]
    A --> C[Client Storage Abstraction / LocalStorage Engine]
    A --> D[Deterministic Rule & NLP Classifier]
    A --> E[Grounded Knowledge Engine / WHO Codex Base]
    
    subgraph Core Workflows
        F[Consumer Concern Reporting] --> D
        D --> G[Prototype Priority & Risk Evaluation]
        G --> H[Printable Incident Summary]
        
        I[Vendor 10-Point Self-Check] --> J[Score & Gap Analysis Engine]
        J --> K[Low-Cost Kit Budget Optimizer]
        
        L[Food Safety Assistant] --> E
        E --> M[Answers with Verified Sources & Links]
    end
    
    subgraph Optional Backend (Python FastAPI)
        N[FastAPI Server :8000] --> O[REST Endpoints /api/classify, /api/vendor-check]
    end
```

---

## 6. Technology Stack
- **Frontend Framework:** React 18.3 (TypeScript) + Vite 6.0
- **Styling & UI:** Tailwind CSS 3.4, Lucide Icons, Plus Jakarta Sans & Noto Sans Devanagari fonts
- **Data Visualization:** Recharts (AreaChart, BarChart, PieChart)
- **Routing:** React Router DOM (HashRouter for bulletproof zero-config SPA deployment)
- **State & Storage:** React Context API + LocalStorage persistence abstraction with seeded demo datasets
- **Backend API (Optional):** Python 3.10+ FastAPI, Pydantic, Uvicorn

---

## 7. Consumer Workflow
1. User enters food name, observation description, optional location, date, and image evidence.
2. User can test instant 1-click demo presets (e.g. *Swollen Packaged Juice*, *Exposed Roadside Food*, *Adulterated Milk*).
3. System runs rule-based NLP classification and outputs:
   - Reference ID (e.g. `AS-2025-4921`)
   - Detected Category (e.g. *Spoilage/Expired Food*)
   - Prototype Priority Assessment (*High Priority*)
   - Acute Risk Factors (e.g. *Anaerobic gas production & botulism risk*)
   - Actionable Next Steps (e.g. *Do not taste, preserve batch code, notify merchant*)
4. User can open and print the clean, styled **Incident Summary Report**.

---

## 8. Vendor Workflow
1. Stall owner opens the **Check My Food Stall** module.
2. Answers 10 straightforward questions (*Yes / No / Not Sure*) covering water, food covers, cross-contamination, waste, and temperature.
3. Receives immediate hygiene score (0–100) and grade.
4. Clicks **Build Low-Cost Plan** to enter their budget (e.g. ₹500).
5. The optimizer selects targeted items (e.g. *Wire mesh domes @ ₹140*, *Handwash pump dispenser @ ₹95*, *Pedal dustbin @ ₹210*) addressing their specific self-assessment gaps.
6. Vendor prints the **Stall Action Checklist** for market procurement.

---

## 9. Complaint Classification Approach
The classification engine employs a weighted multi-keyword and pattern-matching NLP heuristic across 8 standard food-safety categories:
- **Spoilage / Expired Food:** Detects terms like *swollen, bloated, puffed, foul odor, mold, curdled*.
- **Contamination:** Detects biological and physical foreign bodies (*insects, flies, glass, plastic, hair*).
- **Adulteration:** Detects chemical dyes and unauthorized substitutes (*synthetic, neon color, detergent, urea, malachite green*).
- **Packaging:** Identifies hermetic barrier failures (*broken seal, torn pouch, leaking, dented can*).
- **Labelling:** Flags compliance gaps (*missing expiry, blank best before, no FSSAI license number*).
- **Hygiene & Food Premises:** Analyzes food handling and surrounding environmental sanitation (*dirty hands, open drain, garbage proximity*).

Priority is categorized into **High**, **Medium**, or **Low** based on acute hazard severity indices (e.g., infant vulnerability, anaerobic packaging bulges, toxic chemicals).

---

## 10. Knowledge & Retrieval-Augmented Guidance
The Food Safety Assistant uses curated, source-grounded references:
- **WHO Five Keys to Safer Food Manual**
- **Codex Alimentarius Code of Hygienic Practice for Street-Vended Foods (CXC 43-1997)**
- **FAO/WHO Food Safety Technical Risk Guidance**

Every query produces grounded safety advice accompanied by verified source titles, URLs, and safety badges.

---

## 11. Database Design & Models

```typescript
// Core Complaint Entity
interface Complaint {
  id: string;                      // e.g. "AS-2025-0841"
  foodName: string;
  description: string;
  category: CategoryType;
  detectedCategory: CategoryType;
  location: string;
  stallType?: string;
  date: string;
  evidenceUrl?: string;
  detectedRiskFactors: string[];
  prototypePriority: 'Low' | 'Medium' | 'High';
  priorityExplanation: string;
  recommendedActions: string[];
  status: 'Under Review' | 'Flagged for Guidance' | 'Resolved';
  createdAt: string;
}

// Vendor Assessment Entity
interface VendorCheckResult {
  id: string;
  stallName: string;
  location: string;
  score: number;                   // 0 - 100
  grade: string;
  completedPractices: string[];
  areasNeedingAttention: string[];
  priorityImprovements: string[];
}
```

---

## 12. Screenshots Section
*(Place application screenshots and demo GIFs here)*
- `docs/screenshots/01_hero_bilingual.png` — Hero banner & Language Switch
- `docs/screenshots/02_consumer_assessment.png` — Consumer reporting & priority breakdown
- `docs/screenshots/03_vendor_checklist.png` — 10-point vendor hygiene audit
- `docs/screenshots/04_budget_planner.png` — Low-cost stall improvement planner
- `docs/screenshots/05_knowledge_assistant.png` — Source-grounded chat assistant
- `docs/screenshots/06_analytics_dashboard.png` — Synthetic public safety metrics

---

## 13. Local Setup & Quickstart

### Prerequisites
- Node.js 18+ and npm
- (Optional) Python 3.10+ for backend server

### Step 1: Clone Repository
```bash
git clone https://github.com/Sakshi-Gupta242/ANPR-Command-Center.git aaharsetu
cd aaharsetu
```

### Step 2: Install Frontend Dependencies
```bash
npm install
```

### Step 3: Start Frontend Dev Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Step 4 (Optional): Run FastAPI Backend
```bash
cd backend
python -m venv venv
# Windows:
.\venv\Scripts\activate
# Linux/macOS:
# source venv/bin/activate
pip install -r requirements.txt
python main.py
```
Backend API will run on [http://localhost:8000](http://localhost:8000).

---

## 14. Environment Variables
Copy `.env.example` to `.env`:
```env
VITE_APP_TITLE=AaharSetu
VITE_ENABLE_EXTERNAL_API=false
VITE_BACKEND_API_URL=http://localhost:8000
```

---

## 15. Deployment Instructions

### Deploy to Vercel / Netlify / GitHub Pages
1. Build the production bundle:
   ```bash
   npm run build
   ```
2. The output directory is `dist/`.
3. Deploy directly:
   - **Vercel:** `vercel --prod` (Build command: `npm run build`, Output: `dist`)
   - **Netlify:** `netlify deploy --prod --dir=dist`
   - **GitHub Pages:** Push `dist/` to `gh-pages` branch.

---

## 16. Limitations
- **Educational Scope:** AaharSetu is an educational student prototype and does not conduct physical laboratory testing or chemical assays.
- **Self-Assessment Validity:** Vendor check scores rely on self-reported inputs and are intended for self-improvement rather than formal compliance audits.
- **Medical Advice:** The platform provides general hygiene information and explicitly advises users to seek clinical healthcare in cases of acute illness.

---

## 17. Future Scope
- **Offline PWA Support:** Service worker caching for low-connectivity rural and street market environments.
- **Voice-Based Interface:** Vernacular voice input (Hindi, Marathi, Bengali, Tamil) for street vendors with low literacy.
- **Community Vendor Badge:** Verified community-endorsed micro-hygiene badges for street vendors completing progressive upgrades.
- **OCR Packaging Scanner:** Optical Character Recognition for automatic expiration date and ingredient label analysis.

---

## 18. Disclaimer
> **Disclaimer:** AaharSetu is an independent student prototype exploring how AI, NLP, information retrieval, and data analytics can support food-safety awareness, complaint understanding, and practical hygiene improvement.
> 
> AaharSetu is **NOT** an official FSSAI system, has **NO** affiliation with FSSAI, and does not issue legal compliance certificates or regulatory judgments.

---
*Developed for Educational & Social Good Demonstrations.*
