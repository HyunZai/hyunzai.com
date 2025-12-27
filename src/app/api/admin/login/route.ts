import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD;
    const sessionKey = process.env.ADMIN_SESSION_KEY;

    if (!adminPassword || !sessionKey) {
      console.error(
        "ADMIN_PASSWORD or ADMIN_SESSION_KEY is not defined in .env"
      );
      return NextResponse.json(
        { success: false, message: "Server configuration error" },
        { status: 500 }
      );
    }

    if (password === adminPassword) {
      const response = NextResponse.json({ success: true });

      // Set the admin_session cookie
      response.cookies.set("admin_session", sessionKey, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day
      });

      return response;
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid password" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
