"use server";

import { db } from "@/lib/drizzle/client";
import { challenges, userChallenges, users } from "@/lib/drizzle/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { fetchRepoContent } from "./github.actions";

export async function startChallenge(challengeId: number) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const existing = await db.query.userChallenges.findFirst({
    where: and(
      eq(userChallenges.userId, userId),
      eq(userChallenges.challengeId, challengeId)
    )
  });

  if (existing) {
    await db.update(userChallenges)
      .set({ status: 'in-progress', startedAt: new Date() })
      .where(and(
        eq(userChallenges.userId, userId),
        eq(userChallenges.challengeId, challengeId)
      ));
  } else {
    await db.insert(userChallenges).values({
      userId: userId,
      challengeId: challengeId,
      status: 'in-progress',
      startedAt: new Date(),
    });
  }

  revalidatePath(`/dashboard/challenges/${challengeId}`);
}

export async function submitChallengeSolution(challengeId: number, formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const repoUrl = formData.get("repoUrl") as string;
  if (!repoUrl) throw new Error("Repository URL is required.");

  // 2. Call the function to fetch code. This will throw an error if not connected.
  await fetchRepoContent(repoUrl);

  const challenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId),
  });

  if (!challenge) throw new Error("Challenge not found.");

  // 3. Update status and award XP
  await db.update(userChallenges)
    .set({ status: 'completed', completedAt: new Date() })
    .where(and(
      eq(userChallenges.userId, userId),
      eq(userChallenges.challengeId, challengeId)
    ));

  await db.update(users)
    .set({ xp: sql`${users.xp} + ${challenge.xp}` })
    .where(eq(users.id, userId));
  
  revalidatePath(`/dashboard/challenges/${challengeId}`);
}
