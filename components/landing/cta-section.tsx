"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const easeCurve = [0.16, 1, 0.3, 1] as const;

/**
 * Geometric corner decorative accents matching cta-reference.png
 */
function CTACornerAccent({
  position,
}: {
  position: "bottom-left" | "bottom-right";
}) {
  if (position === "bottom-left") {
    return (
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-24 sm:w-36 md:w-48 h-14 sm:h-20 md:h-26 rounded-tr-[32px] sm:rounded-tr-[48px] md:rounded-tr-[60px] border-t border-r border-[#E8E5D5]/22 bg-[#E8E5D5]/[0.02] pointer-events-none transition-colors duration-300"
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className="absolute bottom-0 right-0 w-24 sm:w-36 md:w-48 h-14 sm:h-20 md:h-26 rounded-tl-[32px] sm:rounded-tl-[48px] md:rounded-tl-[60px] border-t border-l border-[#E8E5D5]/22 bg-[#E8E5D5]/[0.02] pointer-events-none transition-colors duration-300"
    />
  );
}

/**
 * CTAContent Component
 * - Staggered reveal of text and CTA button
 */
function CTAContent() {
  return (
    <div className="relative z-10 flex flex-col items-center text-center max-w-[760px] mx-auto">
      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 0.1, ease: easeCurve }}
        className="inline-flex items-center gap-2 mb-3 sm:mb-4"
      >
        <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase text-[#E8E5D5]/60 font-semibold">
          #FORGE
        </span>
      </motion.div>

      {/* Main Editorial Headline */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.18, ease: easeCurve }}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-[#E8E5D5] leading-[1.08] mb-1 sm:mb-1.5"
      >
        <span className="block">Build what&apos;s next.</span>
        <span className="block font-serif-editorial italic font-normal text-[#F4F1E8] mt-1 sm:mt-1.5">
          Prove what you can do.
        </span>
      </motion.h2>

      {/* Supporting Description */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.26, ease: easeCurve }}
        className="text-xs sm:text-sm md:text-base text-[#E8E5D5]/70 font-normal leading-relaxed max-w-[620px] mx-auto mt-3.5 sm:mt-4 mb-7 sm:mb-8"
      >
        Turn your skills into real projects, get meaningful AI feedback, and
        put your work out there.
      </motion.p>

      {/* Primary CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.34, ease: easeCurve }}
      >
        <Link
          href="/sign-up"
          className="group relative inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#E8E5D5] hover:bg-white text-black font-semibold text-xs sm:text-sm tracking-tight transition-all duration-300 shadow-[0_0_20px_rgba(232,229,213,0.18)] hover:shadow-[0_0_30px_rgba(232,229,213,0.38)] hover:scale-[1.02] cursor-pointer"
        >
          <span>Start Building</span>
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </motion.div>

      {/* Small Supporting Signature Line */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.42, ease: easeCurve }}
        className="mt-4 sm:mt-5 text-[10.5px] sm:text-[11.5px] font-mono tracking-[0.2em] uppercase text-[#E8E5D5]/50 select-none"
      >
        Real projects. Real proof.
      </motion.p>
    </div>
  );
}

/**
 * CTASection Component
 * - Ultra-dark cinematic landscape backdrop matching cta-reference.png
 * - Large centered monolithic panel with subtle warm bronze borders and corner accents
 */
export function CTASection() {
  return (
    <section
      id="cta"
      className="relative w-full py-20 sm:py-24 lg:py-28 overflow-hidden text-[#E8E5D5] flex flex-col items-center justify-center"
    >
      {/* --- Darkened Cinematic Background --- */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none transform-gpu">
        <Image
          src="/features.png"
          alt="SkillForge Atmospheric Backdrop"
          fill
          priority={false}
          unoptimized
          className="object-cover object-center brightness-[0.28] contrast-[1.05] opacity-45"
          sizes="100vw"
        />
      </div>

      {/* --- Top Transition Fade from Workflow Section --- */}
      <div
        className="absolute top-0 left-0 right-0 h-32 sm:h-40 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* --- Deep Vignette & Darkening Overlay --- */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.88) 70%, rgba(0,0,0,0.98) 100%)",
        }}
      />

      {/* --- Ambient Side Crescent Glows (Subtle celestial light from reference) --- */}
      <div
        className="absolute -left-48 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-35 blur-3xl pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(circle, rgba(232,229,213,0.12) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -right-48 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-35 blur-3xl pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(circle, rgba(232,229,213,0.12) 0%, transparent 70%)",
        }}
      />

      {/* --- Bottom Fade into Footer --- */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black via-black/80 to-transparent z-[1] pointer-events-none" />

      {/* --- Main Centered CTA Panel --- */}
      <div className="relative z-10 w-full max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: easeCurve }}
          className="relative w-[94%] sm:w-[90%] md:w-[86%] lg:w-[82%] xl:w-[76%] max-w-[1140px] rounded-[28px] sm:rounded-[36px] md:rounded-[40px] px-6 py-12 sm:px-10 sm:py-16 md:px-16 md:py-20 border border-[#E8E5D5]/22 backdrop-blur-md overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(232,229,213,0.03)] transform-gpu"
          style={{
            background: "rgba(10, 8, 7, 0.82)",
          }}
        >
          {/* Subtle Top & Bottom Rim Glow */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#E8E5D5]/40 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#E8E5D5]/25 to-transparent pointer-events-none" />

          {/* Decorative Corner Plates */}
          <CTACornerAccent position="bottom-left" />
          <CTACornerAccent position="bottom-right" />

          {/* Core Content */}
          <CTAContent />
        </motion.div>
      </div>
    </section>
  );
}
