import React from "react";
import Link from "next/link";
import { DocsCallout } from "./docs-callout";
import { DocsCodeBlock } from "./docs-code-block";

export function RenderGettingStarted() {
  return (
    <>
      <section id="step-1-create-account" className="space-y-3">
        <h2 className="text-xl font-bold text-[#E8E5D5] flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-full bg-[#E8E5D5]/10 border border-[#E8E5D5]/20 flex items-center justify-center font-mono text-xs text-[#E8E5D5]">1</span>
          Create Your Account
        </h2>
        <p>
          Visit <Link href="/sign-up" className="text-[#E8E5D5] underline">/sign-up</Link> to create an account. Skillforge.dev uses <strong>Clerk</strong> for secure identity management. You can sign up using your email or with your <strong>GitHub OAuth</strong> profile.
        </p>
        <DocsCallout type="tip" title="GitHub Recommended">
          Signing up with GitHub automatically simplifies repository linking and code review verification later on.
        </DocsCallout>
      </section>

      <section id="step-2-profile-setup" className="space-y-3 pt-6 border-t border-[#E8E5D5]/10">
        <h2 className="text-xl font-bold text-[#E8E5D5] flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-full bg-[#E8E5D5]/10 border border-[#E8E5D5]/20 flex items-center justify-center font-mono text-xs text-[#E8E5D5]">2</span>
          Set Up Your Profile
        </h2>
        <p>
          Navigate to <strong>Dashboard &gt; Settings</strong> or <strong>Dashboard &gt; Profile</strong> to customize your public developer identity:
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-[#E8E5D5]/80 text-xs sm:text-sm">
          <li><strong>Username:</strong> Sets your unique public portfolio address at <code className="text-[#E8E5D5] bg-white/10 px-1 py-0.5 rounded font-mono text-xs">/portfolio/[username]</code>.</li>
          <li><strong>Headline & Bio:</strong> Add your engineering specialty (e.g., &quot;Full-Stack TypeScript Developer&quot;) and personal summary.</li>
          <li><strong>Resume Upload:</strong> Upload a PDF resume via UploadThing to display a verified download link on your portfolio.</li>
        </ul>
      </section>

      <section id="step-3-select-skills" className="space-y-3 pt-6 border-t border-[#E8E5D5]/10">
        <h2 className="text-xl font-bold text-[#E8E5D5] flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-full bg-[#E8E5D5]/10 border border-[#E8E5D5]/20 flex items-center justify-center font-mono text-xs text-[#E8E5D5]">3</span>
          Choose Your Tech Stack
        </h2>
        <p>
          Declare the programming languages, frameworks, and databases you want to practice (e.g., <em>React, Next.js, TypeScript, PostgreSQL, Tailwind CSS</em>). These skills directly inform the AI project generation engine.
        </p>
      </section>

      <section id="step-4-generate-project" className="space-y-3 pt-6 border-t border-[#E8E5D5]/10">
        <h2 className="text-xl font-bold text-[#E8E5D5] flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-full bg-[#E8E5D5]/10 border border-[#E8E5D5]/20 flex items-center justify-center font-mono text-xs text-[#E8E5D5]">4</span>
          Generate Your First Project
        </h2>
        <p>
          On your dashboard, select either <strong>Micro-Project</strong> (a targeted 30–60 minute challenge) or <strong>Real-World Project</strong> (a full production-ready architecture). The AI constructs a comprehensive project brief with structured milestones and recommended tech stacks.
        </p>
      </section>

      <section id="step-5-complete-milestones" className="space-y-3 pt-6 border-t border-[#E8E5D5]/10">
        <h2 className="text-xl font-bold text-[#E8E5D5] flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-full bg-[#E8E5D5]/10 border border-[#E8E5D5]/20 flex items-center justify-center font-mono text-xs text-[#E8E5D5]">5</span>
          Complete Milestones & Earn XP
        </h2>
        <p>
          Work through the generated milestone roadmap in your local IDE. As you build features, check off milestones on your project dashboard. Each completed milestone automatically awards <strong>+10 XP</strong> to your developer level.
        </p>
      </section>

      <section id="step-6-submit-for-review" className="space-y-3 pt-6 border-t border-[#E8E5D5]/10">
        <h2 className="text-xl font-bold text-[#E8E5D5] flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-full bg-[#E8E5D5]/10 border border-[#E8E5D5]/20 flex items-center justify-center font-mono text-xs text-[#E8E5D5]">6</span>
          Submit for AI Code Review
        </h2>
        <p>
          Push your source code to a public GitHub repository. Paste the repository URL into your project&apos;s review tab to initiate an automated code evaluation covering architecture, clean code practices, and security considerations.
        </p>
      </section>

      <section id="step-7-showcase-portfolio" className="space-y-3 pt-6 border-t border-[#E8E5D5]/10">
        <h2 className="text-xl font-bold text-[#E8E5D5] flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-full bg-[#E8E5D5]/10 border border-[#E8E5D5]/20 flex items-center justify-center font-mono text-xs text-[#E8E5D5]">7</span>
          Showcase in Your Portfolio
        </h2>
        <p>
          Once all milestones are complete, mark the project completed. It will immediately synchronize with your public profile at <code className="text-[#E8E5D5] bg-white/10 px-1 py-0.5 rounded font-mono text-xs">/portfolio/[username]</code> for recruiters and peers to inspect.
        </p>
      </section>
    </>
  );
}

export function RenderYourFirstProject() {
  return (
    <>
      <section id="selecting-stack" className="space-y-3">
        <h2 className="text-xl font-bold text-[#E8E5D5]">Selecting Your Technologies</h2>
        <p>
          When triggering project generation, you can supply individual skills or multi-layer stacks. Skillforge.dev validates your declared skills and feeds them into the generative prompt.
        </p>
        <DocsCodeBlock
          language="json"
          filename="project-generator-payload.json"
          code={`{
  "skills": ["React", "TypeScript", "Next.js", "Tailwind CSS", "PostgreSQL"],
  "projectType": "real-world"
}`}
        />
      </section>

      <section id="micro-vs-realworld" className="space-y-3 pt-6 border-t border-[#E8E5D5]/10">
        <h2 className="text-xl font-bold text-[#E8E5D5]">Micro vs. Real-World Scope</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-3">
          <div className="p-4 rounded-xl border border-[#E8E5D5]/15 bg-[#0D0D0D] space-y-2">
            <span className="font-mono text-xs text-amber-300 font-semibold uppercase tracking-wider">Micro-Project</span>
            <p className="text-xs text-[#E8E5D5]/70 leading-relaxed">
              Targeted focus (30–60 minutes). Builds isolated utilities, algorithmic components, or specialized UI widgets.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-[#E8E5D5]/15 bg-[#0D0D0D] space-y-2">
            <span className="font-mono text-xs text-purple-300 font-semibold uppercase tracking-wider">Real-World Project</span>
            <p className="text-xs text-[#E8E5D5]/70 leading-relaxed">
              Full application lifecycle. Includes database models, authentication flows, REST/GraphQL APIs, and deployment configurations.
            </p>
          </div>
        </div>
      </section>

      <section id="interactive-milestones" className="space-y-3 pt-6 border-t border-[#E8E5D5]/10">
        <h2 className="text-xl font-bold text-[#E8E5D5]">Working with Milestones</h2>
        <p>
          Every generated project includes 4 to 6 actionable milestone cards. Check off items as you build. Progress updates are persisted in your PostgreSQL database via Drizzle ORM.
        </p>
      </section>

      <section id="asking-for-hints" className="space-y-3 pt-6 border-t border-[#E8E5D5]/10">
        <h2 className="text-xl font-bold text-[#E8E5D5]">AI Mentor Hints</h2>
        <p>
          Stuck on a milestone? Click the <strong>Ask for Hint</strong> button on your project board. Skillforge.dev queries the AI model with your project context and current requirements to provide an actionable architectural hint without giving away the full solution.
        </p>
      </section>
    </>
  );
}

export function RenderProjectGeneration() {
  return (
    <>
      <section id="how-generation-works" className="space-y-3">
        <h2 className="text-xl font-bold text-[#E8E5D5]">How Project Generation Works</h2>
        <p>
          When you request a project, Skillforge.dev formats a structured prompt combining your skill list, desired scope (micro or real-world), and your current user performance rating.
        </p>
      </section>

      <section id="adaptive-difficulty" className="space-y-3 pt-6 border-t border-[#E8E5D5]/10">
        <h2 className="text-xl font-bold text-[#E8E5D5]">Adaptive Difficulty Logic</h2>
        <p>
          Skillforge.dev dynamically adapts project complexity based on your profile&apos;s <code>performanceRating</code> score (0–100):
        </p>
        <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-[#E8E5D5]/80">
          <li><strong>Rating &gt; 75 (Advanced):</strong> Generates challenging projects introducing advanced concepts, distributed caching, complex state, or microservice patterns.</li>
          <li><strong>Rating 25 – 75 (Intermediate):</strong> Generates balanced, standard-difficulty full-stack applications.</li>
          <li><strong>Rating &lt; 25 (Foundational):</strong> Generates guided, foundational projects designed to build confidence in core fundamentals.</li>
        </ul>
      </section>

      <section id="schema-structure" className="space-y-3 pt-6 border-t border-[#E8E5D5]/10">
        <h2 className="text-xl font-bold text-[#E8E5D5]">Generated Project Schema</h2>
        <p>
          The AI returns a verified JSON structure parsed and inserted directly into the database:
        </p>
        <DocsCodeBlock
          language="json"
          filename="ai-project-response.json"
          code={`{
  "title": "Realtime Collaborative Markdown Editor",
  "description": "A full-stack collaborative workspace allowing multiple developers to edit documents with live cursor syncing and markdown previews.",
  "milestones": [
    "1. Initialize Next.js project with Tailwind and TypeScript setup",
    "2. Configure PostgreSQL schema with Drizzle ORM for document storage",
    "3. Implement WebSocket / WebRTC connection for live presence",
    "4. Build split-pane Markdown editor with syntax highlighting",
    "5. Add user authentication and shareable document invite links"
  ],
  "skillsUsed": ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "WebSockets"]
}`}
        />
      </section>
    </>
  );
}

export function RenderProjectTypes() {
  return (
    <>
      <section id="micro-projects" className="space-y-3">
        <h2 className="text-xl font-bold text-[#E8E5D5]">Micro-Projects (&lt; 1 Hour)</h2>
        <p>
          Micro-projects are focused sprint tasks designed to test a single concept or technology in under 60 minutes.
        </p>
        <div className="p-4 rounded-xl border border-[#E8E5D5]/15 bg-[#0D0D0D] font-mono text-xs text-[#E8E5D5]/80 space-y-1">
          <p><strong className="text-[#E8E5D5]">Example:</strong> CLI Token Bucket Rate Limiter</p>
          <p><strong className="text-[#E8E5D5]">Skills:</strong> TypeScript, Node.js</p>
          <p><strong className="text-[#E8E5D5]">Time:</strong> ~45 mins | <strong className="text-[#E8E5D5]">Milestones:</strong> 3</p>
        </div>
      </section>

      <section id="real-world-projects" className="space-y-3 pt-6 border-t border-[#E8E5D5]/10">
        <h2 className="text-xl font-bold text-[#E8E5D5]">Real-World Projects (Multi-Day)</h2>
        <p>
          Real-world projects mirror production engineering tasks. They require database modeling, API architecture, frontend components, error handling, and deployable configurations.
        </p>
        <div className="p-4 rounded-xl border border-[#E8E5D5]/15 bg-[#0D0D0D] font-mono text-xs text-[#E8E5D5]/80 space-y-1">
          <p><strong className="text-[#E8E5D5]">Example:</strong> Multi-Tenant SaaS Billing Dashboard</p>
          <p><strong className="text-[#E8E5D5]">Skills:</strong> Next.js, PostgreSQL, Stripe API, Tailwind CSS</p>
          <p><strong className="text-[#E8E5D5]">Time:</strong> ~2-3 days | <strong className="text-[#E8E5D5]">Milestones:</strong> 5-6</p>
        </div>
      </section>

      <section id="which-to-choose" className="space-y-3 pt-6 border-t border-[#E8E5D5]/10">
        <h2 className="text-xl font-bold text-[#E8E5D5]">When to Choose Which</h2>
        <p>
          Use <strong>Micro-Projects</strong> for daily practice, warmups, or learning new libraries. Use <strong>Real-World Projects</strong> when you need deep portfolio projects to demonstrate end-to-end engineering competence to employers.
        </p>
      </section>
    </>
  );
}

export function RenderProjectMilestones() {
  return (
    <>
      <section id="milestone-lifecycle" className="space-y-3">
        <h2 className="text-xl font-bold text-[#E8E5D5]">Milestone Lifecycle</h2>
        <p>
          Milestones represent discrete architectural steps for your project. As you complete each step, you can toggle the checkbox directly on the project details view.
        </p>
      </section>

      <section id="xp-rewards" className="space-y-3 pt-6 border-t border-[#E8E5D5]/10">
        <h2 className="text-xl font-bold text-[#E8E5D5]">XP Rewards & Level Progression</h2>
        <p>
          Each newly completed milestone triggers a server action that updates your user record:
        </p>
        <DocsCodeBlock
          language="typescript"
          filename="lib/actions/project.actions.ts"
          code={`// Gamification XP calculation
if (newCompletedCount > originalCompletedCount) {
  const xpGained = (newCompletedCount - originalCompletedCount) * 10; // 10 XP per milestone
  await db.update(users)
    .set({ xp: sql\`\${users.xp} + \${xpGained}\` })
    .where(eq(users.id, userId));
}`}
        />
      </section>

      <section id="updating-progress" className="space-y-3 pt-6 border-t border-[#E8E5D5]/10">
        <h2 className="text-xl font-bold text-[#E8E5D5]">Persisting Progress</h2>
        <p>
          Your milestone completion status is stored as a structured JSON array inside the <code>projects</code> table in PostgreSQL and immediately revalidated on the client.
        </p>
      </section>
    </>
  );
}

export function RenderCompletingAProject() {
  return (
    <>
      <section id="completion-checklist" className="space-y-3">
        <h2 className="text-xl font-bold text-[#E8E5D5]">Completion Checklist</h2>
        <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-[#E8E5D5]/80">
          <li>Ensure all project milestones are checked off.</li>
          <li>Ensure your GitHub repository link is connected and accessible.</li>
          <li>Run an AI code review to verify code quality.</li>
        </ul>
      </section>

      <section id="status-transition" className="space-y-3 pt-6 border-t border-[#E8E5D5]/10">
        <h2 className="text-xl font-bold text-[#E8E5D5]">Status Transitions</h2>
        <p>
          Projects transition from <code>in_progress</code> to <code>completed</code>. Once marked completed, the project is included in your skill statistics and daily challenge recommendations.
        </p>
      </section>

      <section id="portfolio-indexing" className="space-y-3 pt-6 border-t border-[#E8E5D5]/10">
        <h2 className="text-xl font-bold text-[#E8E5D5]">Portfolio Synchronization</h2>
        <p>
          Completed projects are immediately visible on your public portfolio page at <code className="text-[#E8E5D5] bg-white/10 px-1 py-0.5 rounded font-mono text-xs">/portfolio/[username]</code>.
        </p>
      </section>
    </>
  );
}

export function RenderGitHubIntegration() {
  return (
    <>
      <section id="why-connect-github" className="space-y-3">
        <h2 className="text-xl font-bold text-[#E8E5D5]">Why Connect GitHub?</h2>
        <p>
          Connecting your GitHub account allows Skillforge.dev to inspect source code from repositories you submit for AI code evaluation and verify completed projects.
        </p>
      </section>

      <section id="oauth-flow" className="space-y-3 pt-6 border-t border-[#E8E5D5]/10">
        <h2 className="text-xl font-bold text-[#E8E5D5]">OAuth Authorization Flow</h2>
        <p>
          Skillforge.dev integrates with Clerk&apos;s OAuth provider to securely request read access to your GitHub repositories. You can connect or reconnect your GitHub account anytime at <strong>Dashboard &gt; Connect GitHub</strong>.
        </p>
      </section>

      <section id="repo-permissions" className="space-y-3 pt-6 border-t border-[#E8E5D5]/10">
        <h2 className="text-xl font-bold text-[#E8E5D5]">Permissions & Data Access</h2>
        <DocsCallout type="info" title="Read-Only Access">
          Skillforge.dev only accesses the specific repository content you submit for review. We do not modify repository history or write commits to your account.
        </DocsCallout>
      </section>
    </>
  );
}

export function RenderSubmittingARepository() {
  return (
    <>
      <section id="submission-requirements" className="space-y-3">
        <h2 className="text-xl font-bold text-[#E8E5D5]">Submission Requirements</h2>
        <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-[#E8E5D5]/80">
          <li>The repository must be public or accessible via your connected GitHub OAuth token.</li>
          <li>The repository should contain the actual source code corresponding to the project&apos;s milestones.</li>
          <li>Avoid committing sensitive credentials, API keys, or large binary files (e.g. <code>.env</code>, <code>node_modules</code>).</li>
        </ul>
      </section>

      <section id="triggering-review" className="space-y-3 pt-6 border-t border-[#E8E5D5]/10">
        <h2 className="text-xl font-bold text-[#E8E5D5]">Triggering the Review</h2>
        <p>
          On your project details page, paste your GitHub repository URL into the submission input and click <strong>Submit for Feedback</strong>.
        </p>
      </section>

      <section id="supported-file-types" className="space-y-3 pt-6 border-t border-[#E8E5D5]/10">
        <h2 className="text-xl font-bold text-[#E8E5D5]">Supported Languages & Files</h2>
        <p>
          Skillforge.dev fetches and analyzes JavaScript, TypeScript, Python, Go, Rust, Java, C++, SQL, CSS, and HTML source files up to standard API token limits.
        </p>
      </section>
    </>
  );
}

export function RenderUnderstandingReviews() {
  return (
    <>
      <section id="review-components" className="space-y-3">
        <h2 className="text-xl font-bold text-[#E8E5D5]">Review Components</h2>
        <p>
          AI code reviews evaluate multiple facets of your submitted code, highlighting strengths and offering concrete refactoring suggestions.
        </p>
      </section>

      <section id="evaluation-criteria" className="space-y-3 pt-6 border-t border-[#E8E5D5]/10">
        <h2 className="text-xl font-bold text-[#E8E5D5]">Evaluation Criteria</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
          <div className="p-4 rounded-xl border border-[#E8E5D5]/15 bg-[#0D0D0D] space-y-1">
            <span className="font-semibold text-xs text-[#E8E5D5]">Code Quality</span>
            <p className="text-xs text-[#E8E5D5]/70">Readability, naming conventions, type safety, and DRY principles.</p>
          </div>
          <div className="p-4 rounded-xl border border-[#E8E5D5]/15 bg-[#0D0D0D] space-y-1">
            <span className="font-semibold text-xs text-[#E8E5D5]">Architecture</span>
            <p className="text-xs text-[#E8E5D5]/70">Component separation, modularity, and database query efficiency.</p>
          </div>
          <div className="p-4 rounded-xl border border-[#E8E5D5]/15 bg-[#0D0D0D] space-y-1">
            <span className="font-semibold text-xs text-[#E8E5D5]">Security</span>
            <p className="text-xs text-[#E8E5D5]/70">Input validation, environment secret handling, and auth checks.</p>
          </div>
          <div className="p-4 rounded-xl border border-[#E8E5D5]/15 bg-[#0D0D0D] space-y-1">
            <span className="font-semibold text-xs text-[#E8E5D5]">Performance</span>
            <p className="text-xs text-[#E8E5D5]/70">Re-rendering optimization, memory leaks, and async handling.</p>
          </div>
        </div>
      </section>

      <section id="sample-review" className="space-y-3 pt-6 border-t border-[#E8E5D5]/10">
        <h2 className="text-xl font-bold text-[#E8E5D5]">Sample Review Output</h2>
        <div className="p-5 rounded-xl border border-[#E8E5D5]/20 bg-[#0E0E0E] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E5D5]/10 font-mono text-xs">
            <span className="text-[#E8E5D5] font-semibold">AI REVIEW REPORT (EXAMPLE)</span>
            <span className="text-emerald-400 font-semibold">PASSED</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-2.5 rounded-lg bg-white/[0.03] border border-[#E8E5D5]/10">
              <div className="text-[10px] font-mono text-[#E8E5D5]/50">Code Quality</div>
              <div className="text-lg font-bold text-emerald-400">92</div>
            </div>
            <div className="p-2.5 rounded-lg bg-white/[0.03] border border-[#E8E5D5]/10">
              <div className="text-[10px] font-mono text-[#E8E5D5]/50">Architecture</div>
              <div className="text-lg font-bold text-emerald-400">88</div>
            </div>
            <div className="p-2.5 rounded-lg bg-white/[0.03] border border-[#E8E5D5]/10">
              <div className="text-[10px] font-mono text-[#E8E5D5]/50">Security</div>
              <div className="text-lg font-bold text-emerald-400">91</div>
            </div>
            <div className="p-2.5 rounded-lg bg-white/[0.03] border border-[#E8E5D5]/10">
              <div className="text-[10px] font-mono text-[#E8E5D5]/50">Performance</div>
              <div className="text-lg font-bold text-amber-400">79</div>
            </div>
          </div>
          <p className="text-xs text-[#E8E5D5]/80 leading-relaxed">
            <strong>Strengths:</strong> Clean TypeScript interfaces and modular directory layout.<br />
            <strong>Actionable Improvement:</strong> Wrap heavy database calls with cached query helpers to reduce redundant connections.
          </p>
        </div>
      </section>
    </>
  );
}

export function RenderDeveloperPortfolio() {
  return (
    <>
      <section id="portfolio-overview" className="space-y-3">
        <h2 className="text-xl font-bold text-[#E8E5D5]">Portfolio Overview</h2>
        <p>
          Every Skillforge.dev user receives a dedicated developer portfolio page that showcases completed projects, verified skill badges, XP level, and recent challenge completions.
        </p>
      </section>

      <section id="public-vs-private" className="space-y-3 pt-6 border-t border-[#E8E5D5]/10">
        <h2 className="text-xl font-bold text-[#E8E5D5]">Public vs. Private Visibility</h2>
        <p>
          You can toggle your portfolio between <strong>Public</strong> (accessible to recruiters and clients) and <strong>Private</strong> (only visible when logged into your account) via <strong>Dashboard &gt; Settings</strong>.
        </p>
      </section>

      <section id="shareable-link" className="space-y-3 pt-6 border-t border-[#E8E5D5]/10">
        <h2 className="text-xl font-bold text-[#E8E5D5]">Shareable Link Structure</h2>
        <DocsCodeBlock
          language="bash"
          filename="portfolio-url.txt"
          code={`https://skillforge.dev/portfolio/your-username`}
        />
      </section>
    </>
  );
}

export function RenderPublicProfile() {
  return (
    <>
      <section id="profile-fields" className="space-y-3">
        <h2 className="text-xl font-bold text-[#E8E5D5]">Customizable Profile Fields</h2>
        <ul className="list-disc pl-6 space-y-1.5 text-xs sm:text-sm text-[#E8E5D5]/80">
          <li><strong>Display Name:</strong> Your full name or developer handle.</li>
          <li><strong>Headline:</strong> A short one-line engineering summary (e.g. &quot;Backend Engineer | Go & Distributed Systems&quot;).</li>
          <li><strong>Bio:</strong> A paragraph describing your technical background and goals.</li>
          <li><strong>Avatar:</strong> Synced via Clerk or your GitHub profile.</li>
        </ul>
      </section>

      <section id="skill-badges" className="space-y-3 pt-6 border-t border-[#E8E5D5]/10">
        <h2 className="text-xl font-bold text-[#E8E5D5]">Skill Badges & XP Display</h2>
        <p>
          As you complete projects and challenges, Skillforge.dev tallies your top skills and displays verified badges and total XP directly on your profile.
        </p>
      </section>

      <section id="portfolio-preview" className="space-y-3 pt-6 border-t border-[#E8E5D5]/10">
        <h2 className="text-xl font-bold text-[#E8E5D5]">Portfolio Preview</h2>
        <p>
          You can preview your public portfolio at any time by clicking <strong>View Portfolio</strong> in your dashboard navigation.
        </p>
      </section>
    </>
  );
}

export function RenderResume() {
  return (
    <>
      <section id="uploading-resume" className="space-y-3">
        <h2 className="text-xl font-bold text-[#E8E5D5]">Uploading Your Resume</h2>
        <p>
          You can upload your resume in <strong>Dashboard &gt; Settings</strong>. File uploads are handled securely via <strong>UploadThing</strong>.
        </p>
      </section>

      <section id="supported-formats" className="space-y-3 pt-6 border-t border-[#E8E5D5]/10">
        <h2 className="text-xl font-bold text-[#E8E5D5]">Supported Formats & File Limits</h2>
        <p>
          Skillforge.dev accepts standard PDF documents up to 4MB in size.
        </p>
      </section>

      <section id="public-access" className="space-y-3 pt-6 border-t border-[#E8E5D5]/10">
        <h2 className="text-xl font-bold text-[#E8E5D5]">Public Download Accessibility</h2>
        <p>
          When your portfolio is set to Public, visitors can click <strong>Download Resume</strong> to view or download your attached document. You can remove or replace your resume anytime.
        </p>
      </section>
    </>
  );
}

export function RenderProfile() {
  return (
    <>
      <section id="editing-profile" className="space-y-3">
        <h2 className="text-xl font-bold text-[#E8E5D5]">Editing Profile Information</h2>
        <p>
          Update your headline, bio, and username under <strong>Dashboard &gt; Settings</strong>. All edits are saved to PostgreSQL and immediately reflected on your public portfolio.
        </p>
      </section>

      <section id="managing-skills" className="space-y-3 pt-6 border-t border-[#E8E5D5]/10">
        <h2 className="text-xl font-bold text-[#E8E5D5]">Managing Your Skill Set</h2>
        <p>
          Add or remove technical skills from your profile to calibrate project suggestions and daily coding challenges.
        </p>
      </section>
    </>
  );
}

export function RenderSettings() {
  return (
    <>
      <section id="portfolio-toggle" className="space-y-3">
        <h2 className="text-xl font-bold text-[#E8E5D5]">Public / Private Portfolio Toggle</h2>
        <p>
          Control who can access your public portfolio URL. When toggled off, visitors to <code className="text-[#E8E5D5] bg-white/10 px-1 py-0.5 rounded font-mono text-xs">/portfolio/[username]</code> will see a private profile screen.
        </p>
      </section>

      <section id="github-connection" className="space-y-3 pt-6 border-t border-[#E8E5D5]/10">
        <h2 className="text-xl font-bold text-[#E8E5D5]">GitHub Connection Status</h2>
        <p>
          View your connected GitHub account status and refresh permissions if needed for repository code reviews.
        </p>
      </section>

      <section id="data-controls" className="space-y-3 pt-6 border-t border-[#E8E5D5]/10">
        <h2 className="text-xl font-bold text-[#E8E5D5]">Data Management & Account Deletion</h2>
        <p>
          Request account deletion or export your data by contacting our support team at <a href="mailto:anuragjena14@gmail.com" className="text-[#E8E5D5] underline">anuragjena14@gmail.com</a>.
        </p>
      </section>
    </>
  );
}

export function RenderAuthentication() {
  return (
    <>
      <section id="auth-provider" className="space-y-3">
        <h2 className="text-xl font-bold text-[#E8E5D5]">Clerk Authentication</h2>
        <p>
          Skillforge.dev utilizes <strong>Clerk</strong> for enterprise-grade authentication, multi-factor security, session token rotation, and passwordless OAuth flows.
        </p>
      </section>

      <section id="oauth-sign-in" className="space-y-3 pt-6 border-t border-[#E8E5D5]/10">
        <h2 className="text-xl font-bold text-[#E8E5D5]">Supported Sign-in Providers</h2>
        <ul className="list-disc pl-6 space-y-1.5 text-xs sm:text-sm text-[#E8E5D5]/80">
          <li><strong>GitHub OAuth:</strong> Recommended for developers. Seamlessly links repositories.</li>
          <li><strong>Email & Password:</strong> Standard secure email registration and sign-in.</li>
        </ul>
      </section>

      <section id="session-security" className="space-y-3 pt-6 border-t border-[#E8E5D5]/10">
        <h2 className="text-xl font-bold text-[#E8E5D5]">Session Security & Encryption</h2>
        <p>
          All API requests and server actions verify user authentication via Clerk server helpers (<code>auth()</code>). Protected dashboard routes automatically redirect unauthenticated users to <code>/sign-in</code>.
        </p>
      </section>
    </>
  );
}

export function RenderFAQ() {
  return (
    <>
      <section id="faq-what-is" className="space-y-3">
        <h2 className="text-xl font-bold text-[#E8E5D5]">What is Skillforge.dev?</h2>
        <p>
          Skillforge.dev is an AI-powered developer learning platform that converts your desired tech stack into structured real-world projects, daily coding challenges, automated code reviews, and verifiable developer portfolios.
        </p>
      </section>

      <section id="faq-generation" className="space-y-3 pt-6 border-t border-[#E8E5D5]/10">
        <h2 className="text-xl font-bold text-[#E8E5D5]">How are projects generated?</h2>
        <p>
          Projects are generated via OpenAI/Gemini models using custom prompts parameterized with your selected skill tags and your current performance rating.
        </p>
      </section>

      <section id="faq-stack" className="space-y-3 pt-6 border-t border-[#E8E5D5]/10">
        <h2 className="text-xl font-bold text-[#E8E5D5]">Can I choose my own tech stack?</h2>
        <p>
          Yes! You can specify any combination of languages, frameworks, and databases (e.g. Next.js, Python, FastAPI, Tailwind CSS, PostgreSQL) when generating projects.
        </p>
      </section>

      <section id="faq-github-required" className="space-y-3 pt-6 border-t border-[#E8E5D5]/10">
        <h2 className="text-xl font-bold text-[#E8E5D5]">Do I need a GitHub account?</h2>
        <p>
          A GitHub account is optional for browsing and creating projects, but required if you want automated AI code reviews on submitted repositories.
        </p>
      </section>

      <section id="faq-portfolio-public" className="space-y-3 pt-6 border-t border-[#E8E5D5]/10">
        <h2 className="text-xl font-bold text-[#E8E5D5]">Can I make my portfolio private?</h2>
        <p>
          Yes. You can toggle your portfolio between public and private visibility at any time in your dashboard settings.
        </p>
      </section>

      <section id="faq-cost" className="space-y-3 pt-6 border-t border-[#E8E5D5]/10">
        <h2 className="text-xl font-bold text-[#E8E5D5]">Is Skillforge.dev free to use?</h2>
        <p>
          Skillforge.dev provides core developer features including project generation, milestone tracking, daily challenges, and public portfolios during the platform launch.
        </p>
      </section>
    </>
  );
}

export function RenderTroubleshooting() {
  return (
    <>
      <section id="github-access-error" className="space-y-3">
        <h2 className="text-xl font-bold text-[#E8E5D5]">GitHub Access or 404 Errors</h2>
        <p>
          If you receive an error when submitting a repository for review, ensure that:
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-xs sm:text-sm text-[#E8E5D5]/80">
          <li>The repository is public or you have authorized GitHub OAuth with repository read scope.</li>
          <li>The repository URL is formatted as <code>https://github.com/username/repository</code>.</li>
        </ul>
      </section>

      <section id="milestone-sync-issue" className="space-y-3 pt-6 border-t border-[#E8E5D5]/10">
        <h2 className="text-xl font-bold text-[#E8E5D5]">Milestone Updates Not Saving</h2>
        <p>
          If milestone status does not save, ensure your network connection is stable and you are signed in. Refreshing the project page will reload the latest persisted database state.
        </p>
      </section>

      <section id="ai-timeout" className="space-y-3 pt-6 border-t border-[#E8E5D5]/10">
        <h2 className="text-xl font-bold text-[#E8E5D5]">AI Generation Timeouts</h2>
        <p>
          During peak times, generative API responses may take up to 10 seconds. If a generation request fails, retry after a few moments.
        </p>
      </section>
    </>
  );
}

export function RenderContact() {
  return (
    <>
      <section id="support-channels" className="space-y-3">
        <h2 className="text-xl font-bold text-[#E8E5D5]">Support Channels</h2>
        <p>
          Have questions or need developer support? Contact our team directly:
        </p>
        <div className="p-4 rounded-xl border border-[#E8E5D5]/15 bg-[#0D0D0D] font-mono text-xs space-y-1 text-[#E8E5D5]/80">
          <p><strong className="text-[#E8E5D5]">Email:</strong> anuragjena14@gmail.com</p>
          <p><strong className="text-[#E8E5D5]">Platform:</strong> skillforge.dev</p>
        </div>
      </section>

      <section id="reporting-bugs" className="space-y-3 pt-6 border-t border-[#E8E5D5]/10">
        <h2 className="text-xl font-bold text-[#E8E5D5]">Reporting Bugs & Feature Requests</h2>
        <p>
          If you encounter a bug or have a suggestion for improving project workflows, email us with steps to reproduce the issue and your browser/environment details.
        </p>
      </section>
    </>
  );
}

export function DocsTopicContent({ slug }: { slug: string }) {
  switch (slug) {
    case "getting-started":
      return <RenderGettingStarted />;
    case "your-first-project":
      return <RenderYourFirstProject />;
    case "project-generation":
      return <RenderProjectGeneration />;
    case "project-types":
      return <RenderProjectTypes />;
    case "project-milestones":
      return <RenderProjectMilestones />;
    case "completing-a-project":
      return <RenderCompletingAProject />;
    case "github-integration":
      return <RenderGitHubIntegration />;
    case "submitting-a-repository":
      return <RenderSubmittingARepository />;
    case "understanding-reviews":
      return <RenderUnderstandingReviews />;
    case "developer-portfolio":
      return <RenderDeveloperPortfolio />;
    case "public-profile":
      return <RenderPublicProfile />;
    case "resume":
      return <RenderResume />;
    case "profile":
      return <RenderProfile />;
    case "settings":
      return <RenderSettings />;
    case "authentication":
      return <RenderAuthentication />;
    case "faq":
      return <RenderFAQ />;
    case "troubleshooting":
      return <RenderTroubleshooting />;
    case "contact":
      return <RenderContact />;
    default:
      return (
        <div className="py-12 text-center text-sm text-[#E8E5D5]/60 font-mono">
          Documentation content is loading or not available.
        </div>
      );
  }
}
