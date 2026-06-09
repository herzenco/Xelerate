import type { Metadata } from "next";
import Link from "next/link";
import { Activity, CalendarClock, FileText, History, Newspaper } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buildAdminDashboardSummary } from "@/lib/admin/dashboard-summary";
import {
  getAdminContentDatabaseIssue,
  listAdminPosts,
  listAuditEvents,
} from "@/lib/admin/content-store";

export const metadata: Metadata = {
  title: "Overview",
};

export const dynamic = "force-dynamic";

const statusLabels: Record<string, string> = {
  draft: "Drafts",
  needs_review: "Needs review",
  approved: "Approved",
  scheduled: "Scheduled",
  published: "Published",
  rejected: "Rejected",
};

function formatMetric(value: number | null) {
  return value === null ? "-" : value.toLocaleString();
}

function formatDate(value: string | null) {
  if (!value) return "Not set";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function prettyAction(action: string) {
  return action
    .split(".")
    .map((part) => part.replace(/_/g, " "))
    .join(" ");
}

export default async function AdminPage() {
  const [posts, auditEvents, databaseIssue] = await Promise.all([
    listAdminPosts(),
    listAuditEvents(),
    getAdminContentDatabaseIssue(),
  ]);
  const summary = buildAdminDashboardSummary({
    posts,
    auditEvents,
    visitorMetrics: {
      visitorsToday: null,
      pageViewsToday: null,
      topPage: null,
    },
  });

  return (
    <div className="space-y-8">
      {databaseIssue && (
        <Alert>
          <AlertTitle>Content database setup needed</AlertTitle>
          <AlertDescription>{databaseIssue}</AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Private Portal
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Xelerate Admin
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            One screen for traffic, publishing, scheduled content, and recent
            admin activity.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/analytics"
            className="rounded-md border border-border px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            Analytics
          </Link>
          <Link
            href="/admin/content"
            className="rounded-md border border-border px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            Content
          </Link>
          <Link
            href="/admin/audit"
            className="rounded-md border border-border px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            Audit
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Activity className="h-4 w-4" aria-hidden="true" />
              Visitors today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold tracking-tight">
              {formatMetric(summary.visitors.visitorsToday)}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Awaiting analytics API.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Newspaper className="h-4 w-4" aria-hidden="true" />
              Content total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold tracking-tight">
              {summary.content.totalPosts.toLocaleString()}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {summary.content.statusCounts.published} published,{" "}
              {summary.content.statusCounts.scheduled} scheduled.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <History className="h-4 w-4" aria-hidden="true" />
              Audit events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold tracking-tight">
              {summary.audit.totalEvents.toLocaleString()}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Showing the last {summary.audit.recentEvents.length || 0} actions.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <FileText className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              Publishing summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-3 sm:grid-cols-3">
              {Object.entries(statusLabels).map(([status, label]) => (
                <div key={status} className="rounded-md border border-border p-3">
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="mt-1 text-2xl font-semibold">
                    {summary.content.statusCounts[status as keyof typeof summary.content.statusCounts]}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-md border border-border p-4">
              <p className="text-sm font-medium">Last content posted</p>
              {summary.content.lastPublishedPost ? (
                <div className="mt-3">
                  <Link
                    href={`/admin/content/${summary.content.lastPublishedPost.id}`}
                    className="font-medium underline-offset-4 hover:underline"
                  >
                    {summary.content.lastPublishedPost.title}
                  </Link>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Published {formatDate(summary.content.lastPublishedPost.publishedAt)}
                  </p>
                </div>
              ) : (
                <p className="mt-3 text-sm text-muted-foreground">
                  No published content yet.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <CalendarClock className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              Next scheduled posts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {summary.content.upcomingPosts.map((post) => (
              <Link
                key={post.id}
                href={`/admin/content/${post.id}`}
                className="block rounded-md border border-border p-3 transition-colors hover:bg-muted"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium">{post.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      /blog/{post.slug}
                    </p>
                  </div>
                  <Badge variant="secondary">{formatDate(post.publishAt)}</Badge>
                </div>
              </Link>
            ))}
            {summary.content.upcomingPosts.length === 0 && (
              <p className="rounded-md border border-border p-4 text-sm text-muted-foreground">
                No scheduled posts yet.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Activity className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              Visitor numbers
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-md border border-border p-3">
              <p className="text-xs text-muted-foreground">Visitors</p>
              <p className="mt-1 text-2xl font-semibold">
                {formatMetric(summary.visitors.visitorsToday)}
              </p>
            </div>
            <div className="rounded-md border border-border p-3">
              <p className="text-xs text-muted-foreground">Page views</p>
              <p className="mt-1 text-2xl font-semibold">
                {formatMetric(summary.visitors.pageViewsToday)}
              </p>
            </div>
            <div className="rounded-md border border-border p-3">
              <p className="text-xs text-muted-foreground">Top page</p>
              <p className="mt-1 truncate text-2xl font-semibold">
                {summary.visitors.topPage ?? "-"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <History className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              Quick audit
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {summary.audit.recentEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-start justify-between gap-4 rounded-md border border-border p-3"
              >
                <div>
                  <p className="text-sm font-medium capitalize">
                    {prettyAction(event.action)}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {event.resourceType}
                    {event.resourceId ? ` / ${event.resourceId}` : ""}
                  </p>
                </div>
                <p className="shrink-0 text-xs text-muted-foreground">
                  {formatDate(event.createdAt)}
                </p>
              </div>
            ))}
            {summary.audit.recentEvents.length === 0 && (
              <p className="rounded-md border border-border p-4 text-sm text-muted-foreground">
                No audit events yet.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
