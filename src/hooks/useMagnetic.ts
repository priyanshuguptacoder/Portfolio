import { useEffect, useRef } from "react";

export const useMagnetic = (multiplier = 0.1) => {
  const ref = useRef<any>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || window.innerWidth < 768) return;

    let rafId: number;
    let target = { x: 0, y: 0 };
    let current = { x: 0, y: 0 };

    const animate = () => {
      current.x += (target.x - current.x) * 0.1;
      current.y += (target.y - current.y) * 0.1;
      
      element.style.transform = `translate(${current.x}px, ${current.y}px)`;
      rafId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = element.getBoundingClientRect();
      const cx = left + width / 2;
      const cy = top + height / 2;
      target = { x: (e.clientX - cx) * multiplier, y: (e.clientY - cy) * multiplier };
    };

    const handleMouseLeave = () => {
      target = { x: 0, y: 0 };
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);
    animate();

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafId);
      element.style.transform = "";
    };
  }, [multiplier]);

  return ref;
};
