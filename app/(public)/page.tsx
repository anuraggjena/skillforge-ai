"use client";

import { Footer } from "@/components/shared/footer";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { WorkflowSection } from "@/components/landing/workflow-section";
import { CTASection } from "@/components/landing/cta-section";

export default function LandingPage() {
  return (
    <div className="bg-black text-[#E8E5D5] min-h-screen">
      {/* --- Redesigned Cinematic Editorial Hero Section --- */}
      <HeroSection />

      {/* --- Cinematic 3-Card Features Section --- */}
      <FeaturesSection />

      {/* --- Workflow Section --- */}
      <WorkflowSection />

      {/* --- Final CTA Section --- */}
      <CTASection />

      {/* --- Footer --- */}
      <Footer />
    </div>
  );
}