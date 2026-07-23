'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import type { Project, Snippet, Rule } from '@/types';
import ImportDialog from './ImportDialog';

interface StudioShellProps {
  children: React.ReactNode;
  projects: Project[];
  activeProjectId?: string;
}

export default function StudioShell({ children, projects, activeProjectId }: StudioShellProps) {
  const pathname = usePathname();
  const [importOpen, setImportOpen] = useState(false);

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
            <Link href="/" className={navItemClass(pathname === '/')}>
              项目
            </Link>
            <div className="mt-1 space-y-1 md:min-h-0 md:flex-1 md:overflow-y-auto">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className={`block truncate rounded-md px-3 py-1.5 text-xs transition hover:bg-studio-elev-2 ${
                    activeProjectId === project.id
                      ? 'bg-studio-elev-2 text-studio-text'
                      : 'text-studio-text-dim'
                  }`}
                >
                  {project.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <nav className="mt-4 space-y-1 border-t border-studio-border pt-4">
            <Link href="/snippets" className={navItemClass(pathname === '/snippets')}>
              片段库
            </Link>
            <Link href="/rules" className={navItemClass(pathname === '/rules')}>
              规则库
            </Link>
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
    </div>
  );
}
