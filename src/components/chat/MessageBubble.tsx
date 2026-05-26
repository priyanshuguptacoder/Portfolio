import { motion } from "framer-motion";
import { ChevronRight, ExternalLink, Code2, Copy, Check } from "lucide-react";
import { useState } from "react";
import { type Message, type Action } from "./types";
import { handleScroll, handlePlaceholderClick, isPlaceholderHref } from "./helpers";
import { CODING_PROFILES, SUGGESTED_QUESTIONS } from "./data";
import { LINKS, INTERNSHIP_QUERY } from "./types";

// ── Common Sub-components ──────────────────────────────────────────────────────
const SectionDivider = ({ label }: { label: string }) => (
  <div className="flex items-center gap-3 text-[9px] uppercase tracking-[0.3em] text-white/35 mt-4 mb-2">
    <span className="h-px flex-1 bg-white/[0.07]" />
    <span>{label}</span>
    <span className="h-px flex-1 bg-white/[0.07]" />
  </div>
);

export const SuggestionChip = ({ label, onClick }: { label: string; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="inline-flex items-center px-3 py-1.5 rounded-full border border-white/[0.1] bg-white/[0.03] text-[10px] font-medium text-white/70 hover:text-cyan-50 hover:border-cyan-400/50 hover:bg-cyan-500/[0.15] hover:shadow-[0_0_12px_rgba(34,211,238,0.2)] active:scale-[0.97] transition-all duration-300 ease-out"
  >
    {label}
  </button>
);

const ProfileIcon = ({ short }: { short: string }) => (
  <svg viewBox="0 0 40 40" className="w-5 h-5 text-white">
    <circle cx="20" cy="20" r="18" fill="currentColor" opacity="0.2" />
    <text x="50%" y="54%" textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="ui-monospace, monospace" fill="currentColor">
      {short}
    </text>
  </svg>
);

const ProfileCard = ({
  label,
  info,
  short,
  href,
  accent,
}: {
  label: string;
  info: string;
  short: string;
  href: string;
  accent: string;
}) => (
  <a
    href={href}
    onClick={(e) => handlePlaceholderClick(e, href)}
    target={isPlaceholderHref(href) ? undefined : "_blank"}
    rel={isPlaceholderHref(href) ? undefined : "noopener noreferrer"}
    className="group relative overflow-hidden rounded-[10px] border border-white/[0.08] bg-white/[0.02] px-2.5 py-2 transition-all duration-300 hover:border-cyan-400/40 hover:bg-white/[0.04] hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(34,211,238,0.15)]"
  >
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.15),_transparent_70%)]" />
    <div className="relative flex items-center gap-2">
      <div className={`flex items-center justify-center w-7 h-7 rounded-md bg-gradient-to-br ${accent}`}>
        <ProfileIcon short={short} />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold text-white/90 leading-none group-hover:text-white transition-colors">{label}</p>
        <p className="text-[9px] text-white/45 mt-0.5 truncate">{info}</p>
      </div>
    </div>
  </a>
);

const ActionButton = ({ action }: { action: Action }) => {
  const baseClass =
    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-white/70 text-[11px] font-medium hover:border-cyan-400/40 hover:text-cyan-300 hover:bg-cyan-500/[0.1] hover:shadow-[0_2px_10px_rgba(34,211,238,0.15)] active:scale-[0.97] transition-all duration-200";

  if (action.scrollTo) {
    return (
      <button onClick={() => action.scrollTo && handleScroll(action.scrollTo)} className={baseClass}>
        {action.label}
        <ChevronRight size={10} className="opacity-50" />
      </button>
    );
  }

  const isPlaceholder = isPlaceholderHref(action.url);
  if (!action.url) return null;
  return (
    <a
      href={action.url}
      onClick={(e) => handlePlaceholderClick(e, action.url)}
      target={isPlaceholder ? undefined : "_blank"}
      rel={isPlaceholder ? undefined : "noopener noreferrer"}
      className={baseClass}
    >
      {action.label}
      <ExternalLink size={10} className="opacity-50" />
    </a>
  );
};

// ── Message Content Parser ────────────────────────────────────────────────────
// Extremely simple code block parser for mocked UI
const renderMessageContent = (text: string) => {
  if (text.includes("```")) {
    const parts = text.split("```");
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        // It's a code block
        const lines = part.trim().split("\\n");
        const lang = lines[0]?.trim();
        const code = lines.slice(1).join("\\n");
        return <MockCodeBlock key={index} language={lang} code={code || part.trim()} />;
      }
      return <span key={index}>{part}</span>;
    });
  }
  return text;
};

const MockCodeBlock = ({ language, code }: { language?: string; code: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="my-2 rounded-xl overflow-hidden border border-white/10 bg-[#0d1117]">
      <div className="flex items-center justify-between px-3 py-1.5 bg-white/[0.03] border-b border-white/[0.05]">
        <div className="flex items-center gap-1.5 text-white/40 text-[10px] font-mono">
          <Code2 size={12} />
          <span>{language || "code"}</span>
        </div>
        <button onClick={handleCopy} className="text-white/40 hover:text-white transition-colors">
          {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
        </button>
      </div>
      <div className="p-3 overflow-x-auto text-[11px] font-mono text-cyan-50/80 leading-relaxed">
        <pre><code>{code}</code></pre>
      </div>
    </div>
  );
};


// ── Bot Message ───────────────────────────────────────────────────────────────
export const BotMessage = ({
  msg,
  onQuickReply,
}: {
  msg: Message;
  onQuickReply: (text: string) => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    className="flex justify-start mb-6 gap-3 group"
  >
    {/* Avatar */}
    <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-500/30 border border-cyan-400/30 flex items-center justify-center shrink-0 mt-1 overflow-hidden shadow-[0_0_15px_rgba(34,211,238,0.15)] group-hover:shadow-[0_0_20px_rgba(34,211,238,0.25)] transition-shadow duration-300">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.5),_transparent_60%)] opacity-50" />
      <span className="w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.8)] relative z-10" />
    </div>

    <div className="max-w-[89%] sm:max-w-[85%] flex flex-col gap-2.5">
      {/* Bubble */}
      <div
        className={`relative overflow-hidden rounded-2xl rounded-tl-sm px-4 py-3.5 text-[13px] leading-[1.65] ${
          msg.variant === "welcome"
            ? "border border-cyan-500/30 bg-[rgba(10,18,34,0.7)] backdrop-blur-md shadow-[0_4px_24px_rgba(34,211,238,0.08)]"
            : "border border-white/[0.08] bg-[rgba(14,22,40,0.65)] backdrop-blur-md hover:border-white/[0.12] transition-colors duration-300"
        }`}
      >
        {msg.variant === "welcome" && (
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_left,_rgba(34,211,238,0.5),_transparent_60%)]" />
        )}
        <div className="relative space-y-2">
          {msg.content.map((line, i) => (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 + 0.1, duration: 0.4 }}
              key={i}
              className={i === 0 ? "text-white/95 font-medium" : "text-white/75"}
            >
              {renderMessageContent(line)}
            </motion.p>
          ))}
        </div>
      </div>

      <span className="text-[10px] text-white/30 pl-1 font-medium tracking-wide">{msg.timestamp}</span>

      {/* Welcome extras */}
      {msg.variant === "welcome" && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="space-y-4 mt-2"
        >
          <SectionDivider label="Suggested" />
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_QUESTIONS.map((q) => (
              <SuggestionChip key={q.input} label={q.label} onClick={() => onQuickReply(q.input)} />
            ))}
          </div>

          <SectionDivider label="Coding profiles" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {CODING_PROFILES.map((p) => (
              <ProfileCard key={p.label} {...p} />
            ))}
          </div>

          {/* Internship CTA */}
          <div className="mt-3 flex items-center justify-between gap-2 rounded-xl border border-white/[0.08] bg-gradient-to-r from-[rgba(10,20,40,0.8)] to-[rgba(15,25,45,0.8)] px-3 py-2.5 backdrop-blur-sm group-hover:border-cyan-500/30 transition-colors">
            <div>
              <p className="text-[11px] font-semibold text-white leading-none">Open to internships</p>
              <p className="text-[9px] text-white/50 mt-0.5 font-medium tracking-wide">Backend · SWE</p>
            </div>
            <button
              onClick={() => onQuickReply(INTERNSHIP_QUERY)}
              className="shrink-0 px-3 py-1.5 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 text-[10px] font-bold text-white shadow-[0_2px_8px_rgba(34,211,238,0.2)] hover:shadow-[0_4px_16px_rgba(34,211,238,0.4)] active:scale-[0.95] transition-all duration-200"
            >
              Learn more
            </button>
          </div>
        </motion.div>
      )}

      {/* Actions */}
      {msg.actions && msg.actions.length > 0 && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="flex flex-wrap gap-2 mt-1"
        >
          {msg.actions.map((action, i) => (
            <ActionButton key={`${action.label}-${i}`} action={action} />
          ))}
        </motion.div>
      )}

      {/* Inline profiles */}
      {msg.showProfiles && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1"
        >
          {CODING_PROFILES.map((p) => (
            <ProfileCard key={`p-${p.label}`} {...p} />
          ))}
        </motion.div>
      )}

      {/* Quick replies */}
      {msg.showReplies && msg.quickReplies && msg.quickReplies.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="flex flex-wrap gap-2 mt-2"
        >
          {msg.quickReplies.map((r) => (
            <SuggestionChip key={r} label={r} onClick={() => onQuickReply(r)} />
          ))}
        </motion.div>
      )}
    </div>
  </motion.div>
);

// ── User Message ──────────────────────────────────────────────────────────────
export const UserMessage = ({ msg }: { msg: Message }) => (
  <motion.div
    initial={{ opacity: 0, y: 12, scale: 0.98, filter: "blur(4px)" }}
    animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    className="flex justify-end mb-6"
  >
    <div className="max-w-[80%] sm:max-w-[72%] flex flex-col items-end gap-1.5">
      <div className="px-4 py-3 rounded-2xl rounded-tr-sm text-white/95 text-[13px] leading-[1.6] border border-cyan-500/30 bg-gradient-to-br from-[rgba(0,140,255,0.2)] to-[rgba(0,180,255,0.05)] shadow-[0_4px_16px_rgba(0,140,255,0.1)] backdrop-blur-md">
        {msg.content[0]}
      </div>
      <span className="text-[10px] text-white/30 pr-1 font-medium tracking-wide">{msg.timestamp}</span>
    </div>
  </motion.div>
);
