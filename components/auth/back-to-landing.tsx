"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export function BackToLanding() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#E8E5D5]/70 hover:text-white transition-all group py-2 px-3 rounded-lg hover:bg-white/[0.04] border border-transparent hover:border-[#E8E5D5]/15"
      >
        <ArrowLeft className="w-4 h-4 text-[#E8E5D5]/70 group-hover:text-white group-hover:-translate-x-1 transition-transform" />
        <span>Back to SkillForge</span>
      </Link>
    </motion.div>
  );
}
