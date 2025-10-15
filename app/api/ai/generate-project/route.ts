import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/drizzle/client';
import { projects, skills, projectSkills, users } from '@/lib/drizzle/schema';
import { eq, inArray } from 'drizzle-orm';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { skills: userSkills, projectType } = await req.json();

    if (!userSkills || !projectType) {
      return new NextResponse('Skills and project type are required', { status: 400 });
    }

    const user = await db.query.users.findFirst({ where: eq(users.id, userId!) });
    const performanceRating = user?.performanceRating ?? 50;

    let difficultyInstruction = "The project should be of average difficulty.";
  if (performanceRating > 75) {
    difficultyInstruction = "The user is performing well. Generate a challenging project that introduces a new concept or a more complex architecture.";
  } else if (performanceRating < 25) {
    difficultyInstruction = "The user is struggling. Generate a simpler, more foundational project to help them build confidence.";
  }
    
    const projectTypeInstruction = projectType === 'micro'
      ? "The project must be a 'Micro-Project'. This means it should be a small, focused challenge that can be completed in under an hour."
      : "The project must be a 'Real-World Project'. This means it should be a comprehensive, portfolio-worthy application.";

    const prompt = `
      You are SkillForge AI, an expert mentor for developers. Your task is to generate a project brief.
      
      The user's skills are: ${userSkills}.
      Project Type Instructions: ${projectTypeInstruction}

      **Adaptive Difficulty:**
      ${difficultyInstruction}

      Please generate a project brief with the following structure, formatted as a JSON object:
      {
        "title": "A creative project title",
        "description": "A one-paragraph summary of the project.",
        "milestones": ["A list of 4-6 actionable steps."],
        "skillsUsed": ["A list of 3-5 key skills from the user's list that are most relevant to this specific project. List them as simple strings, e.g., 'React', 'TypeScript'."]
      }

      Ensure your entire response is only the JSON object, with no extra text or formatting.
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
    });

    const projectBriefJSON = response.choices[0].message.content;
    if (!projectBriefJSON) {
        throw new Error("AI did not return a valid project brief.");
    }

    const projectBrief = JSON.parse(projectBriefJSON);

    // --- SAVE PROJECT AND SKILLS TO DATABASE ---

    const newProject = await db.insert(projects).values({
      userId: userId,
      title: projectBrief.title,
      description: projectBrief.description,
      milestones: { items: projectBrief.milestones.map((m: string) => ({ text: m, completed: false })) },
      projectType: projectType,
    }).returning({ id: projects.id });

    const projectId = newProject[0].id;

    if (projectBrief.skillsUsed && projectBrief.skillsUsed.length > 0) {
      // Create any skills that don't already exist in the master 'skills' table
      await db.insert(skills)
        .values(projectBrief.skillsUsed.map((skill: string) => ({ name: skill })))
        .onConflictDoNothing();

      // Get the IDs of all the skills we need to link
      const fetchedSkills = await db.select().from(skills).where(inArray(skills.name, projectBrief.skillsUsed));

      // Link the skills to the project in the join table
      if (fetchedSkills.length > 0) {
        await db.insert(projectSkills).values(
          fetchedSkills.map(skill => ({
            projectId: projectId,
            skillId: skill.id,
          }))
        );
      }
    }
    
    // Return the original JSON string from the AI to the frontend
    return new NextResponse(projectBriefJSON, {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('[GENERATE_PROJECT_API]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}