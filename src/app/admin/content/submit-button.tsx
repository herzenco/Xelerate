"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

interface SubmitButtonProps {
  children: React.ReactNode;
  pendingLabel: string;
  variant?: React.ComponentProps<typeof Button>["variant"];
}

export function SubmitButton({
  children,
  pendingLabel,
  variant,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant={variant} disabled={pending}>
      {pending ? pendingLabel : children}
    </Button>
  );
}
