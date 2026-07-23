'use client';

interface SetupScreenProps {
  onDirectorySelected?: () => void;
}

export default function SetupScreen({ onDirectorySelected }: SetupScreenProps) {
  const handleSelectDirectory = async () => {
    try {
      if (typeof window !== 'undefined' && 'showDirectoryPicker' in window) {
        const _dirHandle = await (window as Window & {
          showDirectoryPicker: () => Promise<FileSystemDirectoryHandle>;
        }).showDirectoryPicker();
        if (onDirectorySelected) {
          onDirectorySelected();
        }
      } else {
        // Fallback for environments without File System Access API
        if (onDirectorySelected) {
          onDirectorySelected();
        }
      }
    } catch {
      // User cancelled or API not available — just proceed in demo mode
      if (onDirectorySelected) {
        onDirectorySelected();
      }
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-studio-bg px-6 text-studio-text">
      <section className="w-full max-w-xl rounded-lg border border-studio-border bg-studio-elev-1 p-8 shadow-2xl shadow-black/25">
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25px] text-studio-accent">
              Prompt Studio
            </p>
            <h1 className="font-sans text-2xl font-medium text-studio-text leading-8">
              选择工作目录
            </h1>
            <p className="text-xs leading-6 text-studio-text-dim">
              Prompt Studio 是本地运行的 AIGC 提示词工作台。你的项目、片段和生成结果都只保存在你选的这个文件夹里，不上传、不联网。选一个文件夹开始。
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleSelectDirectory}
              className="inline-flex items-center justify-center bg-studio-accent px-4 py-2 text-xs font-semibold text-studio-on-accent transition hover:bg-studio-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
              style={{ borderRadius: '6px' }}
            >
              选择工作目录
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
