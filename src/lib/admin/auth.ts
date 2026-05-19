import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { isXelerateAdminEmail } from "./account-rules";

export function isAdminEmail(email?: string | null) {
  return isXelerateAdminEmail(email);
}

export async function getCurrentAdmin() {
  const supabase = createClient(cookies());
  const { data, error } = await supabase.auth.getUser();

  if (error || !isXelerateAdminEmail(data.user?.email)) return null;

  return {
    id: data.user.id,
    email: data.user.email ?? "",
  };
}

export async function assertAdmin() {
  const account = await getCurrentAdmin();
  if (!account) {
    redirect("/admin/sign-in");
  }

  return {
    user: {
      email: account.email,
    },
    expires: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
  };
}
