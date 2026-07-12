"use client";

import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { 
  Users, 
  CreditCard, 
  Sliders, 
  HelpCircle, 
  Check, 
  UserX, 
  ShieldAlert, 
  FileText, 
  Trash2,
  Cpu,
  Info,
  CheckCircle2,
  TrendingUp,
  AlertTriangle
} from "lucide-react";

export default function AdminPanel() {
  const { isPremium } = useAppStore();
  
  // Feature Flags
  const [featureFlags, setFeatureFlags] = useState([
    { id: "ai-sim", name: "AI Interview Simulator", active: true, desc: "Activates LLM questioning & analysis charts" },
    { id: "portfolio-deploy", name: "Portfolio Custom Domain Deployment", active: true, desc: "Connects custom domains to vercel CDN" },
    { id: "ats-check-upload", name: "ATS Direct Document Parsing (PDF)", active: false, desc: "Direct parser conversion (currently simulated)" },
    { id: "premium-tier", name: "Stripe Subscription Checkout Pay", active: true, desc: "Gates unlimited exports behind paywall" }
  ]);

  // Support Tickets
  const [tickets, setTickets] = useState([
    { id: "t-1", user: "johndoe@example.com", subject: "PDF formatting shift on Microsoft template", status: "open", priority: "high" },
    { id: "t-2", user: "emily@example.com", subject: "Custom domain DNS CNAME mapping failure", status: "open", priority: "medium" },
    { id: "t-3", user: "steve@example.com", subject: "Upgrade payment charged but tier is free", status: "resolved", priority: "critical" }
  ]);

  const handleToggleFlag = (id: string) => {
    setFeatureFlags(featureFlags.map((f) => 
      f.id === id ? { ...f, active: !f.active } : f
    ));
  };

  const handleResolveTicket = (id: string) => {
    setTickets(tickets.map((t) => 
      t.id === id ? { ...t, status: "resolved" } : t
    ));
  };

  const adminStats = [
    { label: "Total Users", count: "14,250", trend: "+12% MoM", icon: <Users className="w-5 h-5 text-blue-500" /> },
    { label: "Pro Active Subscribers", count: "3,420", trend: "+8% conversion", icon: <CreditCard className="w-5 h-5 text-emerald-500" /> },
    { label: "Monthly Recurring Revenue", count: "$64,980", trend: "+18% MoM", icon: <TrendingUp className="w-5 h-5 text-indigo-500" /> },
    { label: "Support Tickets Active", count: "12", trend: "avg response <30m", icon: <HelpCircle className="w-5 h-5 text-amber-500" /> }
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-xl font-extrabold tracking-tight">Administrative Control Panel</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Global system overview, toggle platform feature flags, audit templates, and resolve developer support tickets.
        </p>
      </div>

      {/* Stats Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {adminStats.map((stat, i) => (
          <div key={i} className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b]/40 p-5 flex flex-col justify-between h-36">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-slate-105 dark:bg-slate-800 flex items-center justify-center">
                {stat.icon}
              </div>
              <span className="text-[9px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
                {stat.trend}
              </span>
            </div>
            <div className="space-y-0.5">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{stat.label}</div>
              <h3 className="font-extrabold text-2xl text-slate-850 dark:text-white">{stat.count}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Feature flags */}
        <div className="lg:col-span-6 glass-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b]/40 p-6 space-y-5 text-xs">
          <h3 className="font-bold text-sm text-slate-850 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-850 pb-2 mb-2">
            <Sliders className="w-5 h-5 text-blue-500" />
            Platform Feature Flags
          </h3>
          
          <div className="space-y-4">
            {featureFlags.map((flag) => (
              <div 
                key={flag.id} 
                className="p-3.5 border border-slate-100 dark:border-slate-800 rounded-xl flex items-center justify-between gap-4 bg-slate-50/30 dark:bg-transparent"
              >
                <div className="space-y-1">
                  <div className="font-bold text-slate-800 dark:text-slate-200">{flag.name}</div>
                  <p className="text-[10px] text-slate-450 leading-relaxed font-medium">{flag.desc}</p>
                </div>
                
                {/* Switch checkbox */}
                <button
                  onClick={() => handleToggleFlag(flag.id)}
                  className={`w-11 h-6 rounded-full p-1 transition-all ${flag.active ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-700"}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${flag.active ? "translate-x-5" : ""}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Support Tickets */}
        <div className="lg:col-span-6 glass-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b]/40 p-6 space-y-5 text-xs">
          <h3 className="font-bold text-sm text-slate-850 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-850 pb-2 mb-2">
            <ShieldAlert className="w-5 h-5 text-amber-500" />
            Support Tickets Queue
          </h3>

          <div className="space-y-3.5">
            {tickets.map((t) => (
              <div 
                key={t.id} 
                className={`p-3.5 border rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs leading-normal ${
                  t.status === "resolved" 
                    ? "bg-slate-50 dark:bg-slate-900/10 border-slate-200 dark:border-slate-850 opacity-60" 
                    : t.priority === "critical"
                      ? "bg-red-500/5 border-red-500/10" 
                      : t.priority === "high"
                        ? "bg-amber-500/5 border-amber-500/10" 
                        : "bg-blue-500/5 border-blue-500/10"
                }`}
              >
                <div className="space-y-1">
                  <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    {t.subject}
                    {t.status === "resolved" ? (
                      <span className="text-[8px] font-black text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded uppercase">Resolved</span>
                    ) : (
                      <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase ${
                        t.priority === "critical" ? "text-red-500 bg-red-500/10" :
                        t.priority === "high" ? "text-amber-500 bg-amber-500/10" : "text-blue-500 bg-blue-500/10"
                      }`}>{t.priority}</span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-500 font-semibold">{t.user}</div>
                </div>

                {t.status === "open" && (
                  <button
                    onClick={() => handleResolveTicket(t.id)}
                    className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] font-bold shadow shrink-0 align-self-start sm:align-self-auto"
                  >
                    Resolve Ticket
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
