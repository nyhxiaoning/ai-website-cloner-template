"use client";

import { type ThemeId, THEME_LABELS } from "@/types";

interface TopbarProps {
  theme: ThemeId;
  onThemeChange: (theme: ThemeId) => void;
  query: string;
  onQueryChange: (q: string) => void;
}

export default function Topbar({ theme, onThemeChange, query, onQueryChange }: TopbarProps) {
  return (
    <header className="topbar">
      <a href="/" className="brand">
        <span className="brand-mark">阅</span>
        <span>
          <strong>大宁的阅读档案</strong>
          <small>藏书、阅读与笔记</small>
        </span>
      </a>

      <label className="search-box">
        <span>检索</span>
        <input
          type="text"
          placeholder="书名、作者、标签..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
      </label>

      <label className="theme-field">
        <span>主题</span>
        <select value={theme} onChange={(e) => onThemeChange(e.target.value as ThemeId)}>
          {Object.entries(THEME_LABELS).map(([id, label]) => (
            <option key={id} value={id}>
              {label}
            </option>
          ))}
        </select>
      </label>

      <a href="/admin" className="tab" style={{ textDecoration: "none", textAlign: "center" }}>
        管理
      </a>
    </header>
  );
}