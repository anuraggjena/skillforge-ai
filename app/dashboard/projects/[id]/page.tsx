import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/drizzle/client";
import { projects } from "@/lib/drizzle/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { MilestoneTracker } from "@/components/projects/milestone-tracker";
import { SubmissionForm } from "@/components/projects/submission-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";
import { HintSystem } from "@/components/projects/hint-system";
import { Milestone } from "@/lib/types";

type Feedback = {
  overall: string;
  strengths: string[];
  areasForImprovement: string[];
};

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { userId } = await auth();
  if (!userId) {
    return notFound();
  }

  const projectId = parseInt(id, 10);

  if (isNaN(projectId)) {
    return notFound();
  }

  const project = await db.query.projects.findFirst({
    where: eq(projects.id, projectId),
  });

  if (!project || project.userId !== userId) {
    return notFound();
  }

  const feedback = project.feedback as Feedback | null;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{project.title}</h1>
          <p className="text-muted-foreground max-w-2xl">{project.description}</p>
        </div>
        <HintSystem 
          projectTitle={project.title} 
          projectDescription={project.description} 
        />
      </div>

      <MilestoneTracker 
        projectId={project.id} 
        initialMilestones={project.milestones as { items: Milestone[] }} 
      />
      
      {project.status === 'in-progress' ? (
        <SubmissionForm projectId={project.id} />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>AI Feedback Received</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Overall Assessment</h3>
              <p className="text-sm text-muted-foreground">{feedback?.overall}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Strengths</h3>
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
              <h3 className="font-semibold mb-2">Areas for Improvement</h3>
              <ul className="space-y-2">
                {feedback?.areasForImprovement.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <XCircle className="h-4 w-4 mt-0.5 text-amber-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}