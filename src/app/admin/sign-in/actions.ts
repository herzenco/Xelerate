"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isXelerateAdminEmail, normalizeAdminEmail } from "@/lib/admin/account-rules";
import { createClient } from "@/utils/supabase/server";

export async function requestPasswordSignInAction(formData: FormData) {
  const email = normalizeAdminEmail(String(formData.get("email") ?? ""));
  const password = String(formData.get("password") ?? "");

  if (!isXelerateAdminEmail(email)) {
    redirect("/admin/sign-in?error=1");
  }

  let error: { message?: string } | null = null;

  try {
    const supabase = createClient(cookies());
    const result = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    error = result.error;
  } catch (cause) {
    console.error("Admin sign-in failed before Supabase returned a response.", cause);
    redirect("/admin/sign-in?error=1");
  }

  if (error) {
    redirect("/admin/sign-in?error=1");
  }

  redirect("/admin");
}
