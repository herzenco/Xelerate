import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import ts from "typescript";

async function importTsModule(relativePath) {
  const sourcePath = path.join(process.cwd(), relativePath);
  assert.equal(existsSync(sourcePath), true, `${relativePath} should exist`);

  const output = ts.transpileModule(readFileSync(sourcePath, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2020,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
    },
  }).outputText;

  const modulePath = path.join(tmpdir(), `dashboard-summary-${Date.now()}.mjs`);
  await import("node:fs/promises").then(({ writeFile }) => writeFile(modulePath, output));
  return import(modulePath);
}

test("buildAdminDashboardSummary surfaces audit, visitor, and content highlights", async () => {
  const { buildAdminDashboardSummary } = await importTsModule(
    "src/lib/admin/dashboard-summary.ts",
  );

  const summary = buildAdminDashboardSummary({
    visitorMetrics: {
      visitorsToday: 128,
      pageViewsToday: 441,
      topPage: "/pricing",
    },
    auditEvents: [
      {
        id: "audit-1",
        actorEmail: "lupe@xelerate.me",
        action: "post.published",
        resourceType: "blog_post",
        resourceId: "post-1",
        ip: null,
        ua: null,
        createdAt: "2026-05-19T12:00:00.000Z",
      },
      {
        id: "audit-2",
        actorEmail: "lupe@xelerate.me",
        action: "draft.create",
        resourceType: "blog_post",
        resourceId: "post-2",
        ip: null,
        ua: null,
        createdAt: "2026-05-18T12:00:00.000Z",
      },
    ],
    posts: [
      {
        id: "post-1",
        title: "Published yesterday",
        slug: "published-yesterday",
        status: "published",
        publishAt: null,
        publishedAt: "2026-05-18T09:00:00.000Z",
        updatedAt: "2026-05-18T09:00:00.000Z",
      },
      {
        id: "post-2",
        title: "Published today",
        slug: "published-today",
        status: "published",
        publishAt: null,
        publishedAt: "2026-05-19T09:00:00.000Z",
        updatedAt: "2026-05-19T09:00:00.000Z",
      },
      {
        id: "post-3",
        title: "Upcoming third",
        slug: "upcoming-third",
        status: "scheduled",
        publishAt: "2026-05-23T09:00:00.000Z",
        publishedAt: null,
        updatedAt: "2026-05-17T09:00:00.000Z",
      },
      {
        id: "post-4",
        title: "Upcoming first",
        slug: "upcoming-first",
        status: "scheduled",
        publishAt: "2026-05-21T09:00:00.000Z",
        publishedAt: null,
        updatedAt: "2026-05-17T09:00:00.000Z",
      },
      {
        id: "post-5",
        title: "Upcoming second",
        slug: "upcoming-second",
        status: "scheduled",
        publishAt: "2026-05-22T09:00:00.000Z",
        publishedAt: null,
        updatedAt: "2026-05-17T09:00:00.000Z",
      },
      {
        id: "post-6",
        title: "Upcoming fourth",
        slug: "upcoming-fourth",
        status: "scheduled",
        publishAt: "2026-05-24T09:00:00.000Z",
        publishedAt: null,
        updatedAt: "2026-05-17T09:00:00.000Z",
      },
      {
        id: "post-7",
        title: "Needs review",
        slug: "needs-review",
        status: "needs_review",
        publishAt: null,
        publishedAt: null,
        updatedAt: "2026-05-17T09:00:00.000Z",
      },
    ],
  });

  assert.equal(summary.visitors.visitorsToday, 128);
  assert.equal(summary.visitors.pageViewsToday, 441);
  assert.equal(summary.visitors.topPage, "/pricing");
  assert.equal(summary.audit.totalEvents, 2);
  assert.equal(summary.audit.recentEvents[0].action, "post.published");
  assert.equal(summary.content.lastPublishedPost?.title, "Published today");
  assert.deepEqual(
    summary.content.upcomingPosts.map((post) => post.title),
    ["Upcoming first", "Upcoming second", "Upcoming third"],
  );
  assert.equal(summary.content.statusCounts.scheduled, 4);
  assert.equal(summary.content.statusCounts.needs_review, 1);
});
