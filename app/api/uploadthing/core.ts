import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@clerk/nextjs/server";

const f = createUploadthing();

export const ourFileRouter = {
  avatarUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async () => {
      const { userId } = await auth();
      if (!userId) throw new UploadThingError("Unauthorized");
      return { userId: userId };
    })
    .onUploadComplete(async ({ metadata }) => {
      console.log("Avatar upload complete for userId:", metadata.userId);
      return { uploadedBy: metadata.userId };
    }),

  resumeUploader: f({ "application/pdf": { maxFileSize: "8MB" } })
    .middleware(async () => {
      const { userId } = await auth();
      if (!userId) throw new UploadThingError("Unauthorized");
      return { userId: userId };
    })
    .onUploadComplete(async ({ metadata }) => {
      console.log("Resume upload complete for userId:", metadata.userId);
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;