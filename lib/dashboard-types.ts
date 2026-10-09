export interface DashboardStats {
  projectsBuilt: number;
  projectsCompleted: number;
  projectsInProgress: number;
  challengesCompleted: number;
  challengesInProgress: number;
  reviewsReceived: number;
  level: number;
  xp: number;
  xpForNextLevel: number;
  xpProgressPercent: number;
}

export type FocusType = 'project' | 'challenge' | 'review' | 'none';

export interface CurrentFocusItem {
  type: FocusType;
  title: string;
  displayTitle: string;
  subtitle: string;
  statusBadge?: string;
  progressPercent?: number;
  milestonesSummary?: string;
  techStack?: string[];
  difficulty?: string;
  category?: string;
  xpReward?: number;
  ctaText: string;
  ctaHref: string;
}

export interface SkillItem {
  name: string;
  count: number;
  score: number;
}

export interface RecentActivityItem {
  id: string;
  type: 'project_created' | 'project_completed' | 'challenge_started' | 'challenge_completed' | 'review_received' | 'joined';
  title: string;
  category: string;
  relativeTime: string;
  timestamp: Date;
  href?: string;
}

export interface NextStepItem {
  id: string;
  title: string;
  description: string;
  iconName: 'User' | 'Github' | 'FolderGit2' | 'Zap' | 'PlayCircle' | 'FileCheck' | 'Compass' | 'Share2';
  href: string;
  priority: 'high' | 'medium' | 'low';
  badge?: string;
}

export interface DashboardData {
  user: {
    id: string;
    firstName: string;
    fullName: string;
    email: string;
    avatarUrl: string | null;
    username: string | null;
    isPublic: boolean;
    headline: string | null;
    bio: string | null;
    resumeUrl: string | null;
    createdAt: Date;
  };
  isNewUser: boolean;
  stats: DashboardStats;
  currentFocus: CurrentFocusItem;
  skills: SkillItem[];
  recentActivity: RecentActivityItem[];
  nextSteps: NextStepItem[];
  githubConnected: boolean;
}

export function getXpForNextLevel(level: number): number {
  return 100 + (Math.max(1, level) - 1) * 50;
}

export function formatRelativeTime(date: Date | string | null | undefined): string {
  if (!date) return "Recently";
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (isNaN(diffInSeconds) || diffInSeconds < 0) return "Just now";
  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) {
    const mins = Math.floor(diffInSeconds / 60);
    return `${mins}m ago`;
  }
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}h ago`;
  }
  if (diffInSeconds < 172800) return "Yesterday";
  if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}d ago`;
  }
  if (diffInSeconds < 2592000) {
    const weeks = Math.floor(diffInSeconds / 604800);
    return `${weeks}w ago`;
  }
  return past.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
