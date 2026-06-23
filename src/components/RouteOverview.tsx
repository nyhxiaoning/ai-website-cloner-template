export default function RouteOverview() {
  const cards = [
    {
      icon: "fa-home",
      gradient: "from-red-500 to-red-600",
      title: "起点",
      value: "长安城",
    },
    {
      icon: "fa-mountain",
      gradient: "from-teal-500 to-green-500",
      title: "终点",
      value: "灵山圣地",
    },
    {
      icon: "fa-map-marker-alt",
      gradient: "from-blue-500 to-indigo-600",
      title: "站点",
      value: "81难地点",
    },
    {
      icon: "fa-trophy",
      gradient: "from-yellow-500 to-orange-500",
      title: "成就",
      value: "功德圆满",
    },
    {
      icon: "fa-scroll",
      gradient: "from-purple-500 to-pink-500",
      title: "文化",
      value: "师徒四人的传奇西行之路",
    },
  ];

  return (
    <div className="p-6 md:p-8 bg-amber-50 border-t-4 border-orange-300">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          西游取经路线概览
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {cards.map((card, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-center"
            >
              <div
                className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-4`}
              >
                <i className={`fas ${card.icon} text-2xl text-white`}></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {card.title}
              </h3>
              <p className="text-gray-600">{card.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
