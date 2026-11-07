# 📈 Wall Street Trios Pro — Institutional Trading Terminal

> A high-performance, institutional-grade web terminal built for multi-desk risk management, session analytics, and advanced trade journaling.

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Live--Demo-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://wall-street-trios.vercel.app)
[![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20TypeScript%20%7C%20Tailwind-blue?style=for-the-badge&logo=react)](https://react.dev)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

---

## 🌐 Live Demo

🔗 **Production URL:** [https://wall-street-trios.vercel.app](https://wall-street-trios.vercel.app)

---

## 🚀 Key Features

### 🔐 PIN-Protected Multi-Desk Profiles
- **Secure Switching:** Dedicated profile management for individual desk traders (**King**, **Mohit**, **Rakesh**).
- **Enforced Security:** PIN-gated access ensuring desk isolation and data privacy.

### 📓 Trade Execution Journal
- **Full Telemetry Logging:** Record date, trader ID, asset class (Crypto, Forex, Indices), pair, entry setup, session, net R-multiple, and trade notes.
- **Before/After Chart Attachments:** Upload high-resolution pre-trade and post-trade chart screenshots saved locally in `localStorage` as Base64 strings.
- **Interactive Screenshot Preview:** In-app modal viewer for instant, side-by-side technical setup review.

### 🧮 Integrated Position Sizer & Risk Calculator
- Real-time lot size calculation based on account equity, percentage risk, entry price, and stop-loss levels.
- Direct mathematical risk multiple integration for institutional execution tracking.

### 📊 Real-Time Performance Analytics
- Automated win-rate calculation, session attribution (New York, London, Asia), and net R-multiple tracking.
- Visual status indicators (`WIN`, `LOSS`, `BE`) with live UI highlights.

---

## 🛠️ Tech Stack

- **Frontend Framework:** React 18 + Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Institutional Dark Slate Palette)
- **Icons:** Lucide React
- **Persistence:** Browser `localStorage` API
- **Deployment Platform:** Vercel Continuous Integration (CI/CD)

---

## 💻 Local Installation & Setup

Follow these steps to run the project locally on your machine:

### 1. Clone the Repository
```bash
git clone [https://github.com/karankumar-tech-eng/wall-street-trios.git](https://github.com/karankumar-tech-eng/wall-street-trios.git)
cd wall-street-trios
