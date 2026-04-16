import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

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
    className="mb-10"
  >
    <div className="bg-[#020617]/80 border border-white/10 rounded-2xl p-5 sm:p-8 backdrop-blur-xl">
      
      {/* Header */}
      <div className="mb-6">
        {isFeatured && (
          <span className="text-[10px] font-mono bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full">
            Featured
          </span>
        )}
        <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2">
          {title}
        </h3>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        <div>
          <p className="text-xs text-cyan-400 uppercase mb-1">Problem</p>
          <p className="text-sm text-white/60">{problem}</p>
        </div>

        <div>
          <p className="text-xs text-cyan-400 uppercase mb-1">Solution</p>
          <p className="text-sm text-white/60">{solution}</p>
        </div>

        <div>
          <p className="text-xs text-cyan-400 uppercase mb-1">Impact</p>
          <p className="text-sm text-white/60">{impact}</p>
        </div>
      </div>

      {/* Core */}
      <div className="mt-6">
        <p className="text-xs text-white/40 uppercase mb-3">
          Core Implementations
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {coreFocus.map((item, i) => (
            <div
              key={i}
              className="text-sm text-white/60 bg-white/5 p-3 rounded-lg"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        
        <div className="flex flex-wrap gap-2">
          {tech.map((t) => (
            <span
              key={t}
              className="text-[10px] px-2 py-1 bg-white/5 text-white/40 rounded"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none text-center border border-white/20 text-white px-4 py-2 rounded-lg text-sm"
          >
            <Github size={14} className="inline mr-1" />
            Code
          </a>

          <a
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none text-center bg-white text-black px-4 py-2 rounded-lg text-sm"
          >
            <ExternalLink size={14} className="inline mr-1" />
            Live
          </a>
        </div>
      </div>
    </div>
  </motion.div>
);

const Projects = () => (
  <section id="projects" className="py-20">
    <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
      
      {/* Heading */}
      <div className="text-center mb-16">
        <p className="text-cyan-400 text-xs uppercase mb-2">
          Engineering Portfolio
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          System Architecture
        </h2>
      </div>

      {/* Project 1 */}
      <ProjectCard
        title="Competitive Programming Tracker"
        isFeatured={true}
        problem="Developers lack a unified system to track performance across platforms like LeetCode and Codeforces."
        solution="Built a full-stack system with API-based syncing, streak tracking, and analytics dashboard."
        impact="Improved consistency and preparation through centralized tracking."
        coreFocus={[
          "Cross-platform integration",
          "Streak tracking logic",
          "REST API sync pipelines",
          "MongoDB schema design",
          "Analytics dashboard",
          "Scalable backend"
        ]}
        tech={["React", "Node.js", "Express", "MongoDB"]}
        github="https://github.com/priyanshuguptacoder/LeetCode-Tracker"
        live="https://competativeprogrammingtrackerpriyanshu.vercel.app/"
      />

      {/* Project 2 */}
      <ProjectCard
        title="Hostel OS"
        problem="Manual hostel management causes inefficiency and fragmented data."
        solution="Built a role-based system with secure authentication and centralized data."
        impact="Reduced admin workload and improved efficiency."
        coreFocus={[
          "JWT authentication",
          "Database operations",
          "Resource management",
          "File uploads",
          "Request handling",
          "Audit logs"
        ]}
        tech={["React Native", "Node.js", "MongoDB"]}
        github="https://github.com/priyanshuguptaiit99/hostelpriyanshu"
        live="https://hostel-management-system-hqg0.onrender.com"
      />

    </div>
  </section>
);

export default Projects;
