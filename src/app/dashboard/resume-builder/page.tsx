"use client";

import { useState, useEffect, useRef } from "react";
import { useAppStore, ResumeContent, ExperienceItem, EducationItem, ProjectItem, SkillGroup, CertificationItem, AchievementItem, LanguageItem, VolunteerItem, ReferenceItem } from "@/store/useAppStore";
import { 
  Plus, 
  Trash2, 
  Copy, 
  Sparkles, 
  Printer, 
  Eye, 
  EyeOff, 
  ArrowUp, 
  ArrowDown, 
  Save, 
  Check, 
  Loader2, 
  Briefcase, 
  GraduationCap, 
  FolderGit, 
  User, 
  Award, 
  Wrench, 
  Globe2, 
  Link as LinkIcon 
} from "lucide-react";

export default function ResumeBuilder() {
  const { 
    getActiveResume, 
    updateResumeContent, 
    updateResumeTemplate, 
    updateResumeTitle, 
    saveStatus, 
    setAutoSaveStatus 
  } = useAppStore();

  const activeResume = getActiveResume();
  const [activeTab, setActiveTab] = useState<"profile" | "experience" | "education" | "projects" | "skills" | "sections">("profile");
  
  // AI assistant states
  const [aiInput, setAiInput] = useState("");
  const [aiOutput, setAiOutput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiCommand, setAiCommand] = useState<"improve" | "shorten" | "expand" | "professional" | "technical" | "leadership" | "verbs" | "quantify">("improve");

  // Keep track of active editing field for inserting AI text
  const [activeInputRef, setActiveInputRef] = useState<{ section: string; field: string; itemId?: string } | null>(null);

  // Trigger simulated auto-saving whenever resume changes
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleContentChange = (update: Partial<ResumeContent>) => {
    setAutoSaveStatus("unsaved");
    updateResumeContent(update);
    
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      setAutoSaveStatus("saving");
      setTimeout(() => {
        setAutoSaveStatus("saved");
      }, 800);
    }, 1500);
  };

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, []);

  if (!activeResume) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
        <p className="text-slate-500">Loading your resume template...</p>
      </div>
    );
  }

  const { content, template, title } = activeResume;

  // Insert AI suggestion into form
  const handleUseAiText = () => {
    if (!aiOutput) return;
    if (activeInputRef) {
      const { section, field, itemId } = activeInputRef;
      if (section === "summary") {
        handleContentChange({ summary: aiOutput });
      } else if (section === "experience" && itemId) {
        const updated = content.experience.map((item) => 
          item.id === itemId ? { ...item, [field]: aiOutput } : item
        );
        handleContentChange({ experience: updated });
      } else if (section === "projects" && itemId) {
        const updated = content.projects.map((item) => 
          item.id === itemId ? { ...item, [field]: aiOutput } : item
        );
        handleContentChange({ projects: updated });
      }
    } else {
      // If no field focused, replace AI input field
      setAiInput(aiOutput);
    }
    setAiOutput("");
  };

  // AI endpoint fetch
  const handleAiAction = async () => {
    if (!aiInput.trim()) return;
    setAiLoading(true);
    setAiOutput("");
    
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: aiInput, action: aiCommand })
      });
      const data = await res.json();
      setAiOutput(data.result || "Failed to generate optimized text.");
    } catch (err) {
      console.error(err);
      setAiOutput("Error communicating with AI services.");
    } finally {
      setAiLoading(false);
    }
  };

  // Section hide/show toggle
  const toggleSectionVisibility = (sectionName: string) => {
    const isHidden = content.hiddenSections.includes(sectionName);
    const hiddenSections = isHidden 
      ? content.hiddenSections.filter((s) => s !== sectionName)
      : [...content.hiddenSections, sectionName];
    handleContentChange({ hiddenSections });
  };

  // Reorder sections
  const moveSection = (index: number, direction: "up" | "down") => {
    const newOrder = [...content.sectionsOrder];
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newOrder.length) return;
    
    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIdx];
    newOrder[targetIdx] = temp;
    handleContentChange({ sectionsOrder: newOrder });
  };

  // Array handlers (Experience, Education, etc.)
  const addExperience = () => {
    const newItem: ExperienceItem = {
      id: `exp-${Date.now()}`,
      company: "Company Name",
      role: "Job Title",
      location: "City, State",
      startDate: "",
      endDate: "",
      current: false,
      description: "Added achievements bullet point."
    };
    handleContentChange({ experience: [...content.experience, newItem] });
  };

  const removeExperience = (id: string) => {
    handleContentChange({ experience: content.experience.filter((item) => item.id !== id) });
  };

  const addEducation = () => {
    const newItem: EducationItem = {
      id: `edu-${Date.now()}`,
      institution: "Institution Name",
      degree: "Degree Program",
      fieldOfStudy: "Major Subject",
      location: "City, State",
      startDate: "",
      endDate: "",
      gpa: ""
    };
    handleContentChange({ education: [...content.education, newItem] });
  };

  const removeEducation = (id: string) => {
    handleContentChange({ education: content.education.filter((item) => item.id !== id) });
  };

  const addProject = () => {
    const newItem: ProjectItem = {
      id: `proj-${Date.now()}`,
      name: "Project Name",
      description: "Short project summary and details.",
      technologies: "React, Node.js",
      link: ""
    };
    handleContentChange({ projects: [...content.projects, newItem] });
  };

  const removeProject = (id: string) => {
    handleContentChange({ projects: content.projects.filter((item) => item.id !== id) });
  };

  const addSkillGroup = () => {
    const newItem: SkillGroup = {
      id: `sk-${Date.now()}`,
      category: "Category Name",
      skills: "Skill1, Skill2, Skill3"
    };
    handleContentChange({ skills: [...content.skills, newItem] });
  };

  const removeSkillGroup = (id: string) => {
    handleContentChange({ skills: content.skills.filter((item) => item.id !== id) });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col lg:flex-row gap-6 overflow-hidden">
      {/* LEFT COLUMN: Editing Forms */}
      <div className="w-full lg:w-[45%] flex flex-col h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        {/* Form Header Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto shrink-0 bg-slate-50 dark:bg-slate-900/50">
          {[
            { id: "profile", label: "Profile", icon: <User className="w-4 h-4" /> },
            { id: "experience", label: "Work", icon: <Briefcase className="w-4 h-4" /> },
            { id: "education", label: "Education", icon: <GraduationCap className="w-4 h-4" /> },
            { id: "projects", label: "Projects", icon: <FolderGit className="w-4 h-4" /> },
            { id: "skills", label: "Skills", icon: <Wrench className="w-4 h-4" /> },
            { id: "sections", label: "Sections", icon: <Award className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-4.5 py-3 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${
                activeTab === tab.id 
                  ? "border-blue-600 text-blue-600 dark:text-blue-400" 
                  : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form Body Scroll Area */}
        <div className="flex-1 p-5 overflow-y-auto space-y-6">
          {/* PROFILE SECTION */}
          {activeTab === "profile" && (
            <div className="space-y-4 text-xs">
              <h3 className="font-extrabold text-sm border-b border-slate-100 dark:border-slate-800 pb-2 mb-4">Resume Title & Contact Details</h3>
              
              <div className="space-y-1.5">
                <label className="font-bold text-slate-500 dark:text-slate-400">Resume Document Title</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={(e) => updateResumeTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-transparent focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-500 dark:text-slate-400">Full Name</label>
                  <input 
                    type="text" 
                    value={content.personalInfo.fullName} 
                    onChange={(e) => handleContentChange({ personalInfo: { ...content.personalInfo, fullName: e.target.value } })}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-transparent focus:ring-1 focus:ring-blue-500 outline-none font-medium"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-500 dark:text-slate-400">Professional Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Senior Software Engineer"
                    value={content.personalInfo.website ? content.personalInfo.website.replace("https://", "") : ""} 
                    onChange={(e) => handleContentChange({ personalInfo: { ...content.personalInfo, website: `https://${e.target.value}` } })}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-transparent focus:ring-1 focus:ring-blue-500 outline-none font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-500 dark:text-slate-400">Email Address</label>
                  <input 
                    type="email" 
                    value={content.personalInfo.email} 
                    onChange={(e) => handleContentChange({ personalInfo: { ...content.personalInfo, email: e.target.value } })}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-transparent focus:ring-1 focus:ring-blue-500 outline-none font-medium"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-500 dark:text-slate-400">Phone Number</label>
                  <input 
                    type="text" 
                    value={content.personalInfo.phone} 
                    onChange={(e) => handleContentChange({ personalInfo: { ...content.personalInfo, phone: e.target.value } })}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-transparent focus:ring-1 focus:ring-blue-500 outline-none font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-500 dark:text-slate-400">Location (City, State)</label>
                  <input 
                    type="text" 
                    value={content.personalInfo.location} 
                    onChange={(e) => handleContentChange({ personalInfo: { ...content.personalInfo, location: e.target.value } })}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-transparent focus:ring-1 focus:ring-blue-500 outline-none font-medium"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-500 dark:text-slate-400">GitHub Profile</label>
                  <input 
                    type="text" 
                    value={content.personalInfo.github} 
                    onChange={(e) => handleContentChange({ personalInfo: { ...content.personalInfo, github: e.target.value } })}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-transparent focus:ring-1 focus:ring-blue-500 outline-none font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-500 dark:text-slate-400">LinkedIn Profile</label>
                <input 
                  type="text" 
                  value={content.personalInfo.linkedin} 
                  onChange={(e) => handleContentChange({ personalInfo: { ...content.personalInfo, linkedin: e.target.value } })}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-transparent focus:ring-1 focus:ring-blue-500 outline-none font-medium"
                />
              </div>

              <div className="space-y-1.5 mt-6">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-500 dark:text-slate-400">Professional Summary</label>
                  <button 
                    onClick={() => {
                      setAiInput(content.summary);
                      setActiveInputRef({ section: "summary", field: "summary" });
                    }}
                    className="text-[10px] text-blue-500 font-extrabold flex items-center gap-0.5 hover:underline"
                  >
                    <Sparkles className="w-3 h-3" /> PULL TO AI WRITER
                  </button>
                </div>
                <textarea 
                  rows={4}
                  value={content.summary} 
                  onChange={(e) => handleContentChange({ summary: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-transparent focus:ring-1 focus:ring-blue-500 outline-none font-medium leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* EXPERIENCE SECTION */}
          {activeTab === "experience" && (
            <div className="space-y-6 text-xs">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 mb-4">
                <h3 className="font-extrabold text-sm">Work Experience</h3>
                <button 
                  onClick={addExperience}
                  className="flex items-center gap-1 text-xs font-bold text-blue-500 bg-blue-500/5 hover:bg-blue-500/10 px-3 py-1.5 rounded-lg border border-blue-500/10"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Experience
                </button>
              </div>

              {content.experience.map((item, idx) => (
                <div key={item.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 relative bg-slate-50/30 dark:bg-slate-900/10 space-y-4">
                  <button 
                    onClick={() => removeExperience(item.id)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors"
                    title="Delete Entry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <h4 className="font-extrabold text-slate-800 dark:text-slate-200">Job Position #{idx + 1}</h4>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-500 dark:text-slate-400">Company Name</label>
                      <input 
                        type="text" 
                        value={item.company} 
                        onChange={(e) => {
                          const updated = content.experience.map((exp) => exp.id === item.id ? { ...exp, company: e.target.value } : exp);
                          handleContentChange({ experience: updated });
                        }}
                        className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-transparent focus:ring-1 focus:ring-blue-500 outline-none font-medium"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-500 dark:text-slate-400">Job Role / Title</label>
                      <input 
                        type="text" 
                        value={item.role} 
                        onChange={(e) => {
                          const updated = content.experience.map((exp) => exp.id === item.id ? { ...exp, role: e.target.value } : exp);
                          handleContentChange({ experience: updated });
                        }}
                        className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-transparent focus:ring-1 focus:ring-blue-500 outline-none font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-500 dark:text-slate-400">Start Date (e.g. 2022-06)</label>
                      <input 
                        type="text" 
                        value={item.startDate} 
                        onChange={(e) => {
                          const updated = content.experience.map((exp) => exp.id === item.id ? { ...exp, startDate: e.target.value } : exp);
                          handleContentChange({ experience: updated });
                        }}
                        className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-transparent focus:ring-1 focus:ring-blue-500 outline-none font-medium"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-500 dark:text-slate-400">End Date (or Current)</label>
                      <input 
                        type="text" 
                        value={item.endDate} 
                        placeholder={item.current ? "Current" : "e.g. 2024-03"}
                        disabled={item.current}
                        onChange={(e) => {
                          const updated = content.experience.map((exp) => exp.id === item.id ? { ...exp, endDate: e.target.value } : exp);
                          handleContentChange({ experience: updated });
                        }}
                        className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-transparent focus:ring-1 focus:ring-blue-500 outline-none font-medium disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id={`curr-${item.id}`}
                      checked={item.current} 
                      onChange={(e) => {
                        const updated = content.experience.map((exp) => exp.id === item.id ? { ...exp, current: e.target.checked, endDate: e.target.checked ? "" : exp.endDate } : exp);
                        handleContentChange({ experience: updated });
                      }}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor={`curr-${item.id}`} className="font-bold text-slate-600 dark:text-slate-300">I currently work here</label>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="font-bold text-slate-500 dark:text-slate-400">Job Description / Bullet Points (separated by newline)</label>
                      <button 
                        onClick={() => {
                          setAiInput(item.description);
                          setActiveInputRef({ section: "experience", field: "description", itemId: item.id });
                        }}
                        className="text-[10px] text-blue-500 font-extrabold flex items-center gap-0.5 hover:underline"
                      >
                        <Sparkles className="w-3 h-3" /> PULL TO AI WRITER
                      </button>
                    </div>
                    <textarea 
                      rows={3}
                      value={item.description} 
                      onChange={(e) => {
                        const updated = content.experience.map((exp) => exp.id === item.id ? { ...exp, description: e.target.value } : exp);
                        handleContentChange({ experience: updated });
                      }}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-transparent focus:ring-1 focus:ring-blue-500 outline-none font-medium leading-relaxed"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* EDUCATION SECTION */}
          {activeTab === "education" && (
            <div className="space-y-6 text-xs">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 mb-4">
                <h3 className="font-extrabold text-sm">Education Details</h3>
                <button 
                  onClick={addEducation}
                  className="flex items-center gap-1 text-xs font-bold text-blue-500 bg-blue-500/5 hover:bg-blue-500/10 px-3 py-1.5 rounded-lg border border-blue-500/10"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Education
                </button>
              </div>

              {content.education.map((item, idx) => (
                <div key={item.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 relative bg-slate-50/30 dark:bg-slate-900/10 space-y-4">
                  <button 
                    onClick={() => removeEducation(item.id)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <h4 className="font-extrabold text-slate-800 dark:text-slate-200">Degree/Institution #{idx + 1}</h4>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-500 dark:text-slate-400">School / University</label>
                      <input 
                        type="text" 
                        value={item.institution} 
                        onChange={(e) => {
                          const updated = content.education.map((edu) => edu.id === item.id ? { ...edu, institution: e.target.value } : edu);
                          handleContentChange({ education: updated });
                        }}
                        className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-transparent focus:ring-1 focus:ring-blue-500 outline-none font-medium"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-500 dark:text-slate-400">Degree (e.g. B.S.)</label>
                      <input 
                        type="text" 
                        value={item.degree} 
                        onChange={(e) => {
                          const updated = content.education.map((edu) => edu.id === item.id ? { ...edu, degree: e.target.value } : edu);
                          handleContentChange({ education: updated });
                        }}
                        className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-transparent focus:ring-1 focus:ring-blue-500 outline-none font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-500 dark:text-slate-400">Field of Study (Major)</label>
                      <input 
                        type="text" 
                        value={item.fieldOfStudy} 
                        onChange={(e) => {
                          const updated = content.education.map((edu) => edu.id === item.id ? { ...edu, fieldOfStudy: e.target.value } : edu);
                          handleContentChange({ education: updated });
                        }}
                        className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-transparent focus:ring-1 focus:ring-blue-500 outline-none font-medium"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-500 dark:text-slate-400">GPA Score</label>
                      <input 
                        type="text" 
                        value={item.gpa} 
                        onChange={(e) => {
                          const updated = content.education.map((edu) => edu.id === item.id ? { ...edu, gpa: e.target.value } : edu);
                          handleContentChange({ education: updated });
                        }}
                        className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-transparent focus:ring-1 focus:ring-blue-500 outline-none font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-500 dark:text-slate-400">Start & End Date</label>
                      <input 
                        type="text" 
                        placeholder="e.g. 2018 - 2022"
                        value={item.startDate && item.endDate ? `${item.startDate} - ${item.endDate}` : ""} 
                        onChange={(e) => {
                          const [s = "", e_date = ""] = e.target.value.split("-").map((t) => t.trim());
                          const updated = content.education.map((edu) => edu.id === item.id ? { ...edu, startDate: s, endDate: e_date } : edu);
                          handleContentChange({ education: updated });
                        }}
                        className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-transparent focus:ring-1 focus:ring-blue-500 outline-none font-medium"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-500 dark:text-slate-400">Location (City, State)</label>
                      <input 
                        type="text" 
                        value={item.location} 
                        onChange={(e) => {
                          const updated = content.education.map((edu) => edu.id === item.id ? { ...edu, location: e.target.value } : edu);
                          handleContentChange({ education: updated });
                        }}
                        className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-transparent focus:ring-1 focus:ring-blue-500 outline-none font-medium"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* PROJECTS SECTION */}
          {activeTab === "projects" && (
            <div className="space-y-6 text-xs">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 mb-4">
                <h3 className="font-extrabold text-sm">Projects Portfolio</h3>
                <button 
                  onClick={addProject}
                  className="flex items-center gap-1 text-xs font-bold text-blue-500 bg-blue-500/5 hover:bg-blue-500/10 px-3 py-1.5 rounded-lg border border-blue-500/10"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Project
                </button>
              </div>

              {content.projects.map((item, idx) => (
                <div key={item.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 relative bg-slate-50/30 dark:bg-slate-900/10 space-y-4">
                  <button 
                    onClick={() => removeProject(item.id)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <h4 className="font-extrabold text-slate-800 dark:text-slate-200">Project #{idx + 1}</h4>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-500 dark:text-slate-400">Project Title</label>
                      <input 
                        type="text" 
                        value={item.name} 
                        onChange={(e) => {
                          const updated = content.projects.map((proj) => proj.id === item.id ? { ...proj, name: e.target.value } : proj);
                          handleContentChange({ projects: updated });
                        }}
                        className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-transparent focus:ring-1 focus:ring-blue-500 outline-none font-medium"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-500 dark:text-slate-400">Tech Stack Used</label>
                      <input 
                        type="text" 
                        value={item.technologies} 
                        placeholder="e.g. React, Node.js, AWS"
                        onChange={(e) => {
                          const updated = content.projects.map((proj) => proj.id === item.id ? { ...proj, technologies: e.target.value } : proj);
                          handleContentChange({ projects: updated });
                        }}
                        className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-transparent focus:ring-1 focus:ring-blue-500 outline-none font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-500 dark:text-slate-400">Live URL Link</label>
                    <input 
                      type="text" 
                      value={item.link} 
                      placeholder="e.g. https://github.com/myname/project"
                      onChange={(e) => {
                        const updated = content.projects.map((proj) => proj.id === item.id ? { ...proj, link: e.target.value } : proj);
                        handleContentChange({ projects: updated });
                      }}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-transparent focus:ring-1 focus:ring-blue-500 outline-none font-medium"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="font-bold text-slate-500 dark:text-slate-400">Project Description</label>
                      <button 
                        onClick={() => {
                          setAiInput(item.description);
                          setActiveInputRef({ section: "projects", field: "description", itemId: item.id });
                        }}
                        className="text-[10px] text-blue-500 font-extrabold flex items-center gap-0.5 hover:underline"
                      >
                        <Sparkles className="w-3 h-3" /> PULL TO AI WRITER
                      </button>
                    </div>
                    <textarea 
                      rows={2.5}
                      value={item.description} 
                      onChange={(e) => {
                        const updated = content.projects.map((proj) => proj.id === item.id ? { ...proj, description: e.target.value } : proj);
                        handleContentChange({ projects: updated });
                      }}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-transparent focus:ring-1 focus:ring-blue-500 outline-none font-medium leading-relaxed"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SKILLS SECTION */}
          {activeTab === "skills" && (
            <div className="space-y-6 text-xs">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 mb-4">
                <h3 className="font-extrabold text-sm">Skills Groups</h3>
                <button 
                  onClick={addSkillGroup}
                  className="flex items-center gap-1 text-xs font-bold text-blue-500 bg-blue-500/5 hover:bg-blue-500/10 px-3 py-1.5 rounded-lg border border-blue-500/10"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Category
                </button>
              </div>

              {content.skills.map((item, idx) => (
                <div key={item.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 relative bg-slate-50/30 dark:bg-slate-900/10 space-y-4">
                  <button 
                    onClick={() => removeSkillGroup(item.id)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <h4 className="font-extrabold text-slate-800 dark:text-slate-200">Skill Group #{idx + 1}</h4>

                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-500 dark:text-slate-400">Category Title (e.g. Languages)</label>
                      <input 
                        type="text" 
                        value={item.category} 
                        onChange={(e) => {
                          const updated = content.skills.map((sk) => sk.id === item.id ? { ...sk, category: e.target.value } : sk);
                          handleContentChange({ skills: updated });
                        }}
                        className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-transparent focus:ring-1 focus:ring-blue-500 outline-none font-medium"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-500 dark:text-slate-400">Skills list (comma-separated)</label>
                      <input 
                        type="text" 
                        value={item.skills} 
                        placeholder="React, TypeScript, Next.js"
                        onChange={(e) => {
                          const updated = content.skills.map((sk) => sk.id === item.id ? { ...sk, skills: e.target.value } : sk);
                          handleContentChange({ skills: updated });
                        }}
                        className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-transparent focus:ring-1 focus:ring-blue-500 outline-none font-medium"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SECTIONS MANAGEMENT */}
          {activeTab === "sections" && (
            <div className="space-y-6 text-xs">
              <h3 className="font-extrabold text-sm border-b border-slate-100 dark:border-slate-800 pb-2 mb-4">Reorder and Hide Sections</h3>
              
              <div className="space-y-3">
                {content.sectionsOrder.map((sectionName, idx) => {
                  const isHidden = content.hiddenSections.includes(sectionName);
                  return (
                    <div 
                      key={sectionName} 
                      className={`p-3.5 rounded-xl border flex items-center justify-between transition-colors ${
                        isHidden 
                          ? "border-slate-200 dark:border-slate-800/40 bg-slate-100/40 dark:bg-slate-900/10 text-slate-400 dark:text-slate-500" 
                          : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20 text-slate-800 dark:text-slate-200"
                      }`}
                    >
                      <div className="flex items-center gap-3 font-semibold capitalize">
                        <span className="text-slate-400 text-[10px] bg-slate-200/50 dark:bg-slate-800 px-2 py-0.5 rounded">#{idx + 1}</span>
                        {sectionName === "personalInfo" ? "Personal Info" : sectionName}
                      </div>

                      <div className="flex items-center gap-1">
                        <button 
                          onClick={() => toggleSectionVisibility(sectionName)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                          title={isHidden ? "Show Section" : "Hide Section"}
                        >
                          {isHidden ? <EyeOff className="w-4 h-4 text-red-400" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button 
                          onClick={() => moveSection(idx, "up")}
                          disabled={idx === 0}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 disabled:opacity-30"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => moveSection(idx, "down")}
                          disabled={idx === content.sectionsOrder.length - 1}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 disabled:opacity-30"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* AI BULLET WRITER COMPONENT (Fixed Footer inside Form Box) */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/20 space-y-3 shrink-0">
          <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400">
            <Sparkles className="w-4 h-4 animate-pulse" />
            AI Resume Writing Co-Pilot
          </div>

          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder={activeInputRef ? `Enhance active field: "${activeInputRef.field}"` : "e.g., Developed React application"} 
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              className="flex-1 px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg text-xs bg-white dark:bg-slate-950 focus:ring-1 focus:ring-blue-500 outline-none font-medium"
            />
            <button 
              onClick={handleAiAction}
              disabled={aiLoading}
              className="px-4 bg-slate-900 dark:bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-slate-800 dark:hover:bg-blue-700 disabled:opacity-50 flex items-center gap-1.5 transition-all shadow-md shadow-blue-500/5"
            >
              {aiLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Enhance"}
            </button>
          </div>

          {/* Prompt Tuning Presets */}
          <div className="flex flex-wrap gap-1.5 text-[9px] font-bold text-slate-500">
            {[
              { id: "improve", label: "Improve" },
              { id: "shorten", label: "Shorten" },
              { id: "expand", label: "Expand" },
              { id: "professional", label: "Formal Tone" },
              { id: "technical", label: "Tech Tone" },
              { id: "leadership", label: "Leader Tone" },
              { id: "verbs", label: "Action Verbs" },
              { id: "quantify", label: "Quantify" }
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setAiCommand(p.id as any)}
                className={`px-2.5 py-1 rounded border transition-colors ${
                  aiCommand === p.id 
                    ? "border-blue-500/30 bg-blue-500/10 text-blue-500" 
                    : "border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 hover:text-slate-800 dark:hover:text-slate-350"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Suggestions Output */}
          {aiOutput && (
            <div className="p-3 bg-blue-500/5 border border-blue-500/10 rounded-xl space-y-2 text-xs">
              <div className="font-bold text-slate-700 dark:text-slate-300">AI Improved Suggestion:</div>
              <p className="text-slate-600 dark:text-slate-400 italic leading-relaxed">&quot;{aiOutput}&quot;</p>
              <div className="flex justify-end gap-2 pt-1 font-bold">
                <button 
                  onClick={() => setAiOutput("")}
                  className="px-2.5 py-1 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-700 rounded-md"
                >
                  Discard
                </button>
                <button 
                  onClick={handleUseAiText}
                  className="px-3 py-1 bg-blue-600 text-white rounded-md flex items-center gap-1 hover:bg-blue-700"
                >
                  <Check className="w-3.5 h-3.5" /> Use Suggestion
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: Live Template Previews */}
      <div className="flex-1 flex flex-col h-full bg-[#f1f5f9] dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-inner no-print">
        {/* Toolbars */}
        <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Template:</span>
            <select
              value={template}
              onChange={(e) => updateResumeTemplate(e.target.value)}
              className="text-xs font-bold text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-750 px-3 py-2 rounded-lg focus:outline-none"
            >
              <option value="modern">Modern Suite (Indigo)</option>
              <option value="minimal">Vercel Minimal (Black)</option>
              <option value="professional">Professional Classic (Blue)</option>
              <option value="executive">Executive Board (Burgundy)</option>
              <option value="creative">Creative Bold (Purple)</option>
              <option value="google">Google Tech (Emerald)</option>
              <option value="microsoft">Microsoft Style (Segoe UI)</option>
              <option value="harvard">Harvard Crimson (Crimson)</option>
            </select>
          </div>

          <div className="flex items-center gap-3.5">
            {/* Auto save indicator */}
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
              {saveStatus === "saving" ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-500" />
                  <span>Saving...</span>
                </>
              ) : saveStatus === "saved" ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Saved</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5 text-amber-500" />
                  <span>Unsaved changes</span>
                </>
              )}
            </div>

            <button 
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 dark:bg-blue-600 text-white rounded-lg text-xs font-bold shadow hover:bg-slate-800 dark:hover:bg-blue-700 hover:scale-[1.01] transition-transform"
            >
              <Printer className="w-3.5 h-3.5" /> Export PDF
            </button>
          </div>
        </div>

        {/* Paper Document Container */}
        <div className="flex-1 p-8 overflow-y-auto flex justify-center bg-slate-200/50 dark:bg-[#070a13] print-page">
          <div 
            id="print-area" 
            className={`w-[600px] min-h-[840px] bg-white text-slate-900 border border-slate-350 dark:border-slate-900 shadow-2xl p-8 rounded-sm leading-relaxed overflow-hidden text-left relative transition-all duration-300 ${
              template === "minimal" 
                ? "font-sans text-xs tracking-tight"
                : template === "professional"
                  ? "font-serif text-sm"
                  : template === "executive"
                    ? "font-serif text-sm border-t-8 border-rose-900"
                    : template === "creative"
                      ? "font-sans text-xs tracking-wide border-t-8 border-purple-600"
                      : template === "google"
                        ? "font-serif text-xs border-t-4 border-emerald-600"
                        : template === "microsoft"
                          ? "font-sans text-xs font-light"
                          : template === "harvard"
                            ? "font-serif text-xs border-t-4 border-[#a51c30]"
                            : "font-sans text-xs" /* modern */
            }`}
          >
            {/* 1. Header Contact details */}
            <div className="text-center space-y-1.5 pb-5 border-b border-slate-200/80">
              <h1 className={`font-black text-2xl tracking-tight leading-none ${
                template === "executive" ? "text-rose-900" :
                template === "creative" ? "text-purple-700" :
                template === "google" ? "text-emerald-800" :
                template === "harvard" ? "text-[#a51c30]" : 
                template === "modern" ? "text-blue-600" : "text-slate-900"
              }`}>
                {content.personalInfo.fullName || "Your Full Name"}
              </h1>
              
              {/* Professional Title placeholder */}
              {content.personalInfo.website && (
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                  {content.personalInfo.website.replace("https://", "")}
                </div>
              )}

              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[10px] text-slate-500 font-medium pt-1">
                <span>{content.personalInfo.email}</span>
                <span>•</span>
                <span>{content.personalInfo.phone}</span>
                <span>•</span>
                <span>{content.personalInfo.location}</span>
                {content.personalInfo.github && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-0.5"><LinkIcon className="w-2.5 h-2.5" />{content.personalInfo.github}</span>
                  </>
                )}
                {content.personalInfo.linkedin && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-0.5"><LinkIcon className="w-2.5 h-2.5" />{content.personalInfo.linkedin}</span>
                  </>
                )}
              </div>
            </div>

            {/* 2. Scrollable Sections based on Order & Visibility */}
            <div className="space-y-5 pt-5">
              {content.sectionsOrder.map((sec) => {
                if (content.hiddenSections.includes(sec)) return null;

                // PROFILE SUMMARY
                if (sec === "summary" && content.summary) {
                  return (
                    <div key={sec} className="space-y-1.5">
                      <h2 className={`font-black text-xs uppercase tracking-wider ${
                        template === "executive" ? "text-rose-900" :
                        template === "creative" ? "text-purple-700" :
                        template === "google" ? "text-emerald-800" :
                        template === "harvard" ? "text-[#a51c30]" :
                        template === "modern" ? "text-blue-600" : "text-slate-800"
                      }`}>
                        Professional Summary
                      </h2>
                      <div className="h-0.5 bg-slate-100 mb-2" />
                      <p className="text-[11px] text-slate-700 leading-relaxed font-medium">
                        {content.summary}
                      </p>
                    </div>
                  );
                }

                // WORK EXPERIENCE
                if (sec === "experience" && content.experience.length > 0) {
                  return (
                    <div key={sec} className="space-y-2">
                      <h2 className={`font-black text-xs uppercase tracking-wider ${
                        template === "executive" ? "text-rose-900" :
                        template === "creative" ? "text-purple-700" :
                        template === "google" ? "text-emerald-800" :
                        template === "harvard" ? "text-[#a51c30]" :
                        template === "modern" ? "text-blue-600" : "text-slate-800"
                      }`}>
                        Work Experience
                      </h2>
                      <div className="h-0.5 bg-slate-100 mb-2" />

                      <div className="space-y-4">
                        {content.experience.map((exp) => (
                          <div key={exp.id} className="space-y-1.5 text-[11px]">
                            <div className="flex justify-between items-baseline font-bold text-slate-850">
                              <span>
                                {exp.role} <span className="font-medium text-slate-500">at</span> {exp.company}
                              </span>
                              <span className="text-[10px] text-slate-500 shrink-0">
                                {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                              </span>
                            </div>
                            <div className="text-[9px] font-bold text-slate-400">{exp.location}</div>
                            <ul className="list-disc list-inside space-y-1 text-slate-650 font-medium pl-1">
                              {exp.description.split("\n").map((bullet, bidx) => (
                                <li key={bidx} className="leading-relaxed">
                                  {bullet.startsWith("-") ? bullet.substring(1).trim() : bullet}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }

                // EDUCATION
                if (sec === "education" && content.education.length > 0) {
                  return (
                    <div key={sec} className="space-y-2">
                      <h2 className={`font-black text-xs uppercase tracking-wider ${
                        template === "executive" ? "text-rose-900" :
                        template === "creative" ? "text-purple-700" :
                        template === "google" ? "text-emerald-800" :
                        template === "harvard" ? "text-[#a51c30]" :
                        template === "modern" ? "text-blue-600" : "text-slate-800"
                      }`}>
                        Education
                      </h2>
                      <div className="h-0.5 bg-slate-100 mb-2" />

                      <div className="space-y-3">
                        {content.education.map((edu) => (
                          <div key={edu.id} className="flex justify-between items-start text-[11px] font-medium">
                            <div>
                              <div className="font-bold text-slate-800">
                                {edu.institution}
                              </div>
                              <div className="text-[10px] text-slate-500 font-semibold">
                                {edu.degree} in {edu.fieldOfStudy}
                              </div>
                            </div>
                            <div className="text-right text-[10px] text-slate-500 shrink-0">
                              <div>{edu.startDate} – {edu.endDate}</div>
                              {edu.gpa && <div className="font-bold text-blue-600 dark:text-blue-500">GPA: {edu.gpa}</div>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }

                // PROJECTS
                if (sec === "projects" && content.projects.length > 0) {
                  return (
                    <div key={sec} className="space-y-2">
                      <h2 className={`font-black text-xs uppercase tracking-wider ${
                        template === "executive" ? "text-rose-900" :
                        template === "creative" ? "text-purple-700" :
                        template === "google" ? "text-emerald-800" :
                        template === "harvard" ? "text-[#a51c30]" :
                        template === "modern" ? "text-blue-600" : "text-slate-800"
                      }`}>
                        Personal Projects
                      </h2>
                      <div className="h-0.5 bg-slate-100 mb-2" />

                      <div className="space-y-3">
                        {content.projects.map((proj) => (
                          <div key={proj.id} className="space-y-1 text-[11px]">
                            <div className="flex justify-between items-baseline font-bold text-slate-850">
                              <span>
                                {proj.name} <span className="font-semibold text-slate-400 text-[9px]">({proj.technologies})</span>
                              </span>
                              {proj.link && (
                                <span className="text-[9px] text-blue-600 flex items-center gap-0.5 font-bold">
                                  Link <LinkIcon className="w-2.5 h-2.5" />
                                </span>
                              )}
                            </div>
                            <p className="text-slate-650 leading-relaxed font-medium">
                              {proj.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }

                // SKILLS
                if (sec === "skills" && content.skills.length > 0) {
                  return (
                    <div key={sec} className="space-y-2">
                      <h2 className={`font-black text-xs uppercase tracking-wider ${
                        template === "executive" ? "text-rose-900" :
                        template === "creative" ? "text-purple-700" :
                        template === "google" ? "text-emerald-800" :
                        template === "harvard" ? "text-[#a51c30]" :
                        template === "modern" ? "text-blue-600" : "text-slate-800"
                      }`}>
                        Skills Matrix
                      </h2>
                      <div className="h-0.5 bg-slate-100 mb-2" />

                      <div className="space-y-1.5 text-[11px]">
                        {content.skills.map((sk) => (
                          <div key={sk.id} className="flex gap-2">
                            <span className="font-bold text-slate-800 w-36 shrink-0">{sk.category}:</span>
                            <span className="text-slate-650 font-medium">{sk.skills}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }

                return null;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
