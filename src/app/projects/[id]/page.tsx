'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useStudio } from '@/hooks/useStudio';
import StudioShell from '@/components/StudioShell';
import BoardsView from '@/components/BoardsView';
import PromptEditor from '@/components/PromptEditor';
import CreateSnippetDialog from '@/components/CreateSnippetDialog';
import CreateRuleDialog from '@/components/CreateRuleDialog';
import { useToast } from '@/components/ToastProvider';

export default function ProjectPage() {
  const params = useParams();
  const projectId = params.id as string;

  const {
    projects,
    setActiveProjectId,
    currentView,
    activePrompt,
    activeBoardId,
    setCurrentView,
    setActiveBoardId,
    setActivePromptId,
    updatePrompt,
    deletePrompt,
    addResult,
    removeResult,
    createPrompt,
    createSnippet,
    updateSnippet,
    deleteSnippet,
    createRule,
    updateRule,
    deleteRule,
    expandPrompt,
    setLibraryPanelOpen,
  } = useStudio();

  const activeProject = projects.find((p) => p.id === projectId) ?? null;

  const [snipCreateOpen, setSnipCreateOpen] = useState(false);
  const [ruleCreateOpen, setRuleCreateOpen] = useState(false);
  const { showToast } = useToast();

  // Auto-select this project in the store
  useEffect(() => {
    setActiveProjectId(projectId);
  }, [projectId, setActiveProjectId]);

  if (!activeProject) {
    return (
      <StudioShell>
        <main className="min-h-0 bg-studio-bg px-8 py-10 text-studio-text">
          <h1 className="font-sans text-2xl font-medium text-studio-text">项目未找到</h1>
          <p className="mt-2 text-sm text-studio-text-dim">该项目不存在或已被删除。</p>
        </main>
      </StudioShell>
    );
  }

  const projectSnippets = activeProject.snippets;
  const projectRules = activeProject.rules;
  const projectPrompts = activeProject.prompts;
  const activeBoard = activeBoardId
    ? activeProject.boards.find((b) => b.id === activeBoardId)
    : null;
  const boardPromptIds = activeBoard?.promptIds ?? [];

  const handleSelectPrompt = (promptId: string) => {
    setActivePromptId(promptId);
    setCurrentView('prompt');
  };

  const handleNavigatePrompt = (direction: -1 | 1) => {
    if (!activePrompt || !activeBoardId) return;
    const board = activeProject.boards.find((b) => b.id === activeBoardId);
    if (!board) return;
    const idx = board.promptIds.indexOf(activePrompt.id);
    const nextIdx = idx + direction;
    if (nextIdx >= 0 && nextIdx < board.promptIds.length) {
      setActivePromptId(board.promptIds[nextIdx]);
    }
  };

  const handleCreateSnippet = (data: { key: string; title: string; content: string; type: string; suggestedPosition: string; tags: string }) => {
    createSnippet({
      id: data.key,
      title: data.title || data.key,
      content: data.content,
      createdAt: new Date().toISOString(),
    });
  };

  const handleCreateRule = (data: { key: string; title: string; content: string; description: string; tags: string }) => {
    createRule({
      id: data.key,
      title: data.title || data.key,
      content: data.content,
      createdAt: new Date().toISOString(),
    });
  };

  const handleCreatePrompt = () => {
    if (!projectId) return;
    const newId = createPrompt({ title: '新 Prompt' });
    setActivePromptId(newId);
    setCurrentView('prompt');
  };

  const handleImportResults = (files: File[]) => {
    if (!activePrompt) {
      showToast('请先选择一个 Prompt', 'warning');
      return;
    }
    const imageFiles = Array.from(files).filter((f) => f.type.startsWith('image/') || f.type.startsWith('video/'));
    if (imageFiles.length === 0) {
      showToast('请选择图片或视频文件', 'warning');
      return;
    }
    for (const file of imageFiles) {
      const url = URL.createObjectURL(file);
      addResult(activePrompt.id, url);
    }
    showToast(`成功导入 ${imageFiles.length} 个结果`, 'success');
  };

  return (
    <StudioShell>
      {/* Top nav bar */}
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

      {/* Content */}
      {currentView === 'boards' && (
        <BoardsView
          boards={activeProject.boards}
          prompts={projectPrompts}
          onSelectPrompt={handleSelectPrompt}
          onCreatePrompt={handleCreatePrompt}
        />
      )}

      {currentView === 'prompt' && activePrompt && (
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
            setCurrentView('boards');
            setActivePromptId(null);
            setActiveBoardId(null);
          }}
          onLibraryToggle={() => setLibraryPanelOpen(true)}
          onSnipCreate={() => setSnipCreateOpen(true)}
          onRuleCreate={() => setRuleCreateOpen(true)}
          onImportResult={handleImportResults}
          expandPrompt={expandPrompt}
        />
      )}

      {/* Project-level create dialogs */}
      <CreateSnippetDialog
        open={snipCreateOpen}
        onOpenChange={setSnipCreateOpen}
        onConfirm={handleCreateSnippet}
      />
      <CreateRuleDialog
        open={ruleCreateOpen}
        onOpenChange={setRuleCreateOpen}
        onConfirm={handleCreateRule}
      />
    </StudioShell>
  );
}
