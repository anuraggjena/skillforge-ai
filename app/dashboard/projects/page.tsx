import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/drizzle/client";
import { eq } from "drizzle-orm";
import { projects } from "@/lib/drizzle/schema";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default async function ProjectsPage() {
  const { userId } = await auth();
  if (!userId) {
    return <div>Not authorized.</div>;
  }

  // Fetch all projects for the current user from the database
  const userProjects = await db.query.projects.findMany({
    where: eq(projects.userId, userId),
    orderBy: (projects, { desc }) => [desc(projects.createdAt)],
  });

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">My Projects</h1>
        <p className="text-muted-foreground">Here is a list of all your generated projects.</p>
      </div>

      {userProjects.length === 0 ? (
        <p className="text-muted-foreground">You haven&apos;t generated any projects yet. Go to the dashboard to create one!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userProjects.map((project) => {

            const href = `/dashboard/projects/${project.id}`; 
            console.log(`Generating link for Project ID: ${project.id}, Href: ${href}`);
            return (
            <Link href={href} key={project.id}>
              <Card className="hover:border-primary transition-colors h-full">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <Badge variant={project.projectType === 'micro' ? 'default' : 'secondary'}>
                      {project.projectType}
                    </Badge>
                  </div>
                  <CardDescription className="pt-2 line-clamp-3">
                    {project.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
            )
          })}
        </div>
      )}
    </div>
  );
}