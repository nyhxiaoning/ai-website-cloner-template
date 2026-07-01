export interface Philosopher {
  id: string;
  chineseName: string;
  englishName: string;
  school: string;
  era: string;
  rating: 1 | 2 | 3 | 4 | 5;
  position: { left: string; top: string };
  coreTenets?: string[];
  summary?: string;
  connections?: string[];
  color?: string;
  century?: string;
}

export interface Era {
  id: string;
  name: string;
  nameEn: string;
  dateRange: string;
  subPeriods: string[];
}

export interface DebatePreset {
  id: string;
  title: string;
  philosopherA: string;
  philosopherB: string;
}
