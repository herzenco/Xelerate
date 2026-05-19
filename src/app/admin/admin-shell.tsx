"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, FileText, History, LayoutDashboard, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/content", label: "Content", icon: FileText },
  { href: "/admin/audit", label: "Audit", icon: History },
];

interface AdminShellProps {
  children: React.ReactNode;
}

export function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const nav = (
    <nav className="space-y-1" aria-label="Admin navigation">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active =
          item.href === "/admin"
            ? pathname === item.href
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileNavOpen(false)}
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
              active
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-border bg-background px-4 py-5 lg:block">
        <Link href="/admin" className="block px-3 text-lg font-semibold">
          Xelerate Admin
        </Link>
        <div className="mt-8">{nav}</div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
          <div className="flex h-16 items-center justify-between px-4 md:px-6">
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileNavOpen((open) => !open)}
                aria-expanded={mobileNavOpen}
                aria-controls="admin-mobile-nav"
                aria-label={mobileNavOpen ? "Close admin menu" : "Open admin menu"}
              >
                {mobileNavOpen ? (
                  <X className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Menu className="h-5 w-5" aria-hidden="true" />
                )}
              </Button>
              <p className="text-sm font-medium text-muted-foreground lg:hidden">
                Xelerate Admin
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button asChild variant="outline" size="sm">
                <a href="/admin/sign-out">Sign out</a>
              </Button>
            </div>
          </div>

          {mobileNavOpen && (
            <div
              id="admin-mobile-nav"
              className="border-t border-border bg-background px-4 py-3 lg:hidden"
            >
              {nav}
            </div>
          )}
        </header>

        <main className="px-4 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  );
}
