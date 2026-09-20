"use client";

import Link from "next/link";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

import { usePathname } from "next/navigation";
import { LogIn } from "lucide-react";
import { LiquidMetalButton } from "@/components/ui/liquid-metal";

export function Navbar() {
  const { isSignedIn, isLoaded } = useUser();
  const userSignedIn = isLoaded && Boolean(isSignedIn);
  const pathname = usePathname();
  const isDocsActive = pathname?.startsWith("/docs");

  const navLinks = [
    { name: "Features", href: "/#features", isActive: false },
    { name: "Workflow", href: "/#workflow", isActive: false },
    { name: "Docs", href: "/docs", isActive: isDocsActive },
  ];

  return (
    <header className="relative z-20 flex flex-row items-center justify-between px-6 sm:px-8 md:px-12 py-5 max-w-7xl mx-auto w-full">
      {/* Logo: SkillForge AI */}
      <Link
        href="/"
        className="inline-flex items-center gap-2.5 text-lg sm:text-2xl font-bold tracking-tight text-[#E8E5D5] hover:text-white transition-colors group"
      >
        <Image
          src="/logo.svg"
          alt="SkillForge AI"
          width={26}
          height={26}
          className="w-6 h-6 sm:w-6.5 sm:h-6.5 transition-transform duration-300 group-hover:scale-105"
        />
        <span className="text-[#E8E5D5] text-base sm:text-2xl">
          skillforge<span className="text-[#E8E5D5]/70 font-normal">.dev</span>
        </span>
      </Link>

      {/* Nav links (hidden on mobile, md:flex) */}
      <nav className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`text-sm font-medium transition-colors ${
              link.isActive
                ? "text-white font-semibold underline underline-offset-8 decoration-[#E8E5D5]/50"
                : "text-[#E8E5D5]/75 hover:text-white"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>

      {/* CTA: Login */}
      <Link href={userSignedIn ? "/dashboard" : "/sign-in"}>
        <LiquidMetalButton
          size="sm"
          borderWidth={2}
          icon={<LogIn className="w-3.5 h-3.5" />}
          metalConfig={{
            colorBack: "#2A231C",
            colorTint: "#E8E5D5",
            speed: 0.35,
            distortion: 0.12,
            repetition: 3,
          }}
        >
          Login
        </LiquidMetalButton>
      </Link>
    </header>
  );
}