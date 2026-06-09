import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();

export const createClient = () => {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase public env vars are required.");
  }

  return createBrowserClient(supabaseUrl, supabaseKey);
};
