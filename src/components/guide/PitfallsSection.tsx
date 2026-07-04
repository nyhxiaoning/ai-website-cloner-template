const pitfalls = [
  {
    title: "不是必须保留 24 张",
    description:
      "很多新用户会强迫自己凑满 24 张。实际上微信专辑要求是 8-24 张之间，删掉明显差的图，整体通过率会更高。",
  },
  {
    title: "切完图不等于已经能上架",
    description:
      "切图完成后，你已经能下载聊天表情，但要上架微信平台，还需要横幅、封面、图标这些平台素材，而且这些素材需要充值后继续生成。",
  },
  {
    title: "赞赏素材不是每次都必须做",
    description:
      "只有你准备开赞赏功能时，才需要生成赞赏引导图和致谢图。不开赞赏可以直接跳过。",
  },
  {
    title: "艺术家资料是全局资料，不是每套都重做",
    description:
      "艺术家头像和主页横幅放在单独页面维护。它们是你账号级别的资料，不需要每生成一套表情都重新做一次。",
  },
];

export default function PitfallsSection() {
  return (
    <section>
      <p className="mb-3 text-sm font-semibold text-amber-600">常见误区</p>
      <h2 className="mb-8 text-2xl font-bold text-gray-900 md:text-3xl">
        新手最容易走的弯路
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {pitfalls.map((pitfall) => (
          <article
            key={pitfall.title}
            className="rounded-xl border border-gray-100 bg-white p-4"
          >
            <h3 className="mb-2 text-base font-semibold text-gray-800">
              {pitfall.title}
            </h3>
            <p className="text-sm leading-relaxed text-gray-500">
              {pitfall.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
