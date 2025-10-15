"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/drizzle/client";
import { skills, projectSkills, projects } from "@/lib/drizzle/schema";
import { and, eq, count, desc } from "drizzle-orm";
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function getDailyChallenges() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // 1. Find the user's top 3 most-used skills from completed projects
  const topSkills = await db
    .select({ name: skills.name })
    .from(projectSkills)
    .innerJoin(skills, eq(projectSkills.skillId, skills.id))
    .innerJoin(projects, eq(projectSkills.projectId, projects.id))
    .where(and(eq(projects.userId, userId), eq(projects.status, "completed")))
    .groupBy(skills.name)
    .orderBy(desc(count(skills.id)))
    .limit(3);

  const skillList = topSkills.length > 0 ? topSkills.map(s => s.name).join(', ') : "React, Next.js, TypeScript";

  // 2. Ask the AI to generate 3 challenges based on these skills
  const prompt = `
    You are SkillForge AI. Generate a list of exactly 3 unique, short, and engaging coding challenges for a user based on their top skills.
    The user's top skills are: ${skillList}.
    The challenges should vary in difficulty (Beginner, Intermediate).

    Return your response as a JSON object containing a single key "challenges", which is an array of 3 challenge objects. Do NOT include any other text or markdown.
    Each challenge object must have the following structure:
    {
      "title": "A short, engaging title",
      "description": "A one-sentence summary of the task.",
      "difficulty": "Beginner" or "Intermediate",
      "xp": 50 (for Beginner) or 150 (for Intermediate),
      "category": "e.g., Web Dev, AI"
    }
  `;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' },
  });

  const aiResponse = JSON.parse(response.choices[0].message.content ?? '{}');
  return aiResponse.challenges || [];
}