"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, BookOpen, Layers } from "lucide-react";
import { DOCS_CATEGORIES } from "./docs-data";
import { DocsSearch } from "./docs-search";

export function DocsSidebar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Header Bar with Search & Menu Button */}
      <div className="lg:hidden w-full mb-6 p-4 rounded-xl border border-[#E8E5D5]/15 bg-[#0D0D0D] flex items-center justify-between gap-3">
        <button
          onClick={() => setMobileMenuOpen(true)}
          type="button"
          className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#E8E5D5]/20 bg-[#151515] text-xs font-mono text-[#E8E5D5] hover:bg-[#202020] transition-colors"
        >
          <Menu className="w-4 h-4" />
          <span>Documentation Menu</span>
        </button>

        <div className="flex-1 max-w-[200px]">
          <DocsSearch />
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="w-4/5 max-w-sm h-full bg-[#0E0E0E] border-r border-[#E8E5D5]/20 p-6 overflow-y-auto flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E8E5D5]/10">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#E8E5D5]">
                  <BookOpen className="w-4 h-4 text-[#E8E5D5]/80" />
                  <span>Documentation</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  type="button"
                  className="p-1.5 rounded-md text-[#E8E5D5]/60 hover:text-white bg-white/[0.05]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <DocsSearch />

              <nav className="space-y-6 pt-2">
                {DOCS_CATEGORIES.map((category) => (
                  <div key={category.name} className="space-y-2">
                    <div className="text-[11px] font-mono uppercase tracking-[0.15em] text-[#E8E5D5]/40 font-semibold px-2">
                      {category.name}
                    </div>
                    <ul className="space-y-1">
                      {category.items.map((item) => {
                        const isActive =
                          pathname === item.href ||
                          (item.href === "/docs" && pathname === "/docs");

                        return (
                          <li key={item.slug}>
                            <Link
                              href={item.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                                isActive
                                  ? "bg-[#E8E5D5]/10 text-white font-semibold border-l-2 border-[#E8E5D5]"
                                  : "text-[#E8E5D5]/70 hover:text-[#E8E5D5] hover:bg-white/[0.03]"
                              }`}
                            >
                              <span>{item.title}</span>
                              {item.badge && (
                                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#E8E5D5]/10 text-[#E8E5D5]/80">
                                  {item.badge}
                                </span>
                              )}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-[#E8E5D5]/10 text-[11px] font-mono text-[#E8E5D5]/40">
              Skillforge.dev Developer Docs
            </div>
          </div>

          <div
            className="flex-1 h-full"
            onClick={() => setMobileMenuOpen(false)}
          />
        </div>
      )}

      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 pr-6 border-r border-[#E8E5D5]/10 sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto space-y-6">
        <DocsSearch />

        <nav className="space-y-6">
          {DOCS_CATEGORIES.map((category) => (
            <div key={category.name} className="space-y-2">
              <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.15em] text-[#E8E5D5]/40 font-semibold px-2">
                <Layers className="w-3 h-3 text-[#E8E5D5]/30" />
                <span>{category.name}</span>
              </div>
              <ul className="space-y-1">
                {category.items.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href === "/docs" && pathname === "/docs");

                  return (
                    <li key={item.slug}>
                      <Link
                        href={item.href}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all ${
                          isActive
                            ? "bg-[#E8E5D5]/10 text-white font-semibold border-l-2 border-[#E8E5D5]"
                            : "text-[#E8E5D5]/70 hover:text-[#E8E5D5] hover:bg-white/[0.03]"
                        }`}
                      >
                        <span>{item.title}</span>
                        {item.badge && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#E8E5D5]/10 text-[#E8E5D5]/80">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
