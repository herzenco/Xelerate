import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const signInUrl = new URL("/admin/sign-in", request.url);
  const supabase = createClient(cookies());

  await supabase.auth.signOut();

  return NextResponse.redirect(signInUrl);
}
