// app/layout.tsx

import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SkillForge AI",
  description: "Bridge the gap between learning and doing with AI-generated projects.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      {/* HEADS UP! As pointed out, no extra whitespace between the <html> and <body> tags.
        This is critical to prevent React hydration errors in Next.js!
        Clean code, happy browser.
      */}
      <body className={outfit.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <Toaster richColors /> 
          {children}
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}