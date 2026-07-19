"use client";

import { useState, useEffect, useCallback } from "react";
import { getBooks, deleteBook, saveBooks, getAllTags, renameTag, deleteTag, clearCache } from "@/lib/book-store";
import { getGitHubConfig, pushToGitHub, pullFromGitHub } from "@/lib/github-sync";
import { VIEW_LABELS, type Book } from "@/types";
import Link from "next/link";
import GitHubSyncModal from "@/components/GitHubSyncModal";
import "./admin.css";

export default function AdminPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [tags, setTags] = useState<{ tag: string; count: number }[]>([]);
  const [mounted, setMounted] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Book | null>(null);
  const [renameTarget, setRenameTarget] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [newTag, setNewTag] = useState("");
  const [search, setSearch] = useState("");
  const [syncModalOpen, setSyncModalOpen] = useState(false);
  const [syncing, setSyncing] = useState<"pull" | "push" | null>(null);
  const [syncMessage, setSyncMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const refresh = useCallback(() => {
    const b = getBooks();
    setBooks(b);
    setTags(getAllTags());
  }, []);

  useEffect(() => {
    refresh();
    setMounted(true);
  }, [refresh]);

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteBook(deleteTarget.id);
    setDeleteTarget(null);
    refresh();
  };

  const handleRename = (oldTag: string) => {
    if (!renameValue.trim() || renameValue.trim() === oldTag) {
      setRenameTarget(null);
      return;
    }
    renameTag(oldTag, renameValue.trim());
    setRenameTarget(null);
    setRenameValue("");
    refresh();
  };

  const handleDeleteTag = (tag: string) => {
    deleteTag(tag);
    refresh();
  };

  const handleAddTag = () => {
    if (!newTag.trim()) return;
    const tag = newTag.trim();
    setNewTag("");
    refresh();
  };

  const handlePull = async () => {
    const config = getGitHubConfig();
    if (!config) {
      setSyncMessage({ text: "请先配置 GitHub 同步", type: "error" });
      return;
    }
    setSyncing("pull");
    setSyncMessage(null);
    try {
      const data = await pullFromGitHub(config);
      const books = Array.isArray(data) ? data : (data as { books?: Book[] }).books ?? [];
      if (Array.isArray(books) && books.length > 0) {
        saveBooks(books);
        clearCache();
        refresh();
        setSyncMessage({ text: `成功从 GitHub 拉取 ${books.length} 本书`, type: "success" });
      } else {
        setSyncMessage({ text: "GitHub 数据格式无效", type: "error" });
      }
    } catch (e) {
      setSyncMessage({ text: `拉取失败: ${e instanceof Error ? e.message : "未知错误"}`, type: "error" });
    } finally {
      setSyncing(null);
    }
  };

  const handlePush = async () => {
    const config = getGitHubConfig();
    if (!config) {
      setSyncMessage({ text: "请先配置 GitHub 同步", type: "error" });
      return;
    }
    setSyncing("push");
    setSyncMessage(null);
    try {
      const books = getBooks();
      await pushToGitHub(books, config);
      setSyncMessage({ text: `成功推送 ${books.length} 本书到 GitHub`, type: "success" });
    } catch (e) {
      setSyncMessage({ text: `推送失败: ${e instanceof Error ? e.message : "未知错误"}`, type: "error" });
    } finally {
      setSyncing(null);
    }
  };

  const filteredBooks = search
    ? books.filter(
        (b) =>
          b.title.toLowerCase().includes(search.toLowerCase()) ||
          b.author.toLowerCase().includes(search.toLowerCase())
      )
    : books;

  if (!mounted) {
    return (
      <div className="admin-page">
        <div className="empty-state">载入中...</div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      {/* Book Management Section */}
      <section className="admin-section">
        <div className="section-head">
          <h2>图书管理</h2>
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => setSyncModalOpen(true)}
            >
              GitHub 配置
            </button>
            <button
              type="button"
              className="btn btn-sm"
              onClick={handlePull}
              disabled={syncing !== null}
            >
              {syncing === "pull" ? "拉取中..." : "拉取"}
            </button>
            <button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={handlePush}
              disabled={syncing !== null}
            >
              {syncing === "push" ? "推送中..." : "推送"}
            </button>
            <input
              type="text"
              className="form-input"
              style={{ width: 200, padding: "6px 10px", fontSize: 13 }}
              placeholder="搜索图书..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Link href="/admin/books/new" className="btn btn-primary">
              新增图书
            </Link>
          </div>
        </div>

        {filteredBooks.length > 0 ? (
          <div style={{ overflowX: "auto" }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>书名</th>
                  <th>作者</th>
                  <th>状态</th>
                  <th>年份</th>
                  <th>标签</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.map((book) => (
                  <tr key={book.id}>
                    <td className="book-title-cell">{book.title}</td>
                    <td className="book-author-cell">{book.author}</td>
                    <td>
                      <span className="tag-chip">{VIEW_LABELS[book.status]}</span>
                    </td>
                    <td>{book.year}</td>
                    <td className="tag-cell">
                      {book.tags?.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </td>
                    <td>
                      <div className="admin-actions">
                        <Link
                          href={`/admin/books/${book.id}/edit`}
                          className="btn btn-sm"
                        >
                          编辑
                        </Link>
                        <button
                          type="button"
                          className="btn btn-sm btn-danger"
                          onClick={() => setDeleteTarget(book)}
                        >
                          删除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            {search ? "没有匹配的图书。" : "还没有图书，点击上方按钮新增。"}
          </div>
        )}
      </section>

      {/* Category Management Section */}
      <section className="admin-section">
        <div className="section-head">
          <h2>分类管理</h2>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input
              type="text"
              className="form-input"
              style={{ width: 160, padding: "6px 10px", fontSize: 13 }}
              placeholder="新标签名..."
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddTag();
              }}
            />
            <button type="button" className="btn btn-sm btn-primary" onClick={handleAddTag}>
              新增
            </button>
          </div>
        </div>

        {tags.length > 0 ? (
          <div className="category-list">
            {tags.map(({ tag, count }) => (
              <div key={tag} className="category-item">
                {renameTarget === tag ? (
                  <div className="tag-name">
                    <input
                      type="text"
                      className="rename-input"
                      value={renameValue}
                      onChange={(e) => setRenameValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleRename(tag);
                        if (e.key === "Escape") setRenameTarget(null);
                      }}
                      autoFocus
                    />
                    <button
                      type="button"
                      className="btn btn-sm"
                      onClick={() => handleRename(tag)}
                    >
                      确认
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm"
                      onClick={() => setRenameTarget(null)}
                    >
                      取消
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="tag-name">
                      <span>{tag}</span>
                      <span className="tag-count">{count} 本书</span>
                    </div>
                    <div className="category-actions">
                      <button
                        type="button"
                        className="btn btn-sm"
                        onClick={() => {
                          setRenameTarget(tag);
                          setRenameValue(tag);
                        }}
                      >
                        重命名
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteTag(tag)}
                      >
                        删除
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">暂无分类标签。</div>
        )}
      </section>

      {/* Delete Confirmation Dialog */}
      {deleteTarget && (
        <div className="dialog-overlay" onClick={() => setDeleteTarget(null)}>
          <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
            <h3>确认删除</h3>
            <p>
              确定要删除《{deleteTarget.title}》吗？此操作不可撤销。
            </p>
            <div className="dialog-actions">
              <button
                type="button"
                className="btn"
                onClick={() => setDeleteTarget(null)}
              >
                取消
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDelete}
              >
                确认删除
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sync Message Toast */}
      {syncMessage && (
        <div
          className="sync-toast"
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 200,
            padding: "12px 18px",
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 600,
            background: syncMessage.type === "success" ? "var(--green-soft)" : "var(--red-soft)",
            color: syncMessage.type === "success" ? "var(--green)" : "var(--red)",
            border: `1px solid ${syncMessage.type === "success" ? "var(--secondary-border)" : "var(--danger-border)"}`,
            boxShadow: "var(--shadow)",
            maxWidth: 360,
            cursor: "pointer",
          }}
          onClick={() => setSyncMessage(null)}
        >
          {syncMessage.text}
        </div>
      )}

      {/* GitHub Sync Modal */}
      <GitHubSyncModal
        open={syncModalOpen}
        onClose={() => setSyncModalOpen(false)}
        onSaved={() => {
          setSyncMessage({ text: "GitHub 配置已保存", type: "success" });
        }}
      />
    </div>
  );
}