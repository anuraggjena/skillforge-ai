"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Flame, Zap } from "lucide-react";
import { CurrentFocusItem } from "@/lib/dashboard-types";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface CurrentFocusCardProps {
  currentFocus: CurrentFocusItem;
}

export function CurrentFocusCard({ currentFocus }: CurrentFocusCardProps) {
  const isNone = currentFocus.type === "none";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col justify-between rounded-xl bg-[#121216] border border-white/[0.08] p-4 sm:p-5 transition-all duration-200 hover:border-white/[0.18] shadow-sm relative overflow-hidden h-full"
    >
      {/* Subtle background ambient tint */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-amber-500/[0.03] to-transparent rounded-full blur-2xl pointer-events-none" />

      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-amber-400/10 border border-amber-400/20 text-amber-300">
              <Flame className="h-3.5 w-3.5" />
            </span>
            <h2 className="text-xs font-semibold tracking-wide uppercase text-[#E8E5D5]/80">
              Current Focus
            </h2>
          </div>

          {currentFocus.statusBadge && (
            <Badge
              variant="outline"
              className="bg-white/[0.04] border-white/[0.08] text-[11px] font-normal text-[#E8E5D5]/80 py-0.5 px-2"
            >
              {currentFocus.statusBadge}
            </Badge>
          )}
        </div>

        {/* Focus Content - Reduced spacing for tighter hierarchy */}
        <div className="space-y-2.5">
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#F4F1E8] line-clamp-1">
            {currentFocus.displayTitle}
          </h3>

          <p className="text-xs sm:text-sm text-[#E8E5D5]/65 line-clamp-2 leading-relaxed">
            {currentFocus.subtitle}
          </p>

          {/* Project Progress bar if active project */}
          {currentFocus.type === "project" && currentFocus.progressPercent !== undefined && (
            <div className="space-y-1 pt-1">
              <div className="flex items-center justify-between text-[11px] text-[#E8E5D5]/60">
                <span>{currentFocus.milestonesSummary ?? "Project Progress"}</span>
                <span className="font-mono font-medium text-[#F4F1E8]">{currentFocus.progressPercent}%</span>
              </div>
              <Progress value={currentFocus.progressPercent} className="h-1.5 bg-white/[0.06]" />
            </div>
          )}

          {/* Challenge XP / Category if active challenge */}
          {currentFocus.type === "challenge" && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {currentFocus.category && (
                <span className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-xs text-[#E8E5D5]/70">
                  {currentFocus.category}
                </span>
              )}
              {currentFocus.xpReward && (
                <span className="px-2 py-0.5 rounded-md bg-amber-400/10 border border-amber-400/20 text-xs font-medium text-amber-300 flex items-center gap-1">
                  <Zap className="h-3 w-3" /> +{currentFocus.xpReward} XP
                </span>
              )}
            </div>
          )}

          {/* Tech stack tags */}
          {currentFocus.techStack && currentFocus.techStack.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {currentFocus.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-[11px] font-mono text-[#E8E5D5]/75"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer CTA - Brought closer and cleaner */}
      <div className="pt-3.5 mt-3 border-t border-white/[0.06] flex items-center justify-between">
        <span className="text-xs text-[#E8E5D5]/40 font-mono">
          {isNone ? "Ready to begin" : "Active objective"}
        </span>

        <Link
          href={currentFocus.ctaHref}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#E8E5D5] text-black hover:bg-white text-xs sm:text-sm font-semibold transition-all duration-150 hover:gap-2 group shadow-sm"
        >
          <span>{currentFocus.ctaText.replace(" →", "")}</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </motion.div>
  );
}
