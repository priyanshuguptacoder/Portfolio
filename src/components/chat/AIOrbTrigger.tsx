import { motion, AnimatePresence } from "framer-motion";
import { type RefObject } from "react";
import { X } from "lucide-react";

export const AIOrbTrigger = ({
  onClick,
  isOpen,
  buttonRef,
}: {
  onClick: () => void;
  isOpen: boolean;
  buttonRef: RefObject<HTMLButtonElement>;
}) => {
  return (
    <motion.button
      ref={buttonRef}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={false}
      animate={
        isOpen
          ? { y: 0, scale: 0.9, opacity: 0.8 }
          : { y: [0, -4, 0], scale: 1, opacity: 1 }
      }
      transition={
        isOpen
          ? { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
          : { duration: 4, repeat: Infinity, ease: "easeInOut" }
      }
      className={`fixed bottom-6 right-4 sm:right-6 w-14 h-14 rounded-full flex items-center justify-center z-50 transition-all duration-500 overflow-hidden ${
        isOpen
          ? "bg-white/[0.03] border border-white/[0.05] shadow-none"
          : "bg-[rgba(10,18,34,0.6)] backdrop-blur-md border border-cyan-500/30 shadow-[0_0_30px_rgba(34,211,238,0.15)] hover:shadow-[0_0_40px_rgba(34,211,238,0.3)] hover:border-cyan-400/50 hover:bg-[rgba(15,25,45,0.8)]"
      }`}
      aria-label="Toggle AI Assistant"
      aria-expanded={isOpen}
      aria-controls="chat-panel"
    >
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="close"
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X size={24} strokeWidth={1.5} />
          </motion.div>
        ) : (
          <motion.div
            key="orb"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="relative flex items-center justify-center w-full h-full"
          >
            {/* Outer breathing aura */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full bg-[radial-gradient(circle,_rgba(34,211,238,0.4)_0%,_transparent_70%)]"
            />
            {/* Inner core */}
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-500 blur-[2px] opacity-80"
            />
            {/* Core highlight */}
            <div className="absolute w-3 h-3 rounded-full bg-white blur-[1px]" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};
