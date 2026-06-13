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
    <div className="relative shrink-0">
      <div className="absolute inset-x-2.5 inset-y-2 rounded-[28px] bg-gradient-to-r from-cyan-500/0 via-cyan-500/12 to-blue-500/0 blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="group relative flex items-end gap-3 bg-[rgba(12,20,34,0.95)] border border-white/[0.08] rounded-[30px] p-3 focus-within:border-cyan-500/40 focus-within:bg-[rgba(15,25,42,0.96)] focus-within:shadow-[0_8px_30px_rgba(34,211,238,0.14)] transition-all duration-300 backdrop-blur-xl">
        
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about stats, projects, or internships..."
          className="flex-1 max-h-[140px] min-h-[48px] bg-transparent text-[14px] text-white placeholder-white/40 resize-none outline-none py-3 leading-6 overflow-y-auto"
          style={{ scrollbarWidth: "none" }}
          rows={1}
          disabled={disabled}
          aria-label="Ask the AI Assistant a question"
        />
        
        <motion.button
          onClick={() => onSend(input)}
          disabled={!input.trim() || disabled}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 shrink-0 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-[0_4px_16px_rgba(34,211,238,0.25)] disabled:opacity-30 disabled:scale-100 disabled:shadow-none transition-all duration-200"
          aria-label="Send message"
        >
          <Send size={16} strokeWidth={2.5} className="translate-x-[1px] translate-y-[-1px]" />
        </motion.button>
      </div>
    </div>
  );
};
