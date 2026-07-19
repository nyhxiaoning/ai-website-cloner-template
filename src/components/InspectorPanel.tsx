"use client";

import type { Book } from "@/types";
import { OWNERSHIP_LABELS, VIEW_LABELS } from "@/types";

interface InspectorPanelProps {
  book: Book | null;
}

export default function InspectorPanel({ book }: InspectorPanelProps) {
  if (!book) {
    return (
      <aside className="inspector-panel">
        <div className="empty-state">选择一本书查看详情。</div>
      </aside>
    );
  }

  const tags = book.tags ?? [];
  const ownership = book.ownership.map((o) => OWNERSHIP_LABELS[o]).join("、");

  return (
    <aside className="inspector-panel" id="inspectorPanel">
      <img
        className="inspector-cover"
        src={book.cover ?? "/covers/placeholder.svg"}
        alt={`${book.title} 封面`}
      />

      <h2>{book.title}</h2>
      <p>{book.author}</p>

      <dl>
        <div>
          <dt>状态</dt>
          <dd>{VIEW_LABELS[book.status]}</dd>
        </div>
        {ownership && (
          <div>
            <dt>拥有</dt>
            <dd>{ownership}</dd>
          </div>
        )}
        {book.year && (
          <div>
            <dt>阅读年份</dt>
            <dd>{book.year}</dd>
          </div>
        )}
        <div>
          <dt>预计阅读时长</dt>
          <dd>{book.estimatedReadingTime != null ? `${book.estimatedReadingTime} 小时` : "暂无"}</dd>
        </div>
        <div>
          <dt>完成阅读时长</dt>
          <dd>{book.completedReadingTime != null ? `${book.completedReadingTime} 小时` : "暂无"}</dd>
        </div>
      </dl>

      {tags.length > 0 && (
        <div className="tag-row">
          {tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      )}

      {book.notesReady && book.blogUrl ? (
        <a
          className="note-link"
          href={book.blogUrl}
          target="_blank"
          rel="noreferrer"
        >
          查看阅读笔记
        </a>
      ) : (
        <span className="note-link disabled">
          {book.notesReady ? "暂无笔记链接" : "笔记整理中"}
        </span>
      )}
    </aside>
  );
}