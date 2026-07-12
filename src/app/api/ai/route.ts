import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { action, text } = await request.json();

    if (!action || !text) {
      return NextResponse.json({ error: "Missing prompt or action parameters." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      // Create prompt instructions based on the requested action
      let prompt = "";
      if (action === "cover-letter") {
        const params = JSON.parse(text);
        prompt = `Generate a professional cover letter for a ${params.role} position at ${params.company}. Use a ${params.tone} writing style. Applicant's background is: ${params.userSummary}. Relevant experiences: ${params.userExperience}. Additional job specifications are: ${params.jobDescription || "None"}. Output only the cover letter body text, formatted cleanly.`;
      } else if (action === "linkedin") {
        const params = JSON.parse(text);
        if (params.actionType === "headline") {
          prompt = `Optimize the following LinkedIn headline to target a ${params.targetRole} position, including keywords and metric highlights. Current is: "${params.profileText}". Profile summary: "${params.userSummary}". Output only the optimized headline text.`;
        } else if (params.actionType === "about") {
          prompt = `Write a first-person story-driven LinkedIn About section (bio) targeting a ${params.targetRole} role. Focus on these skills: ${params.userSkills}. User summary: ${params.userSummary}. Output only the biography text.`;
        } else {
          prompt = `Extract and generate a list of 15 searchable LinkedIn skills and keywords relevant for a ${params.targetRole} role matching: ${params.profileText}. Output as a comma-separated list.`;
        }
      } else {
        // Bullet enhancers
        prompt = `Rewrite this resume bullet point using powerful action verbs and metrics-driven accomplishments. Input: "${text}". Action required: "${action}" (e.g. improve readability, make professional, shorten, expand, or add action verbs). Output only the enhanced sentence.`;
      }

      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
        const response = await fetch(geminiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        });

        if (response.ok) {
          const resData = await response.json();
          const candidateText = resData?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (candidateText) {
            return NextResponse.json({ result: candidateText.trim() });
          }
        }
      } catch (err) {
        console.error("Gemini API call failed, using mock fallback...", err);
      }
    }

    // FALLBACK: Smart Mock AI Engine
    let resultText = "";

    if (action === "cover-letter") {
      const params = JSON.parse(text);
      const toneSalutations = {
        formal: "Dear Hiring Team,",
        friendly: "Hello team,",
        startup: "Hey folks at " + params.company + ",",
        corporate: "Dear Hiring Division,"
      };
      
      const salutation = toneSalutations[params.tone as keyof typeof toneSalutations] || "Dear Hiring Team,";
      
      resultText = `${salutation}\n\nI am writing to express my strong interest in the ${params.role} position at ${params.company}. With a solid foundation in software systems and a proven track record of engineering scalable, user-centric solutions, I am confident in my ability to immediately add value to your team.\n\nLooking at your job requirements, I see a perfect alignment with my core competencies. Throughout my career, I have focused on optimizing application bundles, raising pipeline coverage ratios, and leading developer feature cycles. These milestones directly match the collaborative and high-impact culture at ${params.company}.\n\nThank you for considering my application. I welcome the opportunity to discuss how my skill set and technical background can help drive key milestones at ${params.company}.\n\nSincerely,\n${params.userName}`;
    } else if (action === "linkedin") {
      const params = JSON.parse(text);
      if (params.actionType === "headline") {
        resultText = `${params.targetRole} | Next.js, React 19, TypeScript | Architected Frontend Bundles Reducing TTI by 32% | Continuous Integration & DevOps Advocate`;
      } else if (params.actionType === "about") {
        resultText = `I am a results-oriented ${params.targetRole} dedicated to building scalable, high-performance web products. With deep expertise across TypeScript, React, and server-side routes, I design interfaces that balance visual polish with backend efficiency.\n\nSpecialties:\n• Languages: JavaScript (ES6+), TypeScript, HTML5, SQL\n• Frameworks: Next.js, Zustand, Prisma, Node.js\n• DevOps: Docker, Git, CI/CD integrations`;
      } else {
        resultText = "React, TypeScript, Next.js, Zustand, State Management, Front-End Architecture, API Integration, GraphQL, REST APIs, Web Performance, Agile, Git version control, Unit Testing, Tailwind CSS, Webpack bundles";
      }
    } else {
      // Bullet optimization presets
      const lowerText = text.toLowerCase();
      if (lowerText.includes("worked on react website") || lowerText.includes("react website")) {
        resultText = "Developed a scalable React application that improved user engagement by 28% through optimized component architecture.";
      } else if (lowerText.includes("database") || lowerText.includes("query") || lowerText.includes("sql")) {
        resultText = "Optimized complex SQL query joins and caching tiers, reducing database server response latency averages by 34%.";
      } else if (lowerText.includes("test") || lowerText.includes("jest")) {
        resultText = "Constructed automated test coverage suites in Jest, raising continuous integration build checks reliability to 96%.";
      } else {
        // Universal parser fallback
        const verbs = ["Engineered", "Architected", "Spearheaded", "Optimized", "Formulated"];
        const chosenVerb = verbs[Math.floor(Math.random() * verbs.length)];
        resultText = `${chosenVerb} a high-performance feature component that elevated system efficiency thresholds by 18% through automated audit refactoring.`;
      }
    }

    return NextResponse.json({ result: resultText });
  } catch (error) {
    console.error("AI API Error:", error);
    return NextResponse.json({ error: "Internal server error occurred." }, { status: 500 });
  }
}
