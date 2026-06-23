export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-orange-100 via-green-100 to-blue-100 text-gray-700 py-6 mt-auto">
      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4">🐒西游记81难</h3>
            <p className="text-sm text-gray-600">
              互动式取经路线图，体验师徒四人的传奇西行之路
            </p>
            <p className="text-sm text-gray-500 mt-2">🌐 trial81.toolooz.com</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">🔗快速链接</h3>
            <ul className="space-y-2">
              {[
                { icon: "👨‍💻", label: "关于我们" },
                { icon: "🛡️", label: "隐私政策" },
                { icon: "📜", label: "使用条款" },
              ].map((link, i) => (
                <li key={i}>
                  <button className="text-slate-600 hover:text-slate-800 transition-all duration-200 flex items-center gap-2">
                    <span>{link.icon}</span>
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">📧联系我们</h3>
            <p className="text-sm text-gray-600">
              如有问题或建议，欢迎联系我们
            </p>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-8 pt-6 text-center text-sm text-gray-500">
          <p>
            &copy; 2024 trial81.toolooz.com 西游记取经路线图
          </p>
        </div>
      </div>
    </footer>
  );
}
