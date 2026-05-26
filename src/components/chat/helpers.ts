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

  const setIntent = (intent: string): MatchedResponse => {
    intentStack.push(intent);
    if (intentStack.length > 6) intentStack.shift();
    fallbackCountRef.current = 0;
    return { ...pick(RESPONSES[intent]), intent };
  };

  if (has("more", "details", "detail", "explain", "elaborate", "go on", "expand", "tell more")) {
    const ctx = intentStack[intentStack.length - 1];
    if (ctx && RESPONSES[ctx]) return { ...pick(RESPONSES[ctx]), intent: ctx };
  }

  if (has("hello", "hey", "hi", "howdy", "sup", "yo", "hii") || q === "hi" || q === "hey")
    return setIntent("greeting");

  if (has("who are you", "what are you", "your name", "introduce yourself", "ur name"))
    return setIntent("identity");

  if (has("who is priyanshu", "about him", "about priyanshu", "who is he", "what does he do", "tell me about yourself"))
    return setIntent("about");

  if (has("education", "college", "nit", "jalandhar", "cgpa", "jee", "degree", "btech", "university"))
    return setIntent("education");

  if (has("tracker", "cp tracker", "competitive programming tracker", "graphql", "sm2", "sm-2", "spaced repetition"))
    return setIntent("tracker");
  if (has("hostel", "hostel management", "hostel system"))
    return setIntent("hostel");

  if (has("project", "projects", "work", "built", "builds", "portfolio", "what have you"))
    return setIntent("projects");

  if (has("backend", "node", "express", "mongo", "rest api", "api design", "server", "database"))
    return setIntent("backend");

  if (has("tech stack", "technology", "technologies", "stack", "framework", "tools", "what tech", "tech used"))
    return setIntent("tech");

  if (has("skill", "skills", "what can you do", "what do you know"))
    return setIntent("skills");

  if (has("dsa", "data structure", "algorithm", "competitive", "contest", "problem solv", "cp"))
    return setIntent("dsa");

  if (has("leetcode", "leet code", "lc stats", "lc rating"))
    return setIntent("leetcode");
  if (has("codeforces", "code forces", "cf rating", "cf rank"))
    return setIntent("codeforces");
  if (has("codechef", "code chef"))
    return setIntent("codechef");
  if (has("atcoder", "at coder", "at rating"))
    return setIntent("atcoder");
  if (has("codolio"))
    return setIntent("codolio");

  if (has("coding profile", "profiles", "profile", "show profile", "all profiles", "platform"))
    return setIntent("profiles");

  if (has("github", "repo", "repository", "repos", "code"))
    return setIntent("github");
  if (has("linkedin", "linked in", "professional"))
    return setIntent("linkedin");

  if (has("hire", "hiring", "intern", "internship", "job", "role", "available", "open to", "opportunity", "work with", "recruit"))
    return setIntent("internship");

  if (has("resume", "cv", "download resume", "curriculum"))
    return setIntent("resume");

  if (has("contact", "email", "reach", "connect", "mail", "get in touch"))
    return setIntent("contact");

  if (has("achievement", "percentile", "buildathon", "forge", "award", "rank", "accomplishment"))
    return setIntent("achievements");

  const fb = FALLBACKS[Math.min(fallbackCountRef.current, FALLBACKS.length - 1)];
  fallbackCountRef.current += 1;
  return { ...fb, intent: "fallback" };
}
