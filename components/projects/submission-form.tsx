"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Loader2,
  FileCheck,
  RotateCcw,
} from "lucide-react";
import { submitProjectForFeedback } from "@/lib/actions/project.actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Custom Github Icon helper
function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...props}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

interface SubmissionFormProps {
  projectId: number;
  existingRepoUrl?: string | null;
  hasFeedback?: boolean;
  githubConnected?: boolean;
  onReviewCompleted?: () => void;
}

export function SubmissionForm({
  projectId,
  existingRepoUrl,
  hasFeedback = false,
  githubConnected = false,
  onReviewCompleted,
}: SubmissionFormProps) {
  const router = useRouter();
  const [repoUrl, setRepoUrl] = useState(existingRepoUrl || "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showResubmit, setShowResubmit] = useState(false);

  // 1. STATE: GitHub Not Connected
  if (!githubConnected) {
    return (
      <div className="p-6 sm:p-8 rounded-xl bg-[#121216] border border-white/[0.08] text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto text-purple-300">
          <GithubIcon />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-bold text-[#F4F1E8]">Connect GitHub</h3>
          <p className="text-xs text-[#E8E5D5]/60 max-w-sm mx-auto leading-relaxed">
            Connect your GitHub account to enable automated repository inspection, architecture analysis, and verified skill evaluations.
          </p>
        </div>
        <Link
          href="/dashboard/connect-github"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#E8E5D5] text-black hover:bg-white text-xs font-semibold transition-all shadow-sm cursor-pointer"
        >
          <GithubIcon />
          <span>Connect GitHub →</span>
        </Link>
      </div>
    );
  }

  // 2. STATE: Repository Already Submitted & Reviewed (and not re-submitting)
  if (existingRepoUrl && hasFeedback && !showResubmit) {
    return (
      <div className="p-5 sm:p-6 rounded-xl bg-[#121216] border border-white/[0.08] space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-emerald-400/10 border border-emerald-400/20 text-emerald-300">
              <CheckCircle2 className="h-4 w-4" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-[#F4F1E8]">Repository Submitted & Reviewed</h3>
              <p className="text-xs text-[#E8E5D5]/60">
                Codebase analyzed and verified by AI Code Reviewer.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowResubmit(true)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs text-[#E8E5D5]/70 hover:text-[#F4F1E8] transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Resubmit</span>
          </button>
        </div>

        <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <GithubIcon className="text-[#E8E5D5]/50 flex-shrink-0" />
            <span className="font-mono text-xs text-[#F4F1E8] truncate">{existingRepoUrl}</span>
          </div>
          <a
            href={existingRepoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-[#E8E5D5]/60 hover:text-amber-200 transition-colors flex-shrink-0"
          >
            <span>View Repo</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    );
  }

  // 3. STATE: Submit or Resubmit Form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoUrl.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await submitProjectForFeedback(projectId, repoUrl.trim());
      if (result.success) {
        toast.success("AI code review completed!", {
          description: "Earned +50 XP and updated verified skills.",
        });
        setShowResubmit(false);
        router.refresh();
        if (onReviewCompleted) {
          onReviewCompleted();
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.message === "GITHUB_NOT_CONNECTED") {
          setError("Your GitHub account is not connected. Please connect your GitHub account first.");
        } else {
          setError(err.message || "Failed to inspect repository. Please check URL and try again.");
        }
      } else {
        setError("An unexpected error occurred during review.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-5 sm:p-6 rounded-xl bg-[#121216] border border-white/[0.08] space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-md bg-blue-400/10 border border-blue-400/20 text-blue-300">
              <FileCheck className="h-4 w-4" />
            </span>
            <h3 className="text-sm font-bold text-[#F4F1E8]">Submit Your Project</h3>
          </div>
          <p className="text-xs text-[#E8E5D5]/60">
            Paste your public GitHub repository URL to receive an in-depth AI architectural review and verify your skills.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="repoUrl" className="block text-xs font-semibold uppercase tracking-wider text-[#E8E5D5]/70 mb-2">
            GitHub Repository URL
          </label>
          <div className="relative">
            <GithubIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-[#E8E5D5]/40" />
            <Input
              id="repoUrl"
              type="url"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="https://github.com/your-username/your-repository"
              required
              className="pl-9 bg-[#0c0c0f] border-white/[0.08] text-xs sm:text-sm text-[#F4F1E8] placeholder:text-[#E8E5D5]/30 focus-visible:ring-1 focus-visible:ring-amber-400/30"
            />
          </div>
          <p className="text-[11px] text-[#E8E5D5]/40 mt-1.5">
            Note: The repository must be accessible with your connected GitHub account.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/20 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="flex items-center justify-between pt-1">
          {showResubmit ? (
            <button
              type="button"
              onClick={() => setShowResubmit(false)}
              className="text-xs text-[#E8E5D5]/60 hover:text-[#F4F1E8] cursor-pointer"
            >
              Cancel
            </button>
          ) : (
            <span className="text-[11px] text-[#E8E5D5]/45">Awards +50 XP upon review</span>
          )}

          <Button
            type="submit"
            disabled={isLoading || !repoUrl.trim()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#E8E5D5] text-black hover:bg-white text-xs font-semibold transition-all shadow-sm cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Analyzing Codebase...</span>
              </>
            ) : (
              <>
                <span>Submit for Review</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}