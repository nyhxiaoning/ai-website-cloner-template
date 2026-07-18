"use client";

import type { Book } from "@/types";

interface RecentNotesProps {
  books: Book[];
}

export default function RecentNotes({ books }: RecentNotesProps) {
  const withNotes = books
    .filter((b) => b.notesReady && b.blogUrl)
    .slice(0, 10);

  return (
    <section className="index-panel">
      <div className="section-head">
        <h2>最近归档</h2>
      </div>
      {withNotes.length > 0 ? (
        <div className="recent-list">
          {withNotes.map((book) => (
            <a
              key={book.id}
              href={book.blogUrl!}
              target="_blank"
              rel="noreferrer"
            >
              <span>📝</span>
              {book.title}
            </a>
          ))}
        </div>
      ) : (
        <div className="empty-state">笔记整理中，敬请期待。</div>
      )}
    </section>
  );
}