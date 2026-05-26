import { motion } from "framer-motion";

// Static skill tags that float around the orb
const TAGS = [
  { label: "Go", angle: 0, r: 72 },
  { label: "Node.js", angle: 55, r: 76 },
  { label: "DSA", angle: 110, r: 70 },
  { label: "Redis", angle: 165, r: 74 },
  { label: "Docker", angle: 220, r: 72 },
  { label: "Python", angle: 275, r: 76 },
  { label: "PostgreSQL", angle: 330, r: 70 },
];

function polarToCartesian(angle: number, r: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return { x: Math.cos(rad) * r, y: Math.sin(rad) * r };
}

export const AIIdleCore = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.92 }}
    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    className="relative flex flex-col items-center justify-center py-5 gap-4 shrink-0 overflow-hidden"
    style={{ minHeight: 200 }}
  >
    {/* Ambient radial glow behind orb */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-cyan-500/10 blur-3xl" />
    </div>

    {/* Orb + orbit ring + floating tags */}
    <div className="relative" style={{ width: 180, height: 180 }}>
      {/* Slow-rotating orbit ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
        style={{ originX: "50%", originY: "50%" }}
      >
        <svg width="180" height="180" viewBox="-90 -90 180 180" className="absolute inset-0">
          <circle
            cx="0"
            cy="0"
            r="72"
            fill="none"
            stroke="rgba(34,211,238,0.15)"
            strokeWidth="1"
            strokeDasharray="6 8"
          />
        </svg>
      </motion.div>

      {/* Counter-rotating outer ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
        style={{ originX: "50%", originY: "50%" }}
      >
        <svg width="180" height="180" viewBox="-90 -90 180 180" className="absolute inset-0">
          <circle
            cx="0"
            cy="0"
            r="82"
            fill="none"
            stroke="rgba(139,92,246,0.10)"
            strokeWidth="1"
            strokeDasharray="3 12"
          />
        </svg>
      </motion.div>

      {/* Floating skill tags */}
      {TAGS.map((tag, i) => {
        const { x, y } = polarToCartesian(tag.angle, tag.r);
        return (
          <motion.span
            key={tag.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.07 + 0.3, duration: 0.4 }}
            style={{
              position: "absolute",
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              transform: "translate(-50%, -50%)",
            }}
            className="px-1.5 py-0.5 rounded-md text-[8px] font-semibold tracking-wide border border-white/10 bg-[rgba(14,22,40,0.8)] text-white/50 backdrop-blur-sm whitespace-nowrap"
          >
            {tag.label}
          </motion.span>
        );
      })}

      {/* Core orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Outer breathing glow ring */}
        <motion.div
          animate={{ scale: [1, 1.18, 1], opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full bg-cyan-400/20 blur-lg"
          style={{ width: 60, height: 60, top: -5, left: -5 }}
        />
        {/* Orb body */}
        <motion.div
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-[50px] h-[50px] rounded-full bg-gradient-to-br from-cyan-400/40 via-blue-500/30 to-violet-500/20 border border-cyan-400/40 shadow-[0_0_24px_rgba(34,211,238,0.35),_inset_0_0_12px_rgba(34,211,238,0.15)] flex items-center justify-center overflow-hidden"
        >
          {/* Internal radial gradient shimmer */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_30%,_rgba(34,211,238,0.5),_transparent_65%)]" />
          {/* Rotating inner shine */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-[conic-gradient(from_0deg,_transparent_0deg,_rgba(34,211,238,0.4)_60deg,_transparent_120deg)] blur-sm"
          />
          {/* Core dot */}
          <span className="relative w-2 h-2 rounded-full bg-cyan-200 shadow-[0_0_8px_rgba(165,243,252,0.9)]" />
        </motion.div>
      </div>
    </div>

    {/* Status row */}
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className="flex flex-col items-center gap-1.5"
    >
      <div className="flex items-center gap-2">
        <motion.span
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.9)]"
        />
        <span className="text-[11px] font-semibold tracking-widest uppercase text-cyan-400/80">
          Intelligence Ready
        </span>
        <motion.span
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="w-1.5 h-1.5 rounded-full bg-violet-400 shadow-[0_0_6px_rgba(167,139,250,0.9)]"
        />
      </div>

      {/* Animated stream bars */}
      <div className="flex items-end gap-[3px] h-4">
        {[0.4, 0.7, 1, 0.8, 0.5, 0.9, 0.6, 0.75, 0.45, 0.85, 0.55, 0.7].map((h, i) => (
          <motion.span
            key={i}
            animate={{ scaleY: [h, h * 0.3 + 0.2, h] }}
            transition={{
              duration: 1.2 + i * 0.08,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.09,
            }}
            style={{ height: `${h * 14}px`, originY: 1 }}
            className="w-[2px] rounded-full bg-gradient-to-t from-cyan-500/70 to-cyan-300/30"
          />
        ))}
      </div>

      <p className="text-[9px] text-white/25 tracking-wide font-medium">
        Backend · Engineering · DSA · Open Source
      </p>
    </motion.div>
  </motion.div>
);
