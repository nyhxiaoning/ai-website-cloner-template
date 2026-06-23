"use client";

import { cn } from "@/lib/utils";

export interface HudTopProps {
  poetryType: string;
  onPoetryTypeChange: (type: string) => void;
  commonChars: boolean;
  onCommonCharsToggle: () => void;
  metered: boolean;
  onMeteredToggle: () => void;
  onMoreClick: () => void;
  onHideClick: () => void;
  quality: "high" | "low";
  onQualityToggle: () => void;
}

const POETRY_TYPES = ["五绝", "七绝", "五律", "七律", "自由"];

const TYPE_TITLES: Record<string, string> = {
  自由: "词 / 自由诗:任意长度、换行也由编号决定;新诗/古体的编号也在这套目录里",
};

const FILTER_TITLES: Record<string, string> = {
  "常用字": "只用最常见的字,避开生僻乱码",
  "格律": "只捕捉合平仄、押韵的诗（平水韵）",
  "更多": "更多：指引 / 行星 / 赠诗 / 引力 / 关于 / 反馈",
  "画质·低":
    "画质：高=16万粒子+辉光；低=更少粒子、关闭辉光（弱显卡更流畅）",
};

export function HudTop({
  poetryType,
  onPoetryTypeChange,
  commonChars,
  onCommonCharsToggle,
  metered,
  onMeteredToggle,
  onMoreClick,
  onHideClick,
  quality,
  onQualityToggle,
}: HudTopProps) {
  return (
    <div className="hud-top">
      <div className="title" title="诗云 · Poetry Cloud">
        诗云
        <span className="title-en">Poetry Cloud</span>
      </div>
      <div className="seg">
        {POETRY_TYPES.map((type) => (
          <button
            key={type}
            className={cn("seg-btn", type === poetryType && "on")}
            onClick={() => onPoetryTypeChange(type)}
            title={TYPE_TITLES[type] || ""}
          >
            {type}
          </button>
        ))}
      </div>
      <button
        className={cn("filter", commonChars && "on")}
        title={FILTER_TITLES["常用字"]}
        onClick={onCommonCharsToggle}
      >
        常用字
      </button>
      <button
        className={cn("filter", metered && "on")}
        title={FILTER_TITLES["格律"]}
        onClick={onMeteredToggle}
      >
        格律
      </button>
      <button className="filter" title={FILTER_TITLES["更多"]} onClick={onMoreClick}>
        更多
      </button>
      <button
        className="filter"
        title={FILTER_TITLES["画质·低"]}
        onClick={onQualityToggle}
      >
        画质·{quality === "high" ? "高" : "低"}
      </button>
      <span className="stat">32,657 诗人 · 933,857 首</span>
      <button
        className="ui-hide-btn"
        title="隐藏全部界面以便截图 · 快捷键 H 恢复"
        onClick={onHideClick}
      >
        隐藏界面 · H
      </button>
    </div>
  );
}
