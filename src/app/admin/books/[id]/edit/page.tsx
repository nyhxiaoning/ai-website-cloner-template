"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getBookById, updateBook } from "@/lib/book-store";
import BookForm from "@/components/BookForm";
import type { Book } from "@/types";
import "./../../../admin.css";

export default function EditBookPage() {
  const params = useParams();
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = params.id as string;
    const found = getBookById(id);
    if (found) {
      setBook(found);
    }
    setLoading(false);
  }, [params.id]);

  const handleSave = (data: Omit<Book, "id">) => {
    if (!book) return;
    updateBook(book.id, data);
    router.push("/admin");
  };

  if (loading) {
    return (
      <section className="admin-section">
        <div className="empty-state">载入中...</div>
      </section>
    );
  }

  if (!book) {
    return (
      <section className="admin-section">
        <div className="empty-state">
          未找到该图书。
          <br />
          <button
            type="button"
            className="btn"
            style={{ marginTop: 12 }}
            onClick={() => router.push("/admin")}
          >
            返回管理后台
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="admin-section">
      <div className="section-head">
        <h2>编辑图书</h2>
      </div>
      <BookForm
        initial={book}
        onSave={handleSave}
        onCancel={() => router.push("/admin")}
      />
    </section>
  );
}