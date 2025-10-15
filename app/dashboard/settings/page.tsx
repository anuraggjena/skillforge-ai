import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/drizzle/client";
import { users } from "@/lib/drizzle/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { EditProfileForm } from "@/components/dashboard/edit-profile-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { updateUserVisibility } from "@/lib/actions/user-profile.actions";
import { AvatarUploader } from "@/components/dashboard/avatar-uploader"; // Import AvatarUploader
import { ResumeUploader } from "@/components/dashboard/resume-uploader"; // Import ResumeUploader

export const runtime = 'nodejs';

export default async function SettingsPage() {
  const { userId } = await auth();
  if (!userId) return notFound();

  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  if (!user) {
    return notFound();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your public profile and account settings.</p>
      </div>

      {/* Avatar Upload Card */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
          <CardDescription>Upload a new avatar. This will be visible on your portfolio.</CardDescription>
        </CardHeader>
        <CardContent>
          <AvatarUploader avatarUrl={user.avatarUrl} />
        </CardContent>
      </Card>

      {/* Profile Details Form */}
      <EditProfileForm user={user} />

      {/* Resume Upload Card */}
      <Card>
        <CardHeader>
            <CardTitle>Resume</CardTitle>
            <CardDescription>Upload your resume (PDF format). This will be available on your public portfolio.</CardDescription>
        </CardHeader>
        <CardContent>
            <ResumeUploader resumeUrl={user.resumeUrl} />
        </CardContent>
      </Card>

      {/* Visibility and other forms can be managed here directly with Server Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Visibility</CardTitle>
          <CardDescription>Choose a unique username to make your portfolio public.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={updateUserVisibility} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="flex items-center">
                <span className="p-2 bg-muted border rounded-l-md text-sm">skillforge.ai/portfolio/</span>
                <Input
                  id="username"
                  name="username"
                  placeholder="your-name"
                  defaultValue={user.username ?? ''}
                  className="rounded-l-none"
                  required
                />
              </div>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="isPublic">Make Portfolio Public</Label>
                <p className="text-xs text-muted-foreground">Allow anyone to view your profile.</p>
              </div>
              <Switch id="isPublic" name="isPublic" defaultChecked={user.isPublic} className="hover:cursor-pointer" />
            </div>
            <Button type="submit" className="hover:cursor-pointer">Save Visibility</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}