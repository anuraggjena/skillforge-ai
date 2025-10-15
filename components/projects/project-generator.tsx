"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

type ProjectBrief = {
  title: string;
  description: string;
  milestones: string[];
};

export function ProjectGenerator() {
  const [skills, setSkills] = useState("");
  const [projectType, setProjectType] = useState<'micro' | 'real-world'>('real-world');
  const [projectBrief, setProjectBrief] = useState<ProjectBrief | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setProjectBrief(null);
    setError(null);

    try {
      const response = await fetch('/api/ai/generate-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skills, projectType }), // Send projectType to the API
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data: ProjectBrief = await response.json();
      setProjectBrief(data);

    } catch (err) {
      setError((err as Error).message || "Failed to generate project. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create a New Project</CardTitle>
          <CardDescription>
            Choose your project type, tell us your skills, and our AI will generate a tailored project for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label className="block text-sm font-medium mb-3">Project Type</Label>
              <RadioGroup
                defaultValue="real-world"
                value={projectType}
                onValueChange={(value: 'micro' | 'real-world') => setProjectType(value)}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="real-world" id="r1" />
                  <Label htmlFor="r1">Real-World Project</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="micro" id="r2" />
                  <Label htmlFor="r2">Micro-Project</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="skills" className="block text-sm font-medium mb-2">
                Your Skills (e.g., React, Next.js, TypeScript, Tailwind CSS)
              </Label>
              <Textarea
                id="skills"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="Enter your skills, separated by commas..."
                required
                className="min-h-[100px]"
              />
            </div>
            <Button type="submit" className='hover:cursor-pointer' disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Generating..." : "Forge My Project"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {error && (
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">An Error Occurred</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
        </Card>
      )}

      {projectBrief && (
        <Card>
          <CardHeader>
            <CardTitle>{projectBrief.title}</CardTitle>
            <CardDescription>{projectBrief.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="font-semibold mb-2">Project Milestones:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              {projectBrief.milestones.map((milestone, index) => (
                <li key={index}>{milestone}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}