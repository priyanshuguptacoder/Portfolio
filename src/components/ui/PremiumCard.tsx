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
        "group/card relative rounded-[24px] transition-all duration-[300ms] ease-out",
        "bg-[#020617]",
        "border",
        // Default minimal vs Featured bright border
        isActive ? "border-white/20 shadow-[0_0_15px_rgba(34,211,238,0.03)]" : "border-white/5 shadow-none",
        // Hover scaling, sharp highlighted borders, tight edge glow
        "md:hover:scale-[1.02] md:hover:z-20",
        "md:hover:border-[#00b4ff]/40 md:hover:shadow-[0_0_12px_rgba(0,120,255,0.10),0_0_30px_rgba(0,120,255,0.06)]",
        // Active click compression
        "active:scale-[0.98] active:shadow-none",
        className
      )}
      {...props}
    >
      {/* Inner panel backdrop creating structural depth */}
      <div className="absolute inset-[1px] rounded-[23px] bg-[rgba(10,20,40,0.6)] pointer-events-none" />

      {/* Content wrapper */}
      <div className="relative z-10 w-full h-full flex flex-col">
        {children}
      </div>
    </div>
  );
};

