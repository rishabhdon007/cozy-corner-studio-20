import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    const expectedUsername = (process.env.ADMIN_USERNAME || "admin")
      .trim()
      .replace(/^["']|["']$/g, "");
    const expectedPassword = (process.env.ADMIN_PASSWORD || "nrksteel2026")
      .trim()
      .replace(/^["']|["']$/g, "");

    const inputUsername = (username || "").trim().toLowerCase();
    const inputPassword = (password || "").trim();

    if (
      inputUsername === expectedUsername.toLowerCase() &&
      inputPassword === expectedPassword
    ) {
      return NextResponse.json({ success: true, token: "authenticated" });
    }

    return NextResponse.json(
      { error: "Invalid username or password credentials" },
      { status: 401 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
