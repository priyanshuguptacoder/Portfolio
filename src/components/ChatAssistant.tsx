import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot } from "lucide-react";

// ─────────────────────────────────────────────
// RESPONSE CONTENT
// ─────────────────────────────────────────────
const EMAIL = "mailto:priyanshuguptanitian9696@gmail.com";

interface ResponseData {
  lines: string[];
  showCta?: boolean;
}

const RESPONSES: Record<string, ResponseData> = {
  identity: {
    lines: [
      "I’m part of Priyanshu’s portfolio — built to help you quickly understand what he’s worked on and where he’s strong.",
      "I can show you his projects, explain his backend work, or walk you through his problem-solving stats."
    ],
  },
  projects_overview: {
    lines: [
      "Most of his projects focus on backend systems — APIs, tracking systems, and scalable logic.",
      "Want me to show his strongest project right now?"
    ],
  },
  projects_detailed: {
    lines: [
      "His strongest work is the Competitive Programming Tracker.",
      "It features REST API sync pipelines, streak computation logic, and a scalable Node.js/MongoDB backend.",
      "Want to see his other projects or explore his tech stack?"
    ],
    showCta: true,
  },
  dsa: {
    lines: [
      "Priyanshu has solved 280+ DSA problems on LeetCode and is actively improving through Codeforces contests.",
      "Strong focus on patterns and consistency.",
      "Want details on his tech stack next?"
    ],
  },
  skills: {
    lines: [
      "Primarily backend-focused — Node.js, Express, databases — with strong DSA foundations.",
      "He prioritizes scalable architecture over surface-level features.",
      "Want to see how he applies this in his projects?"
    ],
  },
  internship: {
    lines: [
      "Yes, he's actively open to backend-focused internships and available immediately.",
      "He's looking for teams building scalable or impactful backend systems.",
      "Want to grab his email to connect?"
    ],
  },
  contact: {
    lines: [
      "You can email him directly at priyanshuguptanitian9696@gmail.com.",
      "He usually responds within 24 hours. No forms, no friction.",
      "Want a copy of his resume?"
    ],
    showCta: true,
  },
  resume: {
    lines: [
      "Shoot him an email and he'll send the latest resume version straight to you.",
      "Want to check out his projects while you wait?"
    ],
  },
  fallback: {
    lines: [
      "I didn't quite catch that.",
      "I can explain his backend systems, show his problem-solving stats, or give you his contact info. What sounds best?"
    ],
  },
};

// ─────────────────────────────────────────────
// KEYWORD MATCHER
// ─────────────────────────────────────────────
function matchResponse(input: string): ResponseData {
  const q = input.toLowerCase();
  
  if (q.includes("who are you") || q.includes("what are you") || q.includes("what can you do"))
    return RESPONSES.identity;

  if (q.includes("best project") || q.includes("strongest") || (q.includes("project") && q.includes("detail")))
    return RESPONSES.projects_detailed;

  if (q.includes("project") || q.includes("work") || q.includes("build") || q.includes("system") || q.includes("api"))
    return RESPONSES.projects_overview;

  if (q.includes("dsa") || q.includes("leetcode") || q.includes("problem") || q.includes("algorithm") || q.includes("codeforces") || q.includes("contest"))
    return RESPONSES.dsa;

  if (q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("language") || q.includes("node") || q.includes("mongo") || q.includes("backend"))
    return RESPONSES.skills;

  if (q.includes("intern") || q.includes("available") || q.includes("hire") || q.includes("job") || q.includes("role"))
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
  { label: "🚀 View Projects", key: "projects" },
  { label: "🧠 Problem Solving", key: "dsa" },
  { label: "⚙️ Tech Stack", key: "skills" },
  { label: "📩 Contact", key: "contact" },
];

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────
const BotMessage = ({ msg }: { msg: Message }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex justify-start mb-5 gap-2"
  >
    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shrink-0 mt-1 shadow-[0_0_12px_rgba(34,211,238,0.35)]">
      <span className="text-white text-xs font-bold font-mono">P</span>
    </div>
    <div className="max-w-[88%] flex flex-col gap-2">
      <div className="bg-white/[0.04] border border-white/[0.07] rounded-2xl rounded-tl-sm px-4 py-3.5 text-[13px] text-white/90 leading-relaxed shadow-sm">
        {msg.lines?.map((line, i) => (
          <p key={i} className={`tracking-wide ${i > 0 && line.length > 0 ? "mt-3" : ""}`}>
            {line}
          </p>
        ))}
      </div>
      {msg.showCta && (
        <a
          href={EMAIL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[11px] font-bold text-cyan-400 hover:text-cyan-300 transition-colors ml-1"
        >
          Email Priyanshu ↗
        </a>
      )}
    </div>
  </motion.div>
);

const UserMessage = ({ msg }: { msg: Message }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex justify-end mb-5"
  >
    <div className="max-w-[85%] px-4 py-3 rounded-2xl rounded-tr-sm bg-blue-500/10 border border-blue-500/20 text-white/90 text-[13px] tracking-wide shadow-sm">
      {msg.text}
    </div>
  </motion.div>
);

const TypingIndicator = () => (
  <div className="flex items-center gap-2 mb-4">
    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(34,211,238,0.35)]">
      <span className="text-white text-xs font-bold font-mono">P</span>
    </div>
    <div className="flex items-center gap-1.5 px-4 py-3.5 rounded-2xl rounded-tl-sm bg-white/[0.04] border border-white/[0.07]">
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

const ChatPanel = ({ onClose }: { onClose: () => void }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "bot",
      lines: [
        "Hey — I can walk you through Priyanshu’s work, projects, and problem-solving background.",
        "Want a quick overview or looking for something specific?"
      ],
      showCta: false,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(1);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim() || isTyping) return;
    setShowQuickActions(false);
    
    setMessages((prev) => [...prev, { id: idRef.current++, role: "user", text: text.trim() }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const data = matchResponse(text);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: idRef.current++, role: "bot", lines: data.lines, showCta: data.showCta },
      ]);
    }, 450 + Math.random() * 200); // 450-650ms delay for natural feel
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="fixed bottom-24 right-4 sm:right-6 w-[340px] sm:w-[380px] max-h-[580px] flex flex-col z-50 rounded-2xl overflow-hidden"
      style={{
        background: "rgba(2, 6, 23, 0.94)",
        backdropFilter: "blur(24px)",
        border: "1px solid rgba(34, 211, 238, 0.12)",
        boxShadow: "0 0 50px -10px rgba(34, 211, 238, 0.1), 0 25px 60px -15px rgba(0,0,0,0.8)",
      }}
    >
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06] shrink-0 bg-white/[0.01]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
            <span className="text-cyan-400 font-bold font-mono text-sm leading-none pt-0.5">PG</span>
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-none">
              Portfolio Guide
            </p>
            <p className="text-white/30 text-[10px] mt-1 font-mono uppercase tracking-widest leading-none">Ready to explain</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-full flex items-center justify-center text-white/30 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X size={15} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-2 min-h-[300px]" style={{ scrollbarWidth: "none" }}>
        {messages.map((msg) =>
          msg.role === "bot" ? (
            <BotMessage key={msg.id} msg={msg} />
          ) : (
            <UserMessage key={msg.id} msg={msg} />
          )
        )}
        {isTyping && <TypingIndicator />}

        {showQuickActions && !isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-2 mb-4 mt-2"
          >
            {QUICK_ACTIONS.map((a, i) => (
              <motion.button
                key={a.key}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => sendMessage(a.key)}
                className="px-3 py-1.5 rounded-lg border border-white/[0.08] text-white/60 text-[11px] font-medium hover:border-cyan-500/40 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all shadow-sm flex items-center gap-1.5"
              >
                {a.label}
              </motion.button>
            ))}
          </motion.div>
        )}
        <div ref={bottomRef} className="h-1" />
      </div>

      <div className="px-4 py-3.5 border-t border-white/[0.06] flex items-center gap-2 shrink-0 bg-white/[0.01]">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
          placeholder="Ask me anything..."
          className="flex-1 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-2.5 text-[13px] text-white placeholder-white/20 outline-none focus:border-cyan-500/30 focus:bg-white/[0.05] transition-all"
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={!input.trim() || isTyping}
          className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] disabled:opacity-30 disabled:hover:shadow-none transition-all shrink-0"
        >
          <Send size={15} className="text-white relative right-0.5" />
        </button>
      </div>
    </motion.div>
  );
};

const ChatButton = ({ onClick, isOpen }: { onClick: () => void; isOpen: boolean }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="fixed bottom-6 right-4 sm:right-6 w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center z-50 shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:shadow-[0_0_40px_rgba(34,211,238,0.6)] transition-all"
    aria-label="Open portfolio guide"
  >
    {!isOpen && <span className="absolute inset-0 rounded-full bg-cyan-400/40 animate-ping" />}
    <AnimatePresence mode="wait">
      {isOpen ? (
        <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
          <X size={24} className="text-white" />
        </motion.div>
      ) : (
        <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
          <MessageCircle size={24} className="text-white" />
        </motion.div>
      )}
    </AnimatePresence>
  </motion.button>
);

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
