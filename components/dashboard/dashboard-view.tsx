"use client";

import { DashboardData } from "@/lib/dashboard-types";
import { WelcomeHeader } from "./welcome-header";
import { SummaryCards } from "./summary-cards";
import { CurrentFocusCard } from "./current-focus-card";
import { SkillSnapshotCard } from "./skill-snapshot-card";
import { RecentActivityCard } from "./recent-activity-card";
import { NextStepsCard } from "./next-steps-card";

interface DashboardViewProps {
  data: DashboardData;
}

export function DashboardView({ data }: DashboardViewProps) {
  return (
    <div className="space-y-6 sm:space-y-8 pb-10">
      {/* 1. Welcome Header */}
      <WelcomeHeader firstName={data.user.firstName} />

      {/* 2. Four Summary Cards */}
      <SummaryCards stats={data.stats} />

      {/* 3. Row 1: Current Focus & Skill Snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7">
          <CurrentFocusCard currentFocus={data.currentFocus} />
        </div>
        <div className="lg:col-span-5">
          <SkillSnapshotCard skills={data.skills} />
        </div>
      </div>

      {/* 4. Row 2: Recent Activity & Next Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-6">
          <RecentActivityCard activity={data.recentActivity} />
        </div>
        <div className="lg:col-span-6">
          <NextStepsCard nextSteps={data.nextSteps} isNewUser={data.isNewUser} />
        </div>
      </div>
    </div>
  );
}
