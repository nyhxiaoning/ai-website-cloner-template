export interface PoemForm {
  id: string;
  label: string;
}

export interface Poem {
  id: string;
  lines: string[];
  form: PoemForm;
  fullIndex: string;
  meterIndex: string;
  isMetered: boolean;
  isVoid: boolean;
}

export interface Poet {
  id: string;
  name: string;
  dynasty: string;
  poemCount: number;
}

export interface Dynasty {
  id: string;
  name: string;
  color: string;
  visible: boolean;
}

export type PoetryType = "五绝" | "七绝" | "五律" | "七律" | "自由";

export type SearchTab = "诗人" | "寻诗" | "探诗" | "朝代";
