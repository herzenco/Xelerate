import { redirect } from "next/navigation";
import { signOut } from "@/auth";

export async function GET() {
  if (process.env.NODE_ENV === "development" && !process.env.AUTH_SECRET) {
    redirect("/admin/sign-in");
  }

  await signOut({ redirectTo: "/admin/sign-in" });
}
