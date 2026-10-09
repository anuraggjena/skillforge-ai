"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/drizzle/client";
import { skills, projectSkills, projects } from "@/lib/drizzle/schema";
import { and, eq, count, desc } from "drizzle-orm";
import OpenAI from 'openai';
import { Challenge } from "@/lib/types";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "http://skillforge-dev.vercel.app",
    "X-Title": "Skillforge.dev",
  }
});

const FALLBACK_MODELS = [
  'qwen/qwen3.8-27b:free',
  'nex-agi/nex-n2.5-mini:free',
  'openrouter/free'
];

interface RawChallengeItem {
  id?: number;
  title?: string;
  description?: string;
  difficulty?: string;
  xp?: number;
  category?: string;
  estimatedTime?: string;
  skillsUsed?: string[];
  [key: string]: unknown;
}

function parseChallengesJson(rawContent: string): Challenge[] {
  if (!rawContent) return [];
  let clean = rawContent.trim();
  if (clean.startsWith('```')) {
    clean = clean.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim();
  }
  try {
    const parsed = JSON.parse(clean);
    let rawList: RawChallengeItem[] = [];
    if (Array.isArray(parsed)) {
      rawList = parsed as RawChallengeItem[];
    } else if (Array.isArray(parsed.challenges)) {
      rawList = parsed.challenges as RawChallengeItem[];
    } else {
      for (const key of Object.keys(parsed)) {
        if (key.toLowerCase().includes('challenges') && Array.isArray(parsed[key])) {
          rawList = parsed[key] as RawChallengeItem[];
          break;
        }
      }
    }

    if (rawList.length > 0) {
      return rawList.map((item) => ({
        id: item.id ?? 0,
        title: item.title || "Coding Challenge",
        description: item.description || (typeof item[" "] === "string" ? item[" "] : "Complete the coding objective."),
        difficulty: (item.difficulty === "Beginner" || item.difficulty === "Intermediate" || item.difficulty === "Expert") 
          ? item.difficulty 
          : "Beginner",
        xp: typeof item.xp === "number" ? item.xp : 50,
        category: item.category || "Web Dev",
        estimatedTime: item.estimatedTime || "~45 mins",
        skillsUsed: Array.isArray(item.skillsUsed) ? item.skillsUsed : [],
      }));
    }
  } catch (err) {
    console.error("[PARSE_DAILY_CHALLENGES_ERROR]", err);
  }
  return [];
}

export async function getDailyChallenges(): Promise<Challenge[]> {
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
    You are Skillforge.dev. Generate a list of exactly 3 unique, short, and engaging coding challenges for a user based on their top skills.
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

  let lastError: unknown = null;

  for (let i = 0; i < FALLBACK_MODELS.length; i++) {
    const currentModel = FALLBACK_MODELS[i];
    const isPrimary = i === 0;

    try {
      const response = await openai.chat.completions.create({
        model: currentModel,
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' },
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error("Empty response received from model provider");
      }

      const challenges = parseChallengesJson(content);
      if (challenges.length > 0) {
        console.log(`[DAILY_CHALLENGES_SUCCESS] Generated ${challenges.length} daily challenges using model '${currentModel}' (resolved: '${response.model}')`);
        return challenges;
      } else {
        throw new Error("Could not parse valid challenges array from model response");
      }
    } catch (err: unknown) {
      lastError = err;
      const errorObj = err as { status?: number | string; code?: string; message?: string };
      const status = errorObj?.status || errorObj?.code || 'ERROR';
      const msg = errorObj?.message || String(err);
      if (isPrimary) {
        console.warn(`[DAILY_CHALLENGES_PRIMARY_FAILED] Primary model '${currentModel}' failed (${status}: ${msg}). Attempting fallback model...`);
      } else {
        console.warn(`[DAILY_CHALLENGES_FALLBACK_FAILED] Fallback model #${i} '${currentModel}' failed (${status}: ${msg}).`);
      }
    }
  }

  console.error("[DAILY_CHALLENGES_ALL_MODELS_FAILED] All models in fallback chain failed. Last error:", lastError);
  return [];
}