export type Action = { label: string; url?: string; scrollTo?: string };
export type ResponseData = { lines: string[]; actions?: Action[]; showProfiles?: boolean };
export type MatchedResponse = ResponseData & { intent: string };
export type Message = {
  id: number;
  role: "user" | "bot";
  content: string[];
  actions?: Action[];
  quickReplies?: string[];
  showProfiles?: boolean;
  showReplies?: boolean;
  variant?: "welcome";
  timestamp: string;
};

export const PROFILE = {
  name: "Priyanshu Gupta",
  title: "Backend Engineer · Competitive Programmer",
  email: "priyanshuguptanitian9696@gmail.com",
};

export const LINKS = {
  email: "priyanshuguptanitian9696@gmail.com",
  resume: "/resume.pdf",
  leetcode: "https://leetcode.com/u/invisiblemanfromheart/",
  codeforces: "https://codeforces.com/profile/priyanshuguptacoder",
  codechef: "https://www.codechef.com/users/priyanshu9696",
  atcoder: "https://atcoder.jp/users/TheAlgoEdge",
  codolio: "https://codolio.com/profile/priyanshuguptacoder",
  github: "https://github.com/priyanshuguptacoder",
  linkedin: "",
};

export const INTERNSHIP_QUERY = "Are you open for internships?";
export const SWIPE_DOWN_THRESHOLD = 80;
export const SWIPE_HORIZONTAL_TOLERANCE = 40;
export const MAX_TYPING_DELAY = 800;
export const BASE_TYPING_DELAY = 240;
export const TYPING_DELAY_PER_CHAR = 10;
