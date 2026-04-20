import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive("#" + e.target.id);
        });
      },
      { threshold: 0.25, rootMargin: "-80px 0px 0px 0px" }
    );
    navLinks.forEach((l) => {
      const el = document.querySelector(l.href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        scrolled
          ? "bg-[#020617]/80 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_1px_24px_rgba(0,0,0,0.4)]"
          : "bg-transparent backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-5 px-6">

        {/* Logo */}
        <a
          href="#"
          className="font-heading text-xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text tracking-tighter hover:opacity-80 transition-opacity"
        >
          PG.
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`relative text-sm font-semibold tracking-wide transition-all duration-300 group pb-0.5 ${
                active === l.href
                  ? "text-white"
                  : "text-white/40 hover:text-white/80"
              }`}
            >
              {l.label}
              <span
                className={`absolute left-0 -bottom-1 h-[1.5px] bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 ${
                  active === l.href ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </a>
          ))}

          {/* Blog link */}
          <Link
            to="/blog"
            className={`relative text-sm font-semibold tracking-wide transition-all duration-300 group pb-0.5 ${
              location.pathname.startsWith("/blog")
                ? "text-white"
                : "text-white/40 hover:text-white/80"
            }`}
          >
            Blog
            <span
              className={`absolute left-0 -bottom-1 h-[1.5px] bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 ${
                location.pathname.startsWith("/blog") ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </Link>

          {/* CTA Button — last position */}
          <a
            href="mailto:priyanshuguptanitian9696@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="relative px-5 py-2.5 rounded-full text-sm font-bold border border-white/10 text-white/70 hover:text-white hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all duration-300 hover:scale-105"
          >
            Consult Me
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white/60 hover:text-white transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {mobileOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#020617]/90 backdrop-blur-xl border-t border-white/5 px-6 pb-6 pt-2 space-y-1">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className={`block py-3 text-sm font-semibold transition-colors ${
                active === l.href ? "text-cyan-400" : "text-white/50 hover:text-white"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="mailto:priyanshuguptanitian9696@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block py-3 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Consult Me →
          </a>
          <Link
            to="/blog"
            onClick={() => setMobileOpen(false)}
            className="block py-3 text-sm font-semibold text-white/50 hover:text-white transition-colors"
          >
            Blog
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
