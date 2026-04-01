import { Download, Trophy, Target, Award, Code2 } from "lucide-react";

// --- ACHIEVEMENTS LOGIC ---
const achievements = [
  { icon: Target, title: "99.2 Percentile", detail: "JEE Mains" },
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
    <section id="about" className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 ease-out section-padding">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-12">
          <p className="text-primary font-mono text-xs tracking-[0.2em] uppercase mb-3">Background</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">About Me</h2>
        </div>
        <div className="space-y-5 text-muted-foreground text-sm sm:text-base leading-relaxed text-center max-w-2xl mx-auto">
          <p>
            Computer Science undergraduate at <span className="text-foreground/90 font-medium">NIT Jalandhar</span>, focused on backend systems and full stack development.
          </p>
          <p>
            I build real-world applications with scalable architecture, efficient APIs, and optimized database systems.
          </p>
          <p>
            250+ DSA problems solved — actively improving using patterns like Sliding Window, Binary Search, and Backtracking.
          </p>
        </div>
      </div>
    </section>

    {/* EXPERIENCE SECTION */}
    <section id="experience" className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 ease-out section-padding section-divider">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-16">
          <p className="text-primary font-mono text-xs tracking-[0.2em] uppercase mb-3">Journey</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">Engineering Journey</h2>
        </div>

        <div className="glass rounded-2xl p-8 relative overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-border/50">
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground">Backend Engineer</h3>
                <p className="text-sm text-primary font-mono mt-1.5">Independent · Project-Based</p>
              </div>
            </div>
            <div className="space-y-4">
              {experienceItems.map((item, i) => (
                <div key={i} className="flex items-start gap-3.5 text-sm text-muted-foreground leading-relaxed">
                  <span className="text-primary mt-1 shrink-0">▸</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ACHIEVEMENTS SECTION */}
    <section className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 ease-out section-padding section-divider">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <p className="text-primary font-mono text-xs tracking-[0.2em] uppercase mb-3">Recognition</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">Achievements</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((a, i) => (
            <div
              key={i}
              className="glass rounded-2xl p-6 text-center group relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition duration-500 z-0" />
              <div className="relative z-10">
                <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-4 group-hover:bg-cyan-500/10 transition-colors duration-300">
                  <a.icon size={20} className="text-cyan-400" />
                </div>
                <p className="font-heading text-sm font-bold text-foreground mb-1">{a.title}</p>
                <p className="text-xs text-muted-foreground">{a.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* RESUME SECTION */}
    <section className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 ease-out section-padding section-divider">
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <div>
          <p className="text-primary font-mono text-xs tracking-[0.2em] uppercase mb-3">Resume</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Want the full picture?
          </h2>
          <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto">
            Download my resume for a complete overview of my skills, projects, and experience.
          </p>
          <a
            href="/resume.pdf"
            download
            className="px-8 py-4 rounded-xl font-semibold text-sm hover:opacity-90 transition-all duration-300 inline-flex items-center gap-2 border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.25)]"
          >
            <Download size={18} /> Download Resume
          </a>
        </div>
      </div>
    </section>
  </>
);

export default About;
