"use server";

import { db } from "@/lib/drizzle/client";
import { projects, users } from "@/lib/drizzle/schema";
import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import OpenAI from 'openai';
import { Milestone } from "../types";
import { fetchRepoContent } from './github.actions';

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "http://skillforge-dev.vercel.app",
    "X-Title": "Skillforge.dev",
  }
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

    if (!originalProject || originalProject.userId !== userId) {
      throw new Error("Project not found");
    }

    // --- GAMIFICATION LOGIC ---
    // Check if a new milestone was completed to award XP
    const originalCompletedCount = 
      (originalProject?.milestones as { items: Milestone[] } | null)?.items.filter(m => m.completed).length ?? 0;
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
    revalidatePath("/dashboard/projects");
    revalidatePath("/dashboard");
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
  } catch (error: unknown) {
    console.error("GitHub fetch error:", error);
    if (error instanceof Error && error.message === "GITHUB_NOT_CONNECTED") {
      throw new Error("GITHUB_NOT_CONNECTED");
    }
    throw new Error("Could not access the GitHub repository. Please ensure it is public and your GitHub account is connected.");
  }

  const project = await db.query.projects.findFirst({
    where: eq(projects.id, projectId),
  });

  if (!project || project.userId !== userId) {
    throw new Error("Project not found");
  }

  const prompt = `
    You are Skillforge.dev, a senior staff software engineer and expert code reviewer.
    Your task is to provide an in-depth code review on a user's project submission based on the actual repository code.

    Project Title: ${project.title}
    Project Description: ${project.description}

    Here is the content of the user's submitted repository files:
    ---
    ${codeContent}
    ---

    Please provide a constructive, actionable engineering review focusing on correctness, code architecture, security, performance, and best practices.
    Also, on a scale of 1 (Beginner) to 5 (Expert), rate the overall quality, completeness, and correctness of the user's codebase.

    Structure your feedback strictly as a JSON object with the following keys:
    {
      "overall": "A concise, 1-2 paragraph executive assessment of the codebase quality, architecture, and implementation.",
      "strengths": [
        "A list of 2-4 specific technical strengths observed in the code."
      ],
      "areasForImprovement": [
        "A list of 2-4 actionable, concrete recommendations for improvements."
      ],
      "score": 4
    }

    Ensure your entire response is only the JSON object, with no markdown code blocks or surrounding text.
  `;

  const response = await openai.chat.completions.create({
    model: 'qwen/qwen3.8-27b:free',
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' },
  });

  const rawContent = response.choices[0]?.message?.content ?? '{}';
  let responseData: {
    overall?: string;
    strengths?: string[];
    areasForImprovement?: string[];
    score?: number;
    review?: {
      overall?: string;
      strengths?: string[];
      areasForImprovement?: string[];
      score?: number;
    };
  } = {};

  try {
    responseData = JSON.parse(rawContent);
  } catch (parseErr) {
    console.error("Failed to parse review JSON:", parseErr);
  }

  const feedbackObj = responseData.review || responseData;
  const score = typeof feedbackObj.score === 'number' 
    ? feedbackObj.score 
    : (typeof responseData.score === 'number' ? responseData.score : 4);

  const feedbackJson = {
    overall: feedbackObj.overall || "AI code review completed successfully.",
    strengths: Array.isArray(feedbackObj.strengths) && feedbackObj.strengths.length > 0
      ? feedbackObj.strengths
      : ["Clean repository structure", "Modular code organization"],
    areasForImprovement: Array.isArray(feedbackObj.areasForImprovement) && feedbackObj.areasForImprovement.length > 0
      ? feedbackObj.areasForImprovement
      : ["Expand automated test coverage", "Add comprehensive error handling"],
    score: score,
  };

  const ratingAdjustment = (score - 3) * 10;

  // Update user XP (+50 XP for completing project review) and adjust performance rating
  await db.update(users)
    .set({ 
      xp: sql`${users.xp} + 50`,
      performanceRating: sql`LEAST(100, GREATEST(0, ${users.performanceRating} + ${ratingAdjustment}))`
    })
    .where(eq(users.id, userId));

  // Update project status to completed, store repository URL and feedback JSON
  await db.update(projects)
    .set({
      repoUrl: repoUrl,
      feedback: feedbackJson,
      status: 'completed',
    })
    .where(eq(projects.id, projectId));

  revalidatePath(`/dashboard/projects/${projectId}`);
  revalidatePath("/dashboard/projects");
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/portfolio");

  return { success: true, feedback: feedbackJson };
}