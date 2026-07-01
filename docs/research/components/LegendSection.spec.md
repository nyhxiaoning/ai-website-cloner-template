# LegendSection Specification

## Overview
- **Target file:** `src/components/LegendSection.tsx`
- **Screenshot:** N/A (reference live site)
- **Interaction model:** static

## Content

### Section 1: 传承连线与学术定位 (Succession & Academic Positioning)
- Heading with 📜 icon: "传承连线与学术定位"
- List items:
  - 实线箭头 (➜): 严密师资授受/正统流派继承。
  - 虚线箭头 (┈➜): 跨越时代的间接灵感与思想交锋。
  - 五维学术继承层级 (with nested list):
    - ★★★★★ 巨擘宗师: 哲学王座基石，独享「流光」卡片与星盘刻度轴。
    - ★★★★☆ 传世先驱: 流派核心奠基人，享金砂哑光卡片与辅助定位轴。
    - ★★★☆☆ 核心贤哲: 学说谱系主力承传者，享经典金相层。
    - ★★☆☆☆ 沿袭学者: 学派集大成者/完善评注者。
    - ★☆☆☆☆ 界外探索者: 旁支外围发展与思想交涉的探索者。

### Section 2: 学说学派与卡片色彩 (Card Colors)
- Heading with 🎨 icon: "学说学派与卡片色彩 (Card Colors)"
- Color legend items:
  - 古自然哲学与宇宙学 (Teal): 探讨世界的本原与自然科学。
  - 古希腊雅典流派 (Sky Blue): 雅典三杰、智者派与学院派。
  - 希腊化与罗马伦理 (Amber): 斯多葛、伊壁鸠鲁、新柏拉图。
  - 中世纪神学经院 (Emerald): 教父、阿奎那、唯名论。
  - 近代唯理论 (Indigo): 笛卡尔、斯宾诺莎、莱布尼茨。
  - 近代经验论 (Yellow): 培根、洛克、贝克莱、休谟。
  - 文艺复兴启蒙 (Rose): 人文主义、宗教改革与激进派。
  - 德意志古典哲学 (Purple): 康德批判、黑格尔绝对精神。
  - 实证与非理性 (Red): 意志主义、实证主义、马克思哲学。

### Section 3: 史学操作与时空轴心定位 (Operation Guide)
- Heading with 🧭 icon: "史学操作与时空轴心定位"
- Paragraphs:
  - ① 脉络图谱纵向无限滑动: 页面呈现单一、连续、长画卷轴。下划即是时光穿梭，随滚轮见证两千年哲学长河洗礼！右侧辅助面板实时展示当前高亮的活跃纪元时区（Temporal Axis）。
  - ② 学人操作锁定与关系高亮: 
    - 单击卡片: 在右侧"贤哲神龛"载入核心概念，并在图中照亮其师资、思想传承影响连线。
    - 双击卡片: 开启解构式的贤哲生平独立行卷，展示学说、传记、不朽经典作品档案，点击"返回"一键归队。

## Styling
- Background: bg-alabaster
- Max-width container: max-w-6xl, centered mx-auto
- Cards container: grid grid-cols-1 md:grid-cols-3 gap-6
- Card: bg-white, rounded-xl, border border-[#D4AF37]/35, p-5, shadow-sm
- Card heading: text-sm font-bold text-aegean, mb-3
- List items: text-[10px] or text-[11px] text-aegean/70, leading-relaxed
- Color items: flex items-center gap-2, with colored dot
- Color dot: w-3 h-3 rounded-full

## Props
- None (static content)
