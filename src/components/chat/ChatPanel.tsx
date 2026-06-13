import { useEffect, useRef, useState, type TouchEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { type Message, PROFILE, SWIPE_DOWN_THRESHOLD, SWIPE_HORIZONTAL_TOLERANCE, MAX_TYPING_DELAY, BASE_TYPING_DELAY, TYPING_DELAY_PER_CHAR } from "./types";
import { formatTimestamp, matchResponse } from "./helpers";
import { CONTEXT_QUICK_REPLIES, DEFAULT_QUICK_REPLIES } from "./data";
import { BotMessage, UserMessage } from "./MessageBubble";
import { ChatInput } from "./ChatInput";
import { ThinkingState } from "./ThinkingState";

export const ChatPanel = ({ onClose }: { onClose: () => void }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "bot",
      variant: "welcome",
      content: [
        "Hi there — I'm Priyanshu's AI portfolio assistant.",
        "Ask me anything about his backend work, projects, coding profile, or internship availability.",
        "I’ll surface the most relevant details and quick actions instantly.",
      ],
      timestamp: formatTimestamp(),
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  
  const bottomRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(1);
  const intentStackRef = useRef<string[]>([]);
  const fallbackCountRef = useRef(0);
  const touchStart = useRef<{ y: number; x: number } | null>(null);

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

    // More natural typing simulation with variation
    const baseDelay = 400;
    const charDelay = 30;
    const maxDelay = 2000;
    const randomFactor = Math.random() * 200; // Add randomness for natural feel
    const delay = Math.min(maxDelay, baseDelay + trimmed.length * charDelay + randomFactor);

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
    }, delay);
  };

  return (
    <motion.div
      id="chat-panel"
      role="dialog"
      aria-modal="true"
      aria-label="Priyanshu AI Assistant"
      initial={{ opacity: 0, y: 40, scale: 0.9, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(4px)" }}
      transition={{ type: "spring", damping: 26, stiffness: 260, mass: 0.8 }}
      style={{ transformOrigin: "bottom right" }}
      className="chat-panel fixed bottom-4 sm:bottom-6 right-4 sm:right-6 w-[96vw] sm:w-[400px] h-[60vh] sm:h-[520px] max-h-[calc(100vh-28px)] flex flex-col z-50 rounded-[28px] overflow-hidden border border-white/[0.1] bg-[rgba(8,12,20,0.96)] shadow-[0_28px_70px_rgba(0,0,0,0.55),_0_0_28px_rgba(34,211,238,0.12)] backdrop-blur-3xl"
    >
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
      
      {/* Background Animated Gradient */}
      <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] opacity-20 pointer-events-none">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-[conic-gradient(from_0deg,_transparent_0deg,_rgba(34,211,238,0.3)_90deg,_transparent_180deg,_rgba(139,92,246,0.3)_270deg,_transparent_360deg)] blur-3xl"
        />
      </div>

      {/* Header */}
      <div
        className="relative z-10 flex items-center justify-between px-4 sm:px-4 py-2.5 border-b border-white/[0.08] bg-[rgba(6,10,20,0.8)] backdrop-blur-xl"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400/25 to-blue-500/25 border border-white/[0.15] flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(34,211,238,0.2)] overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.5),_transparent_70%)]" />
            <span className="relative text-white/95 font-bold text-[10px] tracking-wider">AI</span>
          </div>
          <div>
            <p className="text-[13px] font-bold text-white leading-none">{PROFILE.name} AI</p>
            <div className="flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_4px_rgba(34,211,238,0.8)]" />
              <p className="text-[9px] text-cyan-400/70 font-medium tracking-wide">ONLINE</p>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.08] active:scale-90 transition-all duration-200"
          aria-label="Close chat"
        >
          <X size={18} strokeWidth={2} />
        </button>
      </div>

      {/* Edge Lighting Top */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent opacity-40 z-20" />

      {/* Messages Area */}
      <div
        className="relative z-10 flex-1 min-h-0 overflow-y-auto overscroll-contain px-3 sm:px-4 pt-2 pb-0 flex flex-col gap-1 chat-scrollbar"
        aria-live="polite"
      >
        {messages.map((msg) =>
          msg.role === "bot" ? (
            <BotMessage key={msg.id} msg={msg} onQuickReply={sendMessage} />
          ) : (
            <UserMessage key={msg.id} msg={msg} />
          )
        )}
        {typing && <ThinkingState />}
        <div ref={bottomRef} className="h-0.5 shrink-0" />
      </div>

      {/* Edge Lighting Bottom Separator */}
      <div className="relative z-20 h-px w-full bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent opacity-60 shrink-0" />

      {/* Input Area */}
      <div className="relative z-10 shrink-0 px-3 pb-0 pt-1 w-full bg-[rgba(10,14,24,0.96)] border-t border-white/[0.08]">
        <ChatInput 
          input={input}
          setInput={setInput}
          onSend={sendMessage}
          disabled={typing}
        />
      </div>
    </motion.div>
  );
};
