/**
 * Extracts initials from a full name (up to 2 letters, capitalized).
 * Falls back to "AR" if the name is empty or invalid.
 */
export function getInitials(fullName: string | null | undefined): string {
  if (!fullName || !fullName.trim()) return "AR";
  
  const parts = fullName.trim().split(/\s+/);
  const initials = parts
    .map((p) => p[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
    
  return initials || "AR";
}

/**
 * Extracts the first name from a full name.
 * Falls back to "Alex" if the name is empty.
 */
export function getFirstName(fullName: string | null | undefined): string {
  if (!fullName || !fullName.trim()) return "Alex";
  
  const firstName = fullName.trim().split(/\s+/)[0];
  return firstName || "Alex";
}

/**
 * Calculates ATS Compliance scores based on resume formatting and matches.
 */
export interface ATSMetrics {
  score: number;
  formatCheck: boolean;
  sectionsPresent: string[];
}

export function calculateATSScore(resumeContent: {
  personalInfo: { fullName: string };
  experience: unknown[];
  education: unknown[];
  skills: unknown[];
}): ATSMetrics {
  let score = 50; // base score
  const sections: string[] = [];

  if (resumeContent.personalInfo.fullName) score += 10;
  
  if (resumeContent.experience && resumeContent.experience.length > 0) {
    score += 15;
    sections.push("Experience");
  }
  
  if (resumeContent.education && resumeContent.education.length > 0) {
    score += 15;
    sections.push("Education");
  }
  
  if (resumeContent.skills && resumeContent.skills.length > 0) {
    score += 10;
    sections.push("Skills");
  }
  
  // Cap at 100
  score = Math.min(100, score);
  
  return {
    score,
    formatCheck: sections.length >= 3,
    sectionsPresent: sections
  };
}
