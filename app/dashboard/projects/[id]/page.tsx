import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/drizzle/client";
import { projects } from "@/lib/drizzle/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { checkGitHubConnected } from "@/lib/dashboard-data";
import { ProjectWorkspace } from "@/components/projects/project-workspace";
import { Milestone } from "@/lib/types";

export const runtime = "nodejs";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { userId } = await auth();
  if (!userId) {
    return notFound();
  }

  const projectId = parseInt(id, 10);
  if (isNaN(projectId)) {
    return notFound();
  }

  // Fetch project with linked skills and check GitHub connection in parallel
  const [project, githubConnected] = await Promise.all([
    db.query.projects.findFirst({
      where: eq(projects.id, projectId),
      with: {
        projectSkills: {
          with: {
            skill: true,
          },
        },
      },
    }),
    checkGitHubConnected(userId),
  ]);

  if (!project || project.userId !== userId) {
    return notFound();
  }

  const formattedProject = {
    id: project.id,
    title: project.title,
    description: project.description,
    status: project.status as "in-progress" | "completed",
    projectType: (project.projectType as "micro" | "real-world") || "real-world",
    milestones: project.milestones as { items: Milestone[] } | null,
    repoUrl: project.repoUrl,
    feedback: project.feedback,
    createdAt: project.createdAt,
    skills:
      project.projectSkills?.map((ps) => ({
        id: ps.skill.id,
        name: ps.skill.name,
      })) ?? [],
  };

  return (
    <ProjectWorkspace
      project={formattedProject}
      githubConnected={githubConnected}
    />
  );
}