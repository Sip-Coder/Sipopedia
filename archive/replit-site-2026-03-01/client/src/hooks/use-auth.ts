import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { User, UserRole } from "@shared/models/auth";

interface AuthUser extends User {
  role: UserRole;
}

async function fetchUser(): Promise<AuthUser | null> {
  const response = await fetch("/api/auth/user", {
    credentials: "include",
  });

  if (response.status === 401) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }

  return response.json();
}

async function logout(): Promise<void> {
  window.location.href = "/api/logout";
}

export function useAuth() {
  const queryClient = useQueryClient();
  const { data: user, isLoading } = useQuery<AuthUser | null>({
    queryKey: ["/api/auth/user"],
    queryFn: fetchUser,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(["/api/auth/user"], null);
    },
  });

  // Role helper functions
  const isAdmin = user?.role === "admin";
  const isSiteManager = user?.role === "site_manager" || isAdmin;
  const isUser = !!user;

  // Can access specific role routes
  const canAccessAdmin = isAdmin;
  const canAccessManager = isSiteManager;
  const canAccessUser = isUser;

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
    // Role information
    role: user?.role || null,
    isAdmin,
    isSiteManager,
    isUser,
    canAccessAdmin,
    canAccessManager,
    canAccessUser,
  };
}
