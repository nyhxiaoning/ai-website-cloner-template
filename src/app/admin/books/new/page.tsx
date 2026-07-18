"use client";

import { useRouter } from "next/navigation";
import { addBook } from "@/lib/book-store";
import BookForm from "@/components/BookForm";
import type { Book } from "@/types";
import "./../../admin.css";

export default function NewBookPage() {
  const router = useRouter();

  const handleSave = (data: Omit<Book, "id">) => {
    addBook(data);
    router.push("/admin");
  };

  return (
    <section className="admin-section">
      <div className="section-head">
        <h2>新增图书</h2>
      </div>
      <BookForm
        onSave={handleSave}
        onCancel={() => router.push("/admin")}
      />
    </section>
  );
}