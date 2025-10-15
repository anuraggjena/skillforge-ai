import { db } from "@/lib/drizzle/client";
import { users, projects, userChallenges, skills, challengeSkills, challenges } from "@/lib/drizzle/schema";
import { and, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSkillDataForUser } from "@/lib/actions/user.actions";
import { SkillGraph } from "@/components/dashboard/skill-graph";
import { PortfolioProjectCard } from "@/components/portfolio/project-card";
import { JourneyTimeline, TimelineEvent } from "@/components/portfolio/journey-timeline";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import Link from "next/link";
import { InferSelectModel } from "drizzle-orm";

type CompletedChallenge = InferSelectModel<typeof challenges> & {
  userChallenges: InferSelectModel<typeof userChallenges>[];
  challengeSkills: (InferSelectModel<typeof challengeSkills> & {
    skill: InferSelectModel<typeof skills>;
  })[];
};

type ChallengeWithProgress = { userChallenges: { length: number } };

export const runtime = 'nodejs';

export default async function PublicPortfolioPage({
  params,
}: {
  params: Promise<{ username: string }>; // ✅ Fix for Next.js 15
}) {
  const { username } = await params; // ✅ Must await params in Next.js 15

  // 1. Fetch the user by their unique username first
  const user = await db.query.users.findFirst({
    where: eq(users.username, username),
  });

  // 2. If no user is found OR their portfolio isn't public, show a 404 page
  if (!user || !user.isPublic) {
    return notFound();
  }

  // 3. Fetch all their data in parallel
  const [skillData, completedProjects, completedChallengesData] = await Promise.all([
    getSkillDataForUser(user.id),
    db.query.projects.findMany({
      where: and(eq(projects.userId, user.id), eq(projects.status, "completed")),
    }),
    db.query.challenges.findMany({
      with: {
        userChallenges: {
          where: and(eq(userChallenges.userId, user.id), eq(userChallenges.status, "completed")),
        },
        challengeSkills: { with: { skill: true } },
      },
    }),
  ]);

  const userCompletedChallenges = completedChallengesData.filter(
    (c: ChallengeWithProgress) => c.userChallenges.length > 0
  );

  const timelineEvents: TimelineEvent[] = [];
  if (user.createdAt) {
    timelineEvents.push({
      date: user.createdAt,
      title: "Joined SkillForge",
      description: "Started the learning journey.",
      type: "joined",
    });
  }

  completedProjects.forEach((project) => {
    timelineEvents.push({
      date: project.createdAt,
      title: "Project Completed",
      description: project.title,
      type: "project",
    });
  });

  userCompletedChallenges.forEach((challenge: CompletedChallenge) => {
    const userChallenge = challenge.userChallenges[0];
    if (userChallenge.completedAt) {
      timelineEvents.push({
        date: userChallenge.completedAt,
        title: "Challenge Conquered",
        description: challenge.title,
        type: "challenge",
      });
    }
  });

  return (
    <div className="container mx-auto max-w-5xl py-12 px-4">
      <div className="space-y-8">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-6">
            <Avatar className="h-24 w-24 border">
              <AvatarImage src={user.avatarUrl ?? ""} />
              <AvatarFallback>{user.name?.charAt(0) ?? "U"}</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="text-lg text-muted-foreground">
                {user.headline ?? "AI & Web Development Enthusiast"}
              </p>
            </div>
            {user.resumeUrl && (
              <Link href={user.resumeUrl} target="_blank" rel="noopener noreferrer">
                <Button>
                  <FileText className="mr-2 h-4 w-4" /> Show Resume
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Completed Projects & Challenges</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {completedProjects.length === 0 && userCompletedChallenges.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No completed work yet. Finish a project or challenge to showcase it here!
                  </p>
                ) : (
                  <>
                    {completedProjects.map((project) => (
                      <PortfolioProjectCard key={`proj-${project.id}`} project={project} />
                    ))}
                    {userCompletedChallenges.map((challenge) => (
                      <div key={`chal-${challenge.id}`} className="p-4 border rounded-lg">
                        <h4 className="font-semibold">{challenge.title}</h4>
                        <p className="text-sm text-muted-foreground">{challenge.description}</p>
                      </div>
                    ))}
                  </>
                )}
              </CardContent>
            </Card>

            <JourneyTimeline events={timelineEvents} />
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Skill Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <SkillGraph data={skillData} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
