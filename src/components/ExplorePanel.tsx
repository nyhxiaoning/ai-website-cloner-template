"use client";

import { useState } from "react";
import { MapIcon } from "./icons";
import PlaceCard, { PlaceCardData } from "./PlaceCard";

const CARDS_DATA: PlaceCardData[] = [
  {
    level: "5A",
    title: "禅意小镇·拈花湾",
    location: "无锡市",
    type: "休闲度假",
    trend: "热门",
    description: "以太湖马山为依托的唐风禅意文旅小镇，香月花街、夜游光影与汉服旅拍长期占据江浙沪周边游热门。",
    duration: "1–2 天",
    price: "以官方及预约渠道实时价…",
    coverClass: "cover-0",
  },
  {
    level: "5A",
    title: "恩施大峡谷",
    location: "恩施土家族苗族自治州",
    type: "自然名胜",
    trend: "热门",
    description: "拥有绝壁、峰柱、天坑与地缝等喀斯特地貌景观。",
    duration: "1 天",
    price: "票价待确认",
    coverClass: "cover-1",
  },
  {
    level: "5A",
    title: "横店影视城",
    location: "金华市",
    type: "人文古迹",
    trend: "热门",
    description: "由多座大型影视拍摄基地组成，可体验不同历史时期的建筑与影视文化。",
    duration: "1–2 天",
    price: "票价待确认",
    coverClass: "cover-2",
  },
  {
    level: "5A",
    title: "喀纳斯景区",
    location: "阿勒泰地区",
    type: "自然名胜",
    trend: "热门",
    description: "阿尔泰山深处的高山湖泊与森林景区，以湖色变化、秋林和图瓦村落闻名。",
    duration: "1–2 天",
    price: "票价待确认",
    coverClass: "cover-3",
  },
  {
    level: "5A",
    title: "喀什古城景区",
    location: "喀什地区",
    type: "人文古迹",
    trend: "热门",
    description: "保存传统街巷、民居与手工艺空间，是南疆历史文化和城市生活的重要载体。",
    duration: "半天–1 天",
    price: "票价待确认",
    coverClass: "cover-0",
  },
  {
    level: "5A",
    title: "老君山景区",
    location: "洛阳市",
    type: "自然名胜",
    trend: "热门",
    description: "伏牛山脉主峰，以金顶道观群、云海与冬雪景观著称。",
    duration: "1 天",
    price: "票价待确认",
    coverClass: "cover-1",
  },
  {
    level: "5A",
    title: "那拉提旅游风景区",
    location: "伊犁哈萨克自治州",
    type: "自然名胜",
    trend: "热门",
    description: "天山腹地的高山草原，以河谷、雪山和哈萨克牧民文化闻名。",
    duration: "1–2 天",
    price: "票价待确认",
    coverClass: "cover-2",
  },
  {
    level: "5A",
    title: "清明上河园",
    location: "开封市",
    type: "人文古迹",
    trend: "热门",
    description: "以北宋张择端《清明上河图》为蓝本的大型宋代文化主题公园。",
    duration: "1 天",
    price: "票价待确认",
    coverClass: "cover-3",
  },
  {
    level: "5A",
    title: "赛里木湖景区",
    location: "博尔塔拉蒙古自治州",
    type: "自然名胜",
    trend: "热门",
    description: "天山西部高山湖泊，以湖水澄澈、雪山环绕和花海著称。",
    duration: "1 天",
    price: "票价待确认",
    coverClass: "cover-0",
  },
  {
    level: "5A",
    title: "茶卡盐湖景区",
    location: "海西蒙古族藏族自治州",
    type: "自然名胜",
    trend: "热门",
    description: "柴达木盆地的天然结晶盐湖，以「天空之镜」景观闻名。",
    duration: "1 天",
    price: "票价待确认",
    coverClass: "cover-1",
  },
  {
    level: "5A",
    title: "万岁山武侠城",
    location: "开封市",
    type: "主题乐园",
    trend: "热门",
    description: "以武侠文化为主题的沉浸式体验景区，定期上演武侠实景演出。",
    duration: "半天–1 天",
    price: "票价待确认",
    coverClass: "cover-2",
  },
  {
    level: "5A",
    title: "阿那亚黄金海岸社区",
    location: "秦皇岛市",
    type: "休闲度假",
    trend: "热门",
    description: "以孤独图书馆、阿那亚礼堂等地标建筑闻名的滨海度假社区。",
    duration: "1–2 天",
    price: "票价待确认",
    coverClass: "cover-3",
  },
  {
    level: "5A",
    title: "安吉云上草原",
    location: "湖州市",
    type: "自然名胜",
    trend: "热门",
    description: "高山草甸与户外运动结合的度假区，以云海、玻璃栈道和滑草体验著称。",
    duration: "1 天",
    price: "票价待确认",
    coverClass: "cover-0",
  },
  {
    level: "5A",
    title: "北京环球度假区",
    location: "通州区",
    type: "主题乐园",
    trend: "热门",
    description: "环球影城在中国的首个主题公园，包含七大主题景区和两家度假酒店。",
    duration: "1–2 天",
    price: "票价待确认",
    coverClass: "cover-1",
  },
  {
    level: "5A",
    title: "潮州牌坊街",
    location: "潮州市",
    type: "人文古迹",
    trend: "热门",
    description: "保存完好的骑楼街道与石牌坊群，是潮州历史文化的缩影。",
    duration: "半天–1 天",
    price: "免费开放",
    coverClass: "cover-2",
  },
  {
    level: "5A",
    title: "大唐不夜城",
    location: "西安市",
    type: "文化场馆",
    trend: "热门",
    description: "以盛唐文化为主题的步行街，以灯光、演出和互动体验吸引游客。",
    duration: "半天–1 天",
    price: "免费开放",
    coverClass: "cover-3",
  },
  {
    level: "5A",
    title: "凤凰古城",
    location: "湘西土家族苗族自治州",
    type: "人文古迹",
    trend: "热门",
    description: "沈从文笔下的湘西边城，以吊脚楼、沱江和苗族文化闻名。",
    duration: "1–2 天",
    price: "票价待确认",
    coverClass: "cover-0",
  },
  {
    level: "5A",
    title: "哈尔滨冰雪大世界",
    location: "哈尔滨市",
    type: "主题乐园",
    trend: "热门",
    description: "全球最大的冰雪主题乐园，以巨型冰雕、灯光秀和冰雪娱乐项目著称。",
    duration: "半天–1 天",
    price: "票价待确认",
    coverClass: "cover-1",
  },
  {
    level: "5A",
    title: "洪崖洞民俗风貌区",
    location: "渝中区",
    type: "人文古迹",
    trend: "热门",
    description: "依山而建的吊脚楼建筑群，以夜景和巴渝民俗文化闻名。",
    duration: "半天",
    price: "免费开放",
    coverClass: "cover-2",
  },
  {
    level: "5A",
    title: "基诺山雨林徒步",
    location: "西双版纳傣族自治州",
    type: "自然名胜",
    trend: "热门",
    description: "热带雨林徒步体验，以基诺族文化和原始森林生态为特色。",
    duration: "半天–1 天",
    price: "票价待确认",
    coverClass: "cover-3",
  },
];

const RATING_FILTERS = ["全部等级", "5A", "4A", "3A"];
const TYPE_FILTERS = ["全部", "人文古迹", "自然名胜", "博物馆", "主题乐园", "文化场馆", "休闲度假", "城市地标"];

export default function ExplorePanel() {
  const [activeRating, setActiveRating] = useState("全部等级");
  const [activeType, setActiveType] = useState("全部");

  return (
    <aside className="explore-panel glass">
      {/* Header */}
      <div className="panel-header">
        <div>
          <p className="panel-overline">全国探索</p>
          <h2>今日精选</h2>
        </div>
        <span className="result-count">11,850 处</span>
      </div>

      <p className="map-link-hint">
        <MapIcon />
        点击景点查看详情
      </p>

      {/* Coverage note */}
      <div className="coverage-note">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
        <span>14/31 个省级名录达到完整口径</span>
      </div>

      {/* Rating filter */}
      <div className="filter-group" role="group" aria-label="景区等级筛选">
        {RATING_FILTERS.map((f) => (
          <button
            key={f}
            className={activeRating === f ? "active" : ""}
            onClick={() => setActiveRating(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Type chips */}
      <div className="category-chips" role="group" aria-label="景点类型筛选">
        {TYPE_FILTERS.map((f) => (
          <button
            key={f}
            className={activeType === f ? "active" : ""}
            onClick={() => setActiveType(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Sort row */}
      <div className="list-divider">
        <span>推荐目的地</span>
        <label>
          <span className="sr-only">排序</span>
          <select>
            <option>综合推荐</option>
            <option>热门优先</option>
            <option>等级优先</option>
            <option>省时优先</option>
          </select>
        </label>
      </div>

      {/* Card list */}
      <div className="place-list">
        {CARDS_DATA.map((card, i) => (
          <PlaceCard key={i} card={card} />
        ))}
        <button type="button" className="load-more">
          加载更多<small>24 / 11,850</small>
        </button>
      </div>
    </aside>
  );
}
