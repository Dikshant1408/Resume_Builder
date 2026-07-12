"use client";

import { useState, useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Key, 
  CreditCard, 
  Download, 
  Trash2, 
  Check, 
  Globe2, 
  HelpCircle,
  TrendingUp,
  Cpu,
  Moon,
  Sun
} from "lucide-react";

export default function SettingsPage() {
  const { isDarkMode, toggleDarkMode, isPremium, setPremium, resumes, updateResumeContent } = useAppStore();
  const [activeSubTab, setActiveSubTab] = useState<"profile" | "billing" | "security" | "api">("profile");

  const activeResume = resumes[0] || null;
  const initialName = activeResume?.content.personalInfo.fullName || "Alex Rivera";
  const initialEmail = activeResume?.content.personalInfo.email || "alex.rivera@example.com";

  // Profile states
  const [userName, setUserName] = useState(initialName);
  const [userEmail, setUserEmail] = useState(initialEmail);
  const [resumePrivacy, setResumePrivacy] = useState("private");

  // Sync state values if resume updates
  useEffect(() => {
    if (activeResume) {
      setUserName(activeResume.content.personalInfo.fullName);
      setUserEmail(activeResume.content.personalInfo.email);
    }
  }, [activeResume]);

  // API Key simulation states
  const [apiKey, setApiKey] = useState("");
  const [keyGenerated, setKeyGenerated] = useState(false);

  const handleGenerateKey = () => {
    const key = `rf_live_` + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setApiKey(key);
    setKeyGenerated(true);
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    alert("API Key copied to clipboard!");
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-xl font-extrabold tracking-tight">Account & Developer Settings</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Manage your personal details, developer API configurations, billing cycles, and visual styling theme preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Sub Tab Navigation */}
        <div className="lg:col-span-3 glass-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b]/40 p-4 space-y-1">
          {[
            { id: "profile", label: "My Profile", icon: <User className="w-4 h-4" /> },
            { id: "billing", label: "Plans & Billing", icon: <CreditCard className="w-4 h-4" /> },
            { id: "security", label: "Privacy & Data", icon: <Shield className="w-4 h-4" /> },
            { id: "api", label: "Developer APIs", icon: <Key className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-bold rounded-xl text-left transition-colors ${
                activeSubTab === tab.id 
                  ? "gradient-accent text-white" 
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40 hover:text-slate-850 dark:hover:text-slate-250"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* RIGHT COLUMN: Settings content panels */}
        <div className="lg:col-span-9">
          {/* PROFILE PANEL */}
          {activeSubTab === "profile" && (
            <div className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b]/40 p-6 space-y-5 text-xs">
              <h3 className="font-bold text-sm border-b border-slate-100 dark:border-slate-850 pb-2 mb-2">My Profile Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-500">Full Profile Name</label>
                  <input 
                    type="text" 
                    value={userName} 
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-transparent focus:ring-1 focus:ring-blue-500 outline-none font-medium"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-500">Contact Email Address</label>
                  <input 
                    type="email" 
                    value={userEmail} 
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-transparent focus:ring-1 focus:ring-blue-500 outline-none font-medium"
                  />
                </div>
              </div>

              {/* Theme Settings toggle inside list */}
              <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-4">
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-0.5">Visual Interface Theme</h4>
                  <p className="text-[10px] text-slate-500">Toggle dark mode or light mode settings manually.</p>
                </div>
                <button
                  onClick={toggleDarkMode}
                  className="px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg font-bold flex items-center gap-1.5 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  {isDarkMode ? (
                    <>
                      <Sun className="w-3.5 h-3.5 text-yellow-500" /> Light Mode
                    </>
                  ) : (
                    <>
                      <Moon className="w-3.5 h-3.5 text-slate-500" /> Dark Mode
                    </>
                  )}
                </button>
              </div>

              <div className="flex justify-end pt-3">
                <button 
                  onClick={() => {
                    if (activeResume) {
                      updateResumeContent({
                        personalInfo: {
                          ...activeResume.content.personalInfo,
                          fullName: userName,
                          email: userEmail
                        }
                      });
                      alert("Profile details saved successfully!");
                    }
                  }}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow shadow-blue-500/10"
                >
                  Save Profile Settings
                </button>
              </div>
            </div>
          )}

          {/* BILLING PANEL */}
          {activeSubTab === "billing" && (
            <div className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b]/40 p-6 space-y-5 text-xs">
              <h3 className="font-bold text-sm border-b border-slate-100 dark:border-slate-850 pb-2 mb-2">Subscription & Billing Cycles</h3>
              
              <div className="p-4 rounded-xl border flex justify-between items-center gap-4 bg-slate-50/50 dark:bg-slate-900/10">
                <div className="space-y-1">
                  <div className="font-bold text-sm text-slate-850 dark:text-white flex items-center gap-1.5">
                    Current Plan: {isPremium ? "Premium Pro" : "Free Plan"}
                    {isPremium && <Check className="w-4 h-4 text-emerald-500" />}
                  </div>
                  <p className="text-[10px] text-slate-500 leading-relaxed">
                    {isPremium 
                      ? "Your Premium plan billing period ends on August 12, 2026. Automatic renewal is active."
                      : "You are currently running the standard free tier plan. Upgrade to unlock unlimited exports."}
                  </p>
                </div>

                <button 
                  onClick={() => setPremium(!isPremium)}
                  className="px-4.5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow shrink-0"
                >
                  {isPremium ? "Cancel Subscription" : "Upgrade to Pro"}
                </button>
              </div>

              <h4 className="font-bold text-slate-800 dark:text-slate-200 border-t border-slate-100 dark:border-slate-800/80 pt-4 mb-2">Billing History</h4>
              <div className="space-y-2">
                {[
                  { date: "2026-07-12", id: "INV-9283", amount: "$19.00", status: "Paid" },
                  { date: "2026-06-12", id: "INV-9192", amount: "$19.00", status: "Paid" }
                ].map((inv) => (
                  <div key={inv.id} className="p-3 border border-slate-100 dark:border-slate-800 rounded-lg flex justify-between text-[11px]">
                    <div className="font-semibold text-slate-800 dark:text-slate-200">{inv.id} • {new Date(inv.date).toLocaleDateString()}</div>
                    <div className="font-bold text-slate-600 dark:text-slate-350">{inv.amount} ({inv.status})</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PRIVACY & DATA SECURITY */}
          {activeSubTab === "security" && (
            <div className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b]/40 p-6 space-y-5 text-xs">
              <h3 className="font-bold text-sm border-b border-slate-100 dark:border-slate-850 pb-2 mb-2">Privacy & Local Backups</h3>
              
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-500">Document Privacy State</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 font-semibold">
                      <input 
                        type="radio" 
                        name="privacy" 
                        value="private"
                        checked={resumePrivacy === "private"}
                        onChange={() => setResumePrivacy("private")}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      Private (Only reachable on this device)
                    </label>
                    <label className="flex items-center gap-2 font-semibold">
                      <input 
                        type="radio" 
                        name="privacy" 
                        value="public"
                        checked={resumePrivacy === "public"}
                        onChange={() => setResumePrivacy("public")}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      Public Share (Reachable via unique URL)
                    </label>
                  </div>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800/80 pt-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-0.5">Export All Personal Data</h4>
                    <p className="text-[10px] text-slate-500">Download a complete JSON file backup of resumes, tracker items, and stats.</p>
                  </div>
                  <button 
                    onClick={() => alert("Data exported to downloads!")}
                    className="px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 font-bold flex items-center gap-1.5 text-slate-700 dark:text-slate-300"
                  >
                    <Download className="w-3.5 h-3.5" /> Export Data
                  </button>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800/80 pt-4 flex items-center justify-between text-red-500">
                  <div>
                    <h4 className="font-bold mb-0.5">Delete My Account Permanently</h4>
                    <p className="text-[10px] text-slate-500">Warning: This actions deletes all local DB records, portfolios, and history.</p>
                  </div>
                  <button 
                    onClick={() => { if (confirm("Delete account?")) alert("Account deleted"); }}
                    className="px-4 py-2 bg-red-500/5 hover:bg-red-500/10 border border-red-500/20 rounded-lg font-bold flex items-center gap-1.5 text-red-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* DEVELOPER API KEYS PANEL */}
          {activeSubTab === "api" && (
            <div className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b]/40 p-6 space-y-5 text-xs">
              <h3 className="font-bold text-sm border-b border-slate-100 dark:border-slate-850 pb-2 mb-2">Developer API Integration</h3>
              <p className="text-slate-500 leading-relaxed">
                Connect external automation systems, parser scripts, or deployment webhooks to synchronize resumes and portfolios database tables programmatically.
              </p>

              <div className="space-y-4">
                {apiKey ? (
                  <div className="p-3 bg-slate-50 dark:bg-slate-900 border rounded-xl flex items-center justify-between gap-4 font-mono text-[10px]">
                    <span className="truncate max-w-sm select-all">{apiKey}</span>
                    <button 
                      onClick={handleCopyKey}
                      className="px-2.5 py-1 bg-blue-600 text-white rounded text-[9px] font-bold"
                    >
                      Copy Key
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-6 border border-dashed rounded-xl text-slate-400 font-semibold select-none bg-slate-50/20">
                    No active API tokens configured.
                  </div>
                )}

                <button
                  onClick={handleGenerateKey}
                  className="w-full py-2.5 bg-slate-900 dark:bg-blue-600 text-white font-bold rounded-xl hover:bg-slate-800 dark:hover:bg-blue-750 transition-all flex items-center justify-center gap-1.5"
                >
                  <Key className="w-4 h-4" />
                  Generate New Live Token
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
