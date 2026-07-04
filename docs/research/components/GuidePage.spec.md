# Guide Page Specification

## Overview
- **Target route:** `src/app/guide/page.tsx`
- **Components:** `src/components/guide/`
- **Screenshots:** `docs/design-references/guide-desktop.png`
- **Interaction model:** Static (except anchor links)

## Page Structure

### Hero Section (no white card)
- H1: "从零做出可上架的 微信表情包" — font-size: 48px, font-weight: 800, color: #111827, text-align: center
- Description: "先看别人做出来什么样，再跟着 4 步流程做自己的。..." — font-size: 18px, color: #6b7280, max-width: 672px, centered
- Two CTA buttons side by side:
  - "立即开始制作" → amber-500 bg, white text, font-weight 700, rounded-xl, shadow
  - "先看教程" → transparent bg, amber-800 text, border 2px amber-200, rounded-xl

### Section Labels (subtitle above h2)
- Font-size: 14px, font-weight: 600, color: #d97706 (amber-600)
- Shown above section headings

### Showcase (上架案例)
- **Section label:** "上架案例"
- **H2:** "这些表情包都是用表情厨房做的" — font-size: 30px, font-weight: 700, color: #111827
- **3-column grid** of article cards (gap: 24px)
- **Card structure:**
  - Image at top (355px wide, aspect-ratio tall), object-fit fill, rounded top
  - "已上架" badge overlay on image (rounded-full, amber or green bg)
  - Below image: label row (风格tag + 含参考图 tag)
  - H3: card title
  - P: description text
  - Link: "查看 XX 的参考原型大图" → opens reference image at /guide/demo1_prototype.png
  - Hint text: 💡 tips paragraph

Showcase content (3 x articles):

1. **捌哥的上班日常** — Q版可爱 · 职场主题, 含参考图
   Desc: 基于一张半身照生成的职场表情包，蓝色工装还原度高，表情动作贴合打工人日常。
   Tip: 💡 上传参考图时选一张五官清晰的正面或半身照，AI 还原效果最好。

2. **阿升的恋爱日常** — Q版可爱 · 情侣主题, 含参考图
   Desc: 用一张骑摩托车的照片生成情侣表情包，橙色小摩托贯穿全套，辨识度很高。
   Tip: 💡 照片里有标志性道具（车、帽子、宠物等），生成时会自动融入表情，让整套更有记忆点。

3. **男人妹日常** — Q版可爱 · 女生日常 (no reference tag)
   Desc: 贝雷帽女生形象，覆盖问候、恋爱、吃瓜、摸鱼等场景，表情丰富，适合日常聊天高频使用。
   Tip: 💡 主题选多个可以让表情覆盖更多场景，日常使用频率更高。

### Tutorial Section (新手教程)
- **Section label:** "新手教程"
- **H2:** "4 步完成一套表情包" — font-size: 30px, font-weight: 700
- **4 numbered steps** as article cards (2x2 grid or stacked):

Step 1: "首页先生成主图"
  注册赠送 4 credits，只覆盖 1 次主图生成。
  选风格、选主题，必要时加参考图或角色说明。首页现在只负责生成主表情图，成功后会自动进入切割页。

Step 2: "进入切割页筛掉不满意的图"
  微信专辑只要求 8-24 张，不需要硬留满 24 张。
  先看切图结果，把明显出错、压线或文字不满意的图删掉，只保留最稳的那一批。聊天自用时，做到这一步就已经够用了。

Step 3: "按需补齐上架素材"
  只有要上架微信平台时，才需要充值后继续生成素材。
  上架必须：横幅、封面、图标。开赞赏还需要赞赏引导图、致谢图，以及艺术家头像和主页横幅。

Step 4: "按用途下载"
  聊天用和上架用，下载入口不一样。
  只想在微信聊天里使用，直接下载切出来的表情。要上传微信表情开放平台，就在切割页补齐素材后再打包下载完整包。

### Download Guide (上架清单)
- **Section label:** "上架清单"
- **H2:** "不同目标，不同下载方式"
- **3 download guide cards:**

1. "只想在微信聊天里用" — Free, 4 credits enough, just cut and download
2. "上架微信表情开放平台" — Continue generating banner/cover/icon, pay credits. Link to sticker.weixin.qq.com
3. "上架并开通赞赏" — Extra: appreciation guide image, thanks image, artist avatar and banner

Card styles: White bg, border-1 gray-100, rounded-xl, padding 16px

### Pitfalls (常见误区)
- **Section label:** "常见误区"
- **H2:** "新手最容易走的弯路"
- **4 pitfalls** as articles:

1. "不是必须保留 24 张" — 8-24 required by WeChat, delete bad ones
2. "切完图不等于已经能上架" — Need banner/cover/icon for marketplace
3. "赞赏素材不是每次都必须做" — Only if enabling appreciation
4. "艺术家资料是全局资料，不是每套都重做" — Artist profile is account-level

### CTA Section (bottom)
- **H2:** "看完了？现在做你的第一套"
- **P:** "建议先用 Q 版可爱风格打样，最容易出成品。"
- **Two buttons:**
  - "立即生成我的表情包" → white bg, amber-700 text, shadow-sm, rounded-xl
  - "还有疑问，先联系我" → transparent bg, white border white/40, white text, rounded-xl

### Footer/Alert bar
- Same as homepage — found at bottom of page

## Layout
- Main container: max-w-5xl (1152px), centered via margin
- Page background: #fffbeb (same as home)
- Same sticky header

## Assets
- `public/images/demo1_prototype.png` (downloaded from /guide/demo1_prototype.png)
- `public/images/demo2_prototype.png` (downloaded from /guide/demo2_prototype.png)
- Showcase images are live URLs (use next/image with remote patterns)

## Responsive
- **Desktop:** 3-col showcase grid, 2x2 tutorial grid
- **Tablet:** 2-col showcase, 2x2 tutorial
- **Mobile:** Single column all sections
- Hero text reduces from 48px to ~32px on mobile
