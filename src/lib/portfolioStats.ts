export const PORTFOLIO_STATS = {
  leetcode: {
    problemsSolved: 400,
    rating: 1565,
  },
  codeforces: {
    rating: 1439,
    tier: "Pupil",
  },
  codechef: {
    rating: 1506,
    stars: "2★",
  },
  atcoder: {
    rating: 27,
  },
};

export const STATS_LABELS = {
  leetcodeProblems: `${PORTFOLIO_STATS.leetcode.problemsSolved}+ LeetCode Problems Solved`,
  leetcodeRating: `LeetCode Contest Rating ${PORTFOLIO_STATS.leetcode.rating}+`,
  codeforcesRating: `Codeforces Rating ${PORTFOLIO_STATS.codeforces.rating}+`,
  codechefRating: `CodeChef Rating ${PORTFOLIO_STATS.codechef.rating}+`,
  atcoderRating: `AtCoder Rating ${PORTFOLIO_STATS.atcoder.rating}+`,
};

export const PROFILE_INFO = {
  leetcode: `${PORTFOLIO_STATS.leetcode.problemsSolved}+ solved · Rating ${PORTFOLIO_STATS.leetcode.rating}+`,
  codeforces: `${PORTFOLIO_STATS.codeforces.tier} · Rating ${PORTFOLIO_STATS.codeforces.rating}`,
  codechef: `${PORTFOLIO_STATS.codechef.stars} · Rating ${PORTFOLIO_STATS.codechef.rating}+`,
  atcoder: `Rating ${PORTFOLIO_STATS.atcoder.rating}`,
};

export const CURRENT_STATS_SUMMARY = [
  `LeetCode: ${PORTFOLIO_STATS.leetcode.problemsSolved}+ problems solved · Rating ${PORTFOLIO_STATS.leetcode.rating}+`,
  `Codeforces: ${PORTFOLIO_STATS.codeforces.tier} · Rating ${PORTFOLIO_STATS.codeforces.rating}+`,
  `CodeChef: ${PORTFOLIO_STATS.codechef.stars} · Rating ${PORTFOLIO_STATS.codechef.rating}+`,
  `AtCoder: Rating ${PORTFOLIO_STATS.atcoder.rating}`,
];
