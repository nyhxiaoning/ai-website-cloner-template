'use client';

import { useState } from "react";
import { timelineData } from "@/data/timeline-data";
import { tribulations } from "@/data/tribulations";
import DetailModal from "@/components/DetailModal";

export default function TimelineView() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  return (
    <div className="relative h-[750px]">
      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-cyan-50 p-6 overflow-y-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            📜 取经时间轴
          </h2>
          <p className="text-gray-600 text-sm">
            师徒四人的西行求法之路
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-6xl mx-auto">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-red-400 via-orange-400 to-teal-500 rounded-full shadow-lg transform -translate-x-1/2" />

          <div className="space-y-16">
            {timelineData.map((item, index) => {
              const isLeft = index % 2 === 0;
              const isIntro = item.id === 0;
              const cardBorder = isLeft ? "border-blue-400" : "border-teal-400";

              return (
                <div
                  key={index}
                  className="relative flex items-center justify-center min-h-[120px]"
                >
                  {/* Center marker */}
                  <div
                    className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer hover:scale-110 transition-all duration-300"
                    onClick={() =>
                      setExpandedId(expandedId === index ? null : index)
                    }
                  >
                    <div
                      className={`w-16 h-16 text-2xl rounded-full border-4 border-white flex items-center justify-center shadow-lg transition-all duration-300 bg-gradient-to-br ${item.gradient} ${!isIntro ? "opacity-70" : ""}`}
                    >
                      {item.emoji}
                      {!isIntro && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 text-xs bg-red-500 text-white rounded-full flex items-center justify-center font-bold shadow-md">
                          {item.id}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Connecting line */}
                  <div
                    className={`absolute top-1/2 transform -translate-y-1/2 w-24 h-0.5 ${
                      isLeft
                        ? "left-1/2 bg-gradient-to-l from-gray-400 to-transparent -translate-x-full"
                        : "left-1/2 bg-gradient-to-r from-gray-400 to-transparent translate-x-0"
                    }`}
                  />

                  {/* Card */}
                  <div
                    className={`w-full flex ${
                      isLeft ? "justify-start" : "justify-end"
                    } items-center`}
                  >
                    <div
                      className={`${isLeft ? "pr-32" : "pl-32"} max-w-md w-full`}
                    >
                      <div
                        className={`bg-white rounded-xl shadow-lg p-4 border-l-4 ${cardBorder} hover:shadow-xl transition-all duration-300 cursor-pointer`}
                        onClick={() =>
                          setExpandedId(expandedId === index ? null : index)
                        }
                      >
                        {/* Header row */}
                        <div className="flex items-center gap-3 mb-3">
                          <div
                            className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center text-lg relative shrink-0`}
                          >
                            {item.emoji}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-gray-800 text-lg truncate">
                              {item.title}
                            </h3>
                            <p className="text-gray-600 text-sm truncate">
                              {item.subtitle}
                            </p>
                          </div>
                          {!isIntro && (
                            <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold shrink-0">
                              第{item.id}难
                            </div>
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                          {item.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {item.tags.map((tag, ti) => (
                            <span
                              key={ti}
                              className={`bg-gradient-to-r from-red-400 to-orange-400 text-white px-2 py-1 rounded-full text-xs font-medium`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* CTA */}
                        <div className="mt-3 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setModalIndex(index);
                            }}
                            className="text-teal-600 text-xs font-medium hover:text-teal-800 transition-colors"
                          >
                            点击查看详情 →
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats footer */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <div className="grid grid-cols-4 gap-4 text-center">
              {[
                { label: "主要地点", value: "82" },
                { label: "总劫难数", value: "81" },
                { label: "取经年数", value: "14" },
                { label: "完成进度", value: "0%" },
              ].map((stat, i) => (
                <div key={i} className="p-2">
                  <div className="text-2xl font-bold text-gray-800">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-center text-gray-500 text-sm mt-4">
            💡 点击时间轴上的任意地点查看详细故事，或使用&quot;开始取经&quot;按钮观看完整动画
          </p>
        </div>
      </div>

      {/* Detail Modal */}
      {modalIndex !== null && (
        <DetailModal
          selectedIndex={modalIndex}
          onClose={() => setModalIndex(null)}
          onPrev={modalIndex > 0 ? () => setModalIndex(modalIndex - 1) : null}
          onNext={modalIndex < timelineData.length - 1 ? () => setModalIndex(modalIndex + 1) : null}
          viewType="timeline"
        />
      )}
    </div>
  );
}
