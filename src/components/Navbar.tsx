import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";

const navLinks = [
  { label: "About",    href: "#about"    },
  { label: "Projects", href: "#projects" },
  { label: "Skills",   href: "#skills"   },
  { label: "Contact",  href: "#contact"  },
];

const Navbar = () => {
  const [active, setActive]       = useState("");
  const [scrolled, setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location  = useLocation();
  const navigate  = useNavigate();
  const isHome    = location.pathname === "/";
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progressScaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.2 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
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
  }, [isHome]);

  // Handle nav link clicks — smooth scroll on home, navigate+scroll from other pages
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    if (isHome) {
      // Already on home — just smooth scroll
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      // Navigate to home then scroll after page loads
      navigate("/");
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ease-out ${
        scrolled
          ? "glass-strong border-x-0 border-t-0 shadow-[0_1px_24px_rgba(0,0,0,0.4)]"
          : "bg-transparent backdrop-blur-sm"
      }`}
    >
      <motion.div
        aria-hidden="true"
        className="absolute top-0 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.55)]"
        style={{ scaleX: prefersReducedMotion ? 1 : progressScaleX }}
      />
      <div className={`container mx-auto flex items-center justify-between px-6 transition-all ${scrolled ? "py-3" : "py-5"}`}>

        {/* Logo */}
        {/* Logo — always navigates to portfolio homepage */}
        <Link
          to="/"
          className="font-heading text-xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text tracking-tighter hover:opacity-80 transition-opacity"
        >
          PG<span className="logo-dot inline-block origin-bottom transition-transform duration-300 hover:-translate-y-1">.</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((l) => (
            <MagneticButton
              key={l.href}
              href={l.href}
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, l.href)}
              className={`relative text-sm font-semibold tracking-wide transition-all duration-300 group pb-0.5 ${
                isHome && active === l.href
                  ? "text-white"
                  : "text-white/40 hover:text-white/80"
              }`}
            >
              {l.label}
              {isHome && active === l.href ? (
                <motion.span
                  layoutId="navbar-indicator"
                  className="absolute left-0 -bottom-1 h-[1.5px] w-full bg-gradient-to-r from-cyan-400 to-blue-500"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              ) : (
                <span className="absolute left-0 -bottom-1 h-[1.5px] w-0 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full" />
              )}
            </MagneticButton>
          ))}

          {/* Blog link */}
          <MagneticButton
            href="/blog"
            className={`relative text-sm font-semibold tracking-wide transition-all duration-300 group pb-0.5 ${
              location.pathname.startsWith("/blog")
                ? "text-white"
                : "text-white/40 hover:text-white/80"
            }`}
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault();
              navigate("/blog");
            }}
          >
            Blog
            {location.pathname.startsWith("/blog") ? (
              <motion.span
                layoutId="navbar-indicator"
                className="absolute left-0 -bottom-1 h-[1.5px] w-full bg-gradient-to-r from-cyan-400 to-blue-500"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            ) : (
              <span className="absolute left-0 -bottom-1 h-[1.5px] w-0 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full" />
            )}
          </MagneticButton>

          {/* CTA Button — last position */}
          <MagneticButton
            href="/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="relative px-5 py-2.5 rounded-full text-sm font-bold border border-white/10 text-white/70 hover:text-white hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all duration-300 hover:scale-105"
          >
            Resume
          </MagneticButton>
        </div>

        {/* Mobile Toggle */}
        <button
          className="focus-ring md:hidden text-white/60 hover:text-white transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          aria-label="Toggle menu"
        >
          <motion.svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" animate={mobileOpen ? "open" : "closed"}>
            <motion.path variants={{ closed: { d: "M3 6h18" }, open: { d: "M6 6l12 12" } }} />
            <motion.path variants={{ closed: { d: "M3 12h18" }, open: { d: "M6 18L18 6" } }} />
            <motion.path variants={{ closed: { d: "M3 18h18", opacity: 1 }, open: { d: "M6 18h12", opacity: 0 } }} />
          </motion.svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
      {mobileOpen && (
        <motion.div
          id="mobile-navigation"
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, height: "auto" }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
          transition={prefersReducedMotion ? { duration: 0.01 } : undefined}
          className="md:hidden overflow-hidden border-t border-white/5 bg-[#05060A]/95 px-6 pb-6 pt-2 backdrop-blur-xl"
        >
          {navLinks.map((l, index) => (
            <motion.a
              key={l.href}
              href={l.href}
              onClick={(e) => handleNavClick(e, l.href)}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: prefersReducedMotion ? 0 : index * 0.06, duration: prefersReducedMotion ? 0.01 : 0.25 }}
              className={`block py-3 text-sm font-semibold transition-colors ${
                isHome && active === l.href ? "text-cyan-400" : "text-white/50 hover:text-white"
              }`}
            >
              {l.label}
            </motion.a>
          ))}
          <motion.a
            href="/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: prefersReducedMotion ? 0 : navLinks.length * 0.06, duration: prefersReducedMotion ? 0.01 : 0.25 }}
            className="block py-3 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Resume →
          </motion.a>
          <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: prefersReducedMotion ? 0 : (navLinks.length + 1) * 0.06, duration: prefersReducedMotion ? 0.01 : 0.25 }}>
          <Link
            to="/blog"
            onClick={() => setMobileOpen(false)}
            className="block py-3 text-sm font-semibold text-white/50 hover:text-white transition-colors"
          >
            Blog
          </Link>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
