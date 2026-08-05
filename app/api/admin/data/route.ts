import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const dbPath = path.join(process.cwd(), 'src/data/db.json');

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'draft'; // default to draft

    const fileContent = await fs.readFile(dbPath, 'utf8');
    const data = JSON.parse(fileContent);

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

    const fileContent = await fs.readFile(dbPath, 'utf8');
    const data = JSON.parse(fileContent);

    if (action === 'commit') {
      // Copy draft to published
      data.published = JSON.parse(JSON.stringify(data.draft));
      await fs.writeFile(dbPath, JSON.stringify(data, null, 2), 'utf8');

      // Check if automatic GitHub push is enabled
      if (process.env.GITHUB_PUSH === 'true') {
        try {
          // Stage modified db.json and any uploads
          await execAsync('git add src/data/db.json');
          
          // Check if there are public/uploads folder to add
          try {
            await execAsync('git add public/uploads/');
          } catch (_) {
            // Ignore if uploads directory doesn't exist yet
          }

          // Commit changes
          await execAsync('git commit -m "chore: content updates from admin panel"');

          const token = process.env.GITHUB_TOKEN;
          const repoUrl = process.env.GITHUB_REPO_URL; // e.g. github.com/owner/repo

          if (token && repoUrl) {
            // Clean up repoUrl format (remove https:// or git@ if present)
            const cleanUrl = repoUrl.replace(/^(https?:\/\/)?(git@)?/, '').replace(/:/g, '/');
            await execAsync(`git push https://${token}@${cleanUrl} main`);
          } else {
            // Fallback to standard push using system git credentials
            await execAsync('git push origin main');
          }

          return NextResponse.json({ 
            success: true, 
            message: 'Committed & pushed to GitHub successfully! Production build triggered.' 
          });
        } catch (gitErr: any) {
          console.error("Git operation failed:", gitErr);
          return NextResponse.json({ 
            success: true, 
            message: 'Saved changes, but GitHub push failed: ' + (gitErr.stderr || gitErr.message) 
          });
        }
      }

      return NextResponse.json({ success: true, message: 'Committed successfully to local file' });
    } else {
      // Save to draft
      data.draft = body;
      await fs.writeFile(dbPath, JSON.stringify(data, null, 2), 'utf8');
      return NextResponse.json({ success: true, message: 'Draft saved successfully' });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to write to database' }, { status: 500 });
  }
}
