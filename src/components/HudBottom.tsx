"use client";

export interface HudBottomProps {
  speed: number;
  velocity: number;
}

export function HudBottom({ speed, velocity }: HudBottomProps) {
  return (
    <div className="hud-bottom">
      <span className="hint">
        WASD 飞行 · 拖拽转向 · 滚轮调速 ·{" "}
        <b>点诗星</b>
        看其真作 · <b>点虚空</b>
        从噪声里捞诗
      </span>
      <span className="speed">
        速度 ×{speed.toFixed(2)} · {velocity} 单位/秒
      </span>
    </div>
  );
}
