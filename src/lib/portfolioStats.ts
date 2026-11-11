export const PORTFOLIO_STATS = {
  total: {
    problemsSolved: 1500,
  },
  leetcode: {
    problemsSolved: 800,
    rating: 1982,
    tier: "Knight",
    topPercentage: "3.50%",
  },
  codeforces: {
    problemsSolved: 460,
    rating: 1485,
    tier: "Specialist",
  },
  codechef: {
    rating: 1648,
    stars: "3-Star",
    dsaRating: 1747,
  },
  atcoder: {
    rating: 574,
    tier: "Brown Coder",
  },
  consistency: {
    streak: 280,
    activeDays: 185,
  },
  education: {
    cgpa: 8.16,
  }
};

export const STATS_LABELS = {
  totalProblems: `${PORTFOLIO_STATS.total.problemsSolved}+ Problems Solved`,
  leetcodeProblems: `${PORTFOLIO_STATS.leetcode.problemsSolved}+ LeetCode Problems Solved`,
  leetcodeRating: `LeetCode Rating ${PORTFOLIO_STATS.leetcode.rating}+`,
  codeforcesRating: `Codeforces Rating ${PORTFOLIO_STATS.codeforces.rating}+`,
  codechefRating: `CodeChef Contest Rating ${PORTFOLIO_STATS.codechef.rating}+`,
  codechefDsaRating: `CodeChef DSA Rating ${PORTFOLIO_STATS.codechef.dsaRating}`,
  atcoderRating: `AtCoder Contest Rating ${PORTFOLIO_STATS.atcoder.rating}`,
  codingStreak: `${PORTFOLIO_STATS.consistency.streak}+ Day Coding Streak`,
};

export const PROFILE_INFO = {
  total: `${PORTFOLIO_STATS.total.problemsSolved}+ solved across platforms`,
  leetcode: `${PORTFOLIO_STATS.leetcode.problemsSolved}+ solved · Rating ${PORTFOLIO_STATS.leetcode.rating} · ${PORTFOLIO_STATS.leetcode.tier}`,
  codeforces: `${PORTFOLIO_STATS.codeforces.problemsSolved}+ solved · Rating ${PORTFOLIO_STATS.codeforces.rating} · ${PORTFOLIO_STATS.codeforces.tier}`,
  codechef: `${PORTFOLIO_STATS.codechef.stars} · Contest Rating ${PORTFOLIO_STATS.codechef.rating} · DSA Rating ${PORTFOLIO_STATS.codechef.dsaRating}`,
  atcoder: `Contest Rating ${PORTFOLIO_STATS.atcoder.rating} · ${PORTFOLIO_STATS.atcoder.tier}`,
};

export const CURRENT_STATS_SUMMARY = [
  `Total: ${PORTFOLIO_STATS.total.problemsSolved}+ problems solved`,
  `LeetCode: ${PORTFOLIO_STATS.leetcode.problemsSolved}+ solved · Rating ${PORTFOLIO_STATS.leetcode.rating} · ${PORTFOLIO_STATS.leetcode.tier}`,
  `Codeforces: ${PORTFOLIO_STATS.codeforces.problemsSolved}+ solved · Rating ${PORTFOLIO_STATS.codeforces.rating} · ${PORTFOLIO_STATS.codeforces.tier}`,
  `CodeChef: ${PORTFOLIO_STATS.codechef.stars} · Contest Rating ${PORTFOLIO_STATS.codechef.rating} · DSA Rating ${PORTFOLIO_STATS.codechef.dsaRating}`,
  `AtCoder: Contest Rating ${PORTFOLIO_STATS.atcoder.rating} · ${PORTFOLIO_STATS.atcoder.tier}`,
];

export const PROFILE_URLS = {
  leetcode: "https://leetcode.com/u/invisiblemanfromheart/",
  codeforces: "https://codeforces.com/profile/priyanshuguptacoder",
  codechef: "https://codechef.com/users/priyanshu9696",
  atcoder: "https://atcoder.jp/users/TheAlgoEdge",
} as const;
