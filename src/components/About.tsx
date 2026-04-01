import { motion } from "framer-motion";
import { Download, Trophy, Server, Award, Code2, Globe, Cpu } from "lucide-react";

// --- ACHIEVEMENTS LOGIC ---
const achievements = [
  { icon: Server, title: "Backend Systems", detail: "5+ Scalable Projects" },
  { icon: Trophy, title: "Top 5 Rank", detail: "Forge Competition" },
  { icon: Award, title: "Top 5 Rank", detail: "IIC Summit" },
  { icon: Code2, title: "250+ Solved", detail: "DSA Problems" },
];

// --- EXPERIENCE LOGIC ---
const experienceItems = [
  "Designed and implemented RESTful APIs handling high throughput and concurrent requests",
  "Optimized database queries and schemas to reduce latency and improve system reliability",
  "Architected modular backend systems with secure role-based access control (RBAC)",
  "Engineered scalable full-stack applications focused on performance and seamless user experience",
];

const About = () => (
  <>
    {/* ABOUT SECTION */}
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <p className="text-cyan-400 font-mono text-[10px] tracking-[0.3em] uppercase mb-4 font-bold">Background</p>
          <h2 className="font-heading text-4xl sm:text-5xl font-black text-white">The Engineer</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-white/50 text-sm sm:text-base leading-relaxed font-light">
            <p>
              Currently pursuing Computer Science at <span className="text-white font-bold">NIT Jalandhar</span>, I've specialized in architecting high-performance backend infrastructures.
            </p>
            <p>
              My focus lies in building systems that don't just work, but scale. I prioritize <span className="text-cyan-400">clean architecture</span>, <span className="text-cyan-400">database optimization</span>, and <span className="text-cyan-400">asynchronous processing</span>.
            </p>
            <p>
              Beyond implementation, I've solved 250+ DSA challenges, refining my ability to write mathematically optimal code for complex logic.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {achievements.map((a, i) => (
              <div key={i} className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-all duration-500">
                <a.icon size={20} className="text-cyan-500 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-xs font-black text-white mb-1 uppercase tracking-wider">{a.title}</h4>
                <p className="text-[10px] text-white/30">{a.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* EXPERIENCE SECTION */}
    <section id="experience" className="py-32 relative overflow-hidden bg-white/[0.01] border-y border-white/5">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-20">
          <p className="text-cyan-400 font-mono text-[10px] tracking-[0.3em] uppercase mb-4 font-bold">Journey</p>
          <h2 className="font-heading text-4xl sm:text-5xl font-black text-white">Systemic Experience</h2>
        </div>

        <div className="relative p-[1px] rounded-3xl bg-gradient-to-br from-white/10 to-transparent">
          <div className="bg-[#020617] rounded-[23px] p-8 lg:p-12 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 pb-10 border-b border-white/5">
                <div>
                  <h3 className="font-heading text-2xl font-black text-white tracking-tight">Backend Engineering Specialist</h3>
                  <p className="text-xs text-cyan-400 font-mono mt-2 uppercase tracking-widest">Independent · System Architect</p>
                </div>
                <div className="mt-4 sm:mt-0 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-white/40">
                  2022 — PRESENT
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-x-12 gap-y-6">
                {experienceItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                    <p className="text-sm text-white/50 leading-relaxed font-light">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* RESUME SECTION */}
    <section className="py-40 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
        >
          <p className="text-cyan-400 font-mono text-[10px] tracking-[0.3em] uppercase mb-6 font-bold">Documentation</p>
          <h2 className="font-heading text-4xl sm:text-5xl font-black text-white mb-6 tracking-tighter">
            Technical Specification
          </h2>
          <p className="text-lg text-white/40 mb-12 max-w-md mx-auto font-light">
            Review the full architectural breakdown of my skills, projects, and educational background.
          </p>
          <a
            href="/resume.pdf"
            download
            className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-white text-black font-black text-sm transition-all duration-500 hover:scale-105 active:scale-95 shadow-2xl shadow-white/5 hover:shadow-cyan-500/20"
          >
            <Download size={18} className="group-hover:-translate-y-0.5 transition-transform" /> 
            Get Payload (PDF)
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
          </a>
        </motion.div>
      </div>
    </section>
  </>
);

export default About;
