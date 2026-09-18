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
        className="absolute bottom-0 left-0 w-16 sm:w-24 md:w-30 h-8 sm:h-12 md:h-14 rounded-tr-[20px] sm:rounded-tr-[28px] md:rounded-tr-[36px] border-t border-r border-[#E8E5D5]/22 bg-[#E8E5D5]/[0.02] pointer-events-none transition-colors duration-300"
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className="absolute bottom-0 right-0 w-16 sm:w-24 md:w-30 h-8 sm:h-12 md:h-14 rounded-tl-[20px] sm:rounded-tl-[28px] md:rounded-tl-[36px] border-t border-l border-[#E8E5D5]/22 bg-[#E8E5D5]/[0.02] pointer-events-none transition-colors duration-300"
    />
  );
}

/**
 * CTAContent Component
 * - Staggered reveal of text and CTA button
 */
function CTAContent() {
  return (
    <div className="relative z-10 flex flex-col items-center text-center max-w-[720px] mx-auto">
      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, delay: 0.08, ease: easeCurve }}
        className="inline-flex items-center gap-2 mb-2 sm:mb-3"
      >
        <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase text-[#E8E5D5]/60 font-semibold">
          #FORGE
        </span>
      </motion.div>

      {/* Main Editorial Headline */}
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, delay: 0.16, ease: easeCurve }}
        className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-bold tracking-tight text-[#E8E5D5] leading-[1.12] mb-1 sm:mb-1.5"
      >
        <span className="block">Build what&apos;s next.</span>
        <span className="block font-serif-editorial italic font-normal text-[#F4F1E8] mt-0.5 sm:mt-1">
          Prove what you can do.
        </span>
      </motion.h2>

      {/* Supporting Description */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, delay: 0.22, ease: easeCurve }}
        className="text-xs sm:text-sm md:text-base text-[#E8E5D5]/70 font-normal leading-relaxed max-w-[560px] mx-auto mt-2.5 sm:mt-3 mb-5 sm:mb-6"
      >
        Turn your skills into real projects, get meaningful AI feedback, and
        put your work out there.
      </motion.p>

      {/* Primary CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, delay: 0.28, ease: easeCurve }}
      >
        <Link
          href="/sign-up"
          className="group relative inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#E8E5D5] hover:bg-white text-black font-semibold text-xs sm:text-sm tracking-tight transition-all duration-300 shadow-[0_0_18px_rgba(232,229,213,0.18)] hover:shadow-[0_0_28px_rgba(232,229,213,0.38)] hover:scale-[1.02] cursor-pointer"
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
        transition={{ duration: 0.55, delay: 0.36, ease: easeCurve }}
        className="mt-3 sm:mt-3.5 text-[10px] sm:text-[11px] font-mono tracking-[0.2em] uppercase text-[#E8E5D5]/50 select-none"
      >
        Real projects. Real proof.
      </motion.p>
    </div>
  );
}

/**
 * CTASection Component
 * - Ultra-dark cinematic landscape backdrop matching cta-reference.png
 * - Centered balanced compact panel with subtle warm bronze borders and corner accents
 */
export function CTASection() {
  return (
    <section
      id="cta"
      className="relative w-full py-12 sm:py-14 lg:py-16 overflow-hidden text-[#E8E5D5] flex flex-col items-center justify-center"
    >
      {/* --- Darkened Cinematic Background --- */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none transform-gpu">
        <Image
          src="/features.png"
          alt="SkillForge Atmospheric Backdrop"
          fill
          priority={false}
          unoptimized
          className="object-cover object-center brightness-[0.28] contrast-[1.05] opacity-42"
          sizes="100vw"
        />
      </div>

      {/* --- Top Transition Fade from Workflow Section --- */}
      <div
        className="absolute top-0 left-0 right-0 h-16 sm:h-24 z-[1] pointer-events-none"
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

      {/* --- Ambient Side Crescent Glows --- */}
      <div
        className="absolute -left-48 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full opacity-30 blur-3xl pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(circle, rgba(232,229,213,0.12) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -right-48 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full opacity-30 blur-3xl pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(circle, rgba(232,229,213,0.12) 0%, transparent 70%)",
        }}
      />

      {/* --- Bottom Fade into Footer --- */}
      <div className="absolute bottom-0 left-0 right-0 h-14 sm:h-16 bg-gradient-to-t from-black via-black/80 to-transparent z-[1] pointer-events-none" />

      {/* --- Main Centered CTA Panel --- */}
      <div className="relative z-10 w-full max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 22, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, ease: easeCurve }}
          className="relative w-[94%] sm:w-[90%] md:w-[86%] lg:w-[82%] xl:w-[76%] max-w-[1060px] rounded-[22px] sm:rounded-[28px] md:rounded-[32px] px-6 py-9 sm:px-10 sm:py-11 md:px-12 md:py-12 border border-[#E8E5D5]/22 backdrop-blur-md overflow-hidden shadow-[0_22px_55px_rgba(0,0,0,0.85),0_0_32px_rgba(232,229,213,0.03)] transform-gpu"
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
