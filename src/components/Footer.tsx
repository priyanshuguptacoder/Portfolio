const Footer = () => (
  <footer className="py-20 border-t border-white/5 text-center relative overflow-hidden">
    <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-black/40 to-transparent pointer-events-none opacity-50" />
    <p className="relative z-10 text-xs font-mono tracking-[0.1em] uppercase text-white/80 mt-4">
      © {new Date().getFullYear()} Priyanshu Gupta
    </p>
  </footer>
);

export default Footer;
