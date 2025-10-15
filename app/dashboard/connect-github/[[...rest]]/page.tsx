"use client"

import { UserProfile } from "@clerk/nextjs";

export default function ConnectGitHubPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Connect Your GitHub Account</h1>
        <p className="text-muted-foreground mt-2">
          Connecting your GitHub account is mandatory to enable AI code reviews for your projects and challenges. This allows SkillForge to securely read your submitted repositories.
        </p>
      </div>

      {/* Clerk's component will handle the entire connection flow */}
      <UserProfile 
        path="/dashboard/connect-github"
        routing="path"
        appearance={{
          elements: {
            card: "shadow-none border",
            headerTitle: "hidden",
            profilePageLink__social: "font-semibold"
          }
        }}
      />
    </div>
  );
}