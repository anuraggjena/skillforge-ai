"use client";

import { getXpForNextLevel } from "@/lib/dashboard-types";

export function UserProgress({ xp, level }: { xp: number; level: number }) {
  const xpForNext = getXpForNextLevel(level);
  const progress = Math.min(100, Math.max(0, Math.round((xp / xpForNext) * 100)));

  return (
    <div className="flex flex-col justify-center gap-1 w-36 sm:w-44 px-3 py-1.5 rounded-lg bg-[#141418] border border-white/[0.08] shadow-sm">
      {/* Unified Level & XP Metrics */}
      <div className="flex items-center justify-between text-xs leading-none">
        <span className="font-semibold text-[#F4F1E8] tracking-tight">Lv {level}</span>
        <span className="font-mono text-[11px] text-[#E8E5D5]/70">
          {xp} / {xpForNext} XP
        </span>
      </div>

      {/* Progress Bar directly under */}
      <div className="h-1 w-full bg-white/[0.08] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-400/80 to-amber-200/80 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}