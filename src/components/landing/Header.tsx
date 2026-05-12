"use client";

import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import logo from "@/assets/xelerate-logo.png";

export type ServicePage = "custom-solutions" | "product-leadership";
export type PageType = ServicePage | "home";

interface HeaderProps {
  currentPage: PageType;
}

const Header = ({ currentPage }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (page: ServicePage) => {
    router.push(page === "product-leadership" ? "/product-leadership" : "/custom-solutions");
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border"
            : "bg-transparent"
        }`}
        role="banner"
      >
        <div className="max-w-6xl mx-auto px-6">
          {/* Centered layout with logo and toggle */}
          <div className="flex flex-col items-center py-3 lg:py-4">
            {/* Logo - centered */}
            <a
              href="/"
              className="flex items-center lg:mb-6"
              aria-label="Xelerate - Return to homepage"
            >
              <img src={logo.src} alt="" className="h-10 lg:h-12" aria-hidden="true" />
              <span className="sr-only">Xelerate</span>
            </a>

            {/* Service Mode Toggle - below logo */}
            <nav className="hidden lg:block" aria-label="Service navigation">
              <div className="flex items-center bg-muted rounded-full p-1" role="tablist" aria-label="Choose service type">
                <button
                  onClick={() => handleNavigate("product-leadership")}
                  className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-300 ${
                    currentPage === "product-leadership"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  role="tab"
                  aria-selected={currentPage === "product-leadership"}
                  aria-controls="main-content"
                >
                  Product Leadership
                </button>
                <button
                  onClick={() => handleNavigate("custom-solutions")}
                  className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-300 ${
                    currentPage === "custom-solutions"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  role="tab"
                  aria-selected={currentPage === "custom-solutions"}
                  aria-controls="main-content"
                >
                  Custom Solutions
                </button>
              </div>
            </nav>

            {/* Secondary navigation links */}
            <nav className="hidden lg:flex items-center gap-6 mt-3" aria-label="Secondary navigation">
              <a
                href="/pricing"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Pricing
              </a>
              <a
                href="/blog"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Blog
              </a>
              <a
                href="/about"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </a>
            </nav>

            {/* Mobile Menu Button - absolute positioned */}
            <button
              className="lg:hidden absolute right-6 top-4 p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-foreground" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5 text-foreground" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Keep the mobile overlay outside the blurred fixed header so it stays above page content after scroll. */}
      {mobileMenuOpen && (
        <nav
          id="mobile-menu"
          className="lg:hidden fixed inset-x-0 top-16 bottom-0 z-[90] bg-background px-6 py-4 animate-fade-in overflow-y-auto border-t border-border shadow-xl"
          aria-label="Mobile service navigation"
        >
          {/* Mobile Service Mode Toggle */}
          <div className="flex items-center bg-muted rounded-full p-1" role="tablist" aria-label="Choose service type">
            <button
              onClick={() => handleNavigate("product-leadership")}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                currentPage === "product-leadership"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground"
              }`}
              role="tab"
              aria-selected={currentPage === "product-leadership"}
            >
              Product Leadership
            </button>
            <button
              onClick={() => handleNavigate("custom-solutions")}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                currentPage === "custom-solutions"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground"
              }`}
              role="tab"
              aria-selected={currentPage === "custom-solutions"}
            >
              Custom Solutions
            </button>
          </div>

          {/* Mobile secondary links */}
          <div className="flex flex-col gap-4 mt-5 pt-5 border-t border-border">
            <a
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </a>
            <a
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Blog
            </a>
            <a
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </a>
          </div>
        </nav>
      )}
    </>
  );
};

export default Header;
