'use client';

import { useState } from 'react';
import { useStudio } from '@/hooks/useStudio';
import StudioShell from '@/components/StudioShell';
import SnippetsView from '@/components/SnippetsView';
import CreateSnippetDialog from '@/components/CreateSnippetDialog';

export default function SnippetsPage() {
  const {
    projects,
    activeProjectId,
    projectSnippets,
    createSnippet,
    updateSnippet,
    deleteSnippet,
  } = useStudio();

  const [createOpen, setCreateOpen] = useState(false);

  const handleCreate = (data: { key: string; title: string; content: string; type: string; suggestedPosition: string; tags: string }) => {
    createSnippet({
      id: data.key,
      title: data.title || data.key,
      content: data.content,
      createdAt: new Date().toISOString(),
    });
  };

  return (
    <StudioShell>
      <SnippetsView
        snippets={projectSnippets ?? []}
        rules={[]}
        onCreateSnippet={handleCreate}
        onUpdateSnippet={updateSnippet}
        onDeleteSnippet={deleteSnippet}
      />
      <CreateSnippetDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onConfirm={handleCreate}
      />
    </StudioShell>
  );
}
