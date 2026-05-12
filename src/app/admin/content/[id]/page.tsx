import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getAdminPost } from "@/lib/admin/content-store";
import {
  approvePostAction,
  publishPostAction,
  rejectPostAction,
  revisePostAction,
  savePostAction,
  schedulePostAction,
} from "../actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Edit Draft",
};

interface DraftPageProps {
  params: {
    id: string;
  };
  searchParams?: {
    error?: string;
  };
}

const statusLabels: Record<string, string> = {
  draft: "Draft",
  needs_review: "Needs Review",
  approved: "Approved",
  scheduled: "Scheduled",
  published: "Published",
  rejected: "Rejected",
};

export default async function AdminDraftPage({
  params,
  searchParams,
}: DraftPageProps) {
  const post = await getAdminPost(params.id);

  if (!post) {
    notFound();
  }

  const noteError = searchParams?.error === "editors-note";
  const revisionPromptError = searchParams?.error === "revision-prompt";
  const editorNoteLength = post.editorsNote.trim().length;

  return (
    <form className="space-y-8" action={savePostAction}>
      <input type="hidden" name="postId" value={post.id} />

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <Link
            href="/admin/content"
            className="text-sm text-muted-foreground underline-offset-4 hover:underline"
          >
            Back to content
          </Link>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-semibold tracking-tight">
              Edit draft
            </h1>
            <Badge variant={post.status === "published" ? "default" : "secondary"}>
              {statusLabels[post.status]}
            </Badge>
          </div>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Edit the generated draft, add Lupe's editor note, then approve,
            schedule, publish, or reject it.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button type="submit" variant="outline">
            Save
          </Button>
          <Button type="submit" formAction={approvePostAction}>
            Approve
          </Button>
          <Button type="submit" variant="secondary" formAction={publishPostAction}>
            Publish now
          </Button>
        </div>
      </div>

      {post.similarityWarning && (
        <div className="flex gap-3 rounded-md border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950">
          <AlertTriangle className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
          <div>
            <p className="font-medium">Similarity warning</p>
            <p className="mt-1">
              This draft was flagged as similar to recent content. Edit the
              angle before approval.
            </p>
          </div>
        </div>
      )}

      {noteError && (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          Editor's note must be at least 50 characters before approval,
          scheduling, or publishing.
        </div>
      )}

      {revisionPromptError && (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          Tell Claude what to change before asking for a revision.
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Metadata</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" defaultValue={post.title} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  rows={2}
                  defaultValue={post.excerpt}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input id="slug" name="slug" defaultValue={post.slug} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    name="tags"
                    defaultValue={post.tags.join(", ")}
                    placeholder="fractional pm, roadmap"
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="seoTitle">SEO title</Label>
                  <Input id="seoTitle" name="seoTitle" defaultValue={post.seoTitle} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="focusKeyword">Focus keyword</Label>
                  <Input
                    id="focusKeyword"
                    name="focusKeyword"
                    defaultValue={post.focusKeyword}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="secondaryKeywords">Secondary keywords</Label>
                <Input
                  id="secondaryKeywords"
                  name="secondaryKeywords"
                  defaultValue={post.secondaryKeywords.join(", ")}
                  placeholder="fractional product leadership, startup roadmap"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="metaDescription">Meta description</Label>
                <Textarea
                  id="metaDescription"
                  name="metaDescription"
                  rows={3}
                  defaultValue={post.metaDescription}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="ogTitle">OG title</Label>
                  <Input id="ogTitle" name="ogTitle" defaultValue={post.ogTitle} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ogDescription">OG description</Label>
                  <Textarea
                    id="ogDescription"
                    name="ogDescription"
                    rows={2}
                    defaultValue={post.ogDescription}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Body markdown</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                name="bodyMarkdown"
                rows={22}
                className="font-mono text-sm"
                defaultValue={post.bodyMarkdown}
              />
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Content scorecard</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-md border border-border p-3">
                  <div className="text-2xl font-semibold">{post.seoScore || "-"}</div>
                  <div className="mt-1 text-xs text-muted-foreground">SEO</div>
                </div>
                <div className="rounded-md border border-border p-3">
                  <div className="text-2xl font-semibold">
                    {post.readabilityScore || "-"}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">Readability</div>
                </div>
                <div className="rounded-md border border-border p-3">
                  <div className="text-2xl font-semibold">
                    {post.readingTime ?? "-"}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">Minutes</div>
                </div>
              </div>
              <div className="space-y-1 text-sm">
                <p className="font-medium">Topic reasoning</p>
                <p className="text-muted-foreground">
                  {post.topicReasoning || "No strategy note saved yet."}
                </p>
              </div>
              {post.keywordDensity > 0 && (
                <p className="text-xs text-muted-foreground">
                  Keyword density: {(post.keywordDensity / 10).toFixed(1)}%
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Editor's note</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea
                name="editorsNote"
                rows={6}
                defaultValue={post.editorsNote}
                placeholder="Add Lupe's first-hand observation before approval..."
              />
              <p className="text-xs text-muted-foreground">
                Current saved length: {editorNoteLength}/50 characters minimum.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Re-prompt Claude</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea
                name="revisionPrompt"
                rows={4}
                placeholder="Make this more tactical, add stronger examples, tighten the intro..."
              />
              <Button type="submit" className="w-full" formAction={revisePostAction}>
                Revise draft
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Suggested internal links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {post.suggestedInternalLinks.map((href) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center justify-between rounded-md border border-border px-3 py-2 text-sm hover:bg-muted"
                >
                  {href}
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                name="publishAt"
                type="datetime-local"
                defaultValue={
                  post.publishAt
                    ? new Date(post.publishAt).toISOString().slice(0, 16)
                    : ""
                }
              />
              <Button type="submit" className="w-full" formAction={schedulePostAction}>
                Approve & schedule
              </Button>
              <p className="text-xs text-muted-foreground">
                Scheduled posts will publish within roughly 15 minutes once the
                cron worker is connected.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Reject</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea
                name="rejectionReason"
                rows={3}
                defaultValue={post.rejectionReason ?? ""}
                placeholder="Optional rejection reason"
              />
              <Button
                type="submit"
                className="w-full"
                variant="destructive"
                formAction={rejectPostAction}
              >
                Reject draft
              </Button>
            </CardContent>
          </Card>
        </aside>
      </div>
    </form>
  );
}
