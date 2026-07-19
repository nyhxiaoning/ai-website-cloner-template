"use client";

import { useState, useEffect } from "react";
import { type GitHubConfig, getGitHubConfig, saveGitHubConfig, clearGitHubConfig, getSyncStatus } from "@/lib/github-sync";

interface GitHubSyncModalProps {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export default function GitHubSyncModal({ open, onClose, onSaved }: GitHubSyncModalProps) {
  const [form, setForm] = useState<GitHubConfig>({ owner: "", repo: "", path: "", token: "" });
  const [showToken, setShowToken] = useState(false);
  const [hasConfig, setHasConfig] = useState(false);
  const [lastSyncedAt, setLastSyncedAt] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setShowToken(false);
    const config = getGitHubConfig();
    const status = getSyncStatus();
    if (config) {
      setForm({ ...config, token: "" });
      setHasConfig(true);
    } else {
      setForm({ owner: "", repo: "", path: "data/books.json", token: "" });
      setHasConfig(false);
    }
    setLastSyncedAt(status?.lastSyncedAt ?? "");
  }, [open]);

  const handleSave = async () => {
    if (!form.owner || !form.repo || !form.path || !form.token) {
      return;
    }
    setSaving(true);
    try {
      saveGitHubConfig(form);
      onSaved();
      onClose();
    } finally {
      setSaving(false);
    }
  };

  const handleClear = () => {
    clearGitHubConfig();
    setForm({ owner: "", repo: "", path: "data/books.json", token: "" });
    setHasConfig(false);
    setLastSyncedAt("");
    onClose();
  };

  const fmtDate = (s: string) => {
    if (!s) return "";
    try {
      return new Date(s).toLocaleString("zh-CN");
    } catch {
      return s;
    }
  };

  const updateField = (field: keyof GitHubConfig, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  if (!open) return null;

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="github-sync-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="gs-head">
          <div className="gs-head-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
          </div>
          <div className="gs-head-copy">
            <div className="gs-title">GitHub 同步</div>
            <div className="gs-sub">配置后可将项目数据推送/拉取到 GitHub 仓库</div>
          </div>
          <button className="btn btn-icon" onClick={onClose} style={{ flexShrink: 0, marginLeft: "auto" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Sync Status Banner */}
        {lastSyncedAt && (
          <div className="gs-banner">
            <div className="gs-banner-dot" />
            <div className="gs-banner-copy">
              <span className="gs-banner-title">已配置同步</span>
              <span className="gs-banner-sub">上次同步: {fmtDate(lastSyncedAt)}</span>
            </div>
            <button
              type="button"
              className="btn btn-sm btn-danger"
              onClick={handleClear}
            >
              解除
            </button>
          </div>
        )}

        {/* Form Body */}
        <div className="gs-body">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            {/* Repository Section */}
            <div className="gs-section">
              <div className="gs-section-head">
                <span className="gs-section-icon">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                  </svg>
                </span>
                <span className="gs-section-label">仓库信息</span>
              </div>
              <div className="gs-field-row">
                <label className="gs-field" style={{ flex: 1.2 }}>
                  <span className="gs-field-label">用户名</span>
                  <input
                    className="form-input"
                    value={form.owner}
                    onChange={(e) => updateField("owner", e.target.value)}
                    placeholder="如 nyhxiaoning"
                  />
                </label>
                <label className="gs-field" style={{ flex: 1.8 }}>
                  <span className="gs-field-label">仓库名</span>
                  <input
                    className="form-input"
                    value={form.repo}
                    onChange={(e) => updateField("repo", e.target.value)}
                    placeholder="如 book-data-backup"
                  />
                </label>
              </div>
              <label className="gs-field">
                <span className="gs-field-label">文件路径</span>
                <input
                  className="form-input"
                  value={form.path}
                  onChange={(e) => updateField("path", e.target.value)}
                  placeholder="如 data/books.json"
                />
                <span className="gs-field-hint">数据存储路径，建议按项目命名</span>
              </label>
            </div>

            {/* Token Section */}
            <div className="gs-section">
              <div className="gs-section-head">
                <span className="gs-section-icon">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <span className="gs-section-label">认证</span>
              </div>
              <label className="gs-field">
                <span className="gs-field-label">Personal Access Token</span>
                <div className="gs-token-row">
                  <input
                    type={showToken ? "text" : "password"}
                    className="form-input"
                    value={form.token}
                    onChange={(e) => updateField("token", e.target.value)}
                    placeholder="ghp_..."
                    style={{ flex: 1 }}
                  />
                  <button
                    type="button"
                    className="gs-token-toggle"
                    onClick={() => setShowToken(!showToken)}
                    title={showToken ? "隐藏" : "显示"}
                  >
                    {showToken ? (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
                <span className="gs-field-hint">
                  需要 <code>repo</code> 权限。{" "}
                  <a
                    href="https://github.com/settings/tokens"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gs-link"
                  >
                    创建 Token →
                  </a>
                </span>
              </label>
            </div>

            {/* Actions */}
            <div className="gs-actions">
              <div className="gs-actions-left">
                {hasConfig && (
                  <button type="button" className="btn btn-sm btn-danger" onClick={handleClear}>
                    解除同步
                  </button>
                )}
              </div>
              <button type="button" className="btn" onClick={onClose}>取消</button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={saving || !form.owner || !form.repo || !form.path || !form.token}
              >
                {saving ? "保存中..." : "保存配置"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}