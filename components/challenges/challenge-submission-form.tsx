"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { submitChallengeSolution } from "@/lib/actions/challenge.actions";
import { toast } from "sonner";

export function ChallengeSubmissionForm({ challengeId }: { challengeId: number }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const clientAction = async (formData: FormData) => {
    setIsLoading(true);
    
    try {
      await submitChallengeSolution(challengeId, formData);
      toast.success("Challenge completed successfully!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message === "GITHUB_NOT_CONNECTED") {
          toast.error("GitHub account not connected.", {
            description: "Please connect your GitHub account to get a code review.",
            action: {
              label: "Connect",
              onClick: () => router.push('/dashboard/connect-github'),
            },
          });
        }
      } else {
        // Fallback for non-error exceptions
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
    };

  return (
    // The component now only returns the form itself
    <form action={clientAction} className="space-y-4">
      <div>
        <Input 
          id="repoUrl"
          name="repoUrl"
          type="url" 
          placeholder="https://github.com/user/repo"
          required 
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Complete Challenge & Claim XP
      </Button>
    </form>
  );
}