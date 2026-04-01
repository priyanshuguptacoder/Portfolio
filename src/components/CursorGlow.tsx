import { useEffect, useRef } from "react";

/**
 * CursorGlow — Premium cursor-reactive ambient light system.
 *
 * Two-layer lerp implementation:
 *  - Primary glow: faster tracking (factor 0.08)
 *  - Secondary glow: slower trail (factor 0.035) — creates depth illusion
 *
 * Zero React re-renders: all updates via direct DOM style mutations in rAF loop.
 */
const CursorGlow = () => {
  const primaryRef = useRef<HTMLDivElement>(null);
  const secondaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Target cursor position
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    // Current interpolated positions for each layer
    const primary = { x: target.x, y: target.y };
    const secondary = { x: target.x, y: target.y };

    let rafId: number;
    let isHovering = false;

    // Track raw cursor position
    const onMouseMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    // Track when hovering interactive elements for intensity boost
    const onMouseOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      isHovering = !!(
        el.closest("a, button, [role='button']")
      );
    };

    const tick = () => {
      // Lerp: current += (target - current) * factor
      // Slower factor (0.05) for smoother, premium lag
      primary.x += (target.x - primary.x) * 0.05;
      primary.y += (target.y - primary.y) * 0.05;

      secondary.x += (target.x - secondary.x) * 0.025;
      secondary.y += (target.y - secondary.y) * 0.025;

      const intensity = isHovering ? 1.2 : 1;

      if (primaryRef.current) {
        primaryRef.current.style.transform = `translate(${primary.x - 300}px, ${primary.y - 300}px)`;
        // Lower max opacity (0.12)
        primaryRef.current.style.opacity = String(0.12 * intensity);
      }
      if (secondaryRef.current) {
        secondaryRef.current.style.transform = `translate(${secondary.x - 400}px, ${secondary.y - 400}px)`;
        secondaryRef.current.style.opacity = String(0.08 * intensity);
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

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* PRIMARY glow — follows cursor, faster */}
      <div
        ref={primaryRef}
        className="absolute top-0 left-0 will-change-transform"
        style={{
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(30,58,138,0.4) 0%, rgba(30,64,175,0.2) 40%, transparent 70%)",
          filter: "blur(120px)",
          opacity: 0.12,
          transition: "opacity 0.5s ease",
        }}
      />

      {/* SECONDARY glow — slower trail, darker indigo/purple depth */}
      <div
        ref={secondaryRef}
        className="absolute top-0 left-0 will-change-transform"
        style={{
          width: 800,
          height: 800,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(49,46,129,0.3) 0%, rgba(67,56,202,0.1) 40%, transparent 70%)",
          filter: "blur(140px)",
          opacity: 0.08,
          transition: "opacity 0.5s ease",
        }}
      />
    </div>
  );
};

export default CursorGlow;
