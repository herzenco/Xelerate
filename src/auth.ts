import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { getDb } from "@/db";
import {
  authAccounts,
  authSessions,
  authUsers,
  authVerificationTokens,
} from "@/db/schema";

function adminAllowlist() {
  return (process.env.ADMIN_EMAIL_ALLOWLIST ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

function isAdminEmail(email?: string | null) {
  if (!email) return false;
  return adminAllowlist().includes(email.toLowerCase());
}

function authIsConfigured() {
  return Boolean(
    process.env.AUTH_SECRET &&
      process.env.AUTH_URL &&
      process.env.RESEND_API_KEY &&
      process.env.DATABASE_URL &&
      adminAllowlist().length > 0,
  );
}

export const { handlers, auth, signIn, signOut } = NextAuth(() => {
  const configured = authIsConfigured();

  return {
    adapter: configured
      ? DrizzleAdapter(getDb(), {
          usersTable: authUsers,
          accountsTable: authAccounts,
          sessionsTable: authSessions,
          verificationTokensTable: authVerificationTokens,
        })
      : undefined,
    providers: configured
      ? [
          Resend({
            apiKey: process.env.RESEND_API_KEY,
            from: process.env.RESEND_FROM_EMAIL ?? "Xelerate <admin@xelerate.me>",
            maxAge: 15 * 60,
          }),
        ]
      : [],
    pages: {
      signIn: "/admin/sign-in",
      verifyRequest: "/admin/sign-in?sent=1",
      error: "/admin/sign-in",
    },
    callbacks: {
      signIn({ user }) {
        return isAdminEmail(user.email);
      },
      jwt({ token, user }) {
        const email = user?.email ?? token.email;
        token.admin = isAdminEmail(email);
        return token;
      },
      session({ session, token }) {
        if (session.user) {
          session.user.email = token.email ?? session.user.email;
        }
        return session;
      },
    },
    session: {
      strategy: "jwt",
      maxAge: 24 * 60 * 60,
      updateAge: 8 * 60 * 60,
    },
    trustHost: true,
  };
});
