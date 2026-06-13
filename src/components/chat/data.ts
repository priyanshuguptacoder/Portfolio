import { LINKS, INTERNSHIP_QUERY, type ResponseData } from "./types";

export const CODING_PROFILES = [
  {
    label: "LeetCode",
    info: "360+ solved · Rating 1565+",
    short: "LC",
    href: LINKS.leetcode,
    accent: "from-orange-400/30 via-rose-400/20 to-amber-300/30",
  },
  {
    label: "Codeforces",
    info: "Pupil · Rating 1214",
    short: "CF",
    href: LINKS.codeforces,
    accent: "from-sky-400/30 via-blue-400/20 to-cyan-300/30",
  },
  {
    label: "CodeChef",
    info: "2★ · Rating 1506+",
    short: "CC",
    href: LINKS.codechef,
    accent: "from-amber-400/30 via-orange-300/20 to-yellow-200/30",
  },
  {
    label: "AtCoder",
    info: "Rating 27",
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
  ],
  education: [
    {
      lines: [
        "B.Tech CSE · NIT Jalandhar · 2025–2029 · CGPA 8.3+",
        "JEE Mains 99.2 percentile · JEE Advanced qualified.",
      ],
      actions: [{ label: "Projects", scrollTo: "projects" }],
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
        "360+ LeetCode problems · Rating 1565+ · Top 30% globally.",
        "Active on Codeforces (Pupil, 1214) and CodeChef (2★, 1506+). Consistent contest participation.",
      ],
      actions: [
        { label: "LeetCode", url: LINKS.leetcode },
        { label: "Codeforces", url: LINKS.codeforces },
      ],
    },
    {
      lines: [
        "Strong across graphs, DP, greedy, and sliding window patterns.",
        "LeetCode Top 30% · Codeforces Pupil (1214) · CodeChef 2★ (1506+).",
      ],
      actions: [
        { label: "LeetCode", url: LINKS.leetcode },
        { label: "Show All Profiles", scrollTo: "about" },
      ],
    },
  ],
  profiles: [
    {
      lines: ["Active profiles across LeetCode, Codeforces, CodeChef, AtCoder, GFG, and GitHub."],
      showProfiles: true,
    },
  ],
  leetcode: [
    {
      lines: [
        "LeetCode: 360+ solved · 144 Easy · 196 Medium · 20+ Hard.",
        "Contest Rating 1565+ · Top 30% · Strong on graphs, DP, and sliding window.",
      ],
      actions: [{ label: "LeetCode", url: LINKS.leetcode }],
    },
    {
      lines: [
        "360+ problems solved with consistent medium/hard focus.",
        "Rating 1565+ · Top 30% globally. Main platform for interview-pattern practice.",
      ],
      actions: [{ label: "LeetCode", url: LINKS.leetcode }],
    },
  ],
  codeforces: [
    {
      lines: [
        "Codeforces: Rating 1214 · Pupil · 110+ problems solved.",
        "Regular contests — focused on implementation speed and constructive problems.",
      ],
      actions: [{ label: "Codeforces", url: LINKS.codeforces }],
    },
    {
      lines: [
        "Pupil rank on Codeforces with 110+ problems. Active in Div. 2 and Div. 3 rounds.",
      ],
      actions: [{ label: "Codeforces", url: LINKS.codeforces }],
    },
  ],
  codechef: [
    {
      lines: [
        "CodeChef: 2★ · Rating 1506+. Used alongside LeetCode for DSA breadth and contest prep.",
      ],
      actions: [{ label: "CodeChef", url: LINKS.codechef }],
    },
  ],
  atcoder: [
    {
      lines: [
        "AtCoder: Rating 27 · building contest experience through regular participation.",
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
  ],
  achievements: [
    {
      lines: [
        "JEE Mains 99.2 percentile · JEE Advanced qualified — top 0.8% nationally.",
        "Top 5 at FORGE Buildathon. LeetCode top 30% globally.",
      ],
      actions: [{ label: "About", scrollTo: "about" }],
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
  greeting: ["Tell me about your projects", "What is your tech stack?", "Open for internships?"],
  identity: ["Tell me about your projects", "What backend technologies do you use?", "Show coding profiles"],
  about: ["Tell me about your projects", "Tell me about DSA experience", "Show coding profiles"],
  education: ["Tell me about your projects", "Show coding profiles", "What is your tech stack?"],
  projects: [
    "Tell me about Competitive Programming Tracker",
    "Explain the Hostel Management System",
    "What is your tech stack?",
  ],
  tracker: ["What technologies power this?", "Tell me about Hostel Management System", "Show all projects"],
  hostel: ["What backend technologies do you use?", "Tell me about CP Tracker", "Show coding profiles"],
  skills: ["Tell me about your projects", "Show coding profiles", "What backend technologies?"],
  tech: ["Show me your projects", "Tell me about DSA experience", "How do you use these?"],
  backend: ["Show your projects", "What is your tech stack?", "Coding profiles?"],
  dsa: ["Show coding profiles", "What is your tech stack?", "Tell me about your backend work"],
  profiles: ["Tell me about your projects", "What is your tech stack?", INTERNSHIP_QUERY],
  leetcode: ["Show CodeForces rating", "Tell me about your projects", "What is your tech stack?"],
  codeforces: ["Show LeetCode stats", "How does this compare to your other platforms?", "Tell me about your projects"],
  codechef: ["Show coding profiles", "Tell me about DSA experience", "Compare your ratings"],
  atcoder: ["Show coding profiles", "How do you prepare for contests?", "Tell me about your projects"],
  codolio: ["See individual platform stats", "Tell me about your projects", "What is your tech stack?"],
  github: ["Tell me about your projects", "What is your tech stack?", "Show coding profiles"],
  linkedin: ["Tell me about your projects", "Open for internships?", "How to reach you?"],
  internship: ["Tell me about your projects", "What is your tech stack?", "How to reach you?"],
  resume: ["Tell me about your projects", "What is your tech stack?", "How to reach you?"],
  contact: ["Tell me about your projects", "Show coding profiles", "What is your tech stack?"],
  achievements: ["Tell me about your projects", "Show your DSA stats", "What is your tech stack?"],
};

export const DEFAULT_QUICK_REPLIES = [
  "Tell me about your projects",
  "What is your tech stack?",
  "Show coding profiles",
];
