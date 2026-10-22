# AI Resume Studio — GenAI Career Advancement & Multi-Agent Prep System 🚀
> **College Project Edition** — A self-contained, 100% working, multi-agent career studio with ATS optimization and interview preparation.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-2.5%20Flash-4285F4?logo=google&logoColor=white)](https://aistudio.google.com)
[![Live on Vercel](https://img.shields.io/badge/Live%20on-Vercel-black?logo=vercel&logoColor=white)](https://ai-resume-tau-orcin.vercel.app)
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/RohithSV2/AI-Resume)

> 🌐 **Live Production Deployment (Vercel):** **[https://ai-resume-tau-orcin.vercel.app](https://ai-resume-tau-orcin.vercel.app)**  
> 🚀 **One-Click Deploy to Render:** **[Deploy on Render](https://render.com/deploy?repo=https://github.com/RohithSV2/AI-Resume)**

---

## 🌟 Overview

**AI Resume Studio** is an intelligent, multi-agent career acceleration platform that solves the modern job application challenge. Traditional resume builders and ATS scanners either lack context or fail to prepare candidates for live interview loops.

AI Resume Studio orchestrates a pipeline of specialized AI subagents to transform a raw resume and job description into:
1. **📊 Hiring Recon & ATS Match Analysis:** 0–100% ATS score, keyword gap analysis, and competency breakdowns.
2. **📄 Tailored Resume Builder:** Metric-driven bullet rewrites, side-by-side original vs. tailored diff, and one-click PDF export.
3. **🎯 STAR Interview Prep Guide:** Behavioral, technical, situational, and leadership interview questions with full Situation-Task-Action-Result breakdowns.
4. **⚡ Day-of Battlecard Cheat Sheet:** 60-second elevator pitch, value pillars, story hooks, smart questions to ask interviewers, and sticky situation defusers.
5. **🎙️ Interactive Mock Interview Simulator:** AI hiring manager that evaluates your verbal/written responses in real time and rates your STAR adherence on a 1–10 scale.

---

## 🏗️ Multi-Agent Architecture

```
                      +-----------------------------+
                      |       AI Orchestrator       |
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

## ⚡ Deployments

### Option 1: Vercel (Live)
- **URL**: [https://ai-resume-tau-orcin.vercel.app](https://ai-resume-tau-orcin.vercel.app)
- **Configuration**: `vercel.json` included in repository root.

### Option 2: Render
- **1-Click Blueprint Deploy**: Click the [Deploy to Render button](https://render.com/deploy?repo=https://github.com/RohithSV2/AI-Resume) or create a new **Blueprint** on [Render Dashboard](https://dashboard.render.com/) pointing to `https://github.com/RohithSV2/AI-Resume`.
- **Configuration**: `render.yaml` included in repository root (`runtime: static`, `buildCommand: pnpm install && pnpm build`, `staticPublishPath: ./dist`).

---

## ⚡ Quick Start (Local)

### 1. Requirements
- Node.js `v18+` or `v20+`
- `pnpm` or `npm`

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Run Development Server
```bash
pnpm run dev
```

Open your browser at:
👉 **`http://localhost:5173/`**
