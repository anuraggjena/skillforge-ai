import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/drizzle/client";
import { eq, desc } from "drizzle-orm";
import { projects } from "@/lib/drizzle/schema";
import { ProjectGenerator } from "@/components/projects/project-generator";
import { ProjectsListClient } from "@/components/projects/projects-list-client";
import { ProjectCardData } from "@/components/projects/project-card";

export const runtime = "nodejs";

export default async function ProjectsPage() {
  const { userId } = await auth();
  if (!userId) {
    return <div>Not authorized.</div>;
  }

  // Fetch all projects for the current user including linked skills
  const rawProjects = await db.query.projects.findMany({
    where: eq(projects.userId, userId),
    orderBy: [desc(projects.createdAt)],
    with: {
      projectSkills: {
        with: {
          skill: true,
        },
      },
    },
  });

  // Map to strongly typed ProjectCardData
  const userProjects: ProjectCardData[] = rawProjects.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    status: p.status as "in-progress" | "completed",
    projectType: (p.projectType as "micro" | "real-world") || "real-world",
    milestones: p.milestones as ProjectCardData["milestones"],
    createdAt: p.createdAt,
    repoUrl: p.repoUrl,
    feedback: p.feedback,
    skills: p.projectSkills?.map((ps) => ({
      id: ps.skill.id,
      name: ps.skill.name,
    })) ?? [],
  }));

  return (
    <div className="space-y-6 sm:space-y-8 pb-10">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F4F1E8]">Projects</h1>
        <p className="text-xs sm:text-sm text-[#E8E5D5]/65">
          Build real projects. Gain real skills.
        </p>
      </div>

      {/* Project Generator Section */}
      <ProjectGenerator />

      {/* Interactive Projects List */}
      <ProjectsListClient projects={userProjects} />
    </div>
  );
}