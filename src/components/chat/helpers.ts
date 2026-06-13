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
  const containsKeywords = (keywords: string[]) => keywords.some(k => q.includes(k));

  const setIntent = (intent: string): MatchedResponse => {
    intentStack.push(intent);
    if (intentStack.length > 6) intentStack.shift();
    fallbackCountRef.current = 0;
    return { ...pick(RESPONSES[intent]), intent };
  };

  // Context-aware follow-ups
  if (has("more", "details", "detail", "explain", "elaborate", "go on", "expand", "tell more", "continue", "deeper")) {
    const ctx = intentStack[intentStack.length - 1];
    if (ctx && RESPONSES[ctx]) return { ...pick(RESPONSES[ctx]), intent: ctx };
  }

  // Greetings
  if (has("hello", "hey", "hi", "howdy", "sup", "yo", "hii", "greetings", "hola") || q === "hi" || q === "hey")
    return setIntent("greeting");

  // Identity
  if (has("who are you", "what are you", "your name", "introduce yourself", "ur name", "who am i talking to"))
    return setIntent("identity");

  // About Priyanshu
  if (has("who is priyanshu", "about him", "about priyanshu", "who is he", "what does he do", "tell me about yourself", "background", "intro"))
    return setIntent("about");

  // Education
  if (has("education", "college", "nit", "jalandhar", "cgpa", "jee", "degree", "btech", "university", "academic", "study"))
    return setIntent("education");

  // Projects - improved detection
  if (has("tracker", "cp tracker", "competitive programming tracker", "graphql", "sm2", "sm-2", "spaced repetition", "cpt"))
    return setIntent("tracker");
  if (has("hostel", "hostel management", "hostel system", "room allocation", "hms"))
    return setIntent("hostel");
  if (has("project", "projects", "work", "built", "builds", "portfolio", "what have you", "created", "development", "built"))
    return setIntent("projects");

  // Backend & Tech Stack
  if (has("backend", "node", "express", "mongo", "mongodb", "rest api", "api", "api design", "server", "database", "db", "database design"))
    return setIntent("backend");

  if (has("tech stack", "technology", "technologies", "stack", "framework", "tools", "what tech", "tech used", "languages", "libraries"))
    return setIntent("tech");

  // Skills
  if (has("skill", "skills", "what can you do", "what do you know", "expertise", "proficiency", "capable"))
    return setIntent("skills");

  // DSA & Competitive Programming
  if (has("dsa", "data structure", "algorithm", "competitive", "contest", "problem solv", "cp", "coding problems", "leetcode problems", "dp", "graph"))
    return setIntent("dsa");

  // Individual platforms
  if (has("leetcode", "leet code", "lc stats", "lc rating", "lc"))
    return setIntent("leetcode");
  if (has("codeforces", "code forces", "cf rating", "cf rank", "cf"))
    return setIntent("codeforces");
  if (has("codechef", "code chef", "cc"))
    return setIntent("codechef");
  if (has("atcoder", "at coder", "at rating", "atc"))
    return setIntent("atcoder");
  if (has("codolio", "codolio stats"))
    return setIntent("codolio");

  // Profiles overview
  if (has("coding profile", "profiles", "profile", "show profile", "all profiles", "platform", "competitive programming platforms", "cp profiles"))
    return setIntent("profiles");

  // Social & External Links
  if (has("github", "repo", "repository", "repos", "code", "source code", "open source"))
    return setIntent("github");
  if (has("linkedin", "linked in", "professional", "professional network"))
    return setIntent("linkedin");

  // Internship & Hiring
  if (has("hire", "hiring", "intern", "internship", "job", "role", "available", "open to", "opportunity", "work with", "recruit", "looking for", "employment"))
    return setIntent("internship");

  // Resume & CV
  if (has("resume", "cv", "download resume", "curriculum", "resume download", "download cv"))
    return setIntent("resume");

  // Contact
  if (has("contact", "email", "reach", "connect", "mail", "get in touch", "how to reach", "contact info"))
    return setIntent("contact");

  // Achievements
  if (has("achievement", "percentile", "buildathon", "forge", "award", "rank", "accomplishment", "awards"))
    return setIntent("achievements");

  // Enhanced fallback selection
  const fbIndex = Math.min(fallbackCountRef.current, FALLBACKS.length - 1);
  const fb = FALLBACKS[fbIndex];
  fallbackCountRef.current += 1;
  return { ...fb, intent: "fallback" };
}
