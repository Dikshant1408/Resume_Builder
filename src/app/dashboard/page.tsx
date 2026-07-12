"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAppStore } from "@/store/useAppStore";
import { 
  FileText, 
  CheckSquare, 
  Briefcase, 
  HelpCircle, 
  Award, 
  TrendingUp, 
  Plus, 
  ArrowUpRight, 
  ArrowDownRight,
  TrendingDown, 
  ChevronRight,
  Sparkles,
  Zap,
  Calendar,
  AlertTriangle
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

export default function DashboardOverview() {
  const { resumes, applications, interviews, isPremium, setPremium } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const recentResume = resumes[0] || null;
  const totalApps = applications.length;
  const interviewApps = applications.filter((app) => app.status === "interview").length;
  const offerApps = applications.filter((app) => app.status === "offer").length;
  const rejectedApps = applications.filter((app) => app.status === "rejected").length;
  const activeInterviewsCount = interviews.length;

  // Chart data 1: Applications Sent (Bar Chart)
  const applicationsData = [
    { name: "Jan", count: 2 },
    { name: "Feb", count: 5 },
    { name: "Mar", count: 4 },
    { name: "Apr", count: 8 },
    { name: "May", count: 12 },
    { name: "Jun", count: 9 },
    { name: "Jul", count: totalApps }
  ];

  // Chart data 2: Status Breakdown (Pie Chart)
  const pieData = [
    { name: "Applied", value: applications.filter((app) => app.status === "applied").length || 1, color: "#3b82f6" },
    { name: "Assessment", value: applications.filter((app) => app.status === "assessment").length || 1, color: "#f59e0b" },
    { name: "Interview", value: interviewApps || 1, color: "#818cf8" },
    { name: "Offer", value: offerApps || 1, color: "#10b981" },
    { name: "Rejected", value: rejectedApps || 1, color: "#ef4444" }
  ];

  // Chart data 3: Resume Score Trend (Line/Area Chart)
  const scoreTrendData = [
    { version: "v1", score: 68 },
    { version: "v2", score: 72 },
    { version: "v3", score: 78 },
    { version: "v4", score: 85 },
    { version: "Current", score: recentResume ? recentResume.atsScore : 88 }
  ];

  const profileCompletion = 85; // Mock completion percent

  const weeklyInsights = [
    {
      id: 1,
      type: "tip",
      message: "Adding the keyword 'Docker' and 'Kubernetes' under Vercel experience can raise your ATS match rate for Senior Frontend roles by 14%."
    },
    {
      id: 2,
      type: "warning",
      message: "Your resume contains 3 generic verbs ('Worked on', 'Handled'). Replace them with metrics-focused action verbs to improve impact."
    },
    {
      id: 3,
      type: "info",
      message: "Stripe technical panel screen is coming up in 5 days. Run a custom coding question session in AI Interview Prep."
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 glass-card rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/30 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[-30%] right-[-10%] w-[200px] h-[200px] rounded-full bg-blue-500/10 blur-[80px]" />
        </div>
        
        <div className="relative z-10 space-y-1.5">
          <h2 className="text-2xl font-extrabold tracking-tight">Welcome Back, Alex!</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Here is a snapshot of your professional documents, applications, and interview performance metrics.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10 shrink-0">
          <Link 
            href="/dashboard/resume-builder" 
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold shadow-lg shadow-blue-500/10 hover:shadow-blue-500/30 hover:bg-blue-700 hover:scale-[1.01] transition-all"
          >
            <Plus className="w-4 h-4" />
            New Resume
          </Link>
          {!isPremium && (
            <button 
              onClick={() => setPremium(true)}
              className="flex items-center gap-1.5 px-4 py-2.5 border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-xl text-sm font-semibold transition-all"
            >
              <Zap className="w-4 h-4 fill-current shrink-0" />
              Go Premium
            </button>
          )}
        </div>
      </div>

      {/* Grid of Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Recent Resume */}
        <div className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b]/40 p-5 flex flex-col justify-between h-40">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
              <FileText className="w-5 h-5" />
            </div>
            <Link href="/dashboard/resume-builder" className="text-[10px] font-bold text-blue-500 hover:underline flex items-center gap-0.5">
              EDIT <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-1">
            <div className="text-xs text-slate-400 font-semibold truncate uppercase tracking-wider">Recent Resume</div>
            <h3 className="font-extrabold text-sm truncate">{recentResume ? recentResume.title : "No resume created"}</h3>
          </div>
          <div className="text-[10px] text-slate-500">Updated {recentResume ? new Date(recentResume.updatedAt).toLocaleDateString() : "Never"}</div>
        </div>

        {/* ATS Score */}
        <div className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b]/40 p-5 flex flex-col justify-between h-40">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <CheckSquare className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +4%
            </span>
          </div>
          <div className="space-y-0.5">
            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Average ATS Score</div>
            <h3 className="font-extrabold text-3xl">{recentResume ? recentResume.atsScore : 0}%</h3>
          </div>
          <div className="text-[10px] text-slate-500">Target score is 85%+ to pass filters</div>
        </div>

        {/* Applications Sent */}
        <div className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b]/40 p-5 flex flex-col justify-between h-40">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
              <Briefcase className="w-5 h-5" />
            </div>
            <Link href="/dashboard/job-tracker" className="text-[10px] font-bold text-indigo-500 hover:underline flex items-center gap-0.5">
              TRACKER <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-0.5">
            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Applications Sent</div>
            <h3 className="font-extrabold text-3xl">{totalApps}</h3>
          </div>
          <div className="text-[10px] text-slate-500">{offerApps} active job offer letters received</div>
        </div>

        {/* Interview Rate */}
        <div className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b]/40 p-5 flex flex-col justify-between h-40">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
              <HelpCircle className="w-5 h-5" />
            </div>
            <Link href="/dashboard/interview-prep" className="text-[10px] font-bold text-purple-500 hover:underline flex items-center gap-0.5">
              PREP NOW <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-0.5">
            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Mock Interviews</div>
            <h3 className="font-extrabold text-3xl">{activeInterviewsCount}</h3>
          </div>
          <div className="text-[10px] text-slate-500">{interviewApps} real interview cycles active</div>
        </div>
      </div>

      {/* Profile Completion and Weekly Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Completion */}
        <div className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b]/40 p-6 space-y-5">
          <h3 className="font-bold text-base text-slate-800 dark:text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-500" />
            Profile Completion
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-2xl font-black text-slate-850 dark:text-white">{profileCompletion}%</span>
              <span className="text-xs text-slate-400 font-semibold">Step 4 of 5</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div 
                className="gradient-accent h-full rounded-full transition-all duration-500" 
                style={{ width: `${profileCompletion}%` }}
              />
            </div>
          </div>
          <div className="space-y-3 pt-2 text-xs">
            <div className="flex items-center justify-between text-slate-500">
              <span>Personal details</span>
              <span className="text-emerald-500 font-bold">100%</span>
            </div>
            <div className="flex items-center justify-between text-slate-500">
              <span>Work experience (2 entries)</span>
              <span className="text-emerald-500 font-bold">100%</span>
            </div>
            <div className="flex items-center justify-between text-slate-500">
              <span>Linked portfolio</span>
              <span className="text-red-500 font-bold">Incomplete</span>
            </div>
          </div>
        </div>

        {/* AI Career Insights */}
        <div className="lg:col-span-2 glass-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b]/40 p-6 space-y-4">
          <h3 className="font-bold text-base text-slate-800 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4.5 h-4.5 text-blue-500 animate-pulse" />
            Weekly AI Career Insights
          </h3>
          <div className="space-y-3.5">
            {weeklyInsights.map((ins) => (
              <div 
                key={ins.id} 
                className={`p-3.5 rounded-xl border flex gap-3 text-xs leading-relaxed ${
                  ins.type === "warning" 
                    ? "bg-amber-500/5 border-amber-500/20 text-amber-600 dark:text-amber-300"
                    : ins.type === "tip" 
                      ? "bg-blue-500/5 border-blue-500/20 text-blue-600 dark:text-blue-300"
                      : "bg-indigo-500/5 border-indigo-500/20 text-indigo-600 dark:text-indigo-300"
                }`}
              >
                {ins.type === "warning" ? (
                  <AlertTriangle className="w-5 h-5 shrink-0 text-amber-500" />
                ) : (
                  <Sparkles className={`w-5 h-5 shrink-0 ${ins.type === "tip" ? "text-blue-500" : "text-indigo-500"}`} />
                )}
                <p>{ins.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Analytical Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Application Volume Graph */}
        <div className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b]/40 p-5 space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-800 dark:text-white">Application Pipeline Analytics</h3>
            <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> LAST 6 MONTHS
            </span>
          </div>

          <div className="h-64 w-full">
            {!mounted ? (
              // Loading Skeleton
              <div className="w-full h-full bg-slate-100 dark:bg-slate-800/40 rounded-xl animate-pulse flex items-center justify-center">
                <span className="text-xs text-slate-400 font-medium">Loading Pipeline Charts...</span>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={applicationsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.15} />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "#1e293b", 
                      borderColor: "#475569", 
                      borderRadius: "12px",
                      color: "#f8fafc",
                      fontSize: "11px" 
                    }} 
                  />
                  <Bar dataKey="count" fill="url(#colorApps)" radius={[4, 4, 0, 0]}>
                    {applicationsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === applicationsData.length - 1 ? "#3b82f6" : "#4f46e5"} opacity={0.85} />
                    ))}
                  </Bar>
                  <defs>
                    <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Interview Rate Status Pie */}
        <div className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b]/40 p-5 space-y-4">
          <h3 className="font-bold text-sm text-slate-800 dark:text-white">Application Status Ratios</h3>
          
          <div className="h-64 w-full relative flex items-center justify-center">
            {!mounted ? (
              <div className="w-full h-full bg-slate-100 dark:bg-slate-800/40 rounded-xl animate-pulse flex items-center justify-center">
                <span className="text-xs text-slate-400 font-medium">Loading status ratio...</span>
              </div>
            ) : (
              <>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1e293b",
                        borderColor: "#475569",
                        borderRadius: "12px",
                        color: "#f8fafc",
                        fontSize: "11px"
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center Score percentage label */}
                <div className="absolute text-center">
                  <div className="text-2xl font-black text-slate-800 dark:text-white">
                    {Math.round(((offerApps + interviewApps) / (totalApps || 1)) * 100)}%
                  </div>
                  <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wide">Callback</div>
                </div>
              </>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-[10px] pt-1">
            {pieData.map((d, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="flex items-center gap-1.5 font-bold">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                  {d.value}
                </div>
                <span className="text-slate-500 font-medium truncate max-w-full">{d.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resume Score Trend Line Chart */}
      <div className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b]/40 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-800 dark:text-white">ATS Optimize Score Trend</h3>
          <span className="text-[10px] text-emerald-400 font-extrabold bg-emerald-500/10 px-2 py-0.5 rounded">
            +20% INCREASE SINCE INITIAL
          </span>
        </div>

        <div className="h-60 w-full">
          {!mounted ? (
            <div className="w-full h-full bg-slate-100 dark:bg-slate-800/40 rounded-xl animate-pulse flex items-center justify-center">
              <span className="text-xs text-slate-400 font-medium">Loading Score trend...</span>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={scoreTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.01}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.1} />
                <XAxis dataKey="version" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis domain={[50, 100]} stroke="#94a3b8" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    borderColor: "#475569",
                    borderRadius: "12px",
                    color: "#f8fafc",
                    fontSize: "11px"
                  }}
                />
                <Area type="monotone" dataKey="score" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
