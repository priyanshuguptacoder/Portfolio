import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot } from "lucide-react";

// ─────────────────────────────────────────────
// RESPONSE ENGINE (keyword matching)
// ─────────────────────────────────────────────
const EMAIL = "mailto:priyanshuguptanitian9696@gmail.com";

const responses: Record<string, string> = {
  projects:
    "I've built backend-focused systems like a LeetCode Tracker with real-time analytics & SM-2 spaced repetition, and a Hostel Management System with JWT-based RBAC and optimized REST API design.",
  skills:
    "I specialize in backend development using Node.js, Express, and MongoDB with strong fundamentals in DSA, System Design, and REST API architecture.",
  internship:
    "I'm actively looking for backend internships and open to working on impactful, scalable systems starting immediately.",
  contact:
    "You can reach me directly via email at priyanshuguptanitian9696@gmail.com, or check out my work on GitHub and LinkedIn.",
  fallback:
    "I'm not sure about that — but I can tell you about my projects, skills, or how to contact me. Try one of the quick buttons!",
};

function getResponse(input: string): string {
  const q = input.toLowerCase();
  if (q.includes("project") || q.includes("work") || q.includes("built"))
    return responses.projects;
  if (q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("language"))
    return responses.skills;
  if (q.includes("intern") || q.includes("available") || q.includes("hire") || q.includes("job"))
    return responses.internship;
  if (q.includes("contact") || q.includes("email") || q.includes("reach"))
    return responses.contact;
  return responses.fallback;
}

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────
interface Message {
  id: number;
  role: "bot" | "user";
  text: string;
}

const QUICK_ACTIONS = [
  { label: "🚀 Projects", key: "projects" },
  { label: "⚙️ Skills", key: "skills" },
  { label: "📅 Availability", key: "internship" },
  { label: "📧 Contact", key: "contact" },
];

// ─────────────────────────────────────────────
// CTA FOOTER
// ─────────────────────────────────────────────
const CtaRow = () => (
  <a
    href={EMAIL}
    target="_blank"
    rel="noopener noreferrer"
    className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
  >
    Want to work together? → Email Me
  </a>
);

// ─────────────────────────────────────────────
// TYPING INDICATOR
// ─────────────────────────────────────────────
const TypingIndicator = () => (
  <div className="flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-tl-sm bg-white/5 border border-white/5 w-fit">
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce"
        style={{ animationDelay: `${i * 0.15}s` }}
      />
    ))}
  </div>
);

// ─────────────────────────────────────────────
// MESSAGE BUBBLE
// ─────────────────────────────────────────────
const MessageBubble = ({ msg }: { msg: Message }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} mb-3`}
  >
    {msg.role === "bot" && (
      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mr-2 mt-1 shrink-0">
        <Bot size={12} className="text-white" />
      </div>
    )}
    <div className={`max-w-[82%] ${msg.role === "user" ? "" : "flex flex-col"}`}>
      <div
        className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          msg.role === "user"
            ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-tr-sm font-medium"
            : "bg-white/5 border border-white/5 text-white/80 rounded-tl-sm"
        }`}
      >
        {msg.text}
      </div>
      {msg.role === "bot" && <CtaRow />}
    </div>
  </motion.div>
);

// ─────────────────────────────────────────────
// CHAT PANEL
// ─────────────────────────────────────────────
interface ChatPanelProps {
  onClose: () => void;
}

const ChatPanel = ({ onClose }: ChatPanelProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "bot",
      text: "Hi! I can quickly tell you about my projects, skills, and experience.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const idRef = useRef(1);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: idRef.current++, role: "user", text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    const delay = 500 + Math.random() * 400;
    setTimeout(() => {
      setIsTyping(false);
      const botMsg: Message = {
        id: idRef.current++,
        role: "bot",
        text: getResponse(text),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, delay);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="fixed bottom-24 right-4 sm:right-6 w-[340px] sm:w-[370px] max-h-[520px] flex flex-col z-50 rounded-2xl overflow-hidden"
      style={{
        background: "rgba(2, 6, 23, 0.85)",
        backdropFilter: "blur(24px)",
        border: "1px solid rgba(34, 211, 238, 0.15)",
        boxShadow: "0 0 40px -10px rgba(34, 211, 238, 0.15), 0 25px 60px -15px rgba(0,0,0,0.7)",
      }}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.4)]">
            <Bot size={16} className="text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-none">Ask about Priyanshu</p>
            <p className="text-white/40 text-[10px] mt-0.5">Quick answers about my work</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
        >
          <X size={15} />
        </button>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-2 scrollbar-hide min-h-0">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} />
        ))}
        {isTyping && (
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shrink-0">
              <Bot size={12} className="text-white" />
            </div>
            <TypingIndicator />
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* QUICK ACTIONS (only if 1 message) */}
      {messages.length === 1 && (
        <div className="flex flex-wrap gap-2 px-4 py-3 border-t border-white/5">
          {QUICK_ACTIONS.map((action) => (
            <button
              key={action.key}
              onClick={() => { inputRef.current?.focus(); sendMessage(action.key); }}
              className="px-3 py-1.5 rounded-lg border border-white/10 text-white/60 text-xs font-medium hover:border-cyan-500/40 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all duration-200"
            >
              {action.label}
            </button>
          ))}
        </div>
      )}

      {/* INPUT */}
      <div className="px-4 py-3 border-t border-white/5 flex items-center gap-3 shrink-0">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
          placeholder="Ask me anything..."
          className="flex-1 bg-white/5 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-cyan-500/40 transition-colors"
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={!input.trim()}
          className="w-9 h-9 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform disabled:opacity-30 shrink-0"
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
interface ChatButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

const ChatButton = ({ onClick, isOpen }: ChatButtonProps) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="fixed bottom-6 right-4 sm:right-6 w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center z-50 shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:shadow-[0_0_40px_rgba(99,102,241,0.6)] transition-shadow"
    aria-label="Open portfolio assistant"
  >
    {/* Pulse ring */}
    {!isOpen && (
      <span className="absolute w-full h-full rounded-full bg-blue-500/50 animate-ping" />
    )}
    <AnimatePresence mode="wait">
      {isOpen ? (
        <motion.div
          key="close"
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <X size={22} className="text-white" />
        </motion.div>
      ) : (
        <motion.div
          key="open"
          initial={{ rotate: 90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: -90, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <MessageCircle size={22} className="text-white" />
        </motion.div>
      )}
    </AnimatePresence>
  </motion.button>
);

// ─────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────
const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AnimatePresence>{isOpen && <ChatPanel onClose={() => setIsOpen(false)} />}</AnimatePresence>
      <ChatButton onClick={() => setIsOpen((prev) => !prev)} isOpen={isOpen} />
    </>
  );
};

export default ChatAssistant;
