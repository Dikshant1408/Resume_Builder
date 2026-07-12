# ResumeForge AI 🚀
> Premium AI-Powered Career Platform, Resume Builder, and ATS Optimizer.

ResumeForge AI is a state-of-the-art SaaS web application engineered to help candidates build ATS-friendly resumes, optimize profiles for any job description, generate tailored cover letters, showcase custom portfolios, and practice interactive mock interviews.

---

## 🎨 Design System & Visuals
* **Glassmorphic UI:** Unified dark and light mode variable palettes mapped globally inside `src/app/globals.css`.
* **ATS Print Engine:** CSS print sheets optimized to strip layouts and output clean, single-page, standard-compliant vector PDFs.
* **Fluid Micro-Animations:** Responsive layouts, sliding sidebar, notification alerts, and drag-and-drop boards built using Framer Motion and custom CSS animations.

---

## ✨ Features Breakdown

| Feature | Description | File / Route |
| :--- | :--- | :--- |
| **Landing Page** | High-contrast bento layout, responsive CTA, animated blobs, dynamic monthly/annual billing pricing cards, and FAQ accordions. | `src/app/page.tsx` |
| **Interactive Auth** | Swapper form supporting credentials register, login, terms agreement, and direct dashboard handshakes. | `src/app/auth/page.tsx` |
| **Dashboard Overview** | Pipeline charts (Recharts) mapping monthly application counts, average interview rates, and recent profile scores. | `src/app/dashboard/page.tsx` |
| **Resume Builder** | Double-column interactive editor. Toggle templates, add entries, duplicate blocks, trigger AI bullet re-writers, and export clean PDFs. | `src/app/dashboard/resume-builder/` |
| **ATS Score Auditor** | Scanning speedometers calculating scores (0-100), locating formatting errors, identifying missing keyword tags, and showing code diff fixes. | `src/app/dashboard/ats-checker/` |
| **Job Optimizer** | Scans resumes directly against target job listings to show skill matches, score diagnostics, and optimization roadmaps. | `src/app/dashboard/job-optimizer/` |
| **AI Cover Letters** | Inputs job titles, company names, and tone pickers (Professional, Creative, Bold) to generate ready-to-copy cover letters. | `src/app/dashboard/cover-letter/` |
| **Portfolio Websites** | Visual workspace simulator rendering digital portfolio websites in modern styles, complete with simulated DNS domain linking. | `src/app/dashboard/portfolio/` |
| **Kanban Job Tracker** | Kanban pipelines to drag applications from Wishlist ➔ Applied ➔ Interview ➔ Offer ➔ Rejected, complete with calendar deadline grids. | `src/app/dashboard/job-tracker/` |
| **Skills Analyzer** | Polar Radar Charts, commit heatmap grids, custom skill checklists, and AI roadmap recommendations. | `src/app/dashboard/skills-analyzer/` |
| **AI Interview Coach** | Simulated chat practice platform. Offers real-time behavioral/technical queries, audio waveform displays, and scores answers. | `src/app/dashboard/interview-prep/` |
| **Settings Panel** | Form modules to update profile names, change contact emails, manage billing tiers, and generate custom Developer API keys. | `src/app/dashboard/settings/` |
| **Admin Controls** | Backend dashboard monitoring revenue matrices, system flags, and pending customer support tickets. | `src/app/dashboard/admin/` |

---

## 🛠️ Technology Stack
* **Framework:** Next.js 15 (App Router with Turbopack compiling client/server routing).
* **Language:** TypeScript / React 19.
* **Styling:** Tailwind CSS v4 featuring global theme variable sheets.
* **Database Object Mapper:** Prisma v7 compiler.
* **Local Database:** SQLite configuration (`dev.db`).
* **State Manager:** Zustand custom store (`src/store/useAppStore.ts`) pre-loaded with mock user templates, settings, and application tracking histories.
* **E2E Testing:** Cypress Integration suite (`cypress/e2e/resumeforge.cy.ts`).

---

## ⚙️ Local Setup and Configuration

### Prerequisites
* [Node.js](https://nodejs.org) (v18.x or higher recommended)
* NPM (v10.x or higher)

### 1. Clone the Repository
```bash
git clone https://github.com/Dikshant1408/Resume_Builder.git
cd Resume_Builder
```

### 2. Install Project Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory and append your configurations:
```env
DATABASE_URL="file:./dev.db"
GROQ_API_KEY="your-groq-api-key-here"
```

### 4. Database Setup & Initialization
Compile your database schemas and generate the Prisma Client assets:
```bash
npx prisma generate
npx prisma db push
```

### 5. Launch the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) inside your web browser to check the live dashboard.

---

## 🧪 Running Automated Tests

ResumeForge AI uses Cypress for complete end-to-end integration verification. The test suite validates Landing Page structures, auth forms, visual mode togglers, dashboard layouts, subpage routes, and live settings synchronization.

* **Run tests in headless mode (Command Line):**
  ```bash
  npx cypress run
  ```
* **Open the Cypress Interactive Test Runner GUI:**
  ```bash
  npx cypress open
  ```

---

## 🚀 Building & Deploying to Production

### Local Production Build
Verify that the project builds cleanly without compile errors:
```bash
npm run build
npm run start
```

### Deploying to Vercel
1. Create a new project on Vercel.
2. Link your GitHub repository (`Dikshant1408/Resume_Builder`).
3. Add `GROQ_API_KEY` to Vercel's Environment Variables panel.
4. Set the **Build Command** to:
   ```bash
   prisma generate && prisma db push && next build
   ```
5. Click **Deploy**. Vercel will build the optimized production client bundles and host the database.
