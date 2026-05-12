import { NextResponse } from "next/server";
import { auth } from "@/auth";

const publicAdminPaths = ["/admin/sign-in"];

function isAllowlisted(email?: string | null) {
  if (!email) return false;
  return (process.env.ADMIN_EMAIL_ALLOWLIST ?? "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean)
    .includes(email.toLowerCase());
}

export default auth((request) => {
  const pathname = request.nextUrl.pathname;

  if (!pathname.startsWith("/admin")) return NextResponse.next();

  if (publicAdminPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  if (process.env.NODE_ENV === "development" && !process.env.AUTH_SECRET) {
    return NextResponse.next();
  }

  const isAdmin = isAllowlisted(request.auth?.user?.email);
  if (isAdmin) return NextResponse.next();

  return new NextResponse(null, { status: 404 });
});

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
