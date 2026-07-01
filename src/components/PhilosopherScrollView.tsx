"use client";

import { useEffect } from "react";
import type { Philosopher } from "@/types/philosophy";

interface PhilosopherScrollViewProps {
  philosopher: Philosopher;
  onBack: () => void;
}

const ratingLabels: Record<number, string> = {
  5: "巨擘宗师",
  4: "传世先驱",
  3: "核心贤哲",
  2: "沿袭学者",
  1: "界外探索者",
};

const defaultQuotes: Record<string, string> = {
  p15: "我知道我一无所知。未经审视的生活是不值得过的。",
  p20: "理念是万物的神圣原型。尘世的感官世界只是对永恒理念界极其拙劣的投影。",
  p21: "吾爱吾师，吾更爱真理。",
  p75: "有两件事物我愈是思考愈觉神奇，心中也愈充满敬畏，那就是我头顶的星空与我内心的道德准则。",
  p84: "生命是一团欲望，欲望不能满足便痛苦，满足便无聊，人生就在痛苦和无聊之间摇摆。",
  p89: "上帝已死。",
  p90: "哲学家们只是用不同的方式解释世界，而问题在于改变世界。",
};

export default function PhilosopherScrollView({
  philosopher,
  onBack,
}: PhilosopherScrollViewProps) {
  // Lock body scroll when this view is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const quote = defaultQuotes[philosopher.id] || "认识自我，乃是哲学探究的最高目标。";

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#FAF8F5] antialiased">
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-[#D4AF37]/20 flex items-center justify-between px-4 md:px-8 py-3">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[11px] font-bold text-[#0D5C75] hover:text-aegean uppercase tracking-wider transition-colors cursor-pointer"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <path d="M19 12H5" /><polyline points="12 19 5 12 12 5" />
          </svg>
          返回主图谱长河
        </button>
        <div className="flex items-center gap-2 text-sm text-aegean/60">
          <span>🏛️</span>
          <span className="text-xs tracking-wide font-serif">贤达真言卷轴</span>
        </div>
        <button
          onClick={onBack}
          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        >
          ✕
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left column - Portrait & Summary */}
          <div className="lg:col-span-4">
            <div className="bg-gradient-to-b from-[#FDFDFB] to-[#F5F2EA] rounded-xl border-x-4 border-y border-double border-[#D4AF37] shadow-xl p-6 relative overflow-hidden">
              <div className="absolute right-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-[#D4AF37] to-transparent opacity-50 mr-[1px]" />
              <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-[#D4AF37] to-transparent opacity-50 ml-[1px]" />

              {/* Philosopher portrait placeholder */}
              <div className="w-full aspect-[3/4] bg-gradient-to-br from-[#FAF8F5] to-[#F0E8D8] rounded-lg border border-[#D4AF37]/20 flex items-center justify-center mb-4">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#0D5C75]/10 border-2 border-[#D4AF37]/30 flex items-center justify-center mb-2">
                    <span className="text-2xl font-serif font-bold text-[#0D5C75]">
                      {philosopher.chineseName[0]}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 font-serif italic">
                    先哲肖像 · 待艺术复原
                  </p>
                </div>
              </div>

              {/* Quick info */}
              <div className="space-y-2 text-center">
                <span className="inline-block text-[9px] font-bold font-sans uppercase tracking-widest text-[#D4AF37] bg-[#0D5C75] px-2 py-0.5 rounded shadow-xs">
                  {philosopher.school}
                </span>
                <h1 className="font-serif font-extrabold text-2xl text-gray-900 tracking-tight">
                  {philosopher.chineseName}
                </h1>
                <p className="text-xs text-gray-400 uppercase tracking-widest font-serif font-light">
                  {philosopher.englishName}
                </p>
                <div className="flex items-center justify-center gap-0.5 pt-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} className={`text-sm ${i < philosopher.rating ? "text-gold" : "text-gray-300"}`}>★</span>
                  ))}
                  <span className="text-[8px] text-gray-400 ml-1.5 font-sans font-bold uppercase tracking-wider">
                    {ratingLabels[philosopher.rating]}
                  </span>
                </div>
              </div>

              {/* Summary */}
              {philosopher.summary && (
                <div className="mt-4 bg-[#FAF8F5] border border-[#D4AF37]/20 rounded-lg p-3.5">
                  <span className="font-bold text-[#0D5C75] text-[9px] font-sans uppercase tracking-wider block mb-1">
                    📖 思想史综述
                  </span>
                  <p className="text-xs text-gray-700 leading-relaxed italic font-serif">
                    “ {philosopher.summary} ”
                  </p>
                </div>
              )}

              {/* Core Tenets */}
              {philosopher.coreTenets && philosopher.coreTenets.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-[10px] font-bold font-sans uppercase text-amber-800 tracking-wider border-b border-[#D4AF37]/20 pb-1 mb-2">
                    📜 核心命题与学说
                  </h4>
                  <div className="space-y-1.5">
                    {philosopher.coreTenets.map((tenet, i) => (
                      <div key={i} className="bg-white border-l-4 border-[#0D5C75] rounded p-2.5 shadow-xs text-xs text-gray-700 leading-relaxed">
                        {tenet}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right column - Full Biography */}
          <div className="lg:col-span-8 space-y-8">
            {/* Biography section */}
            <div className="bg-white rounded-xl border border-[#D4AF37]/25 p-6 shadow-sm">
              <h3 className="text-xs font-bold font-sans text-[#0D5C75] uppercase tracking-wider mb-4 flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                </svg>
                人文学术生平传记 / CHRONICLE DOSSIER
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-600">
                <div className="bg-[#FAF8F5] rounded-lg p-3.5 border border-[#D4AF37]/15">
                  <span className="text-[9px] font-bold font-sans uppercase tracking-wider text-[#D4AF37] block mb-1">学派</span>
                  {philosopher.school}
                </div>
                <div className="bg-[#FAF8F5] rounded-lg p-3.5 border border-[#D4AF37]/15">
                  <span className="text-[9px] font-bold font-sans uppercase tracking-wider text-[#D4AF37] block mb-1">学术定位</span>
                  {"★".repeat(philosopher.rating)}{"☆".repeat(5 - philosopher.rating)} {ratingLabels[philosopher.rating]}
                </div>
                {philosopher.century && (
                  <div className="bg-[#FAF8F5] rounded-lg p-3.5 border border-[#D4AF37]/15">
                    <span className="text-[9px] font-bold font-sans uppercase tracking-wider text-[#D4AF37] block mb-1">活跃时期</span>
                    {philosopher.century}
                  </div>
                )}
              </div>
            </div>

            {/* Quote */}
            <div className="relative bg-gradient-to-r from-[#FAF8F5] to-[#F5F2EA] rounded-xl border border-[#D4AF37]/25 p-8 shadow-sm">
              <div className="absolute top-2 left-4 text-6xl text-[#D4AF37]/20 font-serif leading-none">"</div>
              <blockquote className="relative text-sm text-gray-700 italic leading-relaxed text-center font-serif max-w-2xl mx-auto">
                “ {quote} ”
              </blockquote>
              <p className="text-[9px] text-center text-gray-400 mt-3 font-sans uppercase tracking-wider">
                * 哲学核心原点箴言 / STANDPOINT
              </p>
            </div>

            {/* Historical Influence */}
            <div className="bg-white rounded-xl border border-[#D4AF37]/25 p-6 shadow-sm">
              <h3 className="text-xs font-bold font-sans text-[#0D5C75] uppercase tracking-wider mb-3 flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                思想史伟业与其历史影响 / HISTORICAL INFLUENCE
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                {philosopher.summary
                  ? `${philosopher.chineseName}${philosopher.summary}其学说深刻地塑造了人类文明史、理性论争和生命道德的方向，在今天的时代依然充满着不竭的理智力量与启示之光。`
                  : `${philosopher.chineseName}（${philosopher.englishName}）作为${philosopher.school}的代表人物，在西方哲学史上占据着举足轻重的地位。其思想对后世产生了深远的影响。`
                }
              </p>
            </div>

            {/* Connections */}
            <div className="bg-white rounded-xl border border-[#D4AF37]/25 p-6 shadow-sm">
              <h3 className="text-xs font-bold font-sans text-[#0D5C75] uppercase tracking-wider mb-3 flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                思想谱系传续与批判论辩 / PANTHEON LINEAGES
              </h3>
              <p className="text-xs text-gray-500 italic mb-4">
                以下哲学家与{philosopher.chineseName}存在学术传承或思想交锋关系：
              </p>
              {philosopher.connections && philosopher.connections.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {philosopher.connections.map((connectionId) => {
                    // We don't have the full philosopher list here, so show placeholder
                    return (
                      <span key={connectionId} className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#D4AF37]/25 bg-gold/5 text-[10px] text-aegean/80">
                        {connectionId}
                      </span>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs text-gray-400 italic">
                  暂无详细的师承关系数据。
                </p>
              )}
            </div>

            {/* Back button */}
            <div className="text-center pt-4 pb-8">
              <button
                onClick={onBack}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#FAF8F5] hover:bg-white text-[#0D5C75] text-xs font-bold font-serif border border-[#D4AF37] rounded-lg shadow-xs tracking-wider uppercase transition-all duration-250 cursor-pointer"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <path d="M19 12H5" /><polyline points="12 19 5 12 12 5" />
                </svg>
                返回主图谱长河
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
