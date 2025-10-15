"use server";

import { db } from "@/lib/drizzle/client";
import { projects, users } from "@/lib/drizzle/schema"; // Import 'users' schema
import { eq, sql } from "drizzle-orm"; // Import 'sql' helper
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import OpenAI from 'openai';
import { Milestone } from "../types";
import { fetchRepoContent } from './github.actions';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function updateMilestones(projectId: number, updatedMilestones: Milestone[]) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    const originalProject = await db.query.projects.findFirst({
      where: eq(projects.id, projectId),
    });

    // --- GAMIFICATION LOGIC ---
    // Check if a new milestone was completed to award XP
    const originalCompletedCount = 
      (originalProject?.milestones as { items: Milestone[] })?.items.filter(m => m.completed).length ?? 0;
    const newCompletedCount = updatedMilestones.filter(m => m.completed).length;

    if (newCompletedCount > originalCompletedCount) {
      const xpGained = (newCompletedCount - originalCompletedCount) * 10; // Award 10 XP per milestone
      await db.update(users)
        .set({ xp: sql`${users.xp} + ${xpGained}` })
        .where(eq(users.id, userId));
    }
    // --- END GAMIFICATION LOGIC ---

    await db.update(projects)
      .set({ milestones: { items: updatedMilestones } })
      .where(eq(projects.id, projectId));
    
    revalidatePath(`/dashboard/projects/${projectId}`);
    return { success: true };
  } catch (error) {
    console.error("Failed to update milestones:", error);
    return { success: false };
  }
}

export async function submitProjectForFeedback(projectId: number, repoUrl: string) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  let codeContent = '';
  try {
    codeContent = await fetchRepoContent(repoUrl);
  } catch (error) {
    console.error(error);
    throw new Error("Could not access the GitHub repository. Please ensure it's public and you've connected your GitHub account.");
  }

  const project = await db.query.projects.findFirst({
    where: eq(projects.id, projectId),
  });

  if (!project || project.userId !== userId) {
    throw new Error("Project not found");
  }

  const prompt = `
    You are SkillForge AI, a senior developer and expert code reviewer. Your task is to provide feedback on a user's project submission.

    Project Title: ${project.title}
    Project Description: ${project.description}

    Here is the content of the user's submitted files:
    ---
    ${codeContent}
    ---

    Please provide a detailed, constructive code review based on the actual code provided.
    Focus on correctness, code quality, and best practices. Then, on a scale of 1 (Beginner) to 5 (Expert), rate the overall quality, completeness, and correctness of the user's submission based on the project's goals.

    Structure your feedback as a JSON object with the following keys:
    {
      "overall": "A brief, one-paragraph summary of the feedback.",
      "strengths": [
        "A list of 2-3 potential strengths or things the user likely did well.",
        "For example: 'Good use of component-based architecture.' or 'Clear and well-structured README file.'"
      ],
      "areasForImprovement": [
        "A list of 2-3 actionable areas for improvement.",
        "For example: 'Consider adding error handling for API calls.' or 'The CSS could be further optimized by using utility classes.'"
      ]
    }
      "score": 3 // A single integer from 1 to 5
    }

    Ensure your entire response is only the JSON object, with no extra text or markdown.
  `;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' },
  });

  const responseData = JSON.parse(response.choices[0].message.content ?? '{}');
  const feedbackJson = responseData.review;
  const score = responseData.score;

  const ratingAdjustment = (score - 3) * 10;

  await db.update(users)
    .set({ 
      xp: sql`${users.xp} + 50`,
      // Use sql function to update relative to the current value
      performanceRating: sql`LEAST(100, GREATEST(0, ${users.performanceRating} + ${ratingAdjustment}))`
    })
    .where(eq(users.id, userId!));

  await db.update(projects)
    .set({
      repoUrl: repoUrl,
      feedback: feedbackJson,
      status: 'completed',
    })
    .where(eq(projects.id, projectId));
  
  // --- GAMIFICATION LOGIC ---
  // Award 50 XP for completing a project
  await db.update(users)
    .set({ xp: sql`${users.xp} + 50` })
    .where(eq(users.id, userId));
  // --- END GAMIFICATION LOGIC ---

  revalidatePath(`/dashboard/projects/${projectId}`);

  return { success: true, feedback: feedbackJson };
}