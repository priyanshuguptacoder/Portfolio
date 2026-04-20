import { motion } from "framer-motion";
import { Server, Layout, Brain, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import { sectionVariants, itemVariants, cardVariants, fastStaggerVariants } from "@/lib/animations";

const categories = [
  {
    icon: Server,
    title: "Backend Engineering",
    items: ["Node.js", "Express", "MongoDB", "REST APIs"],
    isDominant: true,
  },
  {
    icon: Brain,
    title: "Problem Solving & DSA",
    items: ["Data Structures", "Algorithms", "Problem Solving"],
    isDominant: false,
  },
  {
    icon: Layout,
    title: "Frontend Support",
    items: ["React", "JavaScript", "Tailwind CSS", "HTML/CSS"],
    isDominant: false,
  },
  {
    icon: Wrench,
    title: "Tools & Workflow",
    items: ["Git", "GitHub", "Postman", "VS Code"],
    isDominant: false,
  },
];

const Skills = () => (
  <section id="skills" className="py-32 relative overflow-hidden">
    <motion.div
      className="container mx-auto px-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={sectionVariants}
    >
      <motion.div variants={itemVariants} className="text-center mb-24">
        <p className="text-cyan-400 font-mono text-[10px] tracking-[0.3em] uppercase mb-4 font-bold">
          Capabilities
        </p>
        <h2 className="font-heading text-4xl sm:text-5xl font-black text-white">
          Technical Arsenal
        </h2>
      </motion.div>

      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto items-stretch"
        variants={fastStaggerVariants}
      >
        {categories.map((c, i) => (
          <motion.div
            key={c.title}
            variants={cardVariants}
            className={cn(
              // Wrapper: gradient border shell
              "group relative rounded-3xl h-full",
              c.isDominant
                ? "p-[2px] bg-gradient-to-br from-cyan-500/50 to-blue-500/50 scale-105"
                : "p-[1px] bg-white/[0.07]",
              // Animation class on the wrapper element
              c.isDominant ? "skills-card-dominant" : "skills-card"
            )}
          >
            {/* Inner panel */}
            <div
              className={cn(
                "relative rounded-[22px] p-8 h-full flex flex-col items-start overflow-hidden",
                c.isDominant
                  ? "bg-[rgba(8,16,35,0.92)]"
                  : "bg-[rgba(10,18,32,0.88)]"
              )}
            >
              {/* Icon */}
              <div
                className={cn(
                  "relative z-10 w-12 h-12 rounded-xl flex items-center justify-center mb-6",
                  "transition-all duration-300",
                  c.isDominant
                    ? "bg-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500/30"
                    : "bg-white/5 text-white/40 group-hover:bg-cyan-500/15 group-hover:text-cyan-400"
                )}
              >
                <c.icon
                  size={24}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Title */}
              <h3
                className={cn(
                  "relative z-10 font-heading text-lg font-black mb-6",
                  "transition-colors duration-300",
                  c.isDominant ? "text-white" : "text-white/70 group-hover:text-white"
                )}
              >
                {c.title}
              </h3>

              {/* Tags */}
              <div className="relative z-10 flex flex-wrap gap-2 mt-auto">
                {c.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:text-white"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  </section>
);

export default Skills;
