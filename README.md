# Blind Spot AI — Decision Advisor & Cognitive Partner

**Blind Spot AI** is a Decision Intelligence & Risk Analysis Web Application designed to analyze decisions, business ideas, software architectures, and financial plans to uncover hidden assumptions, missing context, and alternative strategic paths before execution.

---

## 🌟 Key Features

* **8-Step Cognitive Pipeline:**
  1. **Goal & Setup Breakdown:** Core Goal, Known Facts, Limits, Unstated Requirements.
  2. **Blind-Spot Engine:** Detects 5 failure dimensions (Missing Info, Hidden Assumptions, Overlooked Risks, Contradictions, Stakeholders).
  3. **What Could Happen (Decision Twin):** Best Case, Most Likely Outcome, Worst Case with real-time Environmental Stress Simulator.
  4. **Risk & Confidence Grid:** 3x3 Impact vs. Likelihood grid with system confidence ratings.
  5. **Tough Questions (Devil's Advocate):** Inversion Test, Assumption Stress Test, Falsification Vector with live interactive user defenses.
  6. **Your 3 Best Steps (Option Matrix):** Option A (Balanced), Option B (Low-Risk Pilot), Option C (High Growth).
  7. **Progress Tracker (Learning Loop):** Key KPIs to watch over time & scheduled review date.
  8. **Export Data (JSON / Print):** Download structured JSON payload or print paper summaries.

* **Senior-Friendly Light UI/UX:** High contrast typography, accessible Text Size Adjuster (Standard / Large / Extra Large), 1-click Print Report feature.
* **Voice Recording Input:** Microhone input integration via Web Speech API for hands-free voice dictation.
* **Document & Draft Upload:** Drag-and-drop document upload (PDF, Word `.docx`, `.txt`, `.md`, `.json`, `.csv`) with instant text extraction.
* **Supabase Cloud Persistence:** Connected to Supabase Cloud Database (`evaluations` table) with Cloud Save & Saved Decision History modal.
* **Google Gemini API Integration:** Powered by live Gemini API inference with offline heuristic fallback.

---

## 🚀 Getting Started

### Prerequisites

* Node.js v18+
* npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/pruthvirajchavan3248-gif/Blind-Sopts-2.git

# Navigate to project directory
cd Blind-Sopts-2

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
```

### Running Locally

```bash
# Start Vite development server
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/) in your browser.

---

## 🛠️ Tech Stack

* **Frontend:** React 19, Vite, TailwindCSS v4
* **Backend / Cloud Database:** Supabase (`@supabase/supabase-js`)
* **AI Engine:** Google Gemini API / Heuristic Cognitive Engine
* **Icons:** Lucide React
