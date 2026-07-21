"use client";

import { useState } from "react";
import {
  SearchIcon,
  FootprintsIcon,
  HeartIcon,
  UserIcon,
  MoonIcon,
  SettingsIcon,
} from "./icons";

export default function TopBar() {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="topbar glass">
      {/* Brand */}
      <button className="brand">
        <img
          className="brand-mark"
          src="/images/app-icon.png"
          alt=""
          width={39}
          height={39}
        />
        <span>
          <strong>华夏迹</strong>
          <small>山河有迹，文明有声</small>
        </span>
      </button>

      {/* Search */}
      <div className={`search-wrap ${searchFocused ? "focused" : ""}`}>
        <SearchIcon className="search-icon" />
        <input
          type="text"
          placeholder="搜索景点、省份或城市"
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
      </div>

      {/* Actions */}
      <div className="top-actions">
        <button className="footprint-count">
          <FootprintsIcon />
          <span>0</span>
        </button>
        <button className="collection-count" aria-label="打开我的备选，共0处">
          <HeartIcon />
          <span>收藏</span>
          <b>0</b>
        </button>
        <button className="account-button">
          <UserIcon />
          <span>登录</span>
        </button>
        <button className="icon-button desktop-only-action" aria-label="切换至 English">
          EN
        </button>
        <button className="icon-button desktop-only-action" aria-label="切换深色模式">
          <MoonIcon />
        </button>
        <div className="mobile-menu-wrap">
          <button className="icon-button mobile-menu-trigger" aria-label="更多设置">
            <SettingsIcon />
          </button>
        </div>
      </div>
    </header>
  );
}
