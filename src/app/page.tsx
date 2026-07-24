'use client';

import { useStudio } from '@/hooks/useStudio';
import { useToast } from '@/components/ToastProvider';
import SetupScreen from '@/components/SetupScreen';
import StudioShell from '@/components/StudioShell';
import BoardsView from '@/components/BoardsView';
import PromptEditor from '@/components/PromptEditor';
import SnippetsView from '@/components/SnippetsView';
import RulesView from '@/components/RulesView';

export default function Home() {
  const {
    projects,
    activeProject,
    activeProjectId,
    activePrompt,
    currentView,
    activeBoardId,
    searchQuery,
    setSearchQuery,
    setCurrentView,
    setActiveProjectId,
    setActiveBoardId,
    setActivePromptId,
    setLibraryPanelOpen,
    updatePrompt,
    deletePrompt,
    addResult,
    createProject,
    renameProject,
    createBoard,
    renameBoard,
    deleteBoard,
    removePromptFromBoard,
    createPrompt,
    expandPrompt,
  } = useStudio();

  const { showToast } = useToast();

  // derive activePromptId from activePrompt for navigator
  const activePromptId = activePrompt?.id ?? null;

  const handleSelectPrompt = (promptId: string) => {
    setActivePromptId(promptId);
    setCurrentView('prompt');
  };

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

  const handleCreateProject = (name: string, description?: string, tags?: string) => {
    createProject(name, description, tags);
    showToast(`项目 "${name}" 创建成功`, 'success');
  };

  const handleCreatePrompt = () => {
    if (!activeProjectId) {
      showToast('请先选择一个项目', 'warning');
      return;
    }
    const newId = createPrompt({ title: '新 Prompt' });
    setActivePromptId(newId);
    setCurrentView('prompt');
    showToast('新 Prompt 已创建', 'success');
  };

  const handleImportResults = (files: File[]) => {
    if (!activePrompt) return;
    for (const file of files) {
      const url = URL.createObjectURL(file);
      addResult(activePrompt.id, url);
    }
  };

  if (!activeProject) {
    return <SetupScreen />;
  }

  const projectSnippets = activeProject.snippets;
  const projectRules = activeProject.rules;
  const projectPrompts = activeProject.prompts;
  const activeBoard = activeBoardId ? activeProject.boards.find((b) => b.id === activeBoardId) : null;
  const boardPromptIds = activeBoard?.promptIds ?? activeProject.boards.flatMap((b) => b.promptIds);

  const renderContent = () => {
    switch (currentView) {
      case 'boards':
        return (
          <BoardsView
            boards={activeProject.boards}
            prompts={projectPrompts}
            onSelectPrompt={handleSelectPrompt}
            onCreateBoard={(name) => {
              createBoard(name);
              showToast(`看板 "${name}" 已创建`, 'success');
            }}
            onRenameBoard={(id, name) => {
              renameBoard(id, name);
              showToast(`看板已重命名为 "${name}"`, 'success');
            }}
            onDeleteBoard={(id) => {
              deleteBoard(id);
              showToast('看板已删除', 'success');
            }}
            onRemovePromptFromBoard={(boardId, promptId) => {
              removePromptFromBoard(boardId, promptId);
              showToast('Prompt 已从看板移除', 'info');
            }}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onCreatePrompt={handleCreatePrompt}
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
            onSave={updatePrompt}
            onDelete={() => {
              deletePrompt(activePrompt.id);
              showToast('Prompt 已删除', 'success');
            }}
            onNavigate={handleNavigatePrompt}
            onBack={() => {
              setActivePromptId(null);
              setCurrentView('boards');
            }}
            onLibraryToggle={() => setLibraryPanelOpen(true)}
            onImportResult={handleImportResults}
            onSnipCreate={() => {
              // PromptEditor's library panel uses a simplified callback;
              // actual creation is handled in the dialog's onConfirm.
              // This triggers the dialog in project/[id] context.
              setLibraryPanelOpen(true);
            }}
            onRuleCreate={() => {
              setLibraryPanelOpen(true);
            }}
            expandPrompt={expandPrompt}
          />
        );
      case 'snippets':
        return (
          <SnippetsView
            snippets={projectSnippets}
            rules={projectRules}
          />
        );
      case 'rules':
        return (
          <RulesView
            snippets={projectSnippets}
            rules={projectRules}
          />
        );
      default:
        return null;
    }
  };

  return (
    <StudioShell>
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
