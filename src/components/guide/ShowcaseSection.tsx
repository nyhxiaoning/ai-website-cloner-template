import Image from "next/image";

const showcaseData = [
  {
    title: "捌哥的上班日常",
    tags: ["Q版可爱 · 职场主题", "含参考图"],
    image: "/images/guide-demo1.jpg",
    description:
      "基于一张半身照生成的职场表情包，蓝色工装还原度高，表情动作贴合打工人日常。",
    tip: "💡 上传参考图时选一张五官清晰的正面或半身照，AI 还原效果最好。",
    prototypeUrl: "/images/demo1_prototype.png",
  },
  {
    title: "阿升的恋爱日常",
    tags: ["Q版可爱 · 情侣主题", "含参考图"],
    image: "/images/guide-demo2.jpg",
    description:
      "用一张骑摩托车的照片生成情侣表情包，橙色小摩托贯穿全套，辨识度很高。",
    tip: "💡 照片里有标志性道具（车、帽子、宠物等），生成时会自动融入表情，让整套更有记忆点。",
    prototypeUrl: "/images/demo2_prototype.png",
  },
  {
    title: "男人妹日常",
    tags: ["Q版可爱 · 女生日常"],
    image: "/images/guide-demo3.jpg",
    description:
      "贝雷帽女生形象，覆盖问候、恋爱、吃瓜、摸鱼等场景，表情丰富，适合日常聊天高频使用。",
    tip: "💡 主题选多个可以让表情覆盖更多场景，日常使用频率更高。",
  },
];

export default function ShowcaseSection() {
  return (
    <section>
      <p className="mb-3 text-sm font-semibold text-amber-600">上架案例</p>
      <h2 className="mb-8 text-2xl font-bold text-gray-900 md:text-3xl">
        这些表情包都是用表情厨房做的
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {showcaseData.map((card) => (
          <article
            key={card.title}
            className="overflow-hidden rounded-xl border border-gray-100 bg-white"
          >
            <div className="relative">
              <Image
                src={card.image}
                alt={`${card.title}——微信表情包成品`}
                width={355}
                height={480}
                className="w-full object-cover"
              />
              <span className="absolute right-2 top-2 rounded-full bg-green-500 px-2 py-0.5 text-xs font-medium text-white">
                已上架
              </span>
            </div>
            <div className="p-4">
              <div className="mb-2 flex flex-wrap gap-2">
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      tag === "含参考图"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="mb-2 text-base font-semibold text-gray-800">
                {card.title}
              </h3>
              <p className="mb-2 text-sm leading-relaxed text-gray-500">
                {card.description}
              </p>
              <p className="mb-3 text-sm leading-relaxed text-gray-500">
                {card.tip}
              </p>
              {card.prototypeUrl && (
                <a
                  href={card.prototypeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-amber-700 underline-offset-2 hover:underline"
                >
                  查看 {card.title} 的参考原型大图 →
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
