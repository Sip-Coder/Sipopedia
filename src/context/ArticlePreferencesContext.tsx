import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren
} from "react";
import {
  articlePreferenceRecordsNeedingCloudSave,
  defaultBeverageNewsPreferences,
  defaultFavoritesPreferences,
  defaultFlavorBlogPreferences,
  findArticlePreferenceRecord,
  isArticlePreferencesTableUnavailable,
  listCloudArticlePreferences,
  mergeArticlePreferenceRecords,
  nextArticlePreferenceTimestamp,
  readLocalArticlePreferences,
  sanitizeBeverageNewsPreferences,
  sanitizeFavoritesPreferences,
  sanitizeFlavorBlogPreferences,
  saveCloudArticlePreference,
  writeLocalArticlePreferences,
  type ArticlePreferenceRecord,
  type ArticlePreferenceSurface,
  type BeverageNewsPreferences,
  type BeverageNewsPreferencesUpdate,
  type FavoritesPreferences,
  type FavoritesPreferencesUpdate,
  type FlavorBlogPreferences,
  type FlavorBlogPreferencesUpdate
} from "../lib/articlePreferences";
import { supabase } from "../lib/supabase";
import { useAuth } from "./AuthContext";

export type ArticlePreferencesSyncStatus = "loading" | "cloud" | "device" | "offline";

type PreferenceUpdate<TPreferences, TUpdate> =
  | TUpdate
  | ((current: TPreferences) => TUpdate);

type PendingPreferenceUpdate =
  | {
      surface: "beverage-news";
      update: PreferenceUpdate<BeverageNewsPreferences, BeverageNewsPreferencesUpdate>;
    }
  | {
      surface: "flavor-blog";
      update: PreferenceUpdate<FlavorBlogPreferences, FlavorBlogPreferencesUpdate>;
    }
  | {
      surface: "favorites";
      update: PreferenceUpdate<FavoritesPreferences, FavoritesPreferencesUpdate>;
    };

type HydrationPreferenceUpdate = {
  targetScope: string | null;
  update: PendingPreferenceUpdate;
};

type ArticlePreferencesContextValue = {
  beverageNews: BeverageNewsPreferences;
  flavorBlog: FlavorBlogPreferences;
  favorites: FavoritesPreferences;
  updateBeverageNews: (
    update: PreferenceUpdate<BeverageNewsPreferences, BeverageNewsPreferencesUpdate>
  ) => void;
  updateFlavorBlog: (
    update: PreferenceUpdate<FlavorBlogPreferences, FlavorBlogPreferencesUpdate>
  ) => void;
  updateFavorites: (
    update: PreferenceUpdate<FavoritesPreferences, FavoritesPreferencesUpdate>
  ) => void;
  loading: boolean;
  syncStatus: ArticlePreferencesSyncStatus;
  syncMessage: string;
  retrySync: () => Promise<void>;
};

const ArticlePreferencesContext = createContext<ArticlePreferencesContextValue | undefined>(undefined);
const GUEST_SCOPE = "guest";
const FOCUS_SYNC_THROTTLE_MS = 5_000;

function statusForCloudError(error: unknown): ArticlePreferencesSyncStatus {
  return isArticlePreferencesTableUnavailable(error) ? "device" : "offline";
}

function preferenceForSurface(
  records: ArticlePreferenceRecord[],
  surface: "beverage-news"
): BeverageNewsPreferences;
function preferenceForSurface(
  records: ArticlePreferenceRecord[],
  surface: "flavor-blog"
): FlavorBlogPreferences;
function preferenceForSurface(
  records: ArticlePreferenceRecord[],
  surface: "favorites"
): FavoritesPreferences;
function preferenceForSurface(
  records: ArticlePreferenceRecord[],
  surface: ArticlePreferenceSurface
): BeverageNewsPreferences | FlavorBlogPreferences | FavoritesPreferences {
  const record = findArticlePreferenceRecord(records, surface);
  if (record?.surface === "beverage-news") return record.preferences;
  if (record?.surface === "flavor-blog") return record.preferences;
  if (record?.surface === "favorites") return record.preferences;
  if (surface === "beverage-news") return defaultBeverageNewsPreferences();
  if (surface === "flavor-blog") return defaultFlavorBlogPreferences();
  return defaultFavoritesPreferences();
}

function buildUpdatedPreferenceRecord(
  records: ArticlePreferenceRecord[],
  pending: PendingPreferenceUpdate
): ArticlePreferenceRecord {
  const existing = findArticlePreferenceRecord(records, pending.surface);
  const updatedAt = nextArticlePreferenceTimestamp(existing?.updatedAt);

  if (pending.surface === "beverage-news") {
    const current = preferenceForSurface(records, pending.surface);
    const patch = typeof pending.update === "function" ? pending.update(current) : pending.update;
    return {
      surface: pending.surface,
      preferences: sanitizeBeverageNewsPreferences({
        ...current,
        ...patch,
        filters: {
          ...current.filters,
          ...(patch.filters ?? {})
        }
      }),
      updatedAt
    };
  }

  if (pending.surface === "flavor-blog") {
    const current = preferenceForSurface(records, pending.surface);
    const patch = typeof pending.update === "function" ? pending.update(current) : pending.update;
    return {
      surface: pending.surface,
      preferences: sanitizeFlavorBlogPreferences({
        ...current,
        ...patch
      }),
      updatedAt
    };
  }

  const current = preferenceForSurface(records, pending.surface);
  const patch = typeof pending.update === "function" ? pending.update(current) : pending.update;
  return {
    surface: pending.surface,
    preferences: sanitizeFavoritesPreferences({
      ...current,
      ...patch
    }),
    updatedAt
  };
}

export function ArticlePreferencesProvider({ children }: PropsWithChildren) {
  const { user, loading: authLoading } = useAuth();
  const userId = user?.id ?? null;
  const requestedScope = userId ?? GUEST_SCOPE;
  const [records, setRecords] = useState<ArticlePreferenceRecord[]>([]);
  const [loadedScope, setLoadedScope] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncStatus, setSyncStatus] = useState<ArticlePreferencesSyncStatus>("loading");
  const recordsRef = useRef<ArticlePreferenceRecord[]>([]);
  const requestedScopeRef = useRef(requestedScope);
  const authLoadingRef = useRef(authLoading);
  const loadedScopeRef = useRef<string | null>(null);
  const saveQueuesRef = useRef<Record<string, Promise<ArticlePreferenceRecord>>>({});
  const dirtySaveVersionsRef = useRef(new Map<string, string>());
  const failedSaveStatusesRef = useRef(new Map<string, ArticlePreferencesSyncStatus>());
  const hydrationUpdatesRef = useRef<HydrationPreferenceUpdate[]>([]);
  const lastFocusSyncAtRef = useRef(0);
  requestedScopeRef.current = requestedScope;
  authLoadingRef.current = authLoading;

  const commitRecords = useCallback((scope: string, nextRecords: ArticlePreferenceRecord[]) => {
    if (requestedScopeRef.current !== scope) return false;
    const normalized = mergeArticlePreferenceRecords(nextRecords, []);
    recordsRef.current = normalized;
    loadedScopeRef.current = scope;
    setRecords(normalized);
    setLoadedScope(scope);
    writeLocalArticlePreferences(scope, normalized);
    return true;
  }, []);

  const queueCloudSave = useCallback(
    (scope: string, record: ArticlePreferenceRecord): Promise<ArticlePreferenceRecord> => {
      const queueKey = `${scope}:${record.surface}`;
      const previous = saveQueuesRef.current[queueKey];
      const task = (previous ? previous.catch(() => record) : Promise.resolve(record))
        .then(() => saveCloudArticlePreference(scope, record));
      saveQueuesRef.current[queueKey] = task;

      const cleanQueue = () => {
        if (saveQueuesRef.current[queueKey] === task) {
          delete saveQueuesRef.current[queueKey];
        }
      };
      void task.then(cleanQueue, cleanQueue);
      return task;
    },
    []
  );

  const persistRecord = useCallback(
    async (scope: string, record: ArticlePreferenceRecord): Promise<void> => {
      const queueKey = `${scope}:${record.surface}`;
      dirtySaveVersionsRef.current.set(queueKey, record.updatedAt);
      if (requestedScopeRef.current === scope) {
        setSyncStatus("loading");
      }

      try {
        const saved = await queueCloudSave(scope, record);
        if (dirtySaveVersionsRef.current.get(queueKey) === record.updatedAt) {
          dirtySaveVersionsRef.current.delete(queueKey);
          failedSaveStatusesRef.current.delete(queueKey);
        }
        if (requestedScopeRef.current !== scope || loadedScopeRef.current !== scope) return;
        commitRecords(scope, mergeArticlePreferenceRecords(recordsRef.current, [saved]));
      } catch (error) {
        if (dirtySaveVersionsRef.current.get(queueKey) === record.updatedAt) {
          failedSaveStatusesRef.current.set(queueKey, statusForCloudError(error));
        }
        throw error;
      }
    },
    [commitRecords, queueCloudSave]
  );

  const statusForScope = useCallback((scope: string): ArticlePreferencesSyncStatus => {
    const prefix = `${scope}:`;
    const failedStatuses = [...failedSaveStatusesRef.current.entries()]
      .filter(([key]) => key.startsWith(prefix))
      .map(([, status]) => status);

    if (failedStatuses.includes("offline")) return "offline";
    if (failedStatuses.includes("device")) return "device";
    const hasDirtySave = [...dirtySaveVersionsRef.current.keys()].some((key) => key.startsWith(prefix));
    const hasQueuedSave = Object.keys(saveQueuesRef.current).some((key) => key.startsWith(prefix));
    if (hasDirtySave || hasQueuedSave) {
      return "loading";
    }
    return "cloud";
  }, []);

  const reconcileWithCloud = useCallback(
    async (scope: string, cloudRecords: ArticlePreferenceRecord[]): Promise<void> => {
      if (requestedScopeRef.current !== scope || loadedScopeRef.current !== scope) return;
      const localRecords = recordsRef.current;
      for (const cloudRecord of cloudRecords) {
        const queueKey = `${scope}:${cloudRecord.surface}`;
        const dirtyVersion = dirtySaveVersionsRef.current.get(queueKey);
        if (
          dirtyVersion &&
          Date.parse(cloudRecord.updatedAt) >= Date.parse(dirtyVersion)
        ) {
          dirtySaveVersionsRef.current.delete(queueKey);
          failedSaveStatusesRef.current.delete(queueKey);
        }
      }
      const pending = articlePreferenceRecordsNeedingCloudSave(localRecords, cloudRecords);
      if (!commitRecords(scope, mergeArticlePreferenceRecords(localRecords, cloudRecords))) return;
      await Promise.all(pending.map((record) => persistRecord(scope, record)));
    },
    [commitRecords, persistRecord]
  );

  const enqueueCloudSave = useCallback(
    (scope: string, record: ArticlePreferenceRecord) => {
      if (!userId || userId !== scope || !supabase) {
        setSyncStatus("device");
        return;
      }

      void persistRecord(scope, record)
        .then(() => {
          if (requestedScopeRef.current !== scope) return;
          setSyncStatus(statusForScope(scope));
        })
        .catch((error: unknown) => {
          if (requestedScopeRef.current !== scope) return;
          setSyncStatus(statusForCloudError(error));
        });
    },
    [persistRecord, statusForScope, userId]
  );

  const applyPreferenceUpdate = useCallback(
    (scope: string, pending: PendingPreferenceUpdate) => {
      if (requestedScopeRef.current !== scope || loadedScopeRef.current !== scope) return false;
      const nextRecord = buildUpdatedPreferenceRecord(recordsRef.current, pending);
      const retained = recordsRef.current.filter((record) => record.surface !== pending.surface);
      if (!commitRecords(scope, [...retained, nextRecord])) return false;
      enqueueCloudSave(scope, nextRecord);
      return true;
    },
    [commitRecords, enqueueCloudSave]
  );

  const queueOrApplyPreferenceUpdate = useCallback(
    (pending: PendingPreferenceUpdate) => {
      const scope = requestedScopeRef.current;
      if (authLoadingRef.current || loadedScopeRef.current !== scope) {
        hydrationUpdatesRef.current.push({
          // While Auth is loading, the signed-in identity is not authoritative.
          // A null target is claimed by whichever scope Auth resolves next.
          targetScope: authLoadingRef.current ? null : scope,
          update: pending
        });
        return;
      }
      applyPreferenceUpdate(scope, pending);
    },
    [applyPreferenceUpdate]
  );

  const updateBeverageNewsPreferences = useCallback(
    (
      update: PreferenceUpdate<BeverageNewsPreferences, BeverageNewsPreferencesUpdate>
    ) => {
      queueOrApplyPreferenceUpdate({ surface: "beverage-news", update });
    },
    [queueOrApplyPreferenceUpdate]
  );

  const updateFlavorBlogPreferences = useCallback(
    (
      update: PreferenceUpdate<FlavorBlogPreferences, FlavorBlogPreferencesUpdate>
    ) => {
      queueOrApplyPreferenceUpdate({ surface: "flavor-blog", update });
    },
    [queueOrApplyPreferenceUpdate]
  );

  const updateFavoritesPreferences = useCallback(
    (
      update: PreferenceUpdate<FavoritesPreferences, FavoritesPreferencesUpdate>
    ) => {
      queueOrApplyPreferenceUpdate({ surface: "favorites", update });
    },
    [queueOrApplyPreferenceUpdate]
  );

  const replayHydrationUpdates = useCallback(
    (scope: string) => {
      const ready: PendingPreferenceUpdate[] = [];
      const retained: HydrationPreferenceUpdate[] = [];

      for (const pending of hydrationUpdatesRef.current) {
        if (pending.targetScope === null || pending.targetScope === scope) {
          ready.push(pending.update);
        } else {
          retained.push(pending);
        }
      }
      hydrationUpdatesRef.current = retained;

      for (let index = 0; index < ready.length; index += 1) {
        if (applyPreferenceUpdate(scope, ready[index])) continue;
        hydrationUpdatesRef.current = [
          ...ready.slice(index).map((update) => ({ targetScope: scope, update })),
          ...hydrationUpdatesRef.current
        ];
        break;
      }
    },
    [applyPreferenceUpdate]
  );

  useEffect(() => {
    if (authLoading) return;

    let canceled = false;
    const scope = requestedScope;
    const isCurrentScope = () => !canceled && requestedScopeRef.current === scope;
    const localRecords = readLocalArticlePreferences(scope);

    setLoading(true);
    setSyncStatus("loading");
    if (!commitRecords(scope, localRecords)) return;
    replayHydrationUpdates(scope);

    // Deliberately do not read or import the guest namespace when a user signs
    // in. A preference belongs only to the account (or guest) that created it.
    if (!userId || !supabase) {
      setSyncStatus("device");
      setLoading(false);
      return;
    }

    void (async () => {
      try {
        const cloudRecords = await listCloudArticlePreferences(userId);
        if (!isCurrentScope()) return;
        await reconcileWithCloud(scope, cloudRecords);
        if (!isCurrentScope()) return;
        setSyncStatus(statusForScope(scope));
      } catch (error) {
        if (!isCurrentScope()) return;
        setSyncStatus(statusForCloudError(error));
      } finally {
        if (isCurrentScope()) setLoading(false);
      }
    })();

    return () => {
      canceled = true;
    };
  }, [
    authLoading,
    commitRecords,
    reconcileWithCloud,
    replayHydrationUpdates,
    requestedScope,
    statusForScope,
    userId
  ]);

  const retrySync = useCallback(async () => {
    const scope = userId;
    if (!scope || !supabase) {
      setSyncStatus("device");
      return;
    }
    if (requestedScopeRef.current !== scope || loadedScopeRef.current !== scope) return;

    setSyncStatus("loading");
    try {
      const cloudRecords = await listCloudArticlePreferences(scope);
      if (requestedScopeRef.current !== scope || loadedScopeRef.current !== scope) return;
      await reconcileWithCloud(scope, cloudRecords);
      if (requestedScopeRef.current !== scope || loadedScopeRef.current !== scope) return;
      setSyncStatus(statusForScope(scope));
    } catch (error) {
      if (requestedScopeRef.current !== scope) return;
      setSyncStatus(statusForCloudError(error));
    }
  }, [reconcileWithCloud, statusForScope, userId]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleOnline = () => {
      void retrySync();
    };
    const handleFocus = () => {
      const now = Date.now();
      if (now - lastFocusSyncAtRef.current < FOCUS_SYNC_THROTTLE_MS) return;
      lastFocusSyncAtRef.current = now;
      void retrySync();
    };
    window.addEventListener("online", handleOnline);
    window.addEventListener("focus", handleFocus);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("focus", handleFocus);
    };
  }, [retrySync]);

  const scopeReady = !authLoading && loadedScope === requestedScope;
  const scopedRecords = scopeReady ? records : [];
  const beverageNewsPreferences = useMemo(
    () => preferenceForSurface(scopedRecords, "beverage-news"),
    [scopedRecords]
  );
  const flavorBlogPreferences = useMemo(
    () => preferenceForSurface(scopedRecords, "flavor-blog"),
    [scopedRecords]
  );
  const favoritesPreferences = useMemo(
    () => preferenceForSurface(scopedRecords, "favorites"),
    [scopedRecords]
  );

  const syncMessage =
    syncStatus === "cloud"
      ? "Article preferences are synced to your Sip Studies account."
      : syncStatus === "offline"
        ? "Preferences are saved on this device. We’ll retry syncing when you’re online."
        : syncStatus === "device"
          ? userId
            ? "Preferences are saved on this device until cloud preference sync is available."
            : "Preferences are saved for this guest browser. Sign in to keep account preferences across devices."
          : "Loading your article preferences…";

  const value = useMemo<ArticlePreferencesContextValue>(
    () => ({
      beverageNews: beverageNewsPreferences,
      flavorBlog: flavorBlogPreferences,
      favorites: favoritesPreferences,
      updateBeverageNews: updateBeverageNewsPreferences,
      updateFlavorBlog: updateFlavorBlogPreferences,
      updateFavorites: updateFavoritesPreferences,
      loading: loading || !scopeReady,
      syncStatus,
      syncMessage,
      retrySync
    }),
    [
      beverageNewsPreferences,
      favoritesPreferences,
      flavorBlogPreferences,
      loading,
      retrySync,
      scopeReady,
      syncMessage,
      syncStatus,
      updateBeverageNewsPreferences,
      updateFavoritesPreferences,
      updateFlavorBlogPreferences
    ]
  );

  return (
    <ArticlePreferencesContext.Provider value={value}>
      {children}
    </ArticlePreferencesContext.Provider>
  );
}

export function useArticlePreferences() {
  const context = useContext(ArticlePreferencesContext);
  if (!context) {
    throw new Error("useArticlePreferences must be used within ArticlePreferencesProvider");
  }
  return context;
}
