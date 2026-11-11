import { useEffect, useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.5 });

  useEffect(() => {
    const supported = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!supported || reduced) return;

    document.body.classList.add("custom-cursor-active");
    const onMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      const target = event.target as HTMLElement;
      const interactive = target.closest("a, button, [role='button'], [data-cursor]");
      const input = target.closest("input, textarea");
      const cursor = input ? "text" : target.closest("[data-cursor='view']") ? "view" : interactive ? "hover" : "default";
      document.body.dataset.cursor = cursor;
      if (labelRef.current) labelRef.current.textContent = cursor === "view" ? "VIEW" : "";
    };
    const onDown = () => { document.body.dataset.cursorDown = "true"; };
    const onUp = () => { delete document.body.dataset.cursorDown; };
    const onLeave = () => {
      x.set(-100);
      y.set(-100);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseleave", onLeave);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      delete document.body.dataset.cursor;
      delete document.body.dataset.cursorDown;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [x, y]);

  if (typeof window === "undefined" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return null;

  return (
    <>
      <div ref={dotRef} className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 shadow-neon-cyan" style={{ x, y }} />
      <div ref={ringRef} className="pointer-events-none fixed left-0 top-0 z-[9998] flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 text-[9px] font-mono tracking-widest text-white transition-[width,height,background-color,border-color] duration-200" style={{ x: ringX, y: ringY }}>
        <span ref={labelRef} />
      </div>
    </>
  );
};

export default CustomCursor;
