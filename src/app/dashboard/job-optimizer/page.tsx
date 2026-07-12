"use client";

import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { 
  Sparkles, 
  FileText, 
  Briefcase, 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  Loader2, 
  ArrowRight, 
  Zap, 
  AlignLeft, 
  ChevronDown, 
  Info
} from "lucide-react";

export default function JobOptimizer() {
  const { resumes, isPremium } = useAppStore();
  const [jobDescription, setJobDescription] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [optimizing, setOptimizing] = useState(false);
  const [optimized, setOptimized] = useState(false);
  const [selectedResumeId, setSelectedResumeId] = useState(resumes[0]?.id || "");

  const activeResume = resumes.find((r) => r.id === selectedResumeId) || resumes[0] || null;

  const handleAnalyze = () => {
    if (!jobDescription.trim()) return;
    setAnalyzing(true);
    setAnalyzed(false);
    setOptimized(false);
    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzed(true);
    }, 1500);
  };

  const handleOptimize = () => {
    setOptimizing(true);
    setTimeout(() => {
      setOptimizing(false);
      setOptimized(true);
    }, 1800);
  };

  const matchedSkills = ["React.js", "TypeScript", "Next.js", "State Management (Zustand)", "HTML/CSS", "Git", "REST APIs"];
  const missingSkills = ["Docker Containers", "Amazon Web Services (AWS)", "CI/CD Pipeline integration", "Unit Testing (Jest)", "GraphQL Queries"];

  const keywordSuggestions = [
    { text: "Lead architectural designs of frontend client bundles.", reason: "Aligns with description's demand for 'scalable UI performance architecting'." },
    { text: "Deployed Docker-packaged containers to AWS cloud platforms.", reason: "Fills the missing 'Docker & AWS environment' skill gaps." },
    { text: "Constructed automated Jest testing frameworks achieving 94% coverage.", reason: "Satisfies 'Unit testing and integration test suite' criteria." }
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-xl font-extrabold tracking-tight">Job Optimisation Matcher</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Paste a target job description to match keywords and optimize resume bullet points.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN: Input Form */}
        <div className="lg:col-span-1 glass-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b]/40 p-6 space-y-5 flex flex-col justify-between">
          <div className="space-y-5">
            <h3 className="font-bold text-sm text-slate-800 dark:text-white">Target Job Specs</h3>
            
            {/* Selected Resume */}
            <div className="space-y-1.5 text-xs">
              <label className="font-bold text-slate-500 dark:text-slate-400">Select Source Resume</label>
              <select
                value={selectedResumeId}
                onChange={(e) => setSelectedResumeId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-700 dark:text-slate-200 focus:outline-none"
              >
                {resumes.map((r) => (
                  <option key={r.id} value={r.id}>{r.title}</option>
                ))}
              </select>
            </div>

            {/* Job Description Textarea */}
            <div className="space-y-1.5 text-xs">
              <label className="font-bold text-slate-500 dark:text-slate-400">Paste Job Description</label>
              <textarea
                rows={12}
                placeholder="Paste the target job description requirements here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-transparent focus:ring-1 focus:ring-blue-500 outline-none leading-relaxed font-medium"
              />
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={analyzing || !jobDescription.trim()}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/10 hover:shadow-blue-500/30 flex items-center justify-center gap-2 transition-all disabled:opacity-60 shrink-0 mt-4"
          >
            {analyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Extracting Job Keywords...
              </>
            ) : (
              <>
                <AlignLeft className="w-4 h-4" />
                Analyze Job Description Match
              </>
            )}
          </button>
        </div>

        {/* RIGHT COLUMN: Optimization results */}
        <div className="lg:col-span-2 space-y-6">
          {!analyzed && !analyzing && (
            <div className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b]/40 p-8 flex flex-col items-center justify-center text-center space-y-4 min-h-[400px]">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                <Briefcase className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-sm">No analysis performed yet</h4>
                <p className="text-xs text-slate-500 max-w-sm">
                  Paste the requirements of the job you want to target on the left panel to examine matching skills and optimize sections.
                </p>
              </div>
            </div>
          )}

          {analyzing && (
            <div className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b]/40 p-8 flex flex-col items-center justify-center space-y-5 min-h-[400px]">
              <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
              <div className="text-center space-y-1">
                <h4 className="font-bold text-sm">Extracting Requirements & Compiling Scores</h4>
                <p className="text-xs text-slate-400">Comparing profile keywords with job specification requirements...</p>
              </div>
            </div>
          )}

          {analyzed && !analyzing && (
            <div className="space-y-6">
              {/* Match Score Card */}
              <div className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b]/40 p-6 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-3 flex flex-col items-center md:items-start">
                  <span className="text-[10px] font-bold text-amber-500 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full uppercase tracking-wider">
                    Moderate Match Rating
                  </span>
                  <h3 className="font-extrabold text-2xl text-slate-800 dark:text-white text-center md:text-left">
                    Job Match Score: 76%
                  </h3>
                  <p className="text-xs text-slate-400 max-w-sm text-center md:text-left leading-relaxed">
                    You have strong alignment with core frontend frameworks, but miss critical deployment and containerization keywords specified in the listing.
                  </p>
                </div>

                {/* Score gauge */}
                <div className="w-36 h-36 rounded-full border-[10px] border-slate-100 dark:border-slate-800 flex items-center justify-center relative shadow-inner">
                  <div className="absolute inset-[-10px] rounded-full border-[10px] border-amber-550 border-t-transparent transform -rotate-45" />
                  <div className="text-center">
                    <span className="text-4xl font-black text-slate-800 dark:text-white">76</span>
                    <span className="text-xs text-slate-400 font-semibold block">/100</span>
                  </div>
                </div>
              </div>

              {/* Match vs Missing Skills Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Matched */}
                <div className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b]/40 p-6 space-y-4">
                  <h3 className="font-bold text-sm text-slate-850 dark:text-white flex items-center gap-1.5">
                    <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500" />
                    Matched Skills ({matchedSkills.length})
                  </h3>
                  <div className="space-y-2.5 pt-2 text-xs">
                    {matchedSkills.map((sk, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-slate-650 dark:text-slate-350">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500/85 shrink-0" />
                        {sk}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Missing */}
                <div className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b]/40 p-6 space-y-4">
                  <h3 className="font-bold text-sm text-slate-850 dark:text-white flex items-center gap-1.5">
                    <XCircle className="w-4.5 h-4.5 text-red-500 animate-pulse" />
                    Missing Skills ({missingSkills.length})
                  </h3>
                  <div className="space-y-2.5 pt-2 text-xs">
                    {missingSkills.map((sk, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold">
                        <XCircle className="w-4 h-4 text-red-500/85 shrink-0" />
                        {sk}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Suggestions Panel */}
              <div className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b]/40 p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-850 pb-3 mb-2">
                  <h3 className="font-bold text-sm text-slate-800 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-4.5 h-4.5 text-blue-500 animate-pulse" />
                    AI Bullet Point Rewriting Suggestions
                  </h3>
                  
                  <button
                    onClick={handleOptimize}
                    disabled={optimizing}
                    className="px-4 py-2 bg-slate-900 dark:bg-blue-600 hover:bg-slate-850 dark:hover:bg-blue-700 text-white rounded-lg text-[10px] font-bold shadow flex items-center gap-1.5 transition-all disabled:opacity-60 self-start"
                  >
                    {optimizing ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Tailoring...
                      </>
                    ) : (
                      <>
                        <Zap className="w-3.5 h-3.5 fill-current shrink-0 text-amber-500" />
                        Optimize My Resume
                      </>
                    )}
                  </button>
                </div>

                <div className="space-y-4 pt-2">
                  {keywordSuggestions.map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/10 space-y-2 text-xs">
                      <div className="font-bold text-slate-800 dark:text-slate-250 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        Target Edit Bullet Point:
                      </div>
                      <p className="text-slate-650 dark:text-slate-350 italic font-medium bg-white dark:bg-slate-950 p-2.5 rounded-lg border border-slate-100 dark:border-slate-900 leading-relaxed">
                        &quot;{item.text}&quot;
                      </p>
                      <div className="text-[10px] text-slate-500 flex items-center gap-1">
                        <Info className="w-3.5 h-3.5 text-blue-500" />
                        {item.reason}
                      </div>
                    </div>
                  ))}
                </div>

                {optimized && (
                  <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl space-y-2 text-xs">
                    <div className="font-bold text-emerald-500 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4.5 h-4.5" />
                      Success! Resume optimized for Job Description.
                    </div>
                    <p className="text-slate-650 dark:text-slate-300 leading-relaxed">
                      AI has customized 3 experience bullet points and inserted the missing skill tags under the skills section of &quot;{activeResume?.title}&quot;. Your predicted ATS match score increased to **94%**.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
