"use client";

import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { updateUserFileUrl } from "@/lib/actions/user-profile.actions";
import { toast } from "sonner";
import { CheckCircle } from "lucide-react";
import { useState } from "react";

export function ResumeUploader({ resumeUrl: initialResumeUrl }: { resumeUrl: string | null }) {

  const [resumeUrl, setResumeUrl] = useState(initialResumeUrl);
  
  return (
    <div className="flex items-center gap-4">
      <UploadButton<OurFileRouter, "resumeUploader">
        endpoint="resumeUploader"
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
            const url = res[0].url;
            updateUserFileUrl({ fileType: 'resume', url: url });
            setResumeUrl(url);
            toast.success("Resume uploaded successfully!");
          }
        }}
        onUploadError={() => {
          toast.error("Resume upload failed.");
        }}
      />
      {resumeUrl && (
        <div className="flex items-center gap-2 text-sm text-green-600">
          <CheckCircle className="h-4 w-4" />
          <span>Resume Uploaded!</span>
        </div>
      )}
    </div>
  )
}