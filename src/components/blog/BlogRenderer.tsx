import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface BlogRendererProps {
  content: string;
}

// Converts plain-text blog content into proper markdown if it lacks ## headings
function normalizeContent(raw: string): string {
  const lines = raw.split("\n");
  const result: string[] = [];
  let inCodeBlock = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Already has markdown code fences — pass through
    if (trimmed.startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      result.push(line);
      continue;
    }

    if (inCodeBlock) {
      result.push(line);
      continue;
    }

    // Detect plain-text headings: short lines (≤80 chars) that are followed
    // by a non-empty line and look like section titles (no sentence punctuation)
    const isLikelyH2 =
      trimmed.length > 0 &&
      trimmed.length <= 80 &&
      !trimmed.endsWith(".") &&
      !trimmed.endsWith(",") &&
      !trimmed.endsWith(":") &&
      !trimmed.startsWith("-") &&
      !trimmed.startsWith("*") &&
      !trimmed.startsWith("|") &&
      !trimmed.match(/^\d+\./) &&          // not a numbered list
      !trimmed.match(/^[a-z]/) &&          // starts with uppercase
      i > 0 &&
      lines[i - 1].trim() === "" &&        // blank line before
      i < lines.length - 1 &&
      lines[i + 1].trim() !== "";          // non-blank line after

    // Already a markdown heading — pass through
    if (trimmed.startsWith("#")) {
      result.push(line);
      continue;
    }

    if (isLikelyH2) {
      result.push(`## ${trimmed}`);
    } else {
      result.push(line);
    }
  }

  // Wrap bare code blocks (indented 4+ spaces or lines that look like code)
  // by detecting runs of code-like lines between text paragraphs
  const pass2 = result.join("\n");

  // Wrap consecutive lines that look like code (contain {, }, ;, =>, etc.)
  // and aren't already in a fence
  return pass2;
}

// Custom components for markdown elements — matches portfolio dark theme
const components = {
  h1: ({ children }: any) => (
    <h1 className="text-3xl sm:text-4xl font-black text-white mt-10 mb-6 leading-tight tracking-tight">
      {children}
    </h1>
  ),
  h2: ({ children }: any) => (
    <h2 className="text-2xl font-bold text-white mt-10 mb-4 leading-snug border-b border-white/[0.06] pb-3">
      {children}
    </h2>
  ),
  h3: ({ children }: any) => (
    <h3 className="text-xl font-bold text-white/90 mt-8 mb-3 leading-snug">
      {children}
    </h3>
  ),
  h4: ({ children }: any) => (
    <h4 className="text-[12px] font-bold text-cyan-400 mt-6 mb-2 uppercase tracking-widest">
      {children}
    </h4>
  ),
  p: ({ children }: any) => (
    <p className="text-white/65 text-[15px] leading-[1.8] mb-5">
      {children}
    </p>
  ),
  ul: ({ children }: any) => (
    <ul className="space-y-2 mb-5 pl-0 list-none">
      {children}
    </ul>
  ),
  ol: ({ children }: any) => (
    <ol className="list-decimal list-inside space-y-2 mb-5 text-white/65 text-[15px]">
      {children}
    </ol>
  ),
  li: ({ children }: any) => (
    <li className="flex items-start gap-2 text-white/65 text-[15px] leading-relaxed">
      <span className="text-cyan-400 mt-1.5 shrink-0 text-xs">▸</span>
      <span>{children}</span>
    </li>
  ),
  code: ({ inline, children }: any) => {
    if (inline) {
      return (
        <code className="bg-white/[0.08] text-cyan-300 px-1.5 py-0.5 rounded text-[13px] font-mono border border-white/[0.06]">
          {children}
        </code>
      );
    }
    return (
      <code className="block text-[13px] font-mono text-white/85 leading-relaxed whitespace-pre">
        {children}
      </code>
    );
  },
  pre: ({ children }: any) => (
    <pre className="bg-[rgba(6,12,26,0.95)] border border-white/[0.08] rounded-xl p-5 overflow-x-auto mb-6 text-[13px] leading-relaxed shadow-[inset_0_0_20px_rgba(0,0,0,0.3)]">
      {children}
    </pre>
  ),
  blockquote: ({ children }: any) => (
    <blockquote className="border-l-2 border-cyan-500/60 pl-5 my-6 text-white/50 italic text-[15px] leading-relaxed">
      {children}
    </blockquote>
  ),
  table: ({ children }: any) => (
    <div className="overflow-x-auto mb-6 rounded-xl border border-white/[0.07]">
      <table className="w-full text-[13px] border-collapse">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }: any) => (
    <thead className="bg-white/[0.04] border-b border-white/[0.08]">
      {children}
    </thead>
  ),
  th: ({ children }: any) => (
    <th className="text-left px-4 py-3 text-white/80 font-bold text-[11px] uppercase tracking-widest">
      {children}
    </th>
  ),
  td: ({ children }: any) => (
    <td className="px-4 py-3 text-white/55 border-b border-white/[0.04]">
      {children}
    </td>
  ),
  hr: () => (
    <hr className="border-none h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent my-10" />
  ),
  strong: ({ children }: any) => (
    <strong className="text-white font-semibold">{children}</strong>
  ),
  em: ({ children }: any) => (
    <em className="text-white/70 italic">{children}</em>
  ),
  a: ({ href, children }: any) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors"
    >
      {children}
    </a>
  ),
};

const BlogRenderer = ({ content }: BlogRendererProps) => {
  const normalized = normalizeContent(content);

  return (
    <div className="blog-content max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={components}
      >
        {normalized}
      </ReactMarkdown>
    </div>
  );
};

export default BlogRenderer;
