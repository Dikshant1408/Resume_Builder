"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  Sparkles, 
  CheckCircle, 
  Briefcase, 
  Globe, 
  BarChart, 
  Users, 
  HelpCircle, 
  ArrowRight,
  TrendingUp,
  Cpu,
  Layers,
  Compass,
  Smile,
  ShieldCheck
} from "lucide-react";

export default function LandingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annually">("monthly");

  const faqs = [
    {
      question: "How does the ATS optimization work?",
      answer: "Our AI compares your resume bullet points against key criteria derived from hundreds of recruitment algorithms, checking formatting, industry keywords, readability, action verb density, and active achievement quantification. It highlights issues and offers one-click corrections."
    },
    {
      question: "Can I host my portfolio on a custom domain?",
      answer: "Yes! Premium subscribers can connect their custom domains (e.g., yourname.com) directly to their generated portfolio websites. Free users get a customizable resumeforge.dev subdomain."
    },
    {
      question: "Is there a limit to how many resumes I can build?",
      answer: "Free accounts allow you to maintain one active resume with 3 ATS scans. Premium accounts unlock unlimited resume versions, unlimited ATS optimizations, cover letter generations, and portfolio exports."
    },
    {
      question: "Can I download my resume as PDF?",
      answer: "Yes, you can export your resumes in standard high-resolution PDF format, fully optimized for ATS software templates. We also support HTML, Text, and Markdown exports."
    }
  ];

  const features = [
    {
      icon: <FileText className="w-6 h-6 text-blue-500" />,
      title: "Interactive Resume Builder",
      description: "Drag, drop, reorder, or duplicate sections instantly. Updates live in 8 professional, print-optimized styles."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-indigo-500" />,
      title: "ATS Optimization Engine",
      description: "Get detailed keyword audits, formatting score breakdowns, and AI suggestions to beat the filters."
    },
    {
      icon: <Cpu className="w-6 h-6 text-purple-500" />,
      title: "AI Bullet Enhancer",
      description: "Transform weak sentences into strong, metric-driven achievements automatically in multiple leadership tones."
    },
    {
      icon: <Globe className="w-6 h-6 text-cyan-500" />,
      title: "One-Click Portfolio Maker",
      description: "Convert your resume text into a gorgeous personal website, select from themes, and deploy instantly to Vercel."
    },
    {
      icon: <Briefcase className="w-6 h-6 text-emerald-500" />,
      title: "Kanban Job Tracker",
      description: "Track status pipelines, interview schedules, calendar reminders, salaries, and links in a unified database."
    },
    {
      icon: <BarChart className="w-6 h-6 text-orange-500" />,
      title: "Smart Skills Analyzer",
      description: "Visualize strengths using radar charts, map skill gaps, and generate AI-guided roadmaps for recommended skills."
    }
  ];

  return (
    <div className="bg-[#0f172a] text-slate-100 min-h-screen font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden">
      {/* Background Lighting Blobs */}
      <div className="absolute top-0 left-0 w-full h-[600px] pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[130px] animate-blob" />
        <div className="absolute top-[-10%] right-[25%] w-[450px] h-[450px] rounded-full bg-indigo-600/15 blur-[120px] animate-blob animation-delay-2000" />
        <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] rounded-full bg-purple-600/10 blur-[100px] animate-blob animation-delay-4000" />
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 glass-panel border-b border-slate-800 bg-[#0f172a]/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-300">
              ResumeForge<span className="text-blue-500">AI</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#templates" className="hover:text-white transition-colors">Templates</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-4">
            <Link 
              href="/dashboard" 
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors px-4 py-2"
            >
              Sign In
            </Link>
            <Link 
              href="/dashboard" 
              className="text-sm font-semibold gradient-accent text-white px-5 py-2.5 rounded-xl shadow-lg shadow-blue-500/15 hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              Start Free
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-28 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/5 text-blue-400 text-xs font-semibold tracking-wide uppercase mb-8 shadow-sm backdrop-blur-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Next-Generation Career Co-Pilot
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl leading-[1.1] mb-6"
        >
          Build the Resume That <br />
          <span className="gradient-text">Gets Interviews.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed mb-10"
        >
          Create ATS-friendly resumes, optimize them for any job, generate AI cover letters, build portfolios, and land your dream job.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-5 z-20 mb-16"
        >
          <Link 
            href="/dashboard" 
            className="w-full sm:w-auto text-base font-semibold gradient-accent text-white px-8 py-4 rounded-xl flex items-center justify-center gap-2 shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
          >
            Start Free Now
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link 
            href="/dashboard" 
            className="w-full sm:w-auto text-base font-semibold border border-slate-700 bg-slate-900/60 backdrop-blur-sm text-slate-200 hover:text-white hover:border-slate-500 px-8 py-4 rounded-xl flex items-center justify-center transition-all duration-200"
          >
            View Live Demo
          </Link>
        </motion.div>

        {/* Floating Resume Card Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-4xl glass-card rounded-2xl border border-slate-800 p-6 md:p-8 relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 left-0 w-full h-1.5 gradient-accent" />
          
          <div className="flex flex-col md:flex-row items-start justify-between gap-6 pb-6 border-b border-slate-800/80">
            <div>
              <div className="h-6 w-36 bg-slate-800 rounded-md animate-pulse mb-3" />
              <div className="h-4 w-48 bg-slate-800/60 rounded-md animate-pulse" />
            </div>
            <div className="flex flex-wrap gap-2.5">
              <div className="h-8 w-20 bg-blue-500/10 border border-blue-500/20 rounded-lg animate-pulse" />
              <div className="h-8 w-24 bg-slate-800 rounded-lg animate-pulse" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="md:col-span-2 space-y-4">
              <div className="h-5 w-24 bg-slate-800 rounded-md mb-2" />
              <div className="space-y-2">
                <div className="h-3.5 w-full bg-slate-800/60 rounded-md" />
                <div className="h-3.5 w-[92%] bg-slate-800/60 rounded-md" />
                <div className="h-3.5 w-[85%] bg-slate-800/60 rounded-md" />
              </div>
              <div className="h-5 w-32 bg-slate-800 rounded-md mt-6 mb-2" />
              <div className="space-y-2">
                <div className="h-3.5 w-full bg-slate-800/60 rounded-md" />
                <div className="h-3.5 w-[75%] bg-slate-800/60 rounded-md" />
              </div>
            </div>
            
            <div className="glass-panel rounded-xl border border-slate-800 p-4 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-slate-400 font-semibold">ATS SCORE</span>
                  <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">PASSED</span>
                </div>
                <div className="text-4xl font-extrabold text-white flex items-baseline">
                  92<span className="text-sm text-slate-500 font-normal">/100</span>
                </div>
              </div>
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  Keywords Optimized (28 matched)
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  Formatting checked & clean
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Feature Cards Grid Section */}
      <section id="features" className="py-24 border-t border-slate-800 bg-slate-900/30 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
              Everything you need to <span className="gradient-text">accelerate your career.</span>
            </h2>
            <p className="text-slate-400 text-base md:text-lg">
              A comprehensive career platform that combines professional resume layouts, custom website rendering, and real-time optimization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div 
                key={i} 
                className="glass-card rounded-2xl border border-slate-800/80 p-6 flex flex-col gap-4 text-left hover:scale-[1.01]"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-800/50 flex items-center justify-center border border-slate-700/50">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-lg text-white">{feature.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Grid Showcase Section */}
      <section id="templates" className="py-24 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
            <div className="lg:col-span-6">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
                ATS-Approved Templates <br />
                <span className="gradient-text">Designed for modern hiring.</span>
              </h2>
              <p className="text-slate-400">
                Instantly swap between Professional, Minimal, Modern, and executive templates. Tested extensively across popular ATS filters including Workday, Greenhouse, Taleo, and Lever.
              </p>
            </div>
            <div className="lg:col-span-6 flex flex-wrap gap-3 lg:justify-end">
              {["Software", "Marketing", "Business", "Executive", "Creative", "Minimal"].map((cat, i) => (
                <span 
                  key={i} 
                  className="px-4 py-2 rounded-full border border-slate-800 bg-slate-900/40 text-xs font-semibold text-slate-300"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Executive Suite", type: "Classic, formal styling", color: "from-blue-600/30 to-indigo-600/30" },
              { name: "Vercel Minimal", type: "Ultra-modern, tech focus", color: "from-purple-600/30 to-indigo-600/30" },
              { name: "Creative Bold", type: "Visual portfolio layouts", color: "from-pink-600/30 to-rose-600/30" },
              { name: "Google Style", type: "Standard tech standard", color: "from-emerald-600/30 to-cyan-600/30" }
            ].map((tmpl, idx) => (
              <div 
                key={idx} 
                className="group relative rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-lg hover:border-slate-600 transition-all duration-300 flex flex-col justify-end min-h-[300px]"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${tmpl.color} opacity-40 group-hover:opacity-60 transition-opacity`} />
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <div className="w-full h-[180px] bg-slate-900/90 rounded-lg border border-slate-800 p-3 shadow-inner group-hover:scale-105 transition-transform duration-300">
                    <div className="w-1/2 h-4 bg-slate-800 rounded mb-2" />
                    <div className="w-1/3 h-2 bg-slate-800/60 rounded mb-4" />
                    <div className="space-y-1.5">
                      <div className="h-1.5 w-full bg-slate-800/40 rounded" />
                      <div className="h-1.5 w-[90%] bg-slate-800/40 rounded" />
                      <div className="h-1.5 w-[80%] bg-slate-800/40 rounded" />
                    </div>
                  </div>
                </div>
                <div className="relative z-10 p-5 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent border-t border-slate-800/30">
                  <h4 className="font-bold text-white mb-0.5">{tmpl.name}</h4>
                  <p className="text-xs text-slate-400">{tmpl.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 border-t border-slate-800 bg-slate-900/10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
              Premium features, <span className="gradient-text">straightforward pricing.</span>
            </h2>
            <p className="text-slate-400">
              Start building your resume for free, or unlock unlimited AI optimizations, custom domains, and cover letters.
            </p>

            <div className="inline-flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-850 mt-8">
              <button 
                onClick={() => setBillingPeriod("monthly")}
                className={`text-xs font-semibold px-4.5 py-2 rounded-lg transition-all ${billingPeriod === "monthly" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setBillingPeriod("annually")}
                className={`text-xs font-semibold px-4.5 py-2 rounded-lg transition-all ${billingPeriod === "annually" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`}
              >
                Annually (Save 20%)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
            {/* Free Plan */}
            <div className="glass-card rounded-2xl border border-slate-800 bg-slate-950/40 p-8 flex flex-col justify-between hover:scale-100">
              <div>
                <h3 className="font-bold text-xl text-white mb-2">Free Plan</h3>
                <p className="text-xs text-slate-400 mb-6">Perfect for students and freshers initializing their career journey.</p>
                <div className="text-4xl font-extrabold text-white mb-6">
                  $0<span className="text-sm font-normal text-slate-500">/mo</span>
                </div>
                <div className="space-y-3.5 mb-8">
                  {[
                    "1 Active Resume Layout",
                    "ATS Score breakdowns",
                    "3 AI Resume Optimizations",
                    "PDF Downloads (Watermarked)",
                    "Basic Cover Letter Generator",
                    "Subdomain Portfolio Site"
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm text-slate-300">
                      <CheckCircle className="w-4.5 h-4.5 text-blue-500 shrink-0" />
                      {feat}
                    </div>
                  ))}
                </div>
              </div>
              <Link 
                href="/dashboard"
                className="w-full py-3.5 rounded-xl border border-slate-700 bg-slate-900/60 text-slate-200 text-center font-semibold hover:border-slate-500 hover:text-white transition-all"
              >
                Get Started Free
              </Link>
            </div>

            {/* Premium Plan */}
            <div className="glass-card rounded-2xl border-2 border-blue-500 bg-slate-950/70 p-8 flex flex-col justify-between relative shadow-xl shadow-blue-500/5 hover:scale-100">
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-blue-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Recommended
              </div>
              <div>
                <h3 className="font-bold text-xl text-white mb-2">Premium Pro</h3>
                <p className="text-xs text-slate-300 mb-6">Built for professionals and job switchers optimizing for rapid responses.</p>
                <div className="text-4xl font-extrabold text-white mb-6">
                  {billingPeriod === "monthly" ? "$19" : "$15"}
                  <span className="text-sm font-normal text-slate-400">/mo</span>
                </div>
                <div className="space-y-3.5 mb-8">
                  {[
                    "Unlimited Resumes & Versions",
                    "Unlimited ATS Scanning & Auditing",
                    "Unlimited AI Enhancements",
                    "No watermarks on high-res PDFs",
                    "Custom Portfolios with Domain Linking",
                    "Kanban Job Tracker & Calendar Tasks",
                    "Mock Interview Simulator coaching",
                    "Priority Customer Support"
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm text-slate-100">
                      <CheckCircle className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
                      {feat}
                    </div>
                  ))}
                </div>
              </div>
              <Link 
                href="/dashboard?premium=true"
                className="w-full py-3.5 rounded-xl gradient-accent text-white text-center font-semibold hover:scale-[1.01] hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.99] transition-all"
              >
                Upgrade to Pro
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-400">
              Clear answers to your technical questions about ResumeForge AI.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="rounded-xl border border-slate-800 bg-slate-900/20 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between font-bold text-white hover:bg-slate-900/30 transition-colors"
                >
                  {faq.question}
                  <HelpCircle className={`w-5 h-5 text-slate-500 transition-transform duration-200 ${activeFaq === idx ? "rotate-180 text-blue-500" : ""}`} />
                </button>
                {activeFaq === idx && (
                  <div className="px-6 pb-5 pt-1 text-sm text-slate-400 leading-relaxed border-t border-slate-850 bg-slate-950/20">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="py-20 border-t border-slate-850 bg-gradient-to-b from-[#0f172a] to-[#0a0f1d] relative z-10 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Ready to Forge Your Career Path?
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-10 text-base md:text-lg">
            Join hundreds of professionals building modern, ATS-ready profiles and landing job interviews at leading technology companies.
          </p>
          <Link 
            href="/dashboard"
            className="inline-flex items-center gap-2 text-base font-semibold gradient-accent text-white px-8 py-4 rounded-xl shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Create Your Resume Now
            <ArrowRight className="w-4.5 h-4.5" />
          </Link>
        </div>
      </section>

      {/* Footer Area */}
      <footer className="border-t border-slate-900 bg-[#070b16] py-12 text-slate-500 text-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <span className="font-bold text-white text-base tracking-tight">ResumeForge AI</span>
          </div>

          <p>© 2026 ResumeForge AI Career Platforms. All rights reserved.</p>

          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
            <a href="#" className="hover:text-slate-300">Security Audit</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
