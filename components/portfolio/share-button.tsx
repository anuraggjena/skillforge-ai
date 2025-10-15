"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Share2, Check } from "lucide-react";

// The component now expects a 'username' which can be null
export function ShareButton({ username }: { username: string | null }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = () => {
    // If there's no username, we can't generate a link
    if (!username) {
      alert("Please set a username in your settings to share your portfolio.");
      return;
    }

    const publicUrl = `${window.location.origin}/portfolio/${username}`;
    
    navigator.clipboard.writeText(publicUrl).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <Button variant="outline" onClick={handleShare} disabled={!username} className="hover:cursor-pointer">
      {isCopied ? (
        <>
          <Check className="mr-1 h-4 w-4 text-green-500" /> Copied URL
        </>
      ) : (
        <>
          <Share2 className="mr-2 h-4 w-4" /> Share Portfolio
        </>
      )}
    </Button>
  );
}