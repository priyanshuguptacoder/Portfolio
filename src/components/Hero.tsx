import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import profileImg from "@/assets/profile.jpg";
import { Code2, Trophy, Server, ExternalLink, Zap } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { sectionVariants, itemVariants } from "@/lib/animations";


const stats = [
  {
    icon: Server,
    value: 5,
    suffix: "+",
    label: "BACKEND SYSTEMS & APIS",
    detail: "Scalable APIs & Optimized Databases",
    extraInfo: "Projects available on GitHub with clean backend architecture and API design",
    linkText: "View GitHub ↗",
    linkUrl: "https://github.com/priyanshuguptacoder"
  },
  {
    icon: Code2,
    value: 280,
    suffix: "+",
    label: "LEETCODE PROBLEMS SOLVED",
    detail: "Strong coverage across core DSA topics with consistent problem solving.",
    extraInfo: "Contest Rating: 1469 • Top ~55%",
    linkText: "View Profile ↗",
    linkUrl: "https://leetcode.com/u/invisiblemanfromheart/",
    isDominant: true,
  },
  {
    icon: Trophy,
    value: 25,
    suffix: "+",
    label: "CODEFORCES PROBLEMS",
    detail: "Building competitive programming fundamentals with focus on speed and implementation.",
    extraInfo: "Rating: 366 (Newbie) • Early Stage • Improving Rapidly",
    linkText: "View Profile ↗",
    linkUrl: "https://codeforces.com/profile/priyanshuguptacoder"
  },
];

const difficultyStats = [
  { label: "Easy", value: 104, color: "text-green-400" },
  { label: "Medium", value: 140, color: "text-yellow-400" },
  { label: "Hard", value: 16, color: "text-red-400" },
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
  return (
    <>
      {/* HERO SECTION */}
      <section className="min-h-screen flex items-center pt-28 pb-16 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-20">

            {/* ── LEFT: TEXT CONTENT ─────────────────────── */}
            <motion.div 
              className="flex-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={sectionVariants}
            >

              {/* Status pill */}
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
                </span>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                  Open to Internships
                </span>
              </motion.div>

              {/* Greeting */}
              <motion.p
                variants={itemVariants}
                className="text-lg text-white/50 font-light mb-3 tracking-wide"
              >
                Hello, I'm
              </motion.p>

              {/* Name */}
              <motion.h1
                variants={itemVariants}
                className="font-heading text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-5"
              >
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(34,211,238,0.25)]">
                  Priyanshu Gupta
                </span>
              </motion.h1>

              {/* Role */}
              <motion.p
                variants={itemVariants}
                className="text-xl sm:text-2xl font-bold text-white/90 mb-6 tracking-tight"
              >
                Backend-Focused Developer | 280+ DSA Problems Solved | Competitive Programmer
              </motion.p>

              {/* Description */}
              <motion.p
                variants={itemVariants}
                className="text-base sm:text-lg text-white/55 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed font-light"
              >
                Backend-focused developer building scalable systems and APIs. Solved 280+ DSA problems on LeetCode and actively improving through competitive programming on Codeforces.
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-4 justify-center lg:justify-start"
              >
                <MagneticButton
                  href="#projects"
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-full font-bold text-sm hover:scale-105 hover:shadow-[0_0_28px_rgba(34,211,238,0.35)] active:scale-95 transition-all duration-300"
                >
                  Explore Projects
                </MagneticButton>
                <MagneticButton
                  href="#contact"
                  className="px-8 py-4 rounded-full font-bold text-sm border border-white/10 text-white/70 hover:border-cyan-500/40 hover:text-white hover:bg-cyan-500/5 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)] transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  Let's Connect
                </MagneticButton>
              </motion.div>
            </motion.div>

            {/* ── RIGHT: PROFILE IMAGE ───────────────────── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.25, 0.1, 0, 1] }}
              className="relative shrink-0"
            >
              {/* Ambient glow */}
              <ParallaxLayer multiplier={20} className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/10 blur-[100px] rounded-full scale-125 transition-all duration-[10000ms] animate-pulse" />

              {/* Image card */}
              <div
                className="relative z-10 w-64 h-64 lg:w-[320px] lg:h-[320px] rounded-3xl overflow-hidden transition-transform duration-500 hover:scale-[1.03]"
                style={{
                  boxShadow: "0 0 0 1px rgba(255,255,255,0.07), 0 0 50px -12px rgba(34,211,238,0.25), 0 32px 64px -16px rgba(0,0,0,0.6)",
                }}
              >
                <img
                  src={profileImg}
                  alt="Priyanshu Gupta — Full-Stack Developer"
                  className="w-full h-full object-cover brightness-105"
                />
                {/* Subtle bottom fade for grounding */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#020617]/50 to-transparent" />
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="absolute -right-4 top-8 bg-[#0b1220]/90 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-3 hidden lg:block"
                style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
              >
                <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">Problems Solved</p>
                <p className="text-2xl font-black text-white">280<span className="text-cyan-400">+</span></p>
              </motion.div>

              {/* Second floating badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.85, duration: 0.5 }}
                className="absolute -left-4 bottom-10 bg-[#0b1220]/90 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-3 hidden lg:block"
                style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
              >
                <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">NIT Jalandhar</p>
                <p className="text-sm font-bold text-white">B.Tech CSE</p>
              </motion.div>
            </motion.div>

          </div>
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
              >
                <PremiumCard isActive={s.isDominant} className={`h-full ${!s.isDominant && i === 2 ? "opacity-75 grayscale md:hover:opacity-100 md:hover:grayscale-0" : ""}`}>
                  <div className="p-8 flex flex-col items-center text-center h-full">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300 ${
                      s.isDominant ? "bg-cyan-500/10 text-cyan-400 group-hover/card:bg-cyan-500/20" : "bg-white/5 text-white/40 group-hover/card:bg-cyan-500/20 group-hover/card:text-cyan-400"
                    }`}>
                      <s.icon size={22} />
                    </div>
                    <div className={`text-4xl sm:text-5xl font-black mb-2 tracking-tighter transition-colors duration-300 ${
                      s.isDominant ? "text-white" : "text-white/80 group-hover/card:text-white"
                    }`}>
                      <CountUp end={s.value} suffix={s.suffix} />
                    </div>
                    <h3 className="text-[11px] font-bold text-white/80 mb-2 uppercase tracking-[0.2em]">{s.label}</h3>
                    <p className="text-xs text-white/40 leading-relaxed font-light group-hover/card:text-white/70 transition-colors duration-300 mb-4">{s.detail}</p>
                    
                    {s.extraInfo && (
                      <p className="text-sm font-semibold text-cyan-400 mt-auto mb-3">{s.extraInfo}</p>
                    )}
                    {s.linkUrl && (
                      <a 
                        href={s.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto inline-flex items-center gap-1.5 text-[11px] font-bold text-white/60 hover:text-cyan-400 transition-colors duration-300 border border-white/10 hover:border-cyan-400/50 rounded-full px-4 py-1.5 z-20"
                      >
                        {s.linkText}
                      </a>
                    )}
                  </div>
                </PremiumCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* COMPETITIVE & ALGORITHMIC PROWESS */}
      <section className="py-32 relative overflow-hidden bg-white/[0.01] border-y border-white/5">
        <ParallaxLayer multiplier={15} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/8 blur-[120px] rounded-full pointer-events-none" />
        <ParallaxLayer multiplier={10} className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-purple-500/6 blur-[100px] rounded-full pointer-events-none" />

        <motion.div 
          className="container mx-auto px-6 relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <p className="text-cyan-400 font-mono text-[10px] tracking-[0.3em] uppercase mb-4 font-bold">Metrics</p>
            <h2 className="font-heading text-4xl sm:text-5xl font-black text-white">
              Algorithmic Proficiency
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* BLOCK 1: LEETCODE */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col"
            >
              <PremiumCard className="flex-1 h-full flex flex-col p-8 lg:p-12 group/card">
                <div className="relative z-10 flex-1 flex flex-col">
                <h3 className="text-2xl font-black text-white mb-2">LeetCode Performance</h3>
                <p className="text-sm text-white/50 mb-8 leading-relaxed font-light">
                  Consistent DSA practice with focus on pattern recognition and interview-level problem solving.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                    <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">Solved</p>
                    <p className="text-3xl font-black text-white">280<span className="text-cyan-400">+</span></p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                    <p className="text-[10px] font-mono text-green-400/80 uppercase tracking-widest mb-1">Easy</p>
                    <p className="text-2xl font-bold text-green-400">110+</p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                    <p className="text-[10px] font-mono text-yellow-400/80 uppercase tracking-widest mb-1">Medium</p>
                    <p className="text-2xl font-bold text-yellow-400">160+</p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                    <p className="text-[10px] font-mono text-red-400/80 uppercase tracking-widest mb-1">Hard</p>
                    <p className="text-2xl font-bold text-red-400">17+</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div>
                    <p className="text-xs text-white/40 mb-1">Contest Rating</p>
                    <p className="text-lg font-bold text-white/80">1469</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/40 mb-1">Global Ranking</p>
                    <p className="text-lg font-bold text-white/80">Top ~55%</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/40 mb-1">Active Days</p>
                    <p className="text-lg font-bold text-white/80">80+</p>
                  </div>
                </div>
                
                {/* CONSISTENCY SIGNAL */}
                <div className="mb-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
                  <h4 className="text-xs font-black text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Zap size={14} /> Consistency & Discipline
                  </h4>
                  <ul className="text-xs text-white/60 space-y-1 font-light list-inside list-disc">
                    <li>Regular daily problem solving</li>
                    <li>Long streak maintenance</li>
                  </ul>
                </div>
              </div>
              
              <a
                href="https://leetcode.com/u/invisiblemanfromheart/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full gap-2 px-6 py-4 rounded-xl bg-white/5 hover:bg-cyan-500/10 text-white font-bold text-sm border border-white/10 hover:border-cyan-500/50 transition-all group mt-auto"
              >
                View LeetCode Profile <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-cyan-400" />
              </a>
              </PremiumCard>
            </motion.div>

            {/* BLOCK 2: CODEFORCES */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col"
            >
              <PremiumCard className="flex-1 h-full flex flex-col p-8 lg:p-12 group/card">
                <div className="relative z-10 flex-1 flex flex-col">
                <h3 className="text-2xl font-black text-white mb-2">Competitive Programming<br/><span className="text-lg text-white/60">(Codeforces)</span></h3>
                <p className="text-sm text-white/50 mb-8 leading-relaxed font-light">
                  Focusing on improving speed, implementation, and contest performance under pressure.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/5 flex flex-col items-center justify-center text-center">
                    <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-2">Solved</p>
                    <p className="text-5xl font-black text-white">25<span className="text-blue-400">+</span></p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/5 flex flex-col justify-center space-y-4">
                    <div>
                      <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">Rating</p>
                      <p className="text-2xl font-bold text-gray-400">366</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">Rank</p>
                      <p className="text-xl font-bold text-gray-300">Newbie</p>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="https://codeforces.com/profile/priyanshuguptacoder"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full gap-2 px-6 py-4 rounded-xl bg-white/5 hover:bg-blue-500/10 text-white font-bold text-sm border border-white/10 hover:border-blue-500/50 transition-all group mt-auto"
              >
                View Codeforces Profile <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-blue-400" />
              </a>
              </PremiumCard>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Hero;
