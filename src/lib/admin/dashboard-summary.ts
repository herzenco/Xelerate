import type {
  AdminAuditEvent,
  BlogPostStatus,
} from "@/lib/admin/content-store";

type DashboardPost = {
  id: string;
  title: string;
  slug: string;
  status: BlogPostStatus;
  publishAt: string | null;
  publishedAt: string | null;
  updatedAt: string;
};

export type VisitorMetrics = {
  visitorsToday: number | null;
  pageViewsToday: number | null;
  topPage: string | null;
};

type DashboardSummaryInput = {
  visitorMetrics?: Partial<VisitorMetrics>;
  auditEvents: AdminAuditEvent[];
  posts: DashboardPost[];
};

const postStatuses: BlogPostStatus[] = [
  "draft",
  "needs_review",
  "approved",
  "scheduled",
  "published",
  "rejected",
];

function byNewestPublishDate(a: DashboardPost, b: DashboardPost) {
  return (b.publishedAt ?? b.updatedAt).localeCompare(a.publishedAt ?? a.updatedAt);
}

function byUpcomingPublishDate(a: DashboardPost, b: DashboardPost) {
  return (a.publishAt ?? "").localeCompare(b.publishAt ?? "");
}

export function buildAdminDashboardSummary({
  visitorMetrics,
  auditEvents,
  posts,
}: DashboardSummaryInput) {
  const statusCounts = Object.fromEntries(
    postStatuses.map((status) => [status, 0]),
  ) as Record<BlogPostStatus, number>;

  for (const post of posts) {
    statusCounts[post.status] += 1;
  }

  const publishedPosts = posts
    .filter((post) => post.status === "published")
    .sort(byNewestPublishDate);

  const upcomingPosts = posts
    .filter((post) => post.status === "scheduled" && post.publishAt)
    .sort(byUpcomingPublishDate)
    .slice(0, 3);

  return {
    visitors: {
      visitorsToday: visitorMetrics?.visitorsToday ?? null,
      pageViewsToday: visitorMetrics?.pageViewsToday ?? null,
      topPage: visitorMetrics?.topPage ?? null,
    },
    audit: {
      totalEvents: auditEvents.length,
      recentEvents: auditEvents.slice(0, 3),
    },
    content: {
      totalPosts: posts.length,
      statusCounts,
      lastPublishedPost: publishedPosts[0] ?? null,
      upcomingPosts,
    },
  };
}
