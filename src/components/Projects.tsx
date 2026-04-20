import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { sectionVariants, itemVariants, cardVariants } from "@/lib/animations";

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
    variants={cardVariants}
    className="mb-10"
  >
    <PremiumCard className="p-5 sm:p-8">
      
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
          Key Work
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
          <MagneticButton
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none text-center border border-white/20 text-white px-4 py-2 rounded-lg text-sm transition-transform hover:bg-white/5 hover:scale-105 active:scale-95"
          >
            <Github size={14} className="inline mr-1" />
            Code
          </MagneticButton>

          <MagneticButton
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none text-center bg-white text-black px-4 py-2 rounded-lg text-sm transition-transform hover:bg-cyan-400 hover:scale-105 active:scale-95 shadow-lg shadow-white/5"
          >
            <ExternalLink size={14} className="inline mr-1" />
            Live
          </MagneticButton>
        </div>
      </div>
    </PremiumCard>
  </motion.div>
);

const Projects = () => (
  <section id="projects" className="py-20 relative overflow-hidden">
    <motion.div 
      className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionVariants}
    >
      
      {/* Heading */}
      <motion.div variants={itemVariants} className="text-center mb-16">
        <p className="text-cyan-400 text-xs uppercase mb-2">
          Engineering Portfolio
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          System Architecture
        </h2>
      </motion.div>

      {/* Project 1 */}
      <ProjectCard
        title="Competitive Programming Tracker"
        isFeatured={true}
        problem="No unified system to track performance across platforms."
        solution="Built full-stack app with API-based syncing and analytics dashboard."
        impact="Improved consistency and centralized tracking."
        coreFocus={[
          "Designed backend APIs (Node.js / Express)",
          "Built database schema (MongoDB)",
          "Implemented core analytics and streak logic"
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
          "Designed backend APIs (Node.js)",
          "Built database schema (MongoDB)",
          "Implemented secure multi-role OAuth authentication"
        ]}
        tech={["React Native", "Node.js", "MongoDB"]}
        github="https://github.com/priyanshuguptaiit99/hostelpriyanshu"
        live="https://hostel-management-system-hqg0.onrender.com"
      />

    </motion.div>
  </section>
);

export default Projects;
