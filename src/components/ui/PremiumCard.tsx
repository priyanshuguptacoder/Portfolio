import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  isActive?: boolean;
}

export const PremiumCard = ({ children, className, isActive, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        "group/card relative rounded-[24px] transition-all duration-300 ease-out",
        "bg-[#020617]",
        "border",
        // Subtle default 'alive' state vs Featured
        isActive 
          ? "border-white/20 shadow-[0_0_15px_rgba(34,211,238,0.05)]" 
          : "border-white/5 shadow-[0_0_8px_rgba(0,120,255,0.03)]",
        
        // Transform micro-float, scale, z-index isolation
        "translate-y-0",
        "md:hover:-translate-y-[3px] md:hover:scale-[1.02] md:hover:z-20",
        
        // Hover border highlight & sophisticated soft glow
        "md:hover:border-[#00b4ff]/30 md:hover:shadow-[0_0_14px_rgba(0,120,255,0.12),0_0_40px_rgba(0,120,255,0.06)]",
        
        // Active click compression
        "active:scale-[0.98] active:shadow-none",
        
        // Generic Sibling Fade Logic (Hooks if parent declares group/cards or similar)
        // If undefined, acts normal.
        "opacity-100 md:group-hover/cards:opacity-90 md:hover:!opacity-100",
        
        // Typography contrast cascade shifting
        "[&_h3]:transition-colors [&_h3]:duration-300 [&_h3]:ease-out md:hover:[&_h3]:text-white",
        "[&_p]:transition-colors [&_p]:duration-300 [&_p]:ease-out md:hover:[&_p]:text-white/80",
        
        className
      )}
      {...props}
    >
      {/* Structural Inner Panel for depth overlay */}
      <div className="absolute inset-[1px] rounded-[23px] bg-[rgba(10,20,40,0.6)] pointer-events-none transition-colors duration-300 md:group-hover/card:bg-[rgba(10,20,40,0.4)]" />

      {/* Content wrapper */}
      <div className="relative z-10 w-full h-full flex flex-col">
        {children}
      </div>
    </div>
  );
};

