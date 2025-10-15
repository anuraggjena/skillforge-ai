"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { ChallengeCard } from "./challenge-card";
import { Challenge } from "@/lib/types";

export function ChallengeGenerator() {
  const [userSkills, setUserSkills] = useState("");
  const [difficulty, setDifficulty] = useState("Beginner");
  const [newChallenge, setNewChallenge] = useState<Challenge | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setNewChallenge(null);
    setError(null);

    try {
      const response = await fetch('/api/ai/generate-challenge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userSkills, difficulty }),
      });

      if (!response.ok) throw new Error("Failed to generate challenge.");
      
      const data = await response.json();
      // We need to add the skills relationship for the card to display them
      data.challengeSkills = data.skillsUsed?.map((skillName: string) => ({ skill: { name: skillName } })) || [];
      setNewChallenge(data);

    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Generate a Custom Challenge</CardTitle>
          <CardDescription>Enter the skills you want to practice, and let our AI create a unique challenge just for you.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-3">
                <Label htmlFor="skills">Skills to Practice</Label>
                <Textarea
                  id="skills"
                  value={userSkills}
                  onChange={(e) => setUserSkills(e.target.value)}
                  placeholder="e.g., React, TypeScript, Animations..."
                  required
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger id="difficulty">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button type="submit" disabled={isLoading} className="hover:cursor-pointer">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? 'Generating...' : 'Generate Challenge'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {error && <p className="text-destructive">{error}</p>}
      
      {newChallenge && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Your New Challenge:</h3>
          <ChallengeCard challenge={newChallenge} />
        </div>
      )}
    </section>
  );
}