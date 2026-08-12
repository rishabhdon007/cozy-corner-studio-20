import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;
    // Sanitize filename to prevent directory traversal
    const safeFilename = path.basename(filename);
    const filePath = path.join(process.cwd(), "public", "uploads", safeFilename);

    try {
      const fileBuffer = await fs.readFile(filePath);

      const ext = path.extname(safeFilename).toLowerCase();
      let contentType = "image/png";
      if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
      if (ext === ".webp") contentType = "image/webp";
      if (ext === ".gif") contentType = "image/gif";
      if (ext === ".svg") contentType = "image/svg+xml";

      return new NextResponse(fileBuffer, {
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    } catch (_) {
      return new NextResponse("File not found", { status: 404 });
    }
  } catch (err: any) {
    return new NextResponse("Error serving file", { status: 500 });
  }
}
