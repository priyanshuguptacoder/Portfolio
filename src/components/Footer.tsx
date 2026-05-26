const Footer = () => (
  <footer className="py-20 border-t border-white/5 text-center relative overflow-hidden">
    <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-black/40 to-transparent pointer-events-none opacity-50" />
    <div className="relative z-10 flex flex-col items-center gap-4">
      <a
        href="https://www.geeksforgeeks.org/profile/thealgoedge"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-white/70 text-xs font-semibold hover:text-white hover:border-green-400/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all"
      >
        GeeksForGeeks
      </a>
      <p className="text-xs font-mono tracking-[0.1em] uppercase text-white/80 mt-1">
        © {new Date().getFullYear()} Priyanshu Gupta
      </p>
    </div>
  </footer>
);

export default Footer;
