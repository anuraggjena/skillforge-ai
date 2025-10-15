"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/drizzle/client";
import { users } from "@/lib/drizzle/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

interface UpdateProfileParams {
  name: string;
  headline: string;
  bio: string;
}

export async function updateUserProfile({ name, headline, bio }: UpdateProfileParams) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Update the user's record in the database
  await db.update(users)
    .set({
      headline: headline,
      bio: bio,
      name: name,
    })
    .where(eq(users.id, userId));

  // Revalidate the portfolio path to ensure it shows the new data
  revalidatePath('/dashboard/portfolio');
}