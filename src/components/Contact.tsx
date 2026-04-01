import { motion } from "framer-motion";
import { Github, Linkedin, Code2, Mail } from "lucide-react";

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/priyanshuguptacoder" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/priyanshu-gupta-b98689376/" },
  { icon: Code2, label: "LeetCode", href: "https://leetcode.com/u/invisiblemanfromheart/" },
];

const Contact = () => (
  <section id="contact" className="py-40 relative overflow-hidden">
    {/* Subtle radial glow backgrounds */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />
    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

    <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p className="text-cyan-400 font-mono text-[10px] tracking-[0.4em] uppercase mb-6 font-bold">CONNECT</p>
        <h2 className="font-heading text-5xl sm:text-7xl font-black text-white mb-10 leading-tight tracking-tighter">
          Let’s Build Something <br />
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]">Meaningful</span>
        </h2>
        <p className="text-lg sm:text-xl text-white/40 mb-16 max-w-2xl mx-auto leading-relaxed font-light">
          I'm actively looking for backend internships and real-world projects. If you're building something interesting or need a backend-focused developer, let's connect.
        </p>

        <div className="flex flex-col items-center gap-12">
          <a
            href="mailto:priyanshuguptanitian9696@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-gradient-to-r from-blue-500 to-cyan-500 px-16 py-6 rounded-2xl font-black text-lg text-white transition-all duration-500 hover:scale-105 active:scale-95 shadow-2xl shadow-blue-500/20 hover:shadow-cyan-400/40 flex items-center gap-4"
          >
            Email Me <Mail size={22} className="group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
          </a>

          <div className="flex items-center justify-center gap-6 sm:gap-10">
            {socialLinks.map((c, i) => (
              <motion.a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative w-16 h-16 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center transition-all duration-500 hover:border-cyan-500/40 hover:bg-white/[0.05] hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                aria-label={c.label}
              >
                <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 blur-lg transition-opacity" />
                <c.icon size={26} className="text-white/30 group-hover:text-cyan-400 transition-colors relative z-10" />
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default Contact;
