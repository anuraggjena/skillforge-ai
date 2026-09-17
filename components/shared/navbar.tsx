"use client";

import Link from "next/link";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

export function Navbar() {
  const { isSignedIn, isLoaded } = useUser();
  const userSignedIn = isLoaded && Boolean(isSignedIn);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Workflow", href: "#workflow" },
    { name: "Docs", href: "#docs" },
  ];

  return (
    <header className="relative z-20 flex flex-row items-center justify-between px-6 sm:px-8 md:px-12 py-5 max-w-7xl mx-auto w-full">
      {/* Logo: skillforge.dev */}
      <Link
        href="/"
        className="text-xl sm:text-2xl tracking-tight text-[#E8E5D5] hover:text-white transition-colors flex items-center gap-2.5 font-bold"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        <Image
          src="/logo.svg"
          alt="SkillForge"
          width={28}
          height={28}
          className="w-7 h-7"
        />
        <span>skillforge.dev</span>
      </Link>

      {/* Nav links (hidden on mobile, md:flex) */}
      <nav className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="text-sm font-medium text-[#E8E5D5]/75 hover:text-white transition-colors"
          >
            {link.name}
          </Link>
        ))}
      </nav>

      {/* CTA: Login */}
      <Link
        href={userSignedIn ? "/dashboard" : "/sign-in"}
        className="rounded-full px-5 py-2 text-xs sm:text-sm font-medium border border-[#E8E5D5]/25 hover:border-[#E8E5D5]/60 bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md text-[#E8E5D5] hover:text-white transition-all cursor-pointer"
      >
        {userSignedIn ? "Dashboard" : "Login"}
      </Link>
    </header>
  );
}