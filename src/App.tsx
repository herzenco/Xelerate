import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { usePageTracking } from "@/hooks/usePageTracking";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import ProductLeadership from "./pages/ProductLeadership";
import CustomSolutions from "./pages/CustomSolutions";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Wrapper component to enable page and scroll tracking within Router context
const AppRoutes = () => {
  usePageTracking();
  useScrollTracking();
  
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/product-leadership" replace />} />
      <Route path="/product-leadership" element={<ProductLeadership />} />
      <Route path="/custom-solutions" element={<CustomSolutions />} />
      {/* Redirects for old routes */}
      <Route path="/custom-solutions/*" element={<Navigate to="/custom-solutions" replace />} />
      <Route path="/about" element={<Navigate to="/product-leadership" replace />} />
      <Route path="/pricing" element={<Navigate to="/product-leadership" replace />} />
      <Route path="/blog" element={<Navigate to="/product-leadership" replace />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
