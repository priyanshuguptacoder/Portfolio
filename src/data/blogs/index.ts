// ── Blog Data Store ───────────────────────────────────────────────────────────
// Add your blog content in the `content` field of each blog object.
// Use raw markdown string (backtick template literal).

export interface Blog {
  id: number;
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  description: string;       // short card description (2–3 lines)
  date: string;              // "YYYY-MM-DD"
  readTime: string;          // e.g. "8 min read"
  tags: string[];
  content: string;           // ← PASTE YOUR MARKDOWN HERE
  relatedSlugs: string[];    // slugs of related blogs
}

export const blogs: Blog[] = [
  {
    id: 1,
    slug: "3sum-solution-leetcode-15",
    title: "How to Solve 3Sum (LeetCode 15) – Optimized Approach Explained",
    seoTitle: "3Sum Solution Explained (LeetCode 15 Guide)",
    metaDescription: "Learn the optimized 3Sum solution using the two pointer technique. Step-by-step explanation, C++ code, dry run, and common mistakes covered.",
    description: "Master the 3Sum problem using sort + two pointers. Covers brute force vs optimized approach, duplicate handling, dry run, and complexity analysis.",
    date: "2025-04-20",
    readTime: "8 min read",
    tags: ["DSA", "LeetCode", "Two Pointers", "Arrays"],
    content: `
# How to Solve 3Sum (LeetCode 15) – Optimized Approach Explained

How to Solve 3Sum (LeetCode 15) – Optimized Approach Explained

## Introduction

The 3Sum problem sits at the intersection of three core DSA skills: sorting, two pointers, and duplicate handling. It shows up in almost every serious coding interview, and for good reason — it's not just about finding triplets. It's about whether you can take a brute force O(n³) idea and reduce it to something clean and efficient.

If you've been grinding LeetCode and skipping this one, stop. Understanding 3Sum deeply unlocks patterns that apply to 4Sum, 3Sum Closest, and dozens of other problems.


## Problem Statement

Given an integer array nums, return all unique triplets [nums[i], nums[j], nums[k]] such that i != j != k and nums[i] + nums[j] + nums[k] == 0.

Example:

Input:  nums = [-1, 0, 1, 2, -1, -4]
Output: [[-1, -1, 2], [-1, 0, 1]]
The tricky part: no duplicate triplets in the output.


## Why Brute Force Fails

The naive approach uses three nested loops — O(n³) time. For n = 3000 (LeetCode's constraint), that's 27 billion operations. It will TLE every time.


\`\`\`cpp
// Brute force — DO NOT submit
for (int i = 0; i < n; i++)
  for (int j = i+1; j < n; j++)
    for (int k = j+1; k < n; k++)
      if (nums[i] + nums[j] + nums[k] == 0)
        // store result
\`\`\`

You need a smarter approach.


## The Optimized Approach: Sort + Two Pointers


## Intuition

Once you sort the array, you fix one element and reduce the problem to 2Sum on a sorted array — which two pointers solve in O(n).


## Steps

Sort nums
Iterate with index i from 0 to n-3
Skip duplicates for i
Use left = i+1, right = n-1
Move pointers based on sum comparison
Skip duplicates after finding a valid triplet

## Code


\`\`\`cpp
vector<vector<int>> threeSum(vector<int>& nums) {
    vector<vector<int>> res;
    sort(nums.begin(), nums.end());
    int n = nums.size();

    for (int i = 0; i < n - 2; i++) {
        // Skip duplicate values for i
        if (i > 0 && nums[i] == nums[i-1]) continue;

        int left = i + 1, right = n - 1;

        while (left < right) {
            int sum = nums[i] + nums[left] + nums[right];

            if (sum == 0) {
                res.push_back({nums[i], nums[left], nums[right]});
                left++;
                right--;
                // Skip duplicates for left and right
                while (left < right && nums[left] == nums[left-1]) left++;
                while (left < right && nums[right] == nums[right+1]) right--;
            }
            else if (sum < 0) left++;
            else right--;
        }
    }
    return res;
}
\`\`\`


## Dry Run

Input: [-1, 0, 1, 2, -1, -4] After sort: [-4, -1, -1, 0, 1, 2]

i=0, nums[i]=-4: left=1, right=5 → sum=-3 → left++ Continue... no triplet found.

i=1, nums[i]=-1: left=2, right=5 → sum=2 → right-- left=2, right=4 → sum=0 ✅ → push [-1,-1,2], left++, right-- left=3, right=3 → loop ends.

i=2, nums[i]=-1: duplicate of i=1 → skip

i=3, nums[i]=0: left=4, right=5 → sum=3 → right-- left=4, right=4 → loop ends.

Output: [[-1,-1,2], [-1,0,1]] ✅


## Complexity Analysis

Approach	Time	Space
Brute Force	O(n³)	O(1)
Sort + Two Pointer	O(n²)	O(1)
Sorting costs O(n log n), but the two-pointer loop dominates at O(n²).


## Common Mistakes

1. Forgetting to skip duplicates for i Without if (i > 0 && nums[i] == nums[i-1]) continue, you get duplicate triplets.

2. Skipping duplicates in the wrong place Duplicate skipping for left and right must happen after pushing the result, not before.

3. Off-by-one in loop bound Use i < n - 2 to ensure left and right have room.

4. Not sorting first Two pointers only work on sorted arrays. Always sort.


## Related Concepts

Two Pointer Technique — the core mechanism here
4Sum (LeetCode 18) — add one more loop around this solution
3Sum Closest (LeetCode 16) — track minimum difference instead of exact zero
2Sum II (sorted array) — the inner loop of this problem

## Key Takeaways

Sort first, then reduce to 2Sum
Always handle duplicates at both the outer loop and inner pointers
This pattern scales to kSum problems
Time: O(n²), Space: O(1) — optimal for this problem
    `.trim(),
    relatedSlugs: ["two-pointer-technique-guide", "sliding-window-technique-explained", "top-20-leetcode-array-problems"],
  },

  {
    id: 2,
    slug: "sliding-window-technique-explained",
    title: "Sliding Window Technique Explained with Real Problems",
    seoTitle: "Sliding Window Algorithm – Complete Guide",
    metaDescription: "Master the sliding window algorithm with real LeetCode problems. Covers fixed and variable window patterns with C++ code and step-by-step explanations.",
    description: "Learn fixed and variable sliding window patterns with real LeetCode problems. Includes minimum window substring, longest substring, and complexity analysis.",
    date: "2025-04-20",
    readTime: "9 min read",
    tags: ["DSA", "LeetCode", "Sliding Window", "Arrays"],
    content: `
# Sliding Window Technique Explained with Real Problems

Sliding Window Technique Explained with Real Problems (Beginner to Advanced)

## Introduction

The sliding window technique is one of those patterns that, once you truly understand it, makes a whole category of problems feel obvious. It's used to solve problems involving subarrays or substrings where you need to find something optimal — maximum sum, longest substring, minimum window.

Without this pattern, most of these problems require O(n²) nested loops. With it, you solve them in O(n).


## What Is a Sliding Window?

Imagine a window of fixed or variable size sliding across an array. Instead of recomputing everything from scratch for each position, you add the new element entering the window and remove the element leaving it.

Two types:

Fixed window — window size is given
Variable window — window size changes based on a condition

## Pattern 1: Fixed Window

Problem: Maximum Sum Subarray of Size K

\`\`\`cpp
int maxSumSubarray(vector<int>& nums, int k) {
    int n = nums.size();
    int windowSum = 0, maxSum = 0;

    // Build first window
    for (int i = 0; i < k; i++)
        windowSum += nums[i];

    maxSum = windowSum;

    // Slide the window
    for (int i = k; i < n; i++) {
        windowSum += nums[i];       // add new element
        windowSum -= nums[i - k];   // remove old element
        maxSum = max(maxSum, windowSum);
    }
    return maxSum;
}
\`\`\`

Key insight: windowSum += nums[i] - nums[i-k] is the core slide operation.


## Pattern 2: Variable Window

Problem: Longest Substring Without Repeating Characters (LeetCode 3)

\`\`\`cpp
int lengthOfLongestSubstring(string s) {
    unordered_map<char, int> freq;
    int left = 0, maxLen = 0;

    for (int right = 0; right < s.size(); right++) {
        freq[s[right]]++;

        // Shrink window until valid
        while (freq[s[right]] > 1) {
            freq[s[left]]--;
            left++;
        }

        maxLen = max(maxLen, right - left + 1);
    }
    return maxLen;
}
\`\`\`

Template: expand right, shrink left when condition breaks.

Pattern 3: Minimum Window Substring (LeetCode 76)
This is the hardest sliding window problem. You need the smallest window in s containing all characters of t.


\`\`\`cpp
string minWindow(string s, string t) {
    unordered_map<char, int> need, window;
    for (char c : t) need[c]++;

    int left = 0, valid = 0;
    int start = 0, minLen = INT_MAX;

    for (int right = 0; right < s.size(); right++) {
        char c = s[right];
        window[c]++;
        if (need.count(c) && window[c] == need[c])
            valid++;

        // Shrink when all chars satisfied
        while (valid == need.size()) {
            if (right - left + 1 < minLen) {
                start = left;
                minLen = right - left + 1;
            }
            char d = s[left++];
            if (need.count(d) && window[d] == need[d])
                valid--;
            window[d]--;
        }
    }
    return minLen == INT_MAX ? "" : s.substr(start, minLen);
}
\`\`\`


## When to Use Sliding Window

Ask yourself:

Does the problem involve a contiguous subarray or substring?
Are you looking for max/min/longest/shortest?
Is there a constraint that defines window validity?
If yes to all three — sliding window is your tool.


## Complexity Analysis

Problem	Time	Space
Fixed window max sum	O(n)	O(1)
Longest no-repeat substring	O(n)	O(k)
Minimum window substring	O(n)	O(k)

## Common Mistakes

1. Not shrinking the window correctly The while loop for shrinking must run until the window is valid again, not just once.

2. Off-by-one in window size Window size = right - left + 1, not right - left.

3. Using sliding window on non-contiguous problems This technique only works for contiguous subarrays/substrings.


## Related Concepts

Two Pointer — sliding window is a specialized two pointer
HashMap frequency counting — used in most variable window problems
Deque-based sliding window — for sliding window maximum (LeetCode 239)
    `.trim(),
    relatedSlugs: ["3sum-solution-leetcode-15", "two-pointer-technique-guide", "hashmaps-solve-dsa-problems"],
  },

  {
    id: 3,
    slug: "how-i-solved-300-leetcode-problems",
    title: "How I Solved 300+ LeetCode Problems – Strategy That Actually Works",
    seoTitle: "How I Solved 300+ LeetCode Problems – My Strategy",
    metaDescription: "The exact strategy I used to solve 300+ LeetCode problems. Pattern-based learning, topic order, and consistency tips that actually work.",
    description: "The exact pattern-based strategy behind solving 300+ LeetCode problems. Covers study order, the 3-step problem approach, and how to review effectively.",
    date: "2025-04-20",
    readTime: "10 min read",
    tags: ["DSA", "LeetCode", "Strategy", "Competitive Programming"],
    content: `
# How I Solved 300+ LeetCode Problems – Strategy That Actually Works

How I Solved 300+ LeetCode Problems – Strategy That Actually Works

## Introduction

Most people approach LeetCode wrong. They open a random hard problem, get stuck in 10 minutes, read the solution, feel bad, and repeat. After 50 problems they feel like they've learned nothing.

I solved 300+ problems with a contest rating of 1469 on LeetCode. Here's the exact approach that made the difference — not grinding, but deliberate pattern-based learning.


## The Core Principle: Patterns Over Problems

There are roughly 20 core patterns in DSA. Every LeetCode problem is a variation of one or more of these patterns. Once you recognize the pattern, the solution becomes mechanical.

The patterns:

Two Pointers
Sliding Window
Binary Search
HashMap / HashSet
Stack / Monotonic Stack
BFS / DFS
Dynamic Programming (1D, 2D, interval)
Greedy
Backtracking
Heap / Priority Queue
Trie
Union Find
Segment Tree / BIT
Graph algorithms (Dijkstra, Topological Sort)

## The Study Order That Works

Phase 1: Arrays + HashMaps (Weeks 1–2)
Start here. 80% of easy problems use these. Build confidence.

Must-solve:

Two Sum (HashMap)
Best Time to Buy and Sell Stock (Greedy)
Contains Duplicate (HashSet)
Product of Array Except Self (prefix/suffix)
Maximum Subarray (Kadane's)
Phase 2: Two Pointers + Sliding Window (Weeks 3–4)
These two patterns together cover a huge chunk of medium problems.

Phase 3: Binary Search (Week 5)
Not just on sorted arrays. Binary search on the answer is a powerful technique.

Phase 4: Stack + Queue (Week 6)
Monotonic stack problems are common in interviews.

Phase 5: Trees + Graphs (Weeks 7–9)
BFS, DFS, recursion. This is where most people slow down — don't rush it.

Phase 6: Dynamic Programming (Weeks 10–14)
Start with 1D DP (climbing stairs, house robber), then 2D (grid problems), then interval DP.


## The 3-Step Problem Approach

For every problem:

Step 1: Understand (5 min) Read twice. Write the input/output. Identify constraints.

Step 2: Think (10–15 min) Don't code yet. Think about which pattern applies. Write pseudocode.

Step 3: Code + Debug (20 min) Write clean code. Test with examples. Handle edge cases.

If you're stuck after 25 minutes total — look at the hint, not the full solution.


## Consistency Over Intensity

2 problems per day beats 20 problems on Sunday. Your brain consolidates patterns during sleep. Spaced repetition works.

My actual schedule:

Weekdays: 2 problems (1 easy, 1 medium)
Weekends: 1 contest + review

## How to Review Problems

After solving, ask:

What pattern did this use?
What was the key insight I missed?
What's the time/space complexity?
What are the edge cases?
Write these down. Review weekly.


## Common Mistakes

1. Solving random problems Topic-based practice beats random. Finish all sliding window problems before moving on.

2. Reading solutions too early Give yourself at least 20–25 minutes of genuine struggle.

3. Not revisiting problems Come back to problems you solved 2 weeks later. If you can't solve it again, you didn't learn it.

4. Ignoring easy problems Easy problems teach clean implementation. Don't skip them.


## Key Takeaways

Learn patterns, not individual problems
Follow a structured topic order
2 problems/day consistently beats weekend grinding
Review and revisit — that's where real learning happens
    `.trim(),
    relatedSlugs: ["two-pointer-technique-guide", "sliding-window-technique-explained", "time-complexity-explained"],
  },

  {
    id: 4,
    slug: "two-pointer-technique-guide",
    title: "Two Pointer Technique – Complete Guide with 5 Must-Know Problems",
    seoTitle: "Two Pointer Technique – Complete Guide with Problems",
    metaDescription: "Master the two pointer technique with 5 essential LeetCode problems. Includes C++ code, intuition, and when to use each variation.",
    description: "Complete guide to the two pointer technique with 5 essential problems. Covers opposite-end, slow-fast, and same-direction variants with C++ code.",
    date: "2025-04-20",
    readTime: "8 min read",
    tags: ["DSA", "LeetCode", "Two Pointers", "Arrays"],
    content: `
# Two Pointer Technique – Complete Guide with 5 Must-Know Problems

Two Pointer Technique – Complete Guide with 5 Must-Know Problems

## Introduction

The two pointer technique is one of the most elegant tools in DSA. It takes problems that look like they need O(n²) nested loops and solves them in O(n) by using two indices that move intelligently through the data.

Once you internalize this pattern, you'll spot it in array problems, string problems, and linked list problems almost immediately.


## When to Use Two Pointers

Array or string is sorted (or can be sorted)
You're looking for pairs, triplets, or subarrays
You need to compare elements from both ends
You're merging or partitioning
Problem 1: Two Sum II – Sorted Array (LeetCode 167)

\`\`\`cpp
vector<int> twoSum(vector<int>& nums, int target) {
    int left = 0, right = nums.size() - 1;

    while (left < right) {
        int sum = nums[left] + nums[right];
        if (sum == target) return {left+1, right+1};
        else if (sum < target) left++;
        else right--;
    }
    return {};
}
\`\`\`

Why it works: Array is sorted. If sum is too small, move left pointer right. If too large, move right pointer left.

Problem 2: Container With Most Water (LeetCode 11)

\`\`\`cpp
int maxArea(vector<int>& height) {
    int left = 0, right = height.size() - 1;
    int maxWater = 0;

    while (left < right) {
        int water = min(height[left], height[right]) * (right - left);
        maxWater = max(maxWater, water);

        // Move the shorter side inward
        if (height[left] < height[right]) left++;
        else right--;
    }
    return maxWater;
}
\`\`\`

Key insight: Moving the taller side inward can never increase area. Always move the shorter side.

Problem 3: Valid Palindrome (LeetCode 125)

\`\`\`cpp
bool isPalindrome(string s) {
    int left = 0, right = s.size() - 1;

    while (left < right) {
        while (left < right && !isalnum(s[left])) left++;
        while (left < right && !isalnum(s[right])) right--;

        if (tolower(s[left]) != tolower(s[right])) return false;
        left++;
        right--;
    }
    return true;
}
\`\`\`

Problem 4: Remove Duplicates from Sorted Array (LeetCode 26)

\`\`\`cpp
int removeDuplicates(vector<int>& nums) {
    int slow = 0;

    for (int fast = 1; fast < nums.size(); fast++) {
        if (nums[fast] != nums[slow]) {
            slow++;
            nums[slow] = nums[fast];
        }
    }
    return slow + 1;
}
\`\`\`

This is the slow-fast pointer variant — one pointer tracks the write position, the other scans ahead.

Problem 5: 3Sum (LeetCode 15)
Already covered in Blog 1 — the outer loop fixes one element, and two pointers solve the inner 2Sum.


## Two Pointer Variants

Variant	Use Case
Opposite ends	Sorted array, palindrome check
Slow-fast	Remove duplicates, cycle detection
Same direction	Sliding window (specialized)
Two arrays	Merge sorted arrays

## Complexity Analysis

Two pointer solutions are almost always O(n) time, O(1) space — that's the whole point.


## Common Mistakes

1. Using two pointers on unsorted arrays when order matters Sort first if the problem allows it.

2. Infinite loops Make sure at least one pointer moves in every iteration.

3. Confusing slow-fast with opposite-end pointers They're different variants. Know which one applies.
    `.trim(),
    relatedSlugs: ["3sum-solution-leetcode-15", "sliding-window-technique-explained", "top-20-leetcode-array-problems"],
  },

  {
    id: 5,
    slug: "scalable-backend-nodejs-mongodb",
    title: "Build a Scalable Backend Project (Node.js + MongoDB) – Step-by-Step",
    seoTitle: "Build a Scalable Backend with Node.js + MongoDB",
    metaDescription: "Step-by-step guide to building a scalable backend project using Node.js, Express, and MongoDB. Covers architecture, APIs, auth, and deployment.",
    description: "Build a production-ready backend with Node.js, Express, and MongoDB. Covers MVC architecture, JWT auth, error handling, and database indexing.",
    date: "2025-04-20",
    readTime: "12 min read",
    tags: ["Backend", "Node.js", "MongoDB", "REST API"],
    content: `
# Build a Scalable Backend Project (Node.js + MongoDB) – Step-by-Step Guide

Build a Scalable Backend Project (Node.js + MongoDB) – Step-by-Step Guide

## Introduction

Most backend tutorials teach you to build a CRUD app and call it a day. That's fine for learning, but it doesn't prepare you for real-world backend development where you need to think about scalability, clean architecture, and maintainability.

This guide walks through building a production-ready backend — the kind you'd actually put on your resume and be proud to explain in an interview.


## Project: Competitive Programming Tracker API

We'll build a REST API that:

Tracks user DSA progress across platforms
Handles authentication with JWT
Stores data in MongoDB with proper schema design
Follows clean architecture principles

## Project Structure

src/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   └── problemController.js
├── middleware/
│   ├── auth.js
│   └── errorHandler.js
├── models/
│   ├── User.js
│   └── Problem.js
├── routes/
│   ├── auth.js
│   └── problems.js
├── utils/
│   └── apiResponse.js
└── app.js
This is the MVC pattern — Models, Controllers, Routes separated cleanly.


## Step 1: Setup


\`\`\`cpp
npm init -y
npm install express mongoose dotenv bcryptjs jsonwebtoken cors helmet
npm install -D nodemon
// app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use(helmet());        // Security headers
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/problems', require('./routes/problems'));

module.exports = app;
\`\`\`


## Step 2: Database Connection


\`\`\`cpp
// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
\`\`\`


## Step 3: User Model with Password Hashing


\`\`\`cpp
// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
\`\`\`


## Step 4: JWT Authentication Middleware


\`\`\`cpp
// middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token, access denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
\`\`\`


## Step 5: Problem Model and Controller


\`\`\`cpp
// models/Problem.js
const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    platform: { type: String, enum: ['LeetCode', 'Codeforces', 'HackerRank'] },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'] },
\`\`\`

    tags: [String],

\`\`\`cpp
    solvedAt: { type: Date, default: Date.now },
\`\`\`

    notes: String

\`\`\`cpp
});

// Index for faster queries
problemSchema.index({ user: 1, solvedAt: -1 });

module.exports = mongoose.model('Problem', problemSchema);
\`\`\`


## Step 6: Error Handling Middleware


\`\`\`cpp
// middleware/errorHandler.js
module.exports = (err, req, res, next) => {
    console.error(err.stack);

    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
\`\`\`

        success: false,
        message: err.message || 'Internal Server Error'

\`\`\`cpp
    });
};
\`\`\`

Centralized error handling keeps controllers clean.


## Scalability Principles Applied

Separation of concerns — routes, controllers, models are separate
Middleware chain — auth, validation, error handling as middleware
Database indexing — index on user + solvedAt for fast queries
Environment variables — no hardcoded secrets
Helmet — security headers out of the box

## Common Mistakes

1. Putting business logic in routes Routes should only call controllers. Logic belongs in controllers or services.

2. Not indexing MongoDB collections Without indexes, queries on large collections are full collection scans — O(n).

3. Storing plain text passwords Always hash with bcrypt. Never store plain text.

4. No error handling middleware Without it, unhandled errors crash the server or leak stack traces.
    `.trim(),
    relatedSlugs: ["rest-api-design-best-practices", "system-design-url-shortener", "time-complexity-explained"],
  },

  {
    id: 6,
    slug: "top-20-leetcode-array-problems",
    title: "Top 20 LeetCode Problems to Master Arrays (With Explanation)",
    seoTitle: "Top 20 LeetCode Array Problems to Master",
    metaDescription: "The 20 most important LeetCode array problems with explanations. Covers prefix sum, sliding window, two pointers, and sorting patterns.",
    description: "The 20 most important LeetCode array problems covering every core pattern: prefix sum, two pointers, sliding window, sorting, and Kadane's algorithm.",
    date: "2025-04-20",
    readTime: "11 min read",
    tags: ["DSA", "LeetCode", "Arrays", "Patterns"],
    content: `
# Top 20 LeetCode Problems to Master Arrays (With Explanation)

Top 20 LeetCode Problems to Master Arrays (With Explanation)

## Introduction

Arrays are the foundation of DSA. Before you touch trees, graphs, or DP, you need to be completely comfortable with array manipulation. These 20 problems cover every important array pattern you'll encounter in interviews.


## The Core Array Patterns

Prefix Sum — precompute cumulative sums for range queries
Two Pointers — opposite ends or slow-fast
Sliding Window — contiguous subarray optimization
Sorting + Binary Search — reduce search space
HashMap — O(1) lookups for complement/frequency
Kadane's Algorithm — maximum subarray
Greedy — local optimal leads to global optimal

## The 20 Problems


## Easy (Build Foundation)

1. Two Sum (LeetCode 1) Pattern: HashMap. Store complement as you iterate.


\`\`\`cpp
unordered_map<int,int> mp;
for (int i = 0; i < nums.size(); i++) {
    if (mp.count(target - nums[i])) return {mp[target-nums[i]], i};
    mp[nums[i]] = i;
}
\`\`\`

2. Best Time to Buy and Sell Stock (LeetCode 121) Pattern: Track minimum price seen so far.

3. Contains Duplicate (LeetCode 217) Pattern: HashSet — if insert fails, duplicate found.

4. Maximum Subarray (LeetCode 53) Pattern: Kadane's — currentSum = max(nums[i], currentSum + nums[i])

5. Move Zeroes (LeetCode 283) Pattern: Slow-fast two pointers.

6. Intersection of Two Arrays II (LeetCode 350) Pattern: HashMap frequency count.

7. Plus One (LeetCode 66) Pattern: Iterate from right, handle carry.


## Medium (Core Interview Problems)

8. Product of Array Except Self (LeetCode 238) Pattern: Prefix and suffix product arrays. No division allowed.


\`\`\`cpp
// Left pass: prefix products
// Right pass: multiply suffix products
\`\`\`

9. Maximum Product Subarray (LeetCode 152) Pattern: Track both max and min (negative × negative = positive).

10. Find Minimum in Rotated Sorted Array (LeetCode 153) Pattern: Binary search — compare mid with right.

11. Search in Rotated Sorted Array (LeetCode 33) Pattern: Binary search with rotation awareness.

12. 3Sum (LeetCode 15) Pattern: Sort + two pointers. (See Blog 1)

13. Container With Most Water (LeetCode 11) Pattern: Two pointers from ends, move shorter side.

14. Subarray Sum Equals K (LeetCode 560) Pattern: Prefix sum + HashMap. Count subarrays with sum = k.


\`\`\`cpp
unordered_map<int,int> mp;
mp[0] = 1;
int sum = 0, count = 0;
for (int num : nums) {
    sum += num;
    count += mp[sum - k];
    mp[sum]++;
}
\`\`\`

15. Longest Consecutive Sequence (LeetCode 128) Pattern: HashSet. For each number, only start counting if num-1 not in set.

16. Merge Intervals (LeetCode 56) Pattern: Sort by start, merge overlapping.

17. Rotate Array (LeetCode 189) Pattern: Reverse entire array, then reverse first k, then reverse rest.

18. Jump Game (LeetCode 55) Pattern: Greedy — track maximum reachable index.

19. Sort Colors (LeetCode 75) Pattern: Dutch National Flag — three pointers.

20. Trapping Rain Water (LeetCode 42) Pattern: Two pointers tracking left max and right max.



\`\`\`cpp
int left = 0, right = n-1, leftMax = 0, rightMax = 0, water = 0;
while (left < right) {
    if (nums[left] < nums[right]) {
        leftMax = max(leftMax, nums[left]);
        water += leftMax - nums[left++];
    } else {
        rightMax = max(rightMax, nums[right]);
        water += rightMax - nums[right--];
    }
}
\`\`\`
`.trim(),
    relatedSlugs: ["two-pointer-technique-guide", "sliding-window-technique-explained", "hashmaps-solve-dsa-problems"],
  },

  {
    id: 7,
    slug: "hashmaps-solve-dsa-problems",
    title: "How HashMaps Solve 80% of DSA Problems (With Examples)",
    seoTitle: "How HashMaps Solve 80% of DSA Problems",
    metaDescription: "Learn how HashMaps solve the majority of DSA problems. Covers frequency counting, complement lookup, prefix sum, and grouping patterns with C++ examples.",
    description: "Five core HashMap patterns that solve the majority of DSA problems: complement lookup, frequency counting, prefix sum, grouping, and first-occurrence tracking.",
    date: "2025-04-20",
    readTime: "9 min read",
    tags: ["DSA", "LeetCode", "HashMap", "Patterns"],
    content: `
# How HashMaps Solve 80% of DSA Problems (With Examples)

How HashMaps Solve 80% of DSA Problems (With Examples)

## Introduction

If you had to pick one data structure to master before a coding interview, it would be the HashMap. It turns O(n) search problems into O(1), enables frequency counting in one pass, and powers patterns like prefix sum and grouping.

Understanding when and how to use a HashMap is the difference between a brute force O(n²) solution and an elegant O(n) one.


## What Makes HashMaps Powerful

A HashMap (unordered_map in C++) gives you:


\`\`\`cpp
O(1) average insert
O(1) average lookup
O(1) average delete
\`\`\`

The core idea: trade space for time. Store information as you iterate so you don't need to iterate again.


## Pattern 1: Complement Lookup

Problem: Two Sum (LeetCode 1)


\`\`\`cpp
vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> seen; // value → index

    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];

        if (seen.count(complement))
            return {seen[complement], i};

        seen[nums[i]] = i;
    }
    return {};
}
\`\`\`

Why it works: For each element, you check if its complement was already seen. One pass, O(n).


## Pattern 2: Frequency Counting

Problem: Valid Anagram (LeetCode 242)


\`\`\`cpp
bool isAnagram(string s, string t) {
    if (s.size() != t.size()) return false;

    unordered_map<char, int> freq;

    for (char c : s) freq[c]++;
    for (char c : t) {
        freq[c]--;
        if (freq[c] < 0) return false;
    }
    return true;
}
\`\`\`

Use this whenever: you need to count occurrences and compare them.


## Pattern 3: Prefix Sum + HashMap

Problem: Subarray Sum Equals K (LeetCode 560)

This is where HashMaps get really powerful. You want to count subarrays with sum exactly equal to k.


\`\`\`cpp
int subarraySum(vector<int>& nums, int k) {
    unordered_map<int, int> prefixCount;
    prefixCount[0] = 1; // empty subarray has sum 0

    int sum = 0, count = 0;

    for (int num : nums) {
        sum += num;

        // If (sum - k) was seen before, those subarrays sum to k
        if (prefixCount.count(sum - k))
            count += prefixCount[sum - k];

        prefixCount[sum]++;
    }
    return count;
}
\`\`\`

Key insight: If prefixSum[j] - prefixSum[i] == k, then subarray [i+1, j] sums to k. The HashMap stores how many times each prefix sum has occurred.


## Pattern 4: Grouping

Problem: Group Anagrams (LeetCode 49)


\`\`\`cpp
vector<vector<string>> groupAnagrams(vector<string>& strs) {
    unordered_map<string, vector<string>> groups;

    for (string& s : strs) {
        string key = s;
        sort(key.begin(), key.end()); // sorted string as key
        groups[key].push_back(s);
    }

    vector<vector<string>> result;
    for (auto& [key, group] : groups)
        result.push_back(group);

    return result;
}
\`\`\`

Pattern: Use a computed property as the HashMap key to group similar items.


## Pattern 5: First/Last Occurrence Tracking

Problem: Longest Subarray with Equal 0s and 1s

Replace 0s with -1s, then find longest subarray with sum 0 using prefix sum + HashMap storing first occurrence.


\`\`\`cpp
int findMaxLength(vector<int>& nums) {
    unordered_map<int, int> firstSeen;
    firstSeen[0] = -1; // prefix sum 0 seen at index -1

    int sum = 0, maxLen = 0;

    for (int i = 0; i < nums.size(); i++) {
        sum += (nums[i] == 0) ? -1 : 1;

        if (firstSeen.count(sum))
            maxLen = max(maxLen, i - firstSeen[sum]);
\`\`\`

        else

\`\`\`cpp
            firstSeen[sum] = i; // only store first occurrence
    }
    return maxLen;
}
\`\`\`


## When NOT to Use HashMap

When you need sorted order → use map (O(log n)) or sort + binary search
When memory is extremely constrained → arrays with fixed size are faster
When keys are small integers → plain array as frequency table is faster

## Complexity Analysis

Operation	unordered_map	map
Insert	O(1) avg	O(log n)
Lookup	O(1) avg	O(log n)
Delete	O(1) avg	O(log n)
Ordered iteration	❌	✅

## Common Mistakes

1. Using map when you don't need ordering unordered_map is faster. Use map only when sorted keys matter.

2. Forgetting to initialize prefix sum prefixCount[0] = 1 is mandatory for prefix sum problems. Missing it causes wrong answers.

3. Modifying the map while iterating This causes undefined behavior. Collect keys to delete separately.

4. Hash collisions in worst case unordered_map degrades to O(n) in adversarial inputs. For competitive programming, use custom hash or map.


## Related Concepts

Prefix Sum — almost always paired with HashMap
Sliding Window — uses HashMap for frequency tracking
Two Sum variants — all use complement lookup pattern

## Key Takeaways

Complement lookup: check if target - current exists
Frequency counting: increment on first pass, decrement/check on second
Prefix sum + HashMap: count subarrays with target sum in O(n)
Grouping: use computed property as key
    `.trim(),
    relatedSlugs: ["top-20-leetcode-array-problems", "sliding-window-technique-explained", "time-complexity-explained"],
  },

  {
    id: 8,
    slug: "rest-api-design-best-practices",
    title: "REST API Design Best Practices for Beginners (Real Backend Example)",
    seoTitle: "REST API Design Best Practices for Beginners",
    metaDescription: "Learn REST API design best practices with a real Node.js example. Covers naming conventions, status codes, versioning, error handling, and security.",
    description: "Professional REST API design principles with real Node.js code. Covers URL naming, HTTP status codes, versioning, pagination, validation, and security.",
    date: "2025-04-20",
    readTime: "10 min read",
    tags: ["Backend", "REST API", "Node.js", "Best Practices"],
    content: `
# REST API Design Best Practices for Beginners (Real Backend Example)

REST API Design Best Practices for Beginners (Real Backend Example)

## Introduction

Building a REST API that works is easy. Building one that's clean, consistent, and maintainable is a different skill entirely. Bad API design creates confusion for frontend developers, makes debugging harder, and becomes a maintenance nightmare as the project grows.

This guide covers the principles that separate amateur APIs from professional ones — with real Node.js examples throughout.


## What Makes a REST API "RESTful"


\`\`\`cpp
REST (Representational State Transfer) has six constraints. The ones that matter most in practice:

Stateless — each request contains all information needed; server stores no session state
\`\`\`

Uniform Interface — consistent URL structure and HTTP methods
Client-Server separation — frontend and backend are independent
Layered System — client doesn't know if it's talking to the actual server or a proxy

## Rule 1: Use Nouns, Not Verbs in URLs

Wrong:

GET /getUsers
POST /createUser
DELETE /deleteUser/5
Right:

GET    /users          → get all users
POST   /users          → create a user
GET    /users/:id      → get specific user
PUT    /users/:id      → update user
DELETE /users/:id      → delete user
The HTTP method is the verb. The URL should describe the resource.


## Rule 2: Use Proper HTTP Status Codes

Most beginners return 200 for everything and put the error in the body. Don't.

200 OK              → successful GET, PUT
201 Created         → successful POST
204 No Content      → successful DELETE
400 Bad Request     → invalid input from client
401 Unauthorized    → not authenticated
403 Forbidden       → authenticated but not authorized
404 Not Found       → resource doesn't exist
409 Conflict        → duplicate resource
422 Unprocessable   → validation failed
500 Internal Error  → server-side bug

\`\`\`cpp
// Good error response
res.status(404).json({
\`\`\`

    success: false,
    message: 'User not found',
    code: 'USER_NOT_FOUND'

\`\`\`cpp
});

// Good success response
res.status(201).json({
\`\`\`

    success: true,

\`\`\`cpp
    data: { user },
\`\`\`

    message: 'User created successfully'

\`\`\`cpp
});
\`\`\`


## Rule 3: Version Your API

Always version from day one. You will need to make breaking changes eventually.

/api/v1/users
/api/v2/users

\`\`\`cpp
// app.js
app.use('/api/v1', require('./routes/v1'));
app.use('/api/v2', require('./routes/v2'));
\`\`\`


## Rule 4: Consistent Response Structure

Every response should follow the same shape. Frontend developers will thank you.


\`\`\`cpp
// utils/apiResponse.js
const successResponse = (res, data, message = 'Success', statusCode = 200) => {
    return res.status(statusCode).json({
\`\`\`

        success: true,
        message,
        data,
        timestamp: new Date().toISOString()

\`\`\`cpp
    });
};

const errorResponse = (res, message, statusCode = 500, code = null) => {
    return res.status(statusCode).json({
\`\`\`

        success: false,
        message,
        code,
        timestamp: new Date().toISOString()

\`\`\`cpp
    });
};

module.exports = { successResponse, errorResponse };
\`\`\`


## Rule 5: Input Validation

Never trust client input. Validate everything before it touches your database.


\`\`\`cpp
// Using express-validator
const { body, validationResult } = require('express-validator');

const validateUser = [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }).trim(),
    body('name').notEmpty().trim().escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
\`\`\`

                success: false,
                errors: errors.array()

\`\`\`cpp
            });
        }
        next();
    }
];
\`\`\`


## Rule 6: Pagination for List Endpoints

Never return all records. Always paginate.


\`\`\`cpp
// GET /api/v1/problems?page=1&limit=20&sort=-createdAt
const getProblems = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const [problems, total] = await Promise.all([
        Problem.find({ user: req.user.id })
\`\`\`

            .sort(req.query.sort || '-createdAt')
            .skip(skip)
            .limit(limit),

\`\`\`cpp
        Problem.countDocuments({ user: req.user.id })
    ]);

    res.json({
\`\`\`

        success: true,
        data: problems,

\`\`\`cpp
        pagination: {
\`\`\`

            page,
            limit,
            total,
            pages: Math.ceil(total / limit)

\`\`\`cpp
        }
    });
};
\`\`\`


## Rule 7: Security Basics


\`\`\`cpp
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Security headers
app.use(helmet());

// Rate limiting — prevent brute force
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
\`\`\`

    max: 100,
    message: 'Too many requests, please try again later'

\`\`\`cpp
});
app.use('/api/', limiter);
\`\`\`


## Common Mistakes

1. Exposing internal error details Never send stack traces to clients in production. Log them server-side only.

2. Using GET for state-changing operations GET must be idempotent and safe. Use POST/PUT/DELETE for mutations.

3. Inconsistent naming Pick camelCase or snake_case for JSON keys and stick to it everywhere.

4. No rate limiting Without it, your API is vulnerable to brute force and DDoS.
    `.trim(),
    relatedSlugs: ["scalable-backend-nodejs-mongodb", "system-design-url-shortener", "time-complexity-explained"],
  },

  {
    id: 9,
    slug: "time-complexity-explained",
    title: "Time Complexity Explained Simply (With Real Code Examples)",
    seoTitle: "Time Complexity Explained Simply (With Code)",
    metaDescription: "Understand time complexity with real code examples. Covers O(1), O(log n), O(n), O(n log n), O(n²) with intuitive explanations and common patterns.",
    description: "Time and space complexity explained through real code — not abstract math. Includes a constraint-to-complexity cheat sheet for LeetCode problems.",
    date: "2025-04-20",
    readTime: "8 min read",
    tags: ["DSA", "Algorithms", "Complexity", "Fundamentals"],
    content: `
# Time Complexity Explained Simply (With Real Code Examples)

Time Complexity Explained Simply (With Real Code Examples)

## Introduction

Time complexity is the single most important concept for writing efficient code. It's what separates a solution that handles 10 elements from one that handles 10 million. Every LeetCode problem has constraints — and those constraints tell you exactly what time complexity your solution needs to be.

This guide explains time complexity the way it should be explained: through real code, not abstract math.


## What Time Complexity Actually Means

Time complexity describes how the runtime of an algorithm grows as the input size grows. It's not about actual seconds — it's about the rate of growth.

We use Big O notation to express this. Big O describes the worst case.


## O(1) — Constant Time

The operation takes the same time regardless of input size.


\`\`\`cpp
// Array access — always one operation
int getFirst(vector<int>& nums) {
    return nums[0]; // O(1)
}

// HashMap lookup — O(1) average
unordered_map<int,int> mp;
mp[5] = 10;
int val = mp[5]; // O(1)
\`\`\`

Real examples: array indexing, HashMap get/set, stack push/pop.


## O(log n) — Logarithmic Time

Input is halved at each step. Extremely fast even for large inputs.


\`\`\`cpp
// Binary search — halves search space each iteration
int binarySearch(vector<int>& nums, int target) {
    int left = 0, right = nums.size() - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2; // avoid overflow

        if (nums[mid] == target) return mid;
        else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}
\`\`\`

For n = 1,000,000: only ~20 iterations. That's the power of O(log n).

Real examples: binary search, balanced BST operations, heap operations.


## O(n) — Linear Time

You visit each element once.


\`\`\`cpp
// Find maximum — one pass
int findMax(vector<int>& nums) {
    int maxVal = nums[0];
    for (int num : nums)       // n iterations
        maxVal = max(maxVal, num);
    return maxVal;
}
\`\`\`

Real examples: linear search, single-pass array problems, HashMap building.


## O(n log n) — Linearithmic Time

Sorting algorithms. The most common complexity for "efficient" solutions.


\`\`\`cpp
// Merge sort — divide and conquer
void mergeSort(vector<int>& nums, int left, int right) {
    if (left >= right) return;

    int mid = left + (right - left) / 2;
    mergeSort(nums, left, mid);      // T(n/2)
    mergeSort(nums, mid+1, right);   // T(n/2)
    merge(nums, left, mid, right);   // O(n)
}
// Total: T(n) = 2T(n/2) + O(n) → O(n log n)
\`\`\`

Real examples: std::sort, merge sort, heap sort, many divide-and-conquer problems.


## O(n²) — Quadratic Time

Nested loops over the input. Acceptable for n ≤ 1000, too slow for n ≥ 10,000.


\`\`\`cpp
// Bubble sort
void bubbleSort(vector<int>& nums) {
    int n = nums.size();
    for (int i = 0; i < n; i++)          // n iterations
        for (int j = 0; j < n-i-1; j++)  // n iterations
            if (nums[j] > nums[j+1])
                swap(nums[j], nums[j+1]);
}
\`\`\`

Real examples: brute force pair finding, naive string matching, selection sort.


## O(2ⁿ) — Exponential Time

Doubles with each additional element. Only feasible for very small inputs (n ≤ 20).


\`\`\`cpp
// All subsets — exponential
void subsets(vector<int>& nums, int i, vector<int>& current,
             vector<vector<int>>& result) {
    if (i == nums.size()) {
        result.push_back(current);
        return;
    }
    // Include nums[i]
    current.push_back(nums[i]);
    subsets(nums, i+1, current, result);
    // Exclude nums[i]
    current.pop_back();
    subsets(nums, i+1, current, result);
}
\`\`\`


## Reading Constraints to Determine Required Complexity

This is the practical skill that matters in interviews:


\`\`\`cpp
n (input size)	Required complexity
\`\`\`

n ≤ 10	O(n!), O(2ⁿ) acceptable
n ≤ 20	O(2ⁿ) acceptable
n ≤ 500	O(n³) acceptable
n ≤ 5,000	O(n²) acceptable
n ≤ 100,000	O(n log n) required
n ≤ 1,000,000	O(n) required
n ≤ 10⁹	O(log n) or O(1) required
When you see n ≤ 10⁵ on LeetCode, your solution must be O(n log n) or better.


## Space Complexity

Same notation, but measures memory usage instead of time.


\`\`\`cpp
// O(1) space — no extra memory
int sum = 0;
for (int num : nums) sum += num;

// O(n) space — stores n elements
vector<int> prefix(n);
prefix[0] = nums[0];
for (int i = 1; i < n; i++)
    prefix[i] = prefix[i-1] + nums[i];

// O(n) space — recursion stack depth
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n-1); // n stack frames
}
\`\`\`


## Common Mistakes

1. Ignoring hidden loops sort() is O(n log n), not O(1). Calling it inside a loop makes it O(n² log n).

2. Confusing average and worst case HashMap is O(1) average but O(n) worst case. For most problems, average case is what matters.

3. Forgetting recursion stack space Recursive solutions use O(depth) stack space. A DFS on a tree of height h uses O(h) space.
    `.trim(),
    relatedSlugs: ["how-i-solved-300-leetcode-problems", "hashmaps-solve-dsa-problems", "system-design-url-shortener"],
  },

  {
    id: 10,
    slug: "system-design-url-shortener",
    title: "System Design for Beginners – How to Design a URL Shortener",
    seoTitle: "System Design for Beginners – URL Shortener",
    metaDescription: "Learn system design fundamentals by designing a URL shortener from scratch. Covers hashing, databases, caching, scalability, and API design.",
    description: "Design a URL shortener from scratch — the perfect first system design problem. Covers hashing, database design, Redis caching, and horizontal scaling.",
    date: "2025-04-20",
    readTime: "13 min read",
    tags: ["System Design", "Backend", "Scalability", "Architecture"],
    content: `
# System Design for Beginners – How to Design a URL Shortener

System Design for Beginners – How to Design a URL Shortener

## Introduction

System design interviews intimidate most developers because they feel open-ended and vague. There's no single correct answer, and that's exactly what makes them hard.

The URL shortener is the perfect first system design problem. It's simple enough to understand completely, but complex enough to introduce every important concept: hashing, databases, caching, load balancing, and scalability.

By the end of this guide, you'll have a mental framework for approaching any system design problem.


## Step 1: Clarify Requirements

Before designing anything, ask clarifying questions. This is what separates senior engineers from juniors.

Functional requirements:

Given a long URL, generate a short URL
Given a short URL, redirect to the original long URL
Short URLs should be unique
Optional: custom aliases, expiration dates, analytics
Non-functional requirements:

High availability (99.9% uptime)
Low latency redirects (< 100ms)
Scale: 100 million URLs created per day
Read-heavy: 10:1 read-to-write ratio

## Step 2: Capacity Estimation

This shows interviewers you think about scale.

Writes: 100M URLs/day = ~1,160 writes/second Reads: 10× writes = ~11,600 reads/second

Storage:

Each URL record: ~500 bytes
100M URLs/day × 365 days × 5 years = 182.5 billion records
182.5B × 500 bytes ≈ 91 TB over 5 years
Bandwidth:

Write: 1,160 req/s × 500 bytes = ~580 KB/s
Read: 11,600 req/s × 500 bytes = ~5.8 MB/s

## Step 3: API Design

POST /api/v1/shorten

\`\`\`cpp
Body: { "longUrl": "https://example.com/very/long/path", "customAlias": "mylink", "expiresAt": "2026-01-01" }
Response: { "shortUrl": "https://short.ly/abc123", "shortCode": "abc123" }

GET /{shortCode}
\`\`\`

Response: 301 Redirect to longUrl


\`\`\`cpp
GET /api/v1/analytics/{shortCode}
Response: { "clicks": 1234, "createdAt": "...", "lastAccessed": "..." }
\`\`\`

Use 301 (Permanent Redirect) for SEO benefit — browsers cache it. Use 302 (Temporary Redirect) if you need to track every click — browsers won't cache it.


## Step 4: Short Code Generation

This is the core algorithm. You need a unique 6–8 character code for each URL.

Option A: MD5/SHA256 Hash

\`\`\`cpp
const crypto = require('crypto');

function generateShortCode(longUrl) {
    const hash = crypto.createHash('md5').update(longUrl).digest('hex');
    return hash.substring(0, 7); // take first 7 chars
}
\`\`\`

Problem: Collisions. Two different URLs could produce the same 7-char prefix. Solution: Check DB, append counter if collision exists.

Option B: Base62 Encoding of Auto-Increment ID

\`\`\`cpp
const BASE62 = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

function toBase62(num) {
    let result = '';
    while (num > 0) {
        result = BASE62[num % 62] + result;
        num = Math.floor(num / 62);
    }
    return result.padStart(7, '0');
}
\`\`\`

Advantage: No collisions — each ID is unique. Disadvantage: Sequential IDs are predictable. Use a distributed ID generator (like Snowflake) to avoid this.

Option C: Random String + Collision Check

\`\`\`cpp
function generateCode(length = 7) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < length; i++)
        code += chars[Math.floor(Math.random() * chars.length)];
    return code;
}
// Check DB, regenerate if collision
\`\`\`

62⁷ = ~3.5 trillion combinations. Collision probability is negligible.


## Step 5: Database Design

-- URLs table
CREATE TABLE urls (
    id          BIGINT PRIMARY KEY AUTO_INCREMENT,
    short_code  VARCHAR(10) UNIQUE NOT NULL,
    long_url    TEXT NOT NULL,
    user_id     BIGINT,
    created_at  TIMESTAMP DEFAULT NOW(),
    expires_at  TIMESTAMP,
    click_count BIGINT DEFAULT 0

\`\`\`cpp
);

CREATE INDEX idx_short_code ON urls(short_code);
\`\`\`

Why index on short_code? Every redirect does a lookup by short code. Without an index, that's a full table scan — O(n). With an index, it's O(log n).

SQL vs NoSQL? For this use case, either works. SQL gives you ACID guarantees. NoSQL (MongoDB, DynamoDB) gives you easier horizontal scaling. At massive scale, NoSQL is preferred.


## Step 6: Caching Layer

Redirects are read-heavy. Cache the most accessed short codes in Redis.


\`\`\`cpp
const redis = require('redis');
const client = redis.createClient();

async function redirect(shortCode) {
    // Check cache first
    const cached = await client.get(\`url:\${shortCode}\`);
    if (cached) {
        return cached; // Cache hit — ~1ms
    }

    // Cache miss — query database
    const url = await URL.findOne({ shortCode });
    if (!url) throw new Error('URL not found');

    // Store in cache with 24-hour TTL
    await client.setEx(\`url:\${shortCode}\`, 86400, url.longUrl);

    return url.longUrl;
}
\`\`\`

Cache hit rate: With 20% of URLs getting 80% of traffic (Pareto principle), caching the top 20% eliminates 80% of DB reads.


## Step 7: High-Level Architecture

Client
  ↓
Load Balancer (Nginx / AWS ALB)
  ↓
Application Servers (Node.js, horizontally scaled)
  ↓
┌─────────────────────────────────┐
│  Redis Cache (hot URLs)         │
│  PostgreSQL / MongoDB (all URLs)│
└─────────────────────────────────┘
Load balancer distributes traffic across multiple app servers. Redis handles the hot path — most redirects never hit the database. Database stores the source of truth.


## Step 8: Handling Scale

Problem: Single database becomes a bottleneck at high write volume.

Solutions:

Read replicas — route all reads to replicas, writes to primary
Database sharding — partition data by short code prefix across multiple DB instances
Consistent hashing — distribute load evenly when adding/removing shards
Problem: Generating unique IDs across multiple app servers.

Solution: Use a distributed ID generator like Twitter's Snowflake — generates unique 64-bit IDs using timestamp + machine ID + sequence number.


## Step 9: Analytics (Optional Feature)

Track clicks without slowing down redirects.


\`\`\`cpp
async function redirect(shortCode, req) {
    const longUrl = await getLongUrl(shortCode); // fast path

    // Fire-and-forget analytics — don't await
    logClick(shortCode, req.ip, req.headers['user-agent'])
        .catch(err => console.error('Analytics error:', err));

    return longUrl;
}
\`\`\`

For high-volume analytics, write to a message queue (Kafka, RabbitMQ) and process asynchronously.


## Complexity Analysis

Operation	Time Complexity
Shorten URL	O(1) — hash/encode + DB write

\`\`\`cpp
Redirect	O(1) — cache hit; O(log n) — DB lookup with index
\`\`\`

Analytics query	O(log n) — indexed query

## Common Mistakes in System Design Interviews

1. Jumping to solutions without clarifying requirements Always spend 5 minutes on requirements. It shows maturity.

2. Ignoring non-functional requirements Availability, latency, and scale constraints shape every design decision.

3. Not discussing tradeoffs There's no perfect solution. SQL vs NoSQL, 301 vs 302, cache TTL — everything has tradeoffs. Discuss them.

4. Forgetting the cache invalidation problem When a URL is updated or deleted, you must invalidate the cache entry. This is harder than it sounds at scale.

5. Over-engineering for day one Start simple. Add complexity only when you've justified the need through capacity estimates.
    `.trim(),
    relatedSlugs: ["scalable-backend-nodejs-mongodb", "rest-api-design-best-practices", "time-complexity-explained"],
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
export const getBlogBySlug = (slug: string): Blog | undefined =>
  blogs.find((b) => b.slug === slug);

export const getRelatedBlogs = (slug: string): Blog[] => {
  const blog = getBlogBySlug(slug);
  if (!blog) return [];
  return blog.relatedSlugs
    .map((s) => getBlogBySlug(s))
    .filter(Boolean) as Blog[];
};