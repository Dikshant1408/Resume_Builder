"use client";

import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { 
  Sparkles, 
  Globe, 
  ExternalLink, 
  Download, 
  Zap, 
  Check, 
  Loader2, 
  Laptop, 
  Cpu, 
  Code,
  Layout,
  Terminal,
  Grid,
  Send,
  Eye,
  CheckCircle2,
  FolderGit
} from "lucide-react";

export default function PortfolioGenerator() {
  const { resumes, portfolio, updatePortfolio } = useAppStore();
  const [selectedResumeId, setSelectedResumeId] = useState(resumes[0]?.id || "");
  const [selectedTheme, setSelectedTheme] = useState<"minimal" | "developer" | "creative" | "corporate">("developer");
  
  // Custom domains
  const [domainInput, setDomainInput] = useState(portfolio.customDomain);
  const [domainStatus, setDomainStatus] = useState<"none" | "saved">("saved");
  
  // Deployment simulation states
  const [deploying, setDeploying] = useState(false);
  const [deployStep, setDeployStep] = useState(0);

  // Export state
  const [exportFormat, setExportFormat] = useState<"html" | "react" | "next">("react");
  const [exporting, setExporting] = useState(false);
  const [exported, setExported] = useState(false);

  const activeResume = resumes.find((r) => r.id === selectedResumeId) || resumes[0] || null;

  const handleSaveDomain = () => {
    updatePortfolio({ customDomain: domainInput });
    setDomainStatus("saved");
    setTimeout(() => setDomainStatus("none"), 3000);
  };

  const handleDeploy = () => {
    setDeploying(true);
    setDeployStep(1);
    
    // Step 1: Package project
    setTimeout(() => {
      setDeployStep(2);
      // Step 2: Build bundle
      setTimeout(() => {
        setDeployStep(3);
        // Step 3: DNS Routing
        setTimeout(() => {
          updatePortfolio({ 
            isDeployed: true, 
            deploymentUrl: `https://resumeforge-${activeResume?.content?.personalInfo?.fullName?.toLowerCase().replace(/\s+/g, "-") || "alex-rivera"}.vercel.app` 
          });
          setDeploying(false);
          setDeployStep(0);
        }, 1200);
      }, 1000);
    }, 800);
  };

  const handleExport = () => {
    setExporting(true);
    setExported(false);
    setTimeout(() => {
      setExporting(false);
      setExported(true);
      setTimeout(() => setExported(false), 3000);
      
      // Simulated file download
      const content = `// Portfolio code exported for ${activeResume?.content?.personalInfo?.fullName}\n// Theme: ${selectedTheme}\n// Format: ${exportFormat}`;
      const blob = new Blob([content], { type: "text/javascript" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `portfolio_${selectedTheme}_${exportFormat}.tsx`;
      link.click();
      URL.revokeObjectURL(url);
    }, 1500);
  };

  // Mock Render of Portfolio Landing Page inside Preview Mock Browser
  const renderMockPortfolio = () => {
    if (!activeResume) return null;
    const { personalInfo, summary, experience, projects, skills } = activeResume.content;

    if (selectedTheme === "developer") {
      return (
        <div className="bg-[#0f141d] text-slate-100 font-mono p-6 text-xs h-full overflow-y-auto space-y-8 select-none">
          {/* Header */}
          <div className="border-b border-slate-800 pb-4">
            <div className="text-[10px] text-cyan-400 font-bold mb-1">$ cat developer.json</div>
            <h1 className="text-lg font-black text-white">{personalInfo.fullName}</h1>
            <div className="text-slate-400 text-[10px] mt-0.5">&gt; Senior Frontend Architect & Engineer</div>
            <div className="flex gap-4 text-slate-500 text-[9px] mt-2">
              <span>{personalInfo.email}</span>
              <span>{personalInfo.location}</span>
            </div>
          </div>

          {/* About */}
          <div className="space-y-2">
            <div className="text-[10px] text-cyan-400 font-bold">&gt; Profile summary:</div>
            <p className="text-slate-350 leading-relaxed font-sans">{summary}</p>
          </div>

          {/* Tech stack */}
          <div className="space-y-3">
            <div className="text-[10px] text-cyan-400 font-bold">&gt; Compiled skill matrix:</div>
            <div className="flex flex-wrap gap-2 font-sans">
              {skills.map((sk) => 
                sk.skills.split(",").map((s, idx) => (
                  <span key={idx} className="px-2 py-1 rounded bg-[#172030] text-cyan-400 border border-cyan-500/10 text-[9px] font-bold">
                    {s.trim()}
                  </span>
                ))
              )}
            </div>
          </div>

          {/* Projects */}
          <div className="space-y-4">
            <div className="text-[10px] text-cyan-400 font-bold">&gt; Projects output:</div>
            <div className="grid grid-cols-2 gap-4 font-sans text-left">
              {projects.map((proj) => (
                <div key={proj.id} className="p-3 bg-[#131b26] border border-slate-800 rounded-lg space-y-1.5 hover:border-cyan-500/30 transition-all">
                  <h4 className="font-bold text-white text-[11px] flex items-center gap-1.5">
                    <FolderGit className="w-3.5 h-3.5 text-cyan-400" />
                    {proj.name}
                  </h4>
                  <p className="text-[10px] text-slate-400 leading-normal">{proj.description}</p>
                  <div className="text-[9px] font-bold text-cyan-400 uppercase tracking-wider">{proj.technologies}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-4">
            <div className="text-[10px] text-cyan-400 font-bold">&gt; Professional pipeline:</div>
            <div className="space-y-3 border-l border-slate-800 pl-4 font-sans text-left ml-1">
              {experience.map((exp) => (
                <div key={exp.id} className="space-y-1 text-[11px] relative">
                  <div className="absolute -left-[20.5px] top-1 w-2.5 h-2.5 rounded-full bg-cyan-400 border-2 border-[#0f141d]" />
                  <div className="font-bold text-slate-200">
                    {exp.role} <span className="font-normal text-slate-400">at</span> {exp.company}
                  </div>
                  <div className="text-[10px] text-slate-500">{exp.startDate} – {exp.current ? "Present" : exp.endDate}</div>
                  <p className="text-[10px] text-slate-400 leading-normal">{exp.description.split("\n")[0]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (selectedTheme === "minimal") {
      return (
        <div className="bg-white text-slate-900 font-serif p-8 text-xs h-full overflow-y-auto space-y-8 select-none text-left leading-relaxed">
          <div className="space-y-1.5 pb-4 border-b border-slate-200">
            <h1 className="text-xl font-bold tracking-tight">{personalInfo.fullName}</h1>
            <div className="text-[10px] uppercase font-sans text-slate-400 tracking-widest">Selected portfolio profile</div>
          </div>
          <p className="italic text-slate-600 font-sans text-[11px] leading-relaxed">{summary}</p>
          
          <div className="space-y-3 pt-2">
            <h3 className="font-sans font-bold text-[10px] uppercase text-slate-400 tracking-wider">Experience</h3>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="space-y-1 font-sans">
                  <div className="flex justify-between font-bold text-slate-800">
                    <span>{exp.role} — {exp.company}</span>
                    <span className="text-[10px] text-slate-400 font-normal">{exp.startDate} – {exp.current ? "Present" : exp.endDate}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-normal">{exp.description.split("\n")[0]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (selectedTheme === "creative") {
      return (
        <div className="bg-[#0b0312] text-slate-100 p-8 h-full overflow-y-auto space-y-8 select-none text-left leading-relaxed">
          <div className="text-center space-y-2 py-4">
            <h1 className="text-2xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">{personalInfo.fullName}</h1>
            <p className="text-slate-400 text-xs font-semibold tracking-wider">CREATING IMPACT DIGITAL SOLUTIONS</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-350">
            {summary}
          </div>
        </div>
      );
    }

    // Corporate Default
    return (
      <div className="bg-[#f8fafc] text-slate-800 p-6 h-full overflow-y-auto space-y-6 select-none text-left leading-relaxed font-sans">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-lg font-bold text-slate-900">{personalInfo.fullName}</h1>
            <p className="text-xs text-slate-500">{personalInfo.email}</p>
          </div>
          <span className="text-[9px] font-bold bg-blue-600 text-white px-2.5 py-1 rounded-md uppercase">Professional Consultant</span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed bg-white p-4 rounded-xl border border-slate-200 shadow-sm">{summary}</p>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-xl font-extrabold tracking-tight">Interactive Portfolio Generator</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Transform your resume specifications into a live, responsive personal portfolio website in one click.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Controls & Settings */}
        <div className="lg:col-span-5 space-y-6">
          {/* Active Settings Panel */}
          <div className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b]/40 p-6 space-y-5">
            <h3 className="font-bold text-sm text-slate-850 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-850 pb-2 mb-2">
              <Globe className="w-5 h-5 text-blue-500" />
              Website Configurations
            </h3>

            {/* Resume Selector */}
            <div className="space-y-1.5 text-xs">
              <label className="font-bold text-slate-500 dark:text-slate-400">Source Profile Resume</label>
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

            {/* Theme Selector presets */}
            <div className="space-y-2.5 text-xs">
              <label className="font-bold text-slate-500 dark:text-slate-400">Visual Theme Template</label>
              <div className="grid grid-cols-2 gap-2 font-bold text-[10px] text-slate-500">
                {[
                  { id: "developer", label: "Dev terminal", icon: <Terminal className="w-4 h-4" /> },
                  { id: "minimal", label: "Serif Minimal", icon: <Layout className="w-4 h-4" /> },
                  { id: "creative", label: "Dark Creative", icon: <Sparkles className="w-4 h-4" /> },
                  { id: "corporate", label: "Corporate Suite", icon: <Grid className="w-4 h-4" /> }
                ].map((th) => (
                  <button
                    key={th.id}
                    onClick={() => setSelectedTheme(th.id as any)}
                    className={`px-3.5 py-3 rounded-xl border flex items-center gap-2 transition-colors text-left ${
                      selectedTheme === th.id 
                        ? "border-blue-500/30 bg-blue-500/10 text-blue-500" 
                        : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/10 hover:text-slate-850 dark:hover:text-slate-200"
                    }`}
                  >
                    {th.icon}
                    {th.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Domain Settings */}
            <div className="space-y-2 text-xs">
              <label className="font-bold text-slate-500 dark:text-slate-400">Custom Domain Name Link</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={domainInput} 
                  onChange={(e) => setDomainInput(e.target.value)}
                  placeholder="e.g. yourname.com"
                  className="flex-1 px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-transparent focus:ring-1 focus:ring-blue-500 outline-none font-medium"
                />
                <button 
                  onClick={handleSaveDomain}
                  className="px-4 py-2 bg-slate-900 dark:bg-slate-800 text-xs font-bold rounded-lg hover:bg-slate-800 hover:text-white border border-slate-200 dark:border-slate-750 transition-all shrink-0"
                >
                  Save DNS
                </button>
              </div>
              {domainStatus === "saved" && (
                <div className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Domain DNS updated successfully.
                </div>
              )}
            </div>

            {/* Simulated Deployment triggers */}
            <div className="pt-2">
              {deploying ? (
                <div className="p-3 bg-blue-500/5 border border-blue-500/10 rounded-xl space-y-2 text-xs">
                  <div className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-350">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-500" />
                    <span>
                      {deployStep === 1 && "Packaging static pages..."}
                      {deployStep === 2 && "Compiling NextJS route trees..."}
                      {deployStep === 3 && "Binding custom DNS mappings..."}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 transition-all duration-300"
                      style={{ width: `${(deployStep / 3) * 100}%` }}
                    />
                  </div>
                </div>
              ) : (
                <button 
                  onClick={handleDeploy}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/10 hover:shadow-blue-500/30 flex items-center justify-center gap-2 transition-all"
                >
                  <Zap className="w-4 h-4 fill-current shrink-0 text-amber-500 animate-pulse" />
                  Deploy Live Website to Vercel
                </button>
              )}
            </div>
          </div>

          {/* Export Code Assets Panel */}
          <div className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b]/40 p-6 space-y-4">
            <h3 className="font-bold text-sm text-slate-800 dark:text-white">Export Code Bundle</h3>
            
            <div className="flex gap-2">
              {[
                { id: "react", label: "React Component" },
                { id: "next", label: "NextJS Route" },
                { id: "html", label: "HTML/CSS Static" }
              ].map((format) => (
                <button
                  key={format.id}
                  onClick={() => setExportFormat(format.id as any)}
                  className={`flex-1 py-2 text-[10px] font-bold rounded-lg border transition-colors ${
                    exportFormat === format.id 
                      ? "border-blue-500/30 bg-blue-500/10 text-blue-500" 
                      : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/10 text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {format.label}
                </button>
              ))}
            </div>

            <button
              onClick={handleExport}
              disabled={exporting}
              className="w-full py-2.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold rounded-xl flex items-center justify-center gap-2 text-slate-700 dark:text-slate-300 transition-all disabled:opacity-60"
            >
              {exporting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Exporting Source Files...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Export Code Source Files
                </>
              )}
            </button>
            {exported && (
              <div className="text-[10px] text-emerald-500 font-bold flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Source code downloaded!
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Browser simulated frame view */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b]/40 overflow-hidden shadow-2xl flex flex-col h-[520px]">
            {/* Browser Address Bar Chrome layout */}
            <div className="px-4 py-3.5 border-b border-slate-200 dark:border-slate-800/80 bg-slate-100 dark:bg-slate-900 flex items-center gap-3 select-none">
              {/* Chrome Buttons */}
              <div className="flex gap-1.5 shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>

              {/* Address input */}
              <div className="flex-1 max-w-sm mx-auto px-4.5 py-1 bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-850 rounded-lg text-[10px] text-slate-400 flex items-center justify-between font-medium">
                <div className="flex items-center gap-1.5 truncate">
                  <Globe className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-slate-600 dark:text-slate-400 font-bold">https://</span>
                  <span className="truncate">{portfolio.customDomain || "alexrivera.dev"}</span>
                </div>
                {portfolio.isDeployed && (
                  <a 
                    href={portfolio.deploymentUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="hover:text-blue-500 text-slate-500"
                    title="Open live in new tab"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              {/* Deployment status badge */}
              {portfolio.isDeployed ? (
                <span className="text-[9px] font-black text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md uppercase tracking-wider shrink-0">
                  LIVE DEPLOYED
                </span>
              ) : (
                <span className="text-[9px] font-black text-slate-400 bg-slate-200/50 dark:bg-slate-800 px-2 py-0.5 rounded-md uppercase tracking-wider shrink-0">
                  DRAFT PREVIEW
                </span>
              )}
            </div>

            {/* Live Portfolio Inner Canvas */}
            <div className="flex-1 relative overflow-hidden bg-slate-50 dark:bg-slate-950">
              {renderMockPortfolio()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
