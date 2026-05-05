import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found | Xelerate",
  description:
    "The page you're looking for doesn't exist. Return to Xelerate's homepage to explore our fractional product management services.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="text-center max-w-md">
        <p
          className="text-6xl font-bold text-muted-foreground mb-2"
          aria-hidden="true"
        >
          404
        </p>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          Page not found
        </h1>
        <p className="text-muted-foreground mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>
        <Button variant="accent" size="lg" asChild>
          <Link href="/product-leadership">
            <Home className="w-4 h-4 mr-2" aria-hidden="true" />
            Return to homepage
          </Link>
        </Button>
      </div>
    </main>
  );
}
