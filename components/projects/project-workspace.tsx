"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
  Github,
  MessageSquareCode,
  ListTodo,
  FileText,
  ShieldAlert,
} from "lucide-react";
import { Milestone } from "@/lib/types";
import { MilestoneTracker } from "./milestone-tracker";
import { SubmissionForm } from "./submission-form";
import { ProjectReviewView, ReviewFeedback } from "./project-review-view";
import { HintSystem } from "./hint-system";

export interface ProjectWorkspaceProps {
  project: {
    id: number;
    title: string;
    description: string;
    status: "in-progress" | "completed";
    projectType: "micro" | "real-world";
    milestones: { items: Milestone[] } | null;
    repoUrl?: string | null;
    feedback?: unknown;
    createdAt: Date | string | null;
    skills: { id: number; name: string }[];
  };
  githubConnected: boolean;
}

type TabType = "overview" | "milestones" | "github" | "review";

export function ProjectWorkspace({ project, githubConnected }: ProjectWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [currentMilestones, setCurrentMilestones] = useState<Milestone[]>(
    project.milestones?.items ?? []
  );

  const isCompleted = project.status === "completed";
  const isMicro = project.projectType === "micro";
  const feedback = (project.feedback as ReviewFeedback | null) || null;
  const hasFeedback = Boolean(feedback);

  const completedMilestonesCount = currentMilestones.filter((m) => m.completed).length;
  const totalMilestonesCount = currentMilestones.length;
  const progressPercent =
    totalMilestonesCount > 0
      ? Math.round((completedMilestonesCount / totalMilestonesCount) * 100)
      : isCompleted
      ? 100
      : 0;

  const tabs: { id: TabType; label: string; icon: typeof FileText; badge?: string }[] = [
    { id: "overview", label: "Overview", icon: FileText },
    {
      id: "milestones",
      label: "Milestones",
      icon: ListTodo,
      badge: `${completedMilestonesCount}/${totalMilestonesCount}`,
    },
    {
      id: "github",
      label: "GitHub",
      icon: Github,
      badge: project.repoUrl ? "Linked" : githubConnected ? "Ready" : "Connect",
    },
    {
      id: "review",
      label: "Review",
      icon: MessageSquareCode,
      badge: hasFeedback ? "Reviewed" : undefined,
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Top Navigation & Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard/projects"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#E8E5D5]/65 hover:text-[#F4F1E8] transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Projects</span>
        </Link>

        {/* Unobtrusive Hint Trigger */}
        <HintSystem
          projectTitle={project.title}
          projectDescription={project.description}
        />
      </div>

      {/* 2. Workspace Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-xl bg-[#121216] border border-white/[0.08] p-5 sm:p-6 shadow-sm space-y-4"
      >
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-mono uppercase tracking-wider bg-white/[0.04] border border-white/[0.08] text-[#E8E5D5]/80">
              <Layers className="h-3 w-3 text-[#E8E5D5]/60" />
              {isMicro ? "Micro-Project" : "Real-World Project"}
            </span>

            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
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

          <span className="text-xs text-[#E8E5D5]/50 font-mono">
            {progressPercent}% Complete
          </span>
        </div>

        {/* Title and Narrative */}
        <div className="space-y-2">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-[#F4F1E8]">
            {project.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#E8E5D5]/75 leading-relaxed max-w-4xl">
            {project.description}
          </p>
        </div>

        {/* Project Technologies (Declared Stack) */}
        {project.skills && project.skills.length > 0 && (
          <div className="pt-2 border-t border-white/[0.05] flex flex-wrap items-center gap-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#E8E5D5]/50 mr-1">
              Technologies:
            </span>
            {project.skills.map((skill) => (
              <span
                key={skill.id}
                className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-xs font-mono text-[#E8E5D5]/80"
              >
                {skill.name}
              </span>
            ))}
          </div>
        )}
      </motion.div>

      {/* 3. Horizontal Navigation Tabs */}
      <div className="flex items-center gap-1 p-1 rounded-xl bg-[#121216] border border-white/[0.08] overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer whitespace-nowrap flex-1 sm:flex-initial justify-center ${
                isActive
                  ? "bg-white/[0.1] text-[#F4F1E8] font-semibold border border-white/[0.12] shadow-sm"
                  : "text-[#E8E5D5]/60 hover:text-[#F4F1E8] hover:bg-white/[0.04]"
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? "text-amber-300" : "text-[#E8E5D5]/50"}`} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                    isActive
                      ? "bg-white/[0.15] text-[#F4F1E8]"
                      : "bg-white/[0.04] text-[#E8E5D5]/50"
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 4. Tab Content Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* About This Project */}
              <div className="p-5 sm:p-6 rounded-xl bg-[#121216] border border-white/[0.08] space-y-3">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded-md bg-amber-400/10 border border-amber-400/20 text-amber-300">
                    <Sparkles className="h-3.5 w-3.5" />
                  </span>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#E8E5D5]/90">
                    About This Project
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#F4F1E8]/90 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Compact Metadata Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                <div className="p-4 rounded-xl bg-[#121216] border border-white/[0.06] space-y-1">
                  <span className="text-[11px] font-medium uppercase tracking-wider text-[#E8E5D5]/50">
                    Project Type
                  </span>
                  <p className="text-sm font-semibold text-[#F4F1E8]">
                    {isMicro ? "Micro-Project" : "Real-World Project"}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#121216] border border-white/[0.06] space-y-1">
                  <span className="text-[11px] font-medium uppercase tracking-wider text-[#E8E5D5]/50">
                    Milestone Progress
                  </span>
                  <p className="text-sm font-semibold text-[#F4F1E8]">
                    {completedMilestonesCount} of {totalMilestonesCount} ({progressPercent}%)
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#121216] border border-white/[0.06] space-y-1">
                  <span className="text-[11px] font-medium uppercase tracking-wider text-[#E8E5D5]/50">
                    Technologies Declared
                  </span>
                  <p className="text-sm font-semibold text-[#F4F1E8]">
                    {project.skills.length} frameworks / tools
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#121216] border border-white/[0.06] space-y-1">
                  <span className="text-[11px] font-medium uppercase tracking-wider text-[#E8E5D5]/50">
                    AI Code Review
                  </span>
                  <p className="text-sm font-semibold text-[#F4F1E8]">
                    {hasFeedback ? "Completed & Verified" : "Pending Submission"}
                  </p>
                </div>
              </div>

              {/* Verified Skills Evidence Note */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3">
                <ShieldAlert className="h-4 w-4 text-amber-300 flex-shrink-0 mt-0.5" />
                <div className="space-y-0.5 text-xs text-[#E8E5D5]/70">
                  <span className="font-semibold text-[#F4F1E8]">Skill Verification Policy:</span>
                  <p className="leading-relaxed">
                    Technologies used in this project will become verified skills on your profile after you complete the milestones and submit your GitHub repository for an AI codebase review.
                  </p>
                </div>
              </div>

              {/* Next Logical Step CTA */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#121216] border border-white/[0.08] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="space-y-0.5">
                  <h4 className="text-xs sm:text-sm font-bold text-[#F4F1E8]">
                    {completedMilestonesCount < totalMilestonesCount
                      ? "Next Step: Complete your technical milestones"
                      : hasFeedback
                      ? "Project Completed: View your AI Code Review"
                      : "Next Step: Submit your GitHub repository for review"}
                  </h4>
                  <p className="text-xs text-[#E8E5D5]/50">
                    {completedMilestonesCount < totalMilestonesCount
                      ? `Work through step ${completedMilestonesCount + 1} of ${totalMilestonesCount}`
                      : hasFeedback
                      ? "Review feedback, strengths, and areas for improvement."
                      : "Link your GitHub repository to earn verified skill scores."}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setActiveTab(
                      completedMilestonesCount < totalMilestonesCount
                        ? "milestones"
                        : hasFeedback
                        ? "review"
                        : "github"
                    )
                  }
                  className="px-4 py-2 rounded-lg bg-[#E8E5D5] text-black hover:bg-white text-xs font-semibold transition-all cursor-pointer shadow-sm self-start sm:self-auto"
                >
                  {completedMilestonesCount < totalMilestonesCount
                    ? "Open Milestones →"
                    : hasFeedback
                    ? "View Review →"
                    : "Submit on GitHub →"}
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: MILESTONES */}
          {activeTab === "milestones" && (
            <MilestoneTracker
              projectId={project.id}
              initialMilestones={{ items: currentMilestones }}
              onMilestonesUpdated={(newM) => setCurrentMilestones(newM)}
              onAllCompleted={() => setActiveTab("github")}
            />
          )}

          {/* TAB 3: GITHUB */}
          {activeTab === "github" && (
            <SubmissionForm
              projectId={project.id}
              existingRepoUrl={project.repoUrl}
              hasFeedback={hasFeedback}
              githubConnected={githubConnected}
              onReviewCompleted={() => setActiveTab("review")}
            />
          )}

          {/* TAB 4: REVIEW */}
          {activeTab === "review" && (
            <ProjectReviewView
              feedback={feedback}
              repoUrl={project.repoUrl}
              skills={project.skills}
              onGoToSubmit={() => setActiveTab("github")}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
