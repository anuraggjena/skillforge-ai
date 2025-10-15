"use client";

import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

// Simple logic to determine XP needed for the next level
const getXpForNextLevel = (level: number) => {
  return 100 + (level - 1) * 50; // e.g., Level 1 -> 100, Level 2 -> 150
};

export function UserProgress({ xp, level }: { xp: number; level: number }) {
  const xpForNext = getXpForNextLevel(level);
  const progress = (xp / xpForNext) * 100;

  return (
    <div className="flex items-center gap-4 w-48">
      <Badge variant="secondary">Lvl {level}</Badge>
      <div className="w-full">
        <Progress value={progress} className="h-2" />
        <p className="text-xs text-muted-foreground mt-1 text-right">{xp} / {xpForNext} XP</p>
      </div>
    </div>
  );
}