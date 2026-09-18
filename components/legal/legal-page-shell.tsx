"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { ChevronDown, ChevronRight, ShieldAlert, ArrowUp } from "lucide-react";

export interface LegalSectionItem {
  id: string;
  number: string;
  title: string;
}

interface LegalPageShellProps {
  title: string;
  subtitle?: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSectionItem[];
  children: React.ReactNode;
}

const easeCurve = [0.16, 1, 0.3, 1] as const;

export function LegalPageShell({
  title,
  subtitle,
  lastUpdated,
  intro,
  sections,
  children,
}: LegalPageShellProps) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || "");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const shouldReduceMotion = useReducedMotion();

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // Sort by top position to select the topmost intersecting section
          const topmost = visibleEntries.reduce((prev, current) =>
            prev.boundingClientRect.top < current.boundingClientRect.top ? prev : current
          );
          setActiveSection(topmost.target.id);
        }
      },
      {
        rootMargin: "-90px 0px -60% 0px",
        threshold: [0, 0.2, 0.5],
      }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [sections]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -96; // Header offset
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: shouldReduceMotion ? "auto" : "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: shouldReduceMotion ? "auto" : "smooth" });
  };

  const activeTitle = sections.find((s) => s.id === activeSection)?.title || "Table of Contents";

  return (
    <div className="min-h-screen bg-black text-[#E8E5D5] flex flex-col selection:bg-[#E8E5D5]/20 selection:text-white">
      {/* Top Navbar */}
      <div className="border-b border-[#E8E5D5]/10 bg-black/80 backdrop-blur-md sticky top-0 z-40">
        <Navbar />
      </div>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12 py-10 sm:py-16">
        {/* Header / Intro Section */}
        <motion.header
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeCurve }}
          className="max-w-4xl mb-12 sm:mb-16 border-b border-[#E8E5D5]/12 pb-10 sm:pb-12"
        >
          {/* Breadcrumb Eyebrow */}
          <div className="flex items-center gap-2 mb-4">
            <Link
              href="/"
              className="text-xs font-mono uppercase tracking-[0.2em] text-[#E8E5D5]/50 hover:text-[#E8E5D5] transition-colors"
            >
              Skillforge.dev
            </Link>
            <ChevronRight className="w-3 h-3 text-[#E8E5D5]/40" />
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#E8E5D5]/80 font-semibold px-2 py-0.5 rounded border border-[#E8E5D5]/20 bg-[#E8E5D5]/[0.03]">
              LEGAL
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#E8E5D5] leading-[1.12] mb-3">
            {title}{" "}
            {subtitle && (
              <span className="block sm:inline font-serif-editorial italic font-normal text-[#F4F1E8]">
                {subtitle}
              </span>
            )}
          </h1>

          {/* Last Updated */}
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-wide text-[#E8E5D5]/50 mb-6">
            <span>Last updated:</span>
            <span className="text-[#E8E5D5]/80 font-medium">{lastUpdated}</span>
          </div>

          {/* Intro Paragraph */}
          <p className="text-base sm:text-lg text-[#E8E5D5]/80 leading-relaxed max-w-3xl font-normal">
            {intro}
          </p>
        </motion.header>

        {/* Mobile Sticky Table of Contents Dropdown */}
        <div className="lg:hidden sticky top-[73px] z-30 mb-8 -mx-5 px-5 py-3 bg-black/95 backdrop-blur-md border-y border-[#E8E5D5]/15">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="w-full flex items-center justify-between text-xs font-medium text-[#E8E5D5] py-1.5 px-3 rounded-lg border border-[#E8E5D5]/20 bg-[#E8E5D5]/[0.04]"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Table of Contents"
          >
            <span className="flex items-center gap-2 truncate">
              <span className="text-[#E8E5D5]/50 font-mono">Jump to:</span>
              <span className="truncate text-[#E8E5D5]">{activeTitle}</span>
            </span>
            <ChevronDown
              className={`w-4 h-4 text-[#E8E5D5]/70 transition-transform duration-200 shrink-0 ${
                mobileMenuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {mobileMenuOpen && (
            <div className="mt-2 max-h-64 overflow-y-auto rounded-lg border border-[#E8E5D5]/20 bg-[#0A0908] p-2 shadow-2xl space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full text-left px-3 py-2 text-xs rounded-md flex items-center gap-2.5 transition-colors ${
                    activeSection === section.id
                      ? "bg-[#E8E5D5]/15 text-white font-medium"
                      : "text-[#E8E5D5]/70 hover:bg-[#E8E5D5]/5 hover:text-[#E8E5D5]"
                  }`}
                >
                  <span className="font-mono text-[10px] text-[#E8E5D5]/50 shrink-0">
                    {section.number}
                  </span>
                  <span className="truncate">{section.title}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Two-Column Desktop Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Sticky Table of Contents */}
          <aside className="hidden lg:block lg:col-span-4 xl:col-span-4">
            <div className="sticky top-28 space-y-4 max-h-[calc(100vh-8rem)] overflow-y-auto pr-3 scrollbar-thin scrollbar-thumb-[#E8E5D5]/20">
              <div className="flex items-center gap-2 pb-2 border-b border-[#E8E5D5]/15">
                <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#E8E5D5]/50 font-semibold">
                  Table of Contents
                </span>
              </div>

              <nav className="space-y-1">
                {sections.map((section) => {
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all duration-200 flex items-start gap-3 group ${
                        isActive
                          ? "bg-[#E8E5D5]/10 text-white font-semibold border-l-2 border-[#E8E5D5] pl-2.5"
                          : "text-[#E8E5D5]/65 hover:text-[#E8E5D5] hover:bg-[#E8E5D5]/[0.03]"
                      }`}
                    >
                      <span
                        className={`font-mono text-[11px] shrink-0 mt-0.5 ${
                          isActive ? "text-[#E8E5D5]" : "text-[#E8E5D5]/40 group-hover:text-[#E8E5D5]/70"
                        }`}
                      >
                        {section.number}
                      </span>
                      <span className="leading-snug">{section.title}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Quick Jump to Top in sidebar */}
              <div className="pt-4 border-t border-[#E8E5D5]/10">
                <button
                  type="button"
                  onClick={scrollToTop}
                  className="text-[11px] font-mono text-[#E8E5D5]/50 hover:text-[#E8E5D5] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowUp className="w-3 h-3" />
                  <span>Back to top</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Right Column: Legal Content */}
          <section className="lg:col-span-8 xl:col-span-8 max-w-[760px]">
            <div className="space-y-12 sm:space-y-16">{children}</div>

            {/* Legal Disclaimer Box */}
            <div className="mt-16 sm:mt-20 p-5 sm:p-6 rounded-2xl border border-[#E8E5D5]/20 bg-[#E8E5D5]/[0.03] flex items-start gap-4">
              <ShieldAlert className="w-5 h-5 text-[#E8E5D5]/70 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-[13px] text-[#E8E5D5]/70 leading-relaxed">
                <strong className="text-[#E8E5D5] font-semibold block mb-1">
                  General Informational Notice
                </strong>
                This document is provided for general informational purposes and should be reviewed
                and adapted to the applicable legal requirements before production use. It does not
                constitute formal legal advice.
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export function LegalSection({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article
      id={id}
      className="scroll-mt-28 border-b border-[#E8E5D5]/10 pb-10 sm:pb-12 last:border-b-0"
    >
      <div className="flex items-center gap-2.5 mb-4">
        <span className="font-mono text-xs text-[#E8E5D5]/50 font-semibold px-2 py-0.5 rounded border border-[#E8E5D5]/15 bg-[#E8E5D5]/[0.02]">
          {number}
        </span>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#E8E5D5]">
          {title}
        </h2>
      </div>
      <div className="text-[15px] sm:text-[16px] text-[#E8E5D5]/80 leading-[1.75] space-y-4 font-normal">
        {children}
      </div>
    </article>
  );
}
