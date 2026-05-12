import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Sprint scaffold: keep /admin previewable locally, but do not expose it in production
  // until XEL-102 wires Auth.js magic-link sessions into this middleware.
  if (process.env.NODE_ENV === "development") {
    return NextResponse.next();
  }

  return new NextResponse(null, { status: 404 });
}

export const config = {
  matcher: ["/admin/:path*"],
};
