import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Swords, UserPlus } from "lucide-react";

// Define the shape of a timeline event
export type TimelineEvent = {
  date: Date;
  title: string;
  description: string;
  type: 'joined' | 'project' | 'challenge';
};

// Map event types to icons and colors
const eventConfig = {
  joined: { icon: UserPlus, color: "text-sky-500" },
  project: { icon: Briefcase, color: "text-purple-500" },
  challenge: { icon: Swords, color: "text-amber-500" },
};

export function JourneyTimeline({ events }: { events: TimelineEvent[] }) {
  // Sort events by date, earliest first
  const sortedEvents = events.sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <Card>
      <CardHeader>
        <CardTitle>Learning Journey</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative pl-6">
          {/* The vertical timeline bar */}
          <div className="absolute left-6 top-0 h-full w-0.5 bg-border -translate-x-1/2"></div>

          <div className="space-y-8">
            {sortedEvents.map((event, index) => {
              const { icon: Icon, color } = eventConfig[event.type];
              return (
                <div key={index} className="relative flex items-start">
                  <div className={`absolute left-0 top-1 h-5 w-5 rounded-full bg-background border-2 flex items-center justify-center -translate-x-1/2`}>
                    <Icon className={`h-3 w-3 ${color}`} />
                  </div>
                  <div className="pl-6">
                    <p className="text-sm font-semibold">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.description}</p>
                    <time className="text-xs text-muted-foreground/80 mt-1 block">
                      {event.date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </time>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}