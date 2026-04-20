import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogCard from "@/components/blog/BlogCard";
import { blogs } from "@/data/blogs";
import { sectionVariants, itemVariants, fastStaggerVariants } from "@/lib/animations";

const BlogListPage = () => {
  // Update document title and meta for SEO
  useEffect(() => {
    document.title = "Blog | Priyanshu Gupta – DSA, Backend & System Design";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Articles on DSA, LeetCode problem solving, backend development with Node.js, and system design by Priyanshu Gupta.");
  }, []);

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ background: "linear-gradient(180deg, #020617 0%, #020617 60%, #030a1a 100%)" }}
    >
      <Navbar />

      <main className="container mx-auto px-6 max-w-6xl pt-32 pb-24">
        {/* Back to portfolio */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-12"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Portfolio
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          className="mb-16"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <motion.p variants={itemVariants} className="text-cyan-400 font-mono text-[10px] tracking-[0.3em] uppercase mb-4 font-bold">
            Writing
          </motion.p>
          <motion.h1 variants={itemVariants} className="font-heading text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">
            Blog
          </motion.h1>
          <motion.p variants={itemVariants} className="text-white/45 text-base max-w-xl leading-relaxed">
            Articles on DSA patterns, LeetCode problem solving, backend development, and system design.
          </motion.p>
        </motion.div>

        {/* Blog Grid */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={fastStaggerVariants}
        >
          {blogs.map((blog, i) => (
            <BlogCard key={blog.slug} blog={blog} index={i} />
          ))}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogListPage;
