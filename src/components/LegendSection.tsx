interface LegendSectionProps {
  // No props needed for static content.
}

const colorLegendItems = [
  { label: "古自然哲学与宇宙学", color: "#0D5C75", desc: "探讨世界的本原与自然科学。" },
  { label: "古希腊雅典流派", color: "#5B9BD5", desc: "雅典三杰、智者派与学院派。" },
  { label: "希腊化与罗马伦理", color: "#D4AF37", desc: "斯多葛、伊壁鸠鲁、新柏拉图。" },
  { label: "中世纪神学经院", color: "#059669", desc: "教父、阿奎那、唯名论。" },
  { label: "近代唯理论", color: "#4338CA", desc: "笛卡尔、斯宾诺莎、莱布尼茨。" },
  { label: "近代经验论", color: "#D97706", desc: "培根、洛克、贝克莱、休谟。" },
  { label: "文艺复兴启蒙", color: "#DB2777", desc: "人文主义、宗教改革与激进派。" },
  { label: "德意志古典哲学", color: "#7C3AED", desc: "康德批判、黑格尔绝对精神。" },
  { label: "实证与非理性", color: "#DC2626", desc: "意志主义、实证主义、马克思哲学。" },
];

const starLevels = [
  { stars: "★★★★★", title: "巨擘宗师", desc: "哲学王座基石，独享「流光」卡片与星盘刻度轴。" },
  { stars: "★★★★☆", title: "传世先驱", desc: "流派核心奠基人，享金砂哑光卡片与辅助定位轴。" },
  { stars: "★★★☆☆", title: "核心贤哲", desc: "学说谱系主力承传者，享经典金相层。" },
  { stars: "★★☆☆☆", title: "沿袭学者", desc: "学派集大成者/完善评注者。" },
  { stars: "★☆☆☆☆", title: "界外探索者", desc: "旁支外围发展与思想交涉的探索者。" },
];

export default function LegendSection(_props: LegendSectionProps) {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 传承连线与学术定位 */}
        <div className="bg-white rounded-xl border border-[#D4AF37]/35 p-5 shadow-sm">
          <h3 className="text-sm font-bold text-aegean mb-3 flex items-center gap-1.5">
            <span>📜</span> 传承连线与学术定位
          </h3>
          <ul className="space-y-1.5 text-[10px] text-aegean/70 leading-relaxed">
            <li className="flex items-start gap-1.5">
              <span className="text-gold/60 mt-0.5">➜</span>
              <span>实线箭头 (➜): 严密师资授受/正统流派继承。</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-gold/60 mt-0.5">┈➜</span>
              <span>虚线箭头 (┈➜): 跨越时代的间接灵感与思想交锋。</span>
            </li>
            <li className="mt-2 font-bold text-aegean/80">五维学术继承层级</li>
            <li className="ml-2">
              <ul className="space-y-1">
                {starLevels.map((level) => (
                  <li key={level.title} className="flex items-start gap-1">
                    <span className="text-gold whitespace-nowrap">{level.stars}</span>
                    <span><strong>{level.title}</strong>: {level.desc}</span>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>

        {/* 学说学派与卡片色彩 */}
        <div className="bg-white rounded-xl border border-[#D4AF37]/35 p-5 shadow-sm">
          <h3 className="text-sm font-bold text-aegean mb-3 flex items-center gap-1.5">
            <span>🎨</span> 学说学派与卡片色彩
          </h3>
          <div className="space-y-2">
            {colorLegendItems.map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[10px] text-aegean/70 leading-relaxed">
                  <strong>{item.label}</strong>: {item.desc}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 史学操作与时空轴心定位 */}
        <div className="bg-white rounded-xl border border-[#D4AF37]/35 p-5 shadow-sm">
          <h3 className="text-sm font-bold text-aegean mb-3 flex items-center gap-1.5">
            <span>🧭</span> 史学操作与时空轴心定位
          </h3>
          <div className="space-y-3 text-[10px] text-aegean/70 leading-relaxed">
            <p>
              <strong className="text-aegean">① 脉络图谱纵向无限滑动</strong>: 页面呈现单一、连续、长画卷轴。下划即是时光穿梭，随滚轮见证两千年哲学长河洗礼！右侧辅助面板实时展示当前高亮的活跃纪元时区（Temporal Axis）。
            </p>
            <p>
              <strong className="text-aegean">② 学人操作锁定与关系高亮</strong>:
            </p>
            <ul className="space-y-1 ml-2 list-disc list-inside">
              <li>单击卡片: 在右侧"贤哲神龛"载入核心概念，并在图中照亮其师资、思想传承影响连线。</li>
              <li>双击卡片: 开启解构式的贤哲生平独立行卷，展示学说、传记、不朽经典作品档案，点击"返回"一键归队。</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
