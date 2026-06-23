export interface ColorData {
  name: string; // Chinese name
  pinyin: string; // Romanized pinyin
  hex: string;
  rgb: { r: number; g: number; b: number };
  cmyk: { c: number; m: number; y: number; k: number };
  category: string; // e.g., "红", "绿", "蓝"
  poemLines: string[];
  poemAuthor: string;
}

export interface ColorCategory {
  name: string;
  colors: ColorData[];
}

export const COLOR_CATEGORIES: ColorCategory[] = [
  {
    name: "红",
    colors: [
      { name: "大红", pinyin: "dà hóng", hex: "#FF0000", rgb: { r: 255, g: 0, b: 0 }, cmyk: { c: 0, m: 100, y: 100, k: 0 }, category: "红", poemLines: ["等闲识得东风面", "万紫千红总是春"], poemAuthor: "朱熹 · 春日" },
      { name: "朱红", pinyin: "zhū hóng", hex: "#FF4C00", rgb: { r: 255, g: 76, b: 0 }, cmyk: { c: 0, m: 70, y: 100, k: 0 }, category: "红", poemLines: ["接天莲叶无穷碧", "映日荷花别样红"], poemAuthor: "杨万里 · 晓出净慈寺" },
    ],
  },
  {
    name: "黄",
    colors: [
      { name: "鹅黄", pinyin: "é huáng", hex: "#FFF100", rgb: { r: 255, g: 241, b: 0 }, cmyk: { c: 0, m: 5, y: 100, k: 0 }, category: "黄", poemLines: ["两个黄鹂鸣翠柳", "一行白鹭上青天"], poemAuthor: "杜甫 · 绝句" },
      { name: "金黄", pinyin: "jīn huáng", hex: "#FFD700", rgb: { r: 255, g: 215, b: 0 }, cmyk: { c: 0, m: 16, y: 100, k: 0 }, category: "黄", poemLines: ["待到秋来九月八", "我花开后百花杀"], poemAuthor: "黄巢 · 不第后赋菊" },
    ],
  },
  {
    name: "绿",
    colors: [
      { name: "青色", pinyin: "qīng sè", hex: "#00e09e", rgb: { r: 0, g: 224, b: 158 }, cmyk: { c: 100, m: 0, y: 29, k: 12 }, category: "绿", poemLines: ["君子死知己", "提剑出燕京"], poemAuthor: "陶渊明 · 咏荆轲" },
      { name: "翠绿", pinyin: "cuì lǜ", hex: "#0aa344", rgb: { r: 10, g: 163, b: 68 }, cmyk: { c: 94, m: 0, y: 58, k: 36 }, category: "绿", poemLines: ["青山横北郭", "白水绕东城"], poemAuthor: "李白 · 送友人" },
    ],
  },
  {
    name: "蓝",
    colors: [
      { name: "天蓝", pinyin: "tiān lán", hex: "#44cef6", rgb: { r: 68, g: 206, b: 246 }, cmyk: { c: 72, m: 16, y: 0, k: 4 }, category: "蓝", poemLines: ["日出江花红胜火", "春来江水绿如蓝"], poemAuthor: "白居易 · 忆江南" },
    ],
  },
  {
    name: "苍",
    colors: [
      { name: "苍色", pinyin: "cāng sè", hex: "#75878a", rgb: { r: 117, g: 135, b: 138 }, cmyk: { c: 15, m: 2, y: 0, k: 46 }, category: "苍", poemLines: ["天苍苍，野茫茫", "风吹草低见牛羊"], poemAuthor: "北朝民歌 · 敕勒歌" },
    ],
  },
  {
    name: "水",
    colors: [
      { name: "水色", pinyin: "shuǐ sè", hex: "#d2f0f4", rgb: { r: 210, g: 240, b: 244 }, cmyk: { c: 14, m: 2, y: 0, k: 4 }, category: "水", poemLines: ["水光潋滟晴方好", "山色空蒙雨亦奇"], poemAuthor: "苏轼 · 饮湖上初晴后雨" },
    ],
  },
  {
    name: "灰白",
    colors: [
      { name: "灰白", pinyin: "huī bái", hex: "#f0f0f4", rgb: { r: 240, g: 240, b: 244 }, cmyk: { c: 2, m: 2, y: 0, k: 4 }, category: "灰白", poemLines: ["白头搔更短", "浑欲不胜簪"], poemAuthor: "杜甫 · 春望" },
    ],
  },
  {
    name: "黑",
    colors: [
      { name: "玄色", pinyin: "xuán sè", hex: "#333333", rgb: { r: 51, g: 51, b: 51 }, cmyk: { c: 0, m: 0, y: 0, k: 80 }, category: "黑", poemLines: ["黑云翻墨未遮山", "白雨跳珠乱入船"], poemAuthor: "苏轼 · 六月二十七日望湖楼醉书" },
    ],
  },
  {
    name: "金银",
    colors: [
      { name: "金色", pinyin: "jīn sè", hex: "#eacd76", rgb: { r: 234, g: 205, b: 118 }, cmyk: { c: 0, m: 12, y: 50, k: 8 }, category: "金银", poemLines: ["金樽清酒斗十千", "玉盘珍羞直万钱"], poemAuthor: "李白 · 行路难" },
    ],
  },
];
