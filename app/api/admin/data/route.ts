import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import dbJson from '@/data/db.json';

export const dynamic = 'force-dynamic';

const dbPath = path.join(process.cwd(), 'src/data/db.json');

// Helper to write file content directly to GitHub repo via REST API
async function commitFileToGithub(filePath: string, contentBuffer: Buffer, message: string) {
  const token = process.env.GITHUB_TOKEN;
  const repoUrl = process.env.GITHUB_REPO_URL;
  if (!token || !repoUrl) {
    throw new Error('Missing GITHUB_TOKEN or GITHUB_REPO_URL env variables');
  }

  // Parse owner and repo name from GITHUB_REPO_URL
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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'draft'; // default to draft

    let data;
    try {
      const fileContent = await fs.readFile(dbPath, 'utf8');
      data = JSON.parse(fileContent);
    } catch (_) {
      // Fallback to static bundled import on Vercel
      data = dbJson;
    }

    if (type === 'published') {
      return NextResponse.json(data.published);
    }
    return NextResponse.json(data.draft);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read database' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action') || 'save'; // default to save draft

    let data;
    try {
      const fileContent = await fs.readFile(dbPath, 'utf8');
      data = JSON.parse(fileContent);
    } catch (_) {
      // Fallback to static bundled import on Vercel
      data = dbJson;
    }

    if (action === 'commit') {
      // Handle full body payload if passed, or fall back to data.draft
      const draftState = body.draft || (Object.keys(body).length > 0 && !body.draft && !body.published ? body : data.draft);
      data.draft = draftState;
      data.published = JSON.parse(JSON.stringify(draftState));
      
      // Write locally if possible (will work in local dev)
      try {
        await fs.writeFile(dbPath, JSON.stringify(data, null, 2), 'utf8');
      } catch (_) {
        // Ignore write failures on read-only environments (Vercel)
      }

      // Single atomic commit to GitHub
      const token = process.env.GITHUB_TOKEN;
      const repoUrl = process.env.GITHUB_REPO_URL;
      
      if (token && repoUrl) {
        try {
          await commitFileToGithub(
            'src/data/db.json',
            Buffer.from(JSON.stringify(data, null, 2), 'utf8'),
            'chore: publish catalog & content updates from admin panel'
          );
          return NextResponse.json({
            success: true,
            message: 'Committed & pushed to GitHub successfully! Production build triggered.',
            data
          });
        } catch (gitErr: any) {
          console.error("Git REST API operation failed:", gitErr);
          return NextResponse.json({
            success: true,
            message: 'Saved changes, but GitHub push failed: ' + gitErr.message,
            data
          });
        }
      }

      return NextResponse.json({ success: true, message: 'Committed successfully to local file', data });
    } else {
      // Save to draft - DO NOT push to GitHub here (prevents double Vercel builds)
      data.draft = body;
      
      // Write locally if possible (will work in local dev)
      try {
        await fs.writeFile(dbPath, JSON.stringify(data, null, 2), 'utf8');
      } catch (_) {
        // Ignore write failures on read-only environments (Vercel)
      }

      return NextResponse.json({ success: true, message: 'Draft saved successfully', draft: data.draft });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to write to database' }, { status: 500 });
  }
}
