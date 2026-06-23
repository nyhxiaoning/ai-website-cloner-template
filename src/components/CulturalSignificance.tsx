export default function CulturalSignificance() {
  return (
    <div className="p-6 md:p-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          取经路线的文化意义
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              emoji: "🛤️",
              title: "历史之路",
              desc: "丝绸之路的文化交流与佛教传播的历史见证",
            },
            {
              emoji: "📚",
              title: "文学经典",
              desc: "中国四大名著之一，影响深远的文学巨著",
            },
            {
              emoji: "💪",
              title: "精神象征",
              desc: "坚持不懈、团结协作、勇往直前的民族精神",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-amber-50 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300"
            >
              <div className="text-5xl mb-4">{item.emoji}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
