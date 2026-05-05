import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <SEOHead
        title="Page Not Found | Xelerate"
        description="The page you're looking for doesn't exist. Return to Xelerate's homepage to explore our fractional product management services."
        canonical="/404"
        noIndex={true}
      />
      <main className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="text-center max-w-md">
          <p className="text-6xl font-bold text-muted-foreground mb-2" aria-hidden="true">404</p>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Page not found
          </h1>
          <p className="text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
          <Button variant="accent" size="lg" asChild>
            <Link to="/product-leadership">
              <Home className="w-4 h-4 mr-2" aria-hidden="true" />
              Return to homepage
            </Link>
          </Button>
        </div>
      </main>
    </>
  );
};

export default NotFound;