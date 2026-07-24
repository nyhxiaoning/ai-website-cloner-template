'use client';

import { useState } from 'react';
import { useStudio } from '@/hooks/useStudio';
import ImportDialog from './ImportDialog';
import CreateProjectDialog from './CreateProjectDialog';

export default function StudioShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    projects,
    activeProjectId,
    createProject,
    setCurrentView,
    setActiveBoardId,
    setActivePromptId,
  } = useStudio();

  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  const [importOpen, setImportOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  const navItemClass = (active: boolean) =>
    `flex items-center rounded-md px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition ${
      active
        ? 'text-studio-accent'
        : 'text-studio-text-faint hover:text-studio-text'
    }`;

  return (
    <div className="min-h-screen bg-studio-bg flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="border-b border-studio-border bg-studio-elev-1/95 px-4 py-4 md:sticky md:top-0 md:flex md:h-screen md:w-60 md:shrink-0 md:flex-col md:border-b-0 md:border-r">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-studio-accent">
            Prompt Studio
          </p>
          <p className="mt-0.5 text-[10px] text-studio-text-faint">本地工作台</p>
        </div>

        <div className="mt-6 min-w-0 md:flex md:min-h-0 md:flex-1 md:flex-col">
          {/* Projects section */}
          <div>
            <a
              href="/projects"
              className={navItemClass(pathname === '/projects')}
            >
              项目
            </a>
            <div className="mt-1 space-y-1 md:min-h-0 md:flex-1 md:overflow-y-auto">
              {projects.map((project) => (
                <a
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className={`block truncate rounded-md px-3 py-1.5 text-xs transition hover:bg-studio-elev-2 ${
                    activeProjectId === project.id
                      ? 'bg-studio-elev-2 text-studio-text'
                      : 'text-studio-text-dim'
                  }`}
                >
                  {project.name}
                </a>
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                setCurrentView('boards');
                setActiveBoardId(null);
                setActivePromptId(null);
                setCreateOpen(true);
              }}
              className="mt-1 flex w-full items-center rounded-md px-3 py-1.5 text-left text-xs text-studio-text-faint transition hover:bg-studio-elev-2 hover:text-studio-text"
            >
              + 新建项目
            </button>
          </div>

          {/* Navigation */}
          <nav className="mt-4 space-y-1 border-t border-studio-border pt-4">
            <a href="/snippets" className={navItemClass(pathname === '/snippets')}>
              片段库
            </a>
            <a href="/rules" className={navItemClass(pathname === '/rules')}>
              规则库
            </a>
            <button
              type="button"
              onClick={() => setImportOpen(true)}
              className="flex w-full items-center rounded-md px-3 py-2 text-left text-sm font-semibold text-studio-text-dim transition hover:bg-studio-elev-2 hover:text-studio-text"
            >
              从 Agent 导入结果
            </button>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">{children}</div>

      {/* Import Dialog */}
      <ImportDialog open={importOpen} onOpenChange={setImportOpen} />

      {/* Create Project Dialog */}
      <CreateProjectDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onConfirm={(data) => {
          createProject(data.name || '新建项目', data.description, data.tags);
          setCreateOpen(false);
        }}
      />
    </div>
  );
}
