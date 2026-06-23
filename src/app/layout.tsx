import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "西游记81难 - 西游记取经路线图",
  description:
    "探索西游记师徒四人的完整取经路线！互动式地图展示九九八十一难的详细故事，包含时间轴视图、角色介绍和经典场景。适合学生学习和文学爱好者研究使用。",
  icons: {
    icon: [
      { url: "/seo/favicon.ico", sizes: "any" },
      { url: "/seo/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/seo/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/seo/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "西游记81难 - 西游记取经路线图",
    description:
      "探索西游记师徒四人的完整取经路线！互动式地图展示九九八十一难的详细故事",
    images: ["/seo/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        />
      </head>
      <body className="min-h-full flex flex-col" style={{ fontFamily: '"Microsoft YaHei", sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
