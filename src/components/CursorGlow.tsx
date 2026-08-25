import { useEffect, useRef } from "react";

/**
 * PremiumCursor — A high-performance, coherent reusable cursor system.
 * Handles inner dot, outer ring, contextual labels, text morphing, and ambient glows.
 * Uses requestAnimationFrame and direct DOM manipulation to avoid React re-renders.
 */
const PremiumCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const primaryGlowRef = useRef<HTMLDivElement>(null);
  const secondaryGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Touch & Reduced Motion Feature Detection
    const isTouch = matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouch) return; // Completely disable on touch devices

    document.body.classList.add("custom-cursor-active");

    // 2. Physics & State
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let ring = { x: mouse.x, y: mouse.y };
    let primaryGlow = { x: mouse.x, y: mouse.y };
    let secondaryGlow = { x: mouse.x, y: mouse.y };
    let rafId: number;
    
    // State machine: "default", "hover", "text"
    let cursorState = "default"; 
    let labelText = "";
    let isInputHovered = false;

    // 3. Event Listeners
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if (prefersReducedMotion) return; // If reduced motion, we skip custom follow logic and let CSS handle hiding it if needed, or we just freeze it. Wait, if reduced motion, we should just disable the custom cursor entirely.

      const el = e.target as HTMLElement;

      // Detect Inputs
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        isInputHovered = true;
        cursorState = "hidden"; // Hide custom cursor completely over inputs
        return;
      }
      isInputHovered = false;

      // Detect Clickables
      const clickable = el.closest("a, button, [role='button'], .premium-card");
      if (clickable) {
        cursorState = "hover";
        
        // Contextual Labels
        if (clickable.tagName === "A") {
          const href = (clickable as HTMLAnchorElement).href;
          if (href.includes("github.com")) labelText = "GITHUB";
          else if (href.includes("Resume.pdf")) labelText = "RESUME";
          else labelText = "OPEN";
        } else if (clickable.closest("#contact")) {
          labelText = "SEND";
        } else if (clickable.closest(".premium-card")) {
          labelText = "VIEW";
        } else {
          labelText = "";
        }
        return;
      }

      // Detect Text
      const textElements = ["P", "H1", "H2", "H3", "H4", "H5", "H6", "SPAN", "LI"];
      if (textElements.includes(el.tagName)) {
        cursorState = "text";
        labelText = "";
        return;
      }

      // Default
      cursorState = "default";
      labelText = "";
    };

    const tick = () => {
      if (prefersReducedMotion) return;

      // Lerp for smooth lag
      ring.x += (mouse.x - ring.x) * 0.15;
      ring.y += (mouse.y - ring.y) * 0.15;

      primaryGlow.x += (mouse.x - primaryGlow.x) * 0.08;
      primaryGlow.y += (mouse.y - primaryGlow.y) * 0.08;

      secondaryGlow.x += (mouse.x - secondaryGlow.x) * 0.035;
      secondaryGlow.y += (mouse.y - secondaryGlow.y) * 0.035;

      // Direct DOM updates
      if (dotRef.current && ringRef.current && labelRef.current) {
        // Zero lag dot
        dotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate3d(-50%, -50%, 0)`;
        
        // Smooth lag ring
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate3d(-50%, -50%, 0)`;

        // Apply State
        if (cursorState === "hidden") {
          dotRef.current.style.opacity = "0";
          ringRef.current.style.opacity = "0";
        } else if (cursorState === "hover") {
          ringRef.current.className = "fixed top-0 left-0 pointer-events-none z-[99] flex items-center justify-center border border-cyan-400/50 rounded-full will-change-transform bg-cyan-400/10 backdrop-blur-sm cursor-ring-transition";
          ringRef.current.style.width = "48px";
          ringRef.current.style.height = "48px";
          ringRef.current.style.opacity = "1";

          dotRef.current.style.opacity = "0";
          dotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate3d(-50%, -50%, 0) scale(0.5)`;

          if (labelText) {
            labelRef.current.textContent = labelText;
            labelRef.current.style.opacity = "1";
          } else {
            labelRef.current.style.opacity = "0";
          }
        } else if (cursorState === "text") {
          ringRef.current.className = "fixed top-0 left-0 pointer-events-none z-[99] bg-cyan-400/60 rounded-sm will-change-transform cursor-ring-transition";
          ringRef.current.style.width = "4px";
          ringRef.current.style.height = "24px";
          ringRef.current.style.border = "none";
          ringRef.current.style.opacity = "1";

          dotRef.current.style.opacity = "0";
          labelRef.current.style.opacity = "0";
        } else {
          // Default
          ringRef.current.className = "fixed top-0 left-0 pointer-events-none z-[99] border-2 border-cyan-500/50 rounded-full flex items-center justify-center will-change-transform cursor-ring-transition";
          ringRef.current.style.width = "32px";
          ringRef.current.style.height = "32px";
          ringRef.current.style.backgroundColor = "transparent";
          ringRef.current.style.opacity = "1";

          dotRef.current.style.opacity = "1";
          labelRef.current.style.opacity = "0";
        }
      }

      // Update ambient glows
      const glowIntensity = cursorState === "hover" ? 1.5 : 1;
      if (primaryGlowRef.current) {
        primaryGlowRef.current.style.transform = `translate3d(${primaryGlow.x}px, ${primaryGlow.y}px, 0) translate3d(-50%, -50%, 0)`;
        primaryGlowRef.current.style.opacity = String(1 * glowIntensity);
      }
      if (secondaryGlowRef.current) {
        secondaryGlowRef.current.style.transform = `translate3d(${secondaryGlow.x}px, ${secondaryGlow.y}px, 0) translate3d(-50%, -50%, 0)`;
        secondaryGlowRef.current.style.opacity = String(1 * glowIntensity);
      }

      rafId = requestAnimationFrame(tick);
    };

    if (!prefersReducedMotion) {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
      rafId = requestAnimationFrame(tick);
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);

  // Hide on SSR or mobile
  if (typeof window !== "undefined") {
    const isTouch = matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || prefersReducedMotion) return null;
  }

  return (
    <>
      {/* AMBIENT GLOWS */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }} aria-hidden="true">
        <div
          ref={primaryGlowRef}
          className="absolute top-0 left-0 will-change-transform mix-blend-screen"
          style={{
            width: 600, height: 600,
            background: "radial-gradient(300px circle at center, rgba(34, 211, 238, 0.08), rgba(59, 130, 246, 0.04), transparent 100%)",
            transition: "opacity 0.4s ease-out",
          }}
        />
        <div
          ref={secondaryGlowRef}
          className="absolute top-0 left-0 will-change-transform mix-blend-screen"
          style={{
            width: 800, height: 800,
            background: "radial-gradient(400px circle at center, rgba(34, 211, 238, 0.03), transparent 100%)",
            transition: "opacity 0.6s ease-out",
          }}
        />
      </div>

      {/* INNER DOT */}
      <div 
        ref={dotRef} 
        className="fixed top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-[100] transition-opacity duration-300 will-change-transform"
      />
      
      {/* OUTER RING */}
      <div 
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[99] border-2 border-cyan-500/50 rounded-full flex items-center justify-center will-change-transform cursor-ring-transition"
        style={{ width: '32px', height: '32px' }}
      >
        <span 
          ref={labelRef} 
          className="text-[7px] font-black tracking-widest text-cyan-300 transition-opacity duration-300 opacity-0"
        />
      </div>
    </>
  );
};

export default PremiumCursor;
