"use server";

import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { isAdminAuthConfigured, isAdminEmail } from "@/lib/admin/auth";

export async function requestMagicLinkAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  if (!isAdminAuthConfigured() || !isAdminEmail(email)) {
    redirect("/admin/sign-in?sent=1");
  }

  await signIn("resend", {
    email,
    redirect: false,
    redirectTo: "/admin",
  });

  redirect("/admin/sign-in?sent=1");
}
