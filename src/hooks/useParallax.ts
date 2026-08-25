import { useEffect } from "react";
import { useMotionValue, useSpring } from "framer-motion";

export const useParallax = (multiplier = 1, springOptions = { stiffness: 100, damping: 30, mass: 1 }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, springOptions);
  const springY = useSpring(y, springOptions);

  useEffect(() => {
    // Feature detection
    if (window.innerWidth < 768 || window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize from -1 to 1 based on screen size
      const normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
      const normalizedY = (e.clientY / window.innerHeight) * 2 - 1;
      
      // Calculate offset (e.g. multiplier = 0.02 means it moves 2% of the viewport)
      x.set(normalizedX * 100 * multiplier);
      y.set(normalizedY * 100 * multiplier);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [multiplier, x, y]);

  return { x: springX, y: springY };
};
