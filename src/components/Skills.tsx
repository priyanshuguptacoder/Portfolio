import { Server, Layout, Brain, Wrench } from "lucide-react";

const categories = [
  { icon: Server, title: "Backend", items: ["Node.js", "Express", "MongoDB", "REST APIs"] },
  { icon: Brain, title: "Core CS", items: ["DSA", "DBMS", "OS", "System Design"] },
  { icon: Layout, title: "Frontend", items: ["React", "Tailwind"] },
  { icon: Wrench, title: "Tools", items: ["Git", "Postman", "VS Code"] },
];

const Skills = () => (
  <section id="skills" className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 ease-out section-padding section-divider">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <p className="text-primary font-mono text-xs tracking-[0.2em] uppercase mb-3">Capabilities</p>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
          Technical Skills
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {categories.map((c, i) => (
          <div
            key={c.title}
            className="animate-on-scroll opacity-0 translate-y-10 glass rounded-2xl p-6 relative overflow-hidden flex flex-col h-full transition-all duration-700 hover:-translate-y-1 hover:shadow-xl group"
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-xl opacity-0 hover:opacity-100 transition duration-500 z-0" />
            <div className="relative flex flex-col h-full z-10">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-5 group-hover:bg-cyan-500/10 ring-1 ring-cyan-400/30 transition-colors duration-300">
                <c.icon size={22} className="text-cyan-400" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-4">{c.title}</h3>
              <div className="flex flex-wrap gap-2 mt-auto">
                {c.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs font-mono px-3 py-1.5 rounded-lg bg-secondary/80 text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300 border border-transparent group-hover:border-cyan-400/20"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;
