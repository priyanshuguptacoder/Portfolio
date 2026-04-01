import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import profileImg from "@/assets/profile.jpg";
import { Code2, Trophy, Server, ExternalLink } from "lucide-react";


const stats = [
  {
    icon: Server,
    value: 5,
    suffix: "+",
    label: "Backend Systems Built",
    detail: "Scalable APIs & Optimized Databases",
  },
  {
    icon: Code2,
    value: 250,
    suffix: "+",
    label: "Problems Solved",
    detail: "Consistent DSA practice & pattern mastery",
    isDominant: true,
  },
  {
    icon: Trophy,
    value: 5,
    prefix: "Top ",
    label: "Contest Performance",
    detail: "Consistent High Ranking in Global Contests",
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
            <div className="flex-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">

              {/* Status pill */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
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
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg text-white/50 font-light mb-3 tracking-wide"
              >
                Hello, I'm
              </motion.p>

              {/* Name */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.18, ease: [0.25, 0.1, 0, 1] }}
                className="font-heading text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-5"
              >
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(34,211,238,0.25)]">
                  Priyanshu Gupta
                </span>
              </motion.h1>

              {/* Role */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.28 }}
                className="text-xl sm:text-2xl font-bold text-white/90 mb-6 tracking-tight"
              >
                Problem Solver &amp; Full-Stack Developer
              </motion.p>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.38 }}
                className="text-base sm:text-lg text-white/55 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed font-light"
              >
                Full-Stack Developer and competitive programmer with strong DSA fundamentals,
                experienced in building scalable web applications and backend systems using modern tech stacks.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.48 }}
                className="flex flex-wrap gap-4 justify-center lg:justify-start"
              >
                <a
                  href="#projects"
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-full font-bold text-sm hover:scale-105 hover:shadow-[0_0_28px_rgba(34,211,238,0.35)] active:scale-95 transition-all duration-300"
                >
                  Explore Projects
                </a>
                <a
                  href="#contact"
                  className="px-8 py-4 rounded-full font-bold text-sm border border-white/10 text-white/70 hover:border-cyan-500/40 hover:text-white hover:bg-cyan-500/5 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)] transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  Let's Connect
                </a>
              </motion.div>
            </div>

            {/* ── RIGHT: PROFILE IMAGE ───────────────────── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.25, 0.1, 0, 1] }}
              className="relative shrink-0"
            >
              {/* Ambient glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/10 blur-[100px] rounded-full scale-125" />

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
                <p className="text-2xl font-black text-white">250<span className="text-cyan-400">+</span></p>
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
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`group relative p-[1px] rounded-3xl transition-all duration-500 ${
                  s.isDominant 
                    ? "md:scale-110 z-10 bg-gradient-to-br from-cyan-500 to-blue-600 shadow-[0_0_40px_-5px_rgba(34,211,238,0.3)]" 
                    : "bg-white/5 hover:bg-white/10"
                }`}
              >
                <div className={`bg-[#020617] rounded-[23px] p-8 h-full flex flex-col items-center text-center transition-all duration-300 ${
                  !s.isDominant && i === 2 ? "opacity-60 grayscale hover:opacity-100 hover:grayscale-0" : ""
                }`}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 ${
                    s.isDominant ? "bg-cyan-500/20 text-cyan-400" : "bg-white/5 text-white/40"
                  }`}>
                    <s.icon size={22} />
                  </div>
                  <div className={`text-4xl sm:text-5xl font-black mb-2 tracking-tighter transition-colors duration-300 ${
                    s.isDominant ? "text-white" : "text-white/80 group-hover:text-white"
                  }`}>
                    <CountUp end={s.value} prefix={s.prefix} suffix={s.suffix} />
                  </div>
                  <h3 className="text-[11px] font-bold text-white/80 mb-2 uppercase tracking-[0.2em]">{s.label}</h3>
                  <p className="text-xs text-white/40 leading-relaxed font-light group-hover:text-white/70 transition-colors">{s.detail}</p>
                </div>
                
                {/* Extra glow for dominant card */}
                {s.isDominant && (
                  <div className="absolute inset-0 bg-cyan-400/20 blur-2xl rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM SOLVING & CONSISTENCY */}
      <section className="py-32 relative overflow-hidden bg-white/[0.01] border-y border-white/5">
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/8 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-purple-500/6 blur-[100px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-cyan-400 font-mono text-[10px] tracking-[0.3em] uppercase mb-6 font-bold">Metrics</p>
            <h2 className="font-heading text-4xl sm:text-5xl font-black text-white mb-20">
              Problem Solving & Consistency
            </h2>

            {/* Hero Number */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative inline-block mb-4"
            >
              <div className="absolute inset-0 bg-cyan-500/10 blur-2xl rounded-full scale-150 pointer-events-none" />
              <div className="relative text-7xl md:text-8xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                <CountUp end={250} suffix="+" />
              </div>
            </motion.div>

            <p className="text-lg md:text-xl font-medium text-white/80 mb-6 uppercase tracking-wide">
              Problems Solved
            </p>

            <p className="text-sm md:text-base text-white/50 max-w-xl mx-auto leading-relaxed font-light mb-16">
              Consistent problem solving across data structures, algorithms, and real-world patterns.
            </p>

            {/* Difficulty Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mt-10 mb-16">
              {difficultyStats.map((ds, i) => (
                <motion.div
                  key={ds.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group relative p-6 rounded-2xl border border-white/10 bg-[#0b1220]/60 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                >
                  <div className="relative z-10">
                    <p className="text-sm tracking-widest uppercase text-white/40 mb-3">
                      {ds.label}
                    </p>
                    <div className={`text-3xl md:text-4xl font-semibold ${ds.color} transition-transform duration-300 group-hover:scale-110`}>
                      <CountUp end={ds.value} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <a
              href="https://leetcode.com/u/invisiblemanfromheart/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-cyan-400 hover:text-white hover:underline transition-colors group"
            >
              <span>View Full Profile</span>
              <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Hero;
