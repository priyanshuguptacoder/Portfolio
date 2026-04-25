import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Tag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogRenderer from "@/components/blog/BlogRenderer";
import RelatedPosts from "@/components/blog/RelatedPosts";
import { getBlogBySlug, getRelatedBlogs } from "@/data/blogs";

const BlogDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const blog = getBlogBySlug(slug ?? "");
  const related = getRelatedBlogs(slug ?? "");

  // Dynamic SEO meta tags
  useEffect(() => {
    if (!blog) return;

    document.title = `${blog.seoTitle} | Priyanshu Gupta`;

    const setMeta = (name: string, content: string, prop = false) => {
      const selector = prop ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(selector) as HTMLMetaElement;
      if (!el) {
        el = document.createElement("meta");
        prop ? el.setAttribute("property", name) : el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", blog.metaDescription);
    setMeta("og:title", blog.seoTitle, true);
    setMeta("og:description", blog.metaDescription, true);
    setMeta("og:url", `https://www.priyanshuguptaportfolio.online/blog/${blog.slug}`, true);
    setMeta("twitter:title", blog.seoTitle);
    setMeta("twitter:description", blog.metaDescription);

    // Cleanup on unmount
    return () => {
      document.title = "Priyanshu Gupta | Backend Developer · NIT Jalandhar · 300+ LeetCode";
    };
  }, [blog]);

  // 404 if slug not found
  if (!blog) return <Navigate to="/blog" replace />;

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ background: "linear-gradient(180deg, #020617 0%, #020617 60%, #030a1a 100%)" }}
    >
      <Navbar />

      <main className="container mx-auto px-6 max-w-3xl pt-32 pb-24">

        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-10"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors"
          >
            <ArrowLeft size={14} />
            All Articles
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
              >
                <Tag size={8} />
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight tracking-tight mb-6">
            {blog.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-4 text-white/35 text-[12px] pb-8 border-b border-white/[0.06]">
            <span className="flex items-center gap-1.5">
              <Calendar size={12} />
              {new Date(blog.date).toLocaleDateString("en-US", {
                month: "long", day: "numeric", year: "numeric"
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={12} />
              {blog.readTime}
            </span>
          </div>
        </motion.header>

        {/* Blog Content */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <BlogRenderer content={blog.content} />
        </motion.div>

        {/* Related Posts */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <RelatedPosts blogs={related} />
        </motion.div>

        {/* Back to blog list */}
        <div className="mt-12 pt-8 border-t border-white/[0.06]">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/50 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft size={14} />
            Back to all articles
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogDetailPage;
