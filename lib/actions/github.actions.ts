"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";

type GitHubFile = {
  path: string;
  type: 'blob' | 'tree';
  url: string;
};

export async function fetchRepoContent(repoUrl: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // 1. Get the user's GitHub OAuth token from Clerk
  const provider = "oauth_github";
  const clerkResponse = await (await clerkClient()).users.getUserOauthAccessToken(userId, provider);
  const accessToken = clerkResponse.data[0]?.token;

  if (!accessToken) {
    throw new Error("GITHUB_NOT_CONNECTED");
  }

  // 2. Parse the owner and repo name from the URL
  const urlParts = repoUrl.replace(/^https?:\/\//, '').split('/');
  if (urlParts[0] !== 'github.com' || urlParts.length < 3) {
    throw new Error("Invalid GitHub repository URL.");
  }
  const owner = urlParts[1];
  const repo = urlParts[2];

  // 3. Use the GitHub API to get the file tree
  const treeResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees/main?recursive=1`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  if (!treeResponse.ok) throw new Error("Failed to fetch repository file tree.");
  
  const { tree } = await treeResponse.json();

  // 4. Filter for relevant code files (limit to 5 to manage cost)
  const codeFiles = tree
    .filter((file: GitHubFile) => 
      file.type === 'blob' && 
      (file.path.endsWith('.js') || file.path.endsWith('.tsx') || file.path.endsWith('.css') || file.path.endsWith('.py'))
    )
    .slice(0, 5);
  
  // 5. Fetch the content of each file
  const fileContents = await Promise.all(
    codeFiles.map(async (file: GitHubFile) => {
      const contentResponse = await fetch(file.url, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      const content = await contentResponse.json();
      const decodedContent = Buffer.from(content.content, 'base64').toString('utf-8');
      return `// FILE: ${file.path}\n\n${decodedContent}\n\n---\n\n`;
    })
  );

  // 6. Return a single string with all the code
  return fileContents.join('');
}