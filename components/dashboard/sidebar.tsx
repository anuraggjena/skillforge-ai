"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/shared/logo";
import { Settings } from "lucide-react";
import { navLinks } from "./nav-config";

export { navLinks };

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 flex-col border-r border-white/[0.08] bg-[#0c0c0f] sm:flex select-none">
      {/* Brand Header */}
      <div className="flex h-16 items-center px-6 border-b border-white/[0.06]">
        <Link href="/dashboard" className="flex items-center gap-2.5 font-semibold group">
          <Logo className="h-7 w-7 text-[#E8E5D5] transition-transform group-hover:scale-105" />
          <span className="font-bold text-lg tracking-tight text-[#F4F1E8]">SkillForge</span>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-3.5 space-y-1.5">
        <div className="px-3 py-2 text-[10px] font-mono tracking-wider uppercase text-[#E8E5D5]/40 font-semibold">
          Navigation
        </div>
        {navLinks.map((link) => {
          const isActive =
            pathname === link.href || (link.href !== "/dashboard" && pathname?.startsWith(link.href));
          const Icon = link.icon;
          const CustomIcon = link.customIcon;

          return (
            <Link key={link.href} href={link.href}>
              <div
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-gradient-to-r from-[#E8E5D5]/[0.12] via-white/[0.06] to-transparent text-[#F4F1E8] border border-[#E8E5D5]/20 shadow-sm font-semibold"
                    : "text-[#E8E5D5]/70 hover:text-[#F4F1E8] hover:bg-white/[0.04] border border-transparent"
                }`}
              >
                {Icon && (
                  <Icon
                    className={`h-4 w-4 transition-colors ${
                      isActive ? "text-[#E8E5D5]" : "text-[#E8E5D5]/60"
                    }`}
                  />
                )}
                {CustomIcon && (
                  <CustomIcon
                    className={`h-4 w-4 transition-colors ${
                      isActive ? "text-[#E8E5D5]" : "text-[#E8E5D5]/60"
                    }`}
                  />
                )}
                <span>{link.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Settings Bottom */}
      <div className="p-3.5 border-t border-white/[0.06]">
        <Link href="/dashboard/settings">
          <div
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 ${
              pathname === "/dashboard/settings"
                ? "bg-gradient-to-r from-[#E8E5D5]/[0.12] via-white/[0.06] to-transparent text-[#F4F1E8] border border-[#E8E5D5]/20 shadow-sm font-semibold"
                : "text-[#E8E5D5]/70 hover:text-[#F4F1E8] hover:bg-white/[0.04] border border-transparent"
            }`}
          >
            <Settings
              className={`h-4 w-4 transition-colors ${
                pathname === "/dashboard/settings" ? "text-[#E8E5D5]" : "text-[#E8E5D5]/60"
              }`}
            />
            <span>Settings</span>
          </div>
        </Link>
      </div>
    </aside>
  );
}