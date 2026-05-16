import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import profileImg from "@/assets/profile.jpg";
import { Code2, Trophy, Server, ExternalLink, Zap } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { sectionVariants, itemVariants } from "@/lib/animations";

const stats = [
  {
    icon: Server,
    value: 5,
    suffix: "+",
    label: "BACKEND SYSTEMS & APIS",
    detail: "Scalable APIs & Optimized Databases",
    extraInfo: "Projects on GitHub with clean backend architecture and API design",
    linkText: "View GitHub",
    linkUrl: "https://github.com/priyanshuguptacoder"
  },
  {
    icon: Code2,
    value: 335,
    suffix: "+",
    label: "LEETCODE PROBLEMS SOLVED",
    detail: "Strong coverage across core DSA topics with consistent problem solving.",
    extraInfo: "Contest Rating: 1565 • Top 30%",
    linkText: "View Profile",
    linkUrl: "#",
    isDominant: true,
  },
  {
    icon: Trophy,
    value: 75,
    suffix: "+",
    label: "PROBLEMS SOLVED (CODEFORCES)",
    detail: "Building competitive programming fundamentals with focus on speed and implementation.",
    extraInfo: "Rating: 1002 (Newbie) • Improving Rapidly",
    linkText: "View Profile",
    linkUrl: "#"
  },
];