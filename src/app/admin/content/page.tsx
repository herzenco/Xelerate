import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createDraftAction, generateClaudeDraftAction } from "./actions";
import { listAdminPosts, listBlogTopics } from "@/lib/admin/content-store";
import { SubmitButton } from "./submit-button";

export const metadata: Metadata = {
  title: "Content",
};

const statusLabels: Record<string, string> = {
  draft: "Draft",
  needs_review: "Needs Review",
  approved: "Approved",
  scheduled: "Scheduled",
  published: "Published",
  rejected: "Rejected",
};

export const dynamic = "force-dynamic";

export default async function AdminContentPage({
  searchParams,
}: {
  searchParams?: { generationError?: string };
}) {
  const [posts, topics] = await Promise.all([listAdminPosts(), listBlogTopics()]);
  const activeTopics = topics.filter((topic) => topic.active);
  const generationError = searchParams?.generationError
    ? decodeURIComponent(searchParams.generationError)
    : null;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Content</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Review AI-generated drafts, manage topic seeds, require editorial
            notes, and publish only after human approval.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <form action={generateClaudeDraftAction}>
            <SubmitButton pendingLabel="Generating...">
              Generate with Claude
            </SubmitButton>
          </form>
          <form action={createDraftAction}>
            <SubmitButton pendingLabel="Creating..." variant="secondary">
              Create placeholder
            </SubmitButton>
          </form>
          <Button asChild variant="outline">
            <Link href="/admin/content/topics">Topic seeds</Link>
          </Button>
        </div>
      </div>

      {generationError && (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          Claude generation failed: {generationError}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Draft queue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-md border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Title</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-left font-medium">Score</th>
                  <th className="px-4 py-3 text-left font-medium">Updated</th>
                  <th className="px-4 py-3 text-right font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-t border-border">
                    <td className="px-4 py-4">
                      <div className="font-medium text-foreground">
                        {post.title}
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">
                        /blog/{post.slug}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <Badge variant={post.status === "published" ? "default" : "secondary"}>
                        {statusLabels[post.status]}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 text-muted-foreground">
                      {post.seoScore ? `${post.seoScore}/100` : "-"}
                    </td>
                    <td className="px-4 py-4 text-muted-foreground">
                      {new Date(post.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/admin/content/${post.id}`}>Open</Link>
                      </Button>
                    </td>
                  </tr>
                ))}
                {posts.length === 0 && (
                  <tr>
                    <td className="px-4 py-6 text-muted-foreground" colSpan={5}>
                      No drafts yet. Create one from an active topic seed.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {Object.entries(statusLabels).map(([status, label]) => (
              <Badge key={status} variant="secondary">
                {label}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Active topic seeds</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {activeTopics.slice(0, 4).map((topic) => (
            <div
              key={topic.id}
              className="flex items-center justify-between gap-4 rounded-md border border-border p-3"
            >
              <p className="text-sm">{topic.topic}</p>
              <form action={createDraftAction}>
                <input type="hidden" name="topicId" value={topic.id} />
                <Button type="submit" size="sm" variant="outline">
                  Draft
                </Button>
              </form>
            </div>
          ))}
          {activeTopics.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No active topics. Add one before generating drafts.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
