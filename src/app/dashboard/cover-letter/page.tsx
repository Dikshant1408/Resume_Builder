"use client";

import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { 
  Sparkles, 
  Mail, 
  Copy, 
  Download, 
  RefreshCw, 
  Check, 
  Trash2, 
  Loader2, 
  FileText,
  Briefcase
} from "lucide-react";

export default function CoverLetterGenerator() {
  const { resumes, coverLetters, addCoverLetter, deleteCoverLetter } = useAppStore();
  const [selectedResumeId, setSelectedResumeId] = useState(resumes[0]?.id || "");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [tone, setTone] = useState<"formal" | "friendly" | "startup" | "corporate">("formal");

  // Output states
  const [loading, setLoading] = useState(false);
  const [currentLetter, setCurrentLetter] = useState(coverLetters[0]?.content || "");
  const [copied, setCopied] = useState(false);

  const activeResume = resumes.find((r) => r.id === selectedResumeId) || resumes[0] || null;

  const handleGenerate = async () => {
    if (!company.trim() || !role.trim()) return;
    setLoading(true);
    setCopied(false);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          action: "cover-letter",
          text: JSON.stringify({
            company,
            role,
            tone,
            jobDescription,
            userName: activeResume?.content.personalInfo.fullName || "Applicant",
            userSummary: activeResume?.content.summary || "",
            userExperience: activeResume?.content.experience.map(e => `${e.role} at ${e.company}`).join(", ") || ""
          })
        })
      });
      const data = await res.json();
      const textResult = data.result || "Dear Hiring Team,\n\nError generating letter.";
      setCurrentLetter(textResult);
      addCoverLetter(company, role, tone, textResult);
    } catch (err) {
      console.error(err);
      setCurrentLetter("Failed to generate cover letter. Service unavailable.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([currentLetter], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${company.replace(/\s+/g, "_")}_Cover_Letter.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-xl font-extrabold tracking-tight">AI Cover Letter Builder</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Generate customized, highly targeted cover letters for specific job roles and company cultures.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Input Form */}
        <div className="lg:col-span-5 glass-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b]/40 p-6 space-y-4">
          <h3 className="font-bold text-sm text-slate-850 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-850 pb-2 mb-2">
            <Mail className="w-5 h-5 text-blue-500" />
            Letter Specifications
          </h3>

          {/* Selected Resume */}
          <div className="space-y-1.5 text-xs">
            <label className="font-bold text-slate-500 dark:text-slate-400">Target Resume Data</label>
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

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-500 dark:text-slate-400">Company Name</label>
              <input 
                type="text" 
                placeholder="e.g. Google"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-transparent focus:ring-1 focus:ring-blue-500 outline-none font-medium"
              />
            </div>
            <div className="space-y-1.5">
              <label className="font-bold text-slate-500 dark:text-slate-400">Target Role Title</label>
              <input 
                type="text" 
                placeholder="e.g. Product Designer"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-transparent focus:ring-1 focus:ring-blue-500 outline-none font-medium"
              />
            </div>
          </div>

          {/* Tone Picker */}
          <div className="space-y-1.5 text-xs">
            <label className="font-bold text-slate-500 dark:text-slate-400">Writing Tone Culture</label>
            <div className="grid grid-cols-2 gap-2 text-[10px] font-bold text-slate-500">
              {[
                { id: "formal", label: "Formal/Traditional" },
                { id: "friendly", label: "Friendly/Empathetic" },
                { id: "startup", label: "Startup/Creative" },
                { id: "corporate", label: "Corporate/Executive" }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTone(t.id as any)}
                  className={`px-3 py-2.5 rounded-lg border text-left transition-colors ${
                    tone === t.id 
                      ? "border-blue-500/30 bg-blue-500/10 text-blue-500" 
                      : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/10 hover:text-slate-850 dark:hover:text-slate-200"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Job Description (Optional) */}
          <div className="space-y-1.5 text-xs">
            <label className="font-bold text-slate-500 dark:text-slate-400">Key Job Description bullets (Optional)</label>
            <textarea
              rows={4}
              placeholder="Paste specific job requirements bullets to target with AI optimization..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-transparent focus:ring-1 focus:ring-blue-500 outline-none font-medium leading-relaxed"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading || !company.trim() || !role.trim()}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/10 hover:shadow-blue-500/30 flex items-center justify-center gap-2 transition-all disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Forging Cover Letter...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate Cover Letter
              </>
            )}
          </button>
        </div>

        {/* RIGHT COLUMN: Output Editor sheet */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b]/40 overflow-hidden flex flex-col min-h-[500px]">
            {/* Sheet Toolbar */}
            <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/60 flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Document Editor</span>
              
              <div className="flex items-center gap-2 font-bold text-xs text-slate-500">
                <button 
                  onClick={handleCopy}
                  disabled={!currentLetter}
                  className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 transition-colors flex items-center gap-1.5"
                  title="Copy to Clipboard"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>

                <button 
                  onClick={handleDownload}
                  disabled={!currentLetter}
                  className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 transition-colors flex items-center gap-1.5"
                  title="Download as TXT"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>

            {/* Letter Sheet */}
            <div className="flex-1 p-6 md:p-8 flex justify-center bg-slate-200/50 dark:bg-[#070a13] min-h-[400px]">
              <div className="w-[500px] bg-white text-slate-900 shadow-xl border border-slate-350 p-8 rounded-sm leading-relaxed text-left text-xs font-serif font-medium whitespace-pre-wrap">
                {currentLetter ? currentLetter : (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-3 p-10 font-sans">
                    <Mail className="w-8 h-8 text-slate-300" />
                    <div className="text-slate-400 font-bold">Document is empty</div>
                    <p className="text-[10px] text-slate-450 leading-relaxed max-w-xs">
                      Enter the company and target job role parameters in the left form and generate your custom AI letter.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* History / Previous Cover Letters */}
          {coverLetters.length > 1 && (
            <div className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b]/40 p-6 space-y-4">
              <h3 className="font-bold text-sm text-slate-800 dark:text-white">Recent Cover Letters Drafts</h3>
              <div className="space-y-2.5">
                {coverLetters.map((cl) => (
                  <div 
                    key={cl.id} 
                    className="p-3 border border-slate-100 dark:border-slate-800 rounded-xl hover:bg-slate-50/50 dark:hover:bg-slate-900/20 flex items-center justify-between text-xs transition-colors"
                  >
                    <div 
                      onClick={() => setCurrentLetter(cl.content)}
                      className="flex items-center gap-3 cursor-pointer flex-1"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-800 dark:text-slate-200">{cl.role} at {cl.company}</div>
                        <div className="text-[10px] text-slate-400 capitalize">Tone: {cl.tone} • Created {new Date(cl.createdAt).toLocaleDateString()}</div>
                      </div>
                    </div>

                    <button 
                      onClick={() => deleteCoverLetter(cl.id)}
                      className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                      title="Delete letter"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
