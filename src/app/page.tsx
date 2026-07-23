'use client';

import { useState } from 'react';
import type { Project, Prompt, ViewState } from '@/types';
import { mockProjects, mockPrompts } from '@/data/mock-data';
import SetupScreen from '@/components/SetupScreen';
import StudioShell from '@/components/StudioShell';
import BoardsView from '@/components/BoardsView';
import PromptEditor from '@/components/PromptEditor';
import SnippetsView from '@/components/SnippetsView';
import RulesView from '@/components/RulesView';

export default function Home() {
  const [view, setView] = useState<ViewState>('setup');
  const [currentView, setCurrentView] = useState<'boards' | 'prompt' | 'snippets' | 'rules'>('boards');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeBoardId, setActiveBoardId] = useState<string | null>(null);
  const [activePromptId, setActivePromptId] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [prompts, setPrompts] = useState<Prompt[]>(mockPrompts);

  // Navigate to workspace after directory selection
  const handleDirectorySelected = () => {
    setView('workspace');
    setActiveProject(mockProjects[0] ?? null);
  };

  // Save prompt
  const handleSavePrompt = (updated: Prompt) => {
    setPrompts((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
    setProjects((prev) =>
      prev.map((proj) => ({
        ...proj,
        prompts: proj.prompts.map((p) => (p.id === updated.id ? updated : p)),
      }))
    );
  };

  // Delete prompt
  const handleDeletePrompt = () => {
    if (!activePromptId || !activeProject) return;
    setPrompts((prev) => prev.filter((p) => p.id !== activePromptId));
    setProjects((prev) =>
      prev.map((proj) => ({
        ...proj,
        prompts: proj.prompts.filter((p) => p.id !== activePromptId),
        boards: proj.boards.map((b) => ({
          ...b,
          promptIds: b.promptIds.filter((id) => id !== activePromptId),
        })),
      }))
    );
    setActivePromptId(null);
    setCurrentView('boards');
  };

  // Navigate prompt (prev/next)
  const handleNavigatePrompt = (direction: -1 | 1) => {
    if (!activeProject || !activePromptId || !activeBoardId) return;
    const board = activeProject.boards.find((b) => b.id === activeBoardId);
    if (!board) return;
    const idx = board.promptIds.indexOf(activePromptId);
    const nextIdx = idx + direction;
    if (nextIdx >= 0 && nextIdx < board.promptIds.length) {
      setActivePromptId(board.promptIds[nextIdx]);
    }
  };

  // Import results (simulate)
  const handleImportResults = () => {
    alert('从 Agent 导入结果功能 — 拖放 Agent 输出包到对话框即可。');
  };

  // Board view navigation
  const handleSelectPrompt = (promptId: string) => {
    setActivePromptId(promptId);
    setCurrentView('prompt');
  };

  if (view === 'setup') {
    return <SetupScreen onDirectorySelected={handleDirectorySelected} />;
  }

  if (!activeProject) {
    return <SetupScreen onDirectorySelected={handleDirectorySelected} />;
  }

  const projectPrompts = activeProject.prompts;
  const projectSnippets = activeProject.snippets;
  const projectRules = activeProject.rules;
  const allBoardIds = activeProject.boards.flatMap((b) => b.promptIds);
  const activeBoard = activeBoardId
    ? activeProject.boards.find((b) => b.id === activeBoardId)
    : null;
  const boardPromptIds = activeBoard?.promptIds ?? allBoardIds;
  const activePrompt = activePromptId
    ? projectPrompts.find((p) => p.id === activePromptId)
    : null;

  // Render workspace content
  const renderContent = () => {
    switch (currentView) {
      case 'boards':
        return (
          <BoardsView
            boards={activeProject.boards}
            prompts={projectPrompts}
            onSelectPrompt={handleSelectPrompt}
          />
        );
      case 'prompt':
        if (!activePrompt) {
          return (
            <BoardsView
              boards={activeProject.boards}
              prompts={projectPrompts}
              onSelectPrompt={handleSelectPrompt}
            />
          );
        }
        return (
          <PromptEditor
            prompt={activePrompt}
            projectName={activeProject.name}
            boardName={activeBoard?.name ?? '看板'}
            snippets={projectSnippets}
            rules={projectRules}
            boardPromptIds={boardPromptIds}
            onSave={handleSavePrompt}
            onDelete={handleDeletePrompt}
            onNavigate={handleNavigatePrompt}
            onImportResult={handleImportResults}
            onBack={() => {
              setActivePromptId(null);
              setCurrentView('boards');
            }}
          />
        );
      case 'snippets':
        return <SnippetsView snippets={projectSnippets} rules={projectRules} />;
      case 'rules':
        return <RulesView snippets={projectSnippets} rules={projectRules} />;
      default:
        return null;
    }
  };

  return (
    <StudioShell
      projects={projects}
      activeProjectId={activeProject.id}
    >
      {/* Top nav bar for non-shell pages */}
      {currentView !== 'boards' && (
        <div className="border-b border-studio-border px-8 py-3">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => {
                setCurrentView('boards');
                setActivePromptId(null);
                setActiveBoardId(null);
              }}
              className="text-xs font-semibold text-studio-accent transition hover:opacity-80"
            >
              ← 返回
            </button>
            <span className="text-xs text-studio-text-faint">{activeProject.name}</span>
          </div>
        </div>
      )}
      {renderContent()}
    </StudioShell>
  );
}
