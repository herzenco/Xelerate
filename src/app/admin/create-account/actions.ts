"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isXelerateAdminEmail, normalizeAdminEmail } from "@/lib/admin/account-rules";
import { createClient } from "@/utils/supabase/server";

function createAccountError(message: string) {
  redirect(`/admin/create-account?error=${encodeURIComponent(message)}`);
}

export async function createAdminAccountAction(formData: FormData) {
  const email = normalizeAdminEmail(String(formData.get("email") ?? ""));
  const password = String(formData.get("password") ?? "");

  if (!isXelerateAdminEmail(email)) {
    createAccountError("Use a xelerate.me email address.");
  }

  if (password.length < 12) {
    createAccountError("Use a password with at least 12 characters.");
  }

  const supabase = createClient(cookies());
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    if (error.message.toLowerCase().includes("signups not allowed")) {
      createAccountError(
        "Supabase signups are disabled for this project. Enable new user signups in Supabase Auth settings.",
      );
    }

    createAccountError(error.message);
  }

  if (!data.session) {
    redirect("/admin/sign-in?created=1");
  }

  redirect("/admin");
}
