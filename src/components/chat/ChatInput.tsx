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
      <div className="absolute inset-x-2 inset-y-1.5 rounded-[28px] bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-blue-500/0 blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="group relative flex items-end gap-2 bg-[rgba(12,20,34,0.97)] border border-white/[0.07] rounded-[28px] p-2 focus-within:border-cyan-500/35 focus-within:bg-[rgba(15,25,42,0.98)] focus-within:shadow-[0_6px_24px_rgba(34,211,238,0.12)] transition-all duration-300 backdrop-blur-xl">
        
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about stats, projects, or internships..."
          className="flex-1 max-h-[120px] min-h-[40px] bg-transparent text-[13px] text-white placeholder-white/35 resize-none outline-none py-2 px-1 leading-5 overflow-y-auto"
          style={{ scrollbarWidth: "none" }}
          rows={1}
          disabled={disabled}
          aria-label="Ask the AI Assistant a question"
        />
        
        <motion.button
          onClick={() => onSend(input)}
          disabled={!input.trim() || disabled}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="w-9 h-9 shrink-0 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-[0_2px_12px_rgba(34,211,238,0.2)] disabled:opacity-25 disabled:scale-100 disabled:shadow-none hover:shadow-[0_4px_16px_rgba(34,211,238,0.3)] transition-all duration-200"
          aria-label="Send message"
        >
          <Send size={15} strokeWidth={2.5} className="translate-x-[0.5px]" />
        </motion.button>
      </div>
    </div>
  );
};
