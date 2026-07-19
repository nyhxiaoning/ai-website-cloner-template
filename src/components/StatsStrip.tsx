"use client";

import type { Book, PurchaseStats } from "@/types";
import { VIEW_LABELS, OWNERSHIP_LABELS } from "@/types";

interface StatsStripProps {
  books: Book[];
  purchaseStats: PurchaseStats;
}

export default function StatsStrip({ books, purchaseStats }: StatsStripProps) {
  const totalEstimated = books.reduce(
    (sum, b) => sum + (b.estimatedReadingTime ?? 0),
    0
  );
  const totalCompleted = books.reduce(
    (sum, b) => sum + (b.completedReadingTime ?? 0),
    0
  );

  const stats = [
    [VIEW_LABELS.read, books.filter((b) => b.status === "read").length],
    [VIEW_LABELS.reading, books.filter((b) => b.status === "reading").length],
    [VIEW_LABELS.wishlist, books.filter((b) => b.status === "wishlist").length],
    [OWNERSHIP_LABELS.physical, books.filter((b) => b.ownership.includes("physical")).length],
    [OWNERSHIP_LABELS.ebook, books.filter((b) => b.ownership.includes("ebook")).length],
    [VIEW_LABELS.purchased, purchaseStats.count],
    ["花费", `¥${Math.trunc(purchaseStats.totalPrice)}`, "is-spend"],
    ["预计阅读", `${totalEstimated}h`, "is-reading-time"],
    ["完成阅读", `${totalCompleted}h`, "is-reading-time"],
  ] as [string, string | number, string?][];

  return (
    <section className="stats-strip" id="statsStrip">
      {stats.map(([label, value, className]) => (
        <article key={String(label)} className={className ?? ""}>
          <span>{label}</span>
          <strong>{value}</strong>
        </article>
      ))}
    </section>
  );
}