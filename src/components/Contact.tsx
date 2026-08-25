import { motion } from "framer-motion";
import { Mail, ExternalLink } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiCodechef, SiGeeksforgeeks } from "react-icons/si";
import { useRef, useState, useEffect, useCallback } from "react";
import { sectionVariants, itemVariants } from "@/lib/animations";
import { trackContactClick } from "@/lib/analytics";
import { MagneticButton } from "@/components/ui/MagneticButton";

// ─── Custom SVG Icons ─────────────────────────────────────────────────────────
const LeetCodeIcon = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
  </svg>
);

const CodeforcesIcon = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.672 21 0 20.328 0 19.5V9C0 8.172.672 7.5 1.5 7.5h3zm9-4.5c.828 0 1.5.672 1.5 1.5v15c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5v-15c0-.828.672-1.5 1.5-1.5h3zm9 7.5c.828 0 1.5.672 1.5 1.5v7.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5v-7.5c0-.828.672-1.5 1.5-1.5h3z"/>
  </svg>
);

const AtCoderIcon = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.998 2.5 4.5 21h3.11l1.33-3.5h6.12L16.39 21h3.11L11.998 2.5zm-2.02 11.5L12 8.4 14.02 14H9.978z" />
  </svg>
);

const CodolioIcon = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 3C3.895 3 3 3.895 3 5v14c0 1.105.895 2 2 2h14c1.105 0 2-.895 2-2V5c0-1.105-.895-2-2-2H5zm2 4h3v10H7V7zm7 0h3v10h-3V7z" />
  </svg>
);

// ─── Social Link Config ───────────────────────────────────────────────────────
const socials = [
  {
    label: "GitHub",
    href: "https://github.com/priyanshuguptacoder",
    icon: FaGithub,
    hoverColor: "group-hover:text-white",
    hoverBorder: "hover:border-white/40",
    hoverShadow: "hover:shadow-[0_0_24px_rgba(255,255,255,0.15)]",
    bgGlow: "rgba(255,255,255,0.06)",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/priyanshu-gupta-b98689376",
    icon: FaLinkedin,
    hoverColor: "group-hover:text-blue-400",
    hoverBorder: "hover:border-blue-400/50",
    hoverShadow: "hover:shadow-[0_0_24px_rgba(59,130,246,0.2)]",
    bgGlow: "rgba(59,130,246,0.08)",
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/invisiblemanfromheart/",
    icon: LeetCodeIcon,
    hoverColor: "group-hover:text-orange-400",
    hoverBorder: "hover:border-orange-400/50",
    hoverShadow: "hover:shadow-[0_0_24px_rgba(251,146,60,0.2)]",
    bgGlow: "rgba(251,146,60,0.08)",
  },
  {
    label: "Codeforces",
    href: "https://codeforces.com/profile/priyanshuguptacoder",
    icon: CodeforcesIcon,
    hoverColor: "group-hover:text-red-400",
    hoverBorder: "hover:border-red-400/50",
    hoverShadow: "hover:shadow-[0_0_24px_rgba(248,113,113,0.2)]",
    bgGlow: "rgba(248,113,113,0.08)",
  },
  {
    label: "CodeChef",
    href: "https://codechef.com/users/priyanshu9696",
    icon: SiCodechef,
    hoverColor: "group-hover:text-orange-400",
    hoverBorder: "hover:border-orange-400/50",
    hoverShadow: "hover:shadow-[0_0_24px_rgba(251,146,60,0.2)]",
    bgGlow: "rgba(251,146,60,0.08)",
  },
  {
    label: "AtCoder",
    href: "https://atcoder.jp/users/TheAlgoEdge",
    icon: AtCoderIcon,
    hoverColor: "group-hover:text-blue-400",
    hoverBorder: "hover:border-blue-400/50",
    hoverShadow: "hover:shadow-[0_0_24px_rgba(59,130,246,0.2)]",
    bgGlow: "rgba(59,130,246,0.08)",
  },
  {
    label: "GeeksforGeeks",
    href: "https://www.geeksforgeeks.org/profile/thealgoedge",
    icon: SiGeeksforgeeks,
    hoverColor: "group-hover:text-green-500",
    hoverBorder: "hover:border-green-500/50",
    hoverShadow: "hover:shadow-[0_0_24px_rgba(34,197,94,0.2)]",
    bgGlow: "rgba(34,197,94,0.08)",
  },
  {
    label: "Codolio",
    href: "https://codolio.com/profile/priyanshuguptacoder",
    icon: CodolioIcon,
    hoverColor: "group-hover:text-blue-400",
    hoverBorder: "hover:border-blue-400/50",
    hoverShadow: "hover:shadow-[0_0_24px_rgba(59,130,246,0.2)]",
    bgGlow: "rgba(59,130,246,0.08)",
  },
];

// ─── Social Icon Card ─────────────────────────────────────────────────────────
const SocialIcon = ({
  href,
  label,
  icon: Icon,
  hoverColor,
  hoverBorder,
  hoverShadow,
  bgGlow,
  index,
}: {
  href: string;
  label: string;
  icon: any;
  hoverColor: string;
  hoverBorder: string;
  hoverShadow: string;
  bgGlow: string;
  index: number;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20, scale: 0.9 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            delay: 0.36 + index * 0.07,
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      className="relative flex flex-col items-center"
    >
      <MagneticButton
        href={href}
        {...(href !== "#" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        aria-label={label}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`group relative flex items-center justify-center
          w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] md:w-[60px] md:h-[60px]
          rounded-2xl border border-white/10 bg-[#0b1220]/80 backdrop-blur-sm
          text-white/40 transition-all duration-300 ease-out
          hover:-translate-y-[5px] hover:scale-[1.08] hover:rotate-1
          active:scale-95
          ${hoverBorder} ${hoverShadow} ${hoverColor}`}
        style={{
          background: hovered
            ? `linear-gradient(135deg, ${bgGlow}, #0b1220 60%)`
            : "rgba(11,18,32,0.8)",
        }}
      >
        {/* Ambient glow blob */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${bgGlow}, transparent 70%)` }}
        />
        {/* Animated border on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none social-icon-border"
        />
        <span className={`relative z-10 transition-all duration-300 ${hoverColor}`}>
          <Icon size={28} />
        </span>
      </MagneticButton>

      {/* Tooltip */}
      <motion.span
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
        transition={{ duration: 0.18 }}
        className="absolute -top-10 left-1/2 -translate-x-1/2 z-50 
          px-3 py-1.5 rounded-lg text-[11px] font-mono uppercase tracking-widest
          text-white/80 bg-black/70 border border-cyan-400/20 backdrop-blur-sm
          pointer-events-none select-none whitespace-nowrap
          shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
      >
        {label}
      </motion.span>
    </motion.div>
  );
};

// ─── CONTACT SECTION ─────────────────────────────────────────────────────────
const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Mouse-reactive background: store CSS vars via ref (no React re-renders)
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    mouseRef.current = { x: nx, y: ny };
  }, []);

  const animateGlows = useCallback(() => {
    const section = sectionRef.current;
    if (section) {
      section.style.setProperty("--contact-mx", `${mouseRef.current.x}`);
      section.style.setProperty("--contact-my", `${mouseRef.current.y}`);
    }
    rafRef.current = requestAnimationFrame(animateGlows);
  }, []);

  useEffect(() => {
    // Feature detection
    const isTouch = matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || prefersReducedMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    section.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animateGlows);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove, animateGlows]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-24 md:py-32 relative overflow-hidden"
      aria-label="Contact Priyanshu Gupta"
      style={{ "--contact-mx": "0", "--contact-my": "0" } as React.CSSProperties}
    >
      {/* ── Ambient background glows ── */}
      <div
        className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/[0.06] blur-[150px] rounded-full pointer-events-none contact-glow-1"
      />
      <div
        className="absolute bottom-[30%] left-[20%] w-[400px] h-[400px] bg-blue-500/[0.05] blur-[130px] rounded-full pointer-events-none contact-glow-2"
      />
      <div
        className="absolute bottom-[10%] right-[15%] w-[350px] h-[350px] bg-purple-500/[0.04] blur-[120px] rounded-full pointer-events-none contact-glow-3"
      />

      <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          {/* ── Label ── */}
          <motion.p
            variants={itemVariants}
            className="text-cyan-400 font-mono text-[10px] tracking-[0.4em] uppercase mb-6 font-bold"
          >
            CONNECT
          </motion.p>

          {/* ── Heading — large gradient with animation ── */}
          <motion.h2
            ref={headingRef}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className="font-heading font-black text-white mb-6 leading-[1.05] tracking-tighter"
            style={{ fontSize: "clamp(48px, 8vw, 105px)" }}
          >
            Let's Build Scalable{" "}
            <span className="contact-heading-gradient">
              Systems Together
            </span>
          </motion.h2>

          {/* ── Description ── */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { delay: 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className="text-white/60 mb-14 mx-auto font-light leading-[1.6]"
            style={{ fontSize: "clamp(16px, 1.5vw, 20px)", maxWidth: "750px" }}
          >
            Currently looking for software engineering and backend/full-stack internship opportunities.
          </motion.p>

          {/* ── CTA & Social Row ── */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.12, delayChildren: 0.24 },
              },
            }}
            className="flex flex-col items-center gap-12"
          >
            {/* ── Email CTA ── */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.95 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              <MagneticButton
                href="mailto:priyanshuguptanitian9696@gmail.com"
                onClick={() => trackContactClick("email")}
                className="contact-cta-btn group relative inline-flex items-center justify-center gap-3
                  w-[220px] md:w-[250px] h-[64px] md:h-[70px]
                  rounded-full font-black text-base text-white
                  transition-all duration-300
                  hover:-translate-y-[3px] hover:scale-[1.02]
                  active:scale-[0.97]"
              >
                <Mail size={20} className="relative z-10 transition-transform duration-300 group-hover:translate-x-[-3px] group-hover:-translate-y-[2px]" />
                <span className="relative z-10">Email Me</span>
                {/* Hover glow layer */}
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-40 blur-xl bg-cyan-400 transition-opacity duration-300 pointer-events-none" />
              </MagneticButton>
            </motion.div>

            {/* ── Social Icons ── */}
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.07, delayChildren: 0.36 },
                },
              }}
              className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 md:gap-6"
            >
              {socials.map((s, i) => (
                <SocialIcon key={s.label} {...s} index={i} />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
