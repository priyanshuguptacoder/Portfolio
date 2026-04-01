import { motion } from "framer-motion";
import { ExternalLink, Github, Server, Database, Shield, Cpu, Zap, Code2 } from "lucide-react";

interface ProjectProps {
  title: string;
  problem: string;
  solution: string;
  impact: string;
  coreFocus: string[];
  tech: string[];
  github: string;
  live: string;
  isFeatured?: boolean;
}

const ProjectCard = ({ title, problem, solution, impact, coreFocus, tech, github, live, isFeatured }: ProjectProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`group relative p-[1px] rounded-3xl transition-all duration-700 hover:scale-[1.01] mb-12 ${
      isFeatured ? "bg-gradient-to-br from-cyan-500/30 via-blue-500/20 to-transparent shadow-[0_0_80px_-20px_rgba(34,211,238,0.15)]" : "bg-white/10"
    }`}
  >
    <div className="bg-[#020617]/80 rounded-[23px] backdrop-blur-3xl p-8 lg:p-12 h-full overflow-hidden relative">
      <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-700">
        <Server size={300} />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          {isFeatured && (
            <span className="text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-3 py-1 rounded-full font-black uppercase tracking-widest leading-none">
              Featured Architecture
            </span>
          )}
          <h3 className="font-heading text-3xl lg:text-4xl font-black text-white tracking-tight">{title}</h3>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-cyan-400">
              <Cpu size={16} />
              <h4 className="text-[11px] font-mono uppercase tracking-[0.2em] font-black">System Problem</h4>
            </div>
            <p className="text-sm text-white/50 leading-relaxed font-light">{problem}</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-cyan-400">
              <Database size={16} />
              <h4 className="text-[11px] font-mono uppercase tracking-[0.2em] font-black">Backend Solution</h4>
            </div>
            <p className="text-sm text-white/50 leading-relaxed font-light">{solution}</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-cyan-400">
              <Zap size={16} />
              <h4 className="text-[11px] font-mono uppercase tracking-[0.2em] font-black">Business Impact</h4>
            </div>
            <p className="text-sm text-white/50 leading-relaxed font-light">{impact}</p>
          </div>
        </div>

        <div className="mb-12">
          <h4 className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em] mb-6 font-black">Core Logic Implementations</h4>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {coreFocus.map((item, i) => (
              <div key={i} className="flex items-start gap-3 text-sm text-white/60 bg-white/[0.03] rounded-2xl p-4 transition-colors hover:bg-white/[0.06] border border-white/5">
                <Code2 size={16} className="text-cyan-500 mt-0.5 shrink-0" />
                <span className="font-light">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-8 pt-8 border-t border-white/5">
          <div className="flex flex-wrap gap-2">
            {tech.map((t) => (
              <span key={t} className="text-[10px] font-mono px-3 py-1.5 rounded-lg bg-white/[0.05] text-white/40 border border-white/5 transition-colors hover:border-cyan-500/30 hover:text-cyan-400">
                {t}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <a href={github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-xs border border-white/10 text-white/70 hover:bg-white/5 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95">
              <Github size={16} /> Source Code
            </a>
            <a href={live} target="_blank" rel="noopener noreferrer" className="bg-white text-black px-6 py-3 rounded-xl font-bold text-xs hover:bg-cyan-400 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2.5 shadow-lg shadow-white/5">
              <ExternalLink size={16} /> Runtime Deploy
            </a>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const Projects = () => (
  <section id="projects" className="py-32 relative overflow-hidden">
    <div className="container mx-auto px-6 max-w-7xl">
      <div className="text-center mb-24">
        <p className="text-cyan-400 font-mono text-[10px] tracking-[0.3em] uppercase mb-4 font-bold">Engineering Portfolio</p>
        <h2 className="font-heading text-4xl sm:text-5xl font-black text-white">System Architecture</h2>
      </div>

      <ProjectCard
        title="LeetCode Tracker"
        isFeatured={true}
        problem="Tracking DSA progress manually lacks analytics for targeted technical growth."
        solution="Built a robust Node.js backend utilizing complex streak tracking logic and SM-2 spaced repetition."
        impact="Optimized learning curves for developers by automating progress analytics and consistency tracking."
        coreFocus={[
          "SM-2 Memory Retention Implementation",
          "Advanced Streak Delta Logic",
          "High-Efficiency API Sync Pipelines",
          "REST Service Orchestration",
          "NoSQL Schema Normalization",
          "Dynamic Performance Dashboarding"
        ]}
        tech={["React", "Node.js", "Express", "MongoDB", "Framer Motion"]}
        github="https://github.com/priyanshuguptacoder/LeetCode-Tracker"
        live="https://leetcodetrackerpriyanshucoder.netlify.app/"
      />

      <ProjectCard
        title="Hostel OS"
        problem="Manual facility management leads to extreme operational overhead and fragmented datasets."
        solution="Architected a multi-role administrative system with secure OAuth integration and centralized persistence."
        impact="Digitalized facility workflows reducing administrative processing time by 80%."
        coreFocus={[
          "JWT-Based Role Authentication",
          "Atomic Database Operations",
          "Resource Management Logic",
          "Secure File Upload Processing",
          "Complex Request Handling",
          "Audit Trail Implementation"
        ]}
        tech={["React Native", "Node.js", "MongoDB", "Redux Toolkit"]}
        github="https://github.com/priyanshuguptaiit99/hostelpriyanshu"
        live="https://hostel-management-system-hqg0.onrender.com"
      />
    </div>
  </section>
);

export default Projects;
