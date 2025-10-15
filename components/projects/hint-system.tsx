"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Lightbulb, Loader2 } from "lucide-react";

interface HintSystemProps {
  projectTitle: string;
  projectDescription: string;
}

export function HintSystem({ projectTitle, projectDescription }: HintSystemProps) {
  const [hint, setHint] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGetHint = async () => {
    setIsLoading(true);
    setHint("");

    // TODO: We will create this API endpoint in the next step
    const response = await fetch('/api/ai/generate-hint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectTitle, projectDescription }),
    });

    if (response.ok) {
      const data = await response.json();
      setHint(data.hint);
    } else {
      setHint("Sorry, I couldn&apos;t generate a hint right now. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="hover:cursor-pointer">
          <Lightbulb className="mr-2 h-4 w-4" />
          Get a Hint
        </Button>
      </DialogTrigger>
      <DialogContent onOpenAutoFocus={handleGetHint}>
        <DialogHeader>
          <DialogTitle>Hint</DialogTitle>
          <DialogDescription>
            Here&apos;s a suggestion to help you move forward.
          </DialogDescription>
        </DialogHeader>
        <div className="min-h-[100px] p-4 rounded-md border bg-muted/50">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <p className="text-sm">{hint}</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}