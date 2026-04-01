import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatAssistant from "@/components/ChatAssistant";

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
    <main className="relative min-h-screen bg-background overflow-hidden">
      {/* Subtle radial glow backgrounds */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 blur-3xl rounded-full pointer-events-none -z-10" />
      <div className="absolute top-[50%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/10 blur-3xl rounded-full pointer-events-none -z-10" />
      <div className="absolute top-[80%] left-[10%] w-[500px] h-[500px] bg-cyan-500/10 blur-3xl rounded-full pointer-events-none -z-10" />

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
