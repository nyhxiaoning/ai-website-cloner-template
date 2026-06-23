// TypeScript interfaces for the Journey to the West clone
export interface Tribulation {
  id: number;
  emoji: string;
  name: string;
  description: string;
  lat: number;
  lng: number;
  gradient: string;
}

export interface RouteOverview {
  startPoint: string;
  endPoint: string;
  totalDistance: string;
  totalStations: number;
  achievement: string;
}

export interface CharacterInfo {
  name: string;
  emoji: string;
  description: string;
  svg: string;
  gradient: string;
}

export interface CulturalSignificance {
  title: string;
  items: CulturalItem[];
}

export interface CulturalItem {
  icon: string;
  title: string;
  description: string;
}

export type TabView = 'map' | 'timeline' | 'mindmap' | 'support';
