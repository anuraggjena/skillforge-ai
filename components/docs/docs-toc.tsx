"use client";

import { useState, useEffect } from "react";
import { AlignLeft } from "lucide-react";
import { DocSubSection } from "./docs-data";

interface DocsTableOfContentsProps {
  sections: DocSubSection[];
}

export function DocsTableOfContents({ sections }: DocsTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id || "");

  useEffect(() => {
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0% -60% 0%",
        threshold: 0,
      }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  if (sections.length === 0) return null;

  return (
    <aside className="hidden xl:block w-56 shrink-0 pl-6 sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto space-y-4">
      <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.15em] text-[#E8E5D5]/40 font-semibold">
        <AlignLeft className="w-3.5 h-3.5" />
        <span>On this page</span>
      </div>

      <ul className="space-y-2 border-l border-[#E8E5D5]/10 pl-3">
        {sections.map((section) => {
          const isActive = activeId === section.id;

          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={`block text-xs leading-snug transition-colors ${
                  isActive
                    ? "text-[#E8E5D5] font-semibold -ml-[13px] border-l-2 border-[#E8E5D5] pl-2.5"
                    : "text-[#E8E5D5]/50 hover:text-[#E8E5D5]/80"
                }`}
              >
                {section.title}
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
