"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { Logo } from "./logo";
import { ThemeToggle } from "../theme-toggle";

export function Navbar() {
  const { isSignedIn } = useUser();
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      // The fix is applied here with `as NodeListOf<HTMLElement>`
      const sections = document.querySelectorAll("section[id]") as NodeListOf<HTMLElement>;
      let currentSection = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - sectionHeight / 3) {
          currentSection = section.id;
        }
      });
      
      if (window.scrollY < 200) {
        currentSection = "";
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 px-4 md:px-6 backdrop-blur-lg">
      <div className="flex h-16 items-center">
        
        <div className="flex-1 flex justify-start">
          <Link href="/" className="flex items-center gap-1 font-semibold">
          <Logo className="h-10 w-10 text-foreground"/>
            <span className="font-semibold text-xl">SkillForge AI</span>
          </Link>
        </div>

        <nav className="hidden md:flex flex-1 justify-center">
          <div className="flex gap-8">
            <Link
              href="#home"
              className={`text-md font-medium transition-colors ${
                activeSection === 'home' ? 'text-foreground' : 'text-muted-foreground'
              } hover:text-foreground`}
              prefetch={false}
            >
              Home
            </Link>
            <Link
              href="#features"
              className={`text-md font-medium transition-colors ${
                activeSection === 'features' ? 'text-foreground' : 'text-muted-foreground'
              } hover:text-foreground`}
              prefetch={false}
            >
              Features
            </Link>
            <Link
              href="#testimonials"
              className={`text-md font-medium transition-colors ${
                activeSection === 'testimonials' ? 'text-foreground' : 'text-muted-foreground'
              } hover:text-foreground`}
              prefetch={false}
            >
              Testimonials
            </Link>
          </div>
        </nav>

        <div className="flex-1 flex justify-end">
          <div className="flex items-center gap-3">
            <ThemeToggle />
            {isSignedIn ? (
              <>
                <Link href="/dashboard">
                  <Button variant="outline" className="hover:cursor-pointer">Dashboard</Button>
                </Link>
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <>
                <Link href="/sign-in">
                  <Button variant="outline" className="hover:cursor-pointer">Sign In</Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="hover:cursor-pointer">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
        
      </div>
    </header>
  );
}