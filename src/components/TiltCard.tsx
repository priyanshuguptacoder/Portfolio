import { motion, useMotionValue, useSpring } from "framer-motion";
import { type ReactNode, useEffect, useRef } from "react";

const TiltCard = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 180, damping: 22 });
  const springY = useSpring(rotateY, { stiffness: 180, damping: 22 });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return;
    const node = ref.current;
    if (!node) return;
    const move = (event: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      rotateX.set(-py * 12);
      rotateY.set(px * 12);
    };
    const leave = () => { rotateX.set(0); rotateY.set(0); };
    node.addEventListener("mousemove", move);
    node.addEventListener("mouseleave", leave);
    return () => {
      node.removeEventListener("mousemove", move);
      node.removeEventListener("mouseleave", leave);
    };
  }, [rotateX, rotateY]);

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 1000 }}
      className={`group relative h-full transform-gpu overflow-hidden rounded-2xl ${className}`}
      whileTap={{ scale: 0.985 }}
      data-cursor="view"
    >
      <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-cyan-300/0 via-violet-400/0 to-cyan-300/0 opacity-0 transition-opacity duration-500 group-hover:from-cyan-300/50 group-hover:via-violet-400/40 group-hover:to-cyan-300/40 group-hover:opacity-100" />
      <div className="relative h-full rounded-2xl border border-white/10 bg-white/[0.05] p-1 backdrop-blur-md transition-shadow duration-500 group-hover:shadow-neon-mix">
        <div className="tilt-glare pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="relative h-full rounded-[0.85rem] bg-[#0B0D14]/80 p-5 sm:p-7">{children}</div>
      </div>
    </motion.div>
  );
};

export default TiltCard;
