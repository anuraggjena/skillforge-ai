import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { challenges } from "@/lib/drizzle/schema";
import { InferSelectModel } from "drizzle-orm";

// Get the TypeScript type from our Drizzle schema
type Challenge = InferSelectModel<typeof challenges>;

export function ChallengeCard({ challenge }: { challenge: Challenge }) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge variant="secondary">{challenge.category}</Badge>
          <Badge variant="outline">{challenge.difficulty}</Badge>
        </div>
        <CardTitle>{challenge.title}</CardTitle>
        <CardDescription className="line-clamp-3">{challenge.description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between items-center mt-auto">
        <span className="text-sm font-semibold text-primary">{challenge.xp} XP</span>
        {/* This link won't work yet, but we'll build the page for it next */}
        <Link href={`/dashboard/challenges/${challenge.id}`}>
          <Button size="sm" className="hover:cursor-pointer">Start Challenge</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}