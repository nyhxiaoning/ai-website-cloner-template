// Generate geographically accurate route from Chang'an (Xi'an) to Tianzhu (India)
// Following the ancient Silk Road path through Gansu, Xinjiang, Central Asia to India

export interface MarkerData {
  id: number;
  emoji: string;
  gradient: string;
  lat: number;
  lng: number;
}

// Route waypoints: [lat, lng] along the historical route
// From Chang'an (Xi'an) → Hexi Corridor → Xinjiang → Pamirs → Central Asia → India
const routeWaypoints: [number, number][] = [
  [34.34, 108.94],  // 0. 长安 (Chang'an / Xi'an) - START
  [34.50, 108.20],  // 1. 咸阳西
  [34.80, 107.50],  // 2. 宝鸡
  [34.90, 106.80],  // 3. 天水
  [35.20, 105.50],  // 4. 陇西
  [35.80, 104.30],  // 5. 兰州
  [36.50, 103.30],  // 6. 凉州 (Wuwei)
  [37.50, 102.30],  // 7. 甘州 (Zhangye)
  [38.50, 101.00],  // 8. 肃州 (Jiuquan)
  [39.50, 99.50],   // 9. 嘉峪关
  [40.00, 98.00],   // 10. 瓜州
  [40.10, 94.70],   // 11. 敦煌 (Dunhuang)
  [40.50, 93.50],   // 12. 玉门关
  [41.00, 92.50],   // 13. 哈密东
  [42.80, 93.50],   // 14. 哈密 (Hami)
  [42.90, 91.80],   // 15. 星星峡
  [42.90, 90.00],   // 16. 吐鲁番东
  [42.90, 89.20],   // 17. 吐鲁番 (Turpan)
  [42.30, 88.00],   // 18. 焉耆 (Karashahr)
  [42.00, 86.50],   // 19. 库尔勒
  [41.70, 82.90],   // 20. 库车 (Kucha)
  [41.50, 81.50],   // 21. 拜城
  [41.20, 80.30],   // 22. 阿克苏 (Aksu)
  [40.50, 78.50],   // 23. 乌什
  [39.80, 77.00],   // 24. 阿图什
  [39.50, 76.00],   // 25. 喀什 (Kashgar)
  [39.00, 75.00],   // 26. 乌恰
  [38.50, 73.50],   // 27. 帕米尔高原东
  [38.00, 73.00],   // 28. 帕米尔高原 (Pamir Mountains)
  [37.80, 72.50],   // 29. 帕米尔西
  [37.50, 71.80],   // 30. 喷赤河
  [37.20, 71.00],   // 31. 瓦罕走廊东
  [36.80, 70.50],   // 32. 瓦罕走廊
  [36.50, 70.00],   // 33. 阿富汗东北
  [36.20, 69.50],   // 34. 昆都士
  [35.80, 69.00],   // 35. 兴都库什山
  [35.50, 68.50],   // 36. 巴米扬
  [35.00, 68.00],   // 37. 巴米扬南
  [34.80, 67.50],   // 38. 阿富汗中部
  [34.50, 67.00],   // 39. 喀布尔北
  [34.30, 66.50],   // 40. 阿富汗西
  [34.00, 66.00],   // 41. 兴都库什南
  [33.80, 65.50],   // 42. 赫拉特东
  [33.50, 65.00],   // 43. 阿富汗南
  [33.20, 64.50],   // 44. 赫尔曼德
  [33.00, 64.00],   // 45. 坎大哈北
  [32.80, 63.50],   // 46. 坎大哈
  [32.50, 63.00],   // 47. 巴基斯坦边境
  [32.00, 62.50],   // 48. 巴基斯坦西
  [31.50, 62.00],   // 49. 俾路支
  [31.00, 61.50],   // 50. 伊朗边境
  [30.50, 61.00],   // 51. 锡斯坦
  [30.00, 60.50],   // 52. 扎黑丹
  [29.50, 60.00],   // 53. 俾路支南
  [29.00, 61.00],   // 54. 转向东南
  [28.50, 62.00],   // 55. 巴基斯坦中
  [28.00, 63.00],   // 56. 诺贡迪
  [27.50, 64.00],   // 57. 巴基斯坦南
  [27.00, 65.00],   // 58. 信德省
  [26.50, 66.00],   // 59. 卡拉奇北
  [26.00, 67.00],   // 60. 印度河西
  [25.50, 68.00],   // 61. 海得拉巴
  [25.00, 69.00],   // 62. 塔尔沙漠
  [24.50, 70.00],   // 63. 古吉拉特
  [24.00, 71.00],   // 64. 印度西北
  [23.80, 72.00],   // 65. 艾哈迈达巴德
  [23.60, 73.00],   // 66. 拉贾斯坦
  [23.50, 74.00],   // 67. 中央邦北
  [23.40, 75.00],   // 68. 乌贾因
  [23.30, 76.00],   // 69. 中央邦
  [23.20, 77.00],   // 70. 博帕尔
  [23.50, 78.00],   // 71. 萨格尔
  [24.00, 79.00],   // 72. 北方邦南
  [24.50, 80.00],   // 73. 克久拉霍
  [25.00, 81.00],   // 74. 瓦拉纳西 (Varanasi)
  [25.30, 82.00],   // 75. 阿拉哈巴德
  [25.50, 83.00],   // 76. 巴特那 (Patna)
  [25.60, 84.00],   // 77. 那烂陀东
  [25.40, 85.00],   // 78. 那烂陀 (Nalanda)
  [25.20, 85.50],   // 79. 灵山附近
  [25.10, 85.80],   // 80. 灵山 (Spirit Mountain) - END
];

// Emojis and gradients for all 81 tribulations
const markerStyles: { emoji: string; gradient: string }[] = [
  { emoji: "🏛️", gradient: "from-red-400 to-orange-400" },   // 0. 长安城 (intro)
  { emoji: "🏛️", gradient: "from-indigo-500 to-purple-600" }, // 1. 金蝉遭贬
  { emoji: "⚔️", gradient: "from-red-600 to-red-800" },       // 2. 出胎几杀
  { emoji: "🌊", gradient: "from-blue-400 to-cyan-400" },     // 3. 满月抛江
  { emoji: "⚖️", gradient: "from-orange-400 to-yellow-400" }, // 4. 寻亲报冤
  { emoji: "🐅", gradient: "from-red-600 to-red-800" },       // 5. 出城逢虎
  { emoji: "⭐", gradient: "from-indigo-500 to-purple-600" }, // 6. 落坑折从
  { emoji: "🐅", gradient: "from-red-600 to-red-800" },       // 7. 双叉岭上
  { emoji: "🐒", gradient: "from-green-400 to-emerald-500" }, // 8. 两界山头
  { emoji: "🐉", gradient: "from-blue-400 to-cyan-400" },     // 9. 陡涧换马
  { emoji: "🔥", gradient: "from-orange-400 to-yellow-400" }, // 10. 夜被火烧
  { emoji: "🐻", gradient: "from-green-400 to-emerald-500" }, // 11. 失却袈裟
  { emoji: "🐷", gradient: "from-green-300 to-green-500" },   // 12. 收降八戒
  { emoji: "🌪️", gradient: "from-gray-600 to-gray-800" },    // 13. 黄风怪阻
  { emoji: "🏔️", gradient: "from-green-400 to-emerald-500" }, // 14. 请求灵吉
  { emoji: "🌊", gradient: "from-blue-400 to-cyan-400" },     // 15. 流沙难渡
  { emoji: "👨‍🦲", gradient: "from-blue-400 to-cyan-400" },   // 16. 收得沙僧
  { emoji: "👩‍👧‍👧", gradient: "from-orange-400 to-yellow-400" },// 17. 四圣显化
  { emoji: "🍑", gradient: "from-orange-400 to-yellow-400" }, // 18. 五庄观中
  { emoji: "🌳", gradient: "from-orange-400 to-yellow-400" }, // 19. 难活人参
  { emoji: "💀", gradient: "from-red-600 to-red-800" },       // 20. 贬退心猿
  { emoji: "🐺", gradient: "from-gray-600 to-gray-800" },     // 21. 黑松林失散
  { emoji: "👑", gradient: "from-yellow-500 to-amber-600" },  // 22. 宝象国捎书
  { emoji: "🐅", gradient: "from-yellow-500 to-amber-600" },  // 23. 金銮殿变虎
  { emoji: "👑", gradient: "from-green-400 to-emerald-500" }, // 24. 平顶山逢魔
  { emoji: "🏺", gradient: "from-gray-600 to-gray-800" },     // 25. 莲花洞高悬
  { emoji: "👻", gradient: "from-yellow-500 to-amber-600" },  // 26. 乌鸡国救主
  { emoji: "⚔️", gradient: "from-yellow-500 to-amber-600" },  // 27. 被魔化身
  { emoji: "👶", gradient: "from-pink-500 to-rose-500" },     // 28. 号山逢怪
  { emoji: "🔥", gradient: "from-gray-600 to-gray-800" },     // 29. 风摄圣僧
  { emoji: "🎭", gradient: "from-pink-500 to-rose-500" },     // 30. 心猿遭害
  { emoji: "🏔️", gradient: "from-indigo-500 to-purple-600" }, // 31. 请圣降妖
  { emoji: "🐊", gradient: "from-blue-400 to-cyan-400" },     // 32. 黑河沉没
  { emoji: "👨‍🦲", gradient: "from-yellow-500 to-amber-600" }, // 33. 搬运车迟
  { emoji: "⚡", gradient: "from-pink-500 to-rose-500" },      // 34. 大赌输赢
  { emoji: "☯️", gradient: "from-yellow-500 to-amber-600" },  // 35. 祛道兴僧
  { emoji: "🏠", gradient: "from-pink-500 to-rose-500" },     // 36. 路逢大水
  { emoji: "❄️", gradient: "from-blue-400 to-cyan-400" },     // 37. 身落天河
  { emoji: "🐠", gradient: "from-blue-400 to-cyan-400" },     // 38. 鱼篮现身
  { emoji: "💍", gradient: "from-green-400 to-emerald-500" }, // 39. 金兜山遇怪
  { emoji: "👑", gradient: "from-indigo-500 to-purple-600" }, // 40. 普天神难伏
  { emoji: "🐂", gradient: "from-indigo-500 to-purple-600" }, // 41. 问佛根源
  { emoji: "🤰", gradient: "from-pink-500 to-rose-500" },     // 42. 吃水遭毒
  { emoji: "👸", gradient: "from-yellow-500 to-amber-600" },  // 43. 西梁国留婚
  { emoji: "🦂", gradient: "from-gray-600 to-gray-800" },     // 44. 琵琶洞受苦
  { emoji: "🐒", gradient: "from-green-400 to-emerald-500" }, // 45. 再贬心猿
  { emoji: "🐵", gradient: "from-gray-600 to-gray-800" },     // 46. 难辨猕猴
  { emoji: "🔥", gradient: "from-yellow-600 to-orange-600" }, // 47. 路阻火焰山
  { emoji: "🌿", gradient: "from-gray-600 to-gray-800" },     // 48. 求取芭蕉扇
  { emoji: "💨", gradient: "from-yellow-600 to-orange-600" }, // 49. 收缚魔王
  { emoji: "🐟", gradient: "from-yellow-500 to-amber-600" },  // 50. 赛城扫塔
  { emoji: "🐲", gradient: "from-blue-400 to-cyan-400" },     // 51. 取宝救僧
  { emoji: "🌳", gradient: "from-orange-400 to-yellow-400" }, // 52. 棘林吟咏
  { emoji: "⚡", gradient: "from-orange-400 to-yellow-400" }, // 53. 小雷音遇难
  { emoji: "😊", gradient: "from-indigo-500 to-purple-600" }, // 54. 诸天神遭困
  { emoji: "🐷", gradient: "from-green-300 to-green-500" },   // 55. 稀柿衕秽阻
  { emoji: "📋", gradient: "from-yellow-500 to-amber-600" },  // 56. 朱紫国行医
  { emoji: "👑", gradient: "from-green-400 to-emerald-500" }, // 57. 拯救疲癃
  { emoji: "👸", gradient: "from-yellow-500 to-amber-600" },  // 58. 降妖取后
  { emoji: "🕷️", gradient: "from-green-400 to-emerald-500" }, // 59. 七情迷没
  { emoji: "🐛", gradient: "from-gray-600 to-gray-800" },     // 60. 多目遭伤
  { emoji: "🦁", gradient: "from-indigo-500 to-purple-600" }, // 61. 路阻狮驼
  { emoji: "🎨", gradient: "from-pink-500 to-rose-500" },     // 62. 怪分三色
  { emoji: "🏙️", gradient: "from-gray-600 to-gray-800" },     // 63. 城里遇灾
  { emoji: "🙏", gradient: "from-blue-400 to-cyan-400" },     // 64. 请佛收魔
  { emoji: "👶", gradient: "from-green-400 to-emerald-500" }, // 65. 比丘救子
  { emoji: "🦌", gradient: "from-orange-400 to-yellow-400" }, // 66. 辨认真邪
  { emoji: "👧", gradient: "from-pink-500 to-rose-500" },     // 67. 松林救怪
  { emoji: "😈", gradient: "from-gray-600 to-gray-800" },     // 68. 僧房卧病
  { emoji: "⚖️", gradient: "from-yellow-500 to-amber-600" },  // 69. 无底洞遭困
  { emoji: "💇", gradient: "from-green-400 to-emerald-500" }, // 70. 灭法国难行
  { emoji: "🐆", gradient: "from-orange-400 to-yellow-400" }, // 71. 隐雾山遇魔
  { emoji: "🌧️", gradient: "from-blue-400 to-cyan-400" },     // 72. 凤仙郡求雨
  { emoji: "⚔️", gradient: "from-red-600 to-red-800" },       // 73. 失落兵器
  { emoji: "🦁", gradient: "from-indigo-500 to-purple-600" }, // 74. 会庆钉钯
  { emoji: "🐉", gradient: "from-blue-400 to-cyan-400" },     // 75. 竹节山遭难
  { emoji: "🦏", gradient: "from-gray-600 to-gray-800" },     // 76. 玄英洞受苦
  { emoji: "⭐", gradient: "from-indigo-500 to-purple-600" },  // 77. 赶捉犀牛
  { emoji: "🌙", gradient: "from-pink-500 to-rose-500" },     // 78. 天竺招婚
  { emoji: "⚖️", gradient: "from-yellow-500 to-amber-600" },  // 79. 铜台府监禁
  { emoji: "🌉", gradient: "from-blue-400 to-cyan-400" },     // 80. 凌云渡脱胎
  { emoji: "🐢", gradient: "from-green-400 to-emerald-500" },  // 81. 通天河遇鼋湿经书
];

// Generate 81 markers along the route waypoints with proper spacing
export const tribulations: MarkerData[] = [];

// Interpolate 81 points across the 81 waypoints (0-80)
// Waypoints give us 81 reference points so we can map 1:1
for (let i = 0; i < routeWaypoints.length && i < markerStyles.length; i++) {
  tribulations.push({
    id: i + 1,
    emoji: markerStyles[i].emoji,
    gradient: markerStyles[i].gradient,
    lat: routeWaypoints[i][0],
    lng: routeWaypoints[i][1],
  });
}

// Calculate the route center and zoom based on marker bounds
export function getMapCenter(): [number, number] {
  const lats = tribulations.map((m) => m.lat);
  const lngs = tribulations.map((m) => m.lng);
  const centerLat = (Math.max(...lats) + Math.min(...lats)) / 2;
  const centerLng = (Math.max(...lngs) + Math.min(...lngs)) / 2;
  return [centerLat, centerLng];
}

export function getMapBounds(): [[number, number], [number, number]] {
  const lats = tribulations.map((m) => m.lat);
  const lngs = tribulations.map((m) => m.lng);
  return [
    [Math.min(...lats) - 1, Math.min(...lngs) - 1],
    [Math.max(...lats) + 1, Math.max(...lngs) + 1],
  ];
}
