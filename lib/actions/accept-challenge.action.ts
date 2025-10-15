"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/drizzle/client";
import { challenges, challengeSkills, skills, userChallenges } from "@/lib/drizzle/schema";
import { redirect } from "next/navigation";
import { inArray } from "drizzle-orm";

// Define the shape of the challenge data from the AI
interface ChallengeData {
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Expert";
  xp: number;
  category: string;
  estimatedTime: string;
  skillsUsed: string[];
}

export async function acceptChallenge(challengeData: ChallengeData) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  // 1. Save the new challenge to the 'challenges' table and get its ID
  const newChallenge = await db.insert(challenges)
    .values({
      title: challengeData.title,
      description: challengeData.description,
      difficulty: challengeData.difficulty,
      xp: challengeData.xp,
      category: challengeData.category,
      estimatedTime: challengeData.estimatedTime,
    })
    .returning({ id: challenges.id });

  const challengeId = newChallenge[0].id;

   if (challengeData.skillsUsed && challengeData.skillsUsed.length > 0) {
    // "Upsert" the skills: create them if they don't exist
    await db.insert(skills)
      .values(challengeData.skillsUsed.map((skill: string) => ({ name: skill })))
      .onConflictDoNothing();

      const fetchedSkills = await db.select().from(skills).where(inArray(skills.name, challengeData.skillsUsed));
    
    // Create the link in the join table
    if (fetchedSkills.length > 0) {
      await db.insert(challengeSkills).values(
        fetchedSkills.map(skill => ({
          challengeId: challengeId,
          skillId: skill.id,
        }))
      );
    }
  }

  // 2. Create an entry in 'userChallenges' to mark it as 'in-progress'
  await db.insert(userChallenges).values({
    userId: userId,
    challengeId: challengeId,
    status: 'in-progress',
    startedAt: new Date(),
  });

  // 3. Redirect the user to the challenge detail page
  redirect(`/dashboard/challenges/${challengeId}`);
}