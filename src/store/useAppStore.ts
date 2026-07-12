import { create } from "zustand";

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  github: string;
  linkedin: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string; // Bullet points separated by newline
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  technologies: string;
  link: string;
}

export interface SkillGroup {
  id: string;
  category: string;
  skills: string; // Comma-separated skills
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
}

export interface LanguageItem {
  id: string;
  name: string;
  proficiency: string; // Native, Fluent, Professional, etc.
}

export interface VolunteerItem {
  id: string;
  organization: string;
  role: string;
  description: string;
}

export interface ReferenceItem {
  id: string;
  name: string;
  relationship: string;
  company: string;
  contact: string;
}

export interface ResumeContent {
  personalInfo: PersonalInfo;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: ProjectItem[];
  skills: SkillGroup[];
  certifications: CertificationItem[];
  achievements: AchievementItem[];
  languages: LanguageItem[];
  volunteer: VolunteerItem[];
  references: ReferenceItem[];
  sectionsOrder: string[];
  hiddenSections: string[];
}

export interface Resume {
  id: string;
  title: string;
  template: string; // modern, minimal, professional, executive, creative, google, microsoft, harvard
  content: ResumeContent;
  isPrivate: boolean;
  atsScore: number;
  updatedAt: string;
}

export interface JobApplication {
  id: string;
  company: string;
  role: string;
  salary: string;
  jobLink: string;
  status: "applied" | "interview" | "assessment" | "rejected" | "offer";
  notes: string;
  applicationDate: string;
  deadline: string;
}

export interface InterviewMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface InterviewSession {
  id: string;
  role: string;
  score: number;
  metrics: {
    confidence: number;
    grammar: number;
    communication: number;
  };
  transcript: InterviewMessage[];
  createdAt: string;
}

export interface AppState {
  // Theme & User Settings
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isPremium: boolean;
  setPremium: (status: boolean) => void;
  
  // Resumes State
  resumes: Resume[];
  activeResumeId: string | null;
  saveStatus: "saved" | "saving" | "unsaved";
  
  // Getters
  getActiveResume: () => Resume | null;
  
  // Actions
  addResume: (title: string, template?: string) => string;
  updateResumeContent: (content: Partial<ResumeContent>) => void;
  updateResumeTemplate: (template: string) => void;
  updateResumeTitle: (title: string) => void;
  duplicateResume: (resumeId: string) => void;
  deleteResume: (resumeId: string) => void;
  setAutoSaveStatus: (status: "saved" | "saving" | "unsaved") => void;
  setActiveResumeId: (id: string | null) => void;

  // Cover Letter State
  coverLetters: Array<{
    id: string;
    company: string;
    role: string;
    tone: string;
    content: string;
    createdAt: string;
  }>;
  addCoverLetter: (company: string, role: string, tone: string, content: string) => void;
  deleteCoverLetter: (id: string) => void;

  // Portfolio State
  portfolio: {
    theme: "minimal" | "developer" | "creative" | "corporate";
    customDomain: string;
    isDeployed: boolean;
    deploymentUrl: string;
  };
  updatePortfolio: (portfolioData: Partial<AppState["portfolio"]>) => void;

  // Job Tracker State
  applications: JobApplication[];
  addApplication: (app: Omit<JobApplication, "id">) => void;
  updateApplicationStatus: (id: string, status: JobApplication["status"]) => void;
  deleteApplication: (id: string) => void;

  // Interview Sessions State
  interviews: InterviewSession[];
  addInterviewSession: (session: InterviewSession) => void;
}

// Default Starting Resume
const initialResumeContent: ResumeContent = {
  personalInfo: {
    fullName: "Alex Rivera",
    email: "alex.rivera@example.com",
    phone: "+1 (555) 019-2834",
    location: "San Francisco, CA",
    website: "https://alexrivera.dev",
    github: "github.com/alexriveradev",
    linkedin: "linkedin.com/in/alexriveradev"
  },
  summary: "Results-driven Software Engineer with 4+ years of experience designing and implementing highly scalable frontend and full-stack solutions. Expert in React, TypeScript, Next.js, Node.js, and cloud platforms. Proven track record of improving site loading speeds by 40% and leading technical feature architectures.",
  experience: [
    {
      id: "exp-1",
      company: "Vercel Tech LLC",
      role: "Senior Frontend Engineer",
      location: "San Francisco, CA",
      startDate: "2024-03",
      endDate: "",
      current: true,
      description: "Spearheaded development of core web builder application modules, optimizing client bundles and achieving a 32% reduction in TTI.\nCollaborated with UI/UX designers to implement design system tokens using Tailwind CSS, improving UI consistency across 3 key SaaS platforms.\nMentored 4 junior engineers on modern React concurrency architectures and TypeScript best practices."
    },
    {
      id: "exp-2",
      company: "InnovateTech Solutions",
      role: "Software Engineer II",
      location: "Austin, TX",
      startDate: "2022-06",
      endDate: "2024-02",
      current: false,
      description: "Developed and maintained responsive e-commerce dashboards utilizing Next.js, increasing user retention rate by 18%.\nIntegrated secure RESTful and GraphQL endpoints, minimizing client load times by 220ms on average.\nBuilt automated pipeline test coverage models, raising system reliability checkpoints from 78% to 94%."
    }
  ],
  education: [
    {
      id: "edu-1",
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science",
      fieldOfStudy: "Computer Science & Engineering",
      location: "Berkeley, CA",
      startDate: "2018-09",
      endDate: "2022-05",
      gpa: "3.85"
    }
  ],
  projects: [
    {
      id: "proj-1",
      name: "SaaS TaskFlow Dashboard",
      description: "An interactive, glassmorphic productivity dashboard supporting drag-and-drop task assignment, charts analytics, and instant state backups.",
      technologies: "Next.js, Tailwind CSS, Zustand, Recharts, SQLite",
      link: "https://taskflow.alexrivera.dev"
    },
    {
      id: "proj-2",
      name: "FastGen AI Content Assistant",
      description: "AI-driven content generation app utilizing LLM streams for writing support, custom prompts, and auto-export as Markdown documents.",
      technologies: "React 19, Gemini API, Express.js, TailwindCSS",
      link: "https://github.com/alexrivera/fastgen-ai"
    }
  ],
  skills: [
    {
      id: "sk-1",
      category: "Languages & Core",
      skills: "JavaScript, TypeScript, HTML5, CSS3, Python, SQL"
    },
    {
      id: "sk-2",
      category: "Frameworks & Libraries",
      skills: "React, Next.js, Node.js, Express, Prisma ORM, Zustand, Framer Motion"
    },
    {
      id: "sk-3",
      category: "Tools & DevOps",
      skills: "Git, Docker, AWS, Vercel, Supabase, PostgreSQL, SQLite, Jest"
    }
  ],
  certifications: [
    {
      id: "cert-1",
      name: "AWS Certified Developer – Associate",
      issuer: "Amazon Web Services (AWS)",
      date: "2023-11",
      link: ""
    },
    {
      id: "cert-2",
      name: "Meta Front-End Developer Professional Certificate",
      issuer: "Meta via Coursera",
      date: "2022-08",
      link: ""
    }
  ],
  achievements: [
    {
      id: "ach-1",
      title: "1st Place Winner - Innovate Hackathon 2023",
      description: "Designed and built an offline-first emergency navigation platform for natural disasters in 36 hours."
    }
  ],
  languages: [
    {
      id: "lang-1",
      name: "English",
      proficiency: "Native"
    },
    {
      id: "lang-2",
      name: "Spanish",
      proficiency: "Professional Working"
    }
  ],
  volunteer: [
    {
      id: "vol-1",
      organization: "Tech4Good Community",
      role: "Frontend Mentor",
      description: "Led weekly HTML/CSS and Javascript training workshops for underprivileged high school students interested in coding careers."
    }
  ],
  references: [
    {
      id: "ref-1",
      name: "Dr. Sarah Jenkins",
      relationship: "Academic Advisor",
      company: "UC Berkeley",
      contact: "sjenkins@berkeley.edu"
    }
  ],
  sectionsOrder: [
    "personalInfo",
    "summary",
    "experience",
    "education",
    "projects",
    "skills",
    "certifications",
    "achievements",
    "languages",
    "volunteer",
    "references"
  ],
  hiddenSections: []
};

export const useAppStore = create<AppState>((set, get) => ({
  // Theme & User Settings
  isDarkMode: true,
  toggleDarkMode: () => set((state) => {
    const nextMode = !state.isDarkMode;
    if (nextMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    return { isDarkMode: nextMode };
  }),
  isPremium: false,
  setPremium: (status) => set({ isPremium: status }),

  // Resumes State
  resumes: [
    {
      id: "default-resume",
      title: "My Professional Resume",
      template: "modern",
      content: initialResumeContent,
      isPrivate: true,
      atsScore: 88,
      updatedAt: new Date().toISOString()
    }
  ],
  activeResumeId: "default-resume",
  saveStatus: "saved",

  // Getters
  getActiveResume: () => {
    const { resumes, activeResumeId } = get();
    return resumes.find((r) => r.id === activeResumeId) || null;
  },

  // Actions
  addResume: (title, template = "modern") => {
    const newId = `resume-${Date.now()}`;
    const newResume: Resume = {
      id: newId,
      title,
      template,
      content: JSON.parse(JSON.stringify(initialResumeContent)), // deep clone
      isPrivate: true,
      atsScore: 70,
      updatedAt: new Date().toISOString()
    };
    set((state) => ({
      resumes: [newResume, ...state.resumes],
      activeResumeId: newId
    }));
    return newId;
  },

  updateResumeContent: (contentUpdate) => set((state) => {
    if (!state.activeResumeId) return {};
    return {
      saveStatus: "saving",
      resumes: state.resumes.map((r) => {
        if (r.id === state.activeResumeId) {
          return {
            ...r,
            content: { ...r.content, ...contentUpdate },
            updatedAt: new Date().toISOString()
          };
        }
        return r;
      })
    };
  }),

  updateResumeTemplate: (template) => set((state) => {
    if (!state.activeResumeId) return {};
    return {
      resumes: state.resumes.map((r) => {
        if (r.id === state.activeResumeId) {
          return {
            ...r,
            template,
            updatedAt: new Date().toISOString()
          };
        }
        return r;
      })
    };
  }),

  updateResumeTitle: (title) => set((state) => {
    if (!state.activeResumeId) return {};
    return {
      resumes: state.resumes.map((r) => {
        if (r.id === state.activeResumeId) {
          return {
            ...r,
            title,
            updatedAt: new Date().toISOString()
          };
        }
        return r;
      })
    };
  }),

  duplicateResume: (resumeId) => set((state) => {
    const target = state.resumes.find((r) => r.id === resumeId);
    if (!target) return {};
    const dup: Resume = {
      ...target,
      id: `resume-${Date.now()}`,
      title: `${target.title} (Copy)`,
      updatedAt: new Date().toISOString()
    };
    return {
      resumes: [dup, ...state.resumes]
    };
  }),

  deleteResume: (resumeId) => set((state) => {
    const filtered = state.resumes.filter((r) => r.id !== resumeId);
    let nextActive = state.activeResumeId;
    if (state.activeResumeId === resumeId) {
      nextActive = filtered.length > 0 ? filtered[0].id : null;
    }
    return {
      resumes: filtered,
      activeResumeId: nextActive
    };
  }),

  setAutoSaveStatus: (status) => set({ saveStatus: status }),
  setActiveResumeId: (id) => set({ activeResumeId: id }),

  // Cover Letters State
  coverLetters: [
    {
      id: "cl-default",
      company: "Google LLC",
      role: "Staff Backend Engineer",
      tone: "formal",
      content: "Dear Hiring Team,\n\nI am writing to express my strong interest in the Staff Backend Engineer role at Google. With over 4 years of experience building secure web APIs, automating development pipelines, and boosting cloud scaling operations, I am confident in my ability to immediately add value to your infrastructure division.\n\nAt Vercel, I led component optimizations that reduced time-to-interactive metric thresholds by 32% for large-scale SaaS dashboard utilities. Additionally, my backend code migrations minimized RESTful query latency averages by 220ms at scale. These experiences map directly to Google's engineering standard of excellence.\n\nThank you for considering my application. I look forward to discussing how my background aligns with Google's platform scalability needs.\n\nSincerely,\nAlex Rivera",
      createdAt: new Date().toISOString()
    }
  ],

  addCoverLetter: (company, role, tone, content) => set((state) => ({
    coverLetters: [
      {
        id: `cl-${Date.now()}`,
        company,
        role,
        tone,
        content,
        createdAt: new Date().toISOString()
      },
      ...state.coverLetters
    ]
  })),

  deleteCoverLetter: (id) => set((state) => ({
    coverLetters: state.coverLetters.filter((cl) => cl.id !== id)
  })),

  // Portfolio State
  portfolio: {
    theme: "developer",
    customDomain: "alexrivera.dev",
    isDeployed: true,
    deploymentUrl: "https://resumeforge-alexrivera.vercel.app"
  },

  updatePortfolio: (portfolioUpdate) => set((state) => ({
    portfolio: { ...state.portfolio, ...portfolioUpdate }
  })),

  // Job Tracker State
  applications: [
    {
      id: "app-1",
      company: "Vercel",
      role: "Senior Frontend Engineer",
      salary: "$145,000 - $175,000",
      jobLink: "vercel.com/careers",
      status: "offer",
      notes: "Received offer letter. Negotiating relocation details.",
      applicationDate: "2026-06-10",
      deadline: "2026-07-20"
    },
    {
      id: "app-2",
      company: "Stripe",
      role: "React Specialist",
      salary: "$160,000 - $185,000",
      jobLink: "stripe.com/jobs",
      status: "interview",
      notes: "Technical phone screen scheduled for next Tuesday.",
      applicationDate: "2026-07-02",
      deadline: "2026-07-15"
    },
    {
      id: "app-3",
      company: "Notion",
      role: "Full Stack Engineer",
      salary: "$130,000 - $160,000",
      jobLink: "notion.so/careers",
      status: "applied",
      notes: "Applied via referral from former colleague.",
      applicationDate: "2026-07-08",
      deadline: "2026-08-01"
    },
    {
      id: "app-4",
      company: "Linear",
      role: "Product Engineer",
      salary: "$150,000 - $180,000",
      jobLink: "linear.app/careers",
      status: "assessment",
      notes: "Working on the 3-day take-home coding challenge.",
      applicationDate: "2026-07-05",
      deadline: "2026-07-12"
    }
  ],

  addApplication: (appData) => set((state) => ({
    applications: [
      {
        ...appData,
        id: `app-${Date.now()}`
      },
      ...state.applications
    ]
  })),

  updateApplicationStatus: (id, status) => set((state) => ({
    applications: state.applications.map((app) => 
      app.id === id ? { ...app, status } : app
    )
  })),

  deleteApplication: (id) => set((state) => ({
    applications: state.applications.filter((app) => app.id !== id)
  })),

  // Mock Interview Sessions State
  interviews: [
    {
      id: "int-1",
      role: "Frontend Developer",
      score: 85,
      metrics: {
        confidence: 88,
        grammar: 82,
        communication: 86
      },
      transcript: [
        { role: "assistant", content: "Tell me about a time you solved a complex layout performance issue in a web application." },
        { role: "user", content: "In my previous project, we had a rendering bottleneck when loading long data sheets. I fixed this by implementing a virtual list component, reducing active DOM nodes from 4000 to just 60. This reduced initial render time by 75% and eliminated frame drops." },
        { role: "assistant", content: "Excellent answer. That shows a clear understanding of runtime DOM virtualization and resource optimization." }
      ],
      createdAt: new Date().toISOString()
    }
  ],

  addInterviewSession: (session) => set((state) => ({
    interviews: [session, ...state.interviews]
  }))
}));
