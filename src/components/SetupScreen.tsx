'use client';

import { useState } from 'react';
import { useStudio } from '@/hooks/useStudio';

interface SetupScreenProps {
  onCreateProject?: (name: string, description?: string, tags?: string) => void;
}

export default function SetupScreen(_props: SetupScreenProps) {
  const { projects, setActiveProjectId, createProject } = useStudio();
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState('');

  return (
    <main className="flex min-h-screen items-center justify-center bg-studio-bg px-6 text-studio-text">
      <section className="w-full max-w-xl rounded-lg border border-studio-border bg-studio-elev-1 p-8 shadow-2xl shadow-black/25">
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25px] text-studio-accent">
              Prompt Studio
            </p>
            <h1 className="font-sans text-2xl font-medium text-studio-text leading-8">
              选择项目
            </h1>
            <p className="text-xs leading-6 text-studio-text-dim">
              数据全在本地 IndexedDB，不上传、不联网。选择一个项目继续，或创建新项目。
            </p>
          </div>

          {projects.length > 0 && (
            <div className="space-y-2">
              {projects.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => setActiveProjectId(project.id)}
                  className="block w-full rounded-lg border border-studio-border bg-studio-field p-4 text-left transition hover:border-studio-border-strong"
                >
                  <p className="text-sm font-medium text-studio-text">{project.name}</p>
                  <p className="mt-1 text-xs text-studio-text-faint">
                    {project.boards.length} 个看板 · {project.prompts.length} 个 Prompt · {project.snippets.length} 个片段
                  </p>
                </button>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            {showCreate ? (
              <div className="flex w-full gap-2">
                <input
                  autoFocus
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && newName.trim()) {
                      createProject(newName.trim());
                      setNewName('');
                      setShowCreate(false);
                    }
                  }}
                  placeholder="项目名称"
                  className="flex-1 rounded-md border border-studio-border bg-studio-field px-3 py-2 text-sm text-studio-text outline-none transition focus:border-studio-accent"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newName.trim()) {
                      createProject(newName.trim());
                      setNewName('');
                      setShowCreate(false);
                    }
                  }}
                  disabled={!newName.trim()}
                  className="rounded-md bg-studio-accent px-4 py-2 text-xs font-semibold text-studio-on-accent transition hover:bg-studio-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  创建
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCreate(false);
                    setNewName('');
                  }}
                  className="rounded-md border border-studio-border px-4 py-2 text-xs font-semibold text-studio-text-dim transition hover:bg-studio-elev-2 hover:text-studio-text"
                >
                  取消
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowCreate(true)}
                className="rounded-md border border-dashed border-studio-border px-4 py-2 text-xs font-semibold text-studio-text-faint transition hover:border-studio-accent hover:text-studio-accent"
              >
                + 新建项目
              </button>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
