import type { Book } from "@/types";
import { MOCK_BOOKS } from "@/data/mock-data";

const STORAGE_KEY = "books-ledger:admin-books";

let cached: Book[] | null = null;

function generateId(): string {
  return crypto.randomUUID?.() ?? Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export function getBooks(): Book[] {
  if (cached) return cached;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Book[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        cached = parsed;
        return parsed;
      }
    }
  } catch {
    // ignore parse errors
  }
  // fallback to mock data
  cached = [...MOCK_BOOKS];
  saveBooks(cached);
  return cached;
}

export function saveBooks(books: Book[]): void {
  cached = books;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  } catch {
    // storage full or unavailable
  }
}

export function addBook(book: Omit<Book, "id">): Book {
  const newBook: Book = { ...book, id: generateId() };
  const books = getBooks();
  books.unshift(newBook);
  saveBooks(books);
  return newBook;
}

export function updateBook(id: string, updates: Partial<Book>): Book | null {
  const books = getBooks();
  const idx = books.findIndex((b) => b.id === id);
  if (idx === -1) return null;
  books[idx] = { ...books[idx], ...updates, id };
  saveBooks(books);
  return books[idx];
}

export function deleteBook(id: string): boolean {
  const books = getBooks();
  const idx = books.findIndex((b) => b.id === id);
  if (idx === -1) return false;
  books.splice(idx, 1);
  saveBooks(books);
  return true;
}

export function getBookById(id: string): Book | undefined {
  return getBooks().find((b) => b.id === id);
}

export function getAllTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  getBooks().forEach((book) => {
    (book.tags ?? []).forEach((tag) => {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    });
  });
  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag, "zh-CN"));
}

export function renameTag(oldTag: string, newTag: string): void {
  if (!oldTag || !newTag || oldTag === newTag) return;
  const books = getBooks();
  books.forEach((book) => {
    if (book.tags?.includes(oldTag)) {
      book.tags = book.tags.map((t) => (t === oldTag ? newTag : t));
    }
  });
  saveBooks(books);
}

export function deleteTag(tag: string): void {
  if (!tag) return;
  const books = getBooks();
  books.forEach((book) => {
    if (book.tags?.includes(tag)) {
      book.tags = book.tags.filter((t) => t !== tag);
    }
  });
  saveBooks(books);
}

export function addTag(bookId: string, tag: string): void {
  if (!tag) return;
  const book = getBookById(bookId);
  if (!book) return;
  if (!book.tags.includes(tag)) {
    book.tags = [...book.tags, tag];
    updateBook(bookId, { tags: book.tags });
  }
}

export function clearCache(): void {
  cached = null;
}