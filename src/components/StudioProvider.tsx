'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { Project, Prompt, Snippet, Rule, GenerationResult } from '@/types';
import { db, projectWithData } from '@/lib/db';
import { StudioContext, type StudioContextValue } from '@/hooks/useStudio';

// ── helpers ─────────────────────────────────────────────────────────────────

let projectSeq = 0;
let promptSeq = 0;
let snippetSeq = 0;
let ruleSeq = 0;
let boardSeq = 0;

function uid(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

function now() {
  return new Date().toISOString();
}

// ── Provider ─────────────────────────────────────────────────────────────────

interface StudioProviderProps {
  children: React.ReactNode;
  initialProjectId?: string;
}

export default function StudioProvider({ children, initialProjectId }: StudioProviderProps) {
  // ── state ──
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProjectId, setActiveProjectIdState] = useState<string | null>(initialProjectId ?? null);
  const [currentView, setCurrentView] = useState<'boards' | 'prompt' | 'snippets' | 'rules'>('boards');
  const [activeBoardId, setActiveBoardId] = useState<string | null>(null);
  const [activePromptId, setActivePromptIdState] = useState<string | null>(null);
  const [libraryPanelOpen, setLibraryPanelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // ── load on mount ──
  useEffect(() => {
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadAll = async () => {
    const raw = await db.projects.toArray();
    const loaded = await Promise.all(raw.map((p) => projectWithData(p.id)));
    setProjects(loaded.filter(Boolean) as Project[]);
  };

  // ── active project / prompt lookups ──
  const activeProject = useMemo(
    () => projects.find((p) => p.id === activeProjectId) ?? null,
    [projects, activeProjectId],
  );

  const activePrompt = useMemo<Prompt | null>(() => {
    if (!activeProject || !activePromptId) return null;
    return (activeProject.prompts.find((p) => p.id === activePromptId) as Prompt | undefined) ?? null;
  }, [activeProject, activePromptId]);

  const projectSnippets = activeProject?.snippets ?? [];
  const projectRules = activeProject?.rules ?? [];
  const projectPrompts = activeProject?.prompts ?? [];
  const projectBoards = activeProject?.boards ?? [];

  // ── Navigations ──
  const setActiveProjectId = useCallback((id: string) => {
    setActiveProjectIdState(id);
    setActiveBoardId(null);
    setActivePromptIdState(null);
    setCurrentView('boards');
  }, []);

  const setActivePromptId = useCallback((id: string | null) => {
    setActivePromptIdState(id);
  }, []);

  // ── Project CRUD ──
  const createProject = useCallback(
    (name: string, _description?: string, _tags?: string) => {
      const id = uid('proj');
      const project: Project = {
        id,
        name,
        boards: [
          { id: uid('board'), name: '默认看板', promptIds: [] },
        ],
        prompts: [],
        snippets: [],
        rules: [],
        createdAt: now(),
      };
      // persist
      db.projects.add({ id: project.id, name: project.name, createdAt: project.createdAt });
      setProjects((prev) => [...prev, project]);
      setActiveProjectId(id);
    },
    [],
  );

  const deleteProject = useCallback((id: string) => {
    db.transaction('rw', [db.projects, db.prompts, db.snippets, db.rules, db.boards], async () => {
      await Promise.all([
        db.projects.delete(id),
        db.prompts.where('_projectId').equals(id).delete(),
        db.snippets.where('_projectId').equals(id).delete(),
        db.rules.where('_projectId').equals(id).delete(),
        db.boards.where('_projectId').equals(id).delete(),
      ]);
    });
    setProjects((prev) => prev.filter((p) => p.id !== id));
    if (activeProjectId === id) {
      setActiveProjectIdState(null);
      setCurrentView('boards');
      setActivePromptIdState(null);
    }
  }, [activeProjectId]);

  const renameProject = useCallback((id: string, name: string) => {
    db.projects.update(id, { name });
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, name } : p)));
  }, []);

  // ── Board CRUD ──
  const reloadProject = useCallback((id: string) => {
    projectWithData(id).then((p) => {
      if (p) {
        setProjects((prev) => {
          const idx = prev.findIndex((x) => x.id === id);
          if (idx < 0) return [...prev, p as Project];
          const next = [...prev];
          next[idx] = p as Project;
          return next;
        });
      }
    });
  }, []);

  const createBoard = useCallback(
    (name: string) => {
      if (!activeProjectId) return;
      const bId = uid('board');
      db.boards.add({ id: bId, name, promptIds: [], _projectId: activeProjectId });
      reloadProject(activeProjectId);
    },
    [activeProjectId, reloadProject],
  );

  const renameBoard = useCallback(
    (boardId: string, name: string) => {
      if (!activeProjectId) return;
      db.boards.update(boardId, { name });
      reloadProject(activeProjectId);
    },
    [activeProjectId, reloadProject],
  );

  const deleteBoard = useCallback(
    (boardId: string) => {
      if (!activeProjectId) return;
      db.boards.delete(boardId);
      reloadProject(activeProjectId);
      if (activeBoardId === boardId) setActiveBoardId(null);
    },
    [activeProjectId, activeBoardId, reloadProject],
  );

  const addPromptToBoard = useCallback(
    (boardId: string, promptId: string) => {
      db.boards.update(boardId, { promptIds: [...(activeProject?.boards.find((b) => b.id === boardId)?.promptIds ?? []), promptId] });
      reloadProject(activeProjectId!);
    },
    [activeProject, activeProjectId, reloadProject],
  );

  const removePromptFromBoard = useCallback(
    (boardId: string, promptId: string) => {
      const board = activeProject?.boards.find((b) => b.id === boardId);
      if (!board) return;
      db.boards.update(boardId, { promptIds: board.promptIds.filter((id) => id !== promptId) });
      reloadProject(activeProjectId!);
    },
    [activeProject, activeProjectId, reloadProject],
  );

  // ── Prompt CRUD ──
  const createPrompt = useCallback(
    (data: Partial<Prompt>): string => {
      if (!activeProjectId) return '';
      const id = uid('prompt');
      const prompt: Prompt = {
        id,
        title: data.title ?? '未命名 Prompt',
        taskLabels: data.taskLabels ?? '',
        generationParams: data.generationParams ?? '',
        content: data.content ?? '',
        positive: data.positive ?? '',
        negative: data.negative ?? '',
        results: data.results ?? [],
        createdAt: now(),
        updatedAt: now(),
      };
      db.prompts.add({ ...prompt, _projectId: activeProjectId } as Parameters<typeof db.prompts.add>[0]);
      reloadProject(activeProjectId);
      return id;
    },
    [activeProjectId, reloadProject],
  );

  const updatePrompt = useCallback(
    (updated: Prompt) => {
      db.prompts.update(updated.id, {
        title: updated.title,
        taskLabels: updated.taskLabels,
        generationParams: updated.generationParams,
        content: updated.content,
        positive: updated.positive,
        negative: updated.negative,
        results: updated.results,
        updatedAt: now(),
      });
      // optimistic update
      setProjects((prev) =>
        prev.map((p) => {
          const pid = (updated as Prompt & { projectId?: string }).projectId;
          return !pid || p.id === pid
            ? { ...p, prompts: p.prompts.map((pr) => (pr.id === updated.id ? { ...pr, ...updated, updatedAt: now() } : pr)) }
            : p;
        }),
      );
      reloadProject(activeProjectId!);
    },
    [activeProjectId, reloadProject],
  );

  const deletePrompt = useCallback(
    (id: string) => {
      db.prompts.delete(id);
      // remove from boards
      if (activeProjectId) {
        const boards = activeProject?.boards ?? [];
        boards.forEach((b) => {
          if (b.promptIds.includes(id)) {
            db.boards.update(b.id, { promptIds: b.promptIds.filter((pid) => pid !== id) });
          }
        });
      }
      reloadProject(activeProjectId!);
      setActivePromptIdState(null);
    },
    [activeProject, activeProjectId, reloadProject],
  );

  // ── Snippet CRUD ──
  const createSnippet = useCallback(
    (snippet: Snippet) => {
      if (!activeProjectId) return;
      db.snippets.put({ ...snippet, _projectId: activeProjectId });
      reloadProject(activeProjectId);
    },
    [activeProjectId, reloadProject],
  );

  const updateSnippet = useCallback(
    (snippet: Snippet) => {
      if (!activeProjectId) return;
      db.snippets.update(snippet.id, { title: snippet.title, content: snippet.content });
      reloadProject(activeProjectId);
    },
    [activeProjectId, reloadProject],
  );

  const deleteSnippet = useCallback(
    (id: string) => {
      db.snippets.delete(id);
      reloadProject(activeProjectId!);
    },
    [activeProjectId, reloadProject],
  );

  // ── Rule CRUD ──
  const createRule = useCallback(
    (rule: Rule) => {
      if (!activeProjectId) return;
      db.rules.put({ ...rule, _projectId: activeProjectId });
      reloadProject(activeProjectId);
    },
    [activeProjectId, reloadProject],
  );

  const updateRule = useCallback(
    (rule: Rule) => {
      if (!activeProjectId) return;
      db.rules.update(rule.id, { title: rule.title, content: rule.content });
      reloadProject(activeProjectId);
    },
    [activeProjectId, reloadProject],
  );

  const deleteRule = useCallback(
    (id: string) => {
      db.rules.delete(id);
      reloadProject(activeProjectId!);
    },
    [activeProjectId, reloadProject],
  );

  // ── Results ──
  const addResult = useCallback(
    (promptId: string, imageUrl: string) => {
      const result = { id: uid('res'), promptId, imageUrl, createdAt: now() };
      const prompt = activeProject?.prompts.find((p) => p.id === promptId);
      if (prompt) {
        db.prompts.update(promptId, { results: [...prompt.results, result] });
        reloadProject(activeProjectId!);
      }
    },
    [activeProject, activeProjectId, reloadProject],
  );

  const removeResult = useCallback(
    (promptId: string, resultId: string) => {
      const prompt = activeProject?.prompts.find((p) => p.id === promptId);
      if (prompt) {
        db.prompts.update(promptId, { results: prompt.results.filter((r) => r.id !== resultId) });
        reloadProject(activeProjectId!);
      }
    },
    [activeProject, activeProjectId, reloadProject],
  );

  // ── Prompt assembly ──
  const expandPrompt = useCallback(
    (prompt: Prompt, snippets: Snippet[], rules: Rule[]): string => {
      const snippetMap = Object.fromEntries(snippets.map((s) => [s.id, s.content]));
      const ruleMap = Object.fromEntries(rules.map((r) => [r.id, r.content]));

      let content = prompt.content;
      content = content.replace(/\{\{snippet:(\w+)\}\}/g, (_m, id: string) => snippetMap[id] ?? _m);
      content = content.replace(/\{\{rule:(\w+)\}\}/g, (_m, id: string) => ruleMap[id] ?? _m);

      // negative prompt
      let negative = prompt.negative;
      negative = negative.replace(/\{\{snippet:(\w+)\}\}/g, (_m, id: string) => snippetMap[id] ?? _m);
      negative = negative.replace(/\{\{rule:(\w+)\}\}/g, (_m, id: string) => ruleMap[id] ?? _m);

      return [content, negative, prompt.generationParams].filter(Boolean).join('\n');
    },
    [],
  );

  const value: StudioContextValue = useMemo(
    () => ({
      projects,
      activeProject,
      activeProjectId,
      currentView,
      activeBoardId,
      activePrompt,
      libraryPanelOpen,
      searchQuery,
      setActiveProjectId,
      setCurrentView,
      setActiveBoardId,
      setActivePromptId,
      setLibraryPanelOpen,
      setSearchQuery,
      createProject,
      deleteProject,
      renameProject,
      createBoard,
      renameBoard,
      deleteBoard,
      addPromptToBoard,
      removePromptFromBoard,
      createPrompt,
      updatePrompt,
      deletePrompt,
      createSnippet,
      updateSnippet,
      deleteSnippet,
      createRule,
      updateRule,
      deleteRule,
      addResult,
      removeResult,
      expandPrompt,
      projectSnippets,
      projectRules,
      projectPrompts,
      projectBoards,
    }),
    [
      projects,
      activeProject,
      activeProjectId,
      currentView,
      activeBoardId,
      activePrompt,
      libraryPanelOpen,
      searchQuery,
      projectSnippets,
      projectRules,
      projectPrompts,
      projectBoards,
      setActiveProjectId,
      setCurrentView,
      setActiveBoardId,
      setActivePromptId,
      setLibraryPanelOpen,
      setSearchQuery,
      createProject,
      deleteProject,
      renameProject,
      createBoard,
      renameBoard,
      deleteBoard,
      addPromptToBoard,
      removePromptFromBoard,
      createPrompt,
      updatePrompt,
      deletePrompt,
      createSnippet,
      updateSnippet,
      deleteSnippet,
      createRule,
      updateRule,
      deleteRule,
      addResult,
      removeResult,
      expandPrompt,
    ],
  );

  return <StudioContext.Provider value={value}>{children}</StudioContext.Provider>;
}
