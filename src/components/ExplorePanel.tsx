"use client";

import { useState, useMemo } from "react";
import { MapIcon } from "./icons";
import PlaceCard, { PlaceCardData } from "./PlaceCard";
import { useAppContext } from "@/lib/AppContext";
import { findProvinceByLocation } from "@/data/provinces";

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
    price: "以官方及预约渠道实时价…",
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
    level: "4A",
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
    level: "4A",
    title: "万岁山武侠城",
    location: "开封市",
    type: "主题乐园",
    trend: "热门",
    description: "以武侠文化为主题的沉浸式体验景区，定期上演武侠实景演出。",
    duration: "1 天",
    price: "票价待确认",
    coverClass: "cover-2",
  },
  {
    level: "4A",
    title: "阿那亚黄金海岸社区",
    location: "秦皇岛市",
    type: "休闲度假",
    trend: "热门",
    description: "以孤独图书馆、阿那亚礼堂等地标建筑闻名的滨海度假社区。",
    duration: "1–2 天",
    price: "入园及场馆政策以阿那亚…",
    coverClass: "cover-3",
  },
  {
    level: "4A",
    title: "安吉云上草原",
    location: "湖州市",
    type: "休闲度假",
    trend: "热门",
    description: "海拔千米的高山草原度假区，悬崖秋千、云海栈道与四季玩法使其成为江浙沪小红书暑期避暑热门目的地。",
    duration: "1 天",
    price: "以官方及预约渠道实时价…",
    coverClass: "cover-0",
  },
  {
    level: "4A",
    title: "北京环球度假区",
    location: "通州区",
    type: "休闲度假",
    trend: "热门",
    description: "由环球影城主题公园、北京环球城市大道和度假酒店组成，以哈利·波特、变形金刚、小黄人等电影主题沉浸体验闻名。",
    duration: "1 天",
    price: "实行指定日票价，以官方…",
    coverClass: "cover-1",
  },
  {
    level: "4A",
    title: "潮州牌坊街",
    location: "潮州市",
    type: "人文古迹",
    trend: "热门",
    description: "潮州古城核心步行街，密集石牌坊与骑楼商铺并存，工夫茶、非遗与夜游内容使其成为粤东小红书热门打卡地。",
    duration: "2–4 小时",
    price: "街区免费",
    coverClass: "cover-2",
  },
  {
    level: "4A",
    title: "大唐不夜城",
    location: "西安市",
    type: "城市地标",
    trend: "热门",
    description: "大雁塔南侧的盛唐主题步行街区，灯光秀、实景演艺与汉服旅拍使其长期占据小红书西安夜游热门榜。",
    duration: "2–4 小时",
    price: "街区免费，部分场馆与主…",
    coverClass: "cover-3",
  },
  {
    level: "4A",
    title: "凤凰古城",
    location: "湘西土家族苗族自治州",
    type: "人文古迹",
    trend: "热门",
    description: "沱江两岸保存吊脚楼、城楼与石板街的历史文化名城。",
    duration: "1–2 天",
    price: "票价待确认",
    coverClass: "cover-0",
  },
  {
    level: "4A",
    title: "哈尔滨冰雪大世界",
    location: "哈尔滨市",
    type: "人文古迹",
    trend: "热门",
    description: "以大型冰雪建筑、冰雕艺术和冬季娱乐项目闻名的季节性主题景区。",
    duration: "4–6 小时",
    price: "票价待确认",
    coverClass: "cover-1",
  },
  {
    level: "4A",
    title: "洪崖洞民俗风貌区",
    location: "渝中区",
    type: "人文古迹",
    trend: "热门",
    description: "依山临江而建的吊脚楼建筑群，集中展现山城街巷风貌。",
    duration: "2–3 小时",
    price: "票价待确认",
    coverClass: "cover-2",
  },
  {
    level: "4A",
    title: "基诺山雨林徒步",
    location: "西双版纳傣族自治州",
    type: "自然名胜",
    trend: "热门",
    description: "融合热带雨林穿越、溯溪与基诺族文化体验的向导型户外项目，近年来在亲子与轻探险人群中快速走红。",
    duration: "1 天",
    price: "线路与服务价格不同，以…",
    coverClass: "cover-3",
  },
  {
    level: "4A",
    title: "李子坝单轨穿楼观景平台",
    location: "渝中区",
    type: "城市地标",
    trend: "热门",
    description: "轨道交通 2 号线列车穿楼而过的城市奇观观景点，是重庆「8D 魔幻」影像与小红书打卡的标志机位。",
    duration: "30–60 分钟",
    price: "免费（乘坐轻轨需另购交…",
    coverClass: "cover-0",
  },
  {
    level: "4A",
    title: "良渚文化艺术中心（大屋顶）",
    location: "杭州市",
    type: "文化场馆",
    trend: "热门",
    description: "安藤忠雄设计的清水混凝土文化建筑，以标志性大屋顶、光影空间与春日樱景成为杭州小红书热门打卡地。",
    duration: "1–2 小时",
    price: "公共空间多免费，展览与…",
    coverClass: "cover-1",
  },
  {
    level: "4A",
    title: "上海迪士尼度假区",
    location: "浦东新区",
    type: "休闲度假",
    trend: "热门",
    description: "中国内地首座迪士尼度假区，拥有奇幻童话城堡、疯狂动物城、加勒比海盗等主题园区与大型巡游演出。",
    duration: "1–2 天",
    price: "实行指定日票价，以官方…",
    coverClass: "cover-2",
  },
  {
    level: "4A",
    title: "武康路历史文化街区",
    location: "徐汇区",
    type: "城市地标",
    trend: "热门",
    description: "汇集武康大楼、名人故居与历史建筑的城市漫步街区，是上海 Citywalk 与梧桐美学的代表路线。",
    duration: "2–4 小时",
    price: "街区免费，部分场馆另行…",
    coverClass: "cover-3",
  },
];

const RATING_FILTERS = ["全部等级", "5A", "4A", "3A"];
const TYPE_FILTERS = ["全部", "人文古迹", "自然名胜", "博物馆", "主题乐园", "文化场馆", "休闲度假", "城市地标"];

export default function ExplorePanel() {
  const [activeRating, setActiveRating] = useState("全部等级");
  const [activeType, setActiveType] = useState("全部");
  const { selectedProvince } = useAppContext();

  // Filter cards by province
  const filteredCards = useMemo(() => {
    if (!selectedProvince) return CARDS_DATA;
    return CARDS_DATA.filter((card) => {
      const province = findProvinceByLocation(card.location);
      return province?.id === selectedProvince.id;
    });
  }, [selectedProvince]);

  // Apply rating/type filters on top of province filter
  const displayCards = useMemo(() => {
    let cards = filteredCards;
    if (activeRating !== "全部等级") {
      cards = cards.filter((c) => c.level === activeRating);
    }
    if (activeType !== "全部") {
      cards = cards.filter((c) => c.type === activeType);
    }
    return cards;
  }, [filteredCards, activeRating, activeType]);

  const totalCount = filteredCards.length;
  const displayCount = displayCards.length;
  const headingText = selectedProvince ? `${selectedProvince.fullName} · 精选` : "今日精选";
  const countLabel = selectedProvince ? `${totalCount} 处` : "11,850 处";

  return (
    <aside className="explore-panel glass">
      {/* Header */}
      <div className="panel-header">
        <div>
          <p className="panel-overline">{selectedProvince ? selectedProvince.fullName : "全国探索"}</p>
          <h2>{headingText}</h2>
        </div>
        <span className="result-count">{countLabel}</span>
      </div>

      <p className="map-link-hint">
        <MapIcon />
        {selectedProvince ? `点击景点查看${selectedProvince.name}详情` : "点击景点查看详情"}
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
        {displayCards.length > 0 ? (
          displayCards.map((card, i) => (
            <PlaceCard key={i} card={card} />
          ))
        ) : (
          <div className="empty-state">
            {selectedProvince
              ? `${selectedProvince.fullName}暂无收录景点`
              : "暂无收录景点"}
          </div>
        )}
        {displayCards.length > 0 && (
          <button type="button" className="load-more">
            加载更多<small>{displayCount} / 11,850</small>
          </button>
        )}
      </div>
    </aside>
  );
}