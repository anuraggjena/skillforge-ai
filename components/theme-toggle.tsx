"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  // We now get the current theme and the function to set it
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    // The logic is simple: if the theme is dark, switch to light, otherwise switch to dark.
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    // We've removed the DropdownMenu and are just using a single Button
    <Button variant="outline" size="icon" className="hover:cursor-pointer" onClick={toggleTheme}>
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}