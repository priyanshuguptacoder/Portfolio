import { useParallax } from "@/hooks/useParallax";
import React from "react";

export const ParallaxLayer = ({ children, className, multiplier = 1 }: any) => {
  const ref = useParallax(multiplier);
  
  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
};
