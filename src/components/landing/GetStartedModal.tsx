"use client";

import { useState, useId } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ArrowRight, Loader2 } from "lucide-react";
import { submitLead, remoteAnalytics } from "@/lib/tracking";
import { analytics } from "@/lib/analytics";
import { useToast } from "@/hooks/use-toast";

// Accept domains (example.com) or full URLs (https://example.com)
const isValidDomainOrUrl = (val: string): boolean => {
  if (!val) return true;
  // No spaces allowed
  if (/\s/.test(val)) return false;
  // Must have at least one dot followed by 2+ letters (TLD)
  return /\.[a-zA-Z]{2,}/.test(val);
};

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  company: z.string().trim().min(1, "Company is required").max(100),
  url: z.string().trim()
    .transform((val) => val || "")
    .refine(isValidDomainOrUrl, "Please enter a valid domain (e.g., example.com)"),
  message: z.string().trim().min(1, "Please tell us about your project").max(2000),
});

type FormData = z.infer<typeof formSchema>;

interface GetStartedModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  source?: string; // e.g. "/product-leadership" or "/custom-solutions"
}

const GetStartedModal = ({ open, onOpenChange, source }: GetStartedModalProps) => {
  const formId = useId();
  const pagePath = source || window.location.pathname;
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    url: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = formSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof FormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Track the form submission
      analytics.trackCTAClick("Get Started - Form Submit", "hero_modal");
      remoteAnalytics.trackCTAClick("Get Started - Form Submit", pagePath);

      // Determine lead source based on page (using exact snake_case enum values)
      const isCustomSolutions = pagePath.includes("custom-solutions");
      const source = isCustomSolutions ? "custom_solutions" : "product_leadership";

      // Submit the lead with all fields
      const leadResult = await submitLead({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        url: formData.url || undefined,
        message: formData.message,
        source,
      });

      if (!leadResult.success) {
        analytics.trackFormSubmit("hero_get_started", false);
        remoteAnalytics.trackFormSubmit("hero_get_started", pagePath, false);

        toast({
          title: "Couldn't send your request",
          description: leadResult.error || "Please try again.",
          variant: "destructive",
        });
        return;
      }

      analytics.trackFormSubmit("hero_get_started", true);
      remoteAnalytics.trackFormSubmit("hero_get_started", pagePath, true);

      // Reset form and close modal
      setFormData({ name: "", email: "", company: "", url: "", message: "" });
      onOpenChange(false);

      toast({
        title: "Thanks for reaching out!",
        description: "We'll be in touch within one business day.",
      });
    } catch (error) {
      console.error("Form submission error:", error);
      analytics.trackFormSubmit("hero_get_started", false);
      remoteAnalytics.trackFormSubmit("hero_get_started", pagePath, false);

      toast({
        title: "Something went wrong",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Get Started</DialogTitle>
          <DialogDescription>
            Tell us about your project and we'll schedule a call to discuss how we can help.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4" noValidate>
          <div className="space-y-2">
            <Label htmlFor={`${formId}-name`}>
              Name <span className="text-destructive" aria-hidden="true">*</span>
            </Label>
            <Input
              id={`${formId}-name`}
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              disabled={isSubmitting}
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? `${formId}-name-error` : undefined}
              autoComplete="name"
            />
            {errors.name && (
              <p id={`${formId}-name-error`} className="text-sm text-destructive" role="alert">
                {errors.name}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor={`${formId}-email`}>
              Email <span className="text-destructive" aria-hidden="true">*</span>
            </Label>
            <Input
              id={`${formId}-email`}
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@company.com"
              disabled={isSubmitting}
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? `${formId}-email-error` : undefined}
              autoComplete="email"
            />
            {errors.email && (
              <p id={`${formId}-email-error`} className="text-sm text-destructive" role="alert">
                {errors.email}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor={`${formId}-company`}>
              Company <span className="text-destructive" aria-hidden="true">*</span>
            </Label>
            <Input
              id={`${formId}-company`}
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Your company name"
              disabled={isSubmitting}
              aria-required="true"
              aria-invalid={!!errors.company}
              aria-describedby={errors.company ? `${formId}-company-error` : undefined}
              autoComplete="organization"
            />
            {errors.company && (
              <p id={`${formId}-company-error`} className="text-sm text-destructive" role="alert">
                {errors.company}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor={`${formId}-url`}>
              URL <span className="text-muted-foreground">(optional)</span>
            </Label>
            <Input
              id={`${formId}-url`}
              name="url"
              type="text"
              inputMode="url"
              autoCapitalize="none"
              spellCheck={false}
              value={formData.url}
              onChange={handleChange}
              placeholder="example.com"
              disabled={isSubmitting}
              aria-invalid={!!errors.url}
              aria-describedby={errors.url ? `${formId}-url-error` : undefined}
              autoComplete="url"
            />
            {errors.url && (
              <p id={`${formId}-url-error`} className="text-sm text-destructive" role="alert">
                {errors.url}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor={`${formId}-message`}>
              Tell us about your project <span className="text-destructive" aria-hidden="true">*</span>
            </Label>
            <Textarea
              id={`${formId}-message`}
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="What are you working on? What challenges are you facing?"
              rows={4}
              disabled={isSubmitting}
              aria-required="true"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? `${formId}-message-error` : undefined}
            />
            {errors.message && (
              <p id={`${formId}-message-error`} className="text-sm text-destructive" role="alert">
                {errors.message}
              </p>
            )}
          </div>
          
          <Button 
            type="submit" 
            variant="accent" 
            size="lg" 
            className="w-full group"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />
                Submitting...
              </>
            ) : (
              <>
                Get started today
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GetStartedModal;