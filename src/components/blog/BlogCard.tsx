import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { Blog } from "@/data/blogs";
import { cardVariants } from "@/lib/animations";

interface BlogCardProps {
  blog: Blog;
  index: number;
}

const BlogCard = ({ blog, index }: BlogCardProps) => (
  <motion.article
    variants={cardVariants}
    custom={index}
    className="group relative rounded-2xl border border-white/[0.06] bg-[rgba(10,18,32,0.9)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/30 hover:shadow-[0_8px_30px_rgba(0,120,255,0.12)]"
  >
    {/* Top accent line */}
    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

    <div className="p-6 flex flex-col h-full">
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {blog.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Title */}
      <h2 className="text-white font-bold text-lg leading-snug mb-3 group-hover:text-cyan-50 transition-colors duration-200 line-clamp-2">
        {blog.title}
      </h2>

      {/* Description */}
      <p className="text-white/45 text-sm leading-relaxed mb-5 line-clamp-3 flex-1">
        {blog.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/[0.05]">
        <div className="flex items-center gap-3 text-white/30 text-[11px]">
          <span className="flex items-center gap-1">
            <Calendar size={11} />
            {new Date(blog.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {blog.readTime}
          </span>
        </div>

        <Link
          to={`/blog/${blog.slug}`}
          className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group/link"
          aria-label={`Read ${blog.title}`}
        >
          Read more
          <ArrowRight size={13} className="transition-transform duration-200 group-hover/link:translate-x-0.5" />
        </Link>
      </div>
    </div>
  </motion.article>
);

export default BlogCard;
