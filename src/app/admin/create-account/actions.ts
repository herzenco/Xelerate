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

  let data: { session: unknown } | null = null;
  let error: { message: string } | null = null;

  try {
    const supabase = createClient(cookies());
    const result = await supabase.auth.signUp({
      email,
      password,
    });
    data = result.data;
    error = result.error;
  } catch (cause) {
    console.error("Admin account creation failed before Supabase returned a response.", cause);
    createAccountError(
      "Admin authentication is not fully configured. Check the Supabase environment variables in Vercel.",
    );
  }

  if (error) {
    if (error.message.toLowerCase().includes("signups not allowed")) {
      createAccountError(
        "Supabase signups are disabled for this project. Enable new user signups in Supabase Auth settings.",
      );
    }

    createAccountError(error.message);
  }

  if (!data?.session) {
    redirect("/admin/sign-in?created=1");
  }

  redirect("/admin");
}
