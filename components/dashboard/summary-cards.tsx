"use client";

import { motion } from "framer-motion";
import { FolderGit2, Zap, MessageSquareCode, Award } from "lucide-react";
import { DashboardStats } from "@/lib/dashboard-types";

interface SummaryCardsProps {
  stats: DashboardStats;
}

export function SummaryCards({ stats }: SummaryCardsProps) {
  const standardCards = [
    {
      title: "Projects Built",
      value: stats.projectsBuilt.toString(),
      supporting:
        stats.projectsBuilt === 0
          ? "No projects started yet"
          : `${stats.projectsCompleted} completed · ${stats.projectsInProgress} in progress`,
      icon: FolderGit2,
      accent: "text-amber-300",
      bgAccent: "bg-amber-400/10 border-amber-400/20",
    },
    {
      title: "Challenges Completed",
      value: stats.challengesCompleted.toString(),
      supporting:
        stats.challengesInProgress > 0
          ? `${stats.challengesInProgress} challenge in progress`
          : stats.challengesCompleted > 0
          ? "Practical coding conqueror"
          : "Ready for your first challenge",
      icon: Zap,
      accent: "text-blue-300",
      bgAccent: "bg-blue-400/10 border-blue-400/20",
    },
    {
      title: "Reviews Received",
      value: stats.reviewsReceived.toString(),
      supporting:
        stats.reviewsReceived === 0
          ? "Submit a project to get AI feedback"
          : `${stats.reviewsReceived} evaluated submission${stats.reviewsReceived === 1 ? "" : "s"}`,
      icon: MessageSquareCode,
      accent: "text-emerald-300",
      bgAccent: "bg-emerald-400/10 border-emerald-400/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 3 Visually Lighter Standard Cards */}
      {standardCards.map((card, index) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="group relative flex flex-col justify-between rounded-xl bg-[#121216] border border-white/[0.06] p-4 sm:p-5 transition-all duration-200 hover:border-white/[0.14] hover:-translate-y-0.5 shadow-sm"
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-medium uppercase tracking-wider text-[#E8E5D5]/60">
                {card.title}
              </span>
              <div className={`p-1.5 rounded-lg border ${card.bgAccent}`}>
                <Icon className={`h-3.5 w-3.5 ${card.accent}`} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F4F1E8]">
                {card.value}
              </div>
              <p className="text-xs text-[#E8E5D5]/50 truncate">
                {card.supporting}
              </p>
            </div>
          </motion.div>
        );
      })}

      {/* 4th Card: Current Level (Slightly more prominent for progression) */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="group relative flex flex-col justify-between rounded-xl bg-gradient-to-br from-[#16161f] to-[#121216] border border-purple-400/25 p-4 sm:p-5 transition-all duration-200 hover:border-purple-400/40 hover:-translate-y-0.5 shadow-[0_2px_12px_rgba(168,85,247,0.05)]"
      >
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-300/80">
            Current Level
          </span>
          <div className="p-1.5 rounded-lg border bg-purple-400/15 border-purple-400/30">
            <Award className="h-3.5 w-3.5 text-purple-300" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-baseline justify-between">
            <div className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F4F1E8]">
              Level {stats.level}
            </div>
            <span className="text-xs font-mono text-[#E8E5D5]/70">
              {stats.xp} / {stats.xpForNextLevel} XP
            </span>
          </div>

          {/* Embedded Progress Bar */}
          <div className="space-y-1">
            <div className="h-1.5 w-full bg-white/[0.08] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${stats.xpProgressPercent}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-purple-400 via-amber-300 to-amber-200"
              />
            </div>
            <div className="flex justify-between items-center text-[10px] text-[#E8E5D5]/40 font-mono">
              <span>Progress</span>
              <span>{stats.xpProgressPercent}%</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
