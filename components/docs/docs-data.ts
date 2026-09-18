export interface DocSubSection {
  id: string;
  title: string;
}

export interface DocPageData {
  slug: string;
  title: string;
  category: string;
  description: string;
  subsections: DocSubSection[];
  keywords: string[];
  prev?: { title: string; href: string };
  next?: { title: string; href: string };
}

export interface DocCategory {
  name: string;
  items: {
    slug: string;
    title: string;
    href: string;
    badge?: string;
  }[];
}

export const DOCS_CATEGORIES: DocCategory[] = [
  {
    name: "GETTING STARTED",
    items: [
      { slug: "introduction", title: "Introduction", href: "/docs" },
      { slug: "getting-started", title: "Getting Started", href: "/docs/getting-started" },
      { slug: "your-first-project", title: "Your First Project", href: "/docs/your-first-project" },
    ],
  },
  {
    name: "PROJECTS",
    items: [
      { slug: "project-generation", title: "Project Idea Generation", href: "/docs/project-generation" },
      { slug: "project-types", title: "Project Types", href: "/docs/project-types" },
      { slug: "project-milestones", title: "Project Milestones", href: "/docs/project-milestones" },
      { slug: "completing-a-project", title: "Completing a Project", href: "/docs/completing-a-project" },
    ],
  },
  {
    name: "AI CODE REVIEWS",
    items: [
      { slug: "github-integration", title: "GitHub Integration", href: "/docs/github-integration" },
      { slug: "submitting-a-repository", title: "Submitting a Repository", href: "/docs/submitting-a-repository" },
      { slug: "understanding-reviews", title: "Understanding Reviews", href: "/docs/understanding-reviews" },
    ],
  },
  {
    name: "PORTFOLIO",
    items: [
      { slug: "developer-portfolio", title: "Developer Portfolio", href: "/docs/developer-portfolio" },
      { slug: "public-profile", title: "Public Profile", href: "/docs/public-profile" },
      { slug: "resume", title: "Resume & Documents", href: "/docs/resume" },
    ],
  },
  {
    name: "ACCOUNT",
    items: [
      { slug: "profile", title: "Profile Management", href: "/docs/profile" },
      { slug: "settings", title: "Settings & Privacy", href: "/docs/settings" },
      { slug: "authentication", title: "Authentication", href: "/docs/authentication" },
    ],
  },
  {
    name: "HELP",
    items: [
      { slug: "faq", title: "FAQ", href: "/docs/faq" },
      { slug: "troubleshooting", title: "Troubleshooting", href: "/docs/troubleshooting" },
      { slug: "contact", title: "Contact & Support", href: "/docs/contact" },
    ],
  },
];

export const DOCS_PAGES: Record<string, DocPageData> = {
  introduction: {
    slug: "introduction",
    title: "Introduction",
    category: "GETTING STARTED",
    description: "Welcome to Skillforge.dev — the intelligent developer platform bridging the gap between learning and real engineering execution.",
    keywords: ["intro", "overview", "skillforge", "developer", "platform", "ai", "portfolio"],
    subsections: [
      { id: "what-is-skillforge", title: "What is Skillforge.dev?" },
      { id: "core-pillars", title: "Core Platform Pillars" },
      { id: "how-it-works", title: "How SkillForge Works" },
      { id: "quick-start", title: "Quick Navigation" },
    ],
    next: { title: "Getting Started", href: "/docs/getting-started" },
  },
  "getting-started": {
    slug: "getting-started",
    title: "Getting Started",
    category: "GETTING STARTED",
    description: "A step-by-step developer onboarding walkthrough to take you from account creation to your first verified portfolio project.",
    keywords: ["getting started", "onboarding", "quickstart", "setup", "register"],
    subsections: [
      { id: "step-1-create-account", title: "1. Create Your Account" },
      { id: "step-2-profile-setup", title: "2. Set Up Your Profile" },
      { id: "step-3-select-skills", title: "3. Choose Your Tech Stack" },
      { id: "step-4-generate-project", title: "4. Generate Your First Project" },
      { id: "step-5-complete-milestones", title: "5. Complete Milestones" },
      { id: "step-6-submit-for-review", title: "6. Submit for Code Review" },
      { id: "step-7-showcase-portfolio", title: "7. Showcase in Your Portfolio" },
    ],
    prev: { title: "Introduction", href: "/docs" },
    next: { title: "Your First Project", href: "/docs/your-first-project" },
  },
  "your-first-project": {
    slug: "your-first-project",
    title: "Your First Project",
    category: "GETTING STARTED",
    description: "Learn how to configure your tech stack, generate a structured project brief, and navigate the interactive milestones board.",
    keywords: ["first project", "project walkthrough", "brief", "milestones"],
    subsections: [
      { id: "selecting-stack", title: "Selecting Your Technologies" },
      { id: "micro-vs-realworld", title: "Micro vs. Real-World Scope" },
      { id: "interactive-milestones", title: "Working with Milestones" },
      { id: "asking-for-hints", title: "AI Mentor Hints" },
    ],
    prev: { title: "Getting Started", href: "/docs/getting-started" },
    next: { title: "Project Idea Generation", href: "/docs/project-generation" },
  },
  "project-generation": {
    slug: "project-generation",
    title: "Project Idea Generation",
    category: "PROJECTS",
    description: "Deep dive into how Skillforge.dev uses AI to generate tailored project architectures based on your declared skill sets and adaptive performance rating.",
    keywords: ["project generation", "adaptive difficulty", "ai prompts", "tech stack"],
    subsections: [
      { id: "how-generation-works", title: "How Project Generation Works" },
      { id: "adaptive-difficulty", title: "Adaptive Difficulty Logic" },
      { id: "schema-structure", title: "Generated Project Schema" },
    ],
    prev: { title: "Your First Project", href: "/docs/your-first-project" },
    next: { title: "Project Types", href: "/docs/project-types" },
  },
  "project-types": {
    slug: "project-types",
    title: "Project Types",
    category: "PROJECTS",
    description: "Understand the differences between focused Micro-Projects and comprehensive Real-World Projects.",
    keywords: ["micro projects", "real world projects", "scope", "time estimation"],
    subsections: [
      { id: "micro-projects", title: "Micro-Projects (< 1 Hour)" },
      { id: "real-world-projects", title: "Real-World Projects (Multi-Day)" },
      { id: "which-to-choose", title: "When to Choose Which" },
    ],
    prev: { title: "Project Idea Generation", href: "/docs/project-generation" },
    next: { title: "Project Milestones", href: "/docs/project-milestones" },
  },
  "project-milestones": {
    slug: "project-milestones",
    title: "Project Milestones",
    category: "PROJECTS",
    description: "Track development progress step-by-step with interactive milestone checklists and earn experience points (XP).",
    keywords: ["milestones", "gamification", "xp", "progress", "checklist"],
    subsections: [
      { id: "milestone-lifecycle", title: "Milestone Lifecycle" },
      { id: "xp-rewards", title: "XP Rewards & Level Progression" },
      { id: "updating-progress", title: "Persisting Progress" },
    ],
    prev: { title: "Project Types", href: "/docs/project-types" },
    next: { title: "Completing a Project", href: "/docs/completing-a-project" },
  },
  "completing-a-project": {
    slug: "completing-a-project",
    title: "Completing a Project",
    category: "PROJECTS",
    description: "Finalizing all milestones, updating project status to completed, and making your work visible on your developer profile.",
    keywords: ["completion", "project status", "portfolio publish"],
    subsections: [
      { id: "completion-checklist", title: "Completion Checklist" },
      { id: "status-transition", title: "Status Transitions" },
      { id: "portfolio-indexing", title: "Portfolio Synchronization" },
    ],
    prev: { title: "Project Milestones", href: "/docs/project-milestones" },
    next: { title: "GitHub Integration", href: "/docs/github-integration" },
  },
  "github-integration": {
    slug: "github-integration",
    title: "GitHub Integration",
    category: "AI CODE REVIEWS",
    description: "Connect your GitHub account to link code repositories, track commits, and enable automated AI code reviews.",
    keywords: ["github", "oauth", "repository", "commits", "octokit"],
    subsections: [
      { id: "why-connect-github", title: "Why Connect GitHub?" },
      { id: "oauth-flow", title: "OAuth Authorization Flow" },
      { id: "repo-permissions", title: "Permissions & Data Access" },
    ],
    prev: { title: "Completing a Project", href: "/docs/completing-a-project" },
    next: { title: "Submitting a Repository", href: "/docs/submitting-a-repository" },
  },
  "submitting-a-repository": {
    slug: "submitting-a-repository",
    title: "Submitting a Repository",
    category: "AI CODE REVIEWS",
    description: "How to link a public GitHub repository to a project and trigger an automated AI code evaluation.",
    keywords: ["repo submission", "review trigger", "public repo"],
    subsections: [
      { id: "submission-requirements", title: "Submission Requirements" },
      { id: "triggering-review", title: "Triggering the Review" },
      { id: "supported-file-types", title: "Supported Languages & Files" },
    ],
    prev: { title: "GitHub Integration", href: "/docs/github-integration" },
    next: { title: "Understanding Reviews", href: "/docs/understanding-reviews" },
  },
  "understanding-reviews": {
    slug: "understanding-reviews",
    title: "Understanding Reviews",
    category: "AI CODE REVIEWS",
    description: "Interpret automated AI code reviews, understand scoring criteria, architectural insights, and actionable improvement suggestions.",
    keywords: ["review criteria", "code quality", "security", "architecture", "score"],
    subsections: [
      { id: "review-components", title: "Review Components" },
      { id: "evaluation-criteria", title: "Evaluation Criteria" },
      { id: "sample-review", title: "Sample Review Output" },
    ],
    prev: { title: "Submitting a Repository", href: "/docs/submitting-a-repository" },
    next: { title: "Developer Portfolio", href: "/docs/developer-portfolio" },
  },
  "developer-portfolio": {
    slug: "developer-portfolio",
    title: "Developer Portfolio",
    category: "PORTFOLIO",
    description: "Build a verifiable developer portfolio showcasing your completed projects, verified skill tags, XP level, and AI review summaries.",
    keywords: ["portfolio", "public profile", "developer showcase", "shareable url"],
    subsections: [
      { id: "portfolio-overview", title: "Portfolio Overview" },
      { id: "public-vs-private", title: "Public vs. Private Visibility" },
      { id: "shareable-link", title: "Shareable Link Structure" },
    ],
    prev: { title: "Understanding Reviews", href: "/docs/understanding-reviews" },
    next: { title: "Public Profile", href: "/docs/public-profile" },
  },
  "public-profile": {
    slug: "public-profile",
    title: "Public Profile",
    category: "PORTFOLIO",
    description: "Customize your public developer persona with avatars, custom headlines, bios, and skill badges.",
    keywords: ["profile", "bio", "headline", "avatar", "username"],
    subsections: [
      { id: "profile-fields", title: "Customizable Profile Fields" },
      { id: "skill-badges", title: "Skill Badges & XP Display" },
      { id: "portfolio-preview", title: "Portfolio Preview" },
    ],
    prev: { title: "Developer Portfolio", href: "/docs/developer-portfolio" },
    next: { title: "Resume & Documents", href: "/docs/resume" },
  },
  resume: {
    slug: "resume",
    title: "Resume & Documents",
    category: "PORTFOLIO",
    description: "Upload and attach your developer resume via UploadThing to enhance project recommendations and provide a direct download on your public portfolio.",
    keywords: ["resume", "uploadthing", "pdf", "documents"],
    subsections: [
      { id: "uploading-resume", title: "Uploading Your Resume" },
      { id: "supported-formats", title: "Supported Formats & File Limits" },
      { id: "public-access", title: "Public Download Accessibility" },
    ],
    prev: { title: "Public Profile", href: "/docs/public-profile" },
    next: { title: "Profile Management", href: "/docs/profile" },
  },
  profile: {
    slug: "profile",
    title: "Profile Management",
    category: "ACCOUNT",
    description: "Manage your user profile details, edit technical skills, and manage experience point metrics.",
    keywords: ["account", "profile edit", "skills manage"],
    subsections: [
      { id: "editing-profile", title: "Editing Profile Information" },
      { id: "managing-skills", title: "Managing Your Skill Set" },
    ],
    prev: { title: "Resume & Documents", href: "/docs/resume" },
    next: { title: "Settings & Privacy", href: "/docs/settings" },
  },
  settings: {
    slug: "settings",
    title: "Settings & Privacy",
    category: "ACCOUNT",
    description: "Configure your public portfolio visibility, disconnect external OAuth integrations, and manage data preferences.",
    keywords: ["settings", "privacy toggle", "disconnect github", "account settings"],
    subsections: [
      { id: "portfolio-toggle", title: "Public / Private Portfolio Toggle" },
      { id: "github-connection", title: "GitHub Connection Status" },
      { id: "data-controls", title: "Data Management & Account Deletion" },
    ],
    prev: { title: "Profile Management", href: "/docs/profile" },
    next: { title: "Authentication", href: "/docs/authentication" },
  },
  authentication: {
    slug: "authentication",
    title: "Authentication",
    category: "ACCOUNT",
    description: "Learn how Skillforge.dev manages secure authentication and session management via Clerk.",
    keywords: ["clerk", "auth", "login", "signup", "oauth"],
    subsections: [
      { id: "auth-provider", title: "Clerk Authentication" },
      { id: "oauth-sign-in", title: "Supported Sign-in Providers" },
      { id: "session-security", title: "Session Security & Encryption" },
    ],
    prev: { title: "Settings & Privacy", href: "/docs/settings" },
    next: { title: "FAQ", href: "/docs/faq" },
  },
  faq: {
    slug: "faq",
    title: "Frequently Asked Questions",
    category: "HELP",
    description: "Answers to common questions regarding project generation, GitHub reviews, XP gamification, and developer portfolios.",
    keywords: ["faq", "questions", "answers", "help"],
    subsections: [
      { id: "faq-what-is", title: "What is Skillforge.dev?" },
      { id: "faq-generation", title: "How are projects generated?" },
      { id: "faq-stack", title: "Can I choose my own tech stack?" },
      { id: "faq-github-required", title: "Do I need a GitHub account?" },
      { id: "faq-portfolio-public", title: "Can I make my portfolio private?" },
      { id: "faq-cost", title: "Is Skillforge.dev free to use?" },
    ],
    prev: { title: "Authentication", href: "/docs/authentication" },
    next: { title: "Troubleshooting", href: "/docs/troubleshooting" },
  },
  troubleshooting: {
    slug: "troubleshooting",
    title: "Troubleshooting",
    category: "HELP",
    description: "Quick solutions for common issues regarding repository permissions, AI generation rate limits, and milestone synchronization.",
    keywords: ["troubleshooting", "errors", "issues", "github access error", "generation failure"],
    subsections: [
      { id: "github-access-error", title: "GitHub Access or 404 Errors" },
      { id: "milestone-sync-issue", title: "Milestone Updates Not Saving" },
      { id: "ai-timeout", title: "AI Generation Timeouts" },
    ],
    prev: { title: "FAQ", href: "/docs/faq" },
    next: { title: "Contact & Support", href: "/docs/contact" },
  },
  contact: {
    slug: "contact",
    title: "Contact & Support",
    category: "HELP",
    description: "Get in touch with the Skillforge.dev team for assistance, feedback, or technical support.",
    keywords: ["contact", "support", "email", "feedback"],
    subsections: [
      { id: "support-channels", title: "Support Channels" },
      { id: "reporting-bugs", title: "Reporting Bugs & Feature Requests" },
    ],
    prev: { title: "Troubleshooting", href: "/docs/troubleshooting" },
  },
};
