const steps = [
  {
    num: "1",
    title: "首页先生成主图",
    descs: [
      "注册赠送 4 credits，只覆盖 1 次主图生成。",
      "选风格、选主题，必要时加参考图或角色说明。首页现在只负责生成主表情图，成功后会自动进入切割页，不会在首页同步生成横幅、封面、图标。",
    ],
  },
  {
    num: "2",
    title: "进入切割页筛掉不满意的图",
    descs: [
      "微信专辑只要求 8-24 张，不需要硬留满 24 张。",
      "先看切图结果，把明显出错、压线或文字不满意的图删掉，只保留最稳的那一批。聊天自用时，做到这一步就已经够用了。",
    ],
  },
  {
    num: "3",
    title: "按需补齐上架素材",
    descs: [
      "只有要上架微信平台时，才需要充值后继续生成素材。",
      "上架必须：横幅、封面、图标。开赞赏还需要赞赏引导图、致谢图，以及艺术家头像和主页横幅（在艺术家资料页生成，账号级只需做一次）。这些素材按张扣 credits，失败自动退回。",
    ],
  },
  {
    num: "4",
    title: "按用途下载",
    descs: [
      "聊天用和上架用，下载入口不一样。",
      "只想在微信聊天里使用，直接下载切出来的表情。要上传微信表情开放平台，就在切割页补齐素材后再打包下载完整包。",
    ],
  },
];

export default function TutorialSection() {
  return (
    <section>
      <p className="mb-3 text-sm font-semibold text-amber-600">新手教程</p>
      <h2 className="mb-8 text-2xl font-bold text-gray-900 md:text-3xl">
        4 步完成一套表情包
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {steps.map((step) => (
          <article
            key={step.num}
            className="rounded-xl border border-gray-100 bg-white p-4"
          >
            <span className="mb-3 inline-flex size-8 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-800">
              {step.num}
            </span>
            <h3 className="mb-2 text-base font-semibold text-gray-800">
              {step.title}
            </h3>
            {step.descs.map((desc, i) => (
              <p
                key={i}
                className="mb-1 text-sm leading-relaxed text-gray-500"
              >
                {desc}
              </p>
            ))}
          </article>
        ))}
      </div>
    </section>
  );
}
