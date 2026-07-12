import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://resumeforge.ai";
  
  const publicRoutes = [
    "",
    "/dashboard",
    "/dashboard/resume-builder",
    "/dashboard/ats-checker",
    "/dashboard/job-optimizer",
    "/dashboard/cover-letter",
    "/dashboard/portfolio",
    "/dashboard/job-tracker",
    "/dashboard/skills-analyzer",
    "/dashboard/interview-prep",
    "/dashboard/linkedin-optimizer",
    "/dashboard/settings",
  ];

  return publicRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
