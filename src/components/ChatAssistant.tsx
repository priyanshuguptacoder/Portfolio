import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type RefObject,
  type TouchEvent,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, ExternalLink, MessageCircle, Send, X } from "lucide-react";

// ── Profile ───────────────────────────────────────────────────────────────────
const PROFILE = {
  name: "Priyanshu Gupta",
  title: "Backend Engineer · Competitive Programmer",
  email: "priyanshuguptanitian9696@gmail.com",
};

// ── Links ─────────────────────────────────────────────────────────────────────
const LINKS = {
  email: "priyanshuguptanitian9696@gmail.com",
  resume: "/resume.pdf",
  leetcode: "https://leetcode.com/u/invisiblemanfromheart/",
  codeforces: "https://codeforces.com/profile/priyanshuguptacoder",
  codechef: "https://www.codechef.com/users/priyanshu9696",
  atcoder: "https://atcoder.jp/users/TheAlgoEdge",
  codolio: "https://codolio.com/profile/priyanshuguptacoder",
  gfg: "https://www.geeksforgeeks.org/profile/thealgoedge",
  github: "https://github.com/priyanshuguptacoder",
  // TODO: replace with real LinkedIn URL when available
  linkedin: "" as string,
};

// ── Constants ─────────────────────────────────────────────────────────────────
const INTERNSHIP_QUERY = "Are you open for internships?";
const SWIPE_DOWN_THRESHOLD = 80;
const SWIPE_HORIZONTAL_TOLERANCE = 40;
const MAX_TYPING_DELAY = 800;
const BASE_TYPING_DELAY = 240;
const TYPING_DELAY_PER_CHAR = 10;

// ── Coding Profiles ────────────────────────────────────────────────────────────
const CODING_PROFILES = [
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
    label: "GeeksForGeeks",
    info: "DSA & articles",
    short: "GFG",
    href: LINKS.gfg,
    accent: "from-green-500/30 via-lime-400/20 to-emerald-300/30",
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

// ── Suggested Questions ────────────────────────────────────────────────────────
const SUGGESTED_QUESTIONS = [
  { label: "What have you built?", input: "Tell me about your projects" },
  { label: "Backend stack?", input: "What is your tech stack?" },
  { label: "Coding profiles", input: "Show coding profiles" },
  { label: "Open for internships?", input: INTERNSHIP_QUERY },
];

// ── Types ─────────────────────────────────────────────────────────────────────
type Action = { label: string; url?: string; scrollTo?: string };
type ResponseData = { lines: string[]; actions?: Action[]; showProfiles?: boolean };
type MatchedResponse = ResponseData & { intent: string };
type Message = {
  id: number;
  role: "user" | "bot";
  content: string[];
  actions?: Action[];
  quickReplies?: string[];
  showProfiles?: boolean;
  showReplies?: boolean;
  variant?: "welcome";
  timestamp: string;
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const formatTimestamp = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

function normalize(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ").trim();
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function handleScroll(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const isPlaceholderHref = (href?: string) => !href || href === "#";

const handlePlaceholderClick = (e: MouseEvent<HTMLAnchorElement>, href?: string) => {
  if (isPlaceholderHref(href)) e.preventDefault();
};

// ── Response Bank ─────────────────────────────────────────────────────────────
const RESPONSES: Record<string, ResponseData[]> = {
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
  gfg: [
    {
      lines: [
        "GeeksForGeeks profile covers DSA problem-solving and written explanations.",
        "Used for concept reinforcement and contributing to the platform's article base.",
      ],
      actions: [{ label: "GeeksForGeeks", url: LINKS.gfg }],
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

const FALLBACKS: ResponseData[] = [
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
];

const CONTEXT_QUICK_REPLIES: Record<string, string[]> = {
  greeting: ["Tell me about your projects", "What is your tech stack?", "Show coding profiles"],
  identity: ["Tell me about your projects", "What backend technologies do you use?", "Show coding profiles"],
  about: ["Tell me about your projects", "Tell me about DSA experience", "Show coding profiles"],
  education: ["Tell me about your projects", "Show coding profiles", "What is your tech stack?"],
  projects: [
    "Tell me about Competitive Programming Tracker",
    "Tell me about Hostel Management System",
    "What is your tech stack?",
  ],
  tracker: ["What is your tech stack?", "Tell me about Hostel Management System", "Show coding profiles"],
  hostel: ["What backend technologies do you use?", "Tell me about Competitive Programming Tracker", "Show coding profiles"],
  skills: ["Tell me about your projects", "Show coding profiles", "What backend technologies do you use?"],
  tech: ["Tell me about your projects", "Tell me about DSA experience", "Show coding profiles"],
  backend: ["Tell me about your projects", "What is your tech stack?", "Show coding profiles"],
  dsa: ["Show coding profiles", "Tell me about your projects", "What is your tech stack?"],
  profiles: ["Tell me about your projects", "What is your tech stack?", INTERNSHIP_QUERY],
  leetcode: ["Tell me about Codeforces", "Tell me about your projects", "Show coding profiles"],
  codeforces: ["Tell me about LeetCode", "Show coding profiles", "Tell me about your projects"],
  codechef: ["Show coding profiles", "Tell me about DSA experience", "Tell me about your projects"],
  atcoder: ["Show coding profiles", "Tell me about DSA experience", "Tell me about your projects"],
  gfg: ["Show coding profiles", "Tell me about your projects", "Tell me about DSA experience"],
  codolio: ["Show coding profiles", "Tell me about your projects", "What is your tech stack?"],
  github: ["Tell me about your projects", "What is your tech stack?", "Show coding profiles"],
  linkedin: ["Tell me about your projects", "Show coding profiles", INTERNSHIP_QUERY],
  internship: ["Tell me about your projects", "What is your tech stack?", "Show coding profiles"],
  resume: ["Tell me about your projects", "What is your tech stack?", INTERNSHIP_QUERY],
  contact: ["Tell me about your projects", "Show coding profiles", "What is your tech stack?"],
  achievements: ["Tell me about your projects", "Show coding profiles", "What is your tech stack?"],
};

const DEFAULT_QUICK_REPLIES = [
  "Tell me about your projects",
  "What is your tech stack?",
  "Show coding profiles",
];

// ── Intent Matcher ────────────────────────────────────────────────────────────
function matchResponse(
  input: string,
  intentStack: string[],
  fallbackCountRef: { current: number }
): MatchedResponse {
  const q = normalize(input);
  const has = (...tokens: string[]) => tokens.some((t) => q.includes(t));

  const setIntent = (intent: string): MatchedResponse => {
    intentStack.push(intent);
    if (intentStack.length > 6) intentStack.shift();
    fallbackCountRef.current = 0;
    return { ...pick(RESPONSES[intent]), intent };
  };

  // Context continuation
  if (has("more", "details", "detail", "explain", "elaborate", "go on", "expand", "tell more")) {
    const ctx = intentStack[intentStack.length - 1];
    if (ctx && RESPONSES[ctx]) return { ...pick(RESPONSES[ctx]), intent: ctx };
  }

  // Greetings
  if (has("hello", "hey", "hi", "howdy", "sup", "yo", "hii") || q === "hi" || q === "hey")
    return setIntent("greeting");

  // Identity
  if (has("who are you", "what are you", "your name", "introduce yourself", "ur name"))
    return setIntent("identity");

  // About / person
  if (has("who is priyanshu", "about him", "about priyanshu", "who is he", "what does he do", "tell me about yourself"))
    return setIntent("about");

  // Education
  if (has("education", "college", "nit", "jalandhar", "cgpa", "jee", "degree", "btech", "university"))
    return setIntent("education");

  // Specific projects
  if (has("tracker", "cp tracker", "competitive programming tracker", "graphql", "sm2", "sm-2", "spaced repetition"))
    return setIntent("tracker");
  if (has("hostel", "hostel management", "hostel system"))
    return setIntent("hostel");

  // Projects (general)
  if (has("project", "projects", "work", "built", "builds", "portfolio", "what have you"))
    return setIntent("projects");

  // Backend specifically
  if (has("backend", "node", "express", "mongo", "rest api", "api design", "server", "database"))
    return setIntent("backend");

  // Tech stack
  if (has("tech stack", "technology", "technologies", "stack", "framework", "tools", "what tech", "tech used"))
    return setIntent("tech");

  // Skills general
  if (has("skill", "skills", "what can you do", "what do you know"))
    return setIntent("skills");

  // DSA / competitive programming
  if (has("dsa", "data structure", "algorithm", "competitive", "contest", "problem solv", "cp"))
    return setIntent("dsa");

  // Individual platforms
  if (has("leetcode", "leet code", "lc stats", "lc rating"))
    return setIntent("leetcode");
  if (has("codeforces", "code forces", "cf rating", "cf rank"))
    return setIntent("codeforces");
  if (has("codechef", "code chef"))
    return setIntent("codechef");
  if (has("atcoder", "at coder", "at rating"))
    return setIntent("atcoder");
  if (has("geeksforgeeks", "geeks for geeks", "gfg"))
    return setIntent("gfg");
  if (has("codolio"))
    return setIntent("codolio");

  // Profiles (general)
  if (has("coding profile", "profiles", "profile", "show profile", "all profiles", "platform"))
    return setIntent("profiles");

  // GitHub / LinkedIn
  if (has("github", "repo", "repository", "repos", "code"))
    return setIntent("github");
  if (has("linkedin", "linked in", "professional"))
    return setIntent("linkedin");

  // Internship / job
  if (has("hire", "hiring", "intern", "internship", "job", "role", "available", "open to", "opportunity", "work with", "recruit"))
    return setIntent("internship");

  // Resume
  if (has("resume", "cv", "download resume", "curriculum"))
    return setIntent("resume");

  // Contact
  if (has("contact", "email", "reach", "connect", "mail", "get in touch"))
    return setIntent("contact");

  // Achievements
  if (has("achievement", "percentile", "buildathon", "forge", "award", "rank", "accomplishment"))
    return setIntent("achievements");

  const fb = FALLBACKS[Math.min(fallbackCountRef.current, FALLBACKS.length - 1)];
  fallbackCountRef.current += 1;
  return { ...fb, intent: "fallback" };
}

// ── Sub-components ────────────────────────────────────────────────────────────
const SectionDivider = ({ label }: { label: string }) => (
  <div className="flex items-center gap-3 text-[9px] uppercase tracking-[0.3em] text-white/35 mt-3 mb-1">
    <span className="h-px flex-1 bg-white/[0.07]" />
    <span>{label}</span>
    <span className="h-px flex-1 bg-white/[0.07]" />
  </div>
);

const SuggestionChip = ({ label, onClick }: { label: string; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="inline-flex items-center px-3 py-1.5 rounded-full border border-white/[0.09] bg-white/[0.02] text-[11px] text-white/55 hover:text-white/90 hover:border-cyan-400/35 hover:bg-cyan-500/[0.08] active:scale-[0.97] transition-all duration-150"
  >
    {label}
  </button>
);

const ProfileIcon = ({ short }: { short: string }) => (
  <svg viewBox="0 0 40 40" className="w-5 h-5 text-white">
    <circle cx="20" cy="20" r="18" fill="currentColor" opacity="0.2" />
    <text x="50%" y="54%" textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="ui-monospace, monospace" fill="currentColor">
      {short}
    </text>
  </svg>
);

const ProfileCard = ({
  label,
  info,
  short,
  href,
  accent,
}: {
  label: string;
  info: string;
  short: string;
  href: string;
  accent: string;
}) => (
  <a
    href={href}
    onClick={(e) => handlePlaceholderClick(e, href)}
    target={isPlaceholderHref(href) ? undefined : "_blank"}
    rel={isPlaceholderHref(href) ? undefined : "noopener noreferrer"}
    className="group relative overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02] px-3 py-2.5 transition-all duration-200 hover:border-cyan-400/30 hover:bg-white/[0.04]"
  >
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.12),_transparent_70%)]" />
    <div className="relative flex items-center gap-2.5">
      <div className={`flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br ${accent}`}>
        <ProfileIcon short={short} />
      </div>
      <div className="min-w-0">
        <p className="text-[12px] font-semibold text-white leading-none">{label}</p>
        <p className="text-[10px] text-white/45 mt-0.5 truncate">{info}</p>
      </div>
    </div>
  </a>
);

const ActionButton = ({ action }: { action: Action }) => {
  const baseClass =
    "inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.07] text-white/60 text-[11px] font-medium hover:border-cyan-400/35 hover:text-cyan-300 hover:bg-cyan-500/[0.07] active:scale-[0.97] transition-all duration-150";

  if (action.scrollTo) {
    return (
      <button onClick={() => action.scrollTo && handleScroll(action.scrollTo)} className={baseClass}>
        {action.label}
        <ChevronRight size={10} className="opacity-50" />
      </button>
    );
  }

  const isPlaceholder = isPlaceholderHref(action.url);
  if (!action.url) return null;
  return (
    <a
      href={action.url}
      onClick={(e) => handlePlaceholderClick(e, action.url)}
      target={isPlaceholder ? undefined : "_blank"}
      rel={isPlaceholder ? undefined : "noopener noreferrer"}
      className={baseClass}
    >
      {action.label}
      <ExternalLink size={10} className="opacity-50" />
    </a>
  );
};

const BotMessage = ({
  msg,
  onQuickReply,
}: {
  msg: Message;
  onQuickReply: (text: string) => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.22, ease: "easeOut" }}
    className="flex justify-start mb-5 gap-2.5"
  >
    {/* Avatar */}
    <div className="relative w-7 h-7 rounded-full bg-gradient-to-br from-cyan-400/30 to-blue-500/40 flex items-center justify-center shrink-0 mt-1">
      <span className="w-2 h-2 rounded-full bg-white/60" />
    </div>

    <div className="max-w-[89%] sm:max-w-[82%] flex flex-col gap-2">
      {/* Bubble */}
      <div
        className={`relative overflow-hidden rounded-2xl rounded-tl-sm px-4 py-3.5 text-[13px] leading-[1.65] ${
          msg.variant === "welcome"
            ? "border border-cyan-500/25 bg-[rgba(10,18,34,0.97)]"
            : "border border-white/[0.06] bg-[rgba(14,22,40,0.95)]"
        }`}
      >
        {msg.variant === "welcome" && (
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_left,_rgba(34,211,238,0.4),_transparent_60%)]" />
        )}
        <div className="relative space-y-1.5">
          {msg.content.map((line, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? "text-white/95 font-medium"
                  : "text-white/65"
              }
            >
              {line}
            </p>
          ))}
        </div>
      </div>

      <span className="text-[10px] text-white/35 pl-1">{msg.timestamp}</span>

      {/* Welcome extras */}
      {msg.variant === "welcome" && (
        <div className="space-y-3">
          <SectionDivider label="Suggested" />
          <div className="flex flex-wrap gap-1.5">
            {SUGGESTED_QUESTIONS.map((q) => (
              <SuggestionChip key={q.input} label={q.label} onClick={() => onQuickReply(q.input)} />
            ))}
          </div>

          <SectionDivider label="Coding profiles" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {CODING_PROFILES.map((p) => (
              <ProfileCard key={p.label} {...p} />
            ))}
          </div>

          {/* Internship CTA */}
          <div className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.08] bg-[rgba(10,20,40,0.7)] px-3.5 py-3">
            <div>
              <p className="text-[12px] font-semibold text-white leading-none">Open to internships</p>
              <p className="text-[11px] text-white/50 mt-0.5">Backend · SWE · Available now</p>
            </div>
            <button
              onClick={() => onQuickReply(INTERNSHIP_QUERY)}
              className="shrink-0 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/65 to-blue-500/65 text-[11px] font-semibold text-white hover:shadow-[0_4px_12px_rgba(34,211,238,0.2)] active:scale-[0.97] transition-all"
            >
              Learn more
            </button>
          </div>
        </div>
      )}

      {/* Actions */}
      {msg.actions && msg.actions.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {msg.actions.map((action, i) => (
            <ActionButton key={`${action.label}-${i}`} action={action} />
          ))}
        </div>
      )}

      {/* Inline profiles */}
      {msg.showProfiles && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
          {CODING_PROFILES.map((p) => (
            <ProfileCard key={`p-${p.label}`} {...p} />
          ))}
        </div>
      )}

      {/* Quick replies */}
      {msg.showReplies && msg.quickReplies && msg.quickReplies.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {msg.quickReplies.map((r) => (
            <SuggestionChip key={r} label={r} onClick={() => onQuickReply(r)} />
          ))}
        </div>
      )}
    </div>
  </motion.div>
);

const UserMessage = ({ msg }: { msg: Message }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.2, ease: "easeOut" }}
    className="flex justify-end mb-5"
  >
    <div className="max-w-[80%] sm:max-w-[72%] flex flex-col items-end gap-1.5">
      <div className="px-4 py-2.5 rounded-2xl rounded-tr-sm text-white/90 text-[13px] leading-[1.6] border border-cyan-500/25 bg-gradient-to-br from-[rgba(0,110,255,0.22)] to-[rgba(0,170,255,0.11)]">
        {msg.content[0]}
      </div>
      <span className="text-[10px] text-white/35 pr-1">{msg.timestamp}</span>
    </div>
  </motion.div>
);

const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.18 }}
    className="flex items-center gap-2.5 mb-5"
  >
    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-400/30 to-blue-500/40 flex items-center justify-center shrink-0">
      <span className="w-2 h-2 rounded-full bg-white/60" />
    </div>
    <div className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl rounded-tl-sm bg-white/[0.04] border border-white/[0.06]">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-[5px] h-[5px] rounded-full bg-cyan-400/65"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -2.5, 0] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut", delay: i * 0.18 }}
        />
      ))}
    </div>
  </motion.div>
);

// ── Chat Panel ────────────────────────────────────────────────────────────────
const ChatPanel = ({ onClose }: { onClose: () => void }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "bot",
      variant: "welcome",
      content: [
        `Hi — I'm Priyanshu's portfolio assistant.`,
        "Ask me about his projects, stack, DSA stats, or internship availability.",
      ],
      timestamp: formatTimestamp(),
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const idRef = useRef(1);
  const intentStackRef = useRef<string[]>([]);
  const fallbackCountRef = useRef(0);
  const touchStart = useRef<{ y: number; x: number } | null>(null);

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 120);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    const t = e.touches[0];
    touchStart.current = { y: t.clientY, x: t.clientX };
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!touchStart.current) return;
    const t = e.touches[0];
    const dY = t.clientY - touchStart.current.y;
    const dX = Math.abs(t.clientX - touchStart.current.x);
    if (dY > SWIPE_DOWN_THRESHOLD && dX < SWIPE_HORIZONTAL_TOLERANCE) {
      touchStart.current = null;
      onClose();
    }
  };

  const handleTouchEnd = () => { touchStart.current = null; };

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;

    setMessages((prev) => [
      ...prev.map((m) => ({ ...m, showReplies: false })),
      { id: idRef.current++, role: "user", content: [trimmed], timestamp: formatTimestamp() },
    ]);
    setInput("");
    setTyping(true);

    const delay = Math.min(MAX_TYPING_DELAY, BASE_TYPING_DELAY + trimmed.length * TYPING_DELAY_PER_CHAR);

    setTimeout(() => {
      const res = matchResponse(trimmed, intentStackRef.current, fallbackCountRef);
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: idRef.current++,
          role: "bot",
          content: res.lines,
          actions: res.actions,
          showProfiles: res.showProfiles,
          quickReplies: CONTEXT_QUICK_REPLIES[res.intent] ?? DEFAULT_QUICK_REPLIES,
          showReplies: true,
          timestamp: formatTimestamp(),
        },
      ]);
      setTimeout(() => inputRef.current?.focus(), 80);
    }, delay);
  };

  return (
    <motion.div
      id="chat-panel"
      role="dialog"
      aria-modal="true"
      aria-label="Priyanshu Portfolio Assistant"
      initial={{ opacity: 0, y: 14, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 14, scale: 0.97 }}
      transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-[5.5rem] sm:bottom-24 right-4 sm:right-6 w-[93vw] sm:w-[410px] max-h-[80vh] sm:max-h-[620px] flex flex-col z-50 rounded-[20px] overflow-hidden border border-white/[0.09] bg-[rgba(7,13,26,0.94)]"
      style={{ backdropFilter: "blur(20px)" }}
    >
      {/* Header */}
      <div
        className="sticky top-0 z-10 flex items-center justify-between px-4 sm:px-5 py-3.5 border-b border-white/[0.07] bg-[rgba(6,11,24,0.9)] backdrop-blur-xl"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400/25 to-blue-500/25 border border-white/10 flex items-center justify-center shrink-0">
            <span className="relative text-white/80 font-semibold text-[11px] tracking-wide">PG</span>
          </div>
          <div>
            <p className="text-[14px] font-semibold text-white leading-none">{PROFILE.name}</p>
            <p className="text-[11px] text-white/40 mt-0.5">{PROFILE.title}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-white/35 hover:text-white hover:bg-white/[0.07] transition-all"
            aria-label="Close"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto overscroll-contain px-4 sm:px-5 pt-4 pb-3 space-y-0"
        aria-live="polite"
        style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.08) transparent" }}
      >
        {messages.map((msg) =>
          msg.role === "bot" ? (
            <BotMessage key={msg.id} msg={msg} onQuickReply={sendMessage} />
          ) : (
            <UserMessage key={msg.id} msg={msg} />
          )
        )}
        {typing && <TypingIndicator />}
        <div ref={bottomRef} className="h-1" />
      </div>

      {/* Input */}
      <div className="px-4 sm:px-5 py-3 border-t border-white/[0.07] flex items-center gap-2 shrink-0">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") { e.preventDefault(); sendMessage(input); }
          }}
          placeholder="Ask about projects, stack, internships..."
          className="flex-1 h-10 bg-white/[0.04] border border-white/[0.07] rounded-xl px-4 text-[12px] sm:text-[13px] text-white placeholder-white/35 outline-none focus:border-cyan-500/35 focus:bg-white/[0.05] transition-all duration-150"
          aria-label="Ask about Priyanshu"
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={!input.trim() || typing}
          className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00b4f0] to-[#005ee6] flex items-center justify-center hover:scale-[1.04] hover:shadow-[0_4px_14px_rgba(0,120,255,0.3)] active:scale-[0.95] disabled:opacity-25 disabled:hover:scale-100 disabled:hover:shadow-none transition-all duration-150 shrink-0"
          aria-label="Send"
        >
          <Send size={15} className="text-white translate-x-[1px]" />
        </button>
      </div>
    </motion.div>
  );
};

// ── Chat Button ───────────────────────────────────────────────────────────────
const ChatButton = ({
  onClick,
  isOpen,
  buttonRef,
}: {
  onClick: () => void;
  isOpen: boolean;
  buttonRef: RefObject<HTMLButtonElement>;
}) => (
  <motion.button
    ref={buttonRef}
    onClick={onClick}
    whileHover={{ scale: 1.06 }}
    whileTap={{ scale: 0.93 }}
    animate={isOpen ? { y: 0 } : { y: [0, -5, 0] }}
    transition={isOpen ? { duration: 0.18 } : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
    className="fixed bottom-6 right-4 sm:right-6 w-[52px] h-[52px] rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center z-50 shadow-[0_4px_16px_rgba(34,211,238,0.22)] hover:shadow-[0_6px_24px_rgba(34,211,238,0.36)] transition-shadow duration-200"
    aria-label="Open portfolio assistant"
    aria-expanded={isOpen}
    aria-controls="chat-panel"
  >
    {!isOpen && (
      <span className="absolute inset-0 rounded-full bg-cyan-400/20 animate-ping" />
    )}
    <AnimatePresence mode="wait">
      {isOpen ? (
        <motion.div
          key="close"
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.16 }}
        >
          <X size={20} className="text-white" />
        </motion.div>
      ) : (
        <motion.div
          key="open"
          initial={{ rotate: 90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: -90, opacity: 0 }}
          transition={{ duration: 0.16 }}
        >
          <MessageCircle size={20} className="text-white" />
        </motion.div>
      )}
    </AnimatePresence>
  </motion.button>
);

// ── Main Export ───────────────────────────────────────────────────────────────
export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const chatButtonRef = useRef<HTMLButtonElement>(null);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => chatButtonRef.current?.focus(), 80);
  };

  return (
    <>
      <AnimatePresence>{isOpen && <ChatPanel onClose={handleClose} />}</AnimatePresence>
      <ChatButton
        onClick={() => (isOpen ? handleClose() : setIsOpen(true))}
        isOpen={isOpen}
        buttonRef={chatButtonRef}
      />
    </>
  );
}
