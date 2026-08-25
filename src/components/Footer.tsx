const Footer = () => (
  <footer className="py-10 border-t border-white/[0.08] text-center relative overflow-hidden">
    <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-black/30 to-transparent pointer-events-none opacity-40" />
    <div className="relative z-10 flex flex-col items-center">
      <p className="text-[11px] font-mono tracking-[0.15em] uppercase text-white/40">
        © {new Date().getFullYear()} Priyanshu Gupta
      </p>
    </div>
  </footer>
);

export default Footer;
