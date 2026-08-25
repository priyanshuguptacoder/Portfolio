import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  isActive?: boolean;
}

export const PremiumCard = ({ children, className, isActive, ...props }: CardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = React.useState(false);
  
  // Motion values for tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Motion values for pointer glow (pixels)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs for smooth tilt
  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const rotateX = useSpring(useMotionTemplate`${y}deg`, springConfig);
  const rotateY = useSpring(useMotionTemplate`${x}deg`, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    // Feature detection
    if (window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = ref.current.getBoundingClientRect();
    
    // Pointer glow coordinates relative to card
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;
    mouseX.set(localX);
    mouseY.set(localY);
    
    // Tilt calculation (normalize from -1 to 1)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const normalizedX = (localX - centerX) / centerX;
    const normalizedY = (localY - centerY) / centerY;
    
    // Max tilt = 3 degrees
    x.set(normalizedX * 3);
    y.set(-normalizedY * 3); // Negative because pulling mouse down rotates X positively
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        y: useSpring(isHovered ? -6 : 0, springConfig),
        scale: useSpring(isHovered ? 1.02 : 1, springConfig),
        transformPerspective: 1000,
        "--mouse-x": useMotionTemplate`${mouseX}px`,
        "--mouse-y": useMotionTemplate`${mouseY}px`,
      } as any}
      className={cn(
        "group/card relative rounded-[24px]",
        "border border-white/[0.06]",
        "active:scale-[0.98]",
        "opacity-100",
        "[&_h3]:transition-colors [&_h3]:duration-300 [&_h3]:ease-out md:hover:[&_h3]:text-white",
        "[&_p]:transition-colors [&_p]:duration-300 [&_p]:ease-out md:hover:[&_p]:text-white/80",
        isActive ? "premium-card-featured" : "premium-card",
        className
      )}
      {...props}
    >
      {/* Dynamic Pointer Glow */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
        style={{
          background: "radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(34, 211, 238, 0.08), transparent 40%)"
        }}
      />

      <div
        className={cn(
          "absolute inset-[1px] rounded-[23px] pointer-events-none transition-colors duration-300 z-[2]",
          isActive
            ? "bg-[rgba(8,16,35,0.7)] md:group-hover/card:bg-[rgba(8,16,35,0.5)]"
            : "bg-[rgba(10,18,32,0.85)] md:group-hover/card:bg-[rgba(10,18,32,0.65)]"
        )}
      />

      <div className="relative z-10 w-full h-full flex flex-col">
        {children}
      </div>
    </motion.div>
  );
};
