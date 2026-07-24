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
import { useAuth } from "./AuthContext";
import {
  articleLibraryItemsNeedingCloudSave,
  articleKeyFor,
  clearLocalArticleLibrary,
  createArticleLibraryItem,
  listCloudArticleLibrary,
  mergeArticleLibraryItems,
  mergeGuestArticleLibrary,
  nextArticleLibraryTimestamp,
  readLocalArticleLibrary,
  saveCloudArticleLibraryItem,
  writeLocalArticleLibrary,
  type ArticleLibraryItem,
  type ArticleSnapshot
} from "../lib/articleLibrary";
import { supabase } from "../lib/supabase";

export type ArticleLibrarySyncStatus = "loading" | "cloud" | "device" | "offline";

type ArticleLibraryContextValue = {
  items: ArticleLibraryItem[];
  favorites: ArticleLibraryItem[];
  favoriteCount: number;
  loading: boolean;
  syncStatus: ArticleLibrarySyncStatus;
  syncMessage: string;
  announcement: string;
  isRead: (article: ArticleSnapshot) => boolean;
  isFavorite: (article: ArticleSnapshot) => boolean;
  markRead: (article: ArticleSnapshot) => void;
  setRead: (article: ArticleSnapshot, isRead: boolean) => void;
  setFavorite: (article: ArticleSnapshot, isFavorite: boolean) => void;
  retrySync: () => Promise<void>;
};

const ArticleLibraryContext = createContext<ArticleLibraryContextValue | undefined>(undefined);
const GUEST_SCOPE = "guest";
const AUTH_PENDING_SCOPE = "auth-pending";
const FOCUS_SYNC_THROTTLE_MS = 5_000;

type CommitResult = {
  committed: true;
  persisted: boolean;
};

function updateSnapshot(item: ArticleLibraryItem, article: ArticleSnapshot): ArticleLibraryItem {
  return {
    ...item,
    ...article,
    articleKey: item.articleKey
  };
}

function cloudQueueKey(scope: string, articleKey: string): string {
  return JSON.stringify([scope, articleKey]);
}

function guestActivityToken(
  item: ArticleLibraryItem,
  field: "read" | "favorite"
): string {
  const clock =
    field === "read" ? item.readStateUpdatedAt : item.favoriteStateUpdatedAt;
  return [item.articleKey, field, clock ?? ""].join("\u001f");
}

function unclaimedGuestActivity(
  items: ArticleLibraryItem[],
  claimedActivity: Set<string>
): ArticleLibraryItem[] {
  return items.flatMap((item) => {
    const claimRead =
      item.isRead && !claimedActivity.has(guestActivityToken(item, "read"));
    const claimFavorite =
      item.isFavorite && !claimedActivity.has(guestActivityToken(item, "favorite"));
    if (!claimRead && !claimFavorite) return [];
    return [
      {
        ...item,
        isRead: claimRead,
        readAt: claimRead ? item.readAt : null,
        readStateUpdatedAt: claimRead ? item.readStateUpdatedAt : null,
        isFavorite: claimFavorite,
        favoritedAt: claimFavorite ? item.favoritedAt : null,
        favoriteStateUpdatedAt: claimFavorite ? item.favoriteStateUpdatedAt : null
      }
    ];
  });
}

function claimGuestActivity(items: ArticleLibraryItem[], claimedActivity: Set<string>): void {
  for (const item of items) {
    if (item.isRead) claimedActivity.add(guestActivityToken(item, "read"));
    if (item.isFavorite) claimedActivity.add(guestActivityToken(item, "favorite"));
  }
}

function trackedKeysFor(registry: Map<string, Set<string>>, scope: string): Set<string> {
  const existing = registry.get(scope);
  if (existing) return existing;
  const created = new Set<string>();
  registry.set(scope, created);
  return created;
}

export function ArticleLibraryProvider({ children }: PropsWithChildren) {
  const { user, loading: authLoading } = useAuth();
  const userId = user?.id ?? null;
  const requestedScope = userId ?? GUEST_SCOPE;
  const [items, setItems] = useState<ArticleLibraryItem[]>([]);
  const [loadedScope, setLoadedScope] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncStatus, setSyncStatus] = useState<ArticleLibrarySyncStatus>("loading");
  const [announcement, setAnnouncement] = useState("");
  const itemsRef = useRef<ArticleLibraryItem[]>([]);
  const requestedScopeRef = useRef(requestedScope);
  const loadedScopeRef = useRef<string | null>(null);
  const syncQueueRef = useRef<Record<string, Promise<void>>>({});
  const dirtySaveKeysRef = useRef(new Map<string, Set<string>>());
  const failedSaveKeysRef = useRef(new Map<string, Set<string>>());
  const cloudReadyScopesRef = useRef(new Set<string>());
  const pendingMarkReadRef = useRef(new Map<string, Map<string, ArticleSnapshot>>());
  const guestClaimsRef = useRef(new Set<string>());
  const lastFocusSyncAtRef = useRef(0);
  requestedScopeRef.current = requestedScope;

  const commitItems = useCallback((scope: string, nextItems: ArticleLibraryItem[]): CommitResult | null => {
    if (requestedScopeRef.current !== scope) return null;
    itemsRef.current = nextItems;
    loadedScopeRef.current = scope;
    setItems(nextItems);
    setLoadedScope(scope);
    return {
      committed: true,
      persisted: writeLocalArticleLibrary(scope, nextItems)
    };
  }, []);

  const publishTrackedSyncStatus = useCallback((scope: string) => {
    if (requestedScopeRef.current !== scope) return;
    const dirtyKeys = dirtySaveKeysRef.current.get(scope);
    const failedKeys = failedSaveKeysRef.current.get(scope);
    if (failedKeys && failedKeys.size > 0) {
      setSyncStatus("offline");
    } else if (dirtyKeys && dirtyKeys.size > 0) {
      setSyncStatus("loading");
    } else {
      setSyncStatus(cloudReadyScopesRef.current.has(scope) ? "cloud" : "offline");
    }
  }, []);

  const clearResolvedSaveTracking = useCallback(
    (scope: string, pendingItems: ArticleLibraryItem[]) => {
      const pendingKeys = new Set(pendingItems.map((item) => item.articleKey));
      const dirtyKeys = dirtySaveKeysRef.current.get(scope);
      const failedKeys = failedSaveKeysRef.current.get(scope);
      if (!dirtyKeys && !failedKeys) return;

      for (const articleKey of new Set([...(dirtyKeys ?? []), ...(failedKeys ?? [])])) {
        if (
          !pendingKeys.has(articleKey) &&
          !syncQueueRef.current[cloudQueueKey(scope, articleKey)]
        ) {
          dirtyKeys?.delete(articleKey);
          failedKeys?.delete(articleKey);
        }
      }
    },
    []
  );

  const queueCloudItemSave = useCallback(
    (scope: string, item: ArticleLibraryItem): Promise<void> => {
      const queueKey = cloudQueueKey(scope, item.articleKey);
      const dirtyKeys = trackedKeysFor(dirtySaveKeysRef.current, scope);
      const failedKeys = trackedKeysFor(failedSaveKeysRef.current, scope);
      dirtyKeys.add(item.articleKey);
      failedKeys.delete(item.articleKey);
      if (requestedScopeRef.current === scope) setSyncStatus("loading");

      const previous = syncQueueRef.current[queueKey] ?? Promise.resolve();
      const task = previous
        .catch(() => undefined)
        .then(async () => {
          const savedItem = await saveCloudArticleLibraryItem(scope, item);
          if (requestedScopeRef.current !== scope || loadedScopeRef.current !== scope) return;
          const currentItem = itemsRef.current.find((candidate) => candidate.articleKey === item.articleKey);
          const mergedItem = currentItem
            ? mergeArticleLibraryItems([currentItem], [savedItem])[0]
            : savedItem;
          const retained = itemsRef.current.filter((candidate) => candidate.articleKey !== item.articleKey);
          commitItems(scope, [mergedItem, ...retained]);
        });
      syncQueueRef.current[queueKey] = task;

      void task.then(
        () => {
          if (syncQueueRef.current[queueKey] !== task) return;
          delete syncQueueRef.current[queueKey];
          dirtyKeys.delete(item.articleKey);
          failedKeys.delete(item.articleKey);
          publishTrackedSyncStatus(scope);
        },
        () => {
          if (syncQueueRef.current[queueKey] !== task) return;
          delete syncQueueRef.current[queueKey];
          failedKeys.add(item.articleKey);
          publishTrackedSyncStatus(scope);
        }
      );
      return task;
    },
    [commitItems, publishTrackedSyncStatus]
  );

  useEffect(() => {
    if (authLoading) return;

    let canceled = false;
    const scope = requestedScope;
    const isCurrentScope = () => !canceled && requestedScopeRef.current === scope;
    const transferPendingReads = (fromScope: string) => {
      const pendingReads = pendingMarkReadRef.current.get(fromScope);
      if (!pendingReads || pendingReads.size === 0) return;
      const pendingForScope =
        pendingMarkReadRef.current.get(scope) ?? new Map<string, ArticleSnapshot>();
      for (const [articleKey, article] of pendingReads) {
        pendingForScope.set(articleKey, article);
      }
      pendingMarkReadRef.current.set(scope, pendingForScope);
      pendingMarkReadRef.current.delete(fromScope);
    };
    transferPendingReads(AUTH_PENDING_SCOPE);
    if (userId) {
      // A signed-in session can resolve after an article link was clicked.
      // Carry that pre-auth read intent into the resolved account scope.
      transferPendingReads(GUEST_SCOPE);
    }
    const cached = readLocalArticleLibrary(scope);
    const guestItems = userId ? readLocalArticleLibrary(GUEST_SCOPE) : [];
    const guestItemsToClaim = userId
      ? unclaimedGuestActivity(guestItems, guestClaimsRef.current)
      : [];
    const scopedItems = userId ? mergeGuestArticleLibrary(cached, guestItemsToClaim) : cached;

    setLoading(true);
    setSyncStatus("loading");
    setAnnouncement("");
    const initialCommit = commitItems(scope, scopedItems);
    if (!initialCommit) return;

    if (userId && guestItemsToClaim.length > 0) {
      if (!initialCommit.persisted) {
        // Do not let a transient in-memory guest merge reach the cloud when
        // no durable account copy exists to retry from. Restore the account
        // cache before cloud reconciliation and leave the guest cache intact.
        if (!commitItems(scope, cached)) return;
      } else {
        // Claim guest activity only after it has a verified user-scoped local
        // copy. Cloud retries now come from that account cache, so another
        // account on the same browser cannot inherit the same guest actions.
        claimGuestActivity(guestItemsToClaim, guestClaimsRef.current);
        if (!clearLocalArticleLibrary(GUEST_SCOPE)) {
          // Some storage implementations can report a failed remove even
          // after a successful account write. Try a second, verifiable form
          // of clearing while the in-session claim guard remains active.
          writeLocalArticleLibrary(GUEST_SCOPE, []);
        }
      }
    }

    if (!userId || !supabase) {
      setSyncStatus("device");
      setLoading(false);
      return;
    }

    void (async () => {
      try {
        const cloudItems = await listCloudArticleLibrary(userId);
        if (!isCurrentScope()) return;
        const currentItems = itemsRef.current;
        const pendingLocal = articleLibraryItemsNeedingCloudSave(currentItems, cloudItems);
        const pendingKeys = new Set(pendingLocal.map((item) => item.articleKey));
        const merged = mergeArticleLibraryItems(currentItems, cloudItems);
        const pending = merged.filter((item) => pendingKeys.has(item.articleKey));
        clearResolvedSaveTracking(scope, pending);
        commitItems(scope, merged);
        cloudReadyScopesRef.current.add(scope);
        // Serialize startup saves through the same per-account/per-article
        // queue as live clicks so a stale bootstrap write cannot finish last.
        await Promise.all(pending.map((item) => queueCloudItemSave(scope, item)));
        if (!isCurrentScope()) return;
        publishTrackedSyncStatus(scope);
      } catch {
        if (!isCurrentScope()) return;
        // Keep the current scoped snapshot. It may include read/bookmark
        // actions made while the cloud request was pending.
        setSyncStatus("offline");
      } finally {
        if (isCurrentScope()) setLoading(false);
      }
    })();

    return () => {
      canceled = true;
    };
  }, [
    authLoading,
    clearResolvedSaveTracking,
    commitItems,
    publishTrackedSyncStatus,
    queueCloudItemSave,
    requestedScope,
    userId
  ]);

  const enqueueCloudSave = useCallback(
    (scope: string, item: ArticleLibraryItem) => {
      if (!userId || userId !== scope || !supabase) {
        setSyncStatus("device");
        return;
      }

      void queueCloudItemSave(scope, item)
        .then(() => {
          if (requestedScopeRef.current !== scope) return;
          publishTrackedSyncStatus(scope);
        })
        .catch(() => {
          if (requestedScopeRef.current !== scope) return;
          setSyncStatus("offline");
          setAnnouncement("Saved on this device. We’ll retry syncing when you’re online.");
        });
    },
    [publishTrackedSyncStatus, queueCloudItemSave, userId]
  );

  const updatePreference = useCallback(
    (article: ArticleSnapshot, field: "read" | "favorite", value: boolean) => {
      const scope = requestedScopeRef.current;
      if (loadedScopeRef.current !== scope) {
        setAnnouncement("Your reading list is still loading. Please try again.");
        return;
      }

      const snapshotAt = new Date().toISOString();
      const articleKey = articleKeyFor(article);
      const currentItems = itemsRef.current;
      const existing = currentItems.find((item) => item.articleKey === articleKey);
      const base = existing ? updateSnapshot(existing, article) : createArticleLibraryItem(article, snapshotAt);
      const now = nextArticleLibraryTimestamp(
        base.updatedAt,
        field === "read" ? base.readStateUpdatedAt : base.favoriteStateUpdatedAt
      );
      const nextItem: ArticleLibraryItem =
        field === "read"
          ? {
              ...base,
              isRead: value,
              readAt: value ? now : null,
              readStateUpdatedAt: now,
              updatedAt: now
            }
          : {
              ...base,
              isFavorite: value,
              favoritedAt: value ? now : null,
              favoriteStateUpdatedAt: now,
              updatedAt: now
            };

      const retained = currentItems.filter((item) => item.articleKey !== articleKey);
      // Keep neutral records as tombstones so a later sync cannot resurrect
      // stale read or favorite state from another device.
      const nextItems = [nextItem, ...retained];
      commitItems(scope, nextItems);
      enqueueCloudSave(scope, nextItem);

      if (field === "read") {
        setAnnouncement(value ? "Marked as read." : "Marked as unread.");
      } else {
        setAnnouncement(value ? "Saved to Favorites." : "Removed from Favorites.");
      }
    },
    [commitItems, enqueueCloudSave]
  );

  useEffect(() => {
    if (authLoading || loadedScope !== requestedScope) return;
    const pending = pendingMarkReadRef.current.get(requestedScope);
    if (!pending || pending.size === 0) return;
    pendingMarkReadRef.current.delete(requestedScope);
    for (const article of pending.values()) {
      const articleKey = articleKeyFor(article);
      if (itemsRef.current.find((item) => item.articleKey === articleKey)?.isRead) continue;
      updatePreference(article, "read", true);
    }
  }, [authLoading, loadedScope, requestedScope, updatePreference]);

  const retrySync = useCallback(async () => {
    const scope = userId;
    if (!scope || !supabase) {
      setSyncStatus("device");
      return;
    }
    if (requestedScopeRef.current !== scope || loadedScopeRef.current !== scope) return;

    setSyncStatus("loading");
    try {
      const cloudItems = await listCloudArticleLibrary(scope);
      if (requestedScopeRef.current !== scope || loadedScopeRef.current !== scope) return;
      const currentItems = itemsRef.current;
      const pendingLocal = articleLibraryItemsNeedingCloudSave(currentItems, cloudItems);
      const pendingKeys = new Set(pendingLocal.map((item) => item.articleKey));
      const merged = mergeArticleLibraryItems(currentItems, cloudItems);
      const pending = merged.filter((item) => pendingKeys.has(item.articleKey));
      clearResolvedSaveTracking(scope, pending);
      if (!commitItems(scope, merged)) return;
      cloudReadyScopesRef.current.add(scope);
      await Promise.all(pending.map((item) => queueCloudItemSave(scope, item)));
      if (requestedScopeRef.current !== scope || loadedScopeRef.current !== scope) return;
      publishTrackedSyncStatus(scope);
      setAnnouncement("Your reading list is synced.");
    } catch {
      if (requestedScopeRef.current !== scope || loadedScopeRef.current !== scope) return;
      setSyncStatus("offline");
      setAnnouncement("Saved on this device. We’ll retry syncing when you’re online.");
    }
  }, [
    clearResolvedSaveTracking,
    commitItems,
    publishTrackedSyncStatus,
    queueCloudItemSave,
    userId
  ]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const refresh = () => {
      void retrySync();
    };
    const handleFocus = () => {
      const now = Date.now();
      if (now - lastFocusSyncAtRef.current < FOCUS_SYNC_THROTTLE_MS) return;
      lastFocusSyncAtRef.current = now;
      refresh();
    };
    window.addEventListener("online", refresh);
    window.addEventListener("focus", handleFocus);
    return () => {
      window.removeEventListener("online", refresh);
      window.removeEventListener("focus", handleFocus);
    };
  }, [retrySync]);

  const scopeReady = !authLoading && loadedScope === requestedScope;
  const scopedItems = scopeReady ? items : [];
  const itemByKey = useMemo(
    () => new Map(scopedItems.map((item) => [item.articleKey, item] as const)),
    [scopedItems]
  );
  const favorites = useMemo(
    () =>
      scopedItems
        .filter((item) => item.isFavorite)
        .sort((a, b) => Date.parse(b.favoritedAt ?? b.updatedAt) - Date.parse(a.favoritedAt ?? a.updatedAt)),
    [scopedItems]
  );
  const isRead = useCallback(
    (article: ArticleSnapshot) => itemByKey.get(articleKeyFor(article))?.isRead === true,
    [itemByKey]
  );
  const isFavorite = useCallback(
    (article: ArticleSnapshot) => itemByKey.get(articleKeyFor(article))?.isFavorite === true,
    [itemByKey]
  );
  const setRead = useCallback(
    (article: ArticleSnapshot, value: boolean) => updatePreference(article, "read", value),
    [updatePreference]
  );
  const markRead = useCallback(
    (article: ArticleSnapshot) => {
      const scope = authLoading ? AUTH_PENDING_SCOPE : requestedScopeRef.current;
      if (authLoading || loadedScopeRef.current !== scope) {
        const pending =
          pendingMarkReadRef.current.get(scope) ?? new Map<string, ArticleSnapshot>();
        pending.set(articleKeyFor(article), article);
        pendingMarkReadRef.current.set(scope, pending);
        setAnnouncement("Marked as read. It will be saved when your reading list loads.");
        return;
      }
      const articleKey = articleKeyFor(article);
      if (itemsRef.current.find((item) => item.articleKey === articleKey)?.isRead) return;
      updatePreference(article, "read", true);
    },
    [authLoading, updatePreference]
  );
  const setFavorite = useCallback(
    (article: ArticleSnapshot, value: boolean) => updatePreference(article, "favorite", value),
    [updatePreference]
  );

  const syncMessage =
    syncStatus === "cloud"
      ? "Synced to your Sip Studies account."
      : syncStatus === "offline"
        ? "Saved on this device. We’ll retry syncing when you’re online."
        : syncStatus === "device"
          ? "Saved on this device. Sign in to sync reading and Favorites across devices."
          : "Loading your reading list…";

  const value = useMemo<ArticleLibraryContextValue>(
    () => ({
      items: scopedItems,
      favorites,
      favoriteCount: favorites.length,
      loading: loading || !scopeReady,
      syncStatus,
      syncMessage,
      announcement,
      isRead,
      isFavorite,
      markRead,
      setRead,
      setFavorite,
      retrySync
    }),
    [
      announcement,
      favorites,
      isFavorite,
      isRead,
      loading,
      markRead,
      retrySync,
      setFavorite,
      setRead,
      scopeReady,
      scopedItems,
      syncMessage,
      syncStatus
    ]
  );

  return (
    <ArticleLibraryContext.Provider value={value}>
      {children}
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {announcement}
      </p>
    </ArticleLibraryContext.Provider>
  );
}

export function useArticleLibrary() {
  const context = useContext(ArticleLibraryContext);
  if (!context) throw new Error("useArticleLibrary must be used within ArticleLibraryProvider");
  return context;
}
