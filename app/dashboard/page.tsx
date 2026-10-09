import { auth } from "@clerk/nextjs/server";
import { getDashboardData } from "@/lib/dashboard-data";
import { DashboardView } from "@/components/dashboard/dashboard-view";
import { createUserInDb } from "@/lib/actions/user.actions";
import { Suspense } from "react";
import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton";

export const runtime = "nodejs";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-sm text-[#E8E5D5]/60">You are not authenticated. Please sign in.</p>
      </div>
    );
  }

  // Ensure user is synchronized with our database
  try {
    await createUserInDb(userId);
  } catch (err) {
    console.error("User DB sync non-fatal error:", err);
  }

  // Fetch full dashboard data server-side
  const dashboardData = await getDashboardData(userId);

  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardView data={dashboardData} />
    </Suspense>
  );
}