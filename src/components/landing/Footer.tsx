"use client";

import { usePathname } from "next/navigation";
import logo from "@/assets/xelerate-logo.png";
import { analytics } from "@/lib/analytics";
import { remoteAnalytics } from "@/lib/tracking";

const Footer = () => {
  const pathname = usePathname();

  const handleLinkClick = (linkName: string) => {
    analytics.trackNavigation(linkName, 'footer');
    remoteAnalytics.trackNavigation(linkName, 'footer', pathname);
  };

  return (
    <footer className="py-16 bg-secondary border-t border-border" role="contentinfo">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand column */}
          <div className="md:col-span-1">
            <a
              href="/"
              className="flex items-center mb-4"
              onClick={() => handleLinkClick('home')}
              aria-label="Xelerate - Return to homepage"
            >
              <img src={logo.src} alt="" className="h-8" aria-hidden="true" />
              <span className="sr-only">Xelerate</span>
            </a>
            <a
              href="mailto:hello@fractionalpm.com"
              onClick={() => handleLinkClick('contact')}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              hello@fractionalpm.com
            </a>
          </div>

          {/* Services column */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Services</h3>
            <nav aria-label="Services navigation">
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href="/product-leadership"
                    onClick={() => handleLinkClick('product-leadership')}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Product Leadership
                  </a>
                </li>
                <li>
                  <a
                    href="/custom-solutions"
                    onClick={() => handleLinkClick('custom-solutions')}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Custom Solutions
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Company column */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Company</h3>
            <nav aria-label="Company navigation">
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href="/about"
                    onClick={() => handleLinkClick('about')}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="/how-it-works"
                    onClick={() => handleLinkClick('how-it-works')}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    href="/pricing"
                    onClick={() => handleLinkClick('pricing')}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Pricing
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Resources column */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Resources</h3>
            <nav aria-label="Resources navigation">
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href="/blog"
                    onClick={() => handleLinkClick('blog')}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="/faq"
                    onClick={() => handleLinkClick('faq')}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Xelerate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
