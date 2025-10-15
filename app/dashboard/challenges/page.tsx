import { ChallengeGenerator } from "@/components/challenges/challenge-generator";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/drizzle/client";
import { userChallenges } from "@/lib/drizzle/schema";
import { eq } from "drizzle-orm";
import { getDailyChallenges } from "@/lib/actions/get-daily-challenges.action";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { acceptChallenge } from "@/lib/actions/accept-challenge.action";
import { Challenge } from "@/lib/types";

export const runtime = 'nodejs';

export default async function ChallengesPage() {
  const { userId } = await auth();
  if (!userId) return <div>Not authorized.</div>;

  // Fetch the 3 daily challenges from our new action
  const dailyChallenges = await getDailyChallenges();
  
  // Fetch ongoing challenges (this logic remains the same)
  const userProgress = await db.query.userChallenges.findMany({ where: eq(userChallenges.userId, userId) });
  const ongoingChallengeIds = userProgress.filter(p => p.status === 'in-progress').map(p => p.challengeId);
  const ongoingChallenges = await db.query.challenges.findMany({
    where: (challenges, { inArray }) => inArray(challenges.id, ongoingChallengeIds.length > 0 ? ongoingChallengeIds : [-1]),
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Challenges</h1>
        <p className="text-muted-foreground">
          Tackle your daily recommendations or generate a new challenge tailored to your interests.
        </p>
      </div>

      <ChallengeGenerator />

      {/* --- Section for Daily Recommended Challenges --- */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Today&apos;s Recommended Challenges</h2>
        {dailyChallenges.length === 0 ? (
          <p className="text-muted-foreground">Could not generate daily challenges. Please try again later.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dailyChallenges.map((challenge: Challenge) => (
              // NOTE: This uses a temporary card, as these challenges aren't in the DB yet
              <Card key={challenge.title} className="flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary">{challenge.category}</Badge>
                    <Badge variant="outline">{challenge.difficulty}</Badge>
                  </div>
                  <CardTitle>{challenge.title}</CardTitle>
                  <CardDescription className="line-clamp-2 pt-1">{challenge.description}</CardDescription>
                </CardHeader>
                <div className="mt-auto p-6 pt-0">
                  <form action={acceptChallenge.bind(null, challenge)}>
                  <Button type="submit" className="w-full hover:cursor-pointer">
                    Accept Challenge
                  </Button>
                </form>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* --- Section for Ongoing Challenges --- */}
      {ongoingChallenges.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Ongoing Challenges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ongoingChallenges.map((challenge) => (
              // We'll use a slightly different card for ongoing challenges
              <Link href={`/dashboard/challenges/${challenge.id}`} key={challenge.id}>
                <Card className="hover:border-primary transition-colors h-full flex flex-col">
                  <CardHeader>
                    <CardTitle>{challenge.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{challenge.description}</CardDescription>
                  </CardHeader>
                  <div className="mt-auto p-6 pt-0">
                    <Button className="w-full hover:cursor-pointer">Resume Challenge</Button>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}