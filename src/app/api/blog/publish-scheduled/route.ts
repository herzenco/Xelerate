import { NextResponse } from "next/server";
import { publishDueScheduledPosts } from "@/lib/admin/content-store";

async function handler(request: Request) {
  const start = Date.now();
  const expected = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");

  if (!expected || authHeader !== `Bearer ${expected}`) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const publishedCount = await publishDueScheduledPosts();

    console.log(
      JSON.stringify({
        level: "info",
        msg: "scheduled publish completed",
        route: "/api/blog/publish-scheduled",
        publishedCount,
        ms: Date.now() - start,
      }),
    );

    return NextResponse.json({ ok: true, publishedCount });
  } catch (error) {
    console.error(
      JSON.stringify({
        level: "error",
        msg: "scheduled publish failed",
        route: "/api/blog/publish-scheduled",
        error: error instanceof Error ? error.message : String(error),
        ms: Date.now() - start,
      }),
    );

    return NextResponse.json(
      { error: "Scheduled publishing failed" },
      { status: 500 },
    );
  }
}

export const GET = handler;
export const POST = handler;
