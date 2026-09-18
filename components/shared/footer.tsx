// components/shared/footer.tsx

import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex flex-col gap-3 sm:flex-row py-6 w-full shrink-0 items-center justify-between px-6 md:px-12 border-t border-[#E8E5D5]/15 bg-black text-[#E8E5D5]">
      <p className="text-xs text-[#E8E5D5]/60 font-mono tracking-tight">
        &copy; {currentYear} Skillforge.dev. All rights reserved.
      </p>
      <nav className="flex items-center gap-6">
        <Link
          href="/terms"
          className="text-xs text-[#E8E5D5]/70 hover:text-white transition-colors hover:underline underline-offset-4"
        >
          Terms of Service
        </Link>
        <Link
          href="/privacy"
          className="text-xs text-[#E8E5D5]/70 hover:text-white transition-colors hover:underline underline-offset-4"
        >
          Privacy Policy
        </Link>
      </nav>
    </footer>
  );
}