// components/shared/footer.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";

const easeCurve = [0.16, 1, 0.3, 1] as const;

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-[#050505] text-[#E8E5D5] overflow-hidden">
      {/* --- Full-Footer Watermark Background with Very Low Opacity (z-0) --- */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden"
      >
        <span className="text-[12vw] sm:text-[13vw] md:text-[14vw] font-extrabold tracking-[0.06em] sm:tracking-[0.08em] uppercase text-[#E8E5D5]/[0.03] leading-none whitespace-nowrap text-center max-w-full">
          SKILLFORGE
        </span>
      </div>

      {/* --- Top Divider with Subtle Center Warm Bronze Glow (z-10) --- */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: easeCurve }}
        className="relative z-10 w-full"
      >
        <div
          className="w-full h-[1px]"
          style={{ backgroundColor: "rgba(225, 220, 200, 0.14)" }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 sm:w-80 md:w-[460px] h-[1px] bg-gradient-to-r from-transparent via-[#E8E5D5]/40 to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 sm:w-56 md:w-72 h-2.5 bg-[#E8E5D5]/[0.08] blur-sm pointer-events-none" />
      </motion.div>

      {/* --- Main Foreground Content Area: 1 Single Row (z-10) --- */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 pt-12 sm:pt-14 md:pt-16 pb-8 sm:pb-9 md:pb-10">
        <div className="flex flex-row items-start justify-between gap-6 sm:gap-10 md:gap-16 w-full">
          {/* 1. BRANDING BLOCK (LEFT) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08, ease: easeCurve }}
            className="flex flex-col items-start min-w-0 max-w-xs sm:max-w-sm md:max-w-md"
          >
            <Link
              href="/#home"
              className="inline-flex items-center gap-2.5 text-lg sm:text-2xl font-bold tracking-tight text-[#E8E5D5] hover:text-white transition-colors group"
            >
              <Image
                src="/logo.svg"
                alt="skillforge.dev"
                width={26}
                height={26}
                className="w-6 h-6 sm:w-6.5 sm:h-6.5 transition-transform duration-300 group-hover:scale-105"
              />
              <span className="text-[#E8E5D5] text-base sm:text-2xl">
                skillforge<span className="text-[#E8E5D5]/70 font-normal">.dev</span>
              </span>
            </Link>

            <div className="mt-2 sm:mt-2.5 text-[11px] sm:text-[13px] text-[#E8E5D5]/65 leading-relaxed space-y-0.5">
              <p>Build real projects. <span className="font-serif-editorial italic text-[#F4F1E8]/90">Prove what you can do.</span></p>
            </div>

            {/* Circular Social Buttons */}
            <div className="mt-6 sm:mt-7 md:mt-8 flex items-center gap-2.5 sm:gap-3">
              <a
                href="https://github.com/anuraggjena"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 sm:w-10 sm:h-10 md:w-10.5 md:h-10.5 aspect-square rounded-full border border-[#E8E5D5]/15 hover:border-[#E8E5D5]/45 bg-white/[0.025] hover:bg-white/[0.07] flex items-center justify-center text-[#E8E5D5]/75 hover:text-white transition-all duration-200 hover:-translate-y-0.5 cursor-pointer shadow-sm group"
              >
                <Github className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#E8E5D5]/75 group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://linkedin.com/in/anuraggjena"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 sm:w-10 sm:h-10 md:w-10.5 md:h-10.5 aspect-square rounded-full border border-[#E8E5D5]/15 hover:border-[#E8E5D5]/45 bg-white/[0.025] hover:bg-white/[0.07] flex items-center justify-center text-[#E8E5D5]/75 hover:text-white transition-all duration-200 hover:-translate-y-0.5 cursor-pointer shadow-sm group"
              >
                <Linkedin className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#E8E5D5]/75 group-hover:text-white transition-colors" />
              </a>
            </div>
          </motion.div>

          {/* 2. RESOURCES (CENTER) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15, ease: easeCurve }}
            className="flex flex-col items-start min-w-[90px] sm:min-w-[120px]"
          >
            <span className="text-[10px] sm:text-[11px] font-mono font-semibold tracking-[0.22em] uppercase text-[#E8E5D5]/65 mb-2 sm:mb-2.5 select-none">
              Resources
            </span>
            <nav className="flex flex-col space-y-1.5 sm:space-y-2">
              <Link
                href="/docs"
                className="text-xs sm:text-[13px] text-[#E8E5D5]/75 hover:text-white transition-colors duration-200"
              >
                Documentation
              </Link>
            </nav>
          </motion.div>

          {/* 3. LEGAL (RIGHT) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.22, ease: easeCurve }}
            className="flex flex-col items-start min-w-[100px] sm:min-w-[130px]"
          >
            <span className="text-[10px] sm:text-[11px] font-mono font-semibold tracking-[0.22em] uppercase text-[#E8E5D5]/65 mb-2 sm:mb-2.5 select-none">
              Legal
            </span>
            <nav className="flex flex-col space-y-1.5 sm:space-y-2">
              <Link
                href="/terms"
                className="text-xs sm:text-[13px] text-[#E8E5D5]/75 hover:text-white transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link
                href="/privacy"
                className="text-xs sm:text-[13px] text-[#E8E5D5]/75 hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </Link>
            </nav>
          </motion.div>
        </div>
      </div>

      {/* --- Bottom Area: Divider & Copyright / Credits Row (z-10) --- */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        {/* Clearly visible divider between main content and copyright row */}
        <div
          className="w-full h-[1px]"
          style={{ backgroundColor: "rgba(225, 220, 200, 0.14)" }}
        />

        {/* Compact bottom row with generous vertical padding */}
        <div className="py-6 sm:py-7 md:py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
          <p className="text-[#E8E5D5]/50 tracking-tight text-[11px] sm:text-xs">
            &copy; {currentYear} skillforge.dev. All rights reserved.
          </p>
          <p className="text-[#E8E5D5]/55 text-[11px] sm:text-xs tracking-normal">
            Built with <span className="text-red-400 inline-block px-0.5">❤️</span> by Anurag Jena
          </p>
        </div>
      </div>
    </footer>
  );
}