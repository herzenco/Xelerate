import Link from "next/link";

export function AuthorBio() {
  return (
    <div className="border-t border-border mt-12 pt-8">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg shrink-0">
          X
        </div>
        <div>
          <p className="font-semibold text-foreground">The Xelerate Team</p>
          <p className="text-sm text-muted-foreground mt-1">
            Expert insights on product management, roadmapping, and startup strategy
            from the fractional PM team at Xelerate. We help startups ship faster with
            senior product leadership for $2,000/month.
          </p>
          <Link href="/about" className="text-sm text-primary hover:underline mt-2 inline-block">
            Learn more about us →
          </Link>
        </div>
      </div>
    </div>
  );
}
