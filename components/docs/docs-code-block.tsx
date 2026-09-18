"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface DocsCodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export function DocsCodeBlock({
  code,
  language = "typescript",
  filename,
}: DocsCodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <div className="my-6 rounded-xl border border-[#E8E5D5]/15 bg-[#0D0D0D] overflow-hidden text-[#E8E5D5] shadow-lg">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#141414] border-b border-[#E8E5D5]/10 font-mono text-xs">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 items-center">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/30 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/30 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/30 inline-block" />
          </div>
          {filename ? (
            <span className="text-[#E8E5D5]/80 font-medium ml-2">{filename}</span>
          ) : (
            <span className="text-[#E8E5D5]/50 uppercase tracking-widest text-[10px] ml-2">
              {language}
            </span>
          )}
        </div>

        <button
          onClick={handleCopy}
          type="button"
          aria-label="Copy code to clipboard"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono text-[#E8E5D5]/70 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-[#E8E5D5]/15 transition-all"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <pre className="p-4 overflow-x-auto text-xs sm:text-[13px] font-mono leading-relaxed text-[#E8E5D5]/90 selection:bg-[#E8E5D5]/20">
        <code>{code.trim()}</code>
      </pre>
    </div>
  );
}
