"use client";

import Link from "next/link";
import {
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Award,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export interface ReviewFeedback {
  overall: string;
  strengths: string[];
  areasForImprovement: string[];
  score?: number;
}

interface ProjectReviewViewProps {
  feedback: ReviewFeedback | null;
  repoUrl?: string | null;
  skills?: { id: number; name: string }[];
  onGoToSubmit?: () => void;
}

export function ProjectReviewView({
  feedback,
  repoUrl,
  skills = [],
  onGoToSubmit,
}: ProjectReviewViewProps) {
  // Empty State: No Review Yet
  if (!feedback) {
    return (
      <div className="p-8 sm:p-10 rounded-xl bg-[#121216] border border-white/[0.08] text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto text-purple-300">
          <FileCheck className="h-6 w-6" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-bold text-[#F4F1E8]">No AI review yet</h3>
          <p className="text-xs text-[#E8E5D5]/60 max-w-sm mx-auto leading-relaxed">
            Submit your GitHub repository in the GitHub tab to receive an in-depth engineering review and unlock verified skill evidence.
          </p>
        </div>
        {onGoToSubmit ? (
          <button
            type="button"
            onClick={onGoToSubmit}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#E8E5D5] text-black hover:bg-white text-xs font-semibold transition-all cursor-pointer shadow-sm"
          >
            <span>Submit for Review →</span>
          </button>
        ) : (
          <span className="text-xs text-[#E8E5D5]/50">Navigate to GitHub tab to submit</span>
        )}
      </div>
    );
  }

  const score = feedback.score ?? 4;
  const scoreLabels: Record<number, string> = {
    1: "Foundational (1/5)",
    2: "Developing (2/5)",
    3: "Competent (3/5)",
    4: "Proficient (4/5)",
    5: "Exemplary (5/5)",
  };

  return (
    <div className="space-y-6">
      {/* Review Score & Overview Card */}
      <div className="p-5 sm:p-6 rounded-xl bg-gradient-to-br from-[#16161f] to-[#121216] border border-white/[0.08] space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/[0.06] pb-4">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-md bg-purple-400/15 border border-purple-400/30 text-purple-300">
              <Award className="h-4 w-4" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-[#F4F1E8]">AI Code Review Evaluation</h3>
              <p className="text-xs text-[#E8E5D5]/60">Verified engineering assessment of submitted repository</p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="px-2.5 py-1 rounded-full bg-purple-400/10 border border-purple-400/25 text-xs font-semibold text-purple-300 flex items-center gap-1.5">
              <span>Rating:</span>
              <span className="font-mono text-[#F4F1E8]">{scoreLabels[score] || `${score}/5`}</span>
            </span>
          </div>
        </div>

        {/* Overall Executive Assessment */}
        <div className="space-y-1.5">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#E8E5D5]/70">
            Overall Assessment
          </h4>
          <p className="text-xs sm:text-sm text-[#F4F1E8]/90 leading-relaxed">
            {feedback.overall}
          </p>
        </div>

        {repoUrl && (
          <div className="pt-2 flex items-center justify-between text-xs text-[#E8E5D5]/50 border-t border-white/[0.04]">
            <span className="font-mono truncate max-w-xs">{repoUrl}</span>
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-amber-300 hover:text-amber-200"
            >
              <span>View Source</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        )}
      </div>

      {/* Two-Column Grid: Strengths & Improvements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Strengths Card */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#121216] border border-white/[0.08] space-y-3">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-emerald-400/10 border border-emerald-400/20 text-emerald-300">
              <CheckCircle2 className="h-3.5 w-3.5" />
            </span>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#E8E5D5]/80">
              Observed Strengths
            </h4>
          </div>

          <ul className="space-y-2 pt-1">
            {feedback.strengths.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F4F1E8]/85">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Areas for Improvement Card */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#121216] border border-white/[0.08] space-y-3">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-amber-400/10 border border-amber-400/20 text-amber-300">
              <AlertCircle className="h-3.5 w-3.5" />
            </span>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#E8E5D5]/80">
              Areas for Improvement
            </h4>
          </div>

          <ul className="space-y-2 pt-1">
            {feedback.areasForImprovement.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F4F1E8]/85">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Verified Skills Evidence Banner */}
      {skills.length > 0 && (
        <div className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-emerald-400/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                Verified Skill Evidence Added
              </h4>
            </div>
            <p className="text-xs text-[#E8E5D5]/65">
              Review completed. The following technologies now contribute to your verified skill score:
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {skills.map((s) => (
                <span
                  key={s.id}
                  className="px-2 py-0.5 rounded bg-emerald-400/10 border border-emerald-400/20 text-[11px] font-mono text-emerald-300"
                >
                  ✓ {s.name}
                </span>
              ))}
            </div>
          </div>

          <Link
            href="/dashboard/portfolio"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-xs font-semibold text-[#F4F1E8] transition-colors self-start sm:self-auto flex-shrink-0"
          >
            <span>View Skill Graph</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      )}
    </div>
  );
}
