import { motion } from "framer-motion";
import { ExternalLink, Github, Server, Database, Cpu, Zap, Code2 } from "lucide-react";

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

const ProjectCard = ({
  title,
  problem,
  solution,
  impact,
  coreFocus,
  tech,
  github,
  live,
  isFeatured
}: ProjectProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`group relative p-[1px] rounded-3xl transition-all duration-700 hover:scale-[1.01] mb-12 ${
      isFeatured
        ? "bg-gradient-to-br from-cyan-500/30 via-blue-500/20 to-transparent shadow-[0_0_80px_-20px_rgba(34,211,238,0.15)]"
        : "bg-white/10"
    }`}
  >
    <div className="bg-[#020617]/80 rounded-[23px] backdrop-blur-3xl p-8 lg:p-12 h-full overflow-hidden relative">
      <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-700">
        <Server size={300} />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          {isFeatured && (
            <span className="text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-3 py-1 rounded-full font-black uppercase tracking-widest">
              Featured Architecture
            </span>
          )}
          <h3 className="font-heading text-3xl lg:text-4xl font-black text-white">
            {title}
          </h3>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 text-cyan-400 mb-2">
              <Cpu size={16} />
              <h4 className="text-[11px] font-mono uppercase font-black">
                System Problem
              </h4>
            </div>
            <p className="text-sm text-white/50">{problem}</p>
          </div>

          <div>
            <div className="flex items-center gap-3 text-cyan-400 mb-2">
              <Database size={16} />
              <h4 className="text-[11px] font-mono uppercase font-black">
                Backend Solution
              </h4>
            </div>
            <p className="text-sm text-white/50">{solution}</p>
          </div>

          <div>
            <div className="flex items-center gap-3 text-cyan-400 mb-2">
              <Zap size={16} />
              <h4 className="text-[11px] font-mono uppercase font-black">
                Business Impact
              </h4>
            </div>
            <p className="text-sm text-white/50">{impact}</p>
          </div>
        </div>

        <div className="mb-12">
          <h4 className="text-[10px] font-mono text-white/30 uppercase mb-6 font-black">
            Core Logic Implementations
          </h4>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {coreFocus.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 text-sm text-white/60 bg-white/[0.03] rounded-2xl p-4 hover:bg-white/[0.06]"
              >
                <Code2 size={16} className="text-cyan-500 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-8 pt-8 border-t border-white/5">
          <div className="flex flex-wrap gap-2">
            {tech.map((t) => (
              <span
                key={t}
                className="text-[10px] font-mono px-3 py-1.5 rounded-lg bg-white/[0.05] text-white/40"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-xs border border-white/10 text-white/70 hover:bg-white/5"
            >
              <Github size={16} /> Source Code
            </a>

            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-6 py-3 rounded-xl text-xs hover:bg-cyan-400 flex items-center gap-2"
            >
              <ExternalLink size={16} /> Live Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const Projects = () => (
  <section id="projects" className="py-32">
    <div className="container mx-auto px-6 max-w-7xl">
      <div className="text-center mb-24">
        <p className="text-cyan-400 font-mono text-[10px] uppercase mb-4">
          Engineering Portfolio
        </p>
        <h2 className="text-4xl sm:text-5xl font-black text-white">
          System Architecture
        </h2>
      </div>

      {/* 🔥 UPDATED PROJECT */}
      <ProjectCard
        title="Competitive Programming Tracker"
        isFeatured={true}
        problem="Developers lack a unified system to track performance across platforms like LeetCode and Codeforces."
        solution="Built a scalable full-stack system with API-based syncing, advanced streak logic, and analytics dashboard."
        impact="Improved consistency and preparation efficiency through centralized tracking and performance insights."
        coreFocus={[
          "Cross-Platform Integration (LeetCode + Codeforces Ready)",
          "Advanced Streak Tracking Logic",
          "REST API Data Sync Pipelines",
          "Optimized MongoDB Schema",
          "Analytics Dashboard",
          "Scalable Backend Design"
        ]}
        tech={["React", "Node.js", "Express", "MongoDB"]}
        github="https://github.com/priyanshuguptacoder/LeetCode-Tracker"
        live="https://competativeprogrammingtrackerpriyanshu.vercel.app/"
      />

      <ProjectCard
        title="Hostel OS"
        problem="Manual hostel management causes inefficiency and fragmented data."
        solution="Developed a role-based system with secure authentication and centralized data handling."
        impact="Reduced admin workload and streamlined operations significantly."
        coreFocus={[
          "JWT Authentication",
          "Database Transactions",
          "Resource Management",
          "File Upload Handling",
          "Request Processing",
          "Audit Logs"
        ]}
        tech={["React Native", "Node.js", "MongoDB"]}
        github="https://github.com/priyanshuguptaiit99/hostelpriyanshu"
        live="https://hostel-management-system-hqg0.onrender.com"
      />
    </div>
  </section>
);

export default Projects;
