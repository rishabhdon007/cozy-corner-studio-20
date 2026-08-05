import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// Helper to write file content directly to GitHub repo via REST API
async function commitFileToGithub(filePath: string, contentBuffer: Buffer, message: string) {
  const token = process.env.GITHUB_TOKEN;
  const repoUrl = process.env.GITHUB_REPO_URL;
  if (!token || !repoUrl) {
    throw new Error('Missing GITHUB_TOKEN or GITHUB_REPO_URL env variables');
  }

  const cleanUrl = repoUrl.replace(/^(https?:\/\/)?(www\.)?github\.com\//, '');
  const parts = cleanUrl.split('/');
  const owner = parts[0];
  const repo = parts[1]?.replace(/\.git$/, '');

  if (!owner || !repo) {
    throw new Error('Invalid GITHUB_REPO_URL format. Expected: github.com/owner/repo');
  }

  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;

  // Get current file sha if it exists
  let sha: string | undefined;
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });
    if (res.ok) {
      const data = await res.json();
      sha = data.sha;
    }
  } catch (_) {
    // Ignore error if file doesn't exist yet
  }

  // Put new file content
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      content: contentBuffer.toString('base64'),
      sha,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`GitHub REST API failed: ${errText}`);
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    // Ensure directory exists & save locally (will work in local dev)
    try {
      await fs.mkdir(uploadDir, { recursive: true });
      const filePath = path.join(uploadDir, filename);
      await fs.writeFile(filePath, buffer);
    } catch (_) {
      // Ignore write failures in read-only environment (Vercel)
    }

    // Write to GitHub if token exists (will work in Vercel prod)
    const token = process.env.GITHUB_TOKEN;
    const repoUrl = process.env.GITHUB_REPO_URL;
    if (token && repoUrl) {
      try {
        await commitFileToGithub(`public/uploads/${filename}`, buffer, `chore: upload image ${filename}`);
      } catch (err: any) {
        console.error("Failed to commit uploaded image to GitHub:", err);
      }
    }

    return NextResponse.json({ url: `/uploads/${filename}` });
  } catch (err: any) {
    console.error("Upload error", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
