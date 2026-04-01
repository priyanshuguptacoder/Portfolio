import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, ChevronRight } from "lucide-react";

// ─────────────────────────────────────────────
// RESPONSE CONTENT (structured, recruiter-ready)
// ─────────────────────────────────────────────
const EMAIL = "mailto:priyanshuguptanitian9696@gmail.com";

interface ResponseData {
  lines: string[];
  showCta?: boolean;
}

const RESPONSES: Record<string, ResponseData> = {
  projects: {
    lines: [
      "I've built backend systems focused on real-world scalability:",
      "",
      "• LeetCode Tracker — analytics engine, SM-2 spaced repetition, streak logic",
      "• Hostel Management System — JWT auth, RBAC, optimized REST APIs",
      "",
      "Both projects reflect strong backend architecture, clean API design, and performance thinking.",
    ],
    showCta: true,
  },
  skills: {
    lines: [
      "My core stack is backend-first:",
      "",
      "• Backend — Node.js, Express, MongoDB, REST APIs",
      "• CS Fundamentals — DSA, System Design, DBMS",
      "• Frontend — React, JavaScript (supporting role)",
      "• Tools — Git, GitHub, Postman, VS Code",
      "",
      "I prioritize clean architecture and scalable systems over surface-level features.",
    ],
    showCta: false,
  },
  dsa: {
    lines: [
      "Problem solving is a consistent habit, not a one-time effort:",
      "",
      "• 260+ problems solved on LeetCode",
      "• Easy: 104 · Medium: 140 · Hard: 16",
      "• Patterns: Sliding Window, Binary Search, DP, Backtracking, Graphs",
      "",
      "Consistent practice across 6+ months — the numbers reflect real discipline.",
    ],
    showCta: false,
  },
  internship: {
    lines: [
      "Yes — actively open to backend-focused internships.",
      "",
      "• Available immediately and open to remote/hybrid",
      "• Looking for teams building scalable or impactful backend systems",
      "• Open to product, SaaS, or infrastructure-focused roles",
      "",
      "If your team moves fast and values clean systems, I'd love to connect.",
    ],
    showCta: true,
  },
  contact: {
    lines: [
      "Reach me directly — no forms, no friction:",
      "",
      "• Email → priyanshuguptanitian9696@gmail.com",
      "• GitHub → github.com/priyanshuguptacoder",
      "• LinkedIn → linkedin.com/in/priyanshu-gupta-b98689376",
      "",
      "I check email daily and respond within 24 hours.",
    ],
    showCta: true,
  },
  resume: {
    lines: [
      "My resume covers everything from projects to problem-solving stats.",
      "",
      "• Full tech stack breakdown",
      "• Project architecture summaries",
      "• Education at NIT Jalandhar (CSE)",
      "",
      "Reach out via email and I'll send the latest version directly.",
    ],
    showCta: true,
  },
  fallback: {
    lines: [
      "I didn't quite get that — but I can help with:",
      "",
      "• Projects & architecture",
      "• Tech stack & skills",
      "• Problem solving stats",
      "• How to contact me",
    ],
    showCta: false,
  },
};

// ─────────────────────────────────────────────
// KEYWORD MATCHER
// ─────────────────────────────────────────────
function matchResponse(input: string): ResponseData {
  const q = input.toLowerCase();
  if (q.includes("dsa") || q.includes("leetcode") || q.includes("problem") || q.includes("algorithm"))
    return RESPONSES.dsa;
  if (q.includes("project") || q.includes("built") || q.includes("work") || q.includes("backend") || q.includes("api") || q.includes("system"))
    return RESPONSES.projects;
  if (q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("language") || q.includes("node") || q.includes("mongo"))
    return RESPONSES.skills;
  if (q.includes("intern") || q.includes("available") || q.includes("hire") || q.includes("job") || q.includes("open"))
    return RESPONSES.internship;
  if (q.includes("contact") || q.includes("email") || q.includes("reach") || q.includes("connect"))
    return RESPONSES.contact;
  if (q.includes("resume") || q.includes("cv") || q.includes("download"))
    return RESPONSES.resume;
  return RESPONSES.fallback;
}

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────
interface Message {
  id: number;
  role: "bot" | "user";
  lines?: string[];
  text?: string;
  showCta?: boolean;
}

const QUICK_ACTIONS = [
  { label: "🚀 View My Projects", key: "projects" },
  { label: "⚙️ My Tech Stack", key: "skills" },
  { label: "📊 Problem Solving", key: "dsa" },
  { label: "📧 Contact Me", key: "contact" },
];

const FOLLOW_UPS = [
  { label: "View Projects", key: "projects" },
  { label: "See Skills", key: "skills" },
  { label: "Contact Me", key: "contact" },
];

// ─────────────────────────────────────────────
// STRUCTURED BOT MESSAGE
// ─────────────────────────────────────────────
const BotMessage = ({ msg, onAction }: { msg: Message; onAction: (key: string) => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex justify-start mb-4 gap-2"
  >
    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shrink-0 mt-1 shadow-[0_0_12px_rgba(34,211,238,0.35)]">
      <Bot size={13} className="text-white" />
    </div>
    <div className="max-w-[85%] flex flex-col gap-2">
      <div className="bg-white/[0.04] border border-white/[0.07] rounded-2xl rounded-tl-sm px-4 py-3.5 text-sm text-white/80 leading-relaxed">
        {msg.lines?.map((line, i) =>
          line === "" ? (
            <div key={i} className="h-2" />
          ) : line.startsWith("•") ? (
            <div key={i} className="flex items-start gap-2 my-0.5">
              <span className="text-cyan-400 mt-0.5 shrink-0">▸</span>
              <span className="text-white/70">{line.slice(2)}</span>
            </div>
          ) : (
            <p key={i} className={i === 0 ? "text-white font-semibold" : "text-white/60 text-xs mt-1"}>
              {line}
            </p>
          )
        )}
      </div>
      {msg.showCta && (
        <a
          href={EMAIL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 hover:underline underline-offset-2 transition-colors"
        >
          Want to work together? → Email Me
        </a>
      )}
      <div className="flex flex-wrap gap-1.5 mt-1">
        {FOLLOW_UPS.map((f) => (
          <button
            key={f.key}
            onClick={() => onAction(f.key)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-white/[0.08] text-white/40 text-[10px] font-medium hover:border-cyan-500/40 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all duration-200"
          >
            {f.label} <ChevronRight size={10} />
          </button>
        ))}
      </div>
    </div>
  </motion.div>
);

// ─────────────────────────────────────────────
// USER MESSAGE
// ─────────────────────────────────────────────
const UserMessage = ({ msg }: { msg: Message }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex justify-end mb-4"
  >
    <div className="max-w-[80%] px-4 py-3 rounded-2xl rounded-tr-sm bg-gradient-to-r from-blue-500/80 to-cyan-500/80 text-white text-sm font-medium">
      {msg.text}
    </div>
  </motion.div>
);

// ─────────────────────────────────────────────
// TYPING INDICATOR
// ─────────────────────────────────────────────
const TypingIndicator = () => (
  <div className="flex items-center gap-2 mb-4">
    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(34,211,238,0.35)]">
      <Bot size={13} className="text-white" />
    </div>
    <div className="flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-tl-sm bg-white/[0.04] border border-white/[0.07]">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  </div>
);

// ─────────────────────────────────────────────
// CHAT PANEL
// ─────────────────────────────────────────────
const ChatPanel = ({ onClose }: { onClose: () => void }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "bot",
      lines: [
        "Hi — I'm Priyanshu's assistant.",
        "",
        "I can quickly walk you through his work, skills, and problem-solving experience.",
      ],
      showCta: false,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const idRef = useRef(1);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim() || isTyping) return;
    setShowQuickActions(false);
    const userMsg: Message = { id: idRef.current++, role: "user", text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const data = matchResponse(text);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: idRef.current++, role: "bot", lines: data.lines, showCta: data.showCta },
      ]);
    }, 600 + Math.random() * 400);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="fixed bottom-24 right-4 sm:right-6 w-[340px] sm:w-[380px] max-h-[560px] flex flex-col z-50 rounded-2xl overflow-hidden"
      style={{
        background: "rgba(2, 6, 23, 0.92)",
        backdropFilter: "blur(28px)",
        border: "1px solid rgba(34, 211, 238, 0.12)",
        boxShadow: "0 0 60px -15px rgba(34, 211, 238, 0.12), 0 30px 80px -20px rgba(0,0,0,0.8)",
      }}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06] shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.4)]">
            <Bot size={17} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-bold bg-gradient-to-r from-white to-white/70 text-transparent bg-clip-text leading-none">
              Ask about Priyanshu
            </p>
            <p className="text-white/30 text-[10px] mt-0.5 font-mono">Portfolio Assistant · instant replies</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-full flex items-center justify-center text-white/30 hover:text-white hover:bg-white/10 transition-all"
        >
          <X size={15} />
        </button>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-2 min-h-0" style={{ scrollbarWidth: "none" }}>
        {messages.map((msg) =>
          msg.role === "bot" ? (
            <BotMessage key={msg.id} msg={msg} onAction={sendMessage} />
          ) : (
            <UserMessage key={msg.id} msg={msg} />
          )
        )}
        {isTyping && <TypingIndicator />}

        {/* Quick actions — only on first load */}
        {showQuickActions && !isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-2 mb-4 ml-9"
          >
            {QUICK_ACTIONS.map((a, i) => (
              <motion.button
                key={a.key}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => sendMessage(a.key)}
                className="text-left px-4 py-2.5 rounded-xl border border-white/[0.08] text-white/60 text-xs font-medium hover:border-cyan-500/40 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all duration-200 w-full"
              >
                {a.label}
              </motion.button>
            ))}
          </motion.div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <div className="px-4 py-3.5 border-t border-white/[0.06] flex items-center gap-2.5 shrink-0">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
          placeholder="Ask about projects, skills, or contact..."
          className="flex-1 bg-white/[0.04] border border-white/[0.07] rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-cyan-500/40 transition-colors"
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={!input.trim() || isTyping}
          className="w-9 h-9 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform disabled:opacity-25 shrink-0"
        >
          <Send size={15} className="text-white" />
        </button>
      </div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// CHAT BUTTON
// ─────────────────────────────────────────────
const ChatButton = ({ onClick, isOpen }: { onClick: () => void; isOpen: boolean }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="fixed bottom-6 right-4 sm:right-6 w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center z-50 shadow-[0_0_30px_rgba(99,102,241,0.45)] hover:shadow-[0_0_45px_rgba(99,102,241,0.65)] transition-shadow"
    aria-label="Open portfolio assistant"
  >
    {!isOpen && <span className="absolute w-full h-full rounded-full bg-blue-500/40 animate-ping" />}
    <AnimatePresence mode="wait">
      {isOpen ? (
        <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
          <X size={22} className="text-white" />
        </motion.div>
      ) : (
        <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
          <MessageCircle size={22} className="text-white" />
        </motion.div>
      )}
    </AnimatePresence>
  </motion.button>
);

// ─────────────────────────────────────────────
// EXPORT
// ─────────────────────────────────────────────
const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <AnimatePresence>{isOpen && <ChatPanel onClose={() => setIsOpen(false)} />}</AnimatePresence>
      <ChatButton onClick={() => setIsOpen((p) => !p)} isOpen={isOpen} />
    </>
  );
};

export default ChatAssistant;
