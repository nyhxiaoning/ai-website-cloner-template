import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI 微信表情包制作工具 | 在线生成聊天表情和微信上架素材 | 表情厨房",
  description:
    "在线生成 24 张微信表情包主图，自动切割后可直接下载聊天表情。支持 Q 版可爱、像素风、手绘涂鸦、3D 毛绒等多种风格，还可生成横幅、封面、图标等上架素材。",
  icons: {
    icon: [{ url: "/seo/favicon.ico", sizes: "64x64" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
