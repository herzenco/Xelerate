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

  const supabase = createClient(cookies());
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect("/admin/sign-in?error=1");
  }

  redirect("/admin");
}
