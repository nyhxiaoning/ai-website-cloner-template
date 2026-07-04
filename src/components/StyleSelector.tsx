"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const styleOptions = [
  { emoji: "🥰", title: "Q版可爱", description: "圆润可爱的Q版风格，大头小身体" },
  { emoji: "👾", title: "像素风", description: "复古像素游戏风格" },
  { emoji: "✏️", title: "手绘涂鸦", description: "随性手绘涂鸦风格" },
  { emoji: "🧸", title: "3D毛绒", description: "3D毛绒玩具质感" },
];

export default function StyleSelector() {
  const [selected, setSelected] = useState<string>("Q版可爱");

  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold text-gray-700">选择角色风格</h3>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {styleOptions.map((style) => {
          const isActive = selected === style.title;
          return (
            <button
              key={style.title}
              onClick={() => setSelected(style.title)}
              className={cn(
                "block w-full cursor-pointer rounded-xl p-4 text-left transition-all duration-150",
                isActive
                  ? "border-2 border-amber-400 bg-amber-50 shadow-sm"
                  : "border-2 border-gray-200 bg-white"
              )}
            >
              <div className="mb-1 text-3xl">{style.emoji}</div>
              <div className="text-sm font-semibold text-gray-800">
                {style.title}
              </div>
              <div className="text-xs text-gray-500">{style.description}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
