import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Only run on /admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const adminSession = request.cookies.get("admin_session")?.value;
    const sessionKey = process.env.ADMIN_SESSION_KEY;

    // If no cookie or cookie doesn't match the key, redirect to home
    if (!adminSession || adminSession !== sessionKey) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
