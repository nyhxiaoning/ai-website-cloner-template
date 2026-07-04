import Link from "next/link";

const badges = [
  "24 张表情自动生成",
  "自动切割 240×240",
  "聊天自用可直接下载",
];

export default function HeroSection() {
  return (
    <section className="mx-auto max-w-2xl text-center">
      <p className="mb-3 text-sm font-semibold text-amber-600">表情厨房</p>
      <h1 className="mb-3 text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl md:leading-tight">
        AI 微信表情包制作工具
      </h1>
      <p className="mx-auto mb-3 max-w-xl text-sm leading-relaxed text-gray-500">
        在线生成 24 张微信表情包主图，自动切割后可直接下载聊天表情。
        注册赠送 4 credits，可免费生成 1 次主图；横幅、封面、图标等上架素材需充值后按需生成。
      </p>

      <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
        {badges.map((badge) => (
          <span
            key={badge}
            className="inline-block rounded-full bg-white px-3 py-1 text-sm text-amber-700"
          >
            {badge}
          </span>
        ))}
      </div>

      <Link
        href="/guide"
        className="inline-block text-sm font-semibold text-amber-600 underline-offset-2 hover:underline"
      >
        先看案例教程 →
      </Link>
    </section>
  );
}
