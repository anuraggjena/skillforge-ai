"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, Hash, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DOCS_PAGES, DocPageData } from "./docs-data";

interface SearchResult {
  slug: string;
  title: string;
  category: string;
  description: string;
  matchedSection?: string;
  href: string;
}

export function DocsSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut listener: ⌘K or /
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "/" && !isOpen && (e.target as HTMLElement).tagName !== "INPUT") {
        e.preventDefault();
        setIsOpen(true);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Search indexing & query matching
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSelectedIndex(0);
      return;
    }

    const q = query.toLowerCase().trim();
    const hits: SearchResult[] = [];

    Object.values(DOCS_PAGES).forEach((page: DocPageData) => {
      const pageHref = page.slug === "introduction" ? "/docs" : `/docs/${page.slug}`;

      // Check title or description or keywords
      const titleMatch = page.title.toLowerCase().includes(q);
      const descMatch = page.description.toLowerCase().includes(q);
      const keywordMatch = page.keywords.some((k) => k.toLowerCase().includes(q));

      if (titleMatch || descMatch || keywordMatch) {
        hits.push({
          slug: page.slug,
          title: page.title,
          category: page.category,
          description: page.description,
          href: pageHref,
        });
      }

      // Check sub-sections
      page.subsections.forEach((sub) => {
        if (sub.title.toLowerCase().includes(q)) {
          hits.push({
            slug: page.slug,
            title: page.title,
            category: page.category,
            description: page.description,
            matchedSection: sub.title,
            href: `${pageHref}#${sub.id}`,
          });
        }
      });
    });

    setResults(hits.slice(0, 8));
    setSelectedIndex(0);
  }, [query]);

  // Handle arrow keys
  const handleKeyNavigation = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (results.length > 0 ? (prev + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (results.length > 0 ? (prev - 1 + results.length) % results.length : 0));
    } else if (e.key === "Enter" && results.length > 0) {
      e.preventDefault();
      const target = results[selectedIndex];
      if (target) {
        setIsOpen(false);
        router.push(target.href);
      }
    }
  };

  return (
    <div className="w-full">
      {/* Trigger Bar */}
      <button
        onClick={() => setIsOpen(true)}
        type="button"
        className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-[#E8E5D5]/15 bg-[#121212] hover:bg-[#181818] hover:border-[#E8E5D5]/30 text-left transition-all group"
      >
        <div className="flex items-center gap-2.5 text-xs text-[#E8E5D5]/60 group-hover:text-[#E8E5D5]/90 transition-colors">
          <Search className="w-4 h-4 text-[#E8E5D5]/40 group-hover:text-[#E8E5D5]/80" />
          <span>Search documentation...</span>
        </div>
        <div className="flex items-center gap-1 font-mono text-[10px] text-[#E8E5D5]/40 bg-[#E8E5D5]/[0.05] border border-[#E8E5D5]/10 px-1.5 py-0.5 rounded">
          <span>⌘</span>
          <span>K</span>
        </div>
      </button>

      {/* Modal Backdrop & Search Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div
            ref={modalRef}
            className="w-full max-w-xl rounded-2xl border border-[#E8E5D5]/20 bg-[#0E0E0E] shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Input Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[#E8E5D5]/15 bg-[#141414]">
              <Search className="w-4 h-4 text-[#E8E5D5]/60 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyNavigation}
                placeholder="Search documentation (e.g., GitHub, Milestones, Portfolios)..."
                className="w-full bg-transparent text-sm text-[#E8E5D5] placeholder-[#E8E5D5]/40 outline-none font-sans"
              />
              <button
                onClick={() => setIsOpen(false)}
                type="button"
                className="p-1 rounded-md text-[#E8E5D5]/40 hover:text-[#E8E5D5] hover:bg-white/[0.05] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-[380px] overflow-y-auto p-2 divide-y divide-[#E8E5D5]/5">
              {query.trim() && results.length === 0 ? (
                <div className="py-10 text-center text-xs text-[#E8E5D5]/50 font-mono">
                  No matching documentation found for &quot;{query}&quot;.
                </div>
              ) : results.length > 0 ? (
                results.map((res, idx) => (
                  <Link
                    key={`${res.href}-${idx}`}
                    href={res.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-start justify-between p-3 rounded-xl transition-colors ${
                      idx === selectedIndex
                        ? "bg-[#E8E5D5]/10 text-white"
                        : "hover:bg-[#E8E5D5]/[0.04] text-[#E8E5D5]/80"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#E8E5D5]/50">
                          {res.category}
                        </span>
                        <ChevronRight className="w-3 h-3 text-[#E8E5D5]/30" />
                        <span className="font-semibold text-xs text-[#E8E5D5]">
                          {res.title}
                        </span>
                      </div>
                      {res.matchedSection ? (
                        <div className="flex items-center gap-1 text-xs text-amber-300/90 font-mono">
                          <Hash className="w-3 h-3 text-amber-300/70" />
                          <span>{res.matchedSection}</span>
                        </div>
                      ) : (
                        <p className="text-[11px] text-[#E8E5D5]/60 line-clamp-1">
                          {res.description}
                        </p>
                      )}
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-4 text-center text-xs text-[#E8E5D5]/40 font-mono">
                  Type a search query or navigate with <kbd className="bg-white/10 px-1 py-0.5 rounded">↑</kbd> <kbd className="bg-white/10 px-1 py-0.5 rounded">↓</kbd>
                </div>
              )}
            </div>

            {/* Footer Status Bar */}
            <div className="px-4 py-2.5 bg-[#121212] border-t border-[#E8E5D5]/10 flex items-center justify-between text-[11px] font-mono text-[#E8E5D5]/50">
              <div className="flex items-center gap-3">
                <span><kbd className="bg-white/10 px-1 py-0.5 rounded">↵</kbd> Select</span>
                <span><kbd className="bg-white/10 px-1 py-0.5 rounded">↑↓</kbd> Navigate</span>
                <span><kbd className="bg-white/10 px-1 py-0.5 rounded">ESC</kbd> Close</span>
              </div>
              <span>Skillforge.dev Docs</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
