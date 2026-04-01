import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import profileImg from "@/assets/profile.jpg";
import { Code2, Trophy, Target } from "lucide-react";

// --- PROOF SECTION LOGIC ---
const stats = [
  {
    icon: Code2,
    value: 250,
    suffix: "+",
    label: "Problems Solved",
    detail: "Consistent DSA practice & pattern mastery",
    showProgress: true,
  },
  {
    icon: Target,
    value: 99.2,
    suffix: "%ile",
    label: "JEE Mains",
    detail: "National engineering exam",
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
// ---------------------------

const Hero = () => (
  <>
    {/* HERO SECTION */}
    <section className="min-h-screen flex items-center pt-20 pb-10 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.04] gradient-bg blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0, 1] }}
            className="flex-1 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border mb-6 transition-all duration-300"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Available for Internships</span>
            </motion.div>

            <h1 className="font-heading text-6xl sm:text-7xl lg:text-7xl xl:text-8xl font-black mb-6 leading-[1.1] tracking-tight">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text inline-block opacity-0 translate-y-4 animate-[fade-up_0.8s_ease-out_forwards]" style={{ animationDelay: '0.1s' }}>Backend</span>
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text inline-block opacity-0 translate-y-4 animate-[fade-up_0.8s_ease-out_forwards] ml-3" style={{ animationDelay: '0.2s' }}>Engineer</span>
              <br />
              <span className="text-foreground text-4xl sm:text-5xl lg:text-6xl tracking-normal inline-block opacity-0 translate-y-4 animate-[fade-up_0.8s_ease-out_forwards]" style={{ animationDelay: '0.3s' }}>Who</span>
              <span className="text-foreground text-4xl sm:text-5xl lg:text-6xl tracking-normal inline-block opacity-0 translate-y-4 animate-[fade-up_0.8s_ease-out_forwards] ml-3" style={{ animationDelay: '0.4s' }}>Builds</span>
              <span className="text-foreground text-4xl sm:text-5xl lg:text-6xl tracking-normal inline-block opacity-0 translate-y-4 animate-[fade-up_0.8s_ease-out_forwards] ml-3" style={{ animationDelay: '0.5s' }}>Systems</span>
              <span className="text-foreground text-4xl sm:text-5xl lg:text-6xl tracking-normal inline-block opacity-0 translate-y-4 animate-[fade-up_0.8s_ease-out_forwards] ml-3" style={{ animationDelay: '0.6s' }}>That</span>
              <span className="text-foreground text-4xl sm:text-5xl lg:text-6xl tracking-normal inline-block opacity-0 translate-y-4 animate-[fade-up_0.8s_ease-out_forwards] ml-3" style={{ animationDelay: '0.7s' }}>Scale</span>
            </h1>

            <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              I design APIs, optimize databases, and build systems handling concurrency, performance, and real-world load.
            </p>

            <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-10">
              {["Node.js", "MongoDB", "REST APIs", "System Design"].map((badge) => (
                <span key={badge} className="px-3 py-1 text-xs font-mono rounded-md bg-primary/10 text-primary border border-primary/20">
                  {badge}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <a
                href="#projects"
                className="gradient-bg px-8 py-4 rounded-xl font-semibold text-sm text-primary-foreground hover:opacity-90 transition-all duration-300 ease-out glow-primary-sm hover:scale-105 active:scale-95"
              >
                View Projects
              </a>
              <a
                href="mailto:priyanshuguptanitian9696@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open link"
                className="group cursor-pointer px-8 py-4 rounded-xl font-semibold text-sm border border-border text-foreground/80 hover:bg-secondary hover:text-foreground transition-all duration-300 ease-out hover:scale-105 active:scale-95"
              >
                Hire Me
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0, 1] }}
            className="flex-shrink-0 animate-[float_4s_ease-in-out_infinite]"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full"></div>
              <img
                src={profileImg}
                alt="Priyanshu Gupta"
                className="relative z-10 w-64 h-64 lg:w-80 lg:h-80 rounded-full object-cover border-4 border-background shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* PROOF SECTION */}
    <section className="section-padding section-divider">
      <div className="container mx-auto px-6">
        <div className="animate-on-scroll opacity-0 translate-y-10 text-center mb-16 transition-all duration-700 ease-out">
          <p className="text-primary font-mono text-xs tracking-[0.2em] uppercase mb-3">Track Record</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
            Proof of Work
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`animate-on-scroll opacity-0 translate-y-10 glass rounded-2xl p-8 text-center group relative overflow-hidden transition-all duration-700 ease-out ${
                s.isDominant 
                  ? "scale-110 shadow-[0_0_40px_rgba(34,211,238,0.3)] ring-1 ring-cyan-400/50 z-10" 
                  : "shadow-[0_0_20px_rgba(34,211,238,0.15)] hover:-translate-y-2 hover:shadow-2xl"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-xl opacity-0 hover:opacity-100 transition duration-500 z-0" />
              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-5 transition-colors duration-300 ${s.isDominant ? "bg-cyan-500/20 ring-1 ring-cyan-400/30" : "group-hover:bg-cyan-500/10"}`}>
                  <s.icon size={22} className="text-cyan-400" />
                </div>
                <div className="text-4xl sm:text-5xl font-heading font-black bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text mb-2">
                  <CountUp end={s.value} prefix={s.prefix} suffix={s.suffix} />
                </div>
                <p className="text-sm font-semibold text-foreground/80 mb-1">{s.label}</p>
                <p className="text-xs text-muted-foreground mb-4">{s.detail}</p>
                
                {s.showProgress && (
                  <div className="w-full bg-secondary rounded-full h-1.5 mt-2 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-cyan-400 to-blue-500 h-1.5 rounded-full w-0 transition-all duration-1000 ease-out delay-500"
                      ref={(el) => {
                        if (el) {
                          const observer = new IntersectionObserver((entries) => {
                            if (entries[0].isIntersecting) {
                              el.style.width = "70%";
                              observer.disconnect();
                            }
                          });
                          observer.observe(el);
                        }
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default Hero;
