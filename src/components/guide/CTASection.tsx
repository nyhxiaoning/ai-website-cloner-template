import Link from "next/link";

export default function CTASection() {
  return (
    <section className="rounded-2xl bg-amber-500 p-8 text-center">
      <h2 className="mb-4 text-2xl font-bold text-white">
        看完了？现在做你的第一套
      </h2>
      <p className="mb-6 text-base text-white/80">
        建议先用 Q 版可爱风格打样，最容易出成品。
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="rounded-xl bg-white px-6 py-3 text-base font-bold text-amber-700 shadow-sm transition-colors duration-150 hover:bg-amber-50"
        >
          立即生成我的表情包
        </Link>
        <Link
          href="/#contact"
          className="rounded-xl border-2 border-white/40 px-6 py-3 text-base font-semibold text-white transition-colors duration-150 hover:border-white/60"
        >
          还有疑问，先联系我
        </Link>
      </div>
    </section>
  );
}
