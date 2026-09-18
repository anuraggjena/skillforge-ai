"use client";

import { motion } from "framer-motion";

export function AuthBrandPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="hidden lg:flex flex-col justify-between h-full w-full max-w-2xl pl-6 xl:pl-12 py-8 select-none"
    >
      {/* Top Eyebrow & Brand Heading */}
      <div className="space-y-6">
        <div className="space-y-2.5">
          <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#E8E5D5]/50 font-medium">
            SKILLS CREATE POTENTIAL.
          </div>
          <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#E8E5D5]/70 font-semibold">
            REAL WORK CREATES PROOF.
          </div>
          <div className="w-12 h-px bg-[#E8E5D5]/30 pt-1" />
        </div>

        {/* Main Editorial Statement */}
        <div className="text-4xl sm:text-5xl lg:text-[56px] xl:text-[68px] font-bold tracking-tight text-[#E8E5D5] leading-[1.08] space-y-2">
          <div>Turn your skills</div>
          <div>
            into{" "}
            <span className="font-serif-editorial italic font-normal text-[#F4F1E8]">
              what&apos;s next.
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Micro Labels */}
      <div className="pt-16 space-y-3">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-[#E8E5D5]/40">
          <span>BUILD</span>
          <span>/</span>
          <span>REVIEW</span>
          <span>/</span>
          <span>SHOWCASE</span>
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#E8E5D5]/60 font-medium">
          A stronger developer tomorrow.
        </div>
      </div>
    </motion.div>
  );
}
