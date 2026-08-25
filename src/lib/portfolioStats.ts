export const PORTFOLIO_STATS = {
  total: {
    problemsSolved: 1150,
  },
  leetcode: {
    problemsSolved: 625,
    rating: 1940,
    tier: "Knight",
    topPercentage: "6.01%",
  },
  codeforces: {
    problemsSolved: 325,
    rating: 1460,
    tier: "Specialist",
  },
  codechef: {
    rating: 1645,
    stars: "3-Star",
  },
  consistency: {
    streak: 213,
    activeDays: 216,
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
  codechefRating: `CodeChef Rating ${PORTFOLIO_STATS.codechef.rating}+`,
  codingStreak: `${PORTFOLIO_STATS.consistency.streak}+ Day Coding Streak`,
};

export const PROFILE_INFO = {
  total: `${PORTFOLIO_STATS.total.problemsSolved}+ solved across platforms`,
  leetcode: `${PORTFOLIO_STATS.leetcode.problemsSolved}+ solved · Rating ${PORTFOLIO_STATS.leetcode.rating} · ${PORTFOLIO_STATS.leetcode.tier}`,
  codeforces: `${PORTFOLIO_STATS.codeforces.problemsSolved}+ solved · Rating ${PORTFOLIO_STATS.codeforces.rating} · ${PORTFOLIO_STATS.codeforces.tier}`,
  codechef: `${PORTFOLIO_STATS.codechef.stars} · Rating ${PORTFOLIO_STATS.codechef.rating}`,
};

export const CURRENT_STATS_SUMMARY = [
  `Total: ${PORTFOLIO_STATS.total.problemsSolved}+ problems solved`,
  `LeetCode: ${PORTFOLIO_STATS.leetcode.problemsSolved}+ solved · Rating ${PORTFOLIO_STATS.leetcode.rating} · ${PORTFOLIO_STATS.leetcode.tier}`,
  `Codeforces: ${PORTFOLIO_STATS.codeforces.problemsSolved}+ solved · Rating ${PORTFOLIO_STATS.codeforces.rating} · ${PORTFOLIO_STATS.codeforces.tier}`,
  `CodeChef: ${PORTFOLIO_STATS.codechef.stars} · Rating ${PORTFOLIO_STATS.codechef.rating}`,
];
