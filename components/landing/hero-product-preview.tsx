"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, Clock, BarChart3, Layers } from "lucide-react";

// --- Project Data ---
const projectData = {
  headerLabel: "YOUR NEXT PROJECT",
  title: "AI SaaS Analytics Platform",
  description: "A full-stack SaaS app with auth, payments, and AI-driven analytics.",
  technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
  difficulty: "Intermediate",
  duration: "~ 5 days",
  ctaText: "Generate Project",
  ctaLink: "/sign-up",
};

// --- Review Data ---
const reviewData = {
  headerLabel: "AI REVIEW",
  score: 92,
  maxScore: 100,
  dimensions: ["Code Quality", "Architecture", "Security", "Best Practices"],
  feedbackTitle: "Great work!",
  feedbackSubtitle: "Keep pushing.",
};

const easeCurve = [0.16, 1, 0.3, 1] as const;

/**
 * AI Review Card (Rear supporting 3D card)
 * - Positioned strictly behind the Project Card, scaled up for clarity
 */
export function AIReviewCard() {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * reviewData.score) / reviewData.maxScore;

  return (
    <div
      className="w-[320px] sm:w-[340px] rounded-[22px] p-4.5 sm:p-5 border border-[#E8E5D5]/20 backdrop-blur-md shadow-[0_18px_40px_rgba(0,0,0,0.85)] pointer-events-auto select-none [transform-style:preserve-3d]"
      style={{
        background: "rgba(10, 10, 10, 0.78)",
      }}
    >
      {/* Card Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#E8E5D5]/60 font-semibold">
          {reviewData.headerLabel}
        </span>
      </div>

      {/* Card Body: Checklist & Circular Score */}
      <div className="flex items-center justify-between gap-3">
        {/* Left: Review Checklist */}
        <div className="space-y-2">
          {reviewData.dimensions.map((dim) => (
            <div key={dim} className="flex items-center gap-2">
              <span className="flex items-center justify-center w-4 h-4 rounded-full bg-[#E8E5D5]/10 text-[#E8E5D5]">
                <Check className="w-2.5 h-2.5" />
              </span>
              <span className="text-xs text-[#E8E5D5]/80 font-normal tracking-wide">
                {dim}
              </span>
            </div>
          ))}
        </div>

        {/* Right: Circular score gauge */}
        <div className="flex flex-col items-center shrink-0 pr-0.5">
          <div className="relative w-14 h-14 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 48 48">
              <circle
                cx="24"
                cy="24"
                r={radius}
                className="stroke-[#E8E5D5]/15"
                strokeWidth="2.8"
                fill="transparent"
              />
              <circle
                cx="24"
                cy="24"
                r={radius}
                className="stroke-[#E8E5D5]"
                strokeWidth="2.8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-base font-bold text-[#E8E5D5] leading-none">
                {reviewData.score}
              </span>
              <span className="text-[8.5px] text-[#E8E5D5]/50 leading-none mt-0.5">
                /{reviewData.maxScore}
              </span>
            </div>
          </div>

          <div className="text-center mt-1">
            <p className="text-[10.5px] font-medium text-[#E8E5D5]/90 leading-tight">
              {reviewData.feedbackTitle}
            </p>
            <p className="text-[9px] text-[#E8E5D5]/50 leading-tight">
              {reviewData.feedbackSubtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Project Preview Card (Front Square-proportioned 3D Product Card)
 * - Tightly structured without dead vertical space between badges and bottom section
 */
export function ProjectPreviewCard() {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2, ease: easeCurve }}
      className="w-[335px] sm:w-[355px] lg:w-[370px] rounded-[22px] p-4 sm:p-4.5 border border-[#E8E5D5]/20 backdrop-blur-md shadow-[0_25px_50px_rgba(0,0,0,0.92)] pointer-events-auto select-none flex flex-col gap-2.5 [transform-style:preserve-3d] transition-shadow duration-300"
      style={{
        background: "rgba(10, 10, 10, 0.84)",
      }}
    >
      {/* Card Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[#E8E5D5]/10">
        <span className="text-[9.5px] font-mono tracking-[0.2em] uppercase text-[#E8E5D5]/60 font-semibold">
          {projectData.headerLabel}
        </span>
        <ArrowUpRight className="w-3.5 h-3.5 text-[#E8E5D5]/50" />
      </div>

      {/* Project Info */}
      <div className="flex items-start gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-[#E8E5D5]/10 border border-[#E8E5D5]/15 flex items-center justify-center shrink-0 mt-0.5">
          <Layers className="w-4 h-4 text-[#E8E5D5]" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm sm:text-[14.5px] font-semibold text-[#E8E5D5] leading-snug">
            {projectData.title}
          </h3>
          <p className="text-[11.5px] text-[#E8E5D5]/70 leading-relaxed mt-0.5 line-clamp-2">
            {projectData.description}
          </p>
        </div>
      </div>

      {/* Tech Badges */}
      <div className="flex flex-wrap gap-1.5">
        {projectData.technologies.map((tech) => (
          <span
            key={tech}
            className="px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-[#E8E5D5]/15 text-[10.5px] font-medium text-[#E8E5D5]/80"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Metadata Row (Directly below tech badges) */}
      <div className="flex items-center justify-between text-[11.5px] text-[#E8E5D5]/70 pt-2 border-t border-[#E8E5D5]/10">
        <div className="flex items-center gap-1.5">
          <BarChart3 className="w-3.5 h-3.5 text-[#E8E5D5]/50" />
          <span>{projectData.difficulty}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-[#E8E5D5]/50" />
          <span>{projectData.duration}</span>
        </div>
      </div>

      {/* CTA Button */}
      <Link
        href={projectData.ctaLink}
        className="group w-full py-2.5 px-4 rounded-full bg-[#E8E5D5] hover:bg-white text-black font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-md cursor-pointer mt-0.5"
      >
        <span>{projectData.ctaText}</span>
        <ArrowRight className="w-3.5 h-3.5 text-black group-hover:translate-x-1 transition-transform duration-300" />
      </Link>
    </motion.div>
  );
}

/**
 * PerspectiveStage
 * - AIReviewCard placed strictly BEHIND the Project Card and pushed UP for prominent visibility
 */
export function PerspectiveStage() {
  return (
    <div
      className="relative w-[420px] sm:w-[450px] lg:w-[470px] pointer-events-none [perspective:1200px] [perspective-origin:right_center]"
      style={{
        perspective: "1200px",
        perspectiveOrigin: "right center",
      }}
    >
      {/* Subtle Gentle Floating Motion */}
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{
          duration: 6.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative w-full [transform-style:preserve-3d]"
      >
        {/* --- AI Review Card (Strictly BEHIND Project Card: z-0, pushed UP to -88px) --- */}
        <div
          className="absolute -top-[88px] sm:-top-[96px] right-[18px] sm:right-[26px] z-0 [transform-origin:right_center] [transform-style:preserve-3d]"
          style={{
            transform: "rotateY(-15deg) translateZ(-15px)",
          }}
        >
          <AIReviewCard />
        </div>

        {/* --- Project Preview Card (FRONT MAIN CARD: z-10, positive translateZ) --- */}
        <div
          className="relative z-10 flex justify-end [transform-origin:right_center] [transform-style:preserve-3d]"
          style={{
            transform: "rotateY(-14deg) translateZ(10px)",
          }}
        >
          <ProjectPreviewCard />
        </div>
      </motion.div>
    </div>
  );
}

/**
 * ProductPreviewScene
 * - Minimal smooth entrance transition without excessive zoom/scale
 */
export function ProductPreviewScene() {
  return (
    <motion.div
      initial={{ x: 40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{
        duration: 0.8,
        ease: easeCurve,
      }}
      className="relative [transform-style:preserve-3d]"
    >
      <PerspectiveStage />
    </motion.div>
  );
}

// Export HeroProductPreview alias for backwards compatibility
export const HeroProductPreview = ProductPreviewScene;
