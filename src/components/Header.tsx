"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "AI 制作" },
  { href: "/guide", label: "案例教程" },
  { href: "/#contact", label: "联系我" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-amber-200 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold text-gray-800"
        >
          <span>🍳</span>
          <span>表情厨房</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href.replace("/#", "/"));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-150 ${
                  isActive
                    ? "bg-amber-100 text-amber-800"
                    : "text-gray-600 hover:bg-amber-100"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button className="cursor-pointer rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white transition-colors duration-150 hover:bg-amber-600">
          登录
        </button>
      </div>
    </header>
  );
}
