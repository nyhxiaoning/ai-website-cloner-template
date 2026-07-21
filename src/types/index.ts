export interface Place {
  id: string;
  name: string;
  location: string;
  category: PlaceCategory;
  rating: PlaceRating;
  description: string;
  duration: string;
  price: string;
  coverIndex: number;
  reactions: number;
  isHot: boolean;
  isVisited: boolean;
  isLiked: boolean;
}

export type PlaceRating = "5A" | "4A" | "3A" | "未评级";

export type PlaceCategory =
  | "人文古迹"
  | "自然名胜"
  | "博物馆"
  | "主题乐园"
  | "文化场馆"
  | "休闲度假"
  | "城市地标";

export type SortOption = "综合推荐" | "热门优先" | "等级优先" | "省时优先";

export interface ExploreFilters {
  rating: PlaceRating | "全部等级";
  category: PlaceCategory | "全部";
  sort: SortOption;
}

export interface Province {
  id: string;
  name: string;
  fullName: string;
  cities: City[];
  coverage: "complete" | "partial" | "none";
}

export interface City {
  id: string;
  name: string;
  places: Place[];
}