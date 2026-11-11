import { AnimatePresence, motion, useInView, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Code2, Trophy, Server, ExternalLink, Zap } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";
import { sectionVariants, itemVariants } from "@/lib/animations";
import { PORTFOLIO_STATS, PROFILE_URLS } from "@/lib/portfolioStats";
import HeroScene from "@/components/HeroScene";
import { fadeUp, spring, staggerContainer, viewport } from "@/lib/motion";

// --- LOCAL COMPONENT: PRIMARY STAT CARD ---
const PrimaryStatCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const isTouch = matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || prefersReducedMotion) return;

    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--local-x', `${e.clientX - rect.left}px`);
    ref.current.style.setProperty('--local-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`primary-stat-card p-6 flex flex-col justify-center ${className}`}
      data-cursor="view"
    >
      {children}
    </div>
  );
};

// ── Stagger container with fast cadence ────────────────────────────────────
const fastStaggerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const nameRevealVariants = {
  hidden: { opacity: 0, y: "0.75em", filter: "blur(8px)" },
  show: (index: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { ...spring, delay: index * 0.08 },
  }),
};

const chipRevealVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.86 },
  show: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { ...spring, delay: index * 0.08 },
  }),
};

const stats = [
  {
    icon: Code2,
    value: PORTFOLIO_STATS.leetcode.problemsSolved,
    suffix: "+",
    label: "LEETCODE PROBLEMS SOLVED",
    detail: "Strong coverage across core DSA topics with consistent problem solving.",
    extraInfo: `Rating: ${PORTFOLIO_STATS.leetcode.rating} • ${PORTFOLIO_STATS.leetcode.tier} • Top ${PORTFOLIO_STATS.leetcode.topPercentage}`,
    linkText: "View Profile",
    linkUrl: PROFILE_URLS.leetcode
  },
  {
    icon: Server,
    value: PORTFOLIO_STATS.total.problemsSolved,
    suffix: "+",
    label: "TOTAL QUESTIONS SOLVED",
    detail: "Combined problem solving across coding platforms",
    extraInfo: "LeetCode • Codeforces • CodeChef • AtCoder • GFG",
    linkText: "View Codolio",
    linkUrl: "https://codolio.com/profile/priyanshuguptacoder",
    isDominant: true,
  },
  {
    icon: Trophy,
    value: PORTFOLIO_STATS.codeforces.problemsSolved,
    suffix: "+",
    label: "PROBLEMS SOLVED (CODEFORCES)",
    detail: "Building competitive programming fundamentals with focus on speed and implementation.",
    extraInfo: `Rating: ${PORTFOLIO_STATS.codeforces.rating} (${PORTFOLIO_STATS.codeforces.tier})`,
    linkText: "View Profile",
    linkUrl: PROFILE_URLS.codeforces
  },
];

const CountUp = ({ end, prefix = "", suffix = "", duration = 2 }: { end: number; prefix?: string; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start * 10) / 10);
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [end, duration, inView]);

  const display = Number.isInteger(end) ? Math.floor(count) : count.toFixed(1);
  return <span ref={ref}>{prefix}{display}{suffix}</span>;
};

const Hero = () => {
  const reducedMotion = useReducedMotion();
  const [titleIndex, setTitleIndex] = useState(0);
  const [titlePaused, setTitlePaused] = useState(false);
  const ambientX = useMotionValue(0);
  const ambientY = useMotionValue(0);
  const smoothAmbientX = useSpring(ambientX, { stiffness: 45, damping: 24 });
  const smoothAmbientY = useSpring(ambientY, { stiffness: 45, damping: 24 });
  const titles = ["Full-Stack Web Developer", "Competitive Programmer"];

  useEffect(() => {
    if (reducedMotion || titlePaused) return;
    const timer = window.setInterval(() => setTitleIndex((index) => (index + 1) % titles.length), 2500);
    return () => window.clearInterval(timer);
  }, [reducedMotion, titlePaused, titles.length]);

  const handleAmbientMove = (event: React.MouseEvent<HTMLElement>) => {
    if (reducedMotion || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    ambientX.set((event.clientX - rect.left - rect.width / 2) * 0.035);
    ambientY.set((event.clientY - rect.top - rect.height / 2) * 0.02);
  };

  const resetAmbient = () => {
    ambientX.set(0);
    ambientY.set(0);
  };

  return (
    <>
      {/* HERO SECTION */}
      <section
        className="relative min-h-screen overflow-hidden pb-20 pt-24 lg:pt-32"
        onMouseMove={handleAmbientMove}
        onMouseLeave={resetAmbient}
      >
        <div className="site-grid pointer-events-none absolute inset-0 opacity-50" />
        <motion.div
          className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-cyan-400/10 blur-[120px] animate-pulse-glow"
          style={{ x: reducedMotion ? 0 : smoothAmbientX, y: reducedMotion ? 0 : smoothAmbientY }}
        />
        <motion.div
          className="pointer-events-none absolute -right-32 bottom-10 h-[28rem] w-[28rem] rounded-full bg-violet-500/10 blur-[140px] animate-pulse-glow [animation-delay:1s]"
          style={{ x: reducedMotion ? 0 : smoothAmbientX, y: reducedMotion ? 0 : smoothAmbientY }}
        />
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/[0.06] blur-[120px] animate-ambient-drift" />
        <div className="container relative z-10 mx-auto">
          <motion.div
            className="grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr]"
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={staggerContainer(0.08, 0.1)}
          >

            {/* ── LEFT: TEXT CONTENT ─────────────────────── */}
            <motion.div
              className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left"
            >

              {/* Status pill */}
              <motion.div variants={reducedMotion ? fadeUp : itemVariants} className="glass mb-6 inline-flex items-center gap-2 border-cyan-300/20 bg-cyan-300/10 px-3 py-1.5 lg:mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
                </span>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                  Open to Internship
                </span>
              </motion.div>

              {/* Greeting */}
              <motion.p variants={reducedMotion ? fadeUp : itemVariants} className="mb-3 text-lg tracking-wide text-white/50 font-light">
                Hello, I'm
              </motion.p>

              {/* Name */}
              <motion.h1 variants={reducedMotion ? fadeUp : itemVariants} className="mb-5 flex flex-wrap justify-center gap-3 font-heading text-[clamp(2.5rem,6vw,5rem)] font-black leading-[1.02] tracking-tight lg:justify-start">
                {["Priyanshu", "Gupta"].map((word, index) => (
                  <span key={word} className="overflow-hidden pb-1">
                    <motion.span
                      custom={index}
                      variants={reducedMotion ? fadeUp : nameRevealVariants}
                      className={index === 1 ? "gradient-text hero-name-gradient drop-shadow-[0_0_30px_rgba(34,211,238,0.25)]" : "text-white"}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </motion.h1>

              {/* Role — 2-line structure */}
              <motion.div variants={reducedMotion ? fadeUp : itemVariants} className="mb-5">
                {/* Line 1 */}
                <p className="mb-2 text-base font-medium leading-snug text-white sm:text-lg" onMouseEnter={() => setTitlePaused(true)} onMouseLeave={() => setTitlePaused(false)}>
                  CSE '29 @ NIT Jalandhar
                  <span className="text-white/30 mx-2">·</span>
                  <span className="gradient-text">
                    {reducedMotion ? titles.join(" · ") : (
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.span key={titles[titleIndex]} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}>
                          {titles[titleIndex]}
                        </motion.span>
                      </AnimatePresence>
                    )}
                  </span>
                </p>
                {/* Line 2 */}
                <p className="flex flex-wrap items-center justify-center gap-1.5 text-sm font-medium leading-snug text-white/65 sm:gap-3 sm:text-base lg:justify-start">
                  {["Full-Stack Web Development", "Data Structures & Algorithms", "Competitive Programming"].map((chip, index) => (
                    <motion.span
                      key={chip}
                      custom={index}
                      initial={reducedMotion ? false : "hidden"}
                      animate="show"
                      variants={reducedMotion ? fadeUp : chipRevealVariants}
                      whileHover={reducedMotion ? undefined : { y: -3, scale: 1.02 }}
                      whileTap={reducedMotion ? undefined : { scale: 0.97 }}
                      className="inline-flex items-center rounded-full border border-cyan-200/15 bg-[#0b1222]/80 px-2.5 py-0.5 text-xs !text-white/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md transition-[border-color,background-color,box-shadow,color] duration-300 hover:border-cyan-300/40 hover:bg-[#111d33]/90 hover:!text-white hover:shadow-[0_0_18px_rgba(34,211,238,0.25)] sm:px-3 sm:py-1 sm:text-base"
                    >
                      {chip}
                    </motion.span>
                  ))}
                </p>
              </motion.div>

              {/* Description */}
              <motion.p variants={reducedMotion ? fadeUp : itemVariants} className="mx-auto mb-7 max-w-[55ch] text-sm font-normal leading-[1.75] text-white/55 sm:text-[15px] lg:mx-0">
                Building scalable systems using React.js, Node.js, Express.js, MongoDB, GraphQL, JWT, Tailwind CSS.
                Solved <span className="hero-problems-highlight"><CountUp end={PORTFOLIO_STATS.total.problemsSolved} suffix="+" /> Problems</span> and actively improving through contests.
                Open to Internship Opportunities.
              </motion.p>

              <motion.div variants={reducedMotion ? fadeUp : itemVariants} className="mb-8 flex flex-wrap justify-center gap-2 font-mono text-[10px] uppercase tracking-wider text-white/65 lg:justify-start">
                <span className="glass rounded-full px-3 py-2">LeetCode {PORTFOLIO_STATS.leetcode.tier} {PORTFOLIO_STATS.leetcode.rating}</span>
                <span className="glass rounded-full px-3 py-2">Codeforces {PORTFOLIO_STATS.codeforces.tier} {PORTFOLIO_STATS.codeforces.rating}</span>
                <span className="glass rounded-full px-3 py-2">{PORTFOLIO_STATS.total.problemsSolved}+ Problems</span>
              </motion.div>

              {/* CTAs */}
              <motion.div variants={reducedMotion ? fadeUp : itemVariants} className="flex flex-wrap justify-center gap-3 lg:justify-start">
                <MagneticButton
                  href="#projects"
                  aria-label="View projects"
                  data-cursor="hover"
                  className="hero-cta-primary focus-ring group relative overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-7 py-3.5 text-sm font-bold text-[#05060A] transition-all hover:scale-105 hover:shadow-neon-mix active:scale-95"
                >
                  <span className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-white/40 blur-md transition-transform duration-700 group-hover:translate-x-[320%]" />
                  View Projects
                </MagneticButton>
                <MagneticButton
                  href="/Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download resume"
                  data-cursor="hover"
                  className="focus-ring rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-bold text-white transition-all hover:border-violet-300/60 hover:bg-white/10 hover:shadow-neon-violet active:scale-95"
                >
                  Download Resume
                </MagneticButton>
              </motion.div>

              <motion.div variants={reducedMotion ? fadeUp : itemVariants} className="mt-8 flex justify-center gap-4 text-white/45 lg:justify-start">
                <a className="focus-ring transition-colors hover:text-cyan-300" href="https://github.com/priyanshuguptacoder" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">GitHub</a>
                <a className="focus-ring transition-colors hover:text-cyan-300" href="https://www.linkedin.com/in/priyanshu-gupta-b98689376" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">LinkedIn</a>
                <a className="focus-ring transition-colors hover:text-cyan-300" href={PROFILE_URLS.leetcode} target="_blank" rel="noopener noreferrer" aria-label="LeetCode profile">LeetCode</a>
              </motion.div>
            </motion.div>

            {/* ── RIGHT: PROFILE IMAGE ───────────────────── */}
            <motion.div variants={reducedMotion ? fadeUp : itemVariants} className="order-last lg:order-last">
              <HeroScene />
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* PROOF OF WORK */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                variants={itemVariants}
                className="h-full"
              >
                {/* Staggered float: card1=0s, card2=0.5s, card3=1s */}
                <div
                  className={`stats-card h-full group ${s.isDominant ? "stats-card-featured" : ""}`}
                  style={{ animationDelay: `${i * 0.5}s` }}
                >
                  <div className={`relative p-8 flex flex-col items-center text-center h-full ${s.isDominant ? "z-[2]" : "z-10"}`}>
                    <div
                      className={`stats-icon w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300 ${s.isDominant
                          ? "bg-cyan-500/10 text-cyan-400"
                          : "bg-white/[0.06] text-white/70"
                        }`}
                      style={{ animationDelay: `${i * 0.3}s` }}
                    >
                      <s.icon size={22} />
                    </div>
                    <div className="text-4xl sm:text-5xl font-black mb-2 tracking-tighter text-white transition-transform duration-300 group-hover:scale-105">
                      <CountUp end={s.value} suffix={s.suffix} />
                    </div>
                    <h3 className="text-[11px] font-bold text-white/80 mb-2 uppercase tracking-[0.2em]">{s.label}</h3>
                    <p className="text-xs text-white/40 leading-relaxed font-light mb-4">{s.detail}</p>

                    {s.extraInfo && (
                      <p className="text-sm font-semibold text-cyan-400 mt-auto mb-3">{s.extraInfo}</p>
                    )}
                    {s.linkUrl && (
                      <a
                        href={s.linkUrl}
                        {...(s.linkUrl !== "#" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="mt-auto inline-flex items-center gap-2 text-[12px] font-semibold rounded-full px-5 py-2 z-20 transition-all duration-300 group/link bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:from-blue-500/35 hover:to-cyan-500/35 hover:border-cyan-400/70 hover:text-white hover:shadow-[0_0_18px_rgba(0,180,255,0.3)]"
                      >
                        {s.linkText.replace(" ↗", "")}
                        <ExternalLink
                          size={11}
                          className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                        />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>      {/* COMPETITIVE & ALGORITHMIC PROWESS */}
      <section className="py-32 relative overflow-hidden bg-white/[0.01] border-y border-white/5">
        <ParallaxLayer multiplier={0.15} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/8 blur-[120px] rounded-full pointer-events-none" />
        <ParallaxLayer multiplier={0.1} className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-purple-500/6 blur-[100px] rounded-full pointer-events-none" />

        <motion.div
          className="container mx-auto px-6 relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fastStaggerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <p className="text-cyan-400 font-mono text-[10px] tracking-[0.3em] uppercase mb-4 font-bold">Metrics</p>
            <h2 className="section-heading font-heading text-4xl sm:text-5xl font-black text-white" style={{ scrollMarginTop: 'calc(var(--navbar-height, 4rem) + 2rem)' }}>Algorithmic Proficiency</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {[
              {
                name: "LeetCode",
                description: "Pattern-focused DSA practice for interview-level problem solving.",
                accent: "cyan",
                profile: PROFILE_URLS.leetcode,
                metrics: (
                  <>
                    <PrimaryStatCard>
                      <p className="metric-label">Problems Solved</p>
                      <span className="stat-number text-4xl font-black text-white"><CountUp end={PORTFOLIO_STATS.leetcode.problemsSolved} /><span className="text-cyan-400">+</span></span>
                    </PrimaryStatCard>
                    <PrimaryStatCard>
                      <p className="metric-label">Contest Rating</p>
                      <span className="stat-number text-3xl font-black text-white"><CountUp end={PORTFOLIO_STATS.leetcode.rating} /><span className="text-cyan-400">+</span></span>
                      <p className="metric-label mt-4">Global Ranking</p>
                      <p className="text-sm font-bold text-white/80">Top {PORTFOLIO_STATS.leetcode.topPercentage}</p>
                    </PrimaryStatCard>
                    <div className="col-span-2 flex items-center gap-4 rounded-xl border border-cyan-400/20 bg-cyan-400/5 px-4 py-3">
                      <div className="relative grid h-16 w-16 shrink-0 place-items-center rounded-full" style={{ background: "conic-gradient(#22d3ee 0 79%, rgba(255,255,255,.08) 79% 100%)" }}>
                        <div className="grid h-12 w-12 place-items-center rounded-full bg-[#0B0D14] text-xs font-black text-white">{PORTFOLIO_STATS.leetcode.rating}</div>
                      </div>
                      <div>
                        <p className="metric-label mb-1">Rating Progress</p>
                        <p className="text-xs text-white/55">Knight-level contest performance</p>
                      </div>
                    </div>
                    <div className="col-span-2 flex items-center justify-between rounded-xl border border-cyan-400/20 bg-cyan-400/5 px-4 py-3">
                      <span className="metric-label mb-0">Badge</span>
                      <span className="font-black text-cyan-300">{PORTFOLIO_STATS.leetcode.tier}</span>
                    </div>
                  </>
                ),
              },
              {
                name: "Codeforces",
                description: "Building speed, implementation, and contest performance under pressure.",
                accent: "blue",
                profile: PROFILE_URLS.codeforces,
                metrics: (
                  <>
                    <PrimaryStatCard>
                      <p className="metric-label">Problems Solved</p>
                      <span className="stat-number text-4xl font-black text-white"><CountUp end={PORTFOLIO_STATS.codeforces.problemsSolved} /><span className="text-blue-400">+</span></span>
                    </PrimaryStatCard>
                    <PrimaryStatCard>
                      <p className="metric-label">Rating</p>
                      <span className="stat-number text-3xl font-black text-white"><CountUp end={PORTFOLIO_STATS.codeforces.rating} /><span className="text-blue-400">+</span></span>
                      <p className="metric-label mt-4">Rank</p>
                      <p className="text-sm font-bold text-white/80">{PORTFOLIO_STATS.codeforces.tier}</p>
                    </PrimaryStatCard>
                  </>
                ),
              },
              {
                name: "CodeChef",
                description: "Separate contest and DSA metrics, clearly represented on one platform card.",
                accent: "orange",
                profile: PROFILE_URLS.codechef,
                metrics: (
                  <div className="col-span-2 secondary-stat-box p-4 space-y-4">
                    <div>
                      <p className="metric-label text-orange-300/70 mb-2">Competitive Programming</p>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="metric-label">Contest Rating</p>
                          <p className="text-2xl font-black text-white"><CountUp end={PORTFOLIO_STATS.codechef.rating} /></p>
                        </div>
                        <div>
                          <p className="metric-label">Star Rating</p>
                          <p className="text-lg font-black text-orange-300"><span aria-hidden="true">★★★</span> <span className="sr-only">{PORTFOLIO_STATS.codechef.stars}</span></p>
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-white/10 pt-4">
                      <p className="metric-label text-orange-300/70">DSA</p>
                      <p className="text-3xl font-black text-white"><CountUp end={PORTFOLIO_STATS.codechef.dsaRating} /></p>
                      <p className="metric-label">DSA Rating</p>
                    </div>
                  </div>
                ),
              },
              {
                name: "AtCoder",
                description: "Growing contest experience with a focus on consistent algorithmic progress.",
                accent: "sky",
                profile: PROFILE_URLS.atcoder,
                metrics: (
                  <>
                    <PrimaryStatCard className="col-span-2">
                      <p className="metric-label">Contest Rating</p>
                      <span className="stat-number text-5xl font-black text-white"><CountUp end={PORTFOLIO_STATS.atcoder.rating} /></span>
                    </PrimaryStatCard>
                    <div className="col-span-2 flex items-center justify-between rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3">
                      <span className="metric-label mb-0">Rank</span>
                      <span className="font-black text-amber-300">{PORTFOLIO_STATS.atcoder.tier}</span>
                    </div>
                  </>
                ),
              },
            ].map((platform) => (
              <motion.div key={platform.name} variants={itemVariants} className="flex flex-col">
                <PremiumCard isActive={true} className="h-full p-6 sm:p-8 group/card">
                  <div className="flex h-full flex-col">
                    <h3 className="text-2xl font-black text-white mb-2">{platform.name}</h3>
                    <p className="text-sm text-white/50 mb-6 leading-relaxed font-light">{platform.description}</p>
                    <div className="grid grid-cols-2 gap-3 mb-6">{platform.metrics}</div>
                    <a href={platform.profile} target="_blank" rel="noopener noreferrer" aria-label={`Open ${platform.name} profile`} className="mt-auto inline-flex items-center justify-center w-full gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-cyan-500/10 text-white font-bold text-sm border border-white/10 hover:border-cyan-500/40 transition-all group" data-cursor="view">
                      View {platform.name} Profile <ExternalLink size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 text-cyan-400" />
                    </a>
                  </div>
                </PremiumCard>
              </motion.div>
            ))}

            <motion.div variants={itemVariants} className="sm:col-span-2 secondary-stat-box p-5">
              <h4 className="text-xs font-black text-blue-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Zap size={14} /> Strong Topic Coverage</h4>
              <div className="flex flex-wrap gap-2">
                {["Arrays", "Trees", "Graphs", "Linked List", "Stacks & Queues", "Binary Search", "Sliding Window", "Dynamic Programming"].map((topic) => (
                  <span key={topic} className="text-[11px] px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:text-white cursor-default">{topic}</span>
                ))}
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="sm:col-span-2 secondary-stat-box p-5">
              <h4 className="mb-4 text-xs font-black uppercase tracking-widest text-violet-300">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {["C++", "JavaScript", "React.js", "Node.js", "Express.js", "MongoDB", "Redux", "Tailwind CSS", "Firebase"].map((tech) => (
                  <span key={tech} title={tech} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/65 transition-all hover:-translate-y-1 hover:border-violet-300/40 hover:text-white">{tech}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Hero;
