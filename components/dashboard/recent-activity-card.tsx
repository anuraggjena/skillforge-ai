"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  History,
  FolderGit2,
  CheckCircle2,
  Zap,
  MessageSquareCode,
  UserCheck,
  ArrowUpRight,
  Inbox,
} from "lucide-react";
import { RecentActivityItem } from "@/lib/dashboard-types";

interface RecentActivityCardProps {
  activity: RecentActivityItem[];
}

function getActivityIcon(type: RecentActivityItem["type"]) {
  switch (type) {
    case "project_created":
      return <FolderGit2 className="h-3.5 w-3.5 text-blue-300" />;
    case "project_completed":
      return <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />;
    case "challenge_started":
    case "challenge_completed":
      return <Zap className="h-3.5 w-3.5 text-amber-300" />;
    case "review_received":
      return <MessageSquareCode className="h-3.5 w-3.5 text-purple-300" />;
    case "joined":
    default:
      return <UserCheck className="h-3.5 w-3.5 text-[#E8E5D5]" />;
  }
}

function getActivityBg(type: RecentActivityItem["type"]) {
  switch (type) {
    case "project_created":
      return "bg-blue-400/10 border-blue-400/20";
    case "project_completed":
      return "bg-emerald-400/10 border-emerald-400/20";
    case "challenge_started":
    case "challenge_completed":
      return "bg-amber-400/10 border-amber-400/20";
    case "review_received":
      return "bg-purple-400/10 border-purple-400/20";
    case "joined":
    default:
      return "bg-white/[0.06] border-white/[0.1]";
  }
}

export function RecentActivityCard({ activity }: RecentActivityCardProps) {
  const hasActivity = activity && activity.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col justify-between rounded-xl bg-[#121216] border border-white/[0.08] p-4 sm:p-5 transition-all duration-200 hover:border-white/[0.18] shadow-sm h-full"
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-blue-400/10 border border-blue-400/20 text-blue-300">
              <History className="h-3.5 w-3.5" />
            </span>
            <h2 className="text-xs font-semibold tracking-wide uppercase text-[#E8E5D5]/80">
              Recent Activity
            </h2>
          </div>
        </div>

        <p className="text-xs text-[#E8E5D5]/60 mb-3">
          Your latest projects, challenges, and reviews.
        </p>

        {/* Activity List or Empty State */}
        {hasActivity ? (
          <div className="space-y-2">
            {activity.map((item) => {
              const content = (
                <div className="group flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] border border-transparent hover:border-white/[0.08] transition-all duration-150">
                  <div className={`p-1.5 rounded-md border flex-shrink-0 ${getActivityBg(item.type)}`}>
                    {getActivityIcon(item.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs sm:text-sm font-medium text-[#F4F1E8] truncate group-hover:text-amber-200 transition-colors">
                        {item.title}
                      </p>
                      {item.href && (
                        <ArrowUpRight className="h-3 w-3 text-[#E8E5D5]/30 group-hover:text-[#E8E5D5]/80 transition-colors flex-shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-[#E8E5D5]/50">
                      <span>{item.category}</span>
                      <span>·</span>
                      <span>{item.relativeTime}</span>
                    </div>
                  </div>
                </div>
              );

              return item.href ? (
                <Link key={item.id} href={item.href} className="block">
                  {content}
                </Link>
              ) : (
                <div key={item.id}>{content}</div>
              );
            })}
          </div>
        ) : (
          <div className="my-3 py-5 px-4 rounded-lg bg-white/[0.02] border border-dashed border-white/[0.08] text-center space-y-2">
            <Inbox className="h-6 w-6 text-[#E8E5D5]/30 mx-auto" />
            <div className="space-y-0.5">
              <h4 className="text-xs sm:text-sm font-semibold text-[#F4F1E8]">No activity yet</h4>
              <p className="text-[11px] sm:text-xs text-[#E8E5D5]/50 max-w-xs mx-auto leading-relaxed">
                Your activity will appear here once you start building projects or taking challenges.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="pt-3.5 mt-3 border-t border-white/[0.06] flex items-center justify-between">
        <span className="text-xs text-[#E8E5D5]/40 font-mono">
          {hasActivity ? `${activity.length} recent events` : "0 events"}
        </span>
        <span className="text-xs text-[#E8E5D5]/40 font-mono">Real-time sync</span>
      </div>
    </motion.div>
  );
}
