import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { updateSession } from "@/utils/supabase/middleware";

const publicAdminPaths = ["/admin/sign-in"];

function isAllowlisted(email?: string | null) {
  if (!email) return false;
  return (process.env.ADMIN_EMAIL_ALLOWLIST ?? "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean)
    .includes(email.toLowerCase());
}

export default auth(async (request) => {
  const supabaseResponse = await updateSession(request);
  const pathname = request.nextUrl.pathname;

  if (!pathname.startsWith("/admin")) return supabaseResponse;

  if (publicAdminPaths.some((path) => pathname.startsWith(path))) {
    return supabaseResponse;
  }

  if (process.env.NODE_ENV === "development" && !process.env.AUTH_SECRET) {
    return supabaseResponse;
  }

  const isAdmin = isAllowlisted(request.auth?.user?.email);
  if (isAdmin) return supabaseResponse;

  return new NextResponse(null, { status: 404 });
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
