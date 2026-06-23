export default function SupportView() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            ☕ 赞赏支持
          </h1>
          <p className="text-gray-600 text-sm mb-4">
            您的支持是我们前进的动力
          </p>
          <div className="inline-flex items-center gap-2 bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium animate-pulse">
            <span>❤️</span>
            <span>感谢您的每一份支持！</span>
          </div>
        </div>

        {/* Message */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-pink-400">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">😄</div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                各位亲爱的朋友们
              </h2>
            </div>
            <div className="text-gray-700 leading-relaxed space-y-4">
              <p className="text-center text-lg">
                咱们这个项目，要是你觉得挺不错，挺能解决你的问题，那就别小气，打个小赏怎么样？
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border-l-4 border-blue-400">
                <p className="flex items-center gap-2">
                  <span className="text-2xl">🔋</span>
                  <span>
                    你的支持，对我来说就像是手机快没电时找到充电宝，及时又给力。
                  </span>
                </p>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-lg border-l-4 border-orange-400">
                <p className="flex items-center gap-2">
                  <span className="text-2xl">🍻</span>
                  <span>
                    想表达感谢的话，就当是请我撸个串儿，喝杯饮料，咱心里那个得劲儿啊，干活儿也更起劲儿了。
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Donation Methods */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
          💝 赞赏方式
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* WeChat Pay */}
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="h-20 bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center">
              <span className="text-white text-3xl">💚</span>
            </div>
            <div className="p-6">
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  微信赞赏
                </h3>
                <p className="text-gray-600 text-sm">扫码支持，金额随心</p>
              </div>
              <div className="text-center">
                <div className="p-4 bg-gray-50 rounded-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/donate.jpg"
                    alt="微信赞赏码"
                    className="max-w-full h-auto mx-auto rounded-lg shadow-md"
                    style={{ maxWidth: 200 }}
                  />
                  <p className="text-gray-600 text-xs mt-2">
                    长按识别二维码进行赞赏
                  </p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                {[
                  "支持微信支付",
                  "金额自由选择",
                  "即时到账",
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <span className="text-green-500">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Ko-fi */}
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="h-20 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
              <span className="text-white text-3xl">☕</span>
            </div>
            <div className="p-6">
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Ko-fi 支持
                </h3>
                <p className="text-gray-600 text-sm">国际化赞赏平台</p>
              </div>
              <div className="text-center">
                <a
                  href="https://ko-fi.com/naxol"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full font-bold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md"
                >
                  <i className="fas fa-coffee mr-2"></i>
                  前往 Ko-fi 支持
                </a>
              </div>
              <div className="mt-4 space-y-2">
                {[
                  "支持信用卡支付",
                  "支持PayPal支付",
                  "国际用户友好",
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <span className="text-green-500">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
