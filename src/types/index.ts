export type ViewState = 'setup' | 'workspace';

export interface Snippet {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface Rule {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface GenerationResult {
  id: string;
  promptId: string;
  imageUrl: string;
  createdAt: string;
}

export interface Prompt {
  id: string;
  title: string;
  taskLabels: string;
  generationParams: string;
  content: string;
  positive: string;
  negative: string;
  results: GenerationResult[];
  createdAt: string;
  updatedAt: string;
}

export interface Board {
  id: string;
  name: string;
  promptIds: string[];
}

export interface Project {
  id: string;
  name: string;
  boards: Board[];
  prompts: Prompt[];
  snippets: Snippet[];
  rules: Rule[];
  createdAt: string;
}
