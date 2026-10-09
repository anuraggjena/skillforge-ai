"use client";

import { useState, useMemo } from "react";
import { Search, FolderGit2, Sparkles, Filter, X } from "lucide-react";
import { ProjectCard, ProjectCardData } from "./project-card";

interface ProjectsListClientProps {
  projects: ProjectCardData[];
}

type StatusFilter = "all" | "in-progress" | "completed";
type TypeFilter = "all" | "real-world" | "micro";
type SortOption = "newest" | "oldest" | "progress";

export function ProjectsListClient({ projects }: ProjectsListClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  // Filtering and sorting logic
  const filteredProjects = useMemo(() => {
    return projects
      .filter((project) => {
        // Status filter
        if (statusFilter !== "all" && project.status !== statusFilter) {
          return false;
        }

        // Type filter
        if (typeFilter !== "all" && project.projectType !== typeFilter) {
          return false;
        }

        // Search query filter (matches title, description, or any skill)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = project.title.toLowerCase().includes(q);
          const matchDesc = project.description.toLowerCase().includes(q);
          const matchSkills = project.skills?.some((s) => s.name.toLowerCase().includes(q));
          if (!matchTitle && !matchDesc && !matchSkills) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "newest") {
          const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return timeB - timeA;
        }
        if (sortBy === "oldest") {
          const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return timeA - timeB;
        }
        if (sortBy === "progress") {
          const getPct = (p: ProjectCardData) => {
            const list = p.milestones?.items ?? [];
            if (list.length === 0) return p.status === "completed" ? 100 : 0;
            return Math.round((list.filter((m) => m.completed).length / list.length) * 100);
          };
          return getPct(b) - getPct(a);
        }
        return 0;
      });
  }, [projects, statusFilter, typeFilter, searchQuery, sortBy]);

  const hasActiveFilters = statusFilter !== "all" || typeFilter !== "all" || searchQuery.trim() !== "";

  const resetFilters = () => {
    setStatusFilter("all");
    setTypeFilter("all");
    setSearchQuery("");
  };

  const scrollToGenerator = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const skillsInput = document.getElementById("skills");
    skillsInput?.focus();
  };

  return (
    <div className="space-y-4">
      {/* Header & Count */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/[0.06] pb-3">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-[#F4F1E8]">Your Projects</h2>
          <span className="text-xs px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-[#E8E5D5]/60 font-mono">
            {filteredProjects.length} of {projects.length}
          </span>
        </div>

        {/* Toolbar: Search & Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search Input */}
          <div className="relative flex-1 sm:w-48">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#E8E5D5]/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stack or title..."
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#121216] border border-white/[0.08] text-xs text-[#F4F1E8] placeholder:text-[#E8E5D5]/30 focus:outline-none focus:border-white/[0.2]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#E8E5D5]/40 hover:text-[#F4F1E8]"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          {/* Status Filter Chips */}
          <div className="flex items-center p-0.5 rounded-lg bg-[#121216] border border-white/[0.08]">
            {(["all", "in-progress", "completed"] as StatusFilter[]).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer capitalize ${
                  statusFilter === status
                    ? "bg-white/[0.1] text-[#F4F1E8]"
                    : "text-[#E8E5D5]/50 hover:text-[#E8E5D5]/80"
                }`}
              >
                {status === "in-progress" ? "In Progress" : status}
              </button>
            ))}
          </div>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as TypeFilter)}
            className="px-2.5 py-1.5 rounded-lg bg-[#121216] border border-white/[0.08] text-xs text-[#E8E5D5]/80 focus:outline-none cursor-pointer"
          >
            <option value="all">All Types</option>
            <option value="real-world">Real-World</option>
            <option value="micro">Micro-Project</option>
          </select>

          {/* Sort Selector */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-2.5 py-1.5 rounded-lg bg-[#121216] border border-white/[0.08] text-xs text-[#E8E5D5]/80 focus:outline-none cursor-pointer"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="progress">Highest Progress</option>
          </select>
        </div>
      </div>

      {/* Projects Grid or Empty State */}
      {projects.length === 0 ? (
        /* Empty State: Zero Projects Created */
        <div className="py-14 px-4 rounded-xl bg-[#121216] border border-dashed border-white/[0.08] text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto text-amber-300">
            <FolderGit2 className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-[#F4F1E8]">No projects yet</h3>
            <p className="text-xs text-[#E8E5D5]/50 max-w-sm mx-auto leading-relaxed">
              Create your first project and start building. Gain verified skill evidence through AI code reviews.
            </p>
          </div>
          <button
            onClick={scrollToGenerator}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#E8E5D5] text-black hover:bg-white text-xs font-semibold transition-all cursor-pointer shadow-sm mt-2"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Forge Your First Project →</span>
          </button>
        </div>
      ) : filteredProjects.length === 0 ? (
        /* Filter Empty State */
        <div className="py-12 px-4 rounded-xl bg-[#121216] border border-dashed border-white/[0.08] text-center space-y-3">
          <Filter className="h-8 w-8 text-[#E8E5D5]/30 mx-auto" />
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-[#F4F1E8]">No matching projects</h3>
            <p className="text-xs text-[#E8E5D5]/50 max-w-xs mx-auto">
              No projects match your current filters or search query.
            </p>
          </div>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-xs text-amber-300 hover:text-amber-200 underline cursor-pointer"
            >
              Reset all filters
            </button>
          )}
        </div>
      ) : (
        /* 3-Column Desktop, 2-Column Tablet, 1-Column Mobile Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
