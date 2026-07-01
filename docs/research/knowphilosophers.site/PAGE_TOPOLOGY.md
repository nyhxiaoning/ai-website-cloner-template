# Page Topology: knowphilosophers.site

## Overview
An interactive scrollable knowledge graph/timeline of Western philosophy spanning 7 major eras, featuring ~100+ philosopher nodes with school affiliations, academic ratings, detail panels, debate arena, and filtering.

## Layout Structure
- **Entire page** is a single scrollable document
- **No fixed headers** — the bottom navigation bar is fixed/absolute at the bottom
- **Body background:** #FAF8F5 (warm off-white / Alabaster)
- **Primary accent:** #D4AF37 (gold)
- **Text color:** #0B2545 (deep navy)

## Section Inventory (top to bottom)

### 1. Bottom Navigation Bar (fixed at bottom)
- **Interaction model:** static (always visible)
- **Z-index:** 50
- **Style:**
  - Fixed at bottom, centered horizontally
  - bg: white/95 with backdrop-blur
  - border: 1px solid rgba(212,175,55,0.35)
  - shadow-[0_8px_32px_rgba(11,37,69,0.12)]
  - border-radius: 9999px (full rounded pill)
  - padding: 12px 20px
  - max-width: 92vw
  - display: flex, items: center, justify: space-between
  - gap: 32px
- **Left section:** ΦΙΛΟΣΟΦΙΑ (title) + navigation links
- **Center section:** "📜 思想沿革史卷 | ⚔️ 众神多边辩论 | NEW"
- **Right section:** "💡 双击人物卡片进入手稿生平行卷"
- **Dependencies:** Global (always on screen)

### 2. Hero / Title Section
- **Interaction model:** static
- **Content:**
  - ΦΙΛΟΣΟΦΙΑ (Phi-losophia, Greek for philosophy) — decorative title
  - "西方哲学发展脉络交互图谱" (Interactive Map of Western Philosophy Development)
  - "西方哲学思想沿革史卷" (Historical Scroll of Western Philosophical Thought)
  - "本图谱真实精确地还原了六大黄金断代时期的哲学主干网络。采用古希腊经典神庙美学设计，通过向下流动模拟历史纪元的演进，在 Alabaster 细砂大理石廊底与 Aegean 爱琴海深蓝间优雅流转。"
  - "双击任何人物卡片，可以直接进入该圣哲的精细生平行卷"

### 3. Academic Pedigree Filter (Filter Bar)
- **Interaction model:** click-driven (toggle star-level filters)
- **Style:**
  - "谱系学等阶筛选 (Academic Pedigree Selector)"
  - Quick presets: "显示全部" | "仅看特级/一级"
  - 5 star levels with labels:
    - ★★★★★ 巨擘宗师 (形而上学巅峰巨人)
    - ★★★★☆ 传世先驱 (学说关键奠基领袖)
    - ★★★☆☆ 核心贤哲 (体系主干核心学者)
    - ★★☆☆☆ 沿袭学者 (流派主干评注沿袭者)
    - ★☆☆☆☆ 界外探索者 (外围探索思辨交涉)
- **Behavior:** Checked levels show fully opaque; unchecked levels become semi-transparent

### 4. Timeline Grid (Main Content)
- **Interaction model:** scroll-driven + click-driven
- **Structure:**
  - Each era is a horizontal band/section
  - Philosopher nodes positioned with absolute positioning within each era
  - Era labels on the left side as sticky/timeline markers
  - Sub-period markers (centuries/date ranges) within each era

- **Era 1: 古希腊罗马 (Ancient Greece & Rome)**
  - BC 6th century → AD 4th century
  - Sub-periods: BC 6, BC 5, BC 4, BC 3~2, BC 1, AD 1, AD 2, AD 3, AD 4
  - Schools: 米利都学派, 爱利亚学派, 毕达哥拉斯学派, 爱奥尼亚学派, 多元论学派, 原子论学派, 智者学派, 雅典学派, 麦加拉学派, 犬儒学派, 昔兰尼学派, 怀疑主义, 伊壁鸠鲁学派, 斯多葛学派, 折中主义/罗马哲理, 罗马斯多葛学派, 犹太柏拉图主义, 新柏拉图主义, 教父哲学

- **Era 2: 中世纪与经院哲学 (Medieval & Scholastic)**
  - AD 5th century → AD 14th century
  - Sub-periods: 4~5, 6~8, 9, 10~11, 12, 13, 14

- **Era 3: 文艺复兴与近代早期哲学 (Renaissance & Early Modern)**
  - 15th century → 17th century
  - Sub-periods: 15, 16, 17前, 17中, 17后, 18初

- **Era 4: 法兰西启蒙思想和唯物主义 (French Enlightenment)**
  - 18th century
  - Sub-periods: 18初期, 18中叶, 18中后期, 18末期

- **Era 5: 德意志古典哲学 (German Classical Philosophy)**
  - 1780~1844
  - Sub-periods: 1780康德革命, 1800三大主峰, 1820经世体系, 1840众声喧哗

- **Era 6: 过渡时期与19世纪中后期 (Transition & Late 19th)**
  - 1844~1900
  - Sub-periods: 1840~1850意志呼啸, 1860~1870实证万能, 1880~1890上帝已死, 1900世纪之交

- **Era 7: 现代派、英美分析与当代 (Modern & Contemporary)**
  - 20th century ~ present
  - Sub-periods: 1900~1920, 1930~1950, 1960~1980, 1990~当代

### 5. Philosopher Detail Card Detail (Modal/Panel)
- **Interaction model:** click-driven (double-click philosopher card)
- **Content:**
  - Philosopher name (Chinese + Western)
  - Era/School label
  - Star rating
  - "核心命题与学说" (Core tenets)
  - "思想史综述" (Historical summary)
  - "历史脉络学术关联" (Academic connections) — links to related philosophers
  - Action: "双击人物卡 或【点击此处】深入主卷生平"

### 6. Symposium / Debate Arena (对话广场)
- **Interaction model:** click-driven
- **Content:**
  - "对话广场 · 雅典论辩 (Symposium Arena)"
  - "THE PALESTRA symposium"
  - "雅典学园之辩 · 思想交锋"
  - Description: Compare two philosophers in a virtual dialogue
  - Preset debates (精选思想公案):
    1. 第一本原：心灵的终极指向 — Plato vs Aristotle
    2. 知识探求：天赋还是白板 — Descartes vs ?
    3. 救赎之道：寂灭亦或狂歌 — Schopenhauer vs ?
    4. 历史车轮：绝对精神与生产力 — Hegel vs Marx
  - Custom selection (自定义群星对照):
    - Two dropdown selectors for philosopher A and B
    - Each dropdown shows philosopher name + school
  - Action buttons for the comparison

## Color Palette
- **Background:** #FAF8F5 (Alabaster light marble)
- **Text primary:** #0B2545 (Aegean deep blue)
- **Accent gold:** #D4AF37
- **Accent gold rgba:** rgba(212, 175, 55, ...various opacities)
- **Secondary teal:** #0D5C75
- **Secondary warm:** #C2593F (terracotta)
- **Card bg:** #FDFDFB
- **Dark bg:** #051726
- **Light bg:** #FFFDF9
- **Border light:** rgba(212, 175, 55, 0.35)
- **Border faint:** rgba(212, 175, 55, 0.2)
- **Various oklch accent colors** for different school categories

## Interaction Models
- **Scroll:** The entire timeline is scrollable. As user scrolls, eras come into view
- **Click (philosopher card):** Opens detail panel with biography
- **Click (filter):** Toggles visibility of philosopher star levels
- **Click (tab/preset):** Switches the debate arena topic
- **Double-click:** Opens detailed biographical scroll

## Dependencies
- Bottom nav is always visible (z-50) — overlay on all content
- Detail panel overlays on top of timeline
- Debate arena is a section embedded in the page flow
- Filter controls are inline between hero and timeline
