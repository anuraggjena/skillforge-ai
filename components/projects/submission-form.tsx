"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // 1. Import useRouter
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { submitProjectForFeedback } from "@/lib/actions/project.actions";
import { toast } from "sonner";

export function SubmissionForm({ projectId }: { projectId: number }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); // 2. Initialize the router

  const clientAction = async (formData: FormData) => {
    setIsLoading(true);
    const repoUrl = formData.get("repoUrl") as string;
    
    try {
      // We wrap the server action in a try...catch block
      await submitProjectForFeedback(projectId, repoUrl);
      toast.success("AI feedback received!");
    } catch (error: unknown) {
      // 3. THIS IS THE FIX: Check for our specific error
      if (error instanceof Error) {
      if (error.message === "GITHUB_NOT_CONNECTED") {
        toast.error("GitHub account not connected.", {
          description: "Please connect your GitHub account to get a code review.",
          action: {
            label: "Connect",
            onClick: () => router.push('/dashboard/connect-github'),
          },
        });
      } else {
        toast.error("Failed to get feedback.", {
          description: error.message,
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
    <Card>
      <CardHeader>
        <CardTitle>Submit Your Project</CardTitle>
        <CardDescription>
          Paste your GitHub repository URL below to receive an AI code review.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={clientAction} className="space-y-4">
          <div className="space-y-4">
            <Label htmlFor="repoUrl">GitHub Repository URL</Label>
            <Input id="repoUrl" name="repoUrl" type="url" placeholder="https://github.com/user/repo" required />
          </div>
          <Button type="submit" disabled={isLoading} className="hover:cursor-pointer">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Get Feedback
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}