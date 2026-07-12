"use client";

import { useState, useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";
import { 
  Sparkles, 
  TrendingUp, 
  BookOpen, 
  Map, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight,
  Loader2,
  Award,
  ChevronRight,
  Info
} from "lucide-react";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";

export default function SkillsAnalyzer() {
  const { resumes } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const [roadmapStep, setRoadmapStep] = useState<number | null>(null);
  const [generatingRoadmap, setGeneratingRoadmap] = useState(false);
  const [roadmapData, setRoadmapData] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeResume = resumes[0] || null;

  // Radar competencies data
  const radarData = [
    { subject: "Frontend Tech", A: 92, fullMark: 100 },
    { subject: "Backend Architect", A: 78, fullMark: 100 },
    { subject: "DevOps & Cloud", A: 60, fullMark: 100 },
    { subject: "UI/UX & Design", A: 85, fullMark: 100 },
    { subject: "Performance Opt", A: 90, fullMark: 100 },
    { subject: "Team Leadership", A: 82, fullMark: 100 }
  ];

  // Grid Heatmap coordinates (Skill name, experience weight 1-4, years)
  const heatmapSkills = [
    { name: "React / NextJS", level: 4, years: "4+ years" },
    { name: "TypeScript", level: 4, years: "4 years" },
    { name: "Zustand State", level: 3, years: "2 years" },
    { name: "NodeJS / Express", level: 3, years: "3 years" },
    { name: "Tailwind CSS", level: 4, years: "4 years" },
    { name: "Git / Workflows", level: 4, years: "4+ years" },
    { name: "REST / GraphQL", level: 3, years: "3 years" },
    { name: "SQL Databases", level: 2, years: "2 years" },
    { name: "Docker containers", level: 1, years: "6 months" },
    { name: "AWS Cloud services", level: 1, years: "6 months" },
    { name: "Unit Testing (Jest)", level: 2, years: "1 year" },
    { name: "Webpack bundles", level: 3, years: "3 years" }
  ];

  const handleGenerateRoadmap = () => {
    setGeneratingRoadmap(true);
    setRoadmapData([]);
    setTimeout(() => {
      setGeneratingRoadmap(false);
      setRoadmapData([
        "Phase 1: Containerization Fundamentals — Learn Docker basics, create customized Dockerfiles for local Next.js builds, and isolate environments.",
        "Phase 2: Cloud Infrastructure — Study AWS Elastic Container Service (ECS) and AWS Fargate to run serverless containers without EC2 overhead.",
        "Phase 3: CI/CD Pipeline Automation — Construct GitHub Actions pipelines to auto-build Docker files on code merge and deploy directly to Vercel/AWS.",
        "Phase 4: Advanced Testing Integration — Write automated test mocks using Vitest/Playwright, gating merges until build pipelines pass checks."
      ]);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-xl font-extrabold tracking-tight">AI Skills Matrix Analyzer</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Visualize your technical core competencies, map experience weights, and generate personalized learning guides.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Radar chart */}
        <div className="lg:col-span-5 glass-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b]/40 p-6 space-y-6">
          <h3 className="font-bold text-sm text-slate-850 dark:text-white border-b border-slate-100 dark:border-slate-850 pb-2 mb-2">
            Skill Competency Map
          </h3>
          
          <div className="h-72 w-full flex items-center justify-center relative">
            {!mounted ? (
              <div className="w-full h-full bg-slate-100 dark:bg-slate-800/40 rounded-xl animate-pulse flex items-center justify-center">
                <span className="text-xs text-slate-400 font-medium">Loading Competencies Graph...</span>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="105%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="#475569" opacity={0.2} />
                  <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={9} tickLine={false} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#94a3b8" fontSize={8} tickLine={false} />
                  <Radar name="Competency" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.25} />
                </RadarChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="p-3 bg-blue-500/5 border border-blue-500/10 rounded-xl flex gap-2.5 text-xs text-blue-600 dark:text-blue-300">
            <Info className="w-5 h-5 shrink-0" />
            <p>Your highest competency is **Frontend Tech** (92%). The primary opportunity gap lies in **DevOps & Cloud** (60%).</p>
          </div>
        </div>

        {/* RIGHT COLUMN: Heatmap & Strengths */}
        <div className="lg:col-span-7 space-y-6">
          {/* Heatmap Matrix */}
          <div className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b]/40 p-6 space-y-4">
            <h3 className="font-bold text-sm text-slate-800 dark:text-white">Experience Heatmap Grid</h3>
            <p className="text-xs text-slate-500">Visual mapping of experience duration and technical depth across skills.</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 text-[10px]">
              {heatmapSkills.map((sk, idx) => (
                <div 
                  key={idx} 
                  className={`p-3.5 rounded-xl border relative select-none flex flex-col justify-between h-20 ${
                    sk.level === 4 
                      ? "bg-blue-600/15 border-blue-500/30 text-blue-800 dark:text-blue-300 font-bold"
                      : sk.level === 3
                        ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-700 dark:text-indigo-400 font-bold"
                        : sk.level === 2
                          ? "bg-slate-200/50 dark:bg-slate-800 border-slate-300 dark:border-slate-750 text-slate-700 dark:text-slate-350"
                          : "bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-850 text-slate-400 dark:text-slate-500"
                  }`}
                >
                  <span className="truncate max-w-full">{sk.name}</span>
                  <span className="text-[9px] text-slate-400 font-semibold">{sk.years}</span>
                </div>
              ))}
            </div>

            {/* Heatmap Legend */}
            <div className="flex gap-4 justify-end text-[9px] text-slate-500 font-bold pt-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-850" />
                Minimal (&lt;1 yr)
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-slate-200/50 dark:bg-slate-800 border border-slate-300 dark:border-slate-750" />
                Familiar (1-2 yrs)
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-indigo-500/10 border border-indigo-500/20" />
                Fluent (2-3 yrs)
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-blue-600/15 border border-blue-500/30" />
                Expert (3+ yrs)
              </div>
            </div>
          </div>

          {/* Strengths & Weaknesses checklist */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strengths */}
            <div className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b]/40 p-6 space-y-4">
              <h3 className="font-bold text-sm text-slate-850 dark:text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 animate-pulse" />
                Core Strengths
              </h3>
              <div className="space-y-3 pt-1 text-xs">
                {[
                  "Component Optimisation (ttis bundles minimized by 32%)",
                  "TypeScript standard architectural structures (type-safe stores)",
                  "State synchronization & RESTful API caching workflows",
                  "Cross-functional mentorship leading feature teams"
                ].map((s, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-slate-650 dark:text-slate-350">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500/90 shrink-0 mt-0.5" />
                    {s}
                  </div>
                ))}
              </div>
            </div>

            {/* Weaknesses / Gaps */}
            <div className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b]/40 p-6 space-y-4">
              <h3 className="font-bold text-sm text-slate-850 dark:text-white flex items-center gap-1.5">
                <AlertTriangle className="w-4.5 h-4.5 text-amber-500 animate-pulse" />
                Vulnerability Areas
              </h3>
              <div className="space-y-3 pt-1 text-xs">
                {[
                  "DevOps Container packaging (limited Docker setups)",
                  "AWS cloud deployment pipelines (ECS & Lambda triggers)",
                  "Database scaling queries & pagination models",
                  "GraphQL caching mechanisms at scale"
                ].map((w, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-slate-650 dark:text-slate-350">
                    <AlertTriangle className="w-4 h-4 text-amber-500/90 shrink-0 mt-0.5" />
                    {w}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Roadmap Generator */}
          <div className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b]/40 p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-850 pb-3 mb-2">
              <div>
                <h3 className="font-bold text-sm text-slate-800 dark:text-white flex items-center gap-2">
                  <Map className="w-4.5 h-4.5 text-blue-500" />
                  AI Guided Learning Roadmap
                </h3>
                <p className="text-[10px] text-slate-400 mt-1">Get custom, detailed phases to target your core weaknesses and level up.</p>
              </div>

              <button
                onClick={handleGenerateRoadmap}
                disabled={generatingRoadmap}
                className="px-4 py-2 bg-slate-900 dark:bg-blue-600 hover:bg-slate-850 dark:hover:bg-blue-700 text-white rounded-lg text-[10px] font-bold shadow flex items-center gap-1.5 transition-all disabled:opacity-60 self-start shrink-0"
              >
                {generatingRoadmap ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Plotting...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    Generate Learning Roadmap
                  </>
                )}
              </button>
            </div>

            {/* Generated roadmap */}
            {roadmapData.length > 0 ? (
              <div className="space-y-4 pt-2">
                {roadmapData.map((step, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => setRoadmapStep(roadmapStep === idx ? null : idx)}
                    className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/10 cursor-pointer hover:border-slate-400 text-xs transition-colors flex gap-3.5"
                  >
                    <span className="w-5.5 h-5.5 rounded-lg bg-blue-500 text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                      #{idx + 1}
                    </span>
                    <div className="space-y-1">
                      <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                        {step.split("—")[0]}
                        <ChevronRight className={`w-3.5 h-3.5 text-slate-400 transition-transform ${roadmapStep === idx ? "rotate-90" : ""}`} />
                      </div>
                      {roadmapStep === idx && (
                        <p className="text-slate-500 dark:text-slate-450 leading-relaxed pt-1 select-none">
                          {step.split("—")[1]}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 rounded-xl border border-dashed border-slate-200 dark:border-slate-800/50 bg-slate-50/10 text-[10px] text-slate-400 font-semibold select-none">
                Click generate above to construct a step-by-step career path study guide.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
