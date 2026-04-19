import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

// Response content
const EMAIL = "mailto:priyanshuguptanitian9696@gmail.com";

interface ResponseData {
  lines: string[];
  showCta?: boolean;
}

const RESPONSES: Record<string, ResponseData> = {
  greeting: {
    lines: [
      "Hey - I can walk you through Priyanshu's work, projects, and problem-solving background.",
      "Want a quick overview or looking for something specific?"
    ],
  },
  identity: {
    lines: [
      "I'm Priyanshu’s portfolio assistant — I help you quickly explore his work, projects, and problem-solving background.",
    ],
  },
  about: {
    lines: [
      "Priyanshu is a backend-focused developer. He’s solved 280+ DSA problems and actively improves through competitive programming on Codeforces.",
      "Most of his work focuses on building scalable APIs and real-world systems."
    ],
  },
  projects: {
    lines: [
      "He builds backend-focused applications with API design and clean architecture.",
      "Want me to show his best project?"
    ],
  },
  dsa: {
    lines: [
      "He has solved 280+ problems on LeetCode and is actively improving on Codeforces.",
      "Strong focus on patterns, consistency, and contest performance."
    ],
  },
  skills: {
    lines: [
      "Focused on backend development, APIs, databases, and strong DSA fundamentals."
    ],
  },
  contact: {
    lines: [
      "Email him directly at priyanshuguptanitian9696@gmail.com - he usually responds within 24 hours.",
      "No forms, no friction."
    ],
    showCta: true,
  }
};

const FOLLOW_UP = "Want to see his projects or problem-solving stats?";

const QUICK_ACTIONS = [
  { label: "🚀 View Projects", key: "projects" },
  { label: "🧠 Problem Solving", key: "dsa" },
  { label: "⚙️ Tech Stack", key: "skills" },
  { label: "📩 Contact", key: "contact" },
];

// Normalize and match
let fallbackCount = 0;

function normalize(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ");
}

function matchResponse(input: string): ResponseData {
  const q = normalize(input);
  const has = (...tokens: string[]) => tokens.some(t => q.includes(t));

  // Identity/Name
  if (has("name", "who are you", "who is this", "what is your name", "whats your name", "who are u")) {
    fallbackCount = 0;
    return RESPONSES.identity;
  }

  // About
  if (has("about", "who is priyanshu", "tell me about", "bio", "background", "introduce")) {
    fallbackCount = 0;
    return RESPONSES.about;
  }

  // Projects
  if (has("project", "built", "build", "portfolio", "work", "apps", "application")) {
    fallbackCount = 0;
    return RESPONSES.projects;
  }

  // DSA
  if (has("leetcode", "codeforces", "dsa", "problem", "solve", "solving", "stat", "rating", "contest")) {
    fallbackCount = 0;
    return RESPONSES.dsa;
  }

  // Skills
  if (has("skill", "tech", "stack", "language", "node", "backend", "mongo", "javascript", "typescript")) {
    fallbackCount = 0;
    return RESPONSES.skills;
  }

  // Contact
  if (has("contact", "email", "reach", "reach him", "hire", "hire him", "touch", "mail")) {
    fallbackCount = 0;
    return RESPONSES.contact;
  }

  // Fallback system with state awareness
  fallbackCount++;
  
  if (fallbackCount > 1) {
    return {
      lines: [
        "I'm still learning! Try searching for 'projects', 'DSA', or 'contact'.",
        "Or use the quick actions below to navigate."
      ]
    };
  }

  return {
    lines: [
      "I can walk you through his projects, backend work, or problem-solving stats.",
      "What are you curious about?"
    ]
  };
}

// Types
interface Message {
  id: number;
  role: "bot" | "user";
  lines?: string[];
  text?: string;
  showCta?: boolean;
  showActions?: boolean;
}

// Sub-components
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
          Email Priyanshu
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

// Chat Panel
const ChatPanel = ({ onClose }: { onClose: () => void }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "bot",
      lines: [
        "Hey - I can walk you through Priyanshu's work, projects, and problem-solving background.",
        "Want a quick overview or looking for something specific?"
      ],
      showActions: true,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(1);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim() || isTyping) return;

    setMessages((prev) => [
      ...prev.map(m => ({ ...m, showActions: false })),
      { id: idRef.current++, role: "user" as const, text: text.trim() },
    ]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const data = matchResponse(text);
      setIsTyping(false);
      
      // Add follow-up if it's not a fallback and not the identity response (or actually user said follow up on all)
      const finalLines = [...data.lines];
      if (fallbackCount === 0) {
        finalLines.push(FOLLOW_UP);
      }

      setMessages((prev) => [
        ...prev,
        { 
          id: idRef.current++, 
          role: "bot" as const, 
          lines: finalLines, 
          showCta: data.showCta, 
          showActions: true 
        },
      ]);
    }, 450 + Math.random() * 200);
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
            <p className="text-sm font-bold text-white leading-none">Portfolio Guide</p>
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
            <div key={msg.id}>
              <BotMessage msg={msg} />
              {msg.showActions && !isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-wrap gap-2 mb-4 ml-9"
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
            </div>
          ) : (
            <UserMessage key={msg.id} msg={msg} />
          )
        )}
        {isTyping && <TypingIndicator />}
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

// Chat Button
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

// Main Export
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
