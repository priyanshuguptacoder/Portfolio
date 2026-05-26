import { motion } from "framer-motion";

const BARS = [0.4, 0.7, 1, 0.6, 0.85, 0.5, 0.9, 0.65, 0.75, 0.45, 0.8, 0.55, 0.7, 0.4, 0.6];

export const AIIdleCore = () => (
  <motion.div
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 4 }}
    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    className="relative shrink-0 mx-4 mb-2 rounded-2xl border border-white/[0.07] bg-[rgba(8,13,26,0.6)] backdrop-blur-md overflow-hidden"
  >
    {/* Ambient glow */}
    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-cyan-500/10 blur-2xl pointer-events-none" />
    <div className="absolute right-4 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-violet-500/10 blur-2xl pointer-events-none" />

    <div className="relative flex items-center gap-4 px-4 py-3">

      {/* ── Left: Compact orb ───────────────────────────── */}
      <div className="relative shrink-0" style={{ width: 44, height: 44 }}>
        {/* Rotating orbit ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
          style={{ originX: "50%", originY: "50%" }}
        >
          <svg width="44" height="44" viewBox="-22 -22 44 44" className="absolute inset-0">
            <circle
              cx="0" cy="0" r="19"
              fill="none"
              stroke="rgba(34,211,238,0.25)"
              strokeWidth="1"
              strokeDasharray="4 6"
            />
          </svg>
        </motion.div>

        {/* Counter ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
          style={{ originX: "50%", originY: "50%" }}
        >
          <svg width="44" height="44" viewBox="-22 -22 44 44" className="absolute inset-0">
            <circle
              cx="0" cy="0" r="22"
              fill="none"
              stroke="rgba(139,92,246,0.12)"
              strokeWidth="1"
              strokeDasharray="2 9"
            />
          </svg>
        </motion.div>

        {/* Core orb body */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {/* Breathing glow */}
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.25, 0.5, 0.25] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute rounded-full bg-cyan-400/25 blur-md"
            style={{ width: 32, height: 32, top: -6, left: -6 }}
          />
          {/* Orb */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-[20px] h-[20px] rounded-full bg-gradient-to-br from-cyan-400/50 via-blue-500/35 to-violet-500/25 border border-cyan-400/50 shadow-[0_0_14px_rgba(34,211,238,0.4),_inset_0_0_6px_rgba(34,211,238,0.2)] flex items-center justify-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_30%,_rgba(34,211,238,0.6),_transparent_70%)]" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-[conic-gradient(from_0deg,_transparent,_rgba(34,211,238,0.5)_50deg,_transparent_100deg)] blur-[1px]"
            />
            <span className="relative w-[4px] h-[4px] rounded-full bg-cyan-100 shadow-[0_0_5px_rgba(165,243,252,1)]" />
          </motion.div>
        </div>
      </div>

      {/* ── Right: Status + waveform ────────────────────── */}
      <div className="flex-1 min-w-0 flex flex-col gap-1.5">
        {/* Status row */}
        <div className="flex items-center gap-2">
          <motion.span
            animate={{ opacity: [1, 0.25, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_5px_rgba(34,211,238,1)] shrink-0"
          />
          <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-cyan-400/90">
            Intelligence Ready
          </span>
        </div>

        {/* Waveform */}
        <div className="flex items-end gap-[2px] h-[18px]">
          {BARS.map((h, i) => (
            <motion.span
              key={i}
              animate={{ scaleY: [h, h * 0.25 + 0.15, h] }}
              transition={{
                duration: 1.1 + i * 0.07,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.06,
              }}
              style={{ height: `${h * 16}px`, originY: 1 }}
              className="w-[2px] rounded-full bg-gradient-to-t from-cyan-500/80 to-cyan-300/25 shrink-0"
            />
          ))}
        </div>

        {/* Capability tags */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {["Go", "Node.js", "DSA", "Redis", "Python"].map((tag) => (
            <span
              key={tag}
              className="text-[8px] font-semibold tracking-wide text-white/35 px-1.5 py-0.5 rounded border border-white/[0.07] bg-white/[0.02]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);
