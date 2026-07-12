"use client";

import { useState } from "react";
import { useAppStore, JobApplication } from "@/store/useAppStore";
import { 
  Briefcase, 
  Plus, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Link as LinkIcon, 
  Trash2, 
  ArrowLeft, 
  ArrowRight,
  Info,
  CheckCircle,
  XCircle,
  HelpCircle,
  FileText,
  Clock
} from "lucide-react";

const TrelloIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <rect x="7" y="7" width="3" height="9" />
    <rect x="14" y="7" width="3" height="5" />
  </svg>
);

export default function JobTracker() {
  const { applications, addApplication, updateApplicationStatus, deleteApplication } = useAppStore();
  const [viewMode, setViewMode] = useState<"kanban" | "calendar">("kanban");
  
  // Add application states
  const [showAddForm, setShowAddForm] = useState(false);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [salary, setSalary] = useState("");
  const [jobLink, setJobLink] = useState("");
  const [status, setStatus] = useState<JobApplication["status"]>("applied");
  const [notes, setNotes] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim() || !role.trim()) return;

    addApplication({
      company,
      role,
      salary,
      jobLink,
      status,
      notes,
      applicationDate: new Date().toISOString().split("T")[0],
      deadline: deadline || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0] // default 2 weeks
    });

    // Reset
    setCompany("");
    setRole("");
    setSalary("");
    setJobLink("");
    setStatus("applied");
    setNotes("");
    setDeadline("");
    setShowAddForm(false);
  };

  const columns: Array<{ id: JobApplication["status"]; label: string; color: string; bg: string }> = [
    { id: "applied", label: "Applied", color: "text-blue-500 border-blue-500", bg: "bg-blue-500/10" },
    { id: "assessment", label: "Assessment", color: "text-amber-500 border-amber-500", bg: "bg-amber-500/10" },
    { id: "interview", label: "Interview", color: "text-purple-500 border-purple-500", bg: "bg-purple-500/10" },
    { id: "offer", label: "Offer", color: "text-emerald-500 border-emerald-500", bg: "bg-emerald-500/10" },
    { id: "rejected", label: "Rejected", color: "text-red-500 border-red-500", bg: "bg-red-500/10" }
  ];

  const getColNextStatus = (curr: JobApplication["status"], direction: "next" | "prev"): JobApplication["status"] => {
    const sequence: JobApplication["status"][] = ["applied", "assessment", "interview", "offer", "rejected"];
    const idx = sequence.indexOf(curr);
    if (direction === "next") {
      return sequence[(idx + 1) % sequence.length];
    } else {
      return sequence[(idx - 1 + sequence.length) % sequence.length];
    }
  };

  // Render Calendar Grid Days (simulating July 2026)
  const renderCalendarGrid = () => {
    const daysInMonth = 31;
    const startOffset = 3; // July 2026 starts on Wednesday (offset 3)
    const days = [];

    // Empty offset cells
    for (let i = 0; i < startOffset; i++) {
      days.push(<div key={`offset-${i}`} className="h-28 border border-slate-200/50 dark:border-slate-800 bg-slate-100/30 dark:bg-slate-900/5" />);
    }

    // Days grid
    for (let d = 1; d <= daysInMonth; d++) {
      const dateString = `2026-07-${d < 10 ? "0" + d : d}`;
      
      // Match applications due/interview on this date
      const matchedApps = applications.filter((app) => 
        app.deadline === dateString || app.applicationDate === dateString
      );

      days.push(
        <div key={d} className="h-28 border border-slate-200 dark:border-slate-800 p-2 text-left relative flex flex-col justify-between hover:bg-slate-50 dark:hover:bg-slate-900/20 bg-white dark:bg-transparent">
          <span className="text-xs font-bold text-slate-400">{d}</span>
          <div className="flex-1 overflow-y-auto space-y-1 mt-1">
            {matchedApps.map((app) => (
              <div 
                key={app.id} 
                className={`px-1.5 py-0.5 rounded text-[8px] font-bold truncate flex items-center gap-0.5 border ${
                  app.status === "offer" 
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                    : app.status === "interview"
                      ? "bg-purple-500/10 border-purple-500/20 text-purple-600 dark:text-purple-400"
                      : app.status === "rejected"
                        ? "bg-red-500/10 border-red-500/20 text-red-600"
                        : "bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400"
                }`}
              >
                <Clock className="w-2.5 h-2.5 shrink-0" />
                {app.company} ({app.role})
              </div>
            ))}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold tracking-tight">Kanban Application Tracker</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Pipeline your submissions, schedule mock interviews, and monitor deadlines.
          </p>
        </div>

        {/* View mode toggle and Add Application Trigger */}
        <div className="flex items-center gap-3 self-start sm:self-auto font-bold text-xs text-slate-500">
          <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1">
            <button
              onClick={() => setViewMode("kanban")}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${viewMode === "kanban" ? "bg-white dark:bg-slate-800 text-slate-800 dark:text-white" : "text-slate-400"}`}
            >
              <TrelloIcon className="w-3.5 h-3.5" /> Board
            </button>
            <button
              onClick={() => setViewMode("calendar")}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${viewMode === "calendar" ? "bg-white dark:bg-slate-800 text-slate-800 dark:text-white" : "text-slate-400"}`}
            >
              <Calendar className="w-3.5 h-3.5" /> Schedule
            </button>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-bold shadow hover:bg-blue-700 hover:scale-[1.01] transition-transform"
          >
            <Plus className="w-4 h-4" /> Add Application
          </button>
        </div>
      </div>

      {/* Add Application Form Modal Overlay */}
      {showAddForm && (
        <>
          <div className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowAddForm(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 text-xs leading-relaxed space-y-4">
            <h3 className="font-extrabold text-sm border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center justify-between">
              <span>Track Job Submission</span>
              <button onClick={() => setShowAddForm(false)} className="text-slate-400 hover:text-slate-650">✕</button>
            </h3>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-500">Company Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Stripe"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-transparent focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-500">Role / Job Title</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Full Stack Developer"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-transparent focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-500">Salary Range (Optional)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. $140k - $160k"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-transparent focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-500">Job Link URL (Optional)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. stripe.com/careers"
                    value={jobLink}
                    onChange={(e) => setJobLink(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-transparent focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-500">Status Pipeline</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-3 py-2 bg-transparent border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none"
                  >
                    <option value="applied">Applied</option>
                    <option value="assessment">Assessment</option>
                    <option value="interview">Interview Panels</option>
                    <option value="offer">Offer Letter</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-500">Deadline Date</label>
                  <input 
                    type="date" 
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-transparent focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-500">Submission Notes</label>
                <textarea 
                  rows={3}
                  placeholder="Referral names, specific links, feedback comments..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-transparent focus:ring-1 focus:ring-blue-500 outline-none leading-relaxed"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow transition-colors"
              >
                Track Job Submission
              </button>
            </form>
          </div>
        </>
      )}

      {/* VIEW PANEL: KANBAN BOARD */}
      {viewMode === "kanban" && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 overflow-x-auto pb-4">
          {columns.map((col) => {
            const colApps = applications.filter((app) => app.status === col.id);
            return (
              <div 
                key={col.id} 
                className="flex flex-col gap-4 min-w-[200px]"
              >
                {/* Column header */}
                <div className="flex items-center justify-between border-b-2 pb-2 shrink-0 border-slate-200 dark:border-slate-800/80">
                  <div className="flex items-center gap-2 font-bold text-xs text-slate-800 dark:text-white uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" style={{ backgroundColor: col.id === "offer" ? "#10b981" : col.id === "rejected" ? "#ef4444" : col.id === "interview" ? "#818cf8" : col.id === "assessment" ? "#f59e0b" : "#3b82f6" }} />
                    {col.label}
                  </div>
                  <span className="text-[10px] bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 rounded font-black text-slate-500">
                    {colApps.length}
                  </span>
                </div>

                {/* Column body cards list */}
                <div className="flex-1 space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto min-h-[300px]">
                  {colApps.length === 0 ? (
                    <div className="text-center py-10 rounded-xl border border-dashed border-slate-200 dark:border-slate-800/50 bg-slate-50/10 text-[10px] text-slate-400 font-semibold select-none">
                      Drag jobs here
                    </div>
                  ) : (
                    colApps.map((app) => (
                      <div 
                        key={app.id} 
                        className="glass-card rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b]/40 p-4 space-y-3 relative hover:scale-[1.01]"
                      >
                        {/* Delete trigger */}
                        <button 
                          onClick={() => deleteApplication(app.id)}
                          className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors"
                          title="Delete card"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <div className="space-y-1">
                          <h4 className="font-extrabold text-slate-850 dark:text-white text-xs truncate pr-5">{app.company}</h4>
                          <p className="text-[10px] text-slate-500 font-semibold truncate">{app.role}</p>
                        </div>

                        {/* Salary/Link metadata */}
                        <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-[9px] text-slate-500 font-medium pt-1">
                          {app.salary && (
                            <span className="flex items-center gap-0.5"><DollarSign className="w-3 h-3 text-slate-400" />{app.salary}</span>
                          )}
                          {app.jobLink && (
                            <a href={app.jobLink} target="_blank" rel="noreferrer" className="flex items-center gap-0.5 text-blue-500 hover:underline">
                              <LinkIcon className="w-2.5 h-2.5 shrink-0" />Link
                            </a>
                          )}
                        </div>

                        {app.notes && (
                          <p className="text-[10px] text-slate-400 leading-normal line-clamp-2 border-t border-slate-100 dark:border-slate-800/60 pt-2 font-medium">
                            {app.notes}
                          </p>
                        )}

                        {/* Card controls (move columns) */}
                        <div className="flex justify-between items-center border-t border-slate-100 dark:border-slate-800/60 pt-2 shrink-0">
                          <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            Due {new Date(app.deadline).toLocaleDateString()}
                          </span>

                          <div className="flex gap-0.5">
                            <button
                              onClick={() => updateApplicationStatus(app.id, getColNextStatus(app.status, "prev"))}
                              className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-450 hover:text-slate-800 dark:hover:text-slate-200"
                              title="Move left"
                            >
                              <ArrowLeft className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => updateApplicationStatus(app.id, getColNextStatus(app.status, "next"))}
                              className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-450 hover:text-slate-800 dark:hover:text-slate-200"
                              title="Move right"
                            >
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW PANEL: MONTHLY CALENDAR GRID */}
      {viewMode === "calendar" && (
        <div className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b]/40 p-6 overflow-hidden">
          {/* Calendar Header info */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-4 select-none">
            <h3 className="font-extrabold text-sm text-slate-800 dark:text-white uppercase tracking-wider">July 2026 Calendar</h3>
            <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-blue-500" /> Deadline dates plotted below
            </span>
          </div>

          {/* Weekday labels */}
          <div className="grid grid-cols-7 gap-0 text-center font-bold text-[10px] text-slate-500 uppercase tracking-widest border-b border-slate-200 dark:border-slate-800 pb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>

          {/* Month days grid */}
          <div className="grid grid-cols-7 gap-0 border-l border-t border-slate-200/50 dark:border-slate-800/50 mt-2">
            {renderCalendarGrid()}
          </div>
        </div>
      )}
    </div>
  );
}
