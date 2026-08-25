import { useEffect, useRef } from "react";

/**
 * PremiumCursor — A high-performance, coherent reusable cursor system.
 * Handles inner dot, outer ring, trail, contextual labels, text morphing, and ambient glows.
 * Uses requestAnimationFrame and direct DOM manipulation to avoid React re-renders.
 */
const PremiumCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const trailContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouch = matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouch || prefersReducedMotion) return;

    document.body.classList.add("custom-cursor-active");

    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let ring = { x: mouse.x, y: mouse.y };
    let glow = { x: mouse.x, y: mouse.y };
    let rafId: number;
    let isClicked = false;
    
    // Trail physics
    const trailDots = 5;
    const trailPositions = Array.from({ length: trailDots }, () => ({ x: mouse.x, y: mouse.y }));
    const trailElements = trailContainerRef.current ? Array.from(trailContainerRef.current.children) as HTMLDivElement[] : [];
    
    // State machine
    let cursorState = "default"; 
    let labelText = "";

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      const el = e.target as HTMLElement;

      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.closest("input, textarea")) {
        cursorState = "hidden";
        return;
      }

      const clickable = el.closest("a, button, [role='button'], .premium-card");
      if (clickable) {
        cursorState = "hover";
        if (clickable.tagName === "A") {
          const href = (clickable as HTMLAnchorElement).href;
          if (href.includes("github.com")) labelText = "GITHUB";
          else if (href.includes("Resume.pdf")) labelText = "RESUME";
          else labelText = "OPEN";
        } else if (clickable.closest("#contact")) {
          labelText = "CONTACT";
        } else if (clickable.closest(".premium-card")) {
          labelText = "VIEW";
        } else {
          labelText = "";
        }
        return;
      }

      const textElements = ["P", "H1", "H2", "H3", "H4", "H5", "H6", "SPAN", "LI"];
      if (textElements.includes(el.tagName)) {
        cursorState = "text";
        labelText = "";
        return;
      }

      cursorState = "default";
      labelText = "";
    };

    const onMouseDown = () => { isClicked = true; };
    const onMouseUp = () => { isClicked = false; };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });

    const tick = () => {
      // Lerp logic
      ring.x += (mouse.x - ring.x) * 0.15;
      ring.y += (mouse.y - ring.y) * 0.15;

      glow.x += (mouse.x - glow.x) * 0.08;
      glow.y += (mouse.y - glow.y) * 0.08;

      // Update trail positions
      let prev = { x: mouse.x, y: mouse.y };
      for (let i = 0; i < trailDots; i++) {
        const p = trailPositions[i];
        p.x += (prev.x - p.x) * 0.3; // Trail follows predecessor
        p.y += (prev.y - p.y) * 0.3;
        prev = { x: p.x, y: p.y };

        if (trailElements[i]) {
          trailElements[i].style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate3d(-50%, -50%, 0)`;
        }
      }

      if (dotRef.current && ringRef.current && labelRef.current && glowRef.current) {
        // Core positioning
        dotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate3d(-50%, -50%, 0)`;
        
        let ringScale = isClicked ? 0.8 : 1;
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate3d(-50%, -50%, 0) scale(${ringScale})`;
        
        glowRef.current.style.transform = `translate3d(${glow.x}px, ${glow.y}px, 0) translate3d(-50%, -50%, 0)`;

        // State Machine
        if (cursorState === "hidden") {
          dotRef.current.style.opacity = "0";
          ringRef.current.style.opacity = "0";
          glowRef.current.style.opacity = "0";
        } else if (cursorState === "hover") {
          ringRef.current.className = "fixed top-0 left-0 pointer-events-none z-[99] flex items-center justify-center border border-cyan-400/60 rounded-full will-change-transform bg-cyan-400/10 backdrop-blur-sm cursor-ring-transition";
          ringRef.current.style.width = "48px";
          ringRef.current.style.height = "48px";
          ringRef.current.style.opacity = "1";

          dotRef.current.style.opacity = "0";

          if (labelText) {
            labelRef.current.textContent = labelText;
            labelRef.current.style.opacity = "1";
          } else {
            labelRef.current.style.opacity = "0";
          }
        } else if (cursorState === "text") {
          ringRef.current.className = "fixed top-0 left-0 pointer-events-none z-[99] bg-cyan-400/60 rounded-sm will-change-transform cursor-ring-transition";
          ringRef.current.style.width = "2px";
          ringRef.current.style.height = "24px";
          ringRef.current.style.border = "none";
          ringRef.current.style.opacity = "1";

          dotRef.current.style.opacity = "0";
          labelRef.current.style.opacity = "0";
        } else {
          ringRef.current.className = "fixed top-0 left-0 pointer-events-none z-[99] border border-white/40 rounded-full flex items-center justify-center will-change-transform cursor-ring-transition";
          ringRef.current.style.width = "32px";
          ringRef.current.style.height = "32px";
          ringRef.current.style.backgroundColor = "transparent";
          ringRef.current.style.opacity = "1";

          dotRef.current.style.opacity = "1";
          labelRef.current.style.opacity = "0";
          glowRef.current.style.opacity = "1";
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      cancelAnimationFrame(rafId);
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);

  if (typeof window !== "undefined") {
    const isTouch = matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || prefersReducedMotion) return null;
  }

  return (
    <>
      {/* GLOW LAYER */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 pointer-events-none z-[98] mix-blend-screen will-change-transform transition-opacity duration-300"
        style={{
          width: '100px',
          height: '100px',
          background: 'radial-gradient(circle, rgba(34,211,238,0.15), transparent 70%)'
        }}
      />

      {/* TRAIL */}
      <div ref={trailContainerRef} className="fixed inset-0 pointer-events-none z-[98] mix-blend-screen overflow-visible">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 left-0 w-1.5 h-1.5 bg-cyan-400 rounded-full will-change-transform"
            style={{ opacity: 0.4 - (i * 0.08), filter: `blur(${i}px)` }}
          />
        ))}
      </div>

      {/* INNER DOT */}
      <div 
        ref={dotRef} 
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-cyan-400 rounded-full pointer-events-none z-[100] transition-opacity duration-200 will-change-transform"
      />
      
      {/* OUTER RING */}
      <div 
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[99] border border-white/40 rounded-full flex items-center justify-center will-change-transform cursor-ring-transition"
        style={{ width: '32px', height: '32px' }}
      >
        <span 
          ref={labelRef} 
          className="text-[8px] font-black tracking-widest text-white transition-opacity duration-200 opacity-0"
        />
      </div>
    </>
  );
};

export default PremiumCursor;
