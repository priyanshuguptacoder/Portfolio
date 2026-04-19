import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, ExternalLink, ChevronRight } from "lucide-react";

// ── Profile Data ──────────────────────────────────────────────────────────────
const PROFILE = {
  name: "Priyanshu Gupta",
  role: "Backend-Focused Developer",
  education: "CSE '29 @ NIT Jalandhar (CGPA 8.3+)",
  dsa: "300+ problems (LeetCode), Rating 1469",
};

const LINKS = {
  leetcode: "https://leetcode.com/u/invisiblemanfromheart/",
  codeforces: "https://codeforces.com/profile/priyanshuguptacoder",
  github: "https://github.com/priyanshuguptacoder",
  linkedin: "https://linkedin.com/in/priyanshuguptacoder",
  portfolio: "https://priyanshuportfoliogupta.vercel.app",
  email: "priyanshuguptanitian9696@gmail.com",
};

// ── Types ─────────────────────────────────────────────────────────────────────
type Action = {
  label: string;
  url?: string;
  scrollTo?: string;
};

type ResponseData = {
  lines: string[];
  actions?: Action[];
};

type Message = {
  id: number;
  role: "user" | "bot";
  content: string[];
  actions?: Action[];
  showQuick?: boolean;
};

// ── Intelligence State ────────────────────────────────────────────────────────
// lastIntent kept for potential future use; intentStack drives follow-up logic
let intentStack: string[] = [];
let fallbackCount = 0;

// ── Helpers ───────────────────────────────────────────────────────────────────
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
        "Hey — I'm Priyanshu's portfolio assistant.",
        "Ask me about his projects, DSA stats, skills, or how to reach him.",
      ],
    },
    {
      lines: [
        "Hi! I can walk you through Priyanshu's work fast.",
        "Try asking about projects, backend skills, or his DSA stats.",
      ],
    },
  ],

  identity: [
    {
      lines: [
        "I'm Priyanshu's portfolio assistant — built to help you explore his work.",
        "Ask about projects, skills, DSA, or how to hire him.",
      ],
    },
  ],

  about: [
    {
      lines: [
        "Priyanshu is a backend-focused developer at NIT Jalandhar, building scalable systems and APIs.",
        "He combines strong DSA problem-solving (300+ problems) with real-world backend development.",
      ],
      actions: [
        { label: "Projects", scrollTo: "projects" },
        { label: "DSA Stats", scrollTo: "about" },
      ],
    },
    {
      lines: [
        `${PROFILE.role} — ${PROFILE.education}.`,
        "Focused on backend architecture, API design, and consistent competitive programming.",
      ],
      actions: [
        { label: "Skills", scrollTo: "skills" },
        { label: "Contact", scrollTo: "contact" },
      ],
    },
  ],

  education: [
    {
      lines: [
        "B.Tech CSE at NIT Jalandhar (2025–2029), maintaining a CGPA of 8.3+.",
        "Secured 99.2 percentile in JEE Mains and qualified JEE Advanced.",
      ],
      actions: [
        { label: "Projects", scrollTo: "projects" },
        { label: "Skills", scrollTo: "skills" },
      ],
    },
  ],

  projects: [
    {
      lines: [
        "Two production-grade projects: Competitive Programming Tracker and Hostel Management System.",
        "Both are backend-heavy with real auth, APIs, and deployed infrastructure.",
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
        "Competitive Programming Tracker — MERN stack with GraphQL APIs and SM-2 spaced repetition.",
        "Includes MongoDB aggregation analytics, contest sync, and streak tracking logic.",
      ],
      actions: [
        { label: "Live Demo", url: "https://competativeprogrammingtrackerpriyanshu.vercel.app/" },
        { label: "GitHub", url: LINKS.github },
      ],
    },
  ],

  hostel: [
    {
      lines: [
        "Hostel Management System — JWT auth, role-based access control, and optimized REST APIs.",
        "Handles room allocation, complaints, and admin workflows with a deployed Node.js backend.",
      ],
      actions: [
        { label: "GitHub", url: LINKS.github },
        { label: "All Projects", scrollTo: "projects" },
      ],
    },
  ],

  skills: [
    {
      lines: [
        "Backend: Node.js, Express, REST APIs, JWT, MongoDB.",
        "DSA: Graphs, Trees, Sliding Window, Greedy, DP. Systems: DB design, API optimization.",
      ],
      actions: [
        { label: "View Skills", scrollTo: "skills" },
        { label: "Projects", scrollTo: "projects" },
      ],
    },
    {
      lines: [
        "Core stack is Node.js + Express + MongoDB — built for scale, not just demos.",
        "Strong DSA foundation (300+ problems) applied directly to system design decisions.",
      ],
      actions: [
        { label: "GitHub", url: LINKS.github },
        { label: "DSA Stats", scrollTo: "about" },
      ],
    },
  ],

  dsa: [
    {
      lines: [
        "300+ problems solved on LeetCode — strong focus on medium/hard: graphs, DP, sliding window.",
        "Contest rating: 1469 (Top ~55%) with consistent participation.",
      ],
      actions: [
        { label: "LeetCode Profile", url: LINKS.leetcode },
        { label: "Codeforces", url: LINKS.codeforces },
      ],
    },
  ],

  leetcode: [
    {
      lines: [
        "LeetCode: 300+ problems solved, rating 1469 (Top ~55%).",
        "Consistent across arrays, graphs, trees, DP, and greedy — not just easy problems.",
      ],
      actions: [
        { label: "View Profile", url: LINKS.leetcode },
        { label: "Projects", scrollTo: "projects" },
      ],
    },
  ],

  codeforces: [
    {
      lines: [
        "Active on Codeforces — focused on improving contest speed and implementation accuracy.",
        "Early stage but consistent participation, building competitive programming fundamentals.",
      ],
      actions: [
        { label: "View Profile", url: LINKS.codeforces },
        { label: "LeetCode", url: LINKS.leetcode },
      ],
    },
  ],

  achievements: [
    {
      lines: [
        "99.2 percentile in JEE Mains, qualified JEE Advanced — top 0.8% nationally.",
        "Top 5 finish at FORGE Buildathon among competing teams.",
      ],
      actions: [
        { label: "About Section", scrollTo: "about" },
        { label: "Projects", scrollTo: "projects" },
      ],
    },
  ],

  github: [
    {
      lines: [
        "GitHub has both production projects: CP Tracker and Hostel Management System.",
        "Clean backend architecture, documented APIs, and real deployment — not just practice repos.",
      ],
      actions: [
        { label: "Open GitHub", url: LINKS.github },
        { label: "Projects", scrollTo: "projects" },
      ],
    },
  ],

  linkedin: [
    {
      lines: [
        "LinkedIn has his education, projects, and professional background.",
        "Best place to connect for opportunities or collaboration.",
      ],
      actions: [
        { label: "Open LinkedIn", url: LINKS.linkedin },
        { label: "Contact", scrollTo: "contact" },
      ],
    },
  ],

  contact: [
    {
      lines: [
        `Reach Priyanshu at ${LINKS.email} — typically responds within 24 hours.`,
        "Also available on LinkedIn for professional outreach.",
      ],
      actions: [
        { label: "Send Email", url: `mailto:${LINKS.email}` },
        { label: "LinkedIn", url: LINKS.linkedin },
      ],
    },
  ],

  hire: [
    {
      lines: [
        "Priyanshu is actively open to backend-focused internships — available immediately.",
        "Strong backend + DSA combination, builds real systems, consistent problem-solving mindset.",
      ],
      actions: [
        { label: "Send Email", url: `mailto:${LINKS.email}` },
        { label: "LinkedIn", url: LINKS.linkedin },
        { label: "Resume", scrollTo: "about" },
      ],
    },
    {
      lines: [
        "He brings backend depth (Node.js, APIs, DB design) plus 300+ DSA problems.",
        "Open to teams building scalable or impactful backend systems.",
      ],
      actions: [
        { label: "Contact", scrollTo: "contact" },
        { label: "GitHub", url: LINKS.github },
      ],
    },
  ],

  resume: [
    {
      lines: [
        "Resume is available in the About section — covers projects, skills, and education.",
        "For the latest version, email him directly.",
      ],
      actions: [
        { label: "About Section", scrollTo: "about" },
        { label: "Email", url: `mailto:${LINKS.email}` },
      ],
    },
  ],
};

const FALLBACKS: ResponseData[] = [
  {
    lines: ["I can walk you through his projects, backend skills, DSA stats, or help you reach him."],
    actions: [
      { label: "Projects", scrollTo: "projects" },
      { label: "DSA Stats", scrollTo: "about" },
      { label: "Contact", scrollTo: "contact" },
    ],
  },
  {
    lines: ["Try asking about projects, skills, LeetCode, or how to hire him."],
    actions: [
      { label: "Projects", scrollTo: "projects" },
      { label: "Contact", scrollTo: "contact" },
    ],
  },
];

// ── Intent Matcher ────────────────────────────────────────────────────────────
function matchResponse(input: string): ResponseData {
  const q = normalize(input);
  const has = (...tokens: string[]) => tokens.some((t) => q.includes(t));

  const setIntent = (intent: string): ResponseData => {
    intentStack.push(intent);
    if (intentStack.length > 6) intentStack.shift();
    fallbackCount = 0;
    return pick(RESPONSES[intent]);
  };

  // Follow-up
  if (has("more", "details", "detail", "explain", "tell more", "elaborate", "go on", "expand")) {
    const ctx = intentStack[intentStack.length - 1];
    if (ctx && RESPONSES[ctx]) return pick(RESPONSES[ctx]);
  }

  if (has("hello", "hey", "hi", "howdy", "sup", "hii", "yo") || q === "hi")
    return setIntent("greeting");

  if (has("who are you", "what are you", "your name", "ur name", "who is this", "introduce yourself"))
    return setIntent("identity");

  if (has("who is priyanshu", "about him", "abt him", "about priyanshu", "tell me about", "what does he do"))
    return setIntent("about");

  if (has("education", "college", "nit", "jalandhar", "cgpa", "jee", "degree", "btech", "university"))
    return setIntent("education");

  if (has("tracker", "cp tracker", "competitive programming tracker", "graphql", "sm2", "spaced repetition"))
    return setIntent("tracker");

  if (has("hostel", "hostel management", "hostel system"))
    return setIntent("hostel");

  if (has("project", "work", "built", "build", "system", "api", "app"))
    return setIntent("projects");

  if (has("dsa", "data structure", "algorithm", "problem solv", "solved", "contest", "competitive"))
    return setIntent("dsa");

  if (has("leetcode", "leet code", "lc", "1469"))
    return setIntent("leetcode");

  if (has("codeforces", "code forces", "cf"))
    return setIntent("codeforces");

  if (has("skill", "tech", "stack", "node", "mongo", "backend", "express", "database", "framework"))
    return setIntent("skills");

  if (has("achievement", "jee", "percentile", "buildathon", "forge", "award", "accomplishment"))
    return setIntent("achievements");

  if (has("github", "repo", "repository"))
    return setIntent("github");

  if (has("linkedin", "linked in"))
    return setIntent("linkedin");

  if (has("hire", "hiring", "intern", "internship", "job", "role", "available", "open to", "recruit", "why hire"))
    return setIntent("hire");

  if (has("contact", "email", "reach", "connect", "mail"))
    return setIntent("contact");

  if (has("resume", "cv", "download"))
    return setIntent("resume");

  const fb = FALLBACKS[Math.min(fallbackCount, FALLBACKS.length - 1)];
  fallbackCount++;
  return fb;
}

// ── Quick Actions ─────────────────────────────────────────────────────────────
const QUICK_ACTIONS = [
  { label: "Projects",  input: "projects"  },
  { label: "DSA Stats", input: "dsa"       },
  { label: "Skills",    input: "skills"    },
  { label: "Hire Him",  input: "hire"      },
  { label: "Contact",   input: "contact"   },
];

// ── Action Button ─────────────────────────────────────────────────────────────
const ActionButton = ({ action }: { action: Action }) => (
  <button
    onClick={() => {
      if (action.url) window.open(action.url, "_blank", "noopener,noreferrer");
      else if (action.scrollTo) handleScroll(action.scrollTo);
    }}
    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.09] text-white/60 text-[11.5px] font-medium hover:border-cyan-500/45 hover:text-cyan-400 hover:bg-cyan-500/[0.07] hover:scale-[1.03] active:scale-[0.97] transition-all duration-200"
  >
    {action.label}
    {action.url
      ? <ExternalLink size={9} className="opacity-60" />
      : <ChevronRight size={9} className="opacity-60" />
    }
  </button>
);

// ── Bot Message ───────────────────────────────────────────────────────────────
const BotMessage = ({ msg }: { msg: Message }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.22, ease: "easeOut" }}
    className="flex justify-start mb-5 gap-2.5"
  >
    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shrink-0 mt-0.5 shadow-[0_0_8px_rgba(34,211,238,0.2)]">
      <span className="text-white text-[9px] font-black font-mono tracking-tight">PG</span>
    </div>
    <div className="max-w-[88%] flex flex-col gap-2">
      <div className="bg-white/[0.045] border border-white/[0.07] rounded-2xl rounded-tl-sm px-4 py-3.5 text-[13.5px] text-white/90 leading-[1.6]">
        {msg.content.map((line, i) => (
          <p key={i} className={i > 0 && line.length > 0 ? "mt-2.5 text-white/68" : ""}>
            {line}
          </p>
        ))}
      </div>
      {msg.actions && msg.actions.length > 0 && (
        <div className="flex flex-wrap gap-1.5 ml-0.5">
          {msg.actions.map((a, i) => (
            <ActionButton key={i} action={a} />
          ))}
        </div>
      )}
    </div>
  </motion.div>
);

// ── User Message ──────────────────────────────────────────────────────────────
const UserMessage = ({ msg }: { msg: Message }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.22, ease: "easeOut" }}
    className="flex justify-end mb-5"
  >
    <div className="max-w-[80%] px-4 py-3 rounded-2xl rounded-tr-sm bg-blue-500/[0.13] border border-blue-500/[0.18] text-white/90 text-[13.5px] leading-[1.6]">
      {msg.content[0]}
    </div>
  </motion.div>
);

// ── Typing Indicator ──────────────────────────────────────────────────────────
const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.2, ease: "easeOut" }}
    className="flex items-center gap-2.5 mb-5"
  >
    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.2)]">
      <span className="text-white text-[9px] font-black font-mono tracking-tight">PG</span>
    </div>
    <div className="flex items-center gap-[5px] px-4 py-3 rounded-2xl rounded-tl-sm bg-white/[0.04] border border-white/[0.07]">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-[5px] h-[5px] rounded-full bg-cyan-400/60"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
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
      content: [
        "Hey — I'm Priyanshu's portfolio assistant.",
        "Ask me about his projects, DSA stats, skills, or how to reach him.",
      ],
      actions: [
        { label: "Projects",  scrollTo: "projects" },
        { label: "DSA Stats", scrollTo: "about"    },
        { label: "Contact",   scrollTo: "contact"  },
      ],
      showQuick: true,
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);
  const idRef     = useRef(1);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;

    setMessages((prev) => [
      ...prev.map((m) => ({ ...m, showQuick: false })),
      { id: idRef.current++, role: "user" as const, content: [trimmed] },
    ]);
    setInput("");
    setTyping(true);

    const delay = Math.min(800, 300 + trimmed.length * 10);

    setTimeout(() => {
      const res = matchResponse(trimmed);
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: idRef.current++,
          role: "bot" as const,
          content: res.lines,
          actions: res.actions,
          showQuick: true,
        },
      ]);
      setTimeout(() => inputRef.current?.focus(), 60);
    }, delay);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.97 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-24 right-4 sm:right-6 w-[360px] sm:w-[400px] max-h-[580px] flex flex-col z-50 rounded-2xl overflow-hidden"
      style={{
        background: "rgba(2, 6, 23, 0.97)",
        backdropFilter: "blur(28px)",
        border: "1px solid rgba(34, 211, 238, 0.09)",
        boxShadow: "0 0 50px -14px rgba(34,211,238,0.07), 0 24px 56px -12px rgba(0,0,0,0.88)",
      }}
    >
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-5 py-[14px] border-b border-white/[0.05] shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600/25 to-cyan-500/25 border border-cyan-500/20 flex items-center justify-center">
            <span className="text-cyan-400 font-black font-mono text-[11px] tracking-tight">PG</span>
          </div>
          <div>
            <p className="text-[13.5px] font-bold text-white leading-none">Portfolio Assistant</p>
            <div className="flex items-center gap-1.5 mt-[5px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-white/30 text-[10px] font-mono uppercase tracking-widest leading-none">Online</p>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-full flex items-center justify-center text-white/25 hover:text-white/70 hover:bg-white/[0.07] transition-all"
        >
          <X size={14} />
        </button>
      </div>

      {/* ── Messages ── */}
      <div
        className="flex-1 overflow-y-auto px-5 pt-5 pb-3 min-h-[300px]"
        style={{ scrollbarWidth: "none" }}
      >
        {messages.map((msg) =>
          msg.role === "bot" ? (
            <div key={msg.id}>
              <BotMessage msg={msg} />
              {msg.showQuick && !typing && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.2, ease: "easeOut" }}
                  className="flex flex-wrap gap-1.5 mb-5 ml-9"
                >
                  {QUICK_ACTIONS.map((a, i) => (
                    <motion.button
                      key={a.input}
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05, duration: 0.18, ease: "easeOut" }}
                      onClick={() => sendMessage(a.input)}
                      className="px-2.5 py-1 rounded-md border border-white/[0.07] text-white/35 text-[10.5px] font-medium hover:border-cyan-500/35 hover:text-cyan-400 hover:bg-cyan-500/[0.06] hover:scale-[1.04] active:scale-[0.97] transition-all duration-200"
                    >
                      {a.label}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </div>
          ) : (
            <UserMessage key={msg.id} msg={msg} />
          )
        )}
        {typing && <TypingIndicator />}
        <div ref={bottomRef} className="h-1" />
      </div>

      {/* ── Input ── */}
      <div className="px-4 py-3.5 border-t border-white/[0.05] flex items-center gap-2.5 shrink-0">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
          placeholder="Ask about projects, skills, DSA..."
          className="flex-1 bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-[11px] text-[13px] text-white placeholder-white/20 outline-none focus:border-cyan-500/25 focus:bg-white/[0.05] transition-all leading-none"
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={!input.trim() || typing}
          className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center hover:scale-[1.06] hover:shadow-[0_0_12px_rgba(34,211,238,0.3)] active:scale-[0.95] disabled:opacity-25 disabled:hover:scale-100 disabled:hover:shadow-none transition-all duration-200 shrink-0"
        >
          <Send size={14} className="text-white translate-x-[1px]" />
        </button>
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
    className="fixed bottom-6 right-4 sm:right-6 w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center z-50 shadow-[0_0_28px_rgba(34,211,238,0.35)] hover:shadow-[0_0_40px_rgba(34,211,238,0.55)] transition-shadow"
    aria-label="Open portfolio assistant"
  >
    {!isOpen && <span className="absolute inset-0 rounded-full bg-cyan-400/30 animate-ping" />}
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
      <AnimatePresence>
        {isOpen && <ChatPanel onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
      <ChatButton onClick={() => setIsOpen((p) => !p)} isOpen={isOpen} />
    </>
  );
}
