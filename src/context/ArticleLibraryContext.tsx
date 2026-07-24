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
  readLocalArticleLibrary,
  saveCloudArticleLibrary,
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

function updateSnapshot(item: ArticleLibraryItem, article: ArticleSnapshot): ArticleLibraryItem {
  return {
    ...item,
    ...article,
    articleKey: item.articleKey
  };
}

export function ArticleLibraryProvider({ children }: PropsWithChildren) {
  const { user, loading: authLoading } = useAuth();
  const [items, setItems] = useState<ArticleLibraryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncStatus, setSyncStatus] = useState<ArticleLibrarySyncStatus>("loading");
  const [announcement, setAnnouncement] = useState("");
  const itemsRef = useRef<ArticleLibraryItem[]>([]);
  const activeScopeRef = useRef(GUEST_SCOPE);
  const syncQueueRef = useRef<Record<string, Promise<void>>>({});

  const commitItems = useCallback((scope: string, nextItems: ArticleLibraryItem[]) => {
    itemsRef.current = nextItems;
    setItems(nextItems);
    writeLocalArticleLibrary(scope, nextItems);
  }, []);

  useEffect(() => {
    if (authLoading) return;

    let canceled = false;
    const scope = user?.id ?? GUEST_SCOPE;
    activeScopeRef.current = scope;
    const cached = readLocalArticleLibrary(scope);
    itemsRef.current = cached;
    setItems(cached);

    if (!user || !supabase) {
      setSyncStatus("device");
      setLoading(false);
      return;
    }

    setLoading(true);
    setSyncStatus("loading");
    const guestItems = readLocalArticleLibrary(GUEST_SCOPE);

    void (async () => {
      try {
        const cloudItems = await listCloudArticleLibrary(user.id);
        if (canceled) return;
        const currentItems = itemsRef.current;
        const accountPending = articleLibraryItemsNeedingCloudSave(currentItems, cloudItems);
        const accountItems = mergeArticleLibraryItems(currentItems, cloudItems);
        const merged = mergeGuestArticleLibrary(accountItems, guestItems);
        const pendingKeys = new Set([
          ...accountPending.map((item) => item.articleKey),
          ...guestItems
            .filter((item) => item.isRead || item.isFavorite)
            .map((item) => item.articleKey)
        ]);
        commitItems(scope, merged);
        // Only send true local changes and guest imports. Re-upserting every
        // cloud row here could overwrite a newer action from another device.
        await saveCloudArticleLibrary(
          user.id,
          merged.filter((item) => pendingKeys.has(item.articleKey))
        );
        if (canceled) return;
        if (guestItems.length > 0) clearLocalArticleLibrary(GUEST_SCOPE);
        setSyncStatus("cloud");
      } catch {
        if (canceled) return;
        const merged = mergeGuestArticleLibrary(cached, guestItems);
        commitItems(scope, merged);
        setSyncStatus("offline");
      } finally {
        if (!canceled) setLoading(false);
      }
    })();

    return () => {
      canceled = true;
    };
  }, [authLoading, commitItems, user]);

  const enqueueCloudSave = useCallback(
    (item: ArticleLibraryItem) => {
      if (!user || !supabase) {
        setSyncStatus("device");
        return;
      }

      const previous = syncQueueRef.current[item.articleKey] ?? Promise.resolve();
      const next = previous
        .catch(() => undefined)
        .then(() => saveCloudArticleLibraryItem(user.id, item))
        .then(() => {
          setSyncStatus("cloud");
        })
        .catch(() => {
          setSyncStatus("offline");
          setAnnouncement("Saved on this device. We’ll retry syncing when you’re online.");
        });
      syncQueueRef.current[item.articleKey] = next;
    },
    [user]
  );

  const updatePreference = useCallback(
    (article: ArticleSnapshot, field: "read" | "favorite", value: boolean) => {
      const now = new Date().toISOString();
      const articleKey = articleKeyFor(article);
      const currentItems = itemsRef.current;
      const existing = currentItems.find((item) => item.articleKey === articleKey);
      const base = existing ? updateSnapshot(existing, article) : createArticleLibraryItem(article, now);
      const nextItem: ArticleLibraryItem =
        field === "read"
          ? {
              ...base,
              isRead: value,
              readAt: value ? now : null,
              updatedAt: now
            }
          : {
              ...base,
              isFavorite: value,
              favoritedAt: value ? now : null,
              updatedAt: now
            };

      const retained = currentItems.filter((item) => item.articleKey !== articleKey);
      // Keep neutral records as tombstones so a later sync cannot resurrect
      // stale read or favorite state from another device.
      const nextItems = [nextItem, ...retained];
      commitItems(activeScopeRef.current, nextItems);
      enqueueCloudSave(nextItem);

      if (field === "read") {
        setAnnouncement(value ? "Marked as read." : "Marked as unread.");
      } else {
        setAnnouncement(value ? "Saved to Favorites." : "Removed from Favorites.");
      }
    },
    [commitItems, enqueueCloudSave]
  );

  const retrySync = useCallback(async () => {
    if (!user || !supabase) {
      setSyncStatus("device");
      return;
    }
    setSyncStatus("loading");
    try {
      const cloudItems = await listCloudArticleLibrary(user.id);
      const pending = articleLibraryItemsNeedingCloudSave(itemsRef.current, cloudItems);
      const merged = mergeArticleLibraryItems(itemsRef.current, cloudItems);
      commitItems(activeScopeRef.current, merged);
      await saveCloudArticleLibrary(user.id, pending);
      setSyncStatus("cloud");
      setAnnouncement("Your reading list is synced.");
    } catch {
      setSyncStatus("offline");
      setAnnouncement("Saved on this device. We’ll retry syncing when you’re online.");
    }
  }, [commitItems, user]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleOnline = () => {
      void retrySync();
    };
    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, [retrySync]);

  const itemByKey = useMemo(() => new Map(items.map((item) => [item.articleKey, item] as const)), [items]);
  const favorites = useMemo(
    () =>
      items
        .filter((item) => item.isFavorite)
        .sort((a, b) => Date.parse(b.favoritedAt ?? b.updatedAt) - Date.parse(a.favoritedAt ?? a.updatedAt)),
    [items]
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
      const articleKey = articleKeyFor(article);
      if (itemsRef.current.find((item) => item.articleKey === articleKey)?.isRead) return;
      updatePreference(article, "read", true);
    },
    [updatePreference]
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
          ? "Saved on this device. Sign in to sync Favorites across devices."
          : "Loading your reading list…";

  const value = useMemo<ArticleLibraryContextValue>(
    () => ({
      items,
      favorites,
      favoriteCount: favorites.length,
      loading,
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
      items,
      loading,
      markRead,
      retrySync,
      setFavorite,
      setRead,
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
