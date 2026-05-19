import type { Metadata } from "next";
import { Activity, BarChart3, ExternalLink, Gauge, Info, MapPin, MonitorSmartphone, MousePointerClick, Route } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Analytics",
};

const vercelAnalyticsUrl =
  process.env.VERCEL_ANALYTICS_DASHBOARD_URL ?? "https://vercel.com/dashboard";

const publicSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3001");

const trackedPanels = [
  {
    title: "Visitors",
    description:
      "Unique daily visitors measured without cookies by Vercel Web Analytics.",
    icon: Activity,
  },
  {
    title: "Page views",
    description:
      "Total page loads and soft navigations across public marketing and blog pages.",
    icon: MousePointerClick,
  },
  {
    title: "Top pages and routes",
    description:
      "Breakdown by URL and framework route, including dynamic blog routes.",
    icon: Route,
  },
  {
    title: "Referrers",
    description:
      "Where initial visitors came from when referrer data is available.",
    icon: BarChart3,
  },
  {
    title: "Country",
    description:
      "Country-level traffic distribution from Vercel's privacy-friendly panels.",
    icon: MapPin,
  },
  {
    title: "Devices, browsers, OS",
    description:
      "Device, browser, and operating system panels for public-site visitors.",
    icon: MonitorSmartphone,
  },
  {
    title: "Web Vitals",
    description:
      "LCP, INP, and CLS surfaced through Vercel Speed Insights after deploy.",
    icon: Gauge,
  },
];

export default function AdminAnalyticsPage() {
  const isConfigured = Boolean(process.env.VERCEL_ANALYTICS_DASHBOARD_URL);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-semibold tracking-tight">
              Analytics
            </h1>
            <Badge variant={isConfigured ? "default" : "secondary"}>
              {isConfigured ? "Dashboard linked" : "Tracking installed"}
            </Badge>
          </div>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Vercel Web Analytics and Speed Insights are installed on every
            public page. Admin routes are intentionally excluded so review
            sessions do not pollute public-site traffic.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button asChild>
            <a href={vercelAnalyticsUrl} target="_blank" rel="noreferrer">
              Open Vercel Analytics
              <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
          <Button asChild variant="outline">
            <Link href={publicSiteUrl}>Open public site</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Collection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>Public-site page views are collected by `@vercel/analytics`.</p>
            <p>Core Web Vitals are collected by `@vercel/speed-insights`.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Privacy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>No cookies and no consent banner required for Vercel Analytics.</p>
            <p>Admin pages are skipped by the tracking component.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Next Setup Step</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>Enable Web Analytics in the Vercel dashboard after deployment.</p>
            <p>Add `VERCEL_ANALYTICS_DASHBOARD_URL` for a direct admin link.</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-5 w-5 text-muted-foreground" aria-hidden="true" />
            <div>
              <CardTitle className="text-base">
                About embedded Vercel metrics
              </CardTitle>
              <p className="mt-2 text-sm text-muted-foreground">
                Vercel currently exposes Web Analytics through its dashboard,
                not a public metrics API for custom dashboards. This page acts
                as the admin control panel and deep-link hub until Vercel exposes
                analytics data programmatically or we add a secondary analytics
                provider with an API.
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {trackedPanels.map((panel) => {
          const Icon = panel.icon;

          return (
          <Card key={panel.title}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                {panel.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex min-h-28 flex-col justify-between rounded-md border border-border bg-muted/30 p-4">
                <p className="text-sm text-muted-foreground">
                  {panel.description}
                </p>
                <a
                  href={vercelAnalyticsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center text-sm font-medium text-foreground underline-offset-4 hover:underline"
                >
                  View in Vercel
                  <ExternalLink className="ml-1.5 h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </CardContent>
          </Card>
          );
        })}
      </div>
    </div>
  );
}
