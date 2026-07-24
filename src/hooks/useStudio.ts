import { createContext, useContext } from 'react';
import type { Project, Snippet, Rule, Prompt, GenerationResult } from '@/types';

export interface StudioContextValue {
  projects: Project[];
  activeProject: Project | null;
  activeProjectId: string | null;
  currentView: 'boards' | 'prompt' | 'snippets' | 'rules';
  activeBoardId: string | null;
  activePrompt: Prompt | null;
  libraryPanelOpen: boolean;
  searchQuery: string;

  // Navigations
  setActiveProjectId: (id: string) => void;
  setCurrentView: (view: 'boards' | 'prompt' | 'snippets' | 'rules') => void;
  setActiveBoardId: (id: string | null) => void;
  setActivePromptId: (id: string | null) => void;
  setLibraryPanelOpen: (open: boolean) => void;
  setSearchQuery: (q: string) => void;

  // Project CRUD
  createProject: (name: string, description?: string, tags?: string) => void;
  deleteProject: (id: string) => void;
  renameProject: (id: string, name: string) => void;

  // Board CRUD
  createBoard: (name: string) => void;
  renameBoard: (boardId: string, name: string) => void;
  deleteBoard: (boardId: string) => void;
  addPromptToBoard: (boardId: string, promptId: string) => void;
  removePromptFromBoard: (boardId: string, promptId: string) => void;

  // Prompt CRUD
  createPrompt: (data: Partial<Prompt>) => string;
  updatePrompt: (updated: Prompt) => void;
  deletePrompt: (id: string) => void;

  // Snippet CRUD
  createSnippet: (snippet: Snippet) => void;
  updateSnippet: (snippet: Snippet) => void;
  deleteSnippet: (id: string) => void;

  // Rule CRUD
  createRule: (rule: Rule) => void;
  updateRule: (rule: Rule) => void;
  deleteRule: (id: string) => void;

  // Generation results
  addResult: (promptId: string, imageUrl: string) => void;
  removeResult: (promptId: string, resultId: string) => void;

  // Prompt assembly
  expandPrompt: (prompt: Prompt, snippets: Snippet[], rules: Rule[]) => string;

  // Computed slices for active project
  projectSnippets: Snippet[];
  projectRules: Rule[];
  projectPrompts: Prompt[];
  projectBoards: { id: string; name: string; promptIds: string[] }[];
}

export const StudioContext = createContext<StudioContextValue | null>(null);

export function useStudio() {
  const ctx = useContext(StudioContext);
  if (!ctx) throw new Error('useStudio must be used within <StudioProvider>');
  return ctx;
}
