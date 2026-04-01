import { motion } from "framer-motion";
import { Server, Layout, Brain, Wrench, Database, Cpu, Globe, Code } from "lucide-react";

const categories = [
  { 
    icon: Server, 
    title: "Backend Engineering", 
    items: ["Node.js", "Express", "MongoDB", "REST APIs", "System Design"],
    isDominant: true
  },
  { 
    icon: Brain, 
    title: "Computer Science Fundamentals", 
    items: ["DSA", "WEB DEV"],
    isDominant: false
  },
  { 
    icon: Globe, 
    title: "Frontend (Supporting)", 
    items: ["HTML", "CSS", "JavaScript", "React"],
    isDominant: false
  },
  { 
    icon: Wrench, 
    title: "Tools & Workflow", 
    items: ["Git", "GitHub", "VS Code"],
    isDominant: false
  },
];

const Skills = () => (
  <section id="skills" className="py-32 relative overflow-hidden">
    <div className="container mx-auto px-6">
      <div className="text-center mb-24">
        <p className="text-cyan-400 font-mono text-[10px] tracking-[0.3em] uppercase mb-4 font-bold">Capabilities</p>
        <h2 className="font-heading text-4xl sm:text-5xl font-black text-white">Technical Arsenal</h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto items-stretch">
        {categories.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`group relative p-[1px] rounded-3xl transition-all duration-500 h-full ${
              c.isDominant 
                ? "scale-105 shadow-[0_0_40px_-10px_rgba(34,211,238,0.2)] bg-gradient-to-br from-cyan-500/40 to-blue-500/40" 
                : "bg-white/10 hover:bg-white/20"
            }`}
          >
            <div className="bg-[#020617] rounded-[23px] p-8 h-full flex flex-col items-start transition-all duration-500 backdrop-blur-3xl">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
                c.isDominant ? "bg-cyan-500/20 text-cyan-400" : "bg-white/5 text-white/40"
              }`}>
                <c.icon size={24} className="transition-transform group-hover:scale-110" />
              </div>
              <h3 className={`font-heading text-lg font-black mb-6 ${
                c.isDominant ? "text-white" : "text-white/70"
              }`}>{c.title}</h3>
              <div className="flex flex-wrap gap-2 mt-auto">
                {c.items.map((item) => (
                  <span
                    key={item}
                    className={`text-[11px] font-mono px-3.5 py-1.5 rounded-lg transition-all duration-300 border ${
                      c.isDominant 
                        ? "bg-cyan-500/10 text-cyan-100 border-cyan-500/20 hover:bg-cyan-500/20 hover:border-cyan-400/50" 
                        : "bg-white/[0.02] text-white/40 border-white/5 group-hover:text-white/60 group-hover:border-white/10"
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;
