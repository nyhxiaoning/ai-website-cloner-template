export interface Book {
  id: string;
  title: string;
  author: string;
  summary?: string;
  tags: string[];
  status: "read" | "reading" | "wishlist";
  ownership: ("ebook" | "physical")[];
  year: number;
  blogUrl?: string;
  notesReady: boolean;
  cover?: string;
  purchases?: Purchase[];
}

export interface Purchase {
  id: number;
  price: number;
  platform: string;
  year: number;
  month: number;
}

export interface PurchaseStats {
  count: number;
  totalPrice: number;
  totalPriceCents: number;
  pricedRecords: number;
  bundleCount: number;
}

export interface Config {
  labels: {
    views: Record<string, string>;
    ownership: Record<string, string>;
  };
  homeIntro: {
    quotes: [string, string][];
  };
  homeModules: string[];
}

export interface Snapshot {
  payload: {
    books: Book[];
    purchaseStats: PurchaseStats;
  };
  config: Config;
  version: { version: string; updatedAt: string };
  checkedAt: number;
}

export type ThemeId =
  | "github-light"
  | "vscode-dark"
  | "monokai"
  | "dracula"
  | "solarized-light"
  | "night-owl";

export type ViewMode = "all" | "read" | "reading" | "wishlist" | "owned" | "purchased";

export const THEME_LABELS: Record<ThemeId, string> = {
  "github-light": "GitHub Light",
  "vscode-dark": "VS Code Dark",
  monokai: "Monokai",
  dracula: "Dracula",
  "solarized-light": "Solarized Light",
  "night-owl": "Night Owl",
};

export const VIEW_LABELS: Record<string, string> = {
  read: "读过",
  reading: "在读",
  wishlist: "想读",
  owned: "已拥有",
  purchased: "已购买",
};

export const OWNERSHIP_LABELS: Record<string, string> = {
  ebook: "电子书",
  physical: "实体书",
};