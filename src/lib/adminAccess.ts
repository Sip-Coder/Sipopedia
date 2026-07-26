const PRIVILEGED_ADMIN_EMAILS = new Set(["admin@sipstudies.com"]);

export function isPrivilegedAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return PRIVILEGED_ADMIN_EMAILS.has(email.trim().toLowerCase());
}

type AuthenticatedUserIdentity = {
  provider?: string | null;
};

type AuthenticatedUserForAdminNavigation = {
  email?: string | null;
  app_metadata?: unknown;
  identities?: AuthenticatedUserIdentity[] | null;
};

function hasGoogleProvider(user: AuthenticatedUserForAdminNavigation): boolean {
  const metadata =
    user.app_metadata && typeof user.app_metadata === "object"
      ? (user.app_metadata as Record<string, unknown>)
      : null;
  const primaryProvider = typeof metadata?.provider === "string" ? metadata.provider.toLowerCase() : "";
  const linkedProviders = Array.isArray(metadata?.providers)
    ? metadata.providers.filter((provider): provider is string => typeof provider === "string").map((provider) => provider.toLowerCase())
    : [];

  return (
    primaryProvider === "google" ||
    linkedProviders.includes("google") ||
    (user.identities ?? []).some((identity) => identity.provider?.toLowerCase() === "google")
  );
}

export function isBossNavigationUser(user: AuthenticatedUserForAdminNavigation | null | undefined): boolean {
  return Boolean(user && isPrivilegedAdminEmail(user.email) && hasGoogleProvider(user));
}

