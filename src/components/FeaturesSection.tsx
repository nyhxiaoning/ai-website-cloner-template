const features = [
  {
    title: "AI 生成整套微信表情包",
    description:
      "支持 Q 版可爱、像素风、手绘涂鸦、3D 毛绒等多种风格，可快速生成 24 张微信表情包，适合做个人 IP、品牌表情或上架作品。",
  },
  {
    title: "支持自定义角色形象",
    description:
      "上传参考图片或输入文字描述，让 AI 基于你的角色形象生成整套表情包，适合打造个人形象、品牌吉祥物或专属聊天表情。",
  },
  {
    title: "自动切割微信表情包尺寸",
    description:
      "自动识别表情边界，切割为单张 240×240 标准尺寸，减少手动裁图和排版的时间，适合直接进入上传流程。",
  },
  {
    title: "聊天自用与上架分开走",
    description:
      "免费先完成主图、切图和聊天表情下载；要上传微信表情开放平台，再按需生成横幅、封面、图标、赞赏图和艺术家资料。",
  },
];

export default function FeaturesSection() {
  return (
    <section>
      <h2 className="mb-4 text-2xl font-bold text-gray-900">
        为什么用表情厨房做微信表情包？
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-xl border border-gray-100 bg-white p-4"
          >
            <h3 className="mb-1 text-base font-semibold text-gray-800">
              {feature.title}
            </h3>
            <p className="text-sm leading-relaxed text-gray-500">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
