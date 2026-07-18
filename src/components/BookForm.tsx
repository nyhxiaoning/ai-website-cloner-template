"use client";

import { useState, useRef, KeyboardEvent } from "react";
import type { Book } from "@/types";
import { getAllTags } from "@/lib/book-store";

interface BookFormProps {
  initial?: Book;
  onSave: (data: Omit<Book, "id">) => void;
  onCancel: () => void;
}

export default function BookForm({ initial, onSave, onCancel }: BookFormProps) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [author, setAuthor] = useState(initial?.author ?? "");
  const [status, setStatus] = useState(initial?.status ?? "read");
  const [year, setYear] = useState(String(initial?.year ?? new Date().getFullYear()));
  const [tags, setTags] = useState<string[]>(initial?.tags ?? []);
  const [ownership, setOwnership] = useState<string[]>(initial?.ownership ?? []);
  const [summary, setSummary] = useState(initial?.summary ?? "");
  const [cover, setCover] = useState(initial?.cover ?? "");
  const [blogUrl, setBlogUrl] = useState(initial?.blogUrl ?? "");
  const [notesReady, setNotesReady] = useState(initial?.notesReady ?? false);
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const tagInputRef = useRef<HTMLInputElement>(null);

  const existingTags = getAllTags().map((t) => t.tag);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!title.trim()) errs.title = "书名不能为空";
    if (!author.trim()) errs.author = "作者不能为空";
    const y = parseInt(year, 10);
    if (isNaN(y) || y < 1000 || y > 2100) errs.year = "请输入有效年份";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSave({
      title: title.trim(),
      author: author.trim(),
      status: status as Book["status"],
      year: parseInt(year, 10),
      tags,
      ownership: ownership as Book["ownership"],
      summary: summary.trim(),
      cover: cover.trim() || undefined,
      blogUrl: blogUrl.trim() || undefined,
      notesReady,
    });
  };

  const addTag = (tag: string) => {
    const t = tag.trim();
    if (t && !tags.includes(t)) {
      setTags([...tags, t]);
    }
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(tagInput);
    } else if (e.key === "Backspace" && !tagInput && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    }
  };

  const handleTagSuggestionClick = (tag: string) => {
    addTag(tag);
  };

  const toggleOwnership = (type: string) => {
    setOwnership((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const fieldClass = (field: string) =>
    `form-input${errors[field] ? "" : ""}`;

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label className="required">书名</label>
          <input
            type="text"
            className={fieldClass("title")}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="输入书名"
            style={errors.title ? { borderColor: "var(--red)" } : undefined}
          />
          {errors.title && <p className="form-error">{errors.title}</p>}
        </div>
        <div className="form-group">
          <label className="required">作者</label>
          <input
            type="text"
            className={fieldClass("author")}
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="输入作者"
            style={errors.author ? { borderColor: "var(--red)" } : undefined}
          />
          {errors.author && <p className="form-error">{errors.author}</p>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>状态</label>
          <select
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value as Book["status"])}
          >
            <option value="read">读过</option>
            <option value="reading">在读</option>
            <option value="wishlist">想读</option>
          </select>
        </div>
        <div className="form-group">
          <label className="required">阅读年份</label>
          <input
            type="number"
            className={fieldClass("year")}
            value={year}
            onChange={(e) => setYear(e.target.value)}
            min={1000}
            max={2100}
            style={errors.year ? { borderColor: "var(--red)" } : undefined}
          />
          {errors.year && <p className="form-error">{errors.year}</p>}
        </div>
      </div>

      <div className="form-group">
        <label>拥有方式</label>
        <div className="form-checkboxes">
          <label>
            <input
              type="checkbox"
              checked={ownership.includes("physical")}
              onChange={() => toggleOwnership("physical")}
            />
            实体书
          </label>
          <label>
            <input
              type="checkbox"
              checked={ownership.includes("ebook")}
              onChange={() => toggleOwnership("ebook")}
            />
            电子书
          </label>
        </div>
      </div>

      <div className="form-group">
        <label>标签</label>
        <div className="tag-input-wrapper" onClick={() => tagInputRef.current?.focus()}>
          {tags.map((tag) => (
            <span key={tag} className="tag-chip">
              {tag}
              <button type="button" onClick={() => removeTag(tag)}>
                &times;
              </button>
            </span>
          ))}
          <input
            ref={tagInputRef}
            type="text"
            className="tag-input-inner"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            placeholder={tags.length === 0 ? "输入标签后按回车" : ""}
            list="tag-suggestions"
          />
          <datalist id="tag-suggestions">
            {existingTags
              .filter((t) => !tags.includes(t))
              .map((t) => (
                <option key={t} value={t} />
              ))}
          </datalist>
        </div>
        {existingTags.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 6 }}>
            {existingTags
              .filter((t) => !tags.includes(t))
              .slice(0, 10)
              .map((t) => (
                <button
                  key={t}
                  type="button"
                  className="tag-chip"
                  style={{ cursor: "pointer", background: "transparent" }}
                  onClick={() => handleTagSuggestionClick(t)}
                >
                  + {t}
                </button>
              ))}
          </div>
        )}
      </div>

      <div className="form-group">
        <label>简介</label>
        <textarea
          className="form-textarea"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="输入书籍简介..."
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>封面 URL</label>
          <input
            type="url"
            className="form-input"
            value={cover}
            onChange={(e) => setCover(e.target.value)}
            placeholder="https://..."
          />
          {cover && (
            <img
              src={cover}
              alt="封面预览"
              style={{
                width: 60,
                height: 80,
                objectFit: "cover",
                borderRadius: 6,
                marginTop: 8,
                border: "1px solid var(--line)",
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          )}
        </div>
        <div className="form-group">
          <label>笔记 URL</label>
          <input
            type="url"
            className="form-input"
            value={blogUrl}
            onChange={(e) => setBlogUrl(e.target.value)}
            placeholder="https://..."
          />
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginTop: 8,
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={notesReady}
              onChange={(e) => setNotesReady(e.target.checked)}
            />
            笔记已就绪
          </label>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {initial ? "保存修改" : "创建图书"}
        </button>
        <button type="button" className="btn" onClick={onCancel}>
          取消
        </button>
      </div>
    </form>
  );
}