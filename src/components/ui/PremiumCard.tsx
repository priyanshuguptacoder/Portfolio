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
        "group/card relative rounded-[24px]",
        "bg-[#020617]",
        
        // ── Default cards: clean, static, hover-only ──
        !isActive && [
          "border border-white/5",
          "shadow-[0_0_8px_rgba(0,120,255,0.03)]",
          "transition-all duration-300 ease-out",
          "translate-y-0",
          // Hover micro-float + scale + glow
          "md:hover:-translate-y-[5px] md:hover:scale-[1.025] md:hover:z-20",
          "md:hover:border-[#00b4ff]/30",
          "md:hover:shadow-[0_0_14px_rgba(0,120,255,0.12),0_0_40px_rgba(0,120,255,0.06)]",
        ],
        
        // ── Featured card: animated gradient border + float + glow ──
        isActive && "premium-card-featured",
        
        // Active click compression (both)
        "active:scale-[0.98]",
        
        // Sibling dimming
        "opacity-100 md:group-hover/cards:opacity-90 md:hover:!opacity-100",
        
        // Text contrast cascade on hover
        "[&_h3]:transition-colors [&_h3]:duration-300 [&_h3]:ease-out md:hover:[&_h3]:text-white",
        "[&_p]:transition-colors [&_p]:duration-300 [&_p]:ease-out md:hover:[&_p]:text-white/80",
        
        // Hover transition for featured card
        isActive && "transition-[transform,filter] duration-300 ease-out md:hover:-translate-y-[5px] md:hover:scale-[1.025] md:hover:z-20",
        
        className
      )}
      {...props}
    >
      {/* Structural depth panel */}
      <div className={cn(
        "absolute inset-[1px] rounded-[23px] pointer-events-none transition-colors duration-300",
        isActive ? "bg-[rgba(8,16,35,0.7)] md:group-hover/card:bg-[rgba(8,16,35,0.5)]" : "bg-[rgba(10,20,40,0.6)] md:group-hover/card:bg-[rgba(10,20,40,0.4)]"
      )} />

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col">
        {children}
      </div>
    </div>
  );
};
