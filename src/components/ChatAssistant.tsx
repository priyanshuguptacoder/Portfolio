import { useEffect, useRef, useState, type TouchEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, ExternalLink, MessageCircle, Send, X } from "lucide-react";

// ── Profile Data ──────────────────────────────────────────────────────────────
const PROFILE = {
  name: "Priyanshu Gupta",
  title: "Backend • DSA • Full Stack",
  tagline: "Backend-focused developer and competitive programmer.",
};

const LINKS = {
  email: "priyanshuguptanitian9696@gmail.com",
  resume: "#",
  leetcode: "#",
  codeforces: "#",
  codechef: "#",
  codolio: "#",
  github: "#",
  linkedin: "#",
};

// ── Quick Action Links ─────────────────────────────────────────────────────────
const QUICK_ACTION_LINKS = [
  { label: "View Projects", href: "#" },
  { label: "Tech Stack", href: "#" },
  { label: "About Me", href: "#" },
  { label: "Resume", href: "#" },
  { label: "Contact", href: "#" },
  { label: "Open For Internship", href: "#" },
  { label: "LeetCode", href: "#" },
  { label: "Codeforces", href: "#" },
  { label: "CodeChef", href: "#" },
  { label: "Codolio", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "LinkedIn", href: "#" },
];

// ── Suggested Questions ────────────────────────────────────────────────────────
const SUGGESTED_QUESTIONS = [
  { label: "Tell me about your projects", input: "Tell me about your projects" },
  { label: "What is your tech stack?", input: "What is your tech stack?" },
  { label: "Show coding profiles", input: "Show coding profiles" },
  { label: "Are you available for internships?", input: "Are you available for internships?" },
  { label: "What backend technologies do you use?", input: "What backend technologies do you use?" },
  { label: "Tell me about DSA experience", input: "Tell me about DSA experience" },
];

// ── Coding Profiles ────────────────────────────────────────────────────────────
const CODING_PROFILES = [
  {
    label: "LeetCode",
    info: "335+ solved",
    short: "LC",
    href: LINKS.leetcode,
    accent: "from-orange-400/30 via-rose-400/20 to-amber-300/30",
  },
  {
    label: "Codeforces",
    info: "Active contests",
    short: "CF",
    href: LINKS.codeforces,
    accent: "from-sky-400/30 via-blue-400/20 to-cyan-300/30",
  },
  {
    label: "CodeChef",
    info: "DSA practice",
    short: "CC",
    href: LINKS.codechef,
    accent: "from-amber-400/30 via-orange-300/20 to-yellow-200/30",
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
  {
    label: "LinkedIn",
    info: "Professional profile",
    short: "IN",
    href: LINKS.linkedin,
    accent: "from-blue-400/30 via-cyan-400/20 to-sky-300/30",
  },
];

// ── Types ─────────────────────────────────────────────────────────────────────
type Action = {
  label: string;
  url?: string;
  scrollTo?: string;
};

type ResponseData = {
  lines: string[];
  actions?: Action[];
  showProfiles?: boolean;
};

type MatchedResponse = ResponseData & {
  intent: string;
};

type Message = {
  id: number;
  role: "user" | "bot";
  content: string[];
  list?: string[];
  actions?: Action[];
  quickReplies?: string[];
  showProfiles?: boolean;
  showReplies?: boolean;
  variant?: "welcome";
  timestamp: string;
};

// ── Intelligence State ────────────────────────────────────────────────────────
const intentStack: string[] = [];
let fallbackCount = 0;

// ── Helpers ───────────────────────────────────────────────────────────────────
const formatTimestamp = () =>
  new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

function normalize(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ").trim();
}

function pick(arr: ResponseData[]): ResponseData {
  return arr[Math.floor(Math.random() * arr.length)];
}

function handleScroll(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ── Response Bank ─────────────────────────────────────────────────────────────
const RESPONSES: Record<string, ResponseData[]> = {
  greeting: [
    {
      lines: [
        "Hi — I’m Priyanshu’s AI Assistant.",
        "Ask me about projects, tech stack, DSA, or internship availability.",
      ],
      actions: [
        { label: "Projects", scrollTo: "projects" },
        { label: "Skills", scrollTo: "skills" },
        { label: "Internships", scrollTo: "contact" },
      ],
    },
  ],
  identity: [
    {
      lines: [
        "I’m Priyanshu AI Assistant — a recruiter-focused guide to his portfolio.",
        "I can summarize his projects, skills, and availability in seconds.",
      ],
    },
  ],
  about: [
    {
      lines: [
        "Priyanshu is a backend-focused developer at NIT Jalandhar with a strong DSA foundation.",
        "He builds scalable APIs and systems while staying active in competitive programming.",
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
        "B.Tech CSE at NIT Jalandhar (2025–2029), maintaining a CGPA of 8.3+.",
        "Qualified JEE Advanced and secured a 99.2 percentile in JEE Mains.",
      ],
      actions: [
        { label: "Projects", scrollTo: "projects" },
        { label: "Contact", scrollTo: "contact" },
      ],
    },
  ],
  projects: [
    {
      lines: [
        "Highlighted builds: Competitive Programming Tracker and Hostel Management System.",
        "Both are backend-heavy with auth, APIs, analytics, and real deployments.",
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
        "Competitive Programming Tracker — MERN + GraphQL, spaced repetition, and analytics.",
        "Includes contest sync, streak tracking, and MongoDB aggregation dashboards.",
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
        "Hostel Management System — JWT auth, role-based access, and optimized REST APIs.",
        "Handles allocation workflows, complaints, and admin tooling on a Node backend.",
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
        "Backend: Node.js, Express, REST APIs, JWT, MongoDB, and database design.",
        "DSA: Graphs, Trees, Sliding Window, Greedy, and Dynamic Programming.",
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
        "I primarily work with React, Node.js, Express, MongoDB, REST APIs, Tailwind CSS, and modern JavaScript development.",
        "Backend reliability and clean API architecture are core focus areas.",
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
        "Solved 335+ LeetCode problems and actively participates in contests across Codeforces and CodeChef.",
        "Strong emphasis on medium/hard problems and consistent contest practice.",
      ],
      actions: [
        { label: "Coding Profiles", url: LINKS.leetcode },
        { label: "About", scrollTo: "about" },
      ],
    },
  ],
  profiles: [
    {
      lines: [
        "Here are Priyanshu’s coding profiles and professional links.",
        "Use the cards below to explore each platform.",
      ],
      showProfiles: true,
      actions: [
        { label: "LeetCode", url: LINKS.leetcode },
        { label: "LinkedIn", url: LINKS.linkedin },
      ],
    },
  ],
  leetcode: [
    {
      lines: [
        "LeetCode: 335+ problems solved with focus on graphs, DP, and sliding window patterns.",
        "Consistent practice with medium/hard problems and interview-style topics.",
      ],
      actions: [
        { label: "LeetCode", url: LINKS.leetcode },
        { label: "Coding Profiles", url: LINKS.leetcode },
      ],
    },
  ],
  codeforces: [
    {
      lines: [
        "Active on Codeforces — focused on contest speed and implementation accuracy.",
        "Building competitive programming fundamentals through regular participation.",
      ],
      actions: [
        { label: "Codeforces", url: LINKS.codeforces },
        { label: "LeetCode", url: LINKS.leetcode },
      ],
    },
  ],
  codechef: [
    {
      lines: [
        "CodeChef is used for regular DSA practice and contest prep.",
        "It complements LeetCode and Codeforces with additional problem sets.",
      ],
      actions: [
        { label: "CodeChef", url: LINKS.codechef },
        { label: "Coding Profiles", url: LINKS.codechef },
      ],
    },
  ],
  codolio: [
    {
      lines: [
        "Codolio aggregates competitive programming stats and activity in one place.",
        "Use it to see a unified snapshot across platforms.",
      ],
      actions: [
        { label: "Codolio", url: LINKS.codolio },
        { label: "Coding Profiles", url: LINKS.codolio },
      ],
    },
  ],
  github: [
    {
      lines: [
        "GitHub hosts Priyanshu’s production-grade repositories and backend work.",
        "Expect clean API architecture, deployment-ready projects, and documentation.",
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
        "LinkedIn has his professional background, education, and project highlights.",
        "Best place to connect for collaboration or opportunities.",
      ],
      actions: [
        { label: "LinkedIn", url: LINKS.linkedin },
        { label: "Contact", scrollTo: "contact" },
      ],
    },
  ],
  internship: [
    {
      lines: [
        "Yes. Priyanshu is actively looking for backend and software engineering internship opportunities.",
        "He’s open to recruiter conversations and project-based roles.",
      ],
      actions: [
        { label: "Contact", scrollTo: "contact" },
        { label: "Email", url: `mailto:${LINKS.email}` },
      ],
    },
  ],
  resume: [
    {
      lines: [
        "Resume is available on request and can be tailored for backend roles.",
        "Feel free to reach out for the latest version.",
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
        `Reach Priyanshu at ${LINKS.email} — he typically responds within 24 hours.`,
        "LinkedIn is also open for professional outreach.",
      ],
      actions: [
        { label: "Email", url: `mailto:${LINKS.email}` },
        { label: "LinkedIn", url: LINKS.linkedin },
      ],
    },
  ],
  achievements: [
    {
      lines: [
        "99.2 percentile in JEE Mains and qualified JEE Advanced — top 0.8% nationally.",
        "Top 5 finish at FORGE Buildathon among competing teams.",
      ],
      actions: [
        { label: "About", scrollTo: "about" },
        { label: "Projects", scrollTo: "projects" },
      ],
    },
  ],
};

const FALLBACKS: ResponseData[] = [
  {
    lines: [
      "I can walk you through projects, tech stack, DSA stats, or internship availability.",
      "Try asking about skills, coding profiles, or how to reach him.",
    ],
    actions: [
      { label: "Projects", scrollTo: "projects" },
      { label: "Skills", scrollTo: "skills" },
      { label: "Contact", scrollTo: "contact" },
    ],
  },
  {
    lines: ["Ask me about projects, competitive programming, or internship availability."],
    actions: [
      { label: "Projects", scrollTo: "projects" },
      { label: "DSA", scrollTo: "about" },
    ],
  },
];

const DEFAULT_QUICK_REPLIES = [
  "Tell me about your projects",
  "What is your tech stack?",
  "Are you available for internships?",
];

const CONTEXT_QUICK_REPLIES: Record<string, string[]> = {
  greeting: SUGGESTED_QUESTIONS.map((q) => q.input),
  identity: [
    "Tell me about your projects",
    "What backend technologies do you use?",
    "Are you available for internships?",
  ],
  about: ["Tell me about your projects", "Tell me about DSA experience", "Show coding profiles"],
  projects: [
    "Tell me about Competitive Programming Tracker",
    "Tell me about Hostel Management System",
    "What is your tech stack?",
  ],
  tracker: ["What is your tech stack?", "Show coding profiles", "Are you available for internships?"],
  hostel: ["What backend technologies do you use?", "Show coding profiles", "Are you available for internships?"],
  skills: ["What backend technologies do you use?", "Show coding profiles", "Tell me about your projects"],
  tech: ["Tell me about your projects", "Tell me about DSA experience", "Are you available for internships?"],
  dsa: ["Show coding profiles", "Tell me about DSA experience", "Are you available for internships?"],
  profiles: ["Tell me about your projects", "What is your tech stack?", "Are you available for internships?"],
  internship: ["Contact", "Resume", "Tell me about your projects"],
  resume: ["Contact", "Show coding profiles", "Tell me about your projects"],
  contact: ["Are you available for internships?", "Tell me about your projects", "Show coding profiles"],
  achievements: ["Tell me about your projects", "Show coding profiles", "What is your tech stack?"],
};

// ── Intent Matcher ────────────────────────────────────────────────────────────
function matchResponse(input: string): MatchedResponse {
  const q = normalize(input);
  const has = (...tokens: string[]) => tokens.some((t) => q.includes(t));

  const setIntent = (intent: string): MatchedResponse => {
    intentStack.push(intent);
    if (intentStack.length > 6) intentStack.shift();
    fallbackCount = 0;
    return { ...pick(RESPONSES[intent]), intent };
  };

  if (has("more", "details", "detail", "explain", "tell more", "elaborate", "go on", "expand")) {
    const ctx = intentStack[intentStack.length - 1];
    if (ctx && RESPONSES[ctx]) return { ...pick(RESPONSES[ctx]), intent: ctx };
  }

  if (has("hello", "hey", "hi", "howdy", "sup", "hii", "yo") || q === "hi")
    return setIntent("greeting");

  if (has("who are you", "what are you", "your name", "ur name", "introduce yourself"))
    return setIntent("identity");

  if (has("who is priyanshu", "about him", "about priyanshu", "who is he", "what does he do"))
    return setIntent("about");

  if (has("education", "college", "nit", "jalandhar", "cgpa", "jee", "degree", "btech"))
    return setIntent("education");

  if (has("tracker", "cp tracker", "competitive programming tracker", "graphql", "sm2"))
    return setIntent("tracker");

  if (has("hostel", "hostel management", "hostel system")) return setIntent("hostel");

  if (has("project", "projects", "work", "built", "system", "portfolio"))
    return setIntent("projects");

  if (has("tech stack", "technology", "stack", "framework", "tools", "tech"))
    return setIntent("tech");

  if (has("skill", "skills", "backend", "express", "mongo", "node", "rest api"))
    return setIntent("skills");

  if (has("leetcode", "leet code", "lc")) return setIntent("leetcode");

  if (has("codeforces", "code forces", "cf")) return setIntent("codeforces");

  if (has("codechef", "code chef", "cc")) return setIntent("codechef");

  if (has("codolio", "coding profile", "profiles", "profile")) return setIntent("profiles");

  if (has("dsa", "data structure", "algorithm", "competitive", "contest", "problem solv"))
    return setIntent("dsa");

  if (has("github", "repo", "repository")) return setIntent("github");

  if (has("linkedin", "linked in")) return setIntent("linkedin");

  if (has("hire", "hiring", "intern", "internship", "job", "role", "available", "open to"))
    return setIntent("internship");

  if (has("contact", "email", "reach", "connect", "mail")) return setIntent("contact");

  if (has("resume", "cv", "download")) return setIntent("resume");

  if (has("achievement", "percentile", "buildathon", "forge", "award"))
    return setIntent("achievements");

  const fb = FALLBACKS[Math.min(fallbackCount, FALLBACKS.length - 1)];
  fallbackCount += 1;
  return { ...fb, intent: "fallback" };
}

// ── Components ────────────────────────────────────────────────────────────────
const SectionDivider = ({ label }: { label: string }) => (
  <div className="flex items-center gap-3 text-[9px] uppercase tracking-[0.35em] text-white/40 mt-4">
    <span className="h-px flex-1 bg-white/10" />
    <span>{label}</span>
    <span className="h-px flex-1 bg-white/10" />
  </div>
);

const QuickActionLink = ({ label, href }: { label: string; href: string }) => (
  <a
    href={href}
    onClick={(event) => href === "#" && event.preventDefault()}
    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-[11px] sm:text-[12px] text-white/70 font-medium hover:border-cyan-400/40 hover:text-cyan-200 hover:bg-cyan-500/10 hover:shadow-[0_0_16px_rgba(34,211,238,0.2)] transition-all"
  >
    {label}
  </a>
);

const SuggestionChip = ({ label, onClick }: { label: string; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="inline-flex items-center px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.02] text-[11px] sm:text-[12px] text-white/60 hover:text-white hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:scale-[1.02] active:scale-[0.98] transition-all"
  >
    {label}
  </button>
);

const ProfileIcon = ({ short }: { short: string }) => (
  <svg viewBox="0 0 40 40" className="w-5 h-5 text-white">
    <circle cx="20" cy="20" r="18" fill="currentColor" opacity="0.22" />
    <text
      x="50%"
      y="54%"
      textAnchor="middle"
      fontSize="12"
      fontWeight="700"
      fontFamily="Inter, sans-serif"
      fill="currentColor"
    >
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
    onClick={(event) => href === "#" && event.preventDefault()}
    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] px-3 py-3 transition-all hover:border-cyan-400/40 hover:bg-white/[0.04]"
  >
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_70%)]" />
    <div className="relative flex items-center gap-3">
      <div className={`flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${accent}`}>
        <ProfileIcon short={short} />
      </div>
      <div>
        <p className="text-[13px] font-semibold text-white">{label}</p>
        <p className="text-[11px] text-white/50">{info}</p>
      </div>
    </div>
  </a>
);

const ActionButton = ({ action }: { action: Action }) => {
  if (action.scrollTo) {
    return (
      <button
        onClick={() => handleScroll(action.scrollTo!)}
        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/65 text-[11px] font-medium hover:border-[rgba(0,180,255,0.4)] hover:text-cyan-300 hover:bg-[rgba(0,180,255,0.08)] hover:scale-[1.03] active:scale-[0.97] transition-all"
      >
        {action.label}
        <ChevronRight size={10} className="opacity-60" />
      </button>
    );
  }

  const isPlaceholder = action.url === "#" || !action.url;
  return (
    <a
      href={action.url ?? "#"}
      onClick={(event) => isPlaceholder && event.preventDefault()}
      target={isPlaceholder ? undefined : "_blank"}
      rel={isPlaceholder ? undefined : "noopener noreferrer"}
      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/65 text-[11px] font-medium hover:border-[rgba(0,180,255,0.4)] hover:text-cyan-300 hover:bg-[rgba(0,180,255,0.08)] hover:scale-[1.03] active:scale-[0.97] transition-all"
    >
      {action.label}
      <ExternalLink size={10} className="opacity-60" />
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
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.25, ease: "easeOut" }}
    className="flex justify-start mb-6 gap-3"
  >
    <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400/60 to-blue-500/70 flex items-center justify-center shrink-0 mt-1 shadow-[0_0_18px_rgba(34,211,238,0.35)]">
      <span className="absolute inset-0 rounded-full bg-cyan-400/20 blur-xl animate-pulse" />
      <span className="relative text-white text-[10px] font-black font-mono">AI</span>
    </div>
    <div className="max-w-[88%] sm:max-w-[80%] flex flex-col gap-2">
      <div
        className={`relative overflow-hidden rounded-2xl px-4 py-4 text-[13px] sm:text-[14px] leading-[1.65] ${
          msg.variant === "welcome"
            ? "border border-cyan-500/30 bg-[rgba(12,20,36,0.95)]"
            : "border border-white/[0.06] bg-[rgba(18,28,48,0.9)]"
        }`}
      >
        {msg.variant === "welcome" && (
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.25),_transparent_70%)]" />
        )}
        <div className="relative space-y-2">
          {msg.content.map((line, i) => (
            <p
              key={i}
              className={
                i === 0 && msg.variant === "welcome"
                  ? "text-white font-semibold"
                  : i === 0
                    ? "text-white/90 font-medium"
                    : "text-white/70"
              }
            >
              {msg.variant === "welcome" && i === 0 ? (
                <span className="chat-typewriter">{line}</span>
              ) : (
                line
              )}
            </p>
          ))}
          {msg.list && (
            <ul className="mt-3 space-y-2">
              {msg.list.map((item) => (
                <li key={item} className="flex gap-2 text-white/80">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-cyan-400/70" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <span className="text-[10px] text-white/40 pl-1">{msg.timestamp}</span>
      {msg.variant === "welcome" && (
        <div className="space-y-4">
          <SectionDivider label="Quick actions" />
          <div className="flex flex-wrap gap-2">
            {QUICK_ACTION_LINKS.map((action) => (
              <QuickActionLink key={action.label} label={action.label} href={action.href} />
            ))}
          </div>
          <SectionDivider label="Suggested questions" />
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_QUESTIONS.map((question) => (
              <SuggestionChip
                key={question.input}
                label={question.label}
                onClick={() => onQuickReply(question.input)}
              />
            ))}
          </div>
          <SectionDivider label="Coding profiles" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {CODING_PROFILES.map((profile) => (
              <ProfileCard key={profile.label} {...profile} />
            ))}
          </div>
          <div className="rounded-2xl border border-cyan-500/20 bg-[rgba(12,20,36,0.85)] p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-white">Recruiter mode</p>
              <p className="text-[12px] text-white/60">
                Priyanshu is open for backend and software engineering internships.
              </p>
            </div>
            <button
              onClick={() => onQuickReply("Are you open for internships?")}
              className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/80 to-blue-500/80 text-[12px] font-semibold text-white hover:shadow-[0_0_20px_rgba(34,211,238,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Open For Internship
            </button>
          </div>
        </div>
      )}
      {msg.actions && msg.actions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {msg.actions.map((action, i) => (
            <ActionButton key={`${action.label}-${i}`} action={action} />
          ))}
        </div>
      )}
      {msg.showProfiles && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {CODING_PROFILES.map((profile) => (
            <ProfileCard key={`profile-${profile.label}`} {...profile} />
          ))}
        </div>
      )}
      {msg.showReplies && msg.quickReplies && msg.quickReplies.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {msg.quickReplies.map((reply) => (
            <SuggestionChip key={reply} label={reply} onClick={() => onQuickReply(reply)} />
          ))}
        </div>
      )}
    </div>
  </motion.div>
);

const UserMessage = ({ msg }: { msg: Message }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.22, ease: "easeOut" }}
    className="flex justify-end mb-6"
  >
    <div className="max-w-[85%] sm:max-w-[75%] flex flex-col items-end gap-2">
      <div className="px-4 py-3 rounded-2xl rounded-tr-sm text-white/90 text-[13px] sm:text-[14px] leading-[1.6] border border-cyan-500/30 bg-gradient-to-br from-[rgba(0,120,255,0.24)] to-[rgba(0,180,255,0.12)]">
        {msg.content[0]}
      </div>
      <span className="text-[10px] text-white/40 pr-1">{msg.timestamp}</span>
    </div>
  </motion.div>
);

const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.2, ease: "easeOut" }}
    className="flex items-center gap-3 mb-6"
  >
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400/60 to-blue-500/70 flex items-center justify-center shrink-0 shadow-[0_0_14px_rgba(34,211,238,0.25)]">
      <span className="text-white text-[10px] font-black font-mono">AI</span>
    </div>
    <div className="flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-tl-sm bg-white/[0.04] border border-white/[0.07]">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-[6px] h-[6px] rounded-full bg-cyan-400/70"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
        />
      ))}
    </div>
  </motion.div>
);

const MiniTyping = () => (
  <div className="flex items-center gap-2 text-[11px] text-cyan-200/70">
    <span className="uppercase tracking-[0.25em] text-[9px] text-cyan-200/60">AI</span>
    <div className="flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-cyan-300/70 animate-pulse"
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
    </div>
  </div>
);

// ── Chat Panel ────────────────────────────────────────────────────────────────
const ChatPanel = ({ onClose }: { onClose: () => void }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "bot",
      variant: "welcome",
      content: ["Hi 👋", "I’m Priyanshu’s AI Assistant.", "I can help you explore:"],
      list: [
        "Projects",
        "Skills",
        "Competitive Programming",
        "Resume",
        "Coding Profiles",
        "Internship Availability",
      ],
      timestamp: formatTimestamp(),
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const idRef = useRef(1);
  const touchStart = useRef<{ y: number; x: number } | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 120);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    touchStart.current = { y: touch.clientY, x: touch.clientX };
  };

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    if (!touchStart.current) return;
    const touch = event.touches[0];
    const deltaY = touch.clientY - touchStart.current.y;
    const deltaX = Math.abs(touch.clientX - touchStart.current.x);
    if (deltaY > 80 && deltaX < 40) {
      touchStart.current = null;
      onClose();
    }
  };

  const handleTouchEnd = () => {
    touchStart.current = null;
  };

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;

    setMessages((prev) => [
      ...prev.map((msg) => ({ ...msg, showReplies: false })),
      {
        id: idRef.current++,
        role: "user",
        content: [trimmed],
        timestamp: formatTimestamp(),
      },
    ]);
    setInput("");
    setTyping(true);

    const delay = Math.min(900, 260 + trimmed.length * 12);

    setTimeout(() => {
      const res = matchResponse(trimmed);
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
      aria-label="Priyanshu AI Assistant"
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.96 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="chat-panel fixed bottom-[5.5rem] sm:bottom-24 right-4 sm:right-6 w-[94vw] sm:w-[420px] max-h-[78vh] sm:max-h-[640px] flex flex-col z-50 rounded-[22px] overflow-hidden border border-white/10 bg-[rgba(8,14,28,0.92)]"
      style={{ backdropFilter: "blur(16px)" }}
    >
      <div
        className="sticky top-0 z-10 flex items-center justify-between px-4 sm:px-5 py-4 border-b border-white/[0.08] bg-[rgba(6,12,26,0.88)] backdrop-blur-xl"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400/40 to-blue-500/40 border border-cyan-500/30 flex items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-cyan-400/20 blur-xl animate-pulse" />
            <span className="relative text-cyan-200 font-black font-mono text-[11px]">AI</span>
          </div>
          <div>
            <p className="text-[15px] font-semibold text-white leading-none">Priyanshu AI Assistant</p>
            <p className="text-[11px] text-cyan-200/70 mt-1">{PROFILE.title}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <p className="text-[10px] text-white/60">Online</p>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.08] transition-all"
          aria-label="Close assistant"
        >
          <X size={16} />
        </button>
      </div>

      <div
        className="chat-scrollbar flex-1 overflow-y-auto px-4 sm:px-5 pt-5 pb-[calc(1rem+env(safe-area-inset-bottom))]"
        aria-live="polite"
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

      <div className="px-4 sm:px-5 py-3 border-t border-white/[0.08] flex flex-col gap-2 shrink-0">
        {typing && <MiniTyping />}
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && sendMessage(input)}
            placeholder="Ask about projects, tech stack, internships..."
            className="flex-1 h-[44px] bg-[rgba(18,28,48,0.9)] border border-white/[0.08] rounded-xl px-4 text-[12px] sm:text-[13px] text-white placeholder-white/40 outline-none focus:border-cyan-500/40 focus:bg-[rgba(18,28,48,1)] transition-all"
            aria-label="Ask about Priyanshu"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || typing}
            className="w-[44px] h-[44px] rounded-xl bg-gradient-to-br from-[#00c2ff] to-[#0077ff] flex items-center justify-center hover:scale-[1.05] hover:shadow-[0_8px_24px_rgba(0,120,255,0.45)] active:scale-[0.95] disabled:opacity-30 disabled:hover:scale-100 disabled:hover:shadow-none transition-all duration-200 shrink-0"
            aria-label="Send message"
          >
            <Send size={16} className="text-white translate-x-[1px]" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// ── Chat Button ───────────────────────────────────────────────────────────────
const ChatButton = ({ onClick, isOpen }: { onClick: () => void; isOpen: boolean }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.06 }}
    whileTap={{ scale: 0.94 }}
    animate={isOpen ? { y: 0 } : { y: [0, -6, 0] }}
    transition={isOpen ? { duration: 0.2 } : { duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
    className="group fixed bottom-6 right-4 sm:right-6 w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center z-50 shadow-[0_0_28px_rgba(34,211,238,0.35)] hover:shadow-[0_0_45px_rgba(34,211,238,0.55)] transition-shadow"
    aria-label="Open Priyanshu AI Assistant"
    aria-expanded={isOpen}
    aria-controls="chat-panel"
  >
    {!isOpen && <span className="absolute inset-0 rounded-full bg-cyan-400/30 animate-ping" />}
    <span className="absolute -left-2 -top-2 w-6 h-6 rounded-full bg-cyan-400/20 blur-xl" />
    <span className="absolute right-full mr-3 px-3 py-1.5 rounded-full text-[11px] text-white/80 bg-[rgba(10,18,32,0.85)] border border-white/10 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap shadow-[0_8px_24px_rgba(0,0,0,0.45)]">
      Ask about Priyanshu
    </span>
    <AnimatePresence mode="wait">
      {isOpen ? (
        <motion.div
          key="close"
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <X size={22} className="text-white" />
        </motion.div>
      ) : (
        <motion.div
          key="open"
          initial={{ rotate: 90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: -90, opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <MessageCircle size={22} className="text-white" />
        </motion.div>
      )}
    </AnimatePresence>
  </motion.button>
);

// ── Main Export ───────────────────────────────────────────────────────────────
export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AnimatePresence>{isOpen && <ChatPanel onClose={() => setIsOpen(false)} />}</AnimatePresence>
      <ChatButton onClick={() => setIsOpen((prev) => !prev)} isOpen={isOpen} />
    </>
  );
}
