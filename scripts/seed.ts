import * as dotenv from "dotenv";
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from '../lib/drizzle/schema';

// Explicitly load variables from the .env.local file
dotenv.config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database...");

    await db.delete(schema.challenges);
    
    await db.insert(schema.challenges).values([
      {
        title: "Build a Personal Portfolio",
        description: "Create a responsive personal portfolio website using Next.js and Tailwind CSS to showcase your projects and skills.",
        category: "Web Dev",
        difficulty: "Beginner",
        xp: 100,
        estimatedTime: "~2 hours"
      },
      {
        title: "To-Do List API with Drizzle",
        description: "Develop a RESTful API for a to-do list application using Next.js Route Handlers and Drizzle ORM for database operations.",
        category: "Web Dev",
        difficulty: "Intermediate",
        xp: 150,
        estimatedTime: "~3 hours"
      },
      {
        title: "Prompt Engineering Mini-Task",
        description: "Craft a detailed system prompt for an AI chatbot to act as a travel guide for a specific city. The prompt should define its personality, knowledge base, and response format.",
        category: "AI",
        difficulty: "Beginner",
        xp: 50,
        estimatedTime: "~30 mins"
      },
    ]);

    console.log("Seeding finished.");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

main();