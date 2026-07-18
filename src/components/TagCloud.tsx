"use client";

import type { Book } from "@/types";

interface TagCloudProps {
  books: Book[];
  selectedTag: string | null;
  onTagSelect: (tag: string | null) => void;
}

export default function TagCloud({ books, selectedTag, onTagSelect }: TagCloudProps) {
  const tagCounts = new Map<string, number>();
  books.forEach((book) => {
    (book.tags ?? []).forEach((tag) => {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    });
  });

  const sortedTags = Array.from(tagCounts.entries()).sort((a, b) => b[1] - a[1]);

  return (
    <section className="index-panel">
      <div className="section-head">
        <h2>主题索引</h2>
      </div>
      <div className="tag-cloud">
        {sortedTags.map(([tag, count]) => (
          <button
            key={tag}
            type="button"
            className={`tag-filter${selectedTag === tag ? " is-active" : ""}`}
            onClick={() => onTagSelect(selectedTag === tag ? null : tag)}
          >
            <span>{tag}</span>
            <strong>{count}</strong>
          </button>
        ))}
      </div>
    </section>
  );
}