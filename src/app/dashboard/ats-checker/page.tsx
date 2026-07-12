"use client";

import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { 
  Sparkles, 
  FileText, 
  Search, 
  UploadCloud, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  TrendingUp, 
  X, 
  Loader2, 
  Info,
  ShieldCheck
} from "lucide-react";

export default function AtsChecker() {
  const { resumes, isPremium, setPremium } = useAppStore();
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(true); // Default scanned so demo is visible immediately
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>("alex_rivera_resume.pdf");

  const recentResume = resumes[0] || null;

  const handleScanTrigger = () => {
    setScanning(true);
    setScanned(false);
    setTimeout(() => {
      setScanning(false);
      setScanned(true);
    }, 1800);
  };

  const missingKeywords = [
    { word: "Kubernetes", category: "DevOps" },
    { word: "CI/CD Pipelines", category: "DevOps" },
    { word: "GraphQL APIs", category: "Backend" },
    { word: "Docker Containers", category: "DevOps" },
    { word: "Unit Testing (Jest)", category: "Testing" },
    { word: "OAuth Authentication", category: "Security" }
  ];

  const weakBullets = [
    {
      original: "Worked on Vercel frontend dashboards.",
      improved: "Spearheaded development of core web builder application modules, optimizing client bundles and achieving a 32% reduction in TTI.",
      impact: "+32% Speed boost"
    },
    {
      original: "Responsible for fixing database load queries.",
      improved: "Integrated secure RESTful and GraphQL endpoints, minimizing client query load times by 220ms on average.",
      impact: "-220ms API latency"
    },
    {
      original: "Assisted junior developers with React training.",
      improved: "Mentored 4 junior engineers on modern React concurrency architectures and TypeScript best practices.",
      impact: "Team leadership"
    }
  ];

  const breakdownMetrics = [
    { label: "Keyword Matching", score: 82, status: "Passed", color: "bg-blue-500" },
    { label: "Formatting & Margins", score: 95, status: "Excellent", color: "bg-emerald-500" },
    { label: "Readability & Hierarchy", score: 88, status: "Passed", color: "bg-emerald-500" },
    { label: "Action Verbs Density", score: 78, status: "Needs Improvement", color: "bg-amber-500" },
    { label: "Section Structure", score: 90, status: "Passed", color: "bg-emerald-500" },
    { label: "Grammar & Spellcheck", score: 94, status: "Excellent", color: "bg-emerald-500" }
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold tracking-tight">ATS Optimisation Auditor</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Compare your resume layout against key filtering criteria used by modern recruiters.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN: Upload / Trigger Panel */}
        <div className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b]/40 p-6 space-y-6">
          <h3 className="font-bold text-sm text-slate-800 dark:text-white">Active Document</h3>

          {/* File Select Area */}
          <div 
            className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
              dragActive 
                ? "border-blue-500 bg-blue-500/5" 
                : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/10 hover:border-slate-400"
            }`}
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => { e.preventDefault(); setDragActive(false); setUploadedFile(e.dataTransfer.files[0]?.name || "resume.pdf"); }}
          >
            <UploadCloud className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
              {uploadedFile ? uploadedFile : "Drag and drop your resume file"}
            </div>
            <p className="text-[10px] text-slate-500 mb-4">Supports PDF, DOCX, TXT formats up to 5MB</p>
            <button 
              onClick={() => setUploadedFile("alex_rivera_resume.pdf")}
              className="px-3.5 py-2 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold rounded-lg text-slate-650 dark:text-slate-300 transition-all"
            >
              Browse Files
            </button>
          </div>

          <div className="space-y-3.5">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Selected resume content:</span>
              <span className="font-bold text-slate-700 dark:text-slate-350">{recentResume ? recentResume.title : "None"}</span>
            </div>
            
            <button
              onClick={handleScanTrigger}
              disabled={scanning}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/10 hover:shadow-blue-500/30 flex items-center justify-center gap-2 transition-all disabled:opacity-60"
            >
              {scanning ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Running Auditing Engine...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  Scan Resume for ATS Filters
                </>
              )}
            </button>
          </div>

          <div className="p-3.5 bg-blue-500/5 border border-blue-500/10 rounded-xl flex gap-3 text-xs leading-relaxed text-blue-600 dark:text-blue-300">
            <Info className="w-5 h-5 shrink-0" />
            <p>Our checker matches common parameters in Taleo, Greenhouse, and Workday filter parsers.</p>
          </div>
        </div>

        {/* RIGHT COLUMN: Audit Report (Scanner Loader, Skeletons or Details) */}
        <div className="lg:col-span-2 space-y-6">
          {scanning && (
            <div className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b]/40 p-8 flex flex-col items-center justify-center space-y-5 min-h-[400px]">
              <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
              <div className="text-center space-y-1">
                <h4 className="font-bold text-sm">Parsing Layout Elements</h4>
                <p className="text-xs text-slate-400">Verifying fonts, margins, headings, and keyword densities...</p>
              </div>
            </div>
          )}

          {scanned && !scanning && (
            <div className="space-y-6">
              {/* Score widget */}
              <div className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b]/40 p-6 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex flex-col items-center md:items-start space-y-3">
                  <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full uppercase tracking-wider">
                    ATS Audit Passed
                  </span>
                  <h3 className="font-extrabold text-2xl text-slate-800 dark:text-white text-center md:text-left">
                    Overall ATS Score: 88%
                  </h3>
                  <p className="text-xs text-slate-400 max-w-sm text-center md:text-left leading-relaxed">
                    Excellent alignment. Your document is cleanly structured and stands an extremely high likelihood of passing automatic filtration screenings.
                  </p>
                </div>

                {/* Score Gauge Visual */}
                <div className="w-36 h-36 rounded-full border-[10px] border-slate-100 dark:border-slate-800 flex items-center justify-center relative shadow-inner">
                  <div className="absolute inset-[-10px] rounded-full border-[10px] border-emerald-500 border-t-transparent border-r-transparent transform -rotate-45" />
                  <div className="text-center">
                    <span className="text-4xl font-black text-slate-800 dark:text-white">88</span>
                    <span className="text-xs text-slate-400 font-semibold block">/100</span>
                  </div>
                </div>
              </div>

              {/* Score Breakdown Lists */}
              <div className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b]/40 p-6 space-y-5">
                <h3 className="font-bold text-sm border-b border-slate-100 dark:border-slate-850 pb-2 mb-4">ATS Grade Breakdown</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  {breakdownMetrics.map((item, idx) => (
                    <div key={idx} className="space-y-2 text-xs">
                      <div className="flex justify-between font-bold">
                        <span className="text-slate-700 dark:text-slate-350">{item.label}</span>
                        <span className="text-slate-500">{item.score}% ({item.status})</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className={`h-full ${item.color}`} style={{ width: `${item.score}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Missing Keywords and Suggestions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Missing Keywords */}
                <div className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b]/40 p-6 space-y-4">
                  <h3 className="font-bold text-sm text-slate-800 dark:text-white flex items-center gap-1.5">
                    <AlertCircle className="w-4.5 h-4.5 text-blue-500" />
                    Missing Critical Keywords
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Based on standard software development benchmarks, inserting these skills will increase score ranking margins.
                  </p>
                  
                  <div className="flex flex-wrap gap-2.5 pt-2">
                    {missingKeywords.map((kw, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1.5 rounded-lg border border-blue-500/20 bg-blue-500/5 text-xs text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1"
                      >
                        + {kw.word}
                        <span className="text-[9px] text-slate-400 font-normal">({kw.category})</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Structure / Suggestions */}
                <div className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b]/40 p-6 space-y-4">
                  <h3 className="font-bold text-sm text-slate-800 dark:text-white">Formatting Auditing Checklist</h3>
                  
                  <div className="space-y-3 pt-2 text-xs">
                    {[
                      { status: true, text: "Simple, single-column table layout verified" },
                      { status: true, text: "Industry standard fonts (Inter, Arial, Georgia) used" },
                      { status: true, text: "Headers formatted as standard text (no text-in-images)" },
                      { status: false, text: "Contains 3 weak achievements bullet points without metrics" },
                      { status: true, text: "Sections arranged in chronological order" }
                    ].map((chk, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        {chk.status ? (
                          <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                        ) : (
                          <AlertCircle className="w-4.5 h-4.5 text-amber-500 shrink-0 mt-0.5" />
                        )}
                        <span className={chk.status ? "text-slate-600 dark:text-slate-400" : "text-slate-800 dark:text-slate-250 font-semibold"}>
                          {chk.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Side-by-side AI Enhancer Audit Suggestions */}
              <div className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b]/40 p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-850 pb-3 mb-2">
                  <h3 className="font-bold text-sm text-slate-800 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-4.5 h-4.5 text-blue-500" />
                    AI Bullet Points Optimization Diff
                  </h3>
                  <span className="text-[10px] text-blue-500 font-extrabold">AUTOMATIC REWRITING SUGGESTIONS</span>
                </div>

                <div className="space-y-5">
                  {weakBullets.map((bl, i) => (
                    <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      {/* Original */}
                      <div className="p-3 bg-red-500/5 border border-red-500/10 rounded-xl space-y-1.5">
                        <div className="font-bold text-red-500">Original Bullet Point:</div>
                        <p className="text-slate-500 dark:text-slate-400 italic">&quot;{bl.original}&quot;</p>
                      </div>

                      {/* Improved */}
                      <div className="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-xl space-y-1.5 relative overflow-hidden">
                        <div className="absolute top-3 right-3 text-[9px] font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded uppercase">
                          {bl.impact}
                        </div>
                        <div className="font-bold text-emerald-500 flex items-center gap-1">
                          Optimized Bullet:
                        </div>
                        <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">&quot;{bl.improved}&quot;</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
