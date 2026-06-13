import { LINKS, INTERNSHIP_QUERY, type ResponseData } from "./types";
import { PORTFOLIO_STATS, PROFILE_INFO } from "@/lib/portfolioStats";

export const CODING_PROFILES = [
  {
    label: "LeetCode",
    info: PROFILE_INFO.leetcode,
    short: "LC",
    href: LINKS.leetcode,
    accent: "from-orange-400/30 via-rose-400/20 to-amber-300/30",
  },
  {
    label: "Codeforces",
    info: PROFILE_INFO.codeforces,
    short: "CF",
    href: LINKS.codeforces,
    accent: "from-sky-400/30 via-blue-400/20 to-cyan-300/30",
  },
  {
    label: "CodeChef",
    info: PROFILE_INFO.codechef,
    short: "CC",
    href: LINKS.codechef,
    accent: "from-amber-400/30 via-orange-300/20 to-yellow-200/30",
  },
  {
    label: "AtCoder",
    info: PROFILE_INFO.atcoder,
    short: "AT",
    href: LINKS.atcoder,
    accent: "from-emerald-400/30 via-teal-400/20 to-green-300/30",
  },
  {
    label: "Codolio",
    info: "Unified stats",
    short: "CO",
    href: LINKS.codolio,
    accent: "from-purple-400/30 via-indigo-400/20 to-blue-300/30",
  },
  {
    label: "GitHub",
    info: "Projects & repos",
    short: "GH",
    href: LINKS.github,
    accent: "from-slate-400/30 via-slate-300/20 to-slate-200/30",
  },
];

export const SUGGESTED_QUESTIONS = [
  { label: "What have you built?", input: "Tell me about your projects" },
  { label: "Backend stack?", input: "What is your tech stack?" },
  { label: "Coding profiles", input: "Show coding profiles" },
  { label: "Current stats?", input: "What are your latest coding stats?" },
  { label: "Open for internships?", input: INTERNSHIP_QUERY },
];

export const RESPONSES: Record<string, ResponseData[]> = {
  greeting: [
    {
      lines: [
        "Hey — I'm Priyanshu's portfolio guide.",
        "Ask me about his projects, backend stack, or DSA stats.",
      ],
    },
    {
      lines: [
        "Hi — looking for something specific?",
        "I can walk you through projects, tech stack, or competitive programming history.",
      ],
    },
    {
      lines: [
        "Welcome — Priyanshu's AI assistant here.",
        "Projects, backend tech, or coding profiles — what interests you?",
      ],
    },
    {
      lines: [
        "Hey there! 👋 I'm here to help you learn about Priyanshu's work and experience.",
        "Ready to dive into projects, tech, or competitive programming?",
      ],
    },
    {
      lines: [
        "Welcome to Priyanshu's portfolio!",
        "I can help with anything — from backend architecture to DSA stats to connecting.",
      ],
    },
  ],
  identity: [
    {
      lines: [
        "A portfolio guide for Priyanshu's site — no fluff, just the relevant details.",
      ],
    },
    {
      lines: [
        "Built to give recruiters and collaborators a quick read on Priyanshu's work and background.",
      ],
    },
    {
      lines: [
        "I'm here to help you explore Priyanshu's backend projects, competitive programming stats, and experience.",
      ],
    },
  ],
  about: [
    {
      lines: [
        "Priyanshu is a backend-focused developer at NIT Jalandhar (B.Tech CSE, 2025–2029).",
        "He builds production-grade APIs and systems while staying competitive in DSA contests.",
      ],
      actions: [
        { label: "Projects", scrollTo: "projects" },
        { label: "Skills", scrollTo: "skills" },
      ],
    },
    {
      lines: [
        "Backend developer from NIT Jalandhar focused on scalable REST/GraphQL APIs, Node.js architecture, and MongoDB optimization.",
        "Strong in competitive programming (LeetCode 1565+ · Codeforces Pupil).",
      ],
      actions: [
        { label: "Projects", scrollTo: "projects" },
        { label: "Tech Stack", scrollTo: "skills" },
      ],
    },
    {
      lines: [
        "Full-stack engineer specializing in backend systems. Currently at NIT Jalandhar (2025–2029).",
        "Known for clean API design, smart problem-solving (both in code and DSA), and building systems that scale.",
      ],
      actions: [
        { label: "See Projects", scrollTo: "projects" },
        { label: "Tech & Skills", scrollTo: "skills" },
      ],
    },
    {
      lines: [
        "Backend architect with a passion for competitive programming.",
        "3 years of academic focus on system design, API optimization, and algorithmic problem-solving. Ready for real-world impact.",
      ],
      actions: [
        { label: "Portfolio", scrollTo: "projects" },
        { label: "Achievements", scrollTo: "about" },
      ],
    },
  ],
  education: [
    {
      lines: [
        "B.Tech CSE · NIT Jalandhar · 2025–2029 · CGPA 8.3+",
        "JEE Mains 99.2 percentile · JEE Advanced qualified.",
      ],
      actions: [{ label: "Projects", scrollTo: "projects" }],
    },
    {
      lines: [
        "NIT Jalandhar — one of India's top engineering colleges.",
        "JEE Mains 99.2 percentile (top 0.8% nationally) · Currently maintaining 8.3+ CGPA in rigorous CS curriculum.",
      ],
      actions: [{ label: "Achievements", scrollTo: "about" }, { label: "Projects", scrollTo: "projects" }],
    },
    {
      lines: [
        "Studying at NIT Jalandhar with focus on algorithms, system design, and backend architecture.",
        "Strong entrance exam performance (JEE 99.2 percentile) backed by consistent academic excellence.",
      ],
      actions: [{ label: "See More", scrollTo: "about" }, { label: "Work", scrollTo: "projects" }],
    },
  ],
  projects: [
    {
      lines: [
        "Two main projects: CP Tracker (MERN + GraphQL) and Hostel Management System (Node + MongoDB).",
        "Both have real auth flows, REST/GraphQL APIs, and production-style architecture.",
      ],
      actions: [
        { label: "View Projects", scrollTo: "projects" },
        { label: "GitHub", url: LINKS.github },
      ],
    },
    {
      lines: [
        "Competitive Programming Tracker and Hostel Management System.",
        "Each features JWT auth, structured APIs, MongoDB aggregation, and deployed builds.",
      ],
      actions: [
        { label: "View Projects", scrollTo: "projects" },
        { label: "GitHub", url: LINKS.github },
      ],
    },
    {
      lines: [
        "🎯 CP Tracker: Full MERN ecosystem with GraphQL for querying contest data, SM-2 scheduling, and analytics.",
        "🏢 Hostel System: Production REST API with role-based auth, complaint management, and admin reporting.",
      ],
      actions: [
        { label: "Explore Both", scrollTo: "projects" },
        { label: "GitHub Repos", url: LINKS.github },
      ],
    },
    {
      lines: [
        "Both projects showcase real-world backend patterns: database optimization, security (JWT/RBAC), API design.",
        "Deployed, tested, and built to handle actual workflows — not just toy examples.",
      ],
      actions: [
        { label: "View All", scrollTo: "projects" },
        { label: "Code", url: LINKS.github },
      ],
    },
  ],
  tracker: [
    {
      lines: [
        "CP Tracker: MERN stack with GraphQL, SM-2 spaced repetition, and multi-platform contest sync.",
        "Includes streak tracking, MongoDB aggregation pipelines, and a problem analytics dashboard.",
      ],
      actions: [
        { label: "GitHub", url: LINKS.github },
        { label: "All Projects", scrollTo: "projects" },
      ],
    },
    {
      lines: [
        "GraphQL API + MongoDB aggregation for contest data. SM-2 algorithm drives review scheduling.",
        "Problem tagging, difficulty tracking, and per-platform stats in a single dashboard.",
      ],
      actions: [
        { label: "GitHub", url: LINKS.github },
        { label: "All Projects", scrollTo: "projects" },
      ],
    },
  ],
  hostel: [
    {
      lines: [
        "Hostel Management System: JWT auth, role-based access control, and optimized REST APIs.",
        "Handles room allocation workflows, student complaints, and admin dashboards on a Node.js backend.",
      ],
      actions: [
        { label: "Projects", scrollTo: "projects" },
        { label: "GitHub", url: LINKS.github },
      ],
    },
    {
      lines: [
        "Node.js + Express backend with MongoDB. RBAC for student, warden, and admin roles.",
        "REST APIs handle allocation logic, complaint tracking, and reporting workflows.",
      ],
      actions: [
        { label: "Projects", scrollTo: "projects" },
        { label: "GitHub", url: LINKS.github },
      ],
    },
  ],
  skills: [
    {
      lines: [
        "Backend: Node.js · Express · REST APIs · JWT · MongoDB · aggregation pipelines.",
        "Frontend: React · Tailwind CSS. DSA: Graphs · DP · Sliding Window · Greedy · Trees.",
      ],
      actions: [
        { label: "Skills", scrollTo: "skills" },
        { label: "Projects", scrollTo: "projects" },
      ],
    },
    {
      lines: [
        "Specialized in backend systems: API design, database optimization, authentication, error handling.",
        "Can architect and deploy a production API from scratch — database schema to deployment.",
      ],
      actions: [
        { label: "See Skills", scrollTo: "skills" },
        { label: "Projects", scrollTo: "projects" },
      ],
    },
    {
      lines: [
        "Deep skills in: Scalable backend APIs, database design, security (JWT/RBAC), and competitive algorithm solving.",
        "Full-stack capable but backend-focused — that's where the expertise shines.",
      ],
      actions: [
        { label: "Full List", scrollTo: "skills" },
        { label: "Experience", scrollTo: "projects" },
      ],
    },
  ],
  tech: [
    {
      lines: [
        "Core stack: React, Node.js, Express, MongoDB, REST APIs, GraphQL, Tailwind CSS.",
        "Focused on scalable backend systems, clean API design, and performance-oriented development.",
      ],
      actions: [
        { label: "Projects", scrollTo: "projects" },
        { label: "Skills", scrollTo: "skills" },
      ],
    },
    {
      lines: [
        "MERN stack with GraphQL for complex data layers. Tailwind for UI.",
        "Architecture priority: clean separation of concerns, structured error handling, and maintainable APIs.",
      ],
      actions: [
        { label: "Projects", scrollTo: "projects" },
        { label: "Skills", scrollTo: "skills" },
      ],
    },
    {
      lines: [
        "Backend-first: Node.js ecosystem (Express, JWT, MongoDB drivers). Frontend with React + Tailwind.",
        "GraphQL for flexible querying · REST for standard CRUD · Both production-tested.",
      ],
      actions: [
        { label: "See in Projects", scrollTo: "projects" },
        { label: "Full Skill Set", scrollTo: "skills" },
      ],
    },
    {
      lines: [
        "Framework choices optimized for real-world scenarios: Express for simplicity, MongoDB for flexibility.",
        "Every layer has security, validation, and error handling — not shortcuts.",
      ],
      actions: [
        { label: "Projects", scrollTo: "projects" },
        { label: "Detailed Skills", scrollTo: "skills" },
      ],
    },
  ],
  backend: [
    {
      lines: [
        "Node.js + Express for APIs. MongoDB with aggregation pipelines for data-heavy features.",
        "JWT-based auth, role-based access, rate limiting, and structured error handling.",
      ],
      actions: [
        { label: "Projects", scrollTo: "projects" },
        { label: "Skills", scrollTo: "skills" },
      ],
    },
  ],
  dsa: [
    {
      lines: [
        `\u200b${PORTFOLIO_STATS.leetcode.problemsSolved}+ LeetCode problems solved · Rating ${PORTFOLIO_STATS.leetcode.rating}+ · Top 30% globally.`,
        `Active on Codeforces (${PORTFOLIO_STATS.codeforces.tier}, ${PORTFOLIO_STATS.codeforces.rating}+) and CodeChef (${PORTFOLIO_STATS.codechef.stars}, ${PORTFOLIO_STATS.codechef.rating}+). Consistent contest participation.`,
      ],
      actions: [
        { label: "LeetCode", url: LINKS.leetcode },
        { label: "Codeforces", url: LINKS.codeforces },
      ],
    },
    {
      lines: [
        "Strong across graphs, DP, greedy, and sliding window patterns.",
        `LeetCode Top 30% · Codeforces ${PORTFOLIO_STATS.codeforces.tier} (${PORTFOLIO_STATS.codeforces.rating}+) · CodeChef ${PORTFOLIO_STATS.codechef.stars} (${PORTFOLIO_STATS.codechef.rating}+)`,
      ],
      actions: [
        { label: "LeetCode", url: LINKS.leetcode },
        { label: "Show All Profiles", scrollTo: "about" },
      ],
    },
    {
      lines: [
        "Competitive programming is a core strength. Problem-solving happens in code and on contest platforms daily.",
        "Master of graph algorithms, dynamic programming, and optimization techniques.",
      ],
      actions: [
        { label: "See Stats", scrollTo: "about" },
        { label: "All Platforms", scrollTo: "about" },
      ],
    },
    {
      lines: [
        `\u200b${PORTFOLIO_STATS.leetcode.problemsSolved}+ problems solved across platforms — interview patterns, system design concepts, and optimization tricks all part of the arsenal.`,
        `Consistent top 30% performance on LeetCode, Codeforces ${PORTFOLIO_STATS.codeforces.rating}+, and CodeChef ${PORTFOLIO_STATS.codechef.rating}+.`,
      ],
      actions: [
        { label: "Coding Profiles", scrollTo: "about" },
        { label: "All Stats", scrollTo: "about" },
      ],
    },
  ],
  stats: [
    {
      lines: [
        `Latest portfolio snapshot: ${PORTFOLIO_STATS.leetcode.problemsSolved}+ total problems solved, LeetCode rating ${PORTFOLIO_STATS.leetcode.rating}+, Codeforces ${PORTFOLIO_STATS.codeforces.tier} ${PORTFOLIO_STATS.codeforces.rating}+, and CodeChef ${PORTFOLIO_STATS.codechef.stars} ${PORTFOLIO_STATS.codechef.rating}+.`,
        "These are the current counts from the portfolio — total solved problems and live contest ratings.",
      ],
      actions: [
        { label: "Coding Profiles", scrollTo: "about" },
        { label: "View Resume", url: LINKS.resume },
      ],
    },
    {
      lines: [
        `Updated totals: ${PORTFOLIO_STATS.leetcode.problemsSolved}+ problems solved across platforms, current Codeforces rating ${PORTFOLIO_STATS.codeforces.rating}+, and CodeChef rating ${PORTFOLIO_STATS.codechef.rating}+.`,
        "I keep these stats aligned with the live portfolio data for the most accurate summary.",
      ],
      actions: [
        { label: "See All Stats", scrollTo: "about" },
        { label: "Coding Profiles", scrollTo: "about" },
      ],
    },
  ],
  profiles: [
    {
      lines: [
        `Active profiles across LeetCode, Codeforces, CodeChef, AtCoder, GFG, and GitHub.`,
        `Latest ratings: LeetCode ${PORTFOLIO_STATS.leetcode.rating}+, Codeforces ${PORTFOLIO_STATS.codeforces.rating}+, CodeChef ${PORTFOLIO_STATS.codechef.rating}+.`,
      ],
      showProfiles: true,
    },
  ],
  leetcode: [
    {
      lines: [
        `LeetCode: ${PORTFOLIO_STATS.leetcode.problemsSolved}+ solved · Rating ${PORTFOLIO_STATS.leetcode.rating}+ · Strong on graphs, DP, and sliding window.`,
        `Contest Rating ${PORTFOLIO_STATS.leetcode.rating}+ · Top 30% · Strong on graphs, DP, and sliding window.`,
      ],
      actions: [{ label: "LeetCode", url: LINKS.leetcode }],
    },
    {
      lines: [
        `LeetCode: ${PORTFOLIO_STATS.leetcode.problemsSolved}+ problems solved with consistent medium/hard focus.`,
        `Rating ${PORTFOLIO_STATS.leetcode.rating}+ · Top 30% globally. Main platform for interview-pattern practice.`,
      ],
      actions: [{ label: "LeetCode", url: LINKS.leetcode }],
    },
  ],
  codeforces: [
    {
      lines: [
        `Codeforces: Rating ${PORTFOLIO_STATS.codeforces.rating}+ · ${PORTFOLIO_STATS.codeforces.tier} · active contest problem solving.`,
        "Regular contests — focused on implementation speed and constructive problems.",
      ],
      actions: [{ label: "Codeforces", url: LINKS.codeforces }],
    },
    {
      lines: [
        `Pupil rank on Codeforces with ${PORTFOLIO_STATS.codeforces.rating}+ rating. Active in Div. 2 and Div. 3 rounds.`,
      ],
      actions: [{ label: "Codeforces", url: LINKS.codeforces }],
    },
  ],
  codechef: [
    {
      lines: [
        `CodeChef: ${PORTFOLIO_STATS.codechef.stars} · Rating ${PORTFOLIO_STATS.codechef.rating}+. Used alongside LeetCode for DSA breadth and contest prep.`,
      ],
      actions: [{ label: "CodeChef", url: LINKS.codechef }],
    },
  ],
  atcoder: [
    {
      lines: [
        `AtCoder: Rating ${PORTFOLIO_STATS.atcoder.rating} · building contest experience through regular participation.`,
      ],
      actions: [{ label: "AtCoder", url: LINKS.atcoder }],
    },
  ],
  codolio: [
    {
      lines: [
        "Codolio consolidates activity across all CP platforms — one link for the full picture.",
      ],
      actions: [{ label: "Codolio", url: LINKS.codolio }],
    },
  ],
  github: [
    {
      lines: [
        "GitHub hosts production-ready repos — structured APIs, deployment configs, and documentation.",
      ],
      actions: [
        { label: "GitHub", url: LINKS.github },
        { label: "Projects", scrollTo: "projects" },
      ],
    },
    {
      lines: [
        "Repos reflect real project architecture: clean folder structure, env handling, and README coverage.",
      ],
      actions: [
        { label: "GitHub", url: LINKS.github },
        { label: "Projects", scrollTo: "projects" },
      ],
    },
  ],
  linkedin: [
    {
      lines: [
        "LinkedIn profile covers his education, projects, and professional background.",
        "Best for formal outreach or to connect directly.",
      ],
      actions: [
        { label: "Contact", scrollTo: "contact" },
        { label: "Email", url: `mailto:${LINKS.email}` },
      ],
    },
  ],
  internship: [
    {
      lines: [
        "Yes — open to backend and software engineering internships.",
        "Available for recruiter conversations and project-based roles.",
      ],
      actions: [
        { label: "Contact", scrollTo: "contact" },
        { label: "Email", url: `mailto:${LINKS.email}` },
        { label: "Resume", url: LINKS.resume },
      ],
    },
    {
      lines: [
        "Actively seeking internship opportunities in backend/full-stack development.",
        "Can start immediately or plan for summer/winter breaks. Ready to contribute to real projects.",
      ],
      actions: [
        { label: "Get in Touch", scrollTo: "contact" },
        { label: "Email Me", url: `mailto:${LINKS.email}` },
        { label: "Download Resume", url: LINKS.resume },
      ],
    },
    {
      lines: [
        "Open for conversations about backend engineering roles — internships, freelance, or full-time.",
        "Bring production-ready skills: API design, database optimization, security best practices.",
      ],
      actions: [
        { label: "Contact Now", scrollTo: "contact" },
        { label: "Send Email", url: `mailto:${LINKS.email}` },
        { label: "My Resume", url: LINKS.resume },
      ],
    },
  ],
  resume: [
    {
      lines: [
        "Resume is available — covers backend projects, DSA background, and NIT Jalandhar academics.",
      ],
      actions: [
        { label: "Resume", url: LINKS.resume },
        { label: "Email", url: `mailto:${LINKS.email}` },
      ],
    },
    {
      lines: [
        "Download the resume directly — complete overview of projects, skills, experience, and achievements.",
        "Optimized for recruiters and technical teams.",
      ],
      actions: [
        { label: "Download Now", url: LINKS.resume },
        { label: "Contact", scrollTo: "contact" },
      ],
    },
  ],
  contact: [
    {
      lines: [
        `Email: ${LINKS.email}`,
        "Responds within 24 hours. Resume available on request.",
      ],
      actions: [
        { label: "Email", url: `mailto:${LINKS.email}` },
        { label: "Resume", url: LINKS.resume },
      ],
    },
    {
      lines: [
        "Best way to reach: Direct email.",
        `${LINKS.email} — Quick response guaranteed. Open to opportunities, questions, or conversations.`,
      ],
      actions: [
        { label: "Send Email", url: `mailto:${LINKS.email}` },
        { label: "Get Resume", url: LINKS.resume },
      ],
    },
    {
      lines: [
        "Happy to chat about backend engineering, problem-solving, or opportunities.",
        `Drop an email at ${LINKS.email} and I'll respond promptly.`,
      ],
      actions: [
        { label: "Email Now", url: `mailto:${LINKS.email}` },
        { label: "LinkedIn", url: LINKS.linkedin },
      ],
    },
  ],
  achievements: [
    {
      lines: [
        "JEE Mains 99.2 percentile · JEE Advanced qualified — top 0.8% nationally.",
        "Top 5 at FORGE Buildathon. LeetCode top 30% globally.",
      ],
      actions: [{ label: "About", scrollTo: "about" }],
    },
    {
      lines: [
        "National-level exam excellence: JEE Mains 99.2 percentile (among top 0.8% of ~1.2M test-takers).",
        "FORGE Buildathon recognition + consistent competitive programming top-tier performance.",
      ],
      actions: [
        { label: "See Profile", scrollTo: "about" },
        { label: "More", scrollTo: "about" },
      ],
    },
  ],
};

export const FALLBACKS: ResponseData[] = [
  {
    lines: [
      "I can cover projects, backend stack, DSA stats, coding profiles, or internship availability.",
    ],
    actions: [
      { label: "Projects", scrollTo: "projects" },
      { label: "Skills", scrollTo: "skills" },
      { label: "Contact", scrollTo: "contact" },
    ],
  },
  {
    lines: ["Try asking about his tech stack, competitive programming, or how to reach him."],
    actions: [
      { label: "Projects", scrollTo: "projects" },
      { label: "Coding Profiles", scrollTo: "about" },
    ],
  },
  {
    lines: [
      "Not sure about that one. I cover his projects, backend experience, DSA contests, and how to connect.",
      "What interests you most?",
    ],
    actions: [
      { label: "Projects", scrollTo: "projects" },
      { label: "DSA & Contests", scrollTo: "about" },
      { label: "Internship", scrollTo: "about" },
    ],
  },
  {
    lines: [
      "Hmm — that's outside my scope, but I'm great with backend tech, competitive programming, and project details.",
    ],
    actions: [
      { label: "View Projects", scrollTo: "projects" },
      { label: "Tech Stack", scrollTo: "skills" },
      { label: "About", scrollTo: "about" },
    ],
  },
  {
    lines: [
      "I focus on Priyanshu's technical background. Feel free to ask about his work, experience, or how to collaborate.",
    ],
    actions: [
      { label: "Backend Experience", scrollTo: "skills" },
      { label: "Let's Connect", scrollTo: "contact" },
      { label: "View Resume", url: LINKS.resume },
    ],
  },
];

export const CONTEXT_QUICK_REPLIES: Record<string, string[]> = {
  greeting: ["What are your main projects?", "Tell me about your tech stack", "Are you open for internships?"],
  identity: ["What have you built?", "What technologies do you specialize in?", "How can I reach you?"],
  about: ["Show me your projects", "What's your tech stack?", "Tell me about your DSA experience"],
  education: ["What projects came from your studies?", "Tell me about your achievements", "What's your focus area?"],
  projects: [
    "Dive deeper into CP Tracker",
    "Tell me about the Hostel System",
    "What technologies did you use?",
  ],
  tracker: ["How does the SM-2 algorithm work?", "What other projects have you done?", "Show your other work"],
  hostel: ["What backend tech powers this?", "Tell me about your other project", "Show all work"],
  skills: ["See these in action through projects", "What about competitive programming?", "Tell me more"],
  tech: ["Which projects use these?", "What's most important to you?", "Any specialty areas?"],
  backend: ["Show me your projects", "What about the frontend?", "Database design approach?"],
  dsa: ["See your coding profiles", "How often do you practice?", "What's your approach?"],
  profiles: ["Which is your main platform?", "What are your goals?", "See detailed stats"],
  leetcode: ["How do you prepare?", "Check other platforms", "See all stats"],
  codeforces: ["How does this compare to LeetCode?", "Your other platforms", "Next goals?"],
  codechef: ["Compare with other platforms", "What's your strategy?", "See all profiles"],
  atcoder: ["How often do you compete here?", "Your other platforms", "See all stats"],
  codolio: ["View individual platform stats", "See detailed breakdown", "See all profiles"],
  github: ["Which project is most impressive?", "See detailed repos", "View live demos"],
  linkedin: ["Connect on other platforms", "See my work", "How to reach me?"],
  internship: ["See my portfolio", "What's your tech stack?", "Get in touch?"],
  resume: ["Want to reach out?", "See my projects", "What's your tech stack?"],
  contact: ["Which project interests you most?", "Tell me about your work", "Any questions?"],
  achievements: ["See what I've built", "Dive into the details", "What's next?"],
  stats: ["Show coding totals", "Compare platform ratings", "See all current stats"],
};

export const DEFAULT_QUICK_REPLIES = [
  "What have you built?",
  "What's your tech stack?",
  "How can I reach you?",
];
