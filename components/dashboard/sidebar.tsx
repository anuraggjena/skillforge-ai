"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo"; // Using the logo component we created
import { 
  LayoutDashboard, 
  FileCode2, 
  User, 
  Settings, 
  Zap,
  Github
} from "lucide-react";

// Define your navigation links here
const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/projects", label: "Projects", icon: FileCode2 },
  { href: "/dashboard/challenges", label: "Challenges", icon: Zap },
  { href: "/dashboard/portfolio", label: "Portfolio", icon: User },
  { href: "/dashboard/connect-github", label: "Connect GitHub", icon: Github },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 flex-col border-r bg-background sm:flex">
      <div className="flex h-18 items-center px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <Logo className="h-10 w-10 text-foreground" />
          <span className="font-semibold text-xl">SkillForge</span>
        </Link>
      </div>
      <nav className="flex-1 p-4 flex flex-col gap-4">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link key={link.href} href={link.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className="w-full justify-start gap-3 hover:cursor-pointer"
              >
                <Icon className="h-6 w-6" />
                {link.label}
              </Button>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto p-4 border-t">
        <Link href="/dashboard/settings">
          <Button variant="ghost" className="w-full justify-start gap-2 hover:cursor-pointer">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </Link>
      </div>
    </aside>
  );
}