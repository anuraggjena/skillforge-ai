"use client";

import { motion } from "framer-motion";

interface WelcomeHeaderProps {
  firstName: string;
}

export function WelcomeHeader({ firstName }: WelcomeHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-2 border-b border-white/[0.06]"
    >
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F4F1E8]">
          Welcome back, {firstName}!
        </h1>
        <p className="text-sm sm:text-base text-[#E8E5D5]/65">
          Here&apos;s your progress at a glance.
        </p>
      </div>

      <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-xs text-[#E8E5D5]/70">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 animate-pulse" />
        <span className="font-serif-editorial italic tracking-wide text-sm text-[#F4F1E8]">
          Build. Learn. Improve. Repeat.
        </span>
      </div>
    </motion.div>
  );
}
