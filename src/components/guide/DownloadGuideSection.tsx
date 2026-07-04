const guides = [
  {
    title: "只想在微信聊天里用",
    description:
      "注册赠送的 4 credits 足够生成 1 次主图。切割页删掉不满意的图，点「下载表情」即可，不需要任何额外素材。",
  },
  {
    title: "上架微信表情开放平台",
    description:
      "切图后继续生成横幅、封面、图标。它们属于付费素材，充值后按需生成，再打包下载提交审核。",
    link: { text: "打开微信表情开放平台 →", href: "https://sticker.weixin.qq.com/" },
    linkHint: "sticker.weixin.qq.com",
  },
  {
    title: "上架并开通赞赏",
    description:
      "在上面的基础上，还需要赞赏引导图、致谢图，以及艺术家头像和主页横幅。艺术家资料是账号级的，只需做一次。",
  },
];

export default function DownloadGuideSection() {
  return (
    <section>
      <p className="mb-3 text-sm font-semibold text-amber-600">上架清单</p>
      <h2 className="mb-8 text-2xl font-bold text-gray-900 md:text-3xl">
        不同目标，不同下载方式
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {guides.map((guide) => (
          <div
            key={guide.title}
            className="rounded-xl border border-gray-100 bg-white p-4"
          >
            <h3 className="mb-2 text-base font-semibold text-gray-800">
              {guide.title}
            </h3>
            <p className="mb-3 text-sm leading-relaxed text-gray-500">
              {guide.description}
            </p>
            {guide.link && (
              <>
                <a
                  href={guide.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-amber-700 underline-offset-2 hover:underline"
                >
                  {guide.link.text}
                </a>
                {guide.linkHint && (
                  <p className="text-xs text-gray-400">{guide.linkHint}</p>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
