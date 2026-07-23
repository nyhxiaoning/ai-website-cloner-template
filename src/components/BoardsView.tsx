'use client';

import type { Board, Prompt } from '@/types';

interface BoardsViewProps {
  boards: Board[];
  prompts: Prompt[];
  onSelectPrompt?: (promptId: string) => void;
}

export default function BoardsView({ boards, prompts, onSelectPrompt }: BoardsViewProps) {
  return (
    <main className="min-h-0 bg-studio-bg px-8 py-10 text-studio-text">
      <div className="px-8 py-10">
        <h1 className="font-sans text-2xl font-medium text-studio-text">看板</h1>
        <p className="mt-2 text-sm text-studio-text-dim">
          {boards.length} 个看板 · {prompts.length} 个 Prompt
        </p>
      </div>

      <div className="grid gap-6 px-8 pb-10 sm:grid-cols-2 lg:grid-cols-3">
        {boards.map((board) => {
          const boardPrompts = board.promptIds
            .map((id) => prompts.find((p) => p.id === id))
            .filter(Boolean) as Prompt[];

          return (
            <div
              key={board.id}
              className="rounded-lg border border-studio-border bg-studio-elev-1 overflow-hidden"
            >
              <div className="border-b border-studio-border px-4 py-3">
                <h2 className="text-sm font-semibold text-studio-text">{board.name}</h2>
                <p className="text-xs text-studio-text-faint">{boardPrompts.length} 个 Prompt</p>
              </div>
              <div className="p-3 space-y-2">
                {boardPrompts.map((prompt) => (
                  <button
                    key={prompt.id}
                    type="button"
                    onClick={() => onSelectPrompt?.(prompt.id)}
                    className="block w-full rounded-md border border-studio-border bg-studio-field p-3 text-left transition hover:border-studio-border-strong"
                  >
                    <p className="text-sm font-medium text-studio-text truncate">{prompt.title}</p>
                    <p className="mt-1 text-xs text-studio-text-faint line-clamp-2">
                      {prompt.content || '空 Prompt'}
                    </p>
                  </button>
                ))}
                {boardPrompts.length === 0 && (
                  <p className="text-xs text-studio-text-faint text-center py-4">暂无 Prompt</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
