import { NextResponse } from "next/server";
import { generateBlogDraft } from "@/lib/admin/blog-generator";

export async function POST(request: Request) {
  const start = Date.now();
  const expected = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");

  console.log(
    JSON.stringify({
      level: "info",
      msg: "blog generation started",
      route: "/api/blog/generate",
      requestId: request.headers.get("x-vercel-id"),
    }),
  );

  if (!expected || authHeader !== `Bearer ${expected}`) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const result = await generateBlogDraft();

    console.log(
      JSON.stringify({
        level: "info",
        msg: "blog generation completed",
        route: "/api/blog/generate",
        postId: result.postId,
        ms: Date.now() - start,
      }),
    );

    return NextResponse.json({
      ok: true,
      postId: result.postId,
    });
  } catch (error) {
    console.error(
      JSON.stringify({
        level: "error",
        msg: "blog generation failed",
        route: "/api/blog/generate",
        error: error instanceof Error ? error.message : String(error),
        ms: Date.now() - start,
      }),
    );

    return NextResponse.json(
      { error: "Generation failed" },
      { status: 500 },
    );
  }
}
