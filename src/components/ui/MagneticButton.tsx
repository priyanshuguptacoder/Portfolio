import { useMagnetic } from "@/hooks/useMagnetic";
import React from "react";

export const MagneticButton = ({ children, className, href, target, rel }: any) => {
  const ref = useMagnetic(0.25);
  
  return (
    <a 
      ref={ref} 
      href={href} 
      target={target} 
      rel={rel} 
      className={className}
      style={{ display: "inline-flex", willChange: "transform" }}
    >
      {children}
    </a>
  );
};
