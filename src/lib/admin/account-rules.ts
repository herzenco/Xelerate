export const ADMIN_EMAIL_DOMAIN = "xelerate.me";

export function normalizeAdminEmail(email: string) {
  return email.trim().toLowerCase();
}

export function isXelerateAdminEmail(email?: string | null) {
  if (!email) return false;

  const normalized = normalizeAdminEmail(email);
  const [localPart, domain, extra] = normalized.split("@");

  return Boolean(localPart && domain === ADMIN_EMAIL_DOMAIN && !extra);
}
