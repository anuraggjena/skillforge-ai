import { db } from "@/lib/drizzle/client";
import { users, projects, userChallenges } from "@/lib/drizzle/schema";
import { eq, desc } from "drizzle-orm";
import { clerkClient } from "@clerk/nextjs/server";
import { Milestone } from "./types";
import {
  DashboardStats,
  CurrentFocusItem,
  SkillItem,
  RecentActivityItem,
  NextStepItem,
  DashboardData,
  getXpForNextLevel,
  formatRelativeTime,
} from "./dashboard-types";

export * from "./dashboard-types";

export async function checkGitHubConnected(userId: string): Promise<boolean> {
  try {
    const clerk = await clerkClient();
    try {
      const tokenResponse = await clerk.users.getUserOauthAccessToken(userId, "github");
      if (tokenResponse?.data && tokenResponse.data.length > 0 && tokenResponse.data[0]?.token) {
        return true;
      }
    } catch {
      // Fall through to check externalAccounts
    }

    const clerkUser = await clerk.users.getUser(userId);
    const hasGithub = clerkUser.externalAccounts?.some(
      (acc) =>
        (acc.provider === "github" || acc.provider === "oauth_github") &&
        acc.verification?.status === "verified"
    );
    return Boolean(hasGithub);
  } catch {
    return false;
  }
}

/**
 * Maps a review feedback score (1-5 or absence) to a base numeric skill rating.
 */
function extractReviewBaseScore(feedback: unknown): number {
  if (!feedback || typeof feedback !== "object") return 68;

  const fb = feedback as { score?: unknown };
  if (typeof fb.score === "number") {
    switch (fb.score) {
      case 1:
        return 52;
      case 2:
        return 62;
      case 3:
        return 72;
      case 4:
        return 84;
      case 5:
        return 94;
      default:
        if (fb.score > 0 && fb.score <= 100) return fb.score;
        return 68;
    }
  }
  return 68;
}

export async function getDashboardData(userId: string): Promise<DashboardData> {
  // Parallel fetch core data
  const [dbUser, userProjects, userChallengesData, githubConnected] = await Promise.all([
    db.query.users.findFirst({
      where: eq(users.id, userId),
    }),
    db.query.projects.findMany({
      where: eq(projects.userId, userId),
      orderBy: [desc(projects.createdAt)],
      with: {
        projectSkills: {
          with: {
            skill: true,
          },
        },
      },
    }),
    db.query.userChallenges.findMany({
      where: eq(userChallenges.userId, userId),
      with: {
        challenge: true,
      },
    }),
    checkGitHubConnected(userId),
  ]);

  const firstName = dbUser?.name ? dbUser.name.split(" ")[0] : "Developer";
  const fullName = dbUser?.name ?? "Developer";
  const email = dbUser?.email ?? "";
  const level = dbUser?.level ?? 1;
  const xp = dbUser?.xp ?? 0;
  const xpForNext = getXpForNextLevel(level);
  const xpProgressPercent = Math.min(100, Math.max(0, Math.round((xp / xpForNext) * 100)));

  // Compute Project statistics
  const totalProjects = userProjects.length;
  const completedProjects = userProjects.filter((p) => p.status === "completed");
  const inProgressProjects = userProjects.filter((p) => p.status === "in-progress");
  const reviewedProjects = userProjects.filter((p) => p.feedback !== null && p.feedback !== undefined);

  // Compute Challenge statistics
  const completedChallenges = userChallengesData.filter((c) => c.status === "completed");
  const inProgressChallenges = userChallengesData.filter((c) => c.status === "in-progress");

  // Determine if User is New
  const isNewUser =
    totalProjects === 0 &&
    completedChallenges.length === 0 &&
    reviewedProjects.length === 0 &&
    inProgressProjects.length === 0 &&
    inProgressChallenges.length === 0;

  const stats: DashboardStats = {
    projectsBuilt: totalProjects,
    projectsCompleted: completedProjects.length,
    projectsInProgress: inProgressProjects.length,
    challengesCompleted: completedChallenges.length,
    challengesInProgress: inProgressChallenges.length,
    reviewsReceived: reviewedProjects.length,
    level,
    xp,
    xpForNextLevel: xpForNext,
    xpProgressPercent,
  };

  // Determine Current Focus
  let currentFocus: CurrentFocusItem;

  if (inProgressProjects.length > 0) {
    const activeProj = inProgressProjects[0];
    const milestonesList = (activeProj.milestones as { items: Milestone[] } | null)?.items ?? [];
    const completedM = milestonesList.filter((m) => m.completed).length;
    const totalM = milestonesList.length;
    const progressPct = totalM > 0 ? Math.round((completedM / totalM) * 100) : 0;
    const stack = activeProj.projectSkills?.map((ps) => ps.skill.name) ?? [];

    currentFocus = {
      type: "project",
      title: activeProj.title,
      displayTitle: `Building: ${activeProj.title}`,
      subtitle: activeProj.description,
      statusBadge: activeProj.projectType === "micro" ? "Micro Project" : "Real-World",
      progressPercent: progressPct,
      milestonesSummary: totalM > 0 ? `Milestone ${completedM} of ${totalM} completed` : undefined,
      techStack: stack.length > 0 ? stack : undefined,
      ctaText: "Continue Project →",
      ctaHref: `/dashboard/projects/${activeProj.id}`,
    };
  } else if (inProgressChallenges.length > 0) {
    const activeChal = inProgressChallenges[0];
    currentFocus = {
      type: "challenge",
      title: activeChal.challenge.title,
      displayTitle: `Continue: ${activeChal.challenge.title}`,
      subtitle: activeChal.challenge.description,
      statusBadge: activeChal.challenge.difficulty,
      difficulty: activeChal.challenge.difficulty,
      category: activeChal.challenge.category ?? "Coding Challenge",
      xpReward: activeChal.challenge.xp,
      ctaText: "Resume Challenge →",
      ctaHref: `/dashboard/challenges/${activeChal.challengeId}`,
    };
  } else if (reviewedProjects.length > 0) {
    const recentReviewed = reviewedProjects[0];
    const feedbackObj = recentReviewed.feedback as { overall?: string } | null;
    currentFocus = {
      type: "review",
      title: recentReviewed.title,
      displayTitle: `Review: ${recentReviewed.title}`,
      subtitle: feedbackObj?.overall || "AI code review and feedback available.",
      statusBadge: "Review Ready",
      ctaText: "View Review →",
      ctaHref: `/dashboard/projects/${recentReviewed.id}`,
    };
  } else {
    currentFocus = {
      type: "none",
      title: "No active project yet",
      displayTitle: "No active project yet",
      subtitle: "Start exploring SkillForge to begin your journey.",
      ctaText: "Explore Projects →",
      ctaHref: "/dashboard/projects",
    };
  }

  // =========================================================================
  // STRICT VERIFIED SKILLS CALCULATION
  // Business Logic: Declaring a skill on a project does NOT grant verified score.
  // A skill receives verified evidence ONLY when an actual GitHub/codebase
  // review has been completed for a project using that technology.
  // =========================================================================
  const verifiedSkillScoresMap = new Map<string, number[]>();

  for (const proj of reviewedProjects) {
    if (proj.projectSkills && proj.projectSkills.length > 0) {
      const baseScore = extractReviewBaseScore(proj.feedback);
      for (const ps of proj.projectSkills) {
        if (ps.skill?.name) {
          const currentScores = verifiedSkillScoresMap.get(ps.skill.name) ?? [];
          currentScores.push(baseScore);
          verifiedSkillScoresMap.set(ps.skill.name, currentScores);
        }
      }
    }
  }

  const skillsList: SkillItem[] = Array.from(verifiedSkillScoresMap.entries()).map(
    ([name, scores]) => {
      const reviewCount = scores.length;
      const averageBase = scores.reduce((a, b) => a + b, 0) / reviewCount;
      // Mastery progression: additional reviewed projects using the skill provide proof of repeated application
      const masteryBonus = (reviewCount - 1) * 4;
      const finalScore = Math.min(98, Math.max(45, Math.round(averageBase + masteryBonus)));

      return {
        name,
        count: reviewCount,
        score: finalScore,
      };
    }
  );

  // Sort verified skills descending by score, then review count
  skillsList.sort((a, b) => b.score - a.score || b.count - a.count);

  // Aggregate Recent Activity
  const activityList: RecentActivityItem[] = [];

  // Project events
  userProjects.forEach((p) => {
    if (p.createdAt) {
      activityList.push({
        id: `proj-created-${p.id}`,
        type: "project_created",
        title: `Started "${p.title}"`,
        category: `Project · ${p.projectType === "micro" ? "Micro" : "Real-World"}`,
        relativeTime: formatRelativeTime(p.createdAt),
        timestamp: new Date(p.createdAt),
        href: `/dashboard/projects/${p.id}`,
      });
    }
    if (p.status === "completed" && p.createdAt) {
      activityList.push({
        id: `proj-completed-${p.id}`,
        type: "project_completed",
        title: `Completed "${p.title}"`,
        category: "Project Completed",
        relativeTime: formatRelativeTime(p.createdAt),
        timestamp: new Date(p.createdAt),
        href: `/dashboard/projects/${p.id}`,
      });
    }
    if (p.feedback && p.createdAt) {
      activityList.push({
        id: `proj-review-${p.id}`,
        type: "review_received",
        title: `AI code review received for "${p.title}"`,
        category: "Code Review",
        relativeTime: formatRelativeTime(p.createdAt),
        timestamp: new Date(p.createdAt),
        href: `/dashboard/projects/${p.id}`,
      });
    }
  });

  // Challenge events
  userChallengesData.forEach((uc) => {
    if (uc.startedAt) {
      activityList.push({
        id: `chal-start-${uc.challengeId}`,
        type: "challenge_started",
        title: `Accepted challenge "${uc.challenge.title}"`,
        category: `Challenge · ${uc.challenge.category || "General"}`,
        relativeTime: formatRelativeTime(uc.startedAt),
        timestamp: new Date(uc.startedAt),
        href: `/dashboard/challenges/${uc.challengeId}`,
      });
    }
    if (uc.status === "completed" && uc.completedAt) {
      activityList.push({
        id: `chal-complete-${uc.challengeId}`,
        type: "challenge_completed",
        title: `Conquered challenge "${uc.challenge.title}"`,
        category: `Challenge Completed · +${uc.challenge.xp} XP`,
        relativeTime: formatRelativeTime(uc.completedAt),
        timestamp: new Date(uc.completedAt),
        href: `/dashboard/challenges/${uc.challengeId}`,
      });
    }
  });

  // User join event
  if (dbUser?.createdAt) {
    activityList.push({
      id: "user-join",
      type: "joined",
      title: "Joined SkillForge",
      category: "Account Created",
      relativeTime: formatRelativeTime(dbUser.createdAt),
      timestamp: new Date(dbUser.createdAt),
    });
  }

  // Sort descending by timestamp and limit to 5
  activityList.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  const recentActivity = activityList.slice(0, 5);

  // =========================================================================
  // DETERMINISTIC RECOMMENDED NEXT ACTIONS
  // Priority order for returning users:
  // 1. Continue active project
  // 2. Submit project for review (if unreviewed project exists)
  // 3. Finish active challenge
  // 4. Connect GitHub if not connected
  // 5. Try a challenge if user has none completed
  // 6. Complete/enhance profile if incomplete
  // 7. Forge a new project
  // =========================================================================
  const nextSteps: NextStepItem[] = [];

  if (isNewUser) {
    nextSteps.push(
      {
        id: "step-profile",
        title: "Complete your profile",
        description: "Add your headline, bio, and resume for portfolio generation.",
        iconName: "User",
        href: "/dashboard/settings",
        priority: "high",
        badge: "Setup",
      },
      {
        id: "step-github",
        title: "Connect GitHub",
        description: "Connect your GitHub account to enable AI code reviews.",
        iconName: "Github",
        href: "/dashboard/connect-github",
        priority: "high",
        badge: githubConnected ? "Connected" : "Required",
      },
      {
        id: "step-projects",
        title: "Explore Projects",
        description: "Choose or generate a real-world coding project.",
        iconName: "FolderGit2",
        href: "/dashboard/projects",
        priority: "medium",
        badge: "Start",
      },
      {
        id: "step-challenge",
        title: "Try a Challenge",
        description: "Tackle a short, focused coding challenge to earn XP.",
        iconName: "Zap",
        href: "/dashboard/challenges",
        priority: "medium",
      }
    );
  } else {
    // 1. Continue active in-progress project
    if (inProgressProjects.length > 0) {
      const p = inProgressProjects[0];
      nextSteps.push({
        id: `step-resume-proj-${p.id}`,
        title: "Continue your project",
        description: `Resume progress on "${p.title}"`,
        iconName: "PlayCircle",
        href: `/dashboard/projects/${p.id}`,
        priority: "high",
        badge: "In Progress",
      });
    }

    // 2. Submit project for review (if completed/in-progress project has repo or needs review)
    const projectNeedingReview = userProjects.find((p) => !p.feedback && p.repoUrl);
    if (projectNeedingReview && githubConnected) {
      nextSteps.push({
        id: `step-review-proj-${projectNeedingReview.id}`,
        title: "Submit for AI code review",
        description: `Get verified skill evaluation for "${projectNeedingReview.title}"`,
        iconName: "FileCheck",
        href: `/dashboard/projects/${projectNeedingReview.id}`,
        priority: "high",
        badge: "Review Ready",
      });
    }

    // 3. Complete unfinished challenge
    if (inProgressChallenges.length > 0) {
      const c = inProgressChallenges[0];
      nextSteps.push({
        id: `step-resume-chal-${c.challengeId}`,
        title: "Finish active challenge",
        description: `Submit solution for "${c.challenge.title}"`,
        iconName: "Zap",
        href: `/dashboard/challenges/${c.challengeId}`,
        priority: "high",
        badge: "In Progress",
      });
    }

    // 4. Connect GitHub if not connected
    if (!githubConnected) {
      nextSteps.push({
        id: "step-connect-github",
        title: "Connect GitHub",
        description: "Link GitHub to enable repository inspection and AI reviews.",
        iconName: "Github",
        href: "/dashboard/connect-github",
        priority: "high",
        badge: "Action Required",
      });
    }

    // 5. Try a coding challenge if user has never completed one
    if (completedChallenges.length === 0 && inProgressChallenges.length === 0 && nextSteps.length < 4) {
      nextSteps.push({
        id: "step-try-challenge",
        title: "Try a coding challenge",
        description: "Tackle a short, focused coding challenge to earn XP.",
        iconName: "Zap",
        href: "/dashboard/challenges",
        priority: "medium",
        badge: "Earn XP",
      });
    }

    // 6. Complete/update profile if incomplete
    const isProfileIncomplete = !dbUser?.headline || !dbUser?.bio || !dbUser?.resumeUrl;
    if (isProfileIncomplete && nextSteps.length < 4) {
      nextSteps.push({
        id: "step-update-profile",
        title: "Complete your profile",
        description: "Add your headline, bio, or resume for portfolio verification.",
        iconName: "User",
        href: "/dashboard/settings",
        priority: "medium",
        badge: "Profile",
      });
    }

    // 7. Explore another project
    if (nextSteps.length < 4) {
      nextSteps.push({
        id: "step-new-project",
        title: "Forge a new project",
        description: "Generate a production-grade fullstack project.",
        iconName: "FolderGit2",
        href: "/dashboard/projects",
        priority: "low",
      });
    }

    // 8. View portfolio
    if (nextSteps.length < 4) {
      nextSteps.push({
        id: "step-portfolio",
        title: "View your portfolio",
        description: "Review your public profile, verified skills, and timeline.",
        iconName: "Share2",
        href: "/dashboard/portfolio",
        priority: "low",
      });
    }
  }

  return {
    user: {
      id: userId,
      firstName,
      fullName,
      email,
      avatarUrl: dbUser?.avatarUrl ?? null,
      username: dbUser?.username ?? null,
      isPublic: dbUser?.isPublic ?? false,
      headline: dbUser?.headline ?? null,
      bio: dbUser?.bio ?? null,
      resumeUrl: dbUser?.resumeUrl ?? null,
      createdAt: dbUser?.createdAt ?? new Date(),
    },
    isNewUser,
    stats,
    currentFocus,
    skills: skillsList.slice(0, 5),
    recentActivity,
    nextSteps: nextSteps.slice(0, 4),
    githubConnected,
  };
}
