import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { isXelerateAdminEmail } from "@/lib/admin/account-rules";
import { updateSession } from "@/utils/supabase/middleware";

const publicAdminPaths = ["/admin/sign-in", "/admin/create-account", "/admin/sign-out"];

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

export default async function middleware(request: NextRequest) {
  const supabaseResponse = await updateSession(request);
  const pathname = request.nextUrl.pathname;

  if (!pathname.startsWith("/admin")) return supabaseResponse;

  if (isPublicAdminPath(pathname)) {
    return supabaseResponse;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return redirectToAdminSignIn(request);
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          supabaseResponse.cookies.set(name, value, options);
        });
      },
    },
  });

  const { data, error } = await supabase.auth.getUser();

  if (error || !isXelerateAdminEmail(data.user?.email)) {
    return redirectToAdminSignIn(request);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
