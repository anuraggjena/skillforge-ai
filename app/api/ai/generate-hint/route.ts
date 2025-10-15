import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { projectTitle, projectDescription } = await req.json();

    if (!projectTitle || !projectDescription) {
      return new NextResponse('Project details are required', { status: 400 });
    }

    // This prompt instructs the AI on how to behave
    const prompt = `
      You are SkillForge AI, an expert developer mentor. A user is working on a project and has asked for a hint.
      
      Project Title: "${projectTitle}"
      Project Description: "${projectDescription}"

      Your task is to provide a single, concise, and actionable hint to help the user get unstuck or move to the next logical step. The hint should be a short sentence or two. Do not provide a full solution, just a helpful nudge.

      Return your response as a JSON object with a single key "hint". For example:
      {
        "hint": "Consider starting with the main layout component and setting up the basic responsive grid before adding content."
      }
    `;

    // Make the API call to OpenAI
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
    });

    const hint = response.choices[0].message.content;

    // Return the AI's response to the frontend
    return new NextResponse(hint, {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('[GENERATE_HINT_API]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}