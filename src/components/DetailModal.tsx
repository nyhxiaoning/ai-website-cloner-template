'use client';

import { useEffect } from "react";
import { timelineData } from "@/data/timeline-data";
import { tribulations } from "@/data/tribulations";

interface DetailModalProps {
  selectedIndex: number;
  onClose: () => void;
  onPrev: (() => void) | null;
  onNext: (() => void) | null;
  viewType?: "map" | "timeline";
}

export default function DetailModal({
  selectedIndex,
  onClose,
  onPrev,
  onNext,
}: DetailModalProps) {
  const detail =
    selectedIndex >= 0 && selectedIndex < timelineData.length
      ? timelineData[selectedIndex]
      : null;
  const marker =
    selectedIndex >= 0 && selectedIndex < tribulations.length
      ? tribulations[selectedIndex]
      : null;

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
      if (e.key === "ArrowRight" && onNext) onNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onPrev, onNext]);

  if (!detail) return null;

  const isIntro = selectedIndex === 0;
  const gradient = marker?.gradient || "from-orange-400 to-red-500";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto animate-in"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "fadeInUp 0.3s ease-out" }}
      >
        {/* Header banner */}
        <div
          className={`bg-gradient-to-br ${gradient} p-6 rounded-t-3xl text-white relative overflow-hidden`}
        >
          {/* Decorative circles */}
          <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10" />
          <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white/10" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-all text-lg"
          >
            ✕
          </button>

          <div className="flex items-center gap-4 relative z-10">
            {/* Large emoji */}
            <div className="w-20 h-20 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-4xl shadow-lg border-4 border-white/50 shrink-0">
              {detail.emoji}
            </div>
            <div className="flex-1 min-w-0">
              {!isIntro && (
                <div className="inline-block bg-white/25 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold mb-2">
                  第{detail.id}难
                </div>
              )}
              <h2 className="text-2xl font-bold leading-tight">{detail.title}</h2>
              <p className="text-white/80 text-sm mt-1">{detail.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Content body */}
        <div className="p-6">
          {/* Description */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 mb-5 border border-orange-100">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
              📖 故事详情
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              {detail.description}
            </p>
          </div>

          {/* Tags */}
          <div className="mb-5">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
              🏷️ 关键词
            </h3>
            <div className="flex flex-wrap gap-2">
              {detail.tags.map((tag, ti) => (
                <span
                  key={ti}
                  className={`bg-gradient-to-r ${
                    ti % 2 === 0
                      ? "from-red-400 to-orange-400"
                      : "from-orange-400 to-yellow-500"
                  } text-white px-4 py-1.5 rounded-full text-xs font-medium shadow-sm`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Location info */}
          {marker && (
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 mb-5 border border-blue-100">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">
                📍 地理位置
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span>
                  纬度: {marker.lat.toFixed(2)}°, 经度:{" "}
                  {marker.lng.toFixed(2)}°
                </span>
              </div>
            </div>
          )}

          {/* Share / info footer */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-100">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">
              💡 小知识
            </h3>
            <p className="text-gray-600 text-xs leading-relaxed">
              {isIntro
                ? "长安城是唐朝的都城，也是玄奘法师西行取经的起点。这里是当时世界上最大的都市之一。"
                : `第${detail.id}难是唐僧师徒西行取经路上的重要考验之一。这一段故事展现了${detail.tags[0]}的主题。`}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
            <button
              onClick={onPrev || undefined}
              disabled={!onPrev}
              className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white rounded-full transition-all duration-300 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-md disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ← 上一难
            </button>
            <span className="text-xs text-gray-400 font-medium">
              {selectedIndex + 1} / {tribulations.length}
            </span>
            <button
              onClick={onNext || undefined}
              disabled={!onNext}
              className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white rounded-full transition-all duration-300 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-md disabled:opacity-30 disabled:cursor-not-allowed"
            >
              下一难 →
            </button>
          </div>
        </div>
      </div>

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
