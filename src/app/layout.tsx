import type { Metadata } from "next";
import "@/styles/themes.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "罗杰的阅读档案（beta）",
  description:
    "个人阅读档案用于记录读过、在读、想读、拥有和已购买的书籍，以及对应的阅读笔记。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}