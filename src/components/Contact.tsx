import { motion } from "framer-motion";
import { Github, Linkedin, Code2, Mail, ExternalLink, Zap } from "lucide-react";

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/priyanshuguptacoder" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/priyanshu-gupta-b98689376/" },
  { icon: Code2, label: "LeetCode", href: "https://leetcode.com/u/invisiblemanfromheart/" },
];

const Contact = () => (
  <section id="contact" className="py-40 relative overflow-hidden">
    <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-cyan-400 font-mono text-[10px] tracking-[0.4em] uppercase mb-6 font-bold">Initiate Connection</p>
        <h2 className="font-heading text-5xl sm:text-7xl font-black text-white mb-10 leading-tight tracking-tighter">
          Let’s Build Something <br />
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]">Scalable</span>
        </h2>
        <p className="text-lg sm:text-xl text-white/40 mb-16 max-w-2xl mx-auto leading-relaxed font-light">
          Actively engineering backend systems and looking for high-impact internship opportunities.
        </p>

        <div className="flex flex-col items-center gap-12">
          <a
            href="mailto:priyanshuguptanitian9696@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-white text-black px-16 py-6 rounded-2xl font-black text-lg transition-all duration-500 hover:scale-105 active:scale-95 shadow-2xl shadow-cyan-500/20 hover:shadow-cyan-400/40 flex items-center gap-4"
          >
            Direct Pipeline <Mail size={22} className="group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-cyan-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity animate-pulse" />
          </a>

          <div className="flex items-center justify-center gap-6 sm:gap-10">
            {socialLinks.map((c, i) => (
              <motion.a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative w-16 h-16 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center transition-all duration-500 hover:border-cyan-500/40 hover:bg-white/[0.05] hover:-translate-y-2"
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
