import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { projects } from "@/lib/drizzle/schema";
import { InferSelectModel } from "drizzle-orm";
import { CheckCircle2, XCircle, Github } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

// Define the shape of the feedback object
type Feedback = {
  overall: string;
  strengths: string[];
  areasForImprovement: string[];
};

// Get the TypeScript type for a project object from our Drizzle schema
type Project = InferSelectModel<typeof projects>;

export function PortfolioProjectCard({ project }: { project: Project }) {
  const feedback = project.feedback as Feedback | null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="font-semibold mb-3 text-sm">AI Feedback</h4>
          <div className="p-4 rounded-lg bg-muted/50 space-y-4">
            <div>
              <h5 className="font-semibold mb-2 text-xs text-muted-foreground">Overall Assessment</h5>
              <p className="text-sm">{feedback?.overall}</p>
            </div>
            <div>
              <h5 className="font-semibold mb-2 text-xs text-muted-foreground">Strengths</h5>
              <ul className="space-y-2">
                {feedback?.strengths.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-2 text-xs text-muted-foreground">Areas for Improvement</h5>
              <ul className="space-y-2">
                {feedback?.areasForImprovement.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <XCircle className="h-4 w-4 mt-0.5 text-amber-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
      {project.repoUrl && (
        <CardFooter>
          <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm">
              <Github className="mr-2 h-4 w-4" />
              View on GitHub
            </Button>
          </Link>
        </CardFooter>
      )}
    </Card>
  );
}