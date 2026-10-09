import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/drizzle/client";
import { eq, desc } from "drizzle-orm";
import { projects } from "@/lib/drizzle/schema";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { MessageSquareCode, CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const runtime = "nodejs";

type Feedback = {
  overall?: string;
  strengths?: string[];
  areasForImprovement?: string[];
};

export default async function ReviewsPage() {
  const { userId } = await auth();
  if (!userId) {
    return <div>Not authorized.</div>;
  }

  // Fetch all projects with feedback
  const userProjects = await db.query.projects.findMany({
    where: eq(projects.userId, userId),
    orderBy: [desc(projects.createdAt)],
  });

  const reviewedProjects = userProjects.filter(
    (p) => p.feedback !== null && p.feedback !== undefined
  );

  return (
    <div className="space-y-8 pb-10">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F4F1E8]">Code Reviews</h1>
        <p className="text-sm text-[#E8E5D5]/65">
          Detailed AI-powered code reviews, strengths analysis, and feedback on your submitted repositories.
        </p>
      </div>

      {reviewedProjects.length === 0 ? (
        <div className="py-16 px-4 rounded-xl bg-[#121216] border border-dashed border-white/[0.08] text-center space-y-4">
          <MessageSquareCode className="h-12 w-12 text-[#E8E5D5]/30 mx-auto" />
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-[#F4F1E8]">No reviews received yet</h3>
            <p className="text-xs text-[#E8E5D5]/50 max-w-md mx-auto">
              Complete your milestones on any project and submit your GitHub repository for a comprehensive AI code review.
            </p>
          </div>
          <Link href="/dashboard/projects">
            <Button className="bg-[#E8E5D5] text-black hover:bg-white text-xs font-semibold">
              View Active Projects <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {reviewedProjects.map((project) => {
            const feedback = project.feedback as Feedback | null;
            return (
              <Card key={project.id} className="bg-[#121216] border-white/[0.08] shadow-sm">
                <CardHeader className="p-5 sm:p-6 border-b border-white/[0.06]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-emerald-400/10 text-emerald-300 border-emerald-400/20 text-xs">
                          Reviewed
                        </Badge>
                        <span className="text-xs text-[#E8E5D5]/50 font-mono">
                          {project.projectType === "micro" ? "Micro Project" : "Real-World"}
                        </span>
                      </div>
                      <CardTitle className="text-lg font-bold text-[#F4F1E8]">
                        {project.title}
                      </CardTitle>
                    </div>

                    <Link href={`/dashboard/projects/${project.id}`}>
                      <Button variant="outline" size="sm" className="border-white/[0.1] text-xs text-[#E8E5D5] hover:bg-white/[0.05]">
                        View Full Project <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>
                </CardHeader>

                <CardContent className="p-5 sm:p-6 space-y-4">
                  {feedback?.overall && (
                    <div className="space-y-1">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-[#E8E5D5]/60">
                        Assessment Summary
                      </h4>
                      <p className="text-sm text-[#E8E5D5]/80 leading-relaxed">
                        {feedback.overall}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    {feedback?.strengths && feedback.strengths.length > 0 && (
                      <div className="space-y-2 p-3.5 rounded-lg bg-emerald-500/[0.04] border border-emerald-500/10">
                        <h5 className="text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Strengths
                        </h5>
                        <ul className="space-y-1.5 text-xs text-[#E8E5D5]/80">
                          {feedback.strengths.map((str, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-emerald-400 mt-0.5">•</span>
                              <span>{str}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {feedback?.areasForImprovement && feedback.areasForImprovement.length > 0 && (
                      <div className="space-y-2 p-3.5 rounded-lg bg-amber-500/[0.04] border border-amber-500/10">
                        <h5 className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                          <XCircle className="h-3.5 w-3.5" /> Areas For Improvement
                        </h5>
                        <ul className="space-y-1.5 text-xs text-[#E8E5D5]/80">
                          {feedback.areasForImprovement.map((area, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-amber-400 mt-0.5">•</span>
                              <span>{area}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
