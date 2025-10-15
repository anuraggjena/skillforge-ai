import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

// Explicitly load the .env.local file
dotenv.config({ path: ".env.local" });

export default defineConfig({
  schema: "./lib/drizzle/schema.ts",
  out: "./lib/drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});