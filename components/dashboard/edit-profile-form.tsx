"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { updateUserProfile } from "@/lib/actions/user-profile.actions"
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

type UserProfile = {
  name: string | null;
  headline: string | null;
  bio: string | null;
};

export function EditProfileForm({ user }: { user: UserProfile }) {
  const [isLoading, setIsLoading] = useState(false);

  const clientAction = async (formData: FormData) => {
    setIsLoading(true);
    try {
      // We call the server action here
      await updateUserProfile(formData);
      toast.success("Profile saved successfully!");
    } catch {
      toast.error("Failed to save profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Profile Details</CardTitle>
        <CardDescription>Update your public headline and bio.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={clientAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name" // The 'name' attribute is crucial for server actions
              defaultValue={user.name ?? ""}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="headline">Headline</Label>
            <Input
              id="headline"
              name="headline"
              defaultValue={user.headline ?? ""}
              placeholder="e.g., Full Stack Developer"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              defaultValue={user.bio ?? ""}
              placeholder="Tell us a bit about yourself..."
              rows={4}
            />
          </div>
          <Button type="submit" disabled={isLoading} className="hover:cursor-pointer">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}