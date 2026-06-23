import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "诗云 · Poetry Cloud",
  description: "一张可漫游的三维星图：真实诗人是星团，星团之间的虚空是一切可能的诗。",
  metadataBase: new URL("https://shiyun.cohenjikan.com"),
  icons: {
    icon: "/seo/favicon.png",
    apple: "/seo/favicon.png",
  },
  openGraph: {
    type: "website",
    siteName: "诗云 · Poetry Cloud",
    title: "诗云 · Poetry Cloud — 一切可能的诗",
    description:
      "可漫游的三维星图：32,657 位真实诗人是星团，星团之间的虚空是一切可能的诗。点击虚空，捞起其中一首。",
    images: "/seo/og.jpg",
  },
  twitter: {
    card: "summary_large_image",
    title: "诗云 · Poetry Cloud — 一切可能的诗",
    description: "可漫游的三维星图：真实诗人是星团，虚空是一切可能的诗。",
    images: "/seo/og.jpg",
  },
};

export const viewport: Viewport = {
  themeColor: "#07080f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" style={{ "--hud-h": "65px" } as React.CSSProperties} className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
