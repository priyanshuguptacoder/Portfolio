import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Mark this card as the featured/dominant card — gets stronger animation */
  isActive?: boolean;
}

export const PremiumCard = ({ children, className, isActive, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        // ── Shared structural base ──────────────────────────────────────────
        "group/card relative rounded-[24px]",
        "border border-white/[0.06]",
        "active:scale-[0.98]",

        // ── Sibling dimming when a sibling is hovered ──────────────────────
        "opacity-100 md:group-hover/cards:opacity-90 md:hover:!opacity-100",

        // ── Text contrast cascade on hover ─────────────────────────────────
        "[&_h3]:transition-colors [&_h3]:duration-300 [&_h3]:ease-out md:hover:[&_h3]:text-white",
        "[&_p]:transition-colors [&_p]:duration-300 [&_p]:ease-out md:hover:[&_p]:text-white/80",

        // ── Animation class: featured vs standard ──────────────────────────
        isActive ? "premium-card-featured" : "premium-card",

        className
      )}
      {...props}
    >
      {/* Structural depth panel — sits behind content, above pseudo-elements */}
      <div
        className={cn(
          "absolute inset-[1px] rounded-[23px] pointer-events-none transition-colors duration-300 z-[2]",
          isActive
            ? "bg-[rgba(8,16,35,0.7)] md:group-hover/card:bg-[rgba(8,16,35,0.5)]"
            : "bg-[rgba(10,18,32,0.85)] md:group-hover/card:bg-[rgba(10,18,32,0.65)]"
        )}
      />

      {/* Content — above depth panel and pseudo-elements */}
      <div className="relative z-10 w-full h-full flex flex-col">
        {children}
      </div>
    </div>
  );
};
