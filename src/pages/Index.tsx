import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatAssistant from "@/components/ChatAssistant";
import CursorGlow from "@/components/CursorGlow";

const Index = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-y-10");
            entry.target.classList.add("opacity-100", "translate-y-0");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main
      className="relative min-h-screen overflow-x-hidden"
      style={{ background: "linear-gradient(180deg, #020617 0%, #020617 60%, #030a1a 100%)" }}
    >
      {/* Hidden SEO text — crawlable by Google, invisible to users */}
      <div className="sr-only" aria-hidden="false">
        <h1>Priyanshu Gupta — Backend Developer at NIT Jalandhar</h1>
        <p>
          Backend-focused web developer and CSE undergraduate at National Institute of Technology, Jalandhar.
          Specializes in building scalable Node.js APIs, Express backends, and MongoDB databases.
          Solved 300+ Data Structures and Algorithms problems on LeetCode with a contest rating of 1453.
          Active competitive programmer on Codeforces. Open to backend internships.
        </p>
      </div>

      {/* Cursor-reactive glow (layer 0) */}
      <CursorGlow />
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Top-left: primary cyan/blue glow */}
        <div className="absolute -top-32 -left-40 w-[700px] h-[700px] rounded-full opacity-[0.18] blur-[120px]"
          style={{ background: "radial-gradient(circle, #22d3ee 0%, #3b82f6 40%, transparent 70%)" }} />

        {/* Top-right: blue accent */}
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full opacity-[0.10] blur-[100px]"
          style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)" }} />

        {/* Mid-left: indigo/purple depth layer */}
        <div className="absolute top-[35%] -left-20 w-[450px] h-[450px] rounded-full opacity-[0.12] blur-[100px]"
          style={{ background: "radial-gradient(circle, #6366f1 0%, #7c3aed 40%, transparent 70%)" }} />

        {/* Center: faint warm-white core glow */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-[0.04] blur-[140px]"
          style={{ background: "radial-gradient(ellipse, #e0f2fe 0%, transparent 70%)" }} />

        {/* Bottom-right: purple/indigo terminator */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-[0.14] blur-[120px]"
          style={{ background: "radial-gradient(circle, #7c3aed 0%, #4f46e5 40%, transparent 70%)" }} />

        {/* Bottom-left: soft cyan anchor */}
        <div className="absolute bottom-[5%] left-[5%] w-[400px] h-[400px] rounded-full opacity-[0.08] blur-[100px]"
          style={{ background: "radial-gradient(circle, #22d3ee 0%, transparent 65%)" }} />

        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "256px 256px",
          }}
        />
      </div>
      {/* ─────────────────────────────────────────────────────────────── */}

      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
      <ChatAssistant />
    </main>
  );
};

export default Index;
