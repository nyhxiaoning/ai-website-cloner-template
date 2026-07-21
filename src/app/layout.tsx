import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "华夏迹 · 山河有迹，文明有声",
  description:
    "华夏迹——在地图上发现中国的自然名胜与人文古迹。覆盖全国省市下钻、精选景点与国家 A 级景区，支持收藏与足迹。",
  icons: {
    icon: [
      { url: "/seo/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/seo/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full bg-[#faf8f4] text-[#25221e] font-sans">
        {children}
      </body>
    </html>
  );
}