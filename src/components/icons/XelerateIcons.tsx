import { cn } from "@/lib/utils";

interface IconProps {
  className?: string;
}

// Expertise icon - curved layers representing depth of knowledge
export const ExpertiseIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={cn("w-6 h-6", className)}>
    <path
      d="M4 18C4 18 6 16 12 16C18 16 20 18 20 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M4 14C4 14 6 12 12 12C18 12 20 14 20 14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M4 10C4 10 6 8 12 8C18 8 20 10 20 10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M4 6C4 6 6 4 12 4C18 4 20 6 20 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// Partnership icon - interweaving curves representing collaboration
export const PartnershipIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={cn("w-6 h-6", className)}>
    <path
      d="M3 12C3 12 6 6 12 6C18 6 21 12 21 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M3 12C3 12 6 18 12 18C18 18 21 12 21 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
);

// Outcome icon - converging curves representing results
export const OutcomeIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={cn("w-6 h-6", className)}>
    <path
      d="M4 4C4 4 8 12 12 12C16 12 20 4 20 4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M4 20C4 20 8 12 12 12C16 12 20 20 20 20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
  </svg>
);

// Flexibility icon - flowing wave representing adaptability
export const FlexibilityIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={cn("w-6 h-6", className)}>
    <path
      d="M3 8C5 8 7 4 12 4C17 4 19 8 21 8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M3 12C5 12 7 8 12 8C17 8 19 12 21 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M3 16C5 16 7 12 12 12C17 12 19 16 21 16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M3 20C5 20 7 16 12 16C17 16 19 20 21 20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// Check icon - curved checkmark inspired by logo stripes
export const CheckIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={cn("w-5 h-5", className)}>
    <path
      d="M4 12C4 12 6 14 9 17C12 14 16 8 20 5"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 16C4 16 6 18 9 21C12 18 16 12 20 9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.5"
    />
  </svg>
);
