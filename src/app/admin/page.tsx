import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Overview",
};

const cards = [
  {
    title: "Analytics",
    description:
      "Unified visitor, source, top-page, and Web Vitals dashboard.",
    href: "/admin/analytics",
  },
  {
    title: "Content",
    description:
      "Claude-assisted drafts, editorial review, scheduling, and publishing.",
    href: "/admin/content",
  },
  {
    title: "Audit Log",
    description:
      "Read-only stream of admin actions for approvals, edits, and publishing.",
    href: "/admin/audit",
  },
];

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium text-muted-foreground">
          Private Portal
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Xelerate Admin
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Manage content operations and site analytics from one focused admin
          surface. Authentication, AI generation, and data wiring are being
          built incrementally from the v2 sprint spec.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <Link key={card.href} href={card.href}>
            <Card className="h-full transition-colors hover:border-foreground/30">
              <CardHeader>
                <CardTitle className="text-base">{card.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
