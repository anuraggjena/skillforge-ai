import React from "react";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { DocsSidebar } from "./docs-sidebar";
import { DocsTableOfContents } from "./docs-toc";
import { DocSubSection } from "./docs-data";

interface DocsLayoutProps {
  children: React.ReactNode;
  subsections?: DocSubSection[];
  category?: string;
  title: string;
  description?: string;
}

export function DocsLayout({
  children,
  subsections = [],
  category,
  title,
  description,
}: DocsLayoutProps) {
  return (
    <div className="min-h-screen bg-black text-[#E8E5D5] flex flex-col font-sans selection:bg-[#E8E5D5]/20 selection:text-white">
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-[#E8E5D5]/[0.02] to-transparent blur-3xl opacity-60" />
      </div>

      {/* Main Navbar */}
      <div className="border-b border-[#E8E5D5]/10 bg-black/80 backdrop-blur-md sticky top-0 z-30">
        <Navbar />
      </div>

      {/* Docs Body Container */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8 py-8 md:py-10 flex gap-8 relative z-10">
        {/* Left Sidebar */}
        <DocsSidebar />

        {/* Center Content Column */}
        <main className="flex-1 min-w-0 max-w-3xl pb-16">
          {/* Header */}
          <div className="mb-8 sm:mb-10 pb-6 border-b border-[#E8E5D5]/10">
            {category && (
              <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#E8E5D5]/60 mb-2 font-medium">
                {category}
              </div>
            )}
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#E8E5D5] leading-[1.15]"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              {title}
            </h1>
            {description && (
              <p className="mt-3 text-sm sm:text-base text-[#E8E5D5]/70 leading-relaxed font-normal">
                {description}
              </p>
            )}
          </div>

          {/* Page Content */}
          <div className="docs-content text-sm sm:text-[15px] text-[#E8E5D5]/85 leading-relaxed space-y-6">
            {children}
          </div>
        </main>

        {/* Right "On This Page" Table of Contents */}
        <DocsTableOfContents sections={subsections} />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
