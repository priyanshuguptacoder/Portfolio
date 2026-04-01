import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import profileImg from "@/assets/profile.jpg";
import { Code2, Trophy, Server, Cpu, Database, Zap, ExternalLink } from "lucide-react";

// --- PROOF SECTION LOGIC ---
const stats = [
  {
    icon: Code2,
    value: 260,
    suffix: "+",
    label: "Problems Solved",
    detail: "Consistent DSA practice & pattern mastery",
    showProgress: true,
  },
  {
    icon: Server,
    value: 5,
    suffix: "+",
    label: "Backend Systems Built",
    detail: "Scalable APIs & Optimized Databases",
    isDominant: true,
  },
  {
    icon: Trophy,
    value: 5,
    prefix: "Top ",
    label: "Competition Rank",
    detail: "Forge & IIC Summit",
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

const roles = ["Backend Engineer", "Full Stack Developer", "Problem Solver"];

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <section className="min-h-screen flex items-center pt-32 pb-20 relative overflow-hidden text-center lg:text-left">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0, 1] }}
              className="flex-1"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">Available for scale</span>
              </motion.div>

              <h1 className="font-heading text-5xl sm:text-7xl lg:text-8xl font-black mb-8 leading-[1.1] tracking-tight">
                <span className="text-white">A </span>
                <span className="relative inline-block min-w-[300px] sm:min-w-[450px]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={roleIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, ease: "circOut" }}
                      className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text"
                    >
                      {roles[roleIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <br />
                <span className="text-white/40">Systems that perform.</span>
              </h1>

              <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed font-light">
                I design APIs, optimize databases, and build scalable backend systems handling real-world traffic.
              </p>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <a
                  href="#projects"
                  className="bg-white text-black px-8 py-4 rounded-xl font-bold text-sm hover:bg-cyan-400 transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl shadow-white/5"
                >
                  Explore Systems
                </a>
                <a
                  href="mailto:priyanshuguptanitian9696@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-xl font-bold text-sm border border-white/10 text-white hover:bg-white/5 transition-all duration-300 hover:scale-105 flex items-center gap-2"
                >
                  Consult Me <Zap size={14} className="text-cyan-400" />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0, 1] }}
              className="relative"
            >
              <div className="absolute inset-0 bg-cyan-500/20 blur-[100px] rounded-full animate-pulse" />
              <div className="relative z-10 w-64 h-64 lg:w-80 lg:h-80 rounded-3xl overflow-hidden border border-white/10 group mx-auto lg:mx-0">
                <img
                  src={profileImg}
                  alt="Priyanshu Gupta"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
              </div>
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
                className={`group relative p-1 rounded-3xl transition-all duration-500 ${
                  s.isDominant 
                    ? "scale-105 md:scale-110 z-10 bg-gradient-to-br from-cyan-500 to-blue-500 shadow-[0_0_50px_-10px_rgba(34,211,238,0.3)]" 
                    : "bg-white/5 hover:bg-white/10 shadow-xl"
                }`}
              >
                <div className="bg-[#020617] rounded-[22px] p-8 h-full flex flex-col items-center text-center">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
                    s.isDominant ? "bg-cyan-500/20 text-cyan-400" : "bg-white/5 text-white/40"
                  }`}>
                    <s.icon size={22} />
                  </div>
                  <div className="text-4xl sm:text-5xl font-black text-white mb-2 tracking-tighter">
                    <CountUp end={s.value} prefix={s.prefix} suffix={s.suffix} />
                  </div>
                  <h3 className="text-sm font-bold text-white/90 mb-2 uppercase tracking-widest">{s.label}</h3>
                  <p className="text-xs text-white/40 leading-relaxed font-light">{s.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM SOLVING & CONSISTENCY */}
      <section className="py-24 relative overflow-hidden bg-white/[0.01] border-y border-white/5">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="text-cyan-400 font-mono text-[10px] tracking-[0.3em] uppercase mb-4 font-bold">Metrics</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-white mb-12">Problem Solving & Consistency</h2>
            
            <div className="inline-block relative mb-12">
              <div className="text-6xl sm:text-8xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text tracking-tighter">
                <CountUp end={260} suffix="+" />
              </div>
              <p className="text-lg text-white/60 font-medium tracking-wide mt-2">Problems Solved</p>
            </div>

            <p className="text-muted-foreground text-base max-w-2xl mx-auto leading-relaxed font-light mb-12">
              Consistent problem solving across data structures, algorithms, and real-world patterns.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
              {difficultyStats.map((ds, i) => (
                <motion.div
                  key={ds.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)] group"
                >
                  <div className="text-sm font-mono text-white/40 uppercase tracking-widest mb-2">{ds.label}</div>
                  <div className={`text-4xl font-black ${ds.color} group-hover:scale-110 transition-transform duration-300`}>
                    {ds.value}
                  </div>
                </motion.div>
              ))}
            </div>

            <a
              href="https://leetcode.com/u/invisiblemanfromheart/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors group"
            >
              View Full Profile <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Hero;
