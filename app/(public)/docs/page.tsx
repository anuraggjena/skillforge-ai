import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Code, GitPullRequest, Sparkles, UserCheck, Terminal } from "lucide-react";
import { DocsLayout } from "@/components/docs/docs-layout";
import { DocsCallout } from "@/components/docs/docs-callout";
import { DocsPagination } from "@/components/docs/docs-pagination";
import { DOCS_PAGES } from "@/components/docs/docs-data";

export const metadata: Metadata = {
  title: "Documentation | Skillforge.dev",
  description: "Learn how to use Skillforge.dev to generate projects, review code, and showcase your work.",
};

export default function DocsIntroductionPage() {
  const pageData = DOCS_PAGES["introduction"];

  return (
    <DocsLayout
      category="DOCUMENTATION"
      title="Build with SkillForge."
      description="Everything you need to understand, build with, and get the most from Skillforge.dev."
      subsections={pageData.subsections}
    >
      {/* What is Skillforge.dev */}
      <section id="what-is-skillforge" className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[#E8E5D5] tracking-tight">
          What is Skillforge.dev?
        </h2>
        <p>
          Skillforge.dev is an intelligent developer empowerment platform that bridges the gap between learning syntax and shipping production-quality software. Instead of following static tutorials or passive video lectures, developers use Skillforge.dev to generate structured project roadmaps tailored to their chosen tech stack, work through step-by-step milestones, submit code for automated AI reviews, and curate a verifiable public portfolio.
        </p>
      </section>

      {/* Quick Start Cards */}
      <section id="quick-start" className="my-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/docs/project-generation"
            className="group p-4 rounded-xl border border-[#E8E5D5]/15 bg-[#0D0D0D] hover:bg-[#151515] hover:border-[#E8E5D5]/30 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-8 h-8 rounded-lg bg-[#E8E5D5]/10 flex items-center justify-center text-[#E8E5D5] mb-3 group-hover:bg-[#E8E5D5]/20 transition-colors">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-[#E8E5D5] group-hover:text-white transition-colors">
                Generate a Project
              </h3>
              <p className="text-xs text-[#E8E5D5]/60 mt-1 leading-relaxed">
                Create a project based on your technology stack with adaptive difficulty.
              </p>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-mono text-[#E8E5D5]/50 group-hover:text-[#E8E5D5] mt-4 transition-colors">
              <span>Read guide</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          <Link
            href="/docs/code-reviews"
            className="group p-4 rounded-xl border border-[#E8E5D5]/15 bg-[#0D0D0D] hover:bg-[#151515] hover:border-[#E8E5D5]/30 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-8 h-8 rounded-lg bg-[#E8E5D5]/10 flex items-center justify-center text-[#E8E5D5] mb-3 group-hover:bg-[#E8E5D5]/20 transition-colors">
                <GitPullRequest className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-[#E8E5D5] group-hover:text-white transition-colors">
                Review Your Code
              </h3>
              <p className="text-xs text-[#E8E5D5]/60 mt-1 leading-relaxed">
                Connect or submit your project repository for AI-powered architectural reviews.
              </p>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-mono text-[#E8E5D5]/50 group-hover:text-[#E8E5D5] mt-4 transition-colors">
              <span>Read guide</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          <Link
            href="/docs/developer-portfolio"
            className="group p-4 rounded-xl border border-[#E8E5D5]/15 bg-[#0D0D0D] hover:bg-[#151515] hover:border-[#E8E5D5]/30 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-8 h-8 rounded-lg bg-[#E8E5D5]/10 flex items-center justify-center text-[#E8E5D5] mb-3 group-hover:bg-[#E8E5D5]/20 transition-colors">
                <UserCheck className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-[#E8E5D5] group-hover:text-white transition-colors">
                Build Your Portfolio
              </h3>
              <p className="text-xs text-[#E8E5D5]/60 mt-1 leading-relaxed">
                Showcase completed work, skill tags, XP progression, and verified resumes.
              </p>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-mono text-[#E8E5D5]/50 group-hover:text-[#E8E5D5] mt-4 transition-colors">
              <span>Read guide</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* Core Platform Pillars */}
      <section id="core-pillars" className="space-y-4 pt-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[#E8E5D5] tracking-tight">
          Core Platform Pillars
        </h2>
        <p>
          Skillforge.dev is organized around three connected loops that drive continuous engineering mastery:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="p-4 rounded-xl border border-[#E8E5D5]/10 bg-[#0B0B0B] space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#E8E5D5]">
              <Terminal className="w-4 h-4 text-amber-400" />
              <span>1. Targeted Project Scaffolding</span>
            </div>
            <p className="text-xs text-[#E8E5D5]/70 leading-relaxed">
              Generate custom real-world or micro-projects matching your exact skills. AI generates realistic architectures and actionable milestone checklists.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[#E8E5D5]/10 bg-[#0B0B0B] space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#E8E5D5]">
              <Code className="w-4 h-4 text-emerald-400" />
              <span>2. Milestone Tracking & Hints</span>
            </div>
            <p className="text-xs text-[#E8E5D5]/70 leading-relaxed">
              Mark milestones complete as you build. Earn +10 XP per completed milestone and request AI mentor hints whenever you need contextual guidance.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[#E8E5D5]/10 bg-[#0B0B0B] space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#E8E5D5]">
              <GitPullRequest className="w-4 h-4 text-sky-400" />
              <span>3. Automated GitHub Code Reviews</span>
            </div>
            <p className="text-xs text-[#E8E5D5]/70 leading-relaxed">
              Connect your GitHub repository to submit your source code. The AI inspects code quality, architecture, and potential bugs to give actionable advice.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[#E8E5D5]/10 bg-[#0B0B0B] space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#E8E5D5]">
              <UserCheck className="w-4 h-4 text-purple-400" />
              <span>4. Verifiable Public Portfolio</span>
            </div>
            <p className="text-xs text-[#E8E5D5]/70 leading-relaxed">
              All completed projects, verified tech stack tags, and earned experience points automatically index to your public profile link at <code className="text-[#E8E5D5] bg-white/10 px-1 py-0.5 rounded font-mono text-xs">/portfolio/[username]</code>.
            </p>
          </div>
        </div>
      </section>

      {/* How SkillForge Works */}
      <section id="how-it-works" className="space-y-4 pt-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[#E8E5D5] tracking-tight">
          How SkillForge Works
        </h2>
        <p>
          When you sign up via Clerk, Skillforge.dev initializes a secure profile where you configure your skill sets and track your progress. The platform stores all projects, milestones, challenges, and XP metrics in a high-performance PostgreSQL database via Drizzle ORM.
        </p>

        <DocsCallout type="tip" title="Getting Started Recommendation">
          If you are brand new to Skillforge.dev, start by following our step-by-step{" "}
          <Link href="/docs/getting-started" className="underline font-medium text-[#E8E5D5] hover:text-white">
            Getting Started Guide
          </Link>{" "}
          to create your first project and link your GitHub account.
        </DocsCallout>
      </section>

      {/* Pagination */}
      <DocsPagination next={pageData.next} />
    </DocsLayout>
  );
}
