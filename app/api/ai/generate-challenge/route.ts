import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/drizzle/client';
import { challenges, skills, challengeSkills } from '@/lib/drizzle/schema';
import { inArray } from 'drizzle-orm';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { userSkills, difficulty } = await req.json();

    if (!userSkills || !difficulty) {
      return new NextResponse('Skills and difficulty are required', { status: 400 });
    }

    const prompt = `
      You are SkillForge AI, a challenge creator for a developer learning platform.
      Your task is to generate a single, focused coding challenge based on a user's skills and a chosen difficulty level.

      User's skills: ${userSkills}.
      Difficulty: ${difficulty}.

      Please generate a challenge brief with the following structure, formatted as a JSON object:
      {
        "title": "A short, engaging title for the challenge.",
        "description": "A one-paragraph summary of the task, what needs to be built, and the goal.",
        "category": "Infer the most appropriate category (e.g., 'Web Dev', 'AI', 'Data Structures').",
        "xp": ${difficulty === 'Beginner' ? 50 : difficulty === 'Intermediate' ? 150 : 300},
        "estimatedTime": "${difficulty === 'Beginner' ? '~30 mins' : difficulty === 'Intermediate' ? '~90 mins' : '~3 hours'}",
        "skillsUsed": ["A list of 2-4 key skills from the user's list that are most relevant to this challenge."]
      }

      Ensure your entire response is ONLY the JSON object, with no extra text or markdown.
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
    });

    const challengeJSON = response.choices[0].message.content;
    if (!challengeJSON) {
        throw new Error("AI did not return a valid challenge.");
    }

    const newChallengeData = JSON.parse(challengeJSON);

    // Save the new challenge to the database
    const newChallenge = await db.insert(challenges).values({
      title: newChallengeData.title,
      description: newChallengeData.description,
      category: newChallengeData.category,
      difficulty: difficulty,
      xp: newChallengeData.xp,
      estimatedTime: newChallengeData.estimatedTime,
    }).returning();

    const challengeId = newChallenge[0].id;

    // Link skills to the new challenge
    if (newChallengeData.skillsUsed && newChallengeData.skillsUsed.length > 0) {
      await db.insert(skills)
        .values(newChallengeData.skillsUsed.map((skill: string) => ({ name: skill })))
        .onConflictDoNothing();

      const fetchedSkills = await db.select().from(skills).where(inArray(skills.name, newChallengeData.skillsUsed));
      
      if (fetchedSkills.length > 0) {
        await db.insert(challengeSkills).values(
          fetchedSkills.map(skill => ({
            challengeId: challengeId,
            skillId: skill.id,
          }))
        );
      }
    }
    
    // Return the full challenge object we just created
    return NextResponse.json(newChallenge[0]);

  } catch (error) {
    console.error('[GENERATE_CHALLENGE_API]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}