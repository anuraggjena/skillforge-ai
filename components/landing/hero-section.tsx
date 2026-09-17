"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Box, Github, BarChart3 } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { Navbar } from "@/components/shared/navbar";
import { ProductPreviewScene } from "@/components/landing/hero-product-preview";

export function HeroSection() {
  const { isSignedIn, isLoaded } = useUser();

  const easeCurve = [0.16, 1, 0.3, 1] as const;
  const userSignedIn = isLoaded && Boolean(isSignedIn);

  return (
    <section
      id="home"
      className="relative w-full h-[100dvh] max-h-[100dvh] flex flex-col justify-between overflow-hidden bg-black text-[#E8E5D5] pb-6 sm:pb-8 md:pb-10"
    >
      {/* --- Fullscreen Background Image (Centerpiece clearly visible in middle) --- */}
      <motion.div
        initial={{ scale: 1.025, opacity: 0.9 }}
        animate={{ scale: 1.0, opacity: 1 }}
        transition={{ duration: 2.0, ease: easeCurve }}
        className="absolute inset-0 z-0 select-none pointer-events-none"
      >
        <Image
          src="/hero.png"
          alt="SkillForge Cinematic Portal"
          fill
          priority
          unoptimized
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      {/* --- Bilateral Dark Filter (Dark on left and right, crystal clear in the middle) --- */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.75) 20%, rgba(0,0,0,0.2) 36%, rgba(0,0,0,0) 48%, rgba(0,0,0,0) 52%, rgba(0,0,0,0.2) 64%, rgba(0,0,0,0.75) 80%, rgba(0,0,0,0.95) 100%)",
        }}
      />

      {/* --- Top Dark Gradient / Vignette for Navbar Legibility --- */}
      <div
        className="absolute top-0 left-0 right-0 h-36 sm:h-44 md:h-52 z-[2] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.72) 45%, rgba(0,0,0,0.3) 75%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Pure Black Bottom Gradient to connect smoothly to next section on scroll */}
      <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-40 bg-gradient-to-t from-black via-black/70 to-transparent z-[2] pointer-events-none" />

      {/* --- Navigation Bar Overlay Directly ON Hero --- */}
      <Navbar />

      {/* --- Main Hero Content (Left Composition ~45% width) --- */}
      <div className="relative z-10 my-auto max-w-xl lg:max-w-[48%] flex flex-col justify-center px-6 sm:px-10 md:px-14 lg:px-20 py-4">
        {/* Small Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: easeCurve }}
          className="flex items-center gap-2 mb-4 sm:mb-6"
        >
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] text-[#E8E5D5]/70 font-serif-editorial italic">
            #forge.
          </span>
        </motion.div>

        {/* Main Headline */}
        <div className="mb-5 sm:mb-7">
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: easeCurve }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[4.85rem] font-bold tracking-[-0.035em] text-[#E8E5D5] leading-[0.92]"
          >
            <span className="block">Turn Your Skills</span>
            <motion.span
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: easeCurve }}
              className="block font-serif-editorial italic font-normal text-[#F4F1E8] tracking-normal mt-1 sm:mt-2"
            >
              into Real Work.
            </motion.span>
          </motion.h1>
        </div>

        {/* Body Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: easeCurve }}
          className="text-sm sm:text-base lg:text-[16px] text-[#E8E5D5]/70 font-normal leading-relaxed max-w-[480px] mb-6 sm:mb-8"
        >
          SkillForge AI turns your tech stack into real-world projects, helps you sharpen your engineering skills, and turns your progress into proof.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: easeCurve }}
          className="flex flex-row items-center gap-4 mb-6 sm:mb-8"
        >
          {/* Primary CTA */}
          <Link
            href={userSignedIn ? "/dashboard" : "/sign-up"}
            className="group inline-flex items-center justify-center gap-2 bg-[#E8E5D5] hover:bg-white text-black font-medium text-xs sm:text-sm px-6 sm:px-7 py-3 sm:py-3.5 rounded-full transition-all duration-300 shadow-sm shrink-0"
          >
            <span>{userSignedIn ? "Go to Dashboard" : "Start Building"}</span>
            <ArrowRight className="w-3.5 h-3.5 text-black group-hover:translate-x-1 transition-transform duration-300" />
          </Link>

          {/* Secondary CTA */}
          <Link
            href="#features"
            className="group inline-flex items-center justify-center gap-1.5 border border-[#E8E5D5]/25 hover:border-[#E8E5D5]/50 bg-transparent hover:bg-[#E8E5D5]/5 text-[#E8E5D5] font-medium text-xs sm:text-sm px-6 sm:px-7 py-3 sm:py-3.5 rounded-full transition-all duration-300 shrink-0"
          >
            <span>Explore SkillForge</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#E8E5D5]/70 group-hover:text-[#E8E5D5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </Link>
        </motion.div>

        {/* Feature Highlights Row: AI Project Generation | GitHub Review | Skill Intelligence */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85, ease: easeCurve }}
          className="flex items-center gap-6 sm:gap-7 mb-6 sm:mb-8 pt-4 sm:pt-5"
        >
          {/* Feature 1: AI Project Generation */}
          <div className="flex items-center gap-3">
            <Box className="w-5 h-5 text-[#E8E5D5]/75 shrink-0" />
            <div className="text-[14px] sm:text-sm leading-tight text-[#E8E5D5]">
              <p className="font-medium text-[#E8E5D5]/90">AI Project</p>
              <p className="text-[#E8E5D5]/55">Generation</p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-6 w-[1px] bg-white/15 shrink-0" />

          {/* Feature 2: GitHub Review */}
          <div className="flex items-center gap-3">
            <Github className="w-5 h-5 text-[#E8E5D5]/75 shrink-0" />
            <div className="text-[14px] sm:text-sm leading-tight text-[#E8E5D5]">
              <p className="font-medium text-[#E8E5D5]/90">GitHub</p>
              <p className="text-[#E8E5D5]/55">Review</p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-6 w-[1px] bg-white/15 shrink-0" />

          {/* Feature 3: Skill Intelligence */}
          <div className="flex items-center gap-3">
            <BarChart3 className="w-5 h-5 text-[#E8E5D5]/75 shrink-0" />
            <div className="text-[14px] sm:text-sm leading-tight text-[#E8E5D5]">
              <p className="font-medium text-[#E8E5D5]/90">Skill</p>
              <p className="text-[#E8E5D5]/55">Intelligence</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* --- Right Side: Square 3D Product Preview (Integrated in Right Negative Space) --- */}
      <div className="hidden lg:block absolute -right-2 sm:right-1 lg:right-3 xl:right-8 2xl:right-14 top-[40%] xl:top-[38%] z-10 origin-right">
        <ProductPreviewScene />
      </div>

      {/* --- Hand-drawn "Real Projects. Real Growth." with curved pointer arrow --- */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 1.0, ease: easeCurve }}
        className="hidden xl:flex flex-col items-end absolute right-16 xl:right-24 2xl:right-32 bottom-20 xl:bottom-24 2xl:bottom-28 z-10 select-none pointer-events-none"
      >
        {/* Hand-Drawn Curved Arrow pointing up toward the card */}
        <div className="w-14 h-11 mr-3 mb-0.5">
          <svg
            viewBox="0 0 56 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full text-[#E8E5D5]/50 stroke-current"
          >
            {/* Smooth hand-drawn curve pointing up */}
            <path
              d="M10 40 C 18 24, 32 14, 46 6"
              strokeWidth="1.6"
              strokeLinecap="round"
              fill="none"
            />
            {/* Hand-drawn arrowhead */}
            <path
              d="M36 8 L 46 6 L 44 17"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>

        {/* Editorial Text */}
        <div className="text-right -rotate-6">
          <p className="font-serif-editorial italic text-sm xl:text-base text-[#E8E5D5]/50 tracking-wide leading-tight opacity-70">
            Real Projects.
          </p>
          <p className="font-serif-editorial italic text-sm xl:text-base text-[#E8E5D5]/50 tracking-wide leading-tight">
            Real Growth.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
