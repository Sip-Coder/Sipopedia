import { useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import mainLogo from "../assets/brand/sip-studies-logo-03-light-opt.webp";
import wordmark from "../assets/brand/wordmark-ruthligos-opt.webp";
import { searchTerminologyCommandResults } from "../lib/terminology";

export type CompactNavItem = {
  id: string;
  label: string;
  detail: string;
  active?: boolean;
  badge?: string;
  searchText?: string;
  termId?: string;
};

export type CompactNavSearchItem = CompactNavItem & {
  groupLabel: string;
};

export type CompactNavGroup = {
  id: string;
  label: string;
  shortLabel?: string;
  items: CompactNavItem[];
};

type CompactNavigationProps = {
  mode: "public" | "workspace";
  groups: CompactNavGroup[];
  currentLabel: string;
  currentContext: string;
  accountLabel: string;
  activeGroupId?: string;
  searchItems?: CompactNavSearchItem[];
  includeTerminologySearch?: boolean;
  onNavigate: (id: string) => void;
  onOpenTerminologyTerm?: (termId: string, termLabel: string) => void;
  onOpenSearch?: () => void;
  onOpenAccount: () => void;
  onOpenHome: () => void;
};

function compactSearchScore(item: CompactNavSearchItem, normalizedQuery: string): number {
  const label = item.label.toLowerCase();
  const detail = item.detail.toLowerCase();
  const group = item.groupLabel.toLowerCase();
  const searchText = item.searchText?.toLowerCase() ?? "";

  if (label === normalizedQuery) return 110;
  if (label.startsWith(normalizedQuery)) return 90;
  if (label.includes(normalizedQuery)) return 75;
  if (searchText.includes(normalizedQuery)) return 58;
  if (detail.includes(normalizedQuery)) return 48;
  if (group.includes(normalizedQuery)) return 34;
  return 0;
}

export function CompactNavigation({
  mode,
  groups,
  currentLabel,
  currentContext,
  accountLabel,
  activeGroupId,
  searchItems,
  includeTerminologySearch = false,
  onNavigate,
  onOpenTerminologyTerm,
  onOpenSearch,
  onOpenAccount,
  onOpenHome
}: CompactNavigationProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState(activeGroupId ?? groups[0]?.id ?? "essentials");
  const [activeRowIndex, setActiveRowIndex] = useState(0);
  const [isFilterFocused, setIsFilterFocused] = useState(false);
  const [terminologyResults, setTerminologyResults] = useState<CompactNavSearchItem[]>([]);
  const [isTerminologyLoading, setIsTerminologyLoading] = useState(false);
  const [isMobileDrawer, setIsMobileDrawer] = useState(() =>
    typeof window === "undefined" ? false : window.matchMedia("(max-width: 1279px)").matches
  );
  const drawerRef = useRef<HTMLElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const filterInputRef = useRef<HTMLInputElement | null>(null);

  const availableGroups = useMemo(() => groups.filter((group) => group.items.length > 0), [groups]);
  const selectedGroup =
    availableGroups.find((group) => group.id === selectedGroupId) ??
    availableGroups.find((group) => group.id === activeGroupId) ??
    availableGroups[0];
  const normalizedQuery = query.trim().toLowerCase();
  const isOverlayDrawer = mode === "public" || isMobileDrawer;
  const searchableItems = useMemo<CompactNavSearchItem[]>(() => {
    if (searchItems?.length) return searchItems;
    return availableGroups.flatMap((group) =>
      group.items.map((item) => ({ ...item, groupLabel: group.label }))
    );
  }, [availableGroups, searchItems]);
  const staticQueryResults = useMemo(
    () =>
      normalizedQuery
        ? searchableItems
            .map((item) => ({ item, score: compactSearchScore(item, normalizedQuery) }))
            .filter((result) => result.score > 0)
            .sort((left, right) => right.score - left.score || left.item.label.localeCompare(right.item.label))
        : [],
    [normalizedQuery, searchableItems]
  );
  const queryResults = useMemo(() => {
    if (!normalizedQuery) return [];
    const combined = [
      ...staticQueryResults,
      ...terminologyResults.map((item) => ({
        item,
        score: compactSearchScore(item, normalizedQuery) + 18
      }))
    ];
    const seen = new Set<string>();
    return combined
      .sort((left, right) => right.score - left.score || left.item.label.localeCompare(right.item.label))
      .map((result) => result.item)
      .filter((item) => {
        const key = item.termId ? `term:${item.termId}` : `route:${item.id}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .slice(0, 20);
  }, [normalizedQuery, staticQueryResults, terminologyResults]);
  const displayedItems = normalizedQuery ? queryResults : selectedGroup?.items ?? [];
  const activeRowId = displayedItems[activeRowIndex] ? `sip-sidebar-${mode}-option-${activeRowIndex}` : undefined;

  useEffect(() => {
    if (!activeGroupId || !availableGroups.some((group) => group.id === activeGroupId)) return;
    setSelectedGroupId(activeGroupId);
  }, [activeGroupId, availableGroups]);

  useEffect(() => {
    if (!drawerRef.current) return;
    if (isOverlayDrawer && !isDrawerOpen) {
      drawerRef.current.setAttribute("inert", "");
      return;
    }
    drawerRef.current.removeAttribute("inert");
  }, [isDrawerOpen, isOverlayDrawer]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1279px)");
    const sync = () => setIsMobileDrawer(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (onOpenSearch) return;
    const openOnCommandKey = (event: KeyboardEvent) => {
      if (!(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== "k") return;
      const target = event.target;
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement ||
        (target instanceof HTMLElement && target.isContentEditable)
      ) {
        return;
      }
      event.preventDefault();
      setIsDrawerOpen(true);
      window.setTimeout(() => filterInputRef.current?.focus(), 0);
    };

    window.addEventListener("keydown", openOnCommandKey);
    return () => window.removeEventListener("keydown", openOnCommandKey);
  }, [onOpenSearch]);

  useEffect(() => {
    if (!isDrawerOpen || !isOverlayDrawer) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      event.stopPropagation();
      setIsDrawerOpen(false);
      window.setTimeout(() => menuButtonRef.current?.focus(), 0);
    };

    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const focusable = Array.from(
        drawerRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ) ?? []
      ).filter((element) => element.offsetParent !== null);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", closeOnEscape, true);
    document.addEventListener("keydown", trapFocus);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape, true);
      document.removeEventListener("keydown", trapFocus);
    };
  }, [isDrawerOpen, isOverlayDrawer]);

  useEffect(() => {
    const terminologyQuery = query.trim();
    if (!includeTerminologySearch || terminologyQuery.length < 2) {
      setTerminologyResults([]);
      setIsTerminologyLoading(false);
      return;
    }

    let active = true;
    setTerminologyResults([]);
    setIsTerminologyLoading(true);
    const timer = window.setTimeout(() => {
      searchTerminologyCommandResults(terminologyQuery, 12)
        .then((results) => {
          if (!active) return;
          setTerminologyResults(
            results.map((result) => ({
              id: `term:${result.id}`,
              termId: result.id,
              label: result.term,
              detail: result.meaning,
              groupLabel: "Sipopedia term",
              searchText: `${result.term} ${result.meaning}`
            }))
          );
        })
        .catch(() => {
          if (active) setTerminologyResults([]);
        })
        .finally(() => {
          if (active) setIsTerminologyLoading(false);
        });
    }, 140);

    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, [includeTerminologySearch, query]);

  useEffect(() => {
    setIsDrawerOpen(false);
    setQuery("");
  }, [currentLabel]);

  useEffect(() => {
    setActiveRowIndex(0);
  }, [normalizedQuery, selectedGroupId]);

  useEffect(() => {
    if (isOverlayDrawer && !isDrawerOpen) return;
    const timer = window.setTimeout(() => {
      drawerRef.current
        ?.querySelector<HTMLElement>('.sip-sidebar-row[aria-current="page"]')
        ?.scrollIntoView({ block: "nearest" });
    }, 80);
    return () => window.clearTimeout(timer);
  }, [currentLabel, isDrawerOpen, isOverlayDrawer, selectedGroupId]);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const openSearch = () => {
    setIsDrawerOpen(true);
    window.setTimeout(() => filterInputRef.current?.focus(), 0);
  };

  const chooseItem = (item: CompactNavItem) => {
    if (item.termId && onOpenTerminologyTerm) {
      onOpenTerminologyTerm(item.termId, item.label);
    } else {
      onNavigate(item.id);
    }
    if (isOverlayDrawer) {
      setIsDrawerOpen(false);
      window.setTimeout(() => menuButtonRef.current?.focus(), 0);
    }
  };

  const handleFilterKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (displayedItems.length === 0) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveRowIndex((current) => (current + 1) % displayedItems.length);
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveRowIndex((current) => (current - 1 + displayedItems.length) % displayedItems.length);
      return;
    }
    if (event.key === "Home") {
      event.preventDefault();
      setActiveRowIndex(0);
      return;
    }
    if (event.key === "End") {
      event.preventDefault();
      setActiveRowIndex(displayedItems.length - 1);
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      chooseItem(displayedItems[activeRowIndex] ?? displayedItems[0]);
    }
  };

  const renderRouteRow = (item: CompactNavItem, rowIndex: number, groupLabel?: string) => (
    <button
      key={`${groupLabel ?? selectedGroup?.id ?? "nav"}:${item.id}`}
      id={`sip-sidebar-${mode}-option-${rowIndex}`}
      type="button"
      className={`sip-sidebar-row ${item.active ? "active" : ""} ${isFilterFocused && activeRowIndex === rowIndex ? "keyboard-active" : ""}`.trim()}
      aria-current={item.active ? "page" : undefined}
      onMouseEnter={() => setActiveRowIndex(rowIndex)}
      onClick={() => chooseItem(item)}
    >
      <span className="sip-sidebar-row-copy">
        <strong>{item.label}</strong>
        <small>{groupLabel ? `${groupLabel} · ${item.detail}` : item.detail}</small>
      </span>
      {item.badge ? <em>{item.badge}</em> : null}
    </button>
  );

  return (
    <div className={`sip-compact-navigation sip-compact-navigation-${mode} ${isDrawerOpen ? "drawer-open" : ""}`}>
      <header className="sip-appbar">
        <button
          ref={menuButtonRef}
          type="button"
          className="sip-appbar-menu"
          onClick={openDrawer}
          aria-expanded={isDrawerOpen}
          aria-controls={`sip-sidebar-${mode}`}
        >
          Menu
        </button>
        <button type="button" className="sip-appbar-brand" onClick={onOpenHome} aria-label="Open Sip Studies home">
          <img src={mainLogo} alt="" className="sip-appbar-seal" />
          <img src={wordmark} alt="Sip Studies" className="sip-appbar-wordmark" />
        </button>
        <div className="sip-appbar-current" aria-label="Current destination">
          <span>{currentContext}</span>
          <strong>{currentLabel}</strong>
        </div>
        <div className="sip-appbar-actions">
          <button
            type="button"
            className="sip-appbar-search"
            onClick={() => {
              if (onOpenSearch) {
                onOpenSearch();
                return;
              }
              openSearch();
            }}
          >
            <span>Search</span>
            <kbd>Ctrl K</kbd>
          </button>
          <button type="button" className="sip-appbar-account" onClick={onOpenAccount}>
            {accountLabel}
          </button>
        </div>
      </header>

      <button
        type="button"
        className="sip-drawer-backdrop"
        aria-label="Close navigation"
        tabIndex={isDrawerOpen && isOverlayDrawer ? 0 : -1}
        onClick={() => {
          setIsDrawerOpen(false);
          window.setTimeout(() => menuButtonRef.current?.focus(), 0);
        }}
      />

      <aside
        ref={drawerRef}
        id={`sip-sidebar-${mode}`}
        className="sip-sidebar"
        aria-label="Sip Studies destinations"
        aria-hidden={isOverlayDrawer && !isDrawerOpen ? "true" : undefined}
        aria-modal={isOverlayDrawer && isDrawerOpen ? "true" : undefined}
        role={isOverlayDrawer ? "dialog" : "navigation"}
      >
        <div className="sip-sidebar-heading">
          <button type="button" className="sip-sidebar-brand" onClick={onOpenHome}>
            <img src={mainLogo} alt="" />
            <span>
              <strong>Sip Studies</strong>
              <small>Study rooms</small>
            </span>
          </button>
          <button
            type="button"
            className="sip-sidebar-close"
            onClick={() => {
              setIsDrawerOpen(false);
              window.setTimeout(() => menuButtonRef.current?.focus(), 0);
            }}
          >
            Close
          </button>
        </div>

        <label className="sip-sidebar-search">
          <span>Search</span>
          <input
            ref={filterInputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search"
            aria-label="Search Sip Studies"
            aria-controls={`sip-sidebar-${mode}-routes`}
            aria-activedescendant={activeRowId}
            aria-busy={isTerminologyLoading}
            onKeyDown={handleFilterKeyDown}
            onFocus={() => setIsFilterFocused(true)}
            onBlur={() => setIsFilterFocused(false)}
          />
        </label>

        <div className="sip-sidebar-groups" role="tablist" aria-label="Destination groups">
          {availableGroups.map((group) => (
            <button
              key={group.id}
              type="button"
              role="tab"
              aria-selected={!normalizedQuery && selectedGroup?.id === group.id}
              className={!normalizedQuery && selectedGroup?.id === group.id ? "active" : ""}
              onClick={() => {
                setQuery("");
                setSelectedGroupId(group.id);
              }}
            >
              <span>{group.shortLabel ?? group.label}</span>
              <small>{group.items.length}</small>
            </button>
          ))}
        </div>

        <div id={`sip-sidebar-${mode}-routes`} className="sip-sidebar-route-list">
          <div className="sip-sidebar-list-heading">
            <span>{normalizedQuery ? "Search results" : selectedGroup?.label ?? "Destinations"}</span>
            <small>{normalizedQuery ? queryResults.length : selectedGroup?.items.length ?? 0}</small>
          </div>
          {normalizedQuery ? (
            queryResults.length > 0 ? (
              queryResults.map((item, index) => renderRouteRow(item, index, item.groupLabel))
            ) : isTerminologyLoading ? (
              <p className="sip-sidebar-empty" role="status">Searching Sipopedia…</p>
            ) : (
              <p className="sip-sidebar-empty">No page or term matches “{query.trim()}”.</p>
            )
          ) : (
            selectedGroup?.items.map((item, index) => renderRouteRow(item, index))
          )}
        </div>

        <footer className="sip-sidebar-footer">
          <span>Shortcuts</span>
          <p>
            <kbd>Ctrl K</kbd> Search
          </p>
          {mode === "workspace" ? (
            <p>
              <kbd>Shift ← →</kbd> Lane <kbd>Ctrl ← →</kbd> Module
            </p>
          ) : null}
        </footer>
      </aside>
    </div>
  );
}
