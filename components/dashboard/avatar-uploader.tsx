"use client";

import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import Image from "next/image";
import { updateUserFileUrl } from "@/lib/actions/user-profile.actions";
import { toast } from "sonner"; // Import toast

export function AvatarUploader({ avatarUrl }: { avatarUrl: string | null }) {
  return (
    <div className="flex items-center gap-6">
      <Image 
        src={avatarUrl ?? '/default-avatar.png'} 
        alt="Current avatar" 
        width={80} 
        height={80} 
        className="rounded-full"
      />
      <UploadButton<OurFileRouter, "avatarUploader">
        endpoint="avatarUploader"
        appearance={{
          button: {
            backgroundColor: "hsl(var(--primary))",
            color: "hsl(var(--primary-foreground))",
            borderRadius: "var(--radius)",
          },
          allowedContent: {
            color: "hsl(var(--muted-foreground))",
          },
        }}

        onClientUploadComplete={(res) => {
          if (res) {
            updateUserFileUrl({ fileType: 'avatar', url: res[0].url });
            toast.success("Avatar updated!");
            window.location.reload();
          }
        }}
        onUploadError={() => {
          toast.error("Avatar upload failed.");
        }}
      />
    </div>
  );
}