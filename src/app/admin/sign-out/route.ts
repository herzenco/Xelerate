import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const signInUrl = new URL("/admin/sign-in", request.url);
  const response = NextResponse.redirect(signInUrl);

  const authCookieNames = new Set([
    "authjs.session-token",
    "__Secure-authjs.session-token",
    "authjs.callback-url",
    "__Secure-authjs.callback-url",
    "authjs.csrf-token",
    "__Host-authjs.csrf-token",
  ]);

  const requestCookies = request.headers.get("cookie") ?? "";
  for (const cookie of requestCookies.split(";")) {
    const name = cookie.split("=")[0]?.trim();
    if (
      name &&
      (authCookieNames.has(name) ||
        name.startsWith("authjs.session-token.") ||
        name.startsWith("__Secure-authjs.session-token."))
    ) {
      response.cookies.delete(name);
    }
  }

  return response;
}
