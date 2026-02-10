# SkillForge AI

SkillForge AI is a developer learning platform that bridges the gap between theory and practice. It uses AI to generate tailored coding projects, challenges, and instant code reviews, helping users build a verified portfolio and accelerate their careers.

Live Link: https://skillforge-dev.vercel.app

## Features

- **AI-Powered Project Generation:** Create micro or real-world projects based on your skills.
- **Custom Coding Challenges:** Generate challenges tailored to your skill level and interests.
- **Instant AI Code Feedback:** Submit your GitHub repo for automated, actionable code reviews.
- **Portfolio Builder:** Showcase completed projects and challenges, including AI feedback.
- **Skill Graph:** Visualize your skill growth over time.
- **Resume Upload:** Add your resume to your public portfolio.
- **GitHub Integration:** Connect your GitHub account for seamless project submissions.

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

2. **Set up environment variables:**
   - Copy `.env.local.example` to `.env.local` and fill in required values (e.g., `DATABASE_URL`, `OPENAI_API_KEY`, Clerk keys).

3. **Run the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Project Structure

- `app/` – Next.js app routes (dashboard, portfolio, API endpoints)
- `components/` – UI and feature components (project generator, challenge generator, skill graph, etc.)
- `lib/` – Database (Drizzle ORM), server actions, and utility functions
- `public/` – Static assets
- `scripts/` – Seed and utility scripts

## Technologies Used

- Next.js 15
- React 19
- Drizzle ORM (PostgreSQL)
- Clerk (authentication)
- UploadThing (file uploads)
- OpenAI (AI project/challenge generation & code review)
- Tailwind CSS
- Radix UI & Lucide Icons

## Deployment

Deploy easily on [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

See [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for details.

## License

MIT © SkillForge Inc.
