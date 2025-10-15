import { db } from "@/lib/drizzle/client";
import { challenges, userChallenges } from "@/lib/drizzle/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { startChallenge } from "@/lib/actions/challenge.actions";
import { Clock, Star, Trophy, CheckCircle, ArrowRight } from "lucide-react";
import { ChallengeSubmissionForm } from "@/components/challenges/challenge-submission-form";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type ChallengePageProps = {
  params: Promise<{ challengeId: string }>;
};

export default async function ChallengeDetailPage({ params }: ChallengePageProps) {
  const { challengeId } = await params;

  const { userId } = await auth();
  if (!userId) return notFound();

  const id = parseInt(challengeId, 10);
  if (isNaN(id)) return notFound();

  const challenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, id),
  });

  if (!challenge) return notFound();

  const userChallenge = await db.query.userChallenges.findFirst({
    where: and(
      eq(userChallenges.userId, userId),
      eq(userChallenges.challengeId, id)
    ),
  });

  const status = userChallenge?.status ?? "not-started";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column: Challenge Details */}
      <div className="lg:col-span-2 space-y-6">
        <div className="space-y-2">
          <Badge variant="secondary">{challenge.category}</Badge>
          <h1 className="text-4xl font-bold tracking-tight mt-2">
            {challenge.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pt-2">
            <div className="flex items-center gap-1.5">
              <Trophy className="h-4 w-4" /> {challenge.difficulty}
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 text-yellow-500" /> {challenge.xp} XP
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" /> {challenge.estimatedTime}
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Challenge Brief</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <p>{challenge.description}</p>
          </CardContent>
        </Card>
      </div>

      {/* Right Column: Status Card */}
      <div>
        <Card className="sticky top-20">
          {status === "not-started" && (
            <>
              <CardHeader>
                <CardTitle>Ready to Begin?</CardTitle>
                <CardDescription>
                  Start the challenge to track your progress.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form action={startChallenge.bind(null, challenge.id)}>
                  <Button size="lg" type="submit" className="w-full">
                    Start Challenge <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </>
          )}

          {status === "in-progress" && (
            <>
              <CardHeader>
                <CardTitle>Submit Your Solution</CardTitle>
                <CardDescription>
                  Paste your GitHub repository link to complete the challenge.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChallengeSubmissionForm challengeId={challenge.id} />
              </CardContent>
            </>
          )}

          {status === "completed" && (
            <div className="p-6 flex flex-col items-center justify-center text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
              <h3 className="font-semibold text-lg">Challenge Completed!</h3>
              <p className="text-sm text-muted-foreground mt-1">
                You earned {challenge.xp} XP.
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
