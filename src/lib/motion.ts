import type { Variants } from "framer-motion";

export const ease = [0.22, 1, 0.36, 1] as const;
export const spring = { type: "spring" as const, stiffness: 120, damping: 18 };
export const viewport = { once: true, amount: 0.25 };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export const staggerContainer = (delay = 0.1, stagger = 0.12): Variants => ({
  hidden: {},
  show: { transition: { delayChildren: delay, staggerChildren: stagger } },
});

export const reducedFade = (reduced: boolean): Variants =>
  reduced
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.35 } },
      }
    : fadeUp;
