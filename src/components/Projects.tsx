import { ExternalLink, Github, Database, Shield, Server } from "lucide-react";

const Projects = () => (
  <section id="projects" className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 ease-out section-padding section-divider">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <p className="text-primary font-mono text-xs tracking-[0.2em] uppercase mb-3">Engineering</p>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
          Featured Work
        </h2>
      </div>

      {/* Featured Project — LeetCode Tracker */}
      <div
        className="animate-on-scroll opacity-0 translate-y-10 glass rounded-2xl p-8 lg:p-10 mb-8 relative overflow-hidden group transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:scale-[1.02] backdrop-blur-sm border border-white/10 hover:border-cyan-400/30 delay-100"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[10px] font-mono gradient-bg text-primary-foreground px-2.5 py-1 rounded-full font-semibold tracking-wide uppercase">
              Featured
            </span>
          </div>
          <h3 className="font-heading text-2xl lg:text-3xl font-bold text-foreground mb-6">
            LeetCode Tracker
          </h3>

          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-xs font-mono text-primary uppercase tracking-wide mb-3">Problem</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Tracking DSA progress manually is inefficient and lacks analytics for targeted improvement.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-mono text-primary uppercase tracking-wide mb-3">Engineering Solution</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Built a robust backend utilizing streak tracking logic, REST APIs, and a centralized MongoDB database.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-mono text-primary uppercase tracking-wide mb-3">Impact</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Provides real-time analytics to users, ensuring data consistency across the application.
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="text-xs font-mono text-primary uppercase tracking-wide mb-4">Core Focus</h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                "Real-time analytics dashboard",
                "Advanced Streak tracking system",
                "Robust backend logic & API sync",
                "SM-2 spaced repetition algorithm",
                "Performance dashboards & trends",
                "Striver A2Z sheet progress tracking",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground bg-secondary/50 rounded-lg px-4 py-3">
                  <span className="text-primary mt-0.5 shrink-0">▸</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex flex-wrap gap-2">
              {["React", "Node.js", "Express", "MongoDB", "Tailwind"].map((t) => (
                <span key={t} className="text-xs font-mono px-3 py-1.5 rounded-lg bg-secondary text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/priyanshuguptacoder/LeetCode-Tracker"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View GitHub repository"
              >
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-xs border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 hover:scale-105 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.25)]">
                  <Github size={14} /> View Code
                </button>
              </a>
              <a
                href="https://leetcodetrackerpriyanshucoder.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group cursor-pointer gradient-bg px-5 py-2.5 rounded-lg font-semibold text-xs text-primary-foreground hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg inline-flex items-center gap-2"
                aria-label="Open link"
              >
                <ExternalLink size={14} /> Live Demo
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Project — Hostel Management */}
      <div
        className="animate-on-scroll opacity-0 translate-y-10 glass rounded-2xl p-8 lg:p-10 relative overflow-hidden group transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:scale-[1.02] backdrop-blur-sm border border-white/10 hover:border-cyan-400/30 delay-200"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
        <div className="relative z-10">
          <h3 className="font-heading text-xl lg:text-2xl font-bold text-foreground mb-6">
            Hostel Management System
          </h3>

          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-xs font-mono text-primary uppercase tracking-wide mb-3">Problem</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Manual administration of hostel facilities leads to data loss, inefficiencies and unverified student access.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-mono text-primary uppercase tracking-wide mb-3">Engineering Solution</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Implemented secure RBAC with JWTs, designed efficient REST APIs, and optimized DB queries.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-mono text-primary uppercase tracking-wide mb-3">Impact</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Streamlined hostel operations, increased security via role-based authentication, and sped up data retrieval.
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="text-xs font-mono text-primary uppercase tracking-wider mb-4">Core Features</h4>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { icon: Shield, text: "RBAC (JWT) Auth" },
                { icon: Server, text: "REST API Design" },
                { icon: Database, text: "Optimized DB queries" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground bg-secondary/50 rounded-lg px-4 py-3">
                  <item.icon size={16} className="text-primary shrink-0" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex flex-wrap gap-2">
              {["React", "Node.js", "Express", "MongoDB"].map((t) => (
                <span key={t} className="text-xs font-mono px-3 py-1.5 rounded-lg bg-secondary text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/priyanshuguptaiit99/hostelpriyanshu"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View GitHub repository"
              >
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-xs border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 hover:scale-105 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.25)]">
                  <Github size={14} /> View Code
                </button>
              </a>
              <a
                href="https://hostel-management-system-hqg0.onrender.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group cursor-pointer gradient-bg px-5 py-2.5 rounded-lg font-semibold text-xs text-primary-foreground hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg inline-flex items-center gap-2"
                aria-label="Open link"
              >
                <ExternalLink size={14} /> Live Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Projects;
