"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { db } from "@/lib/drizzle/client";
import { users } from "@/lib/drizzle/schema";
import { eq, and, ne, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// This action accepts FormData, which is what we need
export async function updateUserProfile(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // It reads 'name', 'headline', and 'bio' from the form
  const name = formData.get("name") as string;
  const headline = formData.get("headline") as string;
  const bio = formData.get("bio") as string;

  const [firstName, ...lastNameParts] = name.split(' ');
  const lastName = lastNameParts.join(' ');
  
  // It updates both Clerk and your database
  await Promise.all([
    (await clerkClient()).users.updateUser(userId, { firstName, lastName }),
    db.update(users).set({ name, headline, bio }).where(eq(users.id, userId))
  ]);

  revalidatePath('/dashboard/settings');
  revalidatePath('/dashboard/portfolio');
}

export async function updateUserFileUrl({ fileType, url }: { fileType: 'avatar' | 'resume', url: string }) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    if (fileType === 'avatar') {
        await db.update(users).set({ avatarUrl: url }).where(eq(users.id, userId));
    } else if (fileType === 'resume') {
        await db.update(users).set({ resumeUrl: url }).where(eq(users.id, userId));
    }

    revalidatePath('/dashboard/settings');
    revalidatePath('/dashboard/portfolio');
}

export async function updateUserVisibility(formData: FormData) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const rawUsername = formData.get("username") as string;
  const isPublic = formData.get("isPublic") === "on"; // The value from a checked Switch is "on"

  const username = rawUsername ? rawUsername.trim().toLowerCase() : null;

  if (username) {
    // Check if taken by another user
    const existing = await db.query.users.findFirst({
      where: and(
        sql`lower(${users.username}) = ${username}`,
        ne(users.id, userId)
      ),
    });

    if (existing) {
      throw new Error("Username already taken. Please choose another username.");
    }
  }
  
  await db.update(users)
    .set({ username, isPublic })
    .where(eq(users.id, userId));
  
  // Revalidate paths to show the new data
  revalidatePath('/dashboard/settings');
  revalidatePath('/dashboard/portfolio');
}

export async function getUserProfileData() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  if (!user) {
    throw new Error("User not found in database.");
  }

  // Return only the data the client needs
  return {
    name: user.name,
    headline: user.headline,
    bio: user.bio,
    username: user.username,
    isPublic: user.isPublic,
  };
}