import { Metadata } from "next";
import Image from "next/image";
import { BackToLanding } from "@/components/auth/back-to-landing";
import { CustomSignUp } from "@/components/auth/custom-sign-up";
import { AuthBrandPanel } from "@/components/auth/auth-brand-panel";

export const metadata: Metadata = {
  title: "Sign Up — Skillforge.dev",
  description: "Create your Skillforge.dev account to start turning skills into real projects.",
};

export default function SignUpPage() {
  return (
    <div className="relative min-h-screen w-full bg-black text-[#E8E5D5] flex flex-col justify-between overflow-x-hidden selection:bg-[#E8E5D5]/20 selection:text-white">
      {/* Background: Cinematic darkened features.png */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
        <Image
          src="/features.png"
          alt="SkillForge Background"
          fill
          priority
          quality={95}
          unoptimized
          className="object-cover object-center brightness-105 contrast-105"
        />
        {/* Layer 1: Dark Cinematic Ambient Tint */}
        <div className="absolute inset-0 bg-black/45" />
        {/* Layer 2: Focus gradient behind sign-up panel for contrast */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_50%,rgba(0,0,0,0.55)_0%,transparent_70%)]" />
        {/* Layer 3: Vignette to deep black edges */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.8)_100%)]" />
        {/* Layer 4: Top & Bottom subtle fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />
      </div>

      {/* Top Navigation Bar: Back Button */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12 pt-6 sm:pt-8 flex items-center justify-between">
        <BackToLanding />
      </header>

      {/* Main Two-Column Composition */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12 py-8 sm:py-12 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Custom Sign-Up Panel */}
          <div className="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-start">
            <CustomSignUp />
          </div>

          {/* Right Column: Brand Statement (Desktop) */}
          <div className="lg:col-span-7 xl:col-span-7 hidden lg:flex justify-end">
            <AuthBrandPanel />
          </div>
        </div>

        {/* Mobile Brand Footer Statement */}
        <div className="lg:hidden mt-8 text-center space-y-1.5 select-none opacity-60">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#E8E5D5]">
            SKILLS CREATE POTENTIAL. REAL WORK CREATES PROOF.
          </div>
          <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#E8E5D5]/70">
            A stronger developer tomorrow.
          </div>
        </div>
      </main>

      {/* Bottom Spacer */}
      <footer className="relative z-10 py-4" />
    </div>
  );
}