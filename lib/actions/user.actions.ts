"use server";

import { db } from "@/lib/drizzle/client";
import { users, projects, skills, projectSkills } from "@/lib/drizzle/schema";
import { eq, and, count } from "drizzle-orm";
import { clerkClient, auth } from "@clerk/nextjs/server";

// Keep these helper functions
export async function getUserById(userId: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });
  return user;
}

export async function createUserInDb(userId: string) {
  try {
    const clerk = await clerkClient()
    const clerkUser = await clerk.users.getUser(userId);
    const email = clerkUser.emailAddresses[0]?.emailAddress ?? '';
    const name = `${clerkUser.firstName ?? ''} ${clerkUser.lastName ?? ''}`.trim();
    const avatar = clerkUser.imageUrl;

    const newUser = await db.insert(users).values({
      id: userId,
      email: email,
      name: name,
      avatarUrl: avatar,
    }).returning();
    
    return newUser[0];
  } catch (error) {
    console.error("Error creating user in DB:", error);
    return null;
  }
}

export async function getSkillData() {
  const { userId } = await auth();
  if (!userId) {
    return [];
  }

 const skillData = await db
    .select({
      name: skills.name,
      count: count(skills.id),
    })
    .from(projectSkills)
    .innerJoin(skills, eq(projectSkills.skillId, skills.id))
    .innerJoin(projects, eq(projectSkills.projectId, projects.id))
    .where(and(
      eq(projects.userId, userId),
      eq(projects.status, 'completed')
    ))
    .groupBy(skills.name)
    .orderBy(count(skills.id));
  
  return skillData;
}

export async function getSkillDataForUser(userId: string) {
  // This function is the same as getSkillData, but it accepts a userId
  // instead of getting it from auth(). This allows us to fetch public data.
  if (!userId) {
    return [];
  }

  const skillData = await db
    .select({
      name: skills.name,
      count: count(skills.id),
    })
    .from(projectSkills)
    .innerJoin(skills, eq(projectSkills.skillId, skills.id))
    .innerJoin(projects, eq(projectSkills.projectId, projects.id))
    .where(and(
      eq(projects.userId, userId),
      eq(projects.status, 'completed')
    ))
    .groupBy(skills.name)
    .orderBy(count(skills.id));
  
  return skillData;
}