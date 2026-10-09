import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Settings } from "lucide-react";
import { Logo } from "../shared/logo";
import { auth } from "@clerk/nextjs/server";
import { getUserById } from "@/lib/actions/user.actions";
import { UserProgress } from "./user-progress";
import { ThemeToggle } from "../theme-toggle";
import { navLinks } from "./nav-config";

export async function Header() {
  const { userId } = await auth();
  let user = null;
  if (userId) {
    user = await getUserById(userId);
  }

  const displayName = user?.name || "Developer";

  return (
    <header className="flex h-16 items-center justify-between border-b border-white/[0.08] bg-[#0c0c0f] px-4 md:px-6 z-20">
      {/* Mobile Navigation Menu */}
      <div className="sm:hidden flex items-center gap-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-[#E8E5D5]/80 hover:text-[#F4F1E8] hover:bg-white/[0.05]">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 bg-[#0c0c0f] border-white/[0.08] text-[#E8E5D5] p-0 flex flex-col justify-between">
            <div>
              <div className="flex h-16 items-center px-6 border-b border-white/[0.06]">
                <Link href="/dashboard" className="flex items-center gap-2.5 font-semibold">
                  <Logo className="h-6 w-6 text-[#E8E5D5]" />
                  <span className="font-bold text-lg text-[#F4F1E8]">SkillForge</span>
                </Link>
              </div>
              <nav className="p-4 space-y-1">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const CustomIcon = link.customIcon;
                  return (
                    <Link key={link.href} href={link.href} className="block">
                      <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#E8E5D5]/70 hover:text-[#F4F1E8] hover:bg-white/[0.06] transition-colors">
                        {Icon && <Icon className="h-4 w-4 text-[#E8E5D5]/60" />}
                        {CustomIcon && <CustomIcon className="h-4 w-4 text-[#E8E5D5]/60" />}
                        <span>{link.label}</span>
                      </div>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="p-4 border-t border-white/[0.06]">
              <Link href="/dashboard/settings" className="block">
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#E8E5D5]/70 hover:text-[#F4F1E8] hover:bg-white/[0.06] transition-colors">
                  <Settings className="h-4 w-4 text-[#E8E5D5]/60" />
                  <span>Settings</span>
                </div>
              </Link>
            </div>
          </SheetContent>
        </Sheet>

        <Link href="/dashboard" className="flex items-center gap-2">
          <Logo className="h-5 w-5 text-[#E8E5D5]" />
          <span className="font-bold text-base text-[#F4F1E8]">SkillForge</span>
        </Link>
      </div>
      
      {/* Spacer */}
      <div className="hidden sm:flex sm:flex-1"></div>

      {/* Top Bar Actions & User Info */}
      <div className="flex items-center gap-3 sm:gap-6">
        <ThemeToggle />
        
        {user && (
          <div className="hidden md:block">
            <UserProgress xp={user.xp ?? 0} level={user.level ?? 1} />
          </div>
        )}

        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08]">
          <span className="hidden sm:inline text-xs font-medium text-[#E8E5D5]/90 max-w-[120px] truncate">
            {displayName}
          </span>
          <UserButton 
            afterSignOutUrl="/" 
            appearance={{
              elements: {
                userButtonAvatarBox: "h-7 w-7 ring-1 ring-white/10"
              }
            }}
          />
        </div>
      </div>
    </header>
  );
}