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
        "group/card relative rounded-[24px] overflow-hidden",

        // ── Clean base style (all cards) ──
        "border border-white/[0.06]",
        "transition-all duration-[280ms] ease-out",
        "translate-y-0",

        // ── Featured card class ──
        isActive && "premium-card-featured",

        // ── Premium hover animation (all cards) ──
        "md:hover:-translate-y-[6px] md:hover:scale-[1.025] md:hover:z-20",
        "md:hover:border-white/[0.15]",
        "md:hover:shadow-[0_12px_45px_rgba(0,120,255,0.18)]",

        // Active click compression
        "active:scale-[0.98]",

        // Text contrast cascade on hover
        "[&_h3]:transition-colors [&_h3]:duration-300 [&_h3]:ease-out md:hover:[&_h3]:text-white",
        "[&_p]:transition-colors [&_p]:duration-300 [&_p]:ease-out md:hover:[&_p]:text-white/80",

        className
      )}
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.2)), rgba(10, 18, 32, 0.9)",
        boxShadow: isActive
          ? "0 8px 30px rgba(0,0,0,0.4), 0 0 18px rgba(0,120,255,0.10)"
          : "0 8px 30px rgba(0,0,0,0.4)",
      }}
      {...props}
    >
      {/* Light sweep overlay — premium reflective effect on hover */}
      <div
        className="premium-card-sweep pointer-events-none absolute inset-0 z-[5] opacity-0 md:group-hover/card:opacity-100"
        aria-hidden="true"
      />

      {/* Structural depth panel */}
      <div className={cn(
        "absolute inset-[1px] rounded-[23px] pointer-events-none transition-colors duration-300",
        isActive
          ? "bg-[rgba(8,16,35,0.5)] md:group-hover/card:bg-[rgba(8,16,35,0.35)]"
          : "bg-[rgba(10,20,40,0.5)] md:group-hover/card:bg-[rgba(10,20,40,0.35)]"
      )} />

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col">
        {children}
      </div>
    </div>
  );
};
