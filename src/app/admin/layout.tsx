"use client";

import { useEffect, useState } from "react";
import { THEME_LABELS, type ThemeId } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

const THEME_STORAGE_KEY = "books-ledger:theme";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeId>("github-light");
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
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

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const navItems = [
    { href: "/admin", label: "图书管理" },
    { href: "/admin/books/new", label: "新增图书" },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  if (!mounted) {
    return (
      <div className="app-shell">
        <div className="empty-state" style={{ marginTop: 80 }}>载入中...</div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      {/* Admin Topbar */}
      <header className="topbar">
        <Link href="/" className="brand">
          <span className="brand-mark">阅</span>
          <span>
            <strong>管理后台</strong>
            <small>图书与分类管理</small>
          </span>
        </Link>

        <div />

        <label className="theme-field">
          <span>主题</span>
          <select value={theme} onChange={(e) => setTheme(e.target.value as ThemeId)}>
            {Object.entries(THEME_LABELS).map(([id, label]) => (
              <option key={id} value={id}>{label}</option>
            ))}
          </select>
        </label>

        <Link href="/" className="tab" style={{ textDecoration: "none", textAlign: "center" }}>
          返回前台
        </Link>
      </header>

      {/* Admin Navigation */}
      <div className="tabs" style={{ marginBottom: 14 }}>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`tab${isActive(item.href) ? " is-active" : ""}`}
            style={{ textDecoration: "none" }}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {children}
    </div>
  );
}