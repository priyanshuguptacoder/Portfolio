import { useMagnetic } from "@/hooks/useMagnetic";
import React from "react";
import { motion } from "framer-motion";

export const MagneticButton = ({ children, className, href, target, rel, style, ...props }: any) => {
  const { ref, x, y } = useMagnetic(0.2); // Limit magnetic pull
  
  const isLink = href !== undefined;
  
  if (isLink) {
    return (
      <motion.a 
        ref={ref} 
        href={href} 
        target={target} 
        rel={rel} 
        className={className}
        style={{ display: "inline-flex", x, y, ...style }}
        {...props}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button 
      ref={ref} 
      className={className}
      style={{ display: "inline-flex", x, y, ...style }}
      {...props}
    >
      {children}
    </motion.button>
  );
};
