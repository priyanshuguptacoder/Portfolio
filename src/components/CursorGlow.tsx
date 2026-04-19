import { useEffect, useRef } from "react";

/**
 * CursorGlow — Premium cursor-reactive ambient light system.
 * Two-layer lerp implementation with premium dark-theme compatible gradient.
 */
const CursorGlow = () => {
  const primaryRef = useRef<HTMLDivElement>(null);
  const secondaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth < 768) return; // Disable on mobile

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const primary = { x: target.x, y: target.y };
    const secondary = { x: target.x, y: target.y };

    let rafId: number;
    let isHovering = false;

    const onMouseMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const onMouseOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      isHovering = !!el.closest("a, button, [role='button'], .group");
    };

    const tick = () => {
      primary.x += (target.x - primary.x) * 0.08;
      primary.y += (target.y - primary.y) * 0.08;

      secondary.x += (target.x - secondary.x) * 0.035;
      secondary.y += (target.y - secondary.y) * 0.035;

      const intensity = isHovering ? 1.5 : 1;

      if (primaryRef.current) {
        primaryRef.current.style.transform = `translate(${primary.x - 300}px, ${primary.y - 300}px)`;
        primaryRef.current.style.opacity = String(1 * intensity);
      }
      if (secondaryRef.current) {
        secondaryRef.current.style.transform = `translate(${secondary.x - 400}px, ${secondary.y - 400}px)`;
        secondaryRef.current.style.opacity = String(1 * intensity);
      }

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (typeof window !== "undefined" && window.innerWidth < 768) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* PRIMARY GLOW */}
      <div
        ref={primaryRef}
        className="absolute top-0 left-0 will-change-transform mix-blend-screen"
        style={{
          width: 600,
          height: 600,
          background: "radial-gradient(600px circle at center, rgba(0, 120, 255, 0.10), rgba(0, 60, 150, 0.06), transparent 60%)",
          transition: "opacity 0.4s easeOut",
        }}
      />

      {/* SECONDARY GLOW */}
      <div
        ref={secondaryRef}
        className="absolute top-0 left-0 will-change-transform mix-blend-screen"
        style={{
          width: 800,
          height: 800,
          background: "radial-gradient(800px circle at center, rgba(0, 30, 80, 0.25), transparent 70%)",
          transition: "opacity 0.6s easeOut",
        }}
      />
    </div>
  );
};

export default CursorGlow;
