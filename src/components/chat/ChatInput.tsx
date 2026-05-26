import { useRef, useEffect, type KeyboardEvent } from "react";
import { Send } from "lucide-react";
import { motion } from "framer-motion";

export const ChatInput = ({
  input,
  setInput,
  onSend,
  disabled,
}: {
  input: string;
  setInput: (val: string) => void;
  onSend: (val: string) => void;
  disabled: boolean;
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend(input);
    }
  };

  return (
    <div className="relative p-2.5 sm:p-3 shrink-0">
      {/* Outer focus glow */}
      <div className="absolute inset-x-2.5 inset-y-2 rounded-2xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-blue-500/0 blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="group relative flex items-end gap-2 bg-[rgba(10,16,30,0.7)] border border-white/[0.08] rounded-2xl p-1.5 pl-3 focus-within:border-cyan-500/40 focus-within:bg-[rgba(15,22,40,0.8)] focus-within:shadow-[0_4px_20px_rgba(34,211,238,0.08)] transition-all duration-300 backdrop-blur-md">
        
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything..."
          className="flex-1 max-h-[120px] bg-transparent text-[13px] text-white placeholder-white/30 resize-none outline-none py-2 leading-relaxed overflow-y-auto"
          style={{ scrollbarWidth: "none" }}
          rows={1}
          disabled={disabled}
        />
        
        <motion.button
          onClick={() => onSend(input)}
          disabled={!input.trim() || disabled}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-8 h-8 shrink-0 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-[0_2px_10px_rgba(34,211,238,0.2)] disabled:opacity-30 disabled:scale-100 disabled:shadow-none transition-all duration-200 group-focus-within:shadow-[0_4px_14px_rgba(34,211,238,0.4)] mb-0.5"
          aria-label="Send message"
        >
          <Send size={14} strokeWidth={2.5} className="translate-x-[1px] translate-y-[-1px]" />
        </motion.button>
      </div>
    </div>
  );
};
