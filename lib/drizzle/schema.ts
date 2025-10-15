import { pgTable, varchar, integer, serial, text, jsonb, timestamp, primaryKey, pgEnum, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: varchar('id', { length: 256 }).primaryKey(),
  email: varchar('email', { length: 256 }).notNull(),
  name: varchar('name', { length: 256 }),
  xp: integer('xp').default(0),
  level: integer('level').default(1),
  performanceRating: integer('performance_rating').default(50).notNull(),
  avatarUrl: varchar('avatar_url', { length: 512 }),
  headline: varchar('headline', { length: 256 }),
  bio: text('bio'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  resumeUrl: varchar('resume_url', { length: 512 }),
  username: varchar('username', { length: 50 }).unique(),
  isPublic: boolean('is_public').default(false).notNull(),
});

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 256 }).notNull().references(() => users.id),
  title: varchar('title', { length: 256 }).notNull(),
  description: text('description').notNull(),
  milestones: jsonb('milestones').notNull(),
  projectType: varchar('project_type', { enum: ['micro', 'real-world'] }).notNull(),
  status: varchar('status', { enum: ['in-progress', 'completed'] }).default('in-progress'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  repoUrl: varchar('repo_url', { length: 512 }),
  feedback: jsonb('feedback'),
});

// Master list of all skills
export const skills = pgTable('skills', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
});

// Join table to link projects and skills
export const projectSkills = pgTable('project_skills', {
  projectId: integer('project_id').notNull().references(() => projects.id),
  skillId: integer('skill_id').notNull().references(() => skills.id),
}, (t) => ({
  pk: primaryKey({ columns: [t.projectId, t.skillId] }),
}));

// Define the relationships for Drizzle's query builder
export const projectRelations = relations(projects, ({ many }) => ({
  projectSkills: many(projectSkills),
}));

export const skillRelations = relations(skills, ({ many }) => ({
  projectSkills: many(projectSkills),
  challengeSkills: many(challengeSkills),
}));

export const projectSkillsRelations = relations(projectSkills, ({ one }) => ({
  project: one(projects, {
    fields: [projectSkills.projectId],
    references: [projects.id],
  }),
  skill: one(skills, {
    fields: [projectSkills.skillId],
    references: [skills.id],
  }),
}));

export const challengeDifficultyEnum = pgEnum('challenge_difficulty', ['Beginner', 'Intermediate', 'Expert']);

export const challengeStatusEnum = pgEnum('challenge_status', ['not-started', 'in-progress', 'completed', 'failed']);

// Master list of all challenges
export const challenges = pgTable('challenges', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 256 }).notNull(),
  description: text('description').notNull(),
  category: varchar('category', { length: 100 }), // e.g., 'Web Dev', 'AI'
  difficulty: challengeDifficultyEnum('difficulty').notNull(),
  xp: integer('xp').notNull(),
  estimatedTime: varchar('estimated_time', { length: 50 }), // e.g., '~30 mins'
});

// Table to track user progress on challenges
export const userChallenges = pgTable('user_challenges', {
  userId: varchar('user_id', { length: 256 }).notNull().references(() => users.id),
  challengeId: integer('challenge_id').notNull().references(() => challenges.id),
  status: challengeStatusEnum('status').default('not-started').notNull(),
  startedAt: timestamp('started_at'),
  completedAt: timestamp('completed_at'),
}, (t) => ({
  pk: primaryKey({ columns: [t.userId, t.challengeId] }),
}));

// Define relationships for Drizzle's query builder
export const challengeRelations = relations(challenges, ({ many }) => ({
  userChallenges: many(userChallenges),
  challengeSkills: many(challengeSkills),
}));

export const userChallengeRelations = relations(userChallenges, ({ one }) => ({
  user: one(users, {
    fields: [userChallenges.userId],
    references: [users.id],
  }),
  challenge: one(challenges, {
    fields: [userChallenges.challengeId],
    references: [challenges.id],
  }),
}));

export const challengeSkills = pgTable('challenge_skills', {
  challengeId: integer('challenge_id').notNull().references(() => challenges.id),
  skillId: integer('skill_id').notNull().references(() => skills.id),
}, (t) => ({
  pk: primaryKey({ columns: [t.challengeId, t.skillId] }),
}));

export const challengeSkillsRelations = relations(challengeSkills, ({ one }) => ({
  challenge: one(challenges, {
    fields: [challengeSkills.challengeId],
    references: [challenges.id],
  }),
  skill: one(skills, {
    fields: [challengeSkills.skillId],
    references: [skills.id],
  }),
}));