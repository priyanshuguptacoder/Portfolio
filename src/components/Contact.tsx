import { Github, Linkedin, Code2 } from "lucide-react";

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/priyanshuguptacoder" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/priyanshu-gupta-b98689376/" },
  { icon: Code2, label: "LeetCode", href: "https://leetcode.com/u/invisiblemanfromheart/" },
];

const Contact = () => (
  <section id="contact" className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 ease-out section-padding section-divider">
    <div className="container mx-auto px-6 max-w-3xl text-center">
      <p className="text-primary font-mono text-xs tracking-[0.2em] uppercase mb-3">Connect</p>
      <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-foreground mb-6 leading-tight tracking-tight">
        Let’s Build Something <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">Meaningful</span>
      </h2>
      <p className="text-base sm:text-lg text-muted-foreground mb-12 max-w-xl mx-auto leading-relaxed">
        Actively looking for backend internships. Open to impactful projects.
      </p>

      <div className="flex flex-col items-center gap-12">
        <a
          href="mailto:priyanshuguptanitian9696@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group cursor-pointer bg-gradient-to-r from-cyan-500 to-blue-500 px-12 py-5 rounded-2xl font-bold text-base text-primary-foreground hover:opacity-90 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 inline-flex items-center gap-2"
          aria-label="Open link"
        >
          Email Me
        </a>

        <div className="flex items-center justify-center gap-6 sm:gap-8">
          {socialLinks.map((c, i) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="animate-on-scroll opacity-0 translate-y-10 group cursor-pointer glass rounded-2xl p-6 flex flex-col items-center justify-center gap-4 transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] hover:scale-105 border border-white/10"
              style={{ transitionDelay: `${i * 100}ms` }}
              aria-label="Open link"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl z-0" />
              <c.icon size={32} className="text-muted-foreground group-hover:text-cyan-400 transition-all duration-300 group-hover:scale-110 relative z-10" />
            </a>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Contact;
