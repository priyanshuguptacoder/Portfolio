import { useParallax } from "@/hooks/useParallax";
import React from "react";
import { motion } from "framer-motion";

export const ParallaxLayer = ({ children, className, multiplier = 1, zIndex = 0 }: any) => {
  const { x, y } = useParallax(multiplier);
  
  return (
    <motion.div 
      className={className} 
      style={{ x, y, zIndex, willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
};
