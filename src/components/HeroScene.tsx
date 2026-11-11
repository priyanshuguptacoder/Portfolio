import { lazy, Suspense, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// Replace PLACEHOLDER with the published Spline scene identifier.
const SPLINE_SCENE_URL = "https://prod.spline.design/PLACEHOLDER/scene.splinecode";
const Spline = lazy(() => import("@splinetool/react-spline"));

const OrbFallback = () => (
  <div className="relative grid h-full min-h-72 place-items-center overflow-hidden rounded-[1.75rem]">
    <div className="absolute h-56 w-56 animate-pulse-glow rounded-full bg-gradient-to-br from-cyan-300/70 via-sky-500/30 to-violet-500/60 blur-2xl" />
    <div className="absolute h-64 w-64 animate-spin rounded-full border border-cyan-300/30 [animation-duration:12s]" />
    <div className="absolute h-44 w-44 animate-spin rounded-full border border-violet-300/30 [animation-direction:reverse] [animation-duration:9s]" />
    <div className="relative grid h-24 w-24 place-items-center rounded-full border border-white/20 bg-white/10 text-center shadow-neon-mix backdrop-blur-xl">
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/70">Build<br />Create</span>
    </div>
  </div>
);

const HeroScene = () => {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 80, damping: 20 });
  const springY = useSpring(y, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = "connection" in navigator && Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);
    if (reduced || saveData || window.innerWidth < 768 || SPLINE_SCENE_URL.includes("PLACEHOLDER")) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setEnabled(true);
        observer.disconnect();
      }
    }, { rootMargin: "200px" });
    const node = document.getElementById("hero-scene");
    if (node) observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      id="hero-scene"
      className="relative mx-auto w-full max-w-[520px]"
      style={{ x: springX, y: springY }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(((event.clientX - rect.left) / rect.width - 0.5) * 24);
        y.set(((event.clientY - rect.top) / rect.height - 0.5) * 24);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      <div className="absolute inset-8 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="glass relative min-h-72 overflow-hidden p-2 sm:min-h-[440px]">
        {enabled ? (
          <ErrorBoundary fallback={<OrbFallback />}>
            <Suspense fallback={<OrbFallback />}>
              <Spline scene={SPLINE_SCENE_URL} className="h-full min-h-72 w-full sm:min-h-[424px]" />
            </Suspense>
          </ErrorBoundary>
        ) : <OrbFallback />}
      </div>
      <div className="absolute -left-5 top-16 hidden animate-float rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs text-white/80 backdrop-blur-xl lg:block">React</div>
      <div className="absolute -right-7 top-1/3 hidden animate-float rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs text-white/80 backdrop-blur-xl [animation-delay:1s] lg:block">Node.js</div>
      <div className="absolute bottom-10 -right-4 hidden animate-float rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs text-white/80 backdrop-blur-xl [animation-delay:2s] lg:block">MongoDB</div>
    </motion.div>
  );
};

export default HeroScene;
