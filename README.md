# NextRole AI — GenAI Career Advancement & Multi-Agent Prep System 🚀
> **College Project Edition** — A self-contained, 100% working, zero-Docker implementation of the NextRole multi-agent career copilot architecture.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-2.5%20Flash-4285F4?logo=google&logoColor=white)](https://aistudio.google.com)
[![Live on Vercel](https://img.shields.io/badge/Live%20Demo-Vercel-black?logo=vercel&logoColor=white)](https://ai-resume-tau-orcin.vercel.app)

> 🌐 **Live Production URL:** **[https://ai-resume-tau-orcin.vercel.app](https://ai-resume-tau-orcin.vercel.app)**


---

## 🌟 Overview

**NextRole AI** is an intelligent, multi-agent career acceleration platform that solves the modern job application challenge. Traditional resume builders and ATS scanners either lack context or fail to prepare candidates for live interview loops. 

NextRole AI orchestrates a pipeline of specialized AI subagents to transform a raw resume and job description into:
1. **📊 Hiring Recon & ATS Match Analysis:** 0–100% ATS score, keyword gap analysis, and competency breakdowns.
2. **📄 Tailored Resume Builder:** Metric-driven bullet rewrites, side-by-side original vs. tailored diff, and one-click PDF export.
3. **🎯 STAR Interview Prep Guide:** Behavioral, technical, situational, and leadership interview questions with full Situation-Task-Action-Result breakdowns.
4. **⚡ Day-of Battlecard Cheat Sheet:** 60-second elevator pitch, value pillars, story hooks, smart questions to ask interviewers, and sticky situation defusers.
5. **🎙️ Interactive Mock Interview Simulator:** AI hiring manager that evaluates your verbal/written responses in real time and rates your STAR adherence on a 1–10 scale.

---

## 🏗️ Multi-Agent Architecture

```
                      +-----------------------------+
                      |   NextRole Orchestrator     |
                      +--------------+--------------+
                                     |
       +-----------------------------+-----------------------------+
       |                             |                             |
+------v-------+              +------v-------+              +------v-------+
| Document     |              | Hiring Recon |              | Resume Tailor|
| Intake Agent |              |    Agent     |              |    Agent     |
+--------------+              +--------------+              +--------------+
       |                             |                             |
       +-----------------------------+-----------------------------+
                                     |
       +-----------------------------+-----------------------------+
       |                                                           |
+------v-------+                                            +------v-------+
|  Interview   |                                            |  Battlecard  |
|  Coach Agent |                                            |  Generator   |
+--------------+                                            +--------------+
```

### 🧠 Dual-Intelligence Engine
- **Live Google Gemini API:** Direct connection to `gemini-2.5-flash` or `gemini-1.5-pro` for dynamic generative inference.
- **Built-in Intelligent Heuristics Engine:** Operates automatically when offline or without an API key, calculating real keyword overlaps, injecting metric-driven bullet points, and scoring responses. **Guaranteed zero crashes during college evaluations and live vivas.**

---

## ⚡ Quick Start (Run in Seconds)

### 1. Requirements
- Node.js `v18+` or `v20+`
- `pnpm` or `npm`

### 2. Install Dependencies
```bash
# Using pnpm (recommended)
pnpm install

# OR using npm
npm install
```

### 3. Run the Development Server
```bash
# Using pnpm
pnpm run dev

# OR using npm
npm run dev
```

Open your browser at:
👉 **`http://localhost:5173/`**

---

## 🎓 College Viva & Demo Guide

When presenting this project to your professor or examiner:

1. **Launch the Application:** Open `http://localhost:5173`.
2. **Click `💯 100% ATS Web Standard`:** Located in the top navigation bar. This instantly loads the verified 100/100 ATS benchmark profile (Alex Morgan) targeting a Senior Full-Stack role at HyperScale AI, fulfilling all web ATS standards (Workday, Jobscan, Taleo).
3. **Demonstrate Stage 1 (ATS & Recon):** Show the 100% ATS match gauge, the breakdown between skills, experience, and education, and the verified matched keyword chips with zero gaps. You can also click **⚡ Optimize to 100% ATS** on any custom resume!
4. **Demonstrate Stage 2 (Tailored Resume & PDF Export):** 
   - Click the **Tailored Resume** tab.
   - Toggle between *Tailored Version* and *Original*.
   - Point out the highlighted metric additions (e.g. *35% latency reduction*, *98/100 Lighthouse score*).
   - Click **Export PDF** to generate an official PDF resume.
5. **Demonstrate Stage 3 (STAR Interview Prep):**
   - Click the **STAR Prep Guide** tab.
   - Expand the questions and explain the **Situation, Task, Action, and Result** breakdown.
   - Check off questions to show the live progress bar.
6. **Demonstrate Stage 4 (Day-of Battlecard):** Show the 60-second elevator pitch, value pillars, questions to ask interviewers, and download the 1-page PDF.
7. **Demonstrate Stage 5 (Mock Interview Simulator):** 
   - Type a response into the simulator.
   - Click **Score My Response** to show real-time STAR scoring (out of 10), component detection, and actionable feedback.

---

## 🛠️ Tech Stack & Libraries

- **Framework:** React 19 + TypeScript
- **Bundler:** Vite 8
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Document Export:** jsPDF + html2canvas
- **AI Integration:** Google Gemini API (`@google/genai` & REST)

---

## 📄 License
MIT License. Built for academic and open demonstration.
