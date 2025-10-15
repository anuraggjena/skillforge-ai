import { currentUser } from "@clerk/nextjs/server";
import { ProjectGenerator } from "@/components/projects/project-generator";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SkillGraph } from "@/components/dashboard/skill-graph";
import { getSkillData } from "@/lib/actions/user.actions";

export default async function DashboardPage() {
  const user = await currentUser();
  const skillData = await getSkillData();

  // This check is a failsafe; middleware should handle unauthenticated users.
  if (!user) {
    return <div>You are not logged in.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Welcome back, {user.firstName}!</h1>
        <p className="text-muted-foreground">Here&apos;s your skill-building command center. What will you forge today?</p>
      </div>
      
      {/* This component contains the form to generate a new project */}
      <ProjectGenerator />

      {/* Placeholder for the Skill Graph which we will build next */}
      <Card>
        <CardHeader>
          <CardTitle>Your Skill Graph</CardTitle>
          <CardDescription>
            This graph visualizes the skills you&apos;ve used in completed projects.
          </CardDescription>
        </CardHeader>
        <SkillGraph data={skillData}/>
      </Card>
    </div>
  );
}