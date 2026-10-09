"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock, Layers } from "lucide-react";
import { Milestone } from "@/lib/types";

export interface ProjectCardData {
  id: number;
  title: string;
  description: string;
  status: "in-progress" | "completed";
  projectType: "micro" | "real-world";
  milestones: { items: Milestone[] } | null;
  createdAt: Date | string | null;
  repoUrl?: string | null;
  feedback?: unknown;
  skills?: { id: number; name: string }[];
}

interface ProjectCardProps {
  project: ProjectCardData;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const isCompleted = project.status === "completed";
  const isMicro = project.projectType === "micro";
  
  const milestonesList = project.milestones?.items ?? [];
  const totalMilestones = milestonesList.length;
  const completedMilestones = milestonesList.filter((m) => m.completed).length;
  const progressPercent =
    totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : (isCompleted ? 100 : 0);

  const skillsList = project.skills?.map((s) => s.name) ?? [];
  const displaySkills = skillsList.slice(0, 3);
  const remainingSkillsCount = skillsList.length - displaySkills.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/dashboard/projects/${project.id}`} className="block group h-full">
        <div className="flex flex-col justify-between h-full rounded-xl bg-[#121216] border border-white/[0.08] p-4 sm:p-5 transition-all duration-200 hover:border-white/[0.18] hover:-translate-y-0.5 shadow-sm">
          <div>
            {/* Top Row: Type & Status Badges */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-white/[0.04] border border-white/[0.08] text-[#E8E5D5]/80">
                <Layers className="h-3 w-3 text-[#E8E5D5]/60" />
                {isMicro ? "Micro-Project" : "Real-World"}
              </span>

              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border ${
                  isCompleted
                    ? "bg-emerald-400/10 text-emerald-300 border-emerald-400/20"
                    : "bg-amber-400/10 text-amber-300 border-amber-400/20"
                }`}
              >
                {isCompleted ? (
                  <>
                    <CheckCircle2 className="h-3 w-3" /> Completed
                  </>
                ) : (
                  <>
                    <Clock className="h-3 w-3" /> In Progress
                  </>
                )}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-base font-bold text-[#F4F1E8] group-hover:text-amber-200 transition-colors line-clamp-1 tracking-tight">
              {project.title}
            </h3>

            {/* Description */}
            <p className="mt-1.5 text-xs text-[#E8E5D5]/65 line-clamp-2 leading-relaxed">
              {project.description}
            </p>

            {/* Tech Stack Chips */}
            {skillsList.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 mt-3">
                {displaySkills.map((tech) => (
                  <span
                    key={tech}
                    className="px-1.5 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-[10px] font-mono text-[#E8E5D5]/70"
                  >
                    {tech}
                  </span>
                ))}
                {remainingSkillsCount > 0 && (
                  <span className="text-[10px] text-[#E8E5D5]/40 font-mono">
                    +{remainingSkillsCount}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Bottom Area: Milestone Progress & Open Action */}
          <div className="pt-3.5 mt-3.5 border-t border-white/[0.06] space-y-2">
            <div className="flex items-center justify-between text-[11px] text-[#E8E5D5]/60">
              <span className="font-mono">
                {totalMilestones > 0
                  ? `Milestone ${completedMilestones} of ${totalMilestones}`
                  : isCompleted
                  ? "All milestones completed"
                  : "Milestones in progress"}
              </span>
              <span className="font-mono font-medium text-[#F4F1E8]">{progressPercent}%</span>
            </div>

            {/* Progress Bar */}
            <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  isCompleted ? "bg-emerald-400/80" : "bg-amber-400/80"
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-end pt-1">
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#E8E5D5]/80 group-hover:text-[#F4F1E8] transition-colors">
                <span>Open</span>
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
