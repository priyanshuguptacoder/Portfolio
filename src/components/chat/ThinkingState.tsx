import { motion } from "framer-motion";

export const ThinkingState = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex items-center gap-3 mb-3 ml-1"
    >
      {/* AI Avatar Core */}
      <div className="relative w-7 h-7 rounded-full flex items-center justify-center shrink-0">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/40 via-blue-500/20 to-purple-500/40 blur-[2px]"
        />
        <motion.div
          animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.8)]"
        />
      </div>

      {/* Cinematic Waveform */}
      <div className="flex items-center h-8 gap-[3px] px-4 py-2 rounded-2xl rounded-tl-sm bg-[rgba(15,22,36,0.6)] border border-white/[0.04] backdrop-blur-sm overflow-hidden relative">
        {/* Shimmer overlay */}
        <motion.div
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent skew-x-12"
        />
        
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1 bg-cyan-400/70 rounded-full"
            animate={{
              height: ["4px", "16px", "4px"],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.15,
            }}
          />
        ))}
        <span className="ml-2 text-[11px] font-medium text-cyan-400/60 tracking-wider uppercase">Processing</span>
      </div>
    </motion.div>
  );
};
