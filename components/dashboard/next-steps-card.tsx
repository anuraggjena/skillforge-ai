"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Compass,
  ArrowRight,
  User,
  FolderGit2,
  Zap,
  PlayCircle,
  FileCheck,
  Share2,
} from "lucide-react";
import { NextStepItem } from "@/lib/dashboard-types";
import { Badge } from "@/components/ui/badge";

// Custom Github Icon helper
function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" {...props}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

interface NextStepsCardProps {
  nextSteps: NextStepItem[];
  isNewUser: boolean;
}

function getStepIcon(iconName: NextStepItem["iconName"]) {
  switch (iconName) {
    case "User":
      return <User className="h-3.5 w-3.5 text-emerald-300" />;
    case "Github":
      return <GithubIcon className="text-purple-300" />;
    case "FolderGit2":
      return <FolderGit2 className="h-3.5 w-3.5 text-blue-300" />;
    case "PlayCircle":
      return <PlayCircle className="h-3.5 w-3.5 text-amber-300" />;
    case "Zap":
      return <Zap className="h-3.5 w-3.5 text-yellow-300" />;
    case "FileCheck":
      return <FileCheck className="h-3.5 w-3.5 text-emerald-300" />;
    case "Share2":
      return <Share2 className="h-3.5 w-3.5 text-pink-300" />;
    case "Compass":
    default:
      return <Compass className="h-3.5 w-3.5 text-amber-300" />;
  }
}

export function NextStepsCard({ nextSteps, isNewUser }: NextStepsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col justify-between rounded-xl bg-[#121216] border border-white/[0.08] p-4 sm:p-5 transition-all duration-200 hover:border-white/[0.18] shadow-sm h-full"
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-emerald-400/10 border border-emerald-400/20 text-emerald-300">
              <Compass className="h-3.5 w-3.5" />
            </span>
            <h2 className="text-xs font-semibold tracking-wide uppercase text-[#E8E5D5]/80">
              {isNewUser ? "Getting Started" : "Recommended Next Actions"}
            </h2>
          </div>

          <Badge
            variant="outline"
            className="bg-white/[0.04] border-white/[0.08] text-[11px] font-normal text-[#E8E5D5]/70 py-0.5 px-2"
          >
            {isNewUser ? "Onboarding" : "Personalized"}
          </Badge>
        </div>

        <p className="text-xs text-[#E8E5D5]/60 mb-3">
          {isNewUser
            ? "Essential steps to configure your developer profile and launch your first project."
            : "Curated actions prioritized by your current project and review status."}
        </p>

        {/* Action Items */}
        <div className="space-y-2">
          {nextSteps.map((step) => (
            <Link
              key={step.id}
              href={step.href}
              className="group flex items-center justify-between gap-2.5 px-2.5 py-2 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.04] hover:border-white/[0.10] transition-all duration-150"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-1.5 rounded-md bg-white/[0.04] border border-white/[0.08] flex-shrink-0">
                  {getStepIcon(step.iconName)}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-medium text-[#F4F1E8] group-hover:text-amber-200 transition-colors truncate">
                      {step.title}
                    </span>
                    {step.badge && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/[0.05] border border-white/[0.08] text-[#E8E5D5]/70 flex-shrink-0">
                        {step.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#E8E5D5]/50 truncate mt-0.5">
                    {step.description}
                  </p>
                </div>
              </div>

              <div className="p-1 rounded bg-white/[0.02] group-hover:bg-white/[0.08] transition-colors flex-shrink-0">
                <ArrowRight className="h-3.5 w-3.5 text-[#E8E5D5]/40 group-hover:text-[#F4F1E8] transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3.5 mt-3 border-t border-white/[0.06] flex items-center justify-between">
        <span className="text-xs text-[#E8E5D5]/40 font-mono">
          {nextSteps.length} action item{nextSteps.length === 1 ? "" : "s"}
        </span>
        <span className="text-xs text-[#E8E5D5]/40 font-mono">
          {isNewUser ? "Onboarding" : "Contextual"}
        </span>
      </div>
    </motion.div>
  );
}
