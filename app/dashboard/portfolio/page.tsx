import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/drizzle/client";
import { users, projects, userChallenges } from "@/lib/drizzle/schema";
import { and, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSkillData } from "@/lib/actions/user.actions";
import { SkillGraph } from "@/components/dashboard/skill-graph";
import { PortfolioProjectCard } from "@/components/portfolio/project-card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { JourneyTimeline, TimelineEvent } from "@/components/portfolio/journey-timeline";
import Link from "next/link";
import { ShareButton } from "@/components/portfolio/share-button";

export const runtime = 'nodejs';

export default async function PortfolioPage() {
  const { userId } = await auth();
  if (!userId) return notFound();

  // Fetch all necessary data for the portfolio
  const [user, skillData, completedProjects, completedChallenges] = await Promise.all([
    db.query.users.findFirst({ where: eq(users.id, userId) }),
    getSkillData(),
    db.query.projects.findMany({
      where: and(eq(projects.userId, userId), eq(projects.status, 'completed')),
    }),
    db.query.challenges.findMany({
      with: {
        userChallenges: { where: and(eq(userChallenges.userId, userId), eq(userChallenges.status, 'completed')) }
      }
    })
  ]);

  if (!user) return notFound();

  const timelineEvents: TimelineEvent[] = [];

  if (user.createdAt) {
    timelineEvents.push({
      date: user.createdAt,
      title: "Joined SkillForge",
      description: "Started the learning journey.",
      type: 'joined',
    });
  }

  completedProjects.forEach(project => {
    timelineEvents.push({
      date: project.createdAt, // Or a completed_at field if you add one
      title: "Project Completed",
      description: project.title,
      type: 'project',
    });
  });

  // Filter challenges to only include those the user has completed
  const userCompletedChallenges = completedChallenges.filter(c => c.userChallenges.length > 0);

  userCompletedChallenges.forEach(challenge => {
    const userChallenge = challenge.userChallenges[0];
    if (userChallenge.completedAt) {
      timelineEvents.push({
        date: userChallenge.completedAt,
        title: "Challenge Conquered",
        description: challenge.title,
        type: 'challenge',
      });
    }
  });

  return (
    <div className="space-y-8">
      {/* 1. Profile Header */}
      <Card>
        <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-6">
          <Avatar className="h-24 w-24 border">
            <AvatarImage src={user.avatarUrl ?? ''} alt={user.name ?? ''} />
            <AvatarFallback>{user.name?.charAt(0) ?? 'U'}</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-lg text-muted-foreground">{user.headline ?? "AI & Web Development Enthusiast"}</p>
            <p className="text-sm mt-2 max-w-xl">{user.bio ?? "Building practical skills with AI-powered projects on SkillForge."}</p>
          </div>
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mr-2">
            <ShareButton username={user.username} />
            
            {/* It only renders if a resumeUrl exists */}
            {user.resumeUrl && (
              <Link href={user.resumeUrl} target="_blank" rel="noopener noreferrer">
                <Button className="hover:cursor-pointer">
                  <FileText className="mr-2 h-4 w-4" /> Show Resume
                </Button>
              </Link>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* 4. Projects & Challenges Section */}
          <Card>
            <CardHeader><CardTitle>Completed Projects & Challenges</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              {completedProjects.length === 0 && userCompletedChallenges.length === 0 ? (
                <p className="text-sm text-muted-foreground">No completed work yet. Finish a project or challenge to showcase it here!</p>
              ) : (
                <>
                  {completedProjects.map((project) => (
                    <PortfolioProjectCard key={`proj-${project.id}`} project={project} />
                  ))}
                  {/* We can create a dedicated ChallengePortfolioCard later for more detail */}
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

          {/* 5. Learning Journey Timeline */}
          <JourneyTimeline events={timelineEvents} />
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* 2. Skill Overview */}
          <Card>
            <CardHeader><CardTitle>Skill Overview</CardTitle></CardHeader>
            <CardContent>
              <SkillGraph data={skillData} />
            </CardContent>
          </Card>
          
          {/* 3. Achievements (Placeholder) */}
          <Card>
            <CardHeader><CardTitle>Achievements</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Badges coming soon!</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}