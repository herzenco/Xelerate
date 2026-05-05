"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { submitLead, remoteAnalytics } from "@/lib/tracking";
import { analytics } from "@/lib/analytics";
import { ArrowRight, Loader2 } from "lucide-react";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
  company: z.string().trim().max(100, "Company must be less than 100 characters").optional(),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
  source?: string;
  className?: string;
}

const ContactForm = ({ source = "contact_form", className = "" }: ContactFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    // Determine source based on current page (using exact snake_case enum values)
    const pagePath = window.location.pathname;
    const isCustomSolutions = pagePath.includes("custom-solutions");
    const source = isCustomSolutions ? "custom_solutions" : "product_leadership";

    const response = await submitLead({
      name: result.data.name,
      email: result.data.email,
      company: result.data.company || undefined,
      message: result.data.message,
      source,
    });

    if (response.success) {
      analytics.trackFormSubmit("contact_form", true);
      remoteAnalytics.trackFormSubmit("contact_form", window.location.pathname, true);
      
      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({ name: "", email: "", company: "", message: "" });
    } else {
      analytics.trackFormSubmit("contact_form", false);
      remoteAnalytics.trackFormSubmit("contact_form", window.location.pathname, false);
      
      toast({
        title: "Something went wrong",
        description: response.error || "Please try again later.",
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`} noValidate>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="contact-name">
            Name <span className="text-destructive" aria-hidden="true">*</span>
          </Label>
          <Input
            id="contact-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className={errors.name ? "border-destructive" : ""}
            disabled={isSubmitting}
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
          />
          {errors.name && (
            <p id="contact-name-error" className="text-sm text-destructive" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-email">
            Email <span className="text-destructive" aria-hidden="true">*</span>
          </Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@company.com"
            className={errors.email ? "border-destructive" : ""}
            disabled={isSubmitting}
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            autoComplete="email"
          />
          {errors.email && (
            <p id="contact-email-error" className="text-sm text-destructive" role="alert">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-company">Company</Label>
        <Input
          id="contact-company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Your company name"
          disabled={isSubmitting}
          autoComplete="organization"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-message">
          Message <span className="text-destructive" aria-hidden="true">*</span>
        </Label>
        <Textarea
          id="contact-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your project or challenge..."
          rows={4}
          className={errors.message ? "border-destructive" : ""}
          disabled={isSubmitting}
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
        />
        {errors.message && (
          <p id="contact-message-error" className="text-sm text-destructive" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      <Button type="submit" variant="accent" size="lg" className="w-full group" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin mr-2" aria-hidden="true" />
            Sending...
          </>
        ) : (
          <>
            Send message
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </>
        )}
      </Button>
    </form>
  );
};

export default ContactForm;