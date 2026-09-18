import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface DocsPaginationProps {
  prev?: { title: string; href: string };
  next?: { title: string; href: string };
}

export function DocsPagination({ prev, next }: DocsPaginationProps) {
  if (!prev && !next) return null;

  return (
    <div className="mt-16 pt-8 border-t border-[#E8E5D5]/15 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {prev ? (
        <Link
          href={prev.href}
          className="group flex flex-col p-4 rounded-xl border border-[#E8E5D5]/15 bg-[#0D0D0D] hover:bg-[#151515] hover:border-[#E8E5D5]/30 transition-all text-left"
        >
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#E8E5D5]/50 group-hover:text-[#E8E5D5]/80 transition-colors">
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
            <span>Previous</span>
          </div>
          <div className="text-sm font-semibold text-[#E8E5D5] mt-1 group-hover:text-white transition-colors">
            {prev.title}
          </div>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={next.href}
          className="group flex flex-col p-4 rounded-xl border border-[#E8E5D5]/15 bg-[#0D0D0D] hover:bg-[#151515] hover:border-[#E8E5D5]/30 transition-all text-right sm:col-start-2"
        >
          <div className="flex items-center justify-end gap-1.5 text-[11px] font-mono text-[#E8E5D5]/50 group-hover:text-[#E8E5D5]/80 transition-colors">
            <span>Next</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <div className="text-sm font-semibold text-[#E8E5D5] mt-1 group-hover:text-white transition-colors">
            {next.title}
          </div>
        </Link>
      ) : null}
    </div>
  );
}
