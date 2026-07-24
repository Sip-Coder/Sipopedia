import { type PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from "react";
import type { PostgrestError } from "@supabase/supabase-js";
import { useAuth } from "./AuthContext";
import { supabase } from "../lib/supabase";
import { isPrivilegedAdminEmail } from "../lib/adminAccess";

export type AccessRole = "student" | "mentor" | "admin";
export type AccessTier = "public" | "starter" | "pro" | "founding" | "admin";

export type AccessProfile = {
  id: string;
  displayName: string | null;
  role: AccessRole;
  createdAt: string | null;
};

type SubscriptionStatus =
  | "trialing"
  | "active"
  | "past_due"
  | "unpaid"
  | "canceled"
  | "incomplete"
  | "incomplete_expired";

type AccessSubscription = {
  id: string;
  provider: string;
  providerCustomerId: string | null;
  providerSubscriptionId: string | null;
  planCode: string;
  status: SubscriptionStatus;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
};

type AccessContextValue = {
  loading: boolean;
  tier: AccessTier;
  isPaid: boolean;
  isAdmin: boolean;
  profile: AccessProfile | null;
  subscription: AccessSubscription | null;
  errorMessage: string | null;
  refreshProfile: () => Promise<void>;
};

const AccessContext = createContext<AccessContextValue | undefined>(undefined);
const LOCAL_PREVIEW_ACCESS_STORAGE_KEY = "sipstudies:local-preview-access";
const LOCAL_PREVIEW_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);

const localPreviewProfile: AccessProfile = {
  id: "local-preview-admin",
  displayName: "Local Preview Admin",
  role: "admin",
  createdAt: null
};

const localPreviewSubscription: AccessSubscription = {
  id: "local-preview-subscription",
  provider: "local-preview",
  providerCustomerId: null,
  providerSubscriptionId: null,
  planCode: "local-preview-admin",
  status: "active",
  currentPeriodEnd: null,
  cancelAtPeriodEnd: false
};

function isLocalPreviewHost(): boolean {
  if (typeof window === "undefined") return false;
  return LOCAL_PREVIEW_HOSTS.has(window.location.hostname);
}

function readLocalPreviewAccess(): boolean {
  if (!isLocalPreviewHost()) return false;
  try {
    return window.localStorage.getItem(LOCAL_PREVIEW_ACCESS_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function tierFromRole(role: AccessRole): AccessTier {
  if (role === "admin") return "admin";
  if (role === "mentor") return "pro";
  return "starter";
}

function tierFromPlanCode(planCode: string | null | undefined): AccessTier {
  const normalized = (planCode ?? "").trim().toLowerCase();
  if (normalized.includes("found")) return "founding";
  if (normalized.includes("pro")) return "pro";
  return "pro";
}

type ProfileRecord = {
  id: string;
  display_name: string | null;
  role: AccessRole;
  created_at: string | null;
};

type SubscriptionRecord = {
  id: string;
  provider: string;
  provider_customer_id: string | null;
  provider_subscription_id: string | null;
  plan_code: string;
  status: SubscriptionStatus;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
};

const RECENT_SUBSCRIPTION_LIMIT = 20;
const ENTITLING_SUBSCRIPTION_STATUSES = new Set<SubscriptionStatus>(["trialing", "active", "past_due"]);

function isEntitlingSubscription(
  status: SubscriptionStatus,
  currentPeriodEnd: string | null,
  now = Date.now()
): boolean {
  if (!ENTITLING_SUBSCRIPTION_STATUSES.has(status)) return false;
  if (!currentPeriodEnd) return true;
  const periodEnd = new Date(currentPeriodEnd).getTime();
  return !Number.isNaN(periodEnd) && periodEnd >= now;
}

function selectSubscriptionRecord(records: SubscriptionRecord[] | null | undefined): SubscriptionRecord | null {
  if (!records?.length) return null;
  return (
    records.find((record) => isEntitlingSubscription(record.status, record.current_period_end)) ??
    records[0]
  );
}

function mapProfileError(error: PostgrestError): string {
  if (error.code === "PGRST116") {
    return "Profile record not found. Sign out and sign in again to trigger profile creation.";
  }
  return error.message;
}

export function AccessProvider({ children }: PropsWithChildren) {
  const { user, loading: authLoading, isConfigured } = useAuth();
  const [profile, setProfile] = useState<AccessProfile | null>(null);
  const [subscription, setSubscription] = useState<AccessSubscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [localPreviewAccess, setLocalPreviewAccess] = useState(() => readLocalPreviewAccess());

  const normalizeSubscription = (record: SubscriptionRecord | null): AccessSubscription | null => {
    if (!record) return null;
    return {
      id: record.id,
      provider: record.provider,
      providerCustomerId: record.provider_customer_id,
      providerSubscriptionId: record.provider_subscription_id,
      planCode: record.plan_code,
      status: record.status,
      currentPeriodEnd: record.current_period_end,
      cancelAtPeriodEnd: record.cancel_at_period_end
    };
  };

  const isSubscriptionPaid = (record: AccessSubscription | null): boolean => {
    if (!record) return false;
    return isEntitlingSubscription(record.status, record.currentPeriodEnd);
  };

  const refreshProfile = async () => {
    if (localPreviewAccess) {
      setProfile(localPreviewProfile);
      setSubscription(localPreviewSubscription);
      setErrorMessage(null);
      setLoading(false);
      return;
    }

    if (!isConfigured || !supabase || !user) {
      setProfile(null);
      setSubscription(null);
      setErrorMessage(null);
      return;
    }

    setLoading(true);
    const [profileResult, subscriptionResult] = await Promise.all([
      supabase.from("profiles").select("id,display_name,role,created_at").eq("id", user.id).single<ProfileRecord>(),
      supabase
        .from("customer_subscriptions")
        .select("id,provider,provider_customer_id,provider_subscription_id,plan_code,status,current_period_end,cancel_at_period_end")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false })
        .limit(RECENT_SUBSCRIPTION_LIMIT)
        .returns<SubscriptionRecord[]>()
    ]);

    if (profileResult.error) {
      setProfile(null);
      setSubscription(null);
      setErrorMessage(mapProfileError(profileResult.error));
      setLoading(false);
      return;
    }

    if (subscriptionResult.error) {
      setProfile(null);
      setSubscription(null);
      setErrorMessage(subscriptionResult.error.message);
      setLoading(false);
      return;
    }

    setProfile({
      id: profileResult.data.id,
      displayName: profileResult.data.display_name,
      role: profileResult.data.role,
      createdAt: profileResult.data.created_at
    });
    setSubscription(normalizeSubscription(selectSubscriptionRecord(subscriptionResult.data)));
    setErrorMessage(null);
    setLoading(false);
  };

  useEffect(() => {
    const refreshLocalPreviewAccess = () => setLocalPreviewAccess(readLocalPreviewAccess());
    window.addEventListener("storage", refreshLocalPreviewAccess);
    window.addEventListener("sipstudies:local-preview-access-changed", refreshLocalPreviewAccess);
    return () => {
      window.removeEventListener("storage", refreshLocalPreviewAccess);
      window.removeEventListener("sipstudies:local-preview-access-changed", refreshLocalPreviewAccess);
    };
  }, []);

  useEffect(() => {
    let active = true;

    if (authLoading) {
      setLoading(true);
      return () => {
        active = false;
      };
    }

    if (localPreviewAccess) {
      setProfile(localPreviewProfile);
      setSubscription(localPreviewSubscription);
      setErrorMessage(null);
      setLoading(false);
      return () => {
        active = false;
      };
    }

    if (!user || !isConfigured || !supabase) {
      setProfile(null);
      setSubscription(null);
      setErrorMessage(null);
      setLoading(false);
      return () => {
        active = false;
      };
    }

    const client = supabase;
    setLoading(true);
    const loadProfile = async () => {
      try {
        const [profileResult, subscriptionResult] = await Promise.all([
          client.from("profiles").select("id,display_name,role,created_at").eq("id", user.id).single<ProfileRecord>(),
          client
            .from("customer_subscriptions")
            .select("id,provider,provider_customer_id,provider_subscription_id,plan_code,status,current_period_end,cancel_at_period_end")
            .eq("user_id", user.id)
            .order("updated_at", { ascending: false })
            .limit(RECENT_SUBSCRIPTION_LIMIT)
            .returns<SubscriptionRecord[]>()
        ]);

        if (!active) return;
        if (profileResult.error) {
          setProfile(null);
          setSubscription(null);
          setErrorMessage(mapProfileError(profileResult.error));
          setLoading(false);
          return;
        }
        if (subscriptionResult.error) {
          setProfile(null);
          setSubscription(null);
          setErrorMessage(subscriptionResult.error.message);
          setLoading(false);
          return;
        }
        setProfile({
          id: profileResult.data.id,
          displayName: profileResult.data.display_name,
          role: profileResult.data.role,
          createdAt: profileResult.data.created_at
        });
        setSubscription(normalizeSubscription(selectSubscriptionRecord(subscriptionResult.data)));
        setErrorMessage(null);
        setLoading(false);
      } catch (error: unknown) {
        if (!active) return;
        setProfile(null);
        setSubscription(null);
        setErrorMessage(error instanceof Error ? error.message : "Could not load profile.");
        setLoading(false);
      }
    };

    void loadProfile();

    return () => {
      active = false;
    };
  }, [authLoading, isConfigured, localPreviewAccess, user]);

  const tier = useMemo<AccessTier>(() => {
    if (localPreviewAccess) return "admin";
    if (!user) return "public";
    if (isPrivilegedAdminEmail(user.email)) return "admin";
    if (profile?.role === "admin") return "admin";
    if (isSubscriptionPaid(subscription)) return tierFromPlanCode(subscription?.planCode);
    if (!profile) return "starter";
    return tierFromRole(profile.role);
  }, [localPreviewAccess, profile, subscription, user]);

  const value = useMemo<AccessContextValue>(
    () => ({
      loading,
      tier,
      isPaid: tier === "pro" || tier === "founding" || tier === "admin",
      isAdmin: tier === "admin",
      profile,
      subscription,
      errorMessage,
      refreshProfile
    }),
    [errorMessage, loading, profile, subscription, tier]
  );

  return <AccessContext.Provider value={value}>{children}</AccessContext.Provider>;
}

export function useAccess() {
  const context = useContext(AccessContext);
  if (!context) {
    throw new Error("useAccess must be used within AccessProvider");
  }
  return context;
}
