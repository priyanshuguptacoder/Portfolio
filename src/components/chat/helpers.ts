import { type MouseEvent } from "react";
import { RESPONSES, FALLBACKS } from "./data";
import { type MatchedResponse } from "./types";

export const formatTimestamp = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

export function normalize(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ").trim();
}

export function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function handleScroll(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export const isPlaceholderHref = (href?: string) => !href || href === "#";

export const handlePlaceholderClick = (e: MouseEvent<HTMLAnchorElement>, href?: string) => {
  if (isPlaceholderHref(href)) e.preventDefault();
};

export function matchResponse(
  input: string,
  intentStack: string[],
  fallbackCountRef: { current: number }
): MatchedResponse {
  const q = normalize(input);
  const has = (...tokens: string[]) => tokens.some((t) => q.includes(t));
  const countKeywords = (keywords: string[]) => keywords.filter(k => q.includes(k)).length;
  const isQuestion = input.includes("?");

  const setIntent = (intent: string, resetFallback = true): MatchedResponse => {
    intentStack.push(intent);
    if (intentStack.length > 8) intentStack.shift();
    if (resetFallback) fallbackCountRef.current = 0;
    return { ...pick(RESPONSES[intent]), intent };
  };

  // Smart context-aware follow-ups with better detection
  if (has("more", "details", "detail", "explain", "elaborate", "go on", "expand", "tell more", "continue", "deeper", "deeper dive", "more about")) {
    const ctx = intentStack[intentStack.length - 1];
    if (ctx && RESPONSES[ctx]) {
      // Get a different response if available
      const responses = RESPONSES[ctx];
      if (responses.length > 1) {
        return { ...responses[Math.floor(Math.random() * responses.length)], intent: ctx };
      }
      return { ...pick(responses), intent: ctx };
    }
  }

  // Greetings with personality
  if (has("hello", "hey", "hi", "howdy", "sup", "yo", "hii", "greetings", "hola", "hey there", "heyy") || q === "hi" || q === "hey")
    return setIntent("greeting");

  // Identity
  if (has("who are you", "what are you", "your name", "introduce yourself", "ur name", "who am i talking to", "what should i call you"))
    return setIntent("identity");

  // About Priyanshu - prioritize
  if (has("who is priyanshu", "about him", "about priyanshu", "who is he", "what does he do", "tell me about yourself", "background", "intro", "brief intro", "about"))
    return setIntent("about");

  // Education
  if (has("education", "college", "nit", "jalandhar", "cgpa", "jee", "degree", "btech", "university", "academic", "study", "academics"))
    return setIntent("education");

  // Projects - improved detection with specificity
  if (has("tracker", "cp tracker", "competitive programming tracker", "graphql", "sm2", "sm-2", "spaced repetition", "cpt", "cp tracking"))
    return setIntent("tracker");
  if (has("hostel", "hostel management", "hostel system", "room allocation", "hms", "student management"))
    return setIntent("hostel");
  if (has("project", "projects", "work", "built", "builds", "portfolio", "what have you", "created", "development", "development work", "creation"))
    return setIntent("projects");

  // Backend & Tech Stack - more specific matching
  if (has("backend", "nodejs", "node.js", "express", "mongo", "mongodb", "rest api", "graphql", "api", "api design", "server", "database", "db", "database design", "orm", "schema"))
    return setIntent("backend");

  if (has("tech stack", "technology", "technologies", "stack", "framework", "frameworks", "tools", "what tech", "tech used", "languages", "libraries", "techstack", "tech stack"))
    return setIntent("tech");

  // Stats queries and updated counters
  if (
    (has("latest", "current", "updated", "now", "recent", "new") &&
      has("rating", "stats", "problems", "profile", "count", "total")) ||
    has("rating change", "rating changes", "current rating", "updated rating", "latest rating") ||
    (has("total", "number of", "how many", "count", "problems solved", "solved problems", "total problems", "problem count") &&
      has("problems", "leetcode", "dsa", "coding"))
  )
    return setIntent("stats");

  // Skills - with better detection
  if (has("skill", "skills", "what can you do", "what do you know", "expertise", "proficiency", "capable", "competency", "ability", "strength"))
    return setIntent("skills");

  // DSA & Competitive Programming - improved matching
  if (has("dsa", "data structure", "data structures", "algorithm", "algorithms", "competitive", "contest", "problem solv", "cp", "coding problems", "leetcode problems", "dp", "dynamic programming", "graph", "greedy"))
    return setIntent("dsa");

  // Individual platforms - specific matching
  if (has("leetcode", "leet code", "lc stats", "lc rating", "lc", "leetcode profile", "leet"))
    return setIntent("leetcode");
  if (has("codeforces", "code forces", "cf rating", "cf rank", "cf", "codeforces profile", "code force"))
    return setIntent("codeforces");
  if (has("codechef", "code chef", "cc", "codechef profile"))
    return setIntent("codechef");
  if (has("atcoder", "at coder", "at rating", "atc", "atcoder profile"))
    return setIntent("atcoder");
  if (has("codolio", "codolio stats", "unified stats"))
    return setIntent("codolio");

  // Profiles overview
  if (has("coding profile", "profiles", "profile", "show profile", "all profiles", "platform", "competitive programming platforms", "cp profiles", "coding platforms", "all platforms"))
    return setIntent("profiles");

  // Social & External Links
  if (has("github", "repo", "repository", "repos", "code", "source code", "open source", "github profile"))
    return setIntent("github");
  if (has("linkedin", "linked in", "professional", "professional network", "linkedin profile"))
    return setIntent("linkedin");

  // Internship & Hiring - improved matching
  if (has("hire", "hiring", "intern", "internship", "job", "role", "available", "open to", "opportunity", "work with", "recruit", "recruiting", "looking for", "employment", "position", "opening"))
    return setIntent("internship");

  // Resume & CV
  if (has("resume", "cv", "download resume", "curriculum", "resume download", "download cv", "curriculum vitae", "cv download"))
    return setIntent("resume");

  // Contact
  if (has("contact", "email", "reach", "reach out", "connect", "mail", "get in touch", "how to reach", "contact info", "contact information", "get in touch"))
    return setIntent("contact");

  // Achievements
  if (has("achievement", "percentile", "buildathon", "forge", "award", "rank", "accomplishment", "awards", "achievement", "recognized"))
    return setIntent("achievements");

  // Smart fallback with intelligent suggestions
  const fbIndex = Math.min(fallbackCountRef.current, FALLBACKS.length - 1);
  const fb = FALLBACKS[fbIndex];
  fallbackCountRef.current += 1;
  return { ...fb, intent: "fallback" };
}
