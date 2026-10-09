"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Loader2, AlertCircle, Layers, Clock } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type ProjectBriefResponse = {
  title: string;
  description: string;
  milestones: string[];
  skillsUsed?: string[];
  projectId?: number;
};

export function ProjectGenerator() {
  const router = useRouter();
  const [skills, setSkills] = useState("");
  const [projectType, setProjectType] = useState<"real-world" | "micro">("real-world");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedBrief, setGeneratedBrief] = useState<ProjectBriefResponse | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!skills.trim()) return;

    setIsLoading(true);
    setError(null);
    setGeneratedBrief(null);

    try {
      const response = await fetch("/api/ai/generate-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills, projectType }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Failed to generate project (${response.status})`);
      }

      const data: ProjectBriefResponse = await response.json();
      setGeneratedBrief(data);

      if (data.projectId) {
        router.refresh();
        // Smoothly redirect after brief display
        setTimeout(() => {
          router.push(`/dashboard/projects/${data.projectId}`);
        }, 1200);
      }
    } catch (err) {
      setError((err as Error).message || "Failed to generate project. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-xl bg-[#121216] border border-white/[0.08] p-5 sm:p-6 shadow-sm relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-amber-500/[0.03] to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-md bg-amber-400/10 border border-amber-400/20 text-amber-300">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            <h2 className="text-base sm:text-lg font-bold text-[#F4F1E8] tracking-tight">
              Create a New Project
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#E8E5D5]/65">
            Tell SkillForge what you want to build and generate a tailored project.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Project Type Segmented Selector */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#E8E5D5]/70 mb-2">
            Project Type
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Real-World Project Option */}
            <button
              type="button"
              onClick={() => setProjectType("real-world")}
              className={`text-left p-3.5 rounded-lg border transition-all duration-150 flex items-start gap-3 cursor-pointer ${
                projectType === "real-world"
                  ? "bg-white/[0.06] border-amber-400/30 text-[#F4F1E8] shadow-sm ring-1 ring-amber-400/20"
                  : "bg-white/[0.02] border-white/[0.06] text-[#E8E5D5]/60 hover:bg-white/[0.04] hover:text-[#E8E5D5]/80"
              }`}
            >
              <div
                className={`p-1.5 rounded-md border mt-0.5 ${
                  projectType === "real-world"
                    ? "bg-amber-400/15 border-amber-400/30 text-amber-300"
                    : "bg-white/[0.04] border-white/[0.08] text-[#E8E5D5]/40"
                }`}
              >
                <Layers className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-semibold text-[#F4F1E8]">
                  Real-World Project
                </div>
                <div className="text-[11px] text-[#E8E5D5]/50 mt-0.5">
                  Production-grade application with comprehensive architecture
                </div>
              </div>
            </button>

            {/* Micro-Project Option */}
            <button
              type="button"
              onClick={() => setProjectType("micro")}
              className={`text-left p-3.5 rounded-lg border transition-all duration-150 flex items-start gap-3 cursor-pointer ${
                projectType === "micro"
                  ? "bg-white/[0.06] border-amber-400/30 text-[#F4F1E8] shadow-sm ring-1 ring-amber-400/20"
                  : "bg-white/[0.02] border-white/[0.06] text-[#E8E5D5]/60 hover:bg-white/[0.04] hover:text-[#E8E5D5]/80"
              }`}
            >
              <div
                className={`p-1.5 rounded-md border mt-0.5 ${
                  projectType === "micro"
                    ? "bg-amber-400/15 border-amber-400/30 text-amber-300"
                    : "bg-white/[0.04] border-white/[0.08] text-[#E8E5D5]/40"
                }`}
              >
                <Clock className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-semibold text-[#F4F1E8]">
                  Micro-Project
                </div>
                <div className="text-[11px] text-[#E8E5D5]/50 mt-0.5">
                  Focused skill sprint designed to be completed in under 1 hour
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Skills Input */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="skills" className="text-xs font-semibold uppercase tracking-wider text-[#E8E5D5]/70">
              Your Skills
            </label>
            <span className="text-[11px] text-[#E8E5D5]/40 font-mono">Comma-separated</span>
          </div>
          <Textarea
            id="skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="React, Next.js, TypeScript, PostgreSQL, Tailwind CSS, FastAPI..."
            required
            rows={3}
            className="bg-[#0c0c0f] border-white/[0.08] text-sm text-[#F4F1E8] placeholder:text-[#E8E5D5]/30 focus-visible:ring-1 focus-visible:ring-amber-400/30 focus-visible:border-amber-400/30 resize-none rounded-lg"
          />
        </div>

        {/* Submit Button & Status */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
          <p className="text-[11px] text-[#E8E5D5]/45">
            Generates a tailored project brief, technical milestones, and code review criteria.
          </p>

          <Button
            type="submit"
            disabled={isLoading || !skills.trim()}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#E8E5D5] text-black hover:bg-white text-xs sm:text-sm font-semibold transition-all duration-150 disabled:opacity-50 cursor-pointer shadow-sm group self-end sm:self-auto"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Forging Project...</span>
              </>
            ) : (
              <>
                <span>Forge My Project</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </Button>
        </div>
      </form>

      {/* Error feedback */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mt-4 p-3.5 rounded-lg bg-red-950/40 border border-red-500/20 text-red-300 text-xs flex items-center gap-2.5"
          >
            <AlertCircle className="h-4 w-4 flex-shrink-0 text-red-400" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instant Generation Preview */}
      <AnimatePresence>
        {generatedBrief && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 p-4 rounded-lg bg-white/[0.03] border border-amber-400/20 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" /> Project Generated Successfully!
              </span>
              <span className="text-[11px] text-[#E8E5D5]/50 font-mono">Redirecting to workspace...</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#F4F1E8]">{generatedBrief.title}</h4>
              <p className="text-xs text-[#E8E5D5]/60 mt-1 line-clamp-2">{generatedBrief.description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}