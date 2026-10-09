export function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pb-2 border-b border-white/[0.06]">
        <div className="space-y-2">
          <div className="h-8 w-64 bg-white/[0.05] rounded-md" />
          <div className="h-4 w-48 bg-white/[0.03] rounded-md" />
        </div>
        <div className="h-7 w-48 bg-white/[0.03] rounded-full hidden sm:block" />
      </div>

      {/* 4 Summary Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex flex-col justify-between rounded-xl bg-[#121216] border border-white/[0.06] p-5 h-32"
          >
            <div className="flex justify-between items-center">
              <div className="h-3 w-24 bg-white/[0.05] rounded" />
              <div className="h-7 w-7 bg-white/[0.05] rounded-lg" />
            </div>
            <div className="space-y-2">
              <div className="h-7 w-16 bg-white/[0.08] rounded" />
              <div className="h-3 w-32 bg-white/[0.03] rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* Row 1: Current Focus + Skill Snapshot Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 rounded-xl bg-[#121216] border border-white/[0.06] p-6 h-72 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="h-4 w-32 bg-white/[0.05] rounded" />
            <div className="h-6 w-3/4 bg-white/[0.08] rounded" />
            <div className="h-4 w-full bg-white/[0.03] rounded" />
            <div className="h-2 w-full bg-white/[0.05] rounded-full" />
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-white/[0.06]">
            <div className="h-3 w-20 bg-white/[0.03] rounded" />
            <div className="h-8 w-32 bg-white/[0.08] rounded-lg" />
          </div>
        </div>

        <div className="lg:col-span-5 rounded-xl bg-[#121216] border border-white/[0.06] p-6 h-72 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="h-4 w-32 bg-white/[0.05] rounded" />
            <div className="space-y-3 pt-2">
              {[1, 2, 3].map((s) => (
                <div key={s} className="space-y-1.5">
                  <div className="flex justify-between">
                    <div className="h-3 w-20 bg-white/[0.05] rounded" />
                    <div className="h-3 w-8 bg-white/[0.05] rounded" />
                  </div>
                  <div className="h-1.5 w-full bg-white/[0.04] rounded-full" />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-white/[0.06]">
            <div className="h-3 w-16 bg-white/[0.03] rounded" />
            <div className="h-4 w-24 bg-white/[0.05] rounded" />
          </div>
        </div>
      </div>

      {/* Row 2: Recent Activity + Next Steps Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 rounded-xl bg-[#121216] border border-white/[0.06] p-6 min-h-[300px] flex flex-col justify-between">
          <div className="space-y-3">
            <div className="h-4 w-32 bg-white/[0.05] rounded" />
            <div className="space-y-2 pt-2">
              {[1, 2, 3].map((a) => (
                <div key={a} className="h-12 bg-white/[0.03] rounded-lg" />
              ))}
            </div>
          </div>
          <div className="h-3 w-24 bg-white/[0.03] rounded pt-2" />
        </div>

        <div className="lg:col-span-6 rounded-xl bg-[#121216] border border-white/[0.06] p-6 min-h-[300px] flex flex-col justify-between">
          <div className="space-y-3">
            <div className="h-4 w-36 bg-white/[0.05] rounded" />
            <div className="space-y-2 pt-2">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-12 bg-white/[0.03] rounded-lg" />
              ))}
            </div>
          </div>
          <div className="h-3 w-24 bg-white/[0.03] rounded pt-2" />
        </div>
      </div>
    </div>
  );
}
