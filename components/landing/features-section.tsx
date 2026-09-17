"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Box,
  Code2,
  UserRound,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  Bookmark,
  BarChart3,
  Github,
} from "lucide-react";

const easeCurve = [0.16, 1, 0.3, 1] as const;

// --- Subcomponent: Card 01 Preview (AI Project Idea Generation) ---
function ProjectGenerationPreview() {
  const stack = [
    { name: "React", icon: "⚛️" },
    { name: "TypeScript", badge: "TS" },
    { name: "Node.js", dot: "#22c55e" },
    { name: "PostgreSQL", icon: "🐘" },
  ];

  return (
    <div className="px-4 py-3.5 sm:px-4.5 sm:py-4 rounded-xl bg-black/60 border border-[#E8E5D5]/12 flex flex-col justify-between flex-1 gap-3.5 transition-colors duration-300 group-hover:border-[#E8E5D5]/30">
      {/* Stack Selection */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#E8E5D5]/55 group-hover:text-[#E8E5D5]/75 font-semibold transition-colors">
            YOUR STACK
          </span>
          <span className="text-[11px] text-[#E8E5D5]/50 hover:text-[#E8E5D5]/90 cursor-pointer transition-colors">
            + Add more
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {stack.map((item) => (
            <span
              key={item.name}
              className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-[#E8E5D5]/15 group-hover:border-[#E8E5D5]/35 group-hover:bg-white/[0.08] text-xs font-medium text-[#E8E5D5]/90 flex items-center gap-1.5 transition-colors duration-300"
            >
              {item.icon && <span className="text-xs">{item.icon}</span>}
              {item.badge && (
                <span className="text-[9px] font-bold px-1 py-0.2 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  {item.badge}
                </span>
              )}
              {item.dot && (
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: item.dot }}
                />
              )}
              <span>{item.name}</span>
            </span>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <Link
        href="/sign-up"
        className="group/btn w-full py-2 px-3.5 rounded-full bg-[#E8E5D5] hover:bg-white text-black font-semibold text-xs flex items-center justify-center gap-2 transition-all duration-300 shadow-sm group-hover:shadow-[0_0_15px_rgba(232,229,213,0.3)]"
      >
        <span>Generate Project</span>
        <ArrowRight className="w-3.5 h-3.5 text-black group-hover/btn:translate-x-1 transition-transform duration-300" />
      </Link>
    </div>
  );
}

// --- Subcomponent: Card 02 Preview (AI Code Reviews) ---
function CodeReviewPreview() {
  const dimensions = [
    { name: "Code Quality", score: 92 },
    { name: "Architecture", score: 88 },
    { name: "Security", score: 91 },
    { name: "Performance", score: 85 },
  ];

  const radius = 15;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * 92) / 100;

  return (
    <div className="px-4 py-3.5 sm:px-4.5 sm:py-4 rounded-xl bg-black/60 border border-[#E8E5D5]/12 flex flex-col justify-between flex-1 gap-3.5 transition-colors duration-300 group-hover:border-[#E8E5D5]/30">
      {/* Top: Score gauge & Dimensions Progress */}
      <div className="flex items-center justify-between gap-3.5">
        {/* Left: Gauge */}
        <div className="flex flex-col items-center shrink-0">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 40 40">
              <circle
                cx="20"
                cy="20"
                r={radius}
                className="stroke-[#E8E5D5]/15"
                strokeWidth="2.6"
                fill="transparent"
              />
              <circle
                cx="20"
                cy="20"
                r={radius}
                className="stroke-[#E8E5D5] transition-all duration-300"
                strokeWidth="2.6"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xs font-bold text-[#E8E5D5] leading-none">
                92
              </span>
              <span className="text-[7px] text-[#E8E5D5]/50 leading-none mt-0.5">
                /100
              </span>
            </div>
          </div>
          <span className="text-[9.5px] font-medium text-[#E8E5D5]/90 mt-0.5">
            Great work!
          </span>
        </div>

        {/* Right: Progress bars */}
        <div className="flex-1 space-y-1.5 min-w-0">
          {dimensions.map((dim) => (
            <div key={dim.name} className="flex items-center justify-between gap-2">
              <span className="text-[10px] text-[#E8E5D5]/70 truncate flex-1">
                {dim.name}
              </span>
              <div className="w-18 sm:w-24 h-1 rounded-full bg-[#E8E5D5]/15 overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#E8E5D5] group-hover:brightness-125 transition-all duration-300"
                  style={{ width: `${dim.score}%` }}
                />
              </div>
              <span className="text-[10px] font-mono text-[#E8E5D5]/80 w-3.5 text-right shrink-0">
                {dim.score}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom: AI Feedback Note with clear gap */}
      <div className="bg-white/[0.03] border border-[#E8E5D5]/12 group-hover:border-[#E8E5D5]/30 group-hover:bg-white/[0.06] rounded-md px-2.5 py-1.5 flex items-center gap-2 transition-colors duration-300">
        <Sparkles className="w-3.5 h-3.5 text-[#E8E5D5] group-hover:text-white shrink-0 transition-colors duration-300" />
        <p className="text-[9.5px] text-[#E8E5D5]/80 leading-snug truncate">
          Code is well-structured! Optimize queries for peak throughput...
        </p>
      </div>
    </div>
  );
}

// --- Subcomponent: Card 03 Preview (Developer Portfolio) ---
function PortfolioPreview() {
  const radius = 14;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * 92) / 100;

  return (
    <div className="px-4 py-3.5 sm:px-4.5 sm:py-4 rounded-xl bg-black/60 border border-[#E8E5D5]/12 flex flex-col justify-between flex-1 gap-3 transition-colors duration-300 group-hover:border-[#E8E5D5]/30">
      {/* Top: Project visual thumbnail & Review Badge */}
      <div className="flex items-center gap-2.5">
        {/* Project Thumbnail */}
        <div className="relative flex-1 h-13 sm:h-14 rounded-lg overflow-hidden border border-[#E8E5D5]/15 group-hover:border-[#E8E5D5]/40 bg-neutral-900 transition-colors duration-300">
          <Image
            src="/hero.png"
            alt="Project Preview"
            fill
            className="object-cover object-center brightness-95 group-hover:brightness-105 transition-all duration-300"
            sizes="(max-width: 768px) 100vw, 300px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>

        {/* Circular Review Badge */}
        <div className="flex flex-col items-center shrink-0 pr-0.5">
          <div className="relative w-9.5 h-9.5 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 34 34">
              <circle
                cx="17"
                cy="17"
                r={radius}
                className="stroke-[#E8E5D5]/15"
                strokeWidth="2.3"
                fill="transparent"
              />
              <circle
                cx="17"
                cy="17"
                r={radius}
                className="stroke-[#E8E5D5]"
                strokeWidth="2.3"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[10.5px] font-bold text-[#E8E5D5] leading-none">
                92
              </span>
              <span className="text-[6px] text-[#E8E5D5]/50 leading-none mt-0.5">
                /100
              </span>
            </div>
          </div>
          <span className="text-[7.5px] font-mono tracking-wider text-[#E8E5D5]/80 group-hover:text-[#E8E5D5] uppercase font-semibold mt-0.5 transition-colors">
            AI Reviewed
          </span>
        </div>
      </div>

      {/* Middle: Project Name & Tech Badges */}
      <div className="flex items-center justify-between gap-2">
        <h4 className="text-xs sm:text-[12.5px] font-semibold text-[#E8E5D5] leading-none truncate">
          AI SaaS Analytics Platform
        </h4>
        <div className="flex items-center gap-1 shrink-0">
          {["React", "Node.js", "Postgres"].map((tech) => (
            <span
              key={tech}
              className="px-1.5 py-0.2 rounded bg-white/[0.04] border border-[#E8E5D5]/15 group-hover:border-[#E8E5D5]/35 group-hover:bg-white/[0.08] text-[8.5px] text-[#E8E5D5]/85 transition-colors duration-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom: GitHub Link Row */}
      <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#E8E5D5]/10 text-xs text-[#E8E5D5]/75">
        <span className="text-[10px] text-[#E8E5D5]/60 truncate">
          Verified Developer Showcase
        </span>
        <div className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer group-hover:text-white">
          <Github className="w-3 h-3 text-[#E8E5D5]/70 group-hover:text-[#E8E5D5]" />
          <span className="text-[10.5px] font-medium">GitHub</span>
          <ArrowUpRight className="w-3 h-3 text-[#E8E5D5]/60 group-hover:text-[#E8E5D5]" />
        </div>
      </div>
    </div>
  );
}

// --- Features Data Definition ---
const featuresData = [
  {
    number: "01",
    icon: Box,
    title: "Project Idea Generation",
    description:
      "Turn your tech stack into meaningful, real-world projects tailored to your goals and experience.",
    preview: <ProjectGenerationPreview />,
    footerIcon: Bookmark,
    footerText: "Personalized to your skills.",
    delay: 0.08,
  },
  {
    number: "02",
    icon: Code2,
    title: "Code Reviews",
    description:
      "Get in-depth, AI-powered feedback on your code, covering architecture, security, and performance.",
    preview: <CodeReviewPreview />,
    footerIcon: ShieldCheck,
    footerText: "Actionable feedback. Real improvement.",
    delay: 0.16,
  },
  {
    number: "03",
    icon: UserRound,
    title: "Developer Portfolio",
    description:
      "Turn your completed projects into a verified portfolio that showcases your skills and growth.",
    preview: <PortfolioPreview />,
    footerIcon: BarChart3,
    footerText: "Real projects. Real proof.",
    delay: 0.24,
  },
];

/**
 * FeaturesSection Component
 * - Background `/features.png` with clear visibility and atmospheric presence
 * - Hardware-accelerated 60fps / 120fps smooth transitions
 * - Balanced spacing and comfortable card heights
 */
export function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative w-full min-h-screen pt-8 sm:pt-10 lg:pt-12 pb-16 sm:pb-20 lg:pb-24 overflow-hidden text-[#E8E5D5] flex flex-col justify-center"
    >
      {/* --- Fullscreen Background Image (Crisp, Clearly Visible) --- */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none transform-gpu">
        <Image
          src="/features.png"
          alt="SkillForge Cinematic Landscape"
          fill
          priority={false}
          unoptimized
          className="object-cover object-center brightness-105 contrast-[1.02]"
          sizes="100vw"
        />
      </div>

      {/* --- Top Transition Overlay (Seamless smooth fade connecting Hero bottom) --- */}
      <div
        className="absolute top-0 left-0 right-0 h-28 sm:h-36 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* --- Subtle Ambient Vignette (Keeps mountains and glowing rings clearly visible) --- */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.48) 70%, rgba(0,0,0,0.82) 100%)",
        }}
      />

      {/* --- Bottom Fade into Next Section --- */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black via-black/70 to-transparent z-[1] pointer-events-none" />

      {/* --- Section Content Container --- */}
      <div className="relative z-10 max-w-[1450px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: easeCurve }}
          className="text-center max-w-[760px] mx-auto mb-8 sm:mb-10 lg:mb-12"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-5 sm:mb-7">
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#E8E5D5]/60 font-semibold">
              FEATURES
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-[#E8E5D5] leading-[1.08] mb-3 sm:mb-4">
            <span className="block">Powerful tools for</span>
            <span className="block font-serif-editorial italic font-normal text-[#F4F1E8] mt-1 sm:mt-1.5">
              developers, who builds.
            </span>
          </h2>

          {/* Supporting Text */}
          <p className="text-sm sm:text-base text-[#E8E5D5]/70 font-normal leading-relaxed max-w-[680px] mx-auto">
            Generate real-world projects, get AI-powered code reviews, and turn your work into a portfolio that shows what you can actually do.
          </p>
        </motion.div>

        {/* 3 Feature Blocks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-6.5 items-stretch">
          {featuresData.map((feature) => {
            const IconComponent = feature.icon;
            const FooterIcon = feature.footerIcon;

            return (
              <motion.div
                key={feature.number}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.6,
                  delay: feature.delay,
                  ease: easeCurve,
                }}
                className="group relative rounded-2xl px-5.5 py-5 sm:px-6 sm:py-5.5 border border-[#E8E5D5]/15 backdrop-blur-sm flex flex-col justify-between shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:border-[#E8E5D5]/40 hover:shadow-[0_20px_45px_rgba(0,0,0,0.75),0_0_25px_rgba(232,229,213,0.06)] hover:-translate-y-1.5 hover:scale-[1.015] transition-all duration-300 ease-out transform-gpu will-change-transform overflow-hidden cursor-pointer"
                style={{
                  background: "rgba(10, 10, 10, 0.72)",
                }}
              >
                {/* Subtle Radial Hover Highlight */}
                <div className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl bg-[radial-gradient(ellipse_at_top,rgba(232,229,213,0.08),transparent_70%)]" />

                {/* Top: Card Header */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-2.5 mb-2.5">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-lg bg-white/[0.04] border border-[#E8E5D5]/15 group-hover:border-[#E8E5D5]/40 group-hover:bg-[#E8E5D5]/12 flex items-center justify-center shrink-0 text-[#E8E5D5] group-hover:text-white transition-colors duration-300">
                        <IconComponent className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                      </div>
                      <h3 className="text-[15px] sm:text-base font-bold text-[#E8E5D5] group-hover:text-white leading-tight truncate transition-colors duration-300">
                        {feature.title}
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono font-semibold text-[#E8E5D5]/40 group-hover:text-[#E8E5D5]/70 tracking-wider shrink-0 transition-colors duration-300">
                      {feature.number}
                    </span>
                  </div>

                  <p className="text-xs sm:text-[12.5px] text-[#E8E5D5]/70 group-hover:text-[#E8E5D5]/90 leading-normal min-h-[36px] transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>

                {/* Middle: Product Preview UI */}
                <div className="relative z-10 my-3.5 flex-1 flex flex-col">
                  {feature.preview}
                </div>

                {/* Bottom: Card Footer */}
                <div className="relative z-10 flex items-center gap-2 pt-2.5 border-t border-[#E8E5D5]/10 text-[11px] sm:text-xs text-[#E8E5D5]/65 group-hover:text-[#E8E5D5]/85 transition-colors duration-300">
                  <FooterIcon className="w-3.5 h-3.5 text-[#E8E5D5]/50 group-hover:text-[#E8E5D5]/80 shrink-0 transition-colors duration-300" />
                  <span>{feature.footerText}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
