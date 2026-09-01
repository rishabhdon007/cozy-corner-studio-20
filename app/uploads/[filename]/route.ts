import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { uploadedFileCache } from "@/lib/uploadCache";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;
    // Sanitize filename to prevent directory traversal
    const safeFilename = path.basename(filename);

    // 1. Check in-memory cache first for instant serving of newly uploaded files
    const cached = uploadedFileCache.get(safeFilename);
    if (cached) {
      return new NextResponse(new Uint8Array(cached.buffer), {
        headers: {
          "Content-Type": cached.contentType,
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }

    // 2. Check local disk
    const filePath = path.join(process.cwd(), "public", "uploads", safeFilename);
    try {
      const fileBuffer = await fs.readFile(filePath);

      const ext = path.extname(safeFilename).toLowerCase();
      let contentType = "image/png";
      if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
      if (ext === ".webp") contentType = "image/webp";
      if (ext === ".gif") contentType = "image/gif";
      if (ext === ".svg") contentType = "image/svg+xml";

      uploadedFileCache.set(safeFilename, { buffer: fileBuffer, contentType });

      return new NextResponse(new Uint8Array(fileBuffer), {
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    } catch (_) {
      // 3. Fallback: Fetch directly from GitHub repo if file exists on GitHub
      const repoUrl = process.env.GITHUB_REPO_URL;
      if (repoUrl) {
        try {
          const cleanUrl = repoUrl.replace(/^(https?:\/\/)?(www\.)?github\.com\//, "");
          const parts = cleanUrl.split("/");
          const owner = parts[0];
          const repo = parts[1]?.replace(/\.git$/, "");
          if (owner && repo) {
            const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/public/uploads/${safeFilename}`;
            const ghRes = await fetch(rawUrl);
            if (ghRes.ok) {
              const arrayBuf = await ghRes.arrayBuffer();
              const ghBuffer = Buffer.from(arrayBuf);
              const ext = path.extname(safeFilename).toLowerCase();
              let contentType = "image/png";
              if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
              if (ext === ".webp") contentType = "image/webp";
              if (ext === ".gif") contentType = "image/gif";
              if (ext === ".svg") contentType = "image/svg+xml";

              uploadedFileCache.set(safeFilename, { buffer: ghBuffer, contentType });

              return new NextResponse(new Uint8Array(ghBuffer), {
                headers: {
                  "Content-Type": contentType,
                  "Cache-Control": "public, max-age=31536000, immutable",
                },
              });
            }
          }
        } catch (_) {}
      }

      return new NextResponse("File not found", { status: 404 });
    }
  } catch (err: any) {
    return new NextResponse("Error serving file", { status: 500 });
  }
}
