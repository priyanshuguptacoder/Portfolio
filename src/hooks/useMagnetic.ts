import { useRef, useEffect } from "react";
import { useMotionValue, useSpring } from "framer-motion";

export const useMagnetic = (multiplier = 0.5, springOptions = { stiffness: 150, damping: 15, mass: 0.1 }) => {
  const ref = useRef<any>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, springOptions);
  const springY = useSpring(y, springOptions);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Feature detection: Disable magnetic effect on touch or reduced motion
    const isTouch = matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (isTouch || prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = element.getBoundingClientRect();
      const cx = left + width / 2;
      const cy = top + height / 2;
      
      // Calculate distance and apply multiplier
      const distanceX = e.clientX - cx;
      const distanceY = e.clientY - cy;
      
      x.set(distanceX * multiplier);
      y.set(distanceY * multiplier);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [multiplier, x, y]);

  return { ref, x: springX, y: springY };
};
