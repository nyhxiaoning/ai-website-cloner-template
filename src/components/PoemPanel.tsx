"use client";

import { cn } from "@/lib/utils";
import type { Poem } from "@/types";

export interface PoemPanelProps {
  poem: Poem;
  onClose: () => void;
  onShare: () => void;
  onCinema: () => void;
  onSave: () => void;
}

export function PoemPanel({
  poem,
  onClose,
  onShare,
  onCinema,
  onSave,
}: PoemPanelProps) {
  const copyIndex = () => {
    navigator.clipboard.writeText(poem.fullIndex);
  };

  return (
    <div className="poem-panel">
      <button className="panel-close" aria-label="关闭" onClick={onClose}>
        ×
      </button>
      <div className="poem-body" lang="zh">
        {poem.lines.map((line, i) => (
          <div key={i} className="poem-line">
            {line}
          </div>
        ))}
      </div>
      <div className="poem-meta">
        <div className="meta-row">
          <span className="meta-k">诗体</span>
          <span className="meta-v">{poem.form.label}</span>
        </div>
        <div className="meta-row col">
          <span className="meta-k">
            全集编号
            <span className="meta-sub">唯一 · 跨诗体 · {poem.fullIndex.length} 位</span>
            <button className="copy-btn" title="复制完整编号" onClick={copyIndex}>
              复制
            </button>
          </span>
          <span
            className="meta-v idx full"
            title="193 位十进制 · 反查请到「编号反查」"
          >
            {poem.fullIndex}
          </span>
        </div>
        <div className="meta-row">
          <span className="meta-k">格律编号</span>
          <span className="meta-v muted">
            {poem.isMetered ? poem.meterIndex : "非格律 · 虚空目录"}
          </span>
        </div>
      </div>
      <div className="poem-foot">
        这首诗一直在诗云里，编号 {poem.fullIndex.length} 位长 —— 地址几乎和诗本身一样长。
        <div className="poem-share">
          <button className="copy-btn share" title="复制可分享的链接" onClick={onShare}>
            分享
          </button>
          <button className="cinema-btn" title="把这首诗框成一张可截图分享的卡片" onClick={onCinema}>
            留影
          </button>
          <button
            className={cn("cinema-btn shiyi")}
            title="把这首从虚空捞起的诗收进拾遗,稍后还能再找到它"
            onClick={onSave}
          >
            收进拾遗
          </button>
        </div>
      </div>
    </div>
  );
}
