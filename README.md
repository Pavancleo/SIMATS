# 🛡️ CyberSentinel: AI-Based Phishing & Social Engineering Detector

> **Challenge 8 Solution**: An AI-powered cybersecurity assistant that analyzes messages, emails, URLs, or webpage content and identifies potential phishing or social-engineering attempts with explainable AI.

---

## 🚀 Overview

Modern cyberattacks increasingly exploit human psychology (urgency, fear, authority impersonation) rather than obvious known malicious URLs. **CyberSentinel** goes beyond static signature filters to understand message intent, cognitive manipulation mechanisms, and structural domain inconsistencies.

---

## ⚡ Core Features

- **Multi-Channel Ingestion**: Supports Email (with SPF/DKIM/DMARC headers), SMS (Smishing), Social DMs, Web URLs, and Raw Text.
- **6-Perspective Threat Matrix**:
  1. **NLP & Linguistic Analysis**: Coercive language score, sentiment, and grammatical anomalies.
  2. **Social Engineering Lures**: Urgency, Fear, Authority, Scarcity, and Financial pressure breakdown.
  3. **URL & Typosquatting Radar**: Domain age estimation, lookalike targets, IP-based anchors, and TLD risk.
  4. **Sender Identity & Envelope Validation**: SPF, DKIM, DMARC alignment, and free webmail mismatch checks.
  5. **Behavioral Anomalies**: Urgency response windows, out-of-band communication, and protocol bypass flags.
  6. **Contextual Consistency**: Baseline organizational deviation detection.
- **Explainable AI (XAI)**: Interactive red-flag message highlighting with clickable danger rationales.
- **Attack DNA Profiling**: Granular MITRE ATT&CK technique mapping (T1566, T1598, T1204, T1539).
- **Manipulation Chain Reconstruction**: Chronological step-by-step psychological victim pathway.
- **Trust Graph Mapper**: Graph analysis of claimed organization vs. sender DNS vs. destination endpoint.
- **Projected Impact Simulator**: Downstream cascading consequence modeling and financial blast radius estimation.
- **Incident Response Action Center**: Immediate remediation playbooks with 1-click Markdown / JSON threat report exports.

---

## 🛠️ Technologies Used

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide Icons, Motion
- **Backend & AI**: Node.js, Express, tsx, Google Gemini AI Flash SDK (@google/genai), Heuristic SOC Engine
- **Tooling**: Vite 6, esbuild

---

## 📦 Getting Started

### 1. Installation
`ash
npm install
`

### 2. Configure Environment (Optional)
`ash
cp .env.example .env
# Add your GEMINI_API_KEY in .env
`

### 3. Run Development Server
`ash
npm run dev
`

Visit http://localhost:3000 in your web browser.
