// This file extends the default Clerk types to include your custom metadata

// Import the original types
import type { User, SessionClaims } from "@clerk/nextjs/api";

// Define the shape of your custom metadata
interface CustomPublicMetadata {
  githubUsername?: string;
}

interface CustomPrivateMetadata {
  onboardingComplete?: boolean;
}

// Use module augmentation to add the custom metadata to Clerk's types
declare global {
  interface UserPublicMetadata extends CustomPublicMetadata {}
  interface UserPrivateMetadata extends CustomPrivateMetadata {}
  
  // Also add to SessionClaims if you read it from there in middleware/layouts
  interface SessionClaims extends CustomPublicMetadata, CustomPrivateMetadata {}
}

// This empty export is required to make this file a module
export {};