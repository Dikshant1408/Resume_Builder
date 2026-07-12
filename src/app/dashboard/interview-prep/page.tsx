"use client";

import { useState } from "react";
import { useAppStore, InterviewSession, InterviewMessage } from "@/store/useAppStore";
import { 
  Sparkles, 
  HelpCircle, 
  Play, 
  Send, 
  CheckCircle, 
  BarChart, 
  RotateCcw, 
  Loader2, 
  Mic, 
  Volume2, 
  User, 
  ShieldCheck, 
  Info,
  Clock,
  Compass
} from "lucide-react";

export default function InterviewPrep() {
  const { interviews, addInterviewSession } = useAppStore();
  
  // Setup parameters
  const [role, setRole] = useState("Software Engineer");
  const [category, setCategory] = useState("technical");
  const [sessionActive, setSessionActive] = useState(false);
  const [sessionFinished, setSessionFinished] = useState(false);

  // Active session parameters
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [loadingAnswer, setLoadingAnswer] = useState(false);
  const [chatLog, setChatLog] = useState<InterviewMessage[]>([]);
  const [micActive, setMicActive] = useState(false);

  // Final summary parameters
  const [activeSession, setActiveSession] = useState<InterviewSession | null>(interviews[0] || null);

  const mockQuestions = {
    software: {
      technical: [
        "Explain the difference between virtual DOM rendering and server-side compilation hooks in React 19.",
        "How would you approach debugging memory leaks inside a Node.js process under continuous scale load?",
        "Describe how you would design an idempotent REST API endpoint for payment processing pipelines."
      ],
      behavioral: [
        "Tell me about a time you had to disagree with a senior technical lead. How did you resolve the difference?",
        "Describe a scenario where a project was falling behind schedule. What actions did you take to re-baseline it?",
        "How do you handle onboarding under undocumented technical stacks? Tell me about a past experience."
      ]
    },
    product: {
      technical: [
        "How do you prioritize feature roadmaps when faced with conflicting customer feedbacks?",
        "How would you measure the success of Vercel launching a new analytics tracking dashboard feature?",
        "Describe a product you love but think is poorly designed. How would you iterate on it?"
      ]
    }
  };

  const activeQuestionsList = category === "technical" 
    ? mockQuestions.software.technical 
    : mockQuestions.software.behavioral;

  const handleStartSession = () => {
    setChatLog([
      { role: "assistant" as const, content: activeQuestionsList[0] }
    ]);
    setCurrentStep(0);
    setUserAnswer("");
    setSessionActive(true);
    setSessionFinished(false);
  };

  const handleSubmitAnswer = () => {
    if (!userAnswer.trim()) return;

    setLoadingAnswer(true);
    const updatedLog: InterviewMessage[] = [
      ...chatLog,
      { role: "user" as const, content: userAnswer }
    ];
    setChatLog(updatedLog);

    setTimeout(() => {
      setUserAnswer("");
      setLoadingAnswer(false);
      
      const nextIdx = currentStep + 1;
      if (nextIdx < activeQuestionsList.length) {
        setCurrentStep(nextIdx);
        setChatLog([
          ...updatedLog,
          { role: "assistant" as const, content: activeQuestionsList[nextIdx] }
        ]);
      } else {
        // Complete session
        const newSession: InterviewSession = {
          id: `int-${Date.now()}`,
          role,
          score: 84,
          metrics: {
            confidence: 86,
            grammar: 80,
            communication: 88
          },
          transcript: updatedLog,
          createdAt: new Date().toISOString()
        };
        addInterviewSession(newSession);
        setActiveSession(newSession);
        setSessionActive(false);
        setSessionFinished(true);
      }
    }, 1200);
  };

  const handleToggleMic = () => {
    setMicActive(!micActive);
    if (!micActive) {
      setTimeout(() => {
        setUserAnswer("In my previous role, I led component optimizations that minimized client bundle assets by 32% to raise scannable PageSpeed metrics. We focused on lazy-loading heavier third-party chart dependencies on scroll.");
        setMicActive(false);
      }, 3000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-xl font-extrabold tracking-tight">AI Interview Practice Simulator</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Run high-fidelity interactive mock interview panels and receive detailed speech grammar analysis reports.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Setup / Controls / Question Chat */}
        <div className="lg:col-span-7 space-y-6">
          {/* SETUP MODULE (When not active) */}
          {!sessionActive && !sessionFinished && (
            <div className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b]/40 p-6 space-y-5">
              <h3 className="font-bold text-sm text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-850 pb-2 mb-2">
                Mock Setup Panel
              </h3>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-500">Target Career Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2 bg-transparent border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none"
                  >
                    <option value="Software Engineer">Software Engineer</option>
                    <option value="Product Manager">Product Manager</option>
                    <option value="Data Scientist">Data Scientist</option>
                    <option value="UI/UX Designer">UI/UX Designer</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-500">Question Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-transparent border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none"
                  >
                    <option value="technical">Technical & Systems</option>
                    <option value="behavioral">Behavioral (STAR method)</option>
                    <option value="hr">HR & Background</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleStartSession}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/10 hover:shadow-blue-500/30 flex items-center justify-center gap-2 transition-transform hover:scale-[1.01]"
              >
                <Play className="w-4 h-4 fill-current shrink-0" />
                Begin Mock Interview Session
              </button>
            </div>
          )}

          {/* ACTIVE CHAT INTERACTIVE PANEL */}
          {sessionActive && (
            <div className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b]/40 flex flex-col h-[460px] overflow-hidden">
              {/* Header */}
              <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/60 flex items-center justify-between shrink-0 select-none">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Question {currentStep + 1} of {activeQuestionsList.length}</span>
                <span className="text-[9px] font-bold text-red-500 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded uppercase">LIVE RECORDING</span>
              </div>

              {/* Chat Body */}
              <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-50/30 dark:bg-transparent">
                {chatLog.map((msg, i) => (
                  <div 
                    key={i} 
                    className={`flex gap-3 max-w-[85%] text-xs leading-relaxed ${
                      msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center font-bold ${
                      msg.role === "user" ? "bg-blue-600 text-white" : "bg-slate-200 dark:bg-slate-800 text-slate-500"
                    }`}>
                      {msg.role === "user" ? <User className="w-4 h-4" /> : "AI"}
                    </div>

                    <div className={`p-3.5 rounded-2xl border ${
                      msg.role === "user" 
                        ? "bg-blue-500/5 border-blue-500/20 text-blue-900 dark:text-blue-200 rounded-tr-none" 
                        : "bg-white dark:bg-[#1e293b] border-slate-200 dark:border-slate-800 text-slate-850 dark:text-slate-100 rounded-tl-none shadow-sm"
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {loadingAnswer && (
                  <div className="flex gap-3 max-w-[85%] text-xs items-center">
                    <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500 font-bold">AI</div>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                  </div>
                )}
              </div>

              {/* Chat Input Controls */}
              <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20 flex gap-2 shrink-0">
                <button
                  onClick={handleToggleMic}
                  className={`p-2.5 rounded-xl border transition-all ${
                    micActive 
                      ? "bg-red-500 border-red-600 text-white animate-pulse" 
                      : "border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                  title={micActive ? "Stop transcription" : "Answer with Voice Transcription"}
                >
                  <Mic className="w-4.5 h-4.5" />
                </button>

                <input 
                  type="text" 
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder={micActive ? "Listening and transcribing..." : "Type your technical answer details..."}
                  disabled={micActive || loadingAnswer}
                  onKeyDown={(e) => { if (e.key === "Enter") handleSubmitAnswer(); }}
                  className="flex-1 px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg text-xs bg-white dark:bg-slate-950 focus:ring-1 focus:ring-blue-500 outline-none disabled:opacity-50"
                />

                <button
                  onClick={handleSubmitAnswer}
                  disabled={loadingAnswer || !userAnswer.trim()}
                  className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* FINISHED CONGRATULATIONS STATE */}
          {sessionFinished && (
            <div className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b]/40 p-6 space-y-4 text-center">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-sm text-slate-850 dark:text-white">Session Completed!</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Your speech metrics report has been generated. Inspect ratings and recommendations on the right panel.
                </p>
              </div>
              <button 
                onClick={handleStartSession}
                className="px-4 py-2 border border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold rounded-lg text-slate-650 dark:text-slate-350 transition-all"
              >
                Start New Session
              </button>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Metrics summary & Feedback */}
        <div className="lg:col-span-5 space-y-6">
          {activeSession ? (
            <div className="space-y-6">
              {/* Score widgets */}
              <div className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b]/40 p-6 space-y-5">
                <h3 className="font-bold text-sm border-b border-slate-100 dark:border-slate-850 pb-2 mb-2">Overall Score: {activeSession.score}%</h3>
                
                <div className="space-y-3.5">
                  {[
                    { label: "Confidence & Delivery", value: activeSession.metrics.confidence },
                    { label: "Communication Clearness", value: activeSession.metrics.communication },
                    { label: "Grammar & Structure Accuracy", value: activeSession.metrics.grammar }
                  ].map((m, idx) => (
                    <div key={idx} className="space-y-2 text-xs">
                      <div className="flex justify-between font-bold">
                        <span className="text-slate-500">{m.label}</span>
                        <span>{m.value}%</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="h-full gradient-accent" style={{ width: `${m.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Coaching Feedback */}
              <div className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b]/40 p-6 space-y-4">
                <h3 className="font-bold text-sm text-slate-800 dark:text-white flex items-center gap-1.5">
                  <Sparkles className="w-4.5 h-4.5 text-blue-500 animate-pulse" />
                  AI Coaching Suggestions
                </h3>
                
                <div className="space-y-3.5 text-xs">
                  <div className="p-3 bg-blue-500/5 border border-blue-500/10 rounded-xl space-y-1 text-slate-650 dark:text-slate-350 leading-relaxed">
                    <div className="font-bold text-blue-500">Communication Strength:</div>
                    <p>Excellent quantification of metrics in answers. You clearly connect technical tasks with quantifiable business achievements (e.g. &quot;minimized client bundle assets by 32%&quot;).</p>
                  </div>

                  <div className="p-3 bg-amber-500/5 border border-amber-500/10 rounded-xl space-y-1 text-slate-650 dark:text-slate-350 leading-relaxed">
                    <div className="font-bold text-amber-500">Improvement Opportunity:</div>
                    <p>Slight grammar errors detected during voice transcripts. Slow down pace slightly when describing system logic setups to increase articulation ratings.</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b]/40 p-8 flex flex-col items-center justify-center text-center space-y-4 min-h-[300px]">
              <Info className="w-8 h-8 text-slate-350" />
              <div className="space-y-1">
                <h4 className="font-bold text-sm">No session audited yet</h4>
                <p className="text-xs text-slate-400">
                  Begin a new mock interview session on the left panel, complete the checklist questions, and your speech report metrics will be logged here.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
