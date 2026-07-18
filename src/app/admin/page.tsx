"use client";

import { useState, useEffect, useCallback } from "react";
import { getBooks, deleteBook, saveBooks, getAllTags, renameTag, deleteTag } from "@/lib/book-store";
import { VIEW_LABELS, OWNERSHIP_LABELS, type Book } from "@/types";
import Link from "next/link";
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
    // Add a placeholder book so the tag appears in the system
    const tag = newTag.trim();
    // Check if tag already exists
    const exists = tags.some((t) => t.tag === tag);
    if (!exists) {
      // Tag will appear when a book uses it
    }
    setNewTag("");
    refresh();
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
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
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
    </div>
  );
}