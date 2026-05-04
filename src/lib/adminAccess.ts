const PRIVILEGED_ADMIN_EMAILS = new Set(["admin@sipstudies.com"]);

export function isPrivilegedAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return PRIVILEGED_ADMIN_EMAILS.has(email.trim().toLowerCase());
}

