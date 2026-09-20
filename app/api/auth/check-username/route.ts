import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/drizzle/client";
import { users } from "@/lib/drizzle/schema";
import { sql, eq, or } from "drizzle-orm";

// Reserved route handles that cannot be claimed as usernames
const RESERVED_USERNAMES = new Set([
  "admin",
  "api",
  "auth",
  "dashboard",
  "docs",
  "login",
  "portfolio",
  "privacy",
  "settings",
  "sign-in",
  "sign-up",
  "skillforge",
  "terms",
  "user",
  "workflow",
]);

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const usernameParam = searchParams.get("username");

    if (!usernameParam || !usernameParam.trim()) {
      return NextResponse.json(
        { available: false, message: "Username is required." },
        { status: 400 }
      );
    }

    const cleanUsername = usernameParam.trim().toLowerCase();

    // Validate length: 3 - 30 characters
    if (cleanUsername.length < 3 || cleanUsername.length > 30) {
      return NextResponse.json(
        {
          available: false,
          message: "Username must be between 3 and 30 characters.",
        },
        { status: 200 }
      );
    }

    // Validate characters: alphanumeric, underscores, hyphens
    const usernameRegex = /^[a-z0-9_-]+$/;
    if (!usernameRegex.test(cleanUsername)) {
      return NextResponse.json(
        {
          available: false,
          message: "Letters, numbers, underscores, and hyphens only.",
        },
        { status: 200 }
      );
    }

    // Check reserved list
    if (RESERVED_USERNAMES.has(cleanUsername)) {
      return NextResponse.json(
        {
          available: false,
          message: "This username is reserved and cannot be chosen.",
        },
        { status: 200 }
      );
    }

    // Fast indexed query on PostgreSQL (only fetching `id`, limit 1)
    const existing = await db
      .select({ id: users.id })
      .from(users)
      .where(
        or(
          eq(users.username, cleanUsername),
          sql`lower(${users.username}) = ${cleanUsername}`
        )
      )
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json(
        {
          available: false,
          message: "Username is already taken.",
        },
        {
          status: 200,
          headers: { "Cache-Control": "public, s-maxage=10, stale-while-revalidate=30" },
        }
      );
    }

    return NextResponse.json(
      {
        available: true,
        message: "Username available",
      },
      {
        status: 200,
        headers: { "Cache-Control": "public, s-maxage=10, stale-while-revalidate=30" },
      }
    );
  } catch (error) {
    console.error("Error checking username availability:", error);
    return NextResponse.json(
      {
        available: false,
        message: "An error occurred while verifying username. Please try again.",
      },
      { status: 500 }
    );
  }
}
