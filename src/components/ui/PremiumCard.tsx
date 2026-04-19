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
        "group/card relative p-[1px] rounded-3xl transition-all duration-[300ms] ease-out",
        "bg-white/5",
        // Hover scaling
        "md:hover:scale-[1.03] md:hover:z-20",
        // Remove center bias: active element just gets a slight border but no crazy scale
        isActive ? "border border-white/10" : "border border-transparent",
        className
      )}
      {...props}
    >
      {/* Seamless Hover Gradient Border */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 opacity-0 md:group-hover/card:opacity-100 transition-opacity duration-[300ms] ease-out pointer-events-none" />

      {/* Core Background & Shadow body */}
      <div
        className={cn(
          "relative z-10 bg-[#020617] rounded-[23px] h-full w-full transition-all duration-[300ms] ease-out flex flex-col",
          // Default styling (clean, minimal)
          "border border-white/5 shadow-none",
          // Hover styles matching the previous center card
          "md:group-hover/card:border-cyan-500/40 md:group-hover/card:shadow-[0_0_20px_rgba(0,120,255,0.15),0_0_60px_rgba(0,120,255,0.08)]",
          // Active string (mouse down)
          "active:scale-[0.98] active:shadow-[0_0_30px_rgba(0,120,255,0.25),0_0_80px_rgba(0,120,255,0.15)]",
          isActive && "bg-[#0b1220]"
        )}
      >
        {children}
      </div>

      {/* Extrawide Soft Ambient Hover Glow attached to the bottom/back */}
      <div className="absolute inset-0 top-1/2 bg-blue-500/20 blur-2xl rounded-full -z-10 opacity-0 md:group-hover/card:opacity-100 transition-opacity duration-[300ms] ease-out pointer-events-none" />
    </div>
  );
};
