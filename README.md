# 🎓 ScholarSaathi — AI-Powered Browser Assistant
> **"Scholarships made simpler, one step at a time."**  
> *Built for wHACKiest 2026 Ideathon — Track: Problem 2: Beyond the Browser: Reimagine How We Use the Web*

---

## 🌟 Executive Summary & Problem Statement

Millions of Indian students from low-income, minority, and rural backgrounds miss out on thousands of crores in government higher education scholarships every year. The primary bottlenecks are not eligibility, but **digital intimidation**:
1. **Convoluted Government Portals**: State and Central portals (NSP, SSP, MahaDBT) feature archaic layouts, bureaucratic terminology, and ambiguous fields (e.g., *Gross Annual Family Income* vs *Net Taxable Income*, *Permanent USN* vs *College Roll No*).
2. **Language Barriers**: Most scholarship portals are primarily in complex legal English or formal Hindi, alienating regional language students (e.g., Kannada, Marathi, Tamil).
3. **Document Pitfalls & Rejections**: Over 38% of applications are rejected due to unreadable scans, expired Tahsildar income certificates, missing Aadhaar-seeding with bank accounts, or improper file formats.
4. **Fear of Mistake**: Students are terrified of making irreversible errors and getting disqualified.

**ScholarSaathi** reimagines how students interact with the web by introducing an **in-browser AI sidekick** that lives right beside the application portal. It translates complex legal jargon in real-time into regional languages (English, Kannada, Hindi), validates uploaded documents before submission, auto-fills 16+ form fields from a secure local profile vault with visual confirmation, and enforces an explicit human-in-the-loop confirmation before submission.

---

## 🚀 Key Features

| Capability | What It Does |
| :--- | :--- |
| **💡 Trilingual In-Context Explainer** | Click the `Ask AI` sparkle icon beside any form field (e.g., *Annual Family Income*, *USN*, *Category*) to receive an instant, simple explanation in **English**, **Kannada (ಕನ್ನಡ)**, or **Hindi (हिंदी)**. |
| **⚡ Smart Profile Autofill** | 1-Click "Fill using My Profile" scans your verified local profile vault and populates 16 fields across Personal, Family, and Academic sections with an animated violet glow highlight. |
| **🛡️ Document Validation & Compliance** | Scans uploaded files (Student ID, Tahsildar Income Certificate, Marks Card, Bank Passbook) for file formats, size boundaries, blurriness/low-resolution issues, and issuing authority RD seals. |
| **🎯 Scholarship Discovery Engine** | Recommends eligible schemes based on student CGPA (e.g., 8.74), state domicile (Karnataka), reservation category (OBC-3A), and family income threshold (₹1.8L) with match percentage scoring. |
| **🔒 Pre-Submission Audit & Explicit Authorization** | Summarizes all application data into high-contrast review cards, flags missing requirements, and **strictly prevents automatic submission**—requiring conscious student declaration and confirmation. |
| **🕒 Real-Time DBT Application Tracker** | Visual step-by-step pipeline tracking Direct Benefit Transfer (DBT) progress from Application Submission → College Verification → District Nodal Officer → PFMS Bank Credit. |
| **🎙️ Voice Assistance & Interactive Chat** | Built-in conversational AI assistant with speech recognition simulation, quick suggested question chips, and rich contextual cards. |
| **🧭 12-Step Guided Ideathon Presentation Tour** | Bottom floating controller allowing pitch presenters and ideathon judges to advance through the complete 12-step presentation flow with a single click. |

---

## 🖥️ Architecture & Design Philosophy

Inspired by modern SaaS interfaces such as **Linear**, **Arc Browser**, and **Notion**:
- **Design Tokens**: Deep navy (`#0f172a`), royal indigo (`#4f46e5`), and soft violet (`#8b5cf6`).
- **Luminous AI Orb**: Breathing gradient sphere indicating active contextual awareness.
- **Micro-Interactions**: Subtle field glow pulse on autofill, badge status pills (Verified, Needs Attention, Pending), and celebration confetti upon final student confirmation.
- **Dual Presentation Modes**:
  1. **Browser-Accessible Web Demo**: Simulated Chrome frame with address bar, tabs, and side panel for immediate zero-install demonstrations on laptop or projector.
  2. **Manifest V3 Chrome Extension**: Standalone unpacked extension ready to load into Google Chrome (`chrome://extensions`) with active tab communication and side panel API.

---

## 📁 Repository Structure

```text
wHackiest/
├── extension/                     # Chrome Extension Manifest V3 files
│   ├── manifest.json             # Manifest V3 (sidePanel, activeTab, storage, scripting)
│   ├── background.js             # Service worker managing side panel behavior
│   ├── content.js                # Content script injecting helper chips & autofill hooks
│   ├── content.css               # Content script highlighting & launcher styles
│   ├── sidepanel.html            # Native Chrome side panel interface
│   ├── sidepanel.css             # Standalone side panel styling
│   ├── sidepanel.js              # Side panel interactive NLP & tab bridge
│   └── icons/                    # Extension icons (16px, 48px, 128px)
├── src/
│   ├── assets/                   # Static assets & icons
│   ├── components/
│   │   ├── ChromeBrowserFrame.tsx     # Browser mockup frame & omnibox
│   │   ├── PortalHeader.tsx           # NSP portal header, emblem & completion bar
│   │   ├── StepProgressBar.tsx       # 5-step stepper navigation
│   │   ├── FormField.tsx             # Reusable form field with AI help button & glow
│   │   ├── Step1Personal.tsx         # Personal details form
│   │   ├── Step2Family.tsx           # Family & income details form
│   │   ├── Step3Academic.tsx         # Academic records & CGPA form
│   │   ├── Step4Documents.tsx        # Document upload & validation grid
│   │   ├── Step5Review.tsx           # Final review, audit & submission modal
│   │   ├── AssistantSidePanel.tsx    # ScholarSaathi AI side panel & chat
│   │   ├── DiscoverScholarships.tsx  # Filterable scholarship discovery directory
│   │   ├── ApplicationTracker.tsx    # DBT timeline & tracking status
│   │   ├── StudentProfileModal.tsx   # Editable student profile vault
│   │   ├── DocumentPreviewModal.tsx  # Digital certificate preview dialog
│   │   └── DemoTourBar.tsx           # 12-step ideathon presentation tour controller
│   ├── data/
│   │   ├── mockData.ts               # Student profiles, field Q&A dictionary, schemes
│   │   └── translations.ts           # Trilingual strings (EN, Kannada, Hindi)
│   ├── types/
│   │   └── index.ts                  # TypeScript interfaces & types
│   ├── App.tsx                       # Core root orchestrator
│   ├── main.tsx                      # Vite React entry point
│   └── index.css                     # Tailwind directives, animations & custom glass
├── public/
│   └── favicon.svg                   # ScholarSaathi graduation logo
├── scripts/
│   └── generate-icons.js             # Standalone Node script generating PNG icons
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

---

## ⚡ Quickstart: Running Locally

### Prerequisites
- **Node.js** (v18 or higher recommended; tested on Node v24)
- **npm** (v9 or higher)
- **Python** (v3.10+ with `fastapi`, `uvicorn`, `requests`)

### Installation & Run

1. Clone or navigate to the project directory:
   ```bash
   cd c:\Users\prajw\OneDrive\Desktop\wHackiest
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Gemini AI Python Backend:
   ```bash
   npm run backend
   # Or run directly: python -m uvicorn backend.server:app --host 127.0.0.1 --port 8000
   ```

4. In a second terminal, start the frontend:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to:
   ```text
   http://localhost:5173
   ```

---

## 🧩 Loading into Google Chrome (Developer Mode)

ScholarSaathi includes a fully compliant **Manifest V3 Chrome Extension** that can be loaded directly into your Chrome browser:

1. Open **Google Chrome**.
2. In the address bar, type:
   ```text
   chrome://extensions/
   ```
   and press Enter.
3. In the top-right corner, toggle **Developer mode** to **ON**.
4. In the top-left corner, click **"Load unpacked"**.
5. Select either the root folder or the `extension/` folder:
   ```text
   c:\Users\prajw\OneDrive\Desktop\wHackiest
   ```
   *(or `c:\Users\prajw\OneDrive\Desktop\wHackiest\extension`)*
6. Click **Select Folder**.
7. ScholarSaathi will now appear in your installed extensions list!
8. Click the puzzle icon in Chrome's toolbar and **Pin** ScholarSaathi.
9. Click the ScholarSaathi extension icon to open the native **Chrome Side Panel** alongside any web page.

---

## 🎬 12-Step Demo Walkthrough (Ideathon Presentation Script)

The prototype includes a **Demo Tour Controller** at the bottom of the screen with 1-click execution for all 12 steps:

| Step | Action | What to Highlight to Judges |
| :---: | :--- | :--- |
| **1** | **Open Simulated Portal** | Show the authentic National Scholarship Portal (NSP) layout with 5 distinct steps and official-style header. |
| **2** | **Open ScholarSaathi Side Panel** | Point out the modern Arc/Linear-style side panel, the glowing AI Orb, status indicator, and 4 quick action cards. |
| **3** | **Ask Income Query** | Click the suggested chip: *"What does annual family income mean?"* |
| **4** | **Show AI Explanation** | Assistant responds: *"Annual family income is the total income earned by all earning members of your family in one year."* with helpful Tahsildar revenue certificate tips. |
| **5** | **Switch to Kannada Translation** | Click **ಕನ್ನಡ** in the language selector. Notice the entire interface and AI explanation switch to natural Kannada (`ವಾರ್ಷಿಕ ಕುಟುಂಬದ ಆದಾಯವೆಂದರೆ...`). Switch to **हिंदी** to show Hindi as well. |
| **6** | **Click "Fill using My Profile"** | Click the violet **"Fill using My Profile"** button in the side panel or header. |
| **7** | **Show Form Populated with Glow** | All 16 fields across Personal, Family, and Academic sections populate instantly with an animated violet highlight glow. |
| **8** | **Upload Sample Valid Doc** | Navigate to Step 4 (Documents). Click `+ Sample Valid Doc` on Income Certificate to show instant verification badge (99.4% OCR confidence). |
| **9** | **Catch Invalid Document Warning** | Click `+ Test Invalid / Blurry` on Marks Card. ScholarSaathi immediately flags: *"Blurry scan detected (Confidence 41%). Exceeds recommended 2MB limit."* |
| **10** | **Navigate to Step 5 Review** | Click "Scan & Validate with AI" to pass documents, then proceed to Step 5 (Final Review). |
| **11** | **Show Pre-Submission Audit** | Highlight the AI compliance checklist: 100% of identity, academic CGPA (8.74), and reservation quota requirements are met. |
| **12** | **Explicit User Confirmation** | Show that submission button is locked until the student explicitly checks the legal declaration. Clicking submit opens a confirmation modal, followed by confetti celebration and an official Application Reference ID (`NSP-2026-KA-XXXXXX`). |

---

## 🏆 Ideathon Alignment: Beyond the Browser

- **Human-Centric AI Assistance**: Bridges the digital divide for first-generation college students navigating hostile bureaucratic web forms.
- **Multilingual Accessibility**: Real-time regional language translation (Kannada, Hindi, English) directly inside the browser side panel.
- **Zero-Friction Adoption**: Works on top of existing government infrastructure without requiring government backends to change.
- **Responsible AI Safety**: Strictly adheres to human-in-the-loop validation—never auto-submitting sensitive legal forms without explicit student confirmation.

---
*Built with ❤️ for wHACKiest 2026 Ideathon.*
