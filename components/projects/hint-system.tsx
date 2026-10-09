"use client";

import { useState } from "react";
import { Lightbulb, Loader2, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface HintSystemProps {
  projectTitle: string;
  projectDescription: string;
}

export function HintSystem({ projectTitle, projectDescription }: HintSystemProps) {
  const [hint, setHint] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleGetHint = async () => {
    if (hint) return; // already loaded
    setIsLoading(true);
    setHint("");

    try {
      const response = await fetch("/api/ai/generate-hint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectTitle, projectDescription }),
      });

      if (response.ok) {
        const data = await response.json();
        setHint(data.hint || "Try breaking the current milestone into smaller component tasks.");
      } else {
        setHint("Start by setting up the core data models and basic routes before building the client interface.");
      }
    } catch {
      setHint("Focus on completing the next unchecked milestone step-by-step.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (isOpen && !hint) {
          handleGetHint();
        }
      }}
    >
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[#E8E5D5]/80 hover:text-[#F4F1E8] hover:bg-white/[0.08] hover:border-white/[0.16] text-xs font-medium transition-all cursor-pointer shadow-sm"
        >
          <Lightbulb className="h-3.5 w-3.5 text-amber-300" />
          <span>Get a Hint</span>
        </button>
      </DialogTrigger>

      <DialogContent className="bg-[#121216] border border-white/[0.12] text-[#F4F1E8] sm:max-w-md p-5 sm:p-6 rounded-xl shadow-2xl">
        <DialogHeader className="space-y-1">
          <div className="flex items-center gap-2 text-amber-300 mb-1">
            <span className="p-1 rounded bg-amber-400/10 border border-amber-400/20">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            <DialogTitle className="text-base font-bold text-[#F4F1E8]">Architectural Hint</DialogTitle>
          </div>
          <DialogDescription className="text-xs text-[#E8E5D5]/60">
            A targeted suggestion from SkillForge to help you make progress without giving away the full solution.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 p-4 rounded-lg bg-white/[0.03] border border-white/[0.08] min-h-[90px] flex items-center justify-center">
          {isLoading ? (
            <div className="flex items-center gap-2 text-xs text-[#E8E5D5]/60">
              <Loader2 className="h-4 w-4 animate-spin text-amber-300" />
              <span>Analyzing project context...</span>
            </div>
          ) : (
            <p className="text-xs sm:text-sm text-[#F4F1E8]/90 leading-relaxed font-sans">
              {hint}
            </p>
          )}
        </div>

        <div className="flex justify-end pt-3">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="px-3.5 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-xs font-medium text-[#F4F1E8] transition-colors cursor-pointer"
          >
            Got it
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}