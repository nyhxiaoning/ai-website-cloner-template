"use client";

import type { Book } from "@/types";
import { OWNERSHIP_LABELS, VIEW_LABELS } from "@/types";

interface BookCardProps {
  book: Book;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export default function BookCard({ book, isSelected, onSelect }: BookCardProps) {
  const ownership = book.ownership.map((o) => OWNERSHIP_LABELS[o]).join("、");
  const statusLabel = VIEW_LABELS[book.status];

  return (
    <article
      className={`book-card${isSelected ? " is-selected" : ""}`}
      data-book-id={book.id}
      onClick={() => onSelect(book.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(book.id);
        }
      }}
      tabIndex={0}
      role="button"
      aria-pressed={isSelected}
    >
      <img
        src={book.cover ?? "/covers/placeholder.svg"}
        alt={`${book.title} 封面`}
        loading="lazy"
      />
      <div>
        <div className="book-title-row">
          <h3>{book.title}</h3>
          <div className="book-badges">
            <span>{statusLabel}</span>
          </div>
        </div>
        <p className="book-author">{book.author}</p>
        <p className="summary">
          {book.summary?.trim() ? book.summary : "暂无评价"}
        </p>
        {ownership && (
          <div className="ownership-row">
            <span>{ownership}</span>
          </div>
        )}
        <div className="mobile-card-detail">
          {book.notesReady && book.blogUrl ? (
            <a
              className="note-link"
              href={book.blogUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              查看阅读笔记
            </a>
          ) : (
            <span className="note-link disabled">
              {book.notesReady ? "暂无笔记链接" : "笔记整理中"}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}