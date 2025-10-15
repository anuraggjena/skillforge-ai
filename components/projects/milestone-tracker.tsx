"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { updateMilestones } from "@/lib/actions/project.actions";
import { Milestone } from "@/lib/types";

type MilestoneTrackerProps = {
  projectId: number;
  initialMilestones: { items: Milestone[] };
};

export function MilestoneTracker({ projectId, initialMilestones }: MilestoneTrackerProps) {
  const [milestones, setMilestones] = useState(initialMilestones.items);

  const handleCheckboxChange = async (index: number) => {
    // Create a new array with the updated completion status
    const newMilestones = milestones.map((milestone, i) =>
      i === index ? { ...milestone, completed: !milestone.completed } : milestone
    );

    // Update the local state immediately for a responsive UI
    setMilestones(newMilestones);

    // Call the server action to save the changes to the database
    await updateMilestones(projectId, newMilestones);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Milestones</CardTitle>
        <CardDescription>Check off milestones as you complete them.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {milestones.map((milestone, index) => (
            <div key={index} className="flex items-center space-x-3">
              <Checkbox className="hover:cursor-pointer"
                id={`milestone-${index}`}
                checked={milestone.completed}
                onCheckedChange={() => handleCheckboxChange(index)}
              />
              <label
                htmlFor={`milestone-${index}`}
                className={`text-sm font-medium leading-none ${
                  milestone.completed ? "line-through text-muted-foreground" : ""
                }`}
              >
                {milestone.text}
              </label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}