"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppStore } from "@/store/useAppStore";
import { 
  Sparkles, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  Loader2, 
  ShieldCheck,
  Check
} from "lucide-react";

const ChromeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="4" />
    <line x1="21.17" y1="8" x2="12" y2="8" />
    <line x1="3.95" y1="6.06" x2="8.54" y2="14" />
    <line x1="10.88" y1="21.94" x2="15.46" y2="14" />
  </svg>
);

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export default function AuthPage() {
  const router = useRouter();
  const { resumes, updateResumeContent } = useAppStore();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Set unique page title for SEO and accessibility audit compliance
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.title = "Sign In or Register | ResumeForge AI";
    }
  }, []);

  // Input states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (mode === "signup" && !agreeTerms) {
      setError("You must agree to the Terms of Service and Privacy Policy.");
      return;
    }

    setLoading(true);

    // Save custom user name input to store state during registration signup
    if (mode === "signup" && name.trim()) {
      const activeResume = resumes[0];
      if (activeResume) {
        updateResumeContent({
          personalInfo: {
            ...activeResume.content.personalInfo,
            fullName: name
          }
        });
      }
    }

    // Simulate database credentials verification or profile creation
    setTimeout(() => {
      setLoading(false);
      // Route directly to dashboard
      router.push("/dashboard");
    }, 1500);
  };

  const handleSocialLogin = (platform: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 1200);
  };

  return (
    <div className="bg-[#0f172a] text-slate-100 min-h-screen flex flex-col font-sans selection:bg-blue-600 selection:text-white relative overflow-hidden">
      {/* Background Lighting Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[130px] animate-blob" />
        <div className="absolute bottom-[-10%] right-[20%] w-[450px] h-[450px] rounded-full bg-indigo-600/10 blur-[120px] animate-blob animation-delay-2000" />
      </div>

      {/* Header back to landing */}
      <header className="relative z-10 w-full px-6 h-20 flex items-center max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-300">
            ResumeForge<span className="text-blue-500">AI</span>
          </span>
        </Link>
      </header>

      {/* Main Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 pb-20">
        <div className="w-full max-w-md glass-card rounded-2xl border border-slate-800 bg-[#1e293b]/30 p-8 space-y-6 shadow-2xl relative overflow-hidden">
          {/* Header gradient indicator bar */}
          <div className="absolute top-0 left-0 w-full h-1 gradient-accent" />

          {/* Title */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              {mode === "signin" ? "Welcome Back" : "Create Your Account"}
            </h2>
            <p className="text-xs text-slate-400">
              {mode === "signin" 
                ? "Sign in to access your resumes, portfolios, and tracks." 
                : "Build and scan your professional profile for free."}
            </p>
          </div>

          {/* Tab switches */}
          <div className="grid grid-cols-2 p-1 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-bold text-slate-500">
            <button
              onClick={() => { setMode("signin"); setError(""); }}
              className={`py-2.5 rounded-lg transition-all ${mode === "signin" ? "bg-[#1e293b] text-white shadow-md border border-slate-800/40" : "hover:text-slate-200"}`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode("signup"); setError(""); }}
              className={`py-2.5 rounded-lg transition-all ${mode === "signup" ? "bg-[#1e293b] text-white shadow-md border border-slate-800/40" : "hover:text-slate-200"}`}
            >
              Sign Up
            </button>
          </div>

          {error && (
            <div className="p-3 bg-red-500/5 border border-red-500/20 text-red-400 text-xs rounded-xl text-center font-medium leading-relaxed">
              {error}
            </div>
          )}

          {/* Forms */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div className="space-y-1.5 text-xs">
                <label className="font-bold text-slate-400">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <input 
                    type="text" 
                    required 
                    placeholder="Alex Rivera"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                    className="w-full pl-10 pr-3 py-2.5 border border-slate-800 rounded-xl bg-slate-950/40 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none font-medium transition-all text-xs"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5 text-xs">
              <label className="font-bold text-slate-400">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                <input 
                  type="email" 
                  required 
                  placeholder="alex.rivera@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="w-full pl-10 pr-3 py-2.5 border border-slate-800 rounded-xl bg-slate-950/40 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none font-medium transition-all text-xs"
                />
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between items-center">
                <label className="font-bold text-slate-400">Password</label>
                {mode === "signin" && (
                  <a href="#" className="text-[10px] text-blue-500 hover:underline">Forgot password?</a>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                <input 
                  type="password" 
                  required 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="w-full pl-10 pr-3 py-2.5 border border-slate-800 rounded-xl bg-slate-950/40 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none font-medium transition-all text-xs"
                />
              </div>
            </div>

            {mode === "signup" && (
              <label className="flex items-start gap-2.5 text-slate-400 text-[10px] leading-normal select-none cursor-pointer pt-1 font-semibold">
                <input 
                  type="checkbox" 
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  disabled={loading}
                  className="rounded border-slate-800 bg-slate-950 text-blue-500 focus:ring-blue-500 mt-0.5"
                />
                <span>By registering, I agree to the terms and privacy regulations.</span>
              </label>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/30 transition-all hover:scale-[1.01]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {mode === "signin" ? "Verifying..." : "Registering..."}
                </>
              ) : (
                <>
                  {mode === "signin" ? "Sign In" : "Register Profile"}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Social login separators */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-800/80"></div>
            <span className="flex-shrink mx-4 text-[9px] text-slate-500 font-black uppercase tracking-widest">Or Continue With</span>
            <div className="flex-grow border-t border-slate-800/80"></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleSocialLogin("google")}
              disabled={loading}
              className="flex items-center justify-center gap-2 py-2.5 border border-slate-800 rounded-xl hover:bg-slate-900/60 transition-colors text-xs font-bold text-slate-350"
            >
              <ChromeIcon className="w-4 h-4 text-red-500" />
              Google
            </button>
            <button
              onClick={() => handleSocialLogin("github")}
              disabled={loading}
              className="flex items-center justify-center gap-2 py-2.5 border border-slate-800 rounded-xl hover:bg-slate-900/60 transition-colors text-xs font-bold text-slate-350"
            >
              <GithubIcon className="w-4 h-4 text-white" />
              GitHub
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 border-t border-slate-900 bg-[#070b16]/40 text-slate-500 text-xs text-center">
        <p>© 2026 ResumeForge AI. All rights reserved.</p>
      </footer>
    </div>
  );
}
