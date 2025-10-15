"use server";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, LayoutDashboard, FileCode2, BotMessageSquare, User } from "lucide-react";
import { Logo } from "../shared/logo";
import { auth } from "@clerk/nextjs/server";
import { getUserById } from "@/lib/actions/user.actions";
import { UserProgress } from "./user-progress";
import { ThemeToggle } from "../theme-toggle";

// You can reuse the navLinks definition or define it here
const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/projects", label: "Projects", icon: FileCode2 },
  { href: "/dashboard/mentor", label: "AI Mentor", icon: BotMessageSquare },
  { href: "/dashboard/portfolio", label: "Portfolio", icon: User },
];

export async function Header() {
  const { userId } = await auth();
  let user = null;
  if (userId) {
    user = await getUserById(userId);
  }
  return (
    <header className="flex h-18 items-center justify-between border-b bg-background px-4 md:px-6">
      {/* Mobile Navigation Menu */}
      <div className="sm:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="flex h-16 items-center px-6 mb-4">
              <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
                <Logo className="h-6 w-6 text-foreground" />
                <span>SkillForge</span>
              </Link>
            </div>
            <nav className="grid gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link key={link.href} href={link.href}>
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <Icon className="h-4 w-4" />
                      {link.label}
                    </Button>
                  </Link>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      
      {/* This div is a spacer to help center the title or other elements in the future if needed */}
      <div className="hidden sm:flex sm:flex-1"></div>

      {/* User Button */}
      <div className="flex items-center gap-8">
        <ThemeToggle />
        {user && <UserProgress xp={user.xp ?? 0} level={user.level ?? 1} />}
        <Button variant={"outline"} size={"lg"} className="p-5">
          {user && (
          <span className="text-md font-medium pr-1">
            {user.name}
          </span>
        )}
          <UserButton afterSignOutUrl="/" />
        </Button>
      </div>
    </header>
  );
}