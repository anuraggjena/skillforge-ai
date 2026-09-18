"use client";

import Link from "next/link";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

import { usePathname } from "next/navigation";
import { LogIn, LayoutDashboard } from "lucide-react";

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
      <Link
        href={userSignedIn ? "/dashboard" : "/sign-in"}
        className="flex items-center gap-2 rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium border border-[#E8E5D5]/25 hover:border-[#E8E5D5]/60 bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md text-[#E8E5D5] hover:text-white transition-all cursor-pointer group"
      >
        {userSignedIn ? (
          <>
            <LayoutDashboard className="w-3.5 h-3.5 text-[#E8E5D5]/70 group-hover:text-white transition-colors" />
            <span>Dashboard</span>
          </>
        ) : (
          <>
            <LogIn className="w-3.5 h-3.5 text-[#E8E5D5]/70 group-hover:text-white transition-colors" />
            <span>Login</span>
          </>
        )}
      </Link>
    </header>
  );
}