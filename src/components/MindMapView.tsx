export default function MindMapView() {
  const categories = [
    {
      title: "收徒篇",
      emoji: "👥",
      color: "from-blue-500 to-indigo-600",
      items: ["五行山悟空", "高老庄八戒", "流沙河沙僧", "鹰愁涧白龙"],
    },
    {
      title: "妖魔篇",
      emoji: "👹",
      color: "from-red-500 to-pink-600",
      items: ["白骨精", "牛魔王", "红孩儿", "金角银角", "铁扇公主"],
    },
    {
      title: "考验篇",
      emoji: "🔥",
      color: "from-orange-500 to-yellow-600",
      items: ["火焰山", "女儿国", "通天河", "狮驼岭"],
    },
    {
      title: "仙佛篇",
      emoji: "✨",
      color: "from-purple-500 to-pink-600",
      items: ["如来佛祖", "观音菩萨", "太上老君", "玉皇大帝"],
    },
    {
      title: "奇遇篇",
      emoji: "🌟",
      color: "from-green-500 to-emerald-600",
      items: ["人参果", "蟠桃会", "真假美猴王", "三打白骨精"],
    },
    {
      title: "终章",
      emoji: "🙏",
      color: "from-yellow-500 to-orange-600",
      items: ["灵山圣地", "取得真经", "功德圆满", "五圣成真"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-6 md:p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          🧠 思维导图
        </h2>
        <p className="text-center text-gray-600 mb-8">
          西游记取经路上的主要篇章和关键事件
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Header */}
              <div
                className={`bg-gradient-to-r ${cat.color} p-4 text-white`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{cat.emoji}</span>
                  <h3 className="text-xl font-bold">{cat.title}</h3>
                </div>
              </div>
              {/* Items */}
              <div className="p-4">
                {cat.items.map((item, j) => (
                  <div
                    key={j}
                    className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="w-2 h-2 rounded-full bg-orange-400" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
