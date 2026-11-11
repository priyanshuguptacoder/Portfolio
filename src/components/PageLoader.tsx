import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const PageLoader = () => {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return !sessionStorage.getItem("pg-loader-seen");
  });

  useEffect(() => {
    if (!visible) return;
    sessionStorage.setItem("pg-loader-seen", "1");
    const timeout = window.setTimeout(() => setVisible(false), 900);
    return () => window.clearTimeout(timeout);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[100] grid place-items-center bg-[#05060A]"
          aria-label="Loading portfolio"
          role="status"
        >
          <div className="relative grid h-28 w-28 place-items-center">
            <div className="absolute inset-0 rounded-full border border-cyan-300/20 animate-spin" />
            <div className="absolute inset-3 rounded-full border border-violet-400/30 [animation-direction:reverse] animate-spin" />
            <span className="gradient-text font-heading text-4xl font-black">PG</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
