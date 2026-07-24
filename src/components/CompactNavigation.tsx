import { useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import mainLogo from "../assets/brand/sip-studies-main-logo-opt.webp";
import wordmark from "../assets/brand/wordmark-ruthligos-opt.webp";

export type CompactNavItem = {
  id: string;
  label: string;
  detail: string;
  active?: boolean;
  badge?: string;
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
  onNavigate: (id: string) => void;
  onOpenSearch?: () => void;
  onOpenAccount: () => void;
  onOpenHome: () => void;
};

function initialForLabel(label: string): string {
  const word = label.trim().split(/\s+/)[0] ?? "";
  return word.slice(0, 1).toUpperCase() || "S";
}

export function CompactNavigation({
  mode,
  groups,
  currentLabel,
  currentContext,
  accountLabel,
  activeGroupId,
  onNavigate,
  onOpenSearch,
  onOpenAccount,
  onOpenHome
}: CompactNavigationProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState(activeGroupId ?? groups[0]?.id ?? "essentials");
  const [activeRowIndex, setActiveRowIndex] = useState(0);
  const [isFilterFocused, setIsFilterFocused] = useState(false);
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
  const queryResults = useMemo(
    () =>
      normalizedQuery
        ? availableGroups.flatMap((group) =>
            group.items
              .filter((item) => `${item.label} ${item.detail} ${item.badge ?? ""} ${group.label}`.toLowerCase().includes(normalizedQuery))
              .map((item) => ({ ...item, groupLabel: group.label }))
          )
        : [],
    [availableGroups, normalizedQuery]
  );
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
    const focusTimer = window.setTimeout(() => filterInputRef.current?.focus(), 0);

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
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape, true);
      document.removeEventListener("keydown", trapFocus);
    };
  }, [isDrawerOpen, isOverlayDrawer]);

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
    if (isOverlayDrawer) window.setTimeout(() => filterInputRef.current?.focus(), 0);
  };

  const chooseItem = (id: string) => {
    onNavigate(id);
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
      chooseItem(displayedItems[activeRowIndex]?.id ?? displayedItems[0].id);
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
      onClick={() => chooseItem(item.id)}
    >
      <span className="sip-sidebar-row-mark" aria-hidden="true">
        {initialForLabel(item.label)}
      </span>
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
          <span>
            <img src={wordmark} alt="Sip Studies" className="sip-appbar-wordmark" />
            <small>Sipopedia</small>
          </span>
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
              openDrawer();
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
          <span>Find a destination</span>
          <input
            ref={filterInputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search rooms..."
            aria-label="Search destinations"
            aria-controls={`sip-sidebar-${mode}-routes`}
            aria-activedescendant={activeRowId}
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
            ) : (
              <p className="sip-sidebar-empty">No destination matches “{query.trim()}”.</p>
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
