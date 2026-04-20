import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Blog } from "@/data/blogs";

interface RelatedPostsProps {
  blogs: Blog[];
}

const RelatedPosts = ({ blogs }: RelatedPostsProps) => {
  if (!blogs.length) return null;

  return (
    <section className="mt-16 pt-10 border-t border-white/[0.06]">
      <h3 className="text-white font-bold text-lg mb-6">Related Articles</h3>
      <div className="grid sm:grid-cols-3 gap-4">
        {blogs.map((blog) => (
          <Link
            key={blog.slug}
            to={`/blog/${blog.slug}`}
            className="group p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-cyan-500/30 hover:bg-white/[0.04] transition-all duration-200"
          >
            <div className="flex flex-wrap gap-1.5 mb-2">
              {blog.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="text-[9px] font-mono uppercase tracking-widest text-cyan-400/70">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-white/75 text-sm font-medium leading-snug mb-2 line-clamp-2 group-hover:text-white transition-colors">
              {blog.title}
            </p>
            <span className="inline-flex items-center gap-1 text-[11px] text-cyan-400/70 group-hover:text-cyan-400 transition-colors">
              Read <ArrowRight size={10} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedPosts;
