import { useEffect, useRef } from "react";

export const useParallax = (multiplier = 0.02) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    let rafId: number;
    // We assume the target range of movement should be small
    let target = { x: 0, y: 0 };
    let current = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      // Center based coordinate system (-1 to 1) multiplied by max pixels
      const x = (e.clientX / window.innerWidth - 0.5) * 2 * 20; 
      const y = (e.clientY / window.innerHeight - 0.5) * 2 * 20;
      target = { x: x * multiplier, y: y * multiplier };
    };

    const animate = () => {
      current.x += (target.x - current.x) * 0.1;
      current.y += (target.y - current.y) * 0.1;
      
      if (ref.current) {
        ref.current.style.transform = `translate(${current.x}px, ${current.y}px)`;
      }
      
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [multiplier]);

  return ref;
};
