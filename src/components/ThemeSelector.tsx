"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

const themeOptions = [
  { emoji: "👋", title: "日常问候", description: "你好、谢谢、再见、早安..." },
  { emoji: "🤪", title: "搞笑沙雕", description: "哈哈哈、笑死、裂开、社死..." },
  { emoji: "💼", title: "职场打工", description: "收到、好的、已阅、加油..." },
  { emoji: "💕", title: "恋爱甜蜜", description: "爱你、想你了、亲亲、抱抱..." },
  { emoji: "🍜", title: "吃货日常", description: "干饭、好饿、奶茶!、加鸡腿..." },
  { emoji: "🎉", title: "节日祝福", description: "新年好、恭喜发财、生日快乐、中秋快乐..." },
];

const MAX_SELECTION = 3;

interface ThemeSelectorProps {
  onSelectionChange?: (selected: string[]) => void;
}

export default function ThemeSelector({ onSelectionChange }: ThemeSelectorProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = useCallback(
    (title: string) => {
      setSelected((prev) => {
        const next = prev.includes(title)
          ? prev.filter((t) => t !== title)
          : prev.length < MAX_SELECTION
            ? [...prev, title]
            : prev;
        onSelectionChange?.(next);
        return next;
      });
    },
    [onSelectionChange]
  );

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700">选择表情主题</h3>
        <p className="text-sm text-gray-500">
          最多选择 {MAX_SELECTION} 个主题，已选 {selected.length}/{MAX_SELECTION}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {themeOptions.map((theme) => {
          const isActive = selected.includes(theme.title);
          return (
            <button
              key={theme.title}
              onClick={() => toggle(theme.title)}
              className={cn(
                "cursor-pointer rounded-xl p-3 text-left transition-all duration-150",
                isActive
                  ? "border-2 border-amber-400 bg-amber-50"
                  : "border-2 border-gray-200 bg-white"
              )}
            >
              <div className="mb-0.5 text-xl">{theme.emoji}</div>
              <div className="text-sm font-semibold text-gray-800">
                {theme.title}
              </div>
              <div className="text-xs text-gray-500">{theme.description}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
