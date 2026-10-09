"use client";

import { useState } from "react";
import { Check, CheckCircle2, Circle, Loader2, Zap } from "lucide-react";
import { updateMilestones } from "@/lib/actions/project.actions";
import { Milestone } from "@/lib/types";
import { toast } from "sonner";

interface MilestoneTrackerProps {
  projectId: number;
  initialMilestones: { items: Milestone[] } | null;
  onMilestonesUpdated?: (newMilestones: Milestone[]) => void;
  onAllCompleted?: () => void;
}

export function MilestoneTracker({
  projectId,
  initialMilestones,
  onMilestonesUpdated,
  onAllCompleted,
}: MilestoneTrackerProps) {
  const [milestones, setMilestones] = useState<Milestone[]>(
    initialMilestones?.items ?? []
  );
  const [savingIndex, setSavingIndex] = useState<number | null>(null);

  const completedCount = milestones.filter((m) => m.completed).length;
  const totalCount = milestones.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const isAllCompleted = totalCount > 0 && completedCount === totalCount;

  const handleToggle = async (index: number) => {
    const target = milestones[index];
    const newCompleted = !target.completed;

    // Optimistic UI update
    const updatedMilestones = milestones.map((m, i) =>
      i === index ? { ...m, completed: newCompleted } : m
    );

    setMilestones(updatedMilestones);
    setSavingIndex(index);
    if (onMilestonesUpdated) {
      onMilestonesUpdated(updatedMilestones);
    }

    try {
      const res = await updateMilestones(projectId, updatedMilestones);
      if (res.success) {
        if (newCompleted) {
          toast.success("Milestone completed! +10 XP awarded.", {
            description: target.text,
          });
        }
        if (updatedMilestones.every((m) => m.completed) && onAllCompleted) {
          onAllCompleted();
        }
      } else {
        // Rollback on error
        setMilestones(milestones);
        toast.error("Failed to save milestone progress. Please try again.");
      }
    } catch {
      setMilestones(milestones);
      toast.error("Network error saving milestone.");
    } finally {
      setSavingIndex(null);
    }
  };

  if (milestones.length === 0) {
    return (
      <div className="p-6 rounded-xl bg-[#121216] border border-white/[0.08] text-center space-y-2">
        <p className="text-sm font-medium text-[#F4F1E8]">No milestones defined for this project.</p>
        <p className="text-xs text-[#E8E5D5]/50">
          This project was initialized without specific milestone steps.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Progress Header Card */}
      <div className="p-4 sm:p-5 rounded-xl bg-[#121216] border border-white/[0.08] space-y-3">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="text-sm font-bold text-[#F4F1E8] tracking-tight">Milestone Progress</h3>
            <p className="text-xs text-[#E8E5D5]/60">
              {completedCount} of {totalCount} completed ({progressPercent}%)
            </p>
          </div>
          <span className="flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/20 text-amber-300">
            <Zap className="h-3 w-3" /> +10 XP per milestone
          </span>
        </div>

        {/* Progress Bar */}
        <div className="h-2 w-full bg-white/[0.06] rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              isAllCompleted ? "bg-emerald-400" : "bg-gradient-to-r from-amber-400 to-amber-200"
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {isAllCompleted && (
          <div className="flex items-center gap-2 pt-1 text-xs text-emerald-300">
            <CheckCircle2 className="h-4 w-4" />
            <span>All milestones completed! Submit your GitHub repository for AI review.</span>
          </div>
        )}
      </div>

      {/* Step-by-Step Milestones List */}
      <div className="space-y-2.5">
        {milestones.map((milestone, index) => {
          const stepNumber = String(index + 1).padStart(2, "0");
          const isSaving = savingIndex === index;

          return (
            <div
              key={index}
              onClick={() => handleToggle(index)}
              className={`group flex items-start justify-between gap-3 p-3.5 sm:p-4 rounded-xl border transition-all duration-150 cursor-pointer select-none ${
                milestone.completed
                  ? "bg-white/[0.02] border-white/[0.05] hover:border-white/[0.1]"
                  : "bg-[#121216] border-white/[0.08] hover:border-white/[0.18]"
              }`}
            >
              <div className="flex items-start gap-3.5 min-w-0">
                {/* Step Number */}
                <span
                  className={`font-mono text-xs font-semibold px-2 py-0.5 rounded mt-0.5 ${
                    milestone.completed
                      ? "bg-emerald-400/10 text-emerald-400/70 border border-emerald-400/20"
                      : "bg-white/[0.04] text-[#E8E5D5]/60 border border-white/[0.08]"
                  }`}
                >
                  {stepNumber}
                </span>

                {/* Milestone Text */}
                <div className="space-y-1 min-w-0">
                  <p
                    className={`text-xs sm:text-sm font-medium leading-relaxed transition-colors ${
                      milestone.completed
                        ? "line-through text-[#E8E5D5]/40"
                        : "text-[#F4F1E8] group-hover:text-amber-200"
                    }`}
                  >
                    {milestone.text}
                  </p>
                </div>
              </div>

              {/* Custom Checkbox Indicator */}
              <div className="flex-shrink-0 pt-0.5">
                {isSaving ? (
                  <Loader2 className="h-5 w-5 animate-spin text-amber-300" />
                ) : milestone.completed ? (
                  <div className="h-5 w-5 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center justify-center transition-transform group-hover:scale-105">
                    <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                  </div>
                ) : (
                  <div className="h-5 w-5 rounded-md bg-white/[0.04] border border-white/[0.14] group-hover:border-white/[0.3] flex items-center justify-center transition-transform group-hover:scale-105">
                    <Circle className="h-3 w-3 text-transparent" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}