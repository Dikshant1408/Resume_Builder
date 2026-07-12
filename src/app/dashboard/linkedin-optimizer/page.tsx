"use client";

import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { 
  Sparkles, 
  TrendingUp, 
  Copy, 
  Check, 
  Loader2, 
  FileText,
  UserCheck,
  CheckCircle2,
  Info
} from "lucide-react";

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function LinkedInOptimizer() {
  const { resumes } = useAppStore();
  const [profileText, setProfileText] = useState("");
  const [targetRole, setTargetRole] = useState("Senior Frontend Engineer");
  const [actionType, setActionType] = useState<"headline" | "about" | "skills">("headline");

  // Output states
  const [loading, setLoading] = useState(false);
  const [optimizedText, setOptimizedText] = useState("");
  const [copied, setCopied] = useState(false);

  const activeResume = resumes[0] || null;

  const handleOptimize = async () => {
    if (!profileText.trim() && actionType !== "about") return;
    setLoading(true);
    setCopied(false);
    
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "linkedin",
          text: JSON.stringify({
            profileText,
            targetRole,
            actionType,
            userName: activeResume?.content.personalInfo.fullName || "Applicant",
            userSummary: activeResume?.content.summary || "",
            userSkills: activeResume?.content.skills.map(s => s.skills).join(", ") || ""
          })
        })
      });
      const data = await res.json();
      setOptimizedText(data.result || "Failed to generate LinkedIn copy.");
    } catch (err) {
      console.error(err);
      setOptimizedText("Failed to optimize. Service offline.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(optimizedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-xl font-extrabold tracking-tight">LinkedIn Profile Optimiser</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Tailor your professional headline, write engaging about summaries, and audit search keywords for higher profile visibility.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Controls & input */}
        <div className="lg:col-span-5 glass-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b]/40 p-6 space-y-4">
          <h3 className="font-bold text-sm text-slate-850 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-850 pb-2 mb-2">
            <LinkedinIcon className="w-5 h-5 text-blue-500" />
            Profile Input Data
          </h3>

          {/* Action select */}
          <div className="space-y-1.5 text-xs">
            <label className="font-bold text-slate-500 dark:text-slate-400">What section do you want to optimize?</label>
            <div className="grid grid-cols-3 gap-2 text-[10px] font-bold text-slate-500">
              {[
                { id: "headline", label: "Headline" },
                { id: "about", label: "About Bio" },
                { id: "skills", label: "Keywords" }
              ].map((act) => (
                <button
                  key={act.id}
                  onClick={() => setActionType(act.id as any)}
                  className={`py-2 rounded-lg border text-center transition-colors ${
                    actionType === act.id 
                      ? "border-blue-500/30 bg-blue-500/10 text-blue-500" 
                      : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/10 hover:text-slate-850 dark:hover:text-slate-200"
                  }`}
                >
                  {act.label}
                </button>
              ))}
            </div>
          </div>

          {/* Target job */}
          <div className="space-y-1.5 text-xs">
            <label className="font-bold text-slate-500 dark:text-slate-400">Target Role Title</label>
            <input 
              type="text" 
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-transparent focus:ring-1 focus:ring-blue-500 outline-none font-medium"
            />
          </div>

          {/* Source Input */}
          <div className="space-y-1.5 text-xs">
            <label className="font-bold text-slate-500 dark:text-slate-400">
              {actionType === "headline" && "Paste Current Headline (or leave blank to generate)"}
              {actionType === "about" && "Paste Current About Section (or leave blank to generate)"}
              {actionType === "skills" && "Paste Skills list (separated by comma)"}
            </label>
            <textarea
              rows={6}
              placeholder={
                actionType === "headline" ? "e.g. Software Engineer at InnovateTech" :
                actionType === "about" ? "e.g. Dynamic software developer looking for new opportunities..." :
                "e.g. React, JavaScript, DevOps, CSS"
              }
              value={profileText}
              onChange={(e) => setProfileText(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-transparent focus:ring-1 focus:ring-blue-500 outline-none font-medium leading-relaxed"
            />
          </div>

          <button
            onClick={handleOptimize}
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/10 hover:shadow-blue-500/30 flex items-center justify-center gap-2 transition-all"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Optimizing Profile...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate Optimized Copy
              </>
            )}
          </button>
        </div>

        {/* RIGHT COLUMN: Output display sheet */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b]/40 overflow-hidden flex flex-col min-h-[400px]">
            {/* Toolbar */}
            <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/60 flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Optimized LinkedIn Result</span>
              
              <button 
                onClick={handleCopy}
                disabled={!optimizedText}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 transition-colors flex items-center gap-1.5 font-bold text-xs text-slate-500"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy Output"}</span>
              </button>
            </div>

            {/* Render Canvas */}
            <div className="flex-1 p-6 md:p-8 flex justify-center bg-slate-200/50 dark:bg-[#070a13]">
              <div className="w-[500px] bg-white text-slate-900 shadow-xl border border-slate-350 p-6 rounded-lg leading-relaxed text-left text-xs font-sans whitespace-pre-wrap">
                {optimizedText ? optimizedText : (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-3 p-10">
                    <LinkedinIcon className="w-8 h-8 text-slate-300" />
                    <div className="text-slate-400 font-bold">Profile copy is empty</div>
                    <p className="text-[10px] text-slate-450 leading-relaxed max-w-xs">
                      Select a section type, paste your current copy on the left panel, and click Generate to see optimization recommendations.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl flex gap-3 text-xs leading-relaxed text-blue-600 dark:text-blue-300">
            <Info className="w-5 h-5 shrink-0" />
            <p>Our algorithms generate headlines that follow popular recruiters search keyword structures (Title | Core Stack | Metrics Key Outcome | Interests).</p>
          </div>
        </div>
      </div>
    </div>
  );
}
