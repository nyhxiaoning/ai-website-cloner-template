import type { Metadata } from "next";
import Header from "@/components/Header";
import ShowcaseSection from "@/components/guide/ShowcaseSection";
import TutorialSection from "@/components/guide/TutorialSection";
import DownloadGuideSection from "@/components/guide/DownloadGuideSection";
import PitfallsSection from "@/components/guide/PitfallsSection";
import CTASection from "@/components/guide/CTASection";
import ContactSection from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "微信表情包制作教程与上架案例 | 表情厨房",
  description:
    "从零做出可上架的微信表情包。先看上架案例，再跟着 4 步流程做自己的表情包。支持 Q 版可爱、像素风、手绘涂鸦、3D 毛绒等多种风格。",
};

export default function GuidePage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl space-y-16 px-4 pb-24 pt-16 text-gray-700">
        {/* Hero */}
        <section className="text-center">
          <h1 className="mb-3 text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl md:leading-tight">
            从零做出可上架的 微信表情包
          </h1>
          <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-gray-500 md:text-lg">
            先看别人做出来什么样，再跟着 4 步流程做自己的。注册赠送 4
            credits，可先免费做出一套聊天表情；要上架微信平台，再按需充值补齐素材。
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/"
              className="inline-block rounded-xl bg-amber-500 px-6 py-3 text-base font-bold text-white shadow transition-colors duration-150 hover:bg-amber-600"
            >
              立即开始制作
            </a>
            <a
              href="#steps"
              className="inline-block rounded-xl border-2 border-amber-200 px-6 py-3 text-base font-semibold text-amber-800 transition-colors duration-150 hover:border-amber-300"
            >
              先看教程
            </a>
          </div>
        </section>

        <ShowcaseSection />
        <TutorialSection />

        {/* Step anchor */}
        <div id="steps" />

        <DownloadGuideSection />
        <PitfallsSection />
        <CTASection />
        <ContactSection />
      </main>
    </>
  );
}
