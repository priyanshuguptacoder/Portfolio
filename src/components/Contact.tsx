import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useState } from "react";
import { sectionVariants, itemVariants, headingVariants } from "@/lib/animations";

// ─── Custom LeetCode SVG (official logo style) ───────────────────────────────
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

// ─── Social Link Config ───────────────────────────────────────────────────────
const socials = [
  {
    label: "GitHub",
    href: "https://github.com/priyanshuguptacoder",
    icon: <FaGithub size={24} />,
    hoverColor: "group-hover:text-white",
    borderGlow: "hover:border-white/40 hover:shadow-[0_0_20px_rgba(255,255,255,0.12)]",
    bgGlow: "rgba(255,255,255,0.05)",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/priyanshu-gupta-b98689376/",
    icon: <FaLinkedin size={24} />,
    hoverColor: "group-hover:text-blue-400",
    borderGlow: "hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]",
    bgGlow: "rgba(59,130,246,0.06)",
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/invisiblemanfromheart/",
    icon: <LeetCodeIcon size={24} />,
    hoverColor: "group-hover:text-orange-400",
    borderGlow: "hover:border-orange-400/50 hover:shadow-[0_0_20px_rgba(251,146,60,0.2)]",
    bgGlow: "rgba(251,146,60,0.06)",
  },
  {
    label: "Codeforces",
    href: "https://codeforces.com/profile/priyanshuguptacoder",
    icon: <CodeforcesIcon size={24} />,
    hoverColor: "group-hover:text-red-400",
    borderGlow: "hover:border-red-400/50 hover:shadow-[0_0_20px_rgba(248,113,113,0.2)]",
    bgGlow: "rgba(248,113,113,0.06)",
  },
];

// ─── Social Icon Card ─────────────────────────────────────────────────────────
const SocialIcon = ({
  href,
  label,
  icon,
  hoverColor,
  borderGlow,
  bgGlow,
  delay,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  hoverColor: string;
  borderGlow: string;
  bgGlow: string;
  delay: number;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      className="relative flex flex-col items-center gap-3"
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`group relative flex items-center justify-center w-12 h-12 rounded-xl border border-white/10 bg-[#0b1220] text-white/30 backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-105 active:scale-95 ${borderGlow} ${hoverColor}`}
        style={{
          boxShadow: hovered ? undefined : "0 4px 24px rgba(0,0,0,0.3)",
          background: hovered
            ? `linear-gradient(135deg, ${bgGlow}, #0b1220 60%)`
            : "#0b1220",
        }}
      >
        {/* Ambient glow blob */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
          style={{ background: `radial-gradient(circle, ${bgGlow}, transparent 70%)` }}
        />
        <span className={`relative z-10 transition-all duration-300 ${hoverColor}`}>
          {icon}
        </span>
      </a>

      {/* Tooltip */}
      <motion.span
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 4 }}
        transition={{ duration: 0.2 }}
        className="text-[10px] font-mono uppercase tracking-widest text-white/30 pointer-events-none select-none"
      >
        {label}
      </motion.span>
    </motion.div>
  );
};

// ─── CONTACT SECTION ─────────────────────────────────────────────────────────
const Contact = () => (
  <section id="contact" className="py-40 relative overflow-hidden">
    {/* Ambient glows */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/8 blur-[140px] rounded-full pointer-events-none" />
    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/8 blur-[100px] rounded-full pointer-events-none" />

    <div className="container mx-auto px-6 max-w-3xl text-center relative z-10">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <motion.p variants={itemVariants} className="text-cyan-400 font-mono text-[10px] tracking-[0.4em] uppercase mb-6 font-bold">
          CONNECT
        </motion.p>
        <motion.h2 variants={headingVariants} className="font-heading text-5xl sm:text-7xl font-black text-white mb-8 leading-tight tracking-tighter">
          Let's Build Something{" "}
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
            Meaningful
          </span>
        </motion.h2>
        <motion.p variants={itemVariants} className="text-lg text-white/40 mb-16 max-w-xl mx-auto leading-relaxed font-light">
          I'm actively looking for backend internships and impactful projects. If you're building
          something interesting, let's connect.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col items-center gap-14">
          {/* Primary CTA */}
          <a
            href="mailto:priyanshuguptanitian9696@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-gradient-to-r from-blue-500 to-cyan-500 px-14 py-5 rounded-full font-black text-base text-white transition-all duration-400 hover:scale-105 active:scale-95 shadow-xl shadow-blue-500/20 hover:shadow-cyan-400/30 flex items-center gap-3"
          >
            <Mail size={20} />
            Email Me
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 blur-xl bg-cyan-400 transition-opacity" />
          </a>

          {/* Social Icons */}
          <div className="flex items-end justify-center gap-8">
            {socials.map((s, i) => (
              <SocialIcon key={s.label} {...s} delay={i * 0.1} />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default Contact;
