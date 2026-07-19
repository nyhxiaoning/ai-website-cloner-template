"use client";

import { useState, useMemo, useEffect } from "react";
import type { Book, ThemeId, ViewMode } from "@/types";
import { VIEW_LABELS, THEME_LABELS } from "@/types";
import { getBooks, clearCache } from "@/lib/book-store";
import { MOCK_PURCHASE_STATS, MOCK_CONFIG } from "@/data/mock-data";
import Topbar from "@/components/Topbar";
import HeroManifesto from "@/components/HeroManifesto";
import StatsStrip from "@/components/StatsStrip";
import YearList from "@/components/YearList";
import BookCard from "@/components/BookCard";
import InspectorPanel from "@/components/InspectorPanel";
import TagCloud from "@/components/TagCloud";
import RecentNotes from "@/components/RecentNotes";

const THEME_STORAGE_KEY = "books-ledger:theme";

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [theme, setTheme] = useState<ThemeId>("github-light");
  const [view, setView] = useState<ViewMode>("all");
  const [year, setYear] = useState<string>("all");
  const [yearExpanded, setYearExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Load books from store and theme from localStorage on mount
  useEffect(() => {
    clearCache();
    setBooks(getBooks());
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored && Object.keys(THEME_LABELS).includes(stored)) {
        setTheme(stored as ThemeId);
      }
    } catch {
      // ignore
    }
    setMounted(true);
  }, []);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // ignore
    }
  }, [theme]);

  // Determine which books match the current view filter
  const viewItems = useMemo(() => {
    if (view === "all") return books;
    if (view === "owned") return books.filter((b) => b.ownership.length > 0);
    if (view === "purchased") return books.filter((b) => (b.purchases?.length ?? 0) > 0);
    return books.filter((b) => b.status === view);
  }, [view, books]);

  // Filter by year, search, and tag
  const filteredBooks = useMemo(() => {
    return viewItems.filter((book) => {
      const yearMatch = year === "all" || String(book.year) === year;
      const tagMatch = !selectedTag || (book.tags ?? []).includes(selectedTag);
      const searchTarget = [book.title, book.author, ...(book.tags ?? [])]
        .join(" ")
        .toLowerCase();
      const queryMatch = !query || searchTarget.includes(query.toLowerCase());
      return yearMatch && tagMatch && queryMatch;
    });
  }, [viewItems, year, query, selectedTag]);

  // Get year list and counts
  const years = useMemo(() => {
    const yearSet = new Set(viewItems.map((b) => b.year).filter(Boolean));
    return Array.from(yearSet).sort((a, b) => b - a);
  }, [viewItems]);

  const yearCounts = useMemo(() => {
    const counts = new Map<number, number>();
    viewItems.forEach((b) => {
      if (b.year) counts.set(b.year, (counts.get(b.year) ?? 0) + 1);
    });
    return counts;
  }, [viewItems]);

  // Group books by year
  const bookGroups = useMemo(() => {
    const groups = new Map<number, Book[]>();
    filteredBooks.forEach((book) => {
      const list = groups.get(book.year) ?? [];
      list.push(book);
      groups.set(book.year, list);
    });
    return Array.from(groups.entries()).sort((a, b) => b[0] - a[0]);
  }, [filteredBooks]);

  // Selected book for inspector
  const selectedBook = useMemo(() => {
    if (!selectedId) return filteredBooks[0] ?? null;
    return filteredBooks.find((b) => b.id === selectedId) ?? filteredBooks[0] ?? null;
  }, [filteredBooks, selectedId]);

  // Auto-select first book when filtered list changes
  useEffect(() => {
    if (filteredBooks.length > 0 && !filteredBooks.find((b) => b.id === selectedId)) {
      setSelectedId(filteredBooks[0].id);
    }
  }, [filteredBooks, selectedId]);

  const viewTabs: [ViewMode, string][] = [
    ["all", "全部"],
    ["read", "读过"],
    ["reading", "在读"],
    ["wishlist", "想读"],
    ["owned", "已拥有"],
    ["purchased", "已购买"],
  ];

  if (!mounted) {
    return (
      <main className="app-shell">
        <div className="empty-state" style={{ marginTop: 80 }}>
          载入中...
        </div>
      </main>
    );
  }

  return (
    <main className="app-shell">
      {/* Topbar */}
      <Topbar
        theme={theme}
        onThemeChange={setTheme}
        query={query}
        onQueryChange={setQuery}
      />

      {/* View Tabs */}
      <div className="tabs" style={{ marginBottom: 14 }}>
        {viewTabs.map(([key, label]) => (
          <button
            key={key}
            type="button"
            className={`tab${view === key ? " is-active" : ""}`}
            onClick={() => setView(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Hero Manifesto */}
      <HeroManifesto quotes={MOCK_CONFIG.homeIntro.quotes} />

      {/* Stats Strip */}
      <StatsStrip books={books} purchaseStats={MOCK_PURCHASE_STATS} />

      {/* Workspace */}
      <section className="workspace">
        {/* Year List (sidebar) */}
        <YearList
          years={years}
          yearCounts={yearCounts}
          selectedYear={year}
          yearExpanded={yearExpanded}
          onYearChange={setYear}
          onToggleExpand={() => setYearExpanded((e) => !e)}
        />

        {/* Book List (main panel) */}
        <section className="ledger-panel">
          {/* Sync Status */}
          <div className="data-sync" id="dataSync">
            <div className="sync-copy">
              <strong>书籍数据已载入</strong>
              <span>已缓存到本地，下次打开会先显示缓存。</span>
            </div>
          </div>

          {/* Section Head */}
          <div className="section-head">
            <div>
              <h1>阅读记录</h1>
              <p className="section-label">大宁的阅读档案（beta）</p>
            </div>
            <p>共 {filteredBooks.length} 条记录</p>
          </div>

          {/* Book Groups */}
          {bookGroups.length > 0 ? (
            <div className="book-groups">
              {bookGroups.map(([groupYear, books]) => (
                <section key={groupYear} className="year-group">
                  <h2>{groupYear}</h2>
                  <div className="book-list">
                    {books.map((book) => (
                      <BookCard
                        key={book.id}
                        book={book}
                        isSelected={book.id === selectedId}
                        onSelect={setSelectedId}
                      />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <div className="empty-state">没有匹配的书籍记录。</div>
          )}
        </section>

        {/* Inspector Panel (sidebar) */}
        <InspectorPanel book={selectedBook ?? null} />
      </section>

      {/* Lower Grid: Tag Cloud + Recent Notes */}
      <div className="lower-grid">
        <TagCloud
          books={books}
          selectedTag={selectedTag}
          onTagSelect={setSelectedTag}
        />
        <RecentNotes books={books} />
      </div>
    </main>
  );
}