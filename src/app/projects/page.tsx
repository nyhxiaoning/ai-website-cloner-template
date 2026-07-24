'use client';

import { useState } from 'react';
import { useStudio } from '@/hooks/useStudio';
import { useToast } from '@/components/ToastProvider';
import StudioShell from '@/components/StudioShell';
import CreateProjectDialog from '@/components/CreateProjectDialog';

export default function ProjectsPage() {
  const {
    projects,
    activeProjectId,
    createProject,
    renameProject,
    deleteProject,
  } = useStudio();

  const { showToast } = useToast();

  const [createOpen, setCreateOpen] = useState(false);
  const [renameId, setRenameId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleCreate = (data: { name: string; description: string; tags: string }) => {
    createProject(data.name || '新建项目', data.description, data.tags);
    setCreateOpen(false);
    showToast(`项目 "${data.name || '新建项目'}" 创建成功`, 'success');
  };

  return (
    <StudioShell>
      <main className="min-h-0 bg-studio-bg px-8 py-10 text-studio-text">
        <div className="px-8 py-10 flex items-center justify-between">
          <div>
            <h1 className="font-sans text-2xl font-medium text-studio-text">项目</h1>
            <p className="mt-2 text-sm text-studio-text-dim">
              {projects.length} 个项目
            </p>
          </div>
          <button
            type="button"
            onClick={() => setCreateOpen(true)}
            className="shrink-0 rounded-md border border-studio-border px-3 py-1.5 text-xs font-semibold text-studio-text-dim transition hover:border-studio-accent hover:text-studio-accent"
          >
            + 新建项目
          </button>
        </div>

        <div className="grid gap-4 px-8 pb-10 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="rounded-lg border border-studio-border bg-studio-elev-1 p-5 transition hover:border-studio-border-strong"
            >
              {renameId === project.id ? (
                <div className="flex gap-2">
                  <input
                    autoFocus
                    value={renameValue}
                    onChange={(e) => setRenameValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && renameValue.trim()) {
                        renameProject(project.id, renameValue.trim());
                        setRenameId(null);
                        setRenameValue('');
                        showToast(`项目已重命名为 "${renameValue.trim()}"`, 'success');
                      }
                      if (e.key === 'Escape') setRenameId(null);
                    }}
                    className="flex-1 rounded-md border border-studio-accent bg-studio-field px-2 py-1 text-sm text-studio-text outline-none"
                  />
                  <button
                    onClick={() => {
                      if (renameValue.trim()) {
                        renameProject(project.id, renameValue.trim());
                        showToast(`项目已重命名为 "${renameValue.trim()}"`, 'success');
                      }
                      setRenameId(null);
                      setRenameValue('');
                    }}
                    className="text-xs text-studio-accent"
                  >
                    ✓
                  </button>
                  <button
                    onClick={() => { setRenameId(null); setRenameValue(''); }}
                    className="text-xs text-studio-text-faint"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between">
                    <h2 className="text-sm font-semibold text-studio-text">{project.name}</h2>
                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={() => { setRenameId(project.id); setRenameValue(project.name); }}
                        className="text-studio-text-faint hover:text-studio-text"
                        title="重命名"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteId(project.id)}
                        className="text-studio-text-faint hover:text-studio-neg"
                        title="删除"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                      </button>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-studio-text-faint">
                    {project.boards.length} 个看板 · {project.prompts.length} 个 Prompt · {project.snippets.length} 个片段
                  </p>
                  <p className="mt-1 text-[10px] text-studio-text-faint">
                    {new Date(project.createdAt).toLocaleDateString('zh-CN')}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Delete confirmation */}
        {deleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
            <div className="w-full max-w-sm rounded-lg border border-studio-border bg-studio-elev-1 p-6 shadow-2xl">
              <h3 className="text-sm font-semibold text-studio-text">确认删除项目</h3>
              <p className="mt-2 text-sm text-studio-text-dim">删除后无法撤销。确定要删除这个项目吗？</p>
              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setDeleteId(null)}
                  className="rounded-md border border-studio-border px-3 py-1.5 text-xs font-semibold text-studio-text-dim transition hover:bg-studio-elev-2 hover:text-studio-text"
                >
                  取消
                </button>
                <button
                  type="button"
                  onClick={() => {
                    deleteProject(deleteId);
                    setDeleteId(null);
                    showToast('项目已删除', 'success');
                  }}
                  className="rounded-md bg-studio-neg px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-studio-neg/90"
                >
                  删除
                </button>
              </div>
            </div>
          </div>
        )}

        <CreateProjectDialog
          open={createOpen}
          onOpenChange={setCreateOpen}
          onConfirm={handleCreate}
        />
      </main>
    </StudioShell>
  );
}