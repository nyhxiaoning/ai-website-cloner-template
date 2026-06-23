import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "青色 - 中国传统颜色手册 | 中国色 | 中国古典颜色 | Chinese Color Cheat sheet",
  description:
    "全网最全的中国传统颜色数据库，包含600+国风色卡精准色值、命名由来与使用场景。一键获取CMYK/RGB/HEX色彩代码，提升设计效率与专业度。",
  icons: {
    icon: [
      { url: "/seo/favicon.ico" },
      { url: "/seo/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/seo/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/seo/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#00e09e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="antialiased">
      <body>{children}</body>
    </html>
  );
}
