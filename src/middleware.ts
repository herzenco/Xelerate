import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { updateSession } from "@/utils/supabase/middleware";

const publicAdminPaths = ["/admin/sign-in", "/admin/sign-out"];

function isPublicAdminPath(pathname: string) {
  return publicAdminPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

function redirectToAdminSignIn(request: NextRequest) {
  const signInUrl = request.nextUrl.clone();
  signInUrl.pathname = "/admin/sign-in";
  signInUrl.searchParams.set(
    "callbackUrl",
    `${request.nextUrl.pathname}${request.nextUrl.search}`,
  );
  return NextResponse.redirect(signInUrl);
}

function isAllowlisted(email?: string | null) {
  if (!email) return false;
  return (process.env.ADMIN_EMAIL_ALLOWLIST ?? "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean)
    .includes(email.toLowerCase());
}

function isAdminAuthConfigured() {
  return Boolean(
    process.env.AUTH_SECRET &&
      process.env.AUTH_URL &&
      process.env.RESEND_API_KEY &&
      process.env.DATABASE_URL &&
      (process.env.ADMIN_EMAIL_ALLOWLIST ?? "").trim(),
  );
}

async function getAuthEmail(request: NextRequest) {
  if (!process.env.AUTH_SECRET) return null;

  const secureCookie =
    process.env.AUTH_URL?.startsWith("https://") ??
    process.env.NODE_ENV === "production";

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    secureCookie,
  });

  if (typeof token?.email === "string") return token.email;

  if (secureCookie) {
    const localToken = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET,
      secureCookie: false,
    });
    if (typeof localToken?.email === "string") return localToken.email;
  }

  return null;
}

export default async function middleware(request: NextRequest) {
  const supabaseResponse = await updateSession(request);
  const pathname = request.nextUrl.pathname;

  if (!pathname.startsWith("/admin")) return supabaseResponse;

  if (isPublicAdminPath(pathname)) {
    return supabaseResponse;
  }

  if (process.env.NODE_ENV === "development" && !isAdminAuthConfigured()) {
    return supabaseResponse;
  }

  const email = await getAuthEmail(request);
  if (!email) {
    return redirectToAdminSignIn(request);
  }

  const isAdmin = isAllowlisted(email);
  if (isAdmin) return supabaseResponse;

  return new NextResponse(null, { status: 404 });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
