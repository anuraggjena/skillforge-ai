"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BarChart2, ShieldCheck, GitPullRequest } from "lucide-react";
import { SkillItem } from "@/lib/dashboard-types";

interface SkillSnapshotCardProps {
  skills: SkillItem[];
}

export function SkillSnapshotCard({ skills }: SkillSnapshotCardProps) {
  const hasSkills = skills && skills.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col justify-between rounded-xl bg-[#121216] border border-white/[0.08] p-4 sm:p-5 transition-all duration-200 hover:border-white/[0.18] shadow-sm h-full"
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-purple-400/10 border border-purple-400/20 text-purple-300">
              <BarChart2 className="h-3.5 w-3.5" />
            </span>
            <h2 className="text-xs font-semibold tracking-wide uppercase text-[#E8E5D5]/80">
              Skill Snapshot
            </h2>
          </div>

          <span className="flex items-center gap-1 text-[11px] font-mono text-[#E8E5D5]/50">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400/80" />
            Verified
          </span>
        </div>

        <p className="text-xs text-[#E8E5D5]/60 mb-4">
          Evidence-backed skills verified by AI codebase reviews.
        </p>

        {/* Skill list or Empty state */}
        {hasSkills ? (
          <div className="space-y-3 my-1">
            {skills.map((skill, index) => (
              <div key={skill.name} className="space-y-1">
                {/* Skill Name & Score Prominence */}
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-medium text-[#F4F1E8] tracking-tight">{skill.name}</span>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-[11px] text-[#E8E5D5]/45">
                      {skill.count} {skill.count === 1 ? "review" : "reviews"}
                    </span>
                    <span className="text-xs font-semibold text-[#F4F1E8]">{skill.score}</span>
                  </div>
                </div>

                {/* Softer, restrained progress bar */}
                <div className="relative h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.score}%` }}
                    transition={{ duration: 0.5, delay: 0.15 + index * 0.05, ease: "easeOut" }}
                    className="h-full rounded-full bg-[#E8E5D5]/50"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="my-3 py-5 px-4 rounded-lg bg-white/[0.02] border border-dashed border-white/[0.08] text-center space-y-2">
            <div className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto text-[#E8E5D5]/40">
              <GitPullRequest className="h-4 w-4" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs sm:text-sm font-semibold text-[#F4F1E8]">No verified skills yet</h4>
              <p className="text-[11px] sm:text-xs text-[#E8E5D5]/50 max-w-xs mx-auto leading-relaxed">
                Complete a GitHub code review to start building skill evidence.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Link */}
      <div className="pt-3.5 mt-3 border-t border-white/[0.06] flex items-center justify-between">
        <span className="text-xs text-[#E8E5D5]/40 font-mono">
          {hasSkills ? `${skills.length} verified skill${skills.length === 1 ? "" : "s"}` : "0 verified skills"}
        </span>

        <Link
          href="/dashboard/portfolio"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#E8E5D5]/80 hover:text-[#F4F1E8] transition-colors group"
        >
          <span>View Full Graph</span>
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </motion.div>
  );
}
