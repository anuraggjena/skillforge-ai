// This file can be used for any shared type definitions in your project.

export type Milestone = {
  text: string;
  completed: boolean;
};

export type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export type Challenge = {
  id: number;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Expert";
  xp: number;
  category: string;
  estimatedTime: string;
  skillsUsed: string[];
};