"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";
import { 
  Sparkles, 
  Menu, 
  X, 
  LayoutDashboard, 
  FileText, 
  CheckSquare, 
  Mail, 
  Globe, 
  Briefcase, 
  BarChart2, 
  HelpCircle, 
  Settings, 
  User, 
  Bell, 
  Moon, 
  Sun, 
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  Cpu,
  UserCheck
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { isDarkMode, toggleDarkMode, isPremium, setPremium } = useAppStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Initialize theme from store on mount
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Read URL search params for quick premium testing on landing page CTAs
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("premium") === "true") {
        setPremium(true);
      }
    }
  }, [setPremium]);

  const navItems = [
    { name: "Dashboard Overview", path: "/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: "Resume Builder", path: "/dashboard/resume-builder", icon: <FileText className="w-5 h-5" /> },
    { name: "ATS Score Checker", path: "/dashboard/ats-checker", icon: <CheckSquare className="w-5 h-5" /> },
    { name: "Job Optimizer", path: "/dashboard/job-optimizer", icon: <Sparkles className="w-5 h-5" /> },
    { name: "Cover Letters", path: "/dashboard/cover-letter", icon: <Mail className="w-5 h-5" /> },
    { name: "Portfolio Website", path: "/dashboard/portfolio", icon: <Globe className="w-5 h-5" /> },
    { name: "Job Kanban Tracker", path: "/dashboard/job-tracker", icon: <Briefcase className="w-5 h-5" /> },
    { name: "Skills Analyzer", path: "/dashboard/skills-analyzer", icon: <BarChart2 className="w-5 h-5" /> },
    { name: "AI Interview Prep", path: "/dashboard/interview-prep", icon: <HelpCircle className="w-5 h-5" /> },
    { name: "LinkedIn Optimizer", path: "/dashboard/linkedin-optimizer", icon: <TrendingUp className="w-5 h-5" /> },
    { name: "Settings", path: "/dashboard/settings", icon: <Settings className="w-5 h-5" /> },
    { name: "Admin Dashboard", path: "/dashboard/admin", icon: <UserCheck className="w-5 h-5" /> }
  ];

  const getPageTitle = () => {
    const matched = navItems.find((item) => item.path === pathname);
    return matched ? matched.name : "Dashboard";
  };

  const handleLinkClick = (path: string) => {
    setSidebarOpen(false);
    router.push(path);
  };

  return (
    <div className="flex h-screen bg-[#f8fafc] dark:bg-[#0f172a] text-slate-800 dark:text-slate-100 overflow-hidden font-sans transition-colors duration-300">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside 
        className={`fixed md:relative top-0 bottom-0 left-0 z-40 w-64 glass-panel border-r border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-[#0f172a]/70 flex flex-col justify-between transition-transform duration-300 md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Sidebar Brand Header */}
          <div className="h-16 px-6 flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded gradient-accent flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-extrabold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-slate-100 dark:to-slate-300">
                ResumeForge<span className="text-blue-500">AI</span>
              </span>
            </Link>
            <button 
              className="md:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-160px)]">
            {navItems.map((item) => {
              const active = pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleLinkClick(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 text-left ${
                    active 
                      ? "gradient-accent text-white shadow-lg shadow-blue-500/15" 
                      : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100"
                  }`}
                >
                  <span className={active ? "text-white" : "text-slate-400 dark:text-slate-500"}>
                    {item.icon}
                  </span>
                  {item.name}
                  {active && <ChevronRight className="w-4 h-4 ml-auto" />}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer User Stats */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800/80">
          {isPremium ? (
            <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-indigo-500 shrink-0" />
              <div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Premium Pro</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">Unlimited AI scanning active</div>
              </div>
            </div>
          ) : (
            <div className="p-3.5 bg-blue-500/5 border border-blue-500/10 rounded-xl space-y-2.5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Free Account</span>
              </div>
              <button 
                onClick={() => setPremium(true)}
                className="w-full py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition shadow-md shadow-blue-500/10"
              >
                Upgrade to Pro
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="h-16 border-b border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-[#0f172a]/50 backdrop-blur-md px-6 flex items-center justify-between shrink-0 relative z-30">
          <div className="flex items-center gap-3">
            <button 
              className="md:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="font-extrabold text-lg text-slate-800 dark:text-white tracking-tight hidden sm:block">
              {getPageTitle()}
            </h1>
          </div>

          <div className="flex items-center gap-3.5">
            {/* Quick Pricing Toggle for sandbox demonstration */}
            <button 
              onClick={() => setPremium(!isPremium)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400"
              title="Toggle Premium subscription state for demo purposes"
            >
              <Cpu className="w-3.5 h-3.5 text-blue-500" />
              Demo: {isPremium ? "Premium" : "Free"}
            </button>

            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleDarkMode}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {isDarkMode ? <Sun className="w-4.5 h-4.5 text-yellow-500" /> : <Moon className="w-4.5 h-4.5" />}
            </button>

            {/* Notification Center */}
            <div className="relative">
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 relative"
              >
                <Bell className="w-4.5 h-4.5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600" />
              </button>

              {notificationsOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setNotificationsOpen(false)} />
                  <div className="absolute right-0 mt-2.5 w-80 glass-panel border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b] rounded-2xl shadow-xl p-4 space-y-3 z-50">
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-2">
                      <span className="font-bold text-sm text-slate-800 dark:text-slate-200">Notifications</span>
                      <button className="text-[10px] text-blue-500 font-semibold hover:underline">Mark all read</button>
                    </div>
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      <div className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800/40 rounded-lg">
                        <div className="font-semibold text-xs text-slate-800 dark:text-slate-200">Resumed Optimised Successfully!</div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Your ATS score for &quot;My Professional Resume&quot; improved to 88%.</p>
                      </div>
                      <div className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800/40 rounded-lg">
                        <div className="font-semibold text-xs text-slate-800 dark:text-slate-200">Interview Scheduled</div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Stripe mock preparation reminder loaded in pipeline calendar.</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Profile Menu Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2.5 focus:outline-none"
              >
                <div className="w-9 h-9 rounded-xl gradient-accent text-white flex items-center justify-center font-bold text-sm shadow-md shadow-blue-500/10">
                  AR
                </div>
                <div className="hidden lg:block text-left">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">Alex Rivera</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Software Engineer</div>
                </div>
              </button>

              {userDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setUserDropdownOpen(false)} />
                  <div className="absolute right-0 mt-2.5 w-52 glass-panel border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b] rounded-2xl shadow-xl p-2.5 space-y-1 z-50">
                    <button 
                      onClick={() => { setUserDropdownOpen(false); router.push("/dashboard/settings"); }}
                      className="w-full text-left px-3.5 py-2 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-xl flex items-center gap-2"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      My Profile
                    </button>
                    <button 
                      onClick={() => { setUserDropdownOpen(false); router.push("/dashboard/settings"); }}
                      className="w-full text-left px-3.5 py-2 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-xl flex items-center gap-2"
                    >
                      <Settings className="w-4 h-4 text-slate-400" />
                      Account Settings
                    </button>
                    <div className="border-t border-slate-100 dark:border-slate-800/80 my-1.5" />
                    <button 
                      onClick={() => { setUserDropdownOpen(false); router.push("/"); }}
                      className="w-full text-left px-3.5 py-2 text-xs font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl flex items-center gap-2"
                    >
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Inner Layout Page */}
        <main className="flex-1 p-5 md:p-8 overflow-y-auto relative z-20">
          {children}
        </main>
      </div>
    </div>
  );
}
