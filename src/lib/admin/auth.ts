import "server-only";

import { auth } from "@/auth";

export function adminAllowlist() {
  return (process.env.ADMIN_EMAIL_ALLOWLIST ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email?: string | null) {
  if (!email) return false;
  return adminAllowlist().includes(email.toLowerCase());
}

export function isAdminAuthConfigured() {
  return Boolean(
    process.env.AUTH_SECRET &&
      process.env.AUTH_URL &&
      process.env.RESEND_API_KEY &&
      process.env.DATABASE_URL &&
      adminAllowlist().length > 0,
  );
}

export async function assertAdmin() {
  if (process.env.NODE_ENV === "development" && !process.env.AUTH_SECRET) {
    return {
      user: {
        email: adminAllowlist()[0] ?? "lupe@xelerate.me",
      },
      expires: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    };
  }

  const session = await auth();

  if (!isAdminEmail(session?.user?.email)) {
    throw new Error("Not found");
  }

  return session;
}
