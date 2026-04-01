import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Trophy, Server, Award, Code2, BookOpen, GraduationCap, Medal } from "lucide-react";

const education = [
  {
    degree: "B.Tech in Computer Science and Engineering",
    institution: "National Institute of Technology (NIT), Jalandhar",
    period: "2025 – Present",
    details: "Focusing on backend architecture, distributed systems, and core computer science fundamentals.",
  },
  {
    degree: "Senior Secondary Education (Class XII)",
    institution: "Academic Global School",
    period: "2023 – 2025",
    details: "Percentage: 92% | Focused on Physics, Chemistry, and Mathematics.",
  },
  {
    degree: "Secondary Education (Class X)",
    institution: "S.B.T. Public School",
    period: "Completed",
    details: "Percentage: 93.6% | Foundation in science and mathematics.",
  },
];

const skillsSummary = [
  { category: "Backend Engineering", items: ["Node.js", "Express", "MongoDB", "REST APIs", "System Design"] },
  { category: "CS Fundamentals", items: ["DSA", "Operating Systems", "DBMS", "Networking"] },
  { category: "Frontend", items: ["React", "JavaScript", "Tailwind CSS", "HTML/CSS"] },
  { category: "Tools", items: ["Git", "GitHub", "Postman", "VS Code"] },
];

const certifications = [
  { title: "Frontend Implementation", issuer: "Meta (via Coursera)", date: "2024" },
  { title: "Backend Architecture", issuer: "IBM (via SkillsBuild)", date: "2024" },
  { title: "Problem Solving (Intermediate)", issuer: "HackerRank", date: "2023" },
];

const About = () => {
  const [activeTab, setActiveTab] = useState("education");

  const tabs = [
    { id: "skills", label: "Skills", icon: Code2 },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "certifications", label: "Certifications", icon: Medal },
  ];

  return (
    <>
      {/* ABOUT SECTION */}
      <section id="about" className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16 px-4">
            <p className="text-cyan-400 font-mono text-[10px] tracking-[0.3em] uppercase mb-4 font-bold">Engineering Background</p>
            <h2 className="font-heading text-4xl sm:text-5xl font-black text-white mb-8">About Me</h2>
            <p className="text-white/50 text-base sm:text-lg leading-relaxed font-light max-w-2xl mx-auto">
              I am a Computer Science undergraduate focused on backend systems, problem solving, and scalable application development.
              I build real-world applications with efficient APIs, optimized database design, and clean architecture.
              I have solved 250+ problems on LeetCode, strengthening my understanding of data structures, algorithms, and system thinking.
            </p>
          </div>

          {/* TAB SYSTEM */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 border ${
                  activeTab === tab.id
                    ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                    : "bg-white/[0.02] text-white/40 border-white/5 hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative min-h-[400px]">
            <AnimatePresence mode="wait">
              {activeTab === "education" && (
                <motion.div
                  key="education"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {education.map((edu, i) => (
                    <div key={i} className="group relative pl-8 py-2">
                      <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/10 group-last:h-4">
                        <div className="absolute top-4 -left-1 w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                      </div>
                      <div className="glass rounded-2xl p-6 transition-all duration-300 hover:border-cyan-500/30 group-hover:-translate-x-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                          <h4 className="font-bold text-white text-lg leading-tight">{edu.degree}</h4>
                          <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest bg-cyan-400/10 px-2 py-1 rounded border border-cyan-400/20 w-fit">
                            {edu.period}
                          </span>
                        </div>
                        <p className="text-white/80 font-medium text-sm mb-2">{edu.institution}</p>
                        <p className="text-white/40 text-xs font-light leading-relaxed">{edu.details}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === "skills" && (
                <motion.div
                  key="skills"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="grid sm:grid-cols-2 gap-4"
                >
                  {skillsSummary.map((skill, i) => (
                    <div key={i} className="glass rounded-2xl p-6 transition-all duration-300 hover:border-cyan-500/20">
                      <h4 className="text-cyan-400 font-mono text-[10px] tracking-widest uppercase mb-4 font-bold">{skill.category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {skill.items.map((item) => (
                          <span key={item} className="text-xs px-3 py-1.5 rounded-lg bg-white/5 text-white/60 border border-white/5">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === "certifications" && (
                <motion.div
                  key="certifications"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="grid sm:grid-cols-2 gap-4"
                >
                  {certifications.map((cert, i) => (
                    <div key={i} className="glass rounded-2xl p-6 transition-all duration-300 hover:border-cyan-500/20 flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                        <Medal size={20} className="text-cyan-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm mb-1">{cert.title}</h4>
                        <p className="text-white/50 text-[11px] mb-1">{cert.issuer}</p>
                        <p className="text-white/30 text-[10px] font-mono">{cert.date}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* RESUME SECTION */}
      <section className="py-40 relative overflow-hidden bg-white/[0.01] border-y border-white/5">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
          >
            <p className="text-cyan-400 font-mono text-[10px] tracking-[0.3em] uppercase mb-6 font-bold">Documentation</p>
            <h2 className="font-heading text-4xl sm:text-5xl font-black text-white mb-6 tracking-tighter">
              Complete Payload
            </h2>
            <p className="text-lg text-white/40 mb-12 max-w-md mx-auto font-light leading-relaxed">
              For a detailed architectural breakdown of my engineering journey and technical specifications.
            </p>
            <a
              href="/resume.pdf"
              download
              className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-white text-black font-black text-sm transition-all duration-500 hover:scale-105 active:scale-95 shadow-2xl shadow-cyan-500/10 hover:shadow-cyan-400/30"
            >
              <Download size={18} className="group-hover:-translate-y-0.5 transition-transform" /> 
              Download Resume (PDF)
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default About;
